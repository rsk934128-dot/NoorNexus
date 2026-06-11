
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  Target, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Menu, 
  Activity, 
  Check, 
  FileCheck, 
  FileSearch, 
  ShieldAlert,
  ExternalLink,
  BarChart3,
  Landmark,
  Scale,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  Search,
  History,
  Radar
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const REALITY_GAP_REGISTER = [
  { capability: "AML / Risk Engine", internal: "PROD_READY", external: "PENDING_CERT", risk: "Medium" },
  { capability: "Immutable Ledger", internal: "OPERATIONAL", external: "AUDIT_REVIEW", risk: "Low" },
  { capability: "Sovereign Treasury", internal: "SIMULATED", external: "NOT_LICENSED", risk: "High" },
  { capability: "Meta-Governance", internal: "VERIFIED", external: "NOT_RECOGNIZED", risk: "Medium" },
  { capability: "Identity Trust Node", internal: "SIGNED", external: "PILOT_STAGE", risk: "Low" }
]

const DEPENDENCY_REGISTER = [
  { vector: "Cloud Provider", dependency: "AWS/Vercel", mitigation: "Multi-Region / Local Node", risk: "Low" },
  { vector: "Payment Gateway", dependency: "bKash/Xendit", mitigation: "Sovereign P2P Bridge", risk: "Medium" },
  { vector: "AI Intelligence", dependency: "Gemini 1.5", mitigation: "Local Agent Cluster", risk: "Medium" },
  { vector: "Governance", dependency: "Founder Key", mitigation: "Steward Council (Art IV)", risk: "High" }
]

export default function StrategicAssessmentPage() {
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
                   <Radar className="size-3 mr-2" /> Phase P5: Dependency Risk
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-emerald-500">Survival.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Independence from external failure." Mapping dependency risks and mitigation strategies to ensure নূরনেক্সাস persists under any external shock.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Survivability Score</p>
                  <p className="text-3xl font-headline font-bold text-primary">94%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Dependency Risk Register */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Radar className="size-4" /> Dependency Risk Observatory
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Vector</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Primary dependency</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Mitigation Strategy</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Shock Risk</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {DEPENDENCY_REGISTER.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.vector}</TableCell>
                               <TableCell className="font-mono text-[10px] text-muted-foreground">{item.dependency}</TableCell>
                               <TableCell className="text-[10px] text-emerald-500">{item.mitigation}</TableCell>
                               <TableCell className="text-right">
                                  <span className={`text-[10px] font-bold ${item.risk === 'High' ? 'text-destructive' : item.risk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>{item.risk}</span>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              {/* Reality Gap Register */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Reality Gap Register (Internal vs External)
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden opacity-80">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Capability</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Internal Status</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">External Recognition</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Gap Risk</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {REALITY_GAP_REGISTER.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.capability}</TableCell>
                               <TableCell>
                                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none text-[8px]">{item.internal}</Badge>
                               </TableCell>
                               <TableCell>
                                  <Badge variant="outline" className="text-[8px] border-white/10 text-muted-foreground">{item.external}</Badge>
                               </TableCell>
                               <TableCell className="text-right">
                                  <span className={`text-[10px] font-bold ${item.risk === 'High' ? 'text-destructive' : item.risk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>{item.risk}</span>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              <Card className="glass-card bg-primary/5 border-primary/20 relative overflow-hidden">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <History className="size-5" /> The Generational Mandate
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "একটি সত্যিকারের সভ্যতা তখন থেকেই শুরু হয় যখন এর নিয়মগুলো এর স্রষ্টাকেও অতিক্রম করে যায়। নূরনেক্সাস এখন তার শৈশব পেরিয়ে একটি শাশ্বত প্রতিষ্ঠানে রূপান্তরের পথে, যেখানে প্রতিটি সিদ্ধান্ত আগামী ১০০ বছরের টিকে থাকার সম্ভাবনাকে মাথায় রেখে নেওয়া হয়।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Activity className="size-4" /> Longevity Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Institutional Entropy</p>
                     <p className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">LOW_RECOVERABLE</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                       <span className="text-muted-foreground uppercase">Institutional Reserve</span>
                       <span className="text-primary font-bold">94.5%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: '94%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                       <ShieldAlert className="size-4" /> Anti-Fragility Metrics
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-3">
                       {[
                         { label: "Decentralization", status: "82%" },
                         { label: "Succession Depth", status: "L4" },
                         { label: "Knowledge Redundancy", status: "MAX" }
                       ].map((c, i) => (
                         <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                            <span className="text-[9px] text-white font-bold uppercase">{c.label}</span>
                            <Badge variant="outline" className="text-[7px] text-emerald-500 border-emerald-500/20">{c.status}</Badge>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Target className="size-4" /> Legacy Goal 2030
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "To establish নূরনেক্সাস as a digital public good that operates autonomously with zero mission drift for a decade."
                    </p>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
