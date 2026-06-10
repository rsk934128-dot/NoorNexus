
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
  ChevronRight, Menu, MessageSquare, Cpu, BookOpen, AlertCircle, CheckCircle2
} from "lucide-react"
import { noraIntegrationAssistant, IntegrationAssistantOutput } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

const ENDPOINTS = [
  { method: "POST", path: "/api/v1/auth/handshake", desc: "Initiate HMAC_V4 cryptographic session." },
  { method: "GET", path: "/api/v1/ledger/balance", desc: "Retrieve BDT settlement balance." },
  { method: "POST", path: "/api/v1/remit/transfer", desc: "Execute cross-border asset broadcast." },
  { method: "GET", path: "/api/v1/nodes/status", desc: "Check regional node mesh health." }
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
  "action": "ping",
  "node": "Sirajganj-01",
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

  const executeHandshake = async () => {
    setPlaygroundLoading(true)
    setPlaygroundResult(null)
    
    // Simulate HMAC_V4 Handshake Process
    setTimeout(() => {
      const mockSignature = "0x" + Math.random().toString(16).substring(2, 42)
      setPlaygroundResult({
        status: 200,
        message: "Sovereign Handshake Accepted",
        x_sovereign_signature: mockSignature,
        node_response: "SIRAJGANJ_EDGE_01_ACK",
        security_clearance: "L4_STABLE"
      })
      setPlaygroundLoading(false)
      toast({
        title: "Handshake Successful",
        description: "Cryptographic session established.",
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
                   Sovereign API Gateway
                 </h2>
              </div>
              <p className="text-muted-foreground">Open Banking Integration Hub for Mission 400.</p>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
              <Lock className="size-4" /> AUTH: HMAC_V4_SHA256
            </Badge>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="endpoints" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="endpoints" className="gap-2"><Globe className="size-4" /> Endpoints</TabsTrigger>
                  <TabsTrigger value="security" className="gap-2"><Lock className="size-4" /> Security</TabsTrigger>
                  <TabsTrigger value="playground" className="gap-2"><Terminal className="size-4" /> Playground</TabsTrigger>
                </TabsList>

                <TabsContent value="endpoints" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Service Catalog</CardTitle>
                      <CardDescription>Available RESTful endpoints for Sovereign Mesh access.</CardDescription>
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

                <TabsContent value="security" className="space-y-4">
                  <Card className="glass-card bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">HMAC_V4 Handshake</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Every request must include the <code>X-Sovereign-Signature</code> header. This is a SHA256 HMAC of the (payload + timestamp) using your Client Secret.
                      </p>
                      <div className="bg-black/40 p-4 rounded-lg font-mono text-[10px] space-y-2 border border-white/5 overflow-x-auto">
                        <p className="text-emerald-500">// Header Generation (Node.js)</p>
                        <p className="text-white">const signature = crypto.createHmac('sha256', secret)</p>
                        <p className="text-white">.update(payload + timestamp)</p>
                        <p className="text-white">.digest('hex');</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="playground" className="space-y-4">
                   <Card className="glass-card">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase tracking-widest">Imperial Playground</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground">Payload (JSON)</Label>
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
                            Execute Test Handshake
                         </Button>

                         {playgroundResult && (
                           <div className="mt-6 space-y-4 animate-in fade-in zoom-in-95">
                              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <CheckCircle2 className="size-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-500 uppercase">Response: 200 OK</span>
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
                  <CardDescription className="text-[9px] uppercase font-bold text-muted-foreground">Expert Integration Guidance</CardDescription>
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
                         placeholder="How do I verify a signature?" 
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
                         {['HMAC Setup', 'P2C Docs', 'Webhook Setup'].map((d, i) => (
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
                       <ShieldCheck className="size-3" /> Zero-Trust Ready
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                       All integrations are audited by Nora-01 for cryptographic compliance before mesh activation.
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
