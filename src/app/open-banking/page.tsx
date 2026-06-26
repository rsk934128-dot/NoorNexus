"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Landmark, 
  Globe, 
  Zap, 
  Menu, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Building2, 
  ArrowLeft, 
  PieChart, 
  Activity,
  Layers,
  LayoutGrid,
  TrendingUp,
  Cpu,
  Unplug,
  Loader2,
  X,
  RefreshCcw,
  ShieldAlert,
  ArrowRightLeft,
  Timer,
  Lock,
  Route
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const GLOBAL_LEADERS = [
  { name: "Plaid", hq: "USA", banks: "9,706", countries: "60", tag: "Global Alpha", url: "https://plaid.com/" },
  { name: "Lunch Flow", hq: "EU", banks: "2,400", countries: "60", tag: "EU Leader", url: "https://lunchflow.com/" },
  { name: "GoCardless", hq: "UK", banks: "2,228", countries: "54", tag: "PIS Expert", url: "https://gocardless.com/" },
  { name: "YAXI", hq: "UK", banks: "1,921", countries: "40", tag: "High Coverage", url: "https://yapi.com/" },
  { name: "Volt", hq: "UK", banks: "1,668", countries: "50", tag: "Instant Payments", url: "https://volt.io/" },
  { name: "Salt Edge", hq: "Canada", banks: "1,586", countries: "73", tag: "Compliance King", url: "https://saltedge.com/" },
]

const REGIONAL_PROVIDERS = {
  usa: [
    { name: "Plaid", banks: "9,706", countries: "60", url: "https://plaid.com/" },
    { name: "Token", banks: "13", countries: "26", url: "https://token.io/" },
    { name: "Finicity", banks: "2", countries: "2", url: "https://finicity.com/" },
  ],
  europe: [
    { name: "Lunch Flow", banks: "2,400", countries: "60", url: "https://lunchflow.com/" },
    { name: "GoCardless", banks: "2,228", banks: "2,228", countries: "54", url: "https://gocardless.com/" },
    { name: "Tink", banks: "511", countries: "46", url: "https://tink.com/" },
  ],
  latam: [
    { name: "Pluggy", banks: "99", countries: "10", url: "https://pluggy.ai/" },
    { name: "Klavi", banks: "19", countries: "2", url: "https://klavi.ai/" },
    { name: "Belvo", banks: "18", countries: "4", url: "https://belvo.com/" },
  ]
}

