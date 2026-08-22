'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileCode2, Plus, Minus } from 'lucide-react';

export default function DiffCheckerPage() {
  const [originalText, setOriginalText] = useState('Hello World!\nThis is line 2.\nThis line will be changed.');
  const [modifiedText, setModifiedText] = useState('Hello World!\nThis is line 2.\nThis line has been modified!\nThis is a new line.');

  const getLineDiff = () => {
    const origLines = originalText.split('\n');
    const modLines = modifiedText.split('\n');
    const maxLines = Math.max(origLines.length, modLines.length);

    const diffResult = [];

    for (let i = 0; i < maxLines; i++) {
      const orig = origLines[i];
      const mod = modLines[i];

      if (orig === mod) {
        diffResult.push({ type: 'unchanged', origLine: orig, modLine: mod, lineNum: i + 1 });
      } else if (orig !== undefined && mod === undefined) {
        diffResult.push({ type: 'removed', origLine: orig, modLine: '', lineNum: i + 1 });
      } else if (orig === undefined && mod !== undefined) {
        diffResult.push({ type: 'added', origLine: '', modLine: mod, lineNum: i + 1 });
      } else {
        diffResult.push({ type: 'modified', origLine: orig, modLine: mod, lineNum: i + 1 });
      }
    }

    return diffResult;
  };

  const diffs = getLineDiff();

  return (
    <ToolLayout
      title="Text & Code Diff Checker"
      badge="TEXT CLUSTER"
      description="Compare two text blocks or code files line-by-line and inspect additions, deletions, or changes."
      icon={FileCode2}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Input Textareas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Original Text
            </span>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste original text or code here..."
              className="w-full h-48 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Modified Text
            </span>
            <textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Paste modified text or code here..."
              className="w-full h-48 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>
        </div>

        {/* Diff Output */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Line-by-Line Comparison
            </span>
            <div className="flex gap-4 text-xs font-mono">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Added / Modified
              </span>
              <span className="text-rose-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Removed
              </span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto space-y-1 font-mono text-xs">
            {diffs.map((d, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="w-8 text-right text-slate-600 select-none shrink-0">{d.lineNum}</span>
                {d.type === 'unchanged' && (
                  <div className="text-slate-400 whitespace-pre">{d.origLine}</div>
                )}
                {d.type === 'removed' && (
                  <div className="w-full bg-rose-500/10 text-rose-400 border-l-2 border-rose-500 px-2 py-0.5 whitespace-pre flex items-center gap-2">
                    <Minus className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{d.origLine}</span>
                  </div>
                )}
                {d.type === 'added' && (
                  <div className="w-full bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500 px-2 py-0.5 whitespace-pre flex items-center gap-2">
                    <Plus className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{d.modLine}</span>
                  </div>
                )}
                {d.type === 'modified' && (
                  <div className="w-full space-y-1">
                    <div className="bg-rose-500/10 text-rose-400 border-l-2 border-rose-500 px-2 py-0.5 whitespace-pre flex items-center gap-2">
                      <Minus className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>{d.origLine}</span>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500 px-2 py-0.5 whitespace-pre flex items-center gap-2">
                      <Plus className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{d.modLine}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}