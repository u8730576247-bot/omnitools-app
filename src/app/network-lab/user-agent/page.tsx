'use client';

import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Monitor, Copy, Check, Laptop, Globe, Cpu } from 'lucide-react';

export default function UserAgentPage() {
  const [uaString, setUaString] = useState('');
  const [screenRes, setScreenRes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUaString(navigator.userAgent);
      setScreenRes(`${window.screen.width} x ${window.screen.height} (Viewport: ${window.innerWidth} x ${window.innerHeight})`);
    }
  }, []);

  const parseUA = (ua: string) => {
    let browser = 'Unknown Browser';
    let os = 'Unknown OS';

    // Basic Browser Detection
    if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
    else if (ua.includes('Edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome/')) browser = 'Google Chrome';
    else if (ua.includes('Safari/')) browser = 'Apple Safari';
    else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera';

    // Basic OS Detection
    if (ua.includes('Win')) os = 'Windows OS';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('X11') || ua.includes('Linux')) os = 'Linux OS';
    else if (ua.includes('Android')) os = 'Android OS';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    return { browser, os };
  };

  const parsedInfo = parseUA(uaString);

  const copyToClipboard = () => {
    if (!uaString) return;
    navigator.clipboard.writeText(uaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="User-Agent & Client Inspector"
      badge="NETWORK CLUSTER"
      description="Inspect current browser environment details, screen parameters, and parse raw User-Agent strings."
      icon={Monitor}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* User Agent Raw Input */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              User-Agent String
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={uaString}
            onChange={(e) => setUaString(e.target.value)}
            placeholder="User-Agent string will auto-populate..."
            className="w-full h-24 p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
          />
        </div>

        {/* Parsed Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-sky-400">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Browser</span>
            </div>
            <p className="text-slate-100 font-mono text-sm font-semibold">{parsedInfo.browser}</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400">
              <Laptop className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Operating System</span>
            </div>
            <p className="text-slate-100 font-mono text-sm font-semibold">{parsedInfo.os}</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Screen Resolution</span>
            </div>
            <p className="text-slate-100 font-mono text-xs font-semibold">{screenRes || 'Detecting...'}</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}