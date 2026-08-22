'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Database, Copy, Check, RefreshCw } from 'lucide-react';

const FIRST_NAMES = ['Alex', 'Elena', 'Radu', 'Maria', 'Andrei', 'Diana', 'Gabriel', 'Ioana'];
const LAST_NAMES = ['Popescu', 'Ionescu', 'Dumitrescu', 'Stoica', 'Stan', 'Rusu', 'Munteanu'];
const ROLES = ['Admin', 'Developer', 'Designer', 'Product Owner', 'QA Tester', 'Marketing Spec'];
const STATUSES = ['active', 'pending', 'suspended', 'inactive'];

export default function MockDataPage() {
  const [count, setCount] = useState<number>(5);
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [seed, setSeed] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const mockData = useMemo(() => {
    const records = [];
    for (let i = 1; i <= count; i++) {
      const fn = FIRST_NAMES[(i + seed) % FIRST_NAMES.length];
      const ln = LAST_NAMES[(i * 2 + seed) % LAST_NAMES.length];
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`;
      const role = ROLES[(i + seed) % ROLES.length];
      const status = STATUSES[(i * 3 + seed) % STATUSES.length];
      const createdAt = new Date(Date.now() - (i * 86400000 + seed * 3600000)).toISOString().split('T')[0];

      records.push({
        id: i,
        name: `${fn} ${ln}`,
        email,
        role,
        status,
        createdAt,
      });
    }

    if (format === 'json') {
      return JSON.stringify(records, null, 2);
    } else {
      const headers = ['id', 'name', 'email', 'role', 'status', 'createdAt'];
      const rows = records.map((r) => `${r.id},"${r.name}","${r.email}","${r.role}","${r.status}","${r.createdAt}"`);
      return [headers.join(','), ...rows].join('\n');
    }
  }, [count, format, seed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Mock Data Generator"
      badge="DATA CLUSTER"
      description="Generate realistic dummy datasets in JSON or CSV for testing, APIs, and wireframes."
      icon={Database}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Rows Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">Records:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-emerald-400 w-8">{count}</span>
            </div>

            {/* Format Picker */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFormat('json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  format === 'json'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                JSON
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  format === 'csv'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                CSV
              </button>

              <button
                onClick={() => setSeed((s) => s + 1)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors ml-2"
                title="Regenerate Seed"
              >
                <RefreshCw className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Output Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated {format.toUpperCase()} Output
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Data'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={mockData}
            className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
}