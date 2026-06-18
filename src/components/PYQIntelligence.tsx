/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  BrainCircuit,
  Upload,
  BarChart2,
  TrendingUp,
  Award,
  BookOpen,
  PieChart as PieIcon,
  HelpCircle,
  FileText,
  Flame,
  CheckCircle,
  ArrowUpRight,
  TrendingDown,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SUBJECTS, SAMPLE_PYQS } from '../sampleData';
import { PYQAnalysis } from '../types';

interface PYQIntelligenceProps {
  selectedSubjectCode: string;
  setSelectedSubjectCode: (code: string) => void;
  onContributeXP: (points: number) => void;
}

export default function PYQIntelligence({
  selectedSubjectCode,
  setSelectedSubjectCode,
  onContributeXP
}: PYQIntelligenceProps) {
  const [activeSubjectCode, setActiveSubjectCode] = useState(selectedSubjectCode || 'BT101');
  const [simulatedFiles, setSimulatedFiles] = useState<{ name: string; size: string; status: 'idle' | 'scanning' | 'complete' }[]>([]);
  const [customPYQData, setCustomPYQData] = useState<PYQAnalysis[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Active Subject details
  const activeSubject = useMemo(() => {
    return SUBJECTS.find(s => s.code === activeSubjectCode) || SUBJECTS[0];
  }, [activeSubjectCode]);

  // Combined real & simulated PYQ data
  const currentAnalysis = useMemo(() => {
    // Check if custom data exists for selected subject, else fallback to standard
    const custom = customPYQData.find(p => p.subjectCode === activeSubjectCode);
    if (custom) return custom;
    
    const standard = SAMPLE_PYQS.find(p => p.subjectCode === activeSubjectCode);
    if (standard) return standard;

    // Build immediate fallback generated simulation to guarantee NO empty screens!
    return {
      id: `sim_${activeSubjectCode}`,
      subjectCode: activeSubjectCode,
      paperName: `AI Simulated Paper Pattern ${activeSubjectCode}`,
      year: '2026 Prediction',
      type: 'End-Sem' as const,
      difficulty: 'Medium' as const,
      uploadedBy: 'Campus AI Model',
      uploadedAt: 'Active Today',
      frequentTopics: [
        { topic: 'Basic Unit Definitions & Applications', frequency: 7, weightage: 20, trend: 'rising' as const },
        { topic: 'Core Subject Mathematical Derivations', frequency: 6, weightage: 18, trend: 'stable' as const },
        { topic: 'Block diagram schematic structures', frequency: 5, weightage: 15, trend: 'failing' as const },
        { topic: 'Standard theoretical difference comparisons', frequency: 4, weightage: 12, trend: 'stable' as const }
      ],
      unitWeightages: [
        { unit: 'Unit I', name: 'Core Foundations', percentage: 22 },
        { unit: 'Unit II', name: 'Process & Design Systems', percentage: 20 },
        { unit: 'Unit III', name: 'Mathematical Formulations', percentage: 18 },
        { unit: 'Unit IV', name: 'Advanced Applied Systems', percentage: 20 },
        { unit: 'Unit V', name: 'Future Applications & Lab Prep', percentage: 20 }
      ],
      expectedQuestions: [
        { question: `Explain the fundamental operational limits of standard ${activeSubject.name} topics. Include a diagram.`, estimatedMarks: 14, confidenceScore: 84 },
        { question: `State the standard difference comparison between leading methodologies of ${activeSubjectCode}.`, estimatedMarks: 8, confidenceScore: 78 }
      ]
    };
  }, [activeSubjectCode, customPYQData, activeSubject]);

  // Color constants for pie slices
  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'];

  // Handle simulated file dropped/uploaded
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFileSim(files[0].name, `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`);
    }
  };

  const processFileSim = (name: string, size: string) => {
    const newFile = { name, size, status: 'scanning' as const };
    setSimulatedFiles(prev => [newFile, ...prev]);

    setTimeout(() => {
      // Create a gorgeous simulated analysis based on subject code
      const topicTemplates: Record<string, any> = {
        BT101: {
          topics: [
            { topic: 'Zeolite vs Ion-Exchange calculations', frequency: 12, weightage: 28, trend: 'rising' },
            { topic: 'Nylon-66 preparation mechanisms', frequency: 8, weightage: 16, trend: 'stable' },
            { topic: 'Proximate analysis formulas', frequency: 7, weightage: 15, trend: 'stable' },
            { topic: 'Refractory materials and lubricants values', frequency: 5, weightage: 10, trend: 'failing' }
          ],
          weightage: [
            { unit: 'Unit I', name: 'Water & Demineralizers', percentage: 30 },
            { unit: 'Unit II', name: 'Boiler operations', percentage: 22 },
            { unit: 'Unit III', name: 'Polymer science', percentage: 18 },
            { unit: 'Unit IV', name: 'Coal Combustibles', percentage: 20 },
            { unit: 'Unit V', name: 'Lubricant qualities', percentage: 10 }
          ],
          expected: [
            { question: 'Compare hot and cold Lime-Soda processes with flowsheets.', estimatedMarks: 14, confidenceScore: 92 },
            { question: 'What is the structural synthesis of Bakelite? State industrial uses.', estimatedMarks: 8, confidenceScore: 88 }
          ]
        },
        BT105: {
          topics: [
            { topic: 'Acceptance Angle & Optical fiber NA calculations', frequency: 11, weightage: 26, trend: 'rising' },
            { topic: 'Schrodingers wavefunction probability', frequency: 9, weightage: 20, trend: 'stable' },
            { topic: 'Helium-Neon Laser active transitions', frequency: 8, weightage: 18, trend: 'rising' },
            { topic: 'Meissner effect in superconductors', frequency: 6, weightage: 12, trend: 'stable' }
          ],
          weightage: [
            { unit: 'Unit I', name: 'Quantum Physics', percentage: 25 },
            { unit: 'Unit II', name: 'Electromagnetics', percentage: 15 },
            { unit: 'Unit III', name: 'Lasers Science', percentage: 20 },
            { unit: 'Unit IV', name: 'Fiber Communications', percentage: 22 },
            { unit: 'Unit V', name: 'Superconducting oxides', percentage: 18 }
          ],
          expected: [
            { question: 'Derive an expression for the numerical aperture of step index fiber.', estimatedMarks: 10, confidenceScore: 95 },
            { question: 'Differentiate between Type-I and Type-II superconductors with Meissner graphs.', estimatedMarks: 12, confidenceScore: 91 }
          ]
        }
      };

      const template = topicTemplates[activeSubjectCode] || {
        topics: [
          { topic: 'Primary Subject Core Theorem proof', frequency: 9, weightage: 24, trend: 'rising' },
          { topic: 'Standard Numerical computation worksheet', frequency: 8, weightage: 20, trend: 'stable' },
          { topic: 'Schematic architecture representation', frequency: 6, weightage: 15, trend: 'stable' }
        ],
        weightage: [
          { unit: 'Unit I', name: 'Foundations theory', percentage: 24 },
          { unit: 'Unit II', name: 'Mathematical models', percentage: 22 },
          { unit: 'Unit III', name: 'Standard algorithms', percentage: 20 },
          { unit: 'Unit IV', name: 'Applied modules', percentage: 18 },
          { unit: 'Unit V', name: 'Future frameworks', percentage: 16 }
        ],
        expected: [
          { question: `Detail the system boundary layers of standard ${activeSubject.name}.`, estimatedMarks: 14, confidenceScore: 90 },
          { question: `Calculate the operational efficiency value under 80% workload standards.`, estimatedMarks: 10, confidenceScore: 85 }
        ]
      };

      const generatedAnalysis: PYQAnalysis = {
        id: `custom_${Date.now()}`,
        subjectCode: activeSubjectCode,
        paperName: `Analyzed ${name}`,
        year: '2026',
        type: 'End-Sem',
        difficulty: 'Medium',
        uploadedBy: 'You (Rahul RGPV)',
        uploadedAt: 'Just Now',
        frequentTopics: template.topics,
        unitWeightages: template.weightage,
        expectedQuestions: template.expected
      };

      setCustomPYQData(prev => [generatedAnalysis, ...prev]);
      setSimulatedFiles(prev => prev.map(f => f.name === name ? { ...f, status: 'complete' } : f));
      
      // Trigger XP boost!
      onContributeXP(120);

    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-indigo-500/20 bg-slate-900/30 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans text-lg font-bold text-white">PYQ Intelligence Dashboard</h1>
              <p className="text-xs text-slate-400">
                AI parses past exam papers to extract patterns, trends, heatmaps, and high-weightage topics.
              </p>
            </div>
          </div>
          {/* Quick subject pick */}
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase">Active:</span>
            <select
              value={activeSubjectCode}
              onChange={(e) => {
                setActiveSubjectCode(e.target.value);
                setSelectedSubjectCode(e.target.value);
              }}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              {SUBJECTS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid split: Drag & Drop Upload and Expected Hot Topics */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Analytics charts & reports */}
        <div className="lg:col-span-2 space-y-6">
          {/* Unit Weightage & Frequency Row */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Topic Frequency Bar Chart */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
              <h3 className="font-sans text-xs font-bold text-slate-200 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <BarChart2 className="mr-1.5 h-4 w-4 text-purple-400" />
                  Topic Frequency Index (Occurrence)
                </span>
                <span className="font-mono text-[9px] text-slate-500">Dec Cycles</span>
              </h3>
              
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentAnalysis.frequentTopics} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="topic" tick={{ fill: '#94a3b8', fontSize: 9 }} stroke="#334155" hide={true} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#334155" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#94a3b8', fontSize: 9, fontWeight: 'bold' }}
                      itemStyle={{ color: '#a855f7', fontSize: 11 }}
                    />
                    <Bar dataKey="frequency" fill="#a855f7" radius={[4, 4, 0, 0]} name="Years Appeared" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-center text-[10px] text-slate-400 font-sans italic">
                Hover columns to reveal topics of highest relative repeat indices.
              </div>
            </div>

            {/* Unit weightage Pie chart */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
              <h3 className="font-sans text-xs font-bold text-slate-200 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <PieIcon className="mr-1.5 h-4 w-4 text-emerald-400" />
                  Unit Weightage Distribution Matrix
                </span>
                <span className="font-mono text-[9px] text-slate-500">Syllabus %</span>
              </h3>
              
              <div className="flex h-56 items-center justify-center">
                <div className="w-[60%] h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentAnalysis.unitWeightages}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="percentage"
                      >
                        {currentAnalysis.unitWeightages.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ fontSize: 11 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-[40%] space-y-1.5 text-[10px]">
                  {currentAnalysis.unitWeightages.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-slate-300">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="truncate font-sans font-semibold text-slate-400">{item.unit}:</span>
                      <span className="font-mono text-white font-bold">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Heatmaps Grid */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
            <h3 className="font-sans text-xs font-bold text-slate-200 mb-3.5 flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="mr-1.5 h-4 w-4 text-indigo-400 animate-pulse" />
                Syllabus Unit Focus Heatmap (Probability of Appearance)
              </span>
              <span className="font-mono text-[9px] text-slate-500">Live Heat Indices</span>
            </h3>

            <div className="grid gap-2 sm:grid-cols-5 text-center">
              {currentAnalysis.unitWeightages.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl border p-3 flex flex-col justify-between h-24 transition-all duration-150 hover:scale-[1.01] ${
                    item.percentage > 22
                      ? 'bg-red-500/10 border-red-500/30 text-rose-400'
                      : item.percentage > 18
                      ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase">{item.unit}</span>
                    <span className="block text-[9px] text-slate-400 font-sans truncate/line-clamp-2 leading-relaxed mt-1">
                      {item.name}
                    </span>
                  </div>
                  <span className="block font-mono text-xs font-black mt-2">
                    {item.percentage > 22 ? '🔥 Hot ' : item.percentage > 18 ? '⚡ High' : '☕ Stable'} Index
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Hot Questions confidence table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
            <h3 className="font-sans text-xs font-bold text-slate-200 mb-3 flex items-center">
              <HelpCircle className="mr-1.5 h-4 w-4 text-amber-400" />
              AI Predicted Hot Questions for Upcoming Exam Cycle
            </h3>
            
            <div className="space-y-3">
              {currentAnalysis.expectedQuestions.map((eq, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 gap-3">
                  <div className="flex items-start space-x-2 text-xs">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 font-mono text-[10px] text-indigo-400 font-bold">
                      {idx + 1}
                    </span>
                    <p className="font-sans text-slate-200 leading-normal">{eq.question}</p>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                      {eq.estimatedMarks} Marks
                    </span>
                    <div className="flex items-center bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                      <span className="font-mono text-[10px] text-emerald-400 font-black">{eq.confidenceScore}% Acc</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Column */}
        <div className="space-y-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const files = e.dataTransfer.files;
              if (files && files[0]) {
                processFileSim(files[0].name, `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`);
              }
            }}
            className={`rounded-2xl border p-6 text-center flex flex-col items-center justify-center transition-all ${
              isDragOver
                ? 'border-indigo-500 bg-indigo-500/5 scale-[1.02]'
                : 'border-dashed border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-905'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 mb-4 animate-bounce">
              <Upload className="h-6 w-6" />
            </div>
            
            <h3 className="font-sans text-xs font-bold text-white">Upload Real Exam Paper / PYQ PDF</h3>
            <p className="mt-1 text-[11px] text-slate-400 max-w-[200px] leading-relaxed mx-auto">
              Drag MST, end-sem papers, or handwritten sheets here. AI instantly updates frequency statistics and maps.
            </p>

            <div className="mt-4 relative">
              <input
                type="file"
                id="file-pyq-input"
                onChange={handleFileUpload}
                accept=".pdf,.png,.jpg,.jpeg,.doc"
                className="hidden"
              />
              <label
                htmlFor="file-pyq-input"
                className="inline-flex cursor-pointer rounded-xl bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-all shadow shadow-indigo-500/15"
              >
                Select Paper File
              </label>
            </div>
            <p className="text-[9px] font-mono text-indigo-400 mt-3 uppercase font-black">+120 XP Reward on approval</p>
          </div>

          {/* Active queue / upload lists */}
          {simulatedFiles.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Live Processing Feed
              </h4>
              <div className="space-y-3">
                {simulatedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <FileText className="h-4 w-4 text-indigo-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-200 truncate">{file.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{file.size}</p>
                      </div>
                    </div>
                    <div>
                      {file.status === 'scanning' ? (
                        <div className="flex items-center space-x-1.5 text-orange-400 font-mono text-[9px] font-bold">
                          <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
                          <span>PARSING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-emerald-400 font-mono text-[9px] font-black">
                          <CheckCircle className="h-3 w-3 fill-emerald-400/15" />
                          <span>ANALYSED</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RGPV pattern insights card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Examiner Trend Blueprint
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span><strong className="text-white">Trend:</strong> Numerical questions weight is rising (now ~35% weight).</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                <span><strong className="text-white">Trend:</strong> Generic rote definitions decreasing by 12% year-on-year.</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-normal pt-1.5 border-t border-slate-800/60 mt-1">
                Recommendation: Solve math-heavy treatment setups first in BT101; do not skip EDTA formulas as they carry 10-14 mandatory marks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
