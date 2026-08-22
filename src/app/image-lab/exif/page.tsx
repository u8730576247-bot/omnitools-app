'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, ShieldCheck, Download } from 'lucide-react';

export default function ExifCleaner() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setCleanedUrl(null);
  };

  const cleanExif = () => {
    if (!file || !preview) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        // Redesenarea pe Canvas elimină automat toate datele EXIF/GPS
        const cleanDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCleanedUrl(cleanDataUrl);
      }
      setIsProcessing(false);
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition">
          <ArrowLeft size={18} /> Înapoi la Unelte
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="text-blue-400" /> Exif & Privacy Cleaner
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Elimină datele GPS, modelul camerei și alte informații private din pozele tale direct în browser.
          </p>

          <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 transition mb-6">
            <Upload className="text-slate-400 mb-2" size={32} />
            <span className="text-sm font-medium text-slate-300">Apasă aici sau trage o imagine (JPG, PNG)</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {preview && (
            <div className="flex flex-col items-center gap-4">
              <img src={preview} alt="Preview" className="max-h-64 rounded-lg border border-slate-800" />
              
              {!cleanedUrl ? (
                <button
                  onClick={cleanExif}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition"
                >
                  {isProcessing ? 'Se procesează...' : 'Curăță Datele EXIF'}
                </button>
              ) : (
                <a
                  href={cleanedUrl}
                  download={`clean_${file?.name || 'photo.jpg'}`}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition"
                >
                  <Download size={18} /> Descarcă Imaginea Curățată
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}