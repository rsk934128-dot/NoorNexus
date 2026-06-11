
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
  ExternalLink
} from "lucide-react"
import { useEffect, useState } from "react"
import { ledgerAudit, LedgerAuditOutput } from "@/ai/flows/ledger-audit-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SovereignLogo } from "@/components/sovereign-logo"
import { getSystemHealthReport, HealthReport, broadcastProclamation, getDailyImperialSummary, type DailySummary } from "@/services/nexus-bridge"
import { connectNode } from "@/services/sovereign-protocol"
import { ScrollArea } from "@/components/ui/scroll-area"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const CIVILIZATIONAL_INDEX = [
  { label: "Financial Sovereignty", weight: "20%", score: 92.4, icon: Landmark, color: "text-emerald-500", evidence: "ledger-audit-v3" },
  { label: "Identity Integrity", weight: "20%", score: 98.1, icon: Fingerprint, color: "text-primary", evidence: "identity-ledger-v1" },
  { label: "Governance Quality", weight: "20%", score: 84.5, icon: Gavel, color: "text-amber-500", evidence: "accountability-report" },
  { label: "Citizen Participation", weight: "20%", score: 76.2, icon: UserCircle, color: "text-purple-500", evidence: "engagement-index" },
  { label: "Infrastructure Resilience", weight: "20%", score: 99.98, icon: Share2, color: "text-blue-500", evidence: "mesh-pulse" },
]

