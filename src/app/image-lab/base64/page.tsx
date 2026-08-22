'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, Binary, Copy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ImageToBase64() {
  const [base64String, setBase64String] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileDetails({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB'
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      setBase64String(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (!base64String) return;
    navigator.clipboard.writeText(base64String);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Binary className="text-[#78ff73]" /> Image to Base64
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Convertește orice fișier imagine într-un string Data URL Base64 gata de inserat în HTML sau CSS.
          </p>
        </div>

        {/* Content */}
        {!base64String ? (
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
              <p className="text-lg font-medium">Incarcă imaginea pentru conversie Base64</p>
              <p className="text-slate-500 text-xs mt-1">Suportă toate formatele foto</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-mono text-slate-400">
                  {fileDetails?.name} ({fileDetails?.size})
                </span>
                <button
                  onClick={copyToClipboard}
                  className="bg-[#78ff73] hover:bg-[#66e662] text-black font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiat!' : 'Copiază Data URL'}
                </button>
              </div>

              <textarea
                value={base64String}
                readOnly
                className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={() => { setBase64String(''); setFileDetails(null); }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 px-6 rounded-xl flex items-center gap-2 transition-colors text-sm font-mono"
            >
              <RefreshCw className="w-4 h-4" /> Incarcă altă imagine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
