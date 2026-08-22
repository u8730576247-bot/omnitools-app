'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Link2, Copy, Check, ExternalLink } from 'lucide-react';

export default function DeeplinkTesterPage() {
  const [scheme, setScheme] = useState('omnitools');
  const [host, setHost] = useState('profile');
  const [params, setParams] = useState('id=123&ref=dashboard');
  const [copied, setCopied] = useState(false);

  const generatedDeepLink = useMemo(() => {
    const cleanScheme = scheme.trim().replace(/:\/\//g, '');
    const cleanHost = host.trim().replace(/^\//, '');
    const cleanParams = params.trim() ? `?${params.trim().replace(/^\?/, '')}` : '';

    if (!cleanScheme) return 'omnitools://';
    return `${cleanScheme}://${cleanHost}${cleanParams}`;
  }, [scheme, host, params]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDeepLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Deep Link & Universal Link Tester"
      badge="MOBILE CLUSTER"
      description="Construct, validate, and test custom URL schemes and deep links for iOS and Android apps."
      icon={Link2}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">App Scheme / Protocol</label>
            <input
              type="text"
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
              placeholder="e.g. myapp"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Host / Path</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="e.g. settings/profile"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Query Parameters</label>
            <input
              type="text"
              value={params}
              onChange={(e) => setParams(e.target.value)}
              placeholder="key1=value1&key2=value2"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated Deep Link URI
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy URI'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-xs break-all flex items-center justify-between">
            <span>{generatedDeepLink}</span>
            <a
              href={generatedDeepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 rounded-lg transition-colors ml-2 flex-shrink-0"
              title="Test URI"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}