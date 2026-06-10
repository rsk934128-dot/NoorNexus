
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ExternalLink, ShieldCheck, RefreshCcw, Cloud, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * @fileOverview Shurukkha Hub Standard Edition (Sovereign Cloud Node)
 * এটি আপনার স্ট্যান্ডার্ড নোড হিসেবে সফলভাবে ইন্টিগ্রেট করা হয়েছে।
 */
export default function ShurukkhaStandardPage() {
  const refreshFrame = () => {
    const iframe = document.getElementById('shurukkha-standard-iframe') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative">
          {/* Header with optimized space and visibility */}
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
              <Badge variant="outline" className="hidden sm:flex border-primary/50 text-primary uppercase items-center gap-1.5 h-7">
                <ShieldCheck className="size-3.5" />
                <span className="text-[10px]">Active Cloud Uplink</span>
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={refreshFrame} 
                className="text-muted-foreground hover:text-emerald-500 size-8"
              >
                <RefreshCcw className="size-4" />
              </Button>
              <a 
                href="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-emerald-500 transition-colors bg-white/5 px-4 py-2 rounded-md border border-white/10"
              >
                <span className="hidden sm:inline uppercase tracking-widest text-[10px]">External View</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </header>

          {/* Truly Expansive Display Area */}
          <div className="flex-1 overflow-hidden bg-black/20 w-full p-0 m-0">
            <Card className="border-none h-full w-full overflow-hidden relative rounded-none shadow-none bg-transparent m-0 p-0">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-[0.02] pointer-events-none" />
              <CardContent className="p-0 h-full w-full">
                <iframe 
                  id="shurukkha-standard-iframe"
                  src="https://shurukkha-hub-ofzc.vercel.app/dashboard" 
                  className="w-full h-full border-0 bg-white"
                  title="Shurukkha Hub Standard"
                  allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation allow-orientation-lock"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          </div>
          
          <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
              NoorNexus OS Integrated Cloud Node | Endpoint: shurukkha-hub-ofzc
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
