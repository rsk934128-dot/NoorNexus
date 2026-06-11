
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
  LayoutGrid
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
        currentFocus: "Phase 4: Reality-Proof Institutional Hardening",
        context: "Evolving NoorNexus from a digital twin into a resilient, anti-capture sovereign operating system.",
        history: ["Phase 3 Complete", "Digital Twin Verified", "Civilization Stack Operational"]
      })
      setAnalysis(result)
      toast({ title: "Charter Re-evaluated" })
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
                   <BookOpen className="size-3 mr-2" /> Sovereign Charter v6.0
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Constitutional <span className="text-primary">Registry.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                The fundamental laws of NoorNexus. Designed to prevent power capture and ensure civilizational longevity through cryptographic enforcement.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <ShieldHalf className="size-4" />}
              Audit Constitutional Alignment
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Fundamental Articles
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {[
                      { 
                        title: "Article I: Citizen Rights", 
                        desc: "Every citizen has the right to data sovereignty, verifiable identity, and participation in the collective governance without fear of capture.",
                        status: "ENFORCED"
                      },
                      { 
                        title: "Article II: Economic Sovereignty", 
                        desc: "Treasury allocation and tax policy must be auditable, transparent, and multi-sig protected to prevent single-point institutional failure.",
                        status: "ENFORCED"
                      },
                      { 
                        title: "Article III: AI Containment", 
                        desc: "No AI agent shall possess autonomous write-access to the Constitutional Registry. AI is a validator, not a ruler.",
                        status: "AUDITED"
                      },
                      { 
                        title: "Article IV: Governance Limits", 
                        desc: "The Senate's power is limited by a minimum quorum of 66.7% and a constitutional override mechanism for emergency vetos.",
                        status: "ENFORCED"
                      }
                    ].map((art, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group">
                         <CardContent className="p-6 flex flex-col sm:flex-row gap-6 justify-between items-start">
                            <div className="space-y-2">
                               <p className="text-lg font-bold text-white uppercase">{art.title}</p>
                               <p className="text-sm text-muted-foreground leading-relaxed italic">{art.desc}</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-500 border-none shrink-0">{art.status}</Badge>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Database className="size-4" /> Institutional Memory Vault
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 overflow-hidden">
                   <CardHeader className="border-b border-white/5 py-4">
                      <div className="flex items-center justify-between">
                         <CardTitle className="text-xs uppercase font-bold text-amber-500">History Node Browser</CardTitle>
                         <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                            <input className="bg-black/40 border border-white/5 rounded pl-7 pr-2 py-1 text-[9px] w-32 outline-none" placeholder="Search Cycle..." />
                         </div>
                      </div>
                   </CardHeader>
                   <CardContent className="p-0">
                      <table className="w-full text-left">
                         <thead className="bg-muted/30 border-b border-white/5">
                            <tr className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                               <th className="px-6 py-3">Cycle</th>
                               <th className="px-6 py-3">Event Hash</th>
                               <th className="px-6 py-3">Context</th>
                               <th className="px-6 py-3 text-right">Integrity</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5 text-[10px]">
                            {[
                              { cycle: "42-B", hash: "0x82...f9", context: "Constitution Ratification Debate", integrity: "100%" },
                              { cycle: "40-A", hash: "0x12...a3", context: "Merchant Hub Migration Failure Analysis", integrity: "99.8%" },
                              { cycle: "38-C", hash: "0xcc...e1", context: "Treasury Multi-sig Protocol Upgrade", integrity: "100%" }
                            ].map((row, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors group">
                                 <td className="px-6 py-3 font-bold text-white">{row.cycle}</td>
                                 <td className="px-6 py-3 font-mono text-primary text-[8px]">{row.hash}</td>
                                 <td className="px-6 py-3 text-muted-foreground italic truncate max-w-[200px]">{row.context}</td>
                                 <td className="px-6 py-3 text-right">
                                    <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">{row.integrity}</integrity>
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
                    <ShieldHalf className="size-4" /> Anti-Capture Guard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[10px] text-muted-foreground leading-relaxed italic">
                   "No single citizen, AI, or senate can control the treasury. Power is distributed across 400 nodes with multi-layer verification."
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <DatabaseZap className="size-4" /> Interoperability Stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Sovereign API Gateway: ACTIVE",
                    "Identity Bridge Protocol: READY",
                    "Trust Ledger Exchange: SYNCED"
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-[9px] text-white">
                       <CheckCircle2 className="size-3 text-emerald-500" />
                       <span>{s}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
