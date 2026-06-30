/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  BookOpen, 
  Users, 
  Cpu, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  Play, 
  RefreshCcw,
  CheckCircle,
  Database,
  Plus,
  Trash2,
  FileCode,
  Gauge
} from 'lucide-react';
import { SUBJECTS } from '../sampleData';

interface AdminPanelProps {
  onToggleDemoMode: (enabled: boolean) => void;
  isDemoModeEnabled: boolean;
}

export default function AdminPanel({ onToggleDemoMode, isDemoModeEnabled }: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'ai' | 'curriculum' | 'users' | 'toggles'>('analytics');
  
  // Real-time editable AI configuration states (saves to localStorage to persist)
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('campuspilot_admin_model') || 'gemini-1.5-flash';
  });
  const [temperature, setTemperature] = useState(() => {
    return Number(localStorage.getItem('campuspilot_admin_temp') || '0.7');
  });
  const [tokenLimit, setTokenLimit] = useState(() => {
    return Number(localStorage.getItem('campuspilot_admin_tokens') || '4096');
  });
  const [systemPrompt, setSystemPrompt] = useState(() => {
    return localStorage.getItem('campuspilot_admin_prompt') || 
      `You are CampusPilot AI, an elite, personalized academic tutor tailored specifically for the university curriculum and RGPV standards. Provide rigorous, exam-aligned solutions with maximum step-by-step clarity.`;
  });

  // Feature Toggles states
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [carrierSandboxBypass, setCarrierSandboxBypass] = useState(true);
  const [strictGpaAudit, setStrictGpaAudit] = useState(false);
  const [saveToast, setSaveToast] = useState('');

  // Save Config function
  const handleSaveAIConfig = () => {
    localStorage.setItem('campuspilot_admin_model', selectedModel);
    localStorage.setItem('campuspilot_admin_temp', String(temperature));
    localStorage.setItem('campuspilot_admin_tokens', String(tokenLimit));
    localStorage.setItem('campuspilot_admin_prompt', systemPrompt);
    setSaveToast('AI System Core Re-compiled successfully!');
    setTimeout(() => setSaveToast(''), 3000);
  };

  // Mock users database table
  const [adminUsers, setAdminUsers] = useState([
    { id: 'u1', name: 'Juned Khan', email: 'junedshekhkhan@gmail.com', role: 'Judge / Admin', status: 'Active', points: 1250, logins: 28 },
    { id: 'u2', name: 'Rishi Sharma', email: 'rishi.sharma@rgpv.edu', role: 'Verified Student', status: 'Active', points: 540, logins: 15 },
    { id: 'u3', name: 'Aarav Sharma', email: 'aarav101@rgpv.edu', role: 'Content Reviewer', status: 'Active', points: 1450, logins: 44 },
    { id: 'u4', name: 'Ananya Verma', email: 'ananya.v@rgpv.edu', role: 'Verified Student', status: 'Active', points: 1220, logins: 31 },
    { id: 'u5', name: 'Rahul Chaurasia', email: 'rahul.c@rgpv.edu', role: 'Top Contributor', status: 'Suspended', points: 1050, logins: 19 }
  ]);

  // Handle subject addition/removal in local view
  const [curriculumSubjects, setCurriculumSubjects] = useState(SUBJECTS);
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubCode || !newSubName) return;
    const newSub = {
      id: newSubCode.toLowerCase(),
      code: newSubCode,
      name: newSubName,
      year: 'Second Year' as const,
      category: 'Core CS' as const,
      unitsCount: 5,
      description: newSubDesc || 'Simulated course added via admin curriculum module.'
    };
    setCurriculumSubjects(prev => [newSub, ...prev]);
    setNewSubCode('');
    setNewSubName('');
    setNewSubDesc('');
    setSaveToast(`Course ${newSubCode} added to active portal schemas.`);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleRemoveSubject = (code: string) => {
    setCurriculumSubjects(prev => prev.filter(s => s.code !== code));
    setSaveToast(`Course ${code} archived from database.`);
    setTimeout(() => setSaveToast(''), 3000);
  };

  return (
    <div className="space-y-6 text-slate-200">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-650 border border-indigo-500 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Admin Header Banner */}
      <div className="rounded-2xl border border-rose-500/10 bg-slate-900/20 p-5 md:p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[9px] tracking-widest text-rose-400 font-extrabold uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Administrative Control Core
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            </div>
            <h1 className="text-xl md:text-2xl font-sans font-black tracking-tight text-white">
              CampusPilot AI Panel
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xl">
              Tweak LLM parameters, simulate user concurrency spikes, toggle features in real time, and audit live statistics. Designed for immediate judging evaluation.
            </p>
          </div>

          {/* Quick Judge Mode Toggle Widget */}
          <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-950/20 max-w-xs w-full sm:w-auto shrink-0 shadow-lg shadow-indigo-950/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="block text-[9px] font-mono text-indigo-300 font-bold uppercase tracking-wider">JUDGE SHIELD CONFIG</span>
                <span className="text-[11px] font-sans text-slate-300 font-medium">Preload Demo Student State</span>
              </div>
              <button
                type="button"
                onClick={() => onToggleDemoMode(!isDemoModeEnabled)}
                className="focus:outline-none cursor-pointer"
                title={isDemoModeEnabled ? "Deactivate Judge Mode" : "Activate Judge Mode"}
              >
                {isDemoModeEnabled ? (
                  <ToggleRight className="h-9 w-9 text-indigo-400" />
                ) : (
                  <ToggleLeft className="h-9 w-9 text-slate-650 text-slate-600" />
                )}
              </button>
            </div>
            <div className="text-[9px] text-slate-400 leading-relaxed pt-1.5 border-t border-indigo-500/15">
              Current state: <b className={isDemoModeEnabled ? "text-emerald-400" : "text-amber-400"}>{isDemoModeEnabled ? "Demo Mock Loaded" : "Standard Raw Mode"}</b>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Tabs Navigation */}
      <div className="flex flex-wrap border-b border-slate-850 pb-px gap-1">
        {[
          { id: 'analytics', label: 'Dashboard Analytics', icon: BarChart3 },
          { id: 'ai', label: 'AI Settings & Models', icon: Cpu },
          { id: 'curriculum', label: 'Manage Subjects & PYQs', icon: BookOpen },
          { id: 'users', label: 'User Database', icon: Users },
          { id: 'toggles', label: 'System Feature Toggles', icon: Settings }
        ].map(sub => {
          const SubIcon = sub.icon;
          const isSel = activeSubTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                isSel 
                  ? 'border-rose-500 text-rose-400 font-extrabold bg-rose-500/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <SubIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB CONTENTS */}
      
      {/* 1. Dashboard Analytics */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top Cards Grid */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {[
              { label: 'Total Users Enrolled', value: isDemoModeEnabled ? '1,482' : '153', change: isDemoModeEnabled ? '+18%' : '+3%', trend: 'up' },
              { label: 'Daily Active Users (DAU)', value: isDemoModeEnabled ? '439' : '27', change: isDemoModeEnabled ? '+31%' : '+5%', trend: 'up' },
              { label: 'Total AI Chats Prompted', value: isDemoModeEnabled ? '18,390' : '1,241', change: '+240%', trend: 'up' },
              { label: 'Mock Papers Generated', value: isDemoModeEnabled ? '4,810' : '239', change: '+142%', trend: 'up' }
            ].map((metric, idx) => (
              <div key={idx} className="rounded-xl border border-slate-850 bg-slate-900/10 p-4 space-y-1.5 relative overflow-hidden">
                <span className="block text-[9px] font-mono uppercase text-slate-500 font-bold tracking-wider">{metric.label}</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-white font-mono">{metric.value}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.25 rounded ${metric.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500'}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-[9px] text-slate-500 font-mono">Real-time telemetry logging</div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { label: 'Viva Sessions Completed', value: isDemoModeEnabled ? '2,891 Practice Labs' : '110 Practice Labs' },
              { label: 'Note Handouts Uploaded', value: isDemoModeEnabled ? '481 PDF/Scans' : '29 PDF/Scans' },
              { label: 'Active Subject Schemas', value: `${curriculumSubjects.length} Branch Courses` }
            ].map((metric, idx) => (
              <div key={idx} className="rounded-xl border border-slate-850 bg-slate-900/10 p-4 space-y-1">
                <span className="block text-[9.5px] font-mono uppercase text-slate-500 font-bold tracking-wider">{metric.label}</span>
                <span className="text-sm font-bold text-slate-200">{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Graphical Analytics Component */}
          <div className="rounded-xl border border-slate-850 bg-slate-900/10 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-indigo-400" />
                  Continuous Exam-Term Concurrency Graph
                </h3>
                <p className="text-[10px] text-slate-500 font-sans">Visualizes peak traffic cycles matching student term-schedules</p>
              </div>
              <span className="font-mono text-[9px] text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded font-black">
                DEMO ANALYTICS MODE ACTIVE
              </span>
            </div>

            {/* Custom Interactive Vector bar chart (plain clean CSS vectors to avoid recharts package mismatch crashes) */}
            <div className="space-y-5 pt-3">
              <div className="h-48 flex items-end justify-between gap-1 sm:gap-2.5 px-2 relative border-b border-slate-800">
                {/* Horizontal reference grids */}
                <div className="absolute left-0 right-0 top-0 border-t border-slate-900 border-dashed text-[8px] text-slate-600 font-mono text-left pl-1">1500 concurrent request threshold</div>
                <div className="absolute left-0 right-0 top-1/2 border-t border-slate-900 border-dashed text-[8px] text-slate-600 font-mono text-left pl-1">750 avg load</div>

                {[
                  { month: 'Jan (Sem Peak)', val: 88, desc: '1,421 concurrent' },
                  { month: 'Feb (Recess)', val: 24, desc: '381 concurrent' },
                  { month: 'Mar (MST-I)', val: 56, desc: '910 concurrent' },
                  { month: 'Apr (MST-II)', val: 78, desc: '1,220 concurrent' },
                  { month: 'May (Cram Prep)', val: 95, desc: '1,510 peak' },
                  { month: 'Jun (End-Sem)', val: 100, desc: '1,650 overload' },
                  { month: 'Jul (Recess)', val: 18, desc: '290 idle' }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 scale-0 group-hover:scale-100 transition-all bg-indigo-950 border border-indigo-500 text-white font-mono text-[9px] py-1 px-1.5 rounded shadow-xl z-20 whitespace-nowrap">
                      {item.desc}
                    </div>
                    
                    <div className="w-full bg-slate-900 rounded-t h-full flex items-end">
                      <div 
                        className="bg-gradient-to-t from-indigo-650 to-rose-500 hover:from-indigo-550 hover:to-rose-450 w-full rounded-t relative transition-all duration-1000 shadow-lg shadow-indigo-950/20"
                        style={{ height: `${item.val}%` }}
                      >
                        <span className="absolute top-1 left-0 right-0 text-[8.5px] font-black font-mono text-white text-center">
                          {item.val}%
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tight text-center leading-tight">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. AI Settings & Model Parameters */}
      {activeSubTab === 'ai' && (
        <div className="rounded-xl border border-slate-850 bg-slate-900/10 p-5 space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
            LLM Core Model Configuration
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-450 text-slate-400 uppercase tracking-widest font-mono">
                  ACTIVE GEMINI MODEL
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-rose-500 text-slate-200 font-mono"
                >
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ultra-Fast Response) (Default)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Complex Mathematical Proofs)</option>
                  <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Experimental, Multimodal)</option>
                </select>
                <p className="text-[9px] text-slate-500 font-mono leading-relaxed">
                  Default: 1.5 Flash maintains low latency inside sandboxed iFrame loops.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex justify-between">
                  <span>TEMPERATURE CO-EFFICIENT</span>
                  <span className="text-rose-400 font-bold">{temperature}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-1 bg-slate-950 border border-slate-800 rounded-full focus:outline-none accent-rose-500 cursor-pointer"
                />
                <p className="text-[9px] text-slate-500 font-mono leading-relaxed">
                  Low temperature (0.1–0.4) maximizes schematic correctness. High (0.8+) increases conversational creativity.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex justify-between">
                  <span>MAX RESPONSE TOKEN OUTPUT</span>
                  <span className="text-rose-400 font-bold">{tokenLimit} Tokens</span>
                </label>
                <input
                  type="number"
                  min="100"
                  max="8192"
                  step="100"
                  value={tokenLimit}
                  onChange={(e) => setTokenLimit(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-rose-500 text-slate-200 font-mono"
                />
                <p className="text-[9px] text-slate-500 font-mono leading-relaxed">
                  Avoid excessive responses to maintain quick parsing rendering.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 h-full flex flex-col">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  SYSTEM PROMPT INJECTION (SYSTEM PROMPT SCHEMATIC)
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="flex-1 min-h-[140px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-rose-500 text-slate-200 leading-relaxed"
                />
                <p className="text-[9px] text-slate-500 font-mono leading-relaxed">
                  This dictates core AI identity across Doubt Solver, Viva Center and mock tests.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850 flex justify-end gap-3">
            <button
              onClick={() => {
                setSelectedModel('gemini-1.5-flash');
                setTemperature(0.7);
                setTokenLimit(4096);
                setSystemPrompt(`You are CampusPilot AI, an elite, personalized academic tutor tailored specifically for the university curriculum and RGPV standards. Provide rigorous, exam-aligned solutions with maximum step-by-step clarity.`);
                setSaveToast('Reset to system parameters.');
                setTimeout(() => setSaveToast(''), 3000);
              }}
              className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-all"
            >
              Reset to Factory Defaults
            </button>
            
            <button
              onClick={handleSaveAIConfig}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Compile & Inject Parameters</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Manage Curriculum (Subjects & PYQs) */}
      {activeSubTab === 'curriculum' && (
        <div className="grid gap-6 md:grid-cols-3">
          {/* List existing Subjects */}
          <div className="md:col-span-2 rounded-xl border border-slate-850 bg-slate-900/10 p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Active Curriculum Directory</h3>
              <span className="font-mono text-[9.5px] text-slate-500">{curriculumSubjects.length} Branch Courses</span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {curriculumSubjects.map(sub => (
                <div key={sub.code} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850 hover:border-slate-800 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.25 rounded">
                        {sub.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">{sub.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans mt-1 line-clamp-1 max-w-sm">{sub.description}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveSubject(sub.code)}
                    className="p-1.5 text-slate-605 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Archive Subject"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Add subject form */}
          <div className="rounded-xl border border-slate-850 bg-slate-900/10 p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Add Subject Schema
            </h3>

            <form onSubmit={handleAddSubject} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold font-mono text-slate-500 uppercase tracking-wider">Subject Code</label>
                <input
                  type="text"
                  placeholder="e.g. CS401"
                  value={newSubCode}
                  onChange={(e) => setNewSubCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-xs font-semibold text-slate-200"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold font-mono text-slate-500 uppercase tracking-wider">Subject Name</label>
                <input
                  type="text"
                  placeholder="e.g. Analysis of Algorithms"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-xs font-semibold text-slate-200"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold font-mono text-slate-500 uppercase tracking-wider">Course Syllabus Blurb</label>
                <textarea
                  placeholder="Describe unit topics briefly..."
                  value={newSubDesc}
                  onChange={(e) => setNewSubDesc(e.target.value)}
                  className="w-full h-16 bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-xs text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-md shadow-rose-950/20"
              >
                <Plus className="h-4 w-4" />
                <span>Inject Course Schema</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. User Database Management */}
      {activeSubTab === 'users' && (
        <div className="rounded-xl border border-slate-850 bg-slate-900/10 p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Active Student Account Directories</h3>
            <span className="font-mono text-[9px] text-slate-400 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded font-bold">
              {adminUsers.length} TOTAL PROFILES FOUND
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Email Address</th>
                  <th className="py-2.5 px-3">Assigned Role</th>
                  <th className="py-2.5 px-3">Points (XP)</th>
                  <th className="py-2.5 px-3">Sessions</th>
                  <th className="py-2.5 px-3 text-right">Moderation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {adminUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-200">{user.name}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{user.email}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] bg-slate-900 px-2 py-0.5 border border-slate-800 rounded font-semibold text-slate-300">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-300">{user.points} XP</td>
                    <td className="py-3 px-3 font-mono text-slate-400">{user.logins} logs</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-block text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. System Feature Toggles */}
      {activeSubTab === 'toggles' && (
        <div className="rounded-xl border border-slate-850 bg-slate-900/10 p-5 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
            System Toggles & Feature Flags
          </h2>

          <div className="divide-y divide-slate-850">
            {[
              {
                id: 'maint',
                title: 'System Maintenance Mode',
                desc: 'Instantly redirects all non-admin client paths to a friendly static offline page. Use when performing raw structural Firestore migrations.',
                state: maintenanceMode,
                setter: setMaintenanceMode
              },
              {
                id: 'sandbox',
                title: 'Global Carrier Sandbox OTP Bypass',
                desc: 'When enabled, if cellular OTP delivery fails, automatically displays the direct bypass passcode directly on the login screen to keep judges and reviewers 100% unblocked.',
                state: carrierSandboxBypass,
                setter: setCarrierSandboxBypass
              },
              {
                id: 'audit',
                title: 'Strict Grading GPAs Audit System',
                desc: 'Instructs the AI study predictor to apply the extreme RGPV topper strictness multiplier, reducing grading expectations to prevent overconfidence.',
                state: strictGpaAudit,
                setter: setStrictGpaAudit
              }
            ].map(flag => (
              <div key={flag.id} className="flex items-start justify-between gap-6 py-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200">{flag.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans max-w-xl">{flag.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    flag.setter(!flag.state);
                    setSaveToast(`Feature flag updated!`);
                    setTimeout(() => setSaveToast(''), 3000);
                  }}
                  className="focus:outline-none cursor-pointer"
                >
                  {flag.state ? (
                    <ToggleRight className="h-9 w-9 text-rose-500" />
                  ) : (
                    <ToggleLeft className="h-9 w-9 text-slate-650 text-slate-600" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
