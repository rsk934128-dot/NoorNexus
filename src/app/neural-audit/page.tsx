
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
  ArrowRightLeft
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { runNeuralAudit, NeuralAuditOutput } from "@/ai/flows/neural-audit-flow"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function NeuralAuditPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [auditResult, setAuditResult] = useState<NeuralAuditOutput | null>(null)
  const [activeNode, setActiveNode] = useState("abn-amro-nl")
  
  // LIVE Efficiency Stats (Simulated)
  const [liveStats, setLiveStats] = useState({
    latency: 32,
    successRate: 100.0,
    uptime: "99.99%",
    status: "STABLE",
    failoverStatus: "ARMED"
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
        region: "Global Mesh - LIVE",
        consentStatus: "ACTIVE_AIS_PIS_SCOPE_L4_LIVE"
      })
      setAuditResult(result)
      toast({ title: "Neural Audit Finalized", description: "Grid compliance synchronized." })
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
                   <Infinity className="size-3 mr-2" /> Project #54: Grid Autonomy
                 </Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Zap className="size-3 mr-2" /> FAIL-OVER ARMED
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Compliance <span className="text-emerald-500">Sentinel.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project #52 & #54: Real-time Compliance & Grid Autonomy. Nora-52 and Nora-54 ensure 100% legal veracity and fail-safe regional immunity.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Grid Immunity</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">PERPETUAL</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* LIVE Efficiency Monitor */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <BarChart3 className="size-4" /> Global Grid Pulse (13 LIVE Nodes)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: "Node Latency", value: `${liveStats.latency}ms`, trend: "OPTIMAL", icon: Activity, color: "text-emerald-500" },
                      { label: "Success Rate", value: `${liveStats.successRate}%`, trend: "VERIFIED", icon: CheckCircle2, color: "text-primary" },
                      { label: "Fail-over Status", value: liveStats.failoverStatus, trend: "READY", icon: Zap, color: "text-amber-500" },
                      { label: "Grid Anomaly", value: "ZERO", trend: "CLEAR", icon: ShieldCheck, color: "text-emerald-500" },
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
                       <Atom className="size-4" /> Autonomy Configuration
                    </CardTitle>
                    <CardDescription>Target: Global Grid Expansion (P54)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Active LIVE Node</p>
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
                       Execute Neural Sync (LIVE)
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {auditResult ? (
                    <Card className={`glass-card border-t-4 transition-all duration-500 ${auditResult.complianceScore >= 95 ? 'border-t-emerald-500' : 'border-t-destructive'}`}>
                       <CardHeader>
                          <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                             <CheckCircle2 className="size-4" /> Nora-52/54 Dispatch
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-6">
                          <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                <p className="text-[9px] text-muted-foreground uppercase font-bold">Autonomy Compliance</p>
                                <p className="text-3xl font-headline font-bold text-white">{auditResult.complianceScore}%</p>
                             </div>
                             <Badge className={auditResult.privacyRiskLevel === 'Low' ? 'bg-emerald-500' : 'bg-destructive'}>
                                {auditResult.privacyRiskLevel} Risk
                             </Badge>
                          </div>
                          <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                             <p className="text-[10px] font-bold text-primary uppercase">Autonomy Reasoning</p>
                             <p className="text-xs text-white leading-relaxed italic">"{auditResult.tacticalAction}"</p>
                          </div>
                       </CardContent>
                    </Card>
                  ) : (
                    <Card className="glass-card flex flex-col items-center justify-center py-20 gap-4 border-dashed opacity-40 h-full">
                       <Eye className="size-12 text-primary animate-pulse" />
                       <p className="text-xs font-mono uppercase tracking-widest text-center leading-relaxed">
                          Await Autonomy Dispatch.<br/>Monitoring SE Asia & EU Rails.
                       </p>
                    </Card>
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* Load Balancer Mini-status */}
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ArrowRightLeft className="size-4" /> Regional Balancing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Active Fail-overs", val: "0", color: "text-emerald-500" },
                        { label: "Load Variance", val: "4.2%", color: "text-primary" },
                        { label: "Self-Evolution", status: "ACTIVE", color: "text-emerald-500" }
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
                       <ZapOff className="size-3" /> Anomaly Protection
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Regional rail collapse protection is ARMED. Traffic will automatically bypass SE Asia failures via European nodes."
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
