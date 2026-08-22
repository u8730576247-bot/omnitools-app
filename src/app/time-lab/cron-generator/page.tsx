'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Calendar, Copy, Check, Clock } from 'lucide-react';

const PRESETS = [
  { label: 'Every minute', cron: '* * * * *', desc: 'Runs every single minute' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *', desc: 'Runs at minute 0, 5, 10, 15, etc.' },
  { label: 'Every hour', cron: '0 * * * *', desc: 'Runs at the start of every hour' },
  { label: 'Every day at midnight', cron: '0 0 * * *', desc: 'Runs every day at 00:00 UTC' },
  { label: 'Every Monday at 9 AM', cron: '0 9 * * 1', desc: 'Runs once a week on Monday at 09:00' },
  { label: '1st of every month', cron: '0 0 1 * *', desc: 'Runs at 00:00 on day 1 of each month' },
];

export default function CronGeneratorPage() {
  const [cron, setCron] = useState('*/15 * * * *');
  const [copied, setCopied] = useState(false);

  // Simple humanizer parser
  const humanized = useMemo(() => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) {
      return { text: 'Invalid Cron Expression (must have exactly 5 fields)', valid: false };
    }

    const [min, hour, dom, month, dow] = parts;

    // Check presets match
    const presetMatch = PRESETS.find((p) => p.cron === cron.trim());
    if (presetMatch) {
      return { text: presetMatch.desc, valid: true };
    }

    let summary = `Runs `;
    if (min === '*' && hour === '*') summary += 'every minute';
    else if (min.startsWith('*/')) summary += `every ${min.replace('*/', '')} minutes`;
    else if (hour === '*') summary += `at minute ${min} of every hour`;
    else summary += `at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;

    if (dow !== '*') summary += ` on day-of-week ${dow}`;
    if (dom !== '*') summary += ` on day-of-month ${dom}`;
    if (month !== '*') summary += ` in month ${month}`;

    return { text: summary, valid: true };
  }, [cron]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Cron Expression Generator"
      badge="TIME CLUSTER"
      description="Build, inspect, and translate Cron schedule expressions into plain human-readable sentences."
      icon={Calendar}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Preset Selector */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Common Quick Presets
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.cron}
                onClick={() => setCron(p.cron)}
                className={`p-2.5 text-left rounded-xl border text-xs font-mono transition-all ${
                  cron === p.cron
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">{p.label}</div>
                <div className="text-[10px] text-slate-500 mt-1">{p.cron}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cron Input Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Cron Expression (5 Parts)
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Cron'}</span>
            </button>
          </div>

          <input
            type="text"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="e.g. */15 * * * *"
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-lg font-bold text-center tracking-widest focus:outline-none focus:border-emerald-500/50"
          />

          <div className="grid grid-cols-5 text-center text-[10px] font-mono text-slate-500 uppercase pt-1">
            <div>Minute</div>
            <div>Hour</div>
            <div>Day (Month)</div>
            <div>Month</div>
            <div>Day (Week)</div>
          </div>
        </div>

        {/* Humanized Output Banner */}
        <div
          className={`p-5 rounded-2xl border flex items-center gap-3 font-mono text-xs shadow-xl transition-all ${
            humanized.valid
              ? 'bg-slate-900/90 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          <Clock className="w-5 h-5 shrink-0" />
          <span className="font-semibold">{humanized.text}</span>
        </div>
      </div>
    </ToolLayout>
  );
}