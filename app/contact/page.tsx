'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, User, Send, Calendar, Instagram, Linkedin, Github, Shield, Zap, Terminal, ArrowRight } from 'lucide-react'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        // Simulating email sending logic
        setTimeout(() => {
            console.log('Form submitted:', formData)
            setStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })

            // Success reset
            setTimeout(() => setStatus('idle'), 5000)
        }, 1500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-40 pb-20 mesh-bg overflow-hidden relative">
                {/* Background Mesh Animation */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-mesh bg-[length:50px_50px] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    {/* Unique Cyber-Nexus Header */}
                    <div className="text-center mb-24 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            Uplink Direct : Établissement de Connexion
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold mb-8 text-white font-display tracking-tight">
                            Nexus- <span className="text-primary-500">Contact</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
                            Projet, collaboration ou simple échange technique : initiez une transmission sécurisée vers mon environnement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Technical Form Module */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur opacity-50" />
                            <div className="relative glass-premium border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Terminal size={120} />
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-3 font-display">
                                    <MessageSquare className="text-primary-400" />
                                    Terminal de Transmission
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold flex items-center gap-2">
                                                <User size={12} className="text-primary-400" /> Identité / Nom
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all placeholder:text-slate-700"
                                                placeholder="Saisissez votre nom..."
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold flex items-center gap-2">
                                                <Mail size={12} className="text-primary-400" /> Adresse de Réponse
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all placeholder:text-slate-700"
                                                placeholder="votre@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Objet du Protocol</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all placeholder:text-slate-700"
                                            placeholder="Quel est le sujet de votre message ?"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Données / Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all resize-none placeholder:text-slate-700"
                                            placeholder="Détaillez votre demande ici..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all relative overflow-hidden group ${status === 'success'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-primary-500 hover:bg-primary-600 text-white shadow-2xl shadow-primary-500/30'
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        {status === 'sending' ? (
                                            <div className="flex items-center gap-3">
                                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                <span>Chiffrement en cours...</span>
                                            </div>
                                        ) : status === 'success' ? (
                                            <div className="flex items-center gap-2">
                                                <Zap className="fill-current" size={20} />
                                                TRANSAMISSION RÉUSSIE
                                            </div>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Lancer la Transmission
                                            </>
                                        )}
                                    </button>

                                    {status === 'error' && (
                                        <p className="text-red-400 text-center text-xs font-bold uppercase tracking-widest">
                                            Érreur de connexion. Veuillez réessayer.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </motion.div>

                        {/* Connection Nodes Info */}
                        <div className="space-y-10">
                            {/* Scheduling Node */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="glass-premium border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary-500/30 transition-all duration-500"
                            >
                                <div className="absolute -right-4 -top-4 text-primary-500/5 group-hover:text-primary-500/10 transition-colors">
                                    <Calendar size={180} />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400">
                                            <Zap size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white font-display">Fast-Lane : Appel Vidéo</h3>
                                    </div>
                                    <p className="text-slate-400 mb-8 leading-relaxed">
                                        Besoin d&apos;une réponse immédiate ou d&apos;un briefing technique à haut débit ? Planifiez une session de 30 minutes directement dans mon calendrier opérationnel.
                                    </p>
                                    <a
                                        href="https://calendly.com/franckfambou/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <span>Ouvrir Calendly</span>
                                        <ArrowRight size={18} />
                                    </a>
                                </div>
                            </motion.div>

                            {/* Social Nodes Grid */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="glass-premium border border-white/5 rounded-3xl p-8"
                            >
                                <h3 className="text-sm font-bold text-slate-500 mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
                                    <Shield size={16} className="text-primary-400" />
                                    Autres Noeuds de Présence
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href="mailto:franckfambou@gmail.com"
                                        className="flex flex-col gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/30 hover:bg-white/10 transition-all group"
                                    >
                                        <Mail size={24} className="text-primary-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">Mail Direct</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/franck-fambou-092983204/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all group"
                                    >
                                        <Linkedin size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">LinkedIn</span>
                                    </a>
                                    <a
                                        href="https://instagram.com/callme_franck"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/30 hover:bg-white/10 transition-all group"
                                    >
                                        <Instagram size={24} className="text-pink-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">Instagram</span>
                                    </a>
                                    <a
                                        href="https://github.com/Franck-F"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/30 hover:bg-white/10 transition-all group"
                                    >
                                        <Github size={24} className="text-white group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">GitHub</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
