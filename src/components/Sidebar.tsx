/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Flame,
  LayoutDashboard,
  BrainCircuit,
  FileCheck,
  HelpCircle,
  MessageSquare,
  Timer,
  Sparkles,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAdmin?: boolean;
}

export default function Sidebar({ currentTab, setCurrentTab, isAdmin = false }: SidebarProps) {
  const navItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'chatbot', name: 'AI Doubt Solver & Chat', icon: MessageSquare },
    { id: 'pomodoro', name: 'AI Study Strategy', icon: Timer },
    { id: 'pyq', name: 'PYQ Intelligence', icon: BrainCircuit },
    { id: 'emergency', name: 'SOS Exam Blueprint', icon: Flame, isEmergency: true },
    { id: 'viva', name: 'Viva Preparation', icon: HelpCircle },
    { id: 'mock', name: 'AI Mock Paper Generator', icon: FileCheck },
    { id: 'roadmap', name: 'Future Roadmap', icon: Sparkles, isRoadmap: true }
  ];

  return (
    <aside className="w-full shrink-0 border-b border-slate-800 bg-slate-950 px-2 py-4 md:h-[calc(100vh-4rem)] md:w-64 md:border-r md:border-b-0 md:px-4 md:py-6 flex flex-col justify-between">
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
                    <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${item.isEmergency ? 'animate-pulse text-red-400' : 'text-slate-400 group-hover:text-slate-200'} ${isActive && !item.isEmergency ? 'text-indigo-400' : ''} ${item.isRoadmap && !isActive ? 'text-purple-400' : ''}`} />
                    <span>{item.name}</span>
                  </span>
                  {item.isEmergency && (
                    <span className="absolute top-1.5 right-2 rounded bg-red-500 px-1 py-0.5 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                      SOS
                    </span>
                  )}
                  {item.isRoadmap && !isActive && (
                    <span className="absolute top-1.5 right-2 rounded bg-purple-500/15 border border-purple-500/30 px-1 py-0.25 font-mono text-[8px] font-bold text-purple-300 uppercase tracking-wider">
                      NEW
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* USP Highlight Badges Container */}
        <div className="rounded-xl border border-slate-850 p-3 bg-slate-900/15 space-y-2 hidden md:block">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-mono text-[10px] font-bold text-indigo-400 uppercase tracking-wider">CampusPilot USP Matrix</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[8.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">AI POWERED</span>
            <span className="text-[8.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">GEMINI READY</span>
            <span className="text-[8.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300">EXAM FOCUS</span>
          </div>
        </div>
      </div>

      {/* Sidebar Footer and Secret Access Code */}
      <div className="border-t border-slate-900 pt-4 space-y-3.5">
        
        {/* Secret Admin Override Button */}
        {isAdmin && (
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-[10px] font-mono text-slate-500 font-bold">SECURITY GATE</span>
            </div>
            <button
              onClick={() => setCurrentTab('admin')}
              id="btn-secret-admin"
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50 hover:bg-rose-500/10 hover:border-rose-500/35 hover:text-rose-400 text-[10px] font-mono font-bold text-slate-400 transition-all cursor-pointer group active:scale-95"
              title="Access Secret Admin Panel"
            >
              <Lock className="h-2.5 w-2.5 text-slate-500 group-hover:text-rose-400 animate-pulse" />
              <span>ADMIN ENGINE</span>
            </button>
          </div>
        )}

        <p className="font-mono text-[9px] text-slate-500 leading-normal px-2">
          Tagline:<br />
          "Know What to Study. Know When to Study. Know How to Study."
        </p>
      </div>
    </aside>
  );
}
