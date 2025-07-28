import OpenAI from 'openai';
import { QuestionDataSchema, type QuestionData } from '@/types/question';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWithOpenAI(topic: string): Promise<QuestionData> {
    const prompt = `
You are an AI that generates multiple choice questions.

Respond ONLY with a valid JSON object in the following format:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctIndex": number,
  "explanation": "string"
}

Do not include any explanation or formatting outside the JSON.

Topic: "${topic}"
`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
            messages: [
                { role: 'system', content: 'You generate quiz questions as structured JSON only.' },
                { role: 'user', content: prompt },
            ],
        });

        const text = response.choices[0].message?.content ?? '';

        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonString = text.slice(jsonStart, jsonEnd);

        const parsed = JSON.parse(jsonString);
        const validated = QuestionDataSchema.parse(parsed);

        return validated;
    } catch (err) {
        console.error('[OpenAI] Failed to parse or validate response:', err);
        throw new Error('Invalid LLM response format');
    }
}

export async function explainAnswerWithOpenAI({
    question,
    options,
    correctAnswer,
}: {
    question: string;
    options: string[];
    correctAnswer: string;
}): Promise<string> {
    const prompt = `
  You are a helpful assistant that explains multiple-choice questions.
  
  Explain **why** the following correct answer is right and **why** the other options are incorrect.
  
  Respond with a concise but clear explanation, using markdown formatting if needed.
  
  Question:
  ${question}
  
  Options:
  ${options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}
  
  Correct Answer: ${correctAnswer}
  `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
            messages: [
                { role: 'system', content: 'You explain multiple-choice questions in clear, structured language using markdown formatting.' },
                { role: 'user', content: prompt },
            ],
        });

        const text = response.choices[0].message?.content?.trim();
        if (!text) throw new Error('Empty response from OpenAI');
        return text;
    } catch (err) {
        console.error('[OpenAI] Failed to get explanation:', err);
        return 'Could not fetch explanation at this time.';
    }
}

