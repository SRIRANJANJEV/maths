import React from 'react';
import { StatisticsResult } from '../types/stats';
import { 
  BarChart, 
  Layers, 
  ArrowUpDown, 
  Hash, 
  PlusCircle, 
  Minimize2, 
  Maximize2, 
  Sliders, 
  TrendingUp,
  Award
} from 'lucide-react';

interface StatisticalResultsProps {
  results: StatisticsResult | null;
}

export const StatisticalResults: React.FC<StatisticalResultsProps> = ({ results }) => {
  if (!results) {
    return (
      <section id="results" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <BarChart className="w-12 h-12 text-slate-600 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-400">STATISTICAL RESULTS</h2>
            <p className="text-slate-500 max-w-md mx-auto text-sm">
              Please enter five values above and press <span className="text-cyan-400 font-semibold">CALCULATE</span>, or pick an exhibition benchmark from the <span className="text-cyan-400 font-semibold">DEMO LAB</span>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Calculate bar heights for SVG Bar Chart
  // Max possible value is 99 (or max in data if all small, min scale 40 so tiny bars don't collapse)
  const chartMax = Math.max(results.maximum, 10, 50);
  const chartHeight = 220;
  const chartWidth = 540;
  const barWidth = 52;
  const paddingX = 40;
  const availableWidth = chartWidth - paddingX * 2;
  const spacing = (availableWidth - 5 * barWidth) / 4;

  return (
    <section id="results" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800 relative">
      {/* Background glow behind centerpiece */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
            <TrendingUp className="w-3.5 h-3.5" />
            Mathematical Output Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            STATISTICAL RESULTS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Comprehensive breakdown of central tendencies and measures of dispersion.
          </p>
        </div>

        {/* Data Series Overview (Original vs Sorted) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          
          {/* Original Data Series */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                ORIGINAL DATA (Input Order)
              </span>
              <span className="text-[11px] font-mono text-slate-500">n = 5</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {results.originalData.map((val, idx) => (
                <div
                  key={`orig-${idx}`}
                  className="flex-1 min-w-[50px] p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center"
                >
                  <span className="text-[10px] text-slate-500 uppercase block mb-0.5 font-mono">
                    x<sub>{idx + 1}</sub>
                  </span>
                  <span className="text-lg font-bold font-mono text-cyan-300">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sorted Data Series */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
                SORTED DATA (Ascending Order)
              </span>
              <span className="text-[11px] font-mono text-cyan-400">Ranked 1st–5th</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {results.sortedData.map((val, idx) => {
                const isMedianSlot = idx === 2;
                return (
                  <div
                    key={`sort-${idx}`}
                    className={`flex-1 min-w-[50px] p-2.5 rounded-xl text-center border transition-all ${
                      isMedianSlot
                        ? 'bg-blue-950/70 border-cyan-400/80 shadow-md shadow-cyan-900/30 ring-1 ring-cyan-400/40'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <span className={`text-[10px] uppercase block mb-0.5 font-mono ${
                      isMedianSlot ? 'text-cyan-300 font-bold' : 'text-slate-500'
                    }`}>
                      {idx === 0 ? '1st (Min)' : idx === 4 ? '5th (Max)' : idx === 2 ? 'Median' : `${idx + 1}th`}
                    </span>
                    <span className={`text-lg font-bold font-mono ${
                      isMedianSlot ? 'text-amber-300' : 'text-slate-200'
                    }`}>
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Featured Prominent Trio Cards (MEAN, MEDIAN, MODE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: MEAN */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-blue-500/40 p-6 shadow-xl shadow-blue-950/40 group hover:border-blue-400 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
                MEASURE OF AVERAGE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                Formula: Σx / n
              </span>
            </div>
            
            <h3 className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-2">
              MEAN (x̄)
            </h3>
            
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {results.formattedMean}
              </span>
              {results.formattedMean !== results.mean.toString() && (
                <span className="text-xs font-mono text-slate-400">
                  ≈ {results.mean.toFixed(4)}
                </span>
              )}
            </div>

            <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Arithmetic Calculation:</span>
                <span className="font-mono text-cyan-300 font-bold">{results.sum} ÷ 5</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The balance point obtained by distributing the sum evenly across all 5 observations.
              </p>
            </div>
          </div>

          {/* Card 2: MEDIAN */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-cyan-500/40 p-6 shadow-xl shadow-cyan-950/40 group hover:border-cyan-400 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
                CENTRAL POSITION
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Position: 3rd Value
              </span>
            </div>

            <h3 className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-2">
              MEDIAN (M<sub>d</sub>)
            </h3>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl sm:text-5xl font-black font-mono text-amber-300 tracking-tight">
                {results.median}
              </span>
              <span className="text-xs font-mono text-slate-400">
                (middle rank)
              </span>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Rank Order Position:</span>
                <span className="font-mono text-amber-300 font-bold">Element 3 of 5</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The exact physical center value when data is sorted in ascending numerical order.
              </p>
            </div>
          </div>

          {/* Card 3: MODE */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-teal-500/40 p-6 shadow-xl shadow-teal-950/40 group hover:border-teal-400 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black tracking-widest text-teal-300 uppercase">
                HIGHEST FREQUENCY
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                results.modeType === 'none'
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : results.modeType === 'multiple'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
              }`}>
                {results.modeType === 'none' ? 'No Repeat' : results.modeType === 'multiple' ? 'Bimodal' : 'Unimodal'}
              </span>
            </div>

            <h3 className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-2">
              MODE (M<sub>o</sub>)
            </h3>

            <div className="flex items-baseline gap-2 mb-3">
              <span className={`text-3xl sm:text-5xl font-black font-mono tracking-tight ${
                results.modeType === 'none' ? 'text-slate-400 text-2xl sm:text-3xl' : 'text-teal-300'
              }`}>
                {results.modeDisplay}
              </span>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Distribution Status:</span>
                <span className="font-mono text-teal-300 font-bold">
                  {results.modeType === 'none' 
                    ? 'Uniform frequency (1×)' 
                    : results.modeType === 'multiple' 
                    ? 'Multiple recurring peaks'
                    : 'Single dominant peak'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The observation(s) that appear with the highest frequency in the dataset.
              </p>
            </div>
          </div>

        </div>

        {/* Secondary Metrics Cards Grid (SUM, COUNT, MINIMUM, MAXIMUM, RANGE) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-12">
          
          {/* SUM */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold uppercase mb-1">
              <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>SUM (Σx)</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              {results.sum}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Total aggregate
            </span>
          </div>

          {/* COUNT */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold uppercase mb-1">
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              <span>COUNT (n)</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              {results.count}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Sample size
            </span>
          </div>

          {/* MINIMUM */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold uppercase mb-1">
              <Minimize2 className="w-3.5 h-3.5 text-teal-400" />
              <span>MINIMUM</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-teal-300">
              {results.minimum}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Smallest value
            </span>
          </div>

          {/* MAXIMUM */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold uppercase mb-1">
              <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>MAXIMUM</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-300">
              {results.maximum}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Largest value
            </span>
          </div>

          {/* RANGE */}
          <div className="col-span-2 sm:col-span-1 bg-slate-900/80 rounded-xl border border-slate-800 p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold uppercase mb-1">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>RANGE (R)</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
              {results.range}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              {results.maximum} − {results.minimum}
            </span>
          </div>

        </div>

        {/* Responsive Bar Chart (Pure SVG) */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <BarChart className="w-5 h-5 text-cyan-400" />
                Comparative Bar Chart (5 Observations)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic visual representation with mean reference line overlay.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-gradient-to-t from-blue-600 to-cyan-400 inline-block" />
                <span>Slot Values</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-amber-400 border-b border-dashed inline-block" />
                <span className="text-amber-300 font-semibold">Mean ({results.formattedMean})</span>
              </div>
            </div>
          </div>

          {/* SVG Container */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[480px]">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-auto select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="barGradientStandard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                  <linearGradient id="barGradientMax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4338ca" />
                  </linearGradient>
                  <linearGradient id="barGradientMin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#0f766e" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Grid Lines & Values */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                  const yVal = Math.round(chartMax * ratio);
                  const yPos = 170 - ratio * 135;
                  return (
                    <g key={ratio}>
                      <line
                        x1={paddingX}
                        y1={yPos}
                        x2={chartWidth - paddingX}
                        y2={yPos}
                        stroke="#334155"
                        strokeDasharray={ratio === 0 ? '0' : '4 4'}
                        strokeWidth={ratio === 0 ? '1.5' : '1'}
                      />
                      <text
                        x={paddingX - 8}
                        y={yPos + 4}
                        textAnchor="end"
                        fill="#64748b"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {yVal}
                      </text>
                    </g>
                  );
                })}

                {/* Mean Reference Line */}
                {(() => {
                  const meanRatio = results.mean / chartMax;
                  const meanYPos = 170 - Math.min(Math.max(meanRatio, 0), 1) * 135;
                  return (
                    <g>
                      <line
                        x1={paddingX}
                        y1={meanYPos}
                        x2={chartWidth - paddingX}
                        y2={meanYPos}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="5 3"
                      />
                      <rect
                        x={chartWidth - paddingX - 70}
                        y={meanYPos - 18}
                        width="70"
                        height="16"
                        rx="4"
                        fill="#78350f"
                        opacity="0.9"
                      />
                      <text
                        x={chartWidth - paddingX - 35}
                        y={meanYPos - 6}
                        textAnchor="middle"
                        fill="#fef3c7"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        x̄ = {results.formattedMean}
                      </text>
                    </g>
                  );
                })()}

                {/* Bars for Each of the 5 values */}
                {results.originalData.map((val, idx) => {
                  const xPos = paddingX + idx * (barWidth + spacing);
                  const ratio = chartMax > 0 ? val / chartMax : 0;
                  const barH = Math.max(ratio * 135, val > 0 ? 6 : 2);
                  const yPos = 170 - barH;

                  const isMax = val === results.maximum && results.range > 0;
                  const isMin = val === results.minimum && results.range > 0;
                  const fillGrad = isMax
                    ? 'url(#barGradientMax)'
                    : isMin
                    ? 'url(#barGradientMin)'
                    : 'url(#barGradientStandard)';

                  return (
                    <g key={idx} className="transition-all duration-300">
                      {/* Bar Rectangle */}
                      <rect
                        x={xPos}
                        y={yPos}
                        width={barWidth}
                        height={barH}
                        rx="6"
                        fill={fillGrad}
                        className="hover:opacity-90 transition-opacity"
                      />

                      {/* Value Tag Above Bar */}
                      <rect
                        x={xPos + barWidth / 2 - 16}
                        y={yPos - 22}
                        width="32"
                        height="18"
                        rx="4"
                        fill="#0f172a"
                        stroke="#38bdf8"
                        strokeWidth="1"
                      />
                      <text
                        x={xPos + barWidth / 2}
                        y={yPos - 9}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {val}
                      </text>

                      {/* X-Axis Label */}
                      <text
                        x={xPos + barWidth / 2}
                        y={190}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="sans-serif"
                      >
                        Slot {idx + 1}
                      </text>
                      <text
                        x={xPos + barWidth / 2}
                        y={204}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        (x<sub>{idx + 1}</sub>)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <span>Chart dynamically scales to domain boundary [0–{chartMax}].</span>
            <span className="font-mono text-cyan-300">Sum = {results.sum} | Average = {results.formattedMean}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
