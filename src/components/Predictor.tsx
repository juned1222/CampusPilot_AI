/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Sparkles, HelpCircle, Award, CheckSquare, Target, BookCheck, RefreshCw } from 'lucide-react';
import { SUBJECTS } from '../sampleData';

export default function Predictor() {
  const [subjectCode, setSubjectCode] = useState('BT101');
  const [prepLevel, setPrepLevel] = useState('20'); // Percentage 
  const [daysLeft, setDaysLeft] = useState(3);

  const [isCaculating, setIsCalculating] = useState(false);
  const [prediction, setPrediction] = useState<any | null>(null);

  const activeSubject = useMemo(() => {
    return SUBJECTS.find(s => s.code === subjectCode) || SUBJECTS[0];
  }, [subjectCode]);

  const handlePredict = () => {
    setIsCalculating(true);
    setPrediction(null);

    setTimeout(() => {
      const parsedPrep = parseInt(prepLevel, 10);
      
      // Fun simulated algorithm calculating predicted score percentage
      let computedScore = Math.min(85, Math.floor(parsedPrep + (daysLeft * 8)));
      if (parsedPrep < 10 && daysLeft <= 1) {
        computedScore = 38; // Extreme boundary pass danger
      } else if (parsedPrep > 60) {
        computedScore = Math.min(98, computedScore + 10);
      }

      let zone = 'Danger';
      let fontColor = 'text-red-400';
      if (computedScore >= 75) {
        zone = 'Distinction Topper Bracket';
        fontColor = 'text-emerald-400';
      } else if (computedScore >= 50) {
        zone = 'Secure Pass/Good Score Bracket';
        fontColor = 'text-indigo-400';
      } else {
        zone = 'SOS Backup Needed';
        fontColor = 'text-rose-400';
      }

      // Dynamic strategies
      let passStrategy = [];
      let goodStrategy = [];
      let topperStrategy = [];

      if (subjectCode === 'BT101') {
        passStrategy = [
          'Spend next 4 hours exclusively on EDTA calculations and formulas.',
          'Memorize difference comparison table representing Scale vs Sludge boiler errors.'
        ];
        goodStrategy = [
          'Solve continuous demineralizers and lime soda step numericals.',
          'Learn polymer prepare loops for Bakelite and Nylon-6 preparations.'
        ];
        topperStrategy = [
          'Master ultimate coal calculation metrics (C, H, O, N proximate percentages values).',
          'Perfect design schematic representing Bomb calorimeters layout.'
        ];
      } else if (subjectCode === 'BT104') {
        passStrategy = [
          'State and write block statements for Superposition and Thevenin theories.',
          'Practice drawing transformer EMF vector layers.'
        ];
        goodStrategy = [
          'Learn conversion formulas for delta back to star loops.',
          'Review rectifiers ripple calculations and biased structures.'
        ];
        topperStrategy = [
          'Solve balanced three-phase delta impedances loops math under full workload.',
          'Perfect equivalent circuit transformers derivation graphs.'
        ];
      } else {
        passStrategy = [
          'Focus on First Unit simple concepts and definitions.',
          'Prepare simple high-weightage formulas.'
        ];
        goodStrategy = [
          'Read past 2 years MST and End-Sem papers.',
          'Review general procedural guidelines parameters.'
        ];
        topperStrategy = [
          'Master structural mathematical proofs of all units.',
          'Implement recursive pseudo-code scripts showing spatial bounds check.'
        ];
      }

      setPrediction({
        score: computedScore,
        zone,
        fontColor,
        passStrategy,
        goodStrategy,
        topperStrategy
      });
      setIsCalculating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-indigo-500/15 bg-slate-900/30 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-455 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans text-lg font-bold text-white">AI Grade & Study Strategy Predictor</h1>
              <p className="text-xs text-slate-400">
                Input your current coverage and standard constraints to retrieve optimized strategies for passing, good, or perfect marks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="block text-[10.5px] font-mono text-slate-500 uppercase mb-2">Target Subject</label>
            <select
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-indigo-550 focus:outline-none"
            >
              {SUBJECTS.map((s) => (
                <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10.5px] font-mono text-slate-500 uppercase mb-2">
              Current Coverage: <strong className="text-white">{prepLevel}%</strong>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={prepLevel}
              onChange={(e) => setPrepLevel(e.target.value)}
              className="w-full accent-indigo-550 accent-indigo-500 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1 uppercase">
              <span>Rote Zero</span>
              <span>Mid Way</span>
              <span>Completely Prepped</span>
            </div>
          </div>

          <div>
            <label className="block text-[10.5px] font-mono text-slate-500 uppercase mb-2">
              Available prep days: <strong className="text-white">{daysLeft} Days</strong>
            </label>
            <select
              value={daysLeft}
              onChange={(e) => setDaysLeft(parseInt(e.target.value, 10))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-indigo-550 focus:outline-none"
            >
              <option value="1">1 Day Left (Extreme Crisis)</option>
              <option value="3">3 Days Left (Standard Prep)</option>
              <option value="5">5 Days Left (Secure Timeline)</option>
              <option value="10">10 Days Left (Safe Phase)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={isCaculating}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-650 hover:to-purple-650 p-2.5 text-xs font-bold text-white transition-all shadow active:scale-95 disabled:opacity-55"
        >
          {isCaculating ? '🔮 Calculating scoring boundaries matrices...' : 'Predict Recommended Grade & Strategies'}
        </button>
      </div>

      {/* Loading */}
      {isCaculating && (
        <div className="rounded-2xl border border-slate-850 bg-slate-950 p-8 text-center space-y-3">
          <div className="h-6 w-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <h4 className="font-sans text-xs text-slate-300 font-bold">Computing pass boundary thresholds...</h4>
        </div>
      )}

      {/* Active prediction output */}
      {prediction && (
        <div className="space-y-6 animate-fade-in text-xs">
          {/* Dial block */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">AI Predicted Grade Outline</span>
              <h3 className="font-sans text-lg font-bold text-white">Projected Exam Score Range</h3>
              <p className="font-sans text-slate-400 leading-normal max-w-sm">
                Based on target subject difficulty models, current syllabus coverage statistics ({prepLevel}%), and active hours left.
              </p>
            </div>

            <div className="flex items-center space-x-4 bg-slate-950 p-4 border border-slate-850 rounded-2xl shrink-0 self-center">
              <div className="text-center">
                <span className={`block font-sans text-3xl font-black ${prediction.fontColor}`}>
                  {prediction.score}%
                </span>
                <span className="block font-mono text-[9px] text-slate-500 uppercase mt-0.5">Predicted Score</span>
              </div>
              <div className="border-l border-slate-800 pl-4 space-y-1 text-[11px] font-sans">
                <span className="text-slate-400 block">Scoring Bracket Level:</span>
                <span className={`font-bold block uppercase border border-slate-800 bg-slate-900/40 px-2 py-0.5 rounded ${prediction.fontColor}`}>
                  {prediction.zone}
                </span>
              </div>
            </div>
          </div>

          {/* Three Strategies Column Row */}
          <div className="grid gap-5 md:grid-cols-3">
            {/* Strategy Column 1: PASS */}
            <div className="rounded-2xl border border-slate-805 bg-slate-900/10 p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-rose-500/10 pb-2 mb-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
                  <Target className="h-3 w-3" />
                </div>
                <h4 className="font-sans text-xs font-bold text-slate-200">PASS STRATEGY (SOS Threshold)</h4>
              </div>
              <div className="space-y-2.5">
                {prediction.passStrategy.map((st: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <BookCheck className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 leading-relaxed text-[11.5px]">{st}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Column 2: GOOD SCORE */}
            <div className="rounded-2xl border border-slate-805 bg-slate-900/10 p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-indigo-500/10 pb-2 mb-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                  <Target className="h-3 w-3" />
                </div>
                <h4 className="font-sans text-xs font-bold text-slate-200">GOOD SCORE STRATEGY (60-75%)</h4>
              </div>
              <div className="space-y-2.5">
                {prediction.goodStrategy.map((st: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <BookCheck className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 leading-relaxed text-[11.5px]">{st}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Column 3: TOPPER */}
            <div className="rounded-2xl border border-slate-805 bg-slate-900/10 p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-amber-500/10 pb-2 mb-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-bold">
                  <Target className="h-3 w-3" />
                </div>
                <h4 className="font-sans text-xs font-bold text-slate-200">TOPPER DISTINCTION STRATEGY</h4>
              </div>
              <div className="space-y-2.5">
                {prediction.topperStrategy.map((st: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <BookCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 leading-relaxed text-[11.5px]">{st}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
