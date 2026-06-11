
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Globe, 
  Cpu, 
  Activity, 
  Landmark, 
  Radar, 
  Terminal, 
  Menu, 
  FileText, 
  Loader2, 
  Server, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  RefreshCcw, 
  LayoutGrid, 
  Star, 
  TrendingUp, 
  HeartPulse, 
  BrainCircuit, 
  Compass, 
  Gavel, 
  Scale, 
  Fingerprint, 
  Link as LinkIcon, 
  Building2, 
  Code2, 
  Rocket,
  CheckCircle2, 
  Waves, 
  Eye, 
  Target, 
  Quote, 
  Radio, 
  BellRing, 
  Send, 
  Languages,
  Coins, 
  Briefcase, 
  BarChart3, 
  Clock, 
  Users, 
  ShieldAlert, 
  Key, 
  Sparkles, 
  Banknote, 
  History, 
  Heart, 
  Share2,
  UserCircle,
  ExternalLink,
  ShieldHalf,
  Database,
  Search,
  Box,
  Award,
  ArrowUpRight,
  TrendingDown,
  ChevronRight,
  DollarSign,
  UserCheck
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser } from "@/firebase"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SovereignLogo } from "@/components/sovereign-logo"
import { getDailyImperialSummary, type DailySummary } from "@/services/nexus-bridge"
import { ScrollArea } from "@/components/ui/scroll-area"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const FOUNDER_SCORECARD = [
  { label: "Paying Partners", value: "1", target: "10", icon: Building2, color: "text-primary" },
  { label: "Monthly Revenue (MRR)", value: "$4.2K", target: "$10K", icon: DollarSign, color: "text-emerald-500" },
  { label: "Trust Velocity", value: "+14.2%", target: "Positive", icon: TrendingUp, color: "text-blue-500" },
  { label: "Pilot Conversion", value: "33%", target: ">50%", icon: Zap, color: "text-amber-500" },
  { label: "Institutional Retention", value: "100%", target: ">90%", icon: UserCheck, color: "text-purple-500" },
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING EXECUTION GATEWAY...")
  const [fetchingSummary, setFetchingSummary] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null)
  const [borderFeed, setBorderFeed] = useState<string[]>([])

  useEffect(() => {
    const sequence = [
      { text: "STABILIZING EXECUTION CORE...", time: 600 },
      { text: "VALIDATING REVENUE MODELS...", time: 1200 },
      { text: "ACTIVATING FOUNDER OS...", time: 1800 },
      { text: "SYNCING PILOT SUCCESS NODES...", time: 2400 },
      { text: "NOORNEXUS: PRODUCT-MARKET FIT READY", time: 3000 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "REVENUE: $1.2k Transaction Fee Verified", 
        "PILOT: University Mesh Activation 85%", 
        "TRUST: Velocity Increase +12%", 
        "MARKET: New Fintech Lead in Pipeline",
        "WEDGE: Governance Module Dependency Confirmed",
        "CONVERSION: Lead conversion process initiated"
      ]
      setBorderFeed(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 10))
    }, 3000)

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
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs">
                      <Zap className="size-3 mr-2" /> Phase ΩΩΩΩ: PMF & Value
                   </Badge>
                   <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5 text-xs">
                      <Target className="size-3 mr-2" /> Wedge: Governance + Audit
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Founder Scorecard.' : 'Institutional Value.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed">
                   "NoorNexus is solving the core institutional pains of accountability and audit. We are moving from Architecture to Dependence."
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-primary/20 w-full min-w-[320px]">
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Institutional Progress</p>
                       <Badge className="bg-primary/20 text-primary border-none text-[8px]">1/10 PARTNERS</Badge>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary glow-primary" style={{ width: '10%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-2 italic text-center">"Proof of Dependence: 1 Institution secured."</p>
                </Card>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               {isAdmin && (
                 <section className="space-y-6">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <Star className="size-4" /> The Founder Scorecard (PMF Metrics)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                       {FOUNDER_SCORECARD.map((kpi, i) => (
                         <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-primary/20 transition-all">
                            <CardContent className="p-4 space-y-3">
                               <div className={`p-2 rounded-lg bg-white/5 w-fit ${kpi.color}`}>
                                  <kpi.icon className="size-4" />
                               </div>
                               <div className="space-y-0.5">
                                  <p className="text-[9px] font-bold text-muted-foreground uppercase">{kpi.label}</p>
                                  <p className="text-xl font-headline font-bold text-white">{kpi.value}</p>
                                  <p className="text-[8px] text-muted-foreground font-mono">Target: {kpi.target}</p>
                               </div>
                            </CardContent>
                         </Card>
                       ))}
                    </div>
                 </section>
               )}

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <Target className="size-4" /> Wedge Strategy: Governance & Audit
                       </CardTitle>
                       <CardDescription className="text-xs italic">"Solving the decision-tracking pain for institutions."</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {[
                         { step: "Problem", desc: "No audit trail for high-stakes decisions." },
                         { step: "Solution", desc: "NoorNexus Verifiable Governance Engine." },
                         { step: "Outcome", desc: "100% accountability for institutional acts." }
                       ].map((s, i) => (
                         <div key={i} className="flex gap-4 items-start">
                            <Badge variant="outline" className="text-[8px] border-primary/20 text-primary h-5 w-16 justify-center shrink-0 uppercase">{s.step}</Badge>
                            <p className="text-[10px] text-white font-medium">{s.desc}</p>
                         </div>
                       ))}
                       <Button variant="ghost" className="w-full h-8 text-[9px] uppercase font-bold border border-white/5 mt-2">
                          View Wedge Performance <ChevronRight className="size-3 ml-1" />
                       </Button>
                    </CardContent>
                 </Card>

                 <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <BarChart3 className="size-4" /> Economic Proof (Revenue streams)
                       </CardTitle>
                       <CardDescription className="text-xs italic">"Verifying if institutions are willing to pay."</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Subscription</p>
                             <p className="text-lg font-headline font-bold text-white">$1.2k</p>
                          </div>
                          <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Certifications</p>
                             <p className="text-lg font-headline font-bold text-white">$2.6k</p>
                          </div>
                       </div>
                       <p className="text-[10px] text-muted-foreground italic text-center">
                          "Revenue is the ultimate validator of institutional trust."
                       </p>
                    </CardContent>
                 </Card>
               </div>

               <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <ShieldCheck className="size-4" /> The 3 Proofs: Success Verification
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: "Technical Proof", status: "VERIFIED", desc: "Core Governance Engine is operational across 12 nodes.", color: "text-blue-500" },
                      { title: "Economic Proof", status: "IN_PROGRESS", desc: "First paying partner successfully onboarded.", color: "text-emerald-500" },
                      { title: "Institutional Proof", status: "PENDING", desc: "Critical dependency of 3+ institutions on the stack.", color: "text-amber-500" }
                    ].map((p, i) => (
                      <Card key={i} className="glass-card border-white/5 group overflow-hidden">
                        <CardHeader className="pb-2">
                           <div className="flex justify-between items-center">
                              <CardTitle className="text-[10px] uppercase font-bold text-white">{p.title}</CardTitle>
                              <Badge variant="outline" className={`text-[7px] border-white/10 ${p.status === 'VERIFIED' ? 'text-emerald-500' : p.status === 'PENDING' ? 'text-muted-foreground' : 'text-amber-500'}`}>{p.status}</Badge>
                           </div>
                        </CardHeader>
                        <CardContent>
                           <p className="text-[9px] text-muted-foreground leading-relaxed italic">{p.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[500px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <History className="size-4 text-primary" />
                    Execution Stream
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {borderFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3">
                          <div className="size-1.5 bg-primary rounded-full animate-pulse" />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-emerald-500">PMF Status</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Product-Market Fit starts the day an institution cannot function without your system."
                    </p>
                    <Badge className="w-full justify-center bg-emerald-500/20 text-emerald-500 border-none uppercase text-[8px] font-bold">PMF Index: 42% Validated</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
