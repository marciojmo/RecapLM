import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary';
}

export default function Button({
    label,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {
    const base = 'w-full text-base font-medium py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer';

    const variants = {
        primary: 'bg-[#0067C5] hover:bg-[#005BA1] active:bg-[#004C87] text-white focus:ring-[#A6D1FF]',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-300',
    };

    return (
        <button
            className={clsx(base, variants[variant], className)}
            {...props}
        >
            {label}
        </button>
    );
}
