import React, { useState } from 'react';
import { BookOpen, Calculator, Check, ArrowRight, Sparkles } from 'lucide-react';
import { StatisticsResult } from '../types/stats';

interface StatisticalEngineProps {
  currentResults: StatisticsResult | null;
}

export const StatisticalEngine: React.FC<StatisticalEngineProps> = ({ currentResults }) => {
  const [useCurrentData, setUseCurrentData] = useState<boolean>(false);

  // Canonical dataset as required by project specification
  const canonicalData = [10, 20, 20, 30, 40];
  const canonicalSum = 120;
  const canonicalMean = 24;
  const canonicalMedian = 20;
  const canonicalMode = 20;
  const canonicalMin = 10;
  const canonicalMax = 40;
  const canonicalRange = 30;

  // Active dataset for explanation
  const isCustom = useCurrentData && currentResults !== null;
  const displayData = isCustom ? currentResults.sortedData : canonicalData;
  const displaySum = isCustom ? currentResults.sum : canonicalSum;
  const displayMean = isCustom ? currentResults.formattedMean : canonicalMean.toString();
  const displayMedian = isCustom ? currentResults.median : canonicalMedian;
  const displayModeText = isCustom ? currentResults.modeDisplay : `${canonicalMode}`;
  const displayMin = isCustom ? currentResults.minimum : canonicalMin;
  const displayMax = isCustom ? currentResults.maximum : canonicalMax;
  const displayRange = isCustom ? currentResults.range : canonicalRange;

  return (
    <section id="statistics" className="py-20 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum &amp; Mathematical Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            HOW THE MATHEMATICS WORKS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Step-by-step arithmetic deductions used by the Data Analysis Machine.
          </p>

          {/* Dataset Switcher (Canonical vs User Data) */}
          {currentResults && (
            <div className="pt-2 flex justify-center">
              <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setUseCurrentData(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    !useCurrentData
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Exhibition Standard (10, 20, 20, 30, 40)
                </button>
                <button
                  onClick={() => setUseCurrentData(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    useCurrentData
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Your Active Dataset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dataset Demonstration Pill Banner */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Examined Dataset:
            </span>
            <div className="flex items-center gap-1.5">
              {displayData.map((val, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-lg text-sm font-bold font-mono border ${
                    idx === 2
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-400/40'
                      : 'bg-slate-900 text-white border-slate-700'
                  }`}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
          <span className="text-xs text-cyan-400 font-medium">
            n = 5 observations
          </span>
        </div>

        {/* 4 Core Mathematical Deductions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* 1. MEAN */}
          <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center font-mono">1</span>
                ARITHMETIC MEAN
              </span>
              <span className="font-serif italic font-bold text-slate-300 text-sm">
                x̄ = (Σx) / n
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Mean Calculation
            </h3>

            <p className="text-xs text-slate-400">
              Sum all individual observations, then divide by the total count (5).
            </p>

            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm space-y-2">
              <div className="text-slate-400 text-[11px]">
                {displayData.join(' + ')} = <span className="text-white font-bold">{displaySum}</span>
              </div>
              <div className="text-cyan-300 text-base font-bold flex items-center gap-2">
                <span>{displaySum} ÷ 5 = </span>
                <span className="text-white bg-blue-600/30 px-2 py-0.5 rounded border border-blue-500/40">
                  {displayMean}
                </span>
              </div>
            </div>
          </div>

          {/* 2. MEDIAN */}
          <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-cyan-500/20 flex items-center justify-center font-mono">2</span>
                MEDIAN
              </span>
              <span className="font-serif italic font-bold text-slate-300 text-sm">
                M<sub>d</sub> = Value at (n+1)/2
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Median Position
            </h3>

            <p className="text-xs text-slate-400">
              Sort the five numbers in ascending order and extract the exact center (3rd) value.
            </p>

            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm space-y-2">
              <div className="text-slate-400 text-[11px]">
                Sorted Sequence: [{displayData.join(', ')}]
              </div>
              <div className="text-amber-300 text-base font-bold flex items-center gap-2">
                <span>Middle value = </span>
                <span className="text-white bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                  {displayMedian}
                </span>
              </div>
            </div>
          </div>

          {/* 3. MODE */}
          <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-teal-500/20 flex items-center justify-center font-mono">3</span>
                MODE
              </span>
              <span className="font-serif italic font-bold text-slate-300 text-sm">
                M<sub>o</sub> = argmax(frequency)
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Mode Frequency
            </h3>

            <p className="text-xs text-slate-400">
              The number that occurs most frequently in the sample.
            </p>

            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm space-y-2">
              <div className="text-slate-400 text-[11px]">
                {!isCustom 
                  ? '20 occurs 2 times (most frequent)' 
                  : currentResults?.modeType === 'none' 
                  ? 'All values appear only once (equal frequency)' 
                  : `${displayModeText} occurs with highest frequency`}
              </div>
              <div className="text-teal-300 text-base font-bold flex items-center gap-2">
                <span>Mode = </span>
                <span className="text-white bg-teal-500/20 px-2 py-0.5 rounded border border-teal-500/40">
                  {displayModeText}
                </span>
              </div>
            </div>
          </div>

          {/* 4. RANGE */}
          <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center font-mono">4</span>
                RANGE
              </span>
              <span className="font-serif italic font-bold text-slate-300 text-sm">
                R = Maximum − Minimum
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Range Spread
            </h3>

            <p className="text-xs text-slate-400">
              The statistical difference between the greatest and least values.
            </p>

            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm space-y-2">
              <div className="text-slate-400 text-[11px]">
                Maximum ({displayMax}) − Minimum ({displayMin})
              </div>
              <div className="text-amber-300 text-base font-bold flex items-center gap-2">
                <span>{displayMax} − {displayMin} = </span>
                <span className="text-white bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                  {displayRange}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Brief Auxiliary Cards (SUM, COUNT, MINIMUM, MAXIMUM) */}
        <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
            Fundamental Descriptive Quantities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300 block font-mono">SUM (Σx)</span>
              <p className="text-slate-400 text-[11px]">
                The arithmetic total of all five integers: <span className="font-mono text-white font-semibold">{displaySum}</span>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300 block font-mono">COUNT (n)</span>
              <p className="text-slate-400 text-[11px]">
                The fixed discrete sample size of the machine: <span className="font-mono text-white font-semibold">5 observations</span>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300 block font-mono">MINIMUM (min)</span>
              <p className="text-slate-400 text-[11px]">
                The lower boundary element in the sorted set: <span className="font-mono text-white font-semibold">{displayMin}</span>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300 block font-mono">MAXIMUM (max)</span>
              <p className="text-slate-400 text-[11px]">
                The upper boundary element in the sorted set: <span className="font-mono text-white font-semibold">{displayMax}</span>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
