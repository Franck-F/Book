'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProjectMetadata } from '@/lib/content-types';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
    project: ProjectMetadata;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/projects/${project.slug}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="glass-hover rounded-lg overflow-hidden h-full flex flex-col group cursor-pointer"
        >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden bg-slate-800">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center gradient-text text-6xl font-bold">
                        {project.title.charAt(0)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors font-[family-name:var(--font-outfit)]">
                        {project.title}
                    </h3>
                    {project.featured && (
                        <span className="px-2 py-1 text-xs bg-accent-500/20 text-accent-300 rounded-full border border-accent-500/30">
                            Phare
                        </span>
                    )}
                </div>

                <p className="text-slate-400 mb-4 line-clamp-3 flex-1">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-3 py-1 text-xs text-slate-500">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            Code
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
