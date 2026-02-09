import Link from 'next/link';
import Image from 'next/image';
import { BlogMetadata } from '@/lib/content-types';
import { Calendar, Clock, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
    post: BlogMetadata;
}

export default function ArticleCard({ post }: ArticleCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="glass-hover rounded-lg overflow-hidden h-full flex flex-col group">
                {/* Featured Image */}
                {post.image && (
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Category */}
                    <div className="mb-3">
                        <span className="px-3 py-1 text-xs bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20">
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors font-[family-name:var(--font-outfit)]">
                        {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-400 mb-4 line-clamp-3 flex-1">
                        {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                        </div>
                        {post.readingTime && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} min</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-4 flex-wrap">
                            <Tag className="w-4 h-4 text-slate-500" />
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-slate-500 hover:text-accent-400 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
