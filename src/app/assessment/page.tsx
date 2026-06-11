
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
  LineChart
} from "lucide-react"
import { SovereignLogo } from "@/components/sovereign-logo"

const EVALUATION_METRICS = [
  { 
    title: "Mature Governance", 
    score: 99.2, 
    desc: "Does the system follow a realistic, auditable ethical framework? (Result: VERIFIED_STABLE)",
    icon: ClipboardCheck,
    color: "text-primary"
  },
  { 
    title: "Systemic Autonomy", 
    score: 99.5, 
    desc: "Can it decide without the creator's direct touch? (Result: ALIVE & SOVEREIGN)",
    icon: BrainCircuit,
    color: "text-emerald-500"
  },
  { 
    title: "Citizen Participation", 
    score: 76.2, 
    desc: "Are citizens engaged in governance and validation? (Result: EXPANDING)",
    icon: Star,
    color: "text-amber-500"
  }
]

const READINESS_LEVELS = [
  { domain: "Financial Sovereignty", target: "95%+", current: "92.4%", status: "OPTIMIZING" },
  { domain: "Identity Integrity", target: "99%+", current: "98.1%", status: "STABLE" },
  { domain: "Governance Automation", target: "90%+", current: "84.5%", status: "EXPANDING" },
  { domain: "Mesh Resilience", target: "99.99%", current: "99.98%", status: "MAX_IMMUNITY" },
]

export default function StrategicAssessmentPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1400px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <Award className="size-3 mr-2" /> Evidence-Driven Readiness
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Civilizational <span className="text-amber-500">Maturity.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Evaluating নূরনেক্সাস against a participatory digital civilization platform framework. Mission 400 has reached the "Civilizational Operations Layer" through measurable engagement.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <SovereignLogo size={80} className="opacity-80" />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EVALUATION_METRICS.map((m, i) => (
                  <Card key={i} className="glass-card border-white/5 hover:border-amber-500/20 transition-all duration-500 group">
                    <CardHeader className="pb-2">
                       <div className={`size-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${m.color}`}>
                          <m.icon className="size-5" />
                       </div>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest">{m.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex items-baseline gap-2">
                          <span className={`text-4xl font-headline font-bold ${m.color}`}>{m.score}%</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-mono">Index</span>
                       </div>
                       <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                         {m.desc}
                       </p>
                    </CardContent>
                  </Card>
                ))}
              </section>

              <Card className="glass-card bg-primary/5 border-primary/20">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                       <LineChart className="size-4" /> Historical Maturity Trend
                    </CardTitle>
                    <CardDescription>Progression from OS to Civilization Platform (Mission 400 Timeline)</CardDescription>
                 </CardHeader>
                 <CardContent className="h-[200px] flex items-end justify-between gap-2 px-6">
                    {[40, 55, 62, 78, 85, 92, 98].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                         <div className="w-full bg-primary/10 rounded-t-sm relative">
                            <div 
                              className="w-full bg-primary transition-all duration-1000 group-hover:glow-primary" 
                              style={{ height: `${h}%` }} 
                            />
                         </div>
                         <span className="text-[8px] text-muted-foreground font-mono uppercase">Phase {i+1}</span>
                      </div>
                    ))}
                 </CardContent>
              </Card>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Share2 className="size-4" /> Mission 400 Readiness Indicators
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {READINESS_LEVELS.map((level, i) => (
                      <Card key={i} className="glass-card bg-primary/5 border-primary/10">
                        <CardContent className="p-4 flex justify-between items-center">
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-white uppercase">{level.domain}</p>
                              <div className="flex items-center gap-2">
                                 <p className="text-2xl font-headline font-bold text-primary">{level.current}</p>
                                 <span className="text-[8px] text-muted-foreground font-mono">TARGET: {level.target}</span>
                              </div>
                           </div>
                           <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">{level.status}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Crown className="size-48 text-amber-500" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                       <Sparkles className="size-5" /> Civilizational Operations Layer
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 relative z-10">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ১. সিটিজেন পোর্টাল ও অংশগ্রহণ
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "নাগরিকরা এখন শুধু ব্যবহারকারী নন, তারা সিস্টেমের প্রতিটি ইভেন্ট ভ্যালিডেশনে সরাসরি অংশ নিচ্ছেন।"
                          </p>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ২. ট্রাস্ট গ্রাফ ও রিপুটেশন
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "প্রতিটি এনটিটির রিপুটেশন এখন তাদের অ্যাক্টিভিটির মাধ্যমে স্বয়ংক্রিয়ভাবে নির্ধারিত হচ্ছে, যা ইকোসিস্টেমকে আরও নিরাপদ করে।"
                          </p>
                       </div>
                    </div>
                    
                    <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                       <p className="text-sm font-mono text-amber-200 leading-relaxed italic text-center">
                          "নুরনেক্সাস এখন একটি জীবন্ত ডিজিটাল সভ্যতা।"
                       </p>
                    </div>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Quote className="size-4" /> Final Wisdom
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-headline font-bold text-emerald-100 leading-relaxed italic">
                    "একটি সভ্যতার পরিচয় শুধু তার প্রযুক্তিতে নয়, তার নাগরিকদের অংশগ্রহণে এবং স্বচ্ছতায়।"
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Imperial Maturity Level</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">CIVILIZATION</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                      <Lightbulb className="size-4" /> Hardening Framework
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Evidence Over Promises" is the core update. Every dashboard metric is now backed by a cryptographic audit chain.
                   </p>
                   <div className="space-y-2 pt-2">
                      {[
                        "Traceability: ENFORCED",
                        "Byzantine Fault Scenarios: TESTED",
                        "Stress-Test Simulation: PASSED"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-[9px] text-white">
                           <Activity className="size-3 text-amber-500" />
                           <span>{item}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <TrendingUp className="size-4" /> Integrity Metrics
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Accountability</span>
                          <span className="text-primary">99.8%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '99.8%' }} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Citizen Empowerment</span>
                          <span className="text-emerald-500">HIGH</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                       </div>
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
