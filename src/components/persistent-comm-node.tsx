
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node (V4.1 Reinforced)
 * এই কম্পোনেন্টটি হাইড্রেশন এরর মুক্ত করা হয়েছে এবং ব্যাকগ্রাউন্ডে সুরক্ষা হাবকে সচল রাখে।
 */
export function PersistentCommNode() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const lastToastTime = useRef<number>(0)
  const [mounted, setMounted] = useState(false)
  
  const isShurukkhaPage = pathname === "/shurukkha"

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
      const callKeywords = /incoming|call|ring|dial|offer|invite|request_access|peer|joined/i;
      const isCallSignal = callKeywords.test(msgStr);

      if (isCallSignal) {
        if (Date.now() - lastToastTime.current < 10000) return;
        lastToastTime.current = Date.now();

        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
          audio.volume = 0.5;
          audio.play().catch(() => console.log("Audio autoplay blocked."));
        } catch (e) {}

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NoorNexus | IMPERIAL CALL", {
            body: "A secure communication link is ringing. Respond immediately.",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'call-signal',
            requireInteraction: true,
          });
        }

        if (!isShurukkhaPage) {
          toast({
            title: "CRITICAL CALL SIGNAL DETECTED",
            description: "The Sovereign Guard is requesting a response via Shurukkha Hub.",
            variant: "default",
            action: (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px] glow-emerald shadow-lg"
                onClick={() => {
                  router.push("/shurukkha");
                }}
              >
                <PhoneIncoming className="size-3" />
                ANSWER NOW
              </Button>
            ),
            duration: 20000, 
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isShurukkhaPage, router, toast]);

  // হাইড্রেশন এরর এড়াতে আমরা সবসময় রুট ডিভ রিটার্ন করি, কিন্তু কন্টেন্ট মাউন্ট হওয়ার পর দেখাই
  return (
    <div 
      className={cn(
        "fixed inset-0 transition-all duration-700 ease-in-out",
        mounted && isShurukkhaPage ? "opacity-100 z-30 pointer-events-auto" : "opacity-0 -z-50 pointer-events-none"
      )}
    >
      {mounted && (
        <div className={cn(
          "w-full h-full flex flex-col bg-background transition-all duration-500",
          "md:pl-[16rem]" 
        )}>
          <iframe 
            src="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
            className="w-full h-full border-0 bg-white"
            title="Shurukkha Persistent Node"
            allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media; geolocation"
            sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation"
          />
        </div>
      )}
    </div>
  )
}
