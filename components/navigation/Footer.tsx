"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Instagram, Calendar, Send, CheckCircle2 } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStatus('success')
        setEmail("")
        setTimeout(() => setStatus('idle'), 5000)
    }

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

                    {/* Newsletter Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md mb-16"
                    >
                        <div className="glass p-8 rounded-3xl border border-primary-500/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 text-center">
                                <h4 className="text-xl font-bold text-white mb-2 font-display">Restez à la pointe de l&apos;IA</h4>
                                <p className="text-slate-400 text-sm mb-6">
                                    Recevez mes dernières analyses et tutoriels directement dans votre boîte mail.
                                </p>

                                <form onSubmit={handleSubscribe} className="relative flex items-center">
                                    <input
                                        type="email"
                                        placeholder="votre@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all font-sans"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className={`absolute right-2 p-3 rounded-full transition-all ${status === 'success'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                            }`}
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : status === 'success' ? (
                                            <CheckCircle2 size={20} />
                                        ) : (
                                            <Send size={20} />
                                        )}
                                    </button>
                                </form>

                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-green-400 text-xs mt-4 font-medium"
                                        >
                                            Merci ! Vous êtes maintenant inscrit à la newsletter.
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

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
                            Franck FAMBOU | AI Engineer & Data Scientist
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
