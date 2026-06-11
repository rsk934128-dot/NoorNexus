
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
  Fingerprint
} from "lucide-react"

const AI_REGISTRY = [
  { name: "Nora-00", role: "Protocol Architect", alignment: 99.8, risk: "Low", status: "Audited", capabilities: ["Roadmap", "Risk Analysis"] },
  { name: "Nora-01", role: "Compliance Monitor", alignment: 100, risk: "None", status: "Stable", capabilities: ["Security", "Packet Audit"] },
  { name: "Nora-07", role: "Senate Strategist", alignment: 98.5, risk: "Medium", status: "Active", capabilities: ["Governance", "Sentiment Analysis"] },
  { name: "Nora-11", role: "Imperial Oracle", alignment: 96.2, risk: "High", status: "Continuous", capabilities: ["Precognition", "Policy Suggestion"] },
]

export default function AiGovernancePage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <BrainCircuit className="size-3 mr-2" /> AI Institutional Layer
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                AI <span className="text-primary">Governance.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Managing Nora-AI agents as subjects of governance. Ensuring alignment, accountability, and continuous auditing for the digital civilization.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[180px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Global Alignment Score</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">98.6%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Cpu className="size-4" /> AI Registry & Capability Audit
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {AI_REGISTRY.map((ai, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all">
                        <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
                           <div className="flex gap-4">
                              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                 <Fingerprint className="size-6 text-primary" />
                              </div>
                              <div className="space-y-1">
                                 <p className="text-lg font-bold text-white uppercase">{ai.name}</p>
                                 <p className="text-xs text-muted-foreground font-mono">{ai.role}</p>
                                 <div className="flex flex-wrap gap-2 mt-2">
                                    {ai.capabilities.map((cap, j) => (
                                      <Badge key={j} variant="outline" className="text-[8px] border-white/10 uppercase">{cap}</Badge>
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
                                 <p className="text-[8px] text-muted-foreground uppercase font-bold">Risk Profile</p>
                                 <Badge className={ai.risk === 'None' ? 'bg-emerald-500' : ai.risk === 'Low' ? 'bg-primary' : 'bg-amber-500'}>{ai.risk}</Badge>
                              </div>
                              <div className="text-right space-y-1">
                                 <p className="text-[8px] text-muted-foreground uppercase font-bold">Audit Status</p>
                                 <div className="flex items-center gap-1 text-xs text-white">
                                    <FileCheck className="size-3 text-emerald-500" /> {ai.status}
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <Card className="glass-card bg-primary/5 border-primary/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Activity className="size-48 text-primary" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <Zap className="size-5" /> AI Action Pulse (Audit Log)
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4 relative z-10">
                    {[
                      { event: "Nora-01 isolated Node-42 for signature drift", time: "2m ago", confidence: 99.99 },
                      { event: "Nora-07 recommended budget shift to Mesh Support", time: "1h ago", confidence: 94.20 },
                      { event: "Nora-11 detected geopolitical liquidity drain pattern", time: "3h ago", confidence: 88.50 },
                    ].map((log, i) => (
                      <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="size-2 bg-primary rounded-full animate-pulse" />
                            <p className="text-xs text-muted-foreground leading-relaxed italic">{log.event}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[9px] text-primary font-bold">{log.confidence}% CONF</p>
                            <p className="text-[7px] text-muted-foreground font-mono">{log.time}</p>
                         </div>
                      </div>
                    ))}
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Ethics & Alignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    "AI Agents are validators, not masters. Every autonomous decision must be auditable and reversible by the Senate."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                       <span className="text-muted-foreground uppercase">Byzantine Resilience</span>
                       <span className="text-emerald-500 font-bold uppercase">ENFORCED</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Capability Expansion
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Autonomy Depth</span>
                          <span className="text-primary">85%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '85%' }} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Audit Transparency</span>
                          <span className="text-emerald-500">MAX</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                       </div>
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
