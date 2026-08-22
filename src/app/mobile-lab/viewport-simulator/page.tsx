'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Tablet, Smartphone, RotateCw } from 'lucide-react';

const DEVICES = [
  { name: 'iPhone 14/15 Pro', width: 393, height: 852, icon: Smartphone },
  { name: 'iPhone SE', width: 375, height: 667, icon: Smartphone },
  { name: 'Google Pixel 7', width: 412, height: 915, icon: Smartphone },
  { name: 'iPad Mini', width: 768, height: 1024, icon: Tablet },
  { name: 'iPad Pro 11"', width: 834, height: 1194, icon: Tablet },
];

export default function ViewportSimulatorPage() {
  // Am schimbat valoarea inițială în string gol
  const [url, setUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [isLandscape, setIsLandscape] = useState(false);

  const handleLoadUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(inputUrl);
  };

  const currentWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
  const currentHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

  return (
    <ToolLayout
      title="Mobile Viewport Simulator"
      badge="MOBILE CLUSTER"
      description="Simulate responsive web pages inside custom mobile and tablet frames with orientation toggle."
      icon={Smartphone}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Controls Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <form onSubmit={handleLoadUrl} className="flex items-center gap-2 flex-1 min-w-[280px]">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter URL to preview..."
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold rounded-xl transition-colors flex-shrink-0 shadow-lg shadow-emerald-500/20"
            >
              Load
            </button>
          </form>

          <div className="flex items-center gap-2 flex-wrap">
            {DEVICES.map((dev, idx) => {
              const Icon = dev.icon;
              const isSelected = selectedDevice.name === dev.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDevice(dev)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{dev.name.split(' ')[0]}</span>
                </button>
              );
            })}

            <button
              onClick={() => setIsLandscape(!isLandscape)}
              className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition-colors"
              title="Rotate Device"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulator Frame */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[600px]">
          <div className="text-xs font-mono text-slate-500 mb-4">
            Frame: {selectedDevice.name} ({currentWidth}px × {currentHeight}px) {isLandscape ? '[Landscape]' : '[Portrait]'}
          </div>

          <div
            className="border-8 border-slate-800 rounded-3xl overflow-hidden bg-white shadow-2xl transition-all duration-300"
            style={{ width: `${Math.min(currentWidth, 900)}px`, height: `${Math.min(currentHeight, 600)}px` }}
          >
            {url ? (
              <iframe
                src={url}
                title="Mobile Viewport Simulator"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-mono">
                Enter a URL to begin simulation
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}