'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getPerformance, FirebasePerformance } from 'firebase/performance';
import { firebaseConfig } from './config';

/**
 * @fileOverview NoorNexus Firebase Kernel (V4.7 - Resilient Sync Edition)
 * Initializing Analytics and Performance Monitoring for Mission 500.
 * Updated: Safe initialization to prevent 403 Permission Denied errors 
 * when Firebase Installations API is restricted.
 */

export function initializeFirebase() {
  // Ensure we only initialize once
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  // Enable Local Emulators in Development Mode
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost';
    
    if (isLocalhost) {
      console.log('%c[NoorNexus-Kernel] Localhost detected. Initiating Emulator Handshake...', 'color: #0096ff; font-weight: bold;');
      try {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        connectAuthEmulator(auth, 'http://localhost:9099');
        console.log('%c[NoorNexus-Kernel] Emulators Synchronized: Firestore (8080), Auth (9099)', 'color: #10b981; font-weight: bold;');
      } catch (e) {
        console.warn('[NoorNexus-Kernel] Emulator connection failed or already active.');
      }
    }
  }

  let analytics: Analytics | null = null;
  let performance: FirebasePerformance | null = null;

  // These services are only available in the browser and require Installations API
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('[NoorNexus-Kernel] Analytics failed to initialize. Ensure "Firebase Installations API" is enabled in Google Cloud Console.', error);
    }

    try {
      performance = getPerformance(app);
    } catch (error) {
      console.warn('[NoorNexus-Kernel] Performance monitoring failed to initialize.', error);
    }
  }

  return { app, firestore, auth, analytics, performance };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
