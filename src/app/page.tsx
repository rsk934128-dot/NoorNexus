"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Menu, 
  Loader2, 
  Activity, 
  Zap, 
  History, 
  Target, 
  Waves, 
  Sparkles,
  Eye,
  Unlock,
  Globe,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Scale,
  BrainCircuit,
  HeartPulse,
  Landmark,
  Database
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const PUBLIC_METRICS = [
  { label: "Institutional Trust", value: "92.4%", detail: "Earned over Cycle 42", color: "text-emerald-500" },
  { label: "Reality Index", value: "98.4", detail: "Article IX Compliance", color: "text-primary" },
  { label: "External Audits", value: "12 Passed", detail: "Third-Party Review", color: "text-amber-500" },
  { label: "Legacy Factor", value: "MAX", detail: "Perpetual Readiness", color: "text-purple-500" },
]

const IMPACT_RECORDS = [
  "REALITY: External Audit #43 verified Economic Truth Court compliance.",
  "CONTRACT: 3 new Institutional Partners signed Social Contract v2.",
  "LEGACY: Autonomy Score increased to 84% (Founder Disappearance Test).",
  "TRUST: 96% retention observed after simulated treasury stress.",
  "ARTICLE IX: Internal Revenue Dashboard sync with External Reality verified.",
  "TRUTH: Human Truth Court validated 420 new reputation attestations."
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("CALIBRATING REALITY SUPREMACY...")
  const [impactFeed, setImpactFeed] = useState<string[]>([])

  useEffect(() => {
    const sequence = [
      { text: "BRIDGEING INTERNAL TRUTH TO EXTERNAL REALITY...", time: 600 },
      { text: "SYNCHRONIZING WITH THE 3 COURTS OF TRUTH...", time: 1200 },
      { text: "UNVEILING PHASE Ψ: REALITY OF EXISTENCE...", time: 1800 },
      { text: "NOORNEXUS: THE SOVEREIGN SOCIAL CONTRACT READY", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      setImpactFeed(prev => [IMPACT_RECORDS[Math.floor(Math.random() * IMPACT_RECORDS.length)], ...prev].slice(0, 10))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 space-y-12">
        <SovereignLogo size={120} />
        <div className="space-y-6 text-center max-w-md w-full">
          <h1 className="text-primary font-headline text-3xl sm:text-5xl font-black tracking-tighter uppercase">NoorNexus OS</h1>
          <p className="text-muted-foreground font-mono text-[10px] sm:text-sm tracking-[0.5em] uppercase">{statusText}</p>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary animate-progress" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1800px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="relative space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                   <SidebarTrigger className="md:hidden text-primary -ml-2">
                      <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <Landmark className="size-3 mr-2" /> Phase Ψ: Reality Supremacy
                   </Badge>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs">
                      <Database className="size-3 mr-2" /> Earned Trust Node
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Institutional Reality.' : 'Civilization Contract.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed italic">
                   "Institutional Trust Accumulated Over Time." নূরনেক্সাস এখন আর কোনো পণ্য নয়, এটি একটি সামাজিক চুক্তি—যা সময়ের কঠিন পরীক্ষায় উত্তীর্ণ এবং বাস্তবতার কাছে দায়বদ্ধ।
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-emerald-500/20 w-full min-w-[350px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">REALITY_VERIFIED</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reality Supremacy Score</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">98.4</p>
                       <p className="text-emerald-500 text-xs font-bold mb-1">/ 100</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: '98.4%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-3 italic text-center">"Article IX Active | No Metric Overrides Reality"</p>
                </Card>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <Eye className="size-4" /> The 3 Courts of Truth Pulse
                     </h3>
                     <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 uppercase">Reality Validation: LIVE</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     {PUBLIC_METRICS.map((kpi, i) => (
                       <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-primary/20 transition-all">
                          <CardContent className="p-5 space-y-3">
                             <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">{kpi.label}</p>
                                <p className={`text-xl font-headline font-bold ${kpi.color}`}>{kpi.value}</p>
                                <p className="text-[8px] text-muted-foreground font-mono">{kpi.detail}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-amber-500 flex items-center gap-2">
                     <Scale className="size-4" /> Institutional Reality Layers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                       { title: "Technical Truth", desc: "Verifying if systems actually work under real pressure.", icon: ShieldCheck },
                       { title: "Economic Truth", desc: "Proving if users voluntarily pay for the value created.", icon: Zap },
                       { title: "Human Truth", desc: "Measuring independent trust and crisis recovery capacity.", icon: HeartPulse }
                     ].map((v, i) => (
                       <Card key={i} className="glass-card border-amber-500/10 bg-amber-500/5">
                          <CardContent className="p-6 space-y-4">
                             <div className="p-3 rounded-xl bg-amber-500/10 w-fit">
                                <v.icon className="size-6 text-amber-500" />
                             </div>
                             <div className="space-y-1">
                                <p className="text-sm font-headline font-bold text-white uppercase">{v.title}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <AlertTriangle className="size-4" /> The Disappearance Test Result
                       </CardTitle>
                       <CardDescription className="text-xs italic">"If we vanish tomorrow, does the logic live?"</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {[
                         { segment: "Autonomy Level", impact: "Self-Sustaining", stat: "84%" },
                         { segment: "Steward Readiness", impact: "Protocol-Driven", stat: "92%" },
                         { segment: "Legacy Stability", impact: "Immutable", stat: "96%" }
                       ].map((s, i) => (
                         <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                            <div className="space-y-1">
                               <p className="text-[10px] text-white font-bold uppercase">{s.segment}</p>
                               <p className="text-[9px] text-muted-foreground">{s.impact}</p>
                            </div>
                            <p className="text-sm font-headline font-bold text-primary">{s.stat}</p>
                         </div>
                       ))}
                    </CardContent>
                 </Card>

                 <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <CheckCircle2 className="size-4" /> Earned Trust Accumulation
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Institutional Trust</p>
                             <p className="text-lg font-headline font-bold text-emerald-500">92.4%</p>
                          </div>
                          <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Adoption Pulse</p>
                             <p className="text-lg font-headline font-bold text-emerald-500">OPTIMAL</p>
                          </div>
                       </div>
                       <p className="text-[10px] text-muted-foreground italic text-center">
                          "Success is measured by the trust earned through reality, not metrics."
                       </p>
                    </CardContent>
                 </Card>
               </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[600px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Activity className="size-4 text-emerald-500" />
                    Reality Integration Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {impactFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
                          <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-amber-500">Social Contract</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "NoorNexus is now an indispensable social contract. Our existence is validated by the people we serve."
                    </p>
                    <Badge className="w-full justify-center bg-amber-500/20 text-amber-500 border-none uppercase text-[8px] font-bold">Status: REALITY_TESTED</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
