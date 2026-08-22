'use client';

import React, { useState } from 'react';
import { Upload, FileCode, Download, Trash2, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PDFFileItem {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function PdfMergerTool() {
  const [files, setFiles] = useState<PDFFileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
        .filter((file) => file.type === 'application/pdf' || file.name.endsWith('.pdf'))
        .map((file) => ({
          id: Math.random().toString(36).substring(2, 9),
          file,
          name: file.name,
          size: formatSize(file.size),
        }));

      setFiles((prev) => [...prev, ...newFiles]);
      setMergedPdfUrl(null);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedPdfUrl(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;

    const updated = [...files];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setFiles(updated);
    setMergedPdfUrl(null);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setMergedPdfUrl(url);
    } catch (err) {
      console.error('Eroare la unirea PDF-urilor:', err);
      alert('A apărut o eroare la procesarea fișierelor PDF.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Zona de Drop/Upload */}
      <label className="border-2 border-dashed border-slate-700 hover:border-[#78ff73]/50 bg-slate-950/40 hover:bg-slate-900/60 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group text-center">
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 group-hover:border-[#78ff73] flex items-center justify-center text-slate-400 group-hover:text-[#78ff73] transition-all mb-3">
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium text-white group-hover:text-[#78ff73] transition-colors">
          Selectează sau trage fișierele PDF aici
        </p>
        <p className="text-xs text-slate-500 mt-1">Poți selecta mai multe fișiere simultan</p>
      </label>

      {/* Lista fișierelor */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>FIȘIERE SELECTATE ({files.length})</span>
            <button
              onClick={() => { setFiles([]); setMergedPdfUrl(null); }}
              className="text-rose-400 hover:underline cursor-pointer"
            >
              Șterge tot
            </button>
          </div>

          <div className="space-y-2">
            {files.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileCode className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-medium text-slate-200 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveFile(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(index, 'down')}
                    disabled={index === files.length - 1}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Acțiune Unire / Descarcă */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
            <button
              onClick={mergePDFs}
              disabled={files.length < 2 || isMerging}
              className="flex-1 flex items-center justify-center gap-2 bg-[#78ff73] hover:bg-[#60e65b] disabled:bg-slate-800 text-black disabled:text-slate-500 font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(120,255,115,0.2)] disabled:shadow-none cursor-pointer disabled:cursor-not-allowed text-sm"
            >
              {isMerging ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Se unesc PDF-urile...
                </>
              ) : (
                `Unește ${files.length} PDF-uri`
              )}
            </button>

            {mergedPdfUrl && (
              <a
                href={mergedPdfUrl}
                download="killkit_merged.pdf"
                className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer text-sm"
              >
                <Download className="w-4 h-4" /> Descarcă Rezultatul
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}