import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Settings() {
    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <Header />

            <main className="flex-1 flex flex-col relative py-12 px-6">
                <div className="absolute inset-0 overflow-hidden -z-10 hero-gradient">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-3xl mx-auto w-full">
                    <div className="flex items-center gap-4 mb-10">
                        <Link href="/" className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all border border-slate-300 dark:border-primary/20">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Settings</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Customize your experience</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <section className="glass-panel rounded-2xl p-8 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <span className="material-symbols-outlined text-8xl">manage_accounts</span>
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Account</h3>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-1">
                                        <div className="w-full h-full bg-background-dark rounded-[14px] flex items-center justify-center overflow-hidden">
                                            <span className="material-symbols-outlined text-5xl text-primary">face</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">morphmorph123</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Member since June 2024</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm">
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    Log Out
                                </button>
                            </div>
                        </section>

                        <section className="glass-panel rounded-2xl p-8">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">General</h3>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">dark_mode</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">Dark Mode</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Reduce eye strain at night</p>
                                        </div>
                                    </div>
                                    <button className="switch switch-on">
                                        <span className="switch-dot switch-dot-on"></span>
                                    </button>
                                </div>
                                <hr className="border-slate-200 dark:border-primary/10" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">translate</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">Language</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Choose your preferred interface language</p>
                                        </div>
                                    </div>
                                    <select className="bg-slate-200 dark:bg-background-dark border border-slate-300 dark:border-primary/20 rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-primary focus:border-primary text-slate-900 dark:text-white appearance-none cursor-pointer">
                                        <option value="en">English</option>
                                        <option value="jp">日本語 (Japanese)</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section className="glass-panel rounded-2xl p-8">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Audio</h3>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">music_note</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">BGM</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Background atmospheric music</p>
                                        </div>
                                    </div>
                                    <button className="switch switch-on">
                                        <span className="switch-dot switch-dot-on"></span>
                                    </button>
                                </div>
                                <hr className="border-slate-200 dark:border-primary/10" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">volume_up</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">Sound Effects</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Game action sounds and alerts</p>
                                        </div>
                                    </div>
                                    <button className="switch switch-on">
                                        <span className="switch-dot switch-dot-on"></span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-10 flex justify-end gap-4">
                        <Link href="/" className="flex items-center justify-center px-8 h-12 rounded-xl bg-slate-200 dark:bg-primary/10 text-slate-900 dark:text-white border border-slate-300 dark:border-primary/20 font-bold transition-all hover:bg-slate-300 dark:hover:bg-primary/20 active:scale-95">
                            Cancel
                        </Link>
                        <button className="px-8 h-12 rounded-xl bg-primary text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(127,19,236,0.4)] active:scale-95">
                            Save Changes
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
