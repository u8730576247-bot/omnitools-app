'use client';

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Smartphone, Upload, Download, Check, Layers } from 'lucide-react';

const ICON_SIZES = [
  { name: 'Android mdpi', size: 48, folder: 'mipmap-mdpi' },
  { name: 'Android hdpi', size: 72, folder: 'mipmap-hdpi' },
  { name: 'Android xhdpi', size: 96, folder: 'mipmap-xhdpi' },
  { name: 'Android xxhdpi', size: 144, folder: 'mipmap-xxhdpi' },
  { name: 'Android xxxhdpi', size: 192, folder: 'mipmap-xxxhdpi' },
  { name: 'iOS App Icon (20x20 @2x)', size: 40, folder: 'ios-icon-20@2x' },
  { name: 'iOS App Icon (29x29 @2x)', size: 58, folder: 'ios-icon-29@2x' },
  { name: 'iOS App Icon (40x40 @2x)', size: 80, folder: 'ios-icon-40@2x' },
  { name: 'iOS App Icon (60x60 @2x)', size: 120, folder: 'ios-icon-60@2x' },
  { name: 'iOS App Store (1024x1024)', size: 1024, folder: 'ios-appstore-1024' },
];

export default function IconResizerPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateResizedDataUrl = (targetSize: number) => {
    if (!imageSrc) return '';
    const canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const img = new Image();
    img.src = imageSrc;
    // Synchronous data url generation fallback via pre-rendered canvas or image load
    ctx.drawImage(img, 0, 0, targetSize, targetSize);
    return canvas.toDataURL('image/png');
  };

  return (
    <ToolLayout
      title="App Icon & Asset Resizer"
      badge="MOBILE CLUSTER"
      description="Upload a master app icon and generate standard multi-resolution assets for iOS and Android instantly."
      icon={Smartphone}
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
              <p className="text-xs font-bold text-slate-200 font-mono">Upload Master Icon (1024x1024px recommended)</p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">{fileName ? `Loaded: ${fileName}` : 'PNG, JPG supported'}</p>
            </div>
          </div>
        </div>

        {/* Generated Assets List */}
        {imageSrc && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" /> Generated Target Resolutions
              </span>
              <span className="text-xs font-mono text-slate-500">{ICON_SIZES.length} variants available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ICON_SIZES.map((item, idx) => {
                const resizedUrl = generateResizedDataUrl(item.size);
                return (
                  <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden border border-slate-800 flex-shrink-0">
                        {resizedUrl && <img src={resizedUrl} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 font-mono">{item.name}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">{item.size}x{item.size}px • {item.folder}</span>
                      </div>
                    </div>
                    <a
                      href={resizedUrl}
                      download={`icon-${item.size}x${item.size}.png`}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 rounded-lg transition-colors flex-shrink-0"
                      title="Download Variant"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}