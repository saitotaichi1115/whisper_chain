'use client'

import { useState, useEffect, useCallback } from 'react';
import { getBestMove, Player } from '@/lib/tictactoeAi';

interface TicTacToeProps {
    className?: string;
}

export function TicTacToe({ className }: TicTacToeProps) {
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [turnCount, setTurnCount] = useState(0);
    const [difficulty, setDifficulty] = useState<'normal' | 'hard'>('hard');
    const [playerStarts, setPlayerStarts] = useState(true);

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);

    const playerSymbol = playerStarts ? 'X' : 'O';
    const aiSymbol = playerStarts ? 'O' : 'X';
    const currentTurnSymbol = xIsNext ? 'X' : 'O';
    const isAiTurn = currentTurnSymbol === aiSymbol;

    const handleSquareClick = useCallback((index: number) => {
        if (board[index] || winner || isDraw || isAiThinking || isAiTurn) return;

        const newBoard = [...board];
        newBoard[index] = playerSymbol;
        setBoard(newBoard);
        setXIsNext(!xIsNext);
        setTurnCount(prev => prev + 1);
    }, [board, isAiThinking, isAiTurn, playerSymbol, xIsNext, winner, isDraw]);

    useEffect(() => {
        if (isAiTurn && !winner && !isDraw && !isAiThinking) {
            setIsAiThinking(true);
            const timer = setTimeout(() => {
                try {
                    const aiBoard: Player[] = board.map(cell => {
                        if (cell === playerSymbol) return 1;
                        if (cell === aiSymbol) return 2;
                        return 0;
                    });

                    const aiMove = getBestMove(aiBoard, difficulty === 'hard', playerStarts, turnCount);
                    if (aiMove !== null && aiMove !== -1) {
                        const newBoard = [...board];
                        newBoard[aiMove] = aiSymbol;
                        setBoard(newBoard);
                        setTurnCount(prev => prev + 1);
                    }
                } catch (error) {
                    console.error("AI Logic error:", error);
                } finally {
                    setXIsNext(!xIsNext);
                    setIsAiThinking(false);
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isAiTurn, board, winner, isDraw, turnCount, difficulty, playerStarts, playerSymbol, aiSymbol, xIsNext]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setIsAiThinking(false);
        setTurnCount(0);
        if (winner || isDraw) {
            setPlayerStarts(prev => !prev);
        }
    };

    return (
        <section className={`flex-1 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 relative overflow-hidden ${className}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="text-center mb-6 relative z-10 w-full flex flex-col items-center">
                <h2 className="text-3xl font-black mb-2 tracking-tight">Wait a moment!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">Play some Tic-Tac-Toe while others join.</p>

                <div className="flex bg-background-light dark:bg-background-dark/50 p-1 rounded-full border border-primary/20 mb-4 w-fit">
                    <button
                        onClick={() => {
                            setDifficulty('normal')
                            resetGame()
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${difficulty === 'normal'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-slate-500 hover:text-primary'
                            }`}
                    >
                        Normal
                    </button>
                    <button
                        onClick={() => setDifficulty('hard')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${difficulty === 'hard'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-slate-500 hover:text-primary'
                            }`}
                    >
                        Hard
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-[300px] aspect-square relative z-10">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        onClick={() => handleSquareClick(index)}
                        className={`aspect-square bg-background-light dark:bg-background-dark/80 hover:bg-primary/10 rounded-xl flex items-center justify-center text-5xl font-bold cursor-pointer border-2 transition-all ${cell ? 'border-primary/30' : 'border-primary/10 hover:scale-105 hover:border-primary/40'
                            }`}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <span className={cell === 'X' ? 'text-primary' : cell === 'O' ? 'text-slate-400' : ''}>
                                {cell}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 relative z-10">
                <div className="h-6 flex items-center">
                    {winner ? (
                        <div className="text-primary font-bold text-lg animate-pulse">
                            {winner === playerSymbol ? 'You Win!' : 'CPU Wins!'}
                        </div>
                    ) : isDraw ? (
                        <div className="text-slate-500 font-bold text-lg animate-pulse">It's a draw!</div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className={`size-3 rounded-full ${xIsNext ? 'bg-primary' : 'bg-slate-400'} ${isAiThinking ? 'animate-bounce' : ''}`}></div>
                            <span className="text-sm font-bold">
                                {isAiThinking ? 'CPU is thinking...' : (isAiTurn ? "CPU's turn" : "Your turn")}
                                <span className="ml-1 opacity-50">({currentTurnSymbol})</span>
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={resetGame}
                        className="text-primary text-sm font-bold hover:underline opacity-80 hover:opacity-100"
                    >
                        {winner || isDraw ? 'Next Game' : 'Reset Board'}
                    </button>
                </div>

                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-2">
                    {playerStarts ? 'You start as X' : 'CPU starts as X'}
                </div>
            </div>
        </section>
    );
}

function calculateWinner(squares: (string | null)[]) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
