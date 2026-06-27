"use client"

import { useState, useEffect, useRef, Suspense } from "react"
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
  Car,
  ExternalLink,
  Menu,
  Cpu,
  Sparkles,
  Link2,
  ArrowRight,
  CheckCircle2,
  Database,
  History,
  HardDrive,
  Infinity,
  Fingerprint,
  Radio,
  AlertTriangle,
  ShieldAlert,
  Key,
  CreditCard,
  UserPlus
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { executeZenithSearch, WebSearchOutput } from "@/ai/flows/web-search-flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"

const QUICK_LINKS = [
  { name: "Banking Console", url: "https://console.yapily.com/", icon: Key, color: "text-amber-500" },
  { name: "RedotPay Biz", url: "https://business.redotpay.com/biz/home/", icon: CreditCard, color: "text-primary" },
  { name: "SSLCommerz Join", url: "https://join.sslcommerz.com/upload-information", icon: UserPlus, color: "text-red-500" },
  { name: "Aerospace", url: "https://www.jamesedition.com/jets", icon: Plane, color: "text-purple-500" },
  { name: "Maritime", url: "https://www.yachtworld.com/", icon: Ship, color: "text-blue-500" },
  { name: "Gold/Precious", url: "https://www.kitco.com/", icon: Gem, color: "text-amber-500" },
]

