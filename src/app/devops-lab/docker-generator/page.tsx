'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Server, Copy, Check } from 'lucide-react';

export default function DockerGeneratorPage() {
  const [runtime, setRuntime] = useState<'node' | 'python'>('node');
  const [nodeVersion, setNodeVersion] = useState('20-alpine');
  const [pythonVersion, setPythonVersion] = useState('3.11-slim');
  const [port, setPort] = useState('3000');
  const [includeDb, setIncludeDb] = useState(true);
  const [dbType, setDbType] = useState<'postgres' | 'mysql' | 'redis'>('postgres');
  const [activeTab, setActiveTab] = useState<'dockerfile' | 'compose'>('dockerfile');
  const [copied, setCopied] = useState(false);

  const dockerfileContent = useMemo(() => {
    if (runtime === 'node') {
      return `# Official Node.js Dockerfile
FROM node:${nodeVersion}

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE ${port}
CMD ["npm", "start"]`;
    } else {
      return `# Official Python Dockerfile
FROM python:${pythonVersion}

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE ${port}
CMD ["python", "main.py"]`;
    }
  }, [runtime, nodeVersion, pythonVersion, port]);

  const composeContent = useMemo(() => {
    let dbService = '';
    if (includeDb) {
      if (dbType === 'postgres') {
        dbService = `  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data\n`;
      } else if (dbType === 'mysql') {
        dbService = `  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: app_db
    ports:
      - "3306:3306"
    volumes:
      - mysqldata:/var/lib/mysql\n`;
      } else {
        dbService = `  redis:
    image: redis:alpine
    ports:
      - "6379:6379"\n`;
      }
    }

    const volumesSection = includeDb && dbType !== 'redis' ? `\nvolumes:\n  ${dbType === 'postgres' ? 'pgdata' : 'mysqldata'}:` : '';

    return `version: '3.8'

services:
  app:
    build: .
    ports:
      - "${port}:${port}"
    environment:
      - PORT=${port}
${includeDb ? '    depends_on:\n      - db\n' : ''}
${dbService}${volumesSection}`;
  }, [port, includeDb, dbType]);

  const currentOutput = activeTab === 'dockerfile' ? dockerfileContent : composeContent;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Dockerfile & Compose Generator"
      badge="DEVOPS CLUSTER"
      description="Generate standard multi-container Docker and Docker Compose configurations for modern web services."
      icon={Server}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Runtime Stack</label>
            <select
              value={runtime}
              onChange={(e) => setRuntime(e.target.value as 'node' | 'python')}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            >
              <option value="node">Node.js</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Application Port</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Database Service</label>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                checked={includeDb}
                onChange={(e) => setIncludeDb(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-mono text-slate-300">Include Database</span>
            </div>
          </div>

          {includeDb && (
            <div className="space-y-1.5 md:col-span-3">
              <label className="text-xs font-mono text-slate-400">Database Engine</label>
              <div className="flex gap-2">
                {(['postgres', 'mysql', 'redis'] as const).map((db) => (
                  <button
                    key={db}
                    onClick={() => setDbType(db)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                      dbType === db
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {db}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dockerfile')}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'dockerfile'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                DOCKERFILE
              </button>
              <button
                onClick={() => setActiveTab('compose')}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'compose'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                DOCKER-COMPOSE.YML
              </button>
            </div>
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
            value={currentOutput}
            className="w-full h-72 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}