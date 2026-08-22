'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileCode, Copy, Check } from 'lucide-react';

export default function JsonToTsPage() {
  const [input, setInput] = useState(
    JSON.stringify(
      {
        id: 1,
        name: 'Alex Popescu',
        email: 'alex@example.com',
        isActive: true,
        roles: ['admin', 'user'],
        metadata: {
          lastLogin: '2026-03-10',
          score: 98.5,
        },
      },
      null,
      2
    )
  );
  const [rootName, setRootName] = useState('RootObject');
  const [copied, setCopied] = useState(false);

  const tsOutput = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      if (typeof parsed !== 'object' || parsed === null) {
        return '// Please enter a valid JSON object or array';
      }

      const generateType = (obj: any, name: string): string => {
        if (Array.isArray(obj)) {
          if (obj.length === 0) return 'any[];';
          return generateType(obj[0], name);
        }

        if (typeof obj !== 'object' || obj === null) {
          return typeof obj;
        }

        let result = `export interface ${name} {\n`;
        for (const [key, value] of Object.entries(obj)) {
          let typeStr = 'any';
          if (value === null) {
            typeStr = 'null';
          } else if (Array.isArray(value)) {
            const innerType = value.length > 0 ? typeof value[0] : 'any';
            typeStr = `${innerType}[]`;
          } else if (typeof value === 'object') {
            const subName = key.charAt(0).toUpperCase() + key.slice(1);
            typeStr = subName;
          } else {
            typeStr = typeof value;
          }
          result += `  ${key}: ${typeStr};\n`;
        }
        result += `}\n`;
        return result;
      };

      return generateType(parsed, rootName);
    } catch (e) {
      return '// Invalid JSON syntax';
    }
  }, [input, rootName]);

  const copyToClipboard = () => {
    if (!tsOutput || tsOutput.startsWith('//')) return;
    navigator.clipboard.writeText(tsOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="JSON to TypeScript Interfaces"
      badge="DATABASE CLUSTER"
      description="Convert raw JSON payloads into clean, production-ready TypeScript interfaces instantly."
      icon={FileCode}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Root Interface Name:</span>
            <input
              type="text"
              value={rootName}
              onChange={(e) => setRootName(e.target.value || 'RootObject')}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none w-40"
            />
          </div>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Raw JSON Input
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JSON object here..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                TypeScript Output
              </span>
              <button
                onClick={copyToClipboard}
                disabled={tsOutput.startsWith('//')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Types'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={tsOutput}
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none transition-colors whitespace-pre"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}