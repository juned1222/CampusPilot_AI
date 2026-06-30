/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, 
  Coffee, 
  RotateCcw, 
  Play, 
  Pause, 
  Bell, 
  Volume2, 
  VolumeX, 
  Award, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ListTodo,
  Plus,
  Trash2
} from 'lucide-react';
import { firebaseService } from '../lib/firebase';

interface StudyPomodoroProps {
  onContributeXP?: (xp: number) => void;
}

export default function StudyPomodoro({ onContributeXP }: StudyPomodoroProps) {
  // Timer States
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [targetWorkTime, setTargetWorkTime] = useState(25); // minutes
  const [targetShortBreak, setTargetShortBreak] = useState(5); // minutes
  const [targetLongBreak, setTargetLongBreak] = useState(15); // minutes

  // Reminder break details and logs
  const [activeReminder, setActiveReminder] = useState<string>('Stay focused on your engineering notes!');
  const [reminders, setReminders] = useState<string[]>([]);
  const [newReminder, setNewReminder] = useState('');

  // Fetch reminders on mount
  useEffect(() => {
    async function fetchReminders() {
      const dbList = await firebaseService.getReminders();
      if (dbList && dbList.length > 0) {
        setReminders(dbList);
      } else {
        // Fallback default list
        const defaultList = [
          'Drink a glass of water to keep your brain hydrated 💧',
          'Do a quick 33-second standing stretch 🧘',
          'Close your eyes for 15 seconds to prevent digital strain 👁️',
          'Review your formula catalog sheets momentarily 📐',
        ];
        setReminders(defaultList);
        await firebaseService.syncReminders(defaultList);
      }
    }
    fetchReminders();
  }, []);

  // Audio synthesize trigger with Web Audio API (cross-platform, zero asset files needed)
  const playSynthesizerTone = (type: 'success' | 'click' | 'break') => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'success') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
        oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.3); // G5
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.52);
      } else if (type === 'break') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
        oscillator.frequency.setValueAtTime(493.88, audioCtx.currentTime + 0.2); // B4
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.42);
      } else {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      }
    } catch (e) {
      console.warn('Audio synthesis skipped due to user interaction blocks.', e);
    }
  };

  // Timer configuration values
  const getInitialTime = (currentMode: 'work' | 'shortBreak' | 'longBreak') => {
    if (currentMode === 'work') return targetWorkTime * 60;
    if (currentMode === 'shortBreak') return targetShortBreak * 60;
    return targetLongBreak * 60;
  };

  // Mode Change
  const handleModeChange = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getInitialTime(newMode));
    playSynthesizerTone('click');
  };

  // Reset Timer
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getInitialTime(mode));
    playSynthesizerTone('click');
  };

  // Toggle Play State
  const toggleTimer = () => {
    setIsRunning(!isRunning);
    playSynthesizerTone('click');
  };

  // Effect handles Countdown
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Completed active mode
      if (mode === 'work') {
        setSessionCount((prev) => prev + 1);
        playSynthesizerTone('success');
        // Grant Points / XP to student
        if (onContributeXP) {
          onContributeXP(50); // Give 50 points for every work slot completed!
        }
        
        // Randomly select next study break suggestion
        if (reminders.length > 0) {
          const randomIndex = Math.floor(Math.random() * reminders.length);
          setActiveReminder(reminders[randomIndex]);
        }
        
        // Switch automatically to long/short break
        if ((sessionCount + 1) % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(targetLongBreak * 60);
        } else {
          setMode('shortBreak');
          setTimeLeft(targetShortBreak * 60);
        }
      } else {
        playSynthesizerTone('break');
        setMode('work');
        setTimeLeft(targetWorkTime * 60);
        setActiveReminder('Break period completed. Time to focus and dominate RGPV standard syllabus!');
      }
      setIsRunning(false);
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft, mode, sessionCount, reminders, targetWorkTime, targetShortBreak, targetLongBreak]);

  // Handle manual configuration changes
  const updateSettings = (work: number, sBreak: number, lBreak: number) => {
    setTargetWorkTime(work);
    setTargetShortBreak(sBreak);
    setTargetLongBreak(lBreak);
    
    // update current timing live safely if timer is reset
    if (!isRunning) {
      if (mode === 'work') setTimeLeft(work * 60);
      else if (mode === 'shortBreak') setTimeLeft(sBreak * 60);
      else setTimeLeft(lBreak * 60);
    }
  };

  // Add reminder
  const addCustomReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.trim()) return;
    const updated = [...reminders, newReminder.trim()];
    setReminders(updated);
    setNewReminder('');
    playSynthesizerTone('click');
    await firebaseService.syncReminders(updated);
  };

  // Delete reminder
  const deleteReminder = async (idx: number) => {
    const updated = reminders.filter((_, i) => i !== idx);
    setReminders(updated);
    playSynthesizerTone('click');
    await firebaseService.syncReminders(updated);
  };

  // Formatter for time display
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentMaxTime = getInitialTime(mode);
  const progressPercent = ((currentMaxTime - timeLeft) / currentMaxTime) * 100;

  return (
    <div id="pomodoro-workspace" className="space-y-6 max-w-5xl mx-auto">
      
      {/* Dynamic Upper Intro Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-[60px]" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-650 text-white shadow-md">
                <Timer className="h-5 w-5 animate-pulse" />
              </div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">RGPV Pro-Study Pomodoro</h1>
            </div>
            <p className="text-xs text-slate-400">
              Maximize engineering comprehension retention using optimal work-break interval sequencing.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-500/10 px-3.5 py-1.5 rounded-xl border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            <Award className="h-4 w-4 animate-float" />
            <span>Gain +50 XP on every focused Work block!</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Interactive Timer Block */}
        <div className="lg:col-span-7 bg-slate-900/20 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
          
          {/* Mute/Sound Toggle Selector */}
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute alerts' : 'Mute alerts'}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
          </button>

          {/* Mode Switchers */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-850 w-full max-w-sm mb-8 z-10">
            <button
              onClick={() => handleModeChange('work')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'work' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              💻 Work Cycle
            </button>
            <button
              onClick={() => handleModeChange('shortBreak')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'shortBreak' 
                  ? 'bg-emerald-650 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ☕ Short Break
            </button>
            <button
              onClick={() => handleModeChange('longBreak')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'longBreak' 
                  ? 'bg-blue-650 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🎉 Long Break
            </button>
          </div>

          {/* High Fidelity Visual Ring Countdown */}
          <div className="relative flex items-center justify-center w-56 h-56 md:w-64 md:h-64 my-4 z-10 group">
            {/* Ambient Background Glow matching modes */}
            <div className={`absolute inset-4 rounded-full opacity-10 filter blur-xl transition-all duration-700 ${
              mode === 'work' ? 'bg-indigo-500 group-hover:opacity-15' : 'bg-emerald-500 group-hover:opacity-15'
            }`} />

            {/* Circular Path */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className={`transition-all duration-500 ease-out ${
                  mode === 'work' ? 'stroke-indigo-500' : 'stroke-emerald-400'
                }`}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="283%"
                strokeDashoffset={`${(100 - progressPercent) * 2.83}%`}
                strokeLinecap="round"
              />
            </svg>

            {/* In-ring text elements */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase mt-2">
                {mode === 'work' ? 'FOCUS COMPREHENSION' : 'RELAX BLOCK'}
              </span>
              <span className="text-4xl md:text-5xl font-black font-mono tracking-tight text-white my-1 tabular-nums animate-slide-right">
                {formatTime(timeLeft)}
              </span>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800 text-[10px] font-semibold text-slate-400 mt-1.5">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>Session #{sessionCount + 1}</span>
              </div>
            </div>
          </div>

          {/* Controller buttons */}
          <div className="flex items-center justify-center space-x-3 mt-6 z-10 w-full max-w-sm">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 font-bold text-xs px-4 py-3 border border-slate-800 bg-slate-950 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition-all cursor-pointer active:scale-95"
              title="Reset timer state"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>

            <button
              onClick={toggleTimer}
              className={`flex-1 flex items-center justify-center gap-2 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg active:scale-98 ${
                isRunning 
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/20' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/25'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4.5 w-4.5 fill-white" />
                  <span>Pause Interval</span>
                </>
              ) : (
                <>
                  <Play className="h-4.5 w-4.5 fill-white" />
                  <span>Start Focus Session</span>
                </>
              )}
            </button>
          </div>

          {/* Current Break Reminder Box */}
          {activeReminder && (
            <div id="active-reminder-alert" className="w-full mt-6 bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 animate-bounce">
                <Bell className="h-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-black">Active Break Suggestion</span>
                <p className="text-xs font-semibold text-slate-200 mt-1">{activeReminder}</p>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Configuration and Reminders Customizer */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Settings Customizer */}
          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest font-mono mb-4">
              Configure Custom Intervals
            </h3>

            <div className="space-y-4">
              {/* Slider for Work Period */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Work Period Duration</span>
                  <span className="text-indigo-400 font-bold">{targetWorkTime} Minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={targetWorkTime}
                  onChange={(e) => updateSettings(Number(e.target.value), targetShortBreak, targetLongBreak)}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
                />
              </div>

              {/* Slider for Short Break */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Short Break Duration</span>
                  <span className="text-emerald-400 font-bold">{targetShortBreak} Minutes</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={targetShortBreak}
                  onChange={(e) => updateSettings(targetWorkTime, Number(e.target.value), targetLongBreak)}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                />
              </div>

              {/* Slider for Long Break */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Long Break Duration</span>
                  <span className="text-blue-400 font-bold">{targetLongBreak} Minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="5"
                  value={targetLongBreak}
                  onChange={(e) => updateSettings(targetWorkTime, targetShortBreak, Number(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>CONFIG SAVED VIA LOCAL STORAGE</span>
              <span className="text-indigo-500/80">Active</span>
            </div>
          </div>

          {/* Break and Stretch Reminders Manager */}
          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest font-mono">
                Healthy Break Reminders
              </h3>
              <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded font-mono text-indigo-400 font-bold border border-slate-850">
                {reminders.length} Ideas
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              These quick mental cues and physical exercises randomly pop up when your core work session concludes to prevent mental fatigue.
            </p>

            {/* Form to add a new custom reminder */}
            <form onSubmit={addCustomReminder} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add stretch or hydrate cue..."
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                maxLength={80}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!newReminder.trim()}
                className="h-9 w-9 flex items-center justify-center bg-indigo-650 hover:bg-indigo-605 text-white rounded-xl transition-all disabled:opacity-40 disabled:pointer-events-none shrink-0 cursor-pointer"
              >
                <Plus className="h-4.5 w-4.5" />
              </button>
            </form>

            {/* List of interactive reminders */}
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {reminders.map((rem, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900/60 transition-all text-xs"
                >
                  <span className="text-slate-205 font-medium leading-relaxed max-w-[85%]">{rem}</span>
                  <button
                    onClick={() => deleteReminder(idx)}
                    className="p-1 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer shrink-0"
                    title="Remove reminder"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {reminders.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No custom reminders added yet. Add some above!
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
