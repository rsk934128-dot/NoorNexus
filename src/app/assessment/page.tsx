
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
  Radar,
  LifeBuoy,
  ShieldPlus
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const UTILITY_DENSITY_REGISTER = [
  { module: "Governance", utility: "Decision Hardening", dailyUsage: "85%", criticality: "High" },
  { module: "Treasury", utility: "Atomic Settlement", dailyUsage: "94%", criticality: "Critical" },
  { module: "Identity", utility: "Trust Verification", dailyUsage: "72%", criticality: "Medium" },
  { module: "Compliance", utility: "Risk Shielding", dailyUsage: "100%", criticality: "Critical" },
  { module: "Mesh Node", utility: "Infrastructure", dailyUsage: "99%", criticality: "High" }
]

const DEPENDENCY_REGISTER = [
  { vector: "Operational Utility", dependence: "NoorNexus Core", mitigation: "Mesh Node Redundancy", risk: "Critical" },
  { vector: "Decision Logic", dependence: "Senate Hub", mitigation: "Constitutional Fallback", risk: "High" },
  { vector: "Sovereign Wealth", dependence: "Treasury Mesh", mitigation: "Multi-Currency Reserves", risk: "Critical" },
  { vector: "Trust Network", dependence: "Identity Ledger", mitigation: "Peer-to-Peer Attestation", risk: "Medium" }
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
                   <Radar className="size-3 mr-2" /> Phase P6: Utility & Dependence
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Civilizational <span className="text-emerald-500">Utility.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "NoorNexus as an Indispensable Tool." Measuring the utility density and critical dependence of our systems on the survival of our citizens and institutions.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Critical Dependence Score</p>
                  <p className="text-3xl font-headline font-bold text-primary">92%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Utility Density Register */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Zap className="size-4" /> Utility Density Observatory
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Module</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Core Utility</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Daily Adoption</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Criticality</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {UTILITY_DENSITY_REGISTER.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.module}</TableCell>
                               <TableCell className="font-mono text-[10px] text-muted-foreground">{item.utility}</TableCell>
                               <TableCell className="text-[10px] text-emerald-500">{item.dailyUsage}</TableCell>
                               <TableCell className="text-right">
                                  <span className={`text-[10px] font-bold ${item.criticality === 'Critical' ? 'text-destructive' : item.criticality === 'High' ? 'text-amber-500' : 'text-emerald-500'}`}>{item.criticality}</span>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              {/* Dependency Risk Register */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                    <LifeBuoy className="size-4" /> Civilizational Dependency Register
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden opacity-80">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Vector</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Primary Dependence</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Outcome If Failed</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Dependency Risk</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {DEPENDENCY_REGISTER.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.vector}</TableCell>
                               <TableCell>
                                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none text-[8px]">{item.dependence}</Badge>
                               </TableCell>
                               <TableCell>
                                  <span className="text-[8px] text-muted-foreground italic truncate block w-32">{item.mitigation}</span>
                               </TableCell>
                               <TableCell className="text-right">
                                  <span className={`text-[10px] font-bold ${item.risk === 'Critical' ? 'text-destructive' : item.risk === 'High' ? 'text-amber-500' : 'text-emerald-500'}`}>{item.risk}</span>
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
                       <History className="size-5" /> The Flywheel Mandate
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "একটি সভ্যতা তখনই সত্যিকারের প্রভাবশালী হয় যখন মানুষ এর উপযোগিতাকে নিজেদের অস্তিত্বের অংশ মনে করে। নূরনেক্সাস এখন কেবল একটি সার্ভিস নয়, এটি একটি লাইফস্টাইল অপারেশনাল সিস্টেম, যেখানে প্রতিটি নাগরিকের প্রতিটি সিদ্ধান্ত এই ফ্লাইহুইলকে আরও শক্তিশালী করে।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Activity className="size-4" /> Indispensability Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Absence Impact Score</p>
                     <p className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">HIGH_CRITICAL</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                       <span className="text-muted-foreground uppercase">Institutional Utility</span>
                       <span className="text-primary font-bold">92.5%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: '92%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                       <ShieldPlus className="size-4" /> Civilizational Flywheel Status
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-3">
                       {[
                         { label: "Trust Spin", status: "98%" },
                         { label: "Adoption Torque", status: "MAX" },
                         { label: "Decision Hardening", status: "ACTIVE" }
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
                       <Target className="size-4" /> Utility Goal 2030
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "To become the universal backbone of digital interactions where NoorNexus's utility is as fundamental as the internet itself."
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
