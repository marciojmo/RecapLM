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
