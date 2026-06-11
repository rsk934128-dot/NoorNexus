
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
  Scale, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Landmark, 
  Briefcase, 
  FileText, 
  FileSearch, 
  Box, 
  TrendingUp,
  History,
  Activity,
  Target
} from "lucide-react"
import { analyzeProtocol, ProtocolArchitectOutput } from "@/ai/flows/protocol-architect-flow"
import { useToast } from "@/hooks/use-toast"

const REGULATORY_MATRIX = [
  { region: "Bangladesh", focus: "Financial Inclusion", license: "Fintech Sandbox", status: "Targeted" },
  { region: "UAE", focus: "Digital Identity", license: "ADGM / DIFC Hub", status: "Assessment" },
  { region: "EU / UK", focus: "Data Sovereignty", license: "GDPR Compliant", status: "Active" }
]

export default function DocsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<ProtocolArchitectOutput | null>(null)

  async function runArchitect() {
    setLoading(true)
    try {
      const result = await analyzeProtocol({
        currentFocus: "Phase P4: Institutional Legitimacy & Regulatory Mapping",
        context: "Mapping internal capabilities against external regulatory requirements across 4 regions.",
        history: ["Phase P3 Complete", "Evidence Vault Active", "10 Pilot Partners Identified"]
      })
      setAnalysis(result)
      toast({ title: "Regulatory Strategy Synchronized" })
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
                   <Globe className="size-3 mr-2" /> Global Regulatory Matrix
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Institutional <span className="text-primary">Legitimacy.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Trust by Recognition". Mapping the Living Constitution against the reality of global regulations and institutional standards.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Target className="size-4" />}
              Analyze Reality Gaps
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Scale className="size-4" /> The Living Constitution (P4 Update)
                 </h3>
                 <div className="space-y-4">
                    {[
                      { id: "Article I", title: "Citizen Rights", status: "ENFORCED" },
                      { id: "Article II", title: "Economic Integrity", status: "ENFORCED" },
                      { id: "Article III", title: "AI Containment", status: "STRICT" },
                      { id: "Article IV", title: "Governance Limits", status: "ACTIVE" },
                      { id: "Article V", title: "Constant Verification", status: "VERIFIED" },
                      { id: "Article VI", title: "Institutional Recognition", desc: "No system capability is final until it meets external regulatory or audit standards.", status: "PROPOSED" }
                    ].map((art, i) => (
                      <Card key={i} className={`glass-card border-white/5 ${art.id === 'Article VI' ? 'border-l-4 border-l-amber-500 bg-amber-500/5' : ''}`}>
                        <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
                           <div className="space-y-2">
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary">{art.id}</Badge>
                              <h4 className="text-lg font-headline font-bold text-white uppercase">{art.title}</h4>
                              <p className="text-xs text-muted-foreground italic leading-relaxed">{art.desc || "Fundamental civilizational law established in Phase P1-P3."}</p>
                           </div>
                           <div className="shrink-0 flex items-end">
                              <Badge className={`border-none text-[8px] h-5 uppercase font-bold ${art.status === 'PROPOSED' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>{art.status}</Badge>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                    <Globe className="size-4" /> Global Regulatory Alignment
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {REGULATORY_MATRIX.map((r, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-primary/5 group">
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-start">
                              <p className="text-xs font-bold text-white uppercase">{r.region}</p>
                              <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{r.status}</Badge>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-headline font-bold text-primary uppercase">Focus: {r.focus}</p>
                              <p className="text-[9px] text-muted-foreground italic">License Required: {r.license}</p>
                           </div>
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
                    <TrendingUp className="size-4" /> Legitimacy Gap
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">58%</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">Unrecognized Capability Risk</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Institutional risk is highest when our internal belief in our system exceeds the external recognition of its reality."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Award className="size-4" /> Institutional Reputation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {[
                     { label: "Audit Reliability", score: 92 },
                     { label: "Compliance Index", score: 45 },
                     { label: "Settlement Trust", score: 88 }
                   ].map((idx, i) => (
                     <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[8px] font-bold uppercase">
                           <span>{idx.label}</span>
                           <span>{idx.score}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500" style={{ width: `${idx.score}%` }} />
                        </div>
                     </div>
                   ))}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Briefcase className="size-4" /> Certification Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   {[
                     { label: "SOC2 Audit", val: "Q4_2024" },
                     { label: "ISO 27001", val: "Q1_2025" },
                     { label: "UAE Hub License", val: "TARGET" }
                   ].map((p, i) => (
                     <div key={i} className="flex justify-between text-[9px] font-mono">
                        <span className="text-white uppercase">{p.label}</span>
                        <span className="text-amber-500">{p.val}</span>
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
