"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Tv, 
  RefreshCcw, 
  ExternalLink, 
  ShieldCheck, 
  Menu, 
  Sparkles, 
  Maximize2, 
  Minimize2,
  ArrowLeft,
  Cpu
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ToffeeLivePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const TARGET_URL = "https://toffeelive.com/"

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = TARGET_URL
    }
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  const togglePlayerFullscreen = async () => {
    if (!containerRef.current) return;
    
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        if (window.screen.orientation && (window.screen.orientation as any).lock) {
          (window.screen.orientation as any).lock("landscape").catch(() => {});
        }
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        if (window.screen.orientation && (window.screen.orientation as any).unlock) {
          (window.screen.orientation as any).unlock();
        }
        setIsFullscreen(false);
      }
    } catch (err: any) {
      toast({ title: "Fullscreen Interface Error", description: err.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const openDirectTunnel = () => {
    window.open(TARGET_URL, '_blank')
    toast({
      title: "Direct Sovereign Tunnel Established",
      description: "Opening Toffee Live in an external node for error-free playback.",
      className: "border-emerald-500/50 bg-emerald-500/5"
    })
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      {!isFullscreen && <AppSidebar />}
      <SidebarInset>
        <main className="flex flex-col h-[100dvh] w-full max-w-full overflow-hidden p-0 m-0 relative">
          {!isFullscreen && (
            <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-[60]">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden text-primary">
                  <Button variant="ghost" size="icon" className="h-10 w-10"><Menu className="size-6" /></Button>
                </SidebarTrigger>
                <div className="size-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30 glow-destructive shrink-0">
                  <Tv className="size-6 text-red-500" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-white truncate leading-none flex items-center gap-2">
                    Toffee Terminal
                    <Sparkles className="size-4 text-amber-500 animate-pulse" />
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Live Media Node v6.5</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7 bg-emerald-500/5">
                  <ShieldCheck className="size-3.5" />
                  <span className="text-[10px] font-bold">Zenith Bridge</span>
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleRefresh}
                  className="text-muted-foreground hover:text-primary size-8"
                >
                  <RefreshCcw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </header>
          )}

          <div ref={containerRef} className="flex-1 overflow-hidden bg-black w-full p-0 m-0 relative z-0">
            {loading && (
              <div className="absolute inset-0 z-[70] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8 p-6 text-center">
                 <div className="relative">
                    <div className="size-24 rounded-full border-2 border-red-500/20 animate-spin-slow" />
                    <div className="absolute inset-0 border-t-2 border-red-500 rounded-full animate-spin" />
                    <Tv className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 text-red-500 animate-pulse" />
                 </div>
                 <div className="text-center space-y-3">
                    <p className="text-sm font-headline font-bold text-red-500 uppercase tracking-[0.4em]">Establishing Zenith Media Bridge...</p>
                    <p className="text-[9px] sm:text-xs text-muted-foreground font-mono uppercase tracking-widest animate-pulse">DRM Veracity Handshake: ACTIVE</p>
                 </div>
              </div>
            )}

            <iframe 
              ref={iframeRef}
              src={TARGET_URL} 
              className="w-full h-full border-0 absolute inset-0"
              title="Imperial Toffee Terminal"
              referrerPolicy="no-referrer-when-downgrade"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; display-capture; orientation-lock; microphone; camera"
              sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation allow-orientation-lock"
              allowFullScreen
            />
            
            {!loading && (
               <div className="absolute bottom-4 right-4 z-50 flex gap-2">
                  <Button 
                    onClick={openDirectTunnel}
                    className="bg-black/60 backdrop-blur-md border border-white/20 text-white h-10 px-4 rounded-full hover:bg-black/80 text-[9px] uppercase font-bold"
                  >
                     <ExternalLink className="size-3 mr-2" /> Direct Tunnel
                  </Button>
                  <Button 
                    onClick={togglePlayerFullscreen} 
                    className="bg-black/60 backdrop-blur-md border border-white/20 text-white size-10 sm:size-12 rounded-full hover:bg-black/80 glow-primary"
                  >
                     {isFullscreen ? <Minimize2 className="size-5 sm:size-6" /> : <Maximize2 className="size-5 sm:size-6" />}
                  </Button>
               </div>
            )}
          </div>
          
          {!isFullscreen && (
            <footer className="py-3 border-t border-white/5 bg-background/80 shrink-0 text-center w-full z-[60]">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 px-4">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em] hidden md:block">
                  NoorNexus OS Integrated Streaming Node | SSL: SHA-256 Verified
                </p>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="text-[8px] font-bold uppercase text-emerald-500 tracking-widest">
                        Veracity: OPTIMAL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="size-3 text-primary opacity-40" />
                      <span className="text-[8px] font-bold uppercase text-muted-foreground tracking-widest">
                        Bridge: ZENITH_L4
                      </span>
                    </div>
                </div>
              </div>
            </footer>
          )}
        </main>
      </SidebarInset>
    </div>
  )
}
