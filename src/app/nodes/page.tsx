
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
  Building2
} from "lucide-react"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { Button } from "@/components/ui/button"

export default function NodesPage() {
  const db = useFirestore()
  const { data: nodes, loading } = useCollection<any>(
    query(collection(db, "nodes"), orderBy("name", "asc"))
  )

  const [scalingProgress, setScalingProgress] = useState(20)

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full overflow-x-hidden">
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
                   <Compass className="size-3 mr-2" /> Latency-Optimized Placement ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Regional <span className="text-primary">Watchtower.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project #200: Node Auto-Scaling Cluster. Deploying 80 new nodes in South & SE Asia to stabilize global digital sovereignty.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Scaling Torque</p>
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
                       <Network className="size-4" /> 100-Node Grid Heatmap
                    </h3>
                    <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 uppercase">Perpetual Sync: ACTIVE</Badge>
                  </div>
                  <Card className="glass-card p-6 bg-black/40 border-white/5">
                     <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                        {/* Active Nodes */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg border border-emerald-500/40 bg-emerald-500/20 flex items-center justify-center group relative cursor-help">
                             <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-emerald-500/30 p-2 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                NODE_LIVE: {i+1}<br/>LATENCY: 26ms
                             </div>
                          </div>
                        ))}
                        {/* Scaling Nodes - South Asia */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i+20} className="aspect-square rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center group relative cursor-help">
                             <Zap className="size-3 text-primary animate-pulse" />
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-primary/30 p-2 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                PROVISIONING: S_ASIA<br/>TARGET: BDT_HUB
                             </div>
                          </div>
                        ))}
                        {/* Scaling Nodes - SE Asia */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i+40} className="aspect-square rounded-lg border border-purple-500/30 bg-purple-500/10 flex items-center justify-center group relative cursor-help">
                             <Globe className="size-3 text-purple-400 animate-spin-slow" />
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-purple-500/30 p-2 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap font-mono uppercase">
                                PROVISIONING: SE_ASIA<br/>TARGET: GRAB_GCASH
                             </div>
                          </div>
                        ))}
                        {/* Remaining Target Nodes */}
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div key={i+60} className="aspect-square rounded-lg border border-dashed border-white/5 flex items-center justify-center opacity-20 grayscale">
                             <ZapOff className="size-3 text-muted-foreground" />
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex flex-wrap gap-6 text-[8px] font-mono text-muted-foreground uppercase">
                        <div className="flex items-center gap-2">
                           <div className="size-2 rounded bg-emerald-500" />
                           <span>Live (20)</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="size-2 rounded bg-primary" />
                           <span>South Asia Scaling (20)</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="size-2 rounded bg-purple-500" />
                           <span>SE Asia Scaling (20)</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="size-2 rounded border border-dashed border-white/40" />
                           <span>Target Nodes (40)</span>
                        </div>
                     </div>
                  </Card>
               </section>

               {/* Latency-Optimized Placement Strategy */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                     <Building2 className="size-4" /> Strategic Placement (South & SE Asia)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white">South Asia Liquidity Hubs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {[
                             { name: "Sirajganj-Edge-02", region: "Bangladesh", status: "PROVISIONING", provider: "bKash" },
                             { name: "Mumbai-Core-01", region: "India", status: "SYNCING", provider: "Paytm" },
                             { name: "Dhaka-Central-L4", region: "Bangladesh", status: "ACTIVE", provider: "Sovereign" }
                           ].map((h, i) => (
                             <div key={i} className="p-3 bg-black/40 rounded border border-white/5 flex justify-between items-center">
                                <div className="space-y-0.5">
                                   <p className="text-xs font-bold text-white uppercase">{h.name}</p>
                                   <p className="text-[8px] text-muted-foreground uppercase">{h.region} | {h.provider}</p>
                                </div>
                                <Badge variant="outline" className={`text-[7px] ${h.status === 'ACTIVE' ? 'border-emerald-500 text-emerald-500' : 'border-primary text-primary'}`}>{h.status}</Badge>
                             </div>
                           ))}
                        </CardContent>
                     </Card>
                     <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white">SE Asia Corridor Nodes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {[
                             { name: "Bangkok-Bridge-01", region: "Thailand", status: "ACTIVE", provider: "PromptPay" },
                             { name: "Manila-Node-04", region: "Philippines", status: "PROVISIONING", provider: "GCash" },
                             { name: "Jakarta-Core-02", region: "Indonesia", status: "SYNCING", provider: "GrabPay" }
                           ].map((h, i) => (
                             <div key={i} className="p-3 bg-black/40 rounded border border-white/5 flex justify-between items-center">
                                <div className="space-y-0.5">
                                   <p className="text-xs font-bold text-white uppercase">{h.name}</p>
                                   <p className="text-[8px] text-muted-foreground uppercase">{h.region} | {h.provider}</p>
                                </div>
                                <Badge variant="outline" className={`text-[7px] ${h.status === 'ACTIVE' ? 'border-emerald-500 text-emerald-500' : 'border-purple-400 text-purple-400'}`}>{h.status}</Badge>
                             </div>
                           ))}
                        </CardContent>
                     </Card>
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <ArrowRightLeft className="size-4" /> Neural Load Balancer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Dynamic Routing Status</p>
                      <Badge className="bg-emerald-500 text-[10px] font-bold mt-1">OPTIMAL</Badge>
                   </div>
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                      "Project #201: The Sovereign Neural Bridge is currently monitoring 100-node target latencies. Automated re-routing active for South Asia corridors."
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
                          <span>Mesh Sync Stability</span>
                          <span className="text-primary font-bold">100%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic">
                       20 nodes live. 40 nodes provisioning. 40 nodes targeted.
                    </p>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
