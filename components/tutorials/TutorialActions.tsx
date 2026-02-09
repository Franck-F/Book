'use client';

import { Share2, Bookmark, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TutorialActionsProps {
    title: string;
    slug: string;
}

export default function TutorialActions({ title, slug }: TutorialActionsProps) {
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const savedTutorials = JSON.parse(localStorage.getItem('saved_tutorials') || '[]');
        setSaved(savedTutorials.includes(slug));
    }, [slug]);

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: `Découvrez ce tutoriel sur ${title}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share error:', err);
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSave = () => {
        const savedTutorials = JSON.parse(localStorage.getItem('saved_tutorials') || '[]');
        let newSaved;
        if (saved) {
            newSaved = savedTutorials.filter((s: string) => s !== slug);
        } else {
            newSaved = [...savedTutorials, slug];
        }
        localStorage.setItem('saved_tutorials', JSON.stringify(newSaved));
        setSaved(!saved);
    };

    return (
        <div className="flex gap-4">
            <button
                onClick={handleShare}
                className="p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all relative group"
                title="Partager ce tutoriel"
            >
                {copied ? <Check size={18} className="text-green-400" /> : <Share2 size={18} />}
                {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded whitespace-nowrap">
                        Lien copié !
                    </span>
                )}
            </button>
            <button
                onClick={handleSave}
                className={`p-2 rounded-full border transition-all ${saved
                        ? 'bg-primary-500/20 border-primary-500 text-primary-400'
                        : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                title={saved ? "Retirer des favoris" : "Enregistrer pour plus tard"}
            >
                <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
            </button>
        </div>
    );
}
