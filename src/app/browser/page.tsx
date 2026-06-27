"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Globe, 
  RefreshCcw, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Menu, 
  Search, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Lock,
  Monitor,
  Sparkles,
  Plane,
  Ship,
  Gem,
  Car,
  ChevronRight,
  ShieldAlert
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const QUICK_LINKS = [
  { name: "Aerospace", url: "https://www.jamesedition.com/jets", icon: Plane, color: "text-purple-500" },
  { name: "Maritime", url: "https://www.yachtworld.com/", icon: Ship, color: "text-blue-500" },
  { name: "Gold/Precious", url: "https://www.kitco.com/", icon: Gem, color: "text-amber-500" },
  { name: "Luxury Cars", url: "https://www.dupontregistry.com/", icon: Car, color: "text-primary" },
  { name: "Global Trade", url: "https://www.trademap.org/", icon: Globe, color: "text-emerald-500" },
]

export default function ImperialBrowserPage() {
  const { toast } = useToast()
  const [urlInput, setUrlInput] = useState("https://www.jamesedition.com/jets")
  const [activeUrl, setActiveUrl] = useState("https://www.jamesedition.com/jets")
  const [loading, setLoading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleNavigate = (url?: string) => {
    let targetUrl = url || urlInput
    if (!targetUrl.startsWith('http')) {
      targetUrl = `https://${targetUrl}`
    }
    
    setLoading(true)
    setActiveUrl(targetUrl)
    setUrlInput(targetUrl)
    
    toast({
      title: "Establishing Web Bridge",
      description: `Uplink initiated for ${targetUrl.substring(0, 30)}...`,
      className: "border-primary/50 bg-primary/5"
    })

    // Simulated handshake delay
    setTimeout(() => setLoading(false), 1500)
  }

  const handleRefresh = () => {
    if (iframeRef.current) {
      setLoading(true)
      iframeRef.current.src = activeUrl
      setTimeout(() => setLoading(false), 1000)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative">
          {/* Browser Header / Address Bar */}
          <header className="px-4 py-3 flex flex-col sm:flex-row items-center gap-4 border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0 w-full z-50">
            <div className="flex items-center gap-3 w-full sm:w-auto">
               <SidebarTrigger className="md:hidden text-primary">
                  <Button variant="ghost" size="icon"><Menu className="size-5" /></Button>
               </SidebarTrigger>
               <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                  <Monitor className="size-6 text-primary" />
               </div>
               <div className="min-w-0 hidden lg:block">
                  <h2 className="text-sm font-headline font-bold uppercase tracking-tight text-white truncate">Imperial Terminal</h2>
                  <p className="text-[8px] text-muted-foreground font-mono tracking-widest uppercase">Secure Web Bridge v4.0</p>
               </div>
            </div>

            {/* Address Bar Controls */}
            <div className="flex-1 flex items-center gap-2 w-full">
               <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/10 p-1">
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-white" onClick={() => handleNavigate('https://www.google.com')}>
                     <ArrowLeft className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-white" onClick={handleRefresh}>
                     <RefreshCcw className={`size-4 ${loading ? 'animate-spin text-primary' : ''}`} />
                  </Button>
               </div>
               
               <div className="flex-1 relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                     <Lock className="size-3 text-emerald-500" />
                  </div>
                  <Input 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                    className="w-full bg-black/40 border-white/10 h-10 pl-9 pr-12 text-xs font-mono text-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter URL or Search Command..."
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                     <Button 
                       size="icon" 
                       variant="ghost" 
                       onClick={() => handleNavigate()}
                       className="size-8 text-primary hover:bg-primary/10"
                     >
                        <Zap className="size-4" />
                     </Button>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/10 text-[10px] font-bold uppercase h-10 px-4 hidden sm:flex"
                    onClick={() => window.open(activeUrl, '_blank')}
                  >
                     <ExternalLink className="size-3 mr-2" /> Pop-out
                  </Button>
               </div>
            </div>
          </header>

          {/* Quick Bookmarks Bar */}
          <div className="px-4 py-2 border-b border-white/5 bg-black/20 overflow-x-auto flex items-center gap-4 no-scrollbar shrink-0">
             <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">Imperial Bookmarks:</span>
             {QUICK_LINKS.map((link) => (
               <Button 
                key={link.name} 
                variant="ghost" 
                size="sm" 
                onClick={() => handleNavigate(link.url)}
                className="h-7 text-[9px] uppercase font-bold text-white hover:bg-white/5 gap-2 px-3 border border-white/5"
               >
                 <link.icon className={`size-3 ${link.color}`} />
                 {link.name}
               </Button>
             ))}
          </div>

          {/* Browser Iframe Display Area */}
          <div className="flex-1 overflow-hidden bg-black/40 w-full relative">
            {loading && (
               <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-6">
                  <div className="relative">
                     <div className="size-20 rounded-full border-2 border-primary/20 flex items-center justify-center">
                        <Globe className="size-10 text-primary animate-pulse" />
                     </div>
                     <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
                  </div>
                  <div className="text-center space-y-2">
                     <p className="text-sm font-headline font-bold text-primary uppercase tracking-[0.3em] animate-pulse">Syncing Web Bridge...</p>
                     <p className="text-[10px] text-muted-foreground font-mono uppercase">Encrypted Handshake in Progress</p>
                  </div>
               </div>
            )}

            <Card className="border-none h-full w-full overflow-hidden relative rounded-none shadow-none bg-transparent">
              <CardContent className="p-0 h-full w-full">
                <iframe 
                  ref={iframeRef}
                  src={activeUrl} 
                  className="w-full h-full border-0 bg-white"
                  title="Imperial Browser Terminal"
                  allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation allow-orientation-lock"
                  allowFullScreen
                />
              </CardContent>
            </Card>

            {/* Frame Blocking Warning Overlay (Static reminder) */}
            <div className="absolute bottom-6 left-6 max-w-xs pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity">
               <div className="p-3 bg-black/80 backdrop-blur-md border border-amber-500/20 rounded-lg flex items-start gap-3">
                  <ShieldAlert className="size-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-amber-100/80 leading-relaxed italic">
                     Some websites may block in-app viewing due to strict security policies. If the screen is blank, use the <strong>Pop-out</strong> button.
                  </p>
               </div>
            </div>
          </div>
          
          <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full">
            <div className="flex items-center justify-center gap-6">
               <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
                 NoorNexus Imperial Proxy | SSL Verified
               </p>
               <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-bold text-emerald-500 uppercase">Uplink Stable</span>
               </div>
            </div>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
