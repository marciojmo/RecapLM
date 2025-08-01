//import { generateWithOpenAI, explainAnswerWithOpenAI } from './openai';
import { generateWithGemini, explainAnswerWithGemini } from './gemini';
import { generateWithMock, explainAnswerWithMock } from './mock';
import { generateWithOpenAI, explainAnswerWithOpenAI } from './openai';
import type { QuestionData } from '@/types/question';


const provider = process.env.LLM_PROVIDER || 'mock';

export async function generateQuestion(topic: string): Promise<QuestionData> {
    switch (provider) {
        case 'gemini':
            return generateWithGemini(topic);
        case 'openai':
            return generateWithOpenAI(topic);
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
        case 'openai':
            return explainAnswerWithOpenAI(input);
        case 'mock':
        default:
            return explainAnswerWithMock(input);
    }
}