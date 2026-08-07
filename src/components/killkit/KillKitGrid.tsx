'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge: string;
  badgeColor: string;
}

interface KillKitGridProps {
  tools: ToolItem[];
}

interface Point {
  x: number;
  y: number;
}

export default function KillKitGrid({ tools }: KillKitGridProps) {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, Point>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Recalculăm pozițiile centrelor fiecărui cerc din grilă
  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newPositions: Record<string, Point> = {};
    tools.forEach((tool) => {
      const el = nodeRefs.current[tool.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPositions[tool.id] = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      }
    });
    setNodePositions(newPositions);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [tools]);

  const activeTool = tools.find((t) => t.id === activeHoverId);

  return (
    <div ref={containerRef} className="relative w-full py-12 px-4 flex flex-col items-center justify-center min-h-[600px]">
      
      {/* SVG CONNECTOR LINES NETWORK */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {activeTool &&
          nodePositions[activeTool.id] &&
          tools.map((targetTool) => {
            if (
              targetTool.id !== activeTool.id &&
              targetTool.badge === activeTool.badge &&
              nodePositions[targetTool.id]
            ) {
              const start = nodePositions[activeTool.id];
              const end = nodePositions[targetTool.id];

              return (
                <g key={`link-${activeTool.id}-${targetTool.id}`}>
                  {/* Linie întreruptă verde electric */}
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#78ff73"
                    strokeWidth="2.5"
                    strokeDasharray="6,6"
                    className="animate-pulse"
                    style={{
                      filter: 'drop-shadow(0px 0px 8px #78ff73)',
                    }}
                  />
                </g>
              );
            }
            return null;
          })}
      </svg>

      {/* GRID DE NODURI CIRCULARE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16 relative z-10 max-w-5xl">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isHovered = activeHoverId === tool.id;
          const isCompatible =
            activeTool &&
            activeTool.badge === tool.badge &&
            tool.id !== activeTool.id;

          return (
            <Link
              key={tool.id}
              href={tool.href}
              onMouseEnter={() => {
                updatePositions();
                setActiveHoverId(tool.id);
              }}
              onMouseLeave={() => setActiveHoverId(null)}
              className="group relative flex flex-col items-center text-center transition-transform duration-300 hover:scale-110"
            >
              {/* CERCUL CONCENTRIC PRINCIPAL */}
              <div
                ref={(el) => { nodeRefs.current[tool.id] = el; }}
                className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#0a0e17] border-2 transition-all duration-300 flex items-center justify-center ${
                  isHovered
                    ? 'border-[#78ff73] shadow-[0_0_30px_rgba(120,255,115,0.6)]'
                    : isCompatible
                    ? 'border-[#78ff73] shadow-[0_0_20px_rgba(120,255,115,0.4)] animate-pulse'
                    : 'border-slate-800'
                }`}
              >
                {/* CERC CONCENTRIC INTERIOR 1 */}
                <div className="absolute inset-2 rounded-full border border-slate-800/80 group-hover:border-[#78ff73]/40 flex items-center justify-center transition-colors">
                  
                  {/* CERC CONCENTRIC INTERIOR 2 */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center">
                    
                    <Icon
                      size={26}
                      className={`transition-colors duration-300 ${
                        isHovered || isCompatible
                          ? 'text-[#78ff73]'
                          : 'text-slate-400'
                      }`}
                    />

                    <span className="text-[7px] font-mono font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                      {tool.badge.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* NODUL SATELIT NEON VERDE */}
                <div
                  className={`absolute top-1 right-2 w-3 h-3 rounded-full border-2 border-[#0B0F17] transition-all duration-300 ${
                    isHovered || isCompatible
                      ? 'bg-[#78ff73] shadow-[0_0_12px_#78ff73] scale-125'
                      : 'bg-slate-700'
                  }`}
                />
              </div>

              {/* Titlul Aplicației */}
              <div className="mt-3 space-y-1 max-w-[130px]">
                <h3
                  className={`text-xs md:text-sm font-bold transition-colors leading-tight ${
                    isHovered || isCompatible
                      ? 'text-[#78ff73]'
                      : 'text-slate-300'
                  }`}
                >
                  {tool.title}
                </h3>

                {isCompatible && (
                  <span className="inline-block text-[9px] font-mono text-[#78ff73] bg-[#78ff73]/10 border border-[#78ff73]/30 px-1.5 py-0.5 rounded-full animate-bounce">
                    LINKED
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}