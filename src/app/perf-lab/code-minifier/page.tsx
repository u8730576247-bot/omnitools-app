'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Zap, Copy, Check } from 'lucide-react';

export default function CodeMinifierPage() {
  const [input, setInput] = useState(
    `/* Sample CSS stylesheet */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 24px;\n  background-color: #0b0f17;\n}`
  );
  const [lang, setLang] = useState<'css' | 'js'>('css');
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return '';

    try {
      if (mode === 'minify') {
        // Basic minification: remove comments, extra spaces, and newlines
        let minified = input;
        if (lang === 'css') {
          minified = minified.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // remove comments
        }
        minified = minified.replace(/\s+/g, ' ').trim();
        minified = minified.replace(/\s*([{}:;,>+])\s*/g, '$1'); // remove spaces around delimiters
        return minified;
      } else {
        // Basic beautifier / formatter simulation
        let beautified = input.replace(/\s+/g, ' ').trim();
        beautified = beautified.replace(/([{;])/g, '$1\n  ');
        beautified = beautified.replace(/\}/g, '\n}\n');
        beautified = beautified.replace(/,\s*/g, ', ');
        return beautified.trim();
      }
    } catch {
      return '// Error processing code';
    }
  }, [input, lang, mode]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLangChange = (newLang: 'css' | 'js') => {
    setLang(newLang);
    if (newLang === 'js') {
      setInput(`// Sample JavaScript snippet\nfunction calculateTotal(items) {\n  let total = 0;\n  for (let i = 0; i < items.length; i++) {\n    total += items[i].price;\n  }\n  return total;\n}`);
    } else {
      setInput(`/* Sample CSS stylesheet */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 24px;\n  background-color: #0b0f17;\n}`);
    }
  };

  return (
    <ToolLayout
      title="CSS & JS Minifier / Beautifier"
      badge="PERFORMANCE CLUSTER"
      description="Compress stylesheets and scripts for production or format messy code blocks instantly."
      icon={Zap}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLangChange('css')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                lang === 'css'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => handleLangChange('js')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                lang === 'js'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              JAVASCRIPT
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('minify')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'minify'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              MINIFY
            </button>
            <button
              onClick={() => setMode('beautify')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                mode === 'beautify'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              BEAUTIFY
            </button>
          </div>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Raw Code Input
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste raw code here..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
                Processed Output
              </span>
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={output}
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none transition-colors whitespace-pre"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}