'use client';

import Link from 'next/link';
import {
  FileText,
  Receipt,
  FileCode,
  Image as ImageIcon,
  ShieldCheck,
  ArrowRight,
  Coffee,
  Sparkles,
  Zap,
  Mic,
} from 'lucide-react';

export default function Home() {
  const tools = [
    {
      title: 'VoxRexLex Workspace',
      description: 'Aplicația completă de dictare și traducere juridică / medicală.',
      icon: Mic,
      href: '/vox-rex-lex',
      badge: 'GEMSTONE',
      badgeColor: 'bg-[#78ff73]/20 text-[#78ff73] border-[#78ff73]/30',
    },
    {
      title: 'PDF Merger & Combiner',
      description: 'Unește fișiere PDF direct în browser, 100% securizat și privat.',
      icon: FileText,
      href: '/pdf-merger',
      badge: 'PDF CLUSTER',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      title: 'JSON to CSV Converter',
      description: 'Convertește date structurate JSON în tabele CSV / Excel instant.',
      icon: FileCode,
      href: '/json-converter',
      badge: 'DATA CLUSTER',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      title: 'Image Converter & Compressor',
      description: 'Schimbă formatul imaginilor (PNG, JPG, WebP) și redu dimensiunea lor.',
      icon: ImageIcon,
      href: '/image-converter',
      badge: 'MEDIA LAB',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      title: 'Exif & Privacy Cleaner',
      description: 'Elimină coordonatele GPS, modelul camerei și metadatele din poze.',
      icon: ShieldCheck,
      href: '/exif-cleaner',
      badge: 'PRIVACY',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      title: 'Free Invoice Generator',
      description: 'Creează facturi și chitanțe profesionale în câteva secunde.',
      icon: Receipt,
      href: '/invoice-generator',
      badge: 'B2B SUITE',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header cu Logo & Coffee */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-[#78ff73] text-black font-black p-2.5 rounded-xl text-xl shadow-lg shadow-[#78ff73]/20">
              K
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white">KillKit</span>
              <span className="text-xs block text-[#78ff73] font-mono tracking-wider">ECOSYSTEM</span>
            </div>
          </div>

          <a
            href="https://www.buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          >
            <Coffee size={18} />
            <span className="hidden sm:inline">Buy me a coffee</span>
          </a>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <Sparkles size={14} className="text-[#78ff73]" />
            <span>Toate uneltele rulează 100% Client-Side</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Ecosistemul de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#78ff73] to-emerald-400">Micro-Aplicații Rapid</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Zero conturi required, zero date trimise pe servere. Instrumente rapide direct în browserul tău.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-slate-900/40 border border-slate-800/80 hover:border-[#78ff73]/40 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#78ff73]/5 flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-800/60 rounded-xl text-[#78ff73] group-hover:scale-110 transition-transform border border-slate-700/50">
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-white group-hover:text-[#78ff73] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-[#78ff73] group-hover:translate-x-1 transition-all">
                  <span>Deschide Unealta</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-xs mt-20 pt-8 border-t border-slate-800/50 flex justify-between items-center">
          <span>KillKit © 2026 — Built for speed and privacy.</span>
          <div className="flex items-center gap-1 text-[#78ff73]">
            <Zap size={14} />
            <span>Client-Side Engine Active</span>
          </div>
        </footer>
      </div>
    </main>
  );
}