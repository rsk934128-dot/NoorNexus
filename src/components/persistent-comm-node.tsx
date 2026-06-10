"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PhoneIncoming } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node
 * Keeps Shurukkha Hub active background and handles Call Notifications.
 * Enhanced: Universal message detection and forced foreground visibility.
 */
export function PersistentCommNode() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const isShurukkhaPage = pathname === "/shurukkha"

  useEffect(() => {
    // 1. Request Notification Permissions
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    // 2. Listen for messages from ANY source (Broad detection for Iframe calls)
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      
      // Attempt to parse if stringified
      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          data = parsed;
        } catch (e) {
          // Stay as string
        }
      }

      if (!data) return;

      // Deep keyword scan for call-related signals
      const dataString = JSON.stringify(data).toLowerCase();
      const isCallSignal = 
        dataString.includes('call') || 
        dataString.includes('incoming') || 
        dataString.includes('ringing') ||
        dataString.includes('dialing') ||
        dataString.includes('offer');

      if (isCallSignal) {
        // A. Show OS Level Notification
        showImperialNotification(
          "NoorNexus | Incoming Call",
          "A secure protection request is ringing in Shurukkha Hub."
        );

        // B. Force Foreground Toast (Only if not already on the page)
        if (!isShurukkhaPage) {
          toast({
            title: "Imperial Call Signal Detected",
            description: "A secure transmission is ringing. Answer now?",
            variant: "default",
            action: (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px] glow-emerald"
                onClick={() => {
                  router.push("/shurukkha");
                }}
              >
                <PhoneIncoming className="size-3" />
                Answer
              </Button>
            ),
            duration: 20000, // Long duration for priority calls
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isShurukkhaPage, router, toast]);

  const showImperialNotification = (title: string, body: string) => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: 'https://picsum.photos/seed/sovereign-logo/192/192',
        tag: 'noornexus-call-priority',
        requireInteraction: true,
        vibrate: [200, 100, 200]
      });
    }
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 transition-opacity duration-500 ease-in-out pointer-events-none",
        isShurukkhaPage ? "opacity-100 z-50" : "opacity-0 -z-50"
      )}
    >
      <div className={cn(
        "w-full h-full flex flex-col bg-background transition-all duration-300",
        isShurukkhaPage ? "pointer-events-auto" : "pointer-events-none",
        "md:pl-64" 
      )}>
        <iframe 
          src="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
          className="w-full h-full border-0 bg-white"
          title="Shurukkha Persistent Node"
          allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation allow-orientation-lock"
        />
      </div>
    </div>
  )
}
