
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
  Users,
  Target,
  Waves,
  Lightbulb,
  Unlock
} from "lucide-react"

const AI_REGISTRY = [
  { name: "Nora-00", role: "Protocol Architect", alignment: 99.8, consequence: "High", risk: "Low", status: "Audited", scope: "Architecture Only", permissions: ["Read", "Audit"] },
  { name: "Nora-01", role: "Compliance Monitor", alignment: 100, consequence: "Critical", risk: "None", status: "Stable", scope: "Border Security", permissions: ["Read", "Write", "Isolate"] },
  { name: "Nora-Assumpta", role: "Assumption Auditor", alignment: 96.4, consequence: "Medium", risk: "Medium", status: "Active", scope: "Anti-Blindness", permissions: ["Read", "Challenge"] },
  { name: "Nora-11", role: "Imperial Oracle", alignment: 96.2, consequence: "Critical", risk: "High", status: "Continuous", scope: "Prediction Engine", permissions: ["Read", "Audit"] },
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Unlock className="size-3 mr-2" /> Phase Ω: Public Reality AI
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                AI <span className="text-emerald-500">Humility.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Auditing the Auditors." Preventing institutional blindness by assigning AI agents specifically to challenge our internal data, success metrics, and assumptions.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Self-Correction Torque</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">MAX</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Cpu className="size-4" /> AI Consequence & Humility Matrix
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {AI_REGISTRY.map((ai, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-emerald-500/20 transition-all relative">
                        {ai.name === 'Nora-Assumpta' && (
                          <div className="absolute top-0 right-0 p-2">
                             <Badge className="bg-amber-500/20 text-amber-500 border-none text-[7px]">ANTI_DOGMA_LAYER</Badge>
                          </div>
                        )}
                        <CardContent className="p-6">
                           <div className="flex flex-col md:flex-row justify-between gap-6">
                              <div className="flex gap-4">
                                 <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                    <Waves className="size-6 text-emerald-500" />
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-lg font-bold text-white uppercase">{ai.name}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{ai.role}</p>
                                    <p className={`text-[9px] font-bold uppercase ${ai.consequence === 'Critical' ? 'text-destructive' : 'text-primary'}`}>
                                       Consequence: {ai.consequence}
                                    </p>
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

              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                       <ShieldHalf className="size-5" /> Institutional Self-Correction Rules
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { rule: "Zero Outcome Write-Access", status: "ENFORCED" },
                         { rule: "Audit of Success Assumptions", status: "ACTIVE" },
                         { rule: "Public Postmortem Protocol", status: "ACTIVE" },
                         { rule: "Article VIII Innovation Audit", status: "STABLE" }
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
                    <AlertTriangle className="size-4" /> Anti-Dogma Sensor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    "Every metric may be wrong. Every assumption may be incomplete. We audit our successes even more strictly than our failures."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                       <span className="text-muted-foreground uppercase">Institutional Awareness</span>
                       <span className="text-emerald-500 font-bold uppercase">MAX</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-emerald-500">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-emerald-500 tracking-widest flex items-center gap-2">
                       <Unlock className="size-4" /> Public Trust Recovery
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Trust Recovery Pulse</span>
                          <span className="text-emerald-500">92.4%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic">
                       NoorNexus is architected to survive a major public failure through absolute transparency and protocol-driven recovery.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Lightbulb className="size-4" /> Strategic Awareness Audit
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase">Public Mirroing Status</p>
                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">SYNCHRONIZED</Badge>
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
