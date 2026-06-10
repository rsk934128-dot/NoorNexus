"use client"

import { useState, useRef, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  Code2, Globe, Lock, Terminal, Zap, Send, Loader2, ShieldCheck, 
  Menu, MessageSquare, Cpu, BookOpen, Layers, Info, CheckCircle2,
  ArrowRightLeft, AlertTriangle, Key, ShieldAlert, ChevronRight, BellRing, Rocket, Copy, Star, ShieldPlus, DatabaseZap, ReceiptText
} from "lucide-react"
import { noraIntegrationAssistant, IntegrationAssistantOutput } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SovereignLogo } from "@/components/sovereign-logo"

const ENDPOINTS = [
  { method: "POST", path: "/openapi/v2/order/create", desc: "Create a V2 order with RSA signature." },
  { method: "POST", path: "/openapi/v2/order/payment-method", desc: "Fetch URL/QR for specific method." },
  { method: "GET", path: "/openapi/v2/order/query", desc: "Poll transaction status." },
  { method: "POST", path: "/openapi/v2/webhook/callback", desc: "Inbound notification receiver." }
]

const SDK_METHODS = [
  { name: "sheikh.init()", desc: "Initializes RSA-signed session.", params: "appKey, region" },
  { name: "sheikh.heartbeat()", desc: "Sends 4s integrity pulse (L4 Maintenance).", params: "none" },
  { name: "sheikh.sync()", desc: "Broadcasts payload to 400 nodes.", params: "payload" },
  { name: "sheikh.report()", desc: "Logs anomaly to Conflict Resolution.", params: "error" }
]

interface Message {
  role: 'user' | 'model'
  text: string
  code?: string
  brief?: string
}

