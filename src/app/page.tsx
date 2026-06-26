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
  CheckCircle2, 
  BrainCircuit,
  HeartPulse,
  Database,
  Cpu,
  ArrowRight,
  Network,
  Infinity,
  ArrowRightLeft,
  Server,
  Award,
  Atom,
  Flame,
  Map,
  FileCheck,
  RefreshCcw,
  Sparkles,
  Lock,
  Search,
  Radio,
  Fingerprint,
  TrendingUp,
  Landmark,
  FileText,
  Rocket,
  ShieldPlus,
  Compass,
  FileSearch,
  Check,
  Waves,
  ZapOff,
  Clock
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { processNeuralQuery, ImperialQueryOutput } from "@/ai/flows/imperial-query-flow"
import Link from "next/link"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("CALIBRATING COGNITIVE COHESION...")
  const [impactFeed, setImpactFeed] = useState<string[]>([
    "MISSION 500: Global Hegemony protocol initiated.",
    "ZENITH: 20 Nodes verified (Optimal Torque).",
    "SNIPPET: PaaS integration optimized for &lt; 3s load time.",
    "FLOW: Project #56 Predictive Orchestrator ARMED.",
    "TRACEABILITY: Nora-12 Zenith Monitoring active for Off-Ramp.",
    "LIQUIDITY: Inter-node balancing active (AIB-IE <-> ABN-BE).",
    "VAULT: Project #55.5 Irish Corridor anchoring active.",
    "AUTONOMY: Self-Healing Protocol #54.2 ARMED.",
    "SHIELD: Quantum-Resistant Encryption Layer active."
  ])
  const [queryText, setQueryText] = useState("")
  const [queryResult, setQueryResult] = useState<ImperialQueryOutput | null>(null)
  const [queryLoading, setQueryLoading] = useState(false)

  // Simulation for 20 Nodes Heatmap (Growing to 100)
  const [nodes, setNodes] = useState(Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: i === 19 ? 'PAYONEER' : i === 18 ? 'PAYPAL-EU' : i === 17 ? 'AMEX-SB' : i === 16 ? 'AIB-BUS' : `Node-${i + 1}`,
    latency: i === 19 ? 26 : i === 18 ? 32 : i === 17 ? 45 : Math.floor(Math.random() * 10) + 24,
    load: Math.floor(Math.random() * 40) + 30,
    status: i === 17 ? 'SANDBOX' : 'OPTIMAL'
  })))

  useEffect(() => {
    const sequence = [
      { text: "INITIATING DEEP NEURAL SYNC...", time: 600 },
      { text: "ESTABLISHING MISSION 500 GLOBAL GRID...", time: 1200 },
      { text: "ACTIVATING ZENITH TRACEABILITY...", time: 1800 },
      { text: "NOORNEXUS: MISSION 500 IS ZENITH_ACTIVE", time: 2400 },
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
        latency: n.name === 'PAYONEER' ? 26 + Math.floor(Math.random() * 2) : Math.floor(Math.random() * 5) + 24,
        load: Math.floor(Math.random() * 50) + 20
      })))
      
      const logs = [
        "PAYONEER: 26ms Veracity pulse confirmed.",
        "FLOW: Project #56 predicting high UK liquidity demand.",
        "ZENITH: Off-Ramp traceability locked at 28ms.",
        "SNIPPET: External app handshake verified in 2.8s.",
        "HEGEMONY: Planning Node-21 for Singapore expansion.",
        "VAULT: System Manifesto v3.5 anchored successfully (P55).",
        "GRID: 20-Node cluster stabilized at 100% torque."
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
                      <Infinity className="size-3 mr-2" /> Mission 500: Global Hegemony
                   </Badge>
                   <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5 text-xs">
                      <Sparkles className="size-3 mr-2" /> ZENITH_ACTIVE
                   </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                    {isAdmin ? 'Imperial Fortress.' : 'Global Mesh.'}
                  </h2>
                  <div className="hidden sm:flex flex-col items-center justify-center p-1 bg-amber-500/20 rounded-full border border-amber-500/40 glow-emerald animate-pulse-slow">
                    <div className="size-14 rounded-full border-4 border-amber-500 flex items-center justify-center relative bg-black">
                       <Sparkles className="size-6 text-amber-500 animate-spin-slow" />
                       <div className="absolute -top-1 -right-1 size-4 bg-emerald-500 rounded-full border-2 border-black" />
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed italic">
                   "Project Zenith: Global Enterprise Scaling." নূরনেক্সাস এখন ২০টি সক্রিয় নোড এবং ডিসকভারি প্রোটোকল-এর মাধ্যমে বিশ্বজয়ের জন্য প্রস্তুত। মিশন ৫০০-এর লক্ষ্য ১০০-নোড অটোনোমাস গ্রিড।
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-primary/30 w-full min-w-[350px] relative overflow-hidden bg-primary/5">
                    <div className="absolute top-0 right-0 p-2">
                       <Badge className="bg-primary text-black border-none text-[7px] font-bold">MISSION 500: PHASE L1</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Hegemony Readiness</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">98.4</p>
                       <p className="text-primary text-xs font-bold mb-1">% READY</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary shadow-[0_0_15px_rgba(0,150,255,0.6)]" style={{ width: '98.4%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-3 italic text-center">"Zenith Traceability Verified | PaaS Snippet &lt; 3s Ready"</p>
                </Card>
                <Link href="/proposal" className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary">
                    <FileText className="size-4" /> Imperial Manifesto v3.5
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full">
               <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                        <Cpu className="size-4" /> Global Synchronization Matrix (Nora-AI Suite)
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                     {[
                       { nora: "03", role: "Discovery", status: "SYNCED", color: "text-purple-400" },
                       { nora: "12", role: "Off-Ramp", status: "ACTIVE", color: "text-blue-400" },
                       { nora: "50", role: "Legacy", status: "PERPETUAL", color: "text-primary" },
                       { nora: "52", role: "Audit", status: "ENFORCED", color: "text-emerald-400" },
                       { nora: "54", role: "Autonomy", status: "ARMED", color: "text-amber-400" },
                       { nora: "55", role: "Vault", status: "ANCHORED", color: "text-white" },
                       { nora: "56", role: "Flow", status: "PREDICTIVE", color: "text-amber-500" }
                     ].map((ai, i) => (
                       <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5 text-center space-y-1 group hover:border-emerald-500/30 transition-all">
                          <p className={`text-lg font-headline font-bold ${ai.color}`}>Nora-{ai.nora}</p>
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">{ai.role}</p>
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500 h-4">{ai.status}</Badge>
                       </div>
                     ))}
                  </CardContent>
               </Card>
            </div>

            <div className="w-full">
               <Card className="glass-card border-primary/20 overflow-hidden bg-primary/5">
                  <CardContent className="p-0">
                     <div className="flex items-center gap-4 p-4 border-b border-white/5">
                        <Cpu className="size-6 text-primary animate-pulse" />
                        <input 
                           value={queryText}
                           onChange={e => setQueryText(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && handleNeuralQuery()}
                           placeholder="Commander, what is your Mission 500 directive?"
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
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">MISSION_500_INTELLIGENCE</Badge>
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
               
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                       <Map className="size-4" /> Global Node Latency (Building 100-Node Grid)
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-[8px] border-primary/20 text-primary">SCALING_TORQUE: 94%</Badge>
                      <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">ZENITH_L1</Badge>
                    </div>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5 relative overflow-hidden">
                     <div className="grid grid-cols-4 sm:grid-cols-10 gap-3">
                        {nodes.map((node) => (
                          <div key={node.id} className="space-y-1 group relative">
                             <div 
                                className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-500 ${node.name === 'PAYONEER' ? 'bg-amber-500/20 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : node.name === 'PAYPAL-EU' ? 'bg-primary/20 border-primary/40 shadow-[0_0_10px_rgba(0,150,255,0.3)]' : node.status === 'SANDBOX' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/20 border-emerald-500/40'} hover:scale-110 cursor-help`}
                             >
                                <p className="text-[7px] font-bold text-white mb-1 truncate w-full text-center px-1">{node.name}</p>
                                <p className="text-[10px] font-headline font-bold text-white">{node.latency}ms</p>
                             </div>
                          </div>
                        ))}
                        {/* Placeholder for scaling nodes */}
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg border border-dashed border-white/10 flex items-center justify-center opacity-30 grayscale">
                             <ZapOff className="size-3 text-muted-foreground" />
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex justify-between items-center text-[8px] font-mono text-muted-foreground uppercase">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-1.5">
                              <div className="size-2 rounded bg-emerald-500/40 border border-emerald-500/60" />
                              <span>Optimal (&lt; 30ms)</span>
                           </div>
                           <span>MISSION_500: Target 100 Nodes</span>
                        </div>
                        <p className="text-primary font-bold">Grid Expansion: 20/100</p>
                     </div>
                  </Card>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <ArrowRightLeft className="size-4" /> Inter-Node Liquidity Balancing (Project #56)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <Activity className="size-4 text-primary" /> Balancer Efficiency: 100%
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                              <div className="flex justify-between text-[8px] font-bold uppercase">
                                 <span className="text-muted-foreground">Global Reserve Coverage</span>
                                 <span className="text-emerald-500">268%</span>
                              </div>
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '96%' }} />
                              </div>
                           </div>
                           <p className="text-[10px] text-muted-foreground italic">"Nora-56: Predicting high-volume settlement cycles in the UK/EU corridor. Pre-emptive balancing ARMED."</p>
                        </CardContent>
                     </Card>

                     <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-amber-500 flex items-center gap-2">
                              <Zap className="size-4 text-amber-500" /> Sovereign Flow Prediction
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                              <span className="text-muted-foreground">Shortfall Risk (24h)</span>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none">0.02% LOW</Badge>
                           </div>
                           <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                              "Nora-54: No liquidity threats detected. All 20 corridors are verified with enough capital to withstand +200% volume surge."
                           </p>
                        </CardContent>
                     </Card>
                  </div>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                     <Award className="size-4" /> Global Operational Readiness Report
                  </h3>
                  <Card className="glass-card border-t-4 border-t-emerald-500 bg-emerald-500/5 overflow-hidden">
                     <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-white/5 bg-white/2">
                        <div className="space-y-1">
                           <CardTitle className="text-lg font-headline font-bold text-emerald-500 uppercase flex items-center gap-2">
                              <CheckCircle2 className="size-5" /> Mission 400: Global Handshake Verified
                           </CardTitle>
                           <CardDescription className="text-[10px] text-emerald-100 uppercase tracking-widest">Zenith Status: VERIFIED | Latency: 26ms</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                           <Badge className="bg-emerald-500 text-emerald-foreground font-bold px-4 h-7">26ms STABLE</Badge>
                        </div>
                     </CardHeader>
                     <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                           <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                              <ShieldPlus className="size-3 text-primary" /> Multi-Node Grid
                           </h4>
                           <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Active Nodes</span> <span className="text-white">20 / 100</span></div>
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Grid Torque</span> <span className="text-emerald-500">100%</span></div>
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Sync Status</span> <span className="text-primary font-bold">PERPETUAL</span></div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                              <Flame className="size-3 text-amber-500" /> Sovereign Flow
                           </h4>
                           <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Liquidity Health</span> <span className="text-white">99.8%</span></div>
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Fail-over Mode</span> <span className="text-emerald-500">ARMED</span></div>
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Self-Healing</span> <span className="text-emerald-500 font-bold">OPTIMAL</span></div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                              <Lock className="size-3 text-primary" /> Vault Anchoring
                           </h4>
                           <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Secrets Anchored</span> <span className="text-white">100%</span></div>
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Certificate Vault</span> <span className="text-emerald-500">LIVE</span></div>
                              <div className="flex justify-between text-[10px] font-mono"><span className="text-muted-foreground uppercase">Quantum Shield</span> <span className="text-primary font-bold">ACTIVE</span></div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </section>
            </div>

            <div className="space-y-8">
               {/* THE GOLDEN SYNC STATUS CIRCLE - SIDEBAR DISPLAY */}
               <Card className="glass-card border-amber-500/40 bg-amber-500/5 p-6 flex flex-col items-center text-center gap-4">
                  <div className="size-20 rounded-full border-4 border-amber-500 flex items-center justify-center relative bg-black shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                     <Sparkles className="size-8 text-amber-500 animate-spin-slow" />
                     <div className="absolute -top-1 -right-1 size-5 bg-emerald-500 rounded-full border-2 border-black" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-headline font-bold text-white uppercase tracking-widest">Global Sync Status</p>
                     <Badge className="bg-emerald-500 text-black border-none text-[8px] font-bold">PERPETUAL_ON</Badge>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                    "The grid is 100% synchronized with global banking rails. Project #56 flow active."
                  </p>
               </Card>

               <Card className="glass-card flex flex-col h-[600px]">
                <CardHeader className="p-4 border-b border-white/5 bg-white/2">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Activity className="size-4" />
                    Mission 500 Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {impactFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
                          <div className={`size-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)] ${log.includes('SNIPPET') ? 'bg-purple-500' : log.includes('TRACE') ? 'bg-blue-500' : log.includes('MISSION') ? 'bg-white' : 'bg-emerald-500'}`} />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Sparkles className="size-16 text-amber-500" />
                 </div>
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-amber-500">Hegemony Grid</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Target: 100 Nodes by 2026. Every economic pulse will be recorded on the One Engine Ledger."
                    </p>
                    <Badge className="w-full justify-center bg-amber-500/20 text-amber-500 border-none uppercase text-[8px] font-bold">Status: SCALING_TORQUE_MAX</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
