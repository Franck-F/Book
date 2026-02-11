'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProjectMetadata } from '@/lib/content-types';
import { ExternalLink, Github } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface ProjectCardProps {
    project: ProjectMetadata;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for 3D parallax and glow
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleCardClick = () => {
        router.push(`/projects/${project.slug}`);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            onClick={handleCardClick}
            className="group relative glass-premium rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(14,165,233,0.1)]"
        >
            {/* Interactive Glow Overlay */}
            <motion.div
                style={{
                    background: useTransform(
                        [mouseXSpring, mouseYSpring],
                        ([mx, my]) => `radial-gradient(600px circle at ${(mx as number + 0.5) * 100}% ${(my as number + 0.5) * 100}%, rgba(14, 165, 233, 0.15), transparent 40%)`
                    ),
                }}
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Project Image Container */}
            <div className="relative h-56 overflow-hidden bg-slate-900/50" style={{ transform: "translateZ(20px)" }}>
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center gradient-text text-6xl font-bold opacity-20">
                        {project.title.charAt(0)}
                    </div>
                )}
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col relative z-20" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors font-display tracking-tight">
                        {project.title}
                    </h3>
                    {project.featured && (
                        <div className="relative">
                            <span className="absolute inset-0 blur-md bg-accent-500/50 rounded-full" />
                            <span className="relative px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-accent-500/20 text-accent-300 rounded-full border border-accent-500/30">
                                Data - AI
                            </span>
                        </div>
                    )}
                </div>

                <p className="text-slate-400 mb-6 line-clamp-3 flex-1 text-sm leading-relaxed">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-[10px] font-medium bg-primary-500/5 text-primary-300 rounded-lg border border-primary-500/10 backdrop-blur-sm"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="text-[10px] text-slate-500 font-medium self-center ml-1">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <div className="flex gap-4">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                title="Voir le code"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                title="Voir la démo"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-xs font-bold text-primary-400 flex items-center gap-1"
                    >
                        Détails <ExternalLink className="w-3 h-3" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
