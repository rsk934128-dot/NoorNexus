'use client';
/**
 * @fileOverview Sovereign Telemetry Service (Project #500).
 * Handles event logging, performance tracing, and crash reporting.
 */

import { initializeFirebase } from '@/firebase';
import { logEvent } from 'firebase/analytics';
import { trace } from 'firebase/performance';

/**
 * Logs an imperial event to Google Analytics.
 */
export const logImperialEvent = (eventName: string, params: any = {}) => {
  const { analytics } = initializeFirebase();
  if (analytics) {
    logEvent(analytics, eventName, {
      ...params,
      platform: 'NoorNexus_OS',
      version: 'v4.8',
      commander: 'Sheikh_Farid'
    });
    console.log(`[Telemetry] Event Logged: ${eventName}`);
  }
};

/**
 * Reports a system crash or error to the Sovereign Ledger.
 */
export const reportSovereignError = (error: Error, fatal: boolean = false) => {
  console.error(`[Crashlytics] ${fatal ? 'FATAL' : 'NON-FATAL'} ERROR:`, error);
  const { analytics } = initializeFirebase();
  if (analytics) {
    logEvent(analytics, 'exception', {
      description: error.message,
      fatal: fatal
    });
  }
};

/**
 * Measures the latency of a critical neural pulse.
 */
export const measureNeuralPulse = async (taskName: string, task: () => Promise<any>) => {
  const { performance } = initializeFirebase();
  if (!performance) return await task();

  const t = trace(performance, taskName);
  t.start();
  try {
    const result = await task();
    return result;
  } finally {
    t.stop();
  }
};
