
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming, ShieldCheck } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node (V4.4 Global Sync)
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
      const callKeywords = /incoming|call|ring|dial|offer|invite|request_access|peer|joined|waiting|connect/i;
      const isCallSignal = callKeywords.test(msgStr);

      if (isCallSignal) {
        // স্প্যাম বা ডুপ্লিকেট নোটিফিকেশন রোধে ১০ সেকেন্ডের গ্যাপ
        if (Date.now() - lastToastTime.current < 10000) return;
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
            body: "কমান্ডার, আপনার জন্য একটি জরুরি কল এসেছে। এখনই সাড়া দিন।",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'call-signal',
            requireInteraction: true
          });
        }

        // ইন-অ্যাপ টোস্ট অ্যালার্ট
        toast({
          title: "🚨 জরুরি কল সিগন্যাল",
          description: "Shurukkha Standard হাব থেকে একটি ইনকামিং কানেকশন ডিটেক্ট করা হয়েছে।",
          variant: "default",
          action: (
            <Button 
              variant="default" 
              size="sm" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px] glow-emerald"
              onClick={() => {
                // কল রিসিভ করতে স্ট্যান্ডার্ড হাবে রিডাইরেক্ট
                router.push("/shurukkha-standard");
              }}
            >
              <PhoneIncoming className="size-3" />
              রিসিভ করুন
            </Button>
          ),
          duration: 30000, // ৩০ সেকেন্ড স্থায়ী থাকবে
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
         ব্যাকগ্রাউন্ড লিসেনার: আপনার নির্দেশমতো পুরানো স্টেবল লিঙ্কটি এখানে রাখা হয়েছে 
         যাতে অ্যাপের যে কোনো জায়গা থেকে কাজ করলেও কল সিগন্যাল পাওয়া যায়।
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
