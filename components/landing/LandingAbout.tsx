'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

const skills = [
    {
        icon: Code2,
        title: 'Développement Full-Stack',
        description: 'Expertise en React, Next.js, TypeScript, Node.js et bases de données modernes.',
    },
    {
        icon: Palette,
        title: 'Design UI/UX',
        description: 'Création d\'interfaces élégantes et intuitives avec Tailwind CSS et Figma.',
    },
    {
        icon: Zap,
        title: 'Performance',
        description: 'Optimisation des applications pour des temps de chargement ultra-rapides.',
    },
    {
        icon: Globe,
        title: 'Accessibilité',
        description: 'Applications web accessibles à tous, conformes aux standards WCAG.',
    },
];

export default function LandingAbout() {
    return (
        <section id="about" className="py-32 px-4 bg-black/20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text font-[family-name:var(--font-outfit)]">
                        Ce que je fais
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Je transforme des idées en expériences web exceptionnelles
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-hover rounded-lg p-8 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/20 group-hover:border-primary-500/50 transition-colors">
                                    <skill.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">
                                        {skill.title}
                                    </h3>
                                    <p className="text-slate-400">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
