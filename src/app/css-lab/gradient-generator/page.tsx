'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#10b981');
  const [direction, setDirection] = useState('to right');
  const [copied, setCopied] = useState(false);

  const directions = [
    { label: 'To Right', value: 'to right' },
    { label: 'To Left', value: 'to left' },
    { label: 'To Bottom', value: 'to bottom' },
    { label: 'To Top', value: 'to top' },
    { label: 'Bottom Right', value: 'to bottom right' },
    { label: 'Top Right', value: 'to top right' },
  ];

  const gradientCss = `linear-gradient(${direction}, ${color1}, ${color2})`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      badge="DESIGN CLUSTER"
      description="Create stunning linear gradients, test angles, and copy production-ready CSS code."
      icon={Sparkles}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Gradient Stops & Direction
          </span>

          {/* Color 1 Picker */}
          <div className="flex items-center justify-between bg-slate-950 p-3 border border-slate-800 rounded-xl">
            <span className="text-xs font-mono text-slate-300">Start Color</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase">{color1}</span>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
              />
            </div>
          </div>

          {/* Color 2 Picker */}
          <div className="flex items-center justify-between bg-slate-950 p-3 border border-slate-800 rounded-xl">
            <span className="text-xs font-mono text-slate-300">End Color</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase">{color2}</span>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
              />
            </div>
          </div>

          {/* Direction Presets */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400">Direction / Angle</span>
            <div className="grid grid-cols-2 gap-2">
              {directions.map((dir) => (
                <button
                  key={dir.value}
                  onClick={() => setDirection(dir.value)}
                  className={`p-2 text-xs font-mono rounded-xl border text-left transition-all ${
                    direction === dir.value
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {dir.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview & Code Output Panel */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Visual Preview Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex items-center justify-center h-64 shadow-xl">
            <div
              className="w-full h-full rounded-2xl transition-all"
              style={{ background: gradientCss }}
            />
          </div>

          {/* CSS Code Result */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Generated CSS
              </span>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-xs break-all">
              background: {gradientCss};
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}