
"use client"

import { useEffect } from "react"
import { useUser, useFirestore } from "@/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

/**
 * @fileOverview SessionTracker Component (V3.7)
 * Automatically logs user activity, device metadata, and assigns a Sovereign Node.
 * Hardened to ensure all unique users are tracked in the Global Registry.
 */
export function SessionTracker() {
  const { user } = useUser()
  const db = useFirestore()

  useEffect(() => {
    if (user) {
      const logSession = async () => {
        try {
          // Identify/Assign a Sovereign Node for the session
          const hubs = [
            { id: "NODE-BD-01", region: "South Asia (Sirajganj)" },
            { id: "NODE-AE-04", region: "Middle East (Dubai)" },
            { id: "NODE-UK-12", region: "Europe (London)" },
            { id: "NODE-TH-09", region: "SE Asia (Bangkok)" }
          ]
          
          // Simple consistent hashing to assign a node to a user based on UID
          const nodeIndex = user.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % hubs.length
          const assignedHub = hubs[nodeIndex]

          const sessionRef = doc(db, "user_sessions", user.uid)
          await setDoc(sessionRef, {
            uid: user.uid,
            displayName: user.displayName || user.email?.split('@')[0] || "Unknown Commander",
            email: user.email,
            photoURL: user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`,
            lastSeen: serverTimestamp(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenRes: `${window.innerWidth}x${window.innerHeight}`,
            assignedNode: assignedHub.id,
            assignedRegion: assignedHub.region,
            status: "ONLINE", // Will be considered offline if lastSeen > 2 mins ago in UI
            ipSimulated: `103.23.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            lastAction: window.location.pathname
          }, { merge: true })
          
          console.log(`[SessionTracker] Pulse anchored for ${user.email} to ${assignedHub.id}`);
        } catch (error) {
          console.error("[SessionTracker] Heartbeat failure:", error)
        }
      }

      logSession()
      const interval = setInterval(logSession, 30000) // Frequent 30s refresh for real-time accuracy
      return () => clearInterval(interval)
    }
  }, [user, db])

  return null
}
