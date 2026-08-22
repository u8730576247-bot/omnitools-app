'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Contrast, CheckCircle2, XCircle } from 'lucide-react';

// Helper to convert hex to RGB
function hexToRgb(hex: string) {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate contrast ratio
function getContrastRatio(hex1: string, hex2: string) {
  try {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch {
    return 1;
  }
}

export default function ContrastCheckerPage() {
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#0B0F17');

  const ratio = getContrastRatio(textColor, bgColor);
  const formattedRatio = ratio.toFixed(2);

  // WCAG thresholds
  const normalAa = ratio >= 4.5;
  const normalAaa = ratio >= 7;
  const largeAa = ratio >= 3;
  const largeAaa = ratio >= 4.5;

  return (
    <ToolLayout
      title="Color Palette Contrast Checker"
      badge="DESIGN CLUSTER"
      description="Verify text and background color contrast ratios against official WCAG 2.1 accessibility standards."
      icon={Contrast}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Color Pickers Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Text Color */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Text Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer p-1"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 uppercase"
              />
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Background Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer p-1"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 uppercase"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div
          className="rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center space-y-3 transition-colors"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <h3 className="text-2xl font-bold">Sample Heading Text</h3>
          <p className="text-sm max-w-md opacity-90">
            This is a live preview showing how your selected color combination looks in real-world paragraphs and UI components.
          </p>
          <span className="text-xs font-mono px-3 py-1 rounded-full border border-current opacity-75">
            Contrast Ratio: {formattedRatio}:1
          </span>
        </div>

        {/* WCAG Compliance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Normal Text */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">Normal Text (&lt; 18px)</span>
              <span className="text-xs font-mono text-slate-500">Req: 4.5:1 / 7:1</span>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span>WCAG AA</span>
                {normalAa ? (
                  <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Pass</span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400"><XCircle className="w-4 h-4" /> Fail</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>WCAG AAA</span>
                {normalAaa ? (
                  <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Pass</span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400"><XCircle className="w-4 h-4" /> Fail</span>
                )}
              </div>
            </div>
          </div>

          {/* Large Text */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">Large Text (≥ 18px / Bold)</span>
              <span className="text-xs font-mono text-slate-500">Req: 3:1 / 4.5:1</span>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span>WCAG AA</span>
                {largeAa ? (
                  <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Pass</span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400"><XCircle className="w-4 h-4" /> Fail</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>WCAG AAA</span>
                {largeAaa ? (
                  <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Pass</span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400"><XCircle className="w-4 h-4" /> Fail</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}