import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                'glass rounded-lg p-6',
                hover && 'glass-hover cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );
}
