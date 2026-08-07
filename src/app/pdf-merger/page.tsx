'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { FileText, Upload, Trash2, ArrowUp, ArrowDown, Download, Layers } from 'lucide-react';

interface PDFFileItem {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function PDFMergerPage() {
  const [files, setFiles] = useState<PDFFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files).filter(
      (file) => file.type === 'application/pdf'
    );

    const newItems: PDFFileItem[] = uploadedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    }));

    setFiles((prev) => [...prev, ...newItems]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;

    const updated = [...files];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setFiles(updated);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `KillKit_Merged_${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Eroare la combinarea PDF-urilor:', err);
      alert('A apărut o eroare la procesarea fișierelor PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="PDF Merger & Combiner"
      badge="PDF CLUSTER"
      description="Unește mai multe fișiere PDF într-un singur document instantaneu. Procesare 100% locală în browser, în deplină siguranță."
      icon={Layers}
    >
      <div className="space-y-6">
        {/* Upload Zone */}
        <div className="border-2 border-dashed border-slate-700 hover:border-[#78ff73]/50 transition-colors rounded-xl p-8 text-center bg-slate-950/40 cursor-pointer relative group">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-slate-800/80 rounded-full text-[#78ff73] group-hover:scale-110 transition-transform">
              <Upload size={24} />
            </div>
            <div>
              <p className="text-white font-medium text-base">
                Trage fișierele PDF aici sau <span className="text-[#78ff73]">răsfoiește</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">Poți selecta mai multe fișiere deodată</p>
            </div>
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Fișiere selectate ({files.length})
              </span>
              <button
                onClick={() => setFiles([])}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Șterge tot
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText size={20} className="text-[#78ff73] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      <p className="text-xs text-slate-400">{file.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors ml-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={mergePDFs}
                disabled={files.length < 2 || isProcessing}
                className="flex items-center gap-2 bg-[#78ff73] hover:bg-[#65e660] text-black font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#78ff73]/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                <span>{isProcessing ? 'Se unesc fișierele...' : 'Unește PDF-urile'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}