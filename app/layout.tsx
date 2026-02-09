import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio & Blog | Franck",
    template: "%s | Franck",
  },
  description: "Modern portfolio showcasing projects, articles, and tutorials. Built with Next.js, TypeScript, and cutting-edge web technologies.",
  keywords: ["portfolio", "blog", "web development", "projects", "tutorials", "Next.js", "TypeScript"],
  authors: [{ name: "Franck" }],
  creator: "Franck",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://yoursite.com",
    title: "Portfolio & Blog | Franck",
    description: "Modern portfolio showcasing projects, articles, and tutorials.",
    siteName: "Franck Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Blog | Franck",
    description: "Modern portfolio showcasing projects, articles, and tutorials.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}


