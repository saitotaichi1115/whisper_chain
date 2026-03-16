'use client';

import { useState } from 'react';
import { GameProgressTracker } from './game-progress-tracker';

interface GuessImageProps {
    previousImageUrl?: string;
    onNext: (generatedPrompt: string, generatedImageUrl: string) => void;
}

export function GuessImage({ previousImageUrl, onNext }: GuessImageProps) {
    const [interpretation, setInterpretation] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

    const handleGenerateImage = () => {
        setIsGenerating(true);
        // Mock generation
        setTimeout(() => {
            setGeneratedImageUrl('https://lh3.googleusercontent.com/aida/AOfcidUoDm4lJpPLdHmgYCb6N1DnW9fCwPVwOuewePk5P6aXJ0ZPOnrSXUEi3l9cS8iXCvguSv71IG8_saXLDw6s7PSk9sMsVjr9_IOISEiXNrUz6uEbBP38ym3hfjFYf-D9QoVgDe23sk9h2m2oXJjvK51lW1EhnpVvwKU78psxHPfj9brRuIJp98rrnB7n8F9XHizICArb1vQQU37uCWv9ftsOA-6w3cZiaha65ZAUutOS4SNDIt4PdW67Tg');
            setIsGenerating(false);
        }, 2000);
    };

    const handleSubmit = () => {
        if (interpretation && generatedImageUrl) {
            onNext(interpretation, generatedImageUrl);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-2">
            <div className="w-full max-w-3xl mx-auto">
                <GameProgressTracker />
            </div>

            <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight dark:text-white">Interpret & Generate</h2>
                <p className="text-slate-600 dark:text-slate-400 font-light">
                    Decode the artistic vision of the previous player and keep the chain going.
                    What secrets does their image hold?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Previous Player's Image */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        Previous Player's Image
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative bg-background-light dark:bg-[#1f152b] border-2 border-primary/20 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                            {previousImageUrl ? (
                                <img src={previousImageUrl} alt="Previous interpretation" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-slate-500 flex flex-col items-center gap-3">
                                    <span className="material-symbols-outlined text-5xl">image</span>
                                    <span>Wait a moment!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Your Interpretation */}
                <div className="space-y-6 flex flex-col">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                            <span className="material-symbols-outlined text-lg">edit</span>
                            Your Interpretation
                        </div>
                        <div className="relative">
                            <textarea
                                value={interpretation}
                                onChange={(e) => setInterpretation(e.target.value)}
                                className="w-full min-h-[240px] p-6 text-xl bg-background-light dark:bg-[#1f152b] border-2 border-primary/20 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none"
                                placeholder="Describe what you see to generate your image..."
                            ></textarea>
                            <div className="absolute bottom-4 right-4 py-2 flex items-center gap-2">
                                <button
                                    onClick={handleGenerateImage}
                                    disabled={!interpretation || isGenerating}
                                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all"
                                >
                                    <span className="material-symbols-outlined text-xl">{isGenerating ? 'hourglass_empty' : 'bolt'}</span>
                                    {isGenerating ? 'Generating...' : 'Generate Image'}
                                </button>
                                <button className="p-3 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">restart_alt</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
