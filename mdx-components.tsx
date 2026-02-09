import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-6 gradient-text font-[family-name:var(--font-outfit)]">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-3xl font-bold mb-4 mt-8 text-white font-[family-name:var(--font-outfit)]">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mb-3 mt-6 text-slate-200">
                {children}
            </h3>
        ),
        p: ({ children }) => (
            <p className="text-slate-300 mb-4 leading-relaxed">
                {children}
            </p>
        ),
        a: ({ href, children }) => (
            <a
                href={href}
                className="text-primary-400 hover:text-accent-400 transition-colors underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        ),
        ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 text-slate-300 space-y-2">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 text-slate-300 space-y-2">
                {children}
            </ol>
        ),
        code: ({ children }) => (
            <code className="bg-black/40 px-2 py-1 rounded text-primary-300 text-sm">
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto mb-4 border border-white/10">
                {children}
            </pre>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 italic text-slate-400 my-4">
                {children}
            </blockquote>
        ),
    };
}
