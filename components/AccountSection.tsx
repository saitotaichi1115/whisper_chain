'use client';

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";

export function AccountSection() {
    const { data: session, isPending } = useSession();

    // 匿名ユーザーはログインしていない扱い
    const isLoggedIn = session?.user && !session.user.isAnonymous;

    if (isPending) {
        return (
            <section className="glass-panel rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-8xl">manage_accounts</span>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Account</h3>
                <div className="flex items-center justify-center py-4">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </section>
        );
    }

    if (!isLoggedIn) {
        return (
            <section className="glass-panel rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-8xl">manage_accounts</span>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Account</h3>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 p-1">
                            <div className="w-full h-full bg-background-light dark:bg-background-dark rounded-[14px] flex items-center justify-center overflow-hidden">
                                <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-500">person</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">ゲスト</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">ログインしてアカウントを管理しましょう</p>
                        </div>
                    </div>
                    <Link
                        href="/settings/login"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500 text-white hover:bg-emerald-600 transition-all font-bold text-sm active:scale-95"
                    >
                        <span className="material-symbols-outlined text-lg">login</span>
                        Login
                    </Link>
                </div>
            </section>
        );
    }

    const user = session.user;

    return (
        <section className="glass-panel rounded-2xl p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-8xl">manage_accounts</span>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Account</h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-1">
                        <div className="w-full h-full bg-background-light dark:bg-background-dark rounded-[14px] flex items-center justify-center overflow-hidden">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name ?? "Avatar"}
                                    width={72}
                                    height={72}
                                    className="w-full h-full object-cover rounded-[14px]"
                                />
                            ) : (
                                <span className="material-symbols-outlined text-5xl text-primary">face</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{user.name ?? "User"}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{user.email ?? ""}</p>
                    </div>
                </div>
                <button
                    onClick={async () => {
                        await signOut();
                        window.location.href = "/settings";
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm active:scale-95"
                >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Log Out
                </button>
            </div>
        </section>
    );
}
