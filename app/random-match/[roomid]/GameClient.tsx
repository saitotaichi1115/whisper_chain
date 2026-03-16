'use client'

import { useState, useEffect } from 'react';
import { leaveRoom } from '@/app/actions/roomActions';
import { GameProgressTracker } from '@/components/random-match/game-progress-tracker';
import { GuessImage } from '@/components/random-match/guess-image';
import { useSession } from '@/lib/auth-client';

interface GameClientProps {
    roomId: string;
}

type GamePhase = 'initial' | 'guess_image';

export function GameClient({ roomId }: GameClientProps) {
    const { data: session } = useSession();
    const [prompt, setPrompt] = useState('');
    const [phase, setPhase] = useState<GamePhase>('initial');
    const [lastGeneratedImage, setLastGeneratedImage] = useState<string | null>(null);

    // Reliable cleanup on unmount/navigation
    useEffect(() => {
        return () => {
            // Use a small delay to check if we actually left the room URL
            setTimeout(() => {
                const playerId = session?.user?.id || localStorage.getItem('morph_morph_player_id');
                if (!window.location.pathname.includes(roomId) && playerId) {
                    leaveRoom(roomId, playerId);
                }
            }, 1000); // 1s delay is safer for Next.js router transitions
        };
    }, [roomId, session?.user?.id]);

    // Cleanup on tab close/refresh
    useEffect(() => {
        const handleBeforeUnload = () => {
            const playerId = session?.user?.id || localStorage.getItem('morph_morph_player_id');
            if (playerId) {
                leaveRoom(roomId, playerId);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [roomId, session?.user?.id]);

    const handleInitialGenerate = () => {
        // Transition to next phase
        setPhase('guess_image');
    };

    const handleNextPhase = (newPrompt: string, imageUrl: string) => {
        setPrompt(newPrompt);
        setLastGeneratedImage(imageUrl);
        // Here we would typically update the game state on the server
        console.log('Submitting:', { newPrompt, imageUrl });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display overflow-y-auto relative">
            {/* Background Decoration */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

            <main className="flex-1 flex flex-col items-center justify-center px-6 pt-6 pb-6">
                {phase === 'initial' ? (
                    <div className="w-full max-w-3xl">
                        <GameProgressTracker />
                        {/* Main Input Area */}
                        <div className="space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black tracking-tight dark:text-white">Start first image</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 font-light">Your prompt will generate the first image. Make it memorable.</p>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                                <div className="relative">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="w-full min-h-[240px] p-8 text-2xl bg-background-light dark:bg-[#1f152b] border-2 border-primary/20 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none font-display leading-relaxed"
                                        placeholder="e.g., A cybernetic cat drinking neon tea in a floating garden..."
                                    ></textarea>
                                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-2 text-slate-400 dark:text-slate-600 text-sm">
                                        <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">timer</span>
                                            Time Limit: 12 seconds
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">info</span>
                                            <span>Be descriptive for better results</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6 pt-4">
                                <button
                                    onClick={handleInitialGenerate}
                                    className="group relative flex items-center gap-4 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-xl text-xl font-bold shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="material-symbols-outlined text-3xl">auto_fix_high</span>
                                    <span>Generate Image</span>
                                    <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>

                            </div>
                        </div>
                    </div>
                ) : (
                    <GuessImage
                        previousImageUrl={lastGeneratedImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuALcR71g5HrqWOjAjg6EG8yGTo0VaORM2NCMVq0fru0xOlRillIvWYaJFTpZcJ4CPZaXvV9uSfaTeFDPASyOg7vOzFelsCvGG4URNx9Vfca7SQMSmp7AOvuJUDawvQPiTxN7-WjfQqkv77nwDnf64s9NrlmmiQpp3twjLJBfLMZOCqh4OxeKFP5I7zpRtai8mg21U0wXtCIdcqXFnRQW6S2v_4CqCHl5WHGXzmHGqDZW-zKAIMsMGI31N3zf6gNglx8WbH-OafzrIo'}
                        onNext={handleNextPhase}
                    />
                )}
            </main>
        </div>
    );
}
