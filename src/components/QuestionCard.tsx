interface Props {
    question: string;
    options: string[];
    correctIndex: number;
    selectedIndex: number | null;
    onSelect: (index: number) => void;
}

export default function QuestionCard({
    question,
    options,
    correctIndex,
    selectedIndex,
    onSelect,
}: Props) {
    return (
        <div>
            <p className="text-lg font-semibold text-gray-900 mb-5 leading-snug">{question}</p>

            <div className="flex flex-col gap-4">
                {options.map((option, i) => {
                    const isSelected = selectedIndex === i;
                    const isCorrect = correctIndex === i;
                    const isAnswered = selectedIndex !== null;

                    const base =
                        'w-full text-left px-5 py-4 rounded-xl border font-medium text-base transition duration-150';

                    const state = !isAnswered
                        ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-900 cursor-pointer'
                        : isSelected && isCorrect
                            ? 'bg-green-100 border-green-600 text-green-900'
                            : isSelected
                                ? 'bg-red-100 border-red-600 text-red-900'
                                : isCorrect
                                    ? 'bg-green-50 border-green-500 text-green-800'
                                    : 'bg-white border-gray-200 text-gray-800';

                    return (
                        <button
                            key={i}
                            onClick={() => onSelect(i)}
                            disabled={isAnswered}
                            className={`${base} ${state}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
