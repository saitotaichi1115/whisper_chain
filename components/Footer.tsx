import Image from "next/image";
import appIcon from "@/app/apple-touch-icon.png";

export function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 dark:border-primary/10 bg-slate-50 dark:bg-background-dark/80 px-10 py-12">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <div className="flex items-center gap-2">
                        <Image src={appIcon} alt="Morph Morph Logo" className="w-6 h-6 rounded-md" />
                        <span className="font-bold text-lg">Morph Morph</span>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 Saito Taichi</p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-sm uppercase tracking-wider text-slate-400">Game</span>
                        <a className="text-sm hover:text-primary" href="#">Play Now</a>
                        <a className="text-sm hover:text-primary" href="#">Public Rooms</a>
                        <a className="text-sm hover:text-primary" href="#">Custom Lobby</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-sm uppercase tracking-wider text-slate-400">Resources</span>
                        <a className="text-sm hover:text-primary" href="#">AI Models</a>
                        <a className="text-sm hover:text-primary" href="#">Documentation</a>
                        <a className="text-sm hover:text-primary" href="#">API</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-sm uppercase tracking-wider text-slate-400">Legal</span>
                        <a className="text-sm hover:text-primary" href="#">Privacy</a>
                        <a className="text-sm hover:text-primary" href="#">Terms</a>
                    </div>
                </div>
                <div className="flex gap-4">
                    <a className="size-10 rounded-full bg-slate-200 dark:bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                        <span className="material-symbols-outlined">share</span>
                    </a>
                    <a className="size-10 rounded-full bg-slate-200 dark:bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                        <span className="material-symbols-outlined">forum</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
