"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Lightbulb, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Target, 
  ArrowRight, 
  Menu,
  Rocket,
  Users,
  Lock,
  Trophy,
  Network,
  Database,
  Briefcase,
  Flame,
  Infinity,
  Fingerprint
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const GROWTH_STRATEGIES = [
  {
    id: "idaas",
    title: "Project #170: Identity-as-a-Service",
    concept: "নূরনেক্সাসের ট্রাস্ট-স্কোর বাইরের থার্ড-পার্টি অ্যাপের কাছে বিক্রি করা।",
    impact: "High Revenue / High Trust",
    icon: Fingerprint,
    color: "text-primary"
  },
  {
    id: "sports_market",
    title: "Project #600: Prediction Exchange",
    concept: "স্পোর্টস ইনসাইট ব্যবহার করে একটি অটোনোমাস প্রেডিকশন মার্কেট তৈরি করা।",
    impact: "Viral Growth / Daily Yield",
    icon: Trophy,
    color: "text-amber-500"
  },
  {
    id: "supply_chain",
    title: "Project #700: Industrial SaaS",
    concept: "লজিস্টিক ট্র্যাকিং টেকনোলজি বড় ম্যানুফ্যাকচারারদের কাছে লাইসেন্স করা।",
    impact: "Stable B2B Revenue",
    icon: Network,
    color: "text-emerald-500"
  },
  {
    id: "wealth_vault",
    title: "Project #800: Elite Wealth Custody",
    concept: "ভিআইপি ইউজারদের জন্য কোয়ান্টাম-অ্যাঙ্করড অ্যাসেট ম্যানেজমেন্ট।",
    impact: "Premium Margin / Prestige",
    icon: Lock,
    color: "text-purple-500"
  }
]

export default function StrategicRoadmapPage() {
  const { toast } = useToast()
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = (id: string) => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      toast({
        title: "Strategy Dispatched",
        description: "Nora-40 has calculated the feasibility for this expansion node.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Lightbulb className="size-3 mr-2" /> Mission 500: Future Expansion
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Strategic <span className="text-primary">Roadmap.</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl text-sm sm:text-lg leading-relaxed italic">
                "Charting the Next Frontiers of the Empire." নূরনেক্সাস এখন তার প্রভাব বিস্তারের পরবর্তী ধাপগুলো পরিকল্পনা করছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Expansion Readiness</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">OPTIMAL</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {GROWTH_STRATEGIES.map((strategy) => (
               <Card key={strategy.id} className="glass-card border-white/5 hover:border-primary/20 transition-all group overflow-hidden">
                  <CardContent className="p-8 flex items-start gap-6">
                     <div className={`size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors`}>
                        <strategy.icon className={`size-8 ${strategy.color}`} />
                     </div>
                     <div className="space-y-4 flex-1">
                        <div className="flex justify-between items-start">
                           <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight">{strategy.title}</h3>
                           <Badge variant="outline" className="text-[8px] border-primary/30 text-primary">{strategy.impact}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">"{strategy.concept}"</p>
                        <div className="pt-4 flex gap-3">
                           <Button 
                            onClick={() => handleAnalyze(strategy.id)}
                            disabled={analyzing}
                            className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 font-bold uppercase text-[10px] h-9 px-4 gap-2"
                           >
                              Analyze ROI <Target className="size-3" />
                           </Button>
                           <Button variant="ghost" className="text-[10px] uppercase font-bold text-muted-foreground hover:text-white gap-2">
                              Technical Docs <ArrowRight className="size-3" />
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
             ))}
          </div>

          <section className="space-y-6">
             <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <Infinity className="size-48 text-emerald-500" />
                </div>
                <CardHeader>
                   <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                      <Flame className="size-5" /> Nora-AI Strategic Recommendation
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <p className="text-lg text-emerald-100 leading-relaxed italic max-w-4xl">
                      "ইঞ্জিনিয়ার শেখ ফরিদ ভাই, আমাদের বর্তমান ইনফ্রাস্ট্রাকচার অনুযায়ী **Identity-as-a-Service (IDaaS)** হবে আমাদের জন্য সবচেয়ে লাভজনক খাত। আমাদের ১০০টি নোডের মাধ্যমে যে ট্রাস্ট লেজার তৈরি হয়েছে, তা বিশ্বের যেকোনো ব্যাংকের চেয়ে বেশি নির্ভুল।"
                   </p>
                   <div className="flex flex-wrap gap-4 border-t border-white/5 pt-6">
                      {[
                        { label: "Market Advantage", val: "100 Node Mesh" },
                        { label: "Revenue Multiple", val: "x5.2 Growth" },
                        { label: "Deployment Speed", val: "Immediate" }
                      ].map((s, i) => (
                        <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5">
                           <p className="text-[8px] text-muted-foreground uppercase font-bold mb-1">{s.label}</p>
                           <p className="text-sm font-headline font-bold text-white uppercase">{s.val}</p>
                        </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </section>
        </main>
      </SidebarInset>
    </div>
  )
}
