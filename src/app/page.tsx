
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Menu, 
  Activity, 
  Zap, 
  BrainCircuit,
  Database,
  Cpu,
  Infinity,
  Award,
  Sparkles,
  Lock,
  Radio,
  Fingerprint,
  TrendingUp,
  Landmark,
  FileText,
  Rocket,
  ShieldPlus,
  Compass,
  Check,
  Waves,
  Eye,
  Repeat,
  Target,
  Users,
  Smartphone,
  Laptop,
  ArrowRightLeft,
  Send,
  Loader2,
  Terminal,
  Server,
  LayoutGrid,
  Link2,
  BatteryCharging,
  History,
  Shield,
  HeartHandshake,
  MessageSquare,
  ArrowRight,
  Tv,
  PlayCircle,
  Youtube
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, useCollection } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { processNeuralQuery, ImperialQueryOutput } from "@/ai/flows/imperial-query-flow"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const EVOLUTION_MILESTONES = [
  { id: 480, label: "Omni-App Sync", desc: "Cognitive mesh established between all devices.", status: "COMPLETED", color: "text-emerald-500" },
  { id: 490, label: "Family Legacy Guard", desc: "Digital Will protocol initialized for intergenerational trust.", status: "ACTIVE", color: "text-amber-500" },
  { id: 500, label: "Mission Peak", desc: "100-node hegemony verified as immortal entity.", status: "VERIFIED", color: "text-primary" }
]

