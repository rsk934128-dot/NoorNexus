
"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ShieldCheck } from "lucide-react"

/**
 * @fileOverview Persistent Communication Node
 * This component keeps the Shurukkha Hub active in the background 
 * across the entire application session to ensure calls are never missed.
 */
export function PersistentCommNode() {
  const pathname = usePathname()
  const isShurukkhaPage = pathname === "/shurukkha"

  return (
    <div 
      className={cn(
        "transition-all duration-500 ease-in-out",
        isShurukkhaPage 
          ? "fixed inset-0 z-0 md:left-[16rem] lg:left-[16rem]" 
          : "fixed -z-50 opacity-0 pointer-events-none w-px h-px overflow-hidden"
      )}
    >
      <div className="w-full h-full flex flex-col bg-background">
        {/* Only show the iframe UI when on the specific route, 
            but keep the iframe element MOUNTED at all times */}
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
