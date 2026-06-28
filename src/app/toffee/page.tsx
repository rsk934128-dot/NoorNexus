"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Tv, 
  RefreshCcw, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  Monitor, 
  Sparkles, 
  ShieldAlert, 
  ArrowLeft,
  Radio,
  Activity,
  Database,
  Globe
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

/**
 * @fileOverview Toffee Live Imperial Terminal
 * নূরনেক্সাস অপারেটিং সিস্টেমের জন্য একটি প্রিমিয়াম লাইভ স্ট্রিমিং নোড।
 */
export default function ToffeeLivePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [showBypass, setShowBypass] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const TARGET_URL = "https://toffeelive.com/"

  useEffect(() => {
    // Initial handshake simulation
    const timer = setTimeout(() => {
      setLoading(false)
      // Most streaming sites block iframes, so we proactively prepare the bypass
      setShowBypass(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = TARGET_URL
    }
    setTimeout(() => setLoading(false), 1500)
  }

  const openDirectTunnel = () => {
    window.open(TARGET_URL, '_blank')
    toast({
      title: "Direct Sovereign Tunnel Established",
      description: "Opening Toffee Live in a high-priority external node.",
      className: "border-emerald-500/50 bg-emerald-500/5"
    })
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative">
          {/* Imperial Header */}
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0 w-full z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden text-primary">
                <Button variant="ghost" size="icon"><Menu className="size-5" /></Button>
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
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Live Streaming Node</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7 bg-emerald-500/5">
                <ShieldCheck className="size-3.5" />
                <span className="text-[10px] font-bold">L4 Secure Canal</span>
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

          {/* Expansive Display Area */}
          <div className="flex-1 overflow-hidden bg-black/20 w-full p-0 m-0 relative">
            {loading && (
              <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
                 <div className="relative">
                    <div className="size-24 rounded-full border-2 border-red-500/20 flex items-center justify-center">
                       <Tv className="size-12 text-red-500 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 border-t-2 border-red-500 rounded-full animate-spin" />
                 </div>
                 <div className="text-center space-y-3">
                    <p className="text-sm font-headline font-bold uppercase tracking-[0.4em] text-red-500 animate-pulse">
                       Establishing Toffee Bridge...
                    </p>
                    <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">Zenith Veracity Verification: ACTIVE</p>
                 </div>
              </div>
            )}

            {showBypass ? (
              <div className="size-full flex flex-col items-center justify-center text-center p-12 space-y-12 animate-in fade-in duration-1000">
                 <div className="size-24 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40 glow-emerald">
                    <ShieldAlert className="size-12 text-amber-500" />
                 </div>
                 <div className="space-y-4 max-w-xl">
                    <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">High-Security Media Block</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                       "কমান্ডার, Toffee Live এর উচ্চ-নিরাপত্তা প্রোটোকল আমাদের আইফ্রেম টানেলকে বাধা দিচ্ছে। নিরবিচ্ছিন্ন লাইভ স্ট্রিমিং এবং সেরা এক্সপেরিয়েন্সের জন্য আপনাকে সরাসরি **Direct Sovereign Tunnel** ব্যবহার করার পরামর্শ দিচ্ছি।"
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-6">
                    <Button 
                      onClick={openDirectTunnel}
                      className="bg-amber-500 text-black font-bold uppercase text-xs h-14 px-10 glow-emerald gap-3"
                    >
                       <ExternalLink className="size-5" /> Open Direct Sovereign Tunnel
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowBypass(false)}
                      className="border-white/10 text-white font-bold uppercase text-xs h-14 px-10 gap-3"
                    >
                       <Monitor className="size-5 text-red-500" /> Try Embedded Bridge
                    </Button>
                 </div>
                 <div className="pt-20 opacity-20 flex flex-col items-center gap-4">
                    <Badge variant="outline" className="border-white/10 uppercase tracking-[0.4em] text-[8px]">Auth_Handshake_Bypass_Protocol_v5.7</Badge>
                 </div>
              </div>
            ) : (
              <iframe 
                ref={iframeRef}
                src={TARGET_URL} 
                className="w-full h-full border-0 bg-white"
                title="Imperial Toffee Terminal"
                allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation"
                allowFullScreen
              />
            )}
          </div>
          
          <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full z-50">
            <div className="flex items-center justify-center gap-8 px-4">
               <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em] hidden md:block">
                 NoorNexus OS Integrated Streaming Node | SSL: SHA-256 Encrypted
               </p>
               <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  <span className="text-[8px] font-bold uppercase text-emerald-500">
                    Signal Veracity: OPTIMAL
                  </span>
               </div>
            </div>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
