/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Flame,
  LayoutDashboard,
  BrainCircuit,
  FileCheck,
  BookOpen,
  HelpCircle,
  FolderDot,
  Code,
  Sparkles,
  Award,
  BookMarked,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Sidebar({ currentTab, setCurrentTab }: SidebarProps) {
  const navItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'chatbot', name: 'AI Doubt Solver & Chat', icon: MessageSquare },
    { id: 'emergency', name: 'Exam Emergency', icon: Flame, isEmergency: true },
    { id: 'pyq', name: 'PYQ Intelligence', icon: BrainCircuit },
    { id: 'notes', name: 'Community Notes', icon: BookOpen },
    { id: 'viva', name: 'Viva Prep Center', icon: HelpCircle },
    { id: 'mock', name: 'Mock Generator', icon: FileCheck },
    { id: 'coding', name: 'Coding & Placements', icon: Code },
    { id: 'predictor', name: 'AI Study Predictor', icon: Sparkles },
    { id: 'contribution', name: 'Contribute Materials', icon: Award }
  ];

  return (
    <aside className="w-full shrink-0 border-b border-slate-800 bg-slate-950 px-2 py-4 md:h-[calc(100vh-4rem)] md:w-64 md:border-r md:border-b-0 md:px-4 md:py-6">
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-6">
          <div>
            <span className="px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Navigation Command
            </span>
            <nav className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? item.isEmergency
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30 font-bold'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-950/5 font-bold'
                        : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/4 h-1/2 w-1 bg-indigo-500 rounded-r animate-pulse" />
                    )}
                    <span className="flex items-center space-x-3 transition-transform duration-200 group-hover:translate-x-1">
                      <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${item.isEmergency ? 'animate-pulse text-red-400' : 'text-slate-400 group-hover:text-slate-200'} ${isActive && !item.isEmergency ? 'text-indigo-400' : ''}`} />
                      <span>{item.name}</span>
                    </span>
                    {item.isEmergency && (
                      <span className="absolute top-1.5 right-2 rounded bg-red-500 px-1 py-0.5 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                        SOS
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="rounded-xl border border-slate-800 p-3 bg-slate-950 hidden md:block">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-sans text-[11px] font-bold text-emerald-400">RGPV Connected</span>
            </div>
            <p className="mt-1 font-sans text-[10px] text-slate-400 leading-relaxed">
              Serving continuous updates for June-Dec Odd/Even standard cycles.
            </p>
          </div>
        </div>

        <div className="hidden border-t border-slate-800 pt-4 md:block">
          <div className="p-4 mb-3 bg-indigo-900/20 rounded-xl border border-indigo-500/20 text-center">
            <div className="text-xs text-indigo-300 mb-2">Be a contributor!</div>
            <button
              onClick={() => setCurrentTab('contribution')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-md"
            >
              Upload Content
            </button>
          </div>
          <p className="font-mono text-[9px] text-slate-500 leading-normal">
            Tagline:<br />
            "Built By Students, Powered By AI, Improved By Community."
          </p>
        </div>
      </div>
    </aside>
  );
}
