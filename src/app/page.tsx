import Link from 'next/link';
import { FileText, Receipt, FileCode, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  const tools = [
    {
      title: 'PDF Merger & Splitter',
      description:
        'Securely merge and manipulate PDF files locally in your browser.',
      icon: FileText,
      href: '/pdf-merger',
      badge: 'POPULAR',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      title: 'Free Invoice Generator',
      description:
        'Create professional invoices and receipts in seconds. Export to PDF instantly.',
      icon: Receipt,
      href: '/invoice-generator',
      badge: 'B2B',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      title: 'JSON to CSV Converter',
      description:
        'Convert JSON data into clean CSV sheets instantly in your browser.',
      icon: FileCode,
      href: '/json-converter',
      badge: 'DEV TOOL',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      title: 'Exif & Privacy Cleaner',
      description:
        'Remove GPS coordinates, camera model, and private metadata from your photos.',
      icon: ShieldCheck,
      href: '/exif-cleaner',
      badge: 'PRIVACY',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">OmniTools</h1>
          <p className="text-slate-400 max-width-md mx-auto">
            A suit of privacy-first, browser-based utilities for developers and creators.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-800/80 rounded-xl text-slate-200 group-hover:scale-105 transition-transform">
                      <Icon size={24} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  Open Tool{' '}
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}