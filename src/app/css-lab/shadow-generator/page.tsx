'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Palette, Copy, Check } from 'lucide-react';

export default function ShadowGeneratorPage() {
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.3);
  const [copied, setCopied] = useState(false);

  // Convert hex color + opacity to rgba
  const getRgbaColor = (hex: string, alpha: number) => {
    let c = hex.replace('#', '');
    if (c.length === 3) {
      c = c.split('').map((char) => char + char).join('');
    }
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowCss = `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${getRgbaColor(color, opacity)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${shadowCss};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="CSS Box Shadow Generator"
      badge="DESIGN CLUSTER"
      description="Design layered box shadows, tweak offsets and blurs, and grab clean CSS code instantly."
      icon={Palette}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Shadow Parameters
          </span>

          {/* X Offset */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Horizontal Offset (X)</span>
              <span className="text-emerald-400">{xOffset}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={xOffset}
              onChange={(e) => setXOffset(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Y Offset */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Vertical Offset (Y)</span>
              <span className="text-emerald-400">{yOffset}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={yOffset}
              onChange={(e) => setYOffset(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Blur Radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Blur Radius</span>
              <span className="text-emerald-400">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Spread Radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Spread Radius</span>
              <span className="text-emerald-400">{spread}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Opacity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Shadow Opacity</span>
              <span className="text-emerald-400">{opacity}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Preview & Code Output Panel */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Visual Preview Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex items-center justify-center h-64 shadow-xl">
            <div
              className="w-32 h-32 bg-slate-950 border border-slate-800 rounded-2xl transition-all"
              style={{ boxShadow: shadowCss }}
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
              box-shadow: {shadowCss};
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}