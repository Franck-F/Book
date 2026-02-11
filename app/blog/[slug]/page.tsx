import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentBySlug, getBlogPosts } from '@/lib/mdx';
import { BlogMetadata } from '@/lib/content-types';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Calendar, Clock, ChevronLeft, User, ArrowRight, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import MarkdownRenderer from '@/components/mdx/MarkdownRenderer';
import TutorialActions from '@/components/tutorials/TutorialActions';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getContentBySlug<BlogMetadata>('blog', slug);
    if (!post) return {};

    return {
        title: `${post.metadata.title} | Blog IA`,
        description: post.metadata.description,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getContentBySlug<BlogMetadata>('blog', slug);

    if (!post) {
        notFound();
    }

    const { metadata, content } = post;

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
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm"
                        >
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-wider">Index du Blog</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-400 hover:text-primary-400 transition-colors" aria-label="Partager cet article">
                                <Share2 size={20} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-primary-400 transition-colors" aria-label="Enregistrer pour plus tard">
                                <Bookmark size={20} />
                            </button>
                            <TutorialActions title={metadata.title} slug={slug} />
                        </div>
                    </div>

                    <article className="max-w-4xl mx-auto">
                        <header className="mb-20">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border border-primary-500/20">
                                    Research Archive // {metadata.category.toUpperCase()}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-8xl font-bold text-white mb-10 font-display leading-[1.05] tracking-tight">
                                {metadata.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 mb-12 font-sans leading-relaxed max-w-3xl">
                                {metadata.description}
                            </p>

                            <div className="flex flex-wrap gap-8 py-10 border-y border-white/5">
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Auteur Principal</p>
                                    <div className="flex items-center gap-3 text-white font-medium">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-[1px]">
                                            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                                                <User size={14} className="text-primary-400" />
                                            </div>
                                        </div>
                                        <span>Franck F.</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Horodatage</p>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Calendar size={18} className="text-primary-400" />
                                        <span>{formatDate(metadata.date)}</span>
                                    </div>
                                </div>
                                {metadata.readingTime && (
                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Charge Cognitive</p>
                                        <div className="flex items-center gap-2 text-white font-medium">
                                            <Clock size={18} className="text-primary-400" />
                                            <span>{metadata.readingTime} min de lecture</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </header>

                        <div className="article-body relative px-4 md:px-0 mb-20">
                            <MarkdownRenderer content={content} />
                        </div>

                        {metadata.tags && (
                            <footer className="mt-20 pt-10 border-t border-white/5">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-6">Mots-Clés Indexés</p>
                                <div className="flex flex-wrap gap-2">
                                    {metadata.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 bg-white/5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 hover:border-primary-500/30 transition-all cursor-pointer border border-white/5"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </footer>
                        )}

                        {/* High-Tech CTA */}
                        <div className="mt-24 p-1 md:p-12 rounded-[2rem] bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/5 border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 mesh-bg opacity-10 pointer-events-none" />
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full group-hover:bg-primary-500/20 transition-all duration-700" />

                            <div className="relative z-10 p-8 md:p-0">
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 font-display tracking-tight">Besoin d&apos;expertise technique ?</h3>
                                <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                                    Explorons ensemble comment ces technologies peuvent transformer vos défis en avantages compétitifs.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold transition-all shadow-2xl shadow-primary-500/30 group"
                                >
                                    Démarrer une Collaboration
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
