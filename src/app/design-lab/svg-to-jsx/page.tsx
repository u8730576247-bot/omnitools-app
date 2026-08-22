'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileCode2, Copy, Check } from 'lucide-react';

export default function SvgToJsxPage() {
  const [svgInput, setSvgInput] = useState(
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>\n</svg>`
  );
  const [componentName, setComponentName] = useState('CustomIcon');
  const [copied, setCopied] = useState(false);

  const jsxOutput = useMemo(() => {
    if (!svgInput.trim().includes('<svg')) {
      return '// Please enter a valid SVG markup string';
    }

    try {
      let cleaned = svgInput.trim();

      // Convert attributes to camelCase
      const attrMap: Record<string, string> = {
        'stroke-width': 'strokeWidth',
        'stroke-linecap': 'strokeLinecap',
        'stroke-linejoin': 'strokeLinejoin',
        'stroke-dasharray': 'strokeDasharray',
        'stroke-dashoffset': 'strokeDashoffset',
        'stroke-miterlimit': 'strokeMiterlimit',
        'stroke-opacity': 'strokeOpacity',
        'fill-rule': 'fillRule',
        'clip-rule': 'clipRule',
        'stop-color': 'stopColor',
        'stop-opacity': 'stopOpacity',
        'font-size': 'fontSize',
        'font-family': 'fontFamily',
        'font-weight': 'fontWeight',
        'class=': 'className=',
      };

      for (const [k, v] of Object.entries(attrMap)) {
        const regex = new RegExp(k, 'g');
        cleaned = cleaned.replace(regex, v);
      }

      // Format as a React functional component
      const componentCode = `import React from 'react';

export function ${componentName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${cleaned.replace(/^/gm, '    ')}
  );
}
`;
      return componentCode;
    } catch {
      return '// Error converting SVG to JSX';
    }
  }, [svgInput, componentName]);

  const copyToClipboard = () => {
    if (!jsxOutput || jsxOutput.startsWith('//')) return;
    navigator.clipboard.writeText(jsxOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="SVG to JSX / React Converter"
      badge="DESIGN CLUSTER"
      description="Transform raw SVG markup into production-ready React TypeScript functional components instantly."
      icon={FileCode2}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Component Name:</span>
            <input
              type="text"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value || 'CustomIcon')}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none w-44"
            />
          </div>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Raw SVG Input
            </span>
            <textarea
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              placeholder="Paste raw SVG code here..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
                React Component Output
              </span>
              <button
                onClick={copyToClipboard}
                disabled={jsxOutput.startsWith('//')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Component'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={jsxOutput}
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none transition-colors whitespace-pre"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}