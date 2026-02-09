'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, Palette, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Starfall Background */}
            <div className="absolute inset-0 -z-10">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

                {/* Floating Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x * 0.02,
                        y: mousePosition.y * 0.02,
                    }}
                    transition={{ type: 'spring', stiffness: 50 }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x * -0.02,
                        y: mousePosition.y * -0.02,
                    }}
                    transition={{ type: 'spring', stiffness: 50 }}
                />

                {/* Additional Decorative Orbs */}
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-2xl animate-glow" />
                <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl animate-glow animation-delay-1s" />
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border border-primary-500/20"
                    >
                        <Sparkles className="w-4 h-4 text-primary-400" />
                        <span className="text-sm text-slate-300">Développeur Full-Stack</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold mb-6 font-[family-name:var(--font-outfit)]"
                    >
                        Créer des
                        <br />
                        <span className="gradient-text">Expériences Web</span>
                        <br />
                        Exceptionnelles
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Je transforme des idées en applications web modernes, performantes et élégantes
                        avec React, TypeScript et les dernières technologies.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <a
                            href="/projects"
                            className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/50 hover:scale-105"
                        >
                            <span className="relative z-10">Voir mes Projets</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 glass-hover font-semibold rounded-lg transition-all duration-300"
                        >
                            Me Contacter
                        </a>
                    </motion.div>

                    {/* Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            { icon: Code2, title: 'Clean Code', desc: 'Code maintenable et évolutif' },
                            { icon: Palette, title: 'Design Premium', desc: 'Interfaces élégantes et modernes' },
                            { icon: Zap, title: 'Performance', desc: 'Optimisé pour la vitesse' },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                className="glass-hover rounded-lg p-6 group"
                            >
                                <feature.icon className="w-8 h-8 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <a href="#projects" className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                            <span className="text-sm">Découvrir</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowDown className="w-5 h-5" />
                            </motion.div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
