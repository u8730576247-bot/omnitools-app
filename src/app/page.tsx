'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FAMILIES, FamilyCategory, ToolItem } from '@/config/categories';
import { ArrowLeft, Sparkles, FolderLock } from 'lucide-react';

export default function Home() {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);

  const selectedFamily = FAMILIES.find((f) => f.id === selectedFamilyId);

  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 md:p-12 font-sans selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Navigation */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#78ff73] text-black font-black p-2.5 rounded-xl text-xl tracking-wider shadow-[0_0_20px_rgba(120,255,115,0.3)]">
              K
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                KILLKIT <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">v2.0 Fractal</span>
              </h1>
              <p className="text-xs text-slate-400">OmniTools Ecosystem & Modular Suites</p>
            </div>
          </div>

          {selectedFamily && (
            <button
              onClick={() => setSelectedFamilyId(null)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-700/50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Toate Familiile
            </button>
          )}
        </header>

        {/* Dynamic Title / Breadcrumb */}
        <div className="space-y-2">
          {selectedFamily ? (
            <>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                <span>Familii</span> / <span className="text-white">{selectedFamily.title}</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <selectedFamily.icon className="w-8 h-8 text-cyan-400" />
                {selectedFamily.title}
              </h2>
              <p className="text-slate-400 max-w-2xl text-sm">{selectedFamily.description}</p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white tracking-tight">Harta Utilitarelor (12 Clustere)</h2>
              <p className="text-slate-400 max-w-2xl text-sm">
                Alege o familie de aplicații pentru a explora uneltele specifice sau utilitarele în dezvoltare.
              </p>
            </>
          )}
        </div>

        {/* LEVEL 1: GRID-UL CU FAMILII (Când nu e selectată nicio familie) */}
        {!selectedFamily && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FAMILIES.map((family) => {
              const Icon = family.icon;
              const isComingSoon = family.status === 'coming-soon';
              const toolCount = family.tools.length;

              return (
                <div
                  key={family.id}
                  onClick={() => setSelectedFamilyId(family.id)}
                  className={`group relative p-6 rounded-2xl bg-slate-900/40 border transition-all duration-300 cursor-pointer backdrop-blur-sm flex flex-col justify-between hover:-translate-y-1 ${
                    isComingSoon
                      ? 'border-slate-800/60 opacity-60 hover:opacity-80 hover:border-slate-700'
                      : 'border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                        <Icon className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                      </div>
                      <span
                        className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${
                          isComingSoon
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                            : toolCount > 0
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {isComingSoon ? 'INCEPTION' : `${toolCount} UNELTE`}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {family.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {family.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-300">
                    <span>{isComingSoon ? 'În dezvoltare' : 'Deschide clusterul'}</span>
                    <span className="font-mono group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LEVEL 2: UNELTELE DIN FAMILIA SELECTATĂ */}
        {selectedFamily && (
          <div>
            {selectedFamily.tools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {selectedFamily.tools.map((tool: ToolItem) => {
                  const ToolIcon = tool.icon;
                  const isExternal = tool.href.startsWith('http');

                  const CardContent = (
                    <div className="group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-sm flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                            <ToolIcon className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                          </div>
                          <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                            {tool.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-medium">
                        <span>{isExternal ? 'Descarcă APK' : 'Lansează Unealta'}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  );

                  return isExternal ? (
                    <a key={tool.id} href={tool.href} download className="block h-full">
                      {CardContent}
                    </a>
                  ) : (
                    <Link key={tool.id} href={tool.href} className="block h-full">
                      {CardContent}
                    </Link>
                  );
                })}
              </div>
            ) : (
              /* Mesaj dacă familia este goală / în dezvoltare */
              <div className="p-12 rounded-3xl bg-slate-900/30 border border-slate-800/80 text-center space-y-4 max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-amber-400 border border-slate-700">
                  <FolderLock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Cluster în Curs de Extindere</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Această familie este pregătită în arhitectură. Lucrăm la adăugarea de unelte noi specifice acestei categorii.
                </p>
                <button
                  onClick={() => setSelectedFamilyId(null)}
                  className="mt-2 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 pt-2"
                >
                  ← Înapoi la celelalte familii
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}