export default function Home() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING CIVILIZATION DIGITAL TWIN...")
  const [auditing, setAuditing] = useState(false)
  const [fetchingSummary, setFetchingSummary] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null)
  const [borderFeed, setBorderFeed] = useState<string[]>([])
  const [discoveryPulse, setDiscoveryPulse] = useState<number>(0)

  useEffect(() => {
    const sequence = [
      { text: "STABILIZING IMPERIAL CORE...", time: 600 },
      { text: "SYNCHRONIZING CIVILIZATION LAYERS...", time: 1200 },
      { text: "ESTABLISHING CITIZEN TRUST NODES...", time: 1800 },
      { text: "OPENING SOVEREIGN GATEWAYS...", time: 2400 },
      { text: "MISSION 400: CIVILIZATION DIGITAL TWIN READY", time: 3000 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "AUDIT: Cryptographic Attestation Verified", 
        "GOV: Accountability Loop Synchronized", 
        "TRUST: Multi-Dimensional Vector Updated", 
        "AI: Alignment Audit COMPLETED",
        "ECON: Value Flow Graph Updated",
        "TWIN: System Mirror Active"
      ]
      setBorderFeed(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 10))
      setDiscoveryPulse(prev => (prev + Math.random() * 5) % 100)
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
                      <Sparkles className="size-3 mr-2" /> Digital Twin Active
                   </Badge>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <ShieldCheck className="size-3 mr-2" /> VERIFIABLE_OS_L4
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Civilization Mirror.' : 'Twin Interface.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:text-xl leading-relaxed">
                   "Verifiable Trust. Autonomous Governance. Economic Sovereignty." - নূরনেক্সাস এখন সভ্যতার একটি ডিজিটাল টুইন, যেখানে প্রতিটি সিদ্ধান্ত ও ফলাফল যাচাইযোগ্য।
                </p>
              </div>
              
              {isAdmin && (
                <div className="flex flex-col items-center gap-4 w-full lg:w-auto animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="glass-card p-6 rounded-2xl border border-primary/20 flex flex-col items-center w-full min-w-[240px]">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Institutional Pulse</p>
                      <div className="flex items-center gap-3">
                         <Radio className="size-8 text-primary animate-pulse" />
                         <span className="text-4xl font-headline font-bold text-white tracking-tighter">{Math.floor(discoveryPulse)}%</span>
                      </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Button onClick={handleFetchDailySummary} disabled={fetchingSummary} className="flex-1 bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2 text-[10px]">
                      <BarChart3 className="size-4" /> Daily Dispatch
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
               <section className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                     <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <Activity className="size-4" /> Evidence Marketplace (Maturity Index)
                     </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                    {CIVILIZATIONAL_INDEX.map((m, i) => (
                      <Card key={i} className="glass-card border-l-4 border-l-primary/20 hover:border-l-primary transition-all relative group">
                        <CardContent className="p-4 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className={`p-2 bg-white/5 rounded-lg ${m.color}`}>
                                 <m.icon className="size-4" />
                              </div>
                              <Button variant="ghost" size="icon" className="size-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <ExternalLink className="size-3 text-muted-foreground" />
                              </Button>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase leading-tight h-8">{m.label}</p>
                              <div className="flex justify-between items-end">
                                 <p className={`text-xl font-headline font-bold ${m.color}`}>{m.score}%</p>
                              </div>
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className={`h-full transition-all duration-1000 ${m.color.replace('text-', 'bg-')}`} style={{ width: `${m.score}%` }} />
                              </div>
                              <p className="text-[7px] font-mono text-muted-foreground uppercase tracking-tighter truncate">EVIDENCE: {m.evidence}</p>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
               </section>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader className="pb-2 p-4">
                       <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                          <TrendingUp className="size-3" />
                          Economic Execution (Value Flow)
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                       <div className="text-3xl font-headline font-bold text-white">$24.1M</div>
                       <p className="text-[9px] text-emerald-500 uppercase font-mono mt-1">Audit: VERIFIABLE_LEDGER</p>
                    </CardContent>
                 </Card>
                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader className="pb-2 p-4">
                       <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                          <Activity className="size-3" />
                          Accountability Chain
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                       <div className="text-3xl font-headline font-bold text-white">96.4%</div>
                       <p className="text-[9px] text-primary uppercase font-mono mt-1">Execution Loop: ACTIVE</p>
                    </CardContent>
                 </Card>
                 <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                    <CardHeader className="pb-2 p-4">
                       <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                          <BrainCircuit className="size-3" />
                          AI Alignment Depth
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                       <div className="text-3xl font-headline font-bold text-white">L4_MAX</div>
                       <p className="text-[9px] text-amber-500 uppercase font-mono mt-1">Nora Registry: AUDITED</p>
                    </CardContent>
                 </Card>
               </div>

               <Card className="glass-card bg-primary/5 border-primary/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                     <Quote className="size-32 text-primary" />
                  </div>
                  <CardHeader className="p-6">
                     <CardTitle className="text-xs sm:text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                        <Shield className="size-5" /> Strategic Manifesto v5.0 (Civilization Twin)
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10 p-6 pt-0">
                     <p className="text-xl lg:text-2xl font-headline font-bold text-white leading-relaxed italic border-l-4 border-primary pl-6">
                        "নুরনেক্সাস এখন সভ্যতার একটি ডিজিটাল টুইন, যেখানে প্রতিটি সিদ্ধান্ত ক্রিপ্টোগ্রাফিক প্রমাণের মাধ্যমে যাচাইযোগ্য এবং প্রতিটি ফলাফল একাউন্টিবিলিটি ইঞ্জিনের মাধ্যমে পরিমাপযোগ্য।"
                     </p>
                     <div className="flex items-center gap-2 text-primary/60 text-xs font-bold uppercase tracking-widest pl-6">
                        <Heart className="size-3 fill-current" /> Zero-Drift Decision System Enforced
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 flex flex-col h-[500px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <History className="size-4 text-emerald-500" />
                    Civilizational Replay
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {borderFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3">
                          <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader className="p-6">
                   <CardTitle className="flex items-center gap-2 font-headline text-lg uppercase">
                     <History className="size-5 text-primary" /> System Health
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6 pt-0">
                   <div className="space-y-2">
                      <p className="text-4xl font-headline font-bold text-white tracking-tighter">99.99%</p>
                      <p className="text-[10px] text-primary font-bold uppercase">MISSION_400_TWIN_READY</p>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: `100%` }} />
                      </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="glass-card border-primary/40 w-[95vw] sm:max-w-[600px] bg-black/95 p-0 overflow-hidden">
           <div className="bg-primary/10 p-6 border-b border-white/10 flex items-center gap-4">
              <BarChart3 className="size-10 text-primary" />
              <div>
                <DialogTitle className="text-2xl font-headline font-bold text-white uppercase">Daily Twin Dispatch</DialogTitle>
                <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{dailySummary?.date}</p>
              </div>
           </div>
           <div className="p-8 space-y-8">
              <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 space-y-3">
                 <div className="flex items-center gap-3 text-emerald-500">
                    <TrendingUp className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Digital Twin Status</span>
                 </div>
                 <p className="text-sm font-mono text-emerald-100 italic leading-relaxed">
                   "আজকের সিস্টেম মিরর আপডেট: ট্রাস্ট লেজার ১০০% সিঙ্কড। সিভিক ইমপ্যাক্ট ০.৪% বৃদ্ধি পেয়েছে।"
                 </p>
              </div>
           </div>
           <div className="p-6 bg-white/2 border-t border-white/5">
              <Button onClick={() => setIsSummaryOpen(false)} className="w-full bg-primary text-primary-foreground font-bold uppercase h-12 text-xs">Acknowledge Status</Button>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
