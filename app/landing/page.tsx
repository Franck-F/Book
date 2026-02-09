import { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingAbout from '@/components/landing/LandingAbout';
import LandingContact from '@/components/landing/LandingContact';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: 'Franck - Développeur Full-Stack',
    description: 'Je crée des expériences web élégantes et performantes avec React, TypeScript et les frameworks modernes.',
};

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <LandingHero />
                <LandingAbout />
                <LandingContact />
            </main>
            <Footer />
        </>
    );
}
