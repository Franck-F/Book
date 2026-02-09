import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import SkillsSection from '@/components/home/SkillsSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';

export const metadata = {
    title: 'Portfolio | Franck - AI Engineer',
    description: 'Expert en Intelligence Artificielle et Data Science.',
};

export default function PortfolioPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-950 pt-40">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display">
                            Mon Univers <span className="text-primary-500">Data - IA</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto font-sans">
                            De l&apos;analyse exploratoire au déploiement de modèles complexes, découvrez mon expertise.
                        </p>
                    </div>

                    <SkillsSection />
                    <FeaturedProjects />
                </div>
            </main>
            <Footer />
        </>
    );
}
