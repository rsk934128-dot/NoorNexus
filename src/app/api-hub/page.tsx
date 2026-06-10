
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
  ArrowRightLeft, AlertTriangle, Key, ShieldAlert, ChevronRight, BellRing
} from "lucide-react"
import { noraIntegrationAssistant, IntegrationAssistantOutput } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ENDPOINTS = [
  { method: "POST", path: "/openapi/v2/order/create", desc: "Create a prepay order via SHA256withRSA." },
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
        context: "GENERAL",
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
              <p className="text-muted-foreground">Phase 3: Unified Connect & Imperial SDK Management for TTPs.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
                 <Lock className="size-4" /> TSBAC_SECURITY_L4
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <Tabs defaultValue="sdk" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="sdk" className="gap-2"><Cpu className="size-4" /> Imperial SDK</TabsTrigger>
                  <TabsTrigger value="endpoints" className="gap-2"><Globe className="size-4" /> REST API</TabsTrigger>
                  <TabsTrigger value="security" className="gap-2"><ShieldCheck className="size-4" /> Security Protocol</TabsTrigger>
                </TabsList>

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

                <TabsContent value="security" className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                        <CardHeader>
                          <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                             <Key className="size-4" /> RSA Handshake
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            All external requests must include an X-Imperial-Signature header, generated by signing the payload and timestamp with your node's RSA-2048 private key.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="glass-card border-primary/20 bg-primary/5">
                        <CardHeader>
                          <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                             <ShieldAlert className="size-4" /> Heartbeat Policy
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            To maintain TIER-3 (IMPERIAL) status, your application must emit a heartbeat every 4 seconds. Missing 3 consecutive pulses results in automated Trust Score devaluation.
                          </p>
                        </CardContent>
                      </Card>
                   </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-amber-500 h-[600px] flex flex-col">
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
