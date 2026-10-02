import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  Delete, 
  CornerDownLeft, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  XCircle,
  Hash
} from 'lucide-react';

interface DataAnalysisProps {
  values: number[];
  onCalculate: (values: number[]) => void;
  onReset: () => void;
  onSetValues: (values: number[]) => void;
}

export const DataAnalysis: React.FC<DataAnalysisProps> = ({
  values,
  onCalculate,
  onReset,
  onSetValues,
}) => {
  const [currentBuffer, setCurrentBuffer] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'info' | 'success' | 'warning' | 'error';
    text: string;
  }>({
    type: 'info',
    text: 'Use the virtual keypad or physical keyboard to enter numbers 0–99.',
  });

  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [quickInputText, setQuickInputText] = useState<string>('');

  // Synchronize active slot with values length
  useEffect(() => {
    setActiveSlotIndex(values.length);
  }, [values.length]);

  // Append digit to current buffer
  const handleDigitPress = useCallback((digit: string) => {
    if (values.length >= 5) {
      setStatusMessage({
        type: 'warning',
        text: 'All 5 slots are filled. Press CALCULATE or RESET to start over.',
      });
      return;
    }

    const nextBuffer = currentBuffer + digit;
    const parsed = parseInt(nextBuffer, 10);

    if (isNaN(parsed)) {
      return;
    }

    if (parsed > 99) {
      setStatusMessage({
        type: 'error',
        text: `Value "${nextBuffer}" exceeds maximum allowed value (0–99 only).`,
      });
      return;
    }

    // Prevent leading zeroes like '05' unless it's just '0'
    if (currentBuffer === '0' && digit === '0') {
      return;
    }
    if (currentBuffer === '0' && digit !== '0') {
      setCurrentBuffer(digit);
      return;
    }

    setCurrentBuffer(nextBuffer);
    setStatusMessage({
      type: 'info',
      text: `Drafting Slot ${values.length + 1}: ${nextBuffer}. Press ENT to confirm.`,
    });
  }, [currentBuffer, values.length]);

  // Confirm current number into the next empty slot
  const handleEnter = useCallback(() => {
    if (values.length >= 5) {
      setStatusMessage({
        type: 'warning',
        text: 'All 5 slots already filled. Click CALCULATE to view results.',
      });
      return;
    }

    if (currentBuffer.trim() === '') {
      setStatusMessage({
        type: 'warning',
        text: 'Please enter a number (0–99) before pressing ENT.',
      });
      return;
    }

    const num = parseInt(currentBuffer, 10);
    if (isNaN(num) || num < 0 || num > 99) {
      setStatusMessage({
        type: 'error',
        text: `Invalid value "${currentBuffer}". Only integers 0–99 are permitted.`,
      });
      return;
    }

    const updated = [...values, num];
    onSetValues(updated);
    setCurrentBuffer('');

    if (updated.length === 5) {
      setStatusMessage({
        type: 'success',
        text: 'All 5 values entered successfully! Press CALCULATE to process.',
      });
    } else {
      setStatusMessage({
        type: 'info',
        text: `Slot ${updated.length} recorded: ${num}. ${5 - updated.length} slot${5 - updated.length > 1 ? 's' : ''} remaining.`,
      });
    }
  }, [currentBuffer, values, onSetValues]);

  // Handle DEL
  const handleDelete = useCallback(() => {
    if (currentBuffer.length > 0) {
      const trimmed = currentBuffer.slice(0, -1);
      setCurrentBuffer(trimmed);
      setStatusMessage({
        type: 'info',
        text: trimmed.length > 0 ? `Current buffer: ${trimmed}` : 'Buffer cleared.',
      });
    } else if (values.length > 0) {
      const removedVal = values[values.length - 1];
      const updated = values.slice(0, -1);
      onSetValues(updated);
      setStatusMessage({
        type: 'info',
        text: `Removed value ${removedVal} from Slot ${values.length}.`,
      });
    } else {
      setStatusMessage({
        type: 'info',
        text: 'Nothing to delete. Enter a number between 0 and 99.',
      });
    }
  }, [currentBuffer, values, onSetValues]);

  // Handle CLR
  const handleClear = useCallback(() => {
    if (currentBuffer.length > 0) {
      setCurrentBuffer('');
      setStatusMessage({
        type: 'info',
        text: 'Current input buffer cleared.',
      });
    } else if (values.length > 0) {
      onReset();
      setStatusMessage({
        type: 'info',
        text: 'All entered slots reset. Ready for new input.',
      });
    }
  }, [currentBuffer, values.length, onReset]);

  // Handle CALCULATE
  const handleCalculatePress = useCallback(() => {
    // If user has 4 values and 1 typed in buffer, auto-commit
    if (values.length === 4 && currentBuffer.trim() !== '') {
      const num = parseInt(currentBuffer, 10);
      if (!isNaN(num) && num >= 0 && num <= 99) {
        const finalValues = [...values, num];
        onSetValues(finalValues);
        setCurrentBuffer('');
        onCalculate(finalValues);
        setStatusMessage({
          type: 'success',
          text: 'Calculation complete! Showing statistical results below.',
        });
        return;
      }
    }

    if (values.length < 5) {
      setStatusMessage({
        type: 'error',
        text: `Incomplete dataset: Exactly 5 values required (${values.length}/5 entered).`,
      });
      return;
    }

    onCalculate(values);
    setStatusMessage({
      type: 'success',
      text: 'Calculations updated successfully! Review results below.',
    });
  }, [currentBuffer, values, onSetValues, onCalculate]);

  // Remove a specific slot by index
  const handleRemoveSlot = (indexToRemove: number) => {
    const updated = values.filter((_, idx) => idx !== indexToRemove);
    onSetValues(updated);
    setCurrentBuffer('');
    setStatusMessage({
      type: 'info',
      text: `Slot ${indexToRemove + 1} cleared. Enter a replacement value.`,
    });
  };

  // Quick comma/space paste input helper for teachers
  const handleQuickPasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInputText.trim()) return;

    const parts = quickInputText
      .split(/[\s,]+/)
      .map((p) => p.trim())
      .filter((p) => p !== '');

    if (parts.length !== 5) {
      setStatusMessage({
        type: 'error',
        text: `Quick input expects exactly 5 numbers. You provided ${parts.length}.`,
      });
      return;
    }

    const parsed: number[] = [];
    for (const part of parts) {
      const n = Number(part);
      if (!Number.isInteger(n) || n < 0 || n > 99) {
        setStatusMessage({
          type: 'error',
          text: `"${part}" is not an integer between 0 and 99. Please check inputs.`,
        });
        return;
      }
      parsed.push(n);
    }

    onSetValues(parsed);
    setCurrentBuffer('');
    setQuickInputText('');
    onCalculate(parsed);
    setStatusMessage({
      type: 'success',
      text: `Loaded 5 values: [${parsed.join(', ')}]. Calculations ready!`,
    });
  };

  // Keyboard events listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in quickInput input box
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigitPress(e.key);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (values.length === 5 || (values.length === 4 && currentBuffer !== '')) {
          handleCalculatePress();
        } else {
          handleEnter();
        }
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigitPress, handleEnter, handleDelete, handleClear, handleCalculatePress, values.length, currentBuffer]);

  return (
    <section id="analysis" className="py-20 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Input Station
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ANALYZE YOUR DATA
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Enter exactly five integer values between 0 and 99.
          </p>
        </div>

        {/* Five Value Slots Section */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl mb-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Data Register
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">
                Click any slot to delete or adjust
              </span>
            </div>

            {/* Values Entered Counter */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                VALUES ENTERED:
              </span>
              <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded ${
                values.length === 5 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-blue-500/20 text-cyan-300 border border-blue-500/40'
              }`}>
                {values.length} / 5
              </span>
            </div>
          </div>

          {/* 5 Slots Grid */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-6">
            {[0, 1, 2, 3, 4].map((slotIdx) => {
              const isFilled = slotIdx < values.length;
              const isCurrentActive = slotIdx === values.length;
              const val = isFilled ? values[slotIdx] : null;

              return (
                <div
                  key={slotIdx}
                  onClick={() => {
                    if (isFilled) {
                      handleRemoveSlot(slotIdx);
                    }
                  }}
                  className={`relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl border transition-all duration-200 ${
                    isFilled
                      ? 'bg-gradient-to-b from-slate-800/90 to-slate-900 border-cyan-500/50 shadow-md shadow-cyan-950/50 hover:border-red-400/80 cursor-pointer group'
                      : isCurrentActive
                      ? 'bg-blue-950/30 border-cyan-400/70 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500/30'
                      : 'bg-slate-900/40 border-slate-800 border-dashed'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Slot {slotIdx + 1}
                  </span>

                  <div className="h-10 sm:h-12 flex items-center justify-center">
                    {isFilled ? (
                      <span className="text-xl sm:text-3xl font-black font-mono text-cyan-300 group-hover:hidden">
                        {val}
                      </span>
                    ) : isCurrentActive && currentBuffer ? (
                      <span className="text-xl sm:text-3xl font-black font-mono text-amber-300 animate-pulse">
                        {currentBuffer}
                      </span>
                    ) : (
                      <span className="text-lg sm:text-xl font-mono text-slate-600">
                        --
                      </span>
                    )}
                    {isFilled && (
                      <span className="hidden group-hover:flex items-center text-xs text-red-400 font-medium">
                        Remove
                      </span>
                    )}
                  </div>

                  {/* Indicator Dot */}
                  <div className="mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        isFilled
                          ? 'bg-cyan-400'
                          : isCurrentActive
                          ? 'bg-amber-400 animate-ping'
                          : 'bg-slate-700'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Typing Buffer Preview Banner */}
          <div className="flex items-center justify-between bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Current Input Buffer:</span>
              <span className="font-mono font-bold text-base text-amber-300 min-w-8">
                {currentBuffer !== '' ? currentBuffer : '—'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Valid range: 0 to 99 • Integers only
            </span>
          </div>

          {/* Inline Status Message */}
          <div
            className={`mt-4 rounded-xl p-3.5 flex items-center gap-3 border text-xs sm:text-sm transition-all ${
              statusMessage.type === 'error'
                ? 'bg-red-950/40 border-red-500/40 text-red-300'
                : statusMessage.type === 'warning'
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                : statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-blue-950/30 border-blue-500/30 text-cyan-200'
            }`}
          >
            {statusMessage.type === 'error' && <XCircle className="w-5 h-5 flex-shrink-0 text-red-400" />}
            {statusMessage.type === 'warning' && <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />}
            {statusMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />}
            {statusMessage.type === 'info' && <Info className="w-5 h-5 flex-shrink-0 text-cyan-400" />}
            <span className="font-medium">{statusMessage.text}</span>
          </div>

        </div>

        {/* Large Virtual Keypad Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Keypad Container (Columns 1-7) */}
          <div className="md:col-span-7 bg-slate-950/90 rounded-2xl border border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Virtual Keypad
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                [Touch &amp; Keyboard Enabled]
              </span>
            </div>

            {/* Layout as specified:
              ┌────┬────┬────┬─────┐
              │ 1  │ 2  │ 3  │ DEL │
              ├────┼────┼────┼─────┤
              │ 4  │ 5  │ 6  │ CLR │
              ├────┼────┼────┼─────┤
              │ 7  │ 8  │ 9  │ ENT │
              ├────┴────┼────┴─────┤
              │    0    │ CALCULATE│
              └─────────┴───────────┘
            */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {/* Row 1 */}
              <button
                onClick={() => handleDigitPress('1')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                1
              </button>
              <button
                onClick={() => handleDigitPress('2')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                2
              </button>
              <button
                onClick={() => handleDigitPress('3')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                3
              </button>
              <button
                onClick={handleDelete}
                className="h-14 sm:h-16 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 active:bg-rose-900 text-rose-300 font-semibold text-xs sm:text-sm border border-rose-800/50 shadow-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
                title="Delete last digit or last slot"
              >
                <Delete className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
                <span>DEL</span>
              </button>

              {/* Row 2 */}
              <button
                onClick={() => handleDigitPress('4')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                4
              </button>
              <button
                onClick={() => handleDigitPress('5')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                5
              </button>
              <button
                onClick={() => handleDigitPress('6')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                6
              </button>
              <button
                onClick={handleClear}
                className="h-14 sm:h-16 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 shadow-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
                title="Clear current input buffer or reset"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>CLR</span>
              </button>

              {/* Row 3 */}
              <button
                onClick={() => handleDigitPress('7')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                7
              </button>
              <button
                onClick={() => handleDigitPress('8')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                8
              </button>
              <button
                onClick={() => handleDigitPress('9')}
                className="h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                9
              </button>
              <button
                onClick={handleEnter}
                className="h-14 sm:h-16 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 active:bg-blue-700 text-cyan-200 font-semibold text-xs sm:text-sm border border-blue-600/50 shadow-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
                title="Enter number into active slot"
              >
                <CornerDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                <span>ENT</span>
              </button>

              {/* Row 4: 0 spanning 2 columns, CALCULATE spanning 2 columns */}
              <button
                onClick={() => handleDigitPress('0')}
                className="col-span-2 h-14 sm:h-16 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-mono font-bold text-xl sm:text-2xl border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                0
              </button>
              <button
                onClick={handleCalculatePress}
                className="col-span-2 h-14 sm:h-16 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:from-blue-700 active:to-cyan-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-cyan-400/30 shadow-lg shadow-cyan-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>CALCULATE</span>
              </button>
            </div>

            {/* Quick Controls Bar */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={onReset}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>RESET ALL</span>
              </button>

              <button
                onClick={handleClear}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>CLEAR CURRENT</span>
              </button>

              <button
                onClick={handleEnter}
                className="px-3 py-2 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-cyan-300 border border-blue-700/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
                <span>ENTER (ENT)</span>
              </button>
            </div>

          </div>

          {/* Quick Paste & Instructions Card (Columns 8-12) */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Direct Input Helper for Teachers / Judges */}
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3 text-cyan-300">
                <Hash className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Quick Text / Paste Input
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Exhibition judges and teachers can also type or paste 5 space or comma-separated numbers (0–99):
              </p>

              <form onSubmit={handleQuickPasteSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="e.g. 10, 20, 20, 30, 40"
                  value={quickInputText}
                  onChange={(e) => setQuickInputText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none font-mono text-sm text-white placeholder-slate-500 shadow-inner"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-slate-600/80 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
                >
                  Load 5 Values &amp; Calculate
                </button>
              </form>
            </div>

            {/* Input Constraints Card */}
            <div className="bg-slate-950/70 rounded-2xl border border-slate-800/80 p-5 text-xs space-y-2.5 text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-300 text-[11px] block">
                Exhibition Validation Rules:
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li><strong className="text-slate-300">Exact Sample Size:</strong> Strictly 5 numbers per dataset.</li>
                <li><strong className="text-slate-300">Domain Range:</strong> Non-negative integers from <span className="text-cyan-300 font-mono">0</span> to <span className="text-cyan-300 font-mono">99</span>.</li>
                <li><strong className="text-slate-300">No Sixth Value:</strong> Input buffer is locked once 5 values are entered.</li>
                <li><strong className="text-slate-300">Immediate Verification:</strong> Real-time rejection of out-of-bound inputs.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
