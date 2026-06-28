"use client"

import { useState, useEffect, useRef, Suspense, useCallback } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Globe, 
  RefreshCcw, 
  ArrowLeft, 
  Search, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Lock,
  Monitor,
  Plane,
  Ship,
  Gem,
  ExternalLink,
  Menu,
  Cpu,
  Sparkles,
  Link2,
  ArrowRight,
  CheckCircle2,
  Database,
  Infinity,
  Fingerprint,
  Radio,
  ShieldAlert,
  Key,
  CreditCard,
  UserPlus,
  Tv,
  Facebook,
  Chrome
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { executeZenithSearch, WebSearchOutput } from "@/ai/flows/web-search-flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"
import { dispatchSovereignCommand, listenToTunnelResponse } from "@/services/sovereign-bridge"

const QUICK_LINKS = [
  { name: "Google", url: "https://www.google.com", icon: Chrome, color: "text-blue-500" },
  { name: "Facebook", url: "https://www.facebook.com", icon: Facebook, color: "text-blue-600" },
  { name: "YouTube", url: "https://www.youtube.com", icon: YoutubeIcon, color: "text-red-500" },
  { name: "Toffee", url: "https://toffeelive.com/", icon: Tv, color: "text-red-500" },
  { name: "Banking", url: "https://console.yapily.com/", icon: Key, color: "text-amber-500" },
  { name: "RedotPay", url: "https://business.redotpay.com/biz/home/", icon: CreditCard, color: "text-primary" },
]

function YoutubeIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
  )
}

const KNOWN_IFRAME_BLOCKERS = [
  'amazon.com', 'google.com', 'facebook.com', 'github.com', 
  'alibaba.com', 'twitter.com', 'linkedin.com', 'yapily.com', 
  'redotpay.com', 'sslcommerz.com', 'wikipedia.org', 'netflix.com',
  'toffeelive.com', 'messenger.com', 'instagram.com'
];

