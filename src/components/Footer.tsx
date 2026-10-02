import React from 'react';
import { BarChart3, Award, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-slate-900">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-wider">
                  DATA ANALYSIS MACHINE
                </h3>
                <p className="text-xs text-cyan-300 font-medium tracking-wide uppercase">
                  Interactive Statistics &amp; Data Analysis System
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Designed and developed for the Class 9 Mathematics Exhibition. Demonstrates pure client-side mathematical algorithms, descriptive statistics, and responsive data visualization.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-xs text-cyan-200">
              <Award className="w-4 h-4 text-amber-400" />
              <span>&ldquo;Built for Mathematics Exhibition&rdquo;</span>
            </div>
          </div>

          {/* Student & School Details */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 block text-[11px] mb-3">
              Exhibition Credentials
            </span>
            <div className="space-y-1">
              <p className="text-white font-bold text-sm">SARVIKA M S</p>
              <p className="text-slate-400">Class 9 Student &amp; Developer</p>
            </div>
            <div className="pt-2 space-y-0.5">
              <p className="text-slate-200 font-medium">
                JOHN BRITTO MATRIC HR SEC SCHOOL, KAMALAPURAM
              </p>
              <p className="text-slate-500">Tamil Nadu, India</p>
            </div>
          </div>

          {/* Quick Jump & Back to Top */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-between h-full space-y-4">
            <span className="font-bold uppercase tracking-wider text-slate-400 block text-[11px]">
              Navigation
            </span>
            <div className="flex flex-col gap-1.5 text-xs text-slate-400 md:text-right">
              <a href="#analysis" className="hover:text-cyan-300 transition-colors">Data Analysis</a>
              <a href="#results" className="hover:text-cyan-300 transition-colors">Statistical Results</a>
              <a href="#statistics" className="hover:text-cyan-300 transition-colors">Math Engine</a>
              <a href="#demo" className="hover:text-cyan-300 transition-colors">Demo Lab</a>
              <a href="#project" className="hover:text-cyan-300 transition-colors">Project Info</a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Return to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Data Analysis Machine • Sarvika M S
          </p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Class 9 Mathematics Exhibition Project</span>
            <span>•</span>
            <span className="font-mono text-cyan-400">React + TypeScript</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
