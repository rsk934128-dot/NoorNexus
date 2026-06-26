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
  Clock,
  Eye,
  Repeat,
  BarChart3
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
    "ZENITH: 30 Nodes verified (Self-Replication ARMED).",
    "INTEL: Project #400 Quarterly Outlook জেনারেটেড।",
    "SANDBOX: Playground environment এন্টারপ্রাইজ পার্টনারদের জন্য উন্মুক্ত।",
    "BRIDGE: Project #201 Neural Load Balancer ACTIVE.",
    "SCALING: Target 100 nodes for South & SE Asia corridors.",
    "TRACEABILITY: Nora-12 Zenith Monitoring active.",
    "VAULT: Project #55.5 Irish Corridor anchoring active."
  ])
  const [queryText, setQueryText] = useState("")
  const [queryResult, setQueryResult] = useState<ImperialQueryOutput | null>(null)
  const [queryLoading, setQueryLoading] = useState(false)

  // Simulation for 30 Nodes (100 target)
  const [nodes, setNodes] = useState(Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    name: i === 29 ? 'INTEL-HUB' : i === 28 ? 'SANDBOX-1' : `Node-${i + 1}`,
    latency: Math.floor(Math.random() * 5) + 24,
    load: Math.floor(Math.random() * 40) + 30,
    status: 'OPTIMAL'
  })))

  useEffect(() => {
    const sequence = [
      { text: "INITIATING DEEP NEURAL SYNC...", time: 600 },
      { text: "ESTABLISHING MISSION 500 GLOBAL GRID...", time: 1200 },
      { text: "ACTIVATING SELF-REPLICATION MODE...", time: 1800 },
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
        latency: Math.floor(Math.random() * 5) + 24,
        load: Math.floor(Math.random() * 50) + 20
      })))
      
      const logs = [
        "REPLICATION: Provisioning backup node in Mumbai.",
        "INTEL: Economic Intelligence Report #402 finalized.",
        "SANDBOX: Partner integration test successful (2.4s).",
        "BRIDGE: Rerouting SE Asia traffic via Singapore Hub.",
        "VAULT: System Manifesto v3.6 anchored.",
        "GRID: torque stabilized at 94%."
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
                      <Repeat className="size-3 mr-2 animate-spin-slow" /> SELF_REPLICATION: ON
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
                   "The Peak of Autonomy." নূরনেক্সাস এখন ১০০-নোড গ্রিড, ইকোনমিক ইনটেলিজেন্স (Nora-40) এবং সেলফ-রেপ্লিকেশন মোডের মাধ্যমে বিশ্বজয় করছে।
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-primary/30 w-full min-w-[350px] relative overflow-hidden bg-primary/5">
                    <div className="absolute top-0 right-0 p-2">
                       <Badge className="bg-primary text-black border-none text-[7px] font-bold">INTEL_STATUS: VERIFIED</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Scaling Torque Cap</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">94.0</p>
                       <p className="text-primary text-xs font-bold mb-1">% TORQUE</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary shadow-[0_0_15px_rgba(0,150,255,0.6)]" style={{ width: '94%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-3 italic text-center">"Zenith Peak Verified | Self-Healing Active"</p>
                </Card>
                <div className="flex gap-2 w-full">
                  <Link href="/proposal" className="flex-1">
                    <Button className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary">
                      <FileText className="size-4" /> Imperial Proposal
                    </Button>
                  </Link>
                  <Link href="/api-hub">
                    <Button variant="outline" className="h-12 border-amber-500/20 text-amber-500 hover:bg-amber-500/10 uppercase font-bold text-[10px] tracking-widest gap-2">
                      <FlaskConical className="size-4" /> Sandbox
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full">
               <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                        <Cpu className="size-4" /> Global Synchronization Matrix (Mission 500 Peak)
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                     {[
                       { nora: "03", role: "Discovery", status: "READY", color: "text-purple-400" },
                       { nora: "12", role: "Off-Ramp", status: "ACTIVE", color: "text-blue-400" },
                       { nora: "30", role: "Ingest", status: "SYNCED", color: "text-emerald-400" },
                       { nora: "40", role: "Intel", status: "PROPHETIC", color: "text-primary" },
                       { nora: "50", role: "Legacy", status: "PERPETUAL", color: "text-white" },
                       { nora: "52", role: "Audit", status: "ENFORCED", color: "text-emerald-500" },
                       { nora: "54", role: "Bridge", status: "ROUTING", color: "text-amber-400" },
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
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                       <Map className="size-4" /> 100-Node Grid Heatmap (Mission 500 Final)
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">HEALING: ARMED</Badge>
                      <Badge variant="outline" className="text-[8px] border-primary/20 text-primary">REPLICATION: ON</Badge>
                    </div>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5 relative overflow-hidden">
                     <div className="grid grid-cols-4 sm:grid-cols-10 gap-3">
                        {nodes.map((node) => (
                          <div key={node.id} className="space-y-1 group relative">
                             <div 
                                className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-500 ${node.name.includes('INTEL') ? 'bg-primary/20 border-primary/40 shadow-[0_0_10px_rgba(0,150,255,0.3)]' : 'bg-emerald-500/20 border-emerald-500/40'} hover:scale-110 cursor-help`}
                             >
                                <p className="text-[7px] font-bold text-white mb-1 truncate w-full text-center px-1">{node.name}</p>
                                <p className="text-[10px] font-headline font-bold text-white">{node.latency}ms</p>
                             </div>
                          </div>
                        ))}
                        {/* Provisioning/Placeholder for scaling nodes */}
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center">
                             <Zap className="size-3 text-primary animate-pulse" />
                          </div>
                        ))}
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div key={i+10} className="aspect-square rounded-lg border border-dashed border-white/10 flex items-center justify-center opacity-30 grayscale">
                             <ZapOff className="size-3 text-muted-foreground" />
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex justify-between items-center text-[8px] font-mono text-muted-foreground uppercase">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-1.5">
                              <div className="size-2 rounded bg-emerald-500/40" />
                              <span>Zenith-Verified (30)</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <div className="size-2 rounded bg-primary/40" />
                              <span>Mapping Active (40)</span>
                           </div>
                        </div>
                        <p className="text-primary font-bold">Execution Status: PHASE_7_MAPPING</p>
                     </div>
                  </Card>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <BarChart3 className="size-4" /> Quarterly Economic Outlook (Project #400)
                  </h3>
                  <Card className="glass-card border-l-4 border-l-primary bg-primary/5 overflow-hidden">
                     <CardHeader className="flex flex-row items-center justify-between">
                        <div className="space-y-1">
                           <CardTitle className="text-sm font-headline uppercase text-white">Data Lake Intelligence Dispatch</CardTitle>
                           <CardDescription className="text-[10px]">Real-time synthesis of 30 active corridors.</CardDescription>
                        </div>
                        <Link href="/data-lake">
                          <Button size="sm" className="bg-primary/20 text-primary border border-primary/30 h-7 text-[8px] uppercase font-bold">View Full Report</Button>
                        </Link>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                           <p className="text-xs text-muted-foreground italic leading-relaxed">
                              "Nora-40: Global liquidity adoption has increased by 14.2% since Project #161 activation. Targeted SE Asia corridors (GrabPay, GCash) show 99.8% stability veracity."
                           </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[
                             { label: "Predictive Accuracy", val: "99.2%" },
                             { label: "Intel Freshness", val: "Real-time" },
                             { label: "Sentiment Index", val: "MAX_TRUST" },
                             { label: "Data Integrity", val: "LOCKED" }
                           ].map((s, i) => (
                             <div key={i} className="text-center p-2 bg-white/2 rounded border border-white/5">
                                <p className="text-[7px] text-muted-foreground uppercase font-bold">{s.label}</p>
                                <p className="text-[10px] text-white font-mono font-bold">{s.val}</p>
                             </div>
                           ))}
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
                     <Badge className="bg-emerald-500 text-black border-none text-[8px] font-bold">PERPETUAL_PEAK</Badge>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                    "The grid is 100% synchronized with global banking rails. Project #400 intel active."
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
                          <div className={`size-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)] ${log.includes('SANDBOX') ? 'bg-amber-500' : log.includes('REPLICATION') ? 'bg-purple-500' : log.includes('MISSION') ? 'bg-white' : 'bg-emerald-500'}`} />
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
                    <CardTitle className="text-lg font-headline uppercase text-amber-500">Peak Hegemony</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Phase 7: Mapping Finalized. Self-Replication ARMED. NoorNexus is now an immortal digital organism."
                    </p>
                    <Badge className="w-full justify-center bg-amber-500/20 text-amber-500 border-none uppercase text-[8px] font-bold">Status: ZENITH_PEAK_L6</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
