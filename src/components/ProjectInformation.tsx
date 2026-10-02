import React from 'react';
import { 
  GraduationCap, 
  User, 
  School, 
  MapPin, 
  Cpu, 
  Code, 
  GitBranch, 
  Cloud, 
  Target,
  Award,
  BookOpen
} from 'lucide-react';

export const ProjectInformation: React.FC = () => {
  const metadata = [
    {
      label: 'PROJECT',
      value: 'Data Analysis Machine',
      sub: 'Mathematics Exhibition System',
      icon: Award,
      color: 'text-blue-400',
    },
    {
      label: 'STUDENT',
      value: 'Sarvika M S',
      sub: 'Class 9 Investigator & Developer',
      icon: User,
      color: 'text-cyan-400',
    },
    {
      label: 'SCHOOL',
      value: 'John Britto Matric Hr Sec School',
      sub: 'Secondary Mathematics Department',
      icon: School,
      color: 'text-teal-400',
    },
    {
      label: 'LOCATION',
      value: 'Kamalapuram',
      sub: 'Tamil Nadu, India',
      icon: MapPin,
      color: 'text-amber-400',
    },
    {
      label: 'TYPE',
      value: 'Interactive Statistics & Data Analysis System',
      sub: 'Pure Browser Client Application',
      icon: Cpu,
      color: 'text-indigo-400',
    },
    {
      label: 'TECHNOLOGY',
      value: 'React • TypeScript • Vite • Tailwind CSS',
      sub: 'Modern Component-Driven Web Stack',
      icon: Code,
      color: 'text-purple-400',
    },
    {
      label: 'SOURCE CONTROL',
      value: 'GitHub',
      sub: 'Git Version Control & Repository',
      icon: GitBranch,
      color: 'text-emerald-400',
    },
    {
      label: 'DEPLOYMENT',
      value: 'Vercel',
      sub: 'Global Edge Network Hosting',
      icon: Cloud,
      color: 'text-sky-400',
    },
  ];

  return (
    <section id="project" className="py-20 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Documentation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            PROJECT INFORMATION
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Official project records submitted for the Class 9 Mathematics Exhibition.
          </p>
        </div>

        {/* Objective Highlight Card */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2.5 text-cyan-400 mb-3 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>PROJECT OBJECTIVE</span>
          </div>
          <blockquote className="text-base sm:text-xl font-medium text-slate-100 italic leading-relaxed border-l-4 border-cyan-400 pl-4 py-1">
            &ldquo;To provide an interactive way to enter numerical data, perform statistical calculations, and understand the mathematics behind the results.&rdquo;
          </blockquote>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            By shifting from abstract rote formulas to real-time interactive manipulation, the Data Analysis Machine allows students and teachers to immediately observe the impact of outliers, repeated modes, and zero dispersion on central tendency metrics.
          </p>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metadata.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                      {item.label}
                    </span>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                    {item.value}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-3 pt-2 border-t border-slate-900">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Exhibition Presentation Note */}
        <div className="mt-10 rounded-xl bg-slate-950/50 border border-slate-800/80 p-4 text-center text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2 text-cyan-300 font-semibold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Exhibition Demonstration Note</span>
          </div>
          <span>
            Visitors to the exhibition board can scan the displayed QR code to run this application instantly on any modern mobile or tablet browser without installation.
          </span>
        </div>

      </div>
    </section>
  );
};
