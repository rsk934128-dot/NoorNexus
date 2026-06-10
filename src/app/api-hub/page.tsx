"use client"

import { useState, useRef, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Code2, Globe, Lock, Terminal, Zap, Send, Loader2, ShieldCheck, 
  ChevronRight, Menu, MessageSquare, Cpu, BookOpen, AlertCircle, CheckCircle2,
  Coins, ArrowRightLeft, ShieldAlert
} from "lucide-react"
import { noraIntegrationAssistant, IntegrationAssistantOutput } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

const ENDPOINTS = [
  { method: "POST", path: "/api/v1/checkout/paylink", desc: "Generate a hosted stablecoin checkout link." },
  { method: "POST", path: "/api/v1/checkout/openapi", desc: "Initiate a direct server-to-server checkout session." },
  { method: "GET", path: "/api/v1/settlement/history", desc: "Retrieve T+1 disbursement logs." },
  { method: "POST", path: "/api/v1/auth/handshake", desc: "Initiate HMAC_V4 cryptographic session." }
]

interface Message {
  role: 'user' | 'model'
  text: string
  code?: string
}

export default function ApiHubPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Playground State
  const [playgroundLoading, setPlaygroundLoading] = useState(false)
  const [playgroundResult, setPlaygroundResult] = useState<any>(null)
  const [payload, setPayload] = useState(`{
  "orderId": "ORD-${Math.random().toString(36).substring(7).toUpperCase()}",
  "amount": "100.00",
  "currency": "USDC",
  "merchantId": "IMPERIAL-CORP-01",
  "timestamp": ${Math.floor(Date.now() / 1000)}
}`)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function askNora() {
    if (!query.trim()) return
    const userMsg = query
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setQuery("")
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }))
      const result = await noraIntegrationAssistant({
        query: userMsg,
        context: "STABLECOIN_PAYMENTS",
        history
      })
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: result.answer, 
        code: result.codeSnippet 
      }])
      
      toast({ title: "Nora-03 Dispatched Guidance" })
    } catch (e: any) {
      toast({ title: "AI Offline", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const executeHandshake = async () => {
    setPlaygroundLoading(true)
    setPlaygroundResult(null)
    
    setTimeout(() => {
      const mockSignature = "0x" + Math.random().toString(16).substring(2, 64)
      setPlaygroundResult({
        status: 200,
        message: "Unified Payment Handshake Accepted",
        checkoutUrl: "https://pay.noornexus.mesh/checkout/0x...auth",
        x_sovereign_signature: mockSignature,
        on_chain_status: "VERIFIED_SAFE",
        settlement_cycle: "T+1_STABLE"
      })
      setPlaygroundLoading(false)
      toast({
        title: "Handshake Successful",
        description: "Secure payment channel initialized.",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Code2 className="size-10 text-primary" />
                   Sovereign Connect Hub
                 </h2>
              </div>
              <p className="text-muted-foreground">Unified Stablecoin Payments for Mission 400 Businesses.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2">
                 <ShieldCheck className="size-4" /> COMPLIANCE: VASP_AUTH
               </Badge>
               <Badge variant="outline" className="border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
                 <Lock className="size-4" /> AUTH: HMAC_V4_SHA256
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="endpoints" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="endpoints" className="gap-2"><Globe className="size-4" /> API Docs</TabsTrigger>
                  <TabsTrigger value="payments" className="gap-2"><Coins className="size-4" /> Payment Flows</TabsTrigger>
                  <TabsTrigger value="security" className="gap-2"><Lock className="size-4" /> Security</TabsTrigger>
                  <TabsTrigger value="playground" className="gap-2"><Terminal className="size-4" /> Playground</TabsTrigger>
                </TabsList>

                <TabsContent value="endpoints" className="space-y-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Sovereign API 2.0</CardTitle>
                      <CardDescription>Direct integration endpoints for high-throughput merchants.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-white/5">
                        {ENDPOINTS.map((ep, i) => (
                          <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                              <Badge className={ep.method === 'POST' ? 'bg-primary' : 'bg-emerald-500'}>{ep.method}</Badge>
                              <code className="text-xs font-mono text-white">{ep.path}</code>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase">{ep.desc}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="glass-card border-l-4 border-l-primary">
                      <CardHeader>
                        <CardTitle className="text-xs uppercase font-bold text-primary">Paylink Flow</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Quickest integration. Redirect your customers to a NoorNexus hosted checkout page. No frontend SDK required.
                        </p>
                        <Badge variant="outline" className="text-[8px]">IDEAL FOR E-COMMERCE</Badge>
                      </CardContent>
                    </Card>
                    <Card className="glass-card border-l-4 border-l-emerald-500">
                      <CardHeader>
                        <CardTitle className="text-xs uppercase font-bold text-emerald-500">Open-API Flow</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Fully customized checkout. Embed stablecoin payments directly into your app's native interface.
                        </p>
                        <Badge variant="outline" className="text-[8px]">IDEAL FOR SAAS & APPS</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <Card className="glass-card bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Digital Trust Protocol</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-bold uppercase text-white flex items-center gap-2">
                            <ShieldCheck className="size-3 text-emerald-500" /> On-Chain Screening
                          </h4>
                          <p className="text-[9px] text-muted-foreground leading-relaxed">
                            Every wallet address is screened before transaction. Risky funds from sanctioned addresses are blocked instantly.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-bold uppercase text-white flex items-center gap-2">
                            <ArrowRightLeft className="size-3 text-primary" /> T+1 Settlement
                          </h4>
                          <p className="text-[9px] text-muted-foreground leading-relaxed">
                            Stablecoins are converted and disbursed to your local settlement account within one business day.
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-lg border border-white/5 space-y-2">
                         <p className="text-[10px] font-mono text-primary">// HMAC_V4 SHA256 Verification Required</p>
                         <p className="text-[9px] text-muted-foreground font-mono">X-Sovereign-Signature: SHA256(payload + timestamp, client_secret)</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="playground" className="space-y-4">
                   <Card className="glass-card">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase tracking-widest">Connect Playground</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground">Request Payload (JSON)</Label>
                            <textarea 
                              className="w-full h-32 bg-background/50 border border-white/10 rounded-md p-3 font-mono text-xs focus:ring-1 focus:ring-primary outline-none" 
                              value={payload}
                              onChange={(e) => setPayload(e.target.value)}
                            />
                         </div>
                         <Button 
                          onClick={executeHandshake}
                          disabled={playgroundLoading}
                          className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 glow-primary"
                        >
                            {playgroundLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                            Execute Test Payment Handshake
                         </Button>

                         {playgroundResult && (
                           <div className="mt-6 space-y-4 animate-in fade-in zoom-in-95">
                              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <CheckCircle2 className="size-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-500 uppercase">Status: 200 SUCCESS</span>
                              </div>
                              <pre className="bg-black/40 p-4 rounded-lg font-mono text-[10px] border border-white/5 text-primary overflow-x-auto">
                                {JSON.stringify(playgroundResult, null, 2)}
                              </pre>
                           </div>
                         )}
                      </CardContent>
                   </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-amber-500 h-[600px] flex flex-col">
                <CardHeader className="shrink-0">
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Cpu className="size-4" /> Nora-03 Integration AI
                  </CardTitle>
                  <CardDescription className="text-[9px] uppercase font-bold text-muted-foreground">Expert Payment Integration Guidance</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.length === 0 && (
                        <div className="text-center py-10 space-y-3">
                          <MessageSquare className="size-10 text-muted-foreground/20 mx-auto" />
                          <p className="text-[10px] text-muted-foreground font-mono uppercase">Awaiting developer query...</p>
                        </div>
                      )}
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[90%] p-3 rounded-xl text-xs font-mono leading-relaxed ${msg.role === 'user' ? 'bg-primary/20 border border-primary/20 text-primary-foreground' : 'bg-white/5 border border-white/5 text-muted-foreground'}`}>
                            {msg.text}
                          </div>
                          {msg.code && (
                            <div className="mt-2 w-full max-w-[95%] bg-black/40 p-2 rounded border border-white/5 overflow-x-auto">
                              <pre className="text-[9px] text-primary">{msg.code}</pre>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={scrollRef} />
                    </div>
                  </ScrollArea>

                  <div className="shrink-0 space-y-4 pt-4 border-t border-white/5">
                    <div className="relative">
                       <Input 
                         placeholder="How do I integrate Stablecoin Pay?" 
                         value={query}
                         onChange={e => setQuery(e.target.value)}
                         onKeyDown={e => e.key === 'Enter' && askNora()}
                         className="bg-background/50 border-white/10 text-xs h-12 pr-12"
                         disabled={loading}
                       />
                       <Button 
                         onClick={askNora} 
                         disabled={loading || !query.trim()}
                         size="icon" 
                         className="absolute right-1 top-1 text-primary hover:bg-primary/20 bg-transparent"
                       >
                         {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                       </Button>
                    </div>

                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                         <BookOpen className="size-3" /> Quick Solutions
                       </p>
                       <div className="flex flex-wrap gap-2">
                         {['Paylink SDK', 'T+1 Settlement', 'Signature Guide'].map((d, i) => (
                           <Badge 
                            key={i} 
                            variant="secondary" 
                            className="text-[8px] cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => { setQuery(`Tell me about ${d}`); }}
                           >
                            {d}
                           </Badge>
                         ))}
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                       <ShieldCheck className="size-3" /> Fraud Prevention
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                       Blockchain payments are irreversible, removing chargeback fraud. NoorNexus screens all on-chain activity for AML compliance.
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
