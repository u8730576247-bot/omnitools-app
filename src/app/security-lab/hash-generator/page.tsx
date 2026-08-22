'use client';

import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { KeyRound, Copy, Check, Hash } from 'lucide-react';

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState('Hello, KillKit Security!');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const computeHashes = async (text: string) => {
    if (!text) {
      setSha256Hash('');
      setSha512Hash('');
      setSha1Hash('');
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // SHA-256
    const buf256 = await crypto.subtle.digest('SHA-256', data);
    const hash256 = Array.from(new Uint8Array(buf256))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setSha256Hash(hash256);

    // SHA-512
    const buf512 = await crypto.subtle.digest('SHA-512', data);
    const hash512 = Array.from(new Uint8Array(buf512))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setSha512Hash(hash512);

    // SHA-1
    const buf1 = await crypto.subtle.digest('SHA-1', data);
    const hash1 = Array.from(new Uint8Array(buf1))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setSha1Hash(hash1);
  };

  useEffect(() => {
    computeHashes(inputText);
  }, [inputText]);

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolLayout
      title="Hash Generator (SHA-256, SHA-512)"
      badge="SECURITY CLUSTER"
      description="Compute secure cryptographic hashes using browser-native Web Crypto API."
      icon={Hash}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Input Text Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Input Text
          </span>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to generate hash..."
            className="w-full h-28 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
          />
        </div>

        {/* Hashes Output List */}
        <div className="space-y-4">
          {/* SHA-256 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                SHA-256
              </span>
              <button
                onClick={() => copyToClipboard(sha256Hash, 'sha256')}
                disabled={!sha256Hash}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copiedKey === 'sha256' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sha256' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono break-all select-all">
              {sha256Hash || 'Waiting for input...'}
            </div>
          </div>

          {/* SHA-512 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider">
                SHA-512
              </span>
              <button
                onClick={() => copyToClipboard(sha512Hash, 'sha512')}
                disabled={!sha512Hash}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copiedKey === 'sha512' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sha512' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono break-all select-all max-h-32 overflow-y-auto">
              {sha512Hash || 'Waiting for input...'}
            </div>
          </div>

          {/* SHA-1 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                SHA-1
              </span>
              <button
                onClick={() => copyToClipboard(sha1Hash, 'sha1')}
                disabled={!sha1Hash}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copiedKey === 'sha1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sha1' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono break-all select-all">
              {sha1Hash || 'Waiting for input...'}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}