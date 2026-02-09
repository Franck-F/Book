'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, User, Send, Calendar, Instagram, Linkedin, Github } from 'lucide-react'
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
        // In a real scenario, this would call an API route or a service like EmailJS/Resend
        setTimeout(() => {
            console.log('Form submitted:', formData)
            setStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-950 pt-40 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-display">
                            Parlons de votre <span className="text-primary-500">Projet</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
                            Que vous ayez une question ou une opportunité de collaboration, je suis à votre écoute.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="glass border border-white/10 rounded-2xl p-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2 font-display">
                                <MessageSquare className="text-primary-400" />
                                Envoyez un message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                            <User size={14} /> Nom Complet
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                            <Mail size={14} /> Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Sujet</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                        placeholder="Comment puis-je vous aider ?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                                        placeholder="Détails de votre demande..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${status === 'success'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                        }`}
                                >
                                    {status === 'sending' ? (
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                    ) : status === 'success' ? (
                                        'Message Envoyé !'
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Envoyer
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-center text-sm">Une erreur est survenue. Veuillez réessayer.</p>
                                )}
                            </form>
                        </motion.div>

                        {/* Calendly & Contact Info */}
                        <div className="space-y-8">
                            {/* Calendly Teaser */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="glass border border-white/10 rounded-2xl p-8 bg-gradient-to-br from-primary-500/10 to-transparent"
                            >
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 font-display">
                                    <Calendar className="text-primary-400" />
                                    Réserver un appel
                                </h3>
                                <p className="text-slate-400 mb-6">
                                    Besoin d&apos;un échange direct ? Choisissez un créneau qui vous convient pour un appel de 30 minutes.
                                </p>
                                <a
                                    href="https://calendly.com/franckfambou/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-full font-bold hover:scale-105 transition-transform"
                                >
                                    Planifier avec Calendly
                                </a>
                            </motion.div>

                            {/* Social Presence */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="glass border border-white/10 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-bold text-white mb-6 font-display">Retrouvez-moi sur</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href="mailto:franckfambou@gmail.com"
                                        className="flex items-center gap-3 p-4 rounded-xl glass-hover border border-white/5 text-slate-400 hover:text-white transition-all"
                                    >
                                        <Mail size={20} className="text-primary-400" />
                                        <span>Email</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/franck-fambou-092983204/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 rounded-xl glass-hover border border-white/5 text-slate-400 hover:text-white transition-all"
                                    >
                                        <Linkedin size={20} className="text-blue-400" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a
                                        href="https://instagram.com/callme_franck"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 rounded-xl glass-hover border border-white/5 text-slate-400 hover:text-white transition-all"
                                    >
                                        <Instagram size={20} className="text-pink-400" />
                                        <span>Instagram</span>
                                    </a>
                                    <a
                                        href="https://github.com/Franck-F"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 rounded-xl glass-hover border border-white/5 text-slate-400 hover:text-white transition-all"
                                    >
                                        <Github size={20} className="text-white" />
                                        <span>GitHub</span>
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
