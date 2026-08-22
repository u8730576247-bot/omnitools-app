'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Server, Search } from 'lucide-react';

interface StatusCode {
  code: number;
  phrase: string;
  category: '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
  description: string;
}

const STATUS_CODES: StatusCode[] = [
  { code: 200, phrase: 'OK', category: '2xx', description: 'Standard response for successful HTTP requests.' },
  { code: 201, phrase: 'Created', category: '2xx', description: 'Request has been fulfilled, resulting in the creation of a new resource.' },
  { code: 204, phrase: 'No Content', category: '2xx', description: 'Server successfully processed the request, but is not returning any content.' },
  { code: 301, phrase: 'Moved Permanently', category: '3xx', description: 'This request and all future requests should be directed to the given URI.' },
  { code: 302, phrase: 'Found (Temporary Redirect)', category: '3xx', description: 'Resource temporarily resides under a different URI.' },
  { code: 304, phrase: 'Not Modified', category: '3xx', description: 'Resource has not been modified since the version specified by the request headers.' },
  { code: 400, phrase: 'Bad Request', category: '4xx', description: 'Server cannot or will not process the request due to an apparent client error.' },
  { code: 401, phrase: 'Unauthorized', category: '4xx', description: 'Authentication is required and has failed or has not yet been provided.' },
  { code: 403, phrase: 'Forbidden', category: '4xx', description: 'User does not have necessary permissions for the resource.' },
  { code: 404, phrase: 'Not Found', category: '4xx', description: 'Requested resource could not be found but may be available in the future.' },
  { code: 409, phrase: 'Conflict', category: '4xx', description: 'Request could not be processed because of conflict in the current state of the resource.' },
  { code: 422, phrase: 'Unprocessable Entity', category: '4xx', description: 'Request was well-formed but was unable to be followed due to semantic errors.' },
  { code: 429, phrase: 'Too Many Requests', category: '4xx', description: 'User has sent too many requests in a given amount of time (Rate limiting).' },
  { code: 500, phrase: 'Internal Server Error', category: '5xx', description: 'Generic error message given when an unexpected condition was encountered.' },
  { code: 502, phrase: 'Bad Gateway', category: '5xx', description: 'Server, while acting as a gateway, received an invalid response from upstream server.' },
  { code: 503, phrase: 'Service Unavailable', category: '5xx', description: 'Server cannot handle the request (overloaded or down for maintenance).' },
  { code: 504, phrase: 'Gateway Timeout', category: '5xx', description: 'Server did not receive a timely response from the upstream server.' },
];

export default function HttpStatusPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCodes = STATUS_CODES.filter((item) => {
    const matchesSearch =
      item.code.toString().includes(search) ||
      item.phrase.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case '2xx':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case '3xx':
        return 'border-sky-500/30 bg-sky-500/10 text-sky-400';
      case '4xx':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
      case '5xx':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-400';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <ToolLayout
      title="HTTP Status Codes Reference"
      badge="NETWORK CLUSTER"
      description="Instant search and documentation lookup for HTTP request status codes and definitions."
      icon={Server}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code or description..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['all', '2xx', '3xx', '4xx', '5xx'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCodes.map((item) => (
            <div
              key={item.code}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-white">{item.code}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeStyle(
                    item.category
                  )}`}
                >
                  {item.phrase}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}