'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function LandingContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <section id="contact" className="py-32 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text font-[family-name:var(--font-outfit)]">
                        Travaillons Ensemble
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Intéressé par une collaboration, discuter de tech, ou simplement dire bonjour ?
                        Envoyez-moi un message ci-dessous !
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass rounded-lg p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                placeholder="Votre nom"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                Message
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                                    placeholder="Votre message..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            Envoyer le Message
                        </button>
                    </form>
                </motion.div>

                {/* Alternative Contact Methods */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-400 mb-4">Ou contactez-moi directement :</p>
                    <a
                        href="mailto:contact@franck.dev"
                        className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
                    >
                        contact@franck.dev
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
