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
  ArrowRight,
  Scale,
  BrainCircuit,
  HeartPulse,
  Landmark,
  Database,
  Eye
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const THREE_COURTS_TRUTH = [
  { court: "Technical Truth", question: "Does it work?", proof: "Uptime & Security Audit", status: "VERIFIED" },
  { court: "Economic Truth", question: "Does it pay?", proof: "MRR & Retention", status: "PENDING_REALITY" },
  { court: "Human Truth", question: "Does it trust?", proof: "Reputation & Crisis Recovery", status: "EMERGING" }
]

const REALITY_GAP_REGISTER = [
  { capability: "AML Engine", internal: "Built", external: "Not Certified", action: "Apply for Audit" },
  { capability: "Treasury", internal: "Simulated", external: "Not Licensed", action: "Banking Sandbox" },
  { capability: "Governance", internal: "Verified", external: "Not Recognized", action: "Academic Review" }
]

export default function StrategicAssessmentPage() {
  const [simulating, setSimulating] = useState(false)

  const runRealityCheck = () => {
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
                   <Landmark className="size-3 mr-2" /> Phase Ψ: The 3 Courts of Truth
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Reality <span className="text-emerald-500">Audit.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Technical, Economic, and Human." NoorNexus must pass three courts of truth to exist in the real world.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={runRealityCheck}
                disabled={simulating}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {simulating ? <Loader2 className="size-4 animate-spin" /> : <Eye className="size-4" />}
                 Run Reality Check
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Three Courts of Truth */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Scale className="size-4" /> The Three Courts of Truth
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {THREE_COURTS_TRUTH.map((court, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-emerald-500/20 transition-all">
                        <CardHeader className="pb-2">
                           <CardTitle className="text-xs font-headline text-white uppercase">{court.court}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           <p className="text-[11px] text-muted-foreground italic">"{court.question}"</p>
                           <div className="pt-2 border-t border-white/5">
                              <p className="text-[9px] font-bold text-white uppercase">Proof: {court.proof}</p>
                              <Badge className={`mt-2 text-[8px] border-none ${court.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>{court.status}</Badge>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Reality Gap Register */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Reality Gap Register (External Verification)
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Capability</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Internal Status</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">External Recognition</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Action</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {REALITY_GAP_REGISTER.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.capability}</TableCell>
                               <TableCell className="text-emerald-500 font-bold text-[10px] font-mono">{item.internal}</TableCell>
                               <TableCell className="text-destructive font-bold text-[10px] font-mono">{item.external}</TableCell>
                               <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" className="text-[8px] uppercase font-bold text-primary gap-1">
                                    {item.action} <ArrowRight className="size-2" />
                                  </Button>
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
                       <ShieldAlert className="size-5" /> The Founder Disappearance Test
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       <p className="text-xs text-muted-foreground leading-relaxed italic">
                          "যদি কাল প্রতিষ্ঠাতা এবং বর্তমান টিম না থাকে, তবে নূরনেক্সাস কি তার মূল নীতিগুলো ধরে রেখে টিকে থাকতে পারবে? বর্তমান স্বয়ংক্রিয় সক্ষমতা স্কোর:"
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Autonomy Factor</p>
                             <p className="text-2xl font-headline font-bold text-emerald-500">84%</p>
                          </div>
                          <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Survival Probability</p>
                             <p className="text-2xl font-headline font-bold text-emerald-500">HIGH</p>
                          </div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Database className="size-4" /> Evidence Ledger Stability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1 text-center py-4">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Unbiased Truth Score</p>
                     <p className="text-4xl font-headline font-bold text-white uppercase tracking-tighter">96.7</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                       <span className="text-muted-foreground uppercase">Reality Consistency</span>
                       <span className="text-emerald-500 font-bold">OPTIMAL</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: '96%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Landmark className="size-4" /> Social Contract Pulse
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase">Civilization Reliance</p>
                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">SECURE</Badge>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                       "Governance is not enough. Trust is the only currency that survives technological shifts."
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Operational History
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {[
                      { label: "Reality Check Passed", status: "CYCLE 42" },
                      { label: "Autonomy Audit", status: "84%" },
                      { label: "Truth Court Sync", status: "100%" }
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
