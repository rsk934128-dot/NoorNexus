"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, Wallet, ShieldCheck, Zap, Loader2, Target, 
  Handshake, PieChart, ChevronRight, Menu, Cpu, Rocket
} from "lucide-react"
import { generateInvestorPitch, InvestorPitchOutput } from "@/ai/flows/investor-pitch-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function InvestorHubPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [strategy, setStrategy] = useState<InvestorPitchOutput | null>(null)

  async function runInvestorAI() {
    setLoading(true)
    try {
      const result = await generateInvestorPitch({
        targetInvestorType: 'SOVEREIGN_FUND',
        projectStage: "Phase 2 Active - Scaling to 12 Mesh Nodes",
        currentFocus: "P2C Settlement Hub & HMAC_V4 Protocol Stabilization"
      })
      setStrategy(result)
      toast({ title: "Pitch Strategy Dispatched" })
    } catch (e: any) {
      toast({ title: "Strategic Link Failure", description: e.message, variant: "destructive" })
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
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase text-secondary">
                   <TrendingUp className="size-10" />
                   Investor Strategy Hub
                 </h2>
              </div>
              <p className="text-muted-foreground">Capitalizing the Sovereign Digital Infrastructure for Mission 400.</p>
            </div>
            <Button 
              onClick={runInvestorAI} 
              disabled={loading}
              className="bg-secondary text-secondary-foreground font-bold uppercase tracking-widest h-12 gap-2 glow-emerald"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Rocket className="size-4" />}
              Generate Pitch Thesis
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card bg-secondary/5 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase text-secondary">Why Invest?</CardTitle>
                    <CardDescription>Our unique value proposition in the fintech mesh.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                        <ShieldCheck className="size-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase">HMAC_V4 Moat</p>
                        <p className="text-[10px] text-muted-foreground">Proprietary cryptographic protocol ensuring zero-drift security.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Cpu className="size-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase">AI Compliance</p>
                        <p className="text-[10px] text-muted-foreground">Autonomous agents (Nora-AI) reducing human compliance costs by 90%.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase text-primary">Savings & Efficiency</CardTitle>
                    <CardDescription>Quantitative impact on the banking rails.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span>Settlement Speed</span>
                        <span className="text-emerald-500">99% Faster</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[99%]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span>Transaction Cost</span>
                        <span className="text-primary">85% Lower</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {strategy && (
                <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <Card className="glass-card border-secondary/30">
                    <CardHeader className="bg-secondary/10">
                      <CardTitle className="text-sm font-headline uppercase text-secondary flex items-center gap-2">
                        <Target className="size-4" /> Nora-04 Tactical Pitch Script
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="p-5 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-sm font-mono leading-relaxed text-muted-foreground whitespace-pre-wrap">
                          {strategy.pitchScript}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase text-secondary">The Investment Thesis</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-secondary/30 pl-4">
                            {strategy.investmentThesis}
                          </p>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase text-primary">Potential Backers</h4>
                          <div className="space-y-2">
                            {strategy.potentialInvestors.map((inv, i) => (
                              <div key={i} className="p-2 bg-white/5 rounded border border-white/5 text-[10px]">
                                <span className="font-bold text-primary">{inv.name}:</span> {inv.reason}
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
              <Card className="glass-card h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-secondary flex items-center gap-2">
                    <PieChart className="size-4" /> Capital Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { label: "Mesh Node Scaling", value: "40%" },
                      { label: "AI R&D (Nora Suite)", value: "30%" },
                      { label: "Liquidity Reserves", value: "20%" },
                      { label: "Compliance & Legal", value: "10%" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-3 bg-white/5 rounded border border-white/5">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-bold text-secondary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-destructive/5 border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-destructive flex items-center gap-2">
                    <Handshake className="size-4" /> Integrity Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {strategy?.strategicDirective || "All capital intake must undergo HMAC_V4 origin verification to prevent legacy institutional drift."}
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
