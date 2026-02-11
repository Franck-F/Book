import { getProjects } from '@/lib/mdx';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import FolderCard from '@/components/projects/FolderCard';
import { Code2, Globe, Cpu } from 'lucide-react';

export const metadata = {
    title: 'Projets | AI Engineer',
    description: 'Découvrez mes projets en Intelligence Artificielle et Data Science.',
};

export default function ProjectsPage() {
    const projects = getProjects();

    // Group projects by category
    const categories = [
        {
            name: 'Intelligence Artificielle',
            slug: 'ia',
            icon: <Cpu className="w-6 h-6 text-primary-400" />,
            color: 'primary',
        },
        {
            name: 'Machine Learning & DL',
            slug: 'ml',
            icon: <Code2 className="w-6 h-6 text-accent-400" />,
            color: 'accent',
        },
        {
            name: 'Data Science & Analytics',
            slug: 'ds',
            icon: <Globe className="w-6 h-6 text-green-400" />,
            color: 'green',
        },
    ];

    const projectsByCategory = categories.map((category) => ({
        ...category,
        projects: projects.filter((p) => p.category === category.slug),
    })).filter((cat) => cat.projects.length > 0);

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-40 pb-20 mesh-bg overflow-hidden relative">
                {/* Background Mesh Animation */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-mesh bg-[length:50px_50px] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-24 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            Ingénierie de Point
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold mb-8 text-white font-display tracking-tight">
                            Nexus- <span className="text-primary-500">Projets</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-sans leading-relaxed">
                            Exploration de l&apos;ingénierie des données, du deep learning et du déploiement de solutions d&apos;IA éthiques au sein d&apos;un écosystème modulaire.
                        </p>
                    </div>

                    {/* 3D Folder Categories */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {projectsByCategory.map((category) => (
                            <FolderCard
                                key={category.slug}
                                category={category.name}
                                projects={category.projects}
                                icon={category.icon}
                                color={category.color}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {projects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">
                                Aucun projet pour le moment. Revenez bientôt !
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
