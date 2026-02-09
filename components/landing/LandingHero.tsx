'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function LandingHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Greeting Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border border-primary-500/20"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                        </span>
                        <span className="text-sm text-slate-300">Disponible pour de nouveaux projets</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-[family-name:var(--font-outfit)]"
                    >
                        Salut, je suis{' '}
                        <span className="gradient-text">Franck</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        Je crée des expériences web{' '}
                        <span className="text-white font-semibold">élégantes</span> et{' '}
                        <span className="text-white font-semibold">performantes</span>{' '}
                        avec React, TypeScript et les frameworks modernes.
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto"
                    >
                        Passionné par la création d'applications web accessibles et hautement performantes.
                        Toujours en apprentissage, toujours en partage.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
                        >
                            Me Contacter
                        </a>
                        <a
                            href="/projects"
                            className="px-8 py-4 glass-hover font-semibold rounded-lg transition-all duration-300"
                        >
                            Voir mes Projets
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <a href="#about" className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <span className="text-sm">Défiler</span>
                        <ArrowDown className="w-5 h-5 animate-bounce" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