export default function OpenBankingHubPage() {
  const { toast } = useToast()
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [loadingView, setLoadingView] = useState(false)
  const [latency, setLatency] = useState<number>(0)
  const [failSafeActive, setFailSafeActive] = useState(false)
  const [handshakeStep, setHandshakeStep] = useState<string>("")
  const timerRef = useRef<any>(null)

  const openInApp = (url: string) => {
    setLoadingView(true)
    setFailSafeActive(false)
    setActiveUrl(url)
    setLatency(0)
    
    // Handshake Sequence (Project #45)
    const steps = ["RSA_ENCRYPTION_INIT", "HMAC_V4_VERIFY", "CANAL_TUNNELING", "END_TO_END_SYNC"]
    let i = 0
    const stepInterval = setInterval(() => {
      if (i < steps.length) {
        setHandshakeStep(steps[i])
        i++
      } else {
        clearInterval(stepInterval)
        setHandshakeStep("READY")
        setLoadingView(false)
        setLatency(Math.floor(Math.random() * 80) + 20) // Random latency 20-100ms
      }
    }, 400)

    // Fail-Safe Monitor (Simulation)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (url.includes('plaid')) { // Simulate a lag for demonstration
        setFailSafeActive(true)
        toast({
          title: "⚠️ Provider Lag Detected",
          description: "Plaid response > 2500ms. Fail-safe route suggested.",
          variant: "destructive"
        })
      }
    }, 2500)
  }

  const closeView = () => {
    setActiveUrl(null)
    setFailSafeActive(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const triggerFailover = () => {
    toast({ title: "Fail-Safe Triggered", description: "Switching to secondary Sovereign route..." })
    setFailSafeActive(false)
    // In a real scenario, this would load a fallback provider's URL
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        {activeUrl ? (
          <main className="flex flex-col h-screen w-full overflow-hidden p-0 m-0 animate-in fade-in zoom-in-95 duration-300">
             <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-50">
                <div className="flex items-center gap-4">
                   <Button variant="ghost" size="icon" onClick={closeView} className="text-primary">
                      <ArrowLeft className="size-5" />
                   </Button>
                   <div className="space-y-0.5">
                      <p className="text-xs font-bold text-white uppercase flex items-center gap-2">
                        Sovereign Canal Active
                        <Badge variant="outline" className="text-[7px] border-emerald-500/50 text-emerald-500">PROJECT_45_HARDENED</Badge>
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">{activeUrl}</p>
                        <Badge variant="outline" className="text-[7px] border-primary/20 text-primary uppercase flex items-center gap-1">
                          <Timer className="size-2" /> {latency}ms
                        </Badge>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   {failSafeActive && (
                     <Button 
                      onClick={triggerFailover}
                      className="bg-amber-500 hover:bg-amber-600 text-black h-8 px-3 text-[9px] font-bold uppercase gap-2 animate-pulse"
                     >
                       <Route className="size-3" /> Fail-Safe Route
                     </Button>
                   )}
                   <Button variant="ghost" size="icon" onClick={() => openInApp(activeUrl)} className="text-muted-foreground hover:text-primary">
                      <RefreshCcw className={`size-4 ${loadingView ? 'animate-spin' : ''}`} />
                   </Button>
                   <Button variant="outline" size="sm" className="border-white/10 text-[10px] font-bold uppercase" onClick={() => window.open(activeUrl, '_blank')}>
                      <ExternalLink className="size-3 mr-2" /> Open External
                   </Button>
                </div>
             </header>
             <div className="flex-1 bg-white relative">
                {loadingView && (
                  <div className="absolute inset-0 z-10 bg-background flex flex-col items-center justify-center gap-6">
                     <div className="relative">
                        <div className="size-24 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Lock className="size-8 text-primary animate-pulse" />
                        </div>
                     </div>
                     <div className="text-center space-y-2">
                        <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary animate-pulse">{handshakeStep}</p>
                        <p className="text-[9px] text-muted-foreground uppercase font-bold">Securing Sovereign Canal Tunnel...</p>
                     </div>
                  </div>
                )}
                <iframe 
                  src={activeUrl} 
                  className="w-full h-full border-0"
                  title="Internal Partner View"
                  sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals"
                  allow="camera; microphone; clipboard-write; encrypted-media"
                />
             </div>
          </main>
        ) : (
          <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <SidebarTrigger className="md:hidden text-primary">
                      <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                     <ArrowRightLeft className="size-3 mr-2" /> Project #45: Sovereign Fintech Canal
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                  Banking <span className="text-primary">Infrastructure.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                  Universal Banking Connect. Real-time fail-safe integration for 73+ licensed platforms exposing 57,200+ bank APIs worldwide.
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[150px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Tunnel Latency</p>
                    <p className="text-2xl font-headline font-bold text-emerald-500">&lt; 40ms</p>
                 </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-10">
                {/* Selection Criteria */}
                <section className="space-y-6">
                   <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                      <Zap className="size-4" /> Hardened Selection Logic
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "Zero-Lag Sync", desc: "Optimized data streams with edge-node tunneling.", icon: Timer },
                        { title: "Fail-Safe Reroute", desc: "Automatic switching between stable banking canals.", icon: Route },
                        { title: "RSA Verification", desc: "Project #45 standard for end-to-end security.", icon: ShieldCheck }
                      ].map((factor, i) => (
                        <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-primary/20 transition-all">
                          <CardContent className="p-6 space-y-4">
                             <div className="p-3 bg-primary/10 rounded-xl w-fit">
                                <factor.icon className="size-5 text-primary" />
                             </div>
                             <div className="space-y-1">
                                <p className="text-xs font-headline font-bold text-white uppercase">{factor.title}</p>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">{factor.desc}</p>
                             </div>
                          </CardContent>
                        </Card>
                      ))}
                   </div>
                </section>

                {/* Providers Explorer */}
                <section className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                         <Layers className="size-4" /> Global Banking Mesh
                      </h3>
                      <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                         <input className="bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-[10px] w-48 outline-none focus:ring-1 focus:ring-primary" placeholder="Filter 73+ Providers..." />
                      </div>
                   </div>

                   <Tabs defaultValue="global" className="space-y-6">
                      <TabsList className="bg-white/5 border border-white/10 p-1">
                         <TabsTrigger value="global" className="text-[10px] uppercase font-bold px-6">Global Alpha</TabsTrigger>
                         <TabsTrigger value="usa" className="text-[10px] uppercase font-bold px-6">United States</TabsTrigger>
                         <TabsTrigger value="europe" className="text-[10px] uppercase font-bold px-6">Europe</TabsTrigger>
                         <TabsTrigger value="latam" className="text-[10px] uppercase font-bold px-6">Latin America</TabsTrigger>
                      </TabsList>

                      <TabsContent value="global" className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
                         {GLOBAL_LEADERS.map((p, i) => (
                           <Card key={i} className="glass-card group hover:border-primary/30 transition-all overflow-hidden cursor-pointer" onClick={() => openInApp(p.url)}>
                              <CardContent className="p-6 flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                    <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 font-headline font-bold text-primary text-xl relative">
                                       {p.name[0]}
                                       <div className="absolute -bottom-1 -right-1 size-3 bg-emerald-500 rounded-full border-2 border-background" />
                                    </div>
                                    <div className="space-y-0.5">
                                       <div className="flex items-center gap-2">
                                          <p className="text-sm font-bold text-white uppercase">{p.name}</p>
                                          <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">{p.tag}</Badge>
                                       </div>
                                       <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">{p.banks} Banks • {p.countries} Countries</p>
                                    </div>
                                 </div>
                                 <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-primary">
                                    <Route className="size-4" />
                                  </Button>
                              </CardContent>
                           </Card>
                         ))}
                      </TabsContent>

                      {/* Regional Contents */}
                      {Object.entries(REGIONAL_PROVIDERS).map(([key, list]) => (
                        <TabsContent key={key} value={key} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           {list.map((p, i) => (
                             <Card key={i} className="glass-card p-5 space-y-4 hover:border-primary/20 transition-all cursor-pointer" onClick={() => openInApp(p.url)}>
                                <div className="flex justify-between items-start">
                                   <p className="text-xs font-bold text-white uppercase">{p.name}</p>
                                   <ExternalLink className="size-3 text-muted-foreground" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                                   <div>
                                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Banks</p>
                                      <p className="text-sm font-headline font-bold text-primary">{p.banks}</p>
                                   </div>
                                   <div className="text-right">
                                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Region</p>
                                      <p className="text-sm font-headline font-bold text-white uppercase">{key}</p>
                                   </div>
                                </div>
                             </Card>
                           ))}
                        </TabsContent>
                      ))}
                   </Tabs>
                </section>
              </div>

              <div className="space-y-8">
                <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                      <TrendingUp className="size-4" /> Canal Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                       {[
                         { label: "Canal Availability", val: "100%", color: "text-emerald-500" },
                         { label: "Active Handshakes", val: "1.2k", color: "text-primary" },
                         { label: "Fail-Safe Events", val: "0", color: "text-white" }
                       ].map((s, i) => (
                         <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">{s.label}</span>
                            <span className={`text-sm font-headline font-bold ${s.color}`}>{s.val}</span>
                         </div>
                       ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                   <CardHeader>
                      <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                         <Cpu className="size-4" /> Fail-Safe Policy
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <p className="text-[10px] text-muted-foreground italic">
                         "Project #45 mandates automatic rerouting if any canal latency exceeds 2000ms or encryption integrity drops below 99.9%."
                      </p>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: '100%' }} />
                      </div>
                   </CardContent>
                </Card>

                <Card className="glass-card">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-[10px] uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                         <Unplug className="size-4" /> Verified Bridges
                      </CardTitle>
                   </CardHeader>
                   <CardContent>
                      <div className="space-y-2">
                         <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                            <span className="text-[9px] text-white font-bold">Plaid Alpha</span>
                            <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">ACTIVE</Badge>
                         </div>
                         <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                            <span className="text-[9px] text-white font-bold">Lunch Flow EU</span>
                            <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">ACTIVE</Badge>
                         </div>
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
