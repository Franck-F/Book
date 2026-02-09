import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
    className?: string;
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
    const variants = {
        primary: 'bg-primary-500/10 text-primary-300 border-primary-500/20',
        accent: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
        success: 'bg-green-500/10 text-green-300 border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
        danger: 'bg-red-500/10 text-red-300 border-red-500/20',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
