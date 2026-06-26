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
  Repeat
} from "lucide-react"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { Button } from "@/components/ui/button"

export default function NodesPage() {
  const db = useFirestore()
  const { data: nodes, loading } = useCollection<any>(
    query(collection(db, "nodes"), orderBy("name", "asc"))
  )

  const [replicationMode, setReplicationMode] = useState(true)

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
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Infinity className="size-3 mr-2" /> Mission 500: Project #200
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Rocket className="size-3 mr-2" /> Phase 7: 100-Node Grid Final Execution
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Regional <span className="text-primary">Watchtower.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Autonomous Scaling & Resilience." ১০০-নোড গ্রিড এখন সম্পূর্ণ স্বায়ত্তশাসিত এবং সেলফ-রেপ্লিকেশন মোডে সক্রিয়।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Grid Torque</p>
                  <p className="text-3xl font-headline font-bold text-primary">94%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               
               {/* 100-Node Grid Visualization */}
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <Network className="size-4" /> 100-Node Grid Mapping (Phase 7)
                    </h3>
                    <div className="flex items-center gap-3">
                       <Badge variant="outline" className={`text-[8px] uppercase font-bold px-3 h-7 ${replicationMode ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/5' : 'border-white/10'}`}>
                          <Repeat className={`size-3 mr-2 ${replicationMode ? 'animate-spin-slow' : ''}`} />
                          Self-Replication: {replicationMode ? 'ARMED' : 'OFF'}
                       </Badge>
                       <Button size="sm" onClick={() => setReplicationMode(!replicationMode)} variant="ghost" className="text-[8px] uppercase font-bold text-muted-foreground h-7">Toggle Protocol</Button>
                    </div>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5">
                     <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                        {/* Active Nodes (30) */}
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg border border-emerald-500/40 bg-emerald-500/20 flex items-center justify-center group relative cursor-help">
                             <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-emerald-500/30 p-2 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                NODE_ZENITH: {i+1}<br/>STATUS: VERIFIED
                             </div>
                          </div>
                        ))}
                        {/* Provisioning Nodes (40) */}
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div key={i+30} className="aspect-square rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center group relative cursor-help">
                             <Zap className="size-3 text-primary animate-pulse" />
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-primary/30 p-2 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                MAPPING: P7_SCALING<br/>ID: SC-{i+31}
                             </div>
                          </div>
                        ))}
                        {/* Remaining Target Nodes (30) */}
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div key={i+70} className="aspect-square rounded-lg border border-dashed border-white/5 flex items-center justify-center opacity-20 grayscale">
                             <ZapOff className="size-3 text-muted-foreground" />
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex flex-wrap justify-between items-center text-[8px] font-mono text-muted-foreground uppercase">
                        <div className="flex gap-6">
                           <div className="flex items-center gap-2">
                              <div className="size-2 rounded bg-emerald-500" />
                              <span>Zenith-Verified (30)</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="size-2 rounded bg-primary" />
                              <span>Mapping Active (40)</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="size-2 rounded border border-dashed border-white/40" />
                              <span>Final Target (30)</span>
                           </div>
                        </div>
                        <p className="text-primary font-bold">Execution Window: 72 Hours</p>
                     </div>
                  </Card>
               </section>

               {/* Strategic Mapping (Project #300 Connection) */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                     <Building2 className="size-4" /> Regional Intel Integration (P300)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <Database className="size-4 text-primary" /> Data Lake Ingest (South Asia)
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                              "Node 1-30 are now directly ingest into the Sovereign Data Lake for real-time economic intelligence mapping."
                           </p>
                           <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-4">
                              <span className="uppercase text-muted-foreground">Lake Sync Status</span>
                              <span className="text-emerald-500 font-bold uppercase">CONNECTED</span>
                           </div>
                        </CardContent>
                     </Card>
                     <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <ShieldPlus className="size-4 text-purple-400" /> Self-Healing Cluster
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                              "Nora-50 is monitoring all 100 target nodes. Automated failover and backup node replication is active."
                           </p>
                           <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-4">
                              <span className="uppercase text-muted-foreground">Replication Protocol</span>
                              <span className="text-primary font-bold uppercase">ARMED_L4</span>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <ArrowRightLeft className="size-4" /> Neural Bridge P7
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Cluster Sync Torque</p>
                      <Badge className="bg-emerald-500 text-[10px] font-bold mt-1">94% POWER</Badge>
                   </div>
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                      "Phase 7 execution ensures that all 100 nodes are load-balanced with < 30ms regional latency."
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Signal className="size-4" /> Network Pulse
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="space-y-1">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span>Zenith Verified</span>
                          <span className="text-primary font-bold">30 Nodes</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '30%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic">
                       Self-replication mode is monitoring connectivity gaps.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <CheckCircle2 className="size-20 text-emerald-500" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase font-bold text-emerald-500">Self-Replication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-[11px] text-white font-bold leading-tight">ACTIVE_PEER_SYNC: ON</p>
                  <p className="text-[8px] text-muted-foreground font-mono">BACKUP_PROVISIONING: READY</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
