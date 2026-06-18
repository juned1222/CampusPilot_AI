/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { HelpCircle, Star, Sparkles, BookOpen, User, Send, CheckCircle2, Award, ChevronRight, MessageSquare, AlertCircle } from 'lucide-react';
import { SUBJECTS, SAMPLE_VIVAQA } from '../sampleData';

interface VivaPrepProps {
  selectedSubjectForViva: string;
  setSelectedSubjectForViva: (code: string) => void;
  onContributeXP: (points: number) => void;
}

export default function VivaPrep({
  selectedSubjectForViva,
  setSelectedSubjectForViva,
  onContributeXP
}: VivaPrepProps) {
  const [activeSubject, setActiveSubject] = useState(selectedSubjectForViva || 'BT101');
  const [activeLevelFilter, setActiveLevelFilter] = useState<'All' | 'Easy' | 'Medium' | 'External Examiner Level'>('All');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Interactive Mock Booth State
  const [boothStarted, setBoothStarted] = useState(false);
  const [isEvaluatingBooth, setIsEvaluatingBooth] = useState(false);
  const [feedbackScore, setFeedbackScore] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [hintText, setHintText] = useState('');
  const [studentAnswerText, setStudentAnswerText] = useState('');
  const [boothStage, setBoothStage] = useState(0); 
  const [examinerStyle, setExaminerStyle] = useState('The Strict External');
  const [currentQuestionText, setCurrentQuestionText] = useState('Why is Hard water specifically dangerous when supplied directly to high-pressure thermal boilers?');
  const [examinerMood, setExaminerMood] = useState('Neutral');
  const [difficultyLevel, setDifficultyLevel] = useState('Medium');
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);

  // Subjects for Viva prep selection list (covers all required first-year and core list)
  const vivaSubjectsList = useMemo(() => {
    return SUBJECTS.filter(s => ['BT101', 'BT104', 'BT105', 'CS301', 'bt102', 'cs701'].includes(s.code.toLowerCase()) || s.id === 'bt101');
  }, []);

  const selectedSubjectData = useMemo(() => {
    return SUBJECTS.find(s => s.code === activeSubject) || SUBJECTS[0];
  }, [activeSubject]);

  // Filters questions based on selection
  const filteredQuestions = useMemo(() => {
    return SAMPLE_VIVAQA.filter(q => {
      const matchSub = q.subjectCode === activeSubject;
      const matchLvl = activeLevelFilter === 'All' || q.difficulty === activeLevelFilter;
      return matchSub && matchLvl;
    });
  }, [activeSubject, activeLevelFilter]);

  const toggleAnswerReveal = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartBooth = () => {
    setBoothStarted(true);
    setFeedbackScore(null);
    setFeedbackText('');
    setHintText('');
    setStudentAnswerText('');
    setBoothStage(0);
    setQuestionHistory([]);
    setExaminerMood('Encouraged');
    setDifficultyLevel('Medium');
    
    // Set typical intro question matching the course
    if (activeSubject === 'BT101') {
      setCurrentQuestionText('Why is Hard water specifically dangerous when supplied directly to high-pressure thermal boilers?');
    } else if (activeSubject === 'BT104') {
      setCurrentQuestionText('What are the advantages of silicon steel laminations inside structural transformers?');
    } else if (activeSubject === 'CS301') {
      setCurrentQuestionText('What is the role of balance factors inside AVL self-balancing binary search trees?');
    } else {
      setCurrentQuestionText('Explain how boundary conditions affect structural integrations in engineering mathematics.');
    }
  };

  const submitStudentAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswerText.trim() || isEvaluatingBooth) return;

    setIsEvaluatingBooth(true);
    setFeedbackScore(null);
    setFeedbackText('');
    setHintText('');

    try {
      const response = await fetch('/api/viva-examiner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectCode: activeSubject,
          examinerStyle,
          questionHistory: [...questionHistory, { question: currentQuestionText, answer: studentAnswerText }],
          currentAnswer: studentAnswerText
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Update history
        setQuestionHistory(prev => [...prev, { question: currentQuestionText, answer: studentAnswerText }]);
        
        // Map feedback states
        const adjustmentRaw = data.scoreAdjustment || 10; // score e.g. 10
        // Fit onto scale 1-10
        const parsedBaseScore = Math.max(1, Math.min(10, Math.floor(5 + (adjustmentRaw / 4))));
        
        setFeedbackScore(parsedBaseScore);
        setFeedbackText(data.feedback || 'Reasonable explanation.');
        setHintText(data.hint || '');
        setDifficultyLevel(data.difficulty || 'Medium');
        setExaminerMood(data.examinerMood || 'Neutral');

        // Set next question state
        if (data.nextQuestion) {
          setCurrentQuestionText(data.nextQuestion);
        }

        // Reward XP points for mock drilling
        onContributeXP(50);
      }
    } catch (error) {
      console.error('Error submitting student answer to examiner helper:', error);
    } finally {
      setIsEvaluatingBooth(false);
    }
  };

  const handleNextBoothQuestion = () => {
    setFeedbackScore(null);
    setFeedbackText('');
    setHintText('');
    setStudentAnswerText('');
    setBoothStage(prev => prev + 1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="rounded-2xl border border-pink-500/10 bg-slate-900/30 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-pink-500/10 p-2 text-pink-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans text-lg font-bold text-white">Viva Preparation Center</h1>
              <p className="text-xs text-slate-400">
                Study common questions or interface with the AI Simulated Board to practice follow-up drills.
              </p>
            </div>
          </div>

          {/* Subject picker */}
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[9px] text-slate-500 uppercase">Subject:</span>
            <select
              value={activeSubject}
              onChange={(e) => {
                setActiveSubject(e.target.value);
                setSelectedSubjectForViva(e.target.value);
              }}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:border-pink-500 focus:outline-none"
            >
              {vivaSubjectsList.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main split: Question list & AI Mock booth */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Study questions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/10 p-3 rounded-xl border border-slate-850">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
              Exam Questions Bank ({filteredQuestions.length})
            </span>

            {/* Difficulty Tabs */}
            <div className="flex items-center space-x-1">
              {['All', 'Easy', 'Medium', 'External Examiner Level'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevelFilter(lvl as any)}
                  className={`rounded px-2.5 py-0.5 text-[9px] font-bold uppercase transition-colors ${
                    activeLevelFilter === lvl
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl === 'External Examiner Level' ? 'SOS Level' : lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500 bg-slate-950/45">
                No matched specific viva questions for this subject. Try switching subjects or level filters!
              </div>
            ) : (
              filteredQuestions.map((vq) => {
                const isRevealed = !!revealedAnswers[vq.id];
                return (
                  <div key={vq.id} className="rounded-xl border border-slate-850 bg-slate-900/10 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`rounded-xl px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase ${
                          vq.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/10' :
                          vq.difficulty === 'Medium' ? 'bg-orange-500/15 text-orange-400 border border-orange-500/10' :
                          'bg-red-500/15 text-red-400 border border-red-500/10 animate-pulse'
                        }`}>
                          {vq.difficulty}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500">
                          Frequency Index: <strong className="text-slate-300">{vq.frequencyIndex}/10</strong>
                        </span>
                      </div>
                    </div>

                    <h3 className="font-sans text-xs font-bold text-slate-200 leading-relaxed">
                      {vq.question}
                    </h3>

                    {/* Examiner Insight alert */}
                    <div className="rounded-lg bg-indigo-500/5 p-2.5 text-[11px] leading-relaxed text-slate-300 border border-indigo-500/10 flex items-start">
                      <AlertCircle className="mr-1.5 h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Examiner Trap Insight:</strong>
                        {vq.examinerInsight}
                      </div>
                    </div>

                    {/* Model Answer Collapse */}
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleAnswerReveal(vq.id)}
                        className="font-sans text-[11.5px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
                      >
                        {isRevealed ? '▲ Collapse Ideal Model Answer' : '▼ Reveal Ideal Model Answer'}
                      </button>

                      {isRevealed && (
                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs leading-relaxed text-slate-400 animate-fade-in">
                          <strong className="text-emerald-400 block mb-1">Standard Model Answer:</strong>
                          {vq.answer}
                          
                          {/* Follow-up recommendation */}
                          <div className="mt-3.5 border-t border-slate-900 pt-2 text-[10px] font-mono text-purple-400">
                            ⭐ Likely follow-up question: <span className="text-slate-300 italic">"{vq.followUpQuestion}"</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* AI Simulated Mock interview board booth */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/15 p-4 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-850 pb-3">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                Interactive Mock Interview
              </h3>
            </div>

            {!boothStarted ? (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400">
                  <User className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <h4 className="font-sans text-xs font-bold text-slate-200">RGPV Virtual Examiner Booth</h4>
                  <p className="text-[11px] text-slate-400 leading-normal max-w-[200px] mx-auto">
                    Practice answering questions under simulated external examiner pressure.
                  </p>
                  
                  <div className="text-left max-w-xs mx-auto space-y-1.5 pt-2">
                    <label className="block text-[10px] uppercase font-mono text-slate-500">Examiner Personality:</label>
                    <select
                      value={examinerStyle}
                      onChange={(e) => setExaminerStyle(e.target.value)}
                      className="w-full rounded-lg border border-slate-850 bg-slate-950 p-2 text-xs text-slate-200 focus:outline-none focus:border-pink-500"
                    >
                      <option value="The Strict External">The Strict External (Needs direct terms)</option>
                      <option value="The Friendly Professor">The Friendly Professor (Gives smart hints)</option>
                      <option value="The Curious Scholar">The Curious Scholar (Digs deep into derivations)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleStartBooth}
                  className="rounded-xl bg-pink-500 hover:bg-pink-600 px-4 py-2.5 text-xs font-bold text-white transition-opacity inline-flex items-center cursor-pointer shadow-md"
                >
                  Enter Practice Booth
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in text-xs">
                {/* Board Profile */}
                <div className="flex items-center justify-between rounded-lg bg-pink-500/5 p-2.5 border border-pink-500/10">
                  <div className="flex items-center space-x-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-bold font-mono">
                      EX
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-slate-200">
                        {examinerStyle === 'The Strict External' ? 'Prof. S. R. Chaurasia' : examinerStyle === 'The Friendly Professor' ? 'Dr. Neha Verma' : 'Dr. Alok Saxena'}
                      </h5>
                      <p className="text-[9px] text-slate-400 font-mono">{examinerStyle} · {selectedSubjectData.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] uppercase font-mono text-slate-500">Examiner Mood:</span>
                    <span className="text-[9.5px] font-bold text-pink-400 font-sans">{examinerMood}</span>
                  </div>
                </div>

                {/* Score and level indicators */}
                <div className="flex justify-between items-center text-[10.5px] font-mono border-b border-slate-850 pb-2">
                  <span className="text-slate-500">Difficulty: <strong className="text-indigo-400">{difficultyLevel}</strong></span>
                  <span className="text-slate-500">History: <strong className="text-slate-350">{questionHistory.length} turns</strong></span>
                </div>

                {/* Question */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 leading-normal text-slate-300">
                  <span className="font-mono text-[9px] text-pink-400 uppercase tracking-wide block mb-1">
                    Examiner asks:
                  </span>
                  <p className="font-sans font-semibold text-slate-100">
                    "{currentQuestionText}"
                  </p>
                </div>

                {/* Answer form */}
                {!feedbackScore ? (
                  <form onSubmit={submitStudentAnswer} className="space-y-3">
                    <textarea
                      placeholder="Type your explanation using scientific key parameters..."
                      value={studentAnswerText}
                      onChange={(e) => setStudentAnswerText(e.target.value)}
                      required
                      disabled={isEvaluatingBooth}
                      className="w-full h-24 rounded-lg border border-slate-850 bg-slate-900 p-2 text-xs text-slate-200 focus:border-pink-500 focus:outline-none placeholder-slate-500 disabled:opacity-50"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-slate-500">Examiner style is active. Attempt your best!</span>
                      <button
                        type="submit"
                        disabled={isEvaluatingBooth}
                        className="rounded-xl bg-indigo-505 bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 font-sans font-bold text-white flex items-center text-[11px] disabled:opacity-50"
                      >
                        {isEvaluatingBooth ? 'Evaluating...' : 'Submit Answer'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 animate-fade-in border-t border-slate-850 pt-3">
                    {/* Score feedback wrap */}
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-bold text-slate-300 block">Board Critique Score:</span>
                      <div className="flex items-center space-x-1.5 bg-indigo-500/15 border border-indigo-500/15 px-2.5 py-1 rounded">
                        <Award className="h-4 w-4 text-indigo-400 fill-indigo-400/10" />
                        <span className="font-mono text-xs font-black text-indigo-400">{feedbackScore} / 10</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-900">
                      <strong>AI Evaluation:</strong> {feedbackText}
                    </p>

                    {/* Hint / clue alert inside the card */}
                    {hintText && (
                      <div className="rounded-lg bg-orange-500/10 p-2.5 text-[10.5px] leading-relaxed text-slate-300 border border-orange-500/15">
                        <span className="font-extrabold uppercase font-mono text-[9px] text-orange-400 block mb-0.5">⚠️ Examiner Clue For You:</span>
                        {hintText}
                      </div>
                    )}

                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={handleNextBoothQuestion}
                        className="flex-1 rounded-xl bg-pink-500 hover:bg-pink-600 py-2 text-center font-sans font-bold text-white transition-all text-xs cursor-pointer shadow-md"
                      >
                        Accept & Load Next Question
                      </button>
                      <button
                        onClick={() => setBoothStarted(false)}
                        className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs cursor-pointer"
                      >
                        Quit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
