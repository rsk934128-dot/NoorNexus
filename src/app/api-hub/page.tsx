
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
  ArrowRightLeft, AlertTriangle, Key, ShieldAlert, ChevronRight, BellRing, Rocket, Copy, Star, ShieldPlus, DatabaseZap, ReceiptText,
  ShieldHalf,
  Database,
  Unplug
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

const INTEROP_ENDPOINTS = [
  { method: "POST", path: "/x-chain/trust/exchange", desc: "Cross-platform reputation verification." },
  { method: "POST", path: "/x-chain/proposal/sync", desc: "Synchronize governance edicts with DAOs." },
  { method: "GET", path: "/x-chain/memory/query", desc: "Fetch institutional memory nodes." }
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
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <ShieldHalf className="size-3 mr-2" /> Interoperability Layer
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-primary">Connect.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 160: Linking NoorNexus to the global financial and governance mesh. Secure institutional data exchange gateways.
              </p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <Globe className="size-4 animate-spin-slow" /> GATEWAY_L4_ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <Tabs defaultValue="v2" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="v2" className="gap-2"><ReceiptText className="size-4" /> V2 Protocol</TabsTrigger>
                  <TabsTrigger value="interop" className="gap-2"><Unplug className="size-4" /> Interop API</TabsTrigger>
                  <TabsTrigger value="sdk" className="gap-2"><Cpu className="size-4" /> Imperial SDK</TabsTrigger>
                </TabsList>

                <TabsContent value="v2" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                   <Card className="glass-card border-l-4 border-l-primary">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-primary">Standard Gateway API</CardTitle>
                         <CardDescription>Primary financial settlement endpoints.</CardDescription>
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

                <TabsContent value="interop" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-amber-500">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-amber-500">Cross-Platform Exchange</CardTitle>
                         <CardDescription>Linking institutional memory and trust chains.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                         <div className="divide-y divide-white/5">
                           {INTEROP_ENDPOINTS.map((ep, i) => (
                             <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/2 transition-colors">
                               <div className="flex items-center gap-4">
                                 <Badge className="bg-amber-500">{ep.method}</Badge>
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Table>
                          <TableHeader className="bg-white/5">
                            <TableRow>
                              <TableHead className="text-[10px] uppercase">Method</TableHead>
                              <TableHead className="text-[10px] uppercase">Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-[11px]">
                            {SDK_METHODS.map((m, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-mono text-primary font-bold">{m.name}</TableCell>
                                <TableCell className="text-muted-foreground">{m.desc}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Institutional Memory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "API consumers can query institutional memory nodes to verify historical edict alignment before executing financial swaps."
                   </p>
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
                          <p className="text-[10px] text-muted-foreground font-mono uppercase">Awaiting Interop query...</p>
                        </div>
                      )}
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
                         placeholder="How to link External DAO memory?" 
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
