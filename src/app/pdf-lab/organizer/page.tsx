'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { LayoutGrid, Upload, Download, RefreshCw, RotateCw, Trash2, GripVertical } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PageItem {
  id: string;
  originalIndex: number;
  rotation: number;
  dataUrl: string;
}

// Componentă individuală Sortabilă pentru fiecare pagină
function SortablePage({
  item,
  index,
  onRotate,
  onDelete,
}: {
  item: PageItem;
  index: number;
  onRotate: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex flex-col items-center relative group shadow-lg select-none"
    >
      {/* Target pentru Drag */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-3 left-3 z-10 p-1.5 bg-slate-950/80 hover:bg-emerald-500 hover:text-slate-950 text-slate-400 rounded-lg cursor-grab active:cursor-grabbing transition-colors"
        title="Trage pentru a reordona"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-slate-950 p-2">
        <img
          src={item.dataUrl}
          alt={`Pagina ${index + 1}`}
          style={{ transform: `rotate(${item.rotation}deg)` }}
          className="max-h-full max-w-full object-contain transition-transform duration-200 pointer-events-none"
        />
      </div>

      <div className="flex items-center justify-between w-full pt-2 px-1">
        <span className="text-[11px] font-mono text-slate-400">
          Pagina {index + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onRotate(item.id)}
            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors"
            title="Rotește 90°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
            title="Șterge pagina"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PdfOrganizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pages, setPages] = useState<PageItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || selectedFile.type !== 'application/pdf') return;

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const loadedPages: PageItem[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
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

          loadedPages.push({
            id: `page-${i}-${Date.now()}`,
            originalIndex: i - 1,
            rotation: 0,
            dataUrl: canvas.toDataURL('image/png'),
          });
        }
      }

      setPages(loadedPages);
    } catch (error) {
      console.error('Eroare la încărcarea PDF-ului:', error);
      alert('Nu s-au putut încărca paginile.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const rotatePage = (id: string) => {
    setPages((items) =>
      items.map((item) =>
        item.id === id ? { ...item, rotation: (item.rotation + 90) % 360 } : item
      )
    );
  };

  const deletePage = (id: string) => {
    setPages((items) => items.filter((item) => item.id !== id));
  };

  const saveOrganizedPdf = async () => {
    if (!file || pages.length === 0) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      for (const item of pages) {
        const [copiedPage] = await newPdf.copyPages(srcDoc, [item.originalIndex]);
        if (item.rotation !== 0) {
          copiedPage.setRotation(degrees(copiedPage.getRotation().angle + item.rotation));
        }
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `Organized_${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Eroare la salvare:', error);
      alert('Eroare la generarea fișierului PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="PDF Organizer"
      badge="PDF CLUSTER"
      description="Trage și fixează paginile pentru a le reordona, roti sau elimina dintr-un document PDF."
      icon={LayoutGrid}
    >
      <div className="max-w-4xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Organizator PDF Interactive</h2>
              <p className="text-xs text-slate-400">Drag & Drop pentru reordonare instanță</p>
            </div>
          </div>

          {file && pages.length > 0 && (
            <button
              onClick={saveOrganizedPdf}
              disabled={isProcessing}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>Exportă PDF Nou</span>
            </button>
          )}
        </div>

        {!file ? (
          <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl cursor-pointer bg-slate-950/40 transition-all group">
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mb-2 transition-colors" />
            <span className="text-sm font-medium text-slate-300">Încarcă documentul PDF</span>
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          </label>
        ) : isProcessing && pages.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
            <span>Se randează paginile pentru Drag & Drop...</span>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={pages.map((p) => p.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                {pages.map((item, idx) => (
                  <SortablePage
                    key={item.id}
                    item={item}
                    index={idx}
                    onRotate={rotatePage}
                    onDelete={deletePage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </ToolLayout>
  );
}