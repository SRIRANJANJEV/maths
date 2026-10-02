/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DataAnalysis } from './components/DataAnalysis';
import { StatisticalResults } from './components/StatisticalResults';
import { StatisticalEngine } from './components/StatisticalEngine';
import { DemoLab } from './components/DemoLab';
import { SystemWorkflow } from './components/SystemWorkflow';
import { FullStackStructure } from './components/FullStackStructure';
import { ProjectInformation } from './components/ProjectInformation';
import { Footer } from './components/Footer';

import { calculateStatistics } from './utils/statistics';
import { StatisticsResult } from './types/stats';

export default function App() {
  // Pre-seed with the Canonical Exhibition Benchmark: [10, 20, 20, 30, 40]
  const [values, setValues] = useState<number[]>([10, 20, 20, 30, 40]);
  const [results, setResults] = useState<StatisticsResult | null>(() => {
    try {
      return calculateStatistics([10, 20, 20, 30, 40]);
    } catch {
      return null;
    }
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'analysis', 'results', 'statistics', 'demo', 'workflow', 'project'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const secElement = document.getElementById(sections[i]);
        if (secElement && secElement.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleCalculate = (dataToCalculate: number[]) => {
    if (dataToCalculate.length === 5) {
      try {
        const res = calculateStatistics(dataToCalculate);
        setResults(res);
        setValues(dataToCalculate);

        // Smooth scroll to results
        setTimeout(() => {
          const resultsElem = document.getElementById('results');
          if (resultsElem) {
            resultsElem.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (err) {
        console.error('Calculation error:', err);
      }
    }
  };

  const handleReset = () => {
    setValues([]);
    setResults(null);
  };

  const handleSetValues = (newValues: number[]) => {
    setValues(newValues);
    if (newValues.length === 5) {
      try {
        const res = calculateStatistics(newValues);
        setResults(res);
      } catch (err) {
        console.error('Error computing statistics on setValues:', err);
      }
    }
  };

  const handleLoadDemo = (demoValues: number[]) => {
    setValues(demoValues);
    try {
      const res = calculateStatistics(demoValues);
      setResults(res);

      // Smooth scroll to results
      setTimeout(() => {
        const resultsElem = document.getElementById('results');
        if (resultsElem) {
          resultsElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Error loading demo values:', err);
    }
  };

  const handleStartAnalysis = () => {
    const elem = document.getElementById('analysis');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTryDemo = () => {
    const elem = document.getElementById('demo');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* Fixed Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Exhibition Sections */}
      <main>
        {/* 1. HERO */}
        <Hero
          onStartAnalysis={handleStartAnalysis}
          onTryDemo={handleTryDemo}
        />

        {/* 2. DATA ANALYSIS */}
        <DataAnalysis
          values={values}
          onCalculate={handleCalculate}
          onReset={handleReset}
          onSetValues={handleSetValues}
        />

        {/* 3. STATISTICAL RESULTS */}
        <StatisticalResults results={results} />

        {/* 4. STATISTICAL ENGINE */}
        <StatisticalEngine currentResults={results} />

        {/* 5. DEMO LAB */}
        <DemoLab
          currentValues={values}
          onLoadDemo={handleLoadDemo}
        />

        {/* 6. SYSTEM WORKFLOW */}
        <SystemWorkflow />

        {/* 7. FULL-STACK STRUCTURE */}
        <FullStackStructure />

        {/* 8. PROJECT INFORMATION */}
        <ProjectInformation />
      </main>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
