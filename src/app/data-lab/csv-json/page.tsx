'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Database, Copy, Check, ArrowRightLeft } from 'lucide-react';

export default function CsvJsonPage() {
  const [mode, setMode] = useState<'csv2json' | 'json2csv'>('csv2json');
  const [input, setInput] = useState(`id,name,role\n1,Alice,Developer\n2,Bob,Designer`);
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null };

    if (mode === 'csv2json') {
      try {
        const lines = input.trim().split('\n');
        if (lines.length < 1) return { output: '[]', error: null };

        const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
        const result = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const currentline = lines[i].split(',').map((item) => item.trim().replace(/^"|"$/g, ''));
          const obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            obj[header] = currentline[index] || '';
          });
          result.push(obj);
        }

        return { output: JSON.stringify(result, null, 2), error: null };
      } catch (e) {
        return { output: '', error: 'Failed to parse CSV' };
      }
    } else {
      try {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          return { output: '', error: 'JSON must be an array of objects' };
        }

        const headers = Array.from(
          new Set(parsed.flatMap((obj) => Object.keys(obj)))
        );
        const csvRows = [headers.join(',')];

        for (const row of parsed) {
          const values = headers.map((header) => {
            const val = row[header] !== undefined ? row[header] : '';
            const escaped = ('' + val).replace(/"/g, '""');
            return `"${escaped}"`;
          });
          csvRows.push(values.join(','));
        }

        return { output: csvRows.join('\n'), error: null };
      } catch (e) {
        return { output: '', error: 'Invalid JSON array' };
      }
    }
  }, [input, mode]);

  const toggleMode = () => {
    const nextMode = mode === 'csv2json' ? 'json2csv' : 'csv2json';
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
      title="CSV ↔ JSON Converter"
      badge="DATA CLUSTER"
      description="Convert tabular CSV data to JSON array format or export JSON objects to clean CSV."
      icon={Database}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Mode Controls */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('csv2json')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'csv2json'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              CSV ➔ JSON
            </button>
            <button
              onClick={() => setMode('json2csv')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'json2csv'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              JSON ➔ CSV
            </button>
          </div>

          <button
            onClick={toggleMode}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-xl flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Swap & Convert</span>
          </button>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              {mode === 'csv2json' ? 'CSV Source Input' : 'JSON Source Input'}
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'csv2json' ? 'Paste CSV content...' : 'Paste JSON array...'}
              className="w-full h-72 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                {mode === 'csv2json' ? 'JSON Result' : 'CSV Result'}
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
              className={`w-full h-72 p-4 bg-slate-950 border rounded-xl text-xs font-mono focus:outline-none resize-none transition-colors ${
                error ? 'border-rose-500/50 text-rose-400' : 'border-slate-800 text-emerald-400'
              }`}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}