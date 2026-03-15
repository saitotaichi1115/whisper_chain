export function GameProgressTracker() {
    return (
        <div className="mb-12 bg-primary/5 backdrop-blur-xl border border-primary/20 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">Current Session</span>
                    <h3 className="text-lg font-bold">Create first image</h3>
                </div>
                <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Player 1 of 6</span>
                    <p className="text-sm font-bold text-primary">Initial Seed Phase</p>
                </div>
            </div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/6 rounded-full shadow-[0_0_15px_rgba(127,19,236,0.5)] transition-all duration-1000"></div>
            </div>
            <div className="flex justify-between mt-3 px-1">
                <span className="size-2 bg-primary rounded-full"></span>
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="size-2 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                ))}
            </div>
        </div>
    );
}