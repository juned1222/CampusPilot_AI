/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Subject {
  id: string;
  code: string;
  name: string;
  year: 'First Year' | 'Second Year' | 'Third Year' | 'Final Year';
  category: 'First Year' | 'Core CS' | 'Specialization';
  unitsCount: number;
  description: string;
}

export interface PYQAnalysis {
  id: string;
  subjectCode: string;
  paperName: string;
  year: string;
  type: 'MST-I' | 'MST-II' | 'End-Sem';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  uploadedBy: string;
  uploadedAt: string;
  frequentTopics: { topic: string; frequency: number; weightage: number; trend: 'rising' | 'stable' | 'failing' }[];
  unitWeightages: { unit: string; name: string; percentage: number }[];
  expectedQuestions: { question: string; estimatedMarks: number; confidenceScore: number }[];
}

export interface CommunityNote {
  id: string;
  subjectCode: string;
  title: string;
  author: string;
  authorYear: string;
  likes: number;
  downloads: number;
  fileSize: string;
  fileType: 'PDF' | 'Handwritten Scan' | 'Docs';
  topicsCovered: string[];
  aiSummary: string;
  flashcards: { question: string; answer: string }[];
  createdAt: string;
}

export interface VivaQuestion {
  id: string;
  subjectCode: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'External Examiner Level';
  frequencyIndex: number; // 1-10
  examinerInsight: string;
  followUpQuestion: string;
}

export interface CodingQuestion {
  id: string;
  category: 'C++' | 'Python' | 'DSA' | 'Web Dev' | 'Aptitude' | 'HR';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problemStatement: string;
  sampleInput?: string;
  sampleOutput?: string;
  codeSolution: string;
  optimalComplexity?: string;
  companyTags: string[];
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  badgeCount: number;
  contributions: number;
  isCurrentUser?: boolean;
}

export interface ContributorBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
