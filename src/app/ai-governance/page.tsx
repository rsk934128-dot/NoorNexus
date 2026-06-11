
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BrainCircuit, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Menu, 
  Lock, 
  Cpu, 
  Eye, 
  AlertTriangle,
  History,
  FileCheck,
  TrendingUp,
  Fingerprint,
  ShieldHalf,
  Database,
  LockKeyhole,
  Network,
  Users
} from "lucide-react"

const AI_REGISTRY = [
  { name: "Nora-00", role: "Protocol Architect", alignment: 99.8, risk: "Low", status: "Audited", scope: "Architecture Only", permissions: ["Read", "Audit"] },
  { name: "Nora-01", role: "Compliance Monitor", alignment: 100, risk: "None", status: "Stable", scope: "Border Security", permissions: ["Read", "Write", "Isolate"] },
  { name: "Nora-07", role: "Senate Strategist", alignment: 98.5, risk: "Medium", status: "Active", scope: "Simulation Pass", permissions: ["Read", "Recommend"] },
  { name: "Nora-11", role: "Imperial Oracle", alignment: 96.2, risk: "High", status: "Continuous", scope: "Prediction Engine", permissions: ["Read", "Audit"] },
]

export default function AiGovernancePage() {
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
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <BrainCircuit className="size-3 mr-2" /> AI Containment Framework
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                AI <span className="text-primary">Governance.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 164: Meta-Governance Audit. Ensuring every Nora-AI agent operates within Constitutional Scope and Risk Ceilings.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Human Stewardship</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">ACTIVE</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Cpu className="size-4" /> AI Registry & Permission Matrix
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {AI_REGISTRY.map((ai, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all">
                        <CardContent className="p-6">
                           <div className="flex flex-col md:flex-row justify-between gap-6">
                              <div className="flex gap-4">
                                 <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                    <LockKeyhole className="size-6 text-primary" />
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-lg font-bold text-white uppercase">{ai.name}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{ai.role}</p>
                                    <p className="text-[9px] text-primary/60 uppercase font-bold">SCOPE: {ai.scope}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                       {ai.permissions.map((p, j) => (
                                         <Badge key={j} variant="secondary" className="text-[8px] bg-primary/10 text-primary uppercase font-bold">{p}</Badge>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                              <div className="flex gap-8 items-center justify-between md:justify-end">
                                 <div className="text-center space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Alignment</p>
                                    <p className="text-lg font-headline font-bold text-emerald-500">{ai.alignment}%</p>
                                 </div>
                                 <div className="text-center space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Risk Ceiling</p>
                                    <Badge className={ai.risk === 'None' ? 'bg-emerald-500' : ai.risk === 'Low' ? 'bg-primary' : 'bg-amber-500'}>{ai.risk}</Badge>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <ShieldHalf className="size-5" /> Stewardship Rules (Founder Independence)
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { rule: "Zero Constitutional Write-Access", status: "ENFORCED" },
                         { rule: "Multi-sig Steward Verification", status: "ENFORCED" },
                         { rule: "Risk Ceiling Dynamic Cap", status: "STABLE" },
                         { rule: "Founder Override Limited (Art II)", status: "ACTIVE" }
                       ].map((r, i) => (
                         <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center">
                            <span className="text-[10px] text-white font-bold uppercase">{r.rule}</span>
                            <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 uppercase">{r.status}</Badge>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Stewardship Observatory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    "AI agents possess no legal personhood. All autonomous actions are audited by the Meta-Governance layer every Cycle."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                       <span className="text-muted-foreground uppercase">AI Feedback Immunity</span>
                       <span className="text-emerald-500 font-bold uppercase">MAX</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-emerald-500">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-emerald-500 tracking-widest flex items-center gap-2">
                       <Users className="size-4" /> Delegation Framework
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Emergency Steward Quorum</span>
                          <span className="text-emerald-500">READY</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic">
                       Continuity protocol enabled. Mass failure recovery time: &lt; 5s.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Users className="size-4" /> External Trust Sync
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase">Trust Federation Status</p>
                       <Badge className="bg-primary/20 text-primary border-none text-[8px]">SYNCHRONIZED</Badge>
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
