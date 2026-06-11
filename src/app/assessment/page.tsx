
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Menu, 
  Activity, 
  UserCheck,
  Zap, 
  Target, 
  Waves, 
  Lightbulb, 
  FileSearch, 
  Loader2, 
  History,
  ShieldAlert,
  Globe,
  AlertTriangle,
  ArrowRight
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const CIVILIZATION_SCENARIOS = [
  { scenario: "Geopolitical Disruption", impact: "Protocol Isolation", recovery: "L4_SYNC_RESTORED", risk: "Medium" },
  { scenario: "Economic Recession", impact: "Liquidity Tightening", recovery: "RESERVE_INJECTION", risk: "High" },
  { scenario: "Mass Citizen Exit", impact: "Trust Decay", recovery: "TRUST_RECOVERY_PROTOCOL", risk: "Critical" },
  { scenario: "AI Concentration Failure", impact: "Decision Blindness", recovery: "HUMAN_OVERRIDE_ACT", risk: "Low" }
]

const COUNTERFACTUAL_ENGINE = [
  { metric: "Operational Speed", withNexus: "120ms", withoutNexus: "2-3 Days", impact: "+99% Speed" },
  { metric: "Compliance Cost", withNexus: "$450/mo", withoutNexus: "$12,000/mo", impact: "-96% Cost" },
  { metric: "Fraud Leakage", withNexus: "< 0.01%", withoutNexus: "3-5%", impact: "Max Security" },
  { metric: "Decision Audit", withNexus: "Immediate", withoutNexus: "Manual (6 Mo)", impact: "Zero Friction" }
]

export default function StrategicAssessmentPage() {
  const [simulating, setSimulating] = useState(false)

  const runImpactSim = () => {
    setSimulating(true)
    setTimeout(() => setSimulating(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Globe className="size-3 mr-2" /> Phase Ω: Public Reality Stress
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Reality <span className="text-emerald-500">Scenarios.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Civilization Level Stress Testing." Beyond technical failures, we simulate reality-based shocks to test the NoorNexus resiliency in the public domain.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={runImpactSim}
                disabled={simulating}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {simulating ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                 Simulate Reality Shock
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Civilization Scenarios */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Civilizational Stress Scenarios
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Reality Shock</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">System Impact</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Recovery Strategy</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Risk Score</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {CIVILIZATION_SCENARIOS.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.scenario}</TableCell>
                               <TableCell className="text-muted-foreground text-[10px] font-mono uppercase">{item.impact}</TableCell>
                               <TableCell className="text-emerald-500 font-bold text-[10px] font-mono">{item.recovery}</TableCell>
                               <TableCell className="text-right">
                                  <Badge variant="outline" className={`text-[9px] uppercase ${item.risk === 'Critical' ? 'border-destructive text-destructive' : 'border-amber-500 text-amber-500'}`}>{item.risk}</Badge>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              {/* Counterfactual Engine */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Lightbulb className="size-4" /> The Counterfactual Engine (Truth Gap)
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Economic Metric</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">With NoorNexus</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Without NoorNexus</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Impact</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {COUNTERFACTUAL_ENGINE.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.metric}</TableCell>
                               <TableCell className="text-emerald-500 font-bold text-xs">{item.withNexus}</TableCell>
                               <TableCell className="text-destructive font-bold text-xs">{item.withoutNexus}</TableCell>
                               <TableCell className="text-right">
                                  <Badge variant="outline" className="text-[9px] border-emerald-500/20 text-emerald-500 uppercase">{item.impact}</Badge>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                       <ShieldAlert className="size-5" /> The Second Chance Principle
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "সভ্যতা পরিমাপ করা হয় এর সাফল্যের সংখ্যা দিয়ে নয়, বরং বিপর্যয়ের মুখে ফিরে আসার ক্ষমতা দিয়ে। আমরা নূরনেক্সাসকে এমনভাবে ডিজাইন করছি যাতে এটি একটি বড় ব্যর্থতার পরও আবার বিশ্বস্ততা ফিরে পেতে পারে।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Waves className="size-4" /> Trust Resiliency Index
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1 text-center py-4">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Public Forgiveness Potential</p>
                     <p className="text-4xl font-headline font-bold text-white uppercase tracking-tighter">92.4%</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                       <span className="text-muted-foreground uppercase">Resiliency Grade</span>
                       <span className="text-emerald-500 font-bold">MAX</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Target className="size-4" /> Anti-Dogma Auditor
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase">Self-Correction Rate</p>
                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">OPTIMAL</Badge>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                       The system automatically challenges its own success assumptions every 24 hours to prevent institutional blindness.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Recovery History
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {[
                      { label: "Postmortem Published", status: "CYCLE 41" },
                      { label: "Stress Test Passed", status: "GEOPOLITICAL" },
                      { label: "Audit Resolution", status: "100%" }
                    ].map((c, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                         <span className="text-[9px] text-white font-bold uppercase">{c.label}</span>
                         <Badge variant="outline" className="text-[7px] text-emerald-500 border-emerald-500/20">{c.status}</Badge>
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
