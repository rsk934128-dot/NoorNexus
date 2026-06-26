
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldCheck } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

/**
 * @fileOverview Global Persistent Communication Node (V5.4)
 * Hardened against frequent/false call notification triggers.
 * Optimized message filtering to prevent notification spam.
 */
export function PersistentCommNode() {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { open, isMobile } = useSidebar()
  const lastToastTime = useRef<number>(0)

  // Double-pass mounting for hydration safety
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Call Monitoring Logic
  useEffect(() => {
    if (!isMounted) return

    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission()
      }
    }

    const handleMessage = (event: MessageEvent) => {
      const data = event.data
      if (!data) return

      // Specific filter to only detect REAL call events and ignore routine heartbeat/connection messages
      const msgStr = typeof data === 'string' ? data : JSON.stringify(data)
      
      // Tightened Regex: Only triggers on explicit incoming call signals
      const callKeywords = /incoming_call|call_incoming|incoming-call|trigger_ringtone|call_signal_active/i
      const isCallSignal = callKeywords.test(msgStr)

      if (isCallSignal) {
        // Increase suppression interval to 5 minutes to prevent recurring popups for the same session
        const SPAM_THRESHOLD = 300000 
        if (Date.now() - lastToastTime.current < SPAM_THRESHOLD) return
        lastToastTime.current = Date.now()

        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3')
          audio.volume = 0.5
          audio.play().catch(() => console.log("Audio feedback suppressed by browser policy."))
        } catch (e) {
          // Fallback for audio failure
        }

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NoorNexus | ইনকামিং কল", {
            body: "কমান্ডার, আপনার সুরক্ষা হাবে একটি জরুরি কল এসেছে।",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'active-call',
            requireInteraction: true
          })
        }

        toast({
          title: "🚨 ইনকামিং কল সিগন্যাল",
          description: "সার্বভৌম নেটওয়ার্ক থেকে একটি এনক্রিপ্টেড কল রিকোয়েস্ট এসেছে।",
          variant: "default",
          className: "border-emerald-500/50 bg-black/95 backdrop-blur-2xl border-l-4 z-[9999]",
          action: (
            <div className="flex flex-col gap-2">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px] glow-emerald h-10 px-4"
                onClick={() => router.push("/shurukkha-standard")}
              >
                <PhoneIncoming className="size-3" /> Standard
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 gap-2 font-bold uppercase text-[10px] h-10 px-4"
                onClick={() => router.push("/shurukkha-imperial")}
              >
                <ShieldCheck className="size-3" /> Imperial
              </Button>
            </div>
          ),
          duration: 30000,
        })
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [isMounted, router, toast])

  if (!isMounted) return null

  const isStandardActive = pathname === "/shurukkha-standard"
  const isImperialActive = pathname === "/shurukkha-imperial"
  const sidebarWidth = isMobile ? '0px' : (open ? '16rem' : '3rem')

  return (
    <div className="fixed inset-0 z-[40] pointer-events-none overflow-hidden">
      <div 
        className={`absolute inset-y-0 right-0 transition-all duration-700 ease-in-out bg-white ${isStandardActive ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
        style={{ 
          left: isStandardActive ? sidebarWidth : '100%', 
          top: isStandardActive ? '4.5rem' : '0',
          visibility: isStandardActive ? 'visible' : 'hidden'
        }}
      >
        <iframe 
          src="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
          className="w-full h-full border-0"
          title="Standard Hub Node"
          allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
          sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
        />
      </div>

      <div 
        className={`absolute inset-y-0 right-0 transition-all duration-700 ease-in-out bg-white ${isImperialActive ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
        style={{ 
          left: isImperialActive ? sidebarWidth : '100%', 
          top: isImperialActive ? '4.5rem' : '0',
          visibility: isImperialActive ? 'visible' : 'hidden'
        }}
      >
        <iframe 
          src="https://shurukkha-hub-imperial-sovereign-in.vercel.app/dashboard" 
          className="w-full h-full border-0"
          title="Imperial Hub Node"
          allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
          sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
        />
      </div>

      <div className="absolute bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
        <iframe 
          src="https://shurukkha-hub.sirajganj.gov.bd/dashboard" 
          title="Stable Persistent Listener"
          allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
          sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
        />
      </div>
    </div>
  )
}
