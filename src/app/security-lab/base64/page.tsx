'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Binary, Copy, Check, ArrowRightLeft } from 'lucide-react';

export default function Base64Page() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello, KillKit!');
  const [copied, setCopied] = useState(false);

  // Safe UTF-8 Base64 Process with useMemo to avoid re-render loops
  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: '', error: null };
    }

    if (mode === 'encode') {
      try {
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        return { output: encoded, error: null };
      } catch (e) {
        return { output: '', error: 'Encoding error' };
      }
    } else {
      try {
        const decoded = decodeURIComponent(
          Array.prototype.map
            .call(atob(input.trim()), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return { output: decoded, error: null };
      } catch (e) {
        return { output: '', error: 'Invalid Base64 string' };
      }
    }
  }, [input, mode]);

  const toggleMode = () => {
    const nextMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(nextMode);
    if (output && !error) {
      setInput(output);
    }
  };

  const copyToClipboard = () => {
    if (!output || error) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      badge="SECURITY CLUSTER"
      description="Encode plain text into Base64 format or decode Base64 back to text with UTF-8 support."
      icon={Binary}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Mode Switcher */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'encode'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              ENCODE
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'decode'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              DECODE
            </button>
          </div>

          <button
            onClick={toggleMode}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-xl flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Swap Mode & Text</span>
          </button>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Type text to encode...' : 'Paste Base64 to decode...'}
              className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                {mode === 'encode' ? 'Base64 Result' : 'Plain Text Result'}
              </span>
              <button
                onClick={copyToClipboard}
                disabled={!output || !!error}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={error ? error : output}
              className={`w-full h-64 p-4 bg-slate-950 border rounded-xl text-xs font-mono focus:outline-none resize-none transition-colors ${
                error ? 'border-rose-500/50 text-rose-400' : 'border-slate-800 text-emerald-400'
              }`}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}