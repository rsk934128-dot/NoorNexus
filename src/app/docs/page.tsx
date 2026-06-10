"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, FileText, ShieldAlert, Zap, Loader2, Target, 
  AlertTriangle, CheckCircle2, ChevronRight, Menu, Cpu, Code2, ShieldCheck, Star, Globe, Copy, Lock, ShieldPlus, DatabaseZap, Scale, HeartHandshake
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
        context: "Implementing dynamic privilege escalation for Rubelpay and SovereignPay based on cross-app trust metrics.",
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
                   Sovereign Charter & Roadmap
                 </h2>
              </div>
              <p className="text-muted-foreground">The strategic blueprint for Mission 400 infrastructure.</p>
            </div>
            <Button 
              onClick={runArchitect} 
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Cpu className="size-4" />}
              Sync Phase 3 Roadmap
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Privacy and Data Justice Section */}
              <section className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                  <Scale className="size-4" /> Data Justice & Sovereignty
                </h3>
                <Card className="glass-card border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <HeartHandshake className="size-24 text-amber-500" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-headline text-amber-500 uppercase">Privacy by Design</CardTitle>
                    <CardDescription className="text-xs">The ethical foundation of NoorNexus digital empire.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "গ্রাহকের ব্যক্তিগত তথ্য (NID, পাসপোর্ট, মোবাইল নম্বর) একটি আমানত। নূরনেক্সাস কোনো বাণিজ্যিক স্বার্থে এই ডেটা ব্রোকার বা থার্ড-পার্টির সাথে শেয়ার করে না। প্রতিটি ডেটা পয়েন্ট শুধুমাত্র ব্যবহারকারীর স্বচ্ছ সম্মতির ভিত্তিতে এবং সম্পূর্ণ এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকে।"
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="p-3 bg-white/5 rounded border border-white/10">
                          <p className="text-[10px] font-bold text-amber-500 uppercase">User Data Sovereignty</p>
                          <p className="text-[9px] text-muted-foreground">ব্যবহারকারীই তার তথ্যের একমাত্র মালিক। সিস্টেম শুধুমাত্র অডিট নোড হিসেবে কাজ করবে।</p>
                       </div>
                       <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/20">
                          <p className="text-[10px] font-bold text-emerald-500 uppercase">Zero-Leak Policy</p>
                          <p className="text-[9px] text-emerald-200">তথ্য লিক হওয়া রোধে HMAC_V4 এবং জিরো-নলেজ প্রোটোকল ব্যবহার করা হয়।</p>
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
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                      Confirming ডোমেইন মালিকানা with this TXT record establishes the sovereign authority of the NoorNexus Hub over its root infrastructure.
                    </p>
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
                    { title: "Adaptive Sovereign Shield", phase: "PHASE_2", status: "ACTIVE", desc: "Collective Immune System (Project 150) and Nora-01 Compliance Agent." },
                    { title: "Unified Connect & Data Justice", phase: "PHASE_3", status: "IN_PROGRESS", desc: "User Data Sovereignty, Trust-based privileges and cross-app layer." },
                    { title: "Global Imperial Consensus", phase: "PHASE_4", status: "QUEUED", desc: "Full activation of 400 sovereign nodes for asset mesh consensus." }
                  ].map((step, i) => (
                    <Card key={i} className="glass-card border-l-4 border-l-primary/30">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-[10px] font-mono border-primary/20">{step.phase}</Badge>
                          <Badge className={step.status === 'COMPLETED' ? 'bg-emerald-500' : step.status === 'ACTIVE' || step.status === 'IN_PROGRESS' ? 'bg-primary animate-pulse' : 'bg-muted'}>
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

              {analysis && (
                <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                    <ShieldAlert className="size-4" /> AI Strategic Assessment
                  </h3>
                  <Card className="glass-card border-amber-500/20">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase text-amber-500">Nora-00 Strategic Directive</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                        <p className="text-sm font-mono leading-relaxed text-amber-200">"{analysis.strategicDirective}"</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Architectural Risks</h4>
                          <div className="space-y-2">
                            {analysis.riskAnalysis.potentialErrors.map((e, i) => (
                              <div key={i} className="flex gap-2 text-[10px] text-amber-500/80 font-mono">
                                <Zap className="size-3 shrink-0" />
                                {e}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Future Requirements</h4>
                          <div className="space-y-2">
                            {analysis.futureRequirements.map((f, i) => (
                              <div key={i} className="flex gap-2 text-[10px] text-emerald-500/80 font-mono">
                                <CheckCircle2 className="size-3 shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Star className="size-4" /> Trust Matrix Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Dynamic Privileges:</p>
                  <div className="space-y-2">
                    {[
                      "Privacy by Design",
                      "User Data Sovereignty",
                      "Zero-Knowledge Proofs",
                      "Auto-Escalation Hooks",
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
                    <CheckCircle2 className="size-4" /> Empire Stability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    By rewarding ethical behavior and data justice with speed and access, we ensure that Mission 400 scales without legacy institutional drift.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-muted-foreground">Ethical Accuracy:</span>
                    <span className="text-xs font-bold text-emerald-500">100.00%</span>
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
