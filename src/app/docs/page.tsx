
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
  Search
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
                   <Globe className="size-3 mr-2" /> Phase Ω: Public Reality
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Public <span className="text-emerald-500">Evidence.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Independent Verification Registry." NoorNexus success is not a claim; it is a publicly verifiable record of external audits and failure postmortems.
              </p>
            </div>
            <div className="flex gap-4">
               <Button className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald">
                  <FileSearch className="size-4" /> Public Audit Deck
               </Button>
               <Button variant="outline" className="border-white/10 h-12 uppercase tracking-widest text-[10px] font-bold">
                  Postmortem Archive
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <HeartHandshake className="size-4" /> Independent Evidence Registry
                 </h3>
                 <div className="grid grid-cols-1 gap-6">
                    {[
                      { 
                        entity: "Independent Security Hub", 
                        type: "Penetration Test Report", 
                        verdict: "L4_HARDENED - No critical vulnerabilities found in HMAC_V4 protocol.", 
                        proof: "audit_report_sec_09.pdf" 
                      },
                      { 
                        entity: "University Research Mesh", 
                        type: "Governance Efficiency Audit", 
                        verdict: "NoorNexus Senate model outperforms legacy structures by 12x in implementation speed.", 
                        proof: "academic_review_gov_12.pdf" 
                      }
                    ].map((m, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-emerald-500/20 transition-all relative">
                        <div className="absolute top-4 right-4">
                           <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">THIRD_PARTY_VERIFIED</Badge>
                        </div>
                        <CardHeader className="pb-2">
                           <div className="flex justify-between items-start mb-2">
                              <CardTitle className="text-lg font-headline text-emerald-500 uppercase">{m.entity}</CardTitle>
                           </div>
                           <p className="text-[10px] font-bold text-white uppercase mb-4">Audit Type: <span className="text-muted-foreground normal-case font-medium">{m.type}</span></p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-xs text-emerald-100 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">"Verdict: {m.verdict}"</p>
                           <div className="flex justify-between items-center pt-2">
                              <span className="text-[8px] font-mono text-muted-foreground uppercase">Reference: {m.proof}</span>
                              <Button variant="ghost" size="sm" className="h-6 text-[8px] uppercase font-bold gap-1 text-primary">
                                 Download Record <ArrowRight className="size-2" />
                              </Button>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                    <History className="size-4" /> Failure Transparency Ledger (Postmortems)
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {[
                      { event: "Node-04 Drift Incident", date: "Cycle 41", lesson: "Automated key rotation required a 2s longer cooling period. Protocol updated.", impact: "Low" },
                      { event: "Reputation Inflation Attempt", date: "Cycle 39", lesson: "Sybil detection thresholds were set too high for Tier 1 users. Adjusted to L4.", impact: "Medium" }
                    ].map((h, i) => (
                      <Card key={i} className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardContent className="p-4 space-y-2">
                           <div className="flex justify-between items-center">
                              <p className="text-[10px] font-bold text-white uppercase">{h.event}</p>
                              <Badge variant="outline" className="text-[7px] border-amber-500/20 text-amber-500">{h.date}</Badge>
                           </div>
                           <p className="text-[10px] text-muted-foreground italic leading-relaxed">"Lesson: {h.lesson}"</p>
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
                    <Eye className="size-4" /> Public Trust Mirror
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                     <p className="text-4xl font-headline font-bold text-white tracking-tighter">96.4%</p>
                     <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">Transparency Index</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Every success and failure is our teacher. We publish our failures as openly as our successes to earn the world's second chance."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Anti-Dogma Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase">Assumption Review Rate</p>
                      <Badge className="bg-primary/20 text-primary border-none text-[8px]">CONTINUOUS_CHALLENGE</Badge>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                    <Unlock className="size-4" /> Open Truth Gate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-[10px]">
                   <div className="flex justify-between text-muted-foreground">
                      <span>Public Verifiability</span>
                      <span className="text-emerald-500 font-bold">MAX</span>
                   </div>
                   <div className="flex justify-between text-muted-foreground">
                      <span>Audit Completion</span>
                      <span className="text-primary font-bold">100%</span>
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
