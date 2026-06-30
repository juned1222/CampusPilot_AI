/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FileCheck, Sparkles, AlertCircle, Printer, Eye, ChevronRight, HelpCircle, CheckSquare, RefreshCcw } from 'lucide-react';
import { SUBJECTS } from '../sampleData';

export default function MockGenerator() {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0].code);
  const [examType, setExamType] = useState('End-Sem');
  const [difficulty, setDifficulty] = useState('Medium');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [activePaper, setActivePaper] = useState<any | null>(null);
  const [showSolutions, setShowSolutions] = useState(false);

  // Simulated generator with RGPV schema
  const handleGeneratePaper = () => {
    setIsGenerating(true);
    setGenerationLogs([]);
    setActivePaper(null);

    const logSteps = [
      'Establishing standard RGPV examination guidelines...',
      'Mapping Unit core concepts index thresholds...',
      'Injecting theoretical and numerical balance variables...',
      'Synthesizing step-by-step schematic model solutions...',
      'Finalizing draft formatting parameters...'
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logSteps.length) {
        setGenerationLogs(prev => [...prev, logSteps[currentLogIdx]]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
        buildMockPaperContent();
      }
    }, 300);
  };

  const buildMockPaperContent = () => {
    const subData = SUBJECTS.find(s => s.code === selectedSubject) || SUBJECTS[0];
    
    let timeLimit = '3 Hours';
    let totalMarks = '70 Marks';
    let questions: { title: string; marks: number; partA: string; partB: string; solA: string; solB: string }[] = [];

    // Formulate questions based on subject selection
    if (selectedSubject === 'BT101') {
      questions = [
        {
          title: 'Unit I: Water Demineralization Methods',
          marks: 14,
          partA: 'Explain the principles, diagrammatic layout, and complete chemical processes of Ion-Exchange treatment for boilers feeding.',
          partB: 'A water sample analysis gave 12 ppm Mg(HCO3)2, 10 ppm CaSO4, and 15 ppm MgSO4. Find carbonate and non-carbonate hard components.',
          solA: 'Cation exchange involves passing water through acidic resin: R-H+ + Ca2+ -> R2-Ca + 2H+. Anion exchange substitutes hydroxide: R-OH- + Cl- -> R-Cl + OH-. Cations and anions neutralize completely, regenerating with HCl/NaOH.',
          solB: 'To compute CaCO3 equivalents: equivalents = ppm * [Chemical Equivalents of CaCO3 / Chemical equivalents of Salt]. equivalents = ppm * [50 / Eq. w of Salt]. Results: hardness Mg(HCO3)2 = 12 * (50/73) = 8.21 ppm; CaSO4 = 10 * (50/68) = 7.35 ppm; MgSO4 = 15 * (50/60) = 12.5 ppm. Summing gives temporary and permanent components.'
        },
        {
          title: 'Unit II: Boiler scale & Priming troubles',
          marks: 14,
          partA: 'Differentiate dynamically between scale and sludge in high pressure boiler assemblies. List three standard treatment solutions.',
          partB: 'What is caustic embrittlement? Show the chemical decomposition mechanism of raw Sodium Carbonate at high boiler pressures.',
          solA: 'Sludges are loose, soft, muddy precipitates (composed of MgCO3, MgCl2) that drop at cooler boiler points, removable by blow-down. Scales are hard, dense, sticking crusts (composed of CaSO4, Ca(OH)2) that insulate thermal transfer, causing boiler wall failures.',
          solB: 'At elevated steam velocities and temperatures, Na2CO3 decomposes: Na2CO3 + H2O -> 2NaOH + CO2. This alkaline solution flows into hairline structural cracks, attacking iron to form sodium ferroate, weakening joint structures.'
        }
      ];
    } else if (selectedSubject === 'BT104') {
      questions = [
        {
          title: 'Unit I: DC Electrical Network Theorems',
          marks: 14,
          partA: 'State and prove Superposition Theorem using a resistive bridge layout schematic.',
          partB: 'Find the Thevenin equivalent circuit voltage Vth and serial resistance Rth looking into a 10V circuit with dual parallel loops.',
          solA: 'Superposition dictates that in a linear bilateral network containing multiple sources, the overall branch current is the algebraic sum of individual currents computed by activating one isolated source at a time while replacing others with their internal resistance values.',
          solB: 'To solve: 1) Isolate load resistance open terminal. 2) Compute Vth across open terminals using loop/nodal equations. 3) To calculate Rth, short voltage sources, open current cells, and verify equivalent resistance back.'
        }
      ];
    } else {
      questions = [
        {
          title: 'Unit I: Core Concepts & Applications',
          marks: 14,
          partA: 'Formulate the mathematical governing equations representing performance optimizations for high complexity nodes.',
          partB: 'Draft the pseudo-code logic of standard implementations avoiding index boundaries issues.',
          solA: 'Derive starting from standard continuity, factoring in constraints, boundary limits, and physical resistance coefficients.',
          solB: 'pseudo-code details index safety guards: if (index < 0 || index >= size) throw OutOfBounds; traverse sequentially with pointer guards.'
        }
      ];
    }

    if (examType !== 'End-Sem') {
      timeLimit = '1.5 Hours';
      totalMarks = '20 Marks';
      // Truncate to first question for MST
      questions = [questions[0]];
      questions[0].marks = 20;
    }

    setActivePaper({
      subjectCode: selectedSubject,
      subjectName: subData.name,
      timeLimit,
      totalMarks,
      examType,
      difficulty,
      questions,
      academicSession: 'Session June-Dec 2026',
      paperNum: `CP-${selectedSubject}-${Math.floor(Math.random() * 9000 + 1000)}`
    });

    setIsGenerating(false);
    setShowSolutions(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-450 text-indigo-400">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans text-lg font-bold text-white">Mock Examination Paper Generator</h1>
              <p className="text-xs text-slate-400">
                Design realistic RGPV-styled practice tests with modular difficulty choices & automated model step solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs Selector Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-905 bg-slate-900/10 p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Subject Template</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none animate-none"
            >
              {SUBJECTS.map((s) => (
                <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Examination Schema</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="MST-I">MST-I (Unit 1 & 2 representation)</option>
              <option value="MST-II">MST-II (Unit 3 & 4 representation)</option>
              <option value="End-Sem">End-Sem (Grand 70-Marks Syllabus)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Difficulty Limits</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Easy">Standard Pass Threshold (Easy, 80% theory)</option>
              <option value="Medium">Standard RGPV Average (Medium, 30% math)</option>
              <option value="Hard">Topper Distinction Bracket (Hard, complex proofs)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGeneratePaper}
          disabled={isGenerating}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-650 hover:to-purple-650 p-2.5 text-xs font-bold text-white transition-all shadow active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? '🎛️ AI Synthesizing Examination Paper...' : '✨ Create Custom Mock Examination Paper'}
        </button>
      </div>

      {/* Generation logs feedback */}
      {isGenerating && (
        <div className="rounded-2xl border border-indigo-500/25 bg-slate-900/45 p-6 text-center space-y-4 shadow-xl max-w-md mx-auto">
          <div className="relative flex items-center justify-center h-12 w-12 mx-auto">
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-indigo-400 opacity-20"></span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 animate-spin border border-indigo-500/30">
              <RefreshCcw className="h-4 w-4" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-black text-indigo-400 uppercase tracking-widest animate-pulse">
              ANALYZING PYQs & CURRICULUM
            </h4>
            <p className="text-[10px] text-slate-500 font-sans">
              Thinking with Gemini to compose a balanced exam structure...
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-3 max-w-xs mx-auto space-y-1.5 text-left">
            {generationLogs.map((log, i) => (
              <p key={i} className="text-[10px] font-mono text-indigo-300 flex items-center gap-1.5">
                <span className="text-indigo-500 font-bold">❯</span>
                <span className="truncate">{log}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Standard Academic Question Sheet preview */}
      {activePaper && (
        <div className="space-y-6 animate-fade-in print:bg-white print:text-black">
          {/* Dashboard actions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/15 p-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div>
              <span className="font-mono text-[9px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded uppercase font-black">
                Exam Paper Standard Ready
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Practice answering with pen on paper. Enable Solutions below to verify mathematical derivations.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSolutions(prev => !prev)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-1.5 font-sans text-xs font-bold text-slate-200 hover:text-white transition-colors flex items-center"
              >
                <Eye className="mr-1.5 h-4 w-4 text-purple-400" />
                {showSolutions ? 'Hide Step Solutions' : 'Reveal Solutions'}
              </button>
              <button
                onClick={handlePrint}
                className="rounded-xl bg-slate-800 hover:bg-slate-705 px-3.5 py-1.5 font-sans text-xs font-bold text-slate-100 transition-all flex items-center"
              >
                <Printer className="mr-1.5 h-4 w-4 text-slate-400" /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* Real Sheet Container */}
          <div className="rounded-2xl border-4 border-double border-slate-800 bg-slate-950 p-6 sm:p-10 text-slate-200 relative print:border-black print:p-0">
            {/* RGPV Emblem Header */}
            <div className="text-center space-y-2 border-b border-dashed border-slate-800 pb-6 print:border-black">
              <h2 className="font-sans text-sm font-extrabold text-white tracking-widest uppercase">
                Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal (RGPV)
              </h2>
              <p className="font-mono text-[10.5px] text-slate-400 uppercase">
                {activePaper.examType} Examination Template · {activePaper.academicSession}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] font-mono text-slate-500 pt-1.5">
                <span>Code: <strong className="text-slate-300">{activePaper.subjectCode}</strong></span>
                <span>Time: <strong className="text-slate-300">{activePaper.timeLimit}</strong></span>
                <span>Max Marks: <strong className="text-slate-300">{activePaper.totalMarks}</strong></span>
                <span>Difficulty: <strong className="text-slate-300">{activePaper.difficulty}</strong></span>
              </div>
            </div>

            {/* Guidelines */}
            <div className="my-5 rounded-lg border border-slate-900 bg-slate-900/10 p-3 text-[11px] leading-relaxed text-slate-400 italic">
              <span className="font-bold font-mono text-[10px] text-slate-300 uppercase not-italic block mb-1">
                Instructions to Candidates:
              </span>
              1. All parts of a question must be written sequentially in close blocks.<br />
              2. Assume neat schematic diagrams, chemical flowsheets, or circuits where appropriate.<br />
              3. Solve Part A or Part B for each corresponding unit. All calculations carry step marks.
            </div>

            {/* Questions list */}
            <div className="space-y-6 pt-2">
              {activePaper.questions.map((q: any, idx: number) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1 print:border-black">
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">{q.title}</h4>
                    <span className="font-mono text-[11px] text-indigo-400 font-extrabold">[{q.marks} Marks]</span>
                  </div>

                  {/* Sub parts */}
                  <div className="space-y-4 text-xs leading-relaxed pl-2">
                    <div>
                      <span className="font-bold text-indigo-300 block mb-1">Part A:</span>
                      <p className="text-slate-100 font-medium">{q.partA}</p>
                      
                      {showSolutions && (
                        <div className="mt-2.5 rounded-xl border border-slate-850 bg-slate-900/20 p-3 text-[11.5px] text-slate-400 animate-fade-in leading-normal shadow-inner">
                          <strong className="text-emerald-400 block mb-1 font-mono text-[10px] uppercase">RGPV Step-marking Model Answer:</strong>
                          {q.solA}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="font-bold text-indigo-300 block mb-1">Part B:</span>
                      <p className="text-slate-100 font-medium">{q.partB}</p>
                      
                      {showSolutions && (
                        <div className="mt-2.5 rounded-xl border border-slate-850 bg-slate-900/20 p-3 text-[11.5px] text-slate-400 animate-fade-in leading-normal shadow-inner">
                          <strong className="text-emerald-400 block mb-1 font-mono text-[10px] uppercase">RGPV Step-marking Model Answer:</strong>
                          {q.solB}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic stamp margin */}
            <div className="mt-10 border-t border-slate-900 pt-5 text-center text-[10px] font-mono text-slate-500 uppercase">
              End of standard exam blueprint CP-RGPV · CampusPilot AI Security ID: {activePaper.paperNum}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
