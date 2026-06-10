"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

/**
 * @fileOverview Persistent Communication Node
 * Kepps Shurukkha Hub active background and handles Call Notifications.
 * Integrated with Browser Notification API for incoming signals.
 */
export function PersistentCommNode() {
  const pathname = usePathname()
  const isShurukkhaPage = pathname === "/shurukkha"

  useEffect(() => {
    // 1. Request Notification Permissions on Mount
    if ("Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    // 2. Listen for "Call" messages from the Shurukkha Iframe
    // Note: This assume the external site uses postMessage to communicate events
    const handleMessage = (event: MessageEvent) => {
      // In production, we should check event.origin for security
      if (event.data && (event.data.type === 'INCOMING_CALL' || event.data.action === 'call')) {
        showImperialNotification(
          "Incoming Secure Call",
          "A protection request is pending in Shurukkha Hub."
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const showImperialNotification = (title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
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
