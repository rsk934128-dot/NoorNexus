"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, Cloud, Radio, PhoneCall, Globe, Tv, Sparkles } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

/**
 * @fileOverview Global Persistent Communication Node (V5.8 - Media Optimized)
 * নূরনেক্সাস সাম্রাজ্যের প্রতিটি পেজে "Shurukkha", "Famelack" এবং "Toffee" হাবের পারসিস্টেন্স নিশ্চিত করে।
 * Updated: Optimized icon scaling and safe area spacing for mobile devices.
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
  const isFamelackActive = pathname === "/famelack"
  const isToffeeActive = pathname === "/toffee"
  
  const sidebarWidth = isMobile ? '0px' : (open ? '16rem' : '3rem')
  const headerHeight = '64px' // Standard app header height

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[100] flex flex-col gap-3 sm:gap-5 items-center pointer-events-auto pb-[env(safe-area-inset-bottom)]">
        
        {/* Universal Toffee Live Trigger */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                <Button 
                  onClick={() => router.push("/toffee")}
                  className={`size-10 sm:size-14 rounded-2xl p-0 flex items-center justify-center transition-all duration-500 shadow-2xl border-2 ${isToffeeActive ? 'bg-red-600 border-white glow-destructive scale-110' : 'bg-black/80 border-white/10 hover:border-red-500/50'}`}
                >
                  <Tv className={`size-4 sm:size-6 ${isToffeeActive ? 'text-white' : 'text-red-500'}`} />
                  {!isToffeeActive && <Sparkles className="absolute -top-1 -right-1 size-3 text-amber-500 animate-pulse" />}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black/95 border-red-500/50 hidden sm:block">
               <p className="text-[10px] font-bold uppercase tracking-widest">Open Toffee Live</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                <Button 
                  onClick={() => router.push("/famelack")}
                  className={`size-10 sm:size-14 rounded-2xl p-0 flex items-center justify-center transition-all duration-500 shadow-2xl border-2 ${isFamelackActive ? 'bg-primary border-white glow-primary scale-110' : 'bg-black/80 border-white/10 hover:border-primary/50'}`}
                >
                  <Globe className={`size-4 sm:size-6 ${isFamelackActive ? 'text-white animate-pulse' : 'text-primary'}`} />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black/95 border-primary/50 hidden sm:block">
               <p className="text-[10px] font-bold uppercase tracking-widest">Open Famelack Hub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                {isIncoming && (
                  <div className="absolute -inset-4 sm:-inset-5 bg-emerald-500/30 rounded-full animate-ping pointer-events-none" />
                )}
                <Button 
                  onClick={() => router.push("/shurukkha-standard")}
                  className={`size-12 sm:size-16 rounded-full p-0 flex items-center justify-center transition-all duration-500 shadow-2xl border-2 ${isIncoming ? 'bg-destructive animate-bounce border-white' : isStandardActive ? 'bg-emerald-500 border-white glow-emerald scale-110' : 'bg-emerald-500/80 border-emerald-400/30 hover:scale-110 glow-emerald'}`}
                >
                  {isIncoming ? (
                    <PhoneIncoming className="size-5 sm:size-7 text-white animate-pulse" />
                  ) : (
                    <Cloud className="size-6 sm:size-8 text-white" />
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black/95 border-emerald-500/50 hidden sm:block">
               <p className="text-[10px] font-bold uppercase tracking-widest">Open Shurukkha Hub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="fixed inset-0 z-[40] pointer-events-none overflow-hidden">
        <div 
          className={`absolute inset-x-0 bottom-0 transition-all duration-700 ease-in-out bg-white ${isStandardActive ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 translate-y-full'}`}
          style={{ 
            left: isStandardActive ? sidebarWidth : '100%', 
            top: headerHeight,
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
          className={`absolute inset-x-0 bottom-0 transition-all duration-700 ease-in-out bg-white ${isImperialActive ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 translate-y-full'}`}
          style={{ 
            left: isImperialActive ? sidebarWidth : '100%', 
            top: headerHeight,
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

        <div 
          className={`absolute inset-x-0 bottom-0 transition-all duration-700 ease-in-out bg-white ${isFamelackActive ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 translate-y-full'}`}
          style={{ 
            left: isFamelackActive ? sidebarWidth : '100%', 
            top: headerHeight,
            visibility: isFamelackActive ? 'visible' : 'hidden'
          }}
        >
          <iframe 
            src="https://famelack.com/" 
            className="w-full h-full border-0"
            title="Famelack Hub Node"
            allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media; payment"
            sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation"
            loading="lazy"
          />
        </div>
      </div>
    </>
  )
}
