
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldCheck, Wifi } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node (V4.7 Emerald Sync)
 * নূরনেক্সাস সাম্রাজ্যের গ্লোবাল কলিং মেকানিজম। 
 * এখন এটি সবুজ (Emerald) থিমের কলিং বাটন সাপোর্ট করে।
 */
export function PersistentCommNode() {
  const router = useRouter()
  const { toast } = useToast()
  const lastToastTime = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
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
        if (Date.now() - lastToastTime.current < 15000) return;
        lastToastTime.current = Date.now();

        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
          audio.volume = 0.6;
          audio.play().catch(() => console.log("Interaction required for audio play."));
        } catch (e) {}

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
          className: "border-emerald-500/50 bg-black/90 backdrop-blur-2xl",
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

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1]">
      <iframe 
        src="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
        title="Standard Persistent Listener"
        allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
        sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
      />
      <iframe 
        src="https://shurukkha-hub.sirajganj.gov.bd/dashboard" 
        title="Stable Persistent Listener"
        allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
        sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
      />
    </div>
  )
}