export default function ApiHubPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

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
        context: query.toLowerCase().includes('discovery') ? "DISCOVERY_PROTOCOL" : "GENERAL",
        history
      })
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: result.answer, 
        code: result.codeSnippet,
        brief: result.discoveryBrief
      }])
      
      toast({ title: "Nora-03 Dispatched Guidance" })
    } catch (e: any) {
      toast({ title: "AI Offline", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const v2Payload = `{
  "outerOrderSn": "RD-V2-H4DB1RWI",
  "outerUid": "SF-ARCHITECT-001",
  "orderAmount": "100.00",
  "orderCurrency": "USD",
  "orderDesc": "Sovereign Grid Access Phase 42-B License",
  "env": "WEB",
  "goods": [
    { "id": "PROJ-42-NODE", "name": "Sovereign Node Auth", "quantity": 1, "price": "100.00" }
  ],
  "redirectUrl": "https://shurukkha-hub.sirajganj.gov.bd/dashboard"
}`

  const v2Response = `{
  "code": "SUCCESS",
  "msg": null,
  "requestId": "94012d08-9945-4f45-85c7-6276da3e6d45",
  "data": {
    "orderSn": "P1781129258404772",
    "outerOrderSn": "RD-V2-H4DB1RWI",
    "webUrl": "https://pay.redotpay.com/checkout/RD-V2-H4DB1RWI",
    "h5Url": "https://pay.redotpay.com/h5/RD-V2-H4DB1RWI",
    "appUrl": "redotpay://payment/RD-V2-H4DB1RWI",
    "paymentMethods": ["USDT", "USDC", "BTC"]
  }
}`

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
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
              <p className="text-muted-foreground">Project 160: Global Discovery & Imperial SDK Integration.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
                 <Globe className="size-4 animate-spin-slow" /> DISCOVERY_PROTOCOL_ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <Tabs defaultValue="v2" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="v2" className="gap-2"><ReceiptText className="size-4" /> V2 Protocol</TabsTrigger>
                  <TabsTrigger value="sdk" className="gap-2"><Cpu className="size-4" /> Imperial SDK</TabsTrigger>
                  <TabsTrigger value="endpoints" className="gap-2"><Globe className="size-4" /> REST API</TabsTrigger>
                </TabsList>

                <TabsContent value="v2" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="glass-card border-l-4 border-l-primary">
                         <CardHeader>
                            <CardTitle className="text-sm font-headline uppercase text-primary">Request Specification</CardTitle>
                            <CardDescription>POST /openapi/v2/order/create</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                               <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                  <p className="text-[8px] uppercase font-bold text-muted-foreground">X-R-TS (Timestamp)</p>
                                  <p className="text-xs font-mono text-white mt-1">1781129258404</p>
                               </div>
                               <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                  <p className="text-[8px] uppercase font-bold text-muted-foreground">X-R-Signature</p>
                                  <p className="text-xs font-mono text-primary mt-1">bGJjeXVvMTc4MTEy...</p>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <Label className="text-[10px] uppercase font-bold text-muted-foreground">Example Payload</Label>
                               <pre className="p-4 bg-black/60 rounded-xl text-[10px] font-mono text-emerald-400 overflow-x-auto border border-white/5">
                                  {v2Payload}
                               </pre>
                            </div>
                         </CardContent>
                      </Card>

                      <Card className="glass-card border-l-4 border-l-emerald-500">
                         <CardHeader>
                            <CardTitle className="text-sm font-headline uppercase text-emerald-500">Unified Response (V2)</CardTitle>
                            <CardDescription>Standard wrapper for all sovereign responses.</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                               <p className="text-[9px] text-emerald-200 leading-relaxed italic">
                                  "The V2 wrapper provides a predictable structure with atomic requestId tracking."
                               </p>
                            </div>
                            <div className="space-y-2">
                               <Label className="text-[10px] uppercase font-bold text-muted-foreground">JSON Response</Label>
                               <pre className="p-4 bg-black/60 rounded-xl text-[10px] font-mono text-primary overflow-x-auto border border-white/5">
                                  {v2Response}
                               </pre>
                            </div>
                         </CardContent>
                      </Card>
                   </div>
                </TabsContent>

                <TabsContent value="endpoints" className="space-y-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Sovereign API 2.0 Endpoints</CardTitle>
                      <CardDescription>Direct integration via SHA256withRSA for high-throughput nodes.</CardDescription>
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

                <TabsContent value="sdk" className="space-y-6">
                  <Card className="glass-card border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-lg font-headline flex items-center gap-2 uppercase">
                        <Cpu className="size-5 text-primary" />
                        Imperial SDK (@sheikh/core)
                      </CardTitle>
                      <CardDescription>The official NoorNexus bridge for ecosystem applications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                         <h4 className="text-xs font-bold text-primary uppercase">Quick Installation</h4>
                         <code className="text-[10px] font-mono text-emerald-500">npm install @sheikh/core --registry https://npm.noornexus.mesh</code>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase text-white">Core Methods</h4>
                        <Table>
                          <TableHeader className="bg-white/5">
                            <TableRow>
                              <TableHead className="text-[10px] uppercase">Method</TableHead>
                              <TableHead className="text-[10px] uppercase">Description</TableHead>
                              <TableHead className="text-[10px] uppercase">Parameters</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-[11px]">
                            {SDK_METHODS.map((m, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-mono text-primary font-bold">{m.name}</TableCell>
                                <TableCell className="text-muted-foreground">{m.desc}</TableCell>
                                <TableCell className="font-mono text-[9px]">{m.params}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-emerald-500">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Data Compliance Brief
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase text-white flex items-center gap-2">
                        <ShieldPlus className="size-3 text-emerald-500" /> AES-256 Encryption
                      </h4>
                      <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                        সকল ডেটা AES-256 বিট এনক্রিপশনের মাধ্যমে আপনার প্রিমাইসে সংরক্ষিত থাকে।
                      </p>
                   </div>
                   <div className="space-y-2 pt-2 border-t border-white/5">
                      <h4 className="text-[10px] font-bold uppercase text-white flex items-center gap-2">
                        <DatabaseZap className="size-3 text-amber-500" /> Zero-Write Policy
                      </h4>
                      <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                        সিস্টেম আপনার ডেটাবেসে কোনো রাইট (Write) অপারেশন করবে না। এটি শুধু Read-Only মোডে কাজ করবে।
                      </p>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 h-[400px] flex flex-col">
                <CardHeader className="shrink-0">
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Cpu className="size-4" /> Nora-03 SDK Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.length === 0 && (
                        <div className="text-center py-10 space-y-3">
                          <MessageSquare className="size-10 text-muted-foreground/20 mx-auto" />
                          <p className="text-[10px] text-muted-foreground font-mono uppercase">Awaiting SDK query or Discovery intent...</p>
                        </div>
                      )}
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[90%] p-3 rounded-xl text-xs font-mono leading-relaxed ${msg.role === 'user' ? 'bg-primary/20 border border-primary/20 text-primary-foreground' : 'bg-white/5 border border-white/5 text-muted-foreground'}`}>
                            {msg.text}
                          </div>
                          {msg.brief && (
                             <div className="mt-2 p-3 bg-primary/10 border border-primary/30 rounded-xl text-[10px] text-primary italic">
                                {msg.brief}
                             </div>
                          )}
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
                       <input 
                         placeholder="How to join Discovery Protocol?" 
                         value={query}
                         onChange={e => setQuery(e.target.value)}
                         onKeyDown={e => e.key === 'Enter' && askNora()}
                         className="w-full bg-background/50 border border-white/10 text-xs h-12 pr-12 pl-4 rounded-md outline-none focus:ring-1 focus:ring-primary"
                         disabled={loading}
                       />
                       <div 
                         onClick={askNora} 
                         className={`absolute right-1 top-1 text-primary hover:bg-primary/20 bg-transparent size-10 flex items-center justify-center cursor-pointer ${loading || !query.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
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
