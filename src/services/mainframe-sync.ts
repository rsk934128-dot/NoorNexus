
'use client';
/**
 * @fileOverview Sovereign Mainframe Sync Routine.
 * This routine is used by apps to stay heartbeat-synced with NoorNexus.
 */

import { SheikhHub } from '@/lib/sheikh-core';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';

export function createSyncRoutine(appId: string, region: string = 'SG-EDGE-01') {
  const hub = new SheikhHub({ appId, region });
  let heartbeatInterval: any = null;

  const startSync = async (db: any) => {
    try {
      console.log(`[Sync] Initiating Handshake for ${appId}...`);
      const { success, sessionId } = await hub.init();

      if (success) {
        // Log the successful connection in NoorNexus Mainframe
        await setDoc(doc(db, "app_connections", appId), {
          appId,
          name: appId,
          status: "SYNCHRONIZED",
          trustScore: 95,
          lastHeartbeat: Date.now(),
          sessionId,
          region,
          updatedAt: serverTimestamp()
        }, { merge: true });

        // Start 4s Heartbeat Loop
        heartbeatInterval = setInterval(async () => {
          try {
            const pulse = await hub.heartbeat();
            await setDoc(doc(db, "app_connections", appId), {
              lastHeartbeat: pulse.timestamp,
              latency: pulse.latency,
              status: "SYNCHRONIZED"
            }, { merge: true });
          } catch (e) {
            console.error("[Sync] Heartbeat Failed", e);
            await setDoc(doc(db, "app_connections", appId), {
              status: "DRIFT_DETECTED"
            }, { merge: true });
          }
        }, 4000);

        return true;
      }
      return false;
    } catch (err) {
      console.error("[Sync] Initialization Critical Failure", err);
      return false;
    }
  };

  const stopSync = () => {
    if (heartbeatInterval) clearInterval(heartbeatInterval);
  };

  return { startSync, stopSync, hub };
}
