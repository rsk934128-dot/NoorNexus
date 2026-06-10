"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Shield, ExternalLink, ShieldCheck, Phone, RefreshCcw, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * @fileOverview Shurukkha Hub Page (Imperial Edition)
 * This page serves as a transparent window to the PersistentCommNode iframe.
 */
export default function ShurukkhaPage() {
  const refreshNode = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-transparent">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0 bg-transparent">
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative bg-transparent">
          {/* Imperial Header */}
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/90 backdrop-blur-md shrink-0 w-full z-50">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Shield className="size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-primary truncate leading-none flex items-center gap-2">
                  Shurukkha Hub
                  <Sparkles className="size-4 text-amber-500 animate-pulse" />
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Protection Node (Imperial)</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7 animate-pulse">
                <Phone className="size-3.5" />
                <span className="text-[10px]">Secure Line Active</span>
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={refreshNode}
                className="text-muted-foreground hover:text-primary size-8"
              >
                <RefreshCcw className="size-4" />
              </Button>
              <a 
                href="https://shurukkha-hub-imperial-sovereign-in.vercel.app/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors bg-white/5 px-4 py-2 rounded-md border border-white/10"
              >
                <span className="hidden sm:inline uppercase tracking-widest text-[10px]">Launch External</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </header>

          {/* Transparent interaction area */}
          <div className="flex-1 bg-transparent pointer-events-none" />
          
          <footer className="py-2 border-t border-white/5 bg-background/90 shrink-0 text-center w-full z-50">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
              NoorNexus OS Imperial Sync | Endpoint: shurukkha-hub-imperial
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}