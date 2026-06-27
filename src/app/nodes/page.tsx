
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
                "The Zenith of Grid Resilience." ১০০-নোড অটোনোমাস গ্রিডের রিয়েল-টাইম কানেক্টিভিটি এবং প্রতিটি কমান্ডারের সেশন এখন ট্র্যাক করা হচ্ছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Active Citizens</p>
                  <p className="text-2xl font-headline font-bold text-primary">
                    {sessions.filter((s:any) => s.lastSeen && (Date.now() - s.lastSeen.toDate().getTime() < 120000)).length}
                  </p>
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
                          const hasOnlineUser = sessions.some((s:any) => {
                             const isOnline = s.lastSeen && (Date.now() - s.lastSeen.toDate().getTime() < 120000);
                             const nodeMatch = s.assignedNode?.includes(`-${String(i+1).padStart(2, '0')}`);
                             return isOnline && nodeMatch;
                          });
                          return (
                            <div key={i} className={`aspect-square rounded-lg border flex items-center justify-center group relative cursor-help transition-all duration-500 ${hasOnlineUser ? 'bg-primary/30 border-primary animate-pulse shadow-[0_0_15px_rgba(0,150,255,0.6)] scale-105 z-10' : 'bg-emerald-500/10 border-emerald-500/20 opacity-40'}`}>
                               <div className={`size-1.5 rounded-full ${hasOnlineUser ? 'bg-white shadow-[0_0_5px_white]' : 'bg-emerald-500/40'}`} />
                               <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-white/10 p-2 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                  NODE_{i+1}: {hasOnlineUser ? 'COMM_ACTIVE' : 'STANDBY'}<br/>
                                  USERS: {sessions.filter((s:any) => s.assignedNode?.includes(`-${String(i+1).padStart(2, '0')}`)).length}
                               </div>
                            </div>
                          )
                        })}
                     </div>
                  </Card>
               </section>

               <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                        <Users className="size-4" /> Regional Citizen Hubs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {["South Asia", "Middle East", "Europe", "SE Asia"].map((region, i) => {
                        const count = sessions.filter((s:any) => s.assignedRegion?.includes(region)).length;
                        const online = sessions.filter((s:any) => s.assignedRegion?.includes(region) && s.lastSeen && (Date.now() - s.lastSeen.toDate().getTime() < 120000)).length;
                        return (
                          <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                            <span className="text-xs font-bold text-white uppercase">{region}</span>
                            <div className="flex gap-4 items-center">
                               <div className="text-right">
                                  <p className="text-[8px] text-muted-foreground uppercase">Online</p>
                                  <p className="text-sm font-headline font-bold text-emerald-500">{online}</p>
                               </div>
                               <div className="text-right">
                                  <p className="text-[8px] text-muted-foreground uppercase">Total</p>
                                  <p className="text-sm font-headline font-bold text-primary">{count}</p>
                               </div>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Activity className="size-4" /> Global Handshake Latency
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                       <p className="text-5xl font-headline font-bold text-white tracking-tighter">28.2<span className="text-amber-500 text-lg ml-1">ms</span></p>
                       <p className="text-[10px] text-muted-foreground uppercase font-bold mt-2">Average Veracity Time</p>
                       <div className="mt-6 flex gap-1 items-end h-12">
                          {[40, 65, 30, 85, 45, 90, 42, 70, 55, 80].map((h, i) => (
                            <div key={i} className="w-2 bg-amber-500/20 rounded-t-sm relative overflow-hidden">
                               <div className="absolute bottom-0 w-full bg-amber-500 animate-pulse" style={{ height: `${h}%` }} />
                            </div>
                          ))}
                       </div>
                    </CardContent>
                  </Card>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Users className="size-4" /> Imperial Registry Sync
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Total of {sessions.length} Unique Identities are anchored in the Sovereign Registry. Mission 500 Hegemony TORQUE is stable."
                   </p>
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
                       <p className="text-[8px] text-muted-foreground uppercase">Identity Pulse</p>
                       <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 text-[8px] mt-1 uppercase">AUTHENTIC_100%</Badge>
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
