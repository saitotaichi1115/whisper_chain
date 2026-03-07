import Link from "next/link";
import Image from "next/image";
import appIcon from "./apple-touch-icon.png";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Top Navigation */}
      <Header />

      <main className="flex-1 flex flex-col relative">
        {/* Background Abstract Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10 hero-gradient">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-20 @container">
          <div className="max-w-[1000px] w-full flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              New: Stable Diffusion XL Support
            </div>
            <h1 className="text-slate-900 dark:text-white text-6xl md:text-8xl font-black leading-tight tracking-tighter drop-shadow-sm">
              Whisper <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Chain</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              The classic 'Broken Telephone' game evolved. Start with a prompt, see the AI art, and guess the description to see how the whisper changes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center max-w-md">
              <Link href="/start-game" className="flex-1 flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(127,19,236,0.4)] active:scale-95">
                <span className="material-symbols-outlined">play_arrow</span>
                Start Game
              </Link>
              <Link href="/settings" className="flex-1 flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-slate-200 dark:bg-primary/10 text-slate-900 dark:text-white border border-slate-300 dark:border-primary/20 text-lg font-bold transition-all hover:bg-slate-300 dark:hover:bg-primary/20 active:scale-95">
                <span className="material-symbols-outlined">settings</span>
                Settings
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Showcase */}
        <section className="px-10 py-20 bg-slate-100 dark:bg-background-dark/50">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-4 mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How it unfolds</h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 group hover:border-primary/50 transition-all">
                <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">edit_note</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">1. Write a Prompt</h3>
                  <p className="text-slate-600 dark:text-slate-400">Player one starts with a creative description. Think 'A neon cat riding a surfboard in space'.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 group hover:border-primary/50 transition-all">
                <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2. AI Interprets</h3>
                  <p className="text-slate-600 dark:text-slate-400">Our neural network generates a unique visual masterpiece based on the previous player's description.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 group hover:border-primary/50 transition-all">
                <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">history</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">3. The Evolution</h3>
                  <p className="text-slate-600 dark:text-slate-400">Next player describes the image, and the cycle continues until the final hilarious reveal.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Creations Carousel */}
        <section className="py-20 px-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_awesome_motion</span>
                Recent Community Masterpieces
              </h2>
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                View All Gallery <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 border border-primary/10">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Abstract colorful AI generated fluid art" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALcR71g5HrqWOjAjg6EG8yGTo0VaORM2NCMVq0fru0xOlRillIvWYaJFTpZcJ4CPZaXvV9uSfaTeFDPASyOg7vOzFelsCvGG4URNx9Vfca7SQMSmp7AOvuJUDawvQPiTxN7-WjfQqkv77nwDnf64s9NrlmmiQpp3twjLJBfLMZOCqh4OxeKFP5I7zpRtai8mg21U0wXtCIdcqXFnRQW6S2v_4CqCHl5WHGXzmHGqDZW-zKAIMsMGI31N3zf6gNglx8WbH-OafzrIo" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Cyberpunk Forest</p>
                <p className="text-xs text-slate-500">12 Whispers • 4 mins ago</p>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 border border-primary/10">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Vibrant 3D geometric abstract rendering" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnMj8ahK2XnJqqDWhAcT5sn9EL7gGiyCy-Gh7WkW4GCfni5keYSD_2z-omZPdjFka-nLJSH9dIDtUpXJuZXm60x3rl_HrzOKpvdClMecof3IuDnfFLPCODatDiMqgCH3Z9CA8Y66TgXnIY8obuMOLHMF_Et67db_5Lq127eBSjJunebOiMpGdsjG3YlRS-RzXHoUMyGcoSmv29zSXv5RIX3c4QdQtu9Jg1bRto5daurH49oBeML1y6LNFPsdHKkjH6okFcCC2DgRA" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">The Glitch King</p>
                <p className="text-xs text-slate-500">8 Whispers • 15 mins ago</p>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 border border-primary/10">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Surreal space landscape with nebula colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOCKqkujYx2XtKJOANQm8FbFr45VVUZv09rvBeEW3vzwtc5CBEJziD0uRd0EZmHLns6hIxJnXtUaX-1sGn79OGHkFVh8Axc1D-htCfGukNvxQU-M-MBgHpGqLTQrjoQsGACh3msxLamVlAAO_lINtPKhjA6Folp9yHnE44X6xSyM08yP8AHfMc6GYwPBw-yT8rhcrcxmyjK7FYxettrjGvs__Af5tyIxFi8Qc1aqvGLrkY-4foqO_GZ1WknM0W1FY38-0EG4Zh82k" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Nebula Tea Party</p>
                <p className="text-xs text-slate-500">15 Whispers • 1 hour ago</p>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 border border-primary/10">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Minimalist purple and violet wave pattern" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR-75Yas-rXULXFU8QrZvZoWEwO5WaD9jjBxTta_G3jmx5Vs4d85eqk2T0N9xzKQWlCB-MnJW1np9Pb6H_DshqsIabVYhv16rUybVXStsgyhCdB9trsUc2HrAtbeSZ1ZvEtO9H6Qwa0oZzWoLgxhlBbvclJhhlqiDWjG4Dwxl_fM8SoS7ww6xcJeqbIQ0CSXRwMwWzG5uIHalOMuYvuVklAv_yK4L8mRdCma-Ntz8j0fnqNpckn1BNvqcI_b_uas_yHxeWrGs0_HE" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Digital Zen</p>
                <p className="text-xs text-slate-500">6 Whispers • 2 hours ago</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
