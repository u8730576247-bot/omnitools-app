'use client';

import React, { useState } from 'react';
import { ArrowLeft, Ratio, Lock, Unlock, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState<number | ''>(1920);
  const [height, setHeight] = useState<number | ''>(1080);
  const [ratioWidth, setRatioWidth] = useState<number>(16);
  const [ratioHeight, setRatioHeight] = useState<number>(9);
  const [isLocked, setIsLocked] = useState<boolean>(true);

  const handleWidthChange = (val: number | '') => {
    setWidth(val);
    if (isLocked && typeof val === 'number' && ratioWidth > 0) {
      setHeight(Math.round((val * ratioHeight) / ratioWidth));
    }
  };

  const handleHeightChange = (val: number | '') => {
    setHeight(val);
    if (isLocked && typeof val === 'number' && ratioHeight > 0) {
      setWidth(Math.round((val * ratioWidth) / ratioHeight));
    }
  };

  const setPresetRatio = (rw: number, rh: number) => {
    setRatioWidth(rw);
    setRatioHeight(rh);
    if (typeof width === 'number') {
      setHeight(Math.round((width * rh) / rw));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-[#78ff73] transition-colors text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> Înapoi la Constelație
          </Link>
          <span className="text-xs font-mono text-[#78ff73] bg-[#78ff73]/10 px-3 py-1 rounded-full border border-[#78ff73]/20">
            Image Lab
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Ratio className="text-[#78ff73]" /> Aspect Ratio Calculator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Calculează instant dimensiunile proporționale pentru imagini, layout-uri responsive și conținut video.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: '16:9 (Video / Monitor)', w: 16, h: 9 },
            { label: '4:3 (TV Clasic / Foto)', w: 4, h: 3 },
            { label: '1:1 (Pătrat / Social)', w: 1, h: 1 },
            { label: '9:16 (Stories / Reels)', w: 9, h: 16 },
            { label: '21:9 (Ultrawide)', w: 21, h: 9 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => setPresetRatio(preset.w, preset.h)}
              className={`text-xs font-mono px-3 py-2 rounded-xl border transition-all ${
                ratioWidth === preset.w && ratioHeight === preset.h
                  ? 'bg-[#78ff73] text-black border-[#78ff73] font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Calculator Form */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">LĂȚIME (Width - px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-lg font-mono text-white focus:border-[#78ff73] outline-none"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`p-3 rounded-full border transition-all ${
                  isLocked ? 'bg-[#78ff73]/10 border-[#78ff73]/30 text-[#78ff73]' : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
                title={isLocked ? 'Proporție blocată' : 'Proporție deblocată'}
              >
                {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">ÎNĂLȚIME (Height - px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-lg font-mono text-white focus:border-[#78ff73] outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>RATA CURENTĂ: <strong className="text-[#78ff73]">{ratioWidth}:{ratioHeight}</strong></span>
            <span>PROPORȚIE: <strong className="text-white">{typeof width === 'number' && typeof height === 'number' && height > 0 ? (width / height).toFixed(2) : 0}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}