'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Square, Copy, Check } from 'lucide-react';

export default function BorderRadiusPage() {
  const [topLeft, setTopLeft] = useState(24);
  const [topRight, setTopRight] = useState(24);
  const [bottomRight, setBottomRight] = useState(24);
  const [bottomLeft, setBottomLeft] = useState(24);
  const [copied, setCopied] = useState(false);

  const borderRadiusCss = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`border-radius: ${borderRadiusCss};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setAll = (val: number) => {
    setTopLeft(val);
    setTopRight(val);
    setBottomRight(val);
    setBottomLeft(val);
  };

  return (
    <ToolLayout
      title="Border Radius Visualizer"
      badge="DESIGN CLUSTER"
      description="Experiment with complex corner radiuses and copy clean CSS properties instantly."
      icon={Square}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Corner Controls (px)
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setAll(0)}
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs font-mono"
              >
                0px
              </button>
              <button
                onClick={() => setAll(24)}
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs font-mono"
              >
                24px
              </button>
              <button
                onClick={() => setAll(100)}
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs font-mono"
              >
                Circle
              </button>
            </div>
          </div>

          {/* Top Left */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Top Left</span>
              <span className="text-emerald-400">{topLeft}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={topLeft}
              onChange={(e) => setTopLeft(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Top Right */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Top Right</span>
              <span className="text-emerald-400">{topRight}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={topRight}
              onChange={(e) => setTopRight(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Bottom Right */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Bottom Right</span>
              <span className="text-emerald-400">{bottomRight}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={bottomRight}
              onChange={(e) => setBottomRight(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Bottom Left */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Bottom Left</span>
              <span className="text-emerald-400">{bottomLeft}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={bottomLeft}
              onChange={(e) => setBottomLeft(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Preview & Code Output Panel */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Visual Preview Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex items-center justify-center h-64 shadow-xl">
            <div
              className="w-40 h-40 bg-emerald-500/20 border border-emerald-500/50 transition-all shadow-lg"
              style={{ borderRadius: borderRadiusCss }}
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
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-xs">
              border-radius: {borderRadiusCss};
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}