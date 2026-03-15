'use client'

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getRoomStatus, leaveRoom, startGame } from '@/app/actions/roomActions';
import { Header } from '@/components/Header';
import { TicTacToe } from '@/components/TicTacToe';
import { GameClient } from './GameClient';

interface LobbyClientProps {
    roomId: string;
    initialPlayers: number;
    maxPlayers: number;
    minPlayers: number;
    initialStatus: string;
}

export function LobbyClient({ roomId, initialPlayers, maxPlayers, minPlayers, initialStatus }: LobbyClientProps) {
    const router = useRouter();
    const [players, setPlayers] = useState(initialPlayers);
    const [status, setStatus] = useState(initialStatus);
    const [countdown, setCountdown] = useState<number | null>(null);
    const MIN_PLAYERS = minPlayers;
    useEffect(() => {
        const interval = setInterval(async () => {
            const data = (await getRoomStatus(roomId)) as { players: number; status: string } | null;
            if (data) {
                setPlayers(Number(data.players));
                setStatus(String(data.status));
            }
        }, parseInt(process.env.NEXT_PUBLIC_WAIT_TIME || "30") * 100);

        return () => clearInterval(interval);
    }, [roomId]);


    // Reliable cleanup on unmount/navigation
    useEffect(() => {
        return () => {
            // Use a small delay to check if we actually left the room URL
            setTimeout(() => {
                if (!window.location.pathname.includes(roomId)) {
                    const playerId = localStorage.getItem('morph_morph_player_id');
                    if (playerId) {
                        leaveRoom(roomId, playerId);
                    }
                }
            }, 1000);
        };
    }, [roomId]);

    // Cleanup on tab close/refresh
    useEffect(() => {
        const handleBeforeUnload = () => {
            const playerId = localStorage.getItem('morph_morph_player_id');
            if (playerId) {
                leaveRoom(roomId, playerId);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [roomId]);

    // Countdown logic
    useEffect(() => {
        if (status === 'ready' && countdown === null) {
            setCountdown(parseInt(process.env.NEXT_PUBLIC_WAIT_TIME || "30"));
        } else if (status !== 'ready' && status !== 'playing') {
            setCountdown(null);
        }
    }, [status, countdown]);

    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            // Trigger start if countdown hits 0
            startGame(roomId);
        }
    }, [countdown, roomId]);

    if (status === 'playing') {
        return <GameClient roomId={roomId} />;
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            <Header />
            <main className="flex flex-1 p-6 gap-6 max-w-6xl mx-auto w-full flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className="w-full lg:w-80 flex flex-col gap-6">
                    {/* Game Info Card */}
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-xl">
                        <div className="flex flex-col mb-6">
                            <h1 className="text-lg font-bold">Game Lobby</h1>
                            <p className="text-primary/70 text-sm font-medium">Room Code: <span className="text-primary">#{roomId.toUpperCase()}</span></p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined">groups</span>
                                <p className="text-sm font-bold">Invite Player</p>
                            </div>
                        </div>
                    </div>

                    {/* Players Status Card */}
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-xl flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Players</h3>
                            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold">{players} / {maxPlayers}</span>
                        </div>

                        <div className="space-y-3 mb-6">
                            {Array.from({ length: maxPlayers }).map((_, i) => (
                                i < players ? (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-primary/10 border border-primary/20">
                                        <div className="size-10 flex-shrink-0 rounded-full bg-primary/30 flex items-center justify-center overflow-hidden border border-primary/30">
                                            <span className="material-symbols-outlined text-primary">person</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Player {i + 1}</span>
                                            <span className="text-[10px] uppercase tracking-wider text-green-500 font-bold">Ready</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg border-2 border-dashed border-primary/20 opacity-50">
                                        <div className="size-10 flex-shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">person_add</span>
                                        </div>
                                        <span className="text-sm font-medium italic">Waiting...</span>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="mt-auto">
                            <div className="mb-4">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    {status === 'ready' ? (
                                        <span className="text-primary animate-pulse">Starting in {countdown}s...</span>
                                    ) : (
                                        <span>Waiting for {MIN_PLAYERS - players > 0 ? MIN_PLAYERS - players : 0} more...</span>
                                    )}
                                    <span>{Math.round((players / maxPlayers) * 100)}%</span>
                                </div>
                                <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                                    <div
                                        className="bg-primary h-full transition-all duration-500 ease-out"
                                        style={{ width: `${(players / maxPlayers) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <button
                                disabled={players < MIN_PLAYERS}
                                className={`w-full py-3 font-bold rounded-lg transition-all ${players >= MIN_PLAYERS
                                    ? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(127,19,236,0.39)]'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                {status === 'ready' ? 'Ready to Start' : (players >= MIN_PLAYERS ? 'Wait for Game' : 'Waiting to start...')}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content: Mini-game */}
                <TicTacToe />
            </main>
        </div>
    );
}

function calculateWinner(squares: (string | null)[]) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
