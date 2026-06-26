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
  Award,
  Rocket
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
  
  const OFFICIAL_APP_ID = "a085f875-dac3-47ef-83dd-b00d56df81d3"

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
      // 1. Regulatory Audit with App ID
      const audit = await runNeuralAudit({
        appId: OFFICIAL_APP_ID,
        nodeId: activeNode,
        nodeType: 'ASPSP',
        region: "Belgium - Private LIVE",
        consentStatus: "ACTIVE_AIS_PIS_HNW_L4"
      })
      setAuditResult(audit)

      // 2. Autonomy Calibration
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
        title: "Zenith Level Sync Finalized", 
        description: `Application ${OFFICIAL_APP_ID.substring(0, 8)} is verified.` 
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
                   <Rocket className="size-3 mr-2" /> ZENITH MONITORING: ON
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Neural <span className="text-emerald-500">Sentinel.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Zenith Level Traceability." নূরনেক্সাস এখন অফিশিয়াল App ID-এর মাধ্যমে প্রতিটি লেনদেনকে নিউরাল অডিটের আওতায় নিয়ে এসেছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleFullGridSync}
                disabled={loading}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                 Full Grid Zenith Sync
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Zenith Application Monitor Card */}
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                       <Fingerprint className="size-4" /> Zenith Application Monitor
                    </CardTitle>
                    <CardDescription className="text-xs font-mono uppercase tracking-widest">TRACE_ID: {OFFICIAL_APP_ID}</CardDescription>
                  </div>
                  <Badge className="bg-emerald-500 animate-pulse">LIVE_AUDIT</Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                  {[
                    { label: "Handshake Protocol", val: "HMAC_V4", icon: Lock },
                    { label: "Traceability Level", val: "ZENITH", icon: Activity },
                    { label: "Verification Status", val: "PASS", icon: CheckCircle2 },
                    { label: "Ledger Anchor", val: "100%", icon: Database }
                  ].map((stat, i) => (
                    <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1 text-center">
                       <stat.icon className="size-4 text-primary mx-auto mb-2" />
                       <p className="text-[8px] text-muted-foreground uppercase font-bold">{stat.label}</p>
                       <p className="text-xs font-headline font-bold text-white uppercase">{stat.val}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Existing Self-Healing and Scorecard sections... */}
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
                        </CardContent>
                      </Card>
                    )) || (
                      <div className="col-span-2 py-10 text-center opacity-40 border border-dashed border-white/10 rounded-xl">
                        <p className="text-xs font-mono uppercase">Initiate Grid Sync to generate regional scorecard</p>
                      </div>
                    )}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <Scale className="size-4" /> Judicial Traceability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Auth Bridge Sync", val: "100%", color: "text-emerald-500" },
                        { label: "App ID Verification", val: "L4", color: "text-primary" },
                        { label: "Compliance Veracity", val: "99.9%", color: "text-emerald-400" }
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
                       <Clock className="size-3" /> Key Lifecycle Alert
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Next secret rotation for App ID a085f8... scheduled in 15 days. Policy is synchronized with Sovereign Vault (P55)."
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
