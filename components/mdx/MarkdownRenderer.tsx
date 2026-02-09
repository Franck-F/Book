'use client';

import React from 'react';
import CodeBlock from './CodeBlock';
import { ExternalLink, Info } from 'lucide-react';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    if (!content) {
        return <p className="text-slate-500 italic">Aucun contenu disponible.</p>;
    }

    const lines = content.split(/\r?\n/);
    const blocks: React.ReactNode[] = [];
    let currentCodeBlock: string[] | null = null;
    let currentLanguage = '';
    let currentList: string[] | null = null;
    let currentTable: string[][] | null = null;

    const flushList = (key: string | number) => {
        if (currentList && currentList.length > 0) {
            blocks.push(
                <ul key={`list-${key}`} className="list-disc list-inside mb-8 text-slate-400 space-y-3 ml-4">
                    {currentList.map((item, i) => (
                        <li key={i} className="leading-relaxed">{parseInline(item)}</li>
                    ))}
                </ul>
            );
            currentList = null;
        }
    };

    const flushTable = (key: string | number) => {
        if (currentTable && currentTable.length > 0) {
            blocks.push(
                <div key={`table-wrapper-${key}`} className="overflow-x-auto my-10 rounded-xl border border-white/10 shadow-2xl">
                    <table className="w-full text-left border-collapse bg-slate-900/50 backdrop-blur-sm">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-white font-bold font-display">
                                {currentTable[0].map((cell, i) => (
                                    <th key={i} className="px-6 py-4">{parseInline(cell)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {currentTable.slice(1).map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-6 py-4 text-slate-400">{parseInline(cell)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            currentTable = null;
        }
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Handle Code Blocks
        if (trimmedLine.startsWith('```')) {
            flushList(index);
            flushTable(index);
            if (currentCodeBlock === null) {
                currentCodeBlock = [];
                currentLanguage = trimmedLine.slice(3) || 'text';
                return;
            } else {
                const code = currentCodeBlock.join('\n');
                blocks.push(<CodeBlock key={`code-${index}`} code={code} language={currentLanguage} />);
                currentCodeBlock = null;
                return;
            }
        }

        if (currentCodeBlock !== null) {
            currentCodeBlock.push(line);
            return;
        }

        // Handle Tables
        if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
            flushList(index);
            const cells = trimmedLine
                .split('|')
                .map(c => c.trim())
                .filter((_, i, arr) => i > 0 && i < arr.length - 1);

            if (trimmedLine.includes('---')) {
                // Separator line, do nothing
                return;
            }

            if (currentTable === null) {
                currentTable = [cells];
            } else {
                currentTable.push(cells);
            }
            return;
        } else if (currentTable !== null) {
            flushTable(index);
        }

        // Handle Lists
        if (trimmedLine.startsWith('- ')) {
            flushTable(index);
            if (currentList === null) currentList = [];
            currentList.push(trimmedLine.slice(2));
            return;
        } else if (currentList !== null) {
            flushList(index);
        }

        // Handle Headers
        if (trimmedLine.startsWith('### ')) {
            blocks.push(<h3 key={index} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 font-display">{trimmedLine.slice(4)}</h3>);
        } else if (trimmedLine.startsWith('## ')) {
            blocks.push(<h2 key={index} className="text-3xl md:text-4xl font-bold text-white mt-16 mb-8 font-display border-b border-white/10 pb-4">{trimmedLine.slice(3)}</h2>);
        } else if (trimmedLine.startsWith('# ')) {
            blocks.push(<h1 key={index} className="text-4xl md:text-6xl font-extrabold text-white mt-8 mb-10 font-display">{trimmedLine.slice(2)}</h1>);
        } else if (trimmedLine.startsWith('> ')) {
            blocks.push(
                <blockquote key={index} className="border-l-4 border-primary-500 bg-primary-500/5 p-8 my-10 rounded-r-2xl italic text-slate-300 shadow-inner">
                    <div className="flex gap-4">
                        <Info className="text-primary-400 shrink-0" size={24} />
                        <div className="text-lg leading-relaxed">{parseInline(trimmedLine.slice(2))}</div>
                    </div>
                </blockquote>
            );
        } else if (trimmedLine !== '') {
            blocks.push(<p key={index} className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed font-sans">{parseInline(line)}</p>);
        }
    });

    // Clean up any remaining hungry states
    flushList('final');
    flushTable('final');
    const finalCode = currentCodeBlock as string[] | null;
    if (finalCode !== null && finalCode.length > 0) {
        blocks.push(<CodeBlock key="final-code" code={finalCode.join('\n')} language={currentLanguage} />);
    }

    return <div className="space-y-2">{blocks}</div>;
}

function parseInline(text: string) {
    if (!text) return '';

    // Simple inline parsing for bold, links, and emojis/status dots
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|[🟢🟡🔴] .*?)/g);
    return parts.map((part, i) => {
        if (!part) return null;

        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }

        // Handle Status Indicators (like 🟢 Expert)
        if (part.startsWith('🟢') || part.startsWith('🟡') || part.startsWith('🔴')) {
            return (
                <span key={i} className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap">
                    <span>{part.slice(0, 2)}</span>
                    <span className={
                        part.startsWith('🟢') ? 'text-green-400' :
                            part.startsWith('🟡') ? 'text-yellow-400' :
                                'text-red-400'
                    }>
                        {part.slice(2)}
                    </span>
                </span>
            );
        }

        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
            const label = linkMatch[1];
            const href = linkMatch[2];
            return (
                <a
                    key={i}
                    href={href}
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-4 decoration-primary-500/30 transition-colors inline-flex items-center gap-1 font-medium"
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                    {label}
                    {href.startsWith('http') && <ExternalLink size={14} />}
                </a>
            );
        }
        return part;
    });
}
