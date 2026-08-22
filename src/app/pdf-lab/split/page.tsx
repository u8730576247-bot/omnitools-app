'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Scissors, Upload, Download, FileText, CheckCircle2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Funcție de parsare a intervalului de pagini (ex: 1-3, 5, 8-10)
  const parsePageRange = (rangeStr: string, totalPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(',');

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map((val) => parseInt(val.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(totalPages, Math.max(start, end));
          for (let i = min; i <= max; i++) pages.add(i - 1);
        }
      } else {
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          pages.add(pageNum - 1);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const totalPages = srcPdf.getPageCount();

      // Dacă nu se specifică un interval, extragem toate paginile
      const selectedIndices = pageRange.trim() 
        ? parsePageRange(pageRange, totalPages) 
        : Array.from({ length: totalPages }, (_, i) => i);

      if (selectedIndices.length === 0) {
        alert('Te rugăm să introduci un interval de pagini valid!');
        setIsProcessing(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, selectedIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDone(true);
    } catch (error) {
      console.error('Eroare la procesarea PDF-ului:', error);
      alert('A apărut o eroare la tăierea fișierului PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !file) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `KillKit_Split_${file.name}`;
    link.click();
  };

  const resetState = () => {
    setFile(null);
    setDone(false);
    setPageRange('');
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
  };

  return (
    <ToolLayout title="PDF Splitter" description="Separă paginile sau extrage un interval specific din document.">
      <div className="max-w-xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">PDF Splitter</h2>
            <p className="text-xs text-slate-400">Extragere sau divizare pe pagini</p>
          </div>
        </div>

        {!file ? (
          <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl cursor-pointer bg-slate-950/40 transition-all group">
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mb-2 transition-colors" />
            <span className="text-sm font-medium text-slate-300">Încarcă documentul PDF</span>
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm text-slate-200 truncate">{file.name}</span>
              </div>
              <button onClick={resetState} className="text-xs text-rose-400 hover:underline shrink-0">Șterge</button>
            </div>

            {!done && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Interval pagini (ex: 1-3, 5, 8-10)</label>
                <input
                  type="text"
                  placeholder="Toate paginile sau ex: 1-5"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {done ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">Fișierul a fost procesat!</p>
                <button 
                  onClick={handleDownload}
                  className="mt-3 w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Descarcă PDF Scindat
                </button>
              </div>
            ) : (
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-lg shadow-emerald-500/10"
              >
                {isProcessing ? 'Se procesează PDF-ul...' : 'Separă Paginile'}
              </button>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}