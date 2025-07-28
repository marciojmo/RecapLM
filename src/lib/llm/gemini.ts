import { GoogleGenAI } from '@google/genai';
import { QuestionDataSchema, type QuestionData } from '@/types/question';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGeminiModel({
    prompt,
    temperature,
}: {
    prompt: string;
    temperature: number;
}): Promise<string> {
    const result = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
            temperature,
            topP: 0.9,
            topK: 40,
        },
    });

    const text = result.text?.trim() ?? '';
    if (!text) throw new Error('Empty response from Gemini');
    return text;
}

export async function generateWithGemini(topic: string): Promise<QuestionData> {
    const randomId = Math.floor(Math.random() * 100000); // ajuda a induzir variedade

    const prompt = `
You are an AI that generates multiple choice questions.

Create a new, unique question about "${topic}". Avoid repeating previous content.
Vary the wording, structure, and focus of the question each time.
You can change the difficulty level and ask from different angles.

Respond ONLY with a valid JSON object in the following format:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctIndex": number,
  "explanation": "string"
}

Do not include any explanation or formatting. Only return the JSON object.

ID: ${randomId}
`;

    try {
        const text = await callGeminiModel({ prompt, temperature: 0.9 });

        const match = text.match(/```json\n([\s\S]*?)```/) ?? text;
        const jsonString = typeof match === 'object' ? match[1] : text;
        const parsed = JSON.parse(jsonString);
        const validated = QuestionDataSchema.parse(parsed);

        return validated;
    } catch (err) {
        console.error('[Gemini] Failed to parse or validate response:', err);
        throw new Error('Invalid LLM response format');
    }
}

export async function explainAnswerWithGemini({
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
        return await callGeminiModel({ prompt, temperature: 0.7 });
    } catch (err) {
        console.error('[Gemini] Failed to get explanation:', err);
        return 'Could not fetch explanation at this time.';
    }
}
