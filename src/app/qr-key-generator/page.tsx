'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, QrCode, Key, Copy, Check, Download, ShieldCheck, RefreshCw } from 'lucide-react';

export default function QrKeyGeneratorPage() {
  // QR State
  const [qrText, setQrText] = useState('https://killkit.com');
  const [qrSize, setQrSize] = useState(220);
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrFgColor, setQrFgColor] = useState('#000000');

  // Key Generator State
  const [keyLength, setKeyLength] = useState(32);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedKey, setGeneratedKey] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  // Key Generator Function
  const generateSecretKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + (includeSymbols ? '!@#$%^&*()_+-=[]{}|;:,.<>' : '');
    let result = '';
    const array = new Uint32Array(keyLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < keyLength; i++) {
      result += chars[array[i] % chars.length];
    }
    setGeneratedKey(result);
    setCopiedKey(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const downloadSVG = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'killkit-qr.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#0B0F17]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-[#78ff73] transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Network</span>
          </Link>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base">QR Architect & Key Vault</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              WEB & CIPHER
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldCheck size={14} className="text-[#78ff73]" />
          <span>Local Crypto Standard</span>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module 1: QR Code Generator */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                <QrCode size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">QR Code Architect</h2>
                <p className="text-xs text-slate-400">Generate vector SVG QR codes with custom styling</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Target Content (URL or Text)</label>
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Foreground Color</label>
                  <input
                    type="color"
                    value={qrFgColor}
                    onChange={(e) => setQrFgColor(e.target.value)}
                    className="w-full h-10 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer p-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Background Color</label>
                  <input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="w-full h-10 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer p-1"
                  />
                </div>
              </div>
            </div>

            {/* QR Preview Area */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800">
              <div className="p-4 rounded-xl" style={{ backgroundColor: qrBgColor }}>
                <QRCodeSVG
                  id="qr-code-svg"
                  value={qrText || 'https://killkit.com'}
                  size={qrSize}
                  fgColor={qrFgColor}
                  bgColor={qrBgColor}
                  level="H"
                />
              </div>
            </div>
          </div>

          <button
            onClick={downloadSVG}
            className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Download size={16} />
            <span>Download Vector SVG</span>
          </button>
        </div>

        {/* Module 2: Key & Secret Generator */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#78ff73]/10 text-[#78ff73] rounded-xl border border-[#78ff73]/20">
                <Key size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Cryptographic Key Generator</h2>
                <p className="text-xs text-slate-400">Generate high-entropy API keys and passwords</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                  <span>Key Length ({keyLength} chars)</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="128"
                  value={keyLength}
                  onChange={(e) => setKeyLength(Number(e.target.value))}
                  className="w-full accent-[#78ff73] bg-slate-950 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300">Include Special Symbols (!@#$)</span>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 accent-[#78ff73] cursor-pointer"
                />
              </div>

              <button
                onClick={generateSecretKey}
                className="w-full py-3 bg-[#78ff73]/10 hover:bg-[#78ff73]/20 text-[#78ff73] border border-[#78ff73]/30 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                <span>Generate Cryptographic Key</span>
              </button>
            </div>

            {/* Generated Key Output Area */}
            {generatedKey && (
              <div className="space-y-2 animate-fadeIn">
                <label className="block text-xs font-semibold text-slate-400">Generated Secret</label>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-[#78ff73] break-all">{generatedKey}</span>
                  <button
                    onClick={() => copyToClipboard(generatedKey)}
                    className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors shrink-0"
                  >
                    {copiedKey ? <Check size={16} className="text-[#78ff73]" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400">
            🔒 All key generations utilize standard <code className="text-[#78ff73]">window.crypto</code> API. Secrets never leave your browser window.
          </div>
        </div>

      </div>
    </main>
  );
}