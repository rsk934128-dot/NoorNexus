
"use client"

import { useState, useRef, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/badge"
import { 
  Code2, Globe, Lock, Terminal, Zap, Send, Loader2, ShieldCheck, 
  Menu, MessageSquare, Cpu, BookOpen, Layers, Info, CheckCircle2,
  ArrowRightLeft, AlertTriangle, Key, ShieldAlert, ChevronRight, BellRing, RefreshCcw, Star, HeartPulse
} from "lucide-react"
import { noraIntegrationAssistant, IntegrationAssistantOutput } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const ENDPOINTS = [
  { method: "POST", path: "/openapi/v2/order/create", desc: "Create a prepay order and get a payment link or SN." },
  { method: "POST", path: "/openapi/v2/order/payment-method", desc: "Retrieve specific payment info (URL/QR) for an order." },
  { method: "GET", path: "/openapi/v2/order/query", desc: "Check the current status of a payment order." },
  { method: "POST", path: "/openapi/v2/auth/handshake", desc: "Initiate SHA256withRSA cryptographic session." }
]

const SDK_METHODS = [
  { name: "sheikh.init()", desc: "Initialize connection with NoorNexus Mainframe.", params: "appKey, region" },
  { name: "sheikh.sync()", desc: "Synchronize local state with Collective Immune System.", params: "payload" },
  { name: "sheikh.heartbeat()", desc: "Send 4s integrity pulse to maintain L4 privileges.", params: "signature" },
  { name: "sheikh.audit()", desc: "Request an immediate Nora-01 protocol audit.", params: "packetId" }
]

interface Message {
  role: 'user' | 'model'
  text: string
  code?: string
}

export default function ApiHubPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Playground State
  const [playgroundLoading, setPlaygroundLoading] = useState(false)
  const [playgroundResult, setPlaygroundResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("endpoints")
  const [payload, setPayload] = useState(`{
  "appId": "RUBELPAY-V3",
  "action": "HEARTBEAT_SYNC",
  "trust_nonce": "${Math.random().toString(36).substring(7)}"
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
    
    try {
      const parsed = JSON.parse(payload)
      
      // Simulate Imperial SDK Heartbeat
      if (parsed.action === "HEARTBEAT_SYNC") {
        await addDoc(collection(db, "app_connections"), {
          appId: parsed.appId,
          name: parsed.appId,
          trustScore: 90 + Math.floor(Math.random() * 10),
          status: "SYNCHRONIZED",
          lastHeartbeat: Date.now(),
          latency: Math.floor(Math.random() * 20) + 5
        })
      }

      setTimeout(() => {
        setPlaygroundResult({
          code: "SUCCESS",
          msg: "Imperial SDK Handshake Verified",
          data: {
            session_id: "SHEIKH-SESS-" + Math.random().toString(16).substring(2, 10).toUpperCase(),
            trust_escalation: "L4_TSBAC_ACTIVE",
            heartbeat_interval: "4000ms",
            mesh_sync: "COMPLETED"
          }
        })
        setPlaygroundLoading(false)
        toast({
          title: "Sovereign Handshake Successful",
          description: "Imperial SDK is now heartbeat-synced with the mainframe.",
        })
      }, 1500)
    } catch (e: any) {
      setPlaygroundLoading(false)
      toast({ title: "Payload Error", description: "Invalid JSON format.", variant: "destructive" })
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon" asChild><div className="size-10 flex items-center justify-center"><Menu className="size-6" /></div></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Code2 className="size-10 text-primary" />
                   Sovereign Connect Hub
                 </h2>
              </div>
              <p className="text-muted-foreground">Phase 3: Unified Connect & Imperial SDK Management.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <Star className="size-4 fill-current" /> TRUST LEVEL: L4
               </Badge>
               <Badge variant="outline" className="border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
                 <HeartPulse className="size-4" /> SDK HEARTBEAT ENABLED
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <Tabs defaultValue="endpoints" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="endpoints" className="gap-2"><Globe className="size-4" /> API Docs</TabsTrigger>
                  <TabsTrigger value="sdk" className="gap-2"><Cpu className="size-4" /> Imperial SDK</TabsTrigger>
                  <TabsTrigger value="security" className="gap-2"><ShieldAlert className="size-4" /> Security</TabsTrigger>
                  <TabsTrigger value="playground" className="gap-2"><Terminal className="size-4" /> SDK Playground</TabsTrigger>
                </TabsList>

                <TabsContent value="endpoints" className="space-y-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Sovereign API 2.0 Endpoints</CardTitle>
                      <CardDescription>Direct RESTful integration for high-throughput merchants.</CardDescription>
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

                <TabsContent value="playground" className="space-y-4">
                   <Card className="glass-card">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase tracking-widest">Imperial SDK Test Runner</CardTitle>
                         <CardDescription>Sandbox for Heartbeat Handshake & Trust Sync</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground">Sync Payload (JSON)</Label>
                            <textarea 
                              className="w-full h-32 bg-background/50 border border-white/10 rounded-md p-3 font-mono text-xs focus:ring-1 focus:ring-primary outline-none" 
                              value={payload}
                              onChange={(e) => setPayload(e.target.value)}
                            />
                         </div>
                         <Button 
                          onClick={executeHandshake}
                          disabled={playgroundLoading}
                          asChild
                        >
                          <div className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 glow-primary flex items-center justify-center cursor-pointer">
                            {playgroundLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                            Execute SDK Handshake
                          </div>
                         </Button>

                         {playgroundResult && (
                           <div className="mt-6 space-y-4 animate-in fade-in zoom-in-95">
                              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <CheckCircle2 className="size-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-500 uppercase">Handshake: {playgroundResult.code}</span>
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
              <Card className="glass-card border-l-4 border-l-amber-500 h-[700px] flex flex-col">
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
                          <p className="text-[10px] text-muted-foreground font-mono uppercase">Awaiting SDK query...</p>
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
                       <input 
                         placeholder="How to integrate Heartbeat?" 
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
