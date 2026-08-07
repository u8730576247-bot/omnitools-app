'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function VoxRexLexPage() {
  return (
    <div className="h-screen w-screen bg-[#0B0F17] text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Navigation Header */}
      <header className="h-14 border-b border-slate-800/80 bg-[#0B0F17] px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-[#78ff73] transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Rețea</span>
          </Link>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-base tracking-tight">VoxRexLex</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#78ff73]/10 text-[#78ff73] border border-[#78ff73]/30">
              MODULE ACTIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldCheck size={14} className="text-[#78ff73]" />
          <span>Encrypted Local Processing</span>
        </div>
      </header>

      {/* Flutter Canvas Area */}
      <div className="flex-1 w-full bg-[#0B0F17] relative">
        <iframe
          src="/vox-app/index.html"
          className="w-full h-full border-0 block"
          title="VoxRexLex Workspace"
        />
      </div>
    </div>
  );
}