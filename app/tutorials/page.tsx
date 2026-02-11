import { getTutorials } from '@/lib/mdx';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import CategorizedFolder from '@/components/ui/CategorizedFolder';
import { Brain, Code2, Database, Terminal } from 'lucide-react';

export const metadata = {
    title: 'Tutoriels | Apprentissage Data & IA',
    description: 'Guides pratiques pour maîtriser l\'écosystème moderne de l\'IA et de la Data Science.',
};

export default function TutorialsPage() {
    const tutorials = getTutorials();

    // Group tutorials by topical category
    const categories = [
        {
            name: 'Architectures LLM & NLP',
            icon: <Brain className="w-6 h-6 text-primary-400" />,
            color: 'primary' as const,
        },
        {
            name: 'Deep Learning Foundations',
            icon: <Code2 className="w-6 h-6 text-accent-400" />,
            color: 'accent' as const,
        },
        {
            name: 'Infrastructure & IA Locale',
            icon: <Terminal className="w-6 h-6 text-purple-400" />,
            color: 'purple' as const,
        },
        {
            name: 'Data Engineering & Performance',
            icon: <Database className="w-6 h-6 text-green-400" />,
            color: 'green' as const,
        },
    ];

    const tutorialsByCategory = categories.map((cat) => ({
        ...cat,
        items: tutorials.filter((t: any) => t.category === cat.name),
    })).filter((cat) => cat.items.length > 0);

    // Dynamic grouping for any extra categories
    const extraCategories = tutorials
        .map(t => t.category)
        .filter(cat => cat && !categories.some(c => c.name === cat));

    const uniqueExtras = Array.from(new Set(extraCategories));

    uniqueExtras.forEach(extra => {
        tutorialsByCategory.push({
            name: extra || 'Autres',
            icon: <Code2 className="w-6 h-6 text-slate-400" />,
            color: 'primary' as const,
            items: tutorials.filter(t => t.category === extra)
        });
    });

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-40 pb-20 mesh-bg overflow-hidden relative">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-mesh bg-[length:50px_50px] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-24 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            Transfert de Savoir
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold mb-8 text-white font-display tracking-tight">
                            Nexus- <span className="text-primary-500">Tutorials</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-sans leading-relaxed">
                            Maîtrisez les outils et techniques de l&apos;IA moderne avec des guides structurés par thématiques expertes et déploiements réels.
                        </p>
                    </div>

                    {/* Categorized Folders */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {tutorialsByCategory.map((category) => (
                            <CategorizedFolder
                                key={category.name}
                                title={category.name}
                                items={category.items}
                                icon={category.icon}
                                color={category.color}
                                basePath="/tutorials"
                                type="tutorial"
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {tutorials.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">
                                Aucun tutoriel pour le moment. Revenez bientôt !
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
