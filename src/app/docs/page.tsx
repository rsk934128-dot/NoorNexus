
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
  ChevronRight, 
  Menu, 
  Cpu, 
  ShieldCheck, 
  Star, 
  Globe, 
  Lock, 
  ShieldPlus, 
  DatabaseZap, 
  Scale, 
  ShieldEllipsis, 
  Eye, 
  ClipboardCheck, 
  Handshake, 
  MessageCircleWarning, 
  FileBarChart, 
  Layers, 
  Share2, 
  Gavel,
  UserCircle,
  BrainCircuit,
  History
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
        currentFocus: "Phase 5: Civilization Digital Twin & Economic Sovereignty",
        context: "Evolving NoorNexus from a participatory platform into a verifiable digital institution.",
        history: ["Phase 4 Complete", "Citizen Layer Active", "AI Governance Hub Operational"]
      })
      setAnalysis(result)
      toast({ title: "Roadmap Re-evaluated" })
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <BookOpen className="size-10 text-primary" />
                   Sovereign Charter
                 </h2>
              </div>
              <p className="text-muted-foreground">The blueprint for the Civilization Digital Twin (Mission 400).</p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Cpu className="size-4" />}
              Evaluate Twin Readiness
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> Civilization Digital Twin Stack
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "1. Infrastructure Layer", items: ["One Engine Ledger", "Mesh Nodes", "HMAC_V4 SHA256"], icon: Share2 },
                      { title: "2. Economic Layer", items: ["Value Flow Graph", "Sovereign Treasury", "Liquidity Rebalancing"], icon: Globe },
                      { title: "3. Governance Layer", items: ["Accountability Engine", "Senate Execution", "Impact Review"], icon: Gavel },
                      { title: "4. Citizen Layer", items: ["Reputation Vectors", "Trust Graph", "Verifiable Credentials"], icon: UserCircle },
                      { title: "5. AI Layer", items: ["Nora Registry", "Alignment Audit", "Autonomous Validation"], icon: BrainCircuit },
                      { title: "6. Trust Layer", items: ["Cryptographic Attestation", "Evidence Ledger", "Time Machine"], icon: History }
                    ].map((layer, i) => (
                      <Card key={i} className="glass-card bg-primary/5 border-primary/10">
                        <CardHeader className="pb-2">
                           <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                              <layer.icon className="size-3" /> {layer.title}
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="flex flex-wrap gap-2">
                              {layer.items.map((item, j) => (
                                <Badge key={j} variant="outline" className="text-[8px] border-white/10">{item}</Badge>
                              ))}
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Scale className="size-4" /> NoorNexus Maturity Roadmap
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                   <CardContent className="p-0">
                      <table className="w-full text-left">
                         <thead className="bg-muted/30 border-b border-white/5">
                            <tr className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                               <th className="px-6 py-4">Phase</th>
                               <th className="px-6 py-4">Focus</th>
                               <th className="px-6 py-4">Status</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5 text-[10px]">
                            {[
                              { phase: "Digital Platform", focus: "Basic OS Functionality", status: "VERIFIED" },
                              { phase: "Participatory Civilization", focus: "Citizen Layer Activation", status: "VERIFIED" },
                              { phase: "Evidence-Based Governance", focus: "Accountability Engine", status: "ACTIVE" },
                              { phase: "Verifiable Trust Network", focus: "Cryptographic Attestation", status: "ACTIVE" },
                              { phase: "Sovereign Economic Layer", focus: "Value Flow & Treasury", status: "OPTIMIZING" },
                              { phase: "Civilization Digital Twin", focus: "Final Mirror Synthesis", status: "TARGET" }
                            ].map((row, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors">
                                 <td className="px-6 py-4 font-bold text-white uppercase">{row.phase}</td>
                                 <td className="px-6 py-4 text-muted-foreground">{row.focus}</td>
                                 <td className="px-6 py-4">
                                    <Badge variant="outline" className={`text-[8px] ${row.status === 'VERIFIED' ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>{row.status}</Badge>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </CardContent>
                </Card>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Star className="size-4" /> Verification Artifacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Signed Accountability Proofs",
                    "Reputation Attestation Hash",
                    "Economic Impact Ledger",
                    "AI Registry Manifest",
                    "Byzantine Fault 証明"
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs p-2 bg-white/5 rounded border border-white/5 group hover:bg-primary/10 transition-colors">
                      <div className="size-1.5 bg-primary rounded-full" />
                      <span className="truncate">{doc}</span>
                      <ChevronRight className="size-3 ml-auto opacity-20" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="size-4" /> Twin Integrity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    NoorNexus is now a Digital Twin of Civilization. Every action in the system mirrors a real-world decision, validated by the mesh and recorded for history.
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
