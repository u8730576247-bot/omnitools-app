'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Calculator, ArrowRightLeft, Copy, Check } from 'lucide-react';

type Category = 'length' | 'weight' | 'temperature';

const UNITS: Record<Category, { name: string; ratio: number }[]> = {
  length: [
    { name: 'Meters (m)', ratio: 1 },
    { name: 'Kilometers (km)', ratio: 0.001 },
    { name: 'Centimeters (cm)', ratio: 100 },
    { name: 'Millimeters (mm)', ratio: 1000 },
    { name: 'Inches (in)', ratio: 39.3701 },
    { name: 'Feet (ft)', ratio: 3.28084 },
    { name: 'Yards (yd)', ratio: 1.09361 },
    { name: 'Miles (mi)', ratio: 0.000621371 },
  ],
  weight: [
    { name: 'Kilograms (kg)', ratio: 1 },
    { name: 'Grams (g)', ratio: 1000 },
    { name: 'Milligrams (mg)', ratio: 1000000 },
    { name: 'Pounds (lb)', ratio: 2.20462 },
    { name: 'Ounces (oz)', ratio: 35.274 },
  ],
  temperature: [
    { name: 'Celsius (°C)', ratio: 1 },
    { name: 'Fahrenheit (°F)', ratio: 1 },
    { name: 'Kelvin (K)', ratio: 1 },
  ],
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>('length');
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<number>(0);
  const [toUnit, setToUnit] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const convertedValue = useMemo(() => {
    if (category === 'temperature') {
      const fromName = UNITS.temperature[fromUnit].name;
      const toName = UNITS.temperature[toUnit].name;

      let celsius = value;
      if (fromName.includes('Fahrenheit')) celsius = (value - 32) * (5 / 9);
      if (fromName.includes('Kelvin')) celsius = value - 273.15;

      if (toName.includes('Celsius')) return celsius;
      if (toName.includes('Fahrenheit')) return celsius * (9 / 5) + 32;
      if (toName.includes('Kelvin')) return celsius + 273.15;
      return celsius;
    }

    const baseValue = value / UNITS[category][fromUnit].ratio;
    return baseValue * UNITS[category][toUnit].ratio;
  }, [value, fromUnit, toUnit, category]);

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(0);
    setToUnit(1);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${convertedValue.toFixed(4)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Universal Unit Converter"
      badge="MATH CLUSTER"
      description="Instant conversion between metric, imperial, and scientific units."
      icon={Calculator}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Category Selector */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex gap-3">
          {(['length', 'weight', 'temperature'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold capitalize transition-all ${
                category === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Converter Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* From Input */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-mono text-slate-400">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(Number(e.target.value))}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs focus:outline-none"
              >
                {UNITS[category].map((u, idx) => (
                  <option key={idx} value={idx}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={swapUnits}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 transition-colors shadow-md"
                title="Swap Units"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            {/* To Output */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-mono text-slate-400">To</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-sm font-bold focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-2.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(Number(e.target.value))}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs focus:outline-none"
              >
                {UNITS[category].map((u, idx) => (
                  <option key={idx} value={idx}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}