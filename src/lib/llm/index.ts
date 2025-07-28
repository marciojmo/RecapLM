//import { generateWithOpenAI, explainAnswerWithOpenAI } from './openai';
import { generateWithGemini, explainAnswerWithGemini } from './gemini';
import { generateWithMock, explainAnswerWithMock } from './mock';
import type { QuestionData } from '@/types/question';

const provider = process.env.LLM_PROVIDER || 'mock';

export async function generateQuestion(topic: string): Promise<QuestionData> {
    switch (provider) {
        case 'gemini':
            return generateWithGemini(topic);
        case 'mock':
        default:
            return generateWithMock(topic);
    }
}

export async function explainAnswer(input: {
    question: string;
    options: string[];
    correctAnswer: string;
}) {
    switch (provider) {
        case 'gemini':
            return explainAnswerWithGemini(input);
        case 'mock':
        default:
            return explainAnswerWithMock(input);
    }
}