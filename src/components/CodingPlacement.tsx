/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Code, Star, Sparkles, BookOpen, Terminal, ChevronRight, CheckCircle, Flame, Layers } from 'lucide-react';
import { SAMPLE_CODING } from '../sampleData';

export default function CodingPlacement() {
  const [activeCategory, setActiveCategory] = useState<'DSA' | 'C++' | 'Web Dev' | 'Python' | 'Aptitude' | 'HR'>('DSA');
  const [selectedQuestionId, setSelectedQuestionId] = useState(SAMPLE_CODING[0].id);
  const [revealedSolution, setRevealedSolution] = useState(false);

  // Roadmap milestones matching general placements
  const roadmaps = {
    DSA: [
      { id: 'r1', step: 'Milestone 1', name: 'Static Arrays & Linked Loops', state: 'complete' },
      { id: 'r2', step: 'Milestone 2', name: 'Stack Parsing & DFS Recursion', state: 'current' },
      { id: 'r3', step: 'Milestone 3', name: 'Dynamic Decision Arrays & DP', state: 'locked' }
    ],
    'C++': [
      { id: 'rp1', step: 'Milestone 1', name: 'Stack Pointers & Segfault Bugs', state: 'complete' },
      { id: 'rp2', step: 'Milestone 2', name: 'Virtual Destructors & Vptr', state: 'current' }
    ],
    'Web Dev': [
      { id: 'rw1', step: 'Milestone 1', name: 'Fetch hooks & Abort tokens', state: 'current' }
    ],
    Python: [
      { id: 'ry1', step: 'Milestone 1', name: 'List comprehensions & generators', state: 'current' }
    ],
    Aptitude: [
      { id: 'ra1', step: 'Milestone 1', name: 'Work timing & trains relativity', state: 'current' }
    ],
    HR: [
      { id: 'rh1', step: 'Milestone 1', name: 'STAR framework behavioral drills', state: 'current' }
    ]
  };

  const selectedQuestion = useMemo(() => {
    // Find matched question, else build robust simulated response immediately so no static screen occurs
    const customMatch = SAMPLE_CODING.find(q => q.category === activeCategory);
    if (customMatch) return customMatch;

    // Fallbacks
    if (activeCategory === 'Python') {
      return {
        id: 'py_fall',
        category: 'Python' as const,
        title: 'Custom Generators with Infinite Stream Yields',
        difficulty: 'Medium' as const,
        problemStatement: 'Design a memory efficient Python generator that yields Fibonacci numbers up to limit N to prevent memory leaks during ultra long sequence stream iterations.',
        sampleInput: 'limit = 1000',
        sampleOutput: 'Yields values dynamically',
        optimalComplexity: 'O(N) Time, O(1) Space',
        codeSolution: `def fibonacci_generator(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

# Usage:
# for num in fibonacci_generator(100):
#     print(num)`,
        companyTags: ['Amazon', 'Aditya Birla', 'Tech Mahindra']
      };
    } else if (activeCategory === 'Aptitude') {
      return {
        id: 'apt_fall',
        category: 'Aptitude' as const,
        title: 'Boats, Streams and Upstream velocity formulas',
        difficulty: 'Medium' as const,
        problemStatement: 'A boat moves downstream at rate 16 km/hr and upstream at rate 10 km/hr. Find speed of stream and boat in still waters.',
        sampleInput: 'Downstream = 16, Upstream = 10',
        sampleOutput: 'Boat = 13 km/h, Stream = 3 km/h',
        codeSolution: `Let Boat Speed = x km/h, Stream Speed = y km/h.
Downstream: x + y = 16
Upstream: x - y = 10

Adding equations: 2x = 26 => x = 13 (Boat Speed)
y = 16 - 13 = 3 km/h (Stream Speed).`,
        companyTags: ['TCS Ninja', 'Wipro Turbo', 'Cognizant']
      };
    } else if (activeCategory === 'HR') {
      return {
        id: 'hr_fall',
        category: 'HR' as const,
        title: 'Handling "Describe a complex technical conflict you solved"',
        difficulty: 'Medium' as const,
        problemStatement: 'How do you represent your actions during a major server failure when talking with interviewers? Use standard STAR structure models.',
        codeSolution: `STAR Framework breakdown:
1. S (Situation): Mention group capstone project crash 2 hours prior to MST assessment.
2. T (Task): Identify database synchronization errors without blaming teammate.
3. A (Action): Created a manual fallback CSV backup, isolating the damaged port.
4. R (Result): Recovered 95% records on preview demo. Got top grade.`,
        companyTags: ['Google', 'Goldman Sachs', 'Deloitte']
      };
    } else {
      return {
        id: 'default_fall',
        category: activeCategory,
        title: `Core placement checklist for ${activeCategory}`,
        difficulty: 'Medium' as const,
        problemStatement: 'Explain standard foundational templates used during primary MNC online assessments.',
        codeSolution: `Focus heavily on standard time boundaries and corner constraints checks. Implement recursive loops avoiding duplicate stacks operations.`,
        companyTags: ['Infosys', 'Capgemini']
      };
    }
  }, [activeCategory]);

  const handleRevealSolution = () => {
    setRevealedSolution(true);
  };

  const handleCategoryChange = (cat: any) => {
    setActiveCategory(cat);
    setRevealedSolution(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="rounded-2xl border border-yellow-500/10 bg-slate-900/30 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans text-lg font-bold text-white">Coding & Placement Corner</h1>
              <p className="text-xs text-slate-400">
                Unlock interview-grade logic, roadmaps, and optimal implementations used during placements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main switch Category */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-850 pb-3">
        {['DSA', 'C++', 'Web Dev', 'Python', 'Aptitude', 'HR'].map((cat: any) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all uppercase ${
              activeCategory === cat
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Split details view */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left milestone visual map */}
        <div className="space-y-4 md:col-span-1">
          {/* Active roadmaps checklist */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-4">
            <h3 className="font-sans text-xs font-bold text-slate-200 mb-4 flex items-center">
              <Layers className="mr-1.5 h-4 w-4 text-amber-400" />
              Strategic Preparation Roadmap
            </h3>

            <div className="relative border-l border-slate-800 ml-3 space-y-4">
              {roadmaps[activeCategory]?.map((rd) => (
                <div key={rd.id} className="relative pl-5">
                  <div className={`absolute -left-1.5 top-0.5 h-3 w-3 rounded-full border-2 bg-slate-950 ${
                    rd.state === 'complete' ? 'border-emerald-500' :
                    rd.state === 'current' ? 'border-amber-400 animate-pulse' : 'border-slate-800'
                  }`} />
                  <div className="text-xs">
                    <span className="font-mono text-[9px] font-bold text-slate-500 block uppercase">{rd.step}</span>
                    <h4 className="font-sans font-bold text-slate-300 mt-0.5">{rd.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-850 bg-slate-950 p-4">
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-2">Company target filters</h4>
            <div className="flex flex-wrap gap-1">
              {selectedQuestion.companyTags.map(tag => (
                <span key={tag} className="rounded-lg bg-slate-900 border border-slate-800 px-2 py-0.5 font-mono text-[9.5px] text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Coding Workspace */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-805 bg-slate-900/10 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-850 pb-3 gap-3">
              <div>
                <span className="font-mono text-[9px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded font-bold uppercase">
                  {selectedQuestion.category} Guide
                </span>
                <h3 className="mt-1 font-sans text-sm font-bold text-white">
                  {selectedQuestion.title}
                </h3>
              </div>
              <span className="rounded-full bg-slate-950 border border-slate-800 px-2.5 py-0.5 font-mono text-[9px] text-slate-400 uppercase font-black">
                {selectedQuestion.difficulty}
              </span>
            </div>

            {/* Problem Statement */}
            <div className="bg-slate-950/40 border border-slate-850 rounded-xl p-4 text-[12.5px] leading-relaxed text-slate-300">
              <strong className="text-white block mb-1">Problem Statement:</strong>
              {selectedQuestion.problemStatement}

              {selectedQuestion.sampleInput && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2 text-xs font-mono">
                  <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-900">
                    <span className="block text-slate-500 text-[10px] uppercase font-bold">Sample Input:</span>
                    <span className="text-slate-300">{selectedQuestion.sampleInput}</span>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-900">
                    <span className="block text-slate-500 text-[10px] uppercase font-bold">Sample Output:</span>
                    <span className="text-slate-300">{selectedQuestion.sampleOutput}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Hidden Solution toggler */}
            <div className="space-y-3">
              {!revealedSolution ? (
                <div className="rounded-xl border border-dashed border-amber-500/20 bg-amber-500/5 p-4 text-center">
                  <p className="font-sans text-xs text-slate-300 mb-3 leading-relaxed">
                    Review and draft the algorithmic step solution on your scratchpad first before revealing the complete source code.
                  </p>
                  <button
                    onClick={handleRevealSolution}
                    className="rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 font-sans font-bold text-white text-xs select-none shadow"
                  >
                    Reveal Model Code / Answer
                  </button>
                </div>
              ) : (
                <div className="space-y-3 animate-fade-in text-xs">
                  {selectedQuestion.optimalComplexity && (
                    <div className="flex items-center space-x-1.5 font-mono text-[10px] text-emerald-400 font-bold bg-emerald-500/5 px-2 py-1 rounded w-fit border border-emerald-500/10">
                      <Terminal className="h-3.5 w-3.5" />
                      <span>Complexity: {selectedQuestion.optimalComplexity}</span>
                    </div>
                  )}

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono leading-relaxed overflow-x-auto text-slate-300 select-all border-l-4 border-l-amber-500">
                    <pre className="text-[11px] whitespace-pre-wrap">{selectedQuestion.codeSolution}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
