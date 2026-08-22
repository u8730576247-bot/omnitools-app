'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Binary, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('Contact us at support@example.com or sales@company.org for assistance.');
  
  const getMatches = () => {
    if (!pattern) return { matches: [], error: null };
    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(testText.matchAll(regex));
      return { matches, error: null };
    } catch (err: any) {
      return { matches: [], error: err.message };
    }
  };

  const { matches, error } = getMatches();

  return (
    <ToolLayout
      title="Regex Tester & Debugger"
      badge="DEV CLUSTER"
      description="Test, validate, and debug regular expressions in real-time with instant match highlighting."
      icon={Binary}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Pattern Input Box */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Regular Expression</h2>
              <p className="text-xs text-slate-400">Enter pattern and modifier flags</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="w-full pl-7 pr-7 py-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">/</span>
            </div>

            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="flags"
              className="w-20 px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 text-xs font-mono text-center focus:outline-none focus:border-emerald-500/50"
              title="Flags: g (global), i (case insensitive), m (multiline)"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-400 text-xs font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Test String Input */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Test Text</span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
            </span>
          </div>

          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Type text here to test against regex pattern..."
            className="w-full h-40 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>

        {/* Matches List */}
        {matches.length > 0 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Captured Matches</span>
            <div className="flex flex-wrap gap-2">
              {matches.map((m, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 font-mono text-xs flex items-center gap-2"
                >
                  <span className="text-[10px] text-emerald-500 font-bold">#{idx + 1}</span>
                  <span>{m[0]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}