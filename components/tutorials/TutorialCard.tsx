import Link from 'next/link';
import Image from 'next/image';
import { TutorialMetadata } from '@/lib/content-types';
import { Clock, BarChart3 } from 'lucide-react';

interface TutorialCardProps {
    tutorial: TutorialMetadata;
}

const difficultyColors = {
    'Débutant': 'bg-green-500/10 text-green-300 border-green-500/20',
    'Intermédiaire': 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
    'Avancé': 'bg-red-500/10 text-red-300 border-red-500/20',
};

export default function TutorialCard({ tutorial }: TutorialCardProps) {
    return (
        <Link href={`/tutorials/${tutorial.slug}`}>
            <article className="glass-hover rounded-lg overflow-hidden h-full flex flex-col group">
                {/* Featured Image */}
                {tutorial.image && (
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                        <Image
                            src={tutorial.image}
                            alt={tutorial.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Meta Badges */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                        <span className={`px-3 py-1 text-xs rounded-full border ${difficultyColors[tutorial.difficulty]}`}>
                            {tutorial.difficulty}
                        </span>
                        <span className="px-3 py-1 text-xs bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20">
                            {tutorial.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors font-[family-name:var(--font-outfit)]">
                        {tutorial.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-400 mb-4 line-clamp-3 flex-1">
                        {tutorial.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tutorial.technologies.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded"
                            >
                                {tech}
                            </span>
                        ))}
                        {tutorial.technologies.length > 3 && (
                            <span className="px-2 py-1 text-xs text-slate-500">
                                +{tutorial.technologies.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            <span>{tutorial.difficulty}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
