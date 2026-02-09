'use client';

import { motion } from 'framer-motion';
import { Code2, Zap, Globe, Database, Boxes, Search } from 'lucide-react';

const skills = [
    {
        icon: Database,
        title: 'Data Analysis',
        description: 'Exploration, Visualisation, SQL, Pandas, Polars, Insights',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/30',
        iconColor: 'text-blue-400',
    },
    {
        icon: Code2,
        title: 'Data Science',
        description: 'Machine Learning, Scikit-learn, XGBoost, Statistiques, Feature Engineering',
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/30',
        iconColor: 'text-green-400',
    },
    {
        icon: Zap,
        title: 'Intelligence Artificielle',
        description: 'Deep Learning, PyTorch, LLMs, Computer Vision, RAG',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
        iconColor: 'text-purple-400',
    },
    {
        icon: Boxes,
        title: 'Data Engineering',
        description: 'ETL, Pipelines, DVC, MLOps, Déploiement Cloud',
        color: 'from-orange-500/20 to-red-500/20',
        borderColor: 'border-orange-500/30',
        iconColor: 'text-orange-400',
    },
    {
        icon: Search,
        title: 'AI Ethics & Fairness',
        description: 'Biais algorithmiques, Interprétabilité, Audit IA',
        color: 'from-yellow-500/20 to-amber-500/20',
        borderColor: 'border-yellow-500/30',
        iconColor: 'text-yellow-400',
    },
    {
        icon: Globe,
        title: 'Solutions Bio/Santé',
        description: 'Imagerie médicale, Analyse génomique, Prédiction clinique',
        color: 'from-indigo-500/20 to-violet-500/20',
        borderColor: 'border-indigo-500/30',
        iconColor: 'text-indigo-400',
    },
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-32 px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text font-[family-name:var(--font-outfit)]">
                        Compétences & Expertise
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Une expertise de pointe pour transformer la donnée brute en intelligence actionnable.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className={`glass-hover rounded-lg p-6 border ${skill.borderColor} h-full`}>
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} border ${skill.borderColor} inline-block mb-4 group-hover:scale-110 transition-transform`}>
                                    <skill.icon className={`w-6 h-6 ${skill.iconColor}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">
                                    {skill.title}
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    {skill.description}
                                </p>
                            </div>

                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity -z-10`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
