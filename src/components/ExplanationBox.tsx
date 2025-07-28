interface Props {
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
}

export default function ExplanationBox({ isCorrect, explanation, correctAnswer }: Props) {
    return (
        <div className="mt-6 p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 shadow-sm">
            <p className={`font-medium mb-2 ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                {isCorrect ? '✅ That\'s correct!' : '❌ That\'s not correct.'}
            </p>

            {!isCorrect && (
                <p className="mb-2">
                    The correct answer is: <strong>{correctAnswer}</strong>
                </p>
            )}

            <p className="text-gray-700">{explanation}</p>
        </div>
    );
}
