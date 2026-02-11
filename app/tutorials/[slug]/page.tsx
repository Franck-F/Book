import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentBySlug, getTutorials } from '@/lib/mdx';
import { TutorialMetadata } from '@/lib/content-types';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Calendar, Clock, ChevronLeft, ArrowRight, Binary, GraduationCap, Cpu } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import MarkdownRenderer from '@/components/mdx/MarkdownRenderer';
import TutorialActions from '@/components/tutorials/TutorialActions';

interface TutorialPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const tutorials = getTutorials();
    return tutorials.map((tutorial) => ({
        slug: tutorial.slug,
    }));
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tutorial = getContentBySlug<TutorialMetadata>('tutorials', slug);
    if (!tutorial) return {};

    return {
        title: `${tutorial.metadata.title} | Tutoriel AI Pro`,
        description: tutorial.metadata.description,
    };
}

export default async function TutorialPage({ params }: TutorialPageProps) {
    const { slug } = await params;
    const tutorial = getContentBySlug<TutorialMetadata>('tutorials', slug);

    if (!tutorial) {
        notFound();
    }

    const { metadata, content } = tutorial;

    const difficultyStyles = {
        'Débutant': 'text-green-400 bg-green-500/10 border-green-500/20',
        'Intermédiaire': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
        'Avancé': 'text-red-400 bg-red-500/10 border-red-500/20'
    }[metadata.difficulty];

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-40 pb-20 mesh-bg overflow-hidden relative">
                {/* Background Mesh Animation */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-mesh bg-[length:50px_50px] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumbs & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-16 max-w-5xl mx-auto">
                        <Link
                            href="/tutorials"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm"
                        >
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-wider">Base de Connaissances</span>
                        </Link>

                        <TutorialActions title={metadata.title} slug={slug} />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Training Module Header */}
                        <div className="relative mb-20">
                            <div className="absolute -left-4 top-0 w-1 h-32 bg-gradient-to-b from-primary-500 via-primary-500/50 to-transparent rounded-full hidden md:block" />

                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border border-primary-500/20">
                                    Training Module // {metadata.category.toUpperCase()}
                                </span>
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border ${difficultyStyles}`}>
                                    Niveaux: {metadata.difficulty}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-8xl font-bold text-white mb-10 font-display leading-[1.05] tracking-tight">
                                {metadata.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 mb-12 font-sans leading-relaxed max-w-3xl">
                                {metadata.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10 border-y border-white/5">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary-500/30 transition-all">
                                        <Calendar size={24} className="text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Indexation</p>
                                        <p className="text-white font-medium text-lg">{formatDate(metadata.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary-500/30 transition-all">
                                        <Clock size={24} className="text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Charge Temporelle</p>
                                        <p className="text-white font-medium text-lg">{metadata.duration || 'Variable'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Module */}
                        {metadata.technologies && metadata.technologies.length > 0 && (
                            <div className="mb-20 glass-premium border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                                    <Binary size={140} />
                                </div>
                                <div className="relative z-10">
                                    <h2 className="text-sm font-bold text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
                                        <Cpu size={16} className="text-primary-400" />
                                        Environnement Technique
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {metadata.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-sm font-medium hover:text-white hover:border-primary-500/30 transition-all cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Academic Content Module */}
                        <div className="article-body relative px-4 md:px-0 mb-20">
                            <MarkdownRenderer content={content} />
                        </div>

                        {/* Interactive Footer CTA */}
                        <div className="mt-24 p-1 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-primary-500/10 via-slate-950 to-accent-500/5 border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 mesh-bg opacity-10 pointer-events-none" />
                            <div className="absolute top-0 right-0 p-12 text-primary-500/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                                <GraduationCap size={200} />
                            </div>

                            <div className="relative z-10 p-8 md:p-0">
                                <h3 className="text-2xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight leading-tight">Prêt à passer à<br />la mise en œuvre ?</h3>
                                <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
                                    Ces connaissances sont une base solide. Passons à la vitesse supérieure en construisant ensemble votre prochaine infrastructure d&apos;IA.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-4 px-12 py-6 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold transition-all shadow-2xl shadow-primary-500/30 group"
                                >
                                    <span className="text-lg">Discuter de votre projet</span>
                                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
