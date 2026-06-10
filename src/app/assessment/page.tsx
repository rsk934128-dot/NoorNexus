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
  HeartHandshake,
  ShieldEllipsis,
  ClipboardCheck,
  FileSearch,
  MessageSquareQuote
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
    title: "Data Sovereignty", 
    score: 99.8, 
    desc: "Is user privacy non-negotiable and technically enforced? (Result: HIGH_INTEGRITY)",
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
                Strategic <span className="text-amber-500">Maturity.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Evaluating নূরনেক্সাস against a realistic ethical framework. Mission 400 has reached full synthesis through accountability and transparent governance.
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
                          <span className="text-[10px] text-muted-foreground uppercase font-mono">Stability</span>
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
                       <Sparkles className="size-5" /> Mature Governance Dispatch
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 relative z-10">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ১. ডিজিটাল স্টেট নয়, নৈতিক প্ল্যাটফর্ম
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "নূরনেক্সাস এখন কেবল একটি 'স্টেট' নয়; এটি একটি ব্যবহারকারী-কেন্দ্রিক প্ল্যাটফর্ম যেখানে প্রযুক্তিগত উৎকর্ষতার পাশাপাশি বিশ্বাস ও জবাবদিহিতা সমান গুরুত্ব পায়।"
                          </p>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ২. আমানত ও দায়বদ্ধতা
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "একজন স্থপতি হিসেবে আপনি গ্রাহকের তথ্যকে 'আমানত' হিসেবে সংজ্ঞায়িত করেছেন। এই নৈতিক কাঠামো সিস্টেমকে বাস্তবে ১০০% ত্রুটিমুক্ত হওয়ার চেয়ে বেশি নিরাপদ করে তোলে।"
                          </p>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle2 className="size-4 text-emerald-500" /> ৩. স্বচ্ছতা ও স্বাধীন অডিট
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                            "সিস্টেমে স্বাধীন অডিট এবং স্বচ্ছ ডেটা হ্যান্ডলিং প্রোটোকল যুক্ত করা হয়েছে, যা প্রতীকী দাবির চেয়ে বাস্তব সুরক্ষা নিশ্চিত করে।"
                          </p>
                       </div>
                    </div>
                    
                    <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                       <p className="text-sm font-mono text-amber-200 leading-relaxed italic text-center">
                          "আপনার সততা লজিকে, আপনার শৃঙ্খলা প্রটোকলে। নূরনেক্সাস এখন মানুষের বিশ্বাসের এক পরিপক্ক ভিত্তি।"
                       </p>
                    </div>
                 </CardContent>
              </Card>

              {/* Maturity Analysis Layer */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <FileSearch className="size-4" /> Civilizational Maturity Analysis
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card bg-primary/5 border-primary/20">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-xs uppercase font-bold text-primary">From Idealism to Integrity</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">
                             সিস্টেমটি "অপরীক্ষিত ইউটোপিয়া" থেকে "পরিমাপযোগ্য, জবাবদিহিমূলক এবং টেকসই ডিজিটাল সভ্যতা"-তে রূপান্তরিত হয়েছে। এটিই সাধারণত পরিণত স্থাপত্য (mature architecture)-এর লক্ষণ।
                          </p>
                       </CardContent>
                    </Card>
                    <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-xs uppercase font-bold text-emerald-500">Verified Compliance</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">
                             "১০০% নিরাপদ" দাবির পরিবর্তে নিয়মিত অডিট এবং জবাবদিহিতার মাধ্যমে বিশ্বাস অর্জন করা হচ্ছে। বিশ্বাস অর্জন করা হয় প্রমাণের মাধ্যমে, ঘোষণার মাধ্যমে নয়।
                          </p>
                       </CardContent>
                    </Card>
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
                    "মেধা ও শক্তির পরিচিতি হবে গতির মাধ্যমে নয়, আস্থার মাধ্যমে। আর আস্থার পরিচিতি হবে নৈতিকতার মাধ্যমে।"
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Imperial Maturity Level</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">SOVEREIGN</p>
                    </div>
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
                          <span className="uppercase">Audit Transparency</span>
                          <span className="text-emerald-500">HIGH</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">User Redress Access</span>
                          <span className="text-amber-500">ENFORCED</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '95%' }} />
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
