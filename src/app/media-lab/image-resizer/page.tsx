'use client';

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Image as ImageIcon, Download, Upload, RefreshCw } from 'lucide-react';

export default function ImageResizerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [keepAspect, setKeepAspect] = useState<boolean>(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      setAspectRatio(img.width / img.height);
      processImage(img, img.width, img.height, quality);
    };
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    let newHeight = height;
    if (keepAspect && aspectRatio) {
      newHeight = Math.round(newWidth / aspectRatio);
      setHeight(newHeight);
    }
    reprocess(newWidth, newHeight, quality);
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    let newWidth = width;
    if (keepAspect && aspectRatio) {
      newWidth = Math.round(newHeight * aspectRatio);
      setWidth(newWidth);
    }
    reprocess(newWidth, newHeight, quality);
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    reprocess(width, height, newQuality);
  };

  const reprocess = (w: number, h: number, q: number) => {
    if (!previewUrl) return;
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => processImage(img, w, h, q);
  };

  const processImage = (img: HTMLImageElement, w: number, h: number, q: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w || 100;
    canvas.height = h || 100;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, w, h);
    const dataUrl = canvas.toDataURL('image/jpeg', q / 100);
    setResizedUrl(dataUrl);
  };

  return (
    <ToolLayout
      title="Image Resizer & Compressor"
      badge="MEDIA CLUSTER"
      description="Resize, compress, and optimize images directly in your browser with live preview."
      icon={ImageIcon}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Upload Box */}
        {!selectedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-900/50 rounded-2xl p-12 text-center cursor-pointer transition-colors space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Click or drag image here to upload</p>
              <p className="text-xs text-slate-400">Supports PNG, JPG, WEBP</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                  Dimensions & Quality
                </span>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setResizedUrl(null);
                  }}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Change Image
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-1 block">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-1 block">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="aspect"
                  checked={keepAspect}
                  onChange={(e) => setKeepAspect(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="aspect" className="text-xs text-slate-300 font-mono cursor-pointer">
                  Maintain Aspect Ratio
                </label>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Compression Quality</span>
                  <span className="text-emerald-400">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {resizedUrl && (
                <a
                  href={resizedUrl}
                  download={`resized-${selectedFile.name}`}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resized Image</span>
                </a>
              )}
            </div>

            {/* Preview Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between items-center space-y-4 shadow-xl">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider self-start">
                Optimized Preview
              </span>
              {resizedUrl ? (
                <img
                  src={resizedUrl}
                  alt="Resized preview"
                  className="max-h-64 rounded-xl border border-slate-800 object-contain"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-600 text-xs font-mono">
                  Processing image...
                </div>
              )}
              <div className="text-[11px] font-mono text-slate-500">
                Target Size: {width}x{height}px
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}