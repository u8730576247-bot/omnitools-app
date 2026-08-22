'use client';

import React, { useState } from 'react';
import KillKitNode from './KillKitNode';
import { FileText, Receipt, FileCode, Image, ShieldCheck } from 'lucide-react';

interface ToolNode {
  id: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  badge?: string;
  connectedTo?: string[];
}

const TOOLS: ToolNode[] = [
  {
    id: 'vox-rex-lex',
    title: 'VoxRexLex',
    description: 'Aplicația ta pentru gestionat contracte și documente.',
    icon: FileText,
    href: '/vox-rex-lex',
    badge: 'NEW',
    connectedTo: ['pdf-lab/merger'],
  },
  {
    id: 'pdf-lab/merger',
    title: 'PDF Merger & Splitter',
    description: 'Securely merge and manipulate PDF files locally in your browser.',
    icon: FileText,
    href: '/pdf-lab/merger',
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
    href: '/image-lab/converter',
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
    <div className="relative w-full max-w-5xl mx-auto py-10">
      {/* CSS Animation locala pentru liniile de date */}
      <style jsx>{`
        @keyframes flow {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .data-stream {
          stroke-dasharray: 6 6;
          animation: flow 1.2s linear infinite;
        }
      `}</style>

      {/* Network Background SVG Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="18%"
          y1="22%"
          x2="50%"
          y2="22%"
          stroke={activeNode ? '#78ff73' : '#334155'}
          strokeWidth={activeNode ? '2' : '1'}
          className={activeNode ? 'data-stream' : 'opacity-30'}
        />
        <line
          x1="50%"
          y1="22%"
          x2="82%"
          y2="22%"
          stroke={activeNode ? '#78ff73' : '#334155'}
          strokeWidth={activeNode ? '2' : '1'}
          className={activeNode ? 'data-stream' : 'opacity-30'}
        />
        <line
          x1="18%"
          y1="75%"
          x2="50%"
          y2="75%"
          stroke={activeNode ? '#78ff73' : '#334155'}
          strokeWidth={activeNode ? '2' : '1'}
          className={activeNode ? 'data-stream' : 'opacity-30'}
        />
        <line
          x1="50%"
          y1="75%"
          x2="82%"
          y2="75%"
          stroke={activeNode ? '#78ff73' : '#334155'}
          strokeWidth={activeNode ? '2' : '1'}
          className={activeNode ? 'data-stream' : 'opacity-30'}
        />
        <line
          x1="50%"
          y1="22%"
          x2="50%"
          y2="75%"
          stroke={activeNode ? '#78ff73' : '#334155'}
          strokeWidth={activeNode ? '2' : '1'}
          className={activeNode ? 'data-stream' : 'opacity-30'}
        />
      </svg>

      {/* Grid distribution */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-14 relative z-10">
        {TOOLS.map((tool) => {
          const isConnected =
            activeNode === null ||
            activeNode === tool.id ||
            TOOLS.find((t) => t.id === activeNode)?.connectedTo?.includes(tool.id) ||
            tool.connectedTo?.includes(activeNode);

          const isActive = activeNode === tool.id;

          return (
            <div
              key={tool.id}
              onMouseEnter={() => setActiveNode(tool.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`transition-all duration-300 ease-out ${
                isConnected
                  ? 'opacity-100 scale-100'
                  : 'opacity-20 scale-95 blur-[1px]'
              } ${isActive ? 'z-20' : 'z-10'}`}
            >
              <KillKitNode
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
                badge={tool.badge}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}