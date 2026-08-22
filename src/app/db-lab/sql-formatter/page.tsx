'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Database, Copy, Check } from 'lucide-react';

export default function SqlFormatterPage() {
  const [input, setInput] = useState(
    'select id, name, email from users where status = "active" order by created_at desc;'
  );
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return '';

    if (mode === 'minify') {
      return input.replace(/\s+/g, ' ').trim();
    } else {
      // Basic SQL formatting logic (uppercase keywords, basic indentation)
      const keywords = /\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|LIMIT|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM)\b/gi;
      
      let formatted = input.replace(/\s+/g, ' ').trim();
      formatted = formatted.replace(keywords, (match) => `\n${match.toUpperCase()}`);
      formatted = formatted.replace(/,/g, ',\n  ');
      
      return formatted.trim();
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="SQL Formatter & Minifier"
      badge="DATABASE CLUSTER"
      description="Format messy SQL queries with clean indentation and uppercase keywords or minify them instantly."
      icon={Database}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('format')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'format'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              FORMAT
            </button>
            <button
              onClick={() => setMode('minify')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'minify'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              MINIFY
            </button>
          </div>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Raw SQL Input
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your raw SQL query here..."
              className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Processed Output
              </span>
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={output}
              className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none transition-colors whitespace-pre"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}