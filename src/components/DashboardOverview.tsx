/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Flame, 
  BrainCircuit, 
  BookOpen, 
  HelpCircle, 
  FileCheck, 
  Code, 
  Sparkles, 
  Award, 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  Download, 
  FileText, 
  Timer, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  ChevronRight, 
  BookOpenCheck,
  Zap,
  HelpCircle as QuestionIcon,
  MessageSquare
} from 'lucide-react';
import { SUBJECTS, INITIAL_LEADERBOARD, SAMPLE_NOTES, SAMPLE_VIVAQA } from '../sampleData';

interface DashboardOverviewProps {
  setCurrentTab: (tab: string) => void;
  setSelectedSubjectCode: (code: string) => void;
  setSelectedSubjectForViva: (code: string) => void;
  userPoints: number;
  isDemoModeEnabled?: boolean;
}

export default function DashboardOverview({
  setCurrentTab,
  setSelectedSubjectCode,
  setSelectedSubjectForViva,
  userPoints,
  isDemoModeEnabled = false
}: DashboardOverviewProps) {
  
  // Interactive Syllabus Tracker (Units 1-5 Progress) cached in localStorage
  const [subjectProgress, setSubjectProgress] = useState<Record<string, boolean[]>>(() => {
    try {
      const saved = localStorage.getItem('campuspilot_subject_progress_v2');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initialize 5 units per subject
    const initial: Record<string, boolean[]> = {};
    SUBJECTS.forEach(sub => {
      initial[sub.code] = Array(sub.unitsCount).fill(false);
    });
    return initial;
  });

  // Daily Quick Revision Drill trigger
  const [drillIndex, setDrillIndex] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_drill_index');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [showDrillAnswer, setShowDrillAnswer] = useState(false);

  const toggleUnit = (subjectCode: string, unitIndex: number) => {
    setSubjectProgress(prev => {
      const updated = { ...prev };
      if (!updated[subjectCode]) {
        updated[subjectCode] = Array(5).fill(false);
      }
      const subjectUnits = [...updated[subjectCode]];
      subjectUnits[unitIndex] = !subjectUnits[unitIndex];
      updated[subjectCode] = subjectUnits;
      
      try {
        localStorage.setItem('campuspilot_subject_progress_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const currentDrill = SAMPLE_VIVAQA[drillIndex % SAMPLE_VIVAQA.length];

  const handleNextDrill = () => {
    const nextIdx = drillIndex + 1;
    setDrillIndex(nextIdx);
    setShowDrillAnswer(false);
    try {
      localStorage.setItem('campuspilot_drill_index', String(nextIdx));
    } catch {}
  };

  // Calculated stats for progress
  const overallStats = (() => {
    let totalUnits = 0;
    let completedUnits = 0;
    SUBJECTS.forEach(sub => {
      totalUnits += sub.unitsCount;
      const progressList = subjectProgress[sub.code] || [];
      completedUnits += progressList.slice(0, sub.unitsCount).filter(Boolean).length;
    });
    return {
      percentage: totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 1050) / 10 : 0, 
      completedUnits,
      totalUnits
    };
  })();

  // Premium Launchpad map - 6 primary modules
  const featurePromos = [
    {
      id: 'chatbot',
      name: 'AI Doubt Solver',
      status: 'Live Core',
      desc: 'Ask complex queries, parse technical diagrams, and clarify syllabus concepts instantly.',
      icon: MessageSquare,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/10',
    },
    {
      id: 'pomodoro',
      name: 'AI Study Strategy',
      status: 'Recommended',
      desc: 'Design personalized preparation milestones and intervals for distraction-free sessions.',
      icon: Timer,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/10',
    },
    {
      id: 'pyq',
      name: 'PYQ Intelligence',
      status: 'Analytical',
      desc: 'Visualize repeated patterns, frequency logs, and expected hot exam questions.',
      icon: BrainCircuit,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/10',
    },
    {
      id: 'emergency',
      name: 'SOS Exam Blueprint',
      status: 'SOS Active',
      desc: 'Build instant high-intensity 3-day priorities for immediate exam cramming.',
      icon: Flame,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/10',
    },
    {
      id: 'viva',
      name: 'Viva Preparation',
      status: 'Oral Drills',
      desc: 'Practice unexpected external examiner questions in direct simulated drills.',
      icon: HelpCircle,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/10',
    },
    {
      id: 'mock',
      name: 'AI Mock Generator',
      status: 'Custom Exams',
      desc: 'Design fully formatted RGPV practice papers with absolute schematic accuracy.',
      icon: FileCheck,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/10',
    }
  ];

  const handleSubjectClick = (code: string) => {
    setSelectedSubjectCode(code);
    setSelectedSubjectForViva(code);
    setCurrentTab('pyq');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      
      {/* Strong Hero Section */}
      <div className="rounded-2xl border border-indigo-500/20 bg-slate-900/40 p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
        {/* Subtle glowing accent light */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-60 h-60 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-2xl">
            {/* Small premium USP badges */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[9px] font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 font-mono">
                ✦ AI POWERED
              </span>
              <span className="text-[9px] font-bold tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-mono">
                ✦ GEMINI INTEGRATED
              </span>
              <span className="text-[9px] font-bold tracking-widest text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 font-mono">
                ✦ EXAM FOCUSED
              </span>
              <span className="text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
                ✦ PERSONALIZED
              </span>
              <span className="text-[9px] font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-mono">
                ✦ ENGINEERING READY
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-white leading-tight">
              Know What to Study.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-450 to-indigo-300">Know When to Study.</span><br />
              Know How to Study.
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
              CampusPilot AI transforms scattered academic resources into one personalized AI-powered academic workflow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentTab('chatbot')}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-xs px-6 py-3.5 transition-all cursor-pointer shadow-lg shadow-indigo-950/40 active:scale-95"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Start AI Assistant</span>
            </button>
            <button
              onClick={() => setCurrentTab('pyq')}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 border border-slate-750 hover:bg-slate-800 text-slate-100 font-bold text-xs px-6 py-3.5 transition-all cursor-pointer active:scale-95"
            >
              <BrainCircuit className="h-4 w-4" />
              <span>Explore PYQ Intelligence</span>
            </button>
          </div>
        </div>

        {/* Global Micro-Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/60 text-center md:text-left">
          <div className="space-y-0.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Exam Countdown</p>
            <div className="flex items-center justify-center md:justify-start gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-bold text-white">48 Days Remaining</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Your Syllabus Coverage</p>
            <div className="flex items-center justify-center md:justify-start gap-1.5">
              <span className="text-xs font-bold text-indigo-400">{overallStats.completedUnits} of {overallStats.totalUnits} Units</span>
              <span className="text-[10px] text-slate-500">({Math.round(overallStats.percentage)}%)</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Academic Pool</p>
            <div className="flex items-center justify-center md:justify-start gap-1.5">
              <span className="text-xs font-bold text-white">4,850+ PYQs Listed</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Verified Answer Accuracy</p>
            <div className="flex items-center justify-center md:justify-start gap-1.5">
              <span className="text-xs font-bold text-emerald-400">98.7% Confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left Side: Interactive Progress Syllabus Checklist & Course Launcher */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section Head */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="font-sans text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                Syllabus Progress Tracker & Directory
              </h2>
              <p className="text-[11px] text-slate-500">Click subject standard codes to launch deep intelligence modules. Check off units as you study.</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-bold">
                {SUBJECTS.length} COURSES LOADED
              </span>
            </div>
          </div>

          {/* Subject Rows for Maximum Productivity & High Density */}
          <div className="space-y-3">
            {SUBJECTS.map((sub) => {
              const progressList = subjectProgress[sub.code] || Array(sub.unitsCount).fill(false);
              const completedCount = progressList.slice(0, sub.unitsCount).filter(Boolean).length;
              const percent = Math.round((completedCount / sub.unitsCount) * 100);

              return (
                <div 
                  key={sub.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/10 p-4 hover:border-slate-700 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    
                    {/* Course Title and Launch */}
                    <div className="space-y-1 max-w-sm">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleSubjectClick(sub.code)}
                          className="font-mono text-[10px] font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10 uppercase transition-all"
                        >
                          {sub.code}
                        </button>
                        <span className="font-sans text-[10px] text-slate-500">{sub.year}</span>
                      </div>
                      <h3 
                        onClick={() => handleSubjectClick(sub.code)}
                        className="font-sans text-xs font-bold text-slate-200 group-hover:text-white cursor-pointer transition-colors flex items-center"
                      >
                        {sub.name}
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-slate-400" />
                      </h3>
                      <p className="text-[11px] text-slate-400 leading-normal line-clamp-1">
                        {sub.description}
                      </p>
                    </div>

                    {/* Interactive Multi-Unit Checklist Grid */}
                    <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                      <div className="space-y-1 ">
                        <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wider text-right">Units Checked</p>
                        <div className="flex gap-1.5">
                          {Array.from({ length: sub.unitsCount }).map((_, idx) => {
                            const isCompleted = progressList[idx] || false;
                            return (
                              <button
                                key={idx}
                                onClick={() => toggleUnit(sub.code, idx)}
                                title={`Toggle Unit ${idx + 1}`}
                                className={`flex h-5 w-6 items-center justify-center rounded text-[9.5px] font-mono border transition-all active:scale-90 ${
                                  isCompleted 
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                    : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                U{idx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Coverage Progress Indicator */}
                      <div className="text-right pl-3 border-l border-slate-800">
                        <span className="block font-mono text-[11px] font-bold text-slate-100">
                          {percent}%
                        </span>
                        <span className="block text-[8.5px] font-semibold text-slate-500 uppercase tracking-tighter">
                          Prepared
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tools Command Center, Live Activity & Quick Revision Drill */}
        <div className="space-y-6">
          
          {/* Quick Revision Drill of the Day */}
          <div className="rounded-xl border border-slate-850 bg-slate-900/10 p-4 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 relative z-10">
              <div className="flex items-center space-x-2">
                <BrainCircuit className="h-4 w-4 text-indigo-400" />
                <h3 className="font-sans text-xs font-black uppercase tracking-wider text-white">
                  Insta-Drill of the Day
                </h3>
              </div>
              <button 
                onClick={handleNextDrill}
                className="font-mono text-[9px] text-indigo-400 hover:text-indigo-300 font-bold uppercase cursor-pointer"
              >
                Skip ✦
              </button>
            </div>

            <div className="space-y-3 relative z-10">
              <div>
                <span className="font-mono text-[9px] font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                  {currentDrill.subjectCode} · {currentDrill.difficulty}
                </span>
                <p className="mt-2 text-xs font-semibold text-slate-200 leading-normal">
                  "{currentDrill.question}"
                </p>
              </div>

              {showDrillAnswer ? (
                <div className="space-y-2 animate-fade-in p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/10 text-[11px] text-slate-300 leading-relaxed font-sans">
                  <p>{currentDrill.answer}</p>
                  <div className="border-t border-indigo-500/10 pt-2 mt-1.5 flex flex-col gap-1 text-[9.5px]">
                    <span className="text-indigo-400 font-bold">💡 Examiner Warning:</span>
                    <span className="text-slate-400 italic">"{currentDrill.examinerInsight}"</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDrillAnswer(true)}
                  className="w-full py-2 bg-slate-800/80 hover:bg-indigo-650 active:bg-indigo-700 text-white hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  Reveal Standard Explanation
                </button>
              )}

              {showDrillAnswer && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedSubjectForViva(currentDrill.subjectCode);
                      setCurrentTab('viva');
                    }}
                    className="flex-1 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition-all text-center"
                  >
                    Simulate full Viva →
                  </button>
                  <button
                    onClick={handleNextDrill}
                    className="px-3 py-1.5 bg-indigo-600/25 hover:bg-indigo-600 text-white text-[10px] font-bold rounded-lg transition-all"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* High-Density Command Launchpad */}
          <div className="rounded-xl border border-slate-850 p-4 bg-slate-900/10">
            <h3 className="font-sans text-xs font-black uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-800/60 pb-2 flex items-center justify-between">
              <span>Quick Tools Launchpad</span>
              <span className="text-[9px] text-indigo-400 uppercase font-mono font-bold">1-Click Jump</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {featurePromos.map((feat) => {
                const Icon = feat.icon;
                return (
                  <button
                    key={feat.id}
                    onClick={() => setCurrentTab(feat.id)}
                    className="flex flex-col items-start rounded-lg border border-slate-850 bg-slate-950 px-3 py-2.5 text-left transition-all duration-150 hover:border-slate-700 hover:bg-slate-900/40 group active:scale-[0.98] cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`p-1.5 rounded-lg border ${feat.color}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 group-hover:text-indigo-400 transition-colors uppercase font-bold">
                        {feat.status}
                      </span>
                    </div>
                    <span className="mt-2 text-[11px] font-bold text-slate-200 group-hover:text-white truncate w-full">
                      {feat.name}
                    </span>
                    <span className="text-[9px] text-slate-500 line-clamp-1 mt-0.5 leading-tight group-hover:text-slate-400">
                      {feat.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intelligent Recommendation Card */}
          <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-b from-slate-900 to-indigo-950/10 p-5 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-4">
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] text-indigo-400 font-extrabold uppercase bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 w-fit">
                  RECOMMENDED BY AI
                </span>
                <h3 className="text-xs font-sans font-black tracking-wider text-white uppercase mt-1">
                  TODAY'S STUDY ACTION
                </h3>
              </div>
              <span className="relative flex h-2 w-2 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-400 leading-none">
                    {(() => {
                      const currentHour = new Date().getHours();
                      const greeting = currentHour < 12 ? "Good Morning" : currentHour < 17 ? "Good Afternoon" : "Good Evening";
                      const userName = isDemoModeEnabled ? "Juned" : (() => {
                        try {
                          const saved = localStorage.getItem('campuspilot_user');
                          if (saved) return JSON.parse(saved).name.split(' ')[0];
                        } catch {}
                        return "Juned";
                      })();
                      return `${greeting}, ${userName}`;
                    })()} 👋
                  </span>
                  <span className="block text-[15px] font-black text-white leading-tight">
                    Today's Focus:<br />
                    <span className="text-indigo-400">BT101 Chemistry</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9.5px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/15 font-bold uppercase mt-1">
                    Exam in 5 Days
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-850 space-y-1">
                  <span className="block font-mono text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                    AI AGENT INSIGHT
                  </span>
                  <p className="text-[11px] text-indigo-300 font-sans font-medium">
                    "Complete Unit 2 Today to maximize your expected Zeolite calculations scoring."
                  </p>
                </div>
              </div>

              {/* Bottom Row: button + progress ring */}
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                <button
                  onClick={() => {
                    setSelectedSubjectCode('BT101');
                    setSelectedSubjectForViva('BT101');
                    setCurrentTab('pyq');
                  }}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer active:scale-95 shadow-md shadow-indigo-950/35"
                >
                  <span>Start Studying</span>
                  <span>→</span>
                </button>

                {/* Professional circular progress ring */}
                <div className="flex items-center gap-2 select-none">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle
                        cx="28"
                        cy="28"
                        r="22"
                        className="text-slate-800"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="22"
                        className="text-indigo-400 transition-all duration-1000 ease-out"
                        strokeWidth="4"
                        strokeDasharray={138.16}
                        strokeDashoffset={138.16 * (1 - 0.68)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-[10px] font-mono font-black text-white leading-none">68%</span>
                    </div>
                  </div>
                  <div className="space-y-px">
                    <span className="block text-[8px] font-mono text-slate-500 font-bold uppercase leading-none">Daily target</span>
                    <span className="block text-[10px] font-bold text-slate-300">U2 Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
