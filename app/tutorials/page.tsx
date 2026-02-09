import { getTutorials } from '@/lib/mdx';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import CategorizedFolder from '@/components/ui/CategorizedFolder';
import { Zap, Boxes, FlaskConical } from 'lucide-react';

export const metadata = {
    title: 'Tutoriels | Apprentissage Data & IA',
    description: 'Guides pratiques pour maîtriser l\'écosystème moderne de l\'IA et de la Data Science.',
};

export default function TutorialsPage() {
    const tutorials = getTutorials();

    const difficulties = [
        {
            name: 'Débutant',
            icon: <Zap className="w-6 h-6 text-green-400" />,
            color: 'green' as const,
        },
        {
            name: 'Intermédiaire',
            icon: <Boxes className="w-6 h-6 text-primary-400" />,
            color: 'primary' as const,
        },
        {
            name: 'Avancé',
            icon: <FlaskConical className="w-6 h-6 text-accent-400" />,
            color: 'accent' as const,
        },
    ];

    const tutorialsByDifficulty = difficulties.map((diff) => ({
        ...diff,
        items: tutorials.filter((t) => t.difficulty === diff.name),
    })).filter((diff) => diff.items.length > 0);

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
                            Maîtrisez les outils et techniques de l&apos;IA avec des guides structurés par niveau de complexité.
                        </p>
                    </div>

                    {/* Categorized Folders */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {tutorialsByDifficulty.map((difficulty) => (
                            <CategorizedFolder
                                key={difficulty.name}
                                title={difficulty.name}
                                items={difficulty.items}
                                icon={difficulty.icon}
                                color={difficulty.color}
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
