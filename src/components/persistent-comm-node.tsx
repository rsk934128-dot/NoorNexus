
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldCheck, Wifi } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node (V4.5 Global Sync)
 * নূরনেক্সাস সাম্রাজ্যের গ্লোবাল কলিং মেকানিজম। 
 * এটি ব্যাকগ্রাউন্ডে সবসময় অ্যাক্টিভ থাকে যাতে যে কোনো পেজ থেকে কল রিসিভ করা যায়।
 */
export function PersistentCommNode() {
  const router = useRouter()
  const { toast } = useToast()
  const lastToastTime = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // ব্রাউজার নোটিফিকেশন পারমিশন চেক
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;

      // বিভিন্ন ধরনের কল সিগন্যাল ডিটেকশন (Regex matching for reliability)
      const msgStr = typeof data === 'string' ? data : JSON.stringify(data);
      const callKeywords = /incoming|call|ring|dial|offer|invite|request_access|peer|joined|waiting|connect|rtc/i;
      const isCallSignal = callKeywords.test(msgStr);

      if (isCallSignal) {
        // স্প্যাম বা ডুপ্লিকেট নোটিফিকেশন রোধে ১৫ সেকেন্ডের গ্যাপ
        if (Date.now() - lastToastTime.current < 15000) return;
        lastToastTime.current = Date.now();

        // অডিও অ্যালার্ট (ইম্পেরিয়াল টিউন)
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
          audio.volume = 0.6;
          audio.play().catch(() => console.log("Audio interaction required first."));
        } catch (e) {}

        // ডেস্কটপ নোটিফিকেশন (যদি ব্রাউজার মিনিমাইজ থাকে)
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NoorNexus | ইনকামিং কল", {
            body: "কমান্ডার, আপনার সুরক্ষা হাবে একটি জরুরি কল এসেছে। এখনই সাড়া দিন।",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'call-signal',
            requireInteraction: true
          });
        }

        // ইন-অ্যাপ টোস্ট অ্যালার্ট (ইম্পেরিয়াল গ্লো)
        toast({
          title: "🚨 ইনকামিং কল সিগন্যাল",
          description: "সার্বভৌম নেটওয়ার্ক থেকে একটি নতুন কানেকশন রিকোয়েস্ট এসেছে।",
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
                className="border-primary/50 text-primary hover:bg-primary/10 gap-2 font-bold uppercase text-[10px] h-10 px-4"
                onClick={() => {
                  router.push("/shurukkha-imperial");
                }}
              >
                <ShieldCheck className="size-3" />
                Imperial
              </Button>
            </div>
          ),
          duration: 45000, // ৪৫ সেকেন্ড স্থায়ী থাকবে
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router, toast]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1]">
      {/* 
         ব্যাকগ্রাউন্ড লিসেনার: আপনার নির্দেশমতো পুরানো স্টেবল লিঙ্কটি এখানে লিসেনার হিসেবে রাখা হয়েছে 
         যাতে গ্লোবাল কলিং সিগন্যাল সবসময় পাওয়া যায়।
      */}
      <iframe 
        src="https://shurukkha-hub.sirajganj.gov.bd/dashboard" 
        title="Imperial Persistent Listener"
        allow="camera; microphone; display-capture; autoplay; clipboard-write; encrypted-media"
        sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
      />
    </div>
  )
}
