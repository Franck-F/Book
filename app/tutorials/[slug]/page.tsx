import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentBySlug, getTutorials } from '@/lib/mdx';
import { TutorialMetadata } from '@/lib/content-types';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Calendar, Clock, BarChart, ChevronLeft, ArrowRight } from 'lucide-react';
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

    const difficultyColor = {
        'Débutant': 'text-green-400 bg-green-500/10 border-green-500/20',
        'Intermédiaire': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
        'Avancé': 'text-red-400 bg-red-500/10 border-red-500/20'
    }[metadata.difficulty];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-950 pt-40 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
                        <Link
                            href="/tutorials"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Revenir à l'index
                        </Link>

                        <TutorialActions title={metadata.title} slug={slug} />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Header Section */}
                        <div className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-500/20">
                                    {metadata.category}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${difficultyColor || 'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>
                                    {metadata.difficulty}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 font-display leading-[1.1]">
                                {metadata.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 mb-10 font-sans leading-relaxed">
                                {metadata.description}
                            </p>

                            <div className="flex flex-wrap gap-8 py-8 border-y border-white/5">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Publié le</p>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Calendar size={16} className="text-primary-400" />
                                        <span>{formatDate(metadata.date)}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Durée estimée</p>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Clock size={16} className="text-primary-400" />
                                        <span>{metadata.duration || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Stack Technique</p>
                                    <div className="flex flex-wrap gap-2">
                                        {metadata.technologies?.map((tech) => (
                                            <span key={tech} className="text-slate-300 bg-white/5 px-2 py-0.5 rounded text-xs border border-white/10">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Educational Content */}
                        <div className="article-body">
                            <MarkdownRenderer content={content} />
                        </div>

                        {/* Footer / CTA */}
                        <div className="mt-24 p-12 rounded-3xl bg-gradient-to-br from-primary-500/10 to-transparent border border-white/10 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Besoin d&apos;un expert IA ?</h3>
                                <p className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed">
                                    Ces tutoriels ne sont que la pointe de l&apos;iceberg. Je peux vous accompagner dans l&apos;implémentation concrète de ces solutions pour votre entreprise.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold transition-all shadow-xl shadow-primary-500/20 group"
                                >
                                    Discuter de votre projet
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
