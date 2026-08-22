'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FAMILIES } from '@/config/categories';
import '@/components/killkit/KillKitNode.css';

const RenderIcon = ({
  icon: Icon,
  className,
}: {
  icon: any;
  className?: string;
}) => {
  if (!Icon) return null;
  if (React.isValidElement(Icon)) return Icon;

  if (typeof Icon === 'function' || typeof Icon === 'object') {
    const Component = Icon;
    return <Component className={className} />;
  }

  return null;
};

export default function ConstellationMap() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

  /*
   * Toate familiile sunt poziționate automat pe o orbită.
   * Nu mai avem coordonate hardcodate pentru fiecare familie.
   */
  const clusters = useMemo(() => {
    const total = FAMILIES.length;

    return FAMILIES.map((family, index) => {
      const angle = (index / total) * Math.PI * 2 - Math.PI / 2;

      /*
       * 36% din lățime / înălțime păstrează centrul liber
       * pentru focus și oferă spațiu tuturor clusterelor.
       */
      const radiusX = 36;
      const radiusY = 30;

      return {
        ...family,
        baseX: 50 + Math.cos(angle) * radiusX,
        baseY: 50 + Math.sin(angle) * radiusY,
        angle,
      };
    });
  }, []);

  const currentFocusId = activeCluster;

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setActiveCluster((current) => (current === id ? null : id));
  };

  return (
    <div
      className="relative w-full min-h-[85vh] bg-[#0B0F17] rounded-3xl border border-slate-800/80 overflow-visible select-none"
      onClick={() => setActiveCluster(null)}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-900/60 via-[#0B0F17] to-[#0B0F17] pointer-events-none" />

      {/* Secondary cosmic glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] aspect-square rounded-full bg-[#78ff73]/5 blur-3xl" />
      </div>

      {/* Info Overlay */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none space-y-1">
        <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#78ff73] animate-pulse" />
          KillKit Constellation
        </h2>

        <p className="text-xs text-slate-500 font-mono">
          {currentFocusId
            ? 'Apasă pe fundal pentru a reveni la constelația completă'
            : 'Explorează familiile. Click pentru focus.'}
        </p>
      </div>

      {/* Center identity */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 transition-all duration-700 pointer-events-none ${
          currentFocusId ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
      >
        <div className="w-32 h-32 rounded-full border border-[#78ff73]/20 bg-[#0B0F17]/80 flex items-center justify-center shadow-[0_0_80px_rgba(120,255,115,0.08)]">
          <div className="text-center">
            <div className="text-[#78ff73] text-2xl font-black tracking-[0.2em]">
              K
            </div>
            <div className="text-[8px] text-slate-500 font-mono tracking-[0.3em] mt-1">
              KILLKIT
            </div>
          </div>
        </div>
      </div>

      {/* Connection lines */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
          currentFocusId ? 'opacity-10' : 'opacity-100'
        }`}
        preserveAspectRatio="none"
      >
        {clusters.map((cluster, index) => {
          const next = clusters[(index + 1) % clusters.length];

          return (
            <line
              key={`${cluster.id}-${next.id}`}
              x1={`${cluster.baseX}%`}
              y1={`${cluster.baseY}%`}
              x2={`${next.baseX}%`}
              y2={`${next.baseY}%`}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          );
        })}

        {/* Connections to center */}
        {!currentFocusId &&
          clusters.map((cluster) => (
            <line
              key={`center-${cluster.id}`}
              x1="50%"
              y1="50%"
              x2={`${cluster.baseX}%`}
              y2={`${cluster.baseY}%`}
              stroke="rgba(120,255,115,0.035)"
              strokeWidth="1"
            />
          ))}
      </svg>

      {/* Clusters */}
      {clusters.map((cluster) => {
        const isFocused = currentFocusId === cluster.id;
        const isHovered = hoveredCluster === cluster.id;
        const isDimmed =
          currentFocusId !== null && !isFocused;

        const position = isFocused
           ? { left: '50%', top: '50%' }
           : {
               left: `${cluster.baseX}%`,
               top:
               cluster.id === 'pdf-suite'
              ? `${cluster.baseY + 6}%`
              : `${cluster.baseY}%`,
            };

        return (
          <div
            key={cluster.id}
            onMouseEnter={() => setHoveredCluster(cluster.id)}
            onMouseLeave={() => setHoveredCluster(null)}
            onClick={(e) => handleClick(cluster.id, e)}
            style={position}
            className={`
              absolute -translate-x-1/2 -translate-y-1/2
              cursor-pointer
              transition-all duration-700
              cubic-bezier(0.34, 1.56, 0.64, 1)
              kk-node
              ${isDimmed ? 'scale-50 opacity-20 blur-[1px]' : ''}
              ${isFocused ? 'z-40 scale-[1.35]' : 'z-10'}
              ${isHovered && !isFocused ? 'scale-[1.08]' : ''}
            `}
          >
            {/* Atomic rings */}
            <div className="kk-rings">
              <div className="kk-ring outer" />
              <div className="kk-ring middle" />
              <div className="kk-ring inner" />

              <div className="kk-core">
                <RenderIcon
                  icon={cluster.icon}
                  className="w-5 h-5"
                />
              </div>
            </div>

            {/* Status */}
            <span className="kk-badge">
              {cluster.status === 'coming-soon'
                ? 'SOON'
                : `${cluster.tools.length} TOOLS`}
            </span>

            <p className="kk-title">{cluster.title}</p>

            {/* Tool orbit */}
            {isFocused && cluster.tools.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <div className="absolute inset-0 flex items-center justify-center animate-[spin_40s_linear_infinite] pointer-events-auto">
                  {cluster.tools.map((tool, index) => {
                    const totalTools = cluster.tools.length;
                    const angle =
                      (index / totalTools) * Math.PI * 2 -
                      Math.PI / 2 + 0.22;

                    const radius =
                      totalTools > 8 ? 175 : 140;

                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                        className="absolute group z-50"
                      >
                        <div className="animate-[spin_40s_linear_infinite_reverse]">
                          <div className="w-11 h-11 rounded-full bg-slate-950 border-2 border-[#78ff73] text-[#78ff73] flex items-center justify-center shadow-[0_0_25px_rgba(120,255,115,0.6)] hover:scale-125 transition-all duration-300 cursor-pointer hover:bg-[#78ff73] hover:text-black">
                            <RenderIcon
                              icon={tool.icon}
                              className="w-5 h-5"
                            />
                          </div>

                          <div className="absolute left-1/2 -translate-x-1/2 top-13 opacity-0 group-hover:opacity-100 bg-slate-900 border border-[#78ff73] text-white text-xs font-mono py-1 px-3 rounded-lg whitespace-nowrap pointer-events-none shadow-2xl transition-all duration-200 z-50">
                            {tool.title}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}