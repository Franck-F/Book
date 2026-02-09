import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectMetadata, BlogMetadata, TutorialMetadata } from './content-types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentByType<T>(type: 'projects' | 'blog' | 'tutorials'): T[] {
    const typeDirectory = path.join(contentDirectory, type);

    if (!fs.existsSync(typeDirectory)) {
        return [];
    }

    const files = fs.readdirSync(typeDirectory);
    const content = files
        .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
        .map((file) => {
            const filePath = path.join(typeDirectory, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);
            const slug = file.replace(/\.mdx?$/, '');

            return {
                ...data,
                slug,
            } as T;
        });

    return content;
}

export function getProjects(): ProjectMetadata[] {
    return getContentByType<ProjectMetadata>('projects');
}

export function getBlogPosts(): BlogMetadata[] {
    return getContentByType<BlogMetadata>('blog');
}

export function getTutorials(): TutorialMetadata[] {
    return getContentByType<TutorialMetadata>('tutorials');
}

export function getContentBySlug<T>(
    type: 'projects' | 'blog' | 'tutorials',
    slug: string
): { metadata: T; content: string } | null {
    const typeDirectory = path.join(contentDirectory, type);
    const filePath = path.join(typeDirectory, `${slug}.mdx`);
    const mdFilePath = path.join(typeDirectory, `${slug}.md`);

    let targetPath = filePath;
    if (!fs.existsSync(filePath) && fs.existsSync(mdFilePath)) {
        targetPath = mdFilePath;
    }

    if (!fs.existsSync(targetPath)) {
        return null;
    }

    const fileContent = fs.readFileSync(targetPath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        metadata: { ...data, slug } as T,
        content,
    };
}
