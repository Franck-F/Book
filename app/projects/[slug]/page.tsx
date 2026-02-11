import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentBySlug, getProjects } from '@/lib/mdx';
import { ProjectMetadata } from '@/lib/content-types';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Calendar, Github, Globe, ChevronLeft, Binary, Cpu, Layers } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import MarkdownRenderer from '@/components/mdx/MarkdownRenderer';
import TutorialActions from '@/components/tutorials/TutorialActions';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const projects = getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getContentBySlug<ProjectMetadata>('projects', slug);
    if (!project) return {};

    return {
        title: `${project.metadata.title} | Projet IA`,
        description: project.metadata.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getContentBySlug<ProjectMetadata>('projects', slug);

    if (!project) {
        notFound();
    }

    const { metadata, content } = project;

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
                            href="/projects"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm"
                        >
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-wider">Archives</span>
                        </Link>

                        <TutorialActions title={metadata.title} slug={slug} />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Project Dossier Header */}
                        <div className="relative mb-16">
                            <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-primary-500 to-transparent rounded-full hidden md:block" />

                            <div className="mb-6 flex items-center gap-3">
                                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border border-primary-500/20">
                                    Project Dossier // {metadata.category.toUpperCase()}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 font-display tracking-tight leading-tight">
                                {metadata.title}
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/5 mb-12">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary-500/30 transition-colors">
                                        <Calendar size={20} className="text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Date Entrée</p>
                                        <p className="text-white font-medium">{formatDate(metadata.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary-500/30 transition-colors">
                                        <Layers size={20} className="text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Classification</p>
                                        <p className="text-white font-medium">{metadata.category === 'ia' ? 'Intelligence Artificielle' : metadata.category === 'ml' ? 'Machine Learning' : 'Data Science'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary-500/30 transition-colors">
                                        <Binary size={20} className="text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Statut</p>
                                        <div className="flex items-center gap-1.5 text-green-400 font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            DÉPLOYÉ
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {metadata.github && (
                                    <a
                                        href={metadata.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-8 py-4 glass-premium hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all group"
                                    >
                                        <Github size={20} className="group-hover:scale-110 transition-transform" />
                                        <span className="font-bold tracking-tight">Accéder au Code</span>
                                    </a>
                                )}
                                {metadata.demo && (
                                    <a
                                        href={metadata.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-2xl text-white transition-all shadow-xl shadow-primary-500/25 group"
                                    >
                                        <Globe size={20} className="group-hover:rotate-12 transition-transform" />
                                        <span className="font-bold tracking-tight">Voir la Démo</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Technologies Module */}
                        <div className="mb-20 glass-premium border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Cpu size={120} />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-display uppercase tracking-widest">
                                    <Binary size={18} className="text-primary-400" />
                                    Stack Technologique
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {metadata.technologies.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-sm font-medium hover:text-white hover:border-primary-500/30 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content Module */}
                        <div className="article-body relative px-4 md:px-0">
                            <MarkdownRenderer content={content} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
