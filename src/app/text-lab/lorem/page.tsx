'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { AlignLeft, Copy, Check, RefreshCw, Database } from 'lucide-react';

export default function LoremGeneratorPage() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words' | 'json'>('paragraphs');
  const [count, setCount] = useState(3);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
    'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
    'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
    'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
    'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateLorem = () => {
    let result = '';

    if (type === 'words') {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(loremWords[i % loremWords.length]);
      }
      result = words.join(' ');
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        const sentenceLength = Math.floor(Math.random() * 8) + 6;
        const words = [];
        for (let j = 0; j < sentenceLength; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        let sentence = words.join(' ');
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
        sentences.push(sentence);
      }
      result = sentences.join(' ');
    } else if (type === 'paragraphs') {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        const numSentences = Math.floor(Math.random() * 4) + 3;
        const sentences = [];
        for (let s = 0; s < numSentences; s++) {
          const sentenceLength = Math.floor(Math.random() * 8) + 6;
          const words = [];
          for (let j = 0; j < sentenceLength; j++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
          }
          let sentence = words.join(' ');
          sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
          sentences.push(sentence);
        }
        paragraphs.push(sentences.join(' '));
      }
      result = paragraphs.join('\n\n');
    } else if (type === 'json') {
      const dummyUsers = Array.from({ length: count }, (_, idx) => ({
        id: idx + 1,
        name: `User ${idx + 1}`,
        email: `user${idx + 1}@example.com`,
        role: idx % 2 === 0 ? 'Admin' : 'Developer',
        active: true,
      }));
      result = JSON.stringify(dummyUsers, null, 2);
    }

    setGeneratedText(result);
  };

  React.useEffect(() => {
    generateLorem();
  }, [type, count]);

  const copyToClipboard = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Lorem Ipsum & Dummy Generator"
      badge="TEXT CLUSTER"
      description="Generate placeholder text, paragraphs, or mock JSON data for quick prototyping."
      icon={AlignLeft}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Bar */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(['paragraphs', 'sentences', 'words', 'json'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setType(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-all ${
                    type === mode
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">Count:</span>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 text-xs font-mono text-center focus:outline-none focus:border-emerald-500/50"
              />
              <button
                onClick={generateLorem}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Output Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated Content ({type})
            </span>
            <button
              onClick={copyToClipboard}
              disabled={!generatedText}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Output'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={generatedText}
            className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none resize-none transition-colors"
          />
        </div>
      </div>
    </ToolLayout>
  );
}