import Link from 'next/link';
import { FileText, Receipt, FileCode, Image, ShieldCheck, ArrowRight, Coffee } from 'lucide-react';

export default function Home() {
  const tools = [
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
    {
      title: 'VoxRexLex',
      description: 'Aplicația ta Flutter pentru gestionat contracte și documente.',
      icon: FileText, 
      href: '/vox-rex-lex/index.html',
      badge: 'NEW',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
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
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            The ultimate collection of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">everyday micro-tools</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Fast, secure, and running directly in your browser. No sign-ups required. Choose a tool below to get started.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.href}
                href={tool.href}
                className="group relative bg-[#131927] border border-slate-800/80 hover:border-slate-700 p-6 rounded-2xl transition-all duration-200 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-800/60 rounded-xl text-slate-300 group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Launch Tool <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm mt-20 pt-8 border-t border-slate-800/50">
          KillKit © 2026 — Built for speed and privacy.
        </footer>
      </div>
    </main>
  );
}