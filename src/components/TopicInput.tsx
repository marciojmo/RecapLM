interface TopicInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TopicInput({
    value,
    onChange,
    placeholder,
    onKeyDown,
}: TopicInputProps) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            rows={4}
            className="w-full p-4 text-base text-gray-900 rounded-xl border border-gray-300 focus:border-[#0067C5] focus:ring-2 focus:ring-[#A6D1FF] resize-none shadow-sm transition duration-150 ease-in-out"
        />
    );
}
