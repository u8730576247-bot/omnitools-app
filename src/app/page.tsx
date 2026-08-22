'use client';

import React from 'react';
import ConstellationMap from '@/components/killkit/ConstellationMap';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 md:p-12 font-sans selection:bg-[#78ff73]/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#78ff73] text-black font-black p-2.5 rounded-xl text-xl tracking-wider shadow-[0_0_20px_rgba(120,255,115,0.4)]">
              K
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                KILLKIT <span className="text-xs px-2 py-0.5 rounded-full bg-[#78ff73]/10 text-[#78ff73] border border-[#78ff73]/30 font-mono">Constellation v2</span>
              </h1>
              <p className="text-xs text-slate-400">KillKit Ecosystem</p>
            </div>
          </div>
        </header>

        {/* NOUA HARTĂ STELARĂ (Înlocuiește vechiul Titlu + KillKitGrid) */}
        <ConstellationMap />

      </div>
    </main>
  );
}