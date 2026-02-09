'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';

export default function ProjectFilter() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = [
        { id: 'all', label: 'Tous' },
        { id: 'web', label: 'Web App' },
        { id: 'mobile', label: 'Mobile' },
        { id: 'fullstack', label: 'Full-Stack' },
        { id: 'frontend', label: 'Frontend' },
    ];

    return (
        <div className="mb-12">
            <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-slate-400">
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">Filtrer:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                    : 'glass-hover text-slate-400'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
