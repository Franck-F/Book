import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentBySlug, getProjects } from '@/lib/mdx';
import { ProjectMetadata } from '@/lib/content-types';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Calendar, Github, Globe, ChevronLeft, ArrowRight } from 'lucide-react';
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
            <main className="min-h-screen bg-slate-950 pt-40 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Revenir aux projets
                        </Link>

                        <TutorialActions title={metadata.title} slug={slug} />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
                                {metadata.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-slate-400 mb-8">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>{formatDate(metadata.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm border border-primary-500/20">
                                        {metadata.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {metadata.github && (
                                    <a
                                        href={metadata.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all shadow-lg"
                                    >
                                        <Github size={20} />
                                        Code Source
                                    </a>
                                )}
                                {metadata.demo && (
                                    <a
                                        href={metadata.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-full text-white transition-all shadow-lg shadow-primary-500/25"
                                    >
                                        <Globe size={20} />
                                        Démo Live
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-12">
                            <h2 className="text-xl font-semibold text-white mb-4">Technologies utilisées</h2>
                            <div className="flex flex-wrap gap-2">
                                {metadata.technologies.map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 bg-slate-900 border border-white/5 rounded-lg text-slate-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="article-body">
                            <MarkdownRenderer content={content} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
