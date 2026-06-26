"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Menu, 
  Activity, 
  Zap, 
  Loader2, 
  Scale, 
  Lock, 
  Eye, 
  AlertTriangle,
  History,
  FileCheck,
  TrendingUp,
  Cpu,
  Globe,
  Database,
  Search,
  CheckCircle2,
  ShieldPlus,
  Atom,
  Fingerprint,
  BarChart3,
  RefreshCcw,
  ZapOff,
  Infinity,
  ArrowRightLeft,
  Coins,
  HeartPulse,
  Flame,
  Award
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { runNeuralAudit, NeuralAuditOutput } from "@/ai/flows/neural-audit-flow"
import { runGridAutonomy, GridAutonomyOutput } from "@/ai/flows/sovereign-grid-autonomy-flow"

export default function NeuralAuditPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [auditResult, setAuditResult] = useState<NeuralAuditOutput | null>(null)
  const [autonomyResult, setAutonomyResult] = useState<GridAutonomyOutput | null>(null)
  const [activeNode, setActiveNode] = useState("abn-amro-be-private")
  
  // LIVE Efficiency Stats (Simulated)
  const [liveStats, setLiveStats] = useState({
    latency: 28,
    successRate: 100.0,
    activeNodes: 15,
    status: "STABLE",
    failoverStatus: "ARMED",
    selfHealingStatus: "OPTIMAL"
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * (42 - 24) + 24),
        successRate: Math.random() > 0.99 ? 99.9 : 100.0
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleFullGridSync = async () => {
    setLoading(true)
    try {
      // 1. Regulatory Audit
      const audit = await runNeuralAudit({
        nodeId: activeNode,
        nodeType: 'ASPSP',
        region: "Belgium - Private LIVE",
        consentStatus: "ACTIVE_AIS_PIS_HNW_L4"
      })
      setAuditResult(audit)

      // 2. Autonomy Calibration (Smart Settlement + Self Healing + Scorecard)
      const autonomy = await runGridAutonomy({
        region: "Global Mesh Corridor",
        detectedRegulatoryChange: "New Sovereign Autonomy Protocol #54 established.",
        currentGatewayConfig: { active_nodes: 15, self_healing: true },
        nodePerformanceData: [
          { nodeId: "BENELUX-CORE", latency: 28, uptime: 100, roi: 92 },
          { nodeId: "IBERIAN-BRIDGE", latency: 42, uptime: 99.9, roi: 88 }
        ],
        transactionContext: {
          volume: 1200000,
          type: 'CORPORATE_ASSET',
          urgency: 'HIGH'
        }
      })
      setAutonomyResult(autonomy)

      toast({ 
        title: "Project #54 Finalized", 
        description: "Self-Healing Protocol and Efficiency Scorecard calibrated." 
      })
    } catch (e: any) {
      toast({ title: "Sync Error", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Infinity className="size-3 mr-2" /> Phase ΩΩ: Global Autonomy
                 </Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <HeartPulse className="size-3 mr-2" /> SELF-HEALING ARMED
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-emerald-500">Sentinel.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Project #54: Sovereign Grid Autonomy." নূরনেক্সাস এখন ১৫টি নোডের মধ্যে ট্রাফিক অটো-হিল করছে এবং আঞ্চলিক দক্ষতার স্কোরকার্ড বিশ্লেষণ করছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleFullGridSync}
                disabled={loading}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                 Recalibrate Grid Torque
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Regional Efficiency Scorecard */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Award className="size-4" /> Sovereign Efficiency Scorecard
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {autonomyResult?.efficiencyScorecard.map((s, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-primary/30 transition-all">
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-center">
                              <p className="text-lg font-headline font-bold text-white uppercase tracking-widest">{s.corridor}</p>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none">{s.stabilityRating}</Badge>
                           </div>
                           <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono">
                                 <span className="uppercase text-muted-foreground">Efficiency Index</span>
                                 <span className="text-emerald-500 font-bold">{s.efficiencyScore}%</span>
                              </div>
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500" style={{ width: `${s.efficiencyScore}%` }} />
                              </div>
                           </div>
                           <div className="flex justify-between items-center pt-2">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">Economic Return</p>
                              <p className="text-xs font-mono text-primary font-bold">{s.economicReturn}</p>
                           </div>
                        </CardContent>
                      </Card>
                    )) || (
                      <div className="col-span-2 py-10 text-center opacity-40 border border-dashed border-white/10 rounded-xl">
                        <p className="text-xs font-mono uppercase">Initiate Grid Sync to generate regional scorecard</p>
                      </div>
                    )}
                 </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Self-Healing Protocol Panel */}
                <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                       <HeartPulse className="size-4" /> Self-Healing Sentinel
                    </CardTitle>
                    <CardDescription>Autonomous Connectivity Recovery (P54.2)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {autonomyResult ? (
                      <div className="space-y-6 animate-in fade-in slide-in-from-left-2">
                         <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-4">
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] text-muted-foreground uppercase font-bold">Protocol Status</span>
                               <Badge className="bg-emerald-500">{autonomyResult.selfHealingStatus.active ? 'HEALING_ACTIVE' : 'STANDBY_OPTIMAL'}</Badge>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[8px] text-muted-foreground uppercase font-bold">Recovered Nodes</p>
                               <div className="flex flex-wrap gap-1">
                                  {autonomyResult.selfHealingStatus.recoveredNodes.map((n, i) => (
                                    <Badge key={i} variant="outline" className="text-[7px] border-emerald-500/30 text-emerald-500 uppercase">{n}</Badge>
                                  ))}
                                  {autonomyResult.selfHealingStatus.recoveredNodes.length === 0 && <span className="text-[9px] text-white">None (Stability MAX)</span>}
                               </div>
                            </div>
                         </div>
                         <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Autonomous Statement</p>
                            <p className="text-xs text-white leading-relaxed italic">"{autonomyResult.noraReasoning}"</p>
                         </div>
                      </div>
                    ) : (
                      <div className="h-[200px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                         <Activity className="size-12 text-emerald-500 animate-pulse" />
                         <p className="text-xs font-mono uppercase tracking-widest">Awaiting Sentinel Calibration</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Smart Routing ROI UI */}
                <Card className={`glass-card border-t-4 transition-all duration-500 ${autonomyResult ? 'border-t-primary' : 'border-t-muted'}`}>
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                       <TrendingUp className="size-4" /> Economic Drift Shield
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {autonomyResult ? (
                      <div className="space-y-6 animate-in fade-in zoom-in-95">
                         <div className="space-y-2">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Fee Savings</p>
                            <p className="text-3xl font-headline font-bold text-emerald-500">{autonomyResult.estimatedSavings || "$12,450.00"}</p>
                         </div>
                         <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                            <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Autonomy Decision Hash</p>
                            <code className="text-[9px] font-mono text-primary break-all">{autonomyResult.autonomyHash}</code>
                         </div>
                         <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase">
                            <CheckCircle2 className="size-3" /> Anchored to One Engine Ledger
                         </div>
                      </div>
                    ) : (
                      <div className="h-[200px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                         <Lock className="size-12 text-primary" />
                         <p className="text-xs font-mono uppercase tracking-widest">Awaiting ROI Analysis</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <Scale className="size-4" /> Grid Accountability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Corridor Sync", val: "100%", color: "text-emerald-500" },
                        { label: "Self-Healing Index", val: "MAX", color: "text-primary" },
                        { label: "Stability Veracity", val: "99.9%", color: "text-emerald-400" }
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                           <span className="text-[10px] text-muted-foreground uppercase font-bold">{s.label}</span>
                           <span className={`text-[10px] font-mono font-bold ${s.color}`}>{s.val}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <Flame className="size-3" /> Fail-Safe Activation
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "If a regional rail collapses, Nora-54 executes smart re-routing in &lt; 120ms. The Efficiency Scorecard ensures we always choose the most stable alternative."
                    </p>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
