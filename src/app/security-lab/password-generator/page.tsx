'use client';

import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { ShieldCheck, Copy, Check, RefreshCw, KeyRound } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }

    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate password strength
  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase && includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
    if (score <= 4) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-400' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      title="Password & Secret Generator"
      badge="SECURITY CLUSTER"
      description="Generate cryptographically secure passwords, API keys, and secrets with custom parameters."
      icon={ShieldCheck}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Output Box */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-4">
            <span className="font-mono text-base font-bold text-white tracking-wider break-all select-all">
              {password || 'Select at least one character type'}
            </span>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button
                onClick={generatePassword}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4 text-emerald-400" />
              </button>
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-slate-400">Security Level:</span>
              <span className={`font-bold ${strength.text}`}>{strength.label}</span>
            </div>
          )}
        </div>

        {/* Configuration Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Parameters
          </span>

          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Password Length</span>
              <span className="text-emerald-400 font-bold">{length} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Toggles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-3 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-emerald-500 focus:ring-0"
              />
              <span className="text-xs font-mono text-slate-300">Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-3 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-emerald-500 focus:ring-0"
              />
              <span className="text-xs font-mono text-slate-300">Lowercase (a-z)</span>
            </label>

            <label className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-3 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-emerald-500 focus:ring-0"
              />
              <span className="text-xs font-mono text-slate-300">Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-3 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-emerald-500 focus:ring-0"
              />
              <span className="text-xs font-mono text-slate-300">Symbols (!@#$%)</span>
            </label>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}