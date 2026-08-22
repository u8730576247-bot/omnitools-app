'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { FileDown, Upload, Download, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

export default function PdfCompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [stats, setStats] = useState<{ original: string; compressed: string; saved: string } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setDone(false);
      setStats(null);
    }
  };

  const compressPDF = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Re-salvarea documentului fără obiecte neutilizate și cu structură structurată/curățată
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const originalSize = file.size;
      const compressedSize = blob.size;
      const savedBytes = Math.max(0, originalSize - compressedSize);
      const savedPercentage = originalSize > 0 ? ((savedBytes / originalSize) * 100).toFixed(1) : '0';

      setStats({
        original: (originalSize / (1024 * 1024)).toFixed(2) + ' MB',
        compressed: (compressedSize / (1024 * 1024)).toFixed(2) + ' MB',
        saved: `${savedPercentage}%`,
      });

      setDownloadUrl(url);
      setDone(true);
    } catch (error) {
      console.error('Eroare la comprimarea PDF-ului:', error);
      alert('A apărut o eroare la procesarea fișierului.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !file) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `KillKit_Compressed_${file.name}`;
    link.click();
  };

  const resetState = () => {
    setFile(null);
    setDone(false);
    setStats(null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
  };

  return (
    <ToolLayout
      title="PDF Compressor"
      badge="PDF CLUSTER"
      description="Reduce dimensiunea fișierelor PDF prin optimizarea structurii interne, direct în browser."
      icon={FileDown}
    >
      <div className="max-w-xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">PDF Compressor</h2>
            <p className="text-xs text-slate-400">Optimizare și reducere dimensiune</p>
          </div>
        </div>

        {!file ? (
          <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl cursor-pointer bg-slate-950/40 transition-all group">
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mb-2 transition-colors" />
            <span className="text-sm font-medium text-slate-300">Încarcă documentul PDF</span>
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm text-slate-200 truncate">{file.name}</span>
              </div>
              <button onClick={resetState} className="text-xs text-rose-400 hover:underline shrink-0">
                Șterge
              </button>
            </div>

            {done && stats ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white">Fișierul a fost optimizat!</p>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-lg text-xs font-mono border border-slate-800">
                    <div>
                      <p className="text-slate-500">Inițial</p>
                      <p className="text-slate-300 font-semibold">{stats.original}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Optim</p>
                      <p className="text-emerald-400 font-semibold">{stats.compressed}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Redus cu</p>
                      <p className="text-emerald-400 font-semibold">-{stats.saved}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Download className="w-4 h-4" /> Descarcă PDF Optimizat
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={compressPDF}
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Se optimizează PDF-ul...</span>
                  </>
                ) : (
                  <span>Comprimă PDF</span>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}