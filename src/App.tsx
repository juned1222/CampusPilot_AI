/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import LoginPage from './components/LoginPage';
import StudyPomodoro from './components/StudyPomodoro';
import ComingSoonRoadmap from './components/ComingSoonRoadmap';
import AdminPanel from './components/AdminPanel';
import { firebaseService } from './lib/firebase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  
  // Judge Demo Mode State
  const [isDemoModeEnabled, setIsDemoModeEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campuspilot_demo_mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('campuspilot_demo_mode', String(isDemoModeEnabled));
    } catch {}
  }, [isDemoModeEnabled]);

  // Support URL Hash & Path Based Secret Admin Access
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash.includes('admin') || path.includes('/admin')) {
        setCurrentTab('admin');
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);
  
  // Dynamic light/dark theme preference state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('campuspilot_theme');
      return (saved as 'light' | 'dark') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem('campuspilot_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  // User Authentication state
  const [user, setUser] = useState<{name: string; email: string; phone?: string; avatar: string} | null>(() => {
    try {
      const saved = localStorage.getItem('campuspilot_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (newUser: { name: string; email: string; phone?: string; avatar: string }) => {
    setUser(newUser);
    try {
      localStorage.setItem('campuspilot_user', JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('campuspilot_user');
    } catch (e) {
      console.error(e);
    }
  };
  
  // Shared academic states
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('BT101');
  const [selectedSubjectForViva, setSelectedSubjectForViva] = useState<string>('BT101');
  
  // XP & Gamification system state
  const [userPoints, setUserPoints] = useState<number>(() => {
    try {
      const p = localStorage.getItem('campuspilot_points');
      return p ? Number(p) : 540;
    } catch {
      return 540;
    }
  });
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(() => {
    try {
      const b = localStorage.getItem('campuspilot_badges');
      return b ? JSON.parse(b) : ['b1'];
    } catch {
      return ['b1'];
    }
  });

  // Pull dynamic dashboard values from Firestore on load
  useEffect(() => {
    if (!user?.email) return;
    
    async function fetchOnlineProfile() {
      const dbProfile = await firebaseService.getUserProfile(user!.email);
      if (dbProfile) {
        if (typeof dbProfile.points === 'number') {
          setUserPoints(dbProfile.points);
          try {
            localStorage.setItem('campuspilot_points', String(dbProfile.points));
          } catch {}
        }
        if (Array.isArray(dbProfile.unlockedBadgeIds)) {
          setUnlockedBadgeIds(dbProfile.unlockedBadgeIds);
          try {
            localStorage.setItem('campuspilot_badges', JSON.stringify(dbProfile.unlockedBadgeIds));
          } catch {}
        }
      }
    }
    
    fetchOnlineProfile();
  }, [user?.email]);

  // Sync state changes to Firestore & local fallback
  useEffect(() => {
    if (!user?.email) return;
    
    try {
      localStorage.setItem('campuspilot_points', String(userPoints));
      localStorage.setItem('campuspilot_badges', JSON.stringify(unlockedBadgeIds));
    } catch {}

    const timer = setTimeout(() => {
      firebaseService.syncUserProfile(user.email, {
        name: user.name,
        points: userPoints,
        unlockedBadgeIds
      });
    }, 1000); // Debounce synchronization requests to save write quotas

    return () => clearTimeout(timer);
  }, [userPoints, unlockedBadgeIds, user?.email, user?.name]);

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
      setUnlockedBadgeIds(badgeList => {
        let newList = [...badgeList];
        if (nextPoints >= 600 && !newList.includes('b2')) {
          newList.push('b2');
        }
        if (nextPoints >= 800 && !newList.includes('b3')) {
          newList.push('b3');
        }
        return newList;
      });
      return nextPoints;
    });
  };

  if (!user) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  // Judge Demo overrides to show premium student state
  const displayPoints = isDemoModeEnabled ? 1480 : userPoints;
  const displayRank = isDemoModeEnabled ? 1 : userRank;
  const displayBadges = isDemoModeEnabled ? ['b1', 'b2', 'b3', 'b4', 'b5'] : unlockedBadgeIds;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 antialiased font-sans">
      {/* Header section (logo, gamification rank summary and global smart search) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setSelectedSubjectCode={setSelectedSubjectCode}
        setSelectedSubjectForViva={setSelectedSubjectForViva}
        userPoints={displayPoints}
        userRank={displayRank}
        user={isDemoModeEnabled ? { name: "Juned Khan", email: "junedshekhkhan@gmail.com", avatar: user.avatar } : user}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Primary layout container */}
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Sidebar Left Navigation Panel */}
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Core Main Viewport Frame */}
        <main className="flex-1 px-4 py-6 sm:px-6 md:py-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, x: 10, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -10, y: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              {currentTab === 'overview' && (
                <DashboardOverview
                  setCurrentTab={setCurrentTab}
                  setSelectedSubjectCode={setSelectedSubjectCode}
                  setSelectedSubjectForViva={setSelectedSubjectForViva}
                  userPoints={displayPoints}
                  isDemoModeEnabled={isDemoModeEnabled}
                />
              )}

              {currentTab === 'chatbot' && (
                <CompanionChatbot onContributeXP={handleContributeXP} />
              )}

              {currentTab === 'pomodoro' && (
                <StudyPomodoro onContributeXP={handleContributeXP} />
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

              {currentTab === 'roadmap' && (
                <ComingSoonRoadmap />
              )}

              {currentTab === 'admin' && (
                <AdminPanel
                  isDemoModeEnabled={isDemoModeEnabled}
                  onToggleDemoMode={() => setIsDemoModeEnabled(!isDemoModeEnabled)}
                />
              )}

              {currentTab === 'contribution' && (
                <ContributionSystem
                  userPoints={displayPoints}
                  userRank={displayRank}
                  onContributeXP={handleContributeXP}
                  unlockedBadgeIds={displayBadges}
                />
              )}
            </motion.div>
          </AnimatePresence>
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
