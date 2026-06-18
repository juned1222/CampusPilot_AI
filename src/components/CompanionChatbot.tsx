import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Zap,
  Brain,
  Search,
  BookOpen,
  User,
  GraduationCap,
  ShieldAlert,
  Sliders,
  Terminal,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react';

interface CompanionChatbotProps {
  onContributeXP?: (p: number) => void;
}

export default function CompanionChatbot({ onContributeXP }: CompanionChatbotProps) {
  // Chat dialogue state
  const [messages, setMessages] = useState<any[]>([
    {
      sender: 'bot',
      text: "Hello! I am your **CampusPilot Academic Assistant**. How can I help you clear your engineering doubts or prepare for standard RGPV exams today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Configuration sliders
  const [selectedRole, setSelectedRole] = useState<'syllabus-guide' | 'strict-examiner' | 'friendly-mentor' | 'code-review'>('friendly-mentor');
  const [selectedMode, setSelectedMode] = useState<'standard' | 'low-latency' | 'high-thinking' | 'grounded-search' | 'complex-pro'>('standard');
  const [showConfig, setShowConfig] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Quick Action triggers
  const promptTemplates = [
    { text: "Draft unit-wise formula checklist for BT101 Titration.", label: "EDTA Checklist" },
    { text: "Trace Superposition theorem proof with loop details.", label: "Superposition Proof" },
    { text: "Draft recursive function to trace cycle in a Directed Graph.", label: "Cycle Detection" },
    { text: "Explain LL & LR rotations inside AVL Trees.", label: "AVL Tree Rotations" }
  ];

  // Map roles to human-friendly configurations
  const roleConfig = {
    'syllabus-guide': {
      title: 'Syllabus Guardian',
      icon: GraduationCap,
      desc: 'Direct unit matching, expected marks weighting, and official formulas.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    'strict-examiner': {
      title: 'Prof. S. R. Chaurasia',
      icon: ShieldAlert,
      desc: 'Strict board evaluator who demands precise terminology, standard units, and perfect derivations.',
      color: 'text-red-400 bg-red-500/10 border-red-500/20'
    },
    'friendly-mentor': {
      title: 'Dr. Neha Verma',
      icon: BookOpen,
      desc: 'Caring visual tutor specializing in simple analogies, real-world models, and grade-building checks.',
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    },
    'code-review': {
      title: 'DSA Practice Lead',
      icon: Terminal,
      desc: 'Silicon Valley logic checks, recursion trace graphs, and competitive placement tips.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Append user message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/companion-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          mode: selectedMode,
          role: selectedRole
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: data.text,
          sources: data.groundingSources,
          modelUsed: data.modelUsed,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        // Reward study engagement points
        if (onContributeXP) {
          onContributeXP(15);
        }
      } else {
        throw new Error('Server returned error');
      }
    } catch (err) {
      console.error('Companion Chat Error:', err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "🚨 **Connection error**: I encountered an issue reaching the CampusPilot gateway. Please try sending your query again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: `Hello! I have loaded the custom **${roleConfig[selectedRole].title}** mind using the **${selectedMode}** engine. How can I help you excel in your studies today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Visual Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-400 animate-pulse" />
            Professor Gemini & doubt solver
          </h2>
          <p className="text-xs text-slate-400">
            Multi-turn conversation playground with custom persona overlays and switchable reasoning models.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Active Model pill indicator */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 font-mono flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
            </span>
            Engine: <span className="text-indigo-400 font-bold capitalize">{selectedMode.replace('-', ' ')}</span>
          </div>

          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
              showConfig ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            Configure Mind
          </button>

          <button
            onClick={clearChat}
            className="rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset Conversation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Config Panel Drawer */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-4 shadow-xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personas picker */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Assistant Role Presets
                </label>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                  {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((roleKey) => {
                    const r = roleConfig[roleKey];
                    const IconObj = r.icon;
                    return (
                      <button
                        key={roleKey}
                        onClick={() => {
                          setSelectedRole(roleKey);
                          // Post notification or log
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                          selectedRole === roleKey
                            ? 'bg-slate-900 border-indigo-500/40'
                            : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded-lg ${r.color}`}>
                            <IconObj className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-bold text-slate-200">{r.title}</span>
                        </div>
                        <p className="mt-1 text-[10px] text-slate-400 leading-normal">{r.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Engine Picker */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Gemini Reasoning Engines
                </label>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Balanced Standard (gemini-3.5-flash) */}
                    <button
                      onClick={() => setSelectedMode('standard')}
                      className={`p-2 rounded-xl text-left border text-xs cursor-pointer ${
                        selectedMode === 'standard' ? 'bg-indigo-950/20 border-indigo-505 border-indigo-500' : 'bg-slate-950 border-slate-850 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-slate-200 font-bold mb-0.5">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> Standard
                      </div>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">Balanced 3.5 Flash tutor</span>
                    </button>

                    {/* Low Latency (gemini-3.1-flash-lite) */}
                    <button
                      onClick={() => setSelectedMode('low-latency')}
                      className={`p-2 rounded-xl text-left border text-xs cursor-pointer ${
                        selectedMode === 'low-latency' ? 'bg-cyan-950/20 border-cyan-500' : 'bg-slate-950 border-slate-850 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-slate-200 font-bold mb-0.5">
                        <Zap className="h-3.5 w-3.5 text-cyan-400" /> Low Latency
                      </div>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">Lightning 3.1 Flash-Lite response</span>
                    </button>

                    {/* Grounded Search (gemini-3.5-flash + Google Search) */}
                    <button
                      onClick={() => setSelectedMode('grounded-search')}
                      className={`p-2 rounded-xl text-left border text-xs cursor-pointer ${
                        selectedMode === 'grounded-search' ? 'bg-emerald-950/20 border-emerald-500' : 'bg-slate-950 border-slate-850 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-slate-200 font-bold mb-0.5">
                        <Search className="h-3.5 w-3.5 text-emerald-400" /> Search Grounded
                      </div>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">Real-time up to date web details</span>
                    </button>

                    {/* High Thinking (gemini-3.1-pro-preview with HIGH thinkingLevel) */}
                    <button
                      onClick={() => setSelectedMode('high-thinking')}
                      className={`p-2 rounded-xl text-left border text-xs cursor-pointer ${
                        selectedMode === 'high-thinking' ? 'bg-purple-950/20 border-purple-500' : 'bg-slate-950 border-slate-850 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-slate-200 font-bold mb-0.5">
                        <Brain className="h-3.5 w-3.5 text-purple-400" /> HIGH Thinking Mode
                      </div>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">Full reasoning 3.1 Pro mind</span>
                    </button>
                  </div>

                  <div className="rounded-lg bg-indigo-950/10 border border-indigo-900/15 p-2 text-[10.5px] text-slate-400 flex items-start gap-1.5">
                    <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>
                      {selectedMode === 'high-thinking' && "💡 High Thinking Mode uses Pro model to solve your most absolute complex algorithms, math equations, and long proofs. No token limits apply."}
                      {selectedMode === 'grounded-search' && "🔍 Grounded Search accesses the Google Search index to verify real-world dates, syllabus announcements, and current university notifications."}
                      {selectedMode === 'low-latency' && "⚡ Low Latency uses Flash-Lite to reply within millisecond margins. Best for immediate query clarifying."}
                      {selectedMode === 'standard' && "🌟 Balanced default model handles unit-wise summaries with high accuracy and high speed."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Chat Box Layout */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 flex flex-col h-[520px] overflow-hidden">
        {/* Chat window Header */}
        <div className="px-4 py-3 border-b border-slate-850 bg-slate-950/40 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`p-1.5 rounded-lg text-xs ${roleConfig[selectedRole].color}`}>
              {React.createElement(roleConfig[selectedRole].icon, { className: 'h-4 w-4' })}
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-250 text-slate-200">
                Talking to: {roleConfig[selectedRole].title}
              </h4>
              <p className="text-[9.5px] font-mono text-slate-500">
                Channel: <span className="text-indigo-400">{selectedMode} model</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 block animate-ping"></span>
            <span className="text-[10px] uppercase font-mono text-slate-400">Online</span>
          </div>
        </div>

        {/* Messaging Box */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col space-y-1 max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto items-end animate-slide-in' : 'mr-auto items-start animate-fade-in'
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed font-sans ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900 text-slate-205 text-slate-300 border border-slate-850 rounded-bl-none'
                }`}
              >
                {/* Parse basics for Markdown */}
                <p className="whitespace-pre-line">
                  {m.text}
                </p>

                {/* Grounded Web Sources citation chip */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-1.5 self-stretch">
                    <span className="block text-[8.5px] uppercase font-mono text-emerald-400 font-extrabold flex items-center gap-1">
                      <Search className="h-2.5 w-2.5" /> Grounded Search Citations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.sources.map((src: any, sIdx: number) => (
                        <a
                          key={sIdx}
                          href={src.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-[9.5px] bg-slate-950 hover:bg-slate-850 px-2 py-1 rounded-lg text-slate-350 hover:text-white border border-slate-800 gap-1 pr-1.5"
                        >
                          <span className="max-w-[130px] truncate">{src.title}</span>
                          <ExternalLink className="h-2 w-2 text-indigo-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Timestamp & Meta elements */}
              <div className="flex items-center space-x-1.5 text-[9px] text-slate-500 font-mono">
                <span>{m.timestamp}</span>
                {m.modelUsed && (
                  <>
                    <span>•</span>
                    <span className="text-[8px] bg-indigo-950/20 border border-indigo-900/10 text-indigo-400 px-1 rounded">
                      {m.modelUsed}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex space-x-2 mr-auto items-start max-w-[85%] animate-pulse">
              <div className="bg-slate-900 border border-slate-850 p-3 rounded-2xl rounded-bl-none flex items-center space-x-2">
                <span className="inline-block h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce" />
                <span className="inline-block h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-slate-450 font-mono text-indigo-400 font-bold ml-1">
                  {selectedMode === 'high-thinking' ? 'AI reasoning...' : selectedMode === 'grounded-search' ? 'Searching web...' : 'Compiling response...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Starter template pill overlays */}
        {messages.length < 3 && (
          <div className="p-3 border-t border-slate-850 bg-slate-950/20 flex flex-wrap gap-1.5">
            {promptTemplates.map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(t.text)}
                className="text-[10px] bg-slate-900 hover:bg-indigo-650/15 border border-slate-800 hover:border-indigo-500/25 text-slate-300 hover:text-indigo-300 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer inline-flex items-center shrink-0"
              >
                {t.label}
                <ChevronRight className="ml-0.5 h-2.5 w-2.5" />
              </button>
            ))}
          </div>
        )}

        {/* Input Form container */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputVal);
          }}
          className="p-3 border-t border-slate-850 bg-slate-950/40 flex items-center space-x-2 shrink-0"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
            placeholder={`Ask ${roleConfig[selectedRole].title} anything...`}
            className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500 disabled:opacity-40"
          />

          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="p-2 bg-indigo-650 hover:bg-indigo-500 text-white rounded-xl transition-colors shrink-0 disabled:opacity-40 cursor-pointer flex items-center justify-center font-bold text-xs"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Gamification Tip Banner */}
      <div className="rounded-xl bg-indigo-500/5 border border-indigo-500/10 p-3 flex items-start gap-2.5">
        <Sparkles className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h5 className="text-xs font-semibold text-slate-200">Study gamification active!</h5>
          <p className="text-[10px] text-slate-400 leading-normal">
            Every chat interaction grants **+15 XP contribution points** towards unlocking academic master rank badges!
          </p>
        </div>
      </div>
    </div>
  );
}
