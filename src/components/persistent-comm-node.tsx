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
 * Integrated with Browser Notification API and In-App Toast for incoming signals.
 */
export function PersistentCommNode() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const isShurukkhaPage = pathname === "/shurukkha"

  useEffect(() => {
    // 1. Request Notification Permissions on Mount
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    // 2. Listen for "Call" messages from the Shurukkha Iframe
    const handleMessage = (event: MessageEvent) => {
      // In production, we should check event.origin for security
      // Expected payload from Shurukkha Hub: { type: 'INCOMING_CALL' } or { action: 'call' }
      if (event.data && (event.data.type === 'INCOMING_CALL' || event.data.action === 'call' || event.data.event === 'incoming-call')) {
        
        // A. Show OS Level Notification (For Background)
        showImperialNotification(
          "Incoming Secure Call",
          "A protection request is pending in Shurukkha Hub."
        );

        // B. Show In-App UI Notification (For Foreground)
        // We only show this if the user is NOT already on the Shurukkha page
        if (!isShurukkhaPage) {
          toast({
            title: "Imperial Call Signal",
            description: "An incoming secure transmission is detected.",
            action: (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold uppercase text-[10px]"
                onClick={() => router.push("/shurukkha")}
              >
                <PhoneIncoming className="size-3" />
                Answer
              </Button>
            ),
            duration: 10000, // Show for 10 seconds
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
        tag: 'shurukkha-call',
        renotify: true
      });
    }
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 transition-opacity duration-500 ease-in-out pointer-events-none",
        isShurukkhaPage ? "opacity-100 z-10" : "opacity-0 -z-50"
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
