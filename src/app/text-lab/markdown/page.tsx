'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileText, Copy, Check, Eye } from 'lucide-react';

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
* **Live Preview**: See changes instantly as you type.
* *Simple Formatting*: Easily format bold, italics, lists, and code blocks.
* Clean UI: Designed for maximum productivity.

### Code Example
\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
\`\`\`

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci
`);

  const [copiedHtml, setCopiedHtml] = useState(false);

  // Basic client-side Markdown to HTML Parser
  const parseMarkdownToHtml = (md: string) => {
    let html = md
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-white mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-emerald-400 mt-5 mb-2 border-b border-slate-800 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold text-white mt-6 mb-3 border-b border-slate-800 pb-2">$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-emerald-500 pl-4 py-1 italic text-slate-400 my-3 bg-slate-900/50 rounded-r-lg">$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-emerald-300">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-300">$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-950 border border-slate-800 p-3 rounded-xl font-mono text-xs text-sky-300 my-3 overflow-x-auto">$1</pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-slate-950 text-emerald-400 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-800">$1</code>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-slate-300 my-0.5">$1</li>')
      // Paragraphs (lines with text)
      .replace(/^\s*(\n)?(.+)/gm, function (m) {
        return /<(\/)?(h1|h2|h3|blockquote|pre|li)/.test(m) ? m : '<p class="text-slate-300 leading-relaxed my-2">' + m + '</p>';
      });

    return html.trim();
  };

  const htmlOutput = parseMarkdownToHtml(markdown);

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(null as any), 2000);
  };

  return (
    <ToolLayout
      title="Markdown Live Editor"
      badge="TEXT CLUSTER"
      description="Write Markdown with instant formatted live preview and raw HTML export capability."
      icon={FileText}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Markdown Studio</h2>
              <p className="text-[11px] text-slate-400">Live Editor & Real-time Renderer</p>
            </div>
          </div>

          <button
            onClick={copyHtml}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            {copiedHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
            <span>{copiedHtml ? 'Copied HTML' : 'Copy HTML Output'}</span>
          </button>
        </div>

        {/* Editor & Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Markdown Input */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Markdown Source
            </span>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your markdown here..."
              className="w-full h-[450px] p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* HTML Live Preview */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              Live HTML Preview
            </span>
            <div
              className="w-full h-[450px] p-5 bg-slate-950 border border-slate-800 rounded-xl text-xs overflow-y-auto space-y-2"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}