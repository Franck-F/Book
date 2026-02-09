'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BookOpen, GraduationCap } from 'lucide-react';

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
            bg: 'from-primary-500/20 to-primary-600/20',
            border: 'border-primary-500/30',
            text: 'text-primary-400',
            glow: 'shadow-primary-500/20',
        },
        accent: {
            bg: 'from-accent-500/20 to-accent-600/20',
            border: 'border-accent-500/30',
            text: 'text-accent-400',
            glow: 'shadow-accent-500/20',
        },
        green: {
            bg: 'from-green-500/20 to-green-600/20',
            border: 'border-green-500/30',
            text: 'text-green-400',
            glow: 'shadow-green-500/20',
        },
        yellow: {
            bg: 'from-yellow-500/20 to-yellow-600/20',
            border: 'border-yellow-500/30',
            text: 'text-yellow-400',
            glow: 'shadow-yellow-500/20',
        },
        blue: {
            bg: 'from-blue-500/20 to-blue-600/20',
            border: 'border-blue-500/30',
            text: 'text-blue-400',
            glow: 'shadow-blue-500/20',
        },
        purple: {
            bg: 'from-purple-500/20 to-purple-600/20',
            border: 'border-purple-500/30',
            text: 'text-purple-400',
            glow: 'shadow-purple-500/20',
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
            {/* Folder Tab */}
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative cursor-pointer group ${isOpen ? 'mb-0' : 'mb-4'}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                {/* 3D Folder Effect */}
                <div className="relative">
                    <div className={`absolute -top-3 left-4 w-32 h-8 bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-t-lg transform -skew-x-12 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />

                    <div className={`relative glass border ${colors.border} rounded-lg p-6 transition-all duration-300 ${isOpen ? `shadow-2xl ${colors.glow}` : 'group-hover:shadow-xl'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
                                    {icon || (type === 'blog' ? <BookOpen className={`w-6 h-6 ${colors.text}`} /> : <GraduationCap className={`w-6 h-6 ${colors.text}`} />)}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${colors.text} font-display`}>
                                        {title}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        {items.length} {type === 'blog' ? 'article' : 'guide'}{items.length > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>

                            <motion.div
                                animate={{ rotate: isOpen ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronRight className={`w-6 h-6 ${colors.text}`} />
                            </motion.div>
                        </div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg} rounded-lg blur-xl opacity-20 -z-10 transition-opacity duration-300 ${isOpen ? 'opacity-40' : 'group-hover:opacity-30'}`} />
                </div>
            </motion.div>

            {/* Folder Contents */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className={`glass border ${colors.border} rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8`}>
                            {items.map((item, index) => (
                                <motion.a
                                    key={item.slug}
                                    href={`${basePath}/${item.slug}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="block p-5 rounded-xl hover:bg-white/5 border border-white/5 group/item transition-all h-full"
                                >
                                    <div className="flex flex-col h-full">
                                        <h4 className="text-lg font-bold text-white group-hover/item:text-primary-400 transition-colors mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
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
