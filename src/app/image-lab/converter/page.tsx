'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImageConverter() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [quality, setQuality] = useState<number>(0.8);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setConvertedUrl(null);
    }
  };

  const convertImage = () => {
    if (!image || !preview) return;

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${format}`;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      setConvertedUrl(dataUrl);
    };
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-blue-400 hover:underline">
          &larr; Înapoi la Unelte
        </Link>
        <h1 className="text-3xl font-bold">Convertor & Compresor Imagini</h1>
        <p className="text-slate-400">
          Transformă formatul imaginilor (PNG, JPG, WebP) și redu dimensiunea lor direct în browser.
        </p>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-500"
          />

          {preview && (
            <div className="space-y-4 pt-4 border-t border-slate-700">
              <div className="flex gap-4 items-center">
                <label className="text-sm text-slate-300">Format nou:</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="bg-slate-700 text-white p-2 rounded-lg border border-slate-600"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPG</option>
                  <option value="webp">WebP</option>
                </select>

                <label className="text-sm text-slate-300 ml-4">Calitate ({Math.round(quality * 100)}%):</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="accent-blue-500"
                />
              </div>

              <button
                onClick={convertImage}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition"
              >
                Convertește Imaginea
              </button>
            </div>
          )}

          {convertedUrl && (
            <div className="pt-4 border-t border-slate-700 text-center space-y-4">
              <p className="text-green-400 font-medium">Imagine convertită cu succes!</p>
              <a
                href={convertedUrl}
                download={`converted-image.${format}`}
                className="inline-block bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded-lg font-medium transition"
              >
                Descarcă Imaginea
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}