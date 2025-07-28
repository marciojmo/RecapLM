import { NextResponse } from 'next/server';
import { explainAnswer } from '@/lib/llm';

export async function POST(req: Request) {
    const body = await req.json();
    const { question, options, correctAnswer } = body;

    try {
        const explanation = await explainAnswer({ question, options, correctAnswer });
        return NextResponse.json({ explanation });
    } catch (err) {
        console.error('[LLM] Error explaining answer:', err);
        return NextResponse.json({ error: 'Failed to explain answer' }, { status: 500 });
    }
}
