/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Map, 
  ThumbsUp, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  Timer,
  Code,
  Compass,
  FileSpreadsheet,
  LineChart,
  UserCheck,
  CloudLightning,
  BookMarked
} from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  category: 'Intelligence' | 'Career' | 'Utility' | 'Community';
  description: string;
  detailedSpecs: string[];
  quarter: string;
  icon: any;
  color: string;
  progress: number;
}

export default function ComingSoonRoadmap() {
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('campuspilot_roadmap_votes');
      return saved ? JSON.parse(saved) : {
        'attendance': 42,
        'cgpa': 31,
        'placement': 89,
        'internship': 54,
        'faculty': 19,
        'cloud': 27,
        'coding': 73,
        'notes': 48,
        'contrib': 35
      };
    } catch {
      return {
        'attendance': 42,
        'cgpa': 31,
        'placement': 89,
        'internship': 54,
        'faculty': 19,
        'cloud': 27,
        'coding': 73,
        'notes': 48,
        'contrib': 35
      };
    }
  });

  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('campuspilot_has_voted');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('campuspilot_roadmap_votes', JSON.stringify(votes));
    } catch {}
  }, [votes]);

  useEffect(() => {
    try {
      localStorage.setItem('campuspilot_has_voted', JSON.stringify(hasVoted));
    } catch {}
  }, [hasVoted]);

  const handleVote = (id: string) => {
    if (hasVoted[id]) {
      // Retract vote
      setVotes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasVoted(prev => ({ ...prev, [id]: false }));
    } else {
      // Add vote
      setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasVoted(prev => ({ ...prev, [id]: true }));
    }
  };

  const roadmapItems: RoadmapItem[] = [
    {
      id: 'placement',
      title: 'Placement AI Copilot',
      category: 'Career',
      description: 'End-to-end recruitment preparation using targeted mock interview simulations, real-time resume scorecards, and custom-tailored company-specific aptitude trails.',
      detailedSpecs: [
        'Resume PDF Parser & ATS Score Optimizer',
        'Simulated Audio/Text AI Mock Placement Rounds',
        'Past Year TCS, Infosys, and Cognizant Exam Banks'
      ],
      quarter: 'Q3 2026',
      icon: Compass,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      progress: 65
    },
    {
      id: 'coding',
      title: 'Coding Corner (Sandbox)',
      category: 'Intelligence',
      description: 'Interactive browser-based compilation sandbox optimized for learning Data Structures & Algorithms. High-frequency compiler with real-time complexity analytics.',
      detailedSpecs: [
        'C++, Python, Java & JS Web Editor',
        'Optimal Complexity (Time/Space) Analysis & Insights',
        'Gamified DSA Challenges & Streak Rewards'
      ],
      quarter: 'Q3 2026',
      icon: Code,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      progress: 50
    },
    {
      id: 'attendance',
      title: 'AI Attendance Predictor',
      category: 'Utility',
      description: 'Intelligent RGPV 75% attendance matrix calculator. Recommends the optimal number of classes to safely skip or attend based on theoretical college schedules.',
      detailedSpecs: [
        'Dynamic "Safe-to-Skip" Session Analytics',
        'Proactive Local Notifications & Threshold Alerts',
        'AI Medical Certificate Generator Blueprint'
      ],
      quarter: 'Q4 2026',
      icon: LineChart,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      progress: 25
    },
    {
      id: 'cgpa',
      title: 'Smart CGPA Planner',
      category: 'Utility',
      description: 'Dynamic academic projection engine. Input target scores per semester and receive a custom study-hour roadmap tailored specifically to secure your target grade point.',
      detailedSpecs: [
        'Grade Booster Simulation Matrix',
        'SGPA to CGPA Back-Propagation Optimizer',
        'Weak-Subject Weightage Allocator'
      ],
      quarter: 'Q4 2026',
      icon: FileSpreadsheet,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      progress: 35
    },
    {
      id: 'internship',
      title: 'Internship Recommendation Matrix',
      category: 'Career',
      description: 'Gathers and screens off-campus and on-campus opportunities. Automatically cross-references postings against your student profile to score matching confidence.',
      detailedSpecs: [
        'Automated Scraping of verified junior openings',
        'Profile-to-Job Fit scoring powered by Gemini API',
        '1-Click Cold Email Draft Creator'
      ],
      quarter: 'Q1 2027',
      icon: Sparkles,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      progress: 10
    },
    {
      id: 'faculty',
      title: 'Faculty Insight Dashboard',
      category: 'Community',
      description: 'Anonymous verified student ratings and historical grading strictness charts for standard university examiners and college branch professors.',
      detailedSpecs: [
        'Strictness Indicator & Subjective Pass Rates',
        'Viva Style Profiles & Recurrent Inquiries',
        '100% Secure, Encrypted, and Anonymous Submissions'
      ],
      quarter: 'Q1 2027',
      icon: UserCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      progress: 15
    },
    {
      id: 'notes',
      title: 'Peer Notes Hub & Market',
      category: 'Community',
      description: 'Highly structured peer-contributed study summaries, lecture notes, and classroom diagrams. Integrates OCR text scanning to search handwritten files.',
      detailedSpecs: [
        'Handwritten PDF Search & AI Summarization Engine',
        'Classmate Upvote / Verification Trust Seals',
        'Download to Offline-First Mobile Viewer App'
      ],
      quarter: 'Q2 2027',
      icon: BookMarked,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      progress: 40
    },
    {
      id: 'cloud',
      title: 'Real-time Cloud Sync & Multi-User',
      category: 'Intelligence',
      description: 'Enables continuous live database synchronizations across devices, group study rooms, collaborative live whiteboards, and real-time chat with classmates.',
      detailedSpecs: [
        'State-of-the-art Firestore syncing loops',
        'Shared virtual exam practice boards',
        'Seamless desktop to mobile transitions'
      ],
      quarter: 'Q2 2027',
      icon: CloudLightning,
      color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20',
      progress: 5
    }
  ];

  return (
    <div className="space-y-6 text-slate-200">
      
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[9px] tracking-widest text-indigo-400 font-extrabold uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Future Vision Roadmap
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          </div>
          <h1 className="text-xl md:text-2xl font-sans font-black tracking-tight text-white">
            Engineering the Future of Academic Performance
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Rather than populating our application with unfinished modules, we believe in radical transparency and absolute stability. Discover our future pipeline of advanced intelligence tools and vote to help our engineering team prioritize what gets deployed next.
          </p>
        </div>

        {/* Dynamic mini banner stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800/60">
          <div className="space-y-0.5">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">Global Roadmap Upvotes</span>
            <span className="text-sm font-bold text-white font-mono">
              {Object.values(votes).reduce((a: number, b: number) => a + b, 0)} Combined
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">Core Pipeline Status</span>
            <span className="text-sm font-bold text-indigo-400 font-sans">3 Features Active in Dev</span>
          </div>
          <div className="space-y-0.5">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">Next Stable Deployment</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">August 15, 2026</span>
          </div>
          <div className="space-y-0.5">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">Hackathon Stage Scope</span>
            <span className="text-sm font-bold text-white font-sans">6 Modules 100% Production Ready</span>
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {roadmapItems.map((item) => {
          const IconComponent = item.icon;
          const userVoted = hasVoted[item.id] || false;
          const currentVoteCount = votes[item.id] || 0;

          return (
            <div 
              key={item.id}
              className="rounded-xl border border-slate-850 bg-slate-900/10 p-5 hover:border-slate-800 hover:bg-slate-900/20 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none transition-all group-hover:scale-125" />
              
              <div className="space-y-3.5 relative z-10">
                
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-lg border ${item.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-xs font-bold text-white leading-none mt-0.5">{item.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-slate-400 bg-slate-900/60 border border-slate-800/80 px-2 py-0.5 rounded-full">
                      <Calendar className="h-2.5 w-2.5 text-slate-500" />
                      {item.quarter}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Bullet Specifications */}
                <div className="space-y-1.5 pt-1.5 border-t border-slate-800/40">
                  <span className="text-[8.5px] font-bold text-indigo-400 uppercase tracking-widest block font-mono">Proposed Specifications:</span>
                  <div className="space-y-1 pl-1">
                    {item.detailedSpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5 text-[10.5px] text-slate-300">
                        <span className="text-indigo-500 mt-0.5">•</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Interactive Voting row */}
              <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-850 relative z-10">
                {/* Progress Mini bar */}
                <div className="flex-1 max-w-[130px] sm:max-w-[180px] space-y-1">
                  <div className="flex justify-between text-[8px] font-mono font-bold text-slate-500">
                    <span>DEVELOPMENT STAGE</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden border border-slate-850">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Thumbs up vote */}
                <button
                  type="button"
                  onClick={() => handleVote(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10.5px] font-bold transition-all active:scale-95 cursor-pointer select-none border ${
                    userVoted 
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 font-extrabold shadow-sm' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`h-3.5 w-3.5 transition-transform ${userVoted ? 'scale-110 fill-emerald-400/10' : 'group-hover:-translate-y-0.5'}`} />
                  <span>{userVoted ? 'Requested' : 'Request Feature'}</span>
                  <span className="font-mono bg-slate-950/40 text-[9.5px] px-1.5 py-0.25 rounded-md text-slate-400 border border-slate-850 font-bold ml-1">
                    {currentVoteCount}
                  </span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
