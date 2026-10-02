import React from 'react';
import { 
  Code2, 
  Binary, 
  Cpu, 
  PieChart, 
  Cloud, 
  GitBranch, 
  ArrowDown, 
  CheckCircle2,
  Layers
} from 'lucide-react';

export const FullStackStructure: React.FC = () => {
  const stackLayers = [
    {
      layer: 'FRONTEND',
      tech: 'React / TypeScript',
      desc: 'Single-page responsive user interface with component-driven architecture, modular state management, and real-time DOM hydration via Vite.',
      icon: Code2,
      color: 'text-blue-400',
      tag: 'UI & Presentation',
    },
    {
      layer: 'APPLICATION LOGIC',
      tech: 'Input + Validation',
      desc: 'Integer bounds verification (0–99), exact five-element buffer enforcement, keyboard event dispatching, and error mitigation.',
      icon: Binary,
      color: 'text-cyan-400',
      tag: 'Controller Layer',
    },
    {
      layer: 'STATISTICAL ENGINE',
      tech: 'Mathematical Algorithms',
      desc: 'Deterministic client-side mathematical routines executing arithmetic mean, ascending array ranking for median, and frequency mapping for mode.',
      icon: Cpu,
      color: 'text-teal-400',
      tag: 'Mathematical Core',
    },
    {
      layer: 'RESULT VISUALIZATION',
      tech: 'Interactive Dashboard',
      desc: 'Native SVG vector bar charts with mean threshold overlays, high-contrast metric indicator cards, and comparative data lists.',
      icon: PieChart,
      color: 'text-indigo-400',
      tag: 'Data Visualization',
    },
    {
      layer: 'VERCEL',
      tech: 'Deployment',
      desc: 'High-availability global edge hosting, continuous deployment directly from Git, fast static asset compression, and instant QR-accessible endpoints.',
      icon: Cloud,
      color: 'text-purple-400',
      tag: 'Production Delivery',
    },
  ];

  return (
    <section id="structure" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            Software Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            FULL-STACK STRUCTURE
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Technically accurate client-side software architecture built with zero backend bloat.
          </p>
        </div>

        {/* Stack Layers Flow */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {stackLayers.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={item.layer}>
                <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                          {item.layer}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                          {item.tech}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-950 text-slate-400 border border-slate-800 whitespace-nowrap">
                    {item.tag}
                  </span>
                </div>

                {/* Arrow Connector between levels */}
                {idx < stackLayers.length - 1 && (
                  <div className="flex justify-center text-cyan-400 py-0.5">
                    <ArrowDown className="w-5 h-5 opacity-75" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Companion Technology Card: GITHUB Source Control */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-cyan-500/30 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
                <GitBranch className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    GITHUB
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Source Control
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Version control, automated continuous deployment pipeline triggering Vercel preview environments and production releases.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Git Certified</span>
            </div>
          </div>
        </div>

        {/* Architecture Notice (No DB/Backend Claim) */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          * Strictly software-only architecture: Does not require external relational databases, microcontrollers, or cloud backend servers. All processing is executed synchronously on the client device.
        </div>

      </div>
    </section>
  );
};
