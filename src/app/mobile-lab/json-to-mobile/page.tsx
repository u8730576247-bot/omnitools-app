'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileCode, Copy, Check } from 'lucide-react';

export default function JsonToMobilePage() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: 1,
        name: 'Alex Popescu',
        isActive: true,
        score: 95.5,
        tags: ['developer', 'flutter']
      },
      null,
      2
    )
  );
  const [className, setClassName] = useState('UserProfile');
  const [language, setLanguage] = useState<'dart' | 'kotlin'>('dart');
  const [copied, setCopied] = useState(false);

  const generatedCode = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        return '// Please provide a valid JSON object';
      }

      if (language === 'dart') {
        let fields = '';
        let constructorArgs = '';
        let fromJsonBody = '';
        let toJsonBody = '';

        Object.entries(parsed).forEach(([key, val]) => {
          let dartType = 'String';
          let jsonParsing = `json['${key}']`;

          if (typeof val === 'number') {
            dartType = Number.isInteger(val) ? 'int' : 'double';
          } else if (typeof val === 'boolean') {
            dartType = 'bool';
          } else if (Array.isArray(val)) {
            dartType = 'List<dynamic>';
          } else if (typeof val === 'object' && val !== null) {
            dartType = 'Map<String, dynamic>';
          }

          fields += `  final ${dartType}? ${key};\n`;
          constructorArgs += `    this.${key},\n`;
          fromJsonBody += `      ${key}: ${jsonParsing},\n`;
          toJsonBody += `      '${key}': ${key},\n`;
        });

        return `class ${className} {
${fields}
  ${className}({
${constructorArgs}  });

  factory ${className}.fromJson(Map<String, dynamic> json) {
    return ${className}(
${fromJsonBody}    );
  }

  Map<String, dynamic> toJson() {
    return {
${toJsonBody}    };
  }
}`;
      } else {
        // Kotlin Data Class
        let props = '';
        Object.entries(parsed).forEach(([key, val]) => {
          let kotlinType = 'String';
          if (typeof val === 'number') {
            kotlinType = Number.isInteger(val) ? 'Int' : 'Double';
          } else if (typeof val === 'boolean') {
            kotlinType = 'Boolean';
          } else if (Array.isArray(val)) {
            kotlinType = 'List<Any>';
          } else if (typeof val === 'object' && val !== null) {
            kotlinType = 'Map<String, Any>';
          }
          props += `    val ${key}: ${kotlinType}?,\n`;
        });

        return `import kotlinx.serialization.Serializable

@Serializable
data class ${className}(
${props}
)`;
      }
    } catch {
      return '// Invalid JSON syntax';
    }
  }, [jsonInput, className, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="JSON to Dart & Kotlin Generator"
      badge="MOBILE CLUSTER"
      description="Convert raw JSON payloads into strongly typed data models for Flutter (Dart) and Android (Kotlin)."
      icon={FileCode}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Class Name:</span>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value || 'Model')}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none w-40"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('dart')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                language === 'dart'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              DART (FLUTTER)
            </button>
            <button
              onClick={() => setLanguage('kotlin')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                language === 'kotlin'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              KOTLIN (ANDROID)
            </button>
          </div>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
              Raw JSON Object Input
            </span>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON object here..."
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none transition-colors"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
                Generated Model Code
              </span>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={generatedCode}
              className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none transition-colors whitespace-pre"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}