'use client';

import { useEffect, useState, useRef } from 'react';
import Button from './Button';

interface ExplanationModalProps {
    isOpen: boolean;
    onClose: () => void;
    question: string;
    options: string[];
    correctAnswer: string;
}

export default function ExplanationModal({
    isOpen,
    onClose,
    question,
    options,
    correctAnswer,
}: ExplanationModalProps) {
    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState('');

    // Cache persistente enquanto o componente estiver montado
    const explanationCache = useRef<Map<string, string>>(new Map());

    const cacheKey = JSON.stringify({ question, options, correctAnswer });

    useEffect(() => {
        if (!isOpen) return;

        console.log('[Modal] Opened for question:', question);
        console.log('[Modal] Cache Key:', cacheKey);

        const cached = explanationCache.current.get(cacheKey);
        if (cached) {
            console.log('[Cache] HIT ✅');
            setExplanation(cached);
            return;
        }

        console.log('[Cache] MISS ❌ — fetching explanation from API...');

        const fetchExplanation = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/explain', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question, options, correctAnswer }),
                });
                const data = await res.json();
                const explanationText = data.explanation || 'No explanation found.';

                setExplanation(explanationText);
                explanationCache.current.set(cacheKey, explanationText); // Salva no cache
                console.log('[Cache] SET ✅');
            } catch (err) {
                console.error('[Fetch Error] Failed to fetch explanation:', err);
                setExplanation('Failed to fetch detailed explanation.');
            } finally {
                setLoading(false);
            }
        };

        fetchExplanation();
    }, [isOpen, cacheKey, question, options, correctAnswer]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-200/90 bg-opacity-10 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg hover:cursor-pointer"
                >
                    ✕
                </button>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Detailed Explanation</h2>
                {loading ? (
                    <p className="text-sm text-gray-500">Loading explanation...</p>
                ) : (
                    <div className="text-sm text-gray-700 whitespace-pre-line">{explanation}</div>
                )}
                <Button onClick={onClose} label="Got it!" variant="primary" className="mt-6" />
            </div>
        </div>
    );
}
