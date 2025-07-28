import type { QuestionData } from '@/types/question';

export async function generateWithMock(topic: string): Promise<QuestionData> {
    console.log(`[LLM] Using MOCK provider for topic: "${topic}"`);

    return {
        question: `What is a key concept in "${topic}"?`,
        options: [
            `Option A related to ${topic}`,
            `Option B related to ${topic}`,
            `Option C related to ${topic}`,
            `Option D related to ${topic}`,
        ],
        correctIndex: Math.floor(Math.random() * 4),
        explanation: `This option is correct because it's the most accurate among the choices for the topic "${topic}".`,
    };
}

export async function explainAnswerWithMock({
    question,
    options,
    correctAnswer,
}: {
    question: string;
    options: string[];
    correctAnswer: string;
}) {
    return `Mock explanation: "${correctAnswer}" is obviously correct for "${question}"`;
}