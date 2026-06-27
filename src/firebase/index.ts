
'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getPerformance, FirebasePerformance } from 'firebase/performance';
import { firebaseConfig } from './config';

/**
 * @fileOverview NoorNexus Firebase Kernel (V4.5)
 * Initializing Analytics and Performance Monitoring for Mission 500.
 */

export function initializeFirebase() {
  // Ensure we only initialize once
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  let analytics: Analytics | null = null;
  let performance: FirebasePerformance | null = null;

  // These services are only available in the browser
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
    performance = getPerformance(app);
  }

  return { app, firestore, auth, analytics, performance };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
