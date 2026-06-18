/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Flame, Clock, ShieldAlert, Sparkles, AlertCircle, CheckCircle, ArrowRight, ClipboardList, BookOpen, Download } from 'lucide-react';
import { SUBJECTS } from '../sampleData';

export default function ExamEmergency() {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0].code);
  const [timeAvailable, setTimeAvailable] = useState('12 hours');
  const [examType, setExamType] = useState('End-Sem');
  const [targetGoal, setTargetGoal] = useState('passing');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [planResult, setPlanResult] = useState<any | null>(null);

  const generateSOSPlan = async () => {
    setIsGenerating(true);
    setPlanResult(null);

    try {
      const response = await fetch('/api/exam-emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectCode: selectedSubject,
          availableHours: timeAvailable,
          examType: examType,
          goal: targetGoal
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Convert API response format to map local keys if required
        const formattedSequence = data.hourlyPlan.map((h: any) => ({
          time: h.timeSlot,
          topic: h.focus,
          focus: h.strategy,
          source: `Suggested RGPV Peer Resource`
        }));

        const formattedQuestions = data.expectedQuestions.map((q: any) => ({
          q: q.question,
          a: q.hint,
          marks: q.estimatedProbability
        }));

        setPlanResult({
          subjectName: SUBJECTS.find(s => s.code === selectedSubject)?.name || 'Engineering Course',
          subjectCode: selectedSubject,
          timeAvailable,
          examType,
          priorityTopics: data.priorityTopics,
          sequence: formattedSequence,
          expectedQuestions: formattedQuestions,
          lastMinuteStrategy: data.topperStrategy || 'Focus on high weightage steps in exam sheets.',
          passingTips: data.passingTips || []
        });
      }
    } catch (error) {
      console.error('Error fetching emergency plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/10 via-orange-500/5 to-slate-950 p-6">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-500 animate-pulse">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
              SOS Emergency Service
            </span>
            <h1 className="mt-1 font-sans text-xl font-black text-white">
              Exam Emergency Mode (Time-boxed Triage)
            </h1>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              No time left? Tell us how many hours you have, your subject, and your exam type. Our AI analyzes community PYQs and immediately creates an absolute bare-minimum checklist to squeeze out a secure passing score or better!
            </p>
          </div>
        </div>
      </div>

      {/* Input Selection Block */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 backdrop-blur-sm">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center">
          <AlertCircle className="mr-1.5 h-4 w-4 text-orange-400" />
          Specify Your Exam Crisis Level
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-red-500 focus:outline-none"
            >
              {SUBJECTS.map(s => (
                <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Time Available</label>
            <select
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-red-500 focus:outline-none"
            >
              <option value="6 hours">6 Hours (Absolute Survival)</option>
              <option value="12 hours">12 Hours (Extreme Hustle)</option>
              <option value="24 hours">24 Hours (Concentrated Study)</option>
              <option value="3 days">3 Days (Optimized Plan)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Exam Type</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-red-500 focus:outline-none"
            >
              <option value="MST-I">MST-I (Unit 1 & 2)</option>
              <option value="MST-II">MST-II (Unit 3 & 4)</option>
              <option value="End-Sem">End-Sem (Complete Syllabus)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Target Goal</label>
            <select
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-indigo-505 focus:border-indigo-500 focus:outline-none"
            >
              <option value="passing">Pass Securely (B/C grade)</option>
              <option value="topper">Aim for Topper (A/A+ grade)</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateSOSPlan}
          disabled={isGenerating}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-red-650 to-orange-555 bg-red-600 hover:from-red-500 hover:to-orange-500 p-2.5 text-xs font-bold text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? '🎛️ Mapping Topic Probability & Weitghage...' : '✨ Generate Instant AI SOS Blueprint'}
        </button>
      </div>

      {/* Loading Animation */}
      {isGenerating && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-12 text-center">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-red-500 items-center justify-center text-white text-xs font-black">
              SOS
            </span>
          </div>
          <h3 className="mt-4 font-sans text-xs font-bold text-slate-200">
            Consulting RGPV PYQ Database & Student Upload Trends
          </h3>
          <p className="mt-1 text-[10px] text-slate-500 font-mono">
            Filtering high weightage unit formulas for {selectedSubject}
          </p>
        </div>
      )}

      {/* AI Generated Study Priority Blueprint */}
      {planResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Header metadata */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-black border border-emerald-500/10">
                AI PLANNED SUCCESS
              </span>
              <h2 className="mt-1 font-sans text-sm font-black text-white">
                Survival Guide: {planResult.subjectCode} - {planResult.subjectName}
              </h2>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                Optimized for: <strong className="text-slate-200">{planResult.examType}</strong> · Target Time: <strong className="text-slate-200">{planResult.timeAvailable}</strong>
              </p>
            </div>
            <button className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 font-sans text-[11px] font-bold text-slate-300 hover:text-white flex items-center hover:bg-slate-900 transition-colors">
              <Download className="mr-1 h-3.5 w-3.5 text-indigo-400" />
              Download Offline Checklist
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Col: Priority Checklist & SOS Advice */}
            <div className="space-y-4 md:col-span-1">
              {/* Priority topics list */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-4">
                <h3 className="font-sans text-xs font-bold text-slate-200 mb-3 flex items-center">
                  <ClipboardList className="mr-1.5 h-4 w-4 text-indigo-400" />
                  Must-Do Topics Checklist
                </h3>
                <div className="space-y-3">
                  {planResult.priorityTopics.map((item: any, idx: number) => {
                    const isObj = typeof item === 'object' && item !== null;
                    const name = isObj ? item.topic : item;
                    const marks = isObj ? item.expectedMarks : null;
                    const justification = isObj ? item.whyAIRecommended : null;
                    const strength = isObj ? item.importance : "SOS Topic";

                    return (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850 space-y-2.5">
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-xs font-semibold text-slate-205 text-slate-200 leading-snug">
                            <span className="text-indigo-450 text-indigo-400 font-bold font-mono mr-1">{idx + 1}.</span> {name}
                          </span>
                          <span className="text-[8px] bg-red-400/10 text-red-400 px-1 py-0.5 rounded font-mono shrink-0">
                            {marks ? `~${marks}M` : strength}
                          </span>
                        </div>
                        {justification && (
                          <div className="text-[10px] text-slate-400 bg-indigo-500/5 px-2 py-1.5 border-l-2 border-indigo-500/40 rounded-r-lg">
                            <span className="font-bold text-indigo-300">Why Recommended:</span> {justification}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SOS advice banner */}
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-4 text-xs">
                <h4 className="font-bold text-orange-400 flex items-center mb-1.5">
                  <ShieldAlert className="mr-1.5 h-4 w-4 shrink-0" />
                  Last-Minute Tactical Rule:
                </h4>
                <p className="text-slate-300 leading-relaxed font-sans">{planResult.lastMinuteStrategy}</p>
              </div>
            </div>

            {/* Right 2 Cols: Staggered Timeline & Expected hot questions */}
            <div className="space-y-4 md:col-span-2">
              {/* Interactive study sequence */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-4">
                <h3 className="font-sans text-xs font-bold text-slate-200 mb-4 flex items-center">
                  <Clock className="mr-1.5 h-4 w-4 text-purple-400" />
                  Hourly Time-Box Sequence Plan
                </h3>
                
                <div className="relative border-l border-slate-800 ml-4 space-y-6">
                  {planResult.sequence.map((step: any, idx: number) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute -left-2 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 border-2 border-indigo-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      </div>
                      <div className="text-xs">
                        <span className="font-mono text-[9px] font-bold text-indigo-400 uppercase tracking-widest block">
                          {step.time}
                        </span>
                        <h4 className="mt-1 font-sans font-bold text-slate-200">{step.topic}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{step.focus}</p>
                        <div className="mt-1.5 text-[9px] font-mono text-slate-500">
                          Recommended Companion: <span className="text-slate-400 underline">{step.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected heavy marks questions */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-4">
                <h3 className="font-sans text-xs font-bold text-slate-200 mb-3 flex items-center">
                  <Sparkles className="mr-1.5 h-4 w-4 text-amber-400" />
                  Simulated High-Weightage Questions & Draft Answers
                </h3>
                <div className="space-y-4">
                  {planResult.expectedQuestions.map((q: any, idx: number) => (
                    <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs leading-relaxed">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-2">
                        <span className="font-bold text-indigo-400">Question {idx + 1}</span>
                        <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                          {q.marks} Marks Probability
                        </span>
                      </div>
                      <p className="font-sans font-semibold text-slate-200">{q.q}</p>
                      <p className="mt-2 text-[11px] text-slate-400 leading-normal pl-3 border-l-2 border-slate-800">
                        <strong className="text-slate-300">Simplified Exam Answer:</strong> {q.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
