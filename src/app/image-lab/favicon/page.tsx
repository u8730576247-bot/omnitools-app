'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function FaviconGenerator() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('favicon');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateAndDownload = (size: number) => {
    if (!imageSrc) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        const link = document.createElement('a');
        link.download = `favicon-${size}x${size}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    img.src = imageSrc;
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
            <Sparkles className="text-[#78ff73]" /> Favicon Generator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Transformă repede orice imagine sau logo în pachet complet de favicon-uri optimizate pentru site-uri web și aplicații web/mobile.
          </p>
        </div>

        {/* Content */}
        {!imageSrc ? (
          <div className="border-2 border-dashed border-slate-800 hover:border-[#78ff73]/50 transition-colors rounded-2xl p-12 text-center bg-slate-900/40 flex flex-col items-center justify-center gap-4 cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-16 h-16 rounded-full bg-slate-800 text-[#78ff73] flex items-center justify-center">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-medium">Incarcă un logo sau iconiță</p>
              <p className="text-slate-500 text-xs mt-1">Formate recomandate: PNG pătrat (ex: 512x512px)</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Download Options */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-semibold border-b border-slate-800 pb-3">Descarcă Dimensiuni</h2>
              
              <div className="space-y-3 font-mono text-sm">
                <button
                  onClick={() => generateAndDownload(16)}
                  className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-xl flex items-center justify-between transition-colors"
                >
                  <span className="text-slate-300">16 x 16 px (Browser standard)</span>
                  <Download className="w-4 h-4 text-[#78ff73]" />
                </button>
                <button
                  onClick={() => generateAndDownload(32)}
                  className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-xl flex items-center justify-between transition-colors"
                >
                  <span className="text-slate-300">32 x 32 px (Retina Display)</span>
                  <Download className="w-4 h-4 text-[#78ff73]" />
                </button>
                <button
                  onClick={() => generateAndDownload(180)}
                  className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-xl flex items-center justify-between transition-colors"
                >
                  <span className="text-slate-300">180 x 180 px (Apple Touch Icon)</span>
                  <Download className="w-4 h-4 text-[#78ff73]" />
                </button>
                <button
                  onClick={() => generateAndDownload(512)}
                  className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-xl flex items-center justify-between transition-colors"
                >
                  <span className="text-slate-300">512 x 512 px (PWA & Android)</span>
                  <Download className="w-4 h-4 text-[#78ff73]" />
                </button>
              </div>

              <button
                onClick={() => setImageSrc(null)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm font-mono"
              >
                <RefreshCw className="w-4 h-4" /> Încarcă alta
              </button>
            </div>

            {/* Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-xs font-mono text-slate-500 mb-6">PREVIEW ÎN BROWSER TAB</p>
              
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 w-full max-w-sm flex items-center gap-3">
                <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                  <img src={imageSrc} alt="Favicon" className="w-full h-full object-cover" />
                </div>
                <div className="text-xs text-slate-400 font-mono truncate">
                  {fileName} • Site-ul tău
                </div>
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}