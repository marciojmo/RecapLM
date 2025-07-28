'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import ExplanationBox from '@/components/ExplanationBox';
import QuestionCard from '@/components/QuestionCard';
import RecapSummary from '@/components/RecapSummary';
import ExplanationModal from '@/components/ExplanationModal';

interface QuestionData {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export default function QuizPage() {
    const topic = useSearchParams().get('topic') || '';
    const router = useRouter();

    const [questionData, setQuestionData] = useState<QuestionData | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [isSessionEnded, setIsSessionEnded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchQuestion = async () => {
        setLoading(true);
        setError('');
        setSelected(null);
        try {
            const res = await fetch(`/api/llm?topic=${encodeURIComponent(topic)}`);
            const data = await res.json();
            setQuestionData(data);
        } catch {
            setError('Failed to load question. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (topic) fetchQuestion();
    }, [topic]);

    const handleAnswer = (i: number) => {
        if (selected === null && questionData) {
            setSelected(i);
            i === questionData.correctIndex
                ? setCorrectCount((prev) => prev + 1)
                : setIncorrectCount((prev) => prev + 1);
        }
    };

    const handleNext = () => fetchQuestion();
    const handleEnd = () => setIsSessionEnded(true);
    const handleBackToStart = () => router.push('/');

    const totalAnswered = correctCount + incorrectCount;

    return (
        <main className="min-h-screen px-4 py-8 flex flex-col items-center bg-[#f3f2f1]">
            <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-2xl shadow-md">
                {isSessionEnded ? (
                    <RecapSummary
                        topic={topic}
                        correct={correctCount}
                        total={totalAnswered}
                        onRestart={handleBackToStart}
                    />
                ) : (
                    <>
                        <div className="flex justify-between mb-6">
                            <h2 className="text-lg text-gray-700">
                                Topic: <span className="font-medium text-gray-900">{topic}</span>
                            </h2>
                            <button onClick={handleEnd} className="text-sm text-blue-600 hover:underline hover:cursor-pointer">
                                End Session
                            </button>
                        </div>

                        {loading && <p className="text-center text-gray-500">Loading question...</p>}
                        {error && <p className="text-center text-red-600 text-sm mb-4">{error}</p>}

                        {!loading && questionData && (
                            <>
                                <QuestionCard
                                    question={questionData.question}
                                    options={questionData.options}
                                    correctIndex={questionData.correctIndex}
                                    selectedIndex={selected}
                                    onSelect={handleAnswer}
                                />

                                {selected !== null && (
                                    <>
                                        <ExplanationBox
                                            isCorrect={selected === questionData.correctIndex}
                                            explanation={questionData.explanation}
                                            correctAnswer={questionData.options[questionData.correctIndex]}
                                        />
                                        <Button label="Next Question" onClick={handleNext} variant="primary" className="mt-6" />
                                        <Button
                                            label="Explain further"
                                            onClick={() => setShowModal(true)}
                                            variant='secondary'
                                            className="mt-2"
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>

            {questionData && (
                <ExplanationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    question={questionData.question}
                    options={questionData.options}
                    correctAnswer={questionData.options[questionData.correctIndex]}
                />
            )}
        </main>
    );
}
