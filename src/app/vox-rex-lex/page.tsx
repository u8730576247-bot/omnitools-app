'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, RefreshCw } from 'lucide-react';

export default function VoxRexLexPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-[#0B0F17]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-[#78ff73] transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Rețea</span>
          </Link>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg tracking-tight">VoxRexLex</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#78ff73]/10 text-[#78ff73] border border-[#78ff73]/30">
              MODULE ACTIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck size={14} className="text-[#78ff73]" />
            <span>Encrypted Local Processing</span>
          </div>
        </div>
      </header>

      {/* Main App Canvas */}
      <div className="flex-1 relative w-full h-[calc(100vh-73px)] bg-[#0B0F17]">
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B0F17] z-10 gap-3">
            <RefreshCw size={28} className="text-[#78ff73] animate-spin" />
            <p className="text-slate-400 text-sm font-mono">Se încarcă modulul VoxRexLex...</p>
          </div>
        )}

        {/* Flutter App Iframe din folderul public */}
        <iframe
          src="/vox-rex-lex/index.html"
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          title="VoxRexLex Workspace"
        />
      </div>
    </main>
  );
}