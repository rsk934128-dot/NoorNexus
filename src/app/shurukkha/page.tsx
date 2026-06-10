
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Shield, ExternalLink, ShieldCheck, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

/**
 * @fileOverview Shurukkha Hub Page (Window View)
 * This page acts as the viewing window for the persistent communication node.
 * The actual iframe is managed in PersistentCommNode to prevent call drops.
 * Fixed: Ensured absolute transparency and pass-through for interactions.
 */
export default function ShurukkhaPage() {
  return (
    <div className="flex min-h-screen bg-transparent">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0 bg-transparent">
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative bg-transparent">
          {/* Transparent Header */}
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/95 backdrop-blur-md shrink-0 w-full z-20">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Shield className="size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-primary truncate leading-none">Shurukkha Hub</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Protection Node</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7 animate-pulse">
                <Phone className="size-3.5" />
                <span className="text-[10px]">Call Link Active</span>
              </Badge>
              <a 
                href="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors bg-white/5 px-4 py-2 rounded-md border border-white/10"
              >
                <span>Launch Node</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </header>

          {/* This area must be completely interactive for the iframe below it */}
          <div className="flex-1 bg-transparent pointer-events-none" />
          
          {/* Transparent Footer */}
          <footer className="py-2 border-t border-white/5 bg-background/90 shrink-0 text-center w-full z-20">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
              NoorNexus OS Persistent Comm-Link | Node: shurukkha-hub
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
