
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldCheck, Zap, Activity } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

/**
 * @fileOverview Global Persistent Communication Node (V5.5 - Always Alive Edition)
 * Enhanced with Service Worker bridge and Platform Signing logic simulation.
 */
export function PersistentCommNode() {
  const [isMounted, setIsMounted] = useState(false)
  const [swRegistered, setSwRegistered] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { open, isMobile } = useSidebar()
  const lastToastTime = useRef<number>(0)

  // Double-pass mounting for hydration safety
  useEffect(() => {
    setIsMounted(true)
    
    // Register Service Worker for "Always Alive" background capabilities
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('[NoorNexus-SW] Registered for persistent listening:', reg.scope);
          setSwRegistered(true);
        })
        .catch((err) => console.log('[NoorNexus-SW] Registration failed:', err));
    }
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

      const msgStr = typeof data === 'string' ? data : JSON.stringify(data)
      
      // Detected System Alert or Call Signal
      const callKeywords = /incoming_call|call_incoming|incoming-call|trigger_ringtone|call_signal_active|system_alert/i
      const isCallSignal = callKeywords.test(msgStr)

      if (isCallSignal) {
        const SPAM_THRESHOLD = 300000 
        if (Date.now() - lastToastTime.current < SPAM_THRESHOLD) return
        lastToastTime.current = Date.now()

        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3')
          audio.volume = 0.5
          audio.play().catch(() => console.log("Audio feedback suppressed by browser policy."))
        } catch (e) {}

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NoorNexus | ইনকামিং সিগন্যাল", {
            body: "কমান্ডার, আপনার সুরক্ষা হাবে একটি সিস্টেম লেভেল কল এসেছে।",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'active-call',
            requireInteraction: true
          })
        }

        toast({
          title: "🚨 সিস্টেম লেভেল কল সিগন্যাল",
          description: "Sovereign Foreground Service থেকে একটি জরুরি কল রিকোয়েস্ট এসেছে।",
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
                <PhoneIncoming className="size-3" /> Standard Hub
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 gap-2 font-bold uppercase text-[10px] h-10 px-4"
                onClick={() => router.push("/shurukkha-imperial")}
              >
                <ShieldCheck className="size-3" /> Imperial Node
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
      {/* Visual Indicator of Persistent Listener in Admin View */}
      {swRegistered && (
        <div className="absolute top-2 right-2 p-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-md z-[50]">
          <Activity className="size-3 text-emerald-500 animate-pulse" />
        </div>
      )}

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
