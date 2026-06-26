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
  Braces
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
  const scrollRef = useRef<HTMLDivElement>(null)

  const generateKey = () => {
    const key = `ZENITH_SK_${Math.random().toString(16).substring(2, 32).toUpperCase()}`
    setApiKey(key)
    toast({ title: "Enterprise Bridge Secret Generated", description: "Store this securely in your vault." })
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
                   <Sparkles className="size-3 mr-2" /> 100-Node Cluster ARMED
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Discovery <span className="text-purple-500">Hub.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Digital Passport to the 100-Node Empire." এন্টারপ্রাইজ পার্টনারদের জন্য নূরনেক্সাস এখন একটি স্বায়ত্তশাসিত অনবোর্ডিং গেটওয়ে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px]">
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
                  <TabsTrigger value="quickstart" className="gap-2"><Zap className="size-4" /> Quick Start</TabsTrigger>
                  <TabsTrigger value="bridge" className="gap-2"><Network className="size-4" /> Neural Bridge</TabsTrigger>
                  <TabsTrigger value="certs" className="gap-2"><FileCheck className="size-4" /> Zenith Certs</TabsTrigger>
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
                            "Partner applications can now connection to the NoorNexus grid programmatically. No human intervention required for Zenith L1 access."
                         </p>
                         <div className="p-5 bg-black rounded-xl border border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                               <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 font-mono">POST /v1/auth/handshake</Badge>
                               <span className="text-[9px] text-muted-foreground font-mono">Content-Type: application/json</span>
                            </div>
                            <pre className="text-[11px] text-purple-400 font-mono overflow-x-auto">
{`{
  "appId": "YOUR_ZENITH_KEY",
  "intent": "SOVEREIGN_MESH_CONNECTION",
  "securityTier": "L4",
  "signature": "HMAC_V4_ENCRYPTED_AUTH"
}`}
                            </pre>
                         </div>
                         <div className="flex items-center gap-4 pt-4">
                            <Button size="sm" className="bg-purple-500 text-white font-bold uppercase text-[10px] gap-2">
                               <Braces className="size-3" /> View API Specs
                            </Button>
                            <Badge variant="outline" className="border-amber-500/30 text-amber-500 text-[8px] uppercase">Direct Handshake Active</Badge>
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
                              { step: "01", title: "Generate Key", desc: "Obtain your Zenith L1 access key from the 'Keys' tab." },
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
  sheikh.init({ appId: 'YOUR_ZENITH_KEY', speed: 'ZENITH_TURBO' });
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

                <TabsContent value="bridge" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-purple-500">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-purple-500 flex items-center gap-2">
                            <Activity className="size-4" /> Neural Bridge (Project #201)
                         </CardTitle>
                         <CardDescription>Dynamic traffic routing across the 100-node mesh cluster.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 space-y-3">
                               <h4 className="text-[10px] font-bold uppercase text-white">Dynamic Rerouting</h4>
                               <p className="text-[9px] text-muted-foreground italic">"Automatic fail-over if node latency > 30ms."</p>
                               <Badge className="bg-emerald-500/20 text-emerald-500">ENFORCED</Badge>
                            </div>
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 space-y-3">
                               <h4 className="text-[10px] font-bold uppercase text-white">South Asia Hub</h4>
                               <p className="text-[9px] text-muted-foreground italic">"Optimized corridors for BDT and INR liquidity."</p>
                               <Badge className="bg-primary/20 text-primary">SYNCED</Badge>
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="certs" className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldPlus className="size-24 text-emerald-500" />
                         </div>
                         <CardHeader>
                            <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                               <CheckCircle2 className="size-5" /> Zenith-Certified Node
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-mono">Immutable Infrastructure Certificate</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="p-4 bg-black/40 rounded-xl border border-emerald-500/20 space-y-3">
                               <div className="flex justify-between items-center text-[10px] font-bold">
                                  <span className="text-muted-foreground uppercase">Partner Node ID</span>
                                  <span className="text-white">NODE-ZEN-42B</span>
                               </div>
                               <div className="flex justify-between items-center text-[10px] font-bold">
                                  <span className="text-muted-foreground uppercase">Veracity Status</span>
                                  <span className="text-emerald-500">ZENITH_CERTIFIED</span>
                               </div>
                               <div className="pt-2 border-t border-white/5">
                                  <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Handshake Signature</p>
                                  <code className="text-[9px] text-emerald-400 break-all font-mono">0x_ZN_CERT_9a6c22bb3f1a4e2b8c9d...</code>
                               </div>
                            </div>
                            <Button size="sm" className="w-full bg-emerald-500 text-black font-bold uppercase text-[9px] h-9">
                               Download Certificate
                            </Button>
                         </CardContent>
                      </Card>
                   </div>
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
