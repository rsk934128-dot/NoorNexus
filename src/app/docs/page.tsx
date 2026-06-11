
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Zap, 
  Loader2, 
  Menu, 
  ShieldCheck, 
  Layers, 
  ShieldHalf,
  Database,
  Network,
  Globe,
  Handshake,
  Workflow,
  Coins,
  FileText,
  Briefcase,
  Scale,
  Award,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Rocket,
  Activity,
  History,
  TrendingUp,
  BarChart3,
  Target,
  Landmark,
  Code2
} from "lucide-react"
import { analyzeProtocol, ProtocolArchitectOutput } from "@/ai/flows/protocol-architect-flow"
import { useToast } from "@/hooks/use-toast"

export default function DocsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<ProtocolArchitectOutput | null>(null)

  async function runArchitect() {
    setLoading(true)
    try {
      const result = await analyzeProtocol({
        currentFocus: "Phase ΩΩΩΩ: PMF & Institutional Value",
        context: "Executing the Wedge Strategy: Governance + Trust + Audit for the first 10 paying partners.",
        history: ["Phase ΩΩΩ Complete", "Revenue Model Validated", "Beachhead Market Identified"]
      })
      setAnalysis(result)
      toast({ title: "PMF Strategy Synchronized" })
    } catch (e: any) {
      toast({ title: "Neural Handshake Failed", description: e.message, variant: "destructive" })
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
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5 text-[10px]">
                   <Target className="size-3 mr-2" /> PMF Strategic Roadmap
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Value <span className="text-primary">Sprint.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Phase ΩΩΩΩ: 90-Day Sprint to 10 Paying Partners. Executing the Wedge Strategy across Governance, Trust, and Audit domains.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <TrendingUp className="size-4" />}
              Audit PMF Strategy
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Target className="size-4" /> The Beachhead Wedge Strategy
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { wedge: "Governance", focus: "Decision Tracking", items: ["Audit Trails", "Role Logic", "Veto Paths"] },
                      { wedge: "Audit", focus: "Forensic Integrity", items: ["Ledger Sync", "HMAC_V4 Proofs", "Risk Scoring"] },
                      { wedge: "Trust", focus: "Reputation Assets", items: ["DID Attestation", "Relation Mapping", "Trust Scores"] }
                    ].map((w, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-primary/5 group">
                        <CardContent className="p-6 space-y-4">
                           <p className="text-xs font-bold text-white uppercase">{w.wedge}</p>
                           <p className="text-[10px] font-headline font-bold text-primary uppercase">{w.focus}</p>
                           <ul className="space-y-1">
                              {w.items.map((item, j) => (
                                <li key={j} className="text-[9px] text-muted-foreground flex items-center gap-2 italic">
                                   <CheckCircle2 className="size-2 text-emerald-500" /> {item}
                                </li>
                              ))}
                           </ul>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                  <BarChart3 className="size-4" /> Founder Scorecard KPIs
                </h3>
                <Card className="glass-card border-emerald-500/20 bg-emerald-500/5 overflow-hidden">
                   <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                         {[
                           { kpi: "Paying Partners", target: "10" },
                           { kpi: "MRR Growth", target: "Rising" },
                           { kpi: "Trust Velocity", target: "Positive" },
                           { kpi: "Pilot Conv.", target: ">50%" },
                           { kpi: "Retention", target: ">90%" }
                         ].map((rev, i) => (
                           <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-1">
                              <p className="text-[9px] font-bold text-primary uppercase">{rev.kpi}</p>
                              <p className="text-xs font-headline font-bold text-white">{rev.target}</p>
                           </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <FileCheck className="size-4" /> The 3 Institutional Proofs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                     { label: "Technical Proof", desc: "System Works.", status: "VERIFIED" },
                     { label: "Economic Proof", desc: "Someone Pays.", status: "IN_PROGRESS" },
                     { label: "Institutional Proof", desc: "Someone Depends.", status: "PIPELINE" }
                   ].map((item, i) => (
                     <div key={i} className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
                        <p className="text-[10px] font-bold text-white uppercase">{item.label}</p>
                        <p className="text-[9px] text-muted-foreground italic">"{item.desc}"</p>
                        <Badge variant="outline" className="text-[7px] border-amber-500/30 text-amber-500 font-mono">{item.status}</Badge>
                     </div>
                   ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Rocket className="size-4" /> Dependence Index
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">1/10</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">Paying Institutional Partners</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Product-Market Fit starts the day an institution cannot function without NoorNexus."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Target className="size-4" /> Wedge Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Don't build everything. Solve the Governance and Audit pain better than anyone else."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Briefcase className="size-4" /> Beachhead Markets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                     {[
                       { label: "Educational", val: "PILOT_01_ACTIVE" },
                       { label: "Financial", val: "DISCUSSION" },
                       { label: "Community", val: "PIPELINE" }
                     ].map((p, i) => (
                       <div key={i} className="flex justify-between text-[9px] font-mono">
                          <span className="text-white uppercase">{p.label}</span>
                          <span className="text-amber-500">{p.val}</span>
                       </div>
                     ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
