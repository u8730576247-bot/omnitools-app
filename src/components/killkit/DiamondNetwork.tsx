'use client';

import React, { useState } from 'react';
import KillKitNode from './KillKitNode';
import { FileText, Receipt, FileCode, Image, ShieldCheck, Sparkles } from 'lucide-react';

interface ToolNode {
  id: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  badge?: string;
  connectedTo?: string[]; // ID-urile nodurilor de care este conectat
}

const TOOLS: ToolNode[] = [
  {
    id: 'vox-rex-lex',
    title: 'VoxRexLex',
    description: 'Aplicația ta pentru gestionat contracte și documente.',
    icon: FileText,
    href: '/vox-rex-lex',
    badge: 'NEW',
    connectedTo: ['pdf-merger'],
  },
  {
    id: 'pdf-merger',
    title: 'PDF Merger & Splitter',
    description: 'Securely merge and manipulate PDF files locally in your browser.',
    icon: FileText,
    href: '/pdf-merger',
    badge: 'POPULAR',
    connectedTo: ['exif-cleaner'],
  },
  {
    id: 'invoice-gen',
    title: 'Free Invoice Generator',
    description: 'Create professional invoices and receipts in seconds.',
    icon: Receipt,
    href: '/invoice-generator',
    badge: 'B2B',
    connectedTo: ['json-converter'],
  },
  {
    id: 'json-converter',
    title: 'JSON to CSV Converter',
    description: 'Convert JSON data into clean CSV sheets instantly.',
    icon: FileCode,
    href: '/json-converter',
    badge: 'DEV TOOL',
    connectedTo: [],
  },
  {
    id: 'image-converter',
    title: 'Image Converter',
    description: 'Schimbă formatul imaginilor (PNG, JPG, WebP) și redu dimensiunea lor.',
    icon: Image,
    href: '/image-converter',
    badge: 'NEW',
    connectedTo: ['exif-cleaner'],
  },
  {
    id: 'exif-cleaner',
    title: 'Exif & Privacy Cleaner',
    description: 'Remove GPS coordinates and private metadata from your photos.',
    icon: ShieldCheck,
    href: '/exif-cleaner',
    badge: 'PRIVACY',
    connectedTo: [],
  },
];

export function DiamondNetwork() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      {/* Network Grid */}
      <div className="flex flex-wrap justify-center gap-12 relative z-10">
        {TOOLS.map((tool) => (
          <div
            key={tool.id}
            onMouseEnter={() => setActiveNode(tool.id)}
            onMouseLeave={() => setActiveNode(null)}
            className="transition-opacity duration-300"
          >
            <KillKitNode
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              href={tool.href}
              badge={tool.badge}
            />
          </div>
        ))}
      </div>
    </div>
  );
}