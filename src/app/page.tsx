
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Globe, Cpu, AlertTriangle, Activity, Database, Landmark, Radar, Lock } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING HMAC_V4 BORDER...")

  useEffect(() => {
    const sequence = [
      { text: "INITIALIZING HMAC_V4 BORDER...", time: 800 },
      { text: "VERIFYING NODE TRUST MESH...", time: 1600 },
      { text: "ESTABLISHING TREASURY LEDGER...", time: 2400 },
      { text: "SYNCING CONSENSUS PROTOCOL...", time: 3000 },
      { text: "AI COMPLIANCE AGENT ONLINE", time: 3600 },
      { text: "SOVEREIGN INFRASTRUCTURE READY", time: 4200 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-10 space-y-8">
        <div className="size-24 bg-primary/10 rounded-3xl flex items-center justify-center animate-pulse border border-primary/20 shadow-[0_0_80px_rgba(0,150,255,0.15)] relative">
          <Lock className="size-12 text-primary" />
          <div className="absolute inset-0 border-2 border-primary/5 rounded-3xl animate-ping" />
        </div>
        <div className="space-y-4 text-center">
          <div className="flex flex-col gap-1">
             <p className="text-primary font-headline text-xl font-bold tracking-widest uppercase">NoorNexus</p>
             <p className="text-muted-foreground font-mono text-[10px] tracking-[0.4em] uppercase">{statusText}</p>
          </div>
          <div className="w-80 h-1 bg-muted rounded-full overflow-hidden mx-auto">
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
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 relative">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Operational OS v3</Badge>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 glow-emerald uppercase tracking-tighter">Audit: L4_IMPERIAL</Badge>
              </div>
              <h2 className="text-6xl font-headline font-bold tracking-tighter">Sovereign <span className="text-primary">Intelligence.</span></h2>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                Autonomous cryptographic defense and treasury mesh for the NoorAI digital empire. Built on <span className="text-white font-mono">HMAC_V4</span> Zero-Trust Mesh.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-xl text-right border-l-4 border-l-primary">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Global Throughput</p>
                <p className="text-3xl font-headline font-bold text-primary">1.4M <span className="text-xs font-mono">TX/H</span></p>
              </div>
              <div className="glass-card p-5 rounded-xl text-right border-l-4 border-l-emerald-500">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Border Integrity</p>
                <p className="text-3xl font-headline font-bold text-emerald-500">99.99%</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Border Guard", value: "LOCKDOWN", sub: "HMAC_V4 Active", icon: Shield, color: "text-primary" },
              { label: "Threat Matrix", value: "ZERO", sub: "Last Audit: 12ms", icon: Radar, color: "text-destructive" },
              { label: "Treasury Mesh", value: "SYNCED", sub: "12 Node Consensus", icon: Landmark, color: "text-emerald-500" },
              { label: "AI Reasoning", value: "AUTONOMOUS", sub: "Compliance Live", icon: Cpu, color: "text-amber-500" },
            ].map((stat, i) => (
              <Card key={i} className="glass-card hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</span>
                  <stat.icon className={`size-4 ${stat.color} transition-transform group-hover:scale-110`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-headline font-bold tracking-tight">{stat.value}</div>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1 opacity-70">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-l-4 border-l-primary scan-effect relative overflow-hidden h-[450px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Globe className="size-5 text-primary" />
                    Digital Border Map
                  </CardTitle>
                  <CardDescription>Visualizing sovereign encrypted routes and node connections.</CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/map3/1200/800')] bg-cover" />
                  <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
                    <div className="size-64 rounded-full border border-primary/20 animate-spin-slow absolute" />
                    <div className="size-48 rounded-full border border-primary/10 absolute" />
                    <div className="size-4 bg-primary rounded-full animate-ping shadow-[0_0_20px_rgba(0,150,255,0.8)]" />
                    
                    {/* Node points */}
                    <div className="absolute top-1/4 left-1/4">
                       <div className="size-2 bg-emerald-500 rounded-full glow-emerald" />
                       <p className="text-[8px] font-mono mt-1 text-emerald-500/70 uppercase">SG-Edge-01</p>
                    </div>
                    <div className="absolute bottom-1/3 right-1/4">
                       <div className="size-2 bg-emerald-500 rounded-full glow-emerald" />
                       <p className="text-[8px] font-mono mt-1 text-emerald-500/70 uppercase">LON-Relay-04</p>
                    </div>
                    
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                       <path d="M 25% 25% Q 50% 50% 75% 66%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="5 5" fill="transparent" className="animate-pulse" />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="glass-card bg-muted/20 border-white/5">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2">
                          <Activity className="size-3" />
                          Consensus Stream
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500/70">
                          <div className="size-1 bg-emerald-500 rounded-full" />
                          LEDGER_SYNC_COMPLETE: EPOCH_402
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-mono text-primary/70">
                          <div className="size-1 bg-primary rounded-full" />
                          TREASURY_MESH_STABLE: 12/12
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-mono text-amber-500/70">
                          <div className="size-1 bg-amber-500 rounded-full" />
                          AI_COMPLIANCE_RUNNING...
                       </div>
                    </CardContent>
                 </Card>
                 <Card className="glass-card border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-xs font-bold text-primary uppercase">Identity Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                          "System wide Zero-Trust Mesh enabled. All sessions are signed with ephemeral sovereign tokens."
                       </p>
                       <div className="mt-4 flex items-center gap-2">
                          <Badge variant="outline" className="text-[8px] border-primary/30 text-primary">IMPERIAL ROOT</Badge>
                       </div>
                    </CardContent>
                 </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-headline">Treasury Pulse</CardTitle>
                  <CardDescription>Real-time cross-ledger liquidity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: "Sovereign-BDT", amount: "1.4B", health: 98, color: "bg-emerald-500" },
                    { label: "Gold-Reserve", amount: "42k Oz", health: 100, color: "bg-amber-500" },
                    { label: "Mesh-Credit", amount: "250M", health: 82, color: "bg-primary" },
                  ].map((asset, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-muted-foreground uppercase">{asset.label}</span>
                        <span className="text-sm font-headline font-bold">{asset.amount}</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${asset.color} transition-all duration-1000`} style={{ width: `${asset.health}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-white/5 space-y-3">
                     <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-muted-foreground">Queue Depth:</span>
                        <span className="text-primary">124 TX</span>
                     </div>
                     <button className="w-full bg-primary text-primary-foreground py-2.5 rounded font-bold text-[10px] uppercase tracking-widest glow-primary hover:opacity-90 transition-all">
                        Execute Ledger Audit
                     </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-destructive/20">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-destructive flex items-center gap-2">
                      <AlertTriangle className="size-4" />
                      Threat Analysis
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="p-3 bg-destructive/10 rounded border border-destructive/10 flex gap-3">
                      <div className="size-1.5 bg-destructive rounded-full mt-1 shrink-0 animate-pulse" />
                      <p className="text-[10px] leading-relaxed text-muted-foreground italic">
                        "Autonomous monitor flagged 4 suspicious signature patterns in the Singapore-Relay corridor. No breach detected."
                      </p>
                   </div>
                   <div className="aspect-square relative flex items-center justify-center p-4 bg-muted/10 rounded-xl">
                      <div className="absolute inset-0 rounded-full border border-destructive/10 animate-spin-slow" />
                      <Radar className="size-12 text-destructive opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="text-[8px] font-mono text-destructive font-bold uppercase">Scanning...</div>
                      </div>
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
