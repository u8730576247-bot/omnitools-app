'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  badge?: string;
  description: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  badge = 'LOCAL TOOL',
  description,
  icon: Icon,
  children,
}: ToolLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
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

          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5 text-[#78ff73]" />}
            <span className="font-bold text-white text-lg tracking-tight">{title}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#78ff73]/10 text-[#78ff73] border border-[#78ff73]/30">
              {badge}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck size={14} className="text-[#78ff73]" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <Zap size={14} className="text-[#78ff73]" />
            <span>Ultra Fast</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8">
        {/* Tool Sub-Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl relative">
          {children}
        </div>
      </div>
    </main>
  );
}