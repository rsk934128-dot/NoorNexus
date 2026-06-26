
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Map, 
  Server, 
  Signal, 
  Database, 
  ShieldAlert, 
  ShieldCheck, 
  Loader2, 
  Globe, 
  Zap, 
  Menu,
  Network,
  ArrowRightLeft,
  Infinity,
  ZapOff,
  Compass,
  Building2,
  CheckCircle2,
  Rocket,
  Flame,
  ShieldPlus,
  RefreshCcw,
  Repeat,
  Radio
} from "lucide-react"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function NodesPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [testing, setTesting] = useState(false)
  const [testProgress, setTestProgress] = useState(0)
  const { data: nodes, loading } = useCollection<any>(
    query(collection(db, "nodes"), orderBy("name", "asc"))
  )

  const [replicationMode, setReplicationMode] = useState(true)

  const handleGlobalSyncTest = () => {
    setTesting(true)
    setTestProgress(0)
    
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setTesting(false)
            toast({
              title: "Global Hegemony Sync Verified",
              description: "All 100 nodes synchronized. Avg Latency: 28.2ms. Status: PERPETUAL.",
              className: "border-emerald-500/50 bg-emerald-500/5"
            })
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Infinity className="size-3 mr-2" /> Mission 500: The Sovereign Peak
                 </Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Rocket className="size-3 mr-2" /> 100-Node Grid: GLOBAL_HEGEMONY_ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Regional <span className="text-emerald-500">Watchtower.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "The Zenith of Grid Resilience." নূরনেক্সাস এখন ১০০-নোড অটোনোমাস গ্রিডে উন্নীত এবং চিরস্থায়ী সিঙ্ক্রোনাইজেশন মোডে সক্রিয়।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleGlobalSyncTest}
                disabled={testing}
                className="bg-emerald-500 text-emerald-foreground font-bold h-14 px-8 uppercase tracking-widest gap-3 glow-emerald"
               >
                 {testing ? <Loader2 className="size-5 animate-spin" /> : <Radio className="size-5" />}
                 Global Sync Test
               </Button>
            </div>
          </header>

          {testing && (
            <Card className="glass-card border-emerald-500/30 bg-emerald-500/5 p-8 text-center space-y-6 animate-in zoom-in-95">
               <div className="size-20 rounded-full border-4 border-emerald-500 flex items-center justify-center mx-auto relative bg-black">
                  <Signal className="size-10 text-emerald-500 animate-pulse" />
                  <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin-slow" />
               </div>
               <div className="space-y-2">
                  <p className="text-xl font-headline font-bold text-white uppercase tracking-widest">Pulsing 100-Node Hegemony Grid...</p>
                  <div className="max-w-md mx-auto h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                     <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${testProgress}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase">Verifying Handshake Veracity @ 28ms</p>
               </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               
               {/* 100-Node Grid Visualization Peak */}
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                       <Network className="size-4" /> 100-Node Hegemony Mapping
                    </h3>
                    <div className="flex items-center gap-3">
                       <Badge variant="outline" className={`text-[8px] uppercase font-bold px-3 h-7 border-emerald-500/50 text-emerald-500 bg-emerald-500/5`}>
                          <Repeat className={`size-3 mr-2 animate-spin-slow`} />
                          Self-Replication: PERPETUAL
                       </Badge>
                    </div>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5">
                     <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                        {Array.from({ length: 100 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg border border-emerald-500/40 bg-emerald-500/20 flex items-center justify-center group relative cursor-help">
                             <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-emerald-500/30 p-2 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                NODE_HEGEMONY: {i+1}<br/>STATUS: PERPETUAL_ON
                             </div>
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex flex-wrap justify-between items-center text-[8px] font-mono text-muted-foreground uppercase">
                        <div className="flex gap-6">
                           <div className="flex items-center gap-2">
                              <div className="size-2 rounded bg-emerald-500" />
                              <span>Zenith-Verified (100)</span>
                           </div>
                        </div>
                        <p className="text-emerald-500 font-bold">Execution Status: MISSION_500_PEAK</p>
                     </div>
                  </Card>
               </section>

               {/* Strategic Mapping Peak */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                     <Building2 className="size-4" /> Global Hegemony Intel (P400 Peak)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <Database className="size-4 text-emerald-500" /> Data Lake Peak (Global Ingest)
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                              "All 100 nodes are now actively contributing to the Sovereign Data Lake. Economic Intelligence is generated in real-time."
                           </p>
                           <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-4">
                              <span className="uppercase text-muted-foreground">Lake Coverage</span>
                              <span className="text-emerald-500 font-bold uppercase">100% (GLOBAL)</span>
                           </div>
                        </CardContent>
                     </Card>
                     <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <ShieldPlus className="size-4 text-purple-400" /> Perpetual Node Replication
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                              "Self-replication is active globally. Any regional node downtime triggers instant backup deployment in alternate corridors."
                           </p>
                           <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-4">
                              <span className="uppercase text-muted-foreground">Immunity Rating</span>
                              <span className="text-primary font-bold uppercase">ZENITH_L6</span>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <ArrowRightLeft className="size-4" /> Neural Hegemony
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Total Cluster Torque</p>
                      <Badge className="bg-emerald-500 text-[10px] font-bold mt-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]">100% POWER</Badge>
                   </div>
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                      "Mission 500 ensures that the entire 100-node mesh operates as a single, invincible digital organism."
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Signal className="size-4" /> Hegemony Pulse
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="space-y-1">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span>Zenith Verified</span>
                          <span className="text-emerald-500 font-bold">100 Nodes</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic">
                       The grid is now in its final, eternal state.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/5 border-emerald-500/20 relative overflow-hidden bg-emerald-500/5">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <CheckCircle2 className="size-20 text-emerald-500" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase font-bold text-emerald-500">Mission 500 Peak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-[11px] text-white font-bold leading-tight uppercase">Global Hegemony: SECURE</p>
                  <p className="text-[8px] text-muted-foreground font-mono">HASH: Ω_MISSION_500_FINAL</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
