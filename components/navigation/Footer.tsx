"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Instagram, Calendar } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Github, href: "https://github.com/Franck-F", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/franck-fambou-092983204/", label: "LinkedIn" },
        { icon: Mail, href: "mailto:franckfambou@gmail.com", label: "Email" },
        { icon: Instagram, href: "https://instagram.com/callme_franck", label: "Instagram" },
        { icon: Calendar, href: "https://calendly.com/franckfambou/30min", label: "Calendly" },
    ]

    const navLinks = [
        { name: "Accueil", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Projets", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <footer className="relative bg-slate-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center">
                    {/* Circular Branding */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 rounded-full border-2 border-primary-500/30 flex items-center justify-center mb-8 relative group"
                    >
                        <div className="absolute inset-0 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-all duration-500 blur-md" />
                        <span className="text-2xl font-bold text-white relative z-10 font-display">FF</span>
                    </motion.div>

                    {/* Stacked Links */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-slate-400 hover:text-white transition-colors font-medium relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-6 mb-12">
                        {socialLinks.map((social, idx) => {
                            const Icon = social.icon
                            return (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Role and Copyright */}
                    <div className="text-center">
                        <h3 className="text-white font-display font-semibold text-lg mb-2">
                            Franck | AI Engineer & Data Scientist
                        </h3>
                        <p className="text-slate-500 text-sm">
                            &copy; {currentYear} Tous droits réservés. Propulsé par l&apos;innovation.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
