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
  FileCheck
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
        currentFocus: "Phase ΩΩ: Institutional Adoption & Credibility Portfolio",
        context: "Transitioning from Feature-Ready to Market-Validated through Pilot Partnerships.",
        history: ["Phase Ω+ Complete", "Partnership Readiness Verified", "Institutional Stack Hardened"]
      })
      setAnalysis(result)
      toast({ title: "Credibility Logic Updated" })
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
                   <Briefcase className="size-3 mr-2" /> Institutional Credibility
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Partnership <span className="text-primary">Kits.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Phase ΩΩ: Market Validation. Providing potential partners with the tools, legal frameworks, and evidence required for adoption.
              </p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Award className="size-4" />}
              Audit Credibility Portfolio
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> The Partnership Acquisition Pack
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { 
                        title: "Executive Pack", 
                        desc: "Mission, Integration Models, and Revenue Projection.",
                        status: "READY",
                        icon: FileText
                      },
                      { 
                        title: "Technical Pack", 
                        desc: "API/SDK Documentation and Event Bus Specifications.",
                        status: "READY",
                        icon: Database
                      },
                      { 
                        title: "Legal Pack", 
                        desc: "NDA, MOU, and Data Processing Agreements.",
                        status: "READY",
                        icon: Scale
                      }
                    ].map((pack, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group">
                         <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <pack.icon className="size-5" />
                                </div>
                               <Badge className="bg-emerald-500/20 text-emerald-500 border-none shrink-0 text-[8px]">{pack.status}</Badge>
                            </div>
                            <div className="space-y-1">
                               <p className="text-xs font-bold text-white uppercase">{pack.title}</p>
                               <p className="text-[10px] text-muted-foreground leading-relaxed italic">{pack.desc}</p>
                            </div>
                            <Button variant="ghost" className="w-full justify-between h-8 text-[9px] uppercase font-bold text-primary group-hover:bg-primary/10">
                               Download Assets <ArrowRight className="size-3" />
                            </Button>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Workflow className="size-4" /> Pilot Partner Strategy
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 overflow-hidden">
                   <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                            <p className="text-[10px] font-bold text-primary uppercase">1. Pilot (3)</p>
                            <p className="text-[9px] text-muted-foreground">Architectural Learning Phase.</p>
                         </div>
                         <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase">2. Institutional (10)</p>
                            <p className="text-[9px] text-muted-foreground">Sovereign Validation Phase.</p>
                         </div>
                         <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                            <p className="text-[10px] font-bold text-amber-500 uppercase">3. Strategic (50)</p>
                            <p className="text-[9px] text-muted-foreground">Ecosystem Growth Phase.</p>
                         </div>
                         <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                            <p className="text-[10px] font-bold text-white uppercase">4. Scale</p>
                            <p className="text-[9px] text-muted-foreground">Universal Global Adoption.</p>
                         </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center italic">
                        "First 3 partners provide 300 architectural lessons. Trust before scale is the path to institutional longevity."
                      </p>
                   </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                  <FileCheck className="size-4" /> Credibility Portfolio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { label: "Audit Reports", desc: "Internal and Simulation-based stress tests.", val: "12 Certified" },
                     { label: "Security Assessment", desc: "HMAC_V4 and L4 Handshake validation.", val: "PASSED_L4" },
                     { label: "Case Studies", desc: "Verifiable results from Pilot programs.", val: "2 Pending" },
                     { label: "Testimonials", desc: "Verified feedback from initial stewards.", val: "3 Active" }
                   ].map((item, i) => (
                     <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex justify-between items-center">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-white uppercase">{item.label}</p>
                           <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                        </div>
                        <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-500 font-mono">{item.val}</Badge>
                     </div>
                   ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Globe className="size-4" /> Adoption Target
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                     {[
                       { category: "Universities", target: "1 Pilot", current: "0" },
                       { category: "Fintechs", target: "1 Pilot", current: "1" },
                       { category: "Enterprises", target: "1 Pilot", current: "0" }
                     ].map((t, i) => (
                       <div key={i} className="space-y-1">
                          <div className="flex justify-between text-[9px] font-bold uppercase">
                             <span className="text-muted-foreground">{t.category}</span>
                             <span className="text-primary">{t.current}/{t.target}</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: t.current !== '0' ? '100%' : '0%' }} />
                          </div>
                       </div>
                     ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <FileText className="size-4" /> Adoption Manifesto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Institutional credibility is built on evidence, not claims. We do not ask for trust; we provide the ledger for verification."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Handshake className="size-4" /> Pilot Stewardship
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                    "Pilot partners are not just users; they are co-architects of the final sovereign standard."
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
