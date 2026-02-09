import { Metadata } from 'next';
import { StarfallHero } from '@/components/landing/StarfallHero';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata: Metadata = {
  title: 'Franck | AI Engineer & Data Scientist',
  description: 'AI Engineer & Data Scientist passionné par le machine learning, le deep learning et le déploiement de modèles à grande échelle.',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950">
        <StarfallHero />
        {/* Other sections will be added here */}
      </main>
      <Footer />
    </>
  );
}
