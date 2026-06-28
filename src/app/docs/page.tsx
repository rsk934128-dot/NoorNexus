"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  History, 
  Activity, 
  Target, 
  Menu, 
  Award, 
  ShieldCheck, 
  Lock, 
  FileCheck,
  Zap,
  Lightbulb,
  FileSearch,
  BookOpen,
  ArrowRight,
  Sparkles,
  Waves,
  HeartHandshake,
  Eye,
  Unlock,
  AlertTriangle,
  Search,
  Globe,
  Scale,
  Rocket,
  Link2
} from "lucide-react"

export default function DocsPage() {
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Globe className="size-3 mr-2" /> Phase Ψ: Reality of Existence
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Reality <span className="text-emerald-500">Supremacy.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "No internal metric shall override external reality." নূরনেক্সাস এখন তার নিজস্ব ধারণার ঊর্ধ্বে বাস্তব পৃথিবীর ওপর নির্ভরশীল।
              </p>
            </div>
            <div className="flex gap-4">
               <Button className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald">
                  <FileSearch className="size-4" /> Reality Proof Audit
               </Button>
               <Button variant="outline" className="border-white/10 h-12 uppercase tracking-widest text-[10px] font-bold">
                  Independent Case Studies
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Scale className="size-4" /> The Sovereign Constitution
                 </h3>
                 <div className="grid grid-cols-1 gap-6">
                    <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                      <CardHeader>
                         <CardTitle className="text-lg font-headline text-emerald-500 uppercase">Article IX: Reality Supremacy</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-sm text-emerald-100 leading-relaxed italic">
                            "সিস্টেমের ভেতরের কোনো ড্যাশবোর্ড বা স্কোর যদি বাস্তব ব্যবহারকারীর অভিজ্ঞতার সাথে না মেলে, তবে বাস্তব ব্যবহারকারীর অভিজ্ঞতাই চূড়ান্ত সত্য বলে গণ্য হবে। নূরনেক্সাস নিজেকে নয়, বাস্তবতাকে উদযাপন করে।"
                         </p>
                      </CardContent>
                    </Card>
                    <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                      <CardHeader>
                         <CardTitle className="text-lg font-headline text-primary uppercase">Article X: Link Sovereignty</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-sm text-primary-foreground/80 leading-relaxed italic">
                            "NoorNexus shall not rely on external link-shortening or dynamic redirection services. All deep-links must be served directly from the Sovereign Mesh to ensure institutional longevity and prevent dependency on sunsetting third-party APIs."
                         </p>
                      </CardContent>
                    </Card>
                    <Card className="glass-card border-white/5">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline text-white uppercase">Article VII: Institutional Longevity</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-xs text-muted-foreground leading-relaxed">
                            "No capability shall be optimized at the expense of long-term institutional survival."
                         </p>
                      </CardContent>
                    </Card>
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-amber-500 flex items-center gap-2">
                    <Rocket className="size-4" /> The Reality Roadmap (Next 5 Objectives)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { step: "1. Real Partner Contract", desc: "Moving from simulation to first 3 institutional contracts.", icon: HeartHandshake },
                      { step: "2. External Audit Report", desc: "First independent evaluation by a third-party firm.", icon: ShieldCheck },
                      { step: "3. Voluntary Revenue Proof", desc: "First recurring payment from a client who depends on the OS.", icon: Zap },
                      { step: "4. Public Failure Postmortem", desc: "Transparent report of the first operational incident.", icon: History },
                      { step: "5. Partner-Led Case Study", desc: "Success story written by an external institution, not us.", icon: BookOpen },
                    ].map((s, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-amber-500/20 transition-all">
                        <CardContent className="p-4 flex items-start gap-4">
                           <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                              <s.icon className="size-5" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-white uppercase">{s.step}</p>
                              <p className="text-[9px] text-muted-foreground leading-relaxed">{s.desc}</p>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <Eye className="size-4" /> The Reality Mirror
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">98.4%</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">External Reliability Gap</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Internal scores are for guidance; external reality is for finality. We bridge this gap through constant verification."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Anti-Success Trap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase">Internal Validation Cap</p>
                      <Badge className="bg-primary/20 text-primary border-none text-[8px]">REALITY_ONLY</Badge>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                    <Unlock className="size-4" /> Open Trust Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-[10px]">
                   <div className="flex justify-between text-muted-foreground">
                      <span>Public Truth Factor</span>
                      <span className="text-emerald-500 font-bold">MAX</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
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
