import Link from 'next/link';
import { getProjects } from '@/lib/mdx';
import ProjectCard from '@/components/projects/ProjectCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
    const projects = getProjects();
    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-[family-name:var(--font-outfit)]">
                        Projets Phares
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Découvrez une sélection de mes meilleurs projets
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredProjects.map((project) => (
                        <div key={project.slug} className="animate-slide-up">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                <div className="text-center animate-fade-in">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 glass-hover rounded-lg font-semibold transition-all duration-300 group"
                    >
                        Voir tous les projets
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
