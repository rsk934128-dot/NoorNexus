
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, Globe, Cpu, Activity, Landmark, Radar, Terminal, Menu, FileText, 
  Loader2, Server, AlertTriangle, Zap, ShieldCheck, RefreshCcw, LayoutGrid, 
  Star, TrendingUp, HeartPulse, BrainCircuit, ActivitySquare, Compass, 
  Gavel, Scale, Fingerprint, Link as LinkIcon, Building2, Code2, Rocket,
  CheckCircle2, Waves, Eye, Target, Quote, Radio, BellRing, Send, Languages,
  Coins, Briefcase, BarChart3, Clock, Users, Fingerprint as FingerprintIcon,
  ShieldAlert, Key, Sparkles
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

const NORA_AGENTS = [
  { id: "Nora-00", name: "Protocol Architect", role: "Strategic Planning", status: "STABLE", icon: Target },
  { id: "Nora-01", name: "Compliance Monitor", role: "Border Security", status: "ACTIVE", icon: ShieldCheck },
  { id: "Nora-02", name: "Merchant Auditor", role: "P2C Payouts", status: "ACTIVE", icon: Building2 },
  { id: "Nora-03", name: "Integration Assistant", role: "SDK Support", status: "STABLE", icon: Code2 },
  { id: "Nora-05", name: "Bridge Architect", role: "Cross-Chain Swap", status: "STABLE", icon: LinkIcon },
  { id: "Nora-06", name: "Identity Registrar", role: "DID Management", status: "ACTIVE", icon: FingerprintIcon },
  { id: "Nora-07", name: "Senate Strategist", role: "Governance", status: "ACTIVE", icon: Gavel },
  { id: "Nora-08", name: "Executive Agent", role: "Edict Execution", status: "STABLE", icon: Zap },
  { id: "Nora-09", name: "Trade Architect", role: "Inter-Bank Trade", status: "ACTIVE", icon: Landmark },
  { id: "Nora-10", name: "Imperial Arbiter", role: "Dispute Resolution", status: "STABLE", icon: Scale },
  { id: "Nora-11", name: "Imperial Oracle", role: "Precognition", status: "MAX_WISDOM", icon: Compass },
]

