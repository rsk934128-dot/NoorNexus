
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldCheck, Zap, Activity, Cloud, Radio, BellRing, PhoneCall } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

/**
 * @fileOverview Global Persistent Communication Node (V5.6 - Sovereign Calling Edition)
 * নূরনেক্সাস সাম্রাজ্যের প্রতিটি পেজে "Sovereign Cloud Node: Standard" কলিং লোগো এবং পারসিস্টেন্স নিশ্চিত করে।
 */
export function PersistentCommNode() {
  const [isMounted, setIsMounted] = useState(false)
  const [swRegistered, setSwRegistered] = useState(false)
  const [isIncoming, setIsIncoming] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { open, isMobile } = useSidebar()
  const lastToastTime = useRef<number>(0)

  useEffect(() => {
    setIsMounted(true)
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('[NoorNexus-SW] Registered for persistent listening:', reg.scope);
          setSwRegistered(true);
        })
        .catch((err) => console.log('[NoorNexus-SW] Registration failed:', err));
    }
  }, [])

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
      
      const callKeywords = /incoming_call|call_incoming|incoming-call|trigger_ringtone|call_signal_active|system_alert/i
      const isCallSignal = callKeywords.test(msgStr)

      if (isCallSignal) {
        setIsIncoming(true)
        const SPAM_THRESHOLD = 300000 
        if (Date.now() - lastToastTime.current < SPAM_THRESHOLD) return
        lastToastTime.current = Date.now()

        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3')
          audio.volume = 0.5
          audio.play().catch(() => console.log("Audio feedback suppressed."))
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
          title: "🚨 ইনকামিং কল সিগন্যাল",
          description: "Sovereign Cloud Node থেকে কল রিকোয়েস্ট এসেছে।",
          variant: "default",
          className: "border-emerald-500/50 bg-black/95 backdrop-blur-2xl border-l-4 z-[9999]",
          action: (
            <div className="flex flex-col gap-2">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px] glow-emerald h-10 px-4"
                onClick={() => { router.push("/shurukkha-standard"); setIsIncoming(false); }}
              >
                <PhoneCall className="size-3" /> Answer Call
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
    <>
      {/* Persistent Floating Cloud Node Logo */}
      <div className="fixed bottom-6 right-6 z-[100] pointer-events-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                {isIncoming && (
                  <div className="absolute -inset-4 bg-emerald-500/20 rounded-full animate-ping pointer-events-none" />
                )}
                <Button 
                  onClick={() => router.push("/shurukkha-standard")}
                  className={`size-14 rounded-full p-0 flex items-center justify-center transition-all duration-500 shadow-2xl border-2 ${isIncoming ? 'bg-destructive animate-bounce border-white' : 'bg-emerald-500 border-emerald-400/50 hover:scale-110 glow-emerald'}`}
                >
                  {isIncoming ? (
                    <PhoneIncoming className="size-6 text-white animate-pulse" />
                  ) : (
                    <Cloud className="size-7 text-white" />
                  )}
                </Button>
                
                {/* Node Status Badge */}
                <div className="absolute -top-1 -right-1">
                   <div className={`size-3 rounded-full border-2 border-black ${swRegistered ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                </div>

                {/* Label on Hover */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
                   <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Sovereign Cloud Node</p>
                   <p className="text-[8px] text-white/60 uppercase font-mono">STATUS: {swRegistered ? 'SYNCHRONIZED' : 'INITIALIZING'}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black/90 border-emerald-500/50">
               <p className="text-[10px] font-bold uppercase tracking-tight">Open Shurukkha Hub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="fixed inset-0 z-[40] pointer-events-none overflow-hidden">
        {swRegistered && (
          <div className="absolute top-2 right-2 p-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-md z-[50]">
            <Activity className="size-3 text-emerald-500 animate-pulse" />
          </div>
        )}

        <div 
          className={`absolute inset-y-0 right-0 transition-all duration-700 ease-in-out bg-white ${isStandardActive ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
          style={{ 
            left: isStandardActive ? sidebarWidth : '100%', 
            top: isStandardActive ? '0' : '0',
            visibility: isStandardActive ? 'visible' : 'hidden'
          }}
        >
          <iframe 
            src="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
            className="w-full h-full border-0"
            title="Standard Hub Node"
            allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
            sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
            loading="lazy"
          />
        </div>

        <div 
          className={`absolute inset-y-0 right-0 transition-all duration-700 ease-in-out bg-white ${isImperialActive ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
          style={{ 
            left: isImperialActive ? sidebarWidth : '100%', 
            top: isImperialActive ? '0' : '0',
            visibility: isImperialActive ? 'visible' : 'hidden'
          }}
        >
          <iframe 
            src="https://shurukkha-hub-imperial-sovereign-in.vercel.app/dashboard" 
            className="w-full h-full border-0"
            title="Imperial Hub Node"
            allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
            sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
            loading="lazy"
          />
        </div>

        {/* Hidden Stable Listener */}
        <div className="absolute bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
          <iframe 
            src="https://shurukkha-hub.sirajganj.gov.bd/dashboard" 
            title="Stable Persistent Listener"
            allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
            sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
            loading="lazy"
          />
        </div>
      </div>
    </>
  )
}
