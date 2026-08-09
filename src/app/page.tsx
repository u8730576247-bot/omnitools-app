'use client';

import React from 'react';
import {
  Mic,
  QrCode,
  RotateCw,
  FileCode,
  FileStack,
  FileSpreadsheet,
  Image as ImageIcon,
  ShieldCheck,
  Receipt,
  Key,
  Coffee,
  Sparkles,
  Zap,
} from 'lucide-react';
import KillKitGrid, { ToolItem } from '@/components/killkit/KillKitGrid';

const ALL_TOOLS: ToolItem[] = [
  {
    id: 'vox-rex-lex',
    title: 'VoxRexLex Workspace',
    description: 'Advanced legal & medical voice dictation & AI translation suite.',
    icon: Mic,
    href: '/vox-rex-lex',
    badge: 'GEMSTONE',
    badgeColor: 'bg-[#78ff73]/20 text-[#78ff73] border-[#78ff73]/30',
  },
  {
    id: 'qr-key-vault',
    title: 'QR Architect & Key Vault',
    description: 'Generate vector SVG QR codes and high-entropy cryptographic keys.',
    icon: QrCode,
    href: '/qr-key-vault',
    badge: 'WEB & CIPHER',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    id: 'pdf-rotate-stamp',
    title: 'PDF Rotate & Watermark Stamp',
    description: 'Rotate PDF pages and overlay custom diagonal watermark stamps.',
    icon: RotateCw,
    href: '/pdf-rotate-stamp',
    badge: 'PDF CLUSTER',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    id: 'svg-optimizer',
    title: 'SVG Visualizer & Optimizer',
    description: 'Clean, minify, preview SVG code and convert directly to React JSX.',
    icon: FileCode,
    href: '/svg-optimizer',
    badge: 'MEDIA CLUSTER',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'pdf-merger',
    title: 'PDF Merger & Combiner',
    description: 'Securely merge and combine PDF documents directly in your browser.',
    icon: FileStack,
    href: '/pdf-merger',
    badge: 'PDF CLUSTER',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    id: 'json-to-csv',
    title: 'JSON to CSV Converter',
    description: 'Transform structured JSON data into clean CSV / Excel sheets instantly.',
    icon: FileSpreadsheet,
    href: '/json-to-csv',
    badge: 'DATA CLUSTER',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 'image-converter',
    title: 'Image Converter & Compressor',
    description: 'Convert and compress WebP, PNG, JPG locally in your browser.',
    icon: ImageIcon,
    href: '/image-converter',
    badge: 'MEDIA CLUSTER',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'exif-cleaner',
    title: 'Exif & Privacy Cleaner',
    description: 'Strip metadata, GPS coordinates and device info from photos.',
    icon: ShieldCheck,
    href: '/exif-cleaner',
    badge: 'PRIVACY',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 'invoice-generator',
    title: 'Free Invoice Generator',
    description: 'Generate clean professional B2B PDF invoices instantly.',
    icon: Receipt,
    href: '/invoice-generator',
    badge: 'B2B',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    id: 'hash-generator',
    title: 'Smart Hash & Passphrase Vault',
    description: 'Compute SHA-256, SHA-512 hashes and generate memorable high-entropy passphrases.',
    icon: Key,
    href: '/hash-generator',
    badge: 'WEB & CIPHER',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 md:p-12 font-sans selection:bg-[#78ff73] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-12">
        
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
            <span>Interactive Workflow Network</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Connect Everyday Tools <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#78ff73] via-emerald-400 to-indigo-400">In One Neon Grid</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Explore the connected micro-tool ecosystem. Click nodes or hover pathways to navigate across workflow galaxies.
          </p>
        </div>

        {/* NEON GRID WITH CIRCLES & GUIDELINES */}
        <section className="relative py-4">
          <KillKitGrid tools={ALL_TOOLS} />
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
// test deploy grid