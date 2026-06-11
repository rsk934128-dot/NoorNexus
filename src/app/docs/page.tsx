
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
  History,
  ShieldHalf,
  Database,
  Search,
  LayoutGrid,
  ArrowRightLeft,
  Network
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
        currentFocus: "Phase 4: Sovereign Institutional Hardening",
        context: "Transitioning from founder-centric software to a self-governing digital institution.",
        history: ["Phase 3 Complete", "Digital Twin Mirrored", "Steward Council Active"]
      })
      setAnalysis(result)
      toast({ title: "Living Constitution Audited" })
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
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <BookOpen className="size-3 mr-2" /> Living Constitution v1.0
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Constitutional <span className="text-primary">Registry.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                The legal bedrock of NoorNexus. Each Article is now linked to its Historical Debate and Case Studies in the Memory Vault.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <ShieldHalf className="size-4" />}
              Audit Living Constitution
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Constitutional Knowledge Graph */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Constitutional Articles & Origin
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {[
                      { 
                        title: "Article I: Citizen Rights", 
                        desc: "Right to data sovereignty and multi-dimensional verifiable identity.",
                        origin: "Cycle 42 Debate #12",
                        status: "ENFORCED"
                      },
                      { 
                        title: "Article II: Economic Sovereignty", 
                        desc: "Anti-capture treasury and institutional balance sheet integrity.",
                        origin: "Mission 400 Core Charter",
                        status: "ENFORCED"
                      },
                      { 
                        title: "Article III: AI Containment", 
                        desc: "Strict permission matrix and alignment audits for Nora agents.",
                        origin: "Phase 3 Stabilization Audit",
                        status: "AUDITED"
                      },
                      { 
                        title: "Article IV: Governance Execution", 
                        desc: "Meta-governance auditing and stewardship council quorum.",
                        origin: "Phase 4 Institutional Hardening",
                        status: "ENFORCED"
                      }
                    ].map((art, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group">
                         <CardContent className="p-6 flex flex-col sm:flex-row gap-6 justify-between items-start">
                            <div className="space-y-2">
                               <p className="text-lg font-bold text-white uppercase">{art.title}</p>
                               <p className="text-sm text-muted-foreground leading-relaxed italic">{art.desc}</p>
                               <p className="text-[9px] font-mono text-primary/60 uppercase tracking-widest">ORIGIN: {art.origin}</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-500 border-none shrink-0">{art.status}</Badge>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Database className="size-4" /> Living Memory Vault
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 overflow-hidden">
                   <CardHeader className="border-b border-white/5 py-4">
                      <div className="flex items-center justify-between">
                         <CardTitle className="text-xs uppercase font-bold text-amber-500">Decision Context Graph</CardTitle>
                      </div>
                   </CardHeader>
                   <CardContent className="p-0">
                      <table className="w-full text-left">
                         <thead className="bg-muted/30 border-b border-white/5">
                            <tr className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                               <th className="px-6 py-3">Article Link</th>
                               <th className="px-6 py-3">Debate Ref</th>
                               <th className="px-6 py-3">Outcome Context</th>
                               <th className="px-6 py-3 text-right">Integrity</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5 text-[10px]">
                            {[
                              { article: "Article II", ref: "D-45-B", context: "Anti-Capture Implementation", integrity: "100%" },
                              { article: "Article IV", ref: "D-46-A", context: "Steward Council Activation", integrity: "99.8%" },
                              { article: "Article I", ref: "D-42-C", context: "DID Privacy Standards", integrity: "100%" }
                            ].map((row, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors group">
                                 <td className="px-6 py-3 font-bold text-white">{row.article}</td>
                                 <td className="px-6 py-3 font-mono text-primary text-[8px]">{row.ref}</td>
                                 <td className="px-6 py-3 text-muted-foreground italic">{row.context}</td>
                                 <td className="px-6 py-3 text-right">
                                    <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">{row.integrity}</Badge>
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
                    <ShieldHalf className="size-4" /> Amendment Engine
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[10px] text-muted-foreground leading-relaxed italic">
                   "Constitution is a living entity. Amendments require a Cooling Period, Simulation pass, and 66.7% Senate Quorum."
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ArrowRightLeft className="size-4" /> Trust Federation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "External Banking Bridge: READY",
                    "University Trust Sync: ACTIVE",
                    "Inter-Platform Identity: SYNCED"
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-[9px] text-white">
                       <CheckCircle2 className="size-3 text-emerald-500" />
                       <span>{s}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Network className="size-4" /> Institutional Independence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                    "NoorNexus is designed to survive founder transition. The Stewardship Council manages continuity protocols Cycle-over-Cycle."
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
