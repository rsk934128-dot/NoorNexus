
"use client"

import { useState } from "react"
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
  BookOpen
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
    tokens: 845000
  })

  async function handleGatewayPulse() {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await processGatewayRequest({
        prompt: query,
        targetModel: "openai/gpt-5.5"
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
                   <Sparkles className="size-3 mr-2" /> Quick Start Ready
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Zenith <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Infinite Intelligence, Single Entry." Built on AI SDK, Zenith lets you switch between hundreds of models with one line of code.
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

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
               <TabsTrigger value="overview" className="gap-2 px-6"><Activity className="size-4" /> Overview</TabsTrigger>
               <TabsTrigger value="getting-started" className="gap-2 px-6"><Rocket className="size-4" /> Getting Started</TabsTrigger>
               <TabsTrigger value="playground" className="gap-2 px-6"><Terminal className="size-4" /> Playground</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "Recovered", val: metrics.requests > 0 ? metrics.recovered : 0, icon: RefreshCcw, color: "text-emerald-500" },
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
            </TabsContent>

            <TabsContent value="getting-started" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-white flex items-center gap-2">
                           <Rocket className="size-4 text-purple-400" /> Getting Started Guide
                        </CardTitle>
                        <CardDescription>Follow these steps to set up Zenith AI Gateway in your environment.</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-8">
                        <div className="space-y-6">
                           {[
                             { step: "01", title: "Install Vercel CLI", desc: "Run `npm i -g vercel` in your terminal to manage deployments and environment variables." },
                             { step: "02", title: "Pull Environment", desc: "Run `vercel link` then `vercel env pull .env.local` to sync AI Gateway OIDC tokens." },
                             { step: "03", title: "Install AI SDK", desc: "Run `npm install ai` to access streaming and multi-model switching capabilities." },
                             { step: "04", title: "Verify Pulse", desc: "Use the terminal example to verify model 'openai/gpt-5.5' connectivity." }
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
                           Verify Quickstart Pulse
                        </Button>
                     </CardContent>
                  </Card>

                  <Card className="glass-card border-white/5 overflow-hidden">
                     <CardHeader className="bg-white/2 border-b border-white/5">
                        <CardTitle className="text-xs font-headline uppercase text-white flex items-center gap-2">
                           <Code2 className="size-4 text-primary" /> Integration Example (index.mjs)
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
{`import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

const result = streamText({
  model: openai('gpt-4o'), // Mapping for local test
  prompt: 'Explain quantum computing in simple terms.',
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}`}
</pre>
                        </div>
                        <div className="p-6 border-t border-white/5 space-y-4">
                           <div className="flex items-center gap-3">
                              <CheckCircle2 className="size-4 text-emerald-500" />
                              <p className="text-[10px] text-muted-foreground italic">No AI Gateway API key needed with VERCEL_OIDC_TOKEN.</p>
                           </div>
                           <Link href="https://sdk.vercel.ai/docs" target="_blank" className="block">
                              <Button variant="outline" className="w-full border-white/10 text-[9px] uppercase font-bold h-10 gap-2">
                                 Read AI SDK Documentation <BookOpen className="size-3" />
                              </Button>
                           </Link>
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
                        <CardDescription>Targeting openai/gpt-5.5 (Gateway Proxy)</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <textarea 
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder="Execute a command through the gateway..."
                          className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-primary outline-none focus:ring-1 focus:ring-primary"
                        />
                        <Button 
                          onClick={handleGatewayPulse}
                          disabled={loading}
                          className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 glow-primary gap-3"
                        >
                           {loading ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                           Initiate Gateway Pulse
                        </Button>
                     </CardContent>
                  </Card>

                  <Card className={`glass-card border-t-4 transition-all duration-500 ${result ? 'border-t-emerald-500 bg-emerald-500/5' : 'border-t-primary opacity-40'}`}>
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
                             <Radio className="size-12 text-primary animate-pulse opacity-40" />
                             <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Awaiting Gateway Dispatch</p>
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
                      <Lock className="size-4" /> Security Protocol v4.0
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "All gateway pulses are signed with HMAC_V4_GW. OIDC tokens are provisioned automatically for authorized Vercel domains."
                   </p>
                   <div className="pt-2">
                      <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold tracking-widest">OIDC_AUTH: ACTIVE</Badge>
                   </div>
                </CardContent>
             </Card>

             <Card className="glass-card border-l-4 border-l-primary bg-primary/5 relative overflow-hidden">
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

             <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                   <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                      <ShieldPlus className="size-3" /> Rate Limiting
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex justify-between text-[9px] font-mono">
                      <span className="uppercase text-muted-foreground">Global Quota</span>
                      <span className="text-white">84% Remaining</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '84%' }} />
                   </div>
                </CardContent>
             </Card>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}

function DollarSign(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function ShieldPlus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <line x1="12" x2="12" y1="8" y2="16" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  )
}
