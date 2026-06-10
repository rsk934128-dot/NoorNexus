
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { ShieldCheck, RefreshCcw, Cloud, Sparkles, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * @fileOverview Shurukkha Hub Standard Edition (UI Shell)
 * এই পেজটি এখন আর রিলোড হয় না। কন্টেন্টটি PersistentCommNode থেকে সরাসরি প্রদর্শিত হয়।
 */
export default function ShurukkhaStandardPage() {
  const refreshFrame = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative">
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0 w-full z-50">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 glow-emerald shrink-0">
                <Cloud className="size-6 text-emerald-500" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-emerald-500 truncate leading-none flex items-center gap-2">
                  Shurukkha Standard
                  <Sparkles className="size-4 text-emerald-400 animate-pulse" />
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Cloud Node: Standard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7 bg-emerald-500/5">
                <ShieldCheck className="size-3.5" />
                <span className="text-[10px] font-bold">Persistent Uplink</span>
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={refreshFrame} 
                className="text-muted-foreground hover:text-emerald-500 size-8"
              >
                <RefreshCcw className="size-4" />
              </Button>
            </div>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-black/20 text-center p-6">
            <Loader2 className="size-10 text-emerald-500 animate-spin" />
            <p className="text-sm font-mono text-emerald-500/60 uppercase tracking-widest">
              Sovereign Handshake Active...
            </p>
            <p className="text-[10px] text-muted-foreground italic">
              (The hub is active and persistent in the background for zero-reload calling)
            </p>
          </div>
          
          <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full">
            <p className="text-[9px] font-mono text-emerald-500/60 uppercase tracking-[0.4em]">
              NoorNexus OS Integrated Cloud Node | Endpoint: shurukkha-hub-ofzc
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
