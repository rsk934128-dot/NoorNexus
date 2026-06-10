
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
  CheckCircle2, Waves, Eye, Target
} from "lucide-react"
import { useEffect, useState } from "react"
import { ledgerAudit, LedgerAuditOutput } from "@/ai/flows/ledger-audit-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection } from "@/firebase"
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
import { getSystemHealthReport, HealthReport } from "@/services/nexus-bridge"
import { ScrollArea } from "@/components/ui/scroll-area"

const NORA_AGENTS = [
  { id: "Nora-00", name: "Protocol Architect", role: "Strategic Planning", status: "STABLE", icon: Target },
  { id: "Nora-01", name: "Compliance Monitor", role: "Border Security", status: "ACTIVE", icon: ShieldCheck },
  { id: "Nora-02", name: "Merchant Auditor", role: "P2C Payouts", status: "ACTIVE", icon: Building2 },
  { id: "Nora-03", name: "Integration Assistant", role: "SDK Support", status: "STABLE", icon: Code2 },
  { id: "Nora-05", name: "Bridge Architect", role: "Cross-Chain Swap", status: "STABLE", icon: LinkIcon },
  { id: "Nora-06", name: "Identity Registrar", role: "DID Management", status: "ACTIVE", icon: Fingerprint },
  { id: "Nora-07", name: "Senate Strategist", role: "Governance", status: "ACTIVE", icon: Gavel },
  { id: "Nora-08", name: "Executive Agent", role: "Edict Execution", status: "STABLE", icon: Zap },
  { id: "Nora-09", name: "Trade Architect", role: "Inter-Bank Trade", status: "ACTIVE", icon: Landmark },
  { id: "Nora-10", name: "Imperial Arbiter", role: "Dispute Resolution", status: "STABLE", icon: Scale },
  { id: "Nora-11", name: "Imperial Oracle", role: "Precognition", status: "MAX_WISDOM", icon: Compass },
]

