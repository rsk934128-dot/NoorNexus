"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Ship, 
  Plane, 
  Coins, 
  Car, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Menu, 
  TrendingUp, 
  Search, 
  ShoppingCart,
  ArrowRightLeft,
  Loader2,
  Lock,
  Cpu,
  History,
  Anchor,
  Gem,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Database,
  ExternalLink,
  ArrowLeft,
  Monitor,
  Sparkles,
  RefreshCcw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { executeMappedPayout } from "@/services/pay-bridge"
import { useUser } from "@/firebase"

const MARKET_CATEGORIES = [
  { id: "aerospace", name: "Aerospace & Space", icon: Rocket, color: "text-purple-500", bg: "bg-purple-500/10", url: "https://www.jamesedition.com/jets" },
  { id: "maritime", name: "Maritime & Ships", icon: Ship, color: "text-blue-500", bg: "bg-blue-500/10", url: "https://www.yachtworld.com/" },
  { id: "precious", name: "Precious Metals & Gold", icon: Gem, color: "text-amber-500", bg: "bg-amber-500/10", url: "https://www.kitco.com/" },
  { id: "automotive", name: "Luxury Automotive", icon: Car, color: "text-primary", bg: "bg-primary/10", url: "https://www.dupontregistry.com/" },
  { id: "tech", name: "High-End Electronics", icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-500/10", url: "https://www.apple.com/" }
]

const MOCK_ASSETS = [
  { 
    id: "ZEN-PL-001", 
    category: "aerospace", 
    name: "Gulfstream G700 - Imperial Edition", 
    price: 75000000, 
    seller: "Zenith Aviation", 
    status: "CERTIFIED",
    description: "Ultra-long-range business jet with custom Sovereign-L4 security uplink.",
    image: "https://picsum.photos/seed/plane1/600/400"
  },
  { 
    id: "ZEN-SH-99", 
    category: "maritime", 
    name: "LNG Carrier - Sovereign Class", 
    price: 180000000, 
    seller: "Imperial Maritime Hub", 
    status: "READY",
    description: "Next-gen clean energy transport vessel. Fully automated docking sync.",
    image: "https://picsum.photos/seed/ship1/600/400"
  },
  { 
    id: "ZEN-AU-42", 
    category: "precious", 
    name: "99.9% Pure Imperial Gold Bullion", 
    price: 65000, 
    seller: "Sovereign Mint", 
    status: "AUDITED",
    description: "1kg gold bar with Nora-52 veracity certificate and quantum hash.",
    image: "https://picsum.photos/seed/gold1/600/400"
  },
  { 
    id: "ZEN-CR-07", 
    category: "automotive", 
    name: "Rolls-Royce Spectre - Black Badge", 
    price: 450000, 
    seller: "Imperial Motors", 
    status: "CERTIFIED",
    description: "Fully electric ultra-luxury coupe. Integrated with NoorNexus Node sync.",
    image: "https://picsum.photos/seed/car1/600/400"
  }
]

export default function ZenithMarketsPage() {
  const { toast } = useToast()
  const { user } = useUser()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewUrl, setViewUrl] = useState<string | null>(null)
  const [loadingView, setLoadingView] = useState(false)

  const filteredAssets = activeCategory === "all" 
    ? MOCK_ASSETS 
    : MOCK_ASSETS.filter(a => a.category === activeCategory)

  async function handleInitiateTrade(asset: any) {
    if (!user) {
      toast({ title: "Identification Required", description: "Commander, please log in to access the Trade Corridors.", variant: "destructive" })
      return
    }

    setLoadingId(asset.id)
    try {
      toast({ title: "Sovereign Escrow Initiated", description: "Securing l4 liquidity handshake..." })
      
      const result = await executeMappedPayout(
        10000, 
        "Sovereign",
        { email: user.email!, systemId: user.uid }
      )

      if (result.status === 'SUCCESS') {
        toast({
          title: "Trade Lock Secured",
          description: `Contract ${asset.id} anchored to Sovereign Ledger. Final settlement pending delivery.`,
          className: "border-emerald-500/50 bg-emerald-500/5"
        })
      }
    } catch (e: any) {
      toast({ title: "Handshake Failed", description: e.message, variant: "destructive" })
    } finally {
      setLoadingId(null)
    }
  }

  const openLiveTerminal = (url: string) => {
    setLoadingView(true)
    setViewUrl(url)
    setTimeout(() => setLoadingView(false), 1500)
    toast({
      title: "Establishing Live Web Bridge",
      description: "Encrypted connection to external marketplace active.",
      className: "border-primary/50 bg-primary/5"
    })
  }

  const refreshTerminal = () => {
    const iframe = document.getElementById('market-terminal') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        {viewUrl ? (
          <main className="flex flex-col h-screen w-full overflow-hidden p-0 m-0 animate-in fade-in zoom-in-95">
             <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-50">
                <div className="flex items-center gap-4">
                   <Button variant="ghost" size="icon" onClick={() => setViewUrl(null)} className="text-amber-500 hover:bg-amber-500/10">
                      <ArrowLeft className="size-5" />
                   </Button>
                   <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                        Imperial Live Terminal
                        <Badge variant="outline" className="text-[7px] border-amber-500/50 text-amber-500">ZENITH_UPLINK</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[300px]">{viewUrl}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <Button variant="ghost" size="icon" onClick={refreshTerminal} className="text-muted-foreground hover:text-white">
                      <RefreshCcw className="size-4" />
                   </Button>
                   <Button variant="outline" size="sm" className="border-white/10 text-[10px] font-bold uppercase h-8 px-4" onClick={() => window.open(viewUrl, '_blank')}>
                      <ExternalLink className="size-3 mr-2" /> Pop-out
                   </Button>
                   <Button variant="ghost" size="icon" onClick={() => setViewUrl(null)} className="text-muted-foreground hover:text-destructive">
                      <ArrowLeft className="size-5" />
                   </Button>
                </div>
             </header>
             <div className="flex-1 bg-white relative">
                {loadingView && (
                  <div className="absolute inset-0 z-10 bg-background flex flex-col items-center justify-center gap-6">
                     <Loader2 className="size-12 text-amber-500 animate-spin" />
                     <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-500 animate-pulse">Establishing Sovereign Web Bridge...</p>
                  </div>
                )}
                <iframe 
                  id="market-terminal"
                  src={viewUrl} 
                  className="w-full h-full border-0" 
                  title="Imperial Market Terminal"
                  allow="camera; microphone; clipboard-write; encrypted-media; payment"
                  sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals"
                />
             </div>
             <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">NoorNexus OS Secure Frame | SSL: SHA-256 Verified</p>
             </footer>
          </main>
        ) : (
          <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <SidebarTrigger className="md:hidden text-primary">
                      <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                     <Globe className="size-3 mr-2" /> Project #900: Zenith Trade Corridors
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                  Imperial <span className="text-amber-500">Marketplace.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                  Global High-Value Asset Exchange. নূরনেক্সাস এখন বিমান, জাহাজ, সোনা এবং রকেটের মতো মেগা-মার্কেটের নিরাপদ ট্রেড গেটওয়ে।
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="p-4 glass-card rounded-2xl border border-amber-500/20 text-center min-w-[200px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Market Purity Index</p>
                    <p className="text-2xl font-headline font-bold text-emerald-500 uppercase flex items-center justify-center gap-2">
                       <CheckCircle2 className="size-5" /> OPTIMAL
                    </p>
                 </div>
              </div>
            </header>

            {/* Category Filter & Terminal Access */}
            <section className="flex flex-wrap gap-4">
               <Button 
                 variant={activeCategory === 'all' ? 'default' : 'outline'}
                 onClick={() => setActiveCategory('all')}
                 className="text-[10px] uppercase font-bold h-10 px-6 rounded-full"
               >
                  All Corridors
               </Button>
               {MARKET_CATEGORIES.map((cat) => (
                 <div key={cat.id} className="flex gap-1">
                    <Button 
                      variant={activeCategory === cat.id ? 'default' : 'outline'}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`text-[10px] uppercase font-bold h-10 px-6 rounded-l-full gap-2 ${activeCategory === cat.id ? 'bg-amber-500 text-black' : 'border-white/10 hover:border-amber-500/30'}`}
                    >
                       <cat.icon className="size-4" />
                       {cat.name}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => openLiveTerminal(cat.url)}
                      className="border-white/10 text-amber-500 hover:bg-amber-500/10 h-10 px-3 rounded-r-full"
                      title="Open Live Terminal"
                    >
                       <Monitor className="size-4" />
                    </Button>
                 </div>
               ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {filteredAssets.map((asset) => (
                     <Card key={asset.id} className="glass-card border-white/5 overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col">
                        <div className="relative aspect-video overflow-hidden">
                           <img 
                             src={asset.image} 
                             alt={asset.name} 
                             className="object-cover size-full group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" 
                           />
                           <div className="absolute top-4 right-4">
                              <Badge className="bg-black/60 backdrop-blur-md border-amber-500/30 text-amber-500">{asset.status}</Badge>
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </div>
                        <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                           <div className="space-y-1">
                              <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{asset.seller}</p>
                              <h4 className="text-xl font-headline font-bold text-white uppercase truncate">{asset.name}</h4>
                           </div>
                           <p className="text-xs text-muted-foreground italic leading-relaxed flex-1">"{asset.description}"</p>
                           <div className="flex justify-between items-end pt-4 border-t border-white/5">
                              <div className="space-y-1">
                                 <p className="text-[9px] text-muted-foreground uppercase font-bold">Market Price</p>
                                 <p className="text-2xl font-headline font-bold text-white">${asset.price.toLocaleString()}</p>
                              </div>
                              <Button 
                                onClick={() => handleInitiateTrade(asset)}
                                disabled={loadingId === asset.id}
                                className="bg-amber-500 text-black font-bold uppercase text-[10px] h-10 px-6 glow-emerald gap-2"
                              >
                                 {loadingId === asset.id ? <Loader2 className="size-4 animate-spin" /> : <ArrowRightLeft className="size-4" />}
                                 Trade Intent
                              </Button>
                           </div>
                        </CardContent>
                     </Card>
                   ))}
                </section>
              </div>

              <div className="space-y-8">
                 {/* Live Terminal Quick Launch */}
                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader>
                       <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                          <Monitor className="size-4" /> Imperial Web Bridge
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                          "কমান্ডার, আপনি এখন সরাসরি অ্যাপের ভেতর থেকে বিশ্ববিখ্যাত মার্কেটপ্লেসগুলো ব্রাউজ করতে পারবেন। আপনার প্রতিটি সেশন এনক্রিপ্টেড এবং সুরক্ষিত।"
                       </p>
                       <div className="space-y-2">
                          {MARKET_CATEGORIES.map(cat => (
                            <div key={cat.id} className="flex items-center justify-between p-2 bg-black/40 rounded border border-white/5 group hover:border-amber-500/40 transition-all cursor-pointer" onClick={() => openLiveTerminal(cat.url)}>
                               <div className="flex items-center gap-2">
                                  <cat.icon className="size-3 text-amber-500" />
                                  <span className="text-[9px] text-white font-bold uppercase">{cat.name}</span>
                               </div>
                               <ExternalLink className="size-2.5 text-muted-foreground group-hover:text-amber-500" />
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>

                 {/* Sovereign Escrow Monitor */}
                 <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                    <CardHeader>
                       <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                          <Lock className="size-4" /> Sovereign Escrow Protection
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                          "High-value trades are secured by HMAC_V4 logic. Funds are held in the Imperial Vault until multi-node veracity confirms delivery."
                       </p>
                       <div className="pt-4 border-t border-white/5 space-y-3">
                          {[
                            { label: "Atomic Success Rate", val: "100%", icon: CheckCircle2 },
                            { label: "Market Volatility", val: "LOW", icon: TrendingUp },
                            { label: "Verification Time", val: "28ms", icon: Zap }
                          ].map((s, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                               <div className="flex items-center gap-2">
                                  <s.icon className="size-3 text-amber-500" />
                                  <span className="uppercase text-muted-foreground">{s.label}</span>
                               </div>
                               <span className="text-white font-bold">{s.val}</span>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>

                 <Card className="glass-card">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                          <Database className="size-3" /> Oracle Verification
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-[9px] text-muted-foreground leading-relaxed">
                          Asset authenticity is verified via **Nora-11 Imperial Oracle** before the Trade Intent is finalized.
                       </p>
                       <div className="mt-4 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center justify-between">
                          <span className="text-[8px] text-emerald-500 font-bold uppercase">Nora-11 Pulse</span>
                          <span className="text-[8px] text-white font-mono animate-pulse">ACTIVE_SYNC</span>
                       </div>
                    </CardContent>
                 </Card>
              </div>
            </div>
          </main>
        )}
      </SidebarInset>
    </div>
  )
}
