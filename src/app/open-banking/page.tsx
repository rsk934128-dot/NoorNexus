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
  ArrowLeft, 
  Activity,
  Layers,
  TrendingUp,
  Cpu,
  Loader2,
  RefreshCcw,
  Route,
  Infinity,
  Sparkles,
  CreditCard,
  Database,
  Repeat,
  FileCheck,
  Code2,
  AlertTriangle,
  Network,
  ArrowRight,
  LayoutGrid,
  Monitor,
  Building2,
  CheckCircle2
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const PROVIDER_METRICS = [
  { id: "yapily", name: "Yapily (EU/UK)", latency: 32, success: 99.8, status: "OPTIMAL", icon: Globe },
  { id: "plaid", name: "Plaid (US/Global)", latency: 45, success: 99.4, status: "STABLE", icon: Network },
]

const GLOBAL_LEADERS = [
  { 
    name: "Yapily", 
    hq: "UK", 
    banks: "2,000+", 
    countries: "20+", 
    tag: "AMEX Strategic Partner", 
    url: "https://yapily.com/", 
    alliance: "AMEX Pay with Bank Transfer",
    capabilities: ["Payments", "Data", "Enrichment", "Verification", "VRPs"],
    apiSpecs: {
      version: "11.5.2",
      baseUrl: "https://api.yapily.com",
      auth: "Basic Auth (AppID:Secret)",
      responseFormat: "JSON with Metadata"
    }
  },
  { name: "Plaid", hq: "USA", banks: "9,706", countries: "60", tag: "Global Alpha", url: "https://plaid.com/" },
  { name: "SIBS Network", hq: "Portugal", banks: "24+", countries: "EU", tag: "SEPA Specialist", url: "https://developer.sibsapimarket.com/live/product" },
  { name: "GoCardless", hq: "UK", banks: "2,228", countries: "54", tag: "PIS Expert", url: "https://gocardless.com/" },
]

const SIBS_INSTITUTIONS = [
  { name: "Millennium BCP", code: "BCPPT", type: "Full Support" },
  { name: "Caixa Geral de Depósitos", code: "CGDPT", type: "Bulk/Inst Support" },
  { name: "Santander Totta", code: "BST", type: "Cross Border" },
  { name: "Novo Banco", code: "NVB", type: "Periodic Support" }
]

