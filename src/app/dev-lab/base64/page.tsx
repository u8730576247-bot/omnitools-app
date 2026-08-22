'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Code2, Copy, Check, ArrowRightLeft, RefreshCw } from 'lucide-react';

export default function Base64ConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (input: string, currentMode: 'encode' | 'decode') => {
    setInputText(input);
    setError(null);

    if (!input.trim()) {
      setOutputText('');
      return;
    }

    try {
      if (currentMode === 'encode') {
        // UTF-8 friendly Base64 Encode
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutputText(encoded);
      } else {
        // UTF-8 friendly Base64 Decode
        const decoded = decodeURIComponent(
          Array.prototype.map
            .call(atob(input.trim()), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        setOutputText(decoded);
      }
    } catch (err) {
      setError(
        currentMode === 'decode'
          ? 'Invalid Base64 string format.'
          : 'Failed to encode input text.'
      );
      setOutputText('');
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInputText(outputText);
    handleConvert(outputText, newMode);
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      badge="DEV CLUSTER"
      description="Convert text to Base64 format or decode Base64 back to plain text securely in real time."
      icon={Code2}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Bar */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Mode: <span className="text-emerald-400 uppercase font-mono">{mode}</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                {mode === 'encode' ? 'Plain Text ➔ Base64' : 'Base64 ➔ Plain Text'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleMode}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
            <span>Switch to {mode === 'encode' ? 'Decode' : 'Encode'}</span>
          </button>
        </div>

        {/* Input & Output Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Input {mode === 'encode' ? '(Plain Text)' : '(Base64)'}
              </span>
              {inputText && (
                <button
                  onClick={() => handleConvert('', mode)}
                  className="text-[11px] text-rose-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={inputText}
              onChange={(e) => handleConvert(e.target.value, mode)}
              placeholder={
                mode === 'encode'
                  ? 'Type or paste plain text here...'
                  : 'Paste Base64 string here...'
              }
              className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Output {mode === 'encode' ? '(Base64)' : '(Plain Text)'}
              </span>
              <button
                onClick={copyToClipboard}
                disabled={!outputText}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={error ? error : outputText}
              placeholder="Output will appear here instantly..."
              className={`w-full h-64 p-4 bg-slate-950 border rounded-xl text-xs font-mono focus:outline-none resize-none transition-colors ${
                error
                  ? 'border-rose-500/50 text-rose-400 font-sans'
                  : 'border-slate-800 text-emerald-400'
              }`}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}