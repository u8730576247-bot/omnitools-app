'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Share2, Copy, Check, Globe } from 'lucide-react';

export default function OgPreviewPage() {
  const [siteUrl, setSiteUrl] = useState('https://omnitools.dev');
  const [ogTitle, setOgTitle] = useState('KillKit - The Ultimate Developer Toolkit');
  const [ogDescription, setOgDescription] = useState('A comprehensive suite of offline-first web utilities for developers, designers, and tech professionals.');
  const [ogImage, setOgImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop');
  const [copied, setCopied] = useState(false);

  const metaTagsCode = useMemo(() => {
    return `<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${siteUrl}" />
<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDescription}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${siteUrl}" />
<meta name="twitter:title" content="${ogTitle}" />
<meta name="twitter:description" content="${ogDescription}" />
<meta name="twitter:image" content="${ogImage}" />`;
  }, [siteUrl, ogTitle, ogDescription, ogImage]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTagsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const domain = useMemo(() => {
    try {
      return new URL(siteUrl).hostname;
    } catch {
      return siteUrl;
    }
  }, [siteUrl]);

  return (
    <ToolLayout
      title="Open Graph & Social Preview"
      badge="SEO CLUSTER"
      description="Preview how your web pages look when shared across social media networks and generate meta tags instantly."
      icon={Share2}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Page URL</label>
            <input
              type="text"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">OG Title</label>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">OG Description</label>
            <textarea
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              className="w-full h-20 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Image URL</label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Live Social Card Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
            Live Feed Card Preview (Twitter / LinkedIn / Discord style)
          </span>
          <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-48 w-full bg-slate-900 overflow-hidden relative">
              {ogImage ? (
                <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">No Image</div>
              )}
            </div>
            <div className="p-4 space-y-1.5 bg-[#161b22]">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide flex items-center gap-1">
                <Globe className="w-3 h-3" /> {domain}
              </span>
              <h4 className="font-bold text-slate-100 text-sm line-clamp-1">{ogTitle || 'Untitled Page'}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{ogDescription || 'No description provided.'}</p>
            </div>
          </div>
        </div>

        {/* Generated Meta Tags Code */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated HTML Meta Tags
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
            value={metaTagsCode}
            className="w-full h-48 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}