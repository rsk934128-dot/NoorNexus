
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node (V4.3 Recovery)
 * এটি ব্যাকগ্রাউন্ডে ইনভিজিবল থেকে কল সিগন্যাল মনিটর করে।
 * ব্যবহারকারীর অনুরোধে পুরানো লিঙ্কটি এখানে সেট করা হয়েছে।
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
          new Notification("NoorNexus | INCOMING CALL", {
            body: "A secure communication link is ringing on Standard Hub.",
            icon: 'https://picsum.photos/seed/sovereign/192/192',
            tag: 'call-signal',
          });
        }

        toast({
          title: "CRITICAL CALL SIGNAL",
          description: "Response requested via Shurukkha Standard Hub.",
          variant: "default",
          action: (
            <Button 
              variant="default" 
              size="sm" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px]"
              onClick={() => router.push("/shurukkha-standard")}
            >
              <PhoneIncoming className="size-3" />
              ANSWER
            </Button>
          ),
          duration: 15000, 
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router, toast]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1]">
      {/* ব্যাকগ্রাউন্ড কল ডিটেকশনের জন্য পুরানো লিঙ্ক (Sovereign Recommended) */}
      <iframe 
        src="https://shurukkha-hub.sirajganj.gov.bd/dashboard" 
        title="Background Comm Node"
        allow="camera; microphone; display-capture; autoplay"
        sandbox="allow-same-origin allow-scripts allow-popovers allow-forms"
      />
    </div>
  )
}
