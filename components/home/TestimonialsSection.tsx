'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Marie Dubois',
        role: 'CEO, TechStart',
        content: 'Franck a transformé notre vision en une application web exceptionnelle. Son expertise technique et son sens du design ont dépassé nos attentes.',
        avatar: '👩‍💼',
    },
    {
        name: 'Thomas Martin',
        role: 'CTO, InnovateLab',
        content: 'Un développeur talentueux qui comprend parfaitement les enjeux business. Code propre, livraison dans les délais, communication excellente.',
        avatar: '👨‍💻',
    },
    {
        name: 'Sophie Laurent',
        role: 'Product Manager, DigitalCo',
        content: 'Collaboration fluide et résultats impressionnants. Franck apporte des solutions créatives à chaque défi technique rencontré.',
        avatar: '👩‍🎨',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-32 px-4 bg-black/20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text font-[family-name:var(--font-outfit)]">
                        Ce qu'ils disent
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Retours de clients et collaborateurs satisfaits
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="glass-hover rounded-lg p-8 relative group"
                        >
                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-primary-400/20 absolute top-6 right-6" />

                            {/* Content */}
                            <div className="relative">
                                <p className="text-slate-300 mb-6 italic leading-relaxed">
                                    "{testimonial.content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-2xl border border-primary-500/30">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold font-[family-name:var(--font-outfit)]">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
