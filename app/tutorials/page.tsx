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
            <main className="min-h-screen pt-40 pb-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-display">
                            Centre d&apos;<span className="text-primary-500">Apprentissage</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
                            Maîtrisez les outils et techniques de l&apos;IA avec des guides structurés par thématiques expertes.
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
