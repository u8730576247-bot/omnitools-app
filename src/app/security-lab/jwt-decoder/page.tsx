'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { ShieldAlert, Copy, Check, FileCode2 } from 'lucide-react';

export default function JwtDecoderPage() {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const decodedJwt = useMemo(() => {
    if (!token.trim()) {
      return { header: null, payload: null, error: null };
    }

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return { header: null, payload: null, error: 'Invalid JWT structure (must have 3 parts separated by dots)' };
    }

    try {
      const base64UrlDecode = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          Array.prototype.map
            .call(atob(base64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const headerObj = JSON.parse(base64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(base64UrlDecode(parts[1]));

      return {
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2),
        error: null,
      };
    } catch (e) {
      return { header: null, payload: null, error: 'Failed to parse JSON content inside JWT' };
    }
  }, [token]);

  const copyToClipboard = (text: string, section: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <ToolLayout
      title="JWT Decoder & Inspector"
      badge="SECURITY CLUSTER"
      description="Decode JSON Web Tokens (JWT) locally in browser to inspect header, payload claims, and structure."
      icon={FileCode2}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Token Input */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Encoded JWT Token
          </span>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your encoded JWT token (header.payload.signature)..."
            className="w-full h-28 p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none break-all transition-colors"
          />
        </div>

        {decodedJwt.error ? (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3 text-rose-400 text-xs font-mono">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{decodedJwt.error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Decoded Header */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider">
                  Header (Algorithm & Token Type)
                </span>
                <button
                  onClick={() => copyToClipboard(decodedJwt.header || '', 'header')}
                  disabled={!decodedJwt.header}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  {copiedSection === 'header' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'header' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={decodedJwt.header || ''}
                className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-rose-300 text-xs font-mono focus:outline-none resize-none"
              />
            </div>

            {/* Decoded Payload */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider">
                  Payload (Claims & Data)
                </span>
                <button
                  onClick={() => copyToClipboard(decodedJwt.payload || '', 'payload')}
                  disabled={!decodedJwt.payload}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  {copiedSection === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'payload' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={decodedJwt.payload || ''}
                className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-sky-300 text-xs font-mono focus:outline-none resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}