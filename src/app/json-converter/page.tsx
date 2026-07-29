'use client';

import { useState } from 'react';
import { FileCode, Download, Copy, Check } from 'lucide-react';

export default function JsonConverter() {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const convertToCsv = () => {
    setError('');
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      const array = Array.isArray(parsed) ? parsed : [parsed];

      if (array.length === 0) {
        setError('JSON array is empty.');
        return;
      }

      const headers = Object.keys(array[0]);
      const csvRows = [
        headers.join(','),
        ...array.map((row) =>
          headers
            .map((field) => JSON.stringify(row[field] ?? ''))
            .join(',')
        ),
      ];

      setCsvOutput(csvRows.join('\n'));
    } catch (err) {
      setError('Invalid JSON syntax. Please check your input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'omnitools-data.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6 border-b border-slate-700 pb-4">
          <FileCode className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl font-bold">JSON to CSV Converter</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
              PASTE JSON HERE
            </label>
            <textarea
              rows={12}
              placeholder='[{"id": 1, "name": "John Doe", "role": "Developer"}]'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs font-mono focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
              CSV OUTPUT
            </label>
            <textarea
              rows={12}
              readOnly
              value={csvOutput}
              placeholder="CSV results will appear here..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs font-mono focus:outline-none text-slate-300"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={convertToCsv}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            Convert to CSV
          </button>

          {csvOutput && (
            <>
              <button
                onClick={handleCopy}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download .CSV</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}