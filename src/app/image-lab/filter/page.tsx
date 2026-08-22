'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, Sliders, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function FilterStudio() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [sepia, setSepia] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px)`;
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    img.src = imageSrc;
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setSepia(0);
    setBlur(0);
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
            <Sliders className="text-[#78ff73]" /> Filter Studio
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Aplică filtre și ajustări vizuale live fără a încărca fișierele pe vreun server extern.
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
              <p className="text-lg font-medium">Încarcă o imagine</p>
              <p className="text-slate-500 text-xs mt-1">Ajustează luminozitatea, contrastul și efectele</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-semibold border-b border-slate-800 pb-3">Reglaje Filtre</h2>
              
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <label>Luminozitate ({brightness}%):</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <label>Contrast ({contrast}%):</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <label>Alb-Negru ({grayscale}%):</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={grayscale}
                    onChange={(e) => setGrayscale(Number(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <label>Sepia ({sepia}%):</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sepia}
                    onChange={(e) => setSepia(Number(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <label>Blur ({blur}px):</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={blur}
                    onChange={(e) => setBlur(Number(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-[#78ff73] hover:bg-[#66e662] text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(120,255,115,0.3)] text-sm"
                >
                  <Download className="w-4 h-4" /> Descarcă
                </button>
                <button
                  onClick={resetFilters}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-xl transition-colors"
                  title="Resetează Filtrele"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-xs font-mono text-slate-500 mb-4">PREVIEW ÎN TIMP REAL</p>
              <img
                src={imageSrc}
                alt="Preview"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px)`
                }}
                className="max-h-[300px] object-contain rounded-lg border border-slate-800 transition-all duration-75"
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}