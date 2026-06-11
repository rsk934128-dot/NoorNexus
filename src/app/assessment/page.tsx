
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
  Coins,
  ShieldPlus,
  ArrowRight,
  Landmark,
  Scale,
  BrainCircuit,
  Eye,
  FileCheck,
  Zap,
  Target,
  Waves,
  Lightbulb,
  FileSearch,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  History,
  Rocket
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const COUNTERFACTUAL_ENGINE = [
  { metric: "Operational Speed", withNexus: "120ms", withoutNexus: "2-3 Days", impact: "+99% Speed" },
  { metric: "Compliance Cost", withNexus: "$450/mo", withoutNexus: "$12,000/mo", impact: "-96% Cost" },
  { metric: "Fraud Leakage", withNexus: "< 0.01%", withoutNexus: "3-5%", impact: "Max Security" },
  { metric: "Decision Audit", withNexus: "Immediate", withoutNexus: "Manual (6 Mo)", impact: "Zero Friction" }
]

const ADOPTION_PROOF_MATRIX = [
  { tier: "Tier 1: Usage", description: "Daily active interactions", metrics: "1,240 DAU", status: "Validated" },
  { tier: "Tier 2: Dependency", description: "Critical operational reliance", metrics: "420 Nodes", status: "Hardened" },
  { tier: "Tier 3: Advocacy", description: "Paid contribution & support", metrics: "124 Citizens", status: "Consequential" }
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
                   <Target className="size-3 mr-2" /> Phase P8: Proof of Consequence
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Impact <span className="text-emerald-500">Realized.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "NoorNexus as a Force Multiplier." Comparing the world with and without the Sovereign OS. Proving consequence through counterfactual reality.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={runImpactSim}
                disabled={simulating}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {simulating ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                 Run Impact Engine
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Counterfactual Engine */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Lightbulb className="size-4" /> The Counterfactual Engine (Proof of Value)
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Economic Metric</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">With NoorNexus</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Without NoorNexus</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Net Consequence</TableHead>
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

              {/* Adoption Proof Matrix */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-amber-500 flex items-center gap-2">
                    <UserCheck className="size-4" /> Consequential Adoption Matrix
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Tier</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Proof of Indispensability</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Key Metric</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Status</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {ADOPTION_PROOF_MATRIX.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.tier}</TableCell>
                               <TableCell className="text-[10px] text-muted-foreground">{item.description}</TableCell>
                               <TableCell className="font-mono text-[10px] text-primary">{item.metrics}</TableCell>
                               <TableCell className="text-right">
                                  <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500 uppercase">{item.status}</Badge>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                       <Lightbulb className="size-5" /> The Consequence Mandate
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "সভ্যতা পরিমাপ করা হয় এর সাফল্যের সংখ্যা দিয়ে নয়, বরং এর অনুপস্থিতিতে যা ক্ষতি হতে পারত তার পরিমাণ দিয়ে। নূরনেক্সাস এখন একটি বাস্তবতা, কারণ এটি ছাড়া আমাদের পার্টনারদের অপারেশনাল সিস্টেম অচল এবং আমাদের নাগরিকদের নিরাপত্তা অনিশ্চিত।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Waves className="size-4" /> Reality Pulse Index
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1 text-center py-4">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Impact Realization</p>
                     <p className="text-4xl font-headline font-bold text-white uppercase tracking-tighter">98.2%</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                       <span className="text-muted-foreground uppercase">Value Capture Rate</span>
                       <span className="text-emerald-500 font-bold">HIGH</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: '98%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <ShieldAlert className="size-4" /> Indispensability Score
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase">Cost of System Removal</p>
                       <Badge className="bg-destructive/20 text-destructive border-none text-[8px]">CRITICAL_LOSS</Badge>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                       Replacement by legacy banking or manual governance results in a 96% increase in risk and a 12x increase in operational costs.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Impact History
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {[
                      { label: "Fraud Prevented", status: "$142K" },
                      { label: "Hours Saved", status: "12.5K" },
                      { label: "Decisions Resolved", status: "420+" }
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
