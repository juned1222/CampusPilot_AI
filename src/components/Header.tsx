/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles, Award, Flame, BrainCircuit, GraduationCap, LogOut, Sun, Moon } from 'lucide-react';
import { SUBJECTS, SAMPLE_VIVAQA, SAMPLE_PYQS } from '../sampleData';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setSelectedSubjectCode?: (code: string) => void;
  setSelectedSubjectForViva?: (code: string) => void;
  userPoints: number;
  userRank: number;
  user?: { name: string; email: string; phone?: string; avatar: string } | null;
  onLogout?: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  setSelectedSubjectCode,
  setSelectedSubjectForViva,
  userPoints,
  userRank,
  user = null,
  onLogout,
  theme,
  onToggleTheme
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [aiResult, setAiResult] = useState<{
    heading: string;
    explanation: string;
    status: string;
    actionLabel: string;
    actionTab: string;
    expectedQuestions: string[];
    isLive?: boolean;
  } | null>(null);

  // Search logic on standard DB
  const filteredSuggestions = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const results: { type: 'subject' | 'question' | 'plan'; label: string; sub: string; action: () => void }[] = [];

    // Match subjects
    SUBJECTS.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) {
        results.push({
          type: 'subject',
          label: `${s.code} - ${s.name}`,
          sub: 'Explore PYQs & Notes',
          action: () => {
            if (setSelectedSubjectCode) setSelectedSubjectCode(s.code);
            setCurrentTab('pyq');
          }
        });
      }
    });

    // Match viva or pyq queries
    SAMPLE_VIVAQA.forEach(vq => {
      if (vq.question.toLowerCase().includes(q) || vq.subjectCode.toLowerCase().includes(q)) {
        results.push({
          type: 'question',
          label: vq.question,
          sub: `${vq.subjectCode} Viva Question`,
          action: () => {
            if (setSelectedSubjectForViva) setSelectedSubjectForViva(vq.subjectCode);
            setCurrentTab('viva');
          }
        });
      }
    });

    // Match custom triggers
    if (q.includes('viva') || q.includes('optical') || q.includes('fiber')) {
      results.push({
        type: 'question',
        label: 'Generate Viva Questions for Optical Fiber (Physics)',
        sub: 'Launch Viva Centre for BT105 Physics',
        action: () => {
          if (setSelectedSubjectForViva) setSelectedSubjectForViva('BT105');
          setCurrentTab('viva');
        }
      });
    }

    if (q.includes('plan') || q.includes('3-day') || q.includes('chemistry')) {
      results.push({
        type: 'plan',
        label: 'Create 3-day plan for Engineering Chemistry',
        sub: 'Exam Emergency Assistant',
        action: () => {
          setCurrentTab('emergency');
        }
      });
    }

    return results.slice(0, 5);
  }, [searchQuery, setCurrentTab, setSelectedSubjectCode, setSelectedSubjectForViva]);

  const triggerSmartSearch = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsSearching(true);
    setShowResults(false);
    try {
      const response = await fetch('/api/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText })
      });
      if (response.ok) {
        const data = await response.json();
        setAiResult(data);
      }
    } catch (error) {
      console.error('Error querying smart search API:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSmartSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/30 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Branding Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('overview')}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-650 text-white">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-sans text-[15px] font-bold tracking-tight text-white">CampusPilot</span>
              <span className="rounded bg-indigo-600/20 px-1 py-0.5 font-mono text-[9px] font-bold text-indigo-400 uppercase">AI</span>
            </div>
            <p className="hidden text-[9px] text-slate-500 sm:block uppercase tracking-wider font-semibold">Academic Intelligence</p>
          </div>
        </div>

        {/* Global Smart Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden max-w-sm flex-1 px-4 md:block">
          <div className="relative">
            {isSearching ? (
              <BrainCircuit className="absolute top-2.5 left-3.5 h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            ) : (
              <Search className="absolute top-2.5 left-3.5 h-3.5 w-3.5 text-slate-500" />
            )}
            <input
              type="text"
              placeholder='Smart Search (e.g. "BT101", "3-day Chemistry")...'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-200 placeholder-slate-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setShowResults(false); }}
                className="absolute top-2 right-3 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* AI Thinking Overlay Loading Dropdown */}
          {isSearching && (
            <div className="absolute left-4 right-4 mt-2 rounded-xl border border-indigo-505/30 border-indigo-500/30 bg-slate-950 p-4 shadow-2xl z-50 text-center animate-pulse">
              <div className="flex justify-center items-center space-x-2 py-3">
                <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full" />
                <span className="text-xs font-semibold text-indigo-300 font-sans">AI Reasoning Underway...</span>
              </div>
              <p className="text-[9px] text-slate-500 font-mono tracking-wider">CampusPilot Brain is drafting predicted schemas</p>
            </div>
          )}

          {/* Autocomplete Dropdown Search Results */}
          {!isSearching && showResults && searchQuery && (
            <div className="absolute left-4 right-4 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl z-50">
              <div className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-indigo-450 text-indigo-400 flex items-center justify-between">
                <span>⚡ Peer Knowledge Search</span>
                <span className="text-[8px] bg-indigo-500/10 px-1 py-0.5 rounded text-indigo-300">Press Enter for Live AI Analysis</span>
              </div>
              {filteredSuggestions.length === 0 ? (
                <div className="px-3 py-4 text-center text-xs text-slate-500">
                  No direct list match. Press [Enter] to query the Gemini Core!
                </div>
              ) : (
                filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      item.action();
                      setShowResults(false);
                      setSearchQuery('');
                    }}
                    className="flex w-full flex-col rounded-lg px-2.5 py-1.5 text-left hover:bg-slate-900 transition-colors"
                  >
                    <span className="flex items-center text-xs font-semibold text-slate-200">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5 text-indigo-400" />
                      {item.label}
                    </span>
                    <span className="mt-0.5 pl-5 font-mono text-[9px] text-slate-400">
                      {item.sub}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </form>

        {/* AI Smart Search Immersive Modal Overlay */}
        {aiResult && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-indigo-500/5 overflow-hidden animate-fade-in">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <BrainCircuit className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight font-sans">Gemini Smart Query Reasoning</h3>
                    <p className="text-[9px] text-slate-500 font-mono">Matched against RGPV Academic Database</p>
                  </div>
                </div>
                <button 
                  onClick={() => setAiResult(null)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-indigo-950/20 border border-indigo-600/15 rounded-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-indigo-300">{aiResult.heading}</span>
                    <span className="text-[9px] bg-red-500/15 text-red-400 font-mono font-bold uppercase px-1.5 py-0.5 rounded border border-red-500/20">{aiResult.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed font-sans mt-2 space-y-1">
                    {aiResult.explanation.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>

                {aiResult.expectedQuestions && aiResult.expectedQuestions.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">⚠️ Pre-Sem Expected Questions</span>
                    <div className="space-y-1.5">
                      {aiResult.expectedQuestions.map((q, idx) => (
                        <div key={idx} className="p-2 bg-slate-950 rounded-lg border border-slate-850 text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-indigo-400 font-bold font-mono">Q{idx+1}</span>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-slate-500">AI CONFIDENCE:</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono bg-emerald-400/10 px-1.5 py-0.5 rounded">98.4%</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab(aiResult.actionTab);
                      setAiResult(null);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-1.5 bg-indigo-650 hover:bg-indigo-600 active:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <span>{aiResult.actionLabel}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Gamer Widget (XP, Level, Badges) */}
        <div className="flex items-center space-x-3">
          {/* Floating AI Status Badge */}
          <div className="hidden items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-550 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
              Gemini AI Connected
            </span>
          </div>

          {/* Points indicator */}
          <div className="flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/40 px-2.5 py-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-500/10 text-orange-400">
              <Flame className="h-3 w-3 fill-orange-400/20" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-[11px] font-bold text-slate-100">{userPoints}</span>
                <span className="font-mono text-[9px] text-slate-500">XP</span>
              </div>
            </div>
          </div>

          {/* Light/Dark Theme Toggle button */}
          <button
            onClick={onToggleTheme}
            id="btn-theme-toggle"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white cursor-pointer transition-all active:scale-95 duration-200"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-3.5 w-3.5 text-indigo-400" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            )}
          </button>

          {/* Elite Pilot Level */}
          <div className="hidden items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/40 px-2.5 py-1 sm:flex">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
              <Award className="h-3 w-3" />
            </div>
            <span className="text-[11px] font-bold text-slate-300">Lvl 4</span>
          </div>

          {/* Active User profile slot & dropdown toggler */}
          <div className="relative flex items-center space-x-2 border-l border-slate-800 pl-4">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2.5 text-left focus:outline-none hover:opacity-85 transition-opacity cursor-pointer group"
              id="user-profile-toggle"
            >
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {user ? user.name : 'Rishi Sharma'}
                </div>
                <div className="text-[9px] text-indigo-400 uppercase tracking-tighter font-mono font-bold">
                  {user ? (user.phone ? 'Phone Verified' : 'Google Scholar') : 'Top Contributor'}
                </div>
              </div>
              
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-slate-700 shadow-inner object-cover" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-slate-800 flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-inner">
                  {user ? user.name.split(' ').map(nByWord => nByWord[0]).join('') : 'RS'}
                </div>
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-11 mt-1 w-56 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl z-50 animate-fade-in text-xs">
                <div className="px-2.5 py-2 border-b border-slate-900 mb-1">
                  <p className="font-bold text-slate-100">{user ? user.name : 'Rishi Sharma'}</p>
                  <p className="text-[9px] text-slate-500 font-mono mt-0.5 truncate max-w-[190px]">
                    {user ? user.email : 'rishi.sharma@rgpv.edu'}
                  </p>
                  {user?.phone && (
                    <p className="text-[9.5px] text-indigo-400 font-mono mt-1">
                      📞 {user.phone}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onLogout) onLogout();
                  }}
                  id="btn-profile-logout"
                  className="flex w-full items-center space-x-2 rounded-lg px-2.5 py-1.5 text-left text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="font-semibold">Sign Out Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
