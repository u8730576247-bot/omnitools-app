'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { QrCode, Download, Copy, Check } from 'lucide-react';

export default function QrGeneratorPage() {
  const [text, setText] = useState('https://killkit.dev');
  const [size, setSize] = useState(250);
  const [copied, setCopied] = useState(false);

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  const copyImageLink = () => {
    navigator.clipboard.writeText(qrApiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      badge="MEDIA CLUSTER"
      description="Generate instant downloadable QR codes for websites, text, Wi-Fi credentials, or contact info."
      icon={QrCode}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              QR Code Configuration
            </span>

            <div>
              <label className="text-xs font-mono text-slate-400 mb-1.5 block">URL or Text Content</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or plain text..."
                className="w-full h-28 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Image Size</span>
                <span className="text-emerald-400">{size}x{size} px</span>
              </div>
              <input
                type="range"
                min="150"
                max="500"
                step="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* QR Code Preview Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider self-start">
              Live Preview
            </span>

            <div className="bg-white p-4 rounded-2xl shadow-2xl flex items-center justify-center">
              {text ? (
                <img
                  src={qrApiUrl}
                  alt="Generated QR Code"
                  className="w-48 h-48 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs font-mono text-center">
                  Enter text to generate
                </div>
              )}
            </div>

            <div className="flex gap-3 w-full">
              <a
                href={qrApiUrl}
                download="qrcode.png"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>

              <button
                onClick={copyImageLink}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}