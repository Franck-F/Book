"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export function StarfallHero() {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; duration: number; delay: number; drift: number }[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const newStars = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 5,
            drift: (Math.random() - 0.5) * 5,
        }))
        setStars(newStars)
    }, [])

    if (!mounted) return null

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4 pt-32">
            {/* Starfall Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        initial={{ opacity: 0, y: -20, x: `${star.x}%` }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: ["0vh", "100vh"],
                            x: [`${star.x}%`, `${star.x + star.drift}%`]
                        }}
                        transition={{
                            duration: star.duration,
                            delay: star.delay,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute h-20 w-px bg-gradient-to-b from-transparent via-primary-500/50 to-transparent"
                    />
                ))}
            </div>

            {/* Radial Glow */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-medium mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    Disponible pour de nouveaux défis
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-6 font-display"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    AI Engineer & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                        Data Scientist
                    </span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Je conçois des architectures d&apos;intelligence artificielle sophistiquées et transforme les données en insights actionnables avec une rigueur mathématique et une excellence en ingénierie.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        href="/projects"
                        className="px-8 py-4 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 w-full sm:w-auto text-center"
                    >
                        Explorer mes Projets
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all backdrop-blur-sm w-full sm:w-auto text-center"
                    >
                        Me contacter
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
        </section>
    )
}
