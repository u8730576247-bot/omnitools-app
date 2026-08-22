'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Tag, Copy, Check } from 'lucide-react';

export default function MetaTagsPage() {
  const [title, setTitle] = useState('KillKit - Developer & Designer Utilities');
  const [description, setDescription] = useState('An offline-first suite of developer tools, database helpers, and design generators.');
  const [keywords, setKeywords] = useState('developer tools, web utilities, json formatter, css clamp, seo generator');
  const [author, setAuthor] = useState('Alex Popescu');
  const [canonicalUrl, setCanonicalUrl] = useState('https://omnitools.dev');
  const [copied, setCopied] = useState(false);

  const generatedTags = useMemo(() => {
    return `<!-- Standard SEO Meta Tags -->
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />
<link rel="canonical" href="${canonicalUrl}" />

<!-- Viewport & Charset -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Robots Indexing -->
<meta name="robots" content="index, follow" />`;
  }, [title, description, keywords, author, canonicalUrl]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Meta Tags Generator"
      badge="SEO CLUSTER"
      description="Build clean, optimized HTML meta tags for your website header to boost search engine indexing."
      icon={Tag}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Meta Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Meta Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-20 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Keywords (Comma separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Canonical URL</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated HTML Head Tags
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Tags'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={generatedTags}
            className="w-full h-52 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}