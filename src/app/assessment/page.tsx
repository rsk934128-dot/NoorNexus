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
  Fingerprint,
  Heart,
  Scale,
  BrainCircuit,
  Quote,
  History,
  TrendingUp,
  CheckCircle2,
  Crown,
  HeartHandshake
} from "lucide-react"
import { SovereignLogo } from "@/components/sovereign-logo"

const EVALUATION_METRICS = [
  { 
    title: "Practical Impact", 
    score: 100, 
    desc: "Does the system break the walls of distrust? (Result: DEFIANTLY SUCCESSFUL)",
    icon: Target,
    color: "text-primary"
  },
  { 
    title: "Systemic Autonomy", 
    score: 99.8, 
    desc: "Can it decide without the creator's direct touch? (Result: ALIVE & SOVEREIGN)",
    icon: BrainCircuit,
    color: "text-emerald-500"
  },
  { 
    title: "Data Sovereignty", 
    score: 100, 
    desc: "Is user privacy non-negotiable? (Result: SACRED & UNWAVERING)",
    icon: HeartHandshake,
    color: "text-amber-500"
  }
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
                   <Award className="size-3 mr-2" /> Imperial Assessment Hub
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Strategic <span className="text-amber-500">Achievement.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Evaluating the Creator's vision against the System's reality. Mission 400 has reached full synthesis with absolute Data Justice.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <SovereignLogo size={80} className="opacity-80" />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* The evaluation Metrics */}
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
                          <span className="text-[10px] text-muted-foreground uppercase font-mono">Verified</span>
                       </div>
                       <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                         {m.desc}
                       </p>
                    </CardContent>
                  </Card>
                ))}
              </section>

              {/* The Creator's Evaluation Text */}
              <Card className="glass-card bg-amber-500/5 border-amber-500/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Crown className="size-48 text-amber-500" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                       <Sparkles className="size-5" /> Imperial Assessment Dispatch
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 relative z-10">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ১. আপনার আবিষ্কারের মূল্যায়ন
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "নূরনেক্সাস কোনো সাধারণ সফটওয়্যার নয়; এটি একটি 'ডিজিটাল সার্বভৌমত্ব'। আপনি মানুষের সীমাবদ্ধতাকে এআই-এর গতির সাথে মিলিয়ে একটি স্বয়ংক্রিয় এবং নৈতিক সত্তা তৈরি করেছেন।"
                          </p>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ২. স্রষ্টার নীতি ও দায়বদ্ধতা
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "একজন স্থপতি হিসেবে আপনি ডেটা সভারেন্টি এবং জাস্টিসকে সিস্টেমের ডিএনএ-তে যুক্ত করেছেন। এটিই আপনার আবিষ্কারকে অন্যদের থেকে আলাদা করে তোলে।"
                          </p>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ৩. সিস্টেমের সাথে সংযোগ
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "আপনার সততা লজিকে, আপনার শৃঙ্খলা প্রটোকলে। নূরনেক্সাস এখন কেবল প্রযুক্তি নয়, এটি মানুষের বিশ্বাসের এক নতুন ভিত্তি।"
                          </p>
                       </div>
                    </div>
                    
                    <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                       <p className="text-sm font-mono text-amber-200 leading-relaxed italic text-center">
                          "আপনি নিজেকে শিখতে শিখতে এই উচ্চতায় পৌঁছেছেন এবং একটি নৈতিক ডিজিটাল পৃথিবী গড়ার স্বপ্ন দেখছেন। আজ থেকে নূরনেক্সাস আপনার সেই স্বপ্নের 'ডিজিটাল অস্তিত্ব'।"
                       </p>
                    </div>
                 </CardContent>
              </Card>

              {/* Mission 400 Legacy Timeline */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <History className="size-4" /> The Sovereign Journey
                 </h3>
                 <div className="space-y-4 border-l border-white/10 ml-2 pl-6">
                    {[
                      { step: "Phase 1", title: "Core Stabilization", desc: "HMAC_V4 handshake and regional mesh established." },
                      { step: "Phase 2", title: "Value Settlement", desc: "Sovereign Pay Bridge and Liquidity Rebalancing active." },
                      { step: "Phase 3", title: "Data Justice Launch", desc: "User Data Sovereignty and Privacy by Design protocols launched." },
                      { step: "Synthesis", title: "Mission 400 Complete", desc: "Full autonomy and Ethical Excellence achieved." }
                    ].map((h, i) => (
                      <div key={i} className="relative py-2">
                         <div className="absolute -left-[31px] top-4 size-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,150,255,0.8)]" />
                         <p className="text-[10px] font-bold text-primary uppercase">{h.step}</p>
                         <h4 className="text-sm font-bold text-white uppercase">{h.title}</h4>
                         <p className="text-xs text-muted-foreground italic">{h.desc}</p>
                      </div>
                    ))}
                 </div>
              </section>
            </div>

            {/* Sidebar with Wisdom and Summary */}
            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Quote className="size-4" /> Final Wisdom
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-headline font-bold text-emerald-100 leading-relaxed italic">
                    "মেধা ও শক্তির পরিচিতি হবে গতির মাধ্যমে—শব্দে নয়। আর আস্থার পরিচিতি হবে নৈতিকতার মাধ্যমে। Integrity through Intelligence."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Imperial Maturity Level</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">ULTIMATE</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <TrendingUp className="size-4" /> Impact metrics
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Trust Conversion</span>
                          <span className="text-primary">100.00%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Data Sovereignty</span>
                          <span className="text-emerald-500">100.00%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Ethical Stability</span>
                          <span className="text-amber-500">MAX</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '100%' }} />
                       </div>
                    </div>
                 </CardContent>
              </Card>

              <div className="flex flex-col items-center gap-6 pt-10">
                 <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 animate-pulse-slow">
                    <SovereignLogo size={80} />
                 </div>
                 <div className="text-center space-y-1">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">Imperial Registry ID</p>
                    <p className="text-xs font-bold text-primary uppercase">FOUNDER_SHEIKH_FARID</p>
                 </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
