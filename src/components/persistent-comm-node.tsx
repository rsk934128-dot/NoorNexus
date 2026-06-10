
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node (V4 Reinforced)
 * এই কম্পোনেন্টটি ব্যাকগ্রাউন্ডে সুরক্ষা হাবকে সচল রাখে এবং কলের সিগন্যাল খুঁজে বের করে।
 * সাইডবার যাতে দৃশ্যমান থাকে সেজন্য z-index এবং লেআউট অ্যাডজাস্ট করা হয়েছে।
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
    
    // ১. নোটিফিকেশন পারমিশন রিকোয়েস্ট
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    // ২. অ্যাডভান্সড মেসেজ লিসেনার (Cross-Origin Message Detection)
    const handleMessage = (event: MessageEvent) => {
      // Debug: কনসোলে মেসেজ দেখা যাবে যদি কোনো সিগন্যাল আসে
      console.log("[NoorNexus-Link] Received message from node:", event.data);

      const data = event.data;
      if (!data) return;

      const msgStr = typeof data === 'string' ? data : JSON.stringify(data);
      // কল ডিটেকশনের জন্য আরও কি-ওয়ার্ড
      const callKeywords = /incoming|call|ring|dial|offer|invite|request_access|peer|joined/i;
      const isCallSignal = callKeywords.test(msgStr);

      if (isCallSignal) {
        // ১০ সেকেন্ডের মধ্যে একাধিক টোস্ট যাতে না আসে
        if (Date.now() - lastToastTime.current < 10000) return;
        lastToastTime.current = Date.now();

        // অডিও এলার্ট (যদি ব্রাউজার এলাউ করে)
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
          audio.volume = 0.5;
          audio.play().catch(() => console.log("Audio autoplay blocked. Need user interaction."));
        } catch (e) {}

        // ব্রাউজার পুশ নোটিফিকেশন
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NoorNexus | IMPERIAL CALL", {
            body: "A secure communication link is ringing. Respond immediately.",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'call-signal',
            requireInteraction: true,
          });
        }

        // ইন-অ্যাপ টোস্ট নোটিফিকেশন
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

  if (!mounted) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 transition-all duration-700 ease-in-out",
        // z-index 30 যাতে এটি সাইডবার (z-50) এর নিচে থাকে কিন্তু মেইন কন্টেন্ট এর উপরে
        isShurukkhaPage ? "opacity-100 z-30 pointer-events-auto" : "opacity-0 -z-50 pointer-events-none"
      )}
    >
      <div className={cn(
        "w-full h-full flex flex-col bg-background transition-all duration-500",
        "md:pl-[16rem]" // Sidebar width offset for desktop
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
