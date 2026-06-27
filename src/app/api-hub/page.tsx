"use client"

import { useState, useRef, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Code2, Globe, Terminal, Zap, Send, Loader2, ShieldCheck, 
  Menu, MessageSquare, Cpu, BookOpen, Layers, ReceiptText,
  ShieldHalf,
  Unplug,
  FlaskConical,
  Key,
  Webhook,
  Activity,
  Rocket,
  LayoutGrid,
  Award,
  Search,
  RefreshCcw,
  ArrowRightLeft,
  Link2,
  Lock,
  Network,
  Infinity,
  Fingerprint,
  Clock,
  ChevronRight,
  FileCode,
  Sparkles,
  FileCheck,
  CheckCircle2,
  ShieldPlus,
  LockKeyhole,
  Braces,
  Play
} from "lucide-react"
import { noraIntegrationAssistant } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ApiHubPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [isSandbox, setIsSandbox] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  // Mock Pulse States
  const [mockAmount, setMockAmount] = useState("5000")
  const [pulsing, setPulsing] = useState(false)
  const [simulatorLogs, setSimulatorLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] INITIATING SANDBOX_ENVIRONMENT...`,
    `[${new Date().toLocaleTimeString()}] WAITING FOR HANDSHAKE...`
  ])

  const generateKey = () => {
    const key = `${isSandbox ? 'SANDBOX' : 'ZENITH'}_SK_${Math.random().toString(16).substring(2, 32).toUpperCase()}`
    setApiKey(key)
    toast({ title: isSandbox ? "Sandbox Access Key Generated" : "Enterprise Bridge Secret Generated", description: "Store this securely in your vault." })
  }

  const executeMockPulse = async () => {
    setPulsing(true)
    const timestamp = () => new Date().toLocaleTimeString()
    
    setSimulatorLogs(prev => [...prev, `[${timestamp()}] STARTING MOCK_PULSE: $${mockAmount}`])
    
    await new Promise(r => setTimeout(r, 800))
    setSimulatorLogs(prev => [...prev, `[${timestamp()}] VERIFYING HMAC_V4_SANDBOX_SIG...`])
    
    await new Promise(r => setTimeout(r, 600))
    setSimulatorLogs(prev => [...prev, `[${timestamp()}] GATEWAY_RESPONSE: 200_OK`])
    
    await new Promise(r => setTimeout(r, 400))
    const txId = `SB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    setSimulatorLogs(prev => [...prev, `[${timestamp()}] MOCK_TRANSACTION_APPROVED (ID: ${txId})`])
    
    setPulsing(false)
    toast({
      title: "Mock Pulse Successful",
      description: `Transaction ${txId} approved in sandbox environment.`,
      className: "border-amber-500/50 bg-amber-500/5"
    })
  }

  async function askNora() {
    if (!query.trim()) return
    const userMsg = query
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setQuery("")
    setLoading(true)

    try {
      const result = await noraIntegrationAssistant({
        query: userMsg,
        context: "DISCOVERY_PROTOCOL",
        history: messages.map(m => ({ role: m.role, text: m.text }))
      })
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: result.answer
      }])
    } catch (e: any) {
      toast({ title: "AI Offline", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
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
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Infinity className="size-3 mr-2" /> Mission 500: Project Zenith
                 </Badge>
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <FlaskConical className="size-3 mr-2" /> Sandbox Active
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Discovery <span className="text-purple-500">Hub.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Digital Passport to the 100-Node Empire." এন্টারপ্রাইজ পার্টনারদের জন্য নূরনেক্সাস এখন একটি স্বায়ত্তশাসিত অনবোর্ডিং এবং স্যান্ডবক্স গেটওয়ে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-3 glass-card rounded-xl border border-amber-500/20 flex flex-col items-center">
                  <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Testing Mode</p>
                  <div className="flex items-center gap-2">
                     <span className={`text-[10px] font-bold ${!isSandbox ? 'text-white' : 'text-muted-foreground'}`}>LIVE</span>
                     <div 
                       onClick={() => setIsSandbox(!isSandbox)}
                       className="w-10 h-5 bg-white/5 rounded-full p-1 cursor-pointer relative border border-white/10"
                     >
                        <div className={`absolute top-1 size-3 rounded-full transition-all duration-300 ${isSandbox ? 'right-1 bg-amber-500' : 'left-1 bg-white/40'}`} />
                     </div>
                     <span className={`text-[10px] font-bold ${isSandbox ? 'text-amber-500' : 'text-muted-foreground'}`}>SANDBOX</span>
                  </div>
               </div>
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Grid Torque</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase flex items-center gap-2 justify-center">
                    <Rocket className="size-5" /> 94%
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              <Tabs defaultValue="onboarding-api" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="onboarding-api" className="gap-2"><LockKeyhole className="size-4" /> Onboarding API</TabsTrigger>
                  <TabsTrigger value="sandbox" className="gap-2"><FlaskConical className="size-4" /> Playground</TabsTrigger>
                  <TabsTrigger value="quickstart" className="gap-2"><Zap className="size-4" /> Quick Start</TabsTrigger>
                  <TabsTrigger value="bridge" className="gap-2"><Network className="size-4" /> Neural Bridge</TabsTrigger>
                </TabsList>

                <TabsContent value="onboarding-api" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                   <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-purple-500 flex items-center gap-2">
                            <Fingerprint className="size-4" /> Sovereign Onboarding API (v1.0)
                         </CardTitle>
                         <CardDescription>The Digital Passport for autonomous mesh connection.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <p className="text-xs text-muted-foreground italic leading-relaxed">
                            "Partner applications can now connect to the NoorNexus grid programmatically. No human intervention required for Zenith L1 access."
                         </p>
                         <div className="p-5 bg-black rounded-xl border border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                               <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 font-mono">POST /v1/auth/handshake</Badge>
                               <span className="text-[9px] text-muted-foreground font-mono">Content-Type: application/json</span>
                            </div>
                            <pre className="text-[11px] text-purple-400 font-mono overflow-x-auto">
{`{
  "appId": "YOUR_${isSandbox ? 'SANDBOX' : 'ZENITH'}_KEY",
  "intent": "SOVEREIGN_MESH_CONNECTION",
  "securityTier": "L4",
  "signature": "HMAC_V4_ENCRYPTED_AUTH"
}`}
                            </pre>
                         </div>
                         <div className="flex items-center gap-4 pt-4">
                            <Button size="sm" onClick={generateKey} className="bg-purple-500 text-white font-bold uppercase text-[10px] gap-2">
                               <Braces className="size-3" /> Get API Key
                            </Button>
                            {apiKey && (
                              <code className="text-[10px] text-primary font-mono">{apiKey.substring(0, 16)}...</code>
                            )}
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="sandbox" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-amber-500 flex items-center gap-2">
                            <FlaskConical className="size-4" /> Developer Playground
                         </CardTitle>
                         <CardDescription>Test your integration in a zero-risk, virtualized NoorNexus environment.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Mock Transaction Tool</h4>
                               <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-bold text-muted-foreground uppercase">Mock Amount (USD)</label>
                                     <input 
                                        value={mockAmount} 
                                        onChange={e => setMockAmount(e.target.value)}
                                        className="w-full bg-background/50 border border-white/10 rounded h-10 px-3 text-xs font-mono text-white outline-none focus:ring-1 focus:ring-amber-500" 
                                      />
                                  </div>
                                  <Button 
                                    onClick={executeMockPulse}
                                    disabled={pulsing}
                                    className="w-full bg-amber-500 text-black font-bold uppercase text-[10px] h-10 gap-2 glow-emerald transition-all"
                                  >
                                     {pulsing ? <Loader2 className="size-3 animate-spin" /> : <Play className="size-3" />}
                                     Execute Mock Pulse
                                  </Button>
                               </div>
                            </div>
                            <div className="space-y-4">
                               <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Simulator Logs</h4>
                               <div className="p-4 bg-black rounded-xl border border-white/5 h-[200px] overflow-auto font-mono text-[9px] text-emerald-400 space-y-1">
                                  {simulatorLogs.map((log, i) => (
                                    <p key={i}>{log}</p>
                                  ))}
                                  {pulsing && <p className="animate-pulse">_</p>}
                               </div>
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="quickstart" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                            <Rocket className="size-4" /> 3-Step Integration Guide
                         </CardTitle>
                         <CardDescription>Inject NoorNexus Core into any enterprise application in less than 3 seconds.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              { step: "01", title: "Generate Key", desc: "Obtain your Zenith L1 access key from the 'API' tab." },
                              { step: "02", title: "Inject Snippet", desc: "Paste the 3-line code block into your app's <head>." },
                              { step: "03", title: "Verify Pulse", desc: "Nora-03 will automatically verify the connection." }
                            ].map((s, i) => (
                              <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2 relative overflow-hidden">
                                 <p className="text-4xl font-headline font-bold text-emerald-500/10 absolute -right-2 -bottom-2">{s.step}</p>
                                 <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{s.title}</p>
                                 <p className="text-[11px] text-muted-foreground italic leading-relaxed">"{s.desc}"</p>
                              </div>
                            ))}
                         </div>

                         <div className="p-6 bg-black rounded-xl border border-emerald-500/20 relative group">
                            <div className="absolute top-0 right-0 p-4">
                               <FileCode className="size-5 text-emerald-500/30" />
                            </div>
                            <h4 className="text-[10px] font-bold uppercase text-white mb-4">Sovereign Snippet (v3.5)</h4>
                            <pre className="text-[11px] text-emerald-400 font-mono overflow-x-auto leading-relaxed">
{`<script src="https://cdn.noornexus.sovereign/v1/core.js" async></script>
<script>
  sheikh.init({ appId: 'YOUR_${isSandbox ? 'SANDBOX' : 'ZENITH'}_KEY', speed: 'ZENITH_TURBO' });
</script>`}
                            </pre>
                            <Button 
                              size="sm" 
                              onClick={() => {
                                navigator.clipboard.writeText(`<script src="https://cdn.noornexus.sovereign/v1/core.js" async></script>\n<script>\n  sheikh.init({ appId: 'YOUR_ZENITH_KEY', speed: 'ZENITH_TURBO' });\n</script>`)
                                toast({ title: "Snippet Copied" })
                              }}
                              className="mt-6 bg-emerald-500 text-black font-bold uppercase text-[10px] h-9 glow-emerald"
                            >
                               Copy Code Block
                            </Button>
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <Award className="size-4" /> Zenith Licensing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Enterprise scaling is the bridge to global dominance. We offer 99.9% PaaS availability to partners who align with our Manifesto."
                   </p>
                   <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                         <span className="uppercase text-muted-foreground">License Tier</span>
                         <span className="text-white font-bold">ZENITH_L1</span>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono">
                         <span className="uppercase text-muted-foreground">Grid Torque</span>
                         <span className="text-emerald-500 font-bold">94%</span>
                      </div>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-purple-500 h-[450px] flex flex-col">
                <CardHeader className="shrink-0">
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-purple-500 flex items-center gap-2">
                    <Cpu className="size-4" /> Discovery Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[90%] p-3 rounded-xl text-xs font-mono leading-relaxed ${msg.role === 'user' ? 'bg-primary/20 border border-primary/20 text-primary-foreground' : 'bg-white/5 border border-white/5 text-muted-foreground'}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      <div ref={scrollRef} />
                    </div>
                  </ScrollArea>

                  <div className="shrink-0 space-y-4 pt-4 border-t border-white/5">
                    <div className="relative">
                       <input 
                         placeholder="Inquire about PaaS scaling..." 
                         value={query}
                         onChange={e => setQuery(e.target.value)}
                         onKeyDown={e => e.key === 'Enter' && askNora()}
                         className="w-full bg-background/50 border border-white/10 text-xs h-12 pr-12 pl-4 rounded-md outline-none focus:ring-1 focus:ring-primary"
                         disabled={loading}
                       />
                       <div 
                         onClick={askNora} 
                         className={`absolute right-1 top-1 text-primary size-10 flex items-center justify-center cursor-pointer ${loading ? 'opacity-50' : ''}`}
                       >
                         {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                       </div>
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
