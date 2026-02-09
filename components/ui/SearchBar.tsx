'use client';

import { Search } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (value: string) => void;
}

export default function SearchBar({ onSearch, className, ...props }: SearchBarProps) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
                type="text"
                className={cn(
                    'w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all',
                    className
                )}
                onChange={(e) => onSearch?.(e.target.value)}
                {...props}
            />
        </div>
    );
}
