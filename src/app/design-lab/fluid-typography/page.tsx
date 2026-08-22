'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Type, Copy, Check } from 'lucide-react';

export default function FluidTypographyPage() {
  const [minFontSize, setMinFontSize] = useState(16); // px
  const [maxFontSize, setMaxFontSize] = useState(32); // px
  const [minViewport, setMinViewport] = useState(320); // px
  const [maxViewport, setMaxViewport] = useState(1200); // px
  const [copied, setCopied] = useState(false);

  const clampCss = useMemo(() => {
    const remMin = minFontSize / 16;
    const remMax = maxFontSize / 16;
    const vwFactor = ((maxFontSize - minFontSize) / (maxViewport - minViewport)) * 100;
    const remConstant = remMin - (minViewport * ((maxFontSize - minFontSize) / (maxViewport - minViewport))) / 16;

    const sign = remConstant < 0 ? '-' : '+';
    const absRemConstant = Math.abs(remConstant).toFixed(4);
    
    // Fallback if values are equal
    if (minViewport === maxViewport || minFontSize === maxFontSize) {
      return `font-size: ${remMin}rem;`;
    }

    return `font-size: clamp(${remMin}rem, ${vwFactor.toFixed(2)}vw ${sign} ${absRemConstant}rem, ${remMax}rem);`;
  }, [minFontSize, maxFontSize, minViewport, maxViewport]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(clampCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Fluid Typography Calculator"
      badge="DESIGN CLUSTER"
      description="Generate modern CSS clamp() functions for smooth, responsive font scaling across viewports."
      icon={Type}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Min Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Min Font Size</span>
              <span className="text-emerald-400">{minFontSize}px</span>
            </div>
            <input
              type="number"
              value={minFontSize}
              onChange={(e) => setMinFontSize(Number(e.target.value))}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Max Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Max Font Size</span>
              <span className="text-emerald-400">{maxFontSize}px</span>
            </div>
            <input
              type="number"
              value={maxFontSize}
              onChange={(e) => setMaxFontSize(Number(e.target.value))}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Min Viewport */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Min Viewport Width</span>
              <span className="text-emerald-400">{minViewport}px</span>
            </div>
            <input
              type="number"
              value={minViewport}
              onChange={(e) => setMinViewport(Number(e.target.value))}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Max Viewport */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Max Viewport Width</span>
              <span className="text-emerald-400">{maxViewport}px</span>
            </div>
            <input
              type="number"
              value={maxViewport}
              onChange={(e) => setMaxViewport(Number(e.target.value))}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Live Typography Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Live Fluid Preview</span>
          <h2
            className="font-bold text-emerald-400 transition-all leading-tight"
            style={{ fontSize: clampCss.replace('font-size: ', '').replace(';', '') }}
          >
            Responsive Heading Scaling
          </h2>
        </div>

        {/* CSS Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated CSS Clamp
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy CSS'}</span>
            </button>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-xs">
            {clampCss}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}