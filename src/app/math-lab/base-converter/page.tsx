'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Binary, Copy, Check } from 'lucide-react';

export default function BaseConverterPage() {
  const [dec, setDec] = useState<string>('255');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const num = parseInt(dec, 10);
  const isValid = !isNaN(num);

  const hex = isValid ? num.toString(16).toUpperCase() : '';
  const bin = isValid ? num.toString(2) : '';
  const oct = isValid ? num.toString(8) : '';

  const handleInputChange = (value: string, base: number) => {
    if (!value.trim()) {
      setDec('');
      return;
    }
    const parsed = parseInt(value, base);
    if (!isNaN(parsed)) {
      setDec(parsed.toString(10));
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolLayout
      title="Number Base Converter"
      badge="MATH CLUSTER"
      description="Convert numbers seamlessly between Decimal, Hexadecimal, Binary, and Octal formats."
      icon={Binary}
    >
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Decimal Input */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
              Decimal (Base 10)
            </span>
            <button
              onClick={() => copyToClipboard(dec, 'dec')}
              disabled={!dec}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              {copiedKey === 'dec' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'dec' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <input
            type="number"
            value={dec}
            onChange={(e) => setDec(e.target.value)}
            placeholder="Enter decimal number..."
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Hexadecimal */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider">
              Hexadecimal (Base 16)
            </span>
            <button
              onClick={() => copyToClipboard(hex, 'hex')}
              disabled={!hex}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'hex' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleInputChange(e.target.value, 16)}
            placeholder="Enter hex value..."
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sky-300 font-mono text-sm focus:outline-none focus:border-sky-500/50 uppercase"
          />
        </div>

        {/* Binary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
              Binary (Base 2)
            </span>
            <button
              onClick={() => copyToClipboard(bin, 'bin')}
              disabled={!bin}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              {copiedKey === 'bin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'bin' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <input
            type="text"
            value={bin}
            onChange={(e) => handleInputChange(e.target.value, 2)}
            placeholder="Enter binary digits..."
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-amber-300 font-mono text-sm focus:outline-none focus:border-amber-500/50 break-all"
          />
        </div>

        {/* Octal */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-purple-400 font-mono uppercase tracking-wider">
              Octal (Base 8)
            </span>
            <button
              onClick={() => copyToClipboard(oct, 'oct')}
              disabled={!oct}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              {copiedKey === 'oct' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'oct' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <input
            type="text"
            value={oct}
            onChange={(e) => handleInputChange(e.target.value, 8)}
            placeholder="Enter octal value..."
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-purple-300 font-mono text-sm focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>
    </ToolLayout>
  );
}