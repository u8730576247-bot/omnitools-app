'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Percent, ArrowRight } from 'lucide-react';

export default function PercentageCalculatorPage() {
  // Scenario 1: What is X% of Y?
  const [p1, setP1] = useState<number | ''>(15);
  const [v1, setV1] = useState<number | ''>(200);

  // Scenario 2: X is what % of Y?
  const [v2a, setV2a] = useState<number | ''>(30);
  const [v2b, setV2b] = useState<number | ''>(150);

  // Scenario 3: Percentage Change (from X to Y)
  const [v3a, setV3a] = useState<number | ''>(100);
  const [v3b, setV3b] = useState<number | ''>(125);

  // Calculations
  const r1 = p1 !== '' && v1 !== '' ? (Number(p1) / 100) * Number(v1) : 0;
  const r2 = v2a !== '' && v2b !== '' && Number(v2b) !== 0 ? (Number(v2a) / Number(v2b)) * 100 : 0;
  const r3 =
    v3a !== '' && v3b !== '' && Number(v3a) !== 0
      ? ((Number(v3b) - Number(v3a)) / Number(v3a)) * 100
      : 0;

  return (
    <ToolLayout
      title="Percentage & Ratio Calculator"
      badge="MATH CLUSTER"
      description="Quickly calculate percentages, relative changes, and proportional ratios."
      icon={Percent}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Scenario 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider block">
            1. Calculate Percentage Value
          </span>
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-slate-300">
            <span>What is</span>
            <input
              type="number"
              value={p1}
              onChange={(e) => setP1(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-20 p-2 bg-slate-950 border border-slate-800 rounded-xl text-center text-white focus:outline-none focus:border-emerald-500/50"
            />
            <span>% of</span>
            <input
              type="number"
              value={v1}
              onChange={(e) => setV1(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-28 p-2 bg-slate-950 border border-slate-800 rounded-xl text-center text-white focus:outline-none focus:border-emerald-500/50"
            />
            <span>?</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-bold px-4">
              {r1.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </span>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <span className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider block">
            2. Relative Percentage Share
          </span>
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-slate-300">
            <input
              type="number"
              value={v2a}
              onChange={(e) => setV2a(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-24 p-2 bg-slate-950 border border-slate-800 rounded-xl text-center text-white focus:outline-none focus:border-sky-500/50"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={v2b}
              onChange={(e) => setV2b(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-28 p-2 bg-slate-950 border border-slate-800 rounded-xl text-center text-white focus:outline-none focus:border-sky-500/50"
            />
            <span>?</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-sky-400 font-bold px-4">
              {r2.toFixed(2)} %
            </span>
          </div>
        </div>

        {/* Scenario 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider block">
            3. Percentage Increase / Decrease
          </span>
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-slate-300">
            <span>From</span>
            <input
              type="number"
              value={v3a}
              onChange={(e) => setV3a(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-28 p-2 bg-slate-950 border border-slate-800 rounded-xl text-center text-white focus:outline-none focus:border-amber-500/50"
            />
            <span>to</span>
            <input
              type="number"
              value={v3b}
              onChange={(e) => setV3b(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-28 p-2 bg-slate-950 border border-slate-800 rounded-xl text-center text-white focus:outline-none focus:border-amber-500/50"
            />
            <span>?</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span
              className={`p-2 bg-slate-950 border border-slate-800 rounded-xl font-bold px-4 ${
                r3 >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {r3 >= 0 ? `+${r3.toFixed(2)}%` : `${r3.toFixed(2)}%`}
            </span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}