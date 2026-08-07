'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { ArrowLeft, FileText, RotateCw, Stamp, Download, ShieldCheck, Upload, Trash2 } from 'lucide-react';

export default function PdfOrganizerPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [stampText, setStampText] = useState<string>('CONFIDENTIAL');
  const [stampColor, setStampColor] = useState<string>('red');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;

    setPdfFile(file);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPageCount(pdfDoc.getPageCount());
    } catch (err) {
      console.error('Error loading PDF:', err);
    }
  };

  const processAndDownload = async () => {
    if (!pdfFile) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      pages.forEach((page) => {
        // Rotate Page
        if (rotation !== 0) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees((currentRotation + rotation) % 360));
        }

        // Apply Stamp / Watermark
        if (stampText.trim()) {
          const { width, height } = page.getSize();
          const fontSize = 48;
          const textWidth = font.widthOfTextAtSize(stampText, fontSize);
          
          let colorRgb = rgb(0.9, 0.2, 0.2); // Default Red
          if (stampColor === 'blue') colorRgb = rgb(0.2, 0.4, 0.9);
          if (stampColor === 'green') colorRgb = rgb(0.2, 0.7, 0.3);

          page.drawText(stampText, {
            x: width / 2 - textWidth / 2,
            y: height / 2,
            size: fontSize,
            font: font,
            color: colorRgb,
            opacity: 0.25,
            rotate: degrees(45),
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `stamped_${pdfFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error processing PDF:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#0B0F17]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-[#78ff73] transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Network</span>
          </Link>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base">PDF Rotate & Watermark Stamp</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              PDF CLUSTER
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldCheck size={14} className="text-[#78ff73]" />
          <span>Local PDF Engine</span>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 space-y-8">
        
        {/* File Upload Box */}
        {!pdfFile ? (
          <label className="border-2 border-dashed border-slate-800 hover:border-[#78ff73]/50 bg-slate-900/30 hover:bg-slate-900/50 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all group text-center space-y-4">
            <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
            <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform border border-indigo-500/20">
              <Upload size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Upload PDF Document</h3>
              <p className="text-xs text-slate-400">Select a PDF file to rotate pages or apply security stamps</p>
            </div>
          </label>
        ) : (
          <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-8">
            
            {/* Active File Info */}
            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{pdfFile.name}</h4>
                  <p className="text-xs text-slate-400">{pageCount} Pages Loaded</p>
                </div>
              </div>
              <button
                onClick={() => setPdfFile(null)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Rotation Control */}
              <div className="space-y-3 p-5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <RotateCw size={16} className="text-indigo-400" />
                  <span>Page Rotation</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 90, 180, 270].map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setRotation(deg)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        rotation === deg
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {deg === 0 ? 'Original' : `+${deg}°`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Watermark Control */}
              <div className="space-y-3 p-5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Stamp size={16} className="text-indigo-400" />
                  <span>Watermark Stamp</span>
                </div>
                <input
                  type="text"
                  value={stampText}
                  onChange={(e) => setStampText(e.target.value)}
                  placeholder="e.g. CONFIDENTIAL / APPROVED"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <div className="flex gap-2">
                  {['red', 'blue', 'green'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setStampColor(c)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                        stampColor === c
                          ? 'bg-slate-800 text-white border-indigo-500'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Button */}
            <button
              onClick={processAndDownload}
              disabled={isProcessing}
              className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              <Download size={18} />
              <span>{isProcessing ? 'Processing PDF...' : 'Apply & Download PDF'}</span>
            </button>

          </div>
        )}

      </div>
    </main>
  );
}