'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Type, Copy, Check, Trash2, Sparkles } from 'lucide-react';

export default function CaseConverterPage() {
  const [text, setText] = useState('Type or paste your text here to transform cases or clean formatting...');
  const [copied, setCopied] = useState(false);

  // Stats
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const lineCount = text.trim() ? text.split('\n').length : 0;

  // Transformations
  const toUppercase = () => setText(text.toUpperCase());
  const toLowercase = () => setText(text.toLowerCase());
  
  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const toCamelCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .split(' ')
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('')
    );
  };

  const toSnakeCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .trim()
        .split(/\s+/)
        .join('_')
    );
  };

  const toKebabCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .trim()
        .split(/\s+/)
        .join('-')
    );
  };

  const cleanExtraSpaces = () => {
    setText(text.replace(/\s+/g, ' ').trim());
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Case Converter & Text Cleaner"
      badge="TEXT CLUSTER"
      description="Convert text cases (camelCase, snake_case, Title Case) and clean spaces or formatting instantly."
      icon={Type}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Action Bar / Stats */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 font-mono text-xs">
            <div>
              <span className="text-slate-500">Words: </span>
              <span className="text-emerald-400 font-bold">{wordCount}</span>
            </div>
            <div>
              <span className="text-slate-500">Chars: </span>
              <span className="text-sky-400 font-bold">{charCount}</span>
            </div>
            <div>
              <span className="text-slate-500">Lines: </span>
              <span className="text-purple-400 font-bold">{lineCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setText('')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-56 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
          />
        </div>

        {/* Quick Transform Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Quick Transformations
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            <button
              onClick={toUppercase}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
            >
              UPPERCASE
            </button>
            <button
              onClick={toLowercase}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
            >
              lowercase
            </button>
            <button
              onClick={toTitleCase}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
            >
              Title Case
            </button>
            <button
              onClick={toCamelCase}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
            >
              camelCase
            </button>
            <button
              onClick={toSnakeCase}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-sky-400 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
            >
              snake_case
            </button>
            <button
              onClick={toKebabCase}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
            >
              kebab-case
            </button>
            <button
              onClick={cleanExtraSpaces}
              className="col-span-2 sm:col-span-1 md:col-span-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 text-purple-400 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
            >
              Clean Extra Spaces
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}