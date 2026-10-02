import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Sigma, Calculator, BarChart2 } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
  onTryDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onTryDemo }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Gradients & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/25 via-slate-950 to-slate-950 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Academic Titles & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Student & School Accreditation Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                SARVIKA M S
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-300 font-medium">
                JOHN BRITTO MATRIC HR SEC SCHOOL, KAMALAPURAM
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-widest text-blue-400 uppercase">
                Class 9 Mathematics Exhibition Project
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                DATA ANALYSIS <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  MACHINE
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium text-cyan-200/90 tracking-wide uppercase">
                INTERACTIVE STATISTICS & DATA ANALYSIS SYSTEM
              </p>
            </div>

            {/* Project Thesis Quote */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              &ldquo;Transform numerical data into meaningful statistical insights.&rdquo;
            </p>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto lg:mx-0">
              A pure browser-based mathematical computing machine designed for instantaneous calculation of central tendency, dispersion metrics, and dynamic distribution visualization.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartAnalysis}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>START ANALYSIS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTryDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm tracking-wide border border-slate-700/80 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>TRY DEMO</span>
              </button>
            </div>

            {/* Quick Math Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-serif italic font-bold text-cyan-400">x̄</span> Mean
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-serif italic font-bold text-cyan-400">M<sub>d</sub></span> Median
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-serif italic font-bold text-cyan-400">M<sub>o</sub></span> Mode
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-serif italic font-bold text-cyan-400">Σx</span> Sum
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-serif italic font-bold text-cyan-400">R</span> Range
              </span>
            </div>

          </div>

          {/* Right Column: Mathematical & Statistical Data Visualization (Software/Mathematical Only) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glowing Aura */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 blur-xl opacity-75" />

              {/* Main Visual Display Container */}
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-md space-y-5">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Statistical Distribution Model
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                    n = 5
                  </span>
                </div>

                {/* Mathematical Formula Preview */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px]">Primary Test Vector</span>
                    <p className="font-mono text-cyan-300 font-semibold tracking-wider">
                      [ 10, 20, 20, 30, 40 ]
                    </p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-slate-400 text-[11px]">Calculated Mean</span>
                    <p className="font-mono text-white font-bold">x̄ = 24.0</p>
                  </div>
                </div>

                {/* SVG Mathematical Curve & Discrete Bar Chart Graphic */}
                <div className="relative h-44 w-full bg-slate-950/90 rounded-xl p-3 border border-slate-800 flex items-center justify-center overflow-hidden">
                  {/* Subtle Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full stroke-slate-800/60" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="35" x2="100%" y2="35" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="100%" y2="75" strokeDasharray="3 3" />
                    <line x1="0" y1="115" x2="100%" y2="115" strokeDasharray="3 3" />
                    <line x1="0" y1="150" x2="100%" y2="150" strokeWidth="1" stroke="#334155" />
                  </svg>

                  {/* SVG Bars & Bell Curve Overlay */}
                  <svg className="relative w-full h-full" viewBox="0 0 320 160">
                    <defs>
                      <linearGradient id="heroBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <linearGradient id="heroCurveGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Bars for 10, 20, 20, 30, 40 */}
                    {/* Normalized to height 120 max */}
                    {/* 10 -> height 30 */}
                    <rect x="25" y="115" width="32" height="30" rx="4" fill="url(#heroBarGrad)" opacity="0.85" />
                    <text x="41" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">10</text>

                    {/* 20 -> height 60 */}
                    <rect x="85" y="85" width="32" height="60" rx="4" fill="url(#heroBarGrad)" opacity="0.9" />
                    <text x="101" y="78" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">20</text>

                    {/* 20 -> height 60 */}
                    <rect x="145" y="85" width="32" height="60" rx="4" fill="url(#heroBarGrad)" opacity="0.9" />
                    <text x="161" y="78" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">20</text>

                    {/* 30 -> height 90 */}
                    <rect x="205" y="55" width="32" height="90" rx="4" fill="url(#heroBarGrad)" opacity="0.85" />
                    <text x="221" y="48" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">30</text>

                    {/* 40 -> height 120 */}
                    <rect x="265" y="25" width="32" height="120" rx="4" fill="url(#heroBarGrad)" opacity="0.95" />
                    <text x="281" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">40</text>

                    {/* Mean Horizontal Reference Line (y for 24 = 145 - 72 = 73) */}
                    <line x1="15" y1="73" x2="305" y2="73" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                    <text x="300" y="69" textAnchor="end" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                      Mean: 24
                    </text>

                    {/* Mathematical Gaussian Curve */}
                    <path
                      d="M 15 145 Q 80 140 130 90 T 170 50 T 230 110 T 305 145"
                      fill="none"
                      stroke="url(#heroCurveGrad)"
                      strokeWidth="2"
                    />

                    {/* Data Points */}
                    <circle cx="41" cy="115" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                    <circle cx="101" cy="85" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                    <circle cx="161" cy="85" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                    <circle cx="221" cy="55" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                    <circle cx="281" cy="25" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Metric Summary Strip */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Median</span>
                    <span className="text-base font-bold text-white font-mono">20</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                    <span className="text-[10px] text-cyan-300 uppercase tracking-wider block">Mode</span>
                    <span className="text-base font-bold text-cyan-300 font-mono">20</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Range</span>
                    <span className="text-base font-bold text-white font-mono">30</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
