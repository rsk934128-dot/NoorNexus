
"use client"

import { useEffect, useRef } from "react"
import { useUser, useFirestore } from "@/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

/**
 * @fileOverview SessionTracker Component (V4.0 - Multi-Device Support)
 * নূরনেক্সাস সাম্রাজ্যের প্রতিটি কানেকশনকে একটি ইউনিক সেশন আইডি দিয়ে ট্র্যাক করে। 
 * একই একাউন্ট ভিন্ন ডিভাইসে ব্যবহার করলেও এখন আলাদাভাবে দেখা যাবে।
 */
export function SessionTracker() {
  const { user } = useUser()
  const db = useFirestore()
  const sessionIdRef = useRef<string>("")

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionIdRef.current) {
      // Create a unique session ID for this specific tab/device
      let sId = sessionStorage.getItem('noornexus_session_id')
      if (!sId) {
        sId = Math.random().toString(36).substring(2, 15) + "_" + Date.now()
        sessionStorage.setItem('noornexus_session_id', sId)
      }
      sessionIdRef.current = sId
    }
  }, [])

  useEffect(() => {
    if (user && sessionIdRef.current) {
      const logSession = async () => {
        try {
          const hubs = [
            { id: "NODE-BD-01", region: "South Asia (Sirajganj)" },
            { id: "NODE-AE-04", region: "Middle East (Dubai)" },
            { id: "NODE-UK-12", region: "Europe (London)" },
            { id: "NODE-TH-09", region: "SE Asia (Bangkok)" }
          ]
          
          // Assigned node based on session ID for variation
          const nodeIndex = sessionIdRef.current.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % hubs.length
          const assignedHub = hubs[nodeIndex]

          // Use composite key: UID + SessionID to allow multi-device tracking
          const sessionKey = `${user.uid}_${sessionIdRef.current}`
          const sessionRef = doc(db, "user_sessions", sessionKey)
          
          const userAgent = navigator.userAgent
          const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)

          await setDoc(sessionRef, {
            uid: user.uid,
            sessionId: sessionIdRef.current,
            displayName: user.displayName || user.email?.split('@')[0] || "Unknown Commander",
            email: user.email,
            photoURL: user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`,
            lastSeen: serverTimestamp(),
            userAgent: userAgent,
            platform: isMobile ? "Mobile" : "Desktop",
            deviceInfo: navigator.platform,
            assignedNode: assignedHub.id,
            assignedRegion: assignedHub.region,
            status: "ONLINE",
            lastAction: window.location.pathname,
            ipSimulated: `103.23.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
          }, { merge: true })
          
          console.log(`[Pulse] Session ${sessionIdRef.current} anchored for ${user.email}`);
        } catch (error) {
          console.error("[SessionTracker] Heartbeat failure:", error)
        }
      }

      logSession()
      const interval = setInterval(logSession, 20000) // 20s heartbeat for high-precision
      return () => clearInterval(interval)
    }
  }, [user, db])

  return null
}