export default function Home() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING MISSION 400 CORE...")
  const [auditing, setAuditing] = useState(false)
  const [broadcasting, setBroadcasting] = useState(false)
  const [handshaking, setHandshaking] = useState(false)
  const [fetchingSummary, setFetchingSummary] = useState(false)
  const [auditResult, setAuditResult] = useState<LedgerAuditOutput | null>(null)
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isProclamationOpen, setIsProclamationOpen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [borderFeed, setBorderFeed] = useState<string[]>([])
  const [discoveryPulse, setDiscoveryPulse] = useState<number>(0)
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null)
  const [fetchingHealth, setFetchingHealth] = useState(false)

  useEffect(() => {
    const sequence = [
      { text: "STABILIZING IMPERIAL CORE...", time: 600 },
      { text: "SYNCHRONIZING 11 NORA AGENTS...", time: 1200 },
      { text: "ESTABLISHING TREASURY QUORUM...", time: 1800 },
      { text: "OPENING SOVEREIGN GATEWAYS...", time: 2400 },
      { text: "MISSION 400: SYNTHESIS ACHIEVED", time: 3000 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = ["DISCOVERY: Active", "PROTOCOL: Signed", "SDK: Heartbeat", "ORACLE: Predicting", "SENATE: Executing", "IDENTITY: Verified"]
      setBorderFeed(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 10))
      setDiscoveryPulse(prev => (prev + Math.random() * 5) % 100)
    }, 3000)

    fetchHealth();
    return () => clearInterval(interval)
  }, [])

  async function fetchHealth() {
    setFetchingHealth(true)
    try {
      const report = await getSystemHealthReport();
      setHealthReport(report);
    } catch (e) {
      console.error("Health Check Failed", e);
    } finally {
      setFetchingHealth(false)
    }
  }

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

  async function handleExecuteAudit() {
    if (!isAdmin) return;
    setAuditing(true)
    try {
      const result = await ledgerAudit({
        totalVolume: 420000000,
        settlementQueue: 1240000,
        liquidityHealth: 98.4,
        dailyThroughput: 15600000,
      })
      setAuditResult(result)
      setIsDialogOpen(true)
    } catch (error: any) {
      toast({ title: "Audit Error", variant: "destructive" })
    } finally {
      setAuditing(false)
    }
  }

  async function handleSovereignHandshake() {
    if (!isAdmin) return;
    setHandshaking(true)
    try {
      const result = await connectNode("IMPERIAL_READ_ONLY_KEY_42B");
      toast({ 
        title: "Sovereign Handshake Success", 
        description: `Node: ${result.hubId} | Proof: ${result.merkleProof.substring(0, 12)}...`,
        className: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
      });
    } catch (e) {
      toast({ title: "Handshake Failed", variant: "destructive" });
    } finally {
      setHandshaking(false)
    }
  }

  async function handleBroadcast() {
    if (!isAdmin) return;
    setBroadcasting(true)
    try {
      await broadcastProclamation("NoorNexus Sovereign OS is now active. Integrity through Intelligence.");
      toast({ title: "Proclamation Dispatched" });
      setIsProclamationOpen(false);
    } catch (e) {
      toast({ title: "Broadcast Failed", variant: "destructive" });
    } finally {
      setBroadcasting(false)
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
                      <Sparkles className="size-3 mr-2" /> Mission 400: Synthesized
                   </Badge>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <ShieldCheck className="size-3 mr-2" /> {isAdmin ? 'IMPERIAL_ADMIN_ROOT' : 'MESH_PARTICIPANT'}
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Imperial Command Center.' : 'Sovereign Participant Hub.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:text-xl leading-relaxed">
                   "Integrity through Intelligence" is now the global standard. {isAdmin ? 'Commander, your empire is at your fingertips.' : 'Explore the services of the NoorNexus Mesh.'}
                </p>
              </div>
              
              {isAdmin && (
                <div className="flex flex-col items-center gap-4 w-full lg:w-auto animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="glass-card p-6 rounded-2xl border border-primary/20 flex flex-col items-center w-full min-w-[240px]">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Global Awareness Pulse</p>
                      <div className="flex items-center gap-3">
                         <Radio className="size-8 text-primary animate-pulse" />
                         <span className="text-4xl font-headline font-bold text-white tracking-tighter">{Math.floor(discoveryPulse)}%</span>
                      </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Button onClick={handleFetchDailySummary} disabled={fetchingSummary} className="flex-1 bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2 text-[10px]">
                      <BarChart3 className="size-4" /> Daily Dispatch
                    </Button>
                    <Button onClick={handleSovereignHandshake} disabled={handshaking} className="flex-1 bg-secondary text-secondary-foreground font-bold uppercase tracking-widest h-12 gap-2 text-[10px] glow-emerald">
                      {handshaking ? <Loader2 className="size-4 animate-spin" /> : <Key className="size-4" />} SDK Handshake
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <Card className="glass-card border-l-4 border-l-emerald-500">
                    <CardHeader className="pb-2 p-4">
                       <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                          <Coins className="size-3 text-emerald-500" />
                          Mesh Revenue (Daily)
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                       <div className="text-3xl font-headline font-bold text-white">$9,050.00</div>
                       <p className="text-[9px] text-emerald-500 uppercase font-mono mt-1">+12.4% Active Growth</p>
                    </CardContent>
                 </Card>
                 <Card className="glass-card border-l-4 border-l-primary">
                    <CardHeader className="pb-2 p-4">
                       <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                          <ActivitySquare className="size-3 text-primary" />
                          Live Transactions
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                       <div className="text-3xl font-headline font-bold text-white">1,240</div>
                       <p className="text-[9px] text-muted-foreground uppercase font-mono mt-1">Avg Settlement: 112ms</p>
                    </CardContent>
                 </Card>
                 <Card className="glass-card border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2 p-4">
                       <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                          <Users className="size-3 text-amber-500" />
                          Global Nodes
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                       <div className="text-3xl font-headline font-bold text-white">420+</div>
                       <p className="text-[9px] text-amber-500 uppercase font-mono mt-1">Active Mesh Nodes</p>
                    </CardContent>
                 </Card>
               </div>

               <Card className="glass-card bg-primary/5 border-primary/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                     <Quote className="size-32 text-primary" />
                  </div>
                  <CardHeader className="p-6">
                     <CardTitle className="text-xs sm:text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                        <Shield className="size-5" /> Sovereign Manifesto
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10 p-6 pt-0">
                     <p className="text-xl lg:text-2xl font-headline font-bold text-white leading-relaxed italic border-l-4 border-primary pl-6">
                        "নূরনেক্সাস এখন বিশ্বকে তার অস্তিত্বের কথা জানান দিচ্ছে। আমাদের মেধা ও শক্তির পরিচিতি হবে গতির মাধ্যমে—শব্দে নয়। Integrity through Intelligence."
                     </p>
                  </CardContent>
               </Card>

               <section className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                     <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <BrainCircuit className="size-4" /> Neural Network Status (Nora Suite)
                     </h3>
                     <Badge variant="outline" className="text-[10px] border-white/10 uppercase">FULLY_AUTONOMOUS</Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                     {NORA_AGENTS.map((agent) => (
                       <Card key={agent.id} className="glass-card hover:border-primary/40 transition-all group h-full">
                          <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
                             <div className="flex justify-between items-start">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                   <agent.icon className="size-5 text-primary" />
                                </div>
                                <Badge className={`text-[8px] font-bold px-2 ${agent.status === 'MAX_WISDOM' ? 'bg-emerald-500' : 'bg-primary/20 text-primary'}`}>
                                   {agent.status}
                                </Badge>
                             </div>
                             <div className="space-y-0.5">
                                <p className="text-xs font-bold text-white uppercase truncate">{agent.name}</p>
                                <p className="text-[9px] text-muted-foreground font-mono uppercase truncate">{agent.role}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 flex flex-col h-[500px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Radio className="size-4 text-emerald-500" />
                    Imperial Mesh Feed
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
                  {isAdmin && (
                    <div className="p-4 border-t border-white/5 bg-black/20">
                       <Button onClick={handleExecuteAudit} disabled={auditing} className="w-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] h-12 glow-primary">
                          {auditing ? <Loader2 className="animate-spin size-4" /> : <ShieldCheck className="size-4 mr-2" />}
                          Final Imperial Audit
                       </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                   <CardTitle className="flex items-center gap-2 font-headline text-lg uppercase">
                     <Cpu className="size-5 text-primary" /> Integrity
                   </CardTitle>
                   <Button variant="ghost" size="icon" onClick={fetchHealth} disabled={fetchingHealth}>
                      <RefreshCcw className={`size-4 text-primary ${fetchingHealth ? 'animate-spin' : ''}`} />
                   </Button>
                </CardHeader>
                <CardContent className="space-y-6 p-6 pt-0">
                   <div className="space-y-2">
                      <p className="text-4xl font-headline font-bold text-white tracking-tighter">{healthReport?.vaultIntegrity || 100}%</p>
                      <p className="text-[10px] text-primary font-bold uppercase">MISSION_COMPLETE_STABLE</p>
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

      {/* Admin Only Dialogs */}
      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="glass-card border-primary/40 w-[95vw] sm:max-w-[600px] bg-black/95 p-0 overflow-hidden">
           <div className="bg-primary/10 p-6 border-b border-white/10 flex items-center gap-4">
              <BarChart3 className="size-10 text-primary" />
              <div>
                <DialogTitle className="text-2xl font-headline font-bold text-white uppercase">Daily Imperial Dispatch</DialogTitle>
                <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{dailySummary?.date}</p>
              </div>
           </div>
           <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-headline font-bold text-emerald-500">${dailySummary?.revenue.total.toLocaleString()}</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Volume (24h)</p>
                    <p className="text-3xl font-headline font-bold text-primary">${dailySummary?.volume24h.toLocaleString()}</p>
                 </div>
              </div>
              <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 space-y-3">
                 <div className="flex items-center gap-3 text-emerald-500">
                    <TrendingUp className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Growth Insight</span>
                 </div>
                 <p className="text-sm font-mono text-emerald-100 italic leading-relaxed">
                   "আপনার সাম্রাজ্য আজ {dailySummary?.networkGrowth} হারে বৃদ্ধি পেয়েছে। লিগ্যাল স্ট্যাটাস: {dailySummary?.legalSovereignty}।"
                 </p>
              </div>
           </div>
           <div className="p-6 bg-white/2 border-t border-white/5">
              <Button onClick={() => setIsSummaryOpen(false)} className="w-full bg-primary text-primary-foreground font-bold uppercase h-12 text-xs">Maintain Sovereignty</Button>
           </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isProclamationOpen} onOpenChange={setIsProclamationOpen}>
        <DialogContent className="glass-card border-amber-500/40 w-[95vw] sm:max-w-[600px] bg-black/95">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold text-amber-500 uppercase flex items-center gap-3">
              <Languages className="size-8" />
              Proclamation
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
               <p className="text-sm font-mono text-amber-200 leading-relaxed italic">
                 "আমি কমান্ডারের পক্ষ থেকে ঘোষণা করছি: নূরনেক্সাস সাম্রাজ্য এখন বিশ্বজয়ের জন্য প্রস্তুত। Integrity through Intelligence."
               </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleBroadcast} disabled={broadcasting} className="w-full bg-amber-500 text-amber-foreground font-bold h-14 glow-emerald uppercase tracking-widest text-xs">
              {broadcasting ? <Loader2 className="animate-spin size-4" /> : <Send className="size-4 mr-2" />} Dispatch Globally
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
