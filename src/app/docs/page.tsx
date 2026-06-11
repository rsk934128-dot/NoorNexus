
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
  BarChart3
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
        currentFocus: "Phase ΩΩΩ: Execution & Revenue Validation",
        context: "Validating recurring revenue streams and pilot partner success metrics.",
        history: ["Phase ΩΩ Complete", "Partnership Kits Ready", "Market Validation Initiated"]
      })
      setAnalysis(result)
      toast({ title: "Execution Strategy Updated" })
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
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-[10px]">
                   <Rocket className="size-3 mr-2" /> Execution Roadmap
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Execution <span className="text-primary">Sprint.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Phase ΩΩΩ: 90-Day Execution Sprint. Moving from Integration-Ready to Revenue-Validated and Institutional Scale.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <TrendingUp className="size-4" />}
              Audit Execution Strategy
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <History className="size-4" /> 90-Day Execution Roadmap
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { month: "Month 1", focus: "Partnership Outreach", items: ["Security Review", "Pilot Recruitment", "NDA Signings"] },
                      { month: "Month 2", focus: "Sandbox Testing", items: ["First Integrations", "Case Study Generation", "SDK Hardening"] },
                      { month: "Month 3", focus: "Revenue Validation", items: ["Production Rollout", "Public Credibility Assets", "First Revenue Flow"] }
                    ].map((sprint, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-primary/5 group">
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-start">
                              <p className="text-xs font-bold text-white uppercase">{sprint.month}</p>
                              <Badge className="bg-primary/20 text-primary border-none text-[8px]">ACTIVE</Badge>
                           </div>
                           <p className="text-[10px] font-headline font-bold text-primary uppercase">{sprint.focus}</p>
                           <ul className="space-y-1">
                              {sprint.items.map((item, j) => (
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
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <BarChart3 className="size-4" /> Institutional Revenue Matrix
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 overflow-hidden">
                   <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         {[
                           { model: "Subscription", base: "$500/mo", target: "Institutions" },
                           { model: "Transaction", base: "0.1%", target: "Commerce" },
                           { model: "Enterprise", base: "Custom", target: "Sovereign" },
                           { model: "API Access", base: "$200/yr", target: "Developers" }
                         ].map((rev, i) => (
                           <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-1">
                              <p className="text-[9px] font-bold text-primary uppercase">{rev.model}</p>
                              <p className="text-xs font-headline font-bold text-white">{rev.base}</p>
                              <p className="text-[7px] text-muted-foreground uppercase">{rev.target}</p>
                           </div>
                         ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center mt-6 italic">
                        "Revenue is the ultimate validator of institutional trust."
                      </p>
                   </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                  <FileCheck className="size-4" /> Independent Validation Pack
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { label: "Pentest L4", status: "SCHEDULED", icon: ShieldCheck },
                     { label: "Governance Audit", status: "COMPLETE", icon: Scale },
                     { label: "Treasury Review", status: "IN_REVIEW", icon: Landmark },
                     { label: "SDK Cert", status: "READY", icon: Code2 }
                   ].map((item, i) => (
                     <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <item.icon className="size-4 text-emerald-500" />
                           <p className="text-[10px] font-bold text-white uppercase">{item.label}</p>
                        </div>
                        <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-500 font-mono">{item.status}</Badge>
                     </div>
                   ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> Trust Velocity KPI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">+14.2%</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">Growth in Institutional Trust</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Trust Velocity measures the monthly expansion of verifiable institutional relationships within the mesh."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Target className="size-4" /> Execution Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Technology + Trust + Execution = Institution. কোড নয়, ফলাফলই আমাদের শ্রেষ্ঠত্বের পরিচয়।"
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Briefcase className="size-4" /> First 10 Partners
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                     {[
                       { label: "Edu Pilot 01", val: "ACTIVE" },
                       { label: "Biz Pilot 01", val: "READY" },
                       { label: "Fin Pilot 01", val: "PIPELINE" }
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
