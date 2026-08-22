'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Image as ImageIcon, Upload, Download, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

export default function PdfToImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pagesAsImages, setPagesAsImages] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setPagesAsImages([]);
    }
  };

  const convertPdfToImages = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      // Încărcăm pdfjs-dist dinamic pentru a rula doar pe client
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const images: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 }); // Scală 2x pentru calitate bună
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
           canvasContext: context,
           viewport: viewport,
           canvas: canvas,
         } as any).promise;

          images.push(canvas.toDataURL('image/png'));
        }
      }

      setPagesAsImages(images);
    } catch (error) {
      console.error('Eroare la conversia PDF în imagini:', error);
      alert('A apărut o eroare la procesarea paginilor din PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (dataUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${file?.name.replace('.pdf', '')}_pagina_${index + 1}.png`;
    link.click();
  };

  const resetState = () => {
    setFile(null);
    setPagesAsImages([]);
  };

  return (
    <ToolLayout
      title="PDF to Images"
      badge="PDF CLUSTER"
      description="Convertește fiecare pagină din documentul tău PDF într-o imagine PNG de înaltă rezoluție."
      icon={ImageIcon}
    >
      <div className="max-w-3xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">PDF în Imagini</h2>
            <p className="text-xs text-slate-400">Extragere pagini ca PNG</p>
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

            {pagesAsImages.length === 0 ? (
              <button
                onClick={convertPdfToImages}
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Se randază paginile...</span>
                  </>
                ) : (
                  <span>Convertește în Imagini</span>
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>S-au generat {pagesAsImages.length} imagini!</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2 bg-slate-950/50 rounded-xl border border-slate-800">
                  {pagesAsImages.map((img, idx) => (
                    <div key={idx} className="group relative border border-slate-800 rounded-lg overflow-hidden bg-slate-900">
                      <img src={img} alt={`Pagina ${idx + 1}`} className="w-full h-auto object-cover" />
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <span className="text-xs text-white font-mono">Pagina {idx + 1}</span>
                        <button
                          onClick={() => downloadImage(img, idx)}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 shadow-md"
                        >
                          <Download className="w-3.5 h-3.5" /> Descarcă
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}