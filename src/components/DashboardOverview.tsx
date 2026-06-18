/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, BrainCircuit, BookOpen, HelpCircle, FileCheck, Code, Sparkles, Award, ArrowUpRight, TrendingUp, Users, Download, Eye, FileText } from 'lucide-react';
import { SUBJECTS, INITIAL_LEADERBOARD, SAMPLE_NOTES } from '../sampleData';

interface DashboardOverviewProps {
  setCurrentTab: (tab: string) => void;
  setSelectedSubjectCode: (code: string) => void;
  setSelectedSubjectForViva: (code: string) => void;
  userPoints: number;
}

export default function DashboardOverview({
  setCurrentTab,
  setSelectedSubjectCode,
  setSelectedSubjectForViva,
  userPoints
}: DashboardOverviewProps) {
  
  // Custom features map
  const featurePromos = [
    {
      id: 'emergency',
      name: 'Exam Emergency',
      status: 'Emergency Active',
      desc: 'Enter subject hours & type to build instant high-intensity 3-day priorities.',
      icon: Flame,
      color: 'from-orange-500 to-red-500 shadow-red-500/10 text-red-400',
    },
    {
      id: 'pyq',
      name: 'PYQ Intelligence',
      status: 'Analytical',
      desc: 'Visualize repeated patterns, trends, and expected hot questions with confidence scores.',
      icon: BrainCircuit,
      color: 'from-indigo-500 to-purple-500 shadow-indigo-500/10 text-indigo-400',
    },
    {
      id: 'notes',
      name: 'Community Notes Hub',
      status: 'Collaborative',
      desc: 'Extract automated card collections, dynamic revision sheets & summary sheets.',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-500 shadow-emerald-500/10 text-emerald-400',
    },
    {
      id: 'viva',
      name: 'Viva Prep Center',
      status: 'Expert-Level',
      desc: 'Prepare for unexpected external questions and simulate interactive mock interviews.',
      icon: HelpCircle,
      color: 'from-purple-500 to-pink-500 shadow-pink-500/10 text-pink-400',
    },
    {
      id: 'mock',
      name: 'Mock Generator',
      status: 'Custom Testing',
      desc: 'Design fully formatted RGPV practice papers with absolute schematic accuracy.',
      icon: FileCheck,
      color: 'from-blue-500 to-cyan-500 shadow-blue-500/10 text-blue-400',
    },
    {
      id: 'coding',
      name: 'Coding & Preparation',
      status: 'Career Focus',
      desc: 'C++, Python, complex Data Structures, web stacks & placement roadmaps.',
      icon: Code,
      color: 'from-yellow-500 to-amber-500 shadow-amber-500/10 text-amber-400',
    }
  ];

  const handleSubjectClick = (code: string) => {
    setSelectedSubjectCode(code);
    setSelectedSubjectForViva(code);
    setCurrentTab('pyq');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 shadow-2xl shadow-indigo-950/40 text-white">
        {/* Ambient decorative glass structures from the High Density theme */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex space-x-4 pointer-events-none">
          <div className="w-12 h-24 bg-white/10 rounded-full rotate-12 backdrop-blur-md border border-white/10"></div>
          <div className="w-12 h-32 bg-white/20 rounded-full rotate-12 backdrop-blur-md border border-white/20"></div>
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-2 py-1 rounded inline-flex items-center gap-1.5 text-white">
              <Sparkles className="h-3 w-3 fill-white/20" />
              Academic Intelligence Platform
            </span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
            Study Smarter,<br />Not Harder.
          </h1>
          <p className="text-indigo-100 text-sm max-w-lg leading-relaxed">
            CampusPilot AI transforms raw student contributions—previous year papers, handwritten summaries, and viva questions—into structured exam intelligence. Explore tailored predictions, interactive test structures, and smart roadmaps designed for absolute success.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('emergency')}
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-xs font-bold text-indigo-700 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Flame className="mr-2 h-4 w-4 text-orange-500 fill-orange-500/20" />
              Exam Emergency Mode
            </button>
            <button
              onClick={() => setCurrentTab('contribution')}
              className="inline-flex items-center rounded-full bg-indigo-500/30 border border-white/20 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-indigo-500/40 cursor-pointer"
            >
              Contribute & Gain Points
            </button>
          </div>
        </div>

        {/* Global Stats bar with High Density overlay styling */}
        <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-6 sm:grid-cols-4 bg-white/5 -mx-8 -mb-8 p-6 backdrop-blur-xs">
          <div>
            <span className="block text-xl font-black text-white sm:text-2xl">4,850+</span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-indigo-200">PYQs Contributed</span>
          </div>
          <div>
            <span className="block text-xl font-black text-white sm:text-2xl">1,240+</span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-indigo-200">Curated Notes & Scans</span>
          </div>
          <div>
            <span className="block text-xl font-black text-white sm:text-2xl">15,400+</span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-indigo-200">System Viva Drills</span>
          </div>
          <div>
            <span className="block text-xl font-black text-white sm:text-2xl">98.7%</span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-indigo-200">Prediction Confidence</span>
          </div>
        </div>
      </div>

      {/* Core Intelligence Modules */}
      <div>
        <h2 className="font-sans text-lg font-bold tracking-tight text-white mb-4">
          Core AI Intelligence Suites
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featurePromos.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setCurrentTab(feat.id)}
                className="group relative cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/10 p-5 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/30 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-xl bg-slate-900 p-2.5 shadow-inner ${feat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-900 px-2.5 py-0.5 font-mono text-[9px] text-slate-400 border border-slate-800 group-hover:border-slate-700">
                    {feat.status}
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-sm font-bold text-slate-200 group-hover:text-white transition-colors flex items-center">
                  {feat.name}
                  <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-slate-400 group-hover:text-white" />
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Split: Subjects List & Live Leaderboards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* RGPV Subject Catalog */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-lg font-bold tracking-tight text-white">
              RGPV Subject & Course Directory
            </h2>
            <span className="font-mono text-[10px] text-slate-400">Total {SUBJECTS.length} Subjects Loaded</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SUBJECTS.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleSubjectClick(sub.code)}
                className="group flex flex-col justify-between cursor-pointer rounded-xl border border-slate-800 bg-slate-900/10 p-4 transition-all duration-150 hover:border-indigo-500/40 hover:bg-slate-900/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 uppercase">
                      {sub.code}
                    </span>
                    <span className="font-sans text-[10px] font-semibold text-slate-400">
                      {sub.year}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-sans text-xs font-bold text-slate-200 group-hover:text-white">
                    {sub.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                    {sub.description}
                  </p>
                </div>
                <div className="mt-3 border-t border-slate-800/60 pt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center">
                    <FileText className="mr-1 h-3.5 w-3.5 text-slate-500" />
                    {sub.unitsCount} Units Analyzed
                  </span>
                  <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">
                    View Intelligence →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Community Leaderboard & Recent Activity */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-400" />
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                  Leaderboard Contributors
                </h2>
              </div>
              <span className="font-mono text-[9px] text-purple-400 bg-purple-500/5 px-1.5 py-0.5 rounded border border-purple-500/10 uppercase font-black">
                Top XP
              </span>
            </div>

            <div className="space-y-2">
              {INITIAL_LEADERBOARD.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between rounded-lg p-2.5 text-xs transition-colors ${
                    user.isCurrentUser
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                      user.rank === 1 ? 'bg-amber-500/20 text-amber-500' :
                      user.rank === 2 ? 'bg-slate-400/20 text-slate-300' :
                      user.rank === 3 ? 'bg-amber-700/20 text-amber-600' :
                      'text-slate-500'
                    }`}>
                      {user.rank}
                    </span>
                    <div>
                      <span className={`block font-semibold ${user.isCurrentUser ? 'text-indigo-300 font-bold' : 'text-slate-200'}`}>
                        {user.name}
                      </span>
                      <span className="block text-[9px] text-slate-400">
                        {user.contributions} uploads · {user.badgeCount} badges
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-slate-100">
                    {user.points} <span className="text-[9px] font-medium text-slate-400">XP</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI summary recommendation activity block */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                  Trending Updates
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {SAMPLE_NOTES.slice(0, 2).map((note) => (
                <div key={note.id} className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-indigo-400">{note.subjectCode}</span>
                    <span className="text-[9px] text-slate-400">{note.createdAt}</span>
                  </div>
                  <p className="mt-1 font-sans font-semibold text-slate-200 line-clamp-1 hover:text-indigo-400 cursor-pointer" onClick={() => setCurrentTab('notes')}>
                    {note.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400 leading-normal line-clamp-2">
                    {note.aiSummary}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                    <span className="flex items-center">
                      <Download className="mr-0.5 h-3 w-3 text-emerald-400" />
                      {note.downloads} downloads
                    </span>
                    <span className="flex items-center text-rose-400">
                      ♥ {note.likes} Likes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