function BrowserContent() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [urlInput, setUrlInput] = useState("")
  const [activeUrl, setActiveUrl] = useState("https://www.google.com")
  const [loading, setLoading] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(true)
  const [isInternalPage, setIsInternalPage] = useState(false)
  const [showBypassWarning, setShowBypassWarning] = useState(false)
  const [searchResult, setSearchResult] = useState<WebSearchOutput | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const unsubscribe = listenToTunnelResponse((data) => {
      if (data.type === 'ACK_PERMIT') {
        console.log('[BrowserHub] Tunnel Permission Acknowledged.');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return
    setLoading(true)
    setIsSearchMode(true)
    setIsInternalPage(false)
    setShowBypassWarning(false)
    setSearchResult(null)
    setUrlInput(query)

    try {
      const result = await executeZenithSearch({ query })
      setSearchResult(result)
    } catch (e: any) {
      toast({ title: "Neural Sync Error", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }, [toast]);

  const handleNavigate = useCallback(async (url?: string) => {
    let target = url || urlInput
    if (!target.trim()) return

    if (target.includes('.sovereign')) {
      setLoading(true)
      setIsSearchMode(false)
      setIsInternalPage(true)
      setShowBypassWarning(false)
      setActiveUrl(target)
      setUrlInput(target)
      setTimeout(() => setLoading(false), 800)
      return
    }

    const isUrl = target.includes('.') && !target.includes(' ') || target.startsWith('http') || target.startsWith('www.')
    
    if (!isUrl && !url) {
      handleSearch(target)
      return
    }

    let finalUrl = target
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://${finalUrl}`
    }
    
    const domain = finalUrl.toLowerCase();
    const blocksIframe = KNOWN_IFRAME_BLOCKERS.some(b => domain.includes(b));
    
    setLoading(true)
    setIsSearchMode(false)
    setIsInternalPage(false)
    setShowBypassWarning(blocksIframe)
    setActiveUrl(finalUrl)
    setUrlInput(finalUrl)
    
    if (finalUrl.includes('youtube.com')) {
      setTimeout(() => {
        dispatchSovereignCommand(iframeRef, {
          type: 'PERMIT_YOUTUBE',
          payload: { intent: 'Imperial Playback', user: 'Commander' },
          signature: 'HMAC_V4_TRUSTED'
        });
      }, 1000);
    }

    setTimeout(() => setLoading(false), 1000)
  }, [urlInput, handleSearch]);

  useEffect(() => {
    const url = searchParams.get('url')
    if (url && url !== activeUrl) {
      handleNavigate(url)
    }
  }, [searchParams, activeUrl, handleNavigate])

  const handleRefresh = () => {
    if (isSearchMode && urlInput) {
      handleSearch(urlInput)
    } else if (isInternalPage) {
      handleNavigate(activeUrl)
    } else if (iframeRef.current) {
      setLoading(true)
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = ""
      iframeRef.current.src = currentSrc
      setTimeout(() => setLoading(false), 1000)
    }
  }

  return (
    <main className="flex flex-col h-[100dvh] w-full max-w-full overflow-hidden p-0 m-0 relative bg-background">
      <header className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-[60]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
           <SidebarTrigger className="md:hidden text-primary -ml-2">
              <Button variant="ghost" size="icon" className="h-10 w-10"><Menu className="size-6" /></Button>
           </SidebarTrigger>
           <div className="size-9 sm:size-10 bg-primary/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
              <Monitor className="size-5 sm:size-6 text-primary" />
           </div>
           <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-headline font-bold uppercase tracking-tight text-white truncate leading-none">Universal Terminal</h2>
              <p className="text-[7px] sm:text-[8px] text-muted-foreground font-mono tracking-widest uppercase mt-1 truncate">Nora-18 Intelligence Hub</p>
           </div>
        </div>

        <div className="flex-1 flex items-center gap-2 w-full">
           <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/10 p-1 shrink-0">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-white" onClick={() => {setIsSearchMode(true); setSearchResult(null); setUrlInput(""); setShowBypassWarning(false);}}>
                 <ArrowLeft className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-white hidden sm:flex" onClick={handleRefresh}>
                 <RefreshCcw className={`size-4 ${loading ? 'animate-spin text-primary' : ''}`} />
              </Button>
           </div>
           
           <div className="flex-1 relative group min-w-0">
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                 <Lock className={`size-3 ${isSearchMode ? 'text-amber-500' : isInternalPage ? 'text-purple-500' : 'text-emerald-500'}`} />
              </div>
              <Input 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                className="w-full bg-black/40 border-white/10 h-10 pl-8 pr-12 sm:pr-32 text-xs sm:text-xs font-mono text-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/30"
                placeholder="Search web or enter URL..."
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={() => handleSearch(urlInput)}
                   className="hidden sm:flex text-[9px] uppercase font-bold text-amber-500 hover:bg-amber-500/10 h-8 px-2 border-l border-white/5"
                 >
                    <Search className="size-3 mr-1.5" /> Nora-Search
                 </Button>
                 <Button 
                   size="icon" 
                   variant="ghost" 
                   onClick={() => handleNavigate()}
                   className="size-9 text-primary hover:bg-primary/10"
                 >
                    <Zap className="size-4" />
                 </Button>
              </div>
           </div>

           <div className="hidden lg:flex items-center gap-2">
              <Badge variant="outline" className={`border-emerald-500/20 text-emerald-500 uppercase text-[8px] h-10 px-3 bg-emerald-500/5`}>
                {isInternalPage ? 'SOVEREIGN_RESOLVED' : showBypassWarning ? 'DIRECT_REQUIRED' : 'TUNNEL_SECURITY: L4'}
              </Badge>
           </div>
        </div>
      </header>

      <div className="px-3 sm:px-4 py-2 border-b border-white/5 bg-black/20 overflow-x-auto flex items-center gap-3 sm:gap-4 no-scrollbar shrink-0">
         <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest shrink-0 flex items-center gap-1.5 sm:gap-2">
           <Radio className="size-3" /> Shortcuts:
         </span>
         {QUICK_LINKS.map((link) => (
           <Button 
            key={link.name} 
            variant="ghost" 
            size="sm" 
            onClick={() => handleNavigate(link.url)}
            className="h-8 text-[9px] uppercase font-bold text-white hover:bg-white/5 gap-2 px-4 border border-white/5 rounded-full shrink-0"
           >
             <link.icon className={`size-3.5 ${link.color}`} />
             {link.name}
           </Button>
         ))}
      </div>

      <div className="flex-1 overflow-hidden w-full relative bg-black/40">
        {loading && (
           <div className="absolute inset-0 z-[70] bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6 sm:gap-8 p-4">
              <div className="relative">
                 <div className="size-20 sm:size-24 rounded-full border-2 border-primary/20 flex items-center justify-center">
                    {isSearchMode ? <Cpu className="size-10 sm:size-12 text-amber-500 animate-pulse" /> : <Globe className="size-10 sm:size-12 text-primary animate-pulse" />}
                 </div>
                 <div className={`absolute inset-0 border-t-2 ${isSearchMode ? 'border-amber-500' : 'border-primary'} rounded-full animate-spin`} />
              </div>
              <div className="text-center space-y-2 sm:space-y-3">
                 <p className={`text-xs sm:text-sm font-headline font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] animate-pulse ${isSearchMode ? 'text-amber-500' : 'text-primary'}`}>
                    {isSearchMode ? 'Consulting Zenith Search Intelligence...' : 'Anchoring Secure Web Canal...'}
                 </p>
                 <p className="text-[8px] sm:text-[9px] text-muted-foreground font-mono uppercase tracking-[0.2em]">Veracity Check: ACTIVE</p>
              </div>
           </div>
        )}

        {isSearchMode ? (
          <ScrollArea className="h-full w-full">
            <div className="max-w-5xl mx-auto p-4 sm:p-12 space-y-8 sm:space-y-12">
              {searchResult ? (
                <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5 relative overflow-hidden p-6 sm:p-8">
                    <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-5 pointer-events-none">
                       <Sparkles className="size-24 sm:size-32 text-amber-500" />
                    </div>
                    <div className="space-y-4 sm:space-y-6 relative z-10">
                       <div className="flex items-center justify-between">
                          <h3 className="text-[10px] sm:text-xs font-headline font-bold uppercase tracking-widest text-amber-500 flex items-center gap-2 sm:gap-3">
                             <Cpu className="size-4 sm:size-5" /> Nora-18 Search Dispatch
                          </h3>
                          <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 uppercase text-[7px] sm:text-[8px]">Intelligence_Sync</Badge>
                       </div>
                       <p className="text-base sm:text-2xl text-white leading-relaxed font-light italic">
                          "{searchResult.summary}"
                       </p>
                    </div>
                  </Card>

                  <div className="space-y-6 sm:space-y-8">
                     <div className="flex items-center justify-between px-2">
                        <h4 className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] sm:tracking-[0.5em]">Web Result Nodes</h4>
                        <span className="text-[8px] sm:text-[9px] text-primary font-mono">{searchResult.results.length} ENDPOINTS</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {searchResult.results.map((res, i) => (
                          <Card key={i} className="glass-card border-white/5 hover:border-primary/40 transition-all group cursor-pointer overflow-hidden flex flex-col" onClick={() => handleNavigate(res.url)}>
                            <CardContent className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                               <div className="flex items-start justify-between gap-4">
                                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/20 transition-all shrink-0">
                                     <Link2 className="size-5 text-primary" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                     <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-[7px] border-primary/20 text-primary uppercase px-2 h-4">{res.source}</Badge>
                                     </div>
                                     <h5 className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-primary transition-colors truncate">{res.title}</h5>
                                  </div>
                                </div>
                               <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed italic flex-1">"{res.snippet}"</p>
                               <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                                  <code className="text-[8px] sm:text-[9px] font-mono text-primary/40 truncate max-w-[150px] sm:max-w-[200px]">{res.url}</code>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                     <ArrowRight className="size-4" />
                                  </Button>
                               </div>
                            </CardContent>
                          </Card>
                        ))}
                     </div>
                  </div>

                  <div className="p-5 sm:p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-4 text-center sm:text-left">
                        <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                           <Radio className="size-5 text-emerald-500 animate-pulse" />
                        </div>
                        <div>
                           <p className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Imperial Directive</p>
                           <p className="text-[10px] sm:text-xs text-emerald-100 italic leading-snug">"{searchResult.suggestedAction}"</p>
                        </div>
                     </div>
                     <div className="text-center sm:text-right shrink-0">
                        <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Search Seal</p>
                        <code className="text-[9px] text-primary font-mono">{searchResult.searchHash.substring(0, 15)}...</code>
                     </div>
                  </div>
                </div>
              ) : !loading && (
                <div className="h-[400px] sm:h-[500px] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000">
                   <div className="relative">
                      <div className="size-28 sm:size-32 rounded-full border-4 border-dashed border-primary/20 animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Search className="size-14 sm:size-16 text-primary opacity-20" />
                      </div>
                   </div>
                   <div className="space-y-3 px-6">
                      <h3 className="text-xl sm:text-xl font-headline font-bold text-white uppercase tracking-[0.2em]">Universal Intelligence Pulse</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-mono uppercase tracking-widest leading-relaxed max-w-sm">
                         Enter any query to search the global mesh through our AI-hardenend neural gateway.
                      </p>
                   </div>
                   <div className="flex flex-wrap justify-center gap-4 px-4">
                      <Button onClick={() => handleSearch("Global Economic Outlook 2026")} variant="outline" className="text-[9px] font-bold uppercase border-white/10 h-10 px-6 hover:border-primary/40">
                         Economy
                      </Button>
                      <Button onClick={() => handleSearch("Sovereign AI Infrastructure")} variant="outline" className="text-[9px] font-bold uppercase border-white/10 h-10 px-6 hover:border-primary/40">
                         AI Infra
                      </Button>
                   </div>
                </div>
              )}
            </div>
          </ScrollArea>
        ) : showBypassWarning ? (
          <div className="h-full w-full bg-background flex flex-col items-center justify-center p-6 space-y-10 animate-in fade-in">
             <div className="size-20 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40 glow-emerald">
                <ShieldAlert className="size-10 text-amber-500" />
             </div>
             <div className="text-center space-y-4 max-w-md">
                <h3 className="text-2xl sm:text-2xl font-headline font-bold text-white uppercase tracking-tighter">Imperial Direct Tunnel Required</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed italic px-4">
                   "Commander, this high-security node (Google/Facebook/Social) blocks embedded frames for your protection. To maintain a seamless session, please use the **Direct Sovereign Tunnel**."
                </p>
             </div>
             <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6">
                <Button 
                  onClick={() => window.open(activeUrl, '_blank')}
                  className="w-full sm:w-auto bg-amber-500 text-black font-bold uppercase text-[10px] h-14 px-10 glow-emerald gap-2"
                >
                   <ExternalLink className="size-5" /> Open Direct Tunnel
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsSearchMode(true)}
                  className="w-full sm:w-auto border-white/10 text-white font-bold uppercase text-[10px] h-14 px-10"
                >
                   Return to Terminal
                </Button>
             </div>
          </div>
        ) : (
          <div className="h-full w-full bg-white relative z-0">
            <iframe 
              ref={iframeRef}
              src={activeUrl} 
              className="w-full h-full border-0 absolute inset-0"
              title="Imperial Web Canal"
              allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; payment"
              sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation"
            />
          </div>
        )}
      </div>
      
      <footer className="py-2.5 border-t border-white/5 bg-background/80 shrink-0 text-center w-full z-[60]">
        <div className="flex items-center justify-center gap-8">
           <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.4em] truncate px-4">
             NoorNexus Sovereign Browser Hub | SSL: SHA-256 Verified
           </p>
           <div className="hidden sm:flex items-center gap-2">
              <div className={`size-1.5 rounded-full ${isSearchMode ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
              <span className={`text-[8px] font-bold uppercase ${isSearchMode ? 'text-amber-500' : 'text-emerald-500'}`}>
                {isSearchMode ? 'AI Search Pulse: READY' : 'Tunnel Health: OPTIMAL'}
              </span>
           </div>
        </div>
      </footer>
    </main>
  )
}

export default function ImperialBrowserPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <Suspense fallback={
          <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background p-6">
             <Loader2 className="size-10 text-primary animate-spin" />
             <p className="text-[10px] font-mono uppercase tracking-widest text-primary text-center">Calibrating Terminal...</p>
          </div>
        }>
          <BrowserContent />
        </Suspense>
      </SidebarInset>
    </div>
  )
}
