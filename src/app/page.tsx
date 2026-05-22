
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Globe, Cpu, AlertTriangle, Activity, Database, Landmark } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING SOVEREIGN BORDER...")

  useEffect(() => {
    const sequence = [
      { text: "INITIALIZING SOVEREIGN BORDER...", time: 1000 },
      { text: "VERIFYING HMAC_V4 HANDSHAKE...", time: 2000 },
      { text: "NODE TRUST ESTABLISHED", time: 3000 },
      { text: "SOVEREIGN CONSOLE READY", time: 3500 },
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
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-10 space-y-6">
        <div className="size-20 bg-primary/20 rounded-2xl flex items-center justify-center animate-pulse border border-primary/40 shadow-[0_0_50px_rgba(0,150,255,0.2)]">
          <Globe className="size-10 text-primary animate-spin-slow" />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-primary font-mono text-sm tracking-[0.2em] animate-pulse">{statusText}</p>
          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
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
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Mission 400</Badge>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 glow-emerald">Audit: L4_IMPERIAL</Badge>
              </div>
              <h2 className="text-5xl font-headline font-bold tracking-tight">Logic before <span className="text-primary">Licenses.</span></h2>
              <p className="text-muted-foreground max-w-xl text-lg">
                Managing the NoorAI & FusionPay integrated digital empire with <span className="text-white font-mono">HMAC_V4</span> Security Mesh.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Global Throughput</p>
                <p className="text-2xl font-headline font-bold text-primary">1.2M <span className="text-xs">TX/H</span></p>
              </div>
              <div className="glass-card p-4 rounded-xl text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">System Health</p>
                <p className="text-2xl font-headline font-bold text-secondary">99.99%</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Border Guard", value: "STABLE_L4", sub: "Active Filtering", icon: Shield, color: "text-primary" },
              { label: "Liquidity", value: "Verified", sub: "Node 12/12 Sync", icon: Landmark, color: "text-secondary" },
              { label: "Handshake", value: "240ms", sub: "Global Average", icon: Zap, color: "text-amber-500" },
              { label: "Anomalies", value: "Zero", sub: "Last 24h Audit", icon: AlertTriangle, color: "text-emerald-500" },
            ].map((stat, i) => (
              <Card key={i} className="glass-card hover:border-white/10 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{stat.label}</span>
                  <stat.icon className={`size-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-headline font-bold">{stat.value}</div>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-l-4 border-l-primary scan-effect relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Activity className="size-5 text-primary" />
                    Sovereign Traffic Mesh
                  </CardTitle>
                  <CardDescription>Real-time node-to-node encrypted traffic visualization.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted/20 rounded-xl relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover" />
                    <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
                      <div className="size-4 bg-primary rounded-full animate-ping" />
                      <div className="absolute top-1/4 left-1/4 size-2 bg-secondary rounded-full" />
                      <div className="absolute bottom-1/4 right-1/4 size-2 bg-secondary rounded-full" />
                      <svg className="absolute inset-0 w-full h-full">
                        <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                        <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline flex items-center gap-2">
                      <Database className="size-4 text-secondary" />
                      HMAC_V4 Rotation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Current Epoch:</span>
                      <span className="font-mono text-primary">#402-A</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Next Rotation:</span>
                      <span className="font-mono">14:22:11</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-2/3" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline text-primary">Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="size-10 bg-primary/20 rounded flex items-center justify-center shrink-0">
                        <Cpu className="size-6 text-primary" />
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                        "Autonomous agents are currently auditing 4,812 inter-node handshakes. No timing-attacks detected in this cycle."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-headline">Sovereign Treasury</CardTitle>
                  <CardDescription>Liquidity health across ledgers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: "Sovereign-BDT", amount: "1.4B", health: 98, color: "bg-emerald-500" },
                    { label: "Digital-Gold", amount: "42k Oz", health: 100, color: "bg-amber-500" },
                    { label: "Inter-Node Credit", amount: "250M", health: 75, color: "bg-primary" },
                  ].map((asset, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-muted-foreground">{asset.label}</span>
                        <span className="text-sm font-headline font-bold">{asset.amount}</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full">
                        <div className={`h-full ${asset.color}`} style={{ width: `${asset.health}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-white/5">
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded font-bold text-[10px] uppercase tracking-widest glow-primary hover:opacity-90 transition-all">
                      Export Imperial Audit
                    </button>
                  </div>
                </CardContent>
              </Card>

              <div className="glass-card p-4 rounded-xl space-y-3">
                <h4 className="text-[10px] uppercase font-bold text-primary tracking-widest">Digital Border Map</h4>
                <div className="aspect-square bg-muted/10 rounded border border-white/5 flex items-center justify-center p-4">
                   <div className="relative size-full">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
                      <div className="absolute inset-4 rounded-full border border-secondary/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="size-16 bg-background rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
                            <Globe className="size-8 text-primary opacity-50" />
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
