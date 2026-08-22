'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { FileText, Upload, Copy, Check, RefreshCw, FileCode } from 'lucide-react';

export default function PdfToWordPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setExtractedText('');
    }
  };

  const extractTextFromPdf = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        fullText += `--- Pagina ${i} ---\n\n${pageText}\n\n`;
      }

      setExtractedText(fullText.trim());
    } catch (error) {
      console.error('Eroare la extragerea textului:', error);
      alert('A apărut o eroare la citirea fișierului PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!extractedText || !file) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name.replace('.pdf', '')}_text.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetState = () => {
    setFile(null);
    setExtractedText('');
  };

  return (
    <ToolLayout
      title="PDF to Text / Doc"
      badge="PDF CLUSTER"
      description="Extrage textul din documentele PDF direct în browser și descarcă-l rapid."
      icon={FileText}
    >
      <div className="max-w-3xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Extragere Text din PDF</h2>
            <p className="text-xs text-slate-400">Conversie rapidă în text editabil</p>
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
                <FileCode className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm text-slate-200 truncate">{file.name}</span>
              </div>
              <button onClick={resetState} className="text-xs text-rose-400 hover:underline shrink-0">
                Șterge
              </button>
            </div>

            {!extractedText ? (
              <button
                onClick={extractTextFromPdf}
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Se extrage textul...</span>
                  </>
                ) : (
                  <span>Extrage Textul</span>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Text extras:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copiat!' : 'Copiază'}</span>
                    </button>
                    <button
                      onClick={downloadTxt}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Descarcă TXT</span>
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  value={extractedText}
                  className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}