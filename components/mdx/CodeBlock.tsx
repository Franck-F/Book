'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = 'python' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-8">
            <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleCopy}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-lg text-slate-300 transition-all backdrop-blur-sm"
                    title="Copier le code"
                >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
            </div>
            <div className="absolute left-6 -top-3 px-3 py-1 bg-slate-900 border border-white/10 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest z-10">
                {language}
            </div>
            <pre className="bg-slate-950/80 border border-white/10 rounded-xl p-6 pt-10 overflow-x-auto font-mono text-sm leading-relaxed text-slate-300 shadow-2xl backdrop-blur-md">
                <code>{code}</code>
            </pre>
        </div>
    );
}
