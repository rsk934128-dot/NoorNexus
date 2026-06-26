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
  ZapOff
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { runNeuralAudit, NeuralAuditOutput } from "@/ai/flows/neural-audit-flow"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function NeuralAuditPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [auditResult, setAuditResult] = useState<NeuralAuditOutput | null>(null)
  const [activeNode, setActiveNode] = useState("banco-de-investimento-global-espanha-sa")
  
  // LIVE Efficiency Stats (Simulated)
  const [liveStats, setLiveStats] = useState({
    latency: 32,
    successRate: 100.0,
    uptime: "99.99%",
    status: "STABLE"
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * (45 - 28) + 28),
        successRate: Math.random() > 0.99 ? 99.8 : 100.0
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleRunAudit = async () => {
    setLoading(true)
    setAuditResult(null)
    try {
      const result = await runNeuralAudit({
        nodeId: activeNode,
        nodeType: 'ASPSP',
        region: "EU (Spain/Portugal) - LIVE",
        consentStatus: "ACTIVE_AIS_PIS_SCOPE_L4_LIVE"
      })
      setAuditResult(result)
      toast({ title: "Neural Audit Finalized", description: "LIVE node compliance status updated." })
    } catch (e: any) {
      toast({ title: "Audit Link Error", description: e.message, variant: "destructive" })
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
                   <Scale className="size-3 mr-2" /> Project #52: Neural Audit
                 </Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Zap className="size-3 mr-2" /> LIVE MONITORING
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Compliance <span className="text-emerald-500">Sentinel.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project #52: Real-time Node Auditing. Nora-52 monitors **LIVE** banking nodes for PSD2/GDPR adherence and operational efficiency.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Grid Compliance</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">100.0%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* LIVE Efficiency Monitor */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <BarChart3 className="size-4" /> Live Efficiency Monitor (BIG Espanha)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: "Node Latency", value: `${liveStats.latency}ms`, trend: "OPTIMAL", icon: Activity, color: "text-emerald-500" },
                      { label: "Success Rate", value: `${liveStats.successRate}%`, trend: "VERIFIED", icon: CheckCircle2, color: "text-primary" },
                      { label: "Uptime (24h)", value: liveStats.uptime, trend: "MAX", icon: Zap, color: "text-amber-500" },
                      { label: "Anomalies", value: "0", trend: "CLEAR", icon: ShieldCheck, color: "text-emerald-500" },
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
                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                       <Atom className="size-4" /> Audit Configuration
                    </CardTitle>
                    <CardDescription>Target: LIVE Iberian Corridor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Target LIVE Node</p>
                       <div className="p-3 bg-white/5 rounded border border-white/5 font-mono text-[10px] text-white flex justify-between items-center">
                          <span>{activeNode}</span>
                          <Badge className="bg-emerald-500 text-[8px]">LIVE</Badge>
                       </div>
                    </div>
                    <Button 
                      onClick={handleRunAudit} 
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    >
                       {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                       Execute Neural Audit (LIVE)
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {auditResult ? (
                    <Card className={`glass-card border-t-4 transition-all duration-500 ${auditResult.complianceScore >= 95 ? 'border-t-emerald-500' : 'border-t-destructive'}`}>
                       <CardHeader>
                          <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                             <CheckCircle2 className="size-4" /> Nora-52 Verdict
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-6">
                          <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                <p className="text-[9px] text-muted-foreground uppercase font-bold">LIVE Compliance Score</p>
                                <p className="text-3xl font-headline font-bold text-white">{auditResult.complianceScore}%</p>
                             </div>
                             <Badge className={auditResult.privacyRiskLevel === 'Low' ? 'bg-emerald-500' : 'bg-destructive'}>
                                {auditResult.privacyRiskLevel} Risk
                             </Badge>
                          </div>
                          <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                             <p className="text-[10px] font-bold text-primary uppercase">Tactical Action</p>
                             <p className="text-xs text-white leading-relaxed italic">"{auditResult.tacticalAction}"</p>
                          </div>
                       </CardContent>
                    </Card>
                  ) : (
                    <Card className="glass-card flex flex-col items-center justify-center py-20 gap-4 border-dashed opacity-40">
                       <Eye className="size-12 text-primary animate-pulse" />
                       <p className="text-xs font-mono uppercase tracking-widest text-center leading-relaxed">
                          Await LIVE Audit Dispatch.<br/>Monitoring Iberian Handshakes.
                       </p>
                    </Card>
                  )}
                </div>
              </section>

              {auditResult && (
                 <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <History className="size-4" /> LIVE Regulatory Ledger
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {auditResult.regulatoryVerdicts.map((v, i) => (
                         <Card key={i} className="glass-card bg-black/40 border-white/5">
                            <CardContent className="p-4 space-y-3">
                               <div className="flex justify-between items-center">
                                  <p className="text-xs font-bold text-white uppercase">{v.regulation}</p>
                                  <Badge variant="outline" className={`text-[8px] ${v.status === 'COMPLIANT' ? 'border-emerald-500 text-emerald-500' : 'border-destructive text-destructive'}`}>
                                     {v.status}
                                  </Badge>
                               </div>
                               <p className="text-[10px] text-muted-foreground italic leading-relaxed">"{v.reasoning}"</p>
                            </CardContent>
                         </Card>
                       ))}
                    </div>
                 </section>
              )}
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ShieldPlus className="size-4" /> Real-time Sentinel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Active LIVE Audits", val: "1 Node", color: "text-emerald-500" },
                        { label: "Grid Veracity", val: "100.0%", color: "text-primary" },
                        { label: "Anomaly Detection", status: "ACTIVE", color: "text-emerald-500" }
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                           <span className="text-[10px] text-muted-foreground uppercase font-bold">{s.label}</span>
                           <span className={`text-[10px] font-mono font-bold ${s.color}`}>{s.val || s.status}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ZapOff className="size-3" /> Anomaly Response
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Automatic node isolation is set at 1500ms latency drift. Grid stabilization protocol is ARMED."
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
