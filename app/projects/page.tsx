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
            <main className="min-h-screen pt-40 pb-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-display">
                            Mes Projets <span className="text-primary-500">IA</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
                            Exploration de l&apos;ingénierie des données, du deep learning et du déploiement de solutions d&apos;IA éthiques.
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