export default function OpenBankingHubPage() {
  const { toast } = useToast()
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [loadingView, setLoadingView] = useState(false)
  const [orchestrating, setOrchestrating] = useState(false)
  const [activeProvider, setActiveProvider] = useState("yapily")

  const handleOrchestration = () => {
    setOrchestrating(true)
    setTimeout(() => {
      setOrchestrating(false)
      const best = PROVIDER_METRICS.sort((a, b) => a.latency - b.latency)[0]
      setActiveProvider(best.id)
      toast({ 
        title: "Intelligent Reroute", 
        description: `Neural Orchestrator selected ${best.name} for optimal performance.`,
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 1500)
  }

  const openInApp = (url: string) => {
    setLoadingView(true)
    setActiveUrl(url)
    setTimeout(() => setLoadingView(false), 1000)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        {activeUrl ? (
          <main className="flex flex-col h-screen w-full overflow-hidden p-0 m-0 animate-in fade-in zoom-in-95 duration-300">
             <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-50">
                <div className="flex items-center gap-4">
                   <Button variant="ghost" size="icon" onClick={() => setActiveUrl(null)} className="text-primary">
                      <ArrowLeft className="size-5" />
                   </Button>
                   <div className="space-y-0.5">
                      <p className="text-xs font-bold text-white uppercase flex items-center gap-2">
                        Sovereign Canal Active
                        <Badge variant="outline" className="text-[7px] border-emerald-500/50 text-emerald-500">REALITY_SYNC_ON</Badge>
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">{activeUrl}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm" className="border-white/10 text-[10px] font-bold uppercase" onClick={() => window.open(activeUrl, '_blank')}>
                      <ExternalLink className="size-3 mr-2" /> Open External
                   </Button>
                </div>
             </header>
             <div className="flex-1 bg-white relative">
                {loadingView && (
                  <div className="absolute inset-0 z-10 bg-background flex flex-col items-center justify-center gap-6">
                     <Loader2 className="size-12 text-primary animate-spin" />
                     <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary animate-pulse">LEGACY_CORE_SYNC...</p>
                  </div>
                )}
                <iframe src={activeUrl} className="w-full h-full border-0" sandbox="allow-same-origin allow-scripts allow-popovers allow-forms" allow="camera; microphone; clipboard-write; encrypted-media" />
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
                     <Infinity className="size-3 mr-2" /> Neural Provider Orchestration
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                  Banking <span className="text-primary">Infrastructure.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                  Mission 400: Universal Banking Connect. Optimized by **Nora-50 Intelligent Orchestrator** with SIBS Network Integration.
                </p>
              </div>
              <div className="flex gap-4">
                 <Link href="/sovereign-gateway">
                   <Button className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary">
                     <Zap className="size-4" /> Project #51 Blueprint
                   </Button>
                 </Link>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-10">
                {/* Neural Orchestrator Panel */}
                <section className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                         <Cpu className="size-4" /> Intelligent Orchestrator (Nora-50)
                      </h3>
                      <Button onClick={handleOrchestration} disabled={orchestrating} size="sm" className="h-8 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20">
                         {orchestrating ? <Loader2 className="size-3 animate-spin mr-2" /> : <RefreshCcw className="size-3 mr-2" />}
                         Sync Provider Health
                      </Button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PROVIDER_METRICS.map((m) => (
                        <Card key={m.id} className={`glass-card border-l-4 transition-all ${activeProvider === m.id ? 'border-l-emerald-500 bg-emerald-500/5' : 'border-l-primary opacity-60'}`}>
                           <CardContent className="p-6 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className={`p-3 rounded-xl ${activeProvider === m.id ? 'bg-emerald-500/20 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                                    <m.icon className="size-6" />
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className="text-sm font-headline font-bold text-white uppercase">{m.name}</p>
                                    <div className="flex gap-4 text-[9px] font-mono text-muted-foreground uppercase">
                                       <span>Latency: <span className="text-white">{m.latency}ms</span></span>
                                       <span>Uptime: <span className="text-white">{m.success}%</span></span>
                                    </div>
                                 </div>
                              </div>
                              {activeProvider === m.id && (
                                <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] animate-pulse">ACTIVE_ROUTE</Badge>
                              )}
                           </CardContent>
                        </Card>
                      ))}
                   </div>
                </section>

                {/* SIBS Ecosystem Section */}
                <section className="space-y-6">
                   <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                      <Building2 className="size-4" /> SIBS Network Ecosystem (Portugal)
                   </h3>
                   <Card className="glass-card border-l-4 border-l-primary bg-primary/5 overflow-hidden">
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <CardTitle className="text-sm font-headline uppercase text-white">Supported Capabilities</CardTitle>
                            <div className="grid grid-cols-2 gap-3">
                               {[
                                 { label: "SEPA CT", status: "YES" },
                                 { label: "SCT Inst", status: "YES" },
                                 { label: "Periodic", status: "YES" },
                                 { label: "Bulk Pay", status: "YES" }
                               ].map((cap, i) => (
                                 <div key={i} className="p-2 bg-black/40 rounded border border-white/5 flex justify-between items-center">
                                    <span className="text-[10px] text-muted-foreground font-bold">{cap.label}</span>
                                    <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">{cap.status}</Badge>
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="space-y-4">
                            <CardTitle className="text-sm font-headline uppercase text-white">Validated ASPSPs</CardTitle>
                            <div className="space-y-2">
                               {SIBS_INSTITUTIONS.map((inst, i) => (
                                 <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                                    <span className="text-white">{inst.name}</span>
                                    <span className="text-primary">{inst.type}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </Card>
                </section>

                {/* Integration Pathways Section */}
                <section className="space-y-6">
                   <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                      <LayoutGrid className="size-4" /> Hybrid Resiliency Engine
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-l-4 border-l-emerald-500 hover:border-emerald-500/30 transition-all group">
                         <CardHeader>
                            <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                               <Monitor className="size-4" /> Hosted Fallback
                            </CardTitle>
                            <CardDescription>Automatic redirect if Direct API fails to authorize or experiences drift.</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <ul className="space-y-2 text-[10px] text-muted-foreground list-disc pl-4">
                               <li>Zero manual intervention during API outages.</li>
                               <li>Seamlessly hands off to pre-built consent flow.</li>
                               <li>Maintains 99.98% successful handshake rate.</li>
                            </ul>
                            <Button size="sm" className="w-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 text-[9px] uppercase font-bold">
                               Test Fallback Logic
                            </Button>
                         </CardContent>
                      </Card>

                      <Card className="glass-card border-l-4 border-l-primary hover:border-primary/30 transition-all">
                         <CardHeader>
                            <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                               <Code2 className="size-4" /> Direct Control
                            </CardTitle>
                            <CardDescription>White-labeled API interaction for deep UI/UX integration.</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <ul className="space-y-2 text-[10px] text-muted-foreground list-disc pl-4">
                               <li>Custom branding injection via Sovereign SDK.</li>
                               <li>Real-time SCA status monitoring.</li>
                               <li>Support for complex multi-sig transactions.</li>
                            </ul>
                            <Button size="sm" className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-[9px] uppercase font-bold">
                               View White-label SDK
                            </Button>
                         </CardContent>
                      </Card>
                   </div>
                </section>

                {/* Developer API Reference */}
                <section className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                         <Code2 className="size-4" /> Developer API Reference (v11.5.2)
                      </h3>
                      <Badge variant="outline" className="text-[8px] border-primary/20 text-primary uppercase">Direct Access Only</Badge>
                   </div>
                   
                   <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                      <CardContent className="p-6 space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <div className="space-y-2">
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Base Endpoint</p>
                                  <div className="p-3 bg-black/40 rounded-lg space-y-2 font-mono text-[10px]">
                                     <div className="flex justify-between"><span className="text-muted-foreground">URL:</span> <span className="text-white">https://api.yapily.com</span></div>
                                     <div className="flex justify-between"><span className="text-muted-foreground">Auth:</span> <span className="text-white">Basic (AppID:Secret)</span></div>
                                  </div>
                               </div>
                            </div>
                            <div className="space-y-4">
                               <div className="space-y-2">
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Resilient Logic</p>
                                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg space-y-2 italic text-[10px]">
                                     <p className="text-emerald-100 leading-relaxed">"Tracing IDs are automatically mapped to Nora-50. Failures trigger reroute to alternative canals."</p>
                                     <div className="flex items-center gap-2 text-emerald-500 font-bold">
                                        <ShieldCheck className="size-3" /> TRACING_LINK: ACTIVE
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                </section>

                {/* Providers Explorer */}
                <section className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                         <Layers className="size-4" /> Global Mesh Coverage
                      </h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {GLOBAL_LEADERS.map((p, i) => (
                        <Card key={i} className="glass-card group hover:border-primary/30 transition-all overflow-hidden cursor-pointer" onClick={() => openInApp(p.url)}>
                           <CardContent className="p-6 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 font-headline font-bold text-primary text-xl">
                                    {p.name[0]}
                                 </div>
                                 <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                       <p className="text-sm font-bold text-white uppercase">{p.name}</p>
                                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">{p.tag}</Badge>
                                    </div>
                                    <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">{p.banks} Banks • {p.countries} Countries</p>
                                 </div>
                              </div>
                              <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary" />
                           </CardContent>
                        </Card>
                      ))}
                   </div>
                </section>
              </div>

              <div className="space-y-8">
                <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                      <TrendingUp className="size-4" /> Canal Health Pulse
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                       {[
                         { label: "Neural Sync", val: "ACTIVE", color: "text-emerald-500" },
                         { label: "Orchestration Efficiency", val: "99.2%", color: "text-primary" },
                         { label: "Reroute Prediction", val: "N/A (Stable)", color: "text-white" }
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
                      <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                         <Route className="size-4" /> Fail-Safe Route
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <p className="text-[10px] text-muted-foreground italic">
                         "Orchestrator monitoring 73+ banking canals. Automated switch triggered if latency &gt; 1500ms."
                      </p>
                   </CardContent>
                </Card>

                <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                         <ShieldCheck className="size-3" /> Project #51 Access
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <p className="text-[9px] text-muted-foreground leading-relaxed">
                         "Leveraging Hosted Pages and Direct API with white-label branding injection."
                      </p>
                      <Link href="/sovereign-gateway" className="w-full">
                        <Button variant="outline" className="w-full h-8 text-[9px] uppercase font-bold border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10">
                           View Gateway <ArrowRight className="size-3 ml-2" />
                        </Button>
                      </Link>
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
