'use client';

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Image as ImageIcon, Upload, Download, RefreshCw } from 'lucide-react';

export default function ImageCompressorPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/webp');
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageSrc(result);
      processImage(result, quality, format);
    };
    reader.readAsDataURL(file);
  };

  const processImage = (src: string, qual: number, targetFormat: string) => {
    setLoading(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setLoading(false);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(targetFormat, qual / 100);
      setCompressedUrl(dataUrl);

      // Estimate compressed size from base64 string length
      const base64Length = dataUrl.split(',')[1].length;
      const sizeInBytes = Math.round((base64Length * 3) / 4);
      setCompressedSize(sizeInBytes);
      setLoading(false);
    };
  };

  const handleQualityChange = (newQual: number) => {
    setQuality(newQual);
    if (imageSrc) {
      processImage(imageSrc, newQual, format);
    }
  };

  const handleFormatChange = (newFormat: 'image/jpeg' | 'image/webp' | 'image/png') => {
    setFormat(newFormat);
    if (imageSrc) {
      processImage(imageSrc, quality, newFormat);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionSavings = originalSize > 0 ? Math.max(0, Math.round((1 - compressedSize / originalSize) * 100)) : 0;

  return (
    <ToolLayout
      title="Image Compression & WebP Converter"
      badge="PERFORMANCE CLUSTER"
      description="Compress, resize, and convert images into modern WebP or optimized formats directly in your browser."
      icon={ImageIcon}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-slate-900/90 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 text-center cursor-pointer transition-all shadow-xl group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="max-w-xs mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-400 group-hover:text-emerald-400 transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200 font-mono">Click to upload an image</p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">Supports PNG, JPG, JPEG, WEBP</p>
            </div>
          </div>
        </div>

        {imageSrc && (
          <>
            {/* Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Target Format</label>
                <div className="flex gap-2">
                  {(['image/webp', 'image/jpeg', 'image/png'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => handleFormatChange(f)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                        format === f
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {f.replace('image/', '')}
                    </button>
                  ))}
                </div>
              </div>

              {format !== 'image/png' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Quality</span>
                    <span className="text-emerald-400">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => handleQualityChange(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Stats & Download */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block">Original</span>
                  <span className="text-slate-200 font-bold">{formatBytes(originalSize)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Compressed</span>
                  <span className="text-emerald-400 font-bold">{formatBytes(compressedSize)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Savings</span>
                  <span className="text-emerald-400 font-bold">-{compressionSavings}%</span>
                </div>
              </div>

              <a
                href={compressedUrl || '#'}
                download={`optimized.${format.replace('image/', '')}`}
                className={`px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 ${
                  loading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>Download Optimized Image</span>
              </a>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
}