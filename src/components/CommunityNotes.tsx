/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Upload,
  Heart,
  Download,
  FileText,
  CheckCircle,
  HelpCircle,
  Plus,
  RefreshCw,
  Award,
  BookMarked,
  Sparkles,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';
import { SUBJECTS, SAMPLE_NOTES } from '../sampleData';

interface CommunityNotesProps {
  onContributeXP: (points: number) => void;
}

export default function CommunityNotes({ onContributeXP }: CommunityNotesProps) {
  const [filterSubject, setFilterSubject] = useState<'All' | string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotes, setActiveNotes] = useState(SAMPLE_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string>(SAMPLE_NOTES[0].id);
  
  // Flashcard flip tracker: map of cardIndex -> boolean
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Note uploading inputs
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState('BT101');
  const [uploadType, setUploadType] = useState<'PDF' | 'Handwritten Scan'>('Handwritten Scan');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Selected Note detail
  const selectedNote = useMemo(() => {
    return activeNotes.find(n => n.id === selectedNoteId) || activeNotes[0];
  }, [selectedNoteId, activeNotes]);

  // Reset card flips when note selection changes
  const handleNoteChange = (id: string) => {
    setSelectedNoteId(id);
    setFlippedCards({});
  };

  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Upload actions
  const handleCreateNoteSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsUploading(true);

    try {
      const response = await fetch('/api/notes-scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteTitle: uploadTitle,
          rawContent: `Student handwritten scan regarding engineering course. Subject: ${uploadSubject}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        const newNote = {
          id: `note_custom_${Date.now()}`,
          subjectCode: uploadSubject,
          title: uploadTitle,
          author: 'You (Rahul RGPV)',
          authorYear: '1st Year Mech',
          likes: 5,
          downloads: 1,
          fileSize: '1.2 MB',
          fileType: uploadType as any,
          topicsCovered: data.topicsExtracted || ['Concept Mapped'],
          aiSummary: data.aiSummary || 'Analysis complete.',
          flashcards: data.flashcards || [],
          createdAt: 'Just Now'
        };

        setActiveNotes(prev => [newNote, ...prev]);
        handleNoteChange(newNote.id);
        
        // Reward XP immediately!
        onContributeXP(150);
      }
    } catch (err) {
      console.error('Notes scanner failed, using simulated helper:', err);
    } finally {
      setIsUploading(false);
      setShowUploadModal(false);
      setUploadTitle('');
    }
  };

  // Like notes
  const handleLikeNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveNotes(prev => prev.map(note => note.id === noteId ? { ...note, likes: note.likes + 1 } : note));
  };

  const handleDownloadNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveNotes(prev => prev.map(note => note.id === noteId ? { ...note, downloads: note.downloads + 1 } : note));
  };

  // Filter notes
  const filteredNotes = useMemo(() => {
    return activeNotes.filter(n => {
      const matchSub = filterSubject === 'All' || n.subjectCode === filterSubject;
      const matchQuery = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.topicsCovered.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSub && matchQuery;
    });
  }, [activeNotes, filterSubject, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Header and Action Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans text-lg font-bold text-white">Community Notes Hub</h1>
              <p className="text-xs text-slate-400">
                Access peer files and automated AI-driven flashcard sequences, revision sheets & summaries.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md active:scale-95"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Contribute Handwritten Scan / PDF
          </button>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-800/65 pt-4">
          <button
            onClick={() => setFilterSubject('All')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold font-mono ${
              filterSubject === 'All' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-900/40'
            }`}
          >
            ALL
          </button>
          {['BT101', 'BT104', 'BT105', 'CS301'].map(sub => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold font-mono uppercase ${
                filterSubject === sub ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-900/40'
              }`}
            >
              {sub}
            </button>
          ))}
          <div className="relative max-w-xs flex-1 ml-auto">
            <Search className="absolute top-2 left-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search active notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-850 bg-slate-950 py-1 pr-3 pl-8 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Col notes list. Right Col selected note AI intelligence preview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notes Listings */}
        <div className="space-y-3 lg:col-span-1">
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">
            Browse Contributed Resources ({filteredNotes.length})
          </h2>

          <div className="space-y-2.5">
            {filteredNotes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-805 p-6 text-center text-xs text-slate-500 bg-slate-950">
                No active notes match filters. Submit yours or adjust criteria!
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isSelected = selectedNote.id === note.id;
                return (
                  <div
                    key={note.id}
                    onClick={() => handleNoteChange(note.id)}
                    className={`group cursor-pointer rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/5 shadow-md shadow-indigo-500/5'
                        : 'border-slate-850 bg-slate-900/10 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-indigo-400 bg-indigo-500/5 px-1.5 py-0.5 rounded uppercase">
                        {note.subjectCode}
                      </span>
                      <span className="font-mono text-[9px] text-slate-500 bg-slate-950 px-1 py-0.5 rounded">
                        {note.fileType}
                      </span>
                    </div>

                    <h3 className="mt-2 font-sans text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2">
                      {note.title}
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-400 font-mono truncate">By {note.author} ({note.authorYear})</p>

                    <div className="mt-3.5 border-t border-slate-850 pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center space-x-3.5">
                        <button
                          type="button"
                          onClick={(e) => handleLikeNote(note.id, e)}
                          className="flex items-center hover:text-rose-400 transition-colors"
                        >
                          <Heart className="mr-1 h-3.5 w-3.5 text-rose-500/70 hover:fill-rose-500" />
                          {note.likes}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDownloadNote(note.id, e)}
                          className="flex items-center hover:text-emerald-400 transition-colors"
                        >
                          <Download className="mr-1 h-3.5 w-3.5 text-emerald-500/70" />
                          {note.downloads}
                        </button>
                      </div>
                      <span className="font-mono text-[9px] text-slate-500">{note.fileSize}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected note AI extraction preview */}
        <div className="lg:col-span-2 space-y-6">
          {selectedNote ? (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                      AI Generated Extraction Summary
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 font-bold uppercase">
                    Continuous OCR active
                  </span>
                </div>

                <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-300">
                  <h4 className="font-bold text-white mb-2">{selectedNote.title}</h4>
                  <p>{selectedNote.aiSummary}</p>
                </div>

                {/* Topics discovered badges */}
                <div className="mt-4 pt-3.5 border-t border-slate-850/60 flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 mr-1.5">Topics Extracted:</span>
                  {selectedNote.topicsCovered.map((topic, idx) => (
                    <span key={idx} className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 font-mono text-[10px] text-indigo-300 font-semibold">
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flashcards interactive flipping block */}
              <div className="rounded-2xl border border-slate-850 bg-slate-900/10 p-5">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <BookMarked className="h-4 w-4 text-pink-400" />
                    <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                      Interactive AI Flashcard Deck ({selectedNote.flashcards.length})
                    </h3>
                  </div>
                  <span className="font-sans text-[10px] text-slate-400 font-semibold italic">Click card to Flip</span>
                </div>

                {/* Grid of cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedNote.flashcards.map((fc, index) => {
                    const isFlipped = !!flippedCards[index];
                    return (
                      <div
                        key={index}
                        onClick={() => toggleCardFlip(index)}
                        className="relative h-44 cursor-pointer perspective"
                      >
                        {/* Wrapper for flip */}
                        <div
                          className={`w-full h-full duration-500 preserve-3d relative ${
                            isFlipped ? 'rotate-y-180' : ''
                          }`}
                        >
                          {/* Front Side */}
                          <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between font-mono text-[9px] text-pink-400 font-bold uppercase">
                              <span>Flashcard {index + 1}</span>
                              <span className="bg-pink-500/10 px-1 py-0.5 rounded">Question</span>
                            </div>
                            <p className="font-sans text-xs font-bold text-slate-100 leading-normal my-auto">
                              {fc.question}
                            </p>
                            <span className="font-mono text-[9.5px] text-slate-500 text-center uppercase tracking-wide">
                              ⇄ Click to reveal answer
                            </span>
                          </div>

                          {/* Back Side */}
                          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl border border-pink-500/30 bg-purple-950/20 p-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between font-mono text-[9px] text-emerald-400 font-bold uppercase">
                              <span>Memory Vault</span>
                              <span className="bg-emerald-500/10 px-1 py-0.5 rounded">Answer</span>
                            </div>
                            <p className="font-sans text-[11px] font-semibold text-slate-300 leading-normal my-auto">
                              {fc.answer}
                            </p>
                            <span className="font-mono text-[9.5px] text-pink-400 text-center uppercase tracking-wide">
                              ⇄ Click to return back
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Automated Revision Sheet summary Checklist */}
              <div className="rounded-2xl border border-slate-850 bg-slate-900/10 p-5">
                <div className="flex items-center space-x-2 border-b border-slate-850 pb-3 mb-4">
                  <ClipboardCheck className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                    Automated Last Minute Revision Sheet Checklist
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start text-xs text-slate-300 gap-2.5">
                    <CheckCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Formulate & Master EDTA titrations:</strong>
                      <p className="text-[11.5px] text-slate-400 mt-0.5 leading-normal">Simplify raw hard water calculations by converting temp and perm salts into equivalents weight index. Memorize buffer factors perfectly.</p>
                    </div>
                  </div>
                  <div className="flex items-start text-xs text-slate-300 gap-2.5">
                    <CheckCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Re-verify boiler safety valves chemical treatment:</strong>
                      <p className="text-[11.5px] text-slate-400 mt-0.5 leading-normal">Scale vs Sludge forms the core baseline theory. Review carbonate conditioning, Calgon limits, and sodium phosphate precipitates.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center text-slate-500 text-xs">
              Select or Upload notes to unlock AI Summary extraction, automated flashcards & digests instantly!
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal (Simulation form) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <h3 className="font-sans text-sm font-bold text-white mb-4">Contribute Study Material</h3>
            
            <form onSubmit={handleCreateNoteSubmission} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Note Title / Subject Focus</label>
                <input
                  type="text"
                  placeholder="e.g. EDTA Calculations Cheat Sheet & Diagrams..."
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Subject Code</label>
                  <select
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                  >
                    {SUBJECTS.map(s => (
                      <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Material Format</label>
                  <select
                    value={uploadType}
                    onChange={(e: any) => setUploadType(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Handwritten Scan">Handwritten Scan</option>
                    <option value="PDF">Standard PDF Note</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950 p-4 text-center text-xs">
                <Upload className="mx-auto h-6 w-6 text-slate-500 mb-2" />
                <span className="block text-slate-400">Drag or click to attach image papers/scans PDF</span>
                <span className="block text-[9px] text-indigo-400 uppercase font-black tracking-wide mt-1">Guarantees +150 XP on approval</span>
              </div>

              <div className="flex items-center justify-end space-x-3.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="rounded-xl bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-opacity disabled:opacity-55"
                >
                  {isUploading ? '📤 AI Extracting & Summarising...' : 'Submit Note Paper'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
