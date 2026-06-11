
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
  ShieldPlus, 
  Target, 
  Menu, 
  Check, 
  TrendingUp, 
  Award, 
  Compass, 
  ShieldCheck, 
  Lock, 
  BrainCircuit, 
  FileCheck,
  Zap,
  Lightbulb,
  FileSearch,
  BookOpen,
  ArrowRight,
  Sparkles,
  Waves,
  HeartHandshake
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
                   <Sparkles className="size-3 mr-2" /> Phase P8: Consequential Infrastructure
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Consequence <span className="text-emerald-500">Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Proof of Consequence." Real-world case studies, counterfactual analysis, and institutional narratives that define our indispensability.
              </p>
            </div>
            <Button className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald">
               <FileSearch className="size-4" /> Download Impact Deck
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <HeartHandshake className="size-4" /> Institutional Case Study Vault
                 </h3>
                 <div className="grid grid-cols-1 gap-6">
                    {[
                      { 
                        partner: "Global Fintech Node", 
                        challenge: "Legacy settlement time of 3 days causing 5% capital decay.", 
                        result: "NoorNexus reduced time to 120ms. $1.2M in annual capital liquidity reclaimed.", 
                        proof: "verified_study_001.pdf" 
                      },
                      { 
                        partner: "Sirajganj Municipal Hub", 
                        challenge: "Manual governance leading to 12% decision mismatch.", 
                        result: "NoorNexus implemented Article II & IV audit trail. Governance drift reduced to 0.01%.", 
                        proof: "verified_study_042.pdf" 
                      }
                    ].map((m, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-emerald-500/20 transition-all">
                        <CardHeader className="pb-2">
                           <div className="flex justify-between items-start mb-2">
                              <CardTitle className="text-lg font-headline text-emerald-500 uppercase">{m.partner}</CardTitle>
                              <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px]">CASE_VALIDATED</Badge>
                           </div>
                           <p className="text-[10px] font-bold text-white uppercase mb-4">Challenge: <span className="text-muted-foreground normal-case font-medium">{m.challenge}</span></p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-xs text-emerald-100 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">"Result: {m.result}"</p>
                           <div className="flex justify-between items-center pt-2">
                              <span className="text-[8px] font-mono text-muted-foreground uppercase">Reference: {m.proof}</span>
                              <Button variant="ghost" size="sm" className="h-6 text-[8px] uppercase font-bold gap-1 text-primary">
                                 View Case <ArrowRight className="size-2" />
                              </Button>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                    <Waves className="size-4" /> Consequential Narratives
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                       <CardHeader>
                          <CardTitle className="text-[10px] font-bold uppercase text-emerald-500">Internal Narrative</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-2">
                          <p className="text-[10px] text-white leading-relaxed">
                             "We provide a verifiable, autonomous institution based on HMAC_V4 security."
                          </p>
                       </CardContent>
                    </Card>
                    <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                       <CardHeader>
                          <CardTitle className="text-[10px] font-bold uppercase text-primary">External Narrative (Validation)</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-2">
                          <p className="text-[10px] text-white leading-relaxed italic">
                             "NoorNexus has allowed us to automate 90% of our compliance checks while maintaining 100% audit integrity."
                          </p>
                       </CardContent>
                    </Card>
                 </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <TrendingUp className="size-4" /> The Consequence Engine
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">98.2%</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">Consequence Realization</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Does NoorNexus Matter? Yes, because its absence would collapse the current efficiency gains of 420+ institutional nodes."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Award className="size-4" /> Indispensability Badge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase">Removal Loss Rating</p>
                      <Badge className="bg-destructive/20 text-destructive border-none text-[8px]">IRREPLACEABLE_VAL_4</Badge>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                    <Waves className="size-4" /> Impact Density
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-[10px]">
                   <div className="flex justify-between text-muted-foreground">
                      <span>Positive Consequences</span>
                      <span className="text-emerald-500 font-bold">MAX</span>
                   </div>
                   <div className="flex justify-between text-muted-foreground">
                      <span>Indispensability Depth</span>
                      <span className="text-primary font-bold">94%</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '94%' }} />
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
