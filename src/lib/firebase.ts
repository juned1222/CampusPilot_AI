/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  setDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase lazily to ensure no app start blockages
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const dbId = (firebaseConfig as any).firestoreDatabaseId || '(default)';
export const db = getFirestore(app, dbId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Helper service definitions for syncing data live with Cloud Firestore
export const firebaseService = {
  /**
   * Firebase Google Sign In
   */
  async loginWithGoogle() {
    try {
      // Check if we are inside a sandboxed cross-origin iframe
      const isIframe = window.self !== window.top;
      if (isIframe) {
        throw new Error('Iframe environment detected. Google blocks recursive authentication inside sandboxed frames to prevent clickjacking. Please open in a new tab.');
      }
      
      // Standard popup auth behavior
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        user: {
          name: result.user.displayName || 'Google Scholar',
          email: result.user.email || '',
          avatar: result.user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
        }
      };
    } catch (popupError: any) {
      console.warn('Google Popup blocked or failed:', popupError);
      throw popupError;
    }
  },
  /**
   * Sync User Profile (Points, Rankings, Badges)
   */
  async syncUserProfile(email: string, profile: { name: string; points: number; unlockedBadgeIds: string[] }) {
    try {
      const userRef = doc(db, 'users', email);
      await setDoc(userRef, {
        ...profile,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (e) {
      console.warn('Firebase sync failed, retaining state locally:', e);
      return false;
    }
  },

  /**
   * Fetch User Profile
   */
  async getUserProfile(email: string) {
    try {
      const { getDoc } = await import('firebase/firestore');
      const userRef = doc(db, 'users', email);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        return snapshot.data();
      }
      return null;
    } catch (e) {
      console.warn('Firebase read failed, using local profile instead:', e);
      return null;
    }
  },

  /**
   * Sync Community Study Notes
   */
  async uploadCommunityNote(note: {
    title: string;
    description?: string;
    author: string;
    subjectCode: string;
    fileSize: string;
    fileType: string;
    topicsCovered: string[];
    aiSummary: string;
    flashcards: Array<{ question: string; answer: string }>;
  }) {
    try {
      const notesCol = collection(db, 'notes');
      const docRef = await addDoc(notesCol, {
        ...note,
        likes: 0,
        downloads: 0,
        createdAt: new Date().toLocaleDateString(),
        timestamp: serverTimestamp()
      });
      return { id: docRef.id, ...note, likes: 0, downloads: 0, createdAt: 'Just now' };
    } catch (e) {
      console.warn('Firebase custom upload failed:', e);
      return null;
    }
  },

  /**
   * Query all Community Study Notes
   */
  async getCommunityNotes() {
    try {
      const notesCol = collection(db, 'notes');
      const q = query(notesCol, orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const notes: any[] = [];
      snapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      return notes;
    } catch (e) {
      console.warn('Firebase query failed, using sample notes state:', e);
      return [];
    }
  },

  /**
   * Sync Study & Break Reminders
   */
  async syncReminders(reminders: string[]) {
    try {
      const remindersRef = doc(db, 'settings', 'reminders_store');
      await setDoc(remindersRef, {
        list: reminders,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (e) {
      console.warn('Firebase reminders save failed:', e);
      return false;
    }
  },

  /**
   * Get custom Study & Break Reminders
   */
  async getReminders() {
    try {
      const { getDoc } = await import('firebase/firestore');
      const remindersRef = doc(db, 'settings', 'reminders_store');
      const snapshot = await getDoc(remindersRef);
      if (snapshot.exists()) {
        return snapshot.data().list as string[];
      }
      return null;
    } catch (e) {
      console.warn('Firebase reminders load failed:', e);
      return null;
    }
  }
};