const KNOWN_IFRAME_BLOCKERS = ['amazon.com', 'google.com', 'facebook.com', 'github.com', 'alibaba.com', 'twitter.com', 'linkedin.com', 'yapily.com', 'redotpay.com', 'sslcommerz.com'];

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
    const url = searchParams.get('url')
    if (url) {
      handleNavigate(url)
    }
  }, [searchParams])

  const handleNavigate = async (url?: string) => {
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

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i
    const isUrl = urlPattern.test(target)

    if (!isUrl && !url) {
      handleSearch(target)
      return
    }

    if (!target.startsWith('http')) {
      target = `https://${target}`
    }
    
    // Check for iframe blockers
    const domain = target.toLowerCase();
    const blocksIframe = KNOWN_IFRAME_BLOCKERS.some(b => domain.includes(b));
    
    setLoading(true)
    setIsSearchMode(false)
    setIsInternalPage(false)
    setShowBypassWarning(blocksIframe)
    setActiveUrl(target)
    setUrlInput(target)
    
    toast({
      title: "Establishing Web Bridge",
      description: blocksIframe ? "High-Security Node Detected." : "Uplink initiated through Sovereign Tunnel.",
      className: blocksIframe ? "border-amber-500/50 bg-amber-500/5" : "border-primary/50 bg-primary/5"
    })

    setTimeout(() => setLoading(false), 1200)
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) return
    setLoading(true)
    setIsSearchMode(true)
    setIsInternalPage(false)
    setShowBypassWarning(false)
    setSearchResult(null)
    setUrlInput(query)

    try {
      toast({ title: "Zenith Pulse Active", description: "Querying Nora-18 Search Sentinel..." })
      const result = await executeZenithSearch({ query })
      setSearchResult(result)
    } catch (e: any) {
      toast({ title: "Neural Sync Error", description: e.message || "Drift detected in knowledge mesh.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    if (isSearchMode && urlInput) {
      handleSearch(urlInput)
    } else if (isInternalPage) {
      handleNavigate(activeUrl)
    } else if (iframeRef.current) {
      setLoading(true)
      iframeRef.current.src = activeUrl
      setTimeout(() => setLoading(false), 1000)
    }
  }

  return (
    <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0 relative">
      <header className="px-4 py-3 flex flex-col sm:flex-row items-center gap-4 border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0 w-full z-50">
        <div className="flex items-center gap-3 w-full sm:w-auto">
           <SidebarTrigger className="md:hidden text-primary">
              <Button variant="ghost" size="icon"><Menu className="size-5" /></Button>
           </SidebarTrigger>
           <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
              <Monitor className="size-6 text-primary" />
           </div>
           <div className="min-w-0 hidden lg:block">
              <h2 className="text-sm font-headline font-bold uppercase tracking-tight text-white truncate leading-none">Imperial Terminal</h2>
              <p className="text-[8px] text-muted-foreground font-mono tracking-widest uppercase mt-1">Zenith Intelligence v4.5</p>
           </div>
        </div>

        <div className="flex-1 flex items-center gap-2 w-full">
           <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/10 p-1">
              <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-white" onClick={() => {setIsSearchMode(true); setSearchResult(null); setUrlInput(""); setShowBypassWarning(false);}}>
                 <ArrowLeft className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-white" onClick={handleRefresh}>
                 <RefreshCcw className={`size-4 ${loading ? 'animate-spin text-primary' : ''}`} />
              </Button>
           </div>
           
           <div className="flex-1 relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                 <Lock className={`size-3 ${isSearchMode ? 'text-amber-500' : isInternalPage ? 'text-purple-500' : 'text-emerald-500'}`} />
              </div>
              <Input 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                className="w-full bg-black/40 border-white/10 h-11 pl-9 pr-32 text-xs font-mono text-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/30"
                placeholder="Ask Nora-AI or Enter Command URL..."
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={() => handleSearch(urlInput)}
                   className="text-[9px] uppercase font-bold text-amber-500 hover:bg-amber-500/10 h-9 px-3 border-l border-white/5"
                 >
                    <Search className="size-3 mr-1.5" /> Intelligence
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

           <div className="hidden sm:flex items-center gap-2">
              <Badge variant="outline" className={`border-emerald-500/20 text-emerald-500 uppercase text-[8px] h-11 px-3 bg-emerald-500/5`}>
                {isInternalPage ? 'SOVEREIGN_RESOLVED' : 'AES_256_ACTIVE'}
              </Badge>
           </div>
        </div>
      </header>

      <div className="px-4 py-2 border-b border-white/5 bg-black/20 overflow-x-auto flex items-center gap-4 no-scrollbar shrink-0">
         <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest shrink-0 flex items-center gap-2">
           <Radio className="size-3" /> Sovereign Channels:
         </span>
         {QUICK_LINKS.map((link) => (
           <Button 
            key={link.name} 
            variant="ghost" 
            size="sm" 
            onClick={() => handleNavigate(link.url)}
            className="h-8 text-[9px] uppercase font-bold text-white hover:bg-white/5 gap-2 px-4 border border-white/5 rounded-full"
           >
             <link.icon className={`size-3.5 ${link.color}`} />
             {link.name}
           </Button>
         ))}
      </div>

      <div className="flex-1 overflow-hidden bg-black/40 w-full relative">
        {loading && (
           <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
              <div className="relative">
                 <div className="size-24 rounded-full border-2 border-primary/20 flex items-center justify-center">
                    {isSearchMode ? <Cpu className="size-12 text-amber-500 animate-pulse" /> : <Globe className="size-12 text-primary animate-pulse" />}
                 </div>
                 <div className={`absolute inset-0 border-t-2 ${isSearchMode ? 'border-amber-500' : 'border-primary'} rounded-full animate-spin`} />
              </div>
              <div className="text-center space-y-3">
                 <p className={`text-sm font-headline font-bold uppercase tracking-[0.4em] animate-pulse ${isSearchMode ? 'text-amber-500' : 'text-primary'}`}>
                    {isSearchMode ? 'Synthesizing Neural Intelligence...' : 'Anchoring Web Canal...'}
                 </p>
                 <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-[0.2em]">Zenith Veracity Verification: ACTIVE</p>
              </div>
           </div>
        )}

        {isSearchMode ? (
          <ScrollArea className="h-full w-full">
            <div className="max-w-5xl mx-auto p-6 sm:p-12 space-y-12">
              {searchResult ? (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5 relative overflow-hidden p-8">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                       <Sparkles className="size-32 text-amber-500" />
                    </div>
                    <div className="space-y-6 relative z-10">
                       <div className="flex items-center justify-between">
                          <h3 className="text-xs font-headline font-bold uppercase tracking-widest text-amber-500 flex items-center gap-3">
                             <Cpu className="size-5" /> Nora-18 Intelligence Dispatch
                          </h3>
                          <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 uppercase text-[8px]">Project_180_Sync</Badge>
                       </div>
                       <p className="text-xl sm:text-2xl text-white leading-relaxed font-light italic">
                          "{searchResult.summary}"
                       </p>
                       <div className="pt-4 flex items-center gap-3">
                          <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] px-3 h-6 flex items-center gap-2">
                             <CheckCircle2 className="size-3" /> VERACITY_CONFIRMED
                          </Badge>
                       </div>
                    </div>
                  </Card>

                  <div className="space-y-8">
                     <div className="flex items-center justify-between px-2">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">Verified Knowledge Hubs</h4>
                        <span className="text-[9px] text-primary font-mono">{searchResult.results.length} NODES DISCOVERED</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {searchResult.results.map((res, i) => (
                          <Card key={i} className="glass-card border-white/5 hover:border-primary/40 transition-all group cursor-pointer overflow-hidden flex flex-col" onClick={() => handleNavigate(res.url)}>
                            <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                               <div className="flex items-start justify-between gap-4">
                                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/20 transition-all shrink-0">
                                     <Link2 className="size-5 text-primary" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                     <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-[7px] border-primary/20 text-primary uppercase px-2 h-4">{res.source}</Badge>
                                     </div>
                                     <h5 className="text-sm font-bold text-white uppercase group-hover:text-primary transition-colors truncate">{res.title}</h5>
                                  </div>
                                </div>
                               <p className="text-[11px] text-muted-foreground leading-relaxed italic flex-1">"{res.snippet}"</p>
                               <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                                  <code className="text-[9px] font-mono text-primary/40 truncate max-w-[200px]">{res.url}</code>
                                  <Button variant="ghost" size="icon" className="size-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                     <ArrowRight className="size-4" />
                                  </Button>
                               </div>
                            </CardContent>
                          </Card>
                        ))}
                     </div>
                  </div>

                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                           <Radio className="size-5 text-emerald-500 animate-pulse" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Imperial Directive</p>
                           <p className="text-xs text-emerald-100 italic">"{searchResult.suggestedAction}"</p>
                        </div>
                     </div>
                     <div className="text-center sm:text-right shrink-0">
                        <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Intelligence Hash (HMAC_V4)</p>
                        <code className="text-[9px] text-primary font-mono">{searchResult.searchHash.substring(0, 20)}...</code>
                     </div>
                  </div>
                </div>
              ) : !loading && (
                <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000">
                   <div className="relative">
                      <div className="size-32 rounded-full border-4 border-dashed border-primary/20 animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Search className="size-16 text-primary opacity-20" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-xl font-headline font-bold text-white uppercase tracking-[0.2em]">Initiate Search Pulse</h3>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest leading-relaxed max-w-sm">
                         Commander, enter a query in the terminal above to synthesize web-scale intelligence.
                      </p>
                   </div>
                   <div className="flex gap-4">
                      <Button onClick={() => handleSearch("Latest Global Economic Outlook")} variant="outline" className="text-[9px] font-bold uppercase border-white/10 h-9 px-6 hover:border-primary/40">
                         Latest Outlook
                      </Button>
                      <Button onClick={() => handleSearch("Maritime Trade Hubs SE Asia")} variant="outline" className="text-[9px] font-bold uppercase border-white/10 h-9 px-6 hover:border-primary/40">
                         Maritime Hubs
                      </Button>
                   </div>
                </div>
              )}
            </div>
          </ScrollArea>
        ) : isInternalPage ? (
          <div className="h-full w-full bg-background flex flex-col items-center justify-center p-6 space-y-12 animate-in fade-in">
             <div className="max-w-4xl w-full space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-12 border-b border-white/5 pb-12">
                   <div className="size-32 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-primary shrink-0">
                      <Infinity className="size-16 text-primary" />
                   </div>
                   <div className="space-y-4 text-center md:text-left">
                      <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">Sovereign Mesh Node: {activeUrl.replace('https://', '').replace('.sovereign', '')}</h3>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                         <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 uppercase text-[8px] h-6">Local_Resolution: SUCCESS</Badge>
                         <Badge variant="outline" className="border-primary/20 text-primary uppercase text-[8px] h-6">Node_Status: SYNCHRONIZED</Badge>
                         <Badge variant="outline" className="border-amber-500/20 text-amber-500 uppercase text-[8px] h-6">Veracity: 100%</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                         "Internal Sovereign archives are isolated from the public internet. This interface provides direct access to the One Engine Ledger records for this node."
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                     { label: "Storage Health", val: "99.9%", icon: HardDrive },
                     { label: "Audit Signature", val: "HMAC_V4", icon: Fingerprint },
                     { label: "Recent Sync", val: "28ms ago", icon: RefreshCcw }
                   ].map((item, i) => (
                     <Card key={i} className="glass-card bg-white/2 border-white/5">
                        <CardContent className="p-6 space-y-2 text-center">
                           <item.icon className="size-6 text-primary mx-auto mb-2 opacity-50" />
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</p>
                           <p className="text-lg font-headline font-bold text-white uppercase">{item.val}</p>
                        </CardContent>
                     </Card>
                   ))}
                </div>

                <Card className="glass-card border-white/5 bg-black/40">
                   <CardHeader className="py-4 border-b border-white/5">
                      <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                         <Database className="size-4" /> Node Registry Logs
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="p-6">
                      <div className="space-y-3">
                         {[
                           { action: "Handshake Authorized", status: "SUCCESS", id: "P-42" },
                           { action: "Ledger Reconciliation", status: "FINALIZED", id: "P-43" },
                           { action: "Sovereign Vault Uplink", status: "ANCHORED", id: "P-44" }
                         ].map((log, i) => (
                           <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 font-mono text-[10px]">
                              <div className="flex items-center gap-3">
                                 <span className="text-muted-foreground">[{log.id}]</span>
                                 <span className="text-white uppercase">{log.action}</span>
                              </div>
                              <span className="text-emerald-500 font-bold">{log.status}</span>
                           </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
             </div>

             <div className="flex flex-col items-center gap-4 text-center opacity-40">
                <ShieldCheck className="size-10 text-emerald-500" />
                <p className="text-[8px] font-mono uppercase tracking-[0.5em]">NoorNexus Internal Infrastructure Only</p>
             </div>
          </div>
        ) : showBypassWarning ? (
          <div className="h-full w-full bg-background flex flex-col items-center justify-center p-6 space-y-8 animate-in fade-in">
             <div className="size-20 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40 glow-emerald">
                <ShieldAlert className="size-10 text-amber-500" />
             </div>
             <div className="text-center space-y-4 max-w-md">
                <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tighter">High-Security Node Block</h3>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                   "কমান্ডার, {activeUrl.replace('https://', '')} তার নিজস্ব সিকিউরিটি পলিসির (SAMEORIGIN) কারণে এনক্রিপ্টেড আইফ্রেম টানেলে লোড হতে বাধা দিচ্ছে। এটি বাইপাস করার জন্য আপনাকে সরাসরি টানেল (Direct Tunnel) ব্যবহার করতে হবে।"
                </p>
             </div>
             <div className="flex gap-4">
                <Button 
                  onClick={() => window.open(activeUrl, '_blank')}
                  className="bg-amber-500 text-black font-bold uppercase text-[10px] h-12 px-8 glow-emerald gap-2"
                >
                   <ExternalLink className="size-4" /> Open Direct Tunnel
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsSearchMode(true)}
                  className="border-white/10 text-white font-bold uppercase text-[10px] h-12 px-8"
                >
                   Return to Terminal
                </Button>
             </div>
             <div className="pt-12 flex flex-col items-center gap-4 opacity-40">
                <p className="text-[8px] font-mono uppercase tracking-[0.5em]">Security Protocol v4.5 Enforcement</p>
             </div>
          </div>
        ) : (
          <div className="h-full w-full bg-white relative">
            <iframe 
              ref={iframeRef}
              src={activeUrl} 
              className="w-full h-full border-0"
              title="Imperial Web Canal"
              allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals"
            />
          </div>
        )}

        <div className="absolute bottom-6 left-6 pointer-events-none">
          <div className="p-3 glass-card rounded-lg flex items-center gap-3 border-emerald-500/20 bg-black/60 shadow-2xl">
              <ShieldCheck className="size-4 text-emerald-500" />
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-white uppercase leading-none">Canal Secure</p>
                <p className="text-[7px] text-emerald-500/60 font-mono uppercase leading-none">
                   {isInternalPage ? 'MESH_RESOLVED' : showBypassWarning ? 'HANDSHAKE_GATED' : 'Handshake Verified'}
                </p>
              </div>
          </div>
        </div>
      </div>
      
      <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full z-50">
        <div className="flex items-center justify-center gap-8">
           <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
             NoorNexus Imperial Web Gateway | SSL: SHA-256 Encrypted
           </p>
           <div className="flex items-center gap-2">
              <div className={`size-1.5 rounded-full ${isSearchMode ? 'bg-amber-500' : isInternalPage ? 'bg-purple-500' : showBypassWarning ? 'bg-destructive' : 'bg-emerald-500'} animate-pulse shadow-[0_0_8px_rgba(0,150,255,0.4)]`} />
              <span className={`text-[8px] font-bold uppercase ${isSearchMode ? 'text-amber-500' : isInternalPage ? 'text-purple-500' : showBypassWarning ? 'text-destructive' : 'text-emerald-500'}`}>
                {isSearchMode ? 'AI Search Pulse: READY' : isInternalPage ? 'INTERNAL NODE: CONNECTED' : showBypassWarning ? 'ACCESS: DIRECT_ONLY' : 'Canal Uplink: STABLE'}
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
          <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background">
             <Loader2 className="size-10 text-primary animate-spin" />
             <p className="text-xs font-mono uppercase tracking-widest text-primary">Calibrating Terminal...</p>
          </div>
        }>
          <BrowserContent />
        </Suspense>
      </SidebarInset>
    </div>
  )
}
