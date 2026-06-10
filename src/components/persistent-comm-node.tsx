"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldAlert, BellRing } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node (V3 Reinforced)
 * এই কম্পোনেন্টটি ব্যাকগ্রাউন্ডে সুরক্ষা হাবকে সচল রাখে এবং কলের সিগন্যাল খুঁজে বের করে।
 */
export function PersistentCommNode() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const lastToastTime = useRef<number>(0)
  
  const isShurukkhaPage = pathname === "/shurukkha"

  useEffect(() => {
    // ১. নোটিফিকেশন পারমিশন চেক
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }

    // ২. শক্তিশালী মেসেজ লিসেনার
    const handleMessage = (event: MessageEvent) => {
      // ডিব্যাগিংয়ের জন্য কনসোলে প্রিন্ট করা হবে
      console.log("[NoorNexus-Sync] Message Received from Node:", event.data);

      const data = event.data;
      if (!data) return;

      // মেসেজটিকে স্ট্রিংয়ে রূপান্তর করে সার্চ করা হবে
      const msgStr = typeof data === 'string' ? data : JSON.stringify(data);
      
      // কলের জন্য কি-ওয়ার্ড সার্চ (Broad Pattern Matching)
      const callKeywords = /incoming|call|ring|dial|offer|invite|request_access|peer/i;
      const isCallSignal = callKeywords.test(msgStr);

      if (isCallSignal) {
        // স্প্যাম রোধ করতে ১০ সেকেন্ডের গ্যাপ রাখা হয়েছে
        if (Date.now() - lastToastTime.current < 10000) return;
        lastToastTime.current = Date.now();

        // এলার্ট সাউন্ড (যদি সম্ভব হয়)
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
          audio.play().catch(() => {/* Browser blocked autoplay */});
        } catch (e) {}

        // ক. ওএস লেভেল নোটিফিকেশন
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NoorNexus | IMPERIAL CALL", {
            body: "A secure communication link is ringing. Open Shurukkha Hub now.",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            requireInteraction: true,
          });
        }

        // খ. ইন-অ্যাপ টোস্ট নোটিফিকেশন (যদি অন্য পেজে থাকেন)
        if (!isShurukkhaPage) {
          toast({
            title: "CRITICAL CALL SIGNAL DETECTED",
            description: "The Sovereign Guard is requesting a response.",
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

  return (
    <div 
      className={cn(
        "fixed inset-0 transition-opacity duration-700 ease-in-out pointer-events-none",
        isShurukkhaPage ? "opacity-100 z-[9999]" : "opacity-0 -z-50"
      )}
    >
      <div className={cn(
        "w-full h-full flex flex-col bg-background transition-all duration-500",
        isShurukkhaPage ? "pointer-events-auto" : "pointer-events-none",
        "md:pl-64" 
      )}>
        <iframe 
          src="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
          className="w-full h-full border-0 bg-white"
          title="Shurukkha Persistent Node"
          allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media; geolocation"
          sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation"
        />
      </div>
    </div>
  )
}
