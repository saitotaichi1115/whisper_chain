import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/apple-touch-icon.png";

export function Header() {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-primary/20 px-10 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-3 outline-none">
                <div className="flex items-center justify-center shrink-0 w-12 h-12">
                    <Image src={appIcon} alt="Morph Morph Logo" className="w-full h-full object-cover rounded-xl" />
                </div>
                <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Morph Morph</h2>
            </Link>
            <div className="flex flex-1 justify-end gap-8 items-center">
                <nav className="hidden md:flex items-center gap-8">
                    <a className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="#">Gallery</a>
                    <a className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="#">How to Play</a>
                    <a className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="#">Leaderboard</a>
                </nav>
                <div className="h-6 w-px bg-slate-200 dark:bg-primary/20"></div>
                <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95">
                    Sign In
                </button>
            </div>
        </header>
    );
}