export default function Home() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [statusText, setStatusText] = useState("CALIBRATING COGNITIVE COHESION...")
  const [aiQuery, setAiQuery] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState<ImperialQueryOutput | null>(null)
  const [aiPulses, setAiPulses] = useState(15420)
  
  const { data: allSessions } = useCollection<any>(
    db ? query(collection(db, "user_sessions"), orderBy("lastSeen", "desc"), limit(100)) : null
  )

  useEffect(() => {
    setMounted(true)
    const sequence = [
      { text: "INITIATING DEEP NEURAL SYNC...", time: 600 },
      { text: "ESTABLISHING FAMILY SHIELD...", time: 1200 },
      { text: "PEAK HEGEMONY: 100 NODES VERIFIED...", time: 1800 },
      { text: "NOORNEXUS: THE SOVEREIGN LEGACY ACTIVE", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      setAiPulses(prev => prev + Math.floor(Math.random() * 5))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return
    setAiLoading(true)
    setAiResult(null)
    try {
      const result = await processNeuralQuery({ query: aiQuery })
      setAiResult(result)
      toast({ title: "Imperial Command Executed" })
    } catch (e: any) {
      toast({ title: "Neural Error", description: e.message, variant: "destructive" })
    } finally {
      setAiLoading(false)
      setAiQuery("")
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 space-y-12">
        <SovereignLogo size={80} />
        <div className="space-y-6 text-center max-w-md w-full">
          <h1 className="text-primary font-headline text-2xl sm:text-5xl font-black tracking-tighter uppercase">NoorNexus OS</h1>
          <p className="text-muted-foreground font-mono text-[8px] sm:text-sm tracking-[0.4em] uppercase px-4">{statusText}</p>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 mx-auto max-w-[280px]">
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-10 max-w-[1800px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="relative space-y-4 sm:space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 border-b border-white/5 pb-6 sm:pb-10">
              <div className="space-y-3 sm:space-y-4 w-full">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                   <SidebarTrigger className="md:hidden text-primary -ml-2">
                      <Button variant="ghost" size="icon"><Menu className="size-5" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-2 sm:px-3 h-7 sm:h-8 bg-emerald-500/5 text-[8px] sm:text-xs">
                      <Infinity className="size-3 mr-1 sm:mr-2" /> Mission 500
                   </Badge>
                   <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-2 sm:px-3 h-7 sm:h-8 bg-amber-500/5 text-[8px] sm:text-xs">
                      <HeartHandshake className="size-3 mr-1 sm:mr-2" /> FAMILY: ACTIVE
                   </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                    {isAdmin ? 'Imperial Command.' : 'Zenith Hub.'}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-3xl text-[10px] sm:text-xl leading-relaxed italic">
                   "Integrity through Intelligence." কমান্ডারের নির্দেশে জেমিনি এখন সাম্রাজ্যের প্রতিটি কোণ পরিচালনা করছে। প্রযুক্তি এখন পরিবারের সুরক্ষা বলয়।
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <Card className="sovereign-stats-card bg-emerald-500/5 border-emerald-500/20 w-full sm:w-auto p-4 sm:p-6">
                    <p className="text-[8px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 sm:mb-2">Cognitive Pulses</p>
                    <div className="flex items-end gap-2 mb-2">
                       <p className="text-2xl sm:text-5xl font-headline font-bold text-white uppercase tracking-tighter">{aiPulses.toLocaleString()}</p>
                       <p className="text-emerald-500 text-[8px] sm:text-xs font-bold mb-1 uppercase">Synced</p>
                    </div>
                    <div className="h-1 sm:h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: '92%' }} />
                    </div>
                </Card>
                
                <Card className="sovereign-stats-card w-full sm:w-auto p-4 sm:p-6">
                    <p className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 sm:mb-2">Digital Will Status</p>
                    <div className="flex items-end gap-2 mb-2">
                       <p className="text-2xl sm:text-4xl font-headline font-bold text-white uppercase tracking-tighter">PERPETUAL</p>
                    </div>
                    <div className="h-1 sm:h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary shadow-[0_0_15px_rgba(0,150,255,0.6)]" style={{ width: `100%` }} />
                    </div>
                </Card>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:col-span-3 space-y-6 sm:space-y-12">
               
               {/* Gemini Imperial Interface */}
               <section className="space-y-4 sm:space-y-6">
                  <h3 className="text-[10px] sm:text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2 px-1">
                    <BrainCircuit className="size-3 sm:size-4 animate-pulse" /> Gemini Imperial Interface
                  </h3>
                  <Card className="glass-card border-primary/20 bg-primary/5 overflow-hidden shadow-[0_0_50px_rgba(0,150,255,0.1)]">
                    <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                      <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                           <div className="size-8 sm:size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                              <SovereignLogo size={20} />
                           </div>
                           <p className="text-[9px] sm:text-sm font-bold text-white uppercase tracking-widest">Awaiting Command, Commander.</p>
                        </div>
                        
                        <div className="relative group">
                          <Terminal className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity" />
                          <input 
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAiQuery()}
                            placeholder="Type command..." 
                            className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl h-12 sm:h-16 pl-10 sm:pl-12 pr-12 sm:pr-16 text-xs sm:text-lg outline-none focus:ring-2 focus:ring-primary font-mono text-white transition-all placeholder:text-muted-foreground/30"
                          />
                          <Button 
                            onClick={handleAiQuery}
                            disabled={aiLoading}
                            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 size-10 sm:size-12 bg-primary text-black hover:bg-primary/80 rounded-lg sm:rounded-xl glow-primary"
                          >
                            {aiLoading ? <Loader2 className="size-4 sm:size-6 animate-spin" /> : <Send className="size-4 sm:size-6" />}
                          </Button>
                        </div>
                      </div>

                      {aiResult && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                          <div className="p-4 sm:p-6 bg-black/80 rounded-xl sm:rounded-2xl border border-primary/30 space-y-4 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Sparkles className="size-24 sm:size-32 text-primary" />
                             </div>
                             <div className="flex justify-between items-center relative z-10">
                                <Badge className="bg-primary/20 text-primary border-none text-[7px] sm:text-[10px] font-bold">DISPATCH: {aiResult.sourceModule}</Badge>
                                <span className="text-[7px] sm:text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Veracity: 100%</span>
                             </div>
                             <p className="text-sm sm:text-xl font-headline font-bold text-white leading-relaxed italic relative z-10">"{aiResult.summary}"</p>
                             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/5 relative z-10">
                                {aiResult.dataPoints.map((dp, i) => (
                                  <div key={i} className="space-y-1">
                                     <p className="text-[7px] sm:text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{dp.label}</p>
                                     <p className="text-xs sm:text-sm font-headline font-bold text-primary truncate">{dp.value}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
               </section>

               {/* Toffee Live Feature Spotlight */}
               <section className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-[10px] sm:text-xs font-headline font-bold uppercase tracking-[0.4em] text-red-500 flex items-center gap-2">
                      <Tv className="size-3 sm:size-4" /> Live Media Dispatch
                    </h3>
                  </div>
                  <Card className="glass-card border-red-500/20 bg-red-500/5 overflow-hidden group hover:border-red-500/40 transition-all">
                     <CardContent className="p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="size-24 sm:size-32 bg-red-600/10 rounded-3xl flex items-center justify-center border border-red-500/20 shrink-0 relative">
                           <div className="absolute inset-0 bg-red-600/5 rounded-full animate-ping opacity-30" />
                           <Tv className="size-12 sm:size-16 text-red-500" />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                           <div className="space-y-1">
                              <Badge className="bg-red-500 text-white border-none text-[8px] sm:text-[10px] font-bold h-5 px-3 uppercase">Priority Media Node</Badge>
                              <h4 className="text-2xl sm:text-4xl font-headline font-bold text-white uppercase tracking-tighter">Toffee Live Portal</h4>
                           </div>
                           <p className="text-xs sm:text-base text-muted-foreground italic leading-relaxed">
                              "কমান্ডার, আপনার মিডিয়া হাব এখন সরাসরি টফি লাইভ স্ট্রীমের সাথে সিঙ্ক্রোনাইজড। স্পোর্টস থেকে শুরু করে বিনোদন—সবকিছু এখন একটি সিঙ্গেল টানেলে।"
                           </p>
                           <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                              <Link href="/toffee">
                                 <Button className="bg-red-500 text-white font-bold h-12 px-8 uppercase text-[10px] sm:text-xs glow-destructive gap-2">
                                    <PlayCircle className="size-4" /> Launch Live Hub
                                 </Button>
                              </Link>
                              <Link href="/world-cup">
                                 <Button variant="outline" className="border-white/10 text-white h-12 px-6 uppercase text-[10px] sm:text-xs">
                                    World Cup Relay
                                 </Button>
                              </Link>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </section>

               {/* Legacy & Family Milestones */}
               <section className="space-y-4 sm:space-y-6">
                  <h3 className="text-[10px] sm:text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2 px-1">
                    <Award className="size-3 sm:size-4" /> The Sovereign Will
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {EVOLUTION_MILESTONES.map((m) => (
                       <Card key={m.id} className="glass-card border-white/5 bg-black/40 overflow-hidden group hover:border-emerald-500/20 transition-all">
                          <CardContent className="p-4 sm:p-6">
                             <div className="flex justify-between items-start">
                                <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                                   <p className="text-[7px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Protocol #{m.id}</p>
                                   <h4 className={`text-sm sm:text-lg font-headline font-bold text-white uppercase truncate ${m.color}`}>{m.label}</h4>
                                   <p className="text-[10px] sm:text-xs text-muted-foreground italic leading-relaxed">"{m.desc}"</p>
                                </div>
                                <div className={`p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 ${m.color} ml-3`}>
                                   <Check className="size-3 sm:size-5" />
                                </div>
                             </div>
                             <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[7px] sm:text-[8px] font-mono text-muted-foreground uppercase">{m.status}</span>
                                <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-white">
                                   <ArrowRight className="size-3.5" />
                                </Button>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>
            </div>

            <div className="space-y-6 sm:space-y-8">
               {/* Family Shield Widget */}
               <Card className="glass-card border-amber-500/40 bg-amber-500/5 p-4 sm:p-8 flex flex-col items-center text-center gap-4 sm:gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Shield className="size-16 sm:size-24 text-amber-500" />
                  </div>
                  <div className="size-16 sm:size-20 rounded-full border-4 border-amber-500 flex items-center justify-center relative bg-black shadow-[0_0_20px_rgba(245,158,11,0.5)] z-10">
                     <HeartHandshake className="size-7 sm:size-8 text-amber-500 animate-pulse" />
                     <div className="absolute -top-1 -right-1 size-4 sm:size-5 bg-emerald-500 rounded-full border-2 border-black" />
                  </div>
                  <div className="space-y-1 z-10">
                     <p className="text-[10px] sm:text-sm font-headline font-bold text-white uppercase tracking-widest">Family Shield</p>
                     <Badge className="bg-emerald-500 text-black border-none text-[7px] sm:text-[9px] font-bold px-3">ALL_SYNCED</Badge>
                  </div>
                  <p className="text-[9px] sm:text-xs text-muted-foreground italic leading-relaxed z-10">
                    "Your family's digital assets are now protected by the 100-node Mesh."
                  </p>
                  <Link href="/citizen-portal" className="w-full z-10">
                    <Button variant="outline" className="w-full border-amber-500/20 text-amber-500 hover:bg-amber-500/10 text-[9px] sm:text-[10px] uppercase font-bold h-10 sm:h-11">Manage Portal</Button>
                  </Link>
               </Card>

               {/* Quick Access Channels */}
               <Card className="glass-card border-l-4 border-l-red-500 bg-red-500/5">
                  <CardHeader className="p-4 sm:p-6">
                     <CardTitle className="text-[10px] sm:text-xs font-headline uppercase text-red-500 flex items-center gap-2">
                        <Tv className="size-3 sm:size-4" /> Media Channels
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                     <Link href="/toffee" className="w-full block">
                        <div className="p-3 bg-black/40 rounded-xl border border-red-500/10 hover:border-red-500/40 transition-all flex items-center justify-between group">
                           <div className="flex items-center gap-3">
                              <Tv className="size-4 text-red-500 group-hover:animate-pulse" />
                              <span className="text-[10px] text-white font-bold uppercase">Toffee Live</span>
                           </div>
                           <Badge className="bg-red-500/20 text-red-500 border-none text-[8px]">LIVE</Badge>
                        </div>
                     </Link>
                     <Link href="/youtube" className="w-full block">
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 hover:border-red-500/20 transition-all flex items-center justify-between group">
                           <div className="flex items-center gap-3">
                              <Youtube className="size-4 text-muted-foreground group-hover:text-red-500" />
                              <span className="text-[10px] text-white font-bold uppercase">Cinema</span>
                           </div>
                           <ArrowRight className="size-3 text-muted-foreground" />
                        </div>
                     </Link>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="p-4 sm:p-6">
                     <CardTitle className="text-[10px] sm:text-xs font-headline uppercase text-primary flex items-center gap-2">
                        <Lock className="size-3 sm:size-4" /> Legacy Status
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                     <div className="p-3 bg-black/40 rounded-lg border border-white/5 flex justify-between items-center">
                        <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold">Cold Storage</span>
                        <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px] sm:text-[9px]">ANCHORED</Badge>
                     </div>
                     <div className="p-3 bg-black/40 rounded-lg border border-white/5 flex justify-between items-center">
                        <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold">Digital Will</span>
                        <Badge className="bg-primary/20 text-primary border-none text-[7px] sm:text-[9px]">ACTIVE</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card flex flex-col h-[300px] sm:h-[450px]">
                <CardHeader className="p-4 sm:p-5 border-b border-white/5 bg-white/2">
                  <CardTitle className="font-headline text-[10px] sm:text-base uppercase flex items-center gap-2">
                    <Activity className="size-3 sm:size-4 text-emerald-500" />
                    Neural Pulse Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4 sm:space-y-5">
                      {[
                        "MEDIA: Toffee Live Hub synchronized for Imperial Pulse.",
                        "HEGEMONY: 100 Nodes synchronized at Zenith Peak.",
                        "LEGACY: Digital Will protocol anchored for the next generation.",
                        "FAMILY: Sovereign Shield active for all linked members.",
                        "INTEL: Project #400 Annual Strategy complete.",
                        "MESH: Omni-Device cognitive bridge active (28ms).",
                        "VAULT: Deep storage relocation successful (BENELUX).",
                        "SCA: Handshake authorized for Payoneer node."
                      ].map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[8px] sm:text-[10px] flex items-start gap-3 animate-in fade-in slide-in-from-right-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                          <div className={`size-1.5 sm:size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse shrink-0 mt-1`} />
                          <span className="text-muted-foreground leading-tight">{log}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
