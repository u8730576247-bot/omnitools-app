'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Palette, Copy, Check, RefreshCw } from 'lucide-react';

export default function ColorPalettePage() {
  const [baseColor, setBaseColor] = useState('#10b981');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Convert HEX to HSL
  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Convert HSL back to HEX
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generatePalette = () => {
    const { h, s, l } = hexToHsl(baseColor);
    return [
      { label: 'Base', hex: baseColor },
      { label: 'Lighter', hex: hslToHex(h, s, Math.min(l + 20, 95)) },
      { label: 'Darker', hex: hslToHex(h, s, Math.max(l - 20, 10)) },
      { label: 'Complementary', hex: hslToHex((h + 180) % 360, s, l) },
      { label: 'Analogous +', hex: hslToHex((h + 30) % 360, s, l) },
      { label: 'Analogous -', hex: hslToHex((h + 330) % 360, s, l) },
    ];
  };

  const palette = generatePalette();

  const generateRandomHex = () => {
    const random = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setBaseColor(random);
  };

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="Color Picker & Palette Generator"
      badge="MEDIA CLUSTER"
      description="Pick colors and generate complementary color schemes instantly for your projects."
      icon={Palette}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Color Input Controls */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-12 rounded-xl border-0 bg-transparent cursor-pointer"
            />
            <div>
              <span className="text-xs font-mono text-slate-400 block">Base Color HEX</span>
              <span className="text-lg font-mono font-bold text-white uppercase">{baseColor}</span>
            </div>
          </div>

          <button
            onClick={generateRandomHex}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-mono font-semibold rounded-xl flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Random Base Color</span>
          </button>
        </div>

        {/* Palette Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {palette.map((item, idx) => (
            <div
              key={idx}
              onClick={() => copyToClipboard(item.hex, idx)}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex flex-col items-center gap-3 cursor-pointer hover:border-emerald-500/50 transition-all shadow-lg group"
            >
              <div
                className="w-full h-24 rounded-xl shadow-inner border border-white/10"
                style={{ backgroundColor: item.hex }}
              />
              <div className="text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-mono block uppercase">{item.label}</span>
                <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 uppercase transition-colors">
                  {item.hex}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedIndex === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedIndex === idx ? 'Copied' : 'Click to Copy'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}