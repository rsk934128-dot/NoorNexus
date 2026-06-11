
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldCheck } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

/**
 * @fileOverview Global Persistent Communication Node (V5.1)
 * Optimized for Next.js 15 hydration stability.
 * This component keeps the communication hubs alive in the background.
 */
export function PersistentCommNode() {
  const [mounted, setMounted] = useState(false)

  // Ensure the component only renders its logic on the client after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return null to match the server's initial render exactly
    return null
  }

  return <RealPersistentCommNode />
}

/**
 * Inner component containing all the client-side logic.
 * This only runs after the component has successfully mounted on the client.
 */
function RealPersistentCommNode() {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { open, isMobile } = useSidebar()
  const lastToastTime = useRef<number>(0)

  const isStandardActive = pathname === "/shurukkha-standard"
  const isImperialActive = pathname === "/shurukkha-imperial"

  useEffect(() => {
    // Request notification permission if not already granted
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;

      const msgStr = typeof data === 'string' ? data : JSON.stringify(data);
      const callKeywords = /incoming|call|ring|dial|offer|invite|request_access|peer|joined|waiting|connect|rtc/i;
      const isCallSignal = callKeywords.test(msgStr);

      if (isCallSignal) {
        // Prevent toast spamming within 15 seconds
        if (Date.now() - lastToastTime.current < 15000) return;
        lastToastTime.current = Date.now();

        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
          audio.volume = 0.6;
          audio.play().catch(() => console.log("Interaction required for audio play."));
        } catch (e) {
          // Silently fail if audio playback is blocked
        }

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NoorNexus | ইনকামিং কল", {
            body: "কমান্ডার, আপনার সুরক্ষা হাবে একটি জরুরি কল এসেছে। এখনই সাড়া দিন।",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'call-signal',
            requireInteraction: true
          });
        }

        toast({
          title: "🚨 ইনকামিং কল সিগন্যাল",
          description: "সার্বভৌম নেটওয়ার্কের দুটি চ্যানেল থেকেই কানেকশন রিকোয়েস্ট এসেছে।",
          variant: "default",
          className: "border-emerald-500/50 bg-black/90 backdrop-blur-2xl border-l-4",
          action: (
            <div className="flex flex-col gap-2">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px] glow-emerald h-10 px-4"
                onClick={() => {
                  router.push("/shurukkha-standard");
                }}
              >
                <PhoneIncoming className="size-3" />
                Standard
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 gap-2 font-bold uppercase text-[10px] h-10 px-4"
                onClick={() => {
                  router.push("/shurukkha-imperial");
                }}
              >
                <ShieldCheck className="size-3" />
                Imperial
              </Button>
            </div>
          ),
          duration: 45000,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router, toast]);

  // Sidebar width logic for positioning the hubs
  const sidebarWidth = isMobile ? '0px' : (open ? '16rem' : '3rem')

  return (
    <>
      {/* 1. Persistent Standard Hub (ofzc.vercel.app) */}
      <div 
        className={`fixed top-0 bottom-0 right-0 z-[40] transition-all duration-300 overflow-hidden bg-white ${isStandardActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none w-1 h-1'}`}
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

      {/* 2. Persistent Imperial Hub */}
      <div 
        className={`fixed top-0 bottom-0 right-0 z-[40] transition-all duration-300 overflow-hidden bg-white ${isImperialActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none w-1 h-1'}`}
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

      {/* 3. Hidden Background Stable Listener (gov.bd) */}
      <div className="fixed bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1]">
        <iframe 
          src="https://shurukkha-hub.sirajganj.gov.bd/dashboard" 
          title="Stable Persistent Listener"
          allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
          sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
        />
      </div>
    </>
  )
}
