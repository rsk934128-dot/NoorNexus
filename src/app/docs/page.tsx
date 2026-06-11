
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  FileText, 
  Zap, 
  Loader2, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  Cpu, 
  ShieldCheck, 
  Star, 
  Globe, 
  Copy, 
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
  Users, 
  Share2, 
  Gavel,
  UserCircle
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
        currentFocus: "Phase 4: Civilizational Operations & Operations Layer",
        context: "Transitioning from a validated stack into a scalable, citizen-centric platform.",
        history: ["Phase 3 Complete", "Amanat Protocol Enforced", "Citizen Layer Active"]
      })
      setAnalysis(result)
      toast({ title: "Strategic Roadmap Synchronized" })
    } catch (e: any) {
      toast({ title: "Neural Handshake Failed", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const dnsToken = "sovereign-hub-verify=src6w425f3g";

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
                   Sovereign Charter
                 </h2>
              </div>
              <p className="text-muted-foreground">The digital civilization blueprint for Mission 400 Synthesis.</p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Cpu className="size-4" />}
              Sync Civilizational Roadmap
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> Civilizational Stack Architecture
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "1. Infrastructure Layer", items: ["One Engine Ledger", "Mesh Nodes", "HMAC_V4 SHA256"], icon: Share2 },
                      { title: "2. Economic Layer", items: ["Flow Pay", "SmartRemit", "Liquidity Optimizer"], icon: Globe },
                      { title: "3. Governance Layer", items: ["Senate Execution", "Arbiter Chamber", "Oracle Precognition"], icon: Gavel },
                      { title: "4. Citizen Layer", items: ["Participation Metrics", "Trust Graph", "Citizen Portal"], icon: UserCircle }
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
                  <Scale className="size-4" /> Sovereign Ethical Framework (7 Pillars)
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <ShieldEllipsis className="size-32 text-amber-500" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-headline text-amber-500 uppercase">Amanat (আমানত) Protocol v2</CardTitle>
                    <CardDescription className="text-xs">Trust is earned through evidence-driven traceability. Integrity through Intelligence.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          {[
                            { title: "Data Sovereignty", desc: "Citizen-centric ownership of all digital footprints.", icon: Lock },
                            { title: "Event Traceability", desc: "End-to-end audit chains for every critical event.", icon: ShieldPlus },
                            { title: "Zero-Knowledge Trust", desc: "Validation without revealing sensitive private data.", icon: DatabaseZap },
                            { title: "Explainability", desc: "AI decisions (Nora) must be auditable and transparent.", icon: Eye }
                          ].map((item, i) => (
                            <div key={i} className="flex gap-3 group">
                               <div className="size-8 bg-amber-500/10 rounded flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                                  <item.icon className="size-4 text-amber-500" />
                               </div>
                               <div>
                                  <h4 className="text-[10px] font-bold text-white uppercase">{item.title}</h4>
                                  <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                       <div className="space-y-4">
                          {[
                            { title: "Accountability", desc: "Execution scoring linked to governance outcomes.", icon: ClipboardCheck },
                            { title: "Non-Sale Committment", desc: "Citizen data is never for sale. Absolute data justice.", icon: Handshake },
                            { title: "Participatory Gov", desc: "Active citizen engagement in civilizational decisions.", icon: CheckCircle2 }
                          ].map((item, i) => (
                            <div key={i} className="flex gap-3 group">
                               <div className="size-8 bg-emerald-500/10 rounded flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                                  <item.icon className="size-4 text-emerald-500" />
                               </div>
                               <div>
                                  <h4 className="text-[10px] font-bold text-white uppercase">{item.title}</h4>
                                  <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Star className="size-4" /> Governance & Ops Layers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Card className="glass-card border-primary/20 bg-primary/5">
                      <CardHeader className="p-4">
                         <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 text-primary">
                            <Activity className="size-3" /> Stress-Test Simulation
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                            সিস্টেমের স্থিতিশীলতা পরীক্ষার জন্য নিয়মিত রেজিলিয়েন্স মনিটরিং এবং বাইজেন্টাইন ফল্ট সিনারিও সিমুলেশন।
                         </p>
                      </CardContent>
                   </Card>
                   <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                      <CardHeader className="p-4">
                         <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 text-emerald-500">
                            <FileBarChart className="size-3" /> Accountability Scores
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                            গভর্ন্যান্স সিদ্ধান্তের বাস্তবায়ন এবং আউটকাম ট্র্যাকিংয়ের মাধ্যমে একাউন্টেবিলিটি নিশ্চিতকরণ।
                         </p>
                      </CardContent>
                   </Card>
                   <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                      <CardHeader className="p-4">
                         <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 text-amber-500">
                            <MessageCircleWarning className="size-3" /> Citizen Redress
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                            নাগরিকদের অভিযোগ ও আপিল নিষ্পত্তির জন্য একটি স্বয়ংক্রিয় এবং স্বচ্ছ প্রসেস।
                         </p>
                      </CardContent>
                   </Card>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Star className="size-4" /> Civilizational Artifacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Evidence Controls:</p>
                  <div className="space-y-2">
                    {[
                      "Trust Graph Relationship Map",
                      "Citizen Engagement Metrics",
                      "Execution Traceability Log",
                      "Byzantine Resilience Proof",
                      "Mission 400 Readiness Index"
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
                    <CheckCircle2 className="size-4" /> Platform Integrity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    By scaling from an OS to a Civilization, NoorNexus moves beyond service provision into a living ecosystem of trust and participation.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-muted-foreground">Stability Rating:</span>
                    <span className="text-xs font-bold text-emerald-500">MAX_RESILIENCE</span>
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
