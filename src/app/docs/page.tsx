
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
  Target,
  Crown,
  HeartPulse,
  LifeBuoy
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
        currentFocus: "Phase P6: Reality Adoption & Indispensable Utility",
        context: "Harden the knowledge transfer layer and verify the indispensability of core systems.",
        history: ["Phase P5 Complete", "Article VII Ratified", "Utility Density Observatory Active"]
      })
      setAnalysis(result)
      toast({ title: "Adoption Strategy Synchronized" })
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
                   <LifeBuoy className="size-3 mr-2" /> Phase P6: Reality Utility
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Civilizational <span className="text-primary">Utility.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Preserve Principles, Not Implementations." Harden the Civilizational Flywheel and ensure NoorNexus remains an indispensable tool for current and future generations.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2 shadow-[0_0_20px_rgba(0,150,255,0.3)]"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <LifeBuoy className="size-4" />}
              Verify Utility & Adoption
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Scale className="size-4" /> The Anti-Museum Constitution (P6 Update)
                 </h3>
                 <div className="space-y-4">
                    {[
                      { id: "Article VII", title: "Institutional Longevity", status: "ENFORCED" },
                      { id: "Article VIII", title: "Principle Primacy", desc: "We preserve principles, not specific code implementations. NoorNexus must evolve or be replaced to maintain its core mission of utility and sovereignty.", status: "PROPOSED" }
                    ].map((art, i) => (
                      <Card key={i} className={`glass-card border-white/5 ${art.id === 'Article VIII' ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}>
                        <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
                           <div className="space-y-2">
                              <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary">{art.id}</Badge>
                              <h4 className="text-lg font-headline font-bold text-white uppercase">{art.title}</h4>
                              <p className="text-xs text-muted-foreground italic leading-relaxed">{art.desc || "Fundamental civilizational law established in Phase P5."}</p>
                           </div>
                           <div className="shrink-0 flex items-end">
                              <Badge className={`border-none text-[8px] h-5 uppercase font-bold ${art.status === 'PROPOSED' ? 'bg-primary/20 text-primary' : 'bg-emerald-500/20 text-emerald-500'}`}>{art.status}</Badge>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                    <History className="size-4" /> Generational Knowledge Transfer
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Steward Readiness", items: ["6-Month Training Cycle", "Knowledge Attestation", "Role Rotation Ceremony"] },
                      { title: "Utility Archiving", items: ["Impact Case Studies", "Outcome Data Vault", "Decision History Graphs"] }
                    ].map((v, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2">
                         <CardHeader>
                            <CardTitle className="text-[10px] font-bold uppercase text-primary">{v.title}</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-2">
                            {v.items.map((item, j) => (
                              <div key={j} className="flex items-center gap-2 text-[9px] text-muted-foreground">
                                 <CheckCircle2 className="size-3 text-emerald-500" /> {item}
                              </div>
                            ))}
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
                    <TrendingUp className="size-4" /> Utility Density Pulse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">92.5%</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">Utility Index Score</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Longevity is achieved when the absence of a system would be a crisis. Our goal is critical utility for every citizen."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Award className="size-4" /> Indispensability Ledger
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {[
                     { label: "Critical Flows", val: "14" },
                     { label: "Institutional Trust", val: "94%" },
                     { label: "Absence Loss Risk", val: "CRITICAL" }
                   ].map((idx, i) => (
                     <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-white/5 rounded">
                        <span className="text-muted-foreground uppercase">{idx.label}</span>
                        <span className="text-white font-bold">{idx.val}</span>
                     </div>
                   ))}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Crown className="size-4" /> Succession Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-[10px]">
                   <div className="flex justify-between text-muted-foreground">
                      <span>Knowledge Sync</span>
                      <span className="text-emerald-500 font-bold">100%</span>
                   </div>
                   <div className="flex justify-between text-muted-foreground">
                      <span>Steward Readiness</span>
                      <span className="text-amber-500 font-bold">92%</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '92%' }} />
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
