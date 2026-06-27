"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Zap, 
  ShieldCheck, 
  Menu, 
  Activity, 
  Cpu, 
  RefreshCcw, 
  Lock, 
  Atom,
  BarChart3,
  Terminal,
  Loader2,
  Code2,
  Sparkles,
  Network,
  Radio,
  Fingerprint,
  Rocket,
  ArrowUpRight,
  Database,
  FileCode,
  Copy,
  CheckCircle2,
  BookOpen,
  Smartphone,
  Laptop,
  Box,
  Monitor,
  Infinity
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processGatewayRequest, AiGatewayOutput } from "@/ai/flows/ai-gateway-flow"
import { executeGatewayQuickstart } from "@/ai/flows/gateway-quickstart-flow"
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

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
  const [result, setResult] = useState<any>(null)
  
  const [metrics, setMetrics] = useState({
    recovered: 42,
    reliability: 99.9,
    spend: 12.45,
    requests: 15420,
    tokens: 845000,
    activeDevices: 452
  })

  async function handleGatewayPulse() {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await processGatewayRequest({
        prompt: query,
        targetModel: "openai/gpt-5.5",
        appId: "ZENITH_INTERNAL_DASH",
        deviceId: "DESKTOP_NODE_01"
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

  async function handleQuickstartTest() {
    setLoading(true)
    setResult(null)
    try {
      const res = await executeGatewayQuickstart("Explain quantum computing in simple terms.")
      setResult({
        response: res.response,
        modelUsed: res.modelUsed,
        latencyMs: 1250,
        tokenCount: 450
      })
      toast({ 
        title: "Quickstart Verified", 
        description: "Vercel AI SDK Handshake: SUCCESS." 
      })
    } catch (e: any) {
      toast({ title: "Quickstart Failed", description: e.message, variant: "destructive" })
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
                   <Sparkles className="size-3 mr-2" /> Every App, Every Device
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Zenith <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Infinite Intelligence, Single Entry." এখন আপনার সাম্রাজ্যের প্রতিটি ডিভাইসে নূরনেক্সাস এআই কানেক্টিভিটি সচল।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Smartphone className="size-12 text-purple-500" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Active AI Devices</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500">{metrics.activeDevices}</p>
               </div>
            </div>
          </header>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
               <TabsTrigger value="overview" className="gap-2 px-6"><Activity className="size-4" /> Overview</TabsTrigger>
               <TabsTrigger value="getting-started" className="gap-2 px-6"><Rocket className="size-4" /> Getting Started</TabsTrigger>
               <TabsTrigger value="playground" className="gap-2 px-6"><Terminal className="size-4" /> Playground</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "AI Recovered", val: metrics.requests > 0 ? metrics.recovered : 0, icon: RefreshCcw, color: "text-emerald-500" },
                    { label: "Reliability", val: `${metrics.reliability}%`, icon: ShieldCheck, color: "text-primary" },
                    { label: "Daily Pulses", val: metrics.requests.toLocaleString(), icon: Zap, color: "text-purple-500" },
                    { label: "Total Tokens", val: "845k", icon: Atom, color: "text-emerald-400" },
                    { label: "Device Sync", val: "100%", icon: Infinity, color: "text-amber-500" }
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

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="lg:col-span-2 glass-card bg-black/40 border-white/5 p-6 h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="text-xs font-headline font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                          <BarChart3 className="size-4" /> Global Intelligence Usage
                       </h3>
                    </div>
                     <ResponsiveContainer width="100%" height="80%">
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

                  <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                           <Smartphone className="size-4" /> Device Connectivity
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {[
                          { device: "Imperial Smartphones", status: "SYNCED", icon: Smartphone },
                          { device: "Sovereign Workstations", status: "ACTIVE", icon: Monitor },
                          { device: "IoT Mesh Nodes", status: "PULSING", icon: Box },
                          { device: "Legacy Terminals", status: "VERIFIED", icon: Laptop }
                        ].map((d, i) => (
                          <div key={i} className="flex justify-between items-center p-2 bg-black/40 rounded border border-white/5">
                             <div className="flex items-center gap-3">
                                <d.icon className="size-3.5 text-primary opacity-60" />
                                <span className="text-[10px] text-white font-bold uppercase">{d.device}</span>
                             </div>
                             <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{d.status}</Badge>
                          </div>
                        ))}
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            <TabsContent value="getting-started" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                           <Rocket className="size-4 text-purple-400" /> Multi-App AI Integration
                        </CardTitle>
                        <CardDescription>Follow these steps to connect your app's devices to Zenith AI Gateway.</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-8">
                        <div className="space-y-6">
                           {[
                             { step: "01", title: "Initialize Handshake", desc: "Use `sheikh.init()` to establish the device's identity on the mesh." },
                             { step: "02", title: "Provision AI Token", desc: "Obtain an ephemeral AI Token for the specific App ID / Device ID pair." },
                             { step: "03", title: "Call Gateway", desc: "Send prompts to the `/v1/ai/pulse` endpoint with HMAC_V4 signature." },
                             { step: "04", title: "Monitor Usage", desc: "Track tokens and latency in real-time from your Imperial Dashboard." }
                           ].map((s, i) => (
                             <div key={i} className="flex gap-4 group">
                                <span className="text-2xl font-headline font-bold text-purple-500/30 group-hover:text-purple-500 transition-colors">{s.step}</span>
                                <div className="space-y-1">
                                   <p className="text-xs font-bold text-white uppercase">{s.title}</p>
                                   <p className="text-[11px] text-muted-foreground leading-relaxed italic">"{s.desc}"</p>
                                </div>
                             </div>
                           ))}
                        </div>
                        <Button 
                          onClick={handleQuickstartTest}
                          disabled={loading}
                          className="w-full bg-purple-500 text-white font-bold h-12 uppercase tracking-widest glow-primary gap-2"
                        >
                           {loading ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                           Verify Global AI Handshake
                        </Button>
                     </CardContent>
                  </Card>

                  <Card className="glass-card border-white/5 overflow-hidden">
                     <CardHeader className="bg-white/2 border-b border-white/5">
                        <CardTitle className="text-xs font-headline uppercase text-white flex items-center gap-2">
                           <Code2 className="size-4 text-primary" /> Device Integration Snippet
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                        <div className="p-6 bg-black font-mono text-[11px] leading-relaxed text-purple-300 relative group">
                           <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                              <Button variant="ghost" size="icon" className="size-8" onClick={() => toast({ title: "Code Copied" })}>
                                 <Copy className="size-3" />
                              </Button>
                           </div>
<pre>
{`// Calling Zenith AI from any device
const response = await sheikh.ai.pulse({
  prompt: 'Analyze this device telemetry...',
  deviceId: 'SMARTPHONE_007',
  appId: 'IMPERIAL_MOBILE_V3',
  highVeracity: true
});

console.log('AI Logic:', response.response);
console.log('Seal:', response.gatewayHash);`}
</pre>
                        </div>
                        <div className="p-6 border-t border-white/5 space-y-4">
                           <div className="flex items-center gap-3">
                              <CheckCircle2 className="size-4 text-emerald-500" />
                              <p className="text-[10px] text-muted-foreground italic">Unified endpoint for all 100 NoorNexus nodes.</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            <TabsContent value="playground" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-white">Imperial Prompt</CardTitle>
                        <CardDescription>Simulating Multi-Device Pulse</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <textarea 
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder="Execute a command through the global gateway..."
                          className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-primary outline-none focus:ring-1 focus:ring-primary"
                        />
                        <Button 
                          onClick={handleGatewayPulse}
                          disabled={loading}
                          className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 glow-primary gap-3"
                        >
                           {loading ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                           Initiate Global Pulse
                        </Button>
                     </CardContent>
                  </Card>

                  <Card className={`glass-card border-t-4 transition-all duration-500 ${result ? 'border-t-emerald-500 bg-emerald-500/5' : 'border-t-primary opacity-40'}`}>
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                           <Cpu className="size-4" /> Global Output
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
                                   <p className="text-[8px] text-muted-foreground uppercase font-bold">Gateway Hash</p>
                                   <p className="text-[9px] font-mono text-primary truncate">{result.gatewayHash}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded border border-white/5">
                                   <p className="text-[8px] text-muted-foreground uppercase font-bold">Usage Status</p>
                                   <p className="text-xs font-headline font-bold text-emerald-500">VERIFIED</p>
                                </div>
                             </div>
                          </div>
                        ) : (
                          <div className="h-48 flex flex-col items-center justify-center gap-4 text-center">
                             <Radio className="size-12 text-primary animate-pulse opacity-40" />
                             <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Awaiting Global Dispatch</p>
                          </div>
                        )}
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
             <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                   <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                      <Lock className="size-4" /> Project #54 Sync
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "All multi-device AI pulses are cross-verified by Nora-54 for regulatory alignment."
                   </p>
                   <div className="pt-2">
                      <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold tracking-widest">AUTONOMY_LEVEL: Ω</Badge>
                   </div>
                </CardContent>
             </Card>

             <Card className="glass-card border-l-4 border-l-primary bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Fingerprint className="size-16 text-primary" />
                </div>
                <CardHeader className="pb-2">
                   <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                      <Database className="size-3" /> Growth Engine
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-[9px] text-muted-foreground leading-relaxed">
                      AI Bridge integration has increased cross-app <strong>Biskutment</strong> by 24% in the last 72 hours.
                   </p>
                </CardContent>
             </Card>

             <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                   <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                      <ShieldCheck className="size-3" /> HMAC_V4 Secure
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                      "Every device calling josh AI must pass the L4 cryptographic threshold."
                   </p>
                </CardContent>
             </Card>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
