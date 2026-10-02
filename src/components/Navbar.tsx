import React, { useState, useEffect } from 'react';
import { Menu, X, BarChart3, Calculator, Award } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ANALYSIS', href: '#analysis' },
    { label: 'RESULTS', href: '#results' },
    { label: 'STATISTICS', href: '#statistics' },
    { label: 'DEMO', href: '#demo' },
    { label: 'WORKFLOW', href: '#workflow' },
    { label: 'PROJECT', href: '#project' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800'
          : 'bg-slate-900/70 backdrop-blur-sm border-b border-slate-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Project Identity */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold tracking-wider text-sm sm:text-base">
                  DATA ANALYSIS MACHINE
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Class 9
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block truncate">
                John Britto Matric Hr Sec School
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-blue-600/25 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Header Action Badge / Exhibition Flag */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium text-slate-200">Maths Exhibition</span>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <div className="pb-3 mb-2 border-b border-slate-800">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Sarvika M S • John Britto MHSS
            </p>
            <p className="text-[11px] text-slate-400">Class 9 Mathematics Exhibition</p>
          </div>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 bg-blue-600/30 border border-cyan-500/40'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
