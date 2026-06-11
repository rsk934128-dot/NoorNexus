
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
  Search
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const REALITY_GAP_REGISTER = [
  { capability: "AML / Risk Engine", internal: "PROD_READY", external: "PENDING_CERT", risk: "Medium" },
  { capability: "Immutable Ledger", internal: "OPERATIONAL", external: "AUDIT_REVIEW", risk: "Low" },
  { capability: "Sovereign Treasury", internal: "SIMULATED", external: "NOT_LICENSED", risk: "High" },
  { capability: "Meta-Governance", internal: "VERIFIED", external: "NOT_RECOGNIZED", risk: "Medium" },
  { capability: "Identity Trust Node", internal: "SIGNED", external: "PILOT_STAGE", risk: "Low" }
]

const CERTIFICATION_PIPELINE = [
  { step: "Evidence Collection", status: "COMPLETE", date: "24h ago" },
  { step: "Independent Review", status: "IN_PROGRESS", date: "Scheduled" },
  { step: "Certification Issuance", status: "PENDING", date: "Q3 2024" },
  { step: "Regulatory Recognition", status: "TARGET", date: "2025" }
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
                   <Landmark className="size-3 mr-2" /> Phase P4: Institutional Legitimacy
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Legitimacy <span className="text-emerald-500">Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Verified ≠ Recognized." The transition from internal evidence to independent institutional validation and regulatory reality.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Legitimacy Score</p>
                  <p className="text-3xl font-headline font-bold text-primary">42%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Reality Gap Register */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Reality Gap Register (Internal vs External)
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
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

              {/* Certification Pipeline */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Award className="size-4" /> Independent Certification Pipeline
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {CERTIFICATION_PIPELINE.map((p, i) => (
                      <Card key={i} className={`glass-card p-4 space-y-3 relative overflow-hidden ${p.status === 'COMPLETE' ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-white/5'}`}>
                         <p className="text-[9px] font-bold text-muted-foreground uppercase">{p.step}</p>
                         <div className="flex justify-between items-end">
                            <p className="text-xs font-headline font-bold text-white uppercase">{p.status}</p>
                            <span className="text-[8px] font-mono text-muted-foreground">{p.date}</span>
                         </div>
                         <div className={`h-1 rounded-full ${p.status === 'COMPLETE' ? 'bg-emerald-500' : p.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-white/5'}`} style={{ width: '100%' }} />
                      </Card>
                    ))}
                 </div>
              </section>

              <Card className="glass-card bg-primary/5 border-primary/20 relative overflow-hidden">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <Briefcase className="size-5" /> The Institutional Mandate
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "সভ্যতা তখনই স্থায়ী হয় যখন এটি তার নাগরিকদের বাইরেও একটি স্বাধীন সত্তা হিসেবে স্বীকৃত পায়। নূরনেক্সাসের বর্তমান লক্ষ্য হলো অভ্যন্তরীণ সক্ষমতাকে বাহ্যিক অডিট এবং বৈশ্বিক স্বীকৃতির মাধ্যমে আইনসম্মত প্রতিষ্ঠানে রূপান্তর করা।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <Activity className="size-4" /> Legitimacy Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Public Trust Level</p>
                     <p className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">EMERGING</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                       <span className="text-muted-foreground uppercase">External Audit Surface</span>
                       <span className="text-primary font-bold">24.5%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: '25%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                       <ShieldAlert className="size-4" /> Regulatory Readiness
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-3">
                       {[
                         { label: "Data Residency (UAE)", status: "COMPLIANT" },
                         { label: "Fintech Sandbox (BD)", status: "APPLIED" },
                         { label: "Governance Audit (UK)", status: "PENDING" }
                       ].map((c, i) => (
                         <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                            <span className="text-[9px] text-white font-bold uppercase">{c.label}</span>
                            <Badge variant="outline" className={`text-[7px] ${c.status === 'COMPLIANT' ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>{c.status}</Badge>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Target className="size-4" /> Strategic Goal 2025
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "To be the first Digital Civilization Stack recognized by a Sovereign State as a secondary administrative infrastructure."
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
