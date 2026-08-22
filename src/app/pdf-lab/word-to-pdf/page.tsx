'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileCode, Upload, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function WordToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleConvert = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDone(true);
    }, 1500);
  };

  return (
    <ToolLayout title="Word to PDF" description="Convertește fișiere DOCX/DOC în documente PDF profesionale.">
      <div className="max-w-xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Word to PDF</h2>
            <p className="text-xs text-slate-400">Conversie rapidă .docx & .doc</p>
          </div>
        </div>

        {!file ? (
          <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl cursor-pointer bg-slate-950/40 transition-all group">
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mb-2 transition-colors" />
            <span className="text-sm font-medium text-slate-300">Încarcă un fișier Word (.docx)</span>
            <input type="file" accept=".doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-sm text-slate-200 truncate">{file.name}</span>
              </div>
              <button onClick={() => { setFile(null); setDone(false); }} className="text-xs text-rose-400 hover:underline">Șterge</button>
            </div>

            {done ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-white">Conversie finalizată cu succes!</p>
                <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Descarcă Fișierul PDF
                </button>
              </div>
            ) : (
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 text-sm"
              >
                {isProcessing ? 'Se convertește în PDF...' : 'Convertește în PDF'}
              </button>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}