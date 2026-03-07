import { Header } from "@/components/Header";
import { JoinRandomMatchButton } from "@/components/JoinRandomMatchButton";
export default function StartGame() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Choose Your <span className="text-primary">Match Type</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
                        Ready to transform words into art and back again? Select a game mode to get started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {/* Random Match */}
                    <div className="bg-primary/5 backdrop-blur-md border border-primary/20 hover:bg-primary/10 hover:border-primary/40 rounded-xl p-8 flex flex-col items-center text-center transition-all group">
                        <div className="w-24 h-24 mb-6 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-5xl">public</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Random Match</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Jump straight into the action! Join a public lobby and play with AI whisperers from around the globe in a chaotic game of visual telephone.
                        </p>
                        <div className="mt-auto w-full space-y-4">
                            <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                                <span className="material-symbols-outlined text-sm">group</span>
                                <span>Players Online Now</span>
                            </div>
                            <JoinRandomMatchButton />
                        </div>
                    </div>

                    {/* Private Match */}
                    <div className="bg-primary/5 backdrop-blur-md border border-primary/20 hover:bg-primary/10 hover:border-primary/40 rounded-xl p-8 flex flex-col items-center text-center transition-all group">
                        <div className="w-24 h-24 mb-6 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-5xl">lock</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Private Match</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Gather your squad for a custom session. Create a password-protected room or join a friend's lobby using a unique room code.
                        </p>
                        <div className="mt-auto w-full grid grid-cols-2 gap-4">
                            <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-bold py-4 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                                <span>Join Code</span>
                            </button>
                            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded-lg transition-all shadow-[0_4px_14px_0_rgba(127,19,236,0.39)] hover:shadow-[0_6px_20px_rgba(127,19,236,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <span>Create Room</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-16 w-full max-w-md">
                    <div className="relative">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-primary/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background-light dark:bg-background-dark px-4 text-sm font-medium text-slate-500 uppercase tracking-widest">Recent Activity</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">New Gallery masterpiece uploaded</span>
                            </div>
                            <span className="text-xs text-slate-500">2m ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">Round 4 in progress: "Neon Jungle"</span>
                            </div>
                            <span className="text-xs text-slate-500">5m ago</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
