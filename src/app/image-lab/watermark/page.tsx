'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, Type, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function WatermarkAdder() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>('© KillKit');
  const [fontSize, setFontSize] = useState<number>(32);
  const [opacity, setOpacity] = useState<number>(0.5);
  const [position, setPosition] = useState<string>('bottom-right');

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
        ctx.drawImage(img, 0, 0);

        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.textBaseline = 'middle';

        const textWidth = ctx.measureText(watermarkText).width;
        let x = 20;
        let y = 40;

        if (position === 'bottom-right') {
          x = canvas.width - textWidth - 30;
          y = canvas.height - 30;
        } else if (position === 'center') {
          x = (canvas.width - textWidth) / 2;
          y = canvas.height / 2;
        } else if (position === 'top-left') {
          x = 30;
          y = 40;
        }

        ctx.fillText(watermarkText, x, y);

        const link = document.createElement('a');
        link.download = 'watermarked-image.png';
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
            <Type className="text-[#78ff73]" /> Watermark Adder
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Protejează-ți imaginile adăugând un marcaj text personalizat direct din browser.
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
              <p className="text-lg font-medium">Incarcă o imagine</p>
              <p className="text-slate-500 text-xs mt-1">Adaugă text de copyright sau logo custom</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-semibold border-b border-slate-800 pb-3">Setări Marcaj</h2>
              
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Text Watermark:</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#78ff73] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Poziție:</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#78ff73] outline-none"
                  >
                    <option value="bottom-right">Jos Dreapta</option>
                    <option value="center">Centru</option>
                    <option value="top-left">Sus Stânga</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <label>Opacitate ({Math.round(opacity * 100)}%):</label>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <label>Dimensiune Font ({fontSize}px):</label>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-[#78ff73] hover:bg-[#66e662] text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(120,255,115,0.3)] text-sm"
                >
                  <Download className="w-4 h-4" /> Descarcă Imaginea
                </button>
                <button
                  onClick={() => setImageSrc(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
              <img
                src={imageSrc}
                alt="Preview"
                className="max-h-[300px] object-contain rounded-lg border border-slate-800"
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}