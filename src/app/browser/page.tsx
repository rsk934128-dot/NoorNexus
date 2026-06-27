"use client"

import { useState, useEffect, useRef } from "react"
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
  ChevronRight,
  ShieldAlert,
  Menu,
  Cpu,
  Sparkles,
  Link2,
  LayoutGrid
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { executeZenithSearch, WebSearchOutput } from "@/ai/flows/web-search-flow"
import { ScrollArea } from "@/components/ui/scroll-area"

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
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchResult, setSearchResult] = useState<WebSearchOutput | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleNavigate = async (url?: string) => {
    let target = url || urlInput
    if (!target.trim()) return

    // Detection: Is it a URL or a Search Query?
    const isUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(target)

    if (!isUrl && !url) {
      // Execute AI Search
      handleSearch(target)
      return
    }

    if (!target.startsWith('http')) {
      target = `https://${target}`
    }
    
    setLoading(true)
    setIsSearchMode(false)
    setActiveUrl(target)
    setUrlInput(target)
    
    toast({
      title: "Establishing Web Bridge",
      description: `Uplink initiated for ${target.substring(0, 30)}...`,
      className: "border-primary/50 bg-primary/5"
    })

    // Simulated handshake delay
    setTimeout(() => setLoading(false), 1500)
  }

  const handleSearch = async (query: string) => {
    setLoading(true)
    setIsSearchMode(true)
    setSearchResult(null)
    setUrlInput(query)

    try {
      toast({ title: "Zenith Search Active", description: "Querying Nora-18 Search Sentinel..." })
      const result = await executeZenithSearch({ query })
      setSearchResult(result)
    } catch (e: any) {
      toast({ title: "Search Failure", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    if (isSearchMode) {
      handleSearch(urlInput)
    } else if (iframeRef.current) {
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
                  <p className="text-[8px] text-muted-foreground font-mono tracking-widest uppercase">Zenith Search v4.2</p>
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
                    className="w-full bg-black/40 border-white/10 h-10 pl-9 pr-24 text-xs font-mono text-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter URL or Ask Nora-AI..."
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                     <Button 
                       variant="ghost" 
                       size="sm"
                       onClick={() => handleSearch(urlInput)}
                       className="text-[9px] uppercase font-bold text-amber-500 hover:bg-amber-500/10 h-8 px-2"
                     >
                        <Search className="size-3 mr-1" /> Search
                     </Button>
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
                    onClick={() => window.open(isSearchMode ? `https://www.google.com/search?q=${urlInput}` : activeUrl, '_blank')}
                  >
                     <ExternalLink className="size-3 mr-2" /> Pop-out
                  </Button>
               </div>
            </div>
          </header>

          {/* Quick Bookmarks Bar */}
          <div className="px-4 py-2 border-b border-white/5 bg-black/20 overflow-x-auto flex items-center gap-4 no-scrollbar shrink-0">
             <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">Sovereign Channels:</span>
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

          {/* Browser Content Area */}
          <div className="flex-1 overflow-hidden bg-black/40 w-full relative">
            {loading && (
               <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-6">
                  <div className="relative">
                     <div className="size-20 rounded-full border-2 border-primary/20 flex items-center justify-center">
                        {isSearchMode ? <Search className="size-10 text-amber-500 animate-pulse" /> : <Globe className="size-10 text-primary animate-pulse" />}
                     </div>
                     <div className={`absolute inset-0 border-t-2 ${isSearchMode ? 'border-amber-500' : 'border-primary'} rounded-full animate-spin`} />
                  </div>
                  <div className="text-center space-y-2">
                     <p className={`text-sm font-headline font-bold uppercase tracking-[0.3em] animate-pulse ${isSearchMode ? 'text-amber-500' : 'text-primary'}`}>
                        {isSearchMode ? 'Querying Zenith Mesh...' : 'Establishing Web Bridge...'}
                     </p>
                     <p className="text-[10px] text-muted-foreground font-mono uppercase">Neural Handshake in Progress</p>
                  </div>
               </div>
            )}

            {isSearchMode ? (
              <ScrollArea className="h-full w-full bg-background/40">
                <div className="max-w-4xl mx-auto p-8 space-y-10">
                  {searchResult ? (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="p-6 glass-card border-l-4 border-l-amber-500 bg-amber-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <Sparkles className="size-24 text-amber-500" />
                        </div>
                        <h3 className="text-xs font-headline font-bold uppercase text-amber-500 mb-4 flex items-center gap-2">
                           <Cpu className="size-4" /> Nora-18 Intelligence Summary
                        </h3>
                        <p className="text-lg text-white leading-relaxed italic">"{searchResult.summary}"</p>
                      </div>

                      <div className="space-y-6">
                         <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">Suggested Web Hubs</h4>
                         <div className="grid grid-cols-1 gap-4">
                            {searchResult.results.map((res, i) => (
                              <Card key={i} className="glass-card border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onClick={() => handleNavigate(res.url)}>
                                <CardContent className="p-6 flex items-center justify-between gap-6">
                                   <div className="space-y-2 flex-1">
                                      <div className="flex items-center gap-2">
                                         <Badge variant="outline" className="text-[7px] border-primary/20 text-primary uppercase">{res.source}</Badge>
                                         <h5 className="text-sm font-bold text-white uppercase group-hover:text-primary transition-colors">{res.title}</h5>
                                      </div>
                                      <p className="text-xs text-muted-foreground leading-relaxed italic">{res.snippet}</p>
                                      <p className="text-[9px] font-mono text-primary/60 truncate">{res.url}</p>
                                   </div>
                                   <div className="shrink-0 size-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                                      <Link2 className="size-5" />
                                   </div>
                                </CardContent>
                              </Card>
                            ))}
                         </div>
                      </div>

                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                         <p className="text-[10px] text-emerald-100 italic">"Directive: {searchResult.suggestedAction}"</p>
                         <div className="text-right">
                            <p className="text-[8px] font-mono text-muted-foreground uppercase">Search Hash (Nora-18)</p>
                            <code className="text-[8px] text-primary">{searchResult.searchHash.substring(0, 16)}...</code>
                         </div>
                      </div>
                    </div>
                  ) : !loading && (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center gap-6 opacity-40">
                       <Search className="size-16 text-muted-foreground animate-bounce" />
                       <p className="text-sm font-mono uppercase tracking-widest leading-relaxed">No search pulse active.<br/>Initiate a query to see results.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            ) : (
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
            )}

            {/* Frame Blocking Warning Overlay (Only for iframe mode) */}
            {!isSearchMode && (
              <div className="absolute bottom-6 left-6 max-w-xs pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity">
                <div className="p-3 bg-black/80 backdrop-blur-md border border-amber-500/20 rounded-lg flex items-start gap-3 shadow-2xl">
                    <ShieldAlert className="size-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-amber-100/80 leading-relaxed italic">
                      Some websites may block in-app viewing. If the screen is blank, use the <strong>Pop-out</strong> button or <strong>Zenith Search</strong> for a summary.
                    </p>
                </div>
              </div>
            )}
          </div>
          
          <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full">
            <div className="flex items-center justify-center gap-6">
               <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
                 NoorNexus Imperial Proxy | SSL: SHA-256 Verified
               </p>
               <div className="flex items-center gap-2">
                  <div className={`size-1.5 rounded-full ${isSearchMode ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                  <span className={`text-[8px] font-bold uppercase ${isSearchMode ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {isSearchMode ? 'AI Search Pulse Active' : 'Uplink Stable'}
                  </span>
               </div>
            </div>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
