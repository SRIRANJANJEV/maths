import React from 'react';
import { PRESET_DEMOS } from '../utils/statistics';
import { DemoDataset } from '../types/stats';
import { Play, Sparkles, Database, Check } from 'lucide-react';

interface DemoLabProps {
  currentValues: number[];
  onLoadDemo: (values: number[]) => void;
}

export const DemoLab: React.FC<DemoLabProps> = ({ currentValues, onLoadDemo }) => {
  return (
    <section id="demo" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Exhibition Demonstration Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            TRY A DATASET
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Select any predefined mathematical vector to evaluate multimodal conditions, zero-range states, and canonical distributions.
          </p>
        </div>

        {/* 6 Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRESET_DEMOS.map((demo: DemoDataset, idx: number) => {
            const isLoaded = 
              currentValues.length === 5 &&
              currentValues.every((val, i) => val === demo.values[i]);

            return (
              <div
                key={demo.id}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 border ${
                  isLoaded
                    ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  {/* Card Header & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      DEMO {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-blue-500/15 text-cyan-300 border border-blue-500/30">
                      {demo.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {demo.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {demo.description}
                  </p>

                  {/* Numerical Chips */}
                  <div className="flex items-center gap-1.5 mb-6">
                    {demo.values.map((v, i) => (
                      <span
                        key={i}
                        className="flex-1 py-1.5 text-center rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm font-bold text-cyan-300"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LOAD DEMO Button */}
                <button
                  onClick={() => onLoadDemo(demo.values)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isLoaded
                      ? 'bg-emerald-600 text-white shadow-emerald-900/30'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-900/30'
                  }`}
                >
                  {isLoaded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>CURRENTLY LOADED</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>LOAD DEMO</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Informative Footer Banner */}
        <div className="mt-10 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Instantaneous client execution — no network requests or external latency.</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Validated against Class 9 Statistics Syllabus
          </span>
        </div>

      </div>
    </section>
  );
};
