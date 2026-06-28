'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getPerformance, FirebasePerformance } from 'firebase/performance';
import { firebaseConfig } from './config';

/**
 * @fileOverview NoorNexus Firebase Kernel (V4.8 - Hardened Singleton Edition)
 * Fixed: Auth (11.9.0): INTERNAL ASSERTION FAILED by enforcing a strict singleton pattern.
 */

let firebaseApp: FirebaseApp;
let firestoreDb: Firestore;
let firebaseAuth: Auth;
let firebaseAnalytics: Analytics | null = null;
let firebasePerformance: FirebasePerformance | null = null;

export function initializeFirebase() {
  if (typeof window === 'undefined') {
    // Return placeholder for server-side
    return { app: null as any, firestore: null as any, auth: null as any, analytics: null, performance: null };
  }

  if (!firebaseApp) {
    firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);

    // Enable Local Emulators in Development Mode
    if (process.env.NODE_ENV === 'development') {
      const isLocalhost = window.location.hostname === 'localhost';
      if (isLocalhost) {
        try {
          connectFirestoreEmulator(firestoreDb, 'localhost', 8080);
          connectAuthEmulator(firebaseAuth, 'http://localhost:9099', { disableWarnings: true });
        } catch (e) {
          // Emulators already connected
        }
      }
    }

    try {
      firebaseAnalytics = getAnalytics(firebaseApp);
    } catch (error) {
      console.warn('[NoorNexus-Kernel] Analytics blocked.');
    }

    try {
      firebasePerformance = getPerformance(firebaseApp);
    } catch (error) {
      console.warn('[NoorNexus-Kernel] Performance blocked.');
    }
  }

  return { 
    app: firebaseApp, 
    firestore: firestoreDb, 
    auth: firebaseAuth, 
    analytics: firebaseAnalytics, 
    performance: firebasePerformance 
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
