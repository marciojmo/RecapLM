import Button from "./Button";

interface RecapSummaryProps {
    topic: string;
    correct: number;
    total: number;
    onRestart: () => void;
}

export default function RecapSummary({
    topic,
    correct,
    total,
    onRestart,
}: RecapSummaryProps) {
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    const getBarColor = () => {
        if (percent < 30) return 'bg-red-500';
        if (percent < 70) return 'bg-blue-500';
        return 'bg-green-500';
    };

    return (
        <div className="text-center animate-fade-in">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                {topic} Recap
            </h1>

            {total > 0 ? (
                <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden relative">
                    <div
                        className={`h-full ${getBarColor()} transition-all duration-1000 ease-out`}
                        style={{ width: `${percent}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                        {percent}%
                    </span>
                </div>
            ) : (
                <div className="mb-4 text-4xl" aria-hidden="true">
                    🤔
                </div>
            )}

            <p className="text-gray-700 mb-6">
                {total > 0
                    ? `${correct} out of ${total} correct answers`
                    : 'No answers recorded in this session'}
            </p>

            <Button
                onClick={onRestart}
                variant="primary"
                label="Back to Start"
            />
        </div>
    );
}
