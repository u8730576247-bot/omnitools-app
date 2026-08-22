'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Server, Copy, Check } from 'lucide-react';

export default function ConnectionBuilderPage() {
  const [dbType, setDbType] = useState<'postgres' | 'mysql' | 'mongodb' | 'redis'>('postgres');
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('5432');
  const [user, setUser] = useState('postgres');
  const [password, setPassword] = useState('secret');
  const [database, setDatabase] = useState('my_database');
  const [copied, setCopied] = useState(false);

  const connectionString = useMemo(() => {
    switch (dbType) {
      case 'postgres':
        return `postgresql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=prefer`;
      case 'mysql':
        return `mysql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
      case 'mongodb':
        return `mongodb://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}?authSource=admin`;
      case 'redis':
        return `redis://:${encodeURIComponent(password)}@${host}:${port}/0`;
      default:
        return '';
    }
  }, [dbType, host, port, user, password, database]);

  const copyToClipboard = () => {
    if (!connectionString) return;
    navigator.clipboard.writeText(connectionString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDbTypeChange = (type: 'postgres' | 'mysql' | 'mongodb' | 'redis') => {
    setDbType(type);
    if (type === 'postgres') setPort('5432');
    if (type === 'mysql') setPort('3306');
    if (type === 'mongodb') setPort('27017');
    if (type === 'redis') setPort('6379');
  };

  return (
    <ToolLayout
      title="Connection String Builder"
      badge="DATABASE CLUSTER"
      description="Build secure database connection URLs for PostgreSQL, MySQL, MongoDB, and Redis instantly."
      icon={Server}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* DB Type Selector */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap gap-2">
          {(['postgres', 'mysql', 'mongodb', 'redis'] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleDbTypeChange(type)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                dbType === type
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Input Parameters Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Host / IP</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Port</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Username</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {dbType !== 'redis' && (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono text-slate-400">Database Name</label>
              <input
                type="text"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          )}
        </div>

        {/* Output Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated Connection String
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>

          <input
            type="text"
            readOnly
            value={connectionString}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
}