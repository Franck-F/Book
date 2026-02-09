"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
    defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Accueil" }: NavBarProps) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>(defaultActive)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Sync active tab with pathname
    useEffect(() => {
        const currentItem = items.find(item => item.url === pathname)
        if (currentItem) {
            setActiveTab(currentItem.name)
        }
    }, [pathname, items])

    if (!mounted) return null

    return (
        <div className={cn("fixed top-5 left-0 right-0 z-[9999]", className)}>
            <div className="flex justify-center pt-6 px-4">
                <motion.div
                    className="flex items-center gap-1 md:gap-3 bg-slate-950/50 border border-white/10 backdrop-blur-xl py-2 px-2 rounded-full shadow-2xl relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.name
                        const isHovered = hoveredTab === item.name

                        return (
                            <Link
                                key={item.name}
                                href={item.url}
                                onMouseEnter={() => setHoveredTab(item.name)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={cn(
                                    "relative cursor-pointer text-xs md:text-sm font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300",
                                    "text-white/70 hover:text-white",
                                    isActive && "text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                        layoutId="navbar-active-bg"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0.3, 0.5, 0.3],
                                            scale: [1, 1.03, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-primary-500/25 rounded-full blur-md" />
                                        <div className="absolute inset-[-4px] bg-primary-500/20 rounded-full blur-xl" />
                                    </motion.div>
                                )}

                                <span className="hidden md:inline relative z-10">
                                    {item.name}
                                </span>
                                <span className="md:hidden relative z-10 flex items-center justify-center">
                                    <Icon size={20} strokeWidth={2.5} />
                                </span>

                                <AnimatePresence>
                                    {isHovered && !isActive && (
                                        <motion.div
                                            layoutId="navbar-hover-bg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                        />
                                    )}
                                </AnimatePresence>

                                {isActive && (
                                    <motion.div
                                        layoutId="anime-mascot"
                                        className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    >
                                        <div className="relative w-12 h-12">
                                            <motion.div
                                                className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2 border border-slate-200"
                                                animate={
                                                    hoveredTab ? {
                                                        scale: [1, 1.1, 1],
                                                        rotate: [0, -5, 5, 0],
                                                        transition: {
                                                            duration: 0.5,
                                                            ease: "easeInOut"
                                                        }
                                                    } : {
                                                        y: [0, -3, 0],
                                                        transition: {
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }
                                                    }
                                                }
                                            >
                                                {/* Eyes */}
                                                <motion.div
                                                    className="absolute w-2 h-2 bg-black rounded-full"
                                                    style={{ left: '25%', top: '40%' }}
                                                />
                                                <motion.div
                                                    className="absolute w-2 h-2 bg-black rounded-full"
                                                    style={{ right: '25%', top: '40%' }}
                                                />
                                                {/* Cheeks */}
                                                <div className="absolute w-2 h-1.5 bg-pink-200 rounded-full left-[15%] top-[55%] opacity-60" />
                                                <div className="absolute w-2 h-1.5 bg-pink-200 rounded-full right-[15%] top-[55%] opacity-60" />
                                                {/* Mouth */}
                                                <div className="absolute w-4 h-2 border-b-2 border-black rounded-full left-[30%] top-[60%]" />
                                            </motion.div>
                                            {/* Triangle Pointer */}
                                            <motion.div
                                                className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                                                animate={{ y: [0, 2, 0] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                <div className="w-full h-full bg-white rotate-45 transform origin-center border-r border-b border-slate-200" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </Link>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}
