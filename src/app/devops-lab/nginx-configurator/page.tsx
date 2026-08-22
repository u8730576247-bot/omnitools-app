'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Globe, Copy, Check } from 'lucide-react';

export default function NginxConfiguratorPage() {
  const [serverName, setServerName] = useState('example.com');
  const [upstreamPort, setUpstreamPort] = useState('3000');
  const [enableSsl, setEnableSsl] = useState(true);
  const [serverType, setServerType] = useState<'nginx' | 'apache'>('nginx');
  const [copied, setCopied] = useState(false);

  const generatedConfig = useMemo(() => {
    if (serverType === 'nginx') {
      return `server {
    listen 80;
    server_name ${serverName || 'example.com'};
    ${enableSsl ? 'return 301 https://$host$request_uri;' : ''}
}

${
  enableSsl
    ? `server {
    listen 443 ssl http2;
    server_name ${serverName || 'example.com'};

    ssl_certificate /etc/letsencrypt/live/${serverName || 'example.com'}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${serverName || 'example.com'}/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:${upstreamPort};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
    : `server {
    listen 80;
    server_name ${serverName || 'example.com'};

    location / {
        proxy_pass http://127.0.0.1:${upstreamPort};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`
}`;
    } else {
      return `<VirtualHost *:80>
    ServerName ${serverName || 'example.com'}
    ${enableSsl ? 'Redirect permanent / https://' + (serverName || 'example.com') + '/' : ''}
</VirtualHost>

${
  enableSsl
    ? `<VirtualHost *:443>
    ServerName ${serverName || 'example.com'}

    SSLEngine on
    SSLCertificateFile "/etc/letsencrypt/live/${serverName || 'example.com'}/fullchain.pem"
    SSLCertificateKeyFile "/etc/letsencrypt/live/${serverName || 'example.com'}/privkey.pem"

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:${upstreamPort}/
    ProxyPassReverse / http://127.0.0.1:${upstreamPort}/
</VirtualHost>`
    : `<VirtualHost *:80>
    ServerName ${serverName || 'example.com'}

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:${upstreamPort}/
    ProxyPassReverse / http://127.0.0.1:${upstreamPort}/
</VirtualHost>`
}`;
    }
  }, [serverName, upstreamPort, enableSsl, serverType]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Nginx & Apache Reverse Proxy Configurator"
      badge="DEVOPS CLUSTER"
      description="Generate production-ready web server configurations with SSL support and load-balancer headers."
      icon={Globe}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Server Type</label>
            <div className="flex gap-2">
              {(['nginx', 'apache'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setServerType(type)}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                    serverType === type
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Domain / Server Name</label>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Upstream Port</label>
            <input
              type="text"
              value={upstreamPort}
              onChange={(e) => setUpstreamPort(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5 md:col-span-3">
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                checked={enableSsl}
                onChange={(e) => setEnableSsl(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-mono text-slate-300">Enable SSL / HTTPS Redirect</span>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated Server Configuration
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Config'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={generatedConfig}
            className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}