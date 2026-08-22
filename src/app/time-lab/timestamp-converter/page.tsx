'use client';

import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Clock, Copy, Check, RefreshCw } from 'lucide-react';

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState<string>('');
  const [currentNow, setCurrentNow] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setCurrentNow(now);
    setTimestamp(now.toString());

    const interval = setInterval(() => {
      setCurrentNow(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const parsedDate = React.useMemo(() => {
    if (!timestamp.trim()) return null;
    const num = Number(timestamp);
    if (isNaN(num)) return null;

    // Detect if input is in milliseconds or seconds
    const dateObj = num > 1e11 ? new Date(num) : new Date(num * 1000);
    if (isNaN(dateObj.getTime())) return null;

    return {
      utc: dateObj.toUTCString(),
      iso: dateObj.toISOString(),
      local: dateObj.toLocaleString(),
      relative: dateObj.toString(),
    };
  }, [timestamp]);

  const setNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
  };

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolLayout
      title="Epoch & Unix Timestamp Converter"
      badge="TIME CLUSTER"
      description="Convert Unix timestamps in seconds or milliseconds to human-readable date formats and UTC/ISO."
      icon={Clock}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Live Current Timestamp Banner */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-slate-400">Current Epoch:</span>
            <span className="text-lg font-mono font-bold text-emerald-400">{currentNow}</span>
          </div>

          <button
            onClick={setNow}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold rounded-xl flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Use Current Time</span>
          </button>
        </div>

        {/* Input Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Unix Timestamp Input (Seconds or Milliseconds)
          </label>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="e.g. 1700000000"
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Formatted Date Output Cards */}
        {parsedDate ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">ISO 8601</span>
                <button
                  onClick={() => copyToClipboard(parsedDate.iso, 'iso')}
                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  {copiedKey === 'iso' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-slate-200 font-mono text-xs break-all">{parsedDate.iso}</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase">UTC String</span>
                <button
                  onClick={() => copyToClipboard(parsedDate.utc, 'utc')}
                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  {copiedKey === 'utc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-slate-200 font-mono text-xs break-all">{parsedDate.utc}</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl md:col-span-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Local Timezone</span>
                <button
                  onClick={() => copyToClipboard(parsedDate.local, 'local')}
                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  {copiedKey === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-slate-200 font-mono text-xs break-all">{parsedDate.local}</p>
            </div>
          </div>
        ) : (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-center text-rose-400 text-xs font-mono">
            Invalid timestamp provided. Please enter numeric digits.
          </div>
        )}
      </div>
    </ToolLayout>
  );
}