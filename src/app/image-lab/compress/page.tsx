'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, Download, Minimize2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ImageCompressor() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.75);
  const [fileName, setFileName] = useState<string>('image');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    setOriginalSize(file.size);
    setMimeType(file.type === 'image/png' ? 'image/png' : 'image/jpeg');

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (mimeType === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL(mimeType, quality);
        // Calculăm dimensiunea aproximativă în octeți din Base64
        const head = `data:${mimeType};base64,`;
        const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
        setCompressedSize(sizeInBytes);
      }
    };
    img.src = imageSrc;
  }, [imageSrc, quality, mimeType]);

  const handleDownload = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (mimeType === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        const ext = mimeType.split('/')[1];
        const link = document.createElement('a');
        link.download = `${fileName}-compressed.${ext}`;
        link.href = canvas.toDataURL(mimeType, quality);
        link.click();
      }
    };
    img.src = imageSrc;
  };

  const formatKB = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  const savedPercentage = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

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
            <Minimize2 className="text-[#78ff73]" /> Image Shrinker
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Comprimă fișiere JPG, PNG și WEBP pentru a reduce dimensiunea fără pierderi vizibile de calitate.
          </p>
        </div>

        {/* Upload Area */}
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
              <p className="text-lg font-medium">Alege o imagine de comprimat</p>
              <p className="text-slate-500 text-xs mt-1">Suportă JPG, JPEG, WEBP, PNG</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-semibold border-b border-slate-800 pb-3">Setări Comprimare</h2>
              
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <div className="flex justify-between text-slate-400 mb-2">
                    <label>Nivel Calitate:</label>
                    <span className="text-[#78ff73] font-bold">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-[#78ff73] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-2">Format de ieșire:</label>
                  <select
                    value={mimeType}
                    onChange={(e) => setMimeType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-[#78ff73] outline-none cursor-pointer"
                  >
                    <option value="image/jpeg">JPG (Comprimare excelentă)</option>
                    <option value="image/webp">WEBP (Optimizat web modern)</option>
                    <option value="image/png">PNG (Calitate maximă)</option>
                  </select>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Dimensiune inițială:</span>
                    <span className="text-white font-bold">{formatKB(originalSize)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Dimensiune estimată:</span>
                    <span className="text-[#78ff73] font-bold">{formatKB(compressedSize)}</span>
                  </div>
                  {savedPercentage > 0 && (
                    <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                      <span>Reducere:</span>
                      <span className="text-[#78ff73] font-bold">-{savedPercentage}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-[#78ff73] hover:bg-[#66e662] text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(120,255,115,0.3)]"
                >
                  <Download className="w-4 h-4" /> Comprimă & Descarcă
                </button>
                <button
                  onClick={() => setImageSrc(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-xl transition-colors"
                  title="Alege altă imagine"
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