'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { KeyRound, ShieldCheck, Copy, Check, AlertCircle } from 'lucide-react';

export default function JwtDecoderPage() {
  const [jwtToken, setJwtToken] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const decodeJwt = (token: string) => {
    if (!token.trim()) return null;

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return { error: 'Invalid JWT format. A valid token must contain 3 dot-separated parts (Header, Payload, Signature).' };
    }

    try {
      const base64UrlDecode = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      return { header, payload, signature: parts[2], error: null };
    } catch (err) {
      return { error: 'Failed to decode token. Please verify that the token structure is valid.' };
    }
  };

  const decoded = decodeJwt(jwtToken);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      badge="DEV CLUSTER"
      description="Decode and inspect JSON Web Tokens (JWT) instantly and 100% securely on the client side."
      icon={KeyRound}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">JWT Inspector</h2>
              <p className="text-xs text-slate-400">Paste your token below to decode</p>
            </div>
          </div>

          <textarea
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
            placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            className="w-full h-32 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
          />
        </div>

        {decoded?.error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-400 text-xs font-mono">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{decoded.error}</span>
          </div>
        )}

        {decoded && !decoded.error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Header */}
            <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider">Header (Algorithm & Type)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2), 'header')}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition-colors"
                >
                  {copiedSection === 'header' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'header' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sky-300 text-xs font-mono overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">Payload (Data & Claims)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2), 'payload')}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition-colors"
                >
                  {copiedSection === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'payload' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 text-xs font-mono overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}