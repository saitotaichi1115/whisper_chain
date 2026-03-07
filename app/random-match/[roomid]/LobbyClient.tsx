'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoomStatus } from '@/app/actions/roomActions';
import { Header } from '@/components/Header';

interface LobbyClientProps {
    roomId: string;
    initialPlayers: number;
    maxPlayers: number;
}

export function LobbyClient({ roomId, initialPlayers, maxPlayers }: LobbyClientProps) {
    const router = useRouter();
    const [players, setPlayers] = useState(initialPlayers);
    const [status, setStatus] = useState('waiting');

    // Tic Tac Toe State
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await getRoomStatus(roomId);
            if (!data) {
                router.push('/start-game'); // Room closed or error
                return;
            }
            setPlayers(Number(data.players));
            setStatus(String(data.status));

            if (data.status === 'ready' || data.status === 'playing') {
                // Here we would typically redirect to the actual game board
                // router.push(`/game/${roomId}`);
            }
        }, 3000); // poll every 3 seconds

        return () => clearInterval(interval);
    }, [roomId, router]);

    const handleSquareClick = (index: number) => {
        if (board[index] || calculateWinner(board)) return;
        const newBoard = [...board];
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);

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
                                <p className="text-sm font-bold">Waiting Room</p>
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
                                    <span>Waiting for {maxPlayers - players} more...</span>
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
                                disabled={players < maxPlayers}
                                className={`w-full py-3 font-bold rounded-lg transition-all ${players === maxPlayers
                                    ? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(127,19,236,0.39)]'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                {players === maxPlayers ? 'Start Game' : 'Waiting to start...'}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content: Mini-game */}
                <section className="flex-1 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="text-center mb-8 relative z-10">
                        <h2 className="text-3xl font-black mb-2 tracking-tight">Wait a moment!</h2>
                        <p className="text-slate-600 dark:text-slate-400">Play some Tic-Tac-Toe while others join.</p>
                    </div>

                    {/* Tic Tac Toe Grid */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] aspect-square relative z-10">
                        {board.map((cell, index) => (
                            <div
                                key={index}
                                onClick={() => handleSquareClick(index)}
                                className={`bg-background-light dark:bg-background-dark/80 hover:bg-primary/10 rounded-xl flex items-center justify-center text-5xl font-bold cursor-pointer border-2 transition-all ${cell ? 'border-primary/30' : 'border-primary/10 hover:scale-105 hover:border-primary/40'
                                    }`}
                            >
                                <span className={cell === 'X' ? 'text-primary scale-in' : 'text-slate-400 scale-in'}>
                                    {cell}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-4 relative z-10">
                        <div className="h-6 flex items-center">
                            {winner ? (
                                <div className="text-primary font-bold text-lg animate-pulse">Winner: {winner}!</div>
                            ) : isDraw ? (
                                <div className="text-slate-500 font-bold text-lg animate-pulse">It's a draw!</div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className={`size-3 rounded-full ${xIsNext ? 'bg-primary' : 'bg-slate-400'}`}></div>
                                    <span className="text-sm font-bold">{xIsNext ? 'X' : 'O'}'s turn</span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={resetGame}
                            className="text-primary text-sm font-bold hover:underline opacity-80 hover:opacity-100"
                        >
                            Reset Board
                        </button>
                    </div>
                </section>
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
