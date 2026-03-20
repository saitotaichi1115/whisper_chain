'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";
import appIcon from "@/app/apple-touch-icon.png";

export default function LoginPage() {
    const handleGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const handleTwitterSignIn = async () => {
        await signIn.social({
            provider: "twitter",
            callbackURL: "/",
        });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-1 flex items-center justify-center relative px-6 py-20">
                {/* Background glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-400/5 dark:bg-orange-400/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-md">
                    {/* Glassmorphism Card */}
                    <div className="bg-white/70 dark:bg-primary/5 backdrop-blur-xl border border-slate-200 dark:border-primary/30 rounded-2xl p-10 text-center shadow-2xl shadow-primary/10">

                        {/* Brand */}
                        <div className="mb-8">
                            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/20 border border-primary/20">
                                <Image
                                    src={appIcon}
                                    alt="Morph Morph Logo"
                                    className="w-12 h-12 object-cover rounded-xl"
                                />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                ログイン
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                アカウントで続けて AI アートの旅へ
                            </p>
                        </div>

                        {/* OAuth Buttons */}
                        <div className="space-y-4">
                            {/* Google */}
                            <button
                                id="google-sign-in"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-base transition-all active:scale-95 border border-slate-200 shadow-sm hover:shadow-md"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Google で続ける</span>
                            </button>

                            {/* Twitter / X */}
                            <button
                                id="twitter-sign-in"
                                onClick={handleTwitterSignIn}
                                className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-slate-900 dark:bg-black hover:bg-slate-800 dark:hover:bg-slate-900 text-white rounded-xl font-bold text-base transition-all active:scale-95 border border-slate-700 dark:border-slate-800 shadow-sm hover:shadow-md"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span>X（Twitter）で続ける</span>
                            </button>
                        </div>

                        {/* Divider & info */}
                        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-primary/20">
                            <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed">
                                サインインすることで、
                                <a href="#" className="text-primary hover:underline cursor-pointer">利用規約</a>
                                {" "}および{" "}
                                <a href="#" className="text-primary hover:underline cursor-pointer">プライバシーポリシー</a>
                                に同意したものとみなされます。
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
