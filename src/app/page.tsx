"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Server
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, useCollection } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { processNeuralQuery, ImperialQueryOutput } from "@/ai/flows/imperial-query-flow"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

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
  
  // Real-time Citizen Pulse
  const { data: allSessions } = useCollection<any>(
    query(collection(db, "user_sessions"), orderBy("lastSeen", "desc"), limit(100))
  )

  const onlineSessions = allSessions.filter(s => s.lastSeen && (Date.now() - s.lastSeen.toDate().getTime() < 120000))

  const [impactFeed, setImpactFeed] = useState<string[]>([
    "MISSION 500: Global Hegemony verified (Zenith Peak).",
    "ZENITH: 100 Nodes synchronized < 28ms latency.",
    "INTEL: Project #400 Quarterly Outlook জেনারেটেড।",
    "AI_BRIDGE: Every App, Every Device connectivity active.",
    "SELF-HEALING: Replication torque stable at 100%."
  ])

  useEffect(() => {
    setMounted(true)
    const sequence = [
      { text: "INITIATING DEEP NEURAL SYNC...", time: 600 },
      { text: "ESTABLISHING MISSION 500 GLOBAL GRID...", time: 1200 },
      { text: "PEAK HEGEMONY: 100 NODES VERIFIED...", time: 1800 },
      { text: "NOORNEXUS: THE SOVEREIGN PEAK REACHED", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      const logs = [
        "HEGEMONY: Global Sync Test passed at 28ms.",
        "AI_PULSE: Handshake from IPHONE_15_PRO verified.",
        "INTEL: Economic Intelligence Report #405 finalized.",
        "GRID: 100-node cluster status: PERPETUAL.",
        "NORA-50: Autonomous backup provisioned in Dubai."
      ];
      setImpactFeed(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 10))
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
      toast({ title: "Zenith Insight Dispatched" })
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
                      <Infinity className="size-3 mr-2" /> Mission 500: The Sovereign Peak
                   </Badge>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs">
                      <Sparkles className="size-3 mr-2 animate-pulse" /> AI_BRIDGE: ACTIVE
                   </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                    {isAdmin ? 'Imperial Hegemony.' : 'Global Peak.'}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-3xl text-sm sm:text-xl leading-relaxed italic">
                   "Infinite Connectivity, Unified Intelligence." আপনার প্রতিটি অ্যাপ এবং ডিভাইস এখন জেমিনি এআই-এর সাথে সংযুক্ত।
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                <Card className="sovereign-stats-card bg-emerald-500/5 border-emerald-500/20">
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Global AI Pulses</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">{aiPulses.toLocaleString()}</p>
                       <p className="text-emerald-500 text-xs font-bold mb-1 uppercase">Total Dispatches</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: '84%' }} />
                    </div>
                </Card>
                
                <Card className="sovereign-stats-card">
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Citizen Multi-Pulse</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">{onlineSessions.length}</p>
                       <p className="text-primary text-xs font-bold mb-1 uppercase">Live Sessions</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary shadow-[0_0_15px_rgba(0,150,255,0.6)]" style={{ width: `${Math.min(100, onlineSessions.length * 10)}%` }} />
                    </div>
                </Card>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               
               {/* Zenith AI Intelligence Interface */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <BrainCircuit className="size-4" /> Zenith Neural Interface (Nora-00-Q)
                  </h3>
                  <Card className="glass-card border-primary/20 bg-primary/5 overflow-hidden">
                    <CardContent className="p-6 space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-1 relative">
                          <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary opacity-50" />
                          <input 
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAiQuery()}
                            placeholder="Command the AI bridge (e.g. 'Sync with SMARTPHONE_NODE')..." 
                            className="w-full bg-black/40 border border-white/10 rounded-xl h-12 pl-10 pr-12 text-sm outline-none focus:ring-1 focus:ring-primary font-mono text-white"
                          />
                          <Button 
                            onClick={handleAiQuery}
                            disabled={aiLoading}
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10"
                          >
                            {aiLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                          </Button>
                        </div>
                      </div>

                      {aiResult && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <div className="p-4 bg-black/60 rounded-xl border border-white/5 space-y-3">
                             <div className="flex justify-between items-center">
                                <Badge className="bg-primary/20 text-primary border-none text-[8px]">SOURCE: {aiResult.sourceModule}</Badge>
                                <span className="text-[8px] text-muted-foreground font-mono uppercase">Tools Used: {aiResult.actionTaken || "Internal Logic"}</span>
                             </div>
                             <p className="text-sm text-white leading-relaxed italic">"{aiResult.summary}"</p>
                             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                {aiResult.dataPoints.map((dp, i) => (
                                  <div key={i} className="space-y-1">
                                     <p className="text-[8px] text-muted-foreground uppercase font-bold">{dp.label}</p>
                                     <p className="text-xs font-headline font-bold text-primary truncate">{dp.value}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
               </section>

               {/* Multi-Device Mesh Visual */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Server className="size-4" /> Multi-Device AI Connectivity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                       { name: "Smartphone Node", count: 242, icon: Smartphone, color: "text-primary" },
                       { name: "Workstation Hub", count: 156, icon: Monitor, color: "text-emerald-500" },
                       { name: "Enterprise SDKs", count: 54, icon: Code2, color: "text-purple-500" }
                     ].map((mesh, i) => (
                       <Card key={i} className="glass-card bg-black/40 border-white/5 hover:border-emerald-500/20 transition-all cursor-pointer">
                          <CardContent className="p-6 flex items-center justify-between">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">{mesh.name}</p>
                                <p className="text-2xl font-headline font-bold text-white">{mesh.count}</p>
                             </div>
                             <mesh.icon className={`size-8 ${mesh.color} opacity-20`} />
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-emerald-500/40 bg-emerald-500/5 p-6 flex flex-col items-center text-center gap-4">
                  <div className="size-20 rounded-full border-4 border-amber-500 flex items-center justify-center relative bg-black shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                     <Sparkles className="size-8 text-amber-500 animate-spin-slow" />
                     <div className="absolute -top-1 -right-1 size-5 bg-emerald-500 rounded-full border-2 border-black" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-headline font-bold text-white uppercase tracking-widest">Global AI Bridge</p>
                     <Badge className="bg-emerald-500 text-black border-none text-[8px] font-bold">DEVICE_SYNC_MAX</Badge>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                    "Every connected device is now a thinking node in the NoorNexus Empire."
                  </p>
               </Card>

               <Card className="glass-card flex flex-col h-[400px]">
                <CardHeader className="p-4 border-b border-white/5 bg-white/2">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Activity className="size-4" />
                    Surveillance Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {impactFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
                          <div className={`size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse`} />
                          <span className="text-muted-foreground truncate">{log}</span>
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
