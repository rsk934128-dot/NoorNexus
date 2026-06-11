
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
  Fingerprint as FingerprintIcon,
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
  Box
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

const CIVILIZATIONAL_WORTH = [
  { label: "Knowledge Assets", value: "$85M", trend: "+12%" },
  { label: "Trust Equity", value: "98.4%", trend: "+2.1%" },
  { label: "Net Institutional Value", value: "$512M", trend: "+5.4%" },
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING CIVILIZATION OPERATING SYSTEM...")
  const [fetchingSummary, setFetchingSummary] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null)
  const [borderFeed, setBorderFeed] = useState<string[]>([])

  useEffect(() => {
    const sequence = [
      { text: "STABILIZING INSTITUTIONAL CORE...", time: 600 },
      { text: "ENFORCING CONSTITUTIONAL GUARDRAILS...", time: 1200 },
      { text: "ACTIVATING ANTI-CAPTURE ARCHITECTURE...", time: 1800 },
      { text: "CALIBRATING RESILIENCE MESH...", time: 2400 },
      { text: "NOORNEXUS: SOVEREIGN INSTITUTION READY", time: 3000 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "METAGOV: Institutional Audit Pulse OK", 
        "OBSERV: Reputation Inflation within Ceiling", 
        "MEM: Historical Context Linked", 
        "ECON: Balance Sheet Validated",
        "SYNC: External Trust Federation Active",
        "STRESS: Periodic Simulation Success"
      ]
      setBorderFeed(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 10))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  async function handleFetchDailySummary() {
    if (!isAdmin) return;
    setFetchingSummary(true)
    try {
      const summary = await getDailyImperialSummary();
      setDailySummary(summary);
      setIsSummaryOpen(true);
    } catch (e) {
      toast({ title: "Summary Failure", variant: "destructive" });
    } finally {
      setFetchingSummary(false)
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
                   <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5 text-xs animate-pulse">
                      <Compass className="size-3 mr-2" /> Civilization Observatory
                   </Badge>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <ShieldCheck className="size-3 mr-2" /> SOVEREIGN_INSTITUTION_v1.0
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Institutional Intelligence.' : 'Civilization Mirror.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed">
                   "Predictive Health. Founder Independence. External Legitimacy." - নূরনেক্সাস এখন একটি স্বয়ংসম্পূর্ণ এবং দীর্ঘমেয়াদী সার্বভৌম প্রতিষ্ঠান।
                </p>
              </div>
              
              {isAdmin && (
                <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                  <div className="glass-card p-6 rounded-2xl border border-primary/20 flex flex-col items-center w-full min-w-[280px]">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Net Civilizational Worth</p>
                      <div className="flex items-center gap-3">
                         <TrendingUp className="size-8 text-emerald-500 animate-pulse" />
                         <span className="text-4xl font-headline font-bold text-white tracking-tighter">$512M</span>
                      </div>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <BarChart3 className="size-4" /> Civilizational Balance Sheet
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {CIVILIZATIONAL_WORTH.map((item, i) => (
                      <Card key={i} className="glass-card bg-primary/5 border-white/5">
                        <CardContent className="p-6 text-center space-y-2">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</p>
                           <p className="text-3xl font-headline font-bold text-white">{item.value}</p>
                           <p className="text-[10px] text-emerald-500 font-bold">{item.trend}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
               </section>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                    <CardHeader className="pb-2 p-6">
                       <CardTitle className="text-sm font-headline uppercase text-amber-500 flex items-center gap-2">
                          <Eye className="size-4" /> Civilization Health Observatory
                       </CardTitle>
                       <CardDescription className="text-xs">Predicting emerging stresses before they become failures.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-5">
                       {[
                         { label: "Reputation Inflation Risk", score: 12, status: "LOW" },
                         { label: "Governance Stress Level", score: 34, status: "STABLE" },
                         { label: "Treasury Allocation Debt", score: 5, status: "MINIMAL" },
                         { label: "AI Concentration Index", score: 48, status: "MONITORED" }
                       ].map((metric, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-mono">
                               <span className="text-white uppercase font-bold">{metric.label}</span>
                               <span className="text-amber-500">{metric.status} ({metric.score}%)</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-amber-500" style={{ width: `${metric.score}%` }} />
                            </div>
                         </div>
                       ))}
                    </CardContent>
                 </Card>

                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader className="p-6">
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <BrainCircuit className="size-4" /> Meta-Governance Layer
                       </CardTitle>
                       <CardDescription className="text-xs">Auditing the effectiveness of the Governance model itself.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6 pt-0">
                       <div className="space-y-4">
                          {[
                            { label: "Founder Independence Score", score: "82%", trend: "Expanding" },
                            { label: "Voting Model Fairness", score: "99.8%", trend: "Stable" },
                            { label: "Audit Neutrality Index", score: "MAX", trend: "Verified" }
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                               <span className="text-[10px] text-muted-foreground uppercase font-bold">{item.label}</span>
                               <div className="text-right">
                                  <p className="text-xs font-bold text-white">{item.score}</p>
                                  <p className="text-[8px] text-emerald-500 uppercase">{item.trend}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>
               </div>

               <Card className="glass-card bg-emerald-500/5 border-emerald-500/30">
                  <CardHeader className="p-6">
                     <CardTitle className="text-xs sm:text-sm font-headline uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                        <ShieldCheck className="size-5" /> Institutional Sustainability Statement
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                     <p className="text-xl lg:text-2xl font-headline font-bold text-white leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                        "প্রতিষ্ঠাতা থাকবেন না, কিন্তু প্রতিষ্ঠান থাকবে। নূরনেক্সাস এখন তার নিজস্ব মেটা-গভর্ন্যান্স এবং ইকোনমিক ইন্টেলিজেন্স দ্বারা পরিচালিত একটি দীর্ঘস্থায়ী সত্তা।"
                     </p>
                     <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest pl-6 text-emerald-500/60">
                        <span className="flex items-center gap-1"><Lock className="size-3" /> Anti-Capture Active</span>
                        <span className="flex items-center gap-1"><Share2 className="size-3" /> Federation Ready</span>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[500px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <History className="size-4 text-primary" />
                    Evolution Stream
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
                    <CardTitle className="text-lg font-headline uppercase text-emerald-500">Steward Council</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Emergency delegation enabled. The system can function autonomously under Mass Failure Scenarios."
                    </p>
                    <Badge className="w-full justify-center bg-emerald-500/20 text-emerald-500 border-none">SYSTEM_AUTONOMY: 82%</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="glass-card border-primary/40 w-[95vw] sm:max-w-[600px] bg-black/95 p-0 overflow-hidden">
           <div className="bg-primary/10 p-6 border-b border-white/10 flex items-center gap-4">
              <ShieldCheck className="size-10 text-primary" />
              <div>
                <DialogTitle className="text-2xl font-headline font-bold text-white uppercase">Sovereign Dispatch</DialogTitle>
                <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{dailySummary?.date}</p>
              </div>
           </div>
           <div className="p-8 space-y-8">
              <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 space-y-3">
                 <p className="text-sm font-mono text-emerald-100 italic leading-relaxed">
                   "আজকের অডিট আপডেট: নূরনেক্সাস এখন প্রতিষ্ঠাতা-নির্ভরতা কাটিয়ে একটি পূর্ণাঙ্গ সার্বভৌম প্রতিষ্ঠানে রূপ নিয়েছে। সিভিলাইজেশনাল ব্যালেন্স শিট পজিটিভ।"
                 </p>
              </div>
           </div>
           <div className="p-6 bg-white/2 border-t border-white/5">
              <Button onClick={() => setIsSummaryOpen(false)} className="w-full bg-primary text-primary-foreground font-bold uppercase h-12 text-xs">Acknowledge Maturity</Button>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
