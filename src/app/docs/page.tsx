"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, FileText, ShieldAlert, Zap, Loader2, Target, 
  AlertTriangle, CheckCircle2, ChevronRight, Menu, Cpu, Code2, ShieldCheck, Star
} from "lucide-react"
import { analyzeProtocol, ProtocolArchitectOutput } from "@/ai/flows/protocol-architect-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DocsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<ProtocolArchitectOutput | null>(null)

  async function runArchitect() {
    setLoading(true)
    try {
      const result = await analyzeProtocol({
        currentFocus: "Phase 3: Unified Connect & Trust-Based Access Control (TSBAC)",
        context: "Implementing dynamic privilege escalation for Rubelpay and SovereignPay based on cross-app trust metrics.",
        history: ["Phase 2 Active", "Project 150 Shield SDK Standardized"]
      })
      setAnalysis(result)
      toast({ title: "Strategic Roadmap Synchronized" })
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <BookOpen className="size-10 text-primary" />
                   Sovereign Charter & Roadmap
                 </h2>
              </div>
              <p className="text-muted-foreground">The strategic blueprint for Mission 400 infrastructure.</p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Cpu className="size-4" />}
              Sync Phase 3 Roadmap
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Star className="size-4" /> Phase 3: Trust-Based Access (TSBAC)
                </h3>
                <Card className="glass-card border-l-4 border-l-amber-500">
                  <CardHeader>
                    <CardTitle className="text-lg font-headline text-amber-500 uppercase">Unified Connect Protocol</CardTitle>
                    <CardDescription>Dynamic privilege escalation for the NoorNexus Empire.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Applications earn "Trust Scores" through consistent signature integrity and zero compliance breaches. 
                      Higher scores unlock L4 privileges across the ecosystem.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="p-3 bg-white/5 rounded border border-white/5">
                          <p className="text-[10px] font-bold text-primary uppercase">Trust Level 1-50</p>
                          <p className="text-[9px] text-muted-foreground">Standard T+1 Settlement, 10k BDT/hr limit.</p>
                       </div>
                       <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/20">
                          <p className="text-[10px] font-bold text-emerald-500 uppercase">Trust Level 90+</p>
                          <p className="text-[9px] text-emerald-200">Instant Settlement, Unlimited throughput, Cross-app RPC.</p>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Target className="size-4" /> Strategic Progress
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Core OS Stabilization", phase: "PHASE_1", status: "COMPLETED", desc: "HMAC_V4 cryptographic handshake and regional node mesh setup." },
                    { title: "Adaptive Sovereign Shield", phase: "PHASE_2", status: "ACTIVE", desc: "Collective Immune System (Project 150) and Nora-01 Compliance Agent." },
                    { title: "Unified Connect (TSBAC)", phase: "PHASE_3", status: "IN_PROGRESS", desc: "Trust-based privileges and cross-app communication layer." },
                    { title: "Global Imperial Consensus", phase: "PHASE_4", status: "QUEUED", desc: "Full activation of 400 sovereign nodes for asset mesh consensus." }
                  ].map((step, i) => (
                    <Card key={i} className="glass-card border-l-4 border-l-primary/30">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-[10px] font-mono border-primary/20">{step.phase}</Badge>
                          <Badge className={step.status === 'COMPLETED' ? 'bg-emerald-500' : step.status === 'ACTIVE' || step.status === 'IN_PROGRESS' ? 'bg-primary animate-pulse' : 'bg-muted'}>
                            {step.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-headline mt-2">{step.title}</CardTitle>
                        <CardDescription className="text-xs">{step.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>

              {analysis && (
                <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                    <ShieldAlert className="size-4" /> AI Strategic Assessment
                  </h3>
                  <Card className="glass-card border-amber-500/20">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase text-amber-500">Nora-00 Strategic Directive</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                        <p className="text-sm font-mono leading-relaxed text-amber-200">"{analysis.strategicDirective}"</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Architectural Risks</h4>
                          <div className="space-y-2">
                            {analysis.riskAnalysis.potentialErrors.map((e, i) => (
                              <div key={i} className="flex gap-2 text-[10px] text-amber-500/80 font-mono">
                                <Zap className="size-3 shrink-0" />
                                {e}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Future Requirements</h4>
                          <div className="space-y-2">
                            {analysis.futureRequirements.map((f, i) => (
                              <div key={i} className="flex gap-2 text-[10px] text-emerald-500/80 font-mono">
                                <CheckCircle2 className="size-3 shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Star className="size-4" /> Trust Matrix Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Dynamic Privileges:</p>
                  <div className="space-y-2">
                    {[
                      "Real-time Trust Scoring",
                      "Auto-Escalation Hooks",
                      "Priority Settlement Route",
                      "Cross-App Session Sync",
                      "Zero-Latency Verification"
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs p-2 bg-white/5 rounded border border-white/5 group hover:bg-primary/10 transition-colors">
                        <div className="size-1.5 bg-primary rounded-full" />
                        <span className="truncate">{doc}</span>
                        <ChevronRight className="size-3 ml-auto opacity-20 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="size-4" /> Empire Stability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    By rewarding high-integrity behavior with speed and access, we ensure that Mission 400 scales without central oversight friction.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-muted-foreground">Consensus Accuracy:</span>
                    <span className="text-xs font-bold text-emerald-500">100.00%</span>
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
