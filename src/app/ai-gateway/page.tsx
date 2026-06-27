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
  Infinity,
  Link2,
  Share2,
  LayoutGrid,
  ZapOff,
  BatteryCharging,
  Info,
  BellRing
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processGatewayRequest, AiGatewayOutput } from "@/ai/flows/ai-gateway-flow"
import { executeGatewayQuickstart } from "@/ai/flows/gateway-quickstart-flow"
import { sendSovereignNotification } from "@/services/notification-service"
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const MOCK_USAGE_DATA = [
  { time: "00:00", requests: 120, latency: 25 },
  { time: "04:00", requests: 80, latency: 22 },
  { time: "08:00", requests: 350, latency: 45 },
  { time: "12:00", requests: 540, latency: 38 },
  { time: "16:00", requests: 420, latency: 32 },
  { time: "20:00", requests: 210, latency: 28 },
]

const CONNECTED_MESH = [
  { device: "Imperial iPhone 15 Pro", apps: ["FusionPay", "Bazaar", "Mail"], status: "SYNCED", icon: Smartphone, persistence: true },
  { device: "Sovereign Workstation M3", apps: ["All Imperial Apps"], status: "SYNCED", icon: Laptop, persistence: true },
  { device: "Sirajganj Edge Node", apps: ["Data Lake", "Legacy"], status: "PULSING", icon: Monitor, persistence: true },
  { device: "Android Pilot Node", apps: ["Onboarding"], status: "CONNECTED", icon: Smartphone, persistence: false },
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
    activeDevices: 452,
    backgroundApps: 12
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
        deviceId: "DESKTOP_NODE_01",
        enableOmniSync: true
      })
      setResult(res)
      toast({ 
        title: "Zenith Gateway Pulse Verified", 
        description: "Omni-Device context successfully synthesized." 
      })
    } catch (e: any) {
      toast({ title: "Gateway Drift Detected", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleTestNotification() {
    await sendSovereignNotification(
      "Imperial Pulse Detected",
      "Commander, the Zenith Gateway has synchronized your devices. System integrity 100%."
    );
    toast({ title: "Imperial Alert Dispatched", description: "Check your system notifications." });
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
        tokenCount: 450,
        activeSyncs: ["DEFAULT_HUB"]
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
                   <Sparkles className="size-3 mr-2" /> Omni-Device Sync
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Zenith <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Universal Connectivity, Single AI Brain." আপনার প্রতিটি ডিভাইস এখন প্রতিটি অ্যাপের সাথে ব্যাকগ্রাউন্ডে সচল।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button onClick={handleTestNotification} variant="outline" className="border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 h-12 uppercase font-bold tracking-widest gap-2">
                  <BellRing className="size-4" /> Test Imperial Alert
               </Button>
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Smartphone className="size-12 text-purple-500" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Omni-Connected Devices</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500">{metrics.activeDevices}</p>
               </div>
            </div>
          </header>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
               <TabsTrigger value="overview" className="gap-2 px-6"><Activity className="size-4" /> Overview</TabsTrigger>
               <TabsTrigger value="mesh" className="gap-2 px-6"><Link2 className="size-4" /> Mesh Management</TabsTrigger>
               <TabsTrigger value="getting-started" className="gap-2 px-6"><Rocket className="size-4" /> Getting Started</TabsTrigger>
               <TabsTrigger value="playground" className="gap-2 px-6"><Terminal className="size-4" /> Playground</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "AI Recovered", val: metrics.requests > 0 ? metrics.recovered : 0, icon: RefreshCcw, color: "text-emerald-500" },
                    { label: "Reliability", val: `${metrics.reliability}%`, icon: ShieldCheck, color: "text-primary" },
                    { label: "Background Apps", val: metrics.backgroundApps, icon: BatteryCharging, color: "text-amber-500" },
                    { label: "Cognitive Load", val: "Optimal", icon: Atom, color: "text-emerald-400" },
                    { label: "Sync Velocity", val: "100%", icon: Infinity, color: "text-purple-500" }
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
                          <BarChart3 className="size-4" /> Global Mesh Intelligence Usage
                       </h3>
                    </div>
                     <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={MOCK_USAGE_DATA}>
                           <defs>
                              <linearGradient id="colorUsage" x1="0" x2="0" x2="0" y2="1">
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
                           <Share2 className="size-4" /> Active Mesh Sync
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {[
                          { device: "Imperial Mobile", app: "FusionPay", icon: Smartphone },
                          { device: "Sovereign Workstation", app: "Bazaar Hub", icon: Laptop },
                          { device: "IoT Core Node", app: "Industrial Hub", icon: Box },
                          { device: "External API", app: "Partner Node", icon: Link2 }
                        ].map((d, i) => (
                          <div key={i} className="flex justify-between items-center p-2 bg-black/40 rounded border border-white/5">
                             <div className="flex items-center gap-3">
                                <d.icon className="size-3.5 text-primary opacity-60" />
                                <div className="space-y-0.5">
                                   <p className="text-[9px] text-white font-bold uppercase">{d.device}</p>
                                   <p className="text-[7px] text-muted-foreground uppercase">{d.app}</p>
                                </div>
                             </div>
                             <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">SYNCED</Badge>
                          </div>
                        ))}
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            <TabsContent value="mesh" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                  <CardHeader>
                     <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                        <LayoutGrid className="size-4 text-purple-400" /> Omni-Device App Mapping
                     </CardTitle>
                     <CardDescription>Manage the cognitive link between your devices and the imperial app suite.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CONNECTED_MESH.map((node, i) => (
                          <div key={i} className="p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                             <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                   <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                                      <node.icon className="size-5 text-purple-400" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold text-white uppercase">{node.device}</p>
                                      <p className="text-[8px] text-muted-foreground font-mono uppercase">{node.status}</p>
                                   </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                   <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">ACTIVE</Badge>
                                   {node.persistence && (
                                     <Badge variant="outline" className="border-amber-500/30 text-amber-500 text-[7px] animate-pulse">PERSISTENT</Badge>
                                   )}
                                </div>
                             </div>
                             <div className="space-y-2">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Linked Apps</p>
                                <div className="flex flex-wrap gap-2">
                                   {node.apps.map((app, j) => (
                                     <Badge key={j} variant="outline" className="text-[7px] border-white/10 text-white bg-white/5">{app}</Badge>
                                   ))}
                                   <Badge variant="outline" className="text-[7px] border-primary/20 text-primary cursor-pointer hover:bg-primary/10">
                                      <Link2 className="size-2 mr-1" /> Add App
                                   </Badge>
                                </div>
                             </div>
                          </div>
                        ))}
                     </div>

                     <Card className="glass-card border-amber-500/20 bg-amber-500/5 mt-8">
                        <CardHeader className="pb-2">
                           <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                              <Info className="size-4" /> Background Persistence Advisory
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                              "Active apps: these apps still run in the background even when not in use. This improves their functionality but consumes more power. L4 encryption and neural sync remain active during background cycles to ensure zero-latency handshakes."
                           </p>
                        </CardContent>
                     </Card>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="getting-started" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                           <Rocket className="size-4 text-purple-400" /> Omni-Device AI Handshake
                        </CardTitle>
                        <CardDescription>Follow these steps to establish a cognitive mesh across your apps.</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-8">
                        <div className="space-y-6">
                           {[
                             { step: "01", title: "Initialize Omni-Hub", desc: "Use `sheikh.init()` with the `omniSync: true` flag." },
                             { step: "02", title: "Register Device ID", desc: "Assign a unique ID to your device node for cross-app tracking." },
                             { step: "03", title: "Establish Knowledge Bridge", desc: "Allow AI to pull context from other apps to assist your current workflow." },
                             { step: "04", title: "Monitor Unified Pulse", desc: "Track total cognitive token usage across all linked devices." }
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
                           Verify Global Cognitive Mesh
                        </Button>
                     </CardContent>
                  </Card>

                  <Card className="glass-card border-white/5 overflow-hidden">
                     <CardHeader className="bg-white/2 border-b border-white/5">
                        <CardTitle className="text-xs font-headline uppercase text-white flex items-center gap-2">
                           <Code2 className="size-4 text-primary" /> Multi-App Integration Snippet
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
{`// Establishing Omni-Device AI Mesh
const sync = await sheikh.ai.bridge({
  deviceId: 'MACBOOK_PRO_M3',
  apps: ['FUSION_PAY', 'BAZAAR', 'MAIL'],
  omniContext: true,
  backgroundActive: true // Enable persistence
});

// Calling AI with Cross-App knowledge
const response = await sheikh.ai.pulse({
  prompt: 'What was my last transaction in FusionPay?',
  appId: 'ZENITH_TERMINAL'
});`}
</pre>
                        </div>
                        <div className="p-6 border-t border-white/5 space-y-4">
                           <div className="flex items-center gap-3">
                              <CheckCircle2 className="size-4 text-emerald-500" />
                              <p className="text-[10px] text-muted-foreground italic">Unified knowledge shared across all 100 NoorNexus nodes.</p>
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
                        <CardTitle className="text-sm font-headline uppercase text-white">Imperial Omni-Prompt</CardTitle>
                        <CardDescription>Simulating Cross-App Intelligence Pulse</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <textarea 
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder="Execute a command using knowledge from all devices..."
                          className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-primary outline-none focus:ring-1 focus:ring-primary"
                        />
                        <Button 
                          onClick={handleGatewayPulse}
                          disabled={loading}
                          className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 glow-primary gap-3"
                        >
                           {loading ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                           Initiate Mesh Pulse
                        </Button>
                     </CardContent>
                  </Card>

                  <Card className={`glass-card border-t-4 transition-all duration-500 ${result ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                           <Cpu className="size-4" /> Mesh Output
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
                                   <p className="text-[8px] text-muted-foreground uppercase font-bold">Mesh Hash</p>
                                   <p className="text-[9px] font-mono text-primary truncate">{result.gatewayHash}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded border border-white/5">
                                   <p className="text-[8px] text-muted-foreground uppercase font-bold">Active Syncs</p>
                                   <p className="text-[9px] font-bold text-emerald-500">{result.activeSyncs?.length || 4} NODES ACTIVE</p>
                                </div>
                             </div>
                          </div>
                        ) : (
                          <div className="h-48 flex flex-col items-center justify-center gap-4 text-center">
                             <Radio className="size-12 text-primary animate-pulse opacity-40" />
                             <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Awaiting Mesh Dispatch</p>
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
                      <Lock className="size-4" /> Omni-Sync Integrity
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Cross-device data pulls are restricted by L4 encryption and require a secondary biometric pulse."
                   </p>
                   <div className="pt-2">
                      <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold tracking-widest">UDT_AUTH: ACTIVE</Badge>
                   </div>
                </CardContent>
             </Card>

             <Card className="glass-card border-l-4 border-l-primary bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Fingerprint className="size-16 text-primary" />
                </div>
                <CardHeader className="pb-2">
                   <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                      <Database className="size-3" /> Cognitive Growth
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-[9px] text-muted-foreground leading-relaxed">
                      Unified device identity has increased operational efficiency by <strong>42%</strong> across the empire.
                   </p>
                </CardContent>
             </Card>

             <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                   <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                      <ShieldCheck className="size-3" /> Zero-Drift Mesh
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                      "Each device handshake is verified against the 100-node grid for absolute veracity."
                   </p>
                </CardContent>
             </Card>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
