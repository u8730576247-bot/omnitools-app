'use client';

import React, { useState } from 'react';
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
  Compass,
  Route,
  ChevronRight,
  QrCode
} from 'lucide-react';

const ALL_TOOLS = [
  {
    id: 'vox-rex-lex',
    title: 'VoxRexLex Workspace',
    description: 'Advanced legal and medical voice dictation & AI translation suite.',
    icon: Mic,
    href: '/vox-rex-lex',
    badge: 'GEMSTONE',
    badgeColor: 'bg-[#78ff73]/20 text-[#78ff73] border-[#78ff73]/30',
  },
  {
    id: 'pdf-merger',
    title: 'PDF Merger & Combiner',
    description: 'Securely merge and combine PDF documents directly in your browser.',
    icon: FileText,
    href: '/pdf-merger',
    badge: 'PDF CLUSTER',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    id: 'json-converter',
    title: 'JSON to CSV Converter',
    description: 'Transform structured JSON data into clean CSV / Excel sheets instantly.',
    icon: FileCode,
    href: '/json-converter',
    badge: 'DATA CLUSTER',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 'image-converter',
    title: 'Image Converter & Compressor',
    description: 'Convert between PNG, JPG, WebP formats and optimize file sizes.',
    icon: ImageIcon,
    href: '/image-converter',
    badge: 'MEDIA LAB',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 'exif-cleaner',
    title: 'Exif & Privacy Cleaner',
    description: 'Strip GPS coordinates, device models, and sensitive metadata from photos.',
    icon: ShieldCheck,
    href: '/exif-cleaner',
    badge: 'PRIVACY',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    id: 'invoice-generator',
    title: 'Free Invoice Generator',
    description: 'Generate professional B2B invoices and receipts in seconds.',
    icon: Receipt,
    href: '/invoice-generator',
    badge: 'B2B SUITE',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
  id: 'qr-key-generator',
  title: 'QR Architect & Key Vault',
  description: 'Generate vector SVG QR codes and high-entropy cryptographic keys.',
  icon: QrCode,
  href: '/qr-key-generator',
  badge: 'WEB & CIPHER',
  badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
  id: 'pdf-organizer',
  title: 'PDF Rotate & Watermark Stamp',
  description: 'Rotate PDF pages and overlay custom diagonal watermark stamps.',
  icon: FileText,
  href: '/pdf-organizer',
  badge: 'PDF CLUSTER',
  badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
 },
 {
  id: 'svg-optimizer',
  title: 'SVG Visualizer & Optimizer',
  description: 'Clean, minify, preview SVG code and convert directly to React JSX components.',
  icon: Code2,
  href: '/svg-optimizer',
  badge: 'MEDIA CLUSTER',
  badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
 },
];

const PATHWAY_PRESETS = [
  {
    id: 'legal-doc',
    label: '🎙️ I have voice recordings and need to output a clean, merged PDF report',
    from: 'Audio / Voice Recording (X)',
    stopover: 'Privacy & Metadata Cleanup (Z)',
    to: 'Final Combined PDF Document (Y)',
    steps: ['vox-rex-lex', 'exif-cleaner', 'pdf-merger'],
  },
  {
    id: 'data-privacy',
    label: '🖼️ I have raw field photos and need GPS data removed + WebP compression',
    from: 'Raw Photographs (X)',
    stopover: 'Exif Location Stripping (Z)',
    to: 'Optimized WebP Image (Y)',
    steps: ['exif-cleaner', 'image-converter'],
  },
  {
    id: 'dev-export',
    label: '📊 I have raw JSON payload and need to deliver a client CSV / B2B Invoice',
    from: 'JSON API Response (X)',
    stopover: 'CSV Table Conversion (Z)',
    to: 'B2B PDF Invoice (Y)',
    steps: ['json-converter', 'invoice-generator'],
  },
];

