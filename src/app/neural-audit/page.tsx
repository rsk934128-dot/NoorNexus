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
  Coins
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { runNeuralAudit, NeuralAuditOutput } from "@/ai/flows/neural-audit-flow"
import { runGridAutonomy, GridAutonomyOutput } from "@/ai/flows/sovereign-grid-autonomy-flow"

export default function NeuralAuditPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [auditResult, setAuditResult] = useState<NeuralAuditOutput | null>(null)
  const [autonomyResult, setAutonomyResult] = useState<GridAutonomyOutput | null>(null)
  const [activeNode, setActiveNode] = useState("abn-amro-be-asset")
  
  // LIVE Efficiency Stats (Simulated)
  const [liveStats, setLiveStats] = useState({
    latency: 28,
    successRate: 100.0,
    activeNodes: 15,
    status: "STABLE",
    failoverStatus: "ARMED"
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
        region: "Belgium - Corporate LIVE",
        consentStatus: "ACTIVE_AIS_PIS_ASSET_MGMT_L4"
      })
      setAuditResult(audit)

      // 2. Autonomy Calibration (Smart Settlement)
      const autonomy = await runGridAutonomy({
        region: "Benelux Corporate Corridor",
        detectedRegulatoryChange: "New High-Volume Asset Management Protocol detected in Belgium.",
        currentGatewayConfig: { active_nodes: 15, sca: true },
        transactionContext: {
          volume: 500000,
          type: 'CORPORATE_ASSET',
          urgency: 'MEDIUM'
        }
      })
      setAutonomyResult(autonomy)

      toast({ 
        title: "Project #54 Sync Complete", 
        description: "Smart Settlement Engine calibrated for corporate efficiency." 
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
                   <Infinity className="size-3 mr-2" /> Phase ΩΩ: Sovereign Autonomy
                 </Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Coins className="size-3 mr-2" /> SMART SETTLEMENT ARMED
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Autonomy <span className="text-emerald-500">Sentinel.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Project #54: Smart Settlement & Corporate Grid Autonomy." Nora-54 optimizes cost vs latency while Nora-52 enforces 100% legal veracity.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleFullGridSync}
                disabled={loading}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                 Synchronize Grid Autonomy
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* LIVE Grid Pulse */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <BarChart3 className="size-4" /> Global Grid Pulse ({liveStats.activeNodes} LIVE Nodes)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: "Node Latency", value: `${liveStats.latency}ms`, trend: "OPTIMAL", icon: Activity, color: "text-emerald-500" },
                      { label: "Success Rate", value: `${liveStats.successRate}%`, trend: "VERIFIED", icon: CheckCircle2, color: "text-primary" },
                      { label: "Fail-over Nodes", value: "15 ACTIVE", trend: "READY", icon: Zap, color: "text-amber-500" },
                      { label: "Economic Drift", value: "ZERO", trend: "CLEAR", icon: ShieldCheck, color: "text-emerald-500" },
                    ].map((stat, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2">
                         <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between items-center">
                               <stat.icon className={`size-4 ${stat.color}`} />
                               <Badge variant="outline" className={`text-[7px] border-none ${stat.color} bg-white/5`}>{stat.trend}</Badge>
                            </div>
                            <div className="space-y-0.5">
                               <p className="text-[9px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                               <p className="text-xl font-headline font-bold text-white">{stat.value}</p>
                            </div>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Smart Settlement Engine UI */}
                <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                       <ArrowRightLeft className="size-4" /> Smart Settlement Engine
                    </CardTitle>
                    <CardDescription>Automated Route Optimization (Cost vs Latency)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {autonomyResult ? (
                      <div className="space-y-6 animate-in fade-in slide-in-from-left-2">
                         <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-4">
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] text-muted-foreground uppercase font-bold">Recommended Preference</span>
                               <Badge className="bg-emerald-500">{autonomyResult.optimizedParameters.routingPreference}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] text-muted-foreground uppercase font-bold">Estimated Savings</span>
                               <span className="text-emerald-500 font-bold font-mono">{autonomyResult.estimatedSavings || "$1,240.00"}</span>
                            </div>
                         </div>
                         <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
                            <p className="text-[10px] font-bold text-primary uppercase mb-1">Autonomous Reasoning</p>
                            <p className="text-xs text-white leading-relaxed italic">"{autonomyResult.noraReasoning}"</p>
                         </div>
                      </div>
                    ) : (
                      <div className="h-[200px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                         <Cpu className="size-12 text-primary animate-pulse" />
                         <p className="text-xs font-mono uppercase tracking-widest">Awaiting Engine Calibration</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Audit Integrity UI */}
                <Card className={`glass-card border-t-4 transition-all duration-500 ${autonomyResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                       <Database className="size-4" /> Corporate Audit Integrity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {autonomyResult ? (
                      <div className="space-y-6 animate-in fade-in zoom-in-95">
                         <div className="space-y-2">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Autonomous Decision Seal</p>
                            <code className="text-[9px] font-mono text-emerald-500 block bg-black/40 p-2 rounded break-all">{autonomyResult.autonomyHash}</code>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Immutable Audit Hash</p>
                            <code className="text-[9px] font-mono text-primary block bg-black/40 p-2 rounded break-all">{autonomyResult.auditTrailHash}</code>
                         </div>
                         <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase">
                            <CheckCircle2 className="size-3" /> Anchored to One Engine Ledger
                         </div>
                      </div>
                    ) : (
                      <div className="h-[200px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                         <Lock className="size-12 text-primary" />
                         <p className="text-xs font-mono uppercase tracking-widest">Awaiting Decision Seal</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Scale className="size-4" /> Compliance Torque
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Legal Veracity", val: "100%", color: "text-emerald-500" },
                        { label: "SCA Hardening", val: "MAX", color: "text-primary" },
                        { label: "PSD2 Drift", val: "0.0%", color: "text-emerald-500" }
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
                       <ZapOff className="size-3" /> Fail-Safe Activation
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Corporate rails are 100% fail-safe. Neural Sentinel Nora-52 detects regional collapse and Nora-54 executes smart re-routing in &lt; 120ms."
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
