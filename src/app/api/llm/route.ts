// src/app/api/llm/route.ts

import { NextResponse } from 'next/server';
import { generateQuestion } from '@/lib/llm';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic') || 'general knowledge';

    try {
        const question = await generateQuestion(topic);
        return NextResponse.json(question);
    } catch (err) {
        console.error('[LLM] Error generating question:', err);
        return NextResponse.json(
            { error: 'It seems like our AI provider is currently overloaded. Please wait a moment and try again.' },
            { status: 500 }
        );
    }
}