export default function Home() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING MISSION 400 CORE...")
  const [auditing, setAuditing] = useState(false)
  const [auditResult, setAuditResult] = useState<LedgerAuditOutput | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [borderFeed, setBorderFeed] = useState<string[]>([])
  
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null)
  const [fetchingHealth, setFetchingHealth] = useState(false)

  const { data: nodes } = useCollection<any>(collection(db, "nodes"))
  const { data: appConnections } = useCollection<any>(collection(db, "app_connections"))
  const { data: proposals } = useCollection<any>(query(collection(db, "proposals"), limit(5)))
  const { data: latestLogs } = useCollection<any>(query(collection(db, "border_logs"), orderBy("timestamp", "desc"), limit(1)))

  useEffect(() => {
    const sequence = [
      { text: "STABILIZING IMPERIAL CORE...", time: 600 },
      { text: "SYNCHRONIZING 11 NORA AGENTS...", time: 1200 },
      { text: "ESTABLISHING TREASURY QUORUM...", time: 1800 },
      { text: "OPENING SOVEREIGN GATEWAYS...", time: 2400 },
      { text: "MISSION 400: THE FINAL SYNTHESIS READY", time: 3000 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "ORACLE_SYNC: Future Drift 0.02%",
        "SENATE_EXECUTIVE: Proposal #42 EXECUTED",
        "CROSS_CHAIN: ETH-Mesh Bridge SECURE",
        "IDENTITY_ATTESTATION: did:noornexus:9a6c22bb",
        "ARBITRATION: Conflict Resolved (BD-AE)",
        "SDK_HEARTBEAT: Rubelpay -> TIER_3"
      ]
      const log = logs[Math.floor(Math.random() * logs.length)]
      setBorderFeed(prev => [log, ...prev].slice(0, 8))
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

  async function handleExecuteAudit() {
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
      toast({ title: "Imperial Audit Synced" })
    } catch (error: any) {
      toast({ title: "Audit Error", variant: "destructive" })
    } finally {
      setAuditing(false)
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 space-y-12 animate-in fade-in duration-1000">
        <SovereignLogo size={180} />
        <div className="space-y-6 text-center max-w-md w-full">
          <h1 className="text-primary font-headline text-4xl sm:text-5xl font-black tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(0,150,255,0.6)]">
            NoorNexus OS
          </h1>
          <p className="text-muted-foreground font-mono text-xs sm:text-sm tracking-[0.5em] uppercase h-6">
            {statusText}
          </p>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary animate-progress shadow-[0_0_15px_rgba(0,150,255,0.8)]" />
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
          {/* Imperial Header */}
          <header className="relative space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                      <Rocket className="size-3 mr-2" /> Mission 400: Complete
                   </Badge>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                      <ShieldCheck className="size-3 mr-2" /> Global Consensus L4
                   </Badge>
                </div>
                <h2 className="text-4xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   The Master <span className="text-primary drop-shadow-[0_0_15px_rgba(0,150,255,0.4)]">Command Center.</span>
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:text-xl leading-relaxed">
                   Unified Sovereignty across <span className="text-white font-mono">11 Nora Agents</span> and <span className="text-white font-mono">42 Distributed Nodes</span>. 
                   Managing absolute liquidity for the Mission 400 Mesh.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="glass-card p-6 rounded-2xl border border-primary/20 flex flex-col items-center min-w-[200px] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Ecosystem Integrity</p>
                    <div className="flex items-center gap-3 relative z-10">
                       <Star className="size-8 text-emerald-500 fill-current animate-pulse" />
                       <span className="text-4xl font-headline font-bold text-white tracking-tighter">99.8%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: '99.8%' }} />
                    </div>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Nora Agent Grid */}
            <div className="lg:col-span-3 space-y-8">
               <section className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <BrainCircuit className="size-4" /> Imperial Neural Link (Nora-1 to Nora-11)
                     </h3>
                     <Badge variant="outline" className="text-[10px] border-white/10 uppercase">All Systems Synchronized</Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                     {NORA_AGENTS.map((agent) => (
                       <Card key={agent.id} className="glass-card hover:border-primary/40 transition-all duration-300 group cursor-default h-full">
                          <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
                             <div className="flex justify-between items-start">
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                   <agent.icon className="size-5 text-primary" />
                                </div>
                                <Badge className={`text-[8px] font-bold ${agent.status === 'MAX_WISDOM' ? 'bg-emerald-500' : 'bg-primary/20 text-primary border-primary/30'}`}>
                                   {agent.status}
                                </Badge>
                             </div>
                             <div className="space-y-0.5">
                                <p className="text-xs font-bold text-white uppercase truncate">{agent.id}: {agent.name}</p>
                                <p className="text-[9px] text-muted-foreground font-mono uppercase truncate">{agent.role}</p>
                             </div>
                             <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary animate-pulse" style={{ width: '100%' }} />
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strategic Intelligence Card */}
                  <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                       <Compass className="size-32 text-emerald-500 animate-spin-slow" />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-headline text-lg uppercase text-emerald-500">
                        <Waves className="size-5" />
                        Oracle Strategic Dispatch
                      </CardTitle>
                      <CardDescription className="text-xs">Mission 400: Project 158 Predictive Policy.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-5 bg-black/60 rounded-2xl border border-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative z-10">
                         <p className="text-sm font-bold text-emerald-100 leading-relaxed italic">
                           "The sovereign mesh is expanding into the SIRAJGANJ corridor. Economic drift has dropped below 0.01%. Recommendation: Accelerate Cross-Chain Bridge to 100% capacity."
                         </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 rounded-xl border border-white/5 bg-white/2">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Global Impact</p>
                            <div className="flex items-end gap-2">
                               <span className="text-2xl font-headline font-bold text-emerald-500">MAX</span>
                               <TrendingUp className="size-4 text-emerald-500 mb-1" />
                            </div>
                         </div>
                         <div className="p-3 rounded-xl border border-white/5 bg-white/2">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Risk Buffer</p>
                            <span className="text-2xl font-headline font-bold text-white">99.4%</span>
                         </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Operational Health Bridge */}
                  <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between">
                       <div>
                          <CardTitle className="flex items-center gap-2 font-headline text-lg uppercase">
                            <Cpu className="size-5 text-primary" />
                            Vault Integrity Audit
                          </CardTitle>
                          <CardDescription className="text-xs">Real-time status via Sovereign Gateway.</CardDescription>
                       </div>
                       <Button variant="ghost" size="icon" onClick={fetchHealth} disabled={fetchingHealth}>
                          <RefreshCcw className={`size-4 text-primary ${fetchingHealth ? 'animate-spin' : ''}`} />
                       </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {healthReport ? (
                         <div className="space-y-6">
                            <div className="flex justify-between items-end">
                               <div className="space-y-1">
                                  <p className="text-4xl font-headline font-bold text-white tracking-tighter">{healthReport.vaultIntegrity}%</p>
                                  <p className="text-[10px] text-primary font-bold uppercase">HMAC_V4_STABLE</p>
                               </div>
                               <div className="text-right">
                                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase h-6">{healthReport.threatLevel}_THREAT</Badge>
                               </div>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-primary shadow-[0_0_10px_rgba(0,150,255,0.8)]" style={{ width: `${healthReport.vaultIntegrity}%` }} />
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                               "{healthReport.reasoning}"
                            </p>
                         </div>
                       ) : (
                         <div className="h-40 flex flex-col items-center justify-center gap-4 opacity-40">
                            <Loader2 className="size-10 animate-spin text-primary" />
                            <p className="text-xs font-mono uppercase">Syncing Bridge...</p>
                         </div>
                       )}
                    </CardContent>
                  </Card>
               </div>
            </div>

            {/* Sidebar Feed & Actions */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 flex flex-col h-[500px]">
                <CardHeader>
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Star className="size-4 text-emerald-500" />
                    Global Consensus Feed
                  </CardTitle>
                  <CardDescription className="text-xs">Live updates from 42 Mesh Nodes.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {borderFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-4 transition-all hover:bg-white/5">
                          <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          <span className="text-muted-foreground truncate leading-none">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-white/5 bg-black/20">
                     <Button 
                       onClick={handleExecuteAudit}
                       disabled={auditing}
                       className="w-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] h-12 glow-primary"
                     >
                        {auditing ? <Loader2 className="animate-spin mr-2 size-4" /> : <ShieldCheck className="size-4 mr-2" />}
                        Audit Global Trust
                     </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[11px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Sovereign Seal
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       The Mission 400 Sovereign OS is now operating at MAX_Consensus. All subsystems are synchronized under your direct command.
                    </p>
                    <div className="pt-2 border-t border-white/5 space-y-2">
                       <div className="flex justify-between text-[9px] font-mono uppercase">
                          <span>Uptime</span>
                          <span className="text-white">100.00%</span>
                       </div>
                       <div className="flex justify-between text-[9px] font-mono uppercase">
                          <span>Sovereignty</span>
                          <span className="text-primary font-bold">ABSOLUTE</span>
                       </div>
                    </div>
                 </CardContent>
              </Card>
              
              <div className="flex justify-center">
                 <SovereignLogo size={100} className="opacity-30 hover:opacity-100 transition-opacity cursor-help" />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Audit Report Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-primary/40 w-[95vw] sm:max-w-[700px] p-0 overflow-hidden bg-black/95">
          <div className="bg-primary/10 border-b border-white/10 p-6 flex items-center gap-4">
             <Star className="size-10 text-emerald-500 fill-current drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
             <div>
                <DialogTitle className="font-headline text-2xl text-white uppercase tracking-tighter">
                   Mission 400: Global Trust Analysis
                </DialogTitle>
                <p className="text-[10px] text-primary uppercase font-bold tracking-widest mt-1">Nora-02-B Treasury Dispatch</p>
             </div>
          </div>
          
          <div className="p-8 space-y-8">
            {auditResult ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">System Trust Score</p>
                    <div className="flex items-center gap-6">
                       <span className="text-6xl font-headline font-bold text-primary tracking-tighter">{auditResult.securityScore}%</span>
                       <div className="space-y-1">
                          <Badge className="bg-emerald-500 h-5 text-[9px] uppercase">L4_GOLD</Badge>
                          <p className="text-[8px] text-muted-foreground font-mono">Status: {auditResult.auditStatus}</p>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-4">Strategic Recommendations</h4>
                     <div className="space-y-3">
                        {auditResult.recommendations.map((rec, i) => (
                           <div key={i} className="flex gap-3 text-xs text-muted-foreground">
                              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                              <span className="leading-tight">{rec}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                </div>
                <div className="bg-black/60 p-6 rounded-2xl border border-white/5 font-mono text-xs leading-relaxed text-muted-foreground italic">
                   "Executive Summary: All 155+ inter-bank corridors are synchronized. Zero drift detected in HMAC_V4 handshakes. The Imperial Treasury is stable and optimized for the next cycle."
                </div>
              </>
            ) : (
              <div className="py-20 text-center space-y-4">
                 <AlertTriangle className="size-16 text-destructive mx-auto animate-pulse" />
                 <p className="text-sm font-mono uppercase text-muted-foreground tracking-widest">Neural Handshake Terminated.</p>
              </div>
            )}
          </div>
          <div className="p-6 bg-white/2 border-t border-white/5">
            <Button onClick={() => setIsDialogOpen(false)} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] h-14 glow-primary text-lg">
              Confirm & Finalize Protocol
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
