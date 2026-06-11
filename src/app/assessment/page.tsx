
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
  Star, 
  Sparkles,
  HeartHandshake,
  BrainCircuit,
  Quote,
  TrendingUp,
  CheckCircle2,
  Crown,
  ClipboardCheck,
  Handshake,
  Share2,
  Activity,
  Lightbulb,
  LineChart,
  ShieldHalf,
  Database,
  Lock,
  ArrowRight,
  Flame,
  Search,
  Scale,
  Briefcase,
  PieChart,
  BarChart3,
  Rocket
} from "lucide-react"
import { SovereignLogo } from "@/components/sovereign-logo"

const PILOT_SUCCESS_SCORECARD = [
  { partner: "Fintech Node 01", activation: 98, usage: 85, retention: 100, satisfaction: "High" },
  { partner: "University Mesh", activation: 42, usage: 60, retention: 90, satisfaction: "Medium" },
  { partner: "Sovereign Bank AE", activation: 12, usage: 20, retention: 100, satisfaction: "N/A" }
]

const REVENUE_VALIDATION = [
  { stream: "Transaction Fees", projected: 5000, actual: 1250, health: "Growing" },
  { stream: "Certifications", projected: 2000, actual: 2600, health: "Exceeding" },
  { stream: "Builder Modules", projected: 1000, actual: 400, health: "Stable" }
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
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <Rocket className="size-3 mr-2" /> Phase ΩΩΩ: Pilot Success Framework
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Execution <span className="text-emerald-500">Validation.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 167: Pilot Success Scorecard. Measuring Activation, Usage, and Revenue generated from the first 10 Institutional Partners.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Success Velocity</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">82%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Pilot Success Scorecard */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <ClipboardCheck className="size-4" /> Pilot Success Scorecard
                 </h3>
                 <div className="space-y-4">
                    {PILOT_SUCCESS_SCORECARD.map((item, i) => (
                      <Card key={i} className="glass-card bg-white/2 border-white/5">
                        <CardContent className="p-6">
                           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                    <Briefcase className="size-5" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-white uppercase">{item.partner}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase">SATISFACTION: {item.satisfaction}</p>
                                 </div>
                              </div>
                              <div className="grid grid-cols-3 gap-8 text-center flex-1 max-w-sm">
                                 <div className="space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Activation</p>
                                    <p className="text-lg font-headline font-bold text-emerald-500">{item.activation}%</p>
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Usage</p>
                                    <p className="text-lg font-headline font-bold text-primary">{item.usage}%</p>
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Retention</p>
                                    <p className="text-lg font-headline font-bold text-white">{item.retention}%</p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Revenue Stream Validation */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <BarChart3 className="size-4" /> Revenue Stream Validation
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {REVENUE_VALIDATION.map((rev, i) => (
                      <Card key={i} className="glass-card bg-emerald-500/5 border-emerald-500/20">
                        <CardContent className="p-5 space-y-4">
                           <div className="flex justify-between items-start">
                              <p className="text-[10px] font-bold text-white uppercase">{rev.stream}</p>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">{rev.health}</Badge>
                           </div>
                           <div className="space-y-1 text-center">
                              <p className="text-2xl font-headline font-bold text-white">${rev.actual.toLocaleString()}</p>
                              <p className="text-[8px] text-muted-foreground font-mono">Projected: ${rev.projected.toLocaleString()}</p>
                           </div>
                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: `${(rev.actual / rev.projected) * 100}%` }} />
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <Card className="glass-card bg-primary/5 border-primary/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Database className="size-48 text-primary" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <Quote className="size-5" /> The Execution Mandate
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 relative z-10">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "আর্কিটেকচার হলো শুরু, কিন্তু রিয়েল-ওয়ার্ল্ড ভ্যালু জেনারেশনই হলো শেষ কথা। আমাদের প্রথম ১০টি পাইলট পার্টনারের সফল ব্যবসা নূরনেক্সাসকে একটি আর্কিটেকচার থেকে একটি লাভজনক প্রতিষ্ঠানে উন্নীত করবে।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Activity className="size-4" /> Trust Velocity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-headline font-bold text-emerald-100 leading-relaxed italic">
                    "Institutional Trust Velocity is the rate at which institutions adopt and integrate our stack."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Monthly Adoption Speed</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">+14.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Certification Status
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-3">
                       {[
                         { label: "Security Review", status: "COMPLETE", date: "Jan 2026" },
                         { label: "Architecture Audit", status: "COMPLETE", date: "Feb 2026" },
                         { label: "Pentest L4", status: "IN_PROGRESS", date: "ETA: 15d" }
                       ].map((c, i) => (
                         <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                            <div className="space-y-0.5">
                               <p className="text-[9px] text-white font-bold uppercase">{c.label}</p>
                               <p className="text-[7px] text-muted-foreground font-mono">{c.date}</p>
                            </div>
                            <Badge variant="outline" className={`text-[7px] ${c.status === 'COMPLETE' ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>{c.status}</Badge>
                         </div>
                       ))}
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
