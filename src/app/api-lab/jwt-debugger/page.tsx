'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { KeyRound, ShieldCheck, ShieldAlert, Copy, Check } from 'lucide-react';

export function base64UrlDecode(str: string) {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function JwtDebuggerPage() {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggUG9wZXNjdSIsImlhdCI6MTcx0DAwMDAwLCJleHAiOjE5987654321f005}._mock_signature_part_xyz'
  );
  const [copied, setCopied] = useState(false);

  const decoded = useMemo(() => {
    const parts = token.trim().split('.');
    if (parts.length < 2) {
      return { valid: false, error: 'Invalid JWT structure (must contain at least header and payload)' };
    }

    const header = base64UrlDecode(parts[0]);
    const payload = base64UrlDecode(parts[1]);

    if (!header || !payload) {
      return { valid: false, error: 'Failed to decode base64 segments' };
    }

    let isExpired = false;
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      isExpired = payload.exp < currentTime;
    }

    return {
      valid: true,
      header,
      payload,
      isExpired,
    };
  }, [token]);

  const copyPayload = () => {
    if (!decoded.valid) return;
    navigator.clipboard.writeText(JSON.stringify(decoded.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Advanced JWT Token Debugger"
      badge="API CLUSTER"
      description="Inspect, decode, and validate JSON Web Tokens headers, claims, and expiration status."
      icon={KeyRound}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Input Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Encoded JWT Token
          </span>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your Bearer token here..."
            className="w-full h-32 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
          />
        </div>

        {/* Status Indicator */}
        {decoded.valid && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between font-mono text-xs shadow-xl ${
              decoded.isExpired
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {decoded.isExpired ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              <span>{decoded.isExpired ? 'Token is EXPIRED' : 'Token is ACTIVE & VALID'}</span>
            </div>
            {decoded.payload?.exp && (
              <span className="text-[11px] opacity-80">
                Expires: {new Date(decoded.payload.exp * 1000).toLocaleString()}
              </span>
            )}
          </div>
        )}

        {/* Decoded Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Decoded Header
            </span>
            <pre className="w-full h-60 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono overflow-auto">
              {decoded.valid ? JSON.stringify(decoded.header, null, 2) : `// ${decoded.error}`}
            </pre>
          </div>

          {/* Payload */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
                Decoded Payload (Claims)
              </span>
              {decoded.valid && (
                <button
                  onClick={copyPayload}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Claims'}</span>
                </button>
              )}
            </div>
            <pre className="w-full h-60 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono overflow-auto">
              {decoded.valid ? JSON.stringify(decoded.payload, null, 2) : `// ${decoded.error}`}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}