
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, FileText, ShieldAlert, Zap, Loader2, Target, 
  AlertTriangle, CheckCircle2, ChevronRight, Menu, Cpu, Code2, ShieldCheck, Star, Globe, Copy, Lock, ShieldPlus, DatabaseZap, Scale, HeartHandshake, ShieldEllipsis, Eye, ClipboardCheck, Handshake, MessageCircleWarning, FileBarChart, Layers, Users, Network
} from "lucide-react"
import { analyzeProtocol, ProtocolArchitectOutput } from "@/ai/flows/protocol-architect-flow"
import { useToast } from "@/hooks/use-toast"

export default function DocsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<ProtocolArchitectOutput | null>(analysis)

  async function runArchitect() {
    setLoading(true)
    try {
      const result = await analyzeProtocol({
        currentFocus: "Phase 3: Mature Governance & Systemic Accountability",
        context: "Transitioning from idealistic perfection to measurable, auditable ethical infrastructure.",
        history: ["Phase 2 Active", "Amanat Protocol Standardized"]
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
              <p className="text-muted-foreground">The strategic and ethical blueprint for a Mature Digital Civilization.</p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Cpu className="size-4" />}
              Sync Strategic Roadmap
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* The 4 Architecture Layers */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> Civilizational Stack Architecture
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "1. Infrastructure Layer", items: ["One Engine Ledger", "Mesh Nodes", "Imperial SDK"], icon: Network },
                      { title: "2. Economic Layer", items: ["Flow Pay", "Exchange Hub", "SmartRemit P2P"], icon: Globe },
                      { title: "3. Governance Layer", items: ["Imperial Senate", "Oracle Agent", "Arbiter Chamber"], icon: Gavel },
                      { title: "4. Citizen Layer", items: ["Sovereign Identity", "Merchant Empire", "Developer Nodes"], icon: Users }
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

              {/* Mature Ethical Framework Section */}
              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Scale className="size-4" /> Sovereign Ethical Framework (7 Pillars)
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <ShieldEllipsis className="size-32 text-amber-500" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-headline text-amber-500 uppercase">Amanat (আমানত) Protocol</CardTitle>
                    <CardDescription className="text-xs">Trust is earned through proof, not declarations. Integrity through Intelligence.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          {[
                            { title: "Data Sovereignty", desc: "ব্যবহারকারী তার তথ্যের উপর পূর্ণ নিয়ন্ত্রণ রাখবে।", icon: Lock },
                            { title: "Privacy by Design", desc: "গোপনীয়তা-সুরক্ষা আর্কিটেকচারের অবিচ্ছেদ্য অংশ।", icon: ShieldPlus },
                            { title: "Zero-Knowledge", desc: "তথ্য না জেনেও সেবা প্রদানের প্রযুক্তিগত সক্ষমতা।", icon: DatabaseZap },
                            { title: "Transparency", desc: "তথ্য সংগ্রহের কারণ এবং প্রক্রিয়া হবে সম্পূর্ণ স্বচ্ছ।", icon: Eye }
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
                            { title: "Accountability", desc: "স্বাধীন অডিট ও নীতিমালা পর্যালোচনার স্থায়ী ব্যবস্থা।", icon: ClipboardCheck },
                            { title: "Non-Sale Commitment", desc: "ব্যবহারকারীর তথ্য পণ্য হিসেবে বিক্রি করা নিষিদ্ধ।", icon: Handshake },
                            { title: "User Consent", desc: "প্রতিটি সংবেদনশীল ডেটার জন্য স্পষ্ট সম্মতি গ্রহণ।", icon: CheckCircle2 }
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

              {/* Mature Governance Layers */}
              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Star className="size-4" /> Mature Governance Layers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Card className="glass-card border-primary/20 bg-primary/5">
                      <CardHeader className="p-4">
                         <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 text-primary">
                            <ShieldAlert className="size-3" /> Ethics Review Board
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                            সিস্টেমের নীতি ও সিদ্ধান্ত পর্যালোচনার জন্য একটি স্বাধীন ও বাহ্যিক প্যানেল।
                         </p>
                      </CardContent>
                   </Card>
                   <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                      <CardHeader className="p-4">
                         <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 text-emerald-500">
                            <FileBarChart className="size-3" /> Transparency Reports
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                            নির্ধারিত সময় অন্তর প্রকাশ্য নৈতিক ও নিরাপত্তা কমপ্লায়েন্স প্রতিবেদন।
                         </p>
                      </CardContent>
                   </Card>
                   <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                      <CardHeader className="p-4">
                         <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 text-amber-500">
                            <MessageCircleWarning className="size-3" /> User Redress
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                            ব্যবহারকারীর অভিযোগ, আপিল ও দ্রুত প্রতিকার নিশ্চিত করার একটি স্থায়ী প্রক্রিয়া।
                         </p>
                      </CardContent>
                   </Card>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Globe className="size-4" /> Domain Validation (DNS)
                </h3>
                <Card className="glass-card bg-black/40 border-primary/20">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                       <p className="text-[10px] text-muted-foreground uppercase font-bold">Registry Verification Token</p>
                       <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 h-4">STABLE_DNS</Badge>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl font-mono text-[10px] space-y-2 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                         <Button variant="ghost" size="icon" className="size-6" onClick={() => {
                           navigator.clipboard.writeText(dnsToken);
                           toast({ title: "Token Copied" });
                         }}>
                           <Copy className="size-3" />
                         </Button>
                      </div>
                      <p><span className="text-primary font-bold">TYPE:</span> TXT</p>
                      <p><span className="text-primary font-bold">HOST:</span> @</p>
                      <p><span className="text-primary font-bold">VALUE:</span> {dnsToken}</p>
                      <p><span className="text-primary font-bold">TTL:</span> 3600</p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Star className="size-4" /> Governance Artifacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Measurable Controls:</p>
                  <div className="space-y-2">
                    {[
                      "Independent Audit System",
                      "User Redress Workflow",
                      "Transparency Log v1",
                      "Zero-Knowledge Proofs",
                      "Accountability Ledgers"
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
                    <CheckCircle2 className="size-4" /> Civilization Integrity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    By acknowledging imperfection, we build true resilience. Trust is a dynamic outcome of transparency and measurable redress.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-muted-foreground">Stability Rating:</span>
                    <span className="text-xs font-bold text-emerald-500">OPTIMAL</span>
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
