'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, ArrowDown, Download, Trash2 } from 'lucide-react';

export default function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        (file) => file.type === 'application/pdf'
      );
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'omnitools-merged.pdf';
      link.click();
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please make sure the files are valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-400">
          PDF Merger
        </h1>
        <p className="text-slate-400 text-center mb-6 text-sm">
          100% Secure & Private — Merge your PDF files locally inside your browser.
        </p>

        {/* Dropzone */}
        <label className="border-2 border-dashed border-slate-600 hover:border-indigo-500 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-800/50 hover:bg-slate-800">
          <Upload className="w-10 h-10 text-indigo-400 mb-2" />
          <span className="font-semibold text-slate-200">
            Click to upload or drag & drop PDFs
          </span>
          <span className="text-xs text-slate-500 mt-1">PDF files only</span>
          <input
            type="file"
            multiple
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h2 className="text-sm font-semibold text-slate-300">
              Files to merge ({files.length}):
            </h2>
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg border border-slate-600"
              >
                <div className="flex items-center space-x-3 truncate">
                  <FileText className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm text-slate-200 truncate">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="text-slate-400 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={mergePdfs}
              disabled={files.length < 2 || isProcessing}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Merge PDFs Now</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}