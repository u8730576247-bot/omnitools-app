'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Layers, Copy, Check } from 'lucide-react';

export default function CriticalCssPage() {
  const [htmlInput, setHtmlInput] = useState(
    `<header class="site-header">\n  <nav class="nav-bar">\n    <h1 class="logo">OmniTools</h1>\n  </nav>\n</header>\n<main class="hero-section">\n  <h2 class="hero-title">Lightning Fast Developer Tools</h2>\n</main>`
  );
  const [cssInput, setCssInput] = useState(
    `.site-header { background: #0b0f17; padding: 16px; }\n.nav-bar { display: flex; align-items: center; }\n.logo { color: #10b981; font-weight: bold; font-size: 20px; }\n.hero-section { padding: 64px 24px; text-align: center; }\n.hero-title { font-size: 48px; color: #ffffff; }\n.footer-section { padding: 40px; background: #020617; }`
  );
  const [copied, setCopied] = useState(false);

  const criticalCssOutput = useMemo(() => {
    if (!htmlInput.trim() || !cssInput.trim()) return '/* Provide both HTML and CSS */';

    try {
      // Extract class names used in the HTML
      const classMatches = htmlInput.match(/class=["']([^"']+)["']/g);
      const usedClasses = new Set<string>();
      if (classMatches) {
        classMatches.forEach((match) => {
          const names = match.replace(/class=["']/, '').replace(/["']/, '').split(/\s+/);
          names.forEach((n) => usedClasses.add(n));
        });
      }

      // Simple rule parser to filter CSS rules matching used classes or global tags
      const cssRules = cssInput.split('}');
      const criticalRules: string[] = [];

      cssRules.forEach((rule) => {
        if (!rule.trim()) return;
        const [selectorPart] = rule.split('{');
        if (!selectorPart) return;

        const selectors = selectorPart.split(',');
        let keepRule = false;

        selectors.forEach((sel) => {
          const cleanSel = sel.trim();
          // Check if it's a global tag or matches used classes
          if (cleanSel.match(/^(header|main|footer|nav|h1|h2|body|html|p|a)\b/i)) {
            keepRule = true;
          } else {
            usedClasses.forEach((cls) => {
              if (cleanSel.includes('.' + cls)) {
                keepRule = true;
              }
            });
          }
        });

        if (keepRule) {
          criticalRules.push(rule.trim() + '}');
        }
      });

      return criticalRules.length > 0
        ? `/* Extracted Critical Above-the-Fold CSS */\n` + criticalRules.join('\n')
        : '/* No matching critical CSS rules found */';
    } catch {
      return '/* Error extracting critical CSS */';
    }
  }, [htmlInput, cssInput]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(criticalCssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Critical CSS Generator"
      badge="PERFORMANCE CLUSTER"
      description="Extract above-the-fold CSS styles from your HTML markup to eliminate render-blocking stylesheets."
      icon={Layers}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HTML Input */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Above-the-Fold HTML Markup
            </span>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste HTML header/hero markup..."
              className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* CSS Input */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Full Stylesheet (CSS)
            </span>
            <textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              placeholder="Paste full CSS stylesheet..."
              className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated Critical Inline CSS
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Critical CSS'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={criticalCssOutput}
            className="w-full h-56 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}