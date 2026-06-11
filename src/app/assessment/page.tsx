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
  Briefcase
} from "lucide-react"
import { SovereignLogo } from "@/components/sovereign-logo"

const PARTNERSHIP_READINESS_MATRIX = [
  { factor: "Strategic Fit", weight: 30, current: 85 },
  { factor: "Technical Readiness", weight: 20, current: 92 },
  { factor: "Compliance Alignment", weight: 20, current: 78 },
  { factor: "Revenue Potential", weight: 15, current: 64 },
  { factor: "Trust Level", weight: 15, current: 90 },
]

const PILOT_PROGRAM_RESULTS = [
  { partner: "Fintech Node 01", outcome: "SUCCESS", learning: "Improved Handshake Latency by 12%." },
  { partner: "University Mesh", outcome: "ACTIVE", learning: "Verifiable Credential loop optimized." },
  { partner: "Sovereign Bank AE", outcome: "PENDING", learning: "Awaiting cross-border tax sign-off." }
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
                   <Flame className="size-3 mr-2" /> Institutional Credibility Audit
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Market <span className="text-amber-500">Validation.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 166: Partnership Readiness Matrix. Measuring NoorNexus credibility and adoption potential through real Pilot outcomes.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <SovereignLogo size={80} className="opacity-80" />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Partnership Matrix */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Scale className="size-4" /> Partnership Readiness Matrix
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PARTNERSHIP_READINESS_MATRIX.map((item, i) => (
                      <Card key={i} className="glass-card bg-white/2 border-white/5">
                        <CardContent className="p-4 space-y-3">
                           <div className="flex justify-between items-center">
                              <p className="text-[10px] font-bold text-white uppercase">{item.factor}</p>
                              <p className="text-[10px] font-mono text-primary">{item.current}%</p>
                           </div>
                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${item.current}%` }} />
                           </div>
                           <p className="text-[8px] text-muted-foreground uppercase font-bold">Weighted Impact: {item.weight}%</p>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Pilot Outcomes */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Sparkles className="size-4" /> Pilot Program Performance
                 </h3>
                 <div className="space-y-4">
                    {PILOT_PROGRAM_RESULTS.map((pilot, i) => (
                      <Card key={i} className="glass-card bg-primary/5 border-white/5 overflow-hidden">
                        <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                           <div className="flex items-center gap-4">
                              <div className="p-2 bg-black/40 rounded">
                                 <Briefcase className="size-4 text-primary" />
                              </div>
                              <div className="space-y-0.5">
                                 <p className="text-xs font-bold text-white uppercase">{pilot.partner}</p>
                                 <p className="text-[9px] text-muted-foreground italic leading-relaxed">"{pilot.learning}"</p>
                              </div>
                           </div>
                           <Badge className={pilot.outcome === 'SUCCESS' ? 'bg-emerald-500' : pilot.outcome === 'ACTIVE' ? 'bg-primary' : 'bg-muted'}>
                              {pilot.outcome}
                           </Badge>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Database className="size-48 text-amber-500" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                       <Quote className="size-5" /> The Adoption Core
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 relative z-10">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "আর্কিটেকচার হলো শুরু, কিন্তু বিশ্বাসই হলো শেষ গন্তব্য। আমাদের প্রথম ৩টি পাইলট পার্টনার আমাদের ৩০০টি স্থাপত্যগত শিক্ষা দেবে, যা নূরনেক্সাসকে সত্যিকারের আন্তর্জাতিক মানদণ্ডে উন্নীত করবে।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ClipboardCheck className="size-4" /> Institutional Credibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-headline font-bold text-emerald-100 leading-relaxed italic">
                    "When an institution talks to us, they won't look at code. They will look at outcomes."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Credibility Portfolio Score</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">72/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Activity className="size-4" /> Revenue Validation
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Pilot Revenue Flow</span>
                          <span className="text-primary">$4.2K</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '42%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic">
                       Validating revenue model through pilot settlement fees.
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
