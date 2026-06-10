
"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

/**
 * @fileOverview Persistent Communication Node
 * This component keeps the Shurukkha Hub active in the background 
 * across the entire application session to ensure calls are never missed.
 * Updated: Fixed z-index and pointer-events for full control.
 */
export function PersistentCommNode() {
  const pathname = usePathname()
  const isShurukkhaPage = pathname === "/shurukkha"

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
        // Offset the content area on desktop to make room for the sidebar
        "md:pl-64" 
      )}>
        {/* Only the iframe inside this div gets pointer-events when on the page */}
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
