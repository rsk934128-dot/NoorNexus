
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
  Code2,
  FileSearch,
  Search,
  Box
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
        currentFocus: "Phase P3: Independent Verification & Audit Hardening",
        context: "Executing the Constant Verification mandate across all mesh nodes.",
        history: ["Phase ΩΩΩ Complete", "Revenue Validated", "Beachhead Market Secured"]
      })
      setAnalysis(result)
      toast({ title: "Verification Strategy Synchronized" })
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
                   <FileSearch className="size-3 mr-2" /> Phase P3: Evidence Standards
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Verification <span className="text-primary">Standards.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Trust by Verification". Every system capability, security layer, and financial claim must be periodically audited and verified by evidence.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <TrendingUp className="size-4" />}
              Audit Verification Logic
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Scale className="size-4" /> The Living Constitution
                 </h3>
                 <div className="space-y-4">
                    {[
                      { id: "Article I", title: "Citizen Rights", desc: "Absolute sovereignty over data and identity credentials." },
                      { id: "Article II", title: "Economic Integrity", desc: "No currency drift beyond 0.01% reconciliation threshold." },
                      { id: "Article III", title: "AI Containment", desc: "No autonomous action without human stewardship override." },
                      { id: "Article IV", title: "Governance Limits", desc: "Veto rights for the Steward Council on Article II/IV edits." },
                      { id: "Article V", title: "Constant Verification", desc: "No capability shall be trusted merely because it exists; it must be proven by evidence." }
                    ].map((art, i) => (
                      <Card key={i} className={`glass-card border-white/5 ${art.id === 'Article V' ? 'border-l-4 border-l-emerald-500 bg-emerald-500/5' : ''}`}>
                        <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
                           <div className="space-y-2">
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary">{art.id}</Badge>
                              <h4 className="text-lg font-headline font-bold text-white uppercase">{art.title}</h4>
                              <p className="text-xs text-muted-foreground italic leading-relaxed">{art.desc}</p>
                           </div>
                           <div className="shrink-0 flex items-end">
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] h-5">ENFORCED</Badge>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Target className="size-4" /> Evidence Marketplace
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { wedge: "Security", focus: "Red Team Results", items: ["Pen-Test 2024", "Key Rotation", "Replay Protection"] },
                      { wedge: "Chaos", focus: "Resilience Proof", items: ["Node Failure Recovery", "Latent Response", "Rollback Logic"] },
                      { wedge: "Trust", focus: "Audit Traceability", items: ["Ledger Signatures", "Identity Proofs", "DID Revocation"] }
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
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Rocket className="size-4" /> Verification Index
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">92%</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">Verified Real-World Claims</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Institutional trust is only as strong as its weakest unverified assumption."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Award className="size-4" /> Evidence Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Build. Test. Verify. Audit. Trust. This cycle repeats every 24 hours in the NoorNexus Mesh."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Briefcase className="size-4" /> Verification Assets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                     {[
                       { label: "Chaos Engineering", val: "LAST_PASS_2H" },
                       { label: "Red-Team Audit", val: "ACTIVE" },
                       { label: "DR Simulator", val: "STABLE" }
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
