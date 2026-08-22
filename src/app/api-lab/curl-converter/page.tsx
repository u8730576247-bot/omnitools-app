'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Terminal, Copy, Check } from 'lucide-react';

export default function CurlConverterPage() {
  const [curlInput, setCurlInput] = useState(
    `curl -X POST https://api.example.com/v1/users -H "Content-Type: application/json" -H "Authorization: Bearer token123" -d '{"name":"Alex","role":"admin"}'`
  );
  const [format, setFormat] = useState<'fetch' | 'axios'>('fetch');
  const [copied, setCopied] = useState(false);

  const convertedCode = useMemo(() => {
    if (!curlInput.trim().startsWith('curl')) {
      return '// Please enter a valid cURL command starting with "curl"';
    }

    try {
      // Basic extraction of URL
      const urlMatch = curlInput.match(/(['"])(https?:\/\/[^\s]+)\1/) || curlInput.match(/(https?:\/\/[^\s]+)/);
      const url = urlMatch ? urlMatch[2] || urlMatch[1] : 'https://api.example.com';

      // Method extraction
      let method = 'GET';
      if (curlInput.includes('-X POST') || curlInput.includes('--request POST')) method = 'POST';
      else if (curlInput.includes('-X PUT') || curlInput.includes('--request PUT')) method = 'PUT';
      else if (curlInput.includes('-X DELETE') || curlInput.includes('--request DELETE')) method = 'DELETE';
      else if (curlInput.includes('-X PATCH') || curlInput.includes('--request PATCH')) method = 'PATCH';
      else if (curlInput.includes('-d ') || curlInput.includes('--data')) method = 'POST';

      // Headers extraction (-H or --header)
      const headerMatches = [...curlInput.matchAll(/(?:-H|--header)\s+(['"])(.*?)\1/g)];
      const headers: Record<string, string> = {};
      headerMatches.forEach((match) => {
        const parts = match[2].split(':');
        if (parts.length >= 2) {
          headers[parts[0].trim()] = parts.slice(1).join(':').trim();
        }
      });

      // Data extraction (-d, --data, --data-raw)
      const dataMatch = curlInput.match(/(?:-d|--data|--data-raw)\s+(['"])(.*?)\1/) || curlInput.match(/(?:-d|--data|--data-raw)\s+([^\s]+)/);
      const rawData = dataMatch ? dataMatch[2] || dataMatch[1] : null;

      if (format === 'fetch') {
        let code = `const response = await fetch("${url}", {\n`;
        code += `  method: "${method}",\n`;
        if (Object.keys(headers).length > 0) {
          code += `  headers: ${JSON.stringify(headers, null, 2).replace(/^/gm, '  ')},\n`;
        }
        if (rawData) {
          try {
            const jsonObj = JSON.parse(rawData);
            code += `  body: JSON.stringify(${JSON.stringify(jsonObj, null, 2).replace(/^/gm, '  ')}),\n`;
          } catch {
            code += `  body: JSON.stringify(${rawData}),\n`;
          }
        }
        code += `});\nconst data = await response.json();`;
        return code;
      } else {
        let code = `import axios from 'axios';\n\n`;
        code += `const response = await axios({\n`;
        code += `  method: '${method.toLowerCase()}',\n`;
        code += `  url: '${url}',\n`;
        if (Object.keys(headers).length > 0) {
          code += `  headers: ${JSON.stringify(headers, null, 2).replace(/^/gm, '  ')},\n`;
        }
        if (rawData) {
          try {
            const jsonObj = JSON.parse(rawData);
            code += `  data: ${JSON.stringify(jsonObj, null, 2).replace(/^/gm, '  ')},\n`;
          } catch {
            code += `  data: ${rawData},\n`;
          }
        }
        code += `});\nconst data = response.data;`;
        return code;
      }
    } catch (e) {
      return '// Error parsing cURL command';
    }
  }, [curlInput, format]);

  const copyToClipboard = () => {
    if (!convertedCode || convertedCode.startsWith('//')) return;
    navigator.clipboard.writeText(convertedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="cURL to Fetch / Axios Converter"
      badge="API CLUSTER"
      description="Instantly translate terminal cURL commands into clean JavaScript Fetch API or Axios snippets."
      icon={Terminal}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat('fetch')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                format === 'fetch'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              FETCH API
            </button>
            <button
              onClick={() => setFormat('axios')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                format === 'axios'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              AXIOS
            </button>
          </div>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              cURL Command
            </span>
            <textarea
              value={curlInput}
              onChange={(e) => setCurlInput(e.target.value)}
              placeholder="Paste cURL command here..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Generated JS Code
              </span>
              <button
                onClick={copyToClipboard}
                disabled={convertedCode.startsWith('//')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={convertedCode}
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none transition-colors whitespace-pre"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}