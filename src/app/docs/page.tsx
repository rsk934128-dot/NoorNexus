"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, FileText, ShieldAlert, Zap, Loader2, Target, 
  AlertTriangle, CheckCircle2, ChevronRight, Menu, Cpu, Code2, ShieldCheck, Star, Globe, Copy, Lock, ShieldPlus, DatabaseZap, Scale, HeartHandshake, ShieldEllipsis, Eye, ClipboardCheck, Handshake
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
        currentFocus: "Phase 3: Unified Connect & Trust-Based Access Control (TSBAC)",
        context: "Implementing a mature ethical framework focused on accountability and user sovereignty.",
        history: ["Phase 2 Active", "Project 150 Shield SDK Standardized"]
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
              <p className="text-muted-foreground">The strategic and ethical blueprint for NoorNexus infrastructure.</p>
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
            <div className="lg:col-span-2 space-y-10">
              {/* Mature Ethical Framework Section */}
              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Scale className="size-4" /> Sovereign Ethical Framework
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <ShieldEllipsis className="size-32 text-amber-500" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-headline text-amber-500 uppercase">Amanat (আমানত) Protocol</CardTitle>
                    <CardDescription className="text-xs">NoorNexus operates on a mature governance model focused on user-centric justice.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-4">
                          {[
                            { title: "Data Sovereignty", desc: "ব্যবহারকারী তার তথ্যের উপর পূর্ণ নিয়ন্ত্রণ রাখবে।", icon: Lock },
                            { title: "Privacy by Design", desc: "গোপনীয়তা-সুরক্ষা আর্কিটেকচারের অবিচ্ছেদ্য অংশ।", icon: ShieldPlus },
                            { title: "Zero-Knowledge", desc: "তথ্য না জেনেও সেবা প্রদানের প্রযুক্তিগত সক্ষমতা।", icon: DatabaseZap },
                            { title: "Transparency", desc: "তথ্য সংগ্রহের কারণ এবং প্রক্রিয়া হবে সম্পূর্ণ স্বচ্ছ।", icon: Eye }
                          ].map((item, i) => (
                            <div key={i} className="flex gap-3">
                               <div className="size-8 bg-amber-500/10 rounded flex items-center justify-center shrink-0 border border-amber-500/20">
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
                            <div key={i} className="flex gap-3">
                               <div className="size-8 bg-emerald-500/10 rounded flex items-center justify-center shrink-0 border border-emerald-500/20">
                                  <item.icon className="size-4 text-emerald-500" />
                               </div>
                               <div>
                                  <h4 className="text-[10px] font-bold text-white uppercase">{item.title}</h4>
                                  <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                          <div className="p-4 bg-black/40 rounded-xl border border-white/5 mt-4">
                             <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                               "শ্রেষ্ঠত্ব অর্জিত হয় গতির মাধ্যমে নয়, বরং আস্থার মাধ্যমে। Integrity through Intelligence."
                             </p>
                          </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Lock className="size-4" /> Security & Compliance Standard
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <ShieldPlus className="size-4" /> Data Encryption
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        সকল ডেটা AES-256 বিট এনক্রিপশনের মাধ্যমে আপনার প্রিমাইসে সংরক্ষিত থাকে। আমরা শুধু অডিট রিপোর্ট প্রসেস করি।
                      </p>
                      <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">AES_256_ACTIVE</Badge>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-headline uppercase text-amber-500 flex items-center gap-2">
                        <DatabaseZap className="size-4" /> Zero-Write Policy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        আমাদের সিস্টেম আপনার ডেটাবেসে কোনো রাইট (Write) অপারেশন করবে না। এটি শুধু পঠনযোগ্য (Read-Only) মোডে কাজ করবে।
                      </p>
                      <Badge variant="outline" className="text-[8px] border-amber-500/20 text-amber-500">READ_ONLY_ENFORCED</Badge>
                    </CardContent>
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

              <section className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Target className="size-4" /> Strategic Progress
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Core OS Stabilization", phase: "PHASE_1", status: "COMPLETED", desc: "HMAC_V4 cryptographic handshake and regional node mesh setup." },
                    { title: "Adaptive Sovereign Shield", phase: "PHASE_2", status: "COMPLETED", desc: "Collective Immune System (Project 150) and Nora-01 Compliance Agent." },
                    { title: "Unified Connect & Ethical Governance", phase: "PHASE_3", status: "ACTIVE", desc: "Implementation of the mature 7-point ethical framework and user-centric sovereignty." },
                    { title: "Global Imperial Consensus", phase: "PHASE_4", status: "QUEUED", desc: "Full activation of 400 sovereign nodes for asset mesh consensus." }
                  ].map((step, i) => (
                    <Card key={i} className="glass-card border-l-4 border-l-primary/30">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-[10px] font-mono border-primary/20">{step.phase}</Badge>
                          <Badge className={step.status === 'COMPLETED' ? 'bg-emerald-500' : step.status === 'ACTIVE' ? 'bg-primary animate-pulse' : 'bg-muted'}>
                            {step.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-headline mt-2">{step.title}</CardTitle>
                        <CardDescription className="text-xs">{step.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Star className="size-4" /> Governance Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Mature Protocols:</p>
                  <div className="space-y-2">
                    {[
                      "Independent Audit System",
                      "User Consent Workflow",
                      "Zero-Knowledge Proofs",
                      "Accountability Logs",
                      "Priority Settlement Route"
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
                    <CheckCircle2 className="size-4" /> Empire Integrity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    By acknowledging that 100% perfection is a goal and not a constant state, we commit to continuous improvement through rigorous auditing.
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
