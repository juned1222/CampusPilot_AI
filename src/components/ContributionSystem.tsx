/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Flame, BookOpen, CheckCircle, Star, Users, Upload, RefreshCw, Trophy, Sparkles } from 'lucide-react';
import { CORE_BADGES, INITIAL_LEADERBOARD } from '../sampleData';

interface ContributionSystemProps {
  userPoints: number;
  userRank: number;
  onContributeXP: (points: number) => void;
  unlockedBadgeIds: string[];
}

export default function ContributionSystem({
  userPoints,
  userRank,
  onContributeXP,
  unlockedBadgeIds
}: ContributionSystemProps) {
  const [contributionType, setContributionType] = useState('notes');
  const [title, setTitle] = useState('');
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleContributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Grant standard XP based on resource
      let bonus = 100;
      if (contributionType === 'pyqs') bonus = 120;
      if (contributionType === 'notes') bonus = 150;

      onContributeXP(bonus);
      setIsSubmitting(false);
      setSuccessMsg(true);

      // Clean inputs
      setTitle('');
      setFileName('');
      setDescription('');

      // Auto clear alert
      setTimeout(() => setSuccessMsg(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="rounded-2xl border border-indigo-500/10 bg-slate-900/30 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans text-lg font-bold text-white">Community Contribution Engine</h1>
              <p className="text-xs text-slate-400">
                Earn XP points, unlock epic contributor badges, and claim your place on the Campus Leaderboard deck!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success alert XP float */}
      {successMsg && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 animate-bounce text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-slate-200">
              Your contribution was uploaded and approved successfully! <strong>+150 XP</strong> has been credited to your Giga Brain stats!
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-extrabold uppercase">Unlocked standard criteria</span>
        </div>
      )}

      {/* Main Split Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Side: Upload Contribution Form */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <Upload className="mr-1.5 h-4 w-4 text-indigo-400" />
              Contribute Academic Materials
            </h2>

            <form onSubmit={handleContributeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Contribution Category</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'notes', name: 'Handwritten Notes / scans (+150 XP)' },
                    { id: 'pyqs', name: 'MST / End-sem PYQs (+120 XP)' },
                    { id: 'experiences', name: 'Viva Questions (+100 XP)' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setContributionType(sub.id)}
                      className={`rounded-xl p-2.5 text-center font-sans font-semibold border transition-all ${
                        contributionType === sub.id
                          ? 'bg-indigo-500/15 border-indigo-500 text-indigo-400'
                          : 'border-slate-850 bg-slate-950 text-slate-400 hover:border-slate-800'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Document Title / Topic</label>
                <input
                  type="text"
                  placeholder="e.g. BEEE Superposition theorem numerical sheets, Dec 2025 MST paper..."
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">File Identifier (Simulated name)</label>
                  <input
                    type="text"
                    placeholder="e.g. unit_1_chemistry.pdf, scan_pg2.jpg..."
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Subject Code Referral</label>
                  <select className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none">
                    <option value="BT101">BT101 Engineering Chemistry</option>
                    <option value="BT104">BT104 BEEE</option>
                    <option value="BT105">BT105 Engineering Physics</option>
                    <option value="CS301">CS301 Data Structures</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Brief Description / Study Context</label>
                <textarea
                  placeholder="Describe your handwritten shortcuts or file to help our parser summary pipeline write appropriate flashcards..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-20 rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 p-2 text-xs font-bold text-white transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? '📤 Syncing blocks on Campus DB...' : 'Submit and Earn Contributor XP'}
              </button>
            </form>
          </div>

          {/* Gamified Achievements Badge list */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <Trophy className="mr-1.5 h-4 w-4 text-amber-400 font-bold" />
              Your Academic Achievement Badges
            </h2>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {CORE_BADGES.map((badge) => {
                const isUnlocked = unlockedBadgeIds.includes(badge.id) || userPoints >= 600;
                return (
                  <div
                    key={badge.id}
                    className={`flex items-start rounded-xl border p-3 text-xs gap-3 transition-colors ${
                      isUnlocked
                        ? 'bg-amber-500/5 border-amber-500/20 text-slate-200'
                        : 'border-slate-850 bg-slate-900/5 text-slate-500'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${isUnlocked ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-950/45 text-slate-600'}`}>
                      {badge.name === 'First Milestone' ? <Award className="h-5 w-5" /> :
                       badge.name === 'Saviour Of Batch' ? <Flame className="h-5 w-5" /> :
                       badge.name === 'Gold Pen Academic' ? <BookOpen className="h-5 w-5" /> :
                       badge.name === 'External Specialist' ? <CheckCircle className="h-5 w-5" /> :
                       <Star className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className={`font-sans font-bold ${isUnlocked ? 'text-amber-100' : 'text-slate-500'}`}>
                        {badge.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{badge.description}</p>
                      <span className="block font-mono text-[9px] mt-1.5 uppercase tracking-wide">
                        {isUnlocked ? '★ Unlocked & Active' : '🔒 Locked - Need +100 XP'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Global Leaderboard stats */}
        <div className="md:col-span-1 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/15 p-4 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-850 pb-3">
              <Users className="h-4 w-4 text-purple-400" />
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                Global Campus Leaderboard
              </h3>
            </div>

            <div className="space-y-2.5">
              {INITIAL_LEADERBOARD.map((user) => {
                // Update live rank points if current user
                const displayedPoints = user.isCurrentUser ? userPoints : user.points;
                return (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between rounded-xl p-2.5 text-xs ${
                      user.isCurrentUser
                        ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 animate-pulse'
                        : 'bg-slate-955'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-500 font-mono w-4">{user.rank}</span>
                      <div>
                        <span className={`block font-semibold ${user.isCurrentUser ? 'text-indigo-300 font-bold' : 'text-slate-200'}`}>
                          {user.name}
                        </span>
                        <span className="block text-[9.5px] text-slate-400">{user.contributions} uploads</span>
                      </div>
                    </div>

                    <span className="font-mono text-slate-200 font-extrabold shrink-0">
                      {displayedPoints} <span className="text-[9px] text-slate-400 font-medium">XP</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
