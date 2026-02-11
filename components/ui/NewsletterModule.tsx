"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2, Mail, Zap, Binary } from "lucide-react"

export default function NewsletterModule() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const BEEHIIV_PUB_ID = "9c185407-f087-4961-96e1-1828ca13fdc7"

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        setStatus('loading')

        // Wait for a small animation delay to make it feel high-tech
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Success state
        setStatus('success')

        // Submit via native form for Beehiiv reliability
        target.submit()
    }

    return (
        <section className="relative py-20 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative group"
                >
                    {/* Animated Border Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

                    <div className="relative glass-premium border border-white/10 rounded-3xl p-8 md:p-16 overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                            <Binary size={180} />
                        </div>
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                                    <Zap size={10} className="fill-current" />
                                    Transmission Hebdomadaire
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
                                    Abonnez-vous au <span className="text-primary-500">Lab</span>
                                </h2>
                                <p className="text-lg text-slate-400 leading-relaxed font-sans">
                                    Recevez des analyses exclusives sur l&apos;IA, des tutoriels techniques et les coulisses de mes recherches directement dans votre flux.
                                </p>
                            </div>

                            <div className="w-full md:w-80">
                                <form
                                    action="https://www.beehiiv.com/new-subscription"
                                    method="post"
                                    target="newsletter-beehiiv-frame"
                                    onSubmit={handleSubscribe}
                                    className="space-y-4"
                                >
                                    <input type="hidden" name="publication_id" value={BEEHIIV_PUB_ID} />

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="votre@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-5 pl-12 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all font-sans"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all relative overflow-hidden group/btn ${status === 'success' ? 'bg-green-500' : 'bg-primary-500 hover:bg-primary-600'
                                            } text-white shadow-2xl shadow-primary-500/20`}
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                        {status === 'loading' ? (
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : status === 'success' ? (
                                            <CheckCircle2 size={24} />
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <span>S&apos;abonner</span>
                                                <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                            </div>
                                        )}
                                    </button>

                                    <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
                                        Data-Secure // Pas de spam
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Hidden iframe for silent submission */}
                <iframe name="newsletter-beehiiv-frame" title="Newsletter Subscription" className="hidden" />
            </div>
        </section>
    )
}
