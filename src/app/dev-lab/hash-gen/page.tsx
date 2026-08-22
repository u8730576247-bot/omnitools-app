'use client';

import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Fingerprint, Copy, Check, RefreshCw } from 'lucide-react';

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState({
    sha1: '',
    sha256: '',
    sha512: '',
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateHashes = async (text: string) => {
    if (!text) {
      setHashes({ sha1: '', sha256: '', sha512: '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBufferSha1 = await crypto.subtle.digest('SHA-1', data);
    const hashBufferSha256 = await crypto.subtle.digest('SHA-256', data);
    const hashBufferSha512 = await crypto.subtle.digest('SHA-512', data);

    const bufferToHex = (buffer: ArrayBuffer) =>
      Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    setHashes({
      sha1: bufferToHex(hashBufferSha1),
      sha256: bufferToHex(hashBufferSha256),
      sha512: bufferToHex(hashBufferSha512),
    });
  };

  useEffect(() => {
    generateHashes(inputText);
  }, [inputText]);

  const copyToClipboard = (value: string, key: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolLayout
      title="Hash Generator"
      badge="DEV CLUSTER"
      description="Generate secure cryptographic hashes (SHA-1, SHA-256, SHA-512) in real time directly on your browser."
      icon={Fingerprint}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Input Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Cryptographic Hash Generator</h2>
              <p className="text-xs text-slate-400">Type or paste text to compute real-time hashes</p>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
          />
        </div>

        {/* Hashes Output List */}
        <div className="space-y-4">
          {[
            { label: 'SHA-256 (Recommended)', key: 'sha256', val: hashes.sha256, color: 'emerald' },
            { label: 'SHA-1', key: 'sha1', val: hashes.sha1, color: 'sky' },
            { label: 'SHA-512', key: 'sha512', val: hashes.sha512, color: 'purple' },
          ].map((item) => (
            <div
              key={item.key}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                  {item.label}
                </span>
                <button
                  onClick={() => copyToClipboard(item.val, item.key)}
                  disabled={!item.val}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  {copiedKey === item.key ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === item.key ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <input
                readOnly
                type="text"
                value={item.val}
                placeholder="Hash string will be generated here..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none select-all"
              />
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}