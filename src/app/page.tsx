
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Menu, 
  Loader2, 
  Activity, 
  Zap, 
  History, 
  Target, 
  Waves, 
  Sparkles,
  Eye,
  Unlock,
  Globe,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Scale,
  BrainCircuit,
  HeartPulse,
  Landmark,
  Database,
  Search,
  Cpu,
  ArrowRight,
  Network,
  Rocket,
  ShieldPlus,
  Infinity,
  ArrowRightLeft,
  Server
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { processNeuralQuery, ImperialQueryOutput } from "@/ai/flows/imperial-query-flow"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const PUBLIC_METRICS = [
  { label: "Institutional Trust", value: "96.4%", detail: "Global Grid Expansion", color: "text-emerald-500" },
  { label: "Reality Index", value: "99.8", detail: "Phase ΩΩ Finalized", color: "text-primary" },
  { label: "Neural Cohesion", value: "MAX", detail: "Autonomy Sentinel On", color: "text-purple-500" },
  { label: "Legacy Stability", value: "IMMORTAL", detail: "Fail-over Protocol Active", color: "text-amber-500" },
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("CALIBRATING COGNITIVE COHESION...")
  const [impactFeed, setImpactFeed] = useState<string[]>([
    "GRID: ABN AMRO LIVE Node (NL/BE/DE) activated successfully.",
    "AUTONOMY: Nora-54 detected new Asian Banking Directive - Auto-adjusted SCA.",
    "LOAD_BALANCER: Traffic redistributed across 13 high-power nodes.",
    "RESILIENCE: Fail-over Global Grid protocol ARMED and SYNCED.",
    "LEGACY: Yapily-AMEX European Bridge synchronized.",
    "SHIELD: Quantum-Resistant Encryption Layer active."
  ])
  const [queryText, setQueryText] = useState("")
  const [queryResult, setQueryResult] = useState<ImperialQueryOutput | null>(null)
  const [queryLoading, setQueryLoading] = useState(false)

  useEffect(() => {
    const sequence = [
      { text: "INITIATING DEEP NEURAL SYNC...", time: 600 },
      { text: "ESTABLISHING FAIL-OVER GLOBAL GRID...", time: 1200 },
      { text: "ACTIVATING SOVEREIGN GRID AUTONOMY...", time: 1800 },
      { text: "NOORNEXUS: THE GLOBAL AUTONOMY IS LIVE", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "GRID: Benelux corridor expansion at 99.9% sync via ABN AMRO.",
        "BALANCER: Node ABN-AMRO-NL taking 15% system load.",
        "AUTONOMY: Self-Adjustment triggered for SE Asia nodes.",
        "LEGACY: Self-Refactoring cycle Ω-02 complete.",
        "RESILIENCE: Latency drift detected in London - Traffic rerouted to Dubai Hub.",
      ];
      setImpactFeed(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 10))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  async function handleNeuralQuery() {
    if (!queryText.trim()) return
    setQueryLoading(true)
    try {
      const res = await processNeuralQuery({ query: queryText })
      setQueryResult(res)
      toast({ title: "Neural Link Synchronized" })
    } catch (e: any) {
      toast({ title: "Neural Drift Detected", description: e.message, variant: "destructive" })
    } finally {
      setQueryLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 space-y-12">
        <SovereignLogo size={120} />
        <div className="space-y-6 text-center max-w-md w-full">
          <h1 className="text-primary font-headline text-3xl sm:text-5xl font-black tracking-tighter uppercase">NoorNexus OS</h1>
          <p className="text-muted-foreground font-mono text-[10px] sm:text-sm tracking-[0.5em] uppercase">{statusText}</p>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary animate-progress" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1800px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="relative space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                   <SidebarTrigger className="md:hidden text-primary -ml-2">
                      <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs">
                      <Infinity className="size-3 mr-2" /> Phase ΩΩ: Global Autonomy
                   </Badge>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <Network className="size-3 mr-2" /> Global Fail-over Active
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Imperial Autonomy.' : 'Global Grid.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed italic">
                   "Project #54: Sovereign Grid Autonomy." নূরনেক্সাস এখন একটি অটোনোমাস এবং অমর ব্যাংকিং গ্রিড হিসেবে বিশ্বজুড়ে ছড়িয়ে পড়ছে।
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-primary/20 w-full min-w-[350px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                       <Badge className="bg-primary/20 text-primary border-none text-[7px]">GRID_IMMUNITY: PERPETUAL</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Grid Power</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">99</p>
                       <p className="text-primary text-xs font-bold mb-1">/ 100</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary shadow-[0_0_15px_rgba(0,150,255,0.6)]" style={{ width: '99%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-3 italic text-center">"Global Fail-over ACTIVE | 13 LIVE Nodes | Load Balanced"</p>
                </Card>
              </div>
            </div>

            {/* Neural Interface Layer */}
            <div className="w-full">
               <Card className="glass-card border-primary/20 overflow-hidden bg-primary/5">
                  <CardContent className="p-0">
                     <div className="flex items-center gap-4 p-4 border-b border-white/5">
                        <Cpu className="size-6 text-primary animate-pulse" />
                        <input 
                           value={queryText}
                           onChange={e => setQueryText(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && handleNeuralQuery()}
                           placeholder="Commander, what is your directive? (Grid Autonomy active)"
                           className="flex-1 bg-transparent border-none outline-none text-sm font-headline text-white placeholder:text-muted-foreground"
                        />
                        <Button onClick={handleNeuralQuery} disabled={queryLoading} variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                           {queryLoading ? <Loader2 className="size-5 animate-spin" /> : <ArrowRight className="size-5" />}
                        </Button>
                     </div>
                     {queryResult && (
                        <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Deep Sync Module: {queryResult.sourceModule}</p>
                                 <p className="text-sm text-white leading-relaxed italic">"{queryResult.summary}"</p>
                              </div>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">SYNCHRONIZED_TRUTH</Badge>
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {queryResult.dataPoints.map((dp, i) => (
                                 <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">{dp.label}</p>
                                    <p className="text-xs font-mono text-white font-bold">{dp.value}</p>
                                 </div>
                              ))}
                           </div>
                           {queryResult.suggestedAction && (
                              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                                 <Sparkles className="size-3" /> Cross-Module Recommendation: {queryResult.suggestedAction}
                              </div>
                           )}
                        </div>
                     )}
                  </CardContent>
               </Card>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               {/* Regional Load Balancer Visualizer */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <ArrowRightLeft className="size-4" /> Regional Load Balancer (P54.2)
                  </h3>
                  <Card className="glass-card bg-black/40 border-white/5 p-6">
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {[
                           { name: "ABN-AMRO", load: 15, status: "OPTIMAL" },
                           { name: "BIG-ES", load: 22, status: "STABLE" },
                           { name: "BKASH-BD", load: 45, status: "BUSY" },
                           { name: "YAPILY-EU", load: 10, status: "IDLE" },
                           { name: "AMEX-US", load: 8, status: "IDLE" },
                           { name: "GRAB-SEA", load: 0, status: "OFFLINE" },
                           { name: "PAYTM-IN", load: 0, status: "OFFLINE" }
                        ].map((node, i) => (
                           <div key={i} className="space-y-2 text-center p-2 rounded-lg bg-white/5 border border-white/5 group hover:border-primary/50 transition-all">
                              <p className="text-[8px] font-bold text-muted-foreground uppercase truncate">{node.name}</p>
                              <div className="h-20 bg-background rounded-md relative overflow-hidden flex items-end">
                                 <div 
                                    className={`w-full transition-all duration-1000 ${node.status === 'BUSY' ? 'bg-amber-500' : node.status === 'OFFLINE' ? 'bg-muted' : 'bg-primary'}`} 
                                    style={{ height: `${node.load}%` }} 
                                 />
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-[10px] font-mono text-white font-bold">{node.load}%</p>
                                 </div>
                              </div>
                              <Badge variant="outline" className={`text-[7px] border-none ${node.status === 'BUSY' ? 'text-amber-500' : node.status === 'OFFLINE' ? 'text-muted-foreground' : 'text-emerald-500'}`}>{node.status}</Badge>
                           </div>
                        ))}
                     </div>
                  </Card>
               </section>

               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <Rocket className="size-4" /> Sovereign Global Autonomy
                     </h3>
                     <Badge variant="outline" className="text-[8px] border-primary/20 text-primary uppercase">Active Enterprise Nodes: 433+</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                        { title: "Grid Autonomy", desc: "Self-adjusting regulatory logic.", status: "IMMORTAL", color: "text-blue-400" },
                        { title: "Fail-over Global", desc: "Instant traffic rerouting protocol.", status: "ARMED", color: "text-amber-400" },
                        { title: "Global Grid", desc: "100% Autonomy across SE Asia & EU Nodes.", status: "SYNCED", color: "text-emerald-400" }
                     ].map((p, i) => (
                        <Card key={i} className="glass-card border-white/5 bg-white/2">
                           <CardContent className="p-6 space-y-4">
                              <div className="space-y-1">
                                 <h4 className="text-sm font-headline font-bold text-white uppercase">{p.title}</h4>
                                 <p className="text-[10px] text-muted-foreground">{p.desc}</p>
                              </div>
                              <div className="pt-2 flex justify-between items-end border-t border-white/5">
                                 <span className="text-[8px] text-muted-foreground uppercase font-bold">Status</span>
                                 <span className={`text-xs font-headline font-bold ${p.color}`}>{p.status}</span>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[600px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Activity className="size-4 text-primary" />
                    Cognitive Cohesion Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {impactFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
                          <div className="size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(0,150,255,0.5)]" />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-amber-500">The Autonomy Policy</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Sovereign Grid Autonomy (P54) ensures that our empire is immune to regional banking rail collapse. We are immortal."
                    </p>
                    <Badge className="w-full justify-center bg-amber-500/20 text-amber-500 border-none uppercase text-[8px] font-bold">Status: GLOBAL_AUTONOMY</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
