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
  Award
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
  { label: "Institutional Trust", value: "72%", trend: "+5.1%" },
  { label: "Pilot Success Rate", value: "99.8%", trend: "Stable" },
  { label: "Market Readiness", value: "85/100", trend: "+12.4%" },
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING ADOPTION GATEWAY...")
  const [fetchingSummary, setFetchingSummary] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null)
  const [borderFeed, setBorderFeed] = useState<string[]>([])

  useEffect(() => {
    const sequence = [
      { text: "STABILIZING INSTITUTIONAL CORE...", time: 600 },
      { text: "ENFORCING PARTNERSHIP KITS...", time: 1200 },
      { text: "ACTIVATING BUILDERS PROGRAM...", time: 1800 },
      { text: "SYNCING PILOT NODES...", time: 2400 },
      { text: "NOORNEXUS: MARKET ADOPTION READY", time: 3000 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "ADOPT: Pilot Partner 01 Synced", 
        "BUILDER: New Module Published v1.2", 
        "CRED: Case Study 04 Verified", 
        "MARKET: Trust Federation Node Online",
        "SYNC: Operational Checklist 85% Complete",
        "GRANT: 500k Simulation Tokens Released"
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
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs animate-pulse">
                      <Rocket className="size-3 mr-2" /> Market Adoption Phase
                   </Badge>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs">
                      <Award className="size-3 mr-2" /> PILOT_STRENGTH: 72/100
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Institutional Adoption.' : 'Ecosystem Validation.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed">
                   "Trust Before Scale. Pilots Over Claims. Credibility Over Features." - নূরনেক্সাস এখন তার প্রথম ১০টি প্রাতিষ্ঠানিক পার্টনার গ্রহণের জন্য প্রস্তুত।
                </p>
              </div>
              
              {isAdmin && (
                <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                  <div className="glass-card p-6 rounded-2xl border border-primary/20 flex flex-col items-center w-full min-w-[280px]">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Institutional Credibility</p>
                      <div className="flex items-center gap-3">
                         <Star className="size-8 text-emerald-500 animate-pulse" />
                         <span className="text-4xl font-headline font-bold text-white tracking-tighter">72/100</span>
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
                     <TrendingUp className="size-4" /> Market Validation Metrics
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
                          <Building2 className="size-4" /> Pilot Program Status
                       </CardTitle>
                       <CardDescription className="text-xs">Architectural learning through first-adopters.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-5">
                       {[
                         { label: "Fintech Pilots", score: 1, target: 3, status: "IN_PROGRESS" },
                         { label: "University Mesh", score: 0, target: 2, status: "AWAITING" },
                         { label: "Gov Nodes", score: 0, target: 1, status: "AWAITING" },
                         { label: "Enterprise Partners", score: 0, target: 4, status: "AWAITING" }
                       ].map((metric, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-mono">
                               <span className="text-white uppercase font-bold">{metric.label}</span>
                               <span className="text-amber-500">{metric.score}/{metric.target} ({metric.status})</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-amber-500" style={{ width: `${(metric.score / metric.target) * 100}%` }} />
                            </div>
                         </div>
                       ))}
                    </CardContent>
                 </Card>

                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader className="p-6">
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <Rocket className="size-4" /> Builders Program (v1.0)
                       </CardTitle>
                       <CardDescription className="text-xs">Certified architects building on NoorNexus.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6 pt-0">
                       <div className="space-y-4">
                          {[
                            { label: "Certified Architects", score: "12", trend: "+4" },
                            { label: "API Marketplace Modules", score: "42", trend: "+8" },
                            { label: "Builder Grants Released", score: "$24k", trend: "Active" }
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
                        <ShieldCheck className="size-5" /> Institutional Credibility Mandate
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                     <p className="text-xl lg:text-2xl font-headline font-bold text-white leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                        "নূরনেক্সাসের পরবর্তী বিবর্তন আর ফিচারের নয়, বরং বিশ্বাসের। প্রথম ৩টি পাইলট পার্টনারের সফল ব্যবহারই আমাদের আর্কিটেকচারের শ্রেষ্ঠত্ব প্রমাণ করবে।"
                     </p>
                     <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest pl-6 text-emerald-500/60">
                        <span className="flex items-center gap-1"><CheckCircle2 className="size-3" /> Audit Ready</span>
                        <span className="flex items-center gap-1"><Handshake className="size-3" /> Trust Fed Active</span>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[500px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <History className="size-4 text-primary" />
                    Adoption Stream
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
                    <CardTitle className="text-lg font-headline uppercase text-emerald-500">Credibility Index</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Institutional readiness is measured by case studies and third-party audits."
                    </p>
                    <Badge className="w-full justify-center bg-emerald-500/20 text-emerald-500 border-none uppercase text-[8px] font-bold">Verification: 72% Verified</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="glass-card border-primary/40 w-[95vw] sm:max-w-[600px] bg-black/95 p-0 overflow-hidden">
           <div className="bg-primary/10 p-6 border-b border-white/10 flex items-center gap-4">
              <Star className="size-10 text-primary" />
              <div>
                <DialogTitle className="text-2xl font-headline font-bold text-white uppercase">Adoption Dispatch</DialogTitle>
                <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{dailySummary?.date}</p>
              </div>
           </div>
           <div className="p-8 space-y-8">
              <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 space-y-3">
                 <p className="text-sm font-mono text-emerald-100 italic leading-relaxed">
                   "আজকের অ্যাডপশন আপডেট: নূরনেক্সাস এখন ফিচার-কমপ্লিট থেকে পাইলট-ভ্যালিডেশন ধাপে প্রবেশ করেছে। আমাদের প্রাতিষ্ঠানিক ক্রেডিবিলিটি এখন ৭২%।"
                 </p>
              </div>
           </div>
           <div className="p-6 bg-white/2 border-t border-white/5">
              <Button onClick={() => setIsSummaryOpen(false)} className="w-full bg-primary text-primary-foreground font-bold uppercase h-12 text-xs">Confirm Adoption Progress</Button>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
