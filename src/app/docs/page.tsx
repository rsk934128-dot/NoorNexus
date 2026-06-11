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
  History,
  ShieldHalf,
  Database,
  ArrowRightLeft,
  Network,
  Globe,
  Handshake,
  Workflow,
  Coins
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
        currentFocus: "Phase Ω+: Global Partnership Readiness Framework",
        context: "Transitioning to a standard-driven institution ready for 1000+ partners.",
        history: ["Phase 4 Complete", "Civilization Twin Mirrored", "Institutional Maturity Verified"]
      })
      setAnalysis(result)
      toast({ title: "Infrastructure Hardened" })
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
                   <Network className="size-3 mr-2" /> Global Partnership Readiness
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Infrastructure <span className="text-primary">Manifesto.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 164: Scaling from 1 to 1,000+ Partners. Standardizing Integration, Compliance, and Financial Settlement.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <ShieldHalf className="size-4" />}
              Audit Partnership Readiness
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> Civilizational Stack v2.0
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        title: "Layer I: Infrastructure", 
                        desc: "Universal Gateway, Event Bus, and Global Node Mesh.",
                        status: "STABLE",
                        icon: Database
                      },
                      { 
                        title: "Layer II: Economic", 
                        desc: "Multi-Currency Treasury, Settlement Abstraction, and Tax Automation.",
                        status: "READY",
                        icon: Coins
                      },
                      { 
                        title: "Layer III: Governance", 
                        desc: "Constitutional Safeguards, Simulation Nodes, and Audit Chains.",
                        status: "ENFORCED",
                        icon: ShieldCheck
                      },
                      { 
                        title: "Layer IV: Partnership", 
                        desc: "Compliance Engine (KYC/KYB), Sandbox, and Trust Federation.",
                        status: "ACTIVE",
                        icon: Handshake
                      }
                    ].map((art, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group">
                         <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <art.icon className="size-5" />
                                </div>
                               <Badge className="bg-emerald-500/20 text-emerald-500 border-none shrink-0 text-[8px]">{art.status}</Badge>
                            </div>
                            <div className="space-y-1">
                               <p className="text-sm font-bold text-white uppercase">{art.title}</p>
                               <p className="text-xs text-muted-foreground leading-relaxed italic">{art.desc}</p>
                            </div>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Workflow className="size-4" /> Global Partnership Protocol
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 overflow-hidden">
                   <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                            <p className="text-[10px] font-bold text-primary uppercase">1. Identify</p>
                            <p className="text-[9px] text-muted-foreground">Universal Gateway & Partner ID Issuance.</p>
                         </div>
                         <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase">2. Verify</p>
                            <p className="text-[9px] text-muted-foreground">KYB/AML Compliance Engine Audit.</p>
                         </div>
                         <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                            <p className="text-[10px] font-bold text-amber-500 uppercase">3. Settle</p>
                            <p className="text-[9px] text-muted-foreground">Atomic Multi-Currency Treasury Bridge.</p>
                         </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center italic">
                        "The protocol is designed such that 1 Partner = 1000 Partners. Architecture is fixed, scaling is infinite."
                      </p>
                   </CardContent>
                </Card>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Globe className="size-4" /> Global Event Bus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[10px] text-muted-foreground leading-relaxed italic">
                   "Every partner action is broadcasted through the global bus, triggering automated governance and settlement logic without manual intervention."
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ArrowRightLeft className="size-4" /> Settlement Abstraction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Provider Independence: ENFORCED",
                    "Currency Drift: MONITORED",
                    "Atomic Rollbacks: READY"
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-[9px] text-white">
                       <ShieldCheck className="size-3 text-emerald-500" />
                       <span>{s}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Handshake className="size-4" /> Trust Federation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                    "External legitimacy is built by federating trust with global institutions. NoorNexus scores are verified across university and financial mesh nodes."
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
