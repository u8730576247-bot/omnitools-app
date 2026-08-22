'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { GitBranch, Copy, Check } from 'lucide-react';

export default function CicdGeneratorPage() {
  const [platform, setPlatform] = useState<'github' | 'gitlab'>('github');
  const [nodeVersion, setNodeVersion] = useState('20.x');
  const [runTests, setRunTests] = useState(true);
  const [runBuild, setRunBuild] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatedPipeline = useMemo(() => {
    if (platform === 'github') {
      return `name: CI/CD Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [${nodeVersion}]

    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    ${runTests ? `- name: Run tests\n      run: npm test\n` : ''}
    ${runBuild ? `- name: Build project\n      run: npm run build\n` : ''}`;
    } else {
      // GitLab CI
      return `stages:
  - test
  - build

image: node:${nodeVersion.replace('.x', '')}

cache:
  paths:
    - node_modules/

install_dependencies:
  stage: test
  script:
    - npm ci

${
  runTests
    ? `run_tests:
  stage: test
  script:
    - npm test\n`
    : ''
}

${
  runBuild
    ? `build_project:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
      - .next/\n`
    : ''
}`;
    }
  }, [platform, nodeVersion, runTests, runBuild]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPipeline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="CI/CD Pipeline Generator"
      badge="DEVOPS CLUSTER"
      description="Generate standard automation workflows for GitHub Actions and GitLab CI/CD pipelines."
      icon={GitBranch}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">CI/CD Platform</label>
            <div className="flex gap-2">
              {(['github', 'gitlab'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                    platform === p
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {p === 'github' ? 'GitHub Actions' : 'GitLab CI'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Node.js Version</label>
            <select
              value={nodeVersion}
              onChange={(e) => setNodeVersion(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            >
              <option value="18.x">Node.js 18.x</option>
              <option value="20.x">Node.js 20.x (LTS)</option>
              <option value="22.x">Node.js 22.x</option>
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-2 flex gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={runTests}
                onChange={(e) => setRunTests(e.target.checked)}
                className="w-4 h-4 accent-emerald-500"
              />
              <span className="text-xs font-mono text-slate-300">Run Tests Step (`npm test`)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={runBuild}
                onChange={(e) => setRunBuild(e.target.checked)}
                className="w-4 h-4 accent-emerald-500"
              />
              <span className="text-xs font-mono text-slate-300">Run Build Step (`npm run build`)</span>
            </label>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated Pipeline Configuration
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Workflow'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={generatedPipeline}
            className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}