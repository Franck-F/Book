import { getBlogPosts } from '@/lib/mdx';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import CategorizedFolder from '@/components/ui/CategorizedFolder';
import { Brain, Code2, Database } from 'lucide-react';

export const metadata = {
    title: 'Blog | AI Research & Insights',
    description: 'Exploration approfondie de l\'Intelligence Artificielle, de la Data Science et de l\'ingénierie moderne.',
};

export default function BlogPage() {
    const posts = getBlogPosts();

    // Group posts by category
    const categories = [
        {
            name: 'Intelligence Artificielle',
            icon: <Brain className="w-6 h-6 text-primary-400" />,
            color: 'primary' as const,
        },
        {
            name: 'Infrastructure IA',
            icon: <Code2 className="w-6 h-6 text-accent-400" />,
            color: 'accent' as const,
        },
        {
            name: 'Carrière & Tech',
            icon: <Database className="w-6 h-6 text-green-400" />,
            color: 'green' as const,
        },
        {
            name: 'Web Engineering',
            icon: <Code2 className="w-6 h-6 text-blue-400" />,
            color: 'blue' as const,
        },
        {
            name: 'Design System',
            icon: <Brain className="w-6 h-6 text-purple-400" />,
            color: 'purple' as const,
        }
    ];

    const postsByCategory = categories.map((cat) => ({
        ...cat,
        posts: posts.filter((p) => p.category === cat.name),
    })).filter((cat) => cat.posts.length > 0);

    // Any post that didn't fit in the categories?
    const otherPosts = posts.filter(p => !categories.some(c => c.name === p.category));
    if (otherPosts.length > 0) {
        postsByCategory.push({
            name: 'Divers',
            icon: <Code2 className="w-6 h-6 text-slate-400" />,
            color: 'primary' as const,
            posts: otherPosts
        });
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-40 pb-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-display">
                            Carnet de <span className="text-primary-500">Recherche</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
                            Analyses, réflexions et partages d&apos;expérience sur la frontière de l&apos;innovation technologique.
                        </p>
                    </div>

                    {/* Categorized Folders */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {postsByCategory.map((category) => (
                            <CategorizedFolder
                                key={category.name}
                                title={category.name}
                                items={category.posts}
                                icon={category.icon}
                                color={category.color}
                                basePath="/blog"
                                type="blog"
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {posts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">
                                Aucun article pour le moment. Revenez bientôt !
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
