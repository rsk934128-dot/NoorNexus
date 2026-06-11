
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
  Rocket,
  Check,
  FileCheck
} from "lucide-react"
import { SovereignLogo } from "@/components/sovereign-logo"

const PMF_CHECKLIST = [
  { label: "Governance Wedge Confirmed", status: "VERIFIED", evidence: "Pilot 01 dependency verified." },
  { label: "Economic Loop (Revenue)", status: "IN_PROGRESS", evidence: "$4.2k MRR generated." },
  { label: "Institutional Dependence", status: "PENDING", evidence: "Target: 3+ Essential integrations." },
  { label: "Trust Federation Proof", status: "READY", evidence: "Sovereign Certificate issued." }
]

const REVENUE_VALIDATION = [
  { stream: "Governance Subscriptions", projected: 5000, actual: 1200, health: "Growing" },
  { stream: "Certification Fees", projected: 2000, actual: 2600, health: "Exceeding" },
  { stream: "API Wedge Access", projected: 1000, actual: 400, health: "Stable" }
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
                   <Target className="size-3 mr-2" /> Phase ΩΩΩΩ: PMF Validation
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Institutional <span className="text-emerald-500">Value.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 167: Institutional Dependence Scorecard. Measuring how deeply partners rely on our Governance, Trust, and Audit stack.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">PMF Validation Score</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">42%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* PMF Checklist */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <FileCheck className="size-4" /> Product-Market Fit Checklist
                 </h3>
                 <div className="space-y-4">
                    {PMF_CHECKLIST.map((item, i) => (
                      <Card key={i} className="glass-card bg-white/2 border-white/5 hover:border-primary/20 transition-all">
                        <CardContent className="p-6">
                           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                              <div className="flex items-center gap-4">
                                 <div className={`p-3 rounded-xl ${item.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-500' : item.status === 'IN_PROGRESS' ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'}`}>
                                    <Check className="size-5" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-white uppercase">{item.label}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase">{item.evidence}</p>
                                 </div>
                              </div>
                              <Badge className={item.status === 'VERIFIED' ? 'bg-emerald-500' : item.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-muted'}>
                                 {item.status}
                              </Badge>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Revenue Stream Validation */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <BarChart3 className="size-4" /> Institutional Revenue Proof
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
                              <p className="text-[8px] text-muted-foreground font-mono">Target: ${rev.projected.toLocaleString()}</p>
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
                    <Target className="size-48 text-primary" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <Quote className="size-5" /> The Wedge Strategy
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 relative z-10">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "NoorNexus এখন শুধু একটি ওএস নয়; এটি একটি নির্দিষ্ট সমস্যার শ্রেষ্ঠ সমাধান। আমাদের গভর্নেন্স এবং অডিট ওয়েজ স্ট্র্যাটেজি প্রথম ১০টি প্রতিষ্ঠানকে আমাদের ওপর নির্ভরশীল করে তুলবে।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Activity className="size-4" /> Institutional Proof
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-headline font-bold text-emerald-100 leading-relaxed italic">
                    "Institutional Proof is achieved when a partner cannot function without our stack."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Dependence Level</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">1/3 TARGET</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Wedge Performance
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-3">
                       {[
                         { label: "Governance Wedge", status: "ACTIVE", success: "98%" },
                         { label: "Audit Wedge", status: "ACTIVE", success: "100%" },
                         { label: "Trust Wedge", status: "PILOT", success: "85%" }
                       ].map((c, i) => (
                         <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                            <div className="space-y-0.5">
                               <p className="text-[9px] text-white font-bold uppercase">{c.label}</p>
                               <p className="text-[7px] text-muted-foreground font-mono">Success: {c.success}</p>
                            </div>
                            <Badge variant="outline" className={`text-[7px] ${c.status === 'ACTIVE' ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>{c.status}</Badge>
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
