/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ExamEmergency from './components/ExamEmergency';
import PYQIntelligence from './components/PYQIntelligence';
import CommunityNotes from './components/CommunityNotes';
import VivaPrep from './components/VivaPrep';
import MockGenerator from './components/MockGenerator';
import CodingPlacement from './components/CodingPlacement';
import Predictor from './components/Predictor';
import ContributionSystem from './components/ContributionSystem';
import CompanionChatbot from './components/CompanionChatbot';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  
  // Shared academic states
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('BT101');
  const [selectedSubjectForViva, setSelectedSubjectForViva] = useState<string>('BT101');
  
  // XP & Gamification system state
  const [userPoints, setUserPoints] = useState<number>(540);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(['b1']);

  // Dynamic user leader rank calculator
  const userRank = useMemo(() => {
    if (userPoints >= 1450) return 1;
    if (userPoints >= 1220) return 2;
    if (userPoints >= 1050) return 3;
    if (userPoints >= 940) return 4;
    return 5;
  }, [userPoints]);

  const handleContributeXP = (pointsGranted: number) => {
    setUserPoints(prev => {
      const nextPoints = prev + pointsGranted;
      // Auto unlock badges on points threshold
      if (nextPoints >= 600 && !unlockedBadgeIds.includes('b2')) {
        setUnlockedBadgeIds(badgeList => [...badgeList, 'b2']);
      }
      if (nextPoints >= 800 && !unlockedBadgeIds.includes('b3')) {
        setUnlockedBadgeIds(badgeList => [...badgeList, 'b3']);
      }
      return nextPoints;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 antialiased font-sans">
      {/* Header section (logo, gamification rank summary and global smart search) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setSelectedSubjectCode={setSelectedSubjectCode}
        setSelectedSubjectForViva={setSelectedSubjectForViva}
        userPoints={userPoints}
        userRank={userRank}
      />

      {/* Primary layout container */}
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Sidebar Left Navigation Panel */}
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Core Main Viewport Frame */}
        <main className="flex-1 px-4 py-6 sm:px-6 md:py-8 overflow-x-hidden">
          {currentTab === 'overview' && (
            <DashboardOverview
              setCurrentTab={setCurrentTab}
              setSelectedSubjectCode={setSelectedSubjectCode}
              setSelectedSubjectForViva={setSelectedSubjectForViva}
              userPoints={userPoints}
            />
          )}

          {currentTab === 'chatbot' && (
            <CompanionChatbot onContributeXP={handleContributeXP} />
          )}

          {currentTab === 'emergency' && <ExamEmergency />}

          {currentTab === 'pyq' && (
            <PYQIntelligence
              selectedSubjectCode={selectedSubjectCode}
              setSelectedSubjectCode={setSelectedSubjectCode}
              onContributeXP={handleContributeXP}
            />
          )}

          {currentTab === 'notes' && <CommunityNotes onContributeXP={handleContributeXP} />}

          {currentTab === 'viva' && (
            <VivaPrep
              selectedSubjectForViva={selectedSubjectForViva}
              setSelectedSubjectForViva={setSelectedSubjectForViva}
              onContributeXP={handleContributeXP}
            />
          )}

          {currentTab === 'mock' && <MockGenerator />}

          {currentTab === 'coding' && <CodingPlacement />}

          {currentTab === 'predictor' && <Predictor />}

          {currentTab === 'contribution' && (
            <ContributionSystem
              userPoints={userPoints}
              userRank={userRank}
              onContributeXP={handleContributeXP}
              unlockedBadgeIds={unlockedBadgeIds}
            />
          )}
        </main>
      </div>

      {/* Portal background visual accents */}
      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-pink-500/5 to-indigo-500/5 blur-[100px]" />
      </div>
    </div>
  );
}
