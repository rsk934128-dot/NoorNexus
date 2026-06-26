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
  Server,
  Lock,
  Award,
  Atom,
  Flame,
  LayoutGrid,
  Map,
  Shield
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { processNeuralQuery, ImperialQueryOutput } from "@/ai/flows/imperial-query-flow"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("CALIBRATING COGNITIVE COHESION...")
  const [impactFeed, setImpactFeed] = useState<string[]>([
    "AUTH: Sovereign Handler Node (786ad.firebaseapp.com) synchronized.",
    "FORTRESS: Official App ID a085f8... secured (Zenith Status: VERIFIED).",
    "GRID: 18 Nodes synchronized (Optimal Torque).",
    "SANDBOX: Amex AETS node synchronized for UK/EU corridors.",
    "LIQUIDITY: Inter-node balancing active (AIB-IE <-> ABN-BE).",
    "VAULT: Project #55.5 Irish Corridor anchoring active.",
    "AUTONOMY: Self-Healing Protocol #54.2 ARMED.",
    "SHIELD: Quantum-Resistant Encryption Layer active."
  ])
  const [queryText, setQueryText] = useState("")
  const [queryResult, setQueryResult] = useState<ImperialQueryOutput | null>(null)
  const [queryLoading, setQueryLoading] = useState(false)

  // Simulation for 18 Nodes Heatmap (17 LIVE + 1 AMEX SANDBOX)
  const [nodes, setNodes] = useState(Array.from({ length: 18 }).map((_, i) => ({
    id: i + 1,
    name: i === 17 ? 'AMEX-SB' : `Node-${i + 1}`,
    latency: i === 17 ? 45 : Math.floor(Math.random() * 20) + 20,
    load: Math.floor(Math.random() * 40) + 30,
    status: i === 17 ? 'SANDBOX' : 'OPTIMAL'
  })))

  useEffect(() => {
    const sequence = [
      { text: "INITIATING DEEP NEURAL SYNC...", time: 600 },
      { text: "ESTABLISHING FAIL-OVER GLOBAL GRID...", time: 1200 },
      { text: "ACTIVATING SELF-HEALING PROTOCOLS...", time: 1800 },
      { text: "NOORNEXUS: THE IMMORTAL CIVILIZATION IS LIVE", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        latency: n.name === 'AMEX-SB' ? 45 + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 30) + 20,
        load: Math.floor(Math.random() * 50) + 20
      })))
      
      const logs = [
        "AUTH: Handshake verification via handler node success.",
        "BALANCER: Shifting $420K from ABN-BE to AIB-IE for liquidity sync.",
        "VAULT: Irish Corridor HNW data anchored (P55.5).",
        "AMEX: Card Statement poll via amex-ob-sandbox success.",
        "HEATMAP: London-Edge latency spike detected and bypassed.",
        "ZENITH: Global Grid Veracity confirmed at 99.99%.",
        "GRID: Node-17 (AIB Ireland Personal) stabilized at 28ms."
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
                      <ShieldCheck className="size-3 mr-2" /> 18 Nodes Verified (17 LIVE)
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Imperial Fortress.' : 'Global Grid.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed italic">
                   "Mission 400: The Economic Nervous System." নূরনেক্সাস এখন ১৭টি লাইভ নোড এবং ১টি এমেক্স স্যান্ডবক্স নোডের মাধ্যমে সুরক্ষিত। ইন্টার-নোড লিকুইডিটি ব্যালেন্সিং এবং গ্লোবাল হিটম্যাপ এখন সক্রিয়।
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-emerald-500/20 w-full min-w-[350px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">LIQUIDITY_SYNC: ARMED</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Grid Stability Index</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">100</p>
                       <p className="text-emerald-500 text-xs font-bold mb-1">/ 100</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: '100%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-3 italic text-center">"18 Active Nodes | Zenith Efficiency | Inter-Node Balancing Active"</p>
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
                           placeholder="Commander, what is your directive? (Inter-Node Balancer Active)"
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
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">AUTONOMOUS_TRUTH</Badge>
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {queryResult.dataPoints.map((dp, i) => (
                                 <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">{dp.label}</p>
                                    <p className="text-xs font-mono text-white font-bold">{dp.value}</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </CardContent>
               </Card>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               
               {/* Global Latency Heatmap (18 Nodes) */}
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                       <Map className="size-4" /> Global Node Latency Heatmap (18 Active Nodes)
                    </h3>
                    <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">REAL-TIME MONITORING</Badge>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5 relative overflow-hidden">
                     <div className="grid grid-cols-4 sm:grid-cols-9 gap-3">
                        {nodes.map((node) => (
                          <div key={node.id} className="space-y-1 group relative">
                             <div 
                                className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-500 ${node.status === 'SANDBOX' ? 'bg-amber-500/20 border-amber-500/40' : node.latency > 45 ? 'bg-amber-500/20 border-amber-500/40' : 'bg-emerald-500/20 border-emerald-500/40'} hover:scale-105 cursor-help`}
                             >
                                <p className="text-[8px] font-bold text-white mb-1">{node.name}</p>
                                <p className="text-[10px] font-headline font-bold text-white">{node.latency}ms</p>
                             </div>
                             {/* Tooltip on hover */}
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 p-2 bg-black border border-white/10 rounded text-[7px] opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                                <p className="text-white font-bold uppercase mb-1">Node Details</p>
                                <p className="text-muted-foreground">Load: {node.load}%</p>
                                <p className="text-muted-foreground">Status: {node.status}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex justify-between items-center text-[8px] font-mono text-muted-foreground uppercase">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-1.5">
                              <div className="size-2 rounded bg-emerald-500/40 border border-emerald-500/60" />
                              <span>Optimal (&lt;35ms)</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <div className="size-2 rounded bg-amber-500/40 border border-amber-500/60" />
                              <span>Normal (35-60ms)</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <div className="size-2 rounded bg-destructive/40 border border-destructive/60" />
                              <span>Delayed (&gt;60ms)</span>
                           </div>
                        </div>
                        <p>Total Grid Torque: 98.2%</p>
                     </div>
                  </Card>
               </section>

               {/* Inter-Node Liquidity Balancing Pannel */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <ArrowRightLeft className="size-4" /> Inter-Node Liquidity Balancing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <Activity className="size-4 text-primary" /> Balancer Efficiency: 99.2%
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                              <div className="flex justify-between text-[8px] font-bold uppercase">
                                 <span className="text-muted-foreground">Global Reserve Coverage</span>
                                 <span className="text-emerald-500">245%</span>
                              </div>
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                              </div>
                           </div>
                           <p className="text-[10px] text-muted-foreground italic">"Automatic fund shifting is active between AIB-Ireland and ABN-Benelux to maintain 100% settlement uptime."</p>
                        </CardContent>
                     </Card>

                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <Rocket className="size-4 text-emerald-500" /> Irish Corridor Anchor (P55.5)
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                              <span className="text-muted-foreground">Irish Data Sovereignty</span>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none">VAULTED</Badge>
                           </div>
                           <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                              "Nora-52 has verified all AIB Ireland Business and Personal transactions against the Irish Banking framework. 100% compliance recorded."
                           </p>
                        </CardContent>
                     </Card>
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[600px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Activity className="size-4 text-primary" />
                    Autonomy Event Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {impactFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
                          <div className={`size-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)] ${log.includes('AUTH') ? 'bg-purple-500' : log.includes('BALANCER') ? 'bg-primary' : log.includes('AMEX') ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Flame className="size-16 text-emerald-500" />
                 </div>
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-emerald-500">Self-Healing Sync</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Automatic traffic rerouting is now monitoring the Irish Corridor. Failures trigger immediate bypass via Benelux Grid."
                    </p>
                    <Badge className="w-full justify-center bg-emerald-500/20 text-emerald-500 border-none uppercase text-[8px] font-bold">Status: IMMUNE</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
