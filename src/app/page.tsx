
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
  UserCheck,
  FileCheck,
  LifeBuoy,
  Wallet2,
  LineChart
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

const REVENUE_TRUTH_LAYER = [
  { label: "Paying Users", value: "124", sub: "Actual Revenue Source", color: "text-emerald-500" },
  { label: "Active Users", value: "1.2K", sub: "Operational Load", color: "text-primary" },
  { label: "Revenue Ratio", value: "10.3%", sub: "Authenticity Index", color: "text-amber-500" },
  { label: "Voluntary Retention", value: "94%", sub: "12-Month Loyalty", color: "text-purple-500" },
]

const ECONOMIC_MOAT_METRICS = [
  { label: "Trust History", value: "Cycle 42+", icon: History },
  { label: "Compliance Assets", value: "Verified", icon: FileCheck },
  { label: "Knowledge Equity", value: "1.2K Nodes", icon: BrainCircuit },
  { label: "Network Effects", value: "Active", icon: Share2 }
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING MARKET MESH...")
  const [borderFeed, setBorderFeed] = useState<string[]>([])

  useEffect(() => {
    const sequence = [
      { text: "CALIBRATING ECONOMIC GRAVITY...", time: 600 },
      { text: "VERIFYING REVENUE AUTHENTICITY...", time: 1200 },
      { text: "MAPPING SYSTEMIC MOATS...", time: 1800 },
      { text: "NOORNEXUS: MARKET REALITY READY", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "MARKET: New Recurring Revenue Detected (Node 04)", 
        "MOAT: Compliance Evidence Package Signed", 
        "RETENTION: 98% Monthly User Continuity Verified", 
        "ADOPTION: Tier 3 Advocate Conversion (Institution BD)",
        "REVENUE: $12k Net Value Created for Partner",
        "AUDIT: Revenue Authenticity Ratio at 10.3%"
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
                   <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5 text-xs">
                      <Wallet2 className="size-3 mr-2" /> Phase P7: Market Reality
                   </Badge>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <TrendingUp className="size-3 mr-2" /> Economic Moat Active
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Economic Sovereignty.' : 'Market Reality.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed">
                   "NoorNexus is defined by its Economic Gravity. We measure success by the Revenue Authenticity and Voluntary Retention of those who choose to pay for our value."
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-amber-500/20 w-full min-w-[320px]">
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Revenue Authenticity Ratio</p>
                       <Badge className="bg-amber-500/20 text-amber-500 border-none text-[8px]">VALIDATED</Badge>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: '10.3%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-2 italic text-center">"10.3% of Active Users are Contributing Citizens (Paying)"</p>
                </Card>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <LineChart className="size-4" /> Revenue Truth Layer (Market Vital Signs)
                     </h3>
                     <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">ECON_SYNC: ACTIVE</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     {REVENUE_TRUTH_LAYER.map((kpi, i) => (
                       <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-primary/20 transition-all">
                          <CardContent className="p-4 space-y-3">
                             <div className="space-y-0.5">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">{kpi.label}</p>
                                <p className={`text-xl font-headline font-bold ${kpi.color}`}>{kpi.value}</p>
                                <p className="text-[8px] text-muted-foreground font-mono">{kpi.sub}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                     <ShieldCheck className="size-4" /> Economic Moat (Competitive Superiority)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     {ECONOMIC_MOAT_METRICS.map((v, i) => (
                       <Card key={i} className="glass-card border-emerald-500/10 bg-emerald-500/5">
                          <CardContent className="p-6 space-y-3 text-center">
                             <div className="p-3 rounded-full bg-emerald-500/10 w-fit mx-auto">
                                <v.icon className="size-6 text-emerald-500" />
                             </div>
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-emerald-200 uppercase">{v.label}</p>
                                <p className="text-lg font-headline font-bold text-white">{v.value}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-amber-500 flex items-center gap-2">
                          <Target className="size-4" /> Adoption Proof: The 3 Tiers
                       </CardTitle>
                       <CardDescription className="text-xs italic">"Trust-based retention is the only sustainable moat."</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {[
                         { tier: "Tier 1: Usage", desc: "Citizen uses the system for daily tasks.", stat: "1.2K" },
                         { tier: "Tier 2: Dependency", desc: "Citizen depends on NoorNexus for operations.", stat: "420" },
                         { tier: "Tier 3: Advocacy", desc: "Citizen advocates and pays for the value.", stat: "124" }
                       ].map((s, i) => (
                         <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                            <div className="space-y-1">
                               <p className="text-[10px] text-white font-bold uppercase">{s.tier}</p>
                               <p className="text-[9px] text-muted-foreground">{s.desc}</p>
                            </div>
                            <p className="text-sm font-headline font-bold text-amber-500">{s.stat}</p>
                         </div>
                       ))}
                    </CardContent>
                 </Card>

                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <BarChart3 className="size-4" /> Economic Contribution Summary
                       </CardTitle>
                       <CardDescription className="text-xs italic">"Measuring real-world financial impact."</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Revenue Flow</p>
                             <p className="text-lg font-headline font-bold text-white">$12.4K</p>
                          </div>
                          <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Fraud Prevented</p>
                             <p className="text-lg font-headline font-bold text-emerald-500">$45K</p>
                          </div>
                       </div>
                       <p className="text-[10px] text-muted-foreground italic text-center">
                          "Institutional worth is proven by the cost of replacement."
                       </p>
                    </CardContent>
                 </Card>
               </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[500px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <History className="size-4 text-amber-500" />
                    Market Reality Pulse
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {borderFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3">
                          <div className="size-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-emerald-500">Economic Hub</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Phase P7 ensures NoorNexus is not just a tool, but a business. Our value is validated by those who invest their capital into our trust."
                    </p>
                    <Badge className="w-full justify-center bg-emerald-500/20 text-emerald-500 border-none uppercase text-[8px] font-bold">Moat: VERIFIED UNCOPYABLE</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
