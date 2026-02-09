import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentBySlug, getBlogPosts } from '@/lib/mdx';
import { BlogMetadata } from '@/lib/content-types';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Calendar, Clock, ChevronLeft, User, ArrowRight } from 'lucide-react';
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
            <main className="min-h-screen bg-slate-950 pt-40 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Revenir au blog
                        </Link>

                        <TutorialActions title={metadata.title} slug={slug} />
                    </div>

                    <article className="max-w-4xl mx-auto">
                        <header className="mb-16">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-500/20">
                                    {metadata.category}
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
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Auteur</p>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <User size={16} className="text-primary-400" />
                                        <span>Franck F.</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Date</p>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Calendar size={16} className="text-primary-400" />
                                        <span>{formatDate(metadata.date)}</span>
                                    </div>
                                </div>
                                {metadata.readingTime && (
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Temps de lecture</p>
                                        <div className="flex items-center gap-2 text-white font-medium">
                                            <Clock size={16} className="text-primary-400" />
                                            <span>{metadata.readingTime} min</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </header>

                        <div className="article-body">
                            <MarkdownRenderer content={content} />
                        </div>

                        {metadata.tags && (
                            <footer className="mt-24 pt-8 border-t border-white/10">
                                <div className="flex flex-wrap gap-2">
                                    {metadata.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 bg-white/5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </footer>
                        )}

                        {/* Footer / CTA */}
                        <div className="mt-24 p-12 rounded-3xl bg-gradient-to-br from-primary-500/10 to-transparent border border-white/10 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Besoin d&apos;expertise technique ?</h3>
                                <p className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed">
                                    Mes articles explorent les dernières tendances. Collaborons pour transformer ces idées en solutions concrètes pour votre entreprise.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold transition-all shadow-xl shadow-primary-500/20 group"
                                >
                                    Faire équipe
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
