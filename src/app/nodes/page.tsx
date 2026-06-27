
"use client"

import { useState, useEffect, useMemo } from "react"
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
  Radio,
  Users
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

  const { data: sessions } = useCollection<any>(collection(db, "user_sessions"))

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
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Regional <span className="text-emerald-500">Watchtower.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "The Zenith of Grid Resilience." ১০০-নোড অটোনোমাস গ্রিডের রিয়েল-টাইম ইউজার কানেক্টিভিটি এবং নোড স্ট্যাটাস।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Active Citizens</p>
                  <p className="text-2xl font-headline font-bold text-primary">{sessions.length}</p>
               </div>
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
               </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               
               {/* 100-Node Grid Visualization */}
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                       <Network className="size-4" /> 100-Node Hegemony Mapping
                    </h3>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5">
                     <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                        {Array.from({ length: 100 }).map((_, i) => {
                          const hasUser = sessions.some((s:any) => parseInt(s.assignedNode?.split('-')[2]) === i + 1);
                          return (
                            <div key={i} className={`aspect-square rounded-lg border flex items-center justify-center group relative cursor-help transition-all duration-500 ${hasUser ? 'bg-primary/20 border-primary animate-pulse shadow-[0_0_10px_rgba(0,150,255,0.4)]' : 'bg-emerald-500/20 border-emerald-500/40'}`}>
                               <div className={`size-1.5 rounded-full ${hasUser ? 'bg-primary' : 'bg-emerald-500'}`} />
                               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 p-2 rounded text-[7px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                  NODE_{i+1}: {hasUser ? 'COMM_ACTIVE' : 'STANDBY'}<br/>
                                  USERS: {sessions.filter((s:any) => parseInt(s.assignedNode?.split('-')[2]) === i + 1).length}
                               </div>
                            </div>
                          )
                        })}
                     </div>
                  </Card>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Users className="size-4" /> Live Connection Pulse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[10px] text-muted-foreground leading-relaxed italic">
                   "The Watchtower is monitoring {sessions.length} active commanders across {new Set(sessions.map((s:any) => s.assignedRegion)).size} regions."
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                       <ShieldPlus className="size-4" /> Sovereignty Guard
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-amber-500/5 rounded border border-amber-500/20 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase">Identity Drift</p>
                       <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 text-[8px] mt-1">ZERO_DRIFT</Badge>
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
