'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Code2, Copy, Check, Sparkles, Eye } from 'lucide-react';

export default function SvgOptimizerPage() {
  const [rawSvg, setRawSvg] = useState<string>(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <!-- Circle Sample -->
  <circle cx="50" cy="50" r="40" stroke="#10b981" stroke-width="4" fill="#0284c7" />
</svg>`);

  const [copied, setCopied] = useState(false);

  // Simple client-side SVG minifier & cleaner
  const optimizeSvg = (svgText: string) => {
    return svgText
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse multiple whitespace
      .replace(/>\s+</g, '><') // remove spaces between tags
      .trim();
  };

  const optimizedSvg = optimizeSvg(rawSvg);

  const rawSize = new Blob([rawSvg]).size;
  const optSize = new Blob([optimizedSvg]).size;
  const savings = rawSize > 0 ? (((rawSize - optSize) / rawSize) * 100).toFixed(1) : 0;

  const copyToClipboard = () => {
    if (!optimizedSvg) return;
    navigator.clipboard.writeText(optimizedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="SVG Optimizer & Viewer"
      badge="MEDIA CLUSTER"
      description="Clean, minify, and optimize raw SVG code with real-time visual preview."
      icon={Code2}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Stats Bar */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 font-mono text-xs">
            <div>
              <span className="text-slate-500">Original: </span>
              <span className="text-slate-300 font-bold">{rawSize} B</span>
            </div>
            <div>
              <span className="text-slate-500">Optimized: </span>
              <span className="text-emerald-400 font-bold">{optSize} B</span>
            </div>
            <div>
              <span className="text-slate-500">Saved: </span>
              <span className="text-sky-400 font-bold">{savings}%</span>
            </div>
          </div>

          <button
            onClick={copyToClipboard}
            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied SVG' : 'Copy Optimized SVG'}</span>
          </button>
        </div>

        {/* Input & Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SVG Code Input */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              Raw SVG Code
            </span>
            <textarea
              value={rawSvg}
              onChange={(e) => setRawSvg(e.target.value)}
              placeholder="Paste raw <svg> code here..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* SVG Live Render */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              Live Visual Render
            </span>

            <div className="w-full h-80 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center p-6 overflow-hidden">
              <div
                dangerouslySetInnerHTML={{ __html: optimizedSvg }}
                className="max-w-full max-h-full flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}