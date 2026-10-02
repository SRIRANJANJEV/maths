import React from 'react';
import { 
  User, 
  Keyboard, 
  ShieldCheck, 
  Cpu, 
  FileSpreadsheet, 
  LayoutDashboard, 
  Lightbulb, 
  ArrowDown, 
  ArrowRight,
  Workflow
} from 'lucide-react';

export const SystemWorkflow: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'USER',
      role: 'Interaction Actor',
      desc: 'Student, teacher, or exhibition visitor providing mathematical observations.',
      icon: User,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
    },
    {
      num: 2,
      title: 'DATA INPUT',
      role: 'Virtual Keypad / Buffer',
      desc: 'Captures numeric digits via on-screen touchscreen keypad or physical keystrokes.',
      icon: Keyboard,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    {
      num: 3,
      title: 'VALIDATION',
      role: 'Boundary & Integrity Gate',
      desc: 'Enforces constraints: exactly 5 integers, non-negative range strictly between 0 and 99.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
    },
    {
      num: 4,
      title: 'STATISTICAL ENGINE',
      role: 'Deterministic Computation',
      desc: 'Executes pure TypeScript algorithms for sorting, arithmetic mean, median rank, and mode frequencies.',
      icon: Cpu,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10',
    },
    {
      num: 5,
      title: 'RESULT GENERATION',
      role: 'Metrics Synthesizer',
      desc: 'Packages central tendencies (Mean, Median, Mode) and dispersion metrics (Sum, Min, Max, Range).',
      icon: FileSpreadsheet,
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    {
      num: 6,
      title: 'INTERACTIVE DASHBOARD',
      role: 'Visual Presentation Tier',
      desc: 'Renders dynamic SVG distribution chart, formatted metric cards, and sorted data vectors.',
      icon: LayoutDashboard,
      color: 'text-teal-400',
      border: 'border-teal-500/30',
      bg: 'bg-teal-500/10',
    },
    {
      num: 7,
      title: 'DATA INTERPRETATION',
      role: 'Educational Discovery',
      desc: 'Enables classroom learners to understand how datasets behave under varying conditions.',
      icon: Lightbulb,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <section id="workflow" className="py-20 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
            <Workflow className="w-3.5 h-3.5" />
            Execution Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            SYSTEM WORKFLOW
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            From initial user keypress to graphical data interpretation in 7 deterministic steps.
          </p>
        </div>

        {/* Step-by-Step Flow Cards */}
        <div className="relative">
          {/* Vertical Connecting Line on Mobile/Tablet */}
          <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-amber-400 hidden sm:block lg:hidden" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={step.num} className="relative flex flex-col items-center">
                  
                  {/* Card Container */}
                  <div className={`w-full rounded-2xl bg-slate-950/80 border ${step.border} p-5 flex flex-col justify-between shadow-xl relative z-10 hover:translate-y-[-2px] transition-transform`}>
                    
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-7 h-7 rounded-lg ${step.bg} ${step.color} font-mono font-bold text-xs flex items-center justify-center border border-current/30`}>
                        {step.num}
                      </span>
                      <IconComp className={`w-5 h-5 ${step.color}`} />
                    </div>

                    {/* Step Title & Role */}
                    <div className="space-y-1 mb-2">
                      <h3 className="font-extrabold text-white text-xs sm:text-sm tracking-wide">
                        {step.title}
                      </h3>
                      <p className={`text-[10px] uppercase font-bold tracking-wider ${step.color}`}>
                        {step.role}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>

                  </div>

                  {/* Desktop Connecting Arrow between steps */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-sm">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {/* Mobile Connecting Arrow */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden my-2 flex items-center justify-center text-slate-600">
                      <ArrowDown className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Summary Callout */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-200">
            Completely Self-Contained Execution Pipeline
          </p>
          <p>
            Zero external API calls • All steps occur in sub-millisecond local memory within the user’s web browser.
          </p>
        </div>

      </div>
    </section>
  );
};
