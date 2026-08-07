import Link from 'next/link';
import { Coffee } from 'lucide-react';
import { DiamondNetwork } from '../components/killkit/DiamondNetwork';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header cu Logo si Buton Buy Me a Coffee */}
        <header className="flex items-center justify-between mb-16 pt-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#78ff73] text-[#0B0F17] font-bold p-2.5 rounded-full text-xl shadow-[0_0_15px_rgba(120,255,115,0.4)]">
              K
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">KillKit</span>
          </div>

          <a
            href="https://www.buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#78ff73]/10 hover:bg-[#78ff73]/20 text-[#78ff73] border border-[#78ff73]/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          >
            <Coffee size={18} />
            <span>Buy me a coffee</span>
          </a>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 text-white">
            KillKit
          </h1>

          <p className="text-2xl text-slate-300 mb-3">
            We help you kill all your problems...
          </p>

          <p className="text-slate-500 text-lg italic">
            or at least most of them.
          </p>
        </div>

        {/* Diamond Network Grid */}
        <DiamondNetwork />

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm mt-20 pt-8 border-t border-slate-800/50">
          KillKit © 2026 — Built for speed and privacy.
        </footer>
      </div>
    </main>
  );
}