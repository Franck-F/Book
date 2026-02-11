'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BookOpen, GraduationCap, Zap, Binary } from 'lucide-react';

interface CategorizedContent {
    slug: string;
    title: string;
    description: string;
    category?: string;
    date?: string;
}

interface CategorizedFolderProps {
    title: string;
    items: CategorizedContent[];
    icon?: React.ReactNode;
    color?: 'primary' | 'accent' | 'green' | 'yellow' | 'blue' | 'purple';
    basePath: string;
    type?: 'blog' | 'tutorial';
}

export default function CategorizedFolder({
    title,
    items,
    icon,
    color = 'primary',
    basePath,
    type = 'blog'
}: CategorizedFolderProps) {
    const [isOpen, setIsOpen] = useState(false);

    const colorClasses = {
        primary: {
            bg: 'from-primary-500/10 to-primary-600/5',
            border: 'border-primary-500/30',
            text: 'text-primary-400',
            glow: 'shadow-primary-500/10',
            accent: 'bg-primary-500/20',
        },
        accent: {
            bg: 'from-accent-500/10 to-accent-600/5',
            border: 'border-accent-500/30',
            text: 'text-accent-400',
            glow: 'shadow-accent-500/10',
            accent: 'bg-accent-500/20',
        },
        green: {
            bg: 'from-green-500/10 to-green-600/5',
            border: 'border-green-500/30',
            text: 'text-green-400',
            glow: 'shadow-green-500/10',
            accent: 'bg-green-500/20',
        },
        yellow: {
            bg: 'from-yellow-500/10 to-yellow-600/5',
            border: 'border-yellow-500/30',
            text: 'text-yellow-400',
            glow: 'shadow-yellow-500/10',
            accent: 'bg-yellow-500/20',
        },
        blue: {
            bg: 'from-blue-500/10 to-blue-600/5',
            border: 'border-blue-500/30',
            text: 'text-blue-400',
            glow: 'shadow-blue-500/10',
            accent: 'bg-blue-500/20',
        },
        purple: {
            bg: 'from-purple-500/10 to-purple-600/5',
            border: 'border-purple-500/30',
            text: 'text-purple-400',
            glow: 'shadow-purple-500/10',
            accent: 'bg-purple-500/20',
        },
    };

    const colors = colorClasses[color] || colorClasses.primary;

    return (
        <motion.div
            layout
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Module Header */}
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative cursor-pointer group transition-all duration-500 overflow-hidden rounded-2xl border ${colors.border} ${isOpen ? 'mb-4 ring-1 ring-white/10' : 'mb-4'}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                {/* Background Animation Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg} opacity-50 group-hover:opacity-80 transition-opacity`} />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative glass-premium p-6 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <motion.div
                                animate={isOpen ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
                                transition={{ duration: 0.5 }}
                                className={`p-4 rounded-xl ${colors.accent} border ${colors.border} relative z-10 shadow-lg`}
                            >
                                {icon || (type === 'blog' ? <BookOpen className={`w-6 h-6 ${colors.text}`} /> : <GraduationCap className={`w-6 h-6 ${colors.text}`} />)}
                            </motion.div>
                            <div className="absolute inset-0 blur-lg bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] uppercase tracking-widest font-bold ${colors.text} opacity-70`}>
                                    {type === 'blog' ? 'Internal Archive' : 'Knowledge Base'} // 0{items.length}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white font-display tracking-tight">
                                {title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end opacity-40">
                            <span className="text-[8px] font-mono tracking-[0.2em]">ACCESS: {isOpen ? 'GRANTED' : 'RESTRICTED'}</span>
                            <div className="flex gap-1 mt-1">
                                <div className={`h-1 w-4 rounded-full ${isOpen ? 'bg-primary-500' : 'bg-white/20'}`} />
                                <div className={`h-1 w-2 rounded-full ${isOpen ? 'bg-primary-500/50' : 'bg-white/10'}`} />
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.2 : 1 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className={`p-2 rounded-full bg-white/5 border border-white/5 ${colors.text}`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Module Contents */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, scale: 0.98 }}
                        animate={{ height: 'auto', opacity: 1, scale: 1 }}
                        exit={{ height: 0, opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        <div className={`relative glass-premium border ${colors.border} rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8`}>
                            {/* Inner Mesh Background */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mesh-bg rounded-2xl" />

                            {items.map((item, index) => (
                                <motion.a
                                    key={item.slug}
                                    href={`${basePath}/${item.slug}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 + 0.2 }}
                                    className="relative block p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 group/item transition-all h-full"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-lg font-bold text-white group-hover/item:text-primary-400 transition-colors">
                                                {item.title}
                                            </h4>
                                            <div className="p-1 rounded bg-white/5 border border-white/5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                <Zap className="w-3 h-3 text-primary-400" />
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                        {item.date && (
                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                                                <Binary className="w-3 h-3 text-slate-600" />
                                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                                                    Index_{item.date.replace(/-/g, '')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
