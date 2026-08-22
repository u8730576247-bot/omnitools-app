'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Webhook, Copy, Check, Code2, ShieldCheck } from 'lucide-react';

const SAMPLES = {
  github: {
    headers: JSON.stringify(
      {
        'content-type': 'application/json',
        'user-agent': 'GitHub-Hookshot/1234567',
        'x-github-event': 'push',
        'x-hub-signature-256': 'sha256=7d3b07384d113edec49eaa6238ad5ff0012'
      },
      null,
      2
    ),
    body: JSON.stringify(
      {
        ref: 'refs/heads/main',
        repository: {
          name: 'omnitools-suite',
          full_name: 'developer/omnitools-suite',
          private: false
        },
        pusher: {
          name: 'octocat',
          email: 'octocat@github.com'
        },
        commits: [
          {
            id: '1a2b3c4d5e',
            message: 'feat: add API lab cluster tools',
            timestamp: '2026-08-14T15:00:00Z'
          }
        ]
      },
      null,
      2
    )
  },
  stripe: {
    headers: JSON.stringify(
      {
        'content-type': 'application/json; charset=utf-8',
        'stripe-signature': 't=1786636800,v1=9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
      },
      null,
      2
    ),
    body: JSON.stringify(
      {
        id: 'evt_1M0123456789ABCDEF',
        object: 'event',
        api_version: '2023-10-16',
        created: 1786636800,
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_3M0123456789',
            object: 'payment_intent',
            amount: 4999,
            currency: 'usd',
            status: 'succeeded'
          }
        }
      },
      null,
      2
    )
  }
};

export default function WebhookTesterPage() {
  const [headersInput, setHeadersInput] = useState(SAMPLES.github.headers);
  const [bodyInput, setBodyInput] = useState(SAMPLES.github.body);
  const [copied, setCopied] = useState(false);

  const loadPreset = (type: 'github' | 'stripe') => {
    setHeadersInput(SAMPLES[type].headers);
    setBodyInput(SAMPLES[type].body);
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(bodyInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isJsonValid = (() => {
    try {
      JSON.parse(bodyInput);
      return true;
    } catch {
      return false;
    }
  })();

  return (
    <ToolLayout
      title="Webhook Tester & Payload Inspector"
      badge="API CLUSTER"
      description="Inspect HTTP headers, test raw JSON payloads, and simulate incoming webhooks from popular services."
      icon={Webhook}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Quick Sample Selector */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Load Mock Sample Webhook:</span>
          <div className="flex gap-2">
            <button
              onClick={() => loadPreset('github')}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono rounded-xl transition-all"
            >
              GitHub Event
            </button>
            <button
              onClick={() => loadPreset('stripe')}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono rounded-xl transition-all"
            >
              Stripe Event
            </button>
          </div>
        </div>

        {/* Two Column Layout: Headers & Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Headers Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Webhook Headers
              </span>
            </div>
            <textarea
              value={headersInput}
              onChange={(e) => setHeadersInput(e.target.value)}
              placeholder="Incoming HTTP headers JSON..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Body Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" /> Payload Body (JSON)
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isJsonValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {isJsonValid ? 'VALID JSON' : 'INVALID JSON'}
                </span>
                <button
                  onClick={copyPayload}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
              placeholder="Raw webhook payload JSON..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}