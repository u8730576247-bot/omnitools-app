'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileText, Copy, Check } from 'lucide-react';

export default function SitemapGeneratorPage() {
  const [domain, setDomain] = useState('https://omnitools.dev');
  const [allowBots, setAllowBots] = useState(true);
  const [disallowedPaths, setDisallowedPaths] = useState('/admin/\n/private/\n/api/');
  const [sitemapPaths, setSitemapPaths] = useState('/\n/tools\n/about\n/contact');
  const [activeTab, setActiveTab] = useState<'robots' | 'sitemap'>('robots');
  const [copied, setCopied] = useState(false);

  const robotsTxt = useMemo(() => {
    const paths = disallowedPaths
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    let content = `User-agent: *\n`;
    if (allowBots) {
      paths.forEach((p) => {
        content += `Disallow: ${p.startsWith('/') ? p : '/' + p}\n`;
      });
    } else {
      content += `Disallow: /\n`;
    }
    content += `\nSitemap: ${domain.replace(/\/$/, '')}/sitemap.xml`;
    return content;
  }, [domain, allowBots, disallowedPaths]);

  const sitemapXml = useMemo(() => {
    const paths = sitemapPaths
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    paths.forEach((p) => {
      const cleanPath = p.startsWith('/') ? p : '/' + p;
      xml += `  <url>\n`;
      xml += `    <loc>${domain.replace(/\/$/, '')}${cleanPath === '/' ? '' : cleanPath}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${cleanPath === '/' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  }, [domain, sitemapPaths]);

  const currentOutput = activeTab === 'robots' ? robotsTxt : sitemapXml;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Robots.txt & Sitemap Generator"
      badge="SEO CLUSTER"
      description="Generate standard search engine crawler rules and clean XML sitemaps for fast indexing."
      icon={FileText}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Base Domain URL</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Disallowed Paths (Robots.txt)</label>
            <textarea
              value={disallowedPaths}
              onChange={(e) => setDisallowedPaths(e.target.value)}
              className="w-full h-28 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Sitemap Routes (One per line)</label>
            <textarea
              value={sitemapPaths}
              onChange={(e) => setSitemapPaths(e.target.value)}
              className="w-full h-28 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>
        </div>

        {/* Output Panel with Tabs */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('robots')}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'robots'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                ROBOTS.TXT
              </button>
              <button
                onClick={() => setActiveTab('sitemap')}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'sitemap'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                SITEMAP.XML
              </button>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : `Copy ${activeTab === 'robots' ? 'Robots' : 'Sitemap'}`}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={currentOutput}
            className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}