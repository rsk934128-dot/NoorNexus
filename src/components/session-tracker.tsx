
"use client"

import { useEffect } from "react"
import { useUser, useFirestore } from "@/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

/**
 * @fileOverview SessionTracker Component
 * Automatically logs user activity and session details to Firestore.
 */
export function SessionTracker() {
  const { user } = useUser()
  const db = useFirestore()

  useEffect(() => {
    if (user) {
      const logSession = async () => {
        try {
          const sessionRef = doc(db, "user_sessions", user.uid)
          await setDoc(sessionRef, {
            uid: user.uid,
            displayName: user.displayName || "Unknown Commander",
            email: user.email,
            photoURL: user.photoURL,
            lastSeen: serverTimestamp(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            status: "ONLINE"
          }, { merge: true })
        } catch (error) {
          console.error("[SessionTracker] Failed to log heartbeat:", error)
        }
      }

      logSession()
      // Optional: Set up an interval for heartbeat if needed
      const interval = setInterval(logSession, 60000) // Every 1 minute
      return () => clearInterval(interval)
    }
  }, [user, db])

  return null
}
