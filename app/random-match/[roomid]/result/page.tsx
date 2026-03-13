'use client';

import { use } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

interface ResultPageProps {
    params: Promise<{ roomid: string }>;
}

export default function ResultPage({ params }: ResultPageProps) {
    const { roomid } = use(params);

    // Mock data for demonstration
    const evolutionSteps = [
        {
            type: 'prompt',
            user: 'Player 1',
            content: 'A futuristic cat exploring a neon-lit cyberpunk city with flying cars and holographic billboards.',
            isOriginal: true
        },
        {
            type: 'image',
            user: 'AI-G3-PRO',
            imageUrl: 'https://lh3.googleusercontent.com/aida/AOfcidUoDm4lJpPLdHmgYCb6N1DnW9fCwPVwOuewePk5P6aXJ0ZPOnrSXUEi3l9cS8iXCvguSv71IG8_saXLDw6s7PSk9sMsVjr9_IOISEiXNrUz6uEbBP38ym3hfjFYf-D9QoVgDe23sk9h2m2oXJjvK51lW1EhnpVvwKU78psxHPfj9brRuIJp98rrnB7n8F9XHizICArb1vQQU37uCWv9ftsOA-6w3cZiaha65ZAUutOS4SNDIt4PdW67Tg'
        },
        {
            type: 'prompt',
            user: 'Player 2',
            content: 'A mechanical purple cat standing on a high-tech glowing street in a future city.'
        },
        {
            type: 'image',
            user: 'AI-G3-FLASH',
            imageUrl: 'https://lh3.googleusercontent.com/aida/AOfcidXYsivQS1GalZc4ip18dupWCIN3LZSm6Db7r6gprE5Mo3HZ77umqv1OTEpPRvjIZO8ylnRmJNlAuBDcONcaps4_cAstxvae97V0m8J3c2EPr5wyejgZ3V_gbP-idVEOXU48oACmQbS5si-B5UolHhVr0LBL-t-3XCW-TavtUkp14q1uqoVLnb_WJTCINs2suZDf2RYvtKINR-0omsfvL_HwYabYqLXPDuFmdQiA9tUcnZSwWOB_hxOAJV4'
        },
        {
            type: 'prompt',
            user: 'Player 3',
            content: 'A striped robotic cat in a dark room with neon lights.',
            isFinal: true
        }
    ];

    const stats = [
        { label: 'Players', value: '5', icon: 'groups' },
        { label: 'Drift Rate', value: 'Low', icon: 'trending_down' },
        { label: 'Time Elapsed', value: '12:45', icon: 'timer' },
        { label: 'Chain Tokens', value: '142k', icon: 'database' }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                Room #{roomid.slice(0, 8).toUpperCase()}
                            </span>
                            <span className="text-slate-400 dark:text-slate-600 font-medium">Completed Mar 12, 2026</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter dark:text-white">
                            Evolution <span className="text-primary">Results</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl font-light">
                            Witness how your initial vision transformed through the collective imagination of the chain.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-indigo-950/30 border border-slate-200 dark:border-primary/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl">verified_user</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">Final Accuracy</span>
                            <div className="text-6xl font-black text-slate-900 dark:text-white tabular-nums">64%</div>
                            <p className="text-sm text-slate-500 mt-2 text-center max-w-[200px]">
                                Concept stayed focused on "Cat" but evolved into "Robotic".
                            </p>
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <section className="space-y-12 mb-24">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-primary/10 pb-4">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">account_tree</span>
                            The Creative Chain
                        </h2>
                        <div className="text-sm font-medium text-slate-500">Timeline view</div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24 relative">
                        {/* Timeline Connector Line (Desktop) */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-primary via-purple-600 to-slate-200 dark:to-slate-800 hidden lg:block -translate-x-1/2"></div>

                        {evolutionSteps.map((step, index) => (
                            <div 
                                key={index} 
                                className={`relative flex flex-col ${index % 2 === 0 ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} group`}
                            >
                                {/* Mobile/Line Marker */}
                                <div className="absolute left-[-2rem] lg:left-1/2 top-4 size-4 bg-white dark:bg-background-dark border-4 border-primary rounded-full z-10 lg:-translate-x-1/2 shadow-[0_0_15px_rgba(127,19,236,0.5)] group-hover:scale-125 transition-transform"></div>

                                <div className={`w-full lg:max-w-md ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                                    <div className="flex items-center gap-3 mb-4 lg:justify-inherit justify-start">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${step.isOriginal || step.isFinal ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                            Step {index + 1}
                                        </span>
                                        <span className="font-bold text-slate-700 dark:text-slate-300">{step.user}</span>
                                    </div>

                                    {step.type === 'prompt' ? (
                                        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border-2 border-slate-100 dark:border-primary/10 shadow-sm transition-all group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/5">
                                            <p className="text-lg leading-relaxed italic text-slate-600 dark:text-slate-400">
                                                "{step.content}"
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="relative group/img overflow-hidden rounded-2xl border-2 border-slate-100 dark:border-primary/10 shadow-lg group-hover:border-primary/30">
                                            <img 
                                                src={step.imageUrl} 
                                                alt={`Step ${index + 1} generation`}
                                                className="w-full h-auto aspect-square object-cover transform transition-transform duration-700 group-hover/img:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-4">
                                                <button className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/20 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm">fullscreen</span>
                                                    Enlarge
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Stats & Actions */}
                <section className="bg-slate-900 text-white rounded-[3rem] p-12 mb-24 relative overflow-hidden shadow-3xl">
                    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-primary/20 blur-[150px] rounded-full -z-10 animate-pulse"></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold">Session Analytics</h2>
                            <div className="grid grid-cols-2 gap-8">
                                {stats.map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                                            {stat.label}
                                        </div>
                                        <div className="text-3xl font-black">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button className="bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/40">
                                <span className="material-symbols-outlined">share</span>
                                Share Evolution Chain
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/start-game" className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold border border-white/10 flex items-center justify-center gap-2 transition-all">
                                    <span className="material-symbols-outlined">replay</span>
                                    New Game
                                </Link>
                                <button className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold border border-white/10 flex items-center justify-center gap-2 transition-all">
                                    <span className="material-symbols-outlined">download</span>
                                    Export PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
