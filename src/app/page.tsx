import Link from 'next/link';
import KillKitNode from "../components/killkit/KillKitNode";
import { FileText, Receipt, FileCode, Image, ShieldCheck, ArrowRight, Coffee } from 'lucide-react';

export default function Home() {
  const tools = [
    {
      title: 'VoxRexLex',
      description: 'Aplicația ta Flutter pentru gestionat contracte și documente.',
      icon: FileText, 
      href: '/vox-rex-lex', // MODIFICAT: Trimite către noua pagină cu iframe
      badge: 'NEW',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      title: 'PDF Merger & Splitter',
      description: 'Securely merge and manipulate PDF files locally in your browser. 100% private.',
      icon: FileText,
      href: '/pdf-merger',
      badge: 'POPULAR',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      title: 'Free Invoice Generator',
      description: 'Create professional invoices and receipts in seconds. Export to PDF instantly.',
      icon: Receipt,
      href: '/invoice-generator',
      badge: 'B2B',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      title: 'JSON to CSV Converter',
      description: 'Convert JSON data into clean CSV sheets instantly in your browser.',
      icon: FileCode,
      href: '/json-converter',
      badge: 'DEV TOOL',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      title: 'Image Converter & Compressor',
      description: 'Schimbă formatul imaginilor (PNG, JPG, WebP) și redu dimensiunea lor direct în browser.',
      icon: Image,
      href: '/image-converter',
      badge: 'NEW',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      title: 'Exif & Privacy Cleaner',
      description: 'Remove GPS coordinates, camera model, and private metadata from your photos.',
      icon: ShieldCheck,
      href: '/exif-cleaner',
      badge: 'PRIVACY',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    
  ];

  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header cu Logo si Buton Buy Me a Coffee */}
        <header className="flex items-center justify-between mb-16 pt-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white font-bold p-2.5 rounded-xl text-xl">K</div>
            <span className="text-2xl font-bold tracking-tight text-white">KillKit</span>
          </div>

          <a
            href="https://www.buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
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

        {/* Node Grid Network */}
<div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto my-12">
  {tools.map((tool) => (
    <KillKitNode
      key={tool.title}
      title={tool.title}
      description={tool.description}
      icon={tool.icon}
      href={tool.href}
      badge={tool.badge}
    />
  ))}
</div>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm mt-20 pt-8 border-t border-slate-800/50">
          KillKit © 2026 — Built for speed and privacy.
        </footer>
      </div>
    </main>
  );
}