'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getPerformance, FirebasePerformance } from 'firebase/performance';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { firebaseConfig, reCaptchaSiteKey } from './config';

/**
 * @fileOverview NoorNexus Firebase Kernel (V4.9 - Security Hardened)
 * Integrated Firebase App Check for advanced backend protection.
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

    // --- APP CHECK INITIALIZATION (Priority 1) ---
    if (typeof window !== 'undefined') {
      try {
        // Support for local debugging
        if (process.env.NODE_ENV === 'development') {
          (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        }

        initializeAppCheck(firebaseApp, {
          provider: new ReCaptchaEnterpriseProvider(reCaptchaSiteKey),
          isTokenAutoRefreshEnabled: true
        });
        console.log('[NoorNexus-Security] App Check Shield: ARMED.');
      } catch (err) {
        console.warn('[NoorNexus-Security] App Check initialization failed or already initialized.');
      }
    }

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
