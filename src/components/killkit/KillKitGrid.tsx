'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import KillKitNode from './KillKitNode';

export interface GridItem {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
  isFamily?: boolean;
  status?: 'active' | 'coming-soon';
}

interface KillKitGridProps {
  items: GridItem[];
  onSelectFamily?: (id: string) => void;
}

interface Point {
  x: number;
  y: number;
}

export default function KillKitGrid({ items, onSelectFamily }: KillKitGridProps) {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, Point>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newPositions: Record<string, Point> = {};
    items.forEach((item) => {
      const el = nodeRefs.current[item.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPositions[item.id] = {
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
  }, [items]);

  const activeItem = items.find((t) => t.id === activeHoverId);

  return (
    <div ref={containerRef} className="relative w-full py-8 px-2 flex flex-col items-center justify-center min-h-[550px]">
      
      {/* CONNECTOR LINES SVG (Constelația verde) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {activeItem &&
          nodePositions[activeItem.id] &&
          items.map((targetItem) => {
            if (
              targetItem.id !== activeItem.id &&
              targetItem.status !== 'coming-soon' &&
              nodePositions[targetItem.id]
            ) {
              const start = nodePositions[activeItem.id];
              const end = nodePositions[targetItem.id];

              return (
                <g key={`link-${activeItem.id}-${targetItem.id}`}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#78ff73"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                    className="animate-pulse opacity-70"
                    style={{ filter: 'drop-shadow(0px 0px 8px #78ff73)' }}
                  />
                </g>
              );
            }
            return null;
          })}
      </svg>

      {/* GRID-UL DE NODURI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-14 relative z-10 max-w-5xl">
        {items.map((item) => (
          <div
            key={item.id}
            ref={(el) => { nodeRefs.current[item.id] = el; }}
            onMouseEnter={() => {
              updatePositions();
              setActiveHoverId(item.id);
            }}
            onMouseLeave={() => setActiveHoverId(null)}
          >
            <KillKitNode
              title={item.title}
              description={item.description}
              badge={item.badge}
              href={item.href}
              icon={item.icon}
              isComingSoon={item.status === 'coming-soon'}
              onClick={() => {
                if (item.isFamily && onSelectFamily) {
                  onSelectFamily(item.id);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}