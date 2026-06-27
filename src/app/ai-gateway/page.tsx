
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  ShieldCheck, 
  Menu, 
  Activity, 
  Cpu, 
  RefreshCcw, 
  Lock, 
  Infinity, 
  Search,
  ArrowRightLeft,
  Atom,
  Flame,
  PieChart,
  History,
  FileSearch,
  CheckCircle2,
  HardDrive,
  BarChart3,
  TrendingUp,
  Target,
  FileText,
  Link2,
  ExternalLink,
  ChevronRight,
  Database,
  CloudUpload,
  FolderOpen,
  Send,
  Loader2,
  Terminal,
  MousePointer2,
  ArrowUpRight,
  LayoutGrid,
  Monitor,
  Code2,
  Sparkles,
  Layers,
  Network,
  Radio,
  Fingerprint
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processGatewayRequest, AiGatewayOutput } from "@/ai/flows/ai-gateway-flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts"

const MOCK_USAGE_DATA = [
  { time: "00:00", requests: 120, latency: 25 },
  { time: "04:00", requests: 80, latency: 22 },
  { time: "08:00", requests: 350, latency: 45 },
  { time: "12:00", requests: 540, latency: 38 },
  { time: "16:00", requests: 420, latency: 32 },
  { time: "20:00", requests: 210, latency: 28 },
]

export default function AiGatewayPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<AiGatewayOutput | null>(null)
  
  const [metrics, setMetrics] = useState({
    recovered: 42,
    reliability: 99.9,
    spend: 12.45,
    requests: 15420,
    tokens: 845000
  })

  async function handleGatewayPulse() {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await processGatewayRequest({
        prompt: query,
        targetModel: "gpt-5.5-imperial-node"
      })
      setResult(res)
      toast({ 
        title: "Zenith Gateway Pulse Verified", 
        description: "Cognitive payload successfully routed." 
      })
    } catch (e: any) {
      toast({ title: "Gateway Drift Detected", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20 overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Network className="size-3 mr-2" /> Project Zenith: AI Gateway
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Sparkles className="size-3 mr-2" /> One-Line Model Switching
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Zenith <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Infinite Intelligence, Single Entry." নূরনেক্সাস এখন শত শত মডেলকে একটি অটোনোমাস গেটওয়ের মাধ্যমে সিঙ্ক্রোনাইজ করছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Activity className="size-12 text-purple-500" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Gateway Health</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500">OPTIMAL</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-10">
               
               {/* Quick Analytics Matrix */}
               <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "Recovered", val: metrics.recovered, icon: RefreshCcw, color: "text-emerald-500" },
                    { label: "Reliability", val: `${metrics.reliability}%`, icon: ShieldCheck, color: "text-primary" },
                    { label: "Spend", val: `$${metrics.spend}`, icon: DollarSign, color: "text-amber-500" },
                    { label: "Requests", val: metrics.requests.toLocaleString(), icon: Zap, color: "text-purple-500" },
                    { label: "Total Tokens", val: "845k", icon: Atom, color: "text-emerald-400" }
                  ].map((m, i) => (
                    <Card key={i} className="glass-card bg-black/40 border-white/5">
                      <CardContent className="p-5 space-y-1 text-center">
                         <div className="flex justify-center mb-2 opacity-40">
                            <m.icon className={`size-4 ${m.color}`} />
                         </div>
                         <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{m.label}</p>
                         <p className="text-lg font-headline font-bold text-white">{m.val}</p>
                      </CardContent>
                    </Card>
                  ))}
               </section>

               {/* Usage Area Chart */}
               <section className="space-y-6">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <BarChart3 className="size-4" /> Global Usage Pulse
                    </h3>
                  </div>
                  <Card className="glass-card bg-black/40 border-white/5 p-6 h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_USAGE_DATA}>
                           <defs>
                              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                           <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                           <YAxis stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                           <Tooltip contentStyle={{ backgroundColor: '#030708', border: '1px solid #ffffff10', fontSize: '10px' }} />
                           <Area type="monotone" dataKey="requests" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={2} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </Card>
               </section>

               {/* Playground Interaction */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-purple-500 flex items-center gap-2">
                     <Terminal className="size-4" /> Gateway Playground
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white">Imperial Prompt</CardTitle>
                           <CardDescription>Targeting openai/gpt-5.5 (Simulated Node)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <textarea 
                             value={query}
                             onChange={e => setQuery(e.target.value)}
                             placeholder="Why is the sky blue? Or ask about Quantum Computing..."
                             className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-purple-200 outline-none focus:ring-1 focus:ring-purple-500"
                           />
                           <Button 
                             onClick={handleGatewayPulse}
                             disabled={loading}
                             className="w-full bg-purple-500 text-white font-bold uppercase tracking-widest h-12 glow-primary gap-3"
                           >
                              {loading ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                              Initiate Gateway Pulse
                           </Button>
                        </CardContent>
                     </Card>

                     <Card className={`glass-card border-t-4 transition-all duration-500 ${result ? 'border-t-emerald-500 bg-emerald-500/5' : 'border-t-purple-500 opacity-40'}`}>
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                              <Cpu className="size-4" /> Intelligent Output
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           {result ? (
                             <div className="space-y-6 animate-in fade-in zoom-in-95">
                                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                                   <p className="text-xs text-white leading-relaxed italic">"{result.response}"</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="p-3 bg-white/5 rounded border border-white/5">
                                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Latency</p>
                                      <p className="text-sm font-headline font-bold text-emerald-500">{result.latencyMs}ms</p>
                                   </div>
                                   <div className="p-3 bg-white/5 rounded border border-white/5">
                                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Tokens</p>
                                      <p className="text-sm font-headline font-bold text-primary">{result.tokenCount}</p>
                                   </div>
                                </div>
                             </div>
                           ) : (
                             <div className="h-48 flex flex-col items-center justify-center gap-4 text-center">
                                <Radio className="size-12 text-purple-500 animate-pulse opacity-40" />
                                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Awaiting Gateway Dispatch</p>
                             </div>
                           )}
                        </CardContent>
                     </Card>
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <Lock className="size-4" /> Security Protocol v4.0
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "All gateway pulses are signed with HMAC_V4_GW. App Check (reCAPTCHA Enterprise) is enforced for all authorized domains."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold tracking-widest">APP_CHECK: ACTIVE</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <Code2 className="size-4" /> Gateway Templates
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                        { name: "Cognitive Synthesis", id: "T-01" },
                        { name: "Data Lake Auditor", id: "T-02" },
                        { name: "Trade Protocol Arbiter", id: "T-03" }
                     ].map((t, i) => (
                       <div key={i} className="flex justify-between items-center p-2.5 bg-black/40 rounded border border-white/5 group hover:border-primary/40 transition-all">
                          <span className="text-[9px] text-white font-bold uppercase">{t.name}</span>
                          <Badge className="bg-primary/20 text-primary border-none text-[7px]">{t.id}</Badge>
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Fingerprint className="size-16 text-primary" />
                  </div>
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> System Logs
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Last Gateway audit: <strong>28ms ago</strong>. 100% reliability maintained across the South Asia cluster.
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
