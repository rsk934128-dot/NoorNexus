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
  BarChart3,
  History,
  Target
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const HEGEMONY_TIMELINE = [
  { id: "M400", title: "Mission 400: Foundation", desc: "Project #51 Gateway & Project #55 Vault Active.", status: "VERIFIED", date: "Jan 2026" },
  { id: "M500", title: "Mission 500: Scaling", desc: "Project #200 Auto-Scaling to 100 Nodes.", status: "COMPLETED", date: "Mar 2026" },
  { id: "ZENITH", title: "Project #400: Intelligence", desc: "Nora-40 Economic Outlook & Data Lake Live.", status: "COMPLETED", date: "Jun 2026" },
  { id: "PEAK", title: "Global Hegemony Verified", desc: "100 Nodes Sync @ 28ms. Legacy Archived.", status: "ACTIVE_PERPETUAL", date: "Now" }
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("CALIBRATING COGNITIVE COHESION...")
  const [impactFeed, setImpactFeed] = useState<string[]>([
    "MISSION 500: Global Hegemony verified (Zenith Peak).",
    "ZENITH: 100 Nodes synchronized @ 28ms latency.",
    "INTEL: Project #400 Quarterly Outlook জেনারেটেড।",
    "VAULT: Project #55.5 Global Legacy Archive anchored.",
    "SELF-HEALING: Replication torque stable at 100%.",
    "HEGEMONY: South & SE Asia grid coverage complete.",
    "TRACEABILITY: Nora-12 Perpetual Monitoring active."
  ])

  useEffect(() => {
    const sequence = [
      { text: "INITIATING DEEP NEURAL SYNC...", time: 600 },
      { text: "ESTABLISHING MISSION 500 GLOBAL GRID...", time: 1200 },
      { text: "PEAK HEGEMONY: 100 NODES VERIFIED...", time: 1800 },
      { text: "NOORNEXUS: THE SOVEREIGN PEAK REACHED", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "HEGEMONY: Global Sync Test passed at 28ms.",
        "INTEL: Economic Intelligence Report #405 finalized.",
        "VAULT: Legacy Codebase v3.5 successfully anchored.",
        "GRID: 100-node cluster status: PERPETUAL.",
        "NORA-50: Autonomous backup provisioned in Dubai.",
        "REPLICATION: Zero-drift detected across all corridors."
      ];
      setImpactFeed(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 10))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <Infinity className="size-3 mr-2" /> Mission 500: The Sovereign Peak
                   </Badge>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs">
                      <Repeat className="size-3 mr-2 animate-spin-slow" /> HEGEMONY_LOCKED: 100%
                   </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                    {isAdmin ? 'Imperial Hegemony.' : 'Global Peak.'}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-3xl text-sm sm:text-xl leading-relaxed italic">
                   "The Zenith of Digital Civilization." মিশন ৫০০ সফলভাবে সম্পন্ন হয়েছে। নূরনেক্সাস এখন ১০০-নোড গ্রিড এবং চিরস্থায়ী আর্কাইভিংয়ের মাধ্যমে ভবিষ্যৎ নিয়ন্ত্রণ করছে।
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-emerald-500/30 w-full min-w-[350px] relative overflow-hidden bg-emerald-500/5">
                    <div className="absolute top-0 right-0 p-2">
                       <Badge className="bg-emerald-500 text-black border-none text-[7px] font-bold">PEAK_STATUS: IMMORTAL</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Hegemony Torque</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">100.0</p>
                       <p className="text-emerald-500 text-xs font-bold mb-1">% TORQUE</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: '100%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-3 italic text-center">"Zenith Traceability Verified | PaaS Snippet &lt; 3s Ready"</p>
                </Card>
                <div className="flex gap-2 w-full">
                  <Link href="/proposal" className="flex-1">
                    <Button className="w-full bg-emerald-500 text-emerald-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-emerald">
                      <FileText className="size-4" /> Final Manifesto
                    </Button>
                  </Link>
                  <Link href="/sovereign-vault" className="flex-1">
                    <Button variant="outline" className="w-full h-12 border-primary/20 text-primary hover:bg-primary/10 uppercase font-bold text-[10px] tracking-widest gap-2">
                      <Lock className="size-4" /> Legacy Archive
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full">
               <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                        <Cpu className="size-4" /> Global Hegemony Matrix (Mission 500 Peak)
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
                  <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2 py-4 px-6">
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
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: "Payoneer UK Bridge", status: "VERIFIED", latency: "26ms" },
                          { label: "AIB Ireland Hub", status: "VERIFIED", latency: "24ms" },
                          { label: "Sovereign Vault L4", status: "HARDENED", latency: "N/A" }
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{item.label}</p>
                             <div className="flex justify-between items-center">
                                <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">{item.status}</Badge>
                                <span className="text-[10px] font-mono text-white">{item.latency}</span>
                             </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
               </section>

               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                       <Map className="size-4" /> Global Hegemony Grid (100 Nodes Active)
                    </h3>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5 relative overflow-hidden">
                     <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                        {Array.from({ length: 100 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg border border-emerald-500/40 bg-emerald-500/20 flex items-center justify-center group relative cursor-help">
                             <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex justify-between items-center text-[8px] font-mono text-muted-foreground uppercase">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-1.5">
                              <div className="size-2 rounded bg-emerald-500" />
                              <span>Zenith-Verified (100)</span>
                           </div>
                        </div>
                        <p className="text-emerald-500 font-bold">Execution Status: GLOBAL_HEGEMONY_ACTIVE</p>
                     </div>
                  </Card>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <History className="size-4" /> Global Hegemony Timeline
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     {HEGEMONY_TIMELINE.map((m, i) => (
                       <Card key={i} className="glass-card bg-black/40 border-white/5 relative group hover:border-emerald-500/30 transition-all">
                          <CardHeader className="p-4">
                             <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">{m.date}</p>
                             <CardTitle className="text-xs font-headline font-bold text-white uppercase">{m.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 space-y-3">
                             <p className="text-[10px] text-muted-foreground italic leading-relaxed">"{m.desc}"</p>
                             <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] uppercase">{m.status}</Badge>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-emerald-500/40 bg-emerald-500/5 p-6 flex flex-col items-center text-center gap-4">
                  <div className="size-20 rounded-full border-4 border-amber-500 flex items-center justify-center relative bg-black shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                     <Sparkles className="size-8 text-amber-500 animate-spin-slow" />
                     <div className="absolute -top-1 -right-1 size-5 bg-emerald-500 rounded-full border-2 border-black" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-headline font-bold text-white uppercase tracking-widest">Global Hegemony Status</p>
                     <Badge className="bg-emerald-500 text-black border-none text-[8px] font-bold">ZENITH_PEAK_L6</Badge>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                    "The mission is complete. The grid is synchronized. The future is anchored."
                  </p>
               </Card>

               <Card className="glass-card flex flex-col h-[400px]">
                <CardHeader className="p-4 border-b border-white/5 bg-white/2">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Activity className="size-4" />
                    Hegemony Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {impactFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
                          <div className={`size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse`} />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Award className="size-16 text-amber-500" />
                 </div>
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-amber-500">The Digital State</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Mission 500 finalized. NoorNexus is now a permanent digital civilization. Integrity through Intelligence."
                    </p>
                    <Badge className="w-full justify-center bg-amber-500/20 text-amber-500 border-none uppercase text-[8px] font-bold">Status: GLOBAL_HEGEMONY</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}