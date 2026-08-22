'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, Maximize2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>('image');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImageSrc(event.target?.result as string);
        setOriginalDimensions({ w: img.width, h: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (keepAspectRatio && originalDimensions.w > 0) {
      const ratio = originalDimensions.h / originalDimensions.w;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (keepAspectRatio && originalDimensions.h > 0) {
      const ratio = originalDimensions.w / originalDimensions.h;
      setWidth(Math.round(val * ratio));
    }
  };

  const handleDownload = () => {
    if (!imageSrc || !width || !height) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const link = document.createElement('a');
        link.download = `${fileName}-${width}x${height}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    img.src = imageSrc;
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-[#78ff73] transition-colors text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> Înapoi la Constelație
          </Link>
          <span className="text-xs font-mono text-[#78ff73] bg-[#78ff73]/10 px-3 py-1 rounded-full border border-[#78ff73]/20">
            Image Lab
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Maximize2 className="text-[#78ff73]" /> Image Resizer
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Redimensionează orice imagine la dimensiuni exacte în pixeli păstrând sau ajustând raportul de aspect.
          </p>
        </div>

        {/* Main Content Area */}
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
              <p className="text-lg font-medium">Apasă sau trage o imagine aici</p>
              <p className="text-slate-500 text-xs mt-1">Suportă PNG, JPG, WEBP, SVG</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-semibold border-b border-slate-800 pb-3">Setări Redimensionare</h2>
              
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <label className="block text-slate-400 mb-1">Lățime (px):</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#78ff73] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Înălțime (px):</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#78ff73] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="aspectRatio"
                    checked={keepAspectRatio}
                    onChange={(e) => setKeepAspectRatio(e.target.checked)}
                    className="accent-[#78ff73] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="aspectRatio" className="text-slate-300 cursor-pointer text-xs">
                    Păstrează proporția (Aspect Ratio)
                  </label>
                </div>

                <div className="text-xs text-slate-500 pt-2 border-t border-slate-800">
                  Dimensiune originală: {originalDimensions.w} x {originalDimensions.h} px
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-[#78ff73] hover:bg-[#66e662] text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(120,255,115,0.3)]"
                >
                  <Download className="w-4 h-4" /> Descarcă Imaginea
                </button>
                <button
                  onClick={() => setImageSrc(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-xl transition-colors"
                  title="Resetează"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-xs font-mono text-slate-500 mb-4">PREVIEW IMAGINE</p>
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