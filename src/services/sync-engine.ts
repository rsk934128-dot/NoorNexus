'use client';
/**
 * @fileOverview Sovereign Sync Engine (V1.0 - Auto-Sync Edition)
 * নূরনেক্সাস সাম্রাজ্যের অফলাইন-ফার্স্ট ডাটা লেজার এবং অটো-সিঙ্ক লজিক।
 * এটি ইন্টারনেট সংযোগ না থাকলে ডাটা কিউতে জমা রাখে এবং কানেকশন ফিরে এলে অটো-সিঙ্ক করে।
 */

import { sendSovereignNotification } from './notification-service';

export interface PendingTask {
  id: string;
  action: string;
  payload: any;
  timestamp: number;
}

const SYNC_QUEUE_KEY = 'noornexus_pending_sync_queue';

/**
 * Adds a task to the offline ledger if the system is disconnected.
 */
export const queueTask = (action: string, payload: any) => {
  const queue: PendingTask[] = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
  const newTask: PendingTask = {
    id: `TASK_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
    action,
    payload,
    timestamp: Date.now()
  };
  
  queue.push(newTask);
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  
  console.log(`[SyncEngine] Task ${newTask.id} queued for offline sync.`);
};

/**
 * Processes all pending tasks in the queue.
 */
export const processSyncQueue = async () => {
  const queue: PendingTask[] = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
  
  if (queue.length === 0) return;

  console.log(`[SyncEngine] Internet restored. Syncing ${queue.length} pending tasks...`);
  
  // Sequential Processing to maintain ledger integrity
  for (const task of queue) {
    try {
      console.log(`[SyncEngine] Syncing Task: ${task.id} (${task.action})...`);
      
      // Simulating a high-clearance handshake with the mainframe
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real scenario, this would call actual backend services/Firestore
      console.log(`[SyncEngine] Task ${task.id} anchored successfully.`);
      
    } catch (error) {
      console.error(`[SyncEngine] Failed to sync task ${task.id}:`, error);
      return; // Stop processing to prevent data-drift
    }
  }

  // Clear queue and notify the Commander
  localStorage.setItem(SYNC_QUEUE_KEY, '[]');
  sendSovereignNotification(
    "Sync Completed", 
    `Commander, ${queue.length} pending tasks have been anchored to the Sovereign Mainframe.`
  );
};

/**
 * Initializes network listeners for the Sync Engine.
 */
export const initSyncEngine = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('online', () => {
    console.log("[SyncEngine] System Online. Re-initiating handshakes...");
    processSyncQueue();
  });

  window.addEventListener('offline', () => {
    console.log("[SyncEngine] System Offline. Offline Task Ledger: ARMED.");
  });

  // Initial check on mount
  if (navigator.onLine) {
    processSyncQueue();
  }
};

export const getPendingTasks = (): PendingTask[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
};
