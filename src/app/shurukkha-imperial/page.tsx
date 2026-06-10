
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, ExternalLink, ShieldCheck, RefreshCcw, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * @fileOverview Shurukkha Hub Imperial Edition
 */
export default function ShurukkhaImperialPage() {
  const refreshFrame = () => {
    const iframe = document.getElementById('shurukkha-imperial-iframe') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative">
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0 w-full z-50">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Shield className="size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-primary truncate leading-none flex items-center gap-2">
                  Shurukkha Imperial
                  <Sparkles className="size-4 text-amber-500 animate-pulse" />
                </h2>
                <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate mt-1">Sovereign Node: Imperial Edition</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7">
                <ShieldCheck className="size-3.5" />
                <span className="text-[10px]">V4.2 Secure</span>
              </Badge>
              <Button variant="ghost" size="icon" onClick={refreshFrame} className="text-muted-foreground hover:text-primary">
                <RefreshCcw className="size-4" />
              </Button>
              <a 
                href="https://shurukkha-hub-imperial-sovereign-in.vercel.app/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors bg-white/5 px-4 py-2 rounded-md border border-white/10"
              >
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </header>

          <div className="flex-1 overflow-hidden bg-black/20 w-full p-0 m-0">
            <Card className="border-none h-full w-full overflow-hidden relative rounded-none shadow-none bg-transparent m-0 p-0">
              <CardContent className="p-0 h-full w-full">
                <iframe 
                  id="shurukkha-imperial-iframe"
                  src="https://shurukkha-hub-imperial-sovereign-in.vercel.app/dashboard" 
                  className="w-full h-full border-0 bg-white"
                  title="Shurukkha Hub Imperial"
                  allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media"
                  sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
