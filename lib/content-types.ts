export interface ProjectMetadata {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    featured: boolean;
    date: string;
    github?: string;
    demo?: string;
    slug: string;
}

export interface BlogMetadata {
    title: string;
    description: string;
    date: string;
    author: string;
    image?: string;
    category: string;
    tags: string[];
    readingTime?: number;
    slug: string;
}

export interface TutorialMetadata {
    title: string;
    description: string;
    difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
    duration: string;
    technologies: string[];
    category: string;
    date: string;
    image?: string;
    slug: string;
}
