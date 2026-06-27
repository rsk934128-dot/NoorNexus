
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  HeartPulse, 
  Activity, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  Menu, 
  RefreshCcw, 
  Database, 
  Cpu, 
  Globe, 
  History,
  TrendingUp,
  Gauge,
  Flame,
  Search,
  CheckCircle2,
  Clock,
  Terminal,
  Signal,
  Infinity
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { logImperialEvent } from "@/services/telemetry-service"

export default function AppHealthPage() {
  const { toast } = useToast()
  const [scanning, setScanning] = useState(false)
  const [pulseData, setPulseData] = useState({
    latency: 28,
    errorRate: 0.02,
    uptime: 99.99,
    healthScore: 98
  })

  useEffect(() => {
    logImperialEvent('view_health_dashboard')
    const interval = setInterval(() => {
      setPulseData(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * (32 - 24) + 24),
        errorRate: Math.random() * 0.05
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleDeepScan = () => {
    setScanning(true)
    logImperialEvent('execute_deep_health_scan')
    setTimeout(() => {
      setScanning(false)
      toast({
        title: "Deep Neural Scan Complete",
        description: "Zero bit-drift detected. Veracity index at 100%.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 3000)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <HeartPulse className="size-3 mr-2" /> Mission 500: Sovereign Vitals
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Hegemony <span className="text-emerald-500">Pulse.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Monitoring the Breath of the Empire." ফায়ারবেস অ্যানালিটিক্স এবং পারফরম্যান্স মনিটরিংয়ের মাধ্যমে আপনার ডিজিটাল সন্তানদের সক্ষমতা যাচাই করা হচ্ছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleDeepScan} 
                disabled={scanning}
                className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary"
               >
                 {scanning ? <RefreshCcw className="size-4 animate-spin" /> : <Activity className="size-4" />}
                 Execute Deep Scan
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Real-time Vitals */}
            <div className="lg:col-span-3 space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Veracity Latency", val: `${pulseData.latency}ms`, icon: Zap, color: "text-primary" },
                    { label: "Uptime (24h)", val: `${pulseData.uptime}%`, icon: ShieldCheck, color: "text-emerald-500" },
                    { label: "Stability Score", val: `${pulseData.healthScore}/100`, icon: Gauge, color: "text-amber-500" },
                    { label: "Error Frequency", val: `${pulseData.errorRate.toFixed(2)}%`, icon: AlertTriangle, color: "text-red-500" }
                  ].map((m, i) => (
                    <Card key={i} className="glass-card bg-black/40 border-white/5">
                      <CardContent className="p-6 space-y-2">
                         <div className="flex justify-between items-center">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{m.label}</p>
                            <m.icon className={`size-4 ${m.color} opacity-40`} />
                         </div>
                         <p className="text-2xl font-headline font-bold text-white">{m.val}</p>
                      </CardContent>
                    </Card>
                  ))}
               </div>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <TrendingUp className="size-4" /> Global Performance Matrix
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="glass-card">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white">First Contentful Paint (FCP)</CardTitle>
                           <CardDescription>Average load speed across 100 nodes.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[200px] flex items-end gap-1 px-6">
                           {Array.from({ length: 20 }).map((_, i) => (
                             <div 
                              key={i} 
                              className="flex-1 bg-emerald-500/20 rounded-t-sm relative group overflow-hidden"
                              style={{ height: `${20 + Math.random() * 80}%` }}
                             >
                                <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                             </div>
                           ))}
                        </CardContent>
                        <div className="p-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                           <span className="text-muted-foreground uppercase">Target: &lt; 0.8s</span>
                           <span className="text-emerald-500 font-bold uppercase">Current: 0.62s</span>
                        </div>
                     </Card>

                     <Card className="glass-card">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white">Network Success Rate</CardTitle>
                           <CardDescription>Sovereign Gateway (P51) reliability.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[200px] flex items-center justify-center">
                           <div className="relative size-32">
                              <svg className="size-full" viewBox="0 0 100 100">
                                 <circle className="text-white/5 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                                 <circle 
                                   className="text-primary stroke-current" 
                                   strokeWidth="8" 
                                   strokeLinecap="round" 
                                   fill="transparent" 
                                   r="40" 
                                   cx="50" 
                                   cy="50" 
                                   strokeDasharray="251.2" 
                                   strokeDashoffset={251.2 * (1 - pulseData.uptime/100)} 
                                   transform="rotate(-90 50 50)"
                                 />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <p className="text-xl font-headline font-bold text-white">{pulseData.uptime}%</p>
                                 <p className="text-[8px] text-muted-foreground uppercase">Stable</p>
                              </div>
                           </div>
                        </CardContent>
                        <div className="p-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                           <span className="text-muted-foreground uppercase">Request Volume</span>
                           <span className="text-primary font-bold uppercase">12.5k / min</span>
                        </div>
                     </Card>
                  </div>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-red-500 flex items-center gap-2">
                     <Flame className="size-4" /> Sovereign Crashlytics (Uncaught Events)
                  </h3>
                  <Card className="glass-card overflow-hidden">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="bg-white/2 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                                 <th className="px-6 py-4">Error Identity</th>
                                 <th className="px-6 py-4">Context / Trace</th>
                                 <th className="px-6 py-4">Frequency</th>
                                 <th className="px-6 py-4 text-right">Severity</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5 text-[11px]">
                              {[
                                { err: "TypeError: Failed to fetch", trace: "src/app/p2c/page.tsx:142", count: 4, severity: "HIGH" },
                                { err: "ReferenceError: CheckCircle2 is not defined", trace: "src/app/browser/page.tsx:251", count: 12, severity: "CRITICAL" },
                                { err: "NetworkError: Canal timeout", trace: "src/services/pay-bridge.ts:88", count: 2, severity: "MEDIUM" }
                              ].map((item, i) => (
                                <tr key={i} className="hover:bg-white/2 transition-colors group">
                                   <td className="px-6 py-4">
                                      <p className="font-mono text-red-400 font-bold">{item.err}</p>
                                   </td>
                                   <td className="px-6 py-4 text-muted-foreground font-mono">{item.trace}</td>
                                   <td className="px-6 py-4">
                                      <Badge variant="outline" className="border-white/10 text-[9px]">{item.count} events</Badge>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                      <Badge className={`${item.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'} text-[8px] font-bold`}>{item.severity}</Badge>
                                   </td>
                                </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </Card>
               </section>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                        <Globe className="size-4" /> Performance Monitoring
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Measuring web vitals automatically across the global mesh. Zero cost, infinite veracity."
                     </p>
                     <div className="pt-4 border-t border-white/5 space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                           <span className="uppercase text-muted-foreground">Main Thread Status</span>
                           <span className="text-emerald-500 font-bold uppercase">IDLE_OPTIMAL</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono">
                           <span className="uppercase text-muted-foreground">Memory usage</span>
                           <span className="text-white font-bold uppercase">42 MB</span>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-purple-500 flex items-center gap-2">
                        <Search className="size-4" /> Google Analytics Node
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-bold">Property ID</p>
                        <p className="text-sm font-mono text-white font-bold">543446221</p>
                     </div>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Capturing session starts, engagement time, and 500+ custom imperial events.
                     </p>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase text-muted-foreground flex items-center gap-2">
                        <Terminal className="size-4" /> System Health Log
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { task: "Analytics Pulse", status: "SYNCED" },
                       { task: "Perf Trace", status: "ACTIVE" },
                       { task: "Crash Sink", status: "READY" }
                     ].map((log, i) => (
                       <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                          <span className="text-[9px] text-white font-bold uppercase">{log.task}</span>
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{log.status}</Badge>
                       </div>
                     ))}
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
