import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Globe, Cpu, AlertTriangle, ArrowUpRight, Layers } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Mission 400</Badge>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-500">Audit: L4_IMPERIAL</Badge>
              </div>
              <h2 className="text-4xl font-headline font-bold">Logic before Licenses.</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Sovereignty before Scale. Managing the NoorAI & FusionPay integrated digital empire with HMAC_V4 Security.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-white/5 shadow-2xl">
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Latency Target</p>
                <p className="text-2xl font-headline font-bold text-primary">118ms</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Uptime</p>
                <p className="text-2xl font-headline font-bold text-emerald-500">99.99%</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass-card group hover:border-primary/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">HMAC_V4 Handshake</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">STABLE_L4</div>
                <p className="text-xs text-muted-foreground mt-1">100% secure node communication active</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono bg-muted p-2 rounded border border-white/5">
                  <span className="text-primary">X-SOV-SIG:</span>
                  <span className="truncate">HEX_HMAC_V4_8f2d...</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:border-secondary/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Central</CardTitle>
                <Zap className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">One Engine</div>
                <p className="text-xs text-muted-foreground mt-1">Powering 400 applications globally</p>
                <div className="mt-4 flex gap-2">
                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">Visa</Badge>
                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">Crypto</Badge>
                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">P2P</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:border-white/20 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Remit Bridge</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">SmartRemit</div>
                <p className="text-xs text-muted-foreground mt-1">Active P2P global connectivity</p>
                <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[75%]" />
                </div>
                <p className="text-[10px] text-right mt-1 text-muted-foreground">75% Load Capacity</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Cpu className="size-5 text-primary" />
                    Infrastructure Roadmap
                  </CardTitle>
                  <CardDescription>Visionary milestones for NoorNexus sovereignty.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "AI Anomaly Detection", status: "Active", progress: 100 },
                    { label: "Immutable Audit Trails", status: "In Progress", progress: 65 },
                    { label: "Zero-Trust Mesh Networking", status: "Scheduled", progress: 20 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{item.label}</span>
                        <span className="text-muted-foreground font-bold">{item.status}</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-primary transition-all duration-1000`} 
                          style={{ width: `${item.progress}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline">Recent Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { node: "Sirajganj-01", type: "Handshake", time: "2m ago", status: "Success" },
                      { node: "Dhaka-Core-02", type: "Ledger Update", time: "15m ago", status: "Success" },
                    ].map((event, i) => (
                      <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-0">
                        <div className="flex flex-col">
                          <span className="font-bold">{event.node}</span>
                          <span className="text-muted-foreground">{event.type}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-500 font-bold">{event.status}</div>
                          <div className="text-muted-foreground">{event.time}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass-card bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline text-primary">Sovereignty Alert</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <AlertTriangle className="size-8 text-primary shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        HMAC_V4 rotation is scheduled in 48 hours. Ensure Sirajganj-Edge-01 nodes are synced with time window offsets.
                      </p>
                    </div>
                    <button className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest p-2 bg-primary text-primary-foreground rounded hover:glow-primary transition-all">
                      Review Rotation Plan
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline">The One Engine Policy</CardTitle>
                <CardDescription>Centralized backend distribution across ecosystem.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-10 rounded-full border border-secondary/20 animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                  <div className="size-20 bg-primary rounded-2xl flex items-center justify-center glow-primary z-10">
                    <Cpu className="size-10 text-primary-foreground" />
                  </div>
                  {[0, 72, 144, 216, 288].map((deg, i) => (
                    <div 
                      key={i} 
                      className="absolute size-8 bg-card border border-white/10 rounded-lg flex items-center justify-center shadow-xl z-20"
                      style={{
                        transform: `rotate(${deg}deg) translateY(-100px) rotate(-${deg}deg)`
                      }}
                    >
                      <Layers className="size-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center space-y-2">
                  <p className="text-xs text-muted-foreground italic">"Empowering 400+ applications through a single sovereign logic layer."</p>
                  <Badge variant="outline" className="text-[10px] font-mono">ID: NOOR_ONE_ENG_B40</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