export default function Home() {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);

  const currentPath = PATHWAY_PRESETS.find((p) => p.id === selectedPathway);

  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 md:p-12 font-sans selection:bg-[#78ff73] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Navigation */}
        <header className="flex items-center justify-between border-b border-slate-800/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#78ff73] text-black font-black p-2.5 rounded-xl text-xl shadow-lg shadow-[#78ff73]/20">
              K
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white">KillKit</span>
              <span className="text-xs block text-[#78ff73] font-mono tracking-wider">MUNDUS MIRABILIS</span>
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
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <Sparkles size={14} className="text-[#78ff73]" />
            <span>Seamless Workflow Translation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            From everyday friction to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#78ff73] via-emerald-400 to-indigo-400">Connected Workflows</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Your interactive pathway across micro-tool galaxies. Define where you start ($X$) and what you need ($Y$), and let us trace the optimal route.
          </p>
        </div>

        {/* PATHFINDER / VORTEX ROUTER */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#78ff73]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-[#78ff73]/10 text-[#78ff73] rounded-xl border border-[#78ff73]/20">
              <Compass size={22} className="animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Vortex Pathfinder <span className="text-xs font-mono text-[#78ff73] bg-[#78ff73]/10 px-2 py-0.5 rounded border border-[#78ff73]/30">X ➔ Z ➔ Y</span>
              </h2>
              <p className="text-xs text-slate-400">Select your intent to illuminate the translation route:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {PATHWAY_PRESETS.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPathway(selectedPathway === path.id ? null : path.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  selectedPathway === path.id
                    ? 'bg-slate-800/90 border-[#78ff73] text-white shadow-lg shadow-[#78ff73]/10'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <span className="text-sm font-medium">{path.label}</span>
                <Route size={18} className={selectedPathway === path.id ? 'text-[#78ff73]' : 'text-slate-600'} />
              </button>
            ))}
          </div>

          {currentPath && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-[#78ff73]/30 space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
                <div><span className="text-[#78ff73]">ORIGIN (X):</span> {currentPath.from}</div>
                <div className="hidden md:block border-t border-dashed border-[#78ff73]/40 flex-1 mx-4" />
                <div><span className="text-amber-400">STOPOVER (Z):</span> {currentPath.stopover}</div>
                <div className="hidden md:block border-t border-dashed border-[#78ff73]/40 flex-1 mx-4" />
                <div><span className="text-indigo-400">TARGET (Y):</span> {currentPath.to}</div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Recommended Sequence:</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentPath.steps.map((toolId, idx) => {
                    const tool = ALL_TOOLS.find((t) => t.id === toolId);
                    if (!tool) return null;
                    const Icon = tool.icon;
                    return (
                      <React.Fragment key={tool.id}>
                        <Link
                          href={tool.href}
                          className="group p-4 bg-slate-900 border border-slate-800 hover:border-[#78ff73] rounded-xl transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono text-[#78ff73] bg-[#78ff73]/10 px-2 py-0.5 rounded">
                                STEP {idx + 1}
                              </span>
                              <Icon size={18} className="text-slate-400 group-hover:text-[#78ff73] transition-colors" />
                            </div>
                            <div className="font-bold text-sm text-white group-hover:text-[#78ff73] transition-colors">
                              {tool.title}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-[#78ff73] font-semibold mt-4">
                            <span>Launch Step</span>
                            <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ALL TOOLS GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap size={20} className="text-[#78ff73]" />
              <span>All Galaxies & Direct Tools</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">100% Client-Side Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_TOOLS.map((tool) => {
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
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#78ff73] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-bold text-[#78ff73] group-hover:translate-x-1 transition-all">
                    <span>Open Tool</span>
                    <ArrowRight size={14} className="ml-1.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-xs pt-8 border-t border-slate-800/50 flex justify-between items-center">
          <span>KillKit © 2026 — Built for speed, privacy, and flow.</span>
          <div className="flex items-center gap-1 text-[#78ff73]">
            <Zap size={14} />
            <span>Mundus Mirabilis Online</span>
          </div>
        </footer>

      </div>
    </main>
  );
}