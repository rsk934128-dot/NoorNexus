
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
  Menu, MessageSquare, Cpu, BookOpen, Layers, Info, CheckCircle2,
  ArrowRightLeft, AlertTriangle, Key, ShieldAlert, ChevronRight
} from "lucide-react"
import { noraIntegrationAssistant, IntegrationAssistantOutput } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ENDPOINTS = [
  { method: "POST", path: "/openapi/v2/order/create", desc: "Create a prepay order and get a payment link or SN." },
  { method: "POST", path: "/openapi/v2/order/payment-method", desc: "Retrieve specific payment info (URL/QR) for an order." },
  { method: "GET", path: "/openapi/v2/order/query", desc: "Check the current status of a payment order." },
  { method: "POST", path: "/openapi/v2/auth/handshake", desc: "Initiate SHA256withRSA cryptographic session." }
]

const REQUIRED_HEADERS = [
  { name: "X-R-AK", desc: "Merchant appKey for identification.", required: "Yes", example: "4CA7B705-..." },
  { name: "X-R-TS", desc: "Unix timestamp in milliseconds.", required: "Yes", example: "1763555087656" },
  { name: "X-R-KEY-VERSION", desc: "Key pair version used for signing.", required: "Yes", example: "1" },
  { name: "X-R-Signature", desc: "SHA256withRSA digital signature.", required: "Yes*", example: "ZxAmLpV..." }
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
  "amount": "88.88",
  "currency": "USD"
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
        context: "HMAC_V4",
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
      const mockSignature = "ZxAmLpVy" + Math.random().toString(16).substring(2, 32)
      setPlaygroundResult({
        code: "SUCCESS",
        msg: null,
        data: {
          orderSn: "P2025" + Math.random().toString(10).substring(2, 16),
          outerOrder: JSON.parse(payload).orderId,
          h5Url: "https://pay.noornexus.mesh/checkout/0x...auth",
          headers_used: {
            "X-R-AK": "4CA7B705-8EF5-4AC3-A0B6-9A4B84EF13B6",
            "X-R-KEY-VERSION": "1",
            "X-R-Signature": mockSignature
          }
        }
      })
      setPlaygroundLoading(false)
      toast({
        title: "RESTful Handshake Successful",
        description: "API 2.0 SHA256withRSA verified.",
      })
    }, 1500)
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
              <p className="text-muted-foreground">RESTful API 2.0 with Imperial SHA256withRSA Security Standard.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2">
                 <ShieldCheck className="size-4" /> VASP AUTHORIZED
               </Badge>
               <Badge variant="outline" className="border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
                 <Lock className="size-4" /> AUTH: X-R-AK + RSA
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <Tabs defaultValue="endpoints" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="endpoints" className="gap-2"><Globe className="size-4" /> API Docs</TabsTrigger>
                  <TabsTrigger value="flows" className="gap-2"><Layers className="size-4" /> Integration Guide</TabsTrigger>
                  <TabsTrigger value="security" className="gap-2"><ShieldAlert className="size-4" /> Security Guide</TabsTrigger>
                  <TabsTrigger value="playground" className="gap-2"><Terminal className="size-4" /> Playground</TabsTrigger>
                </TabsList>

                <TabsContent value="endpoints" className="space-y-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Required Request Headers</CardTitle>
                      <CardDescription>Authentication and SHA256withRSA signature validation headers.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow>
                            <TableHead className="text-[10px] uppercase">Header Name</TableHead>
                            <TableHead className="text-[10px] uppercase">Description</TableHead>
                            <TableHead className="text-[10px] uppercase">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="text-[11px]">
                          {REQUIRED_HEADERS.map((h, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-mono text-primary font-bold">{h.name}</TableCell>
                              <TableCell className="text-muted-foreground">{h.desc}</TableCell>
                              <TableCell className="font-mono text-[9px]">{h.example}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

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

                <TabsContent value="flows" className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="glass-card border-l-4 border-l-primary">
                      <CardHeader>
                        <CardTitle className="text-lg font-headline flex items-center gap-2 uppercase tracking-tight">
                          <Info className="size-5 text-primary" />
                          Flow Comparison
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader className="bg-white/5">
                            <TableRow>
                              <TableHead className="w-[150px] text-[10px] uppercase font-bold">Feature</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold text-primary">Paylink Flow</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold text-emerald-500">Open-API Flow</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="text-[11px]">
                            <TableRow>
                              <TableCell className="font-bold">Core Flow</TableCell>
                              <TableCell>Redirects to hosted page.</TableCell>
                              <TableCell>Retrieves raw URL/QR directly.</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Primary Use</TableCell>
                              <TableCell>Standard E-commerce.</TableCell>
                              <TableCell>Deeply customized Apps.</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-t-2 border-t-primary">
                        <CardHeader><CardTitle className="text-sm font-headline uppercase text-primary">1. Payment via Paylink</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                           <ol className="space-y-3">
                             {[
                               "User submits order on merchant site.",
                               "Server calls /openapi/v2/order/create.",
                               "Receive payment link in response.",
                               "Redirect user to the hosted payment page.",
                               "User pays, redirects back to redirectUrl."
                             ].map((step, i) => (
                               <li key={i} className="flex gap-3 text-[11px] leading-relaxed">
                                 <span className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">{i+1}</span>
                                 {step}
                               </li>
                             ))}
                           </ol>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-t-2 border-t-emerald-500">
                        <CardHeader><CardTitle className="text-sm font-headline uppercase text-emerald-500">2. Payment via Open-API</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                           <ol className="space-y-3">
                             {[
                               "Server creates order with manual=true.",
                               "Call /order/payment-method with SN.",
                               "Receive raw QR data or DeepLink URL.",
                               "Display QR/Deeplink in custom UI.",
                               "User completes payment in wallet app."
                             ].map((step, i) => (
                               <li key={i} className="flex gap-3 text-[11px] leading-relaxed">
                                 <span className="size-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold">{i+1}</span>
                                 {step}
                               </li>
                             ))}
                           </ol>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <Card className="glass-card border-l-4 border-l-primary">
                        <CardHeader>
                          <CardTitle className="text-lg font-headline flex items-center gap-2 uppercase">
                            <Lock className="size-5 text-primary" />
                            SHA256withRSA Signature Guide
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-3">
                            <AlertTriangle className="size-5 text-amber-500 shrink-0" />
                            <p className="text-[10px] text-amber-200">
                              <b>Imperial Protocol:</b> The <code>secretKey</code> has been removed. All requests must be signed with your 2048-bit RSA Private Key.
                            </p>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase text-white">Step 1: Construct String to Sign</h4>
                            <div className="p-4 bg-black/40 rounded-lg font-mono text-[10px] text-muted-foreground border border-white/5">
                              {`{http-method} {http-uri}\\n{appKey}.{timestamp}.{requestBody}`}
                            </div>
                            <p className="text-[10px] text-muted-foreground italic">
                              Example: POST /openapi/v2/order/create\n4CA7B...1763555...{"{...}"}
                            </p>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase text-white">Step 2: Generate Signature</h4>
                            <div className="p-4 bg-black/40 rounded-lg font-mono text-[10px] text-primary border border-white/5">
                              {`signature = base64Encode(sha256withRSA(stringToSign, privateKey))`}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold uppercase text-white flex items-center gap-2">
                                <Key className="size-3 text-emerald-500" /> Key Rotation
                              </h4>
                              <p className="text-[9px] text-muted-foreground leading-relaxed">
                                Use <code>X-R-KEY-VERSION</code> (1, 2, 3...) to indicate which key version was used for signing.
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold uppercase text-white flex items-center gap-2">
                                <ShieldCheck className="size-3 text-primary" /> Verification
                              </h4>
                              <p className="text-[9px] text-muted-foreground leading-relaxed">
                                Callback signatures format: <code>{`{appKey}.{timestamp}.{requestBody}`}</code>. Verify using NoorNexus Public Key.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="glass-card h-fit">
                        <CardHeader>
                          <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                            <Terminal className="size-4" /> Implementation
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">RSA Generation (OpenSSL)</p>
                            <pre className="p-2 bg-black/40 rounded border border-white/5 text-[9px] font-mono text-muted-foreground whitespace-pre-wrap">
                              {`openssl genrsa -out private_key.pem 2048\nopenssl rsa -in private_key.pem -pubout -out public_key.pem`}
                            </pre>
                          </div>
                          <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                              Upload your <b>public key</b> in the Developer Portal to obtain your <code>appKey</code>.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                            <ShieldCheck className="size-3" /> Secure Best Practices
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-[9px] text-muted-foreground leading-relaxed">
                            - Store Private Key in HSM.<br/>
                            - Validate timestamps within ±5 mins.<br/>
                            - Use Key Rotation every 12 months.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="playground" className="space-y-4">
                   <Card className="glass-card">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase tracking-widest">API 2.0 Test Runner</CardTitle>
                         <CardDescription>Sandbox URL: <code>https://api-sandbox.noornexus.mesh</code></CardDescription>
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
                            Run RESTful API Test
                         </Button>

                         {playgroundResult && (
                           <div className="mt-6 space-y-4 animate-in fade-in zoom-in-95">
                              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <CheckCircle2 className="size-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-500 uppercase">Status: {playgroundResult.code}</span>
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
                    <Cpu className="size-4" /> Nora-03 Integration AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.length === 0 && (
                        <div className="text-center py-10 space-y-3">
                          <MessageSquare className="size-10 text-muted-foreground/20 mx-auto" />
                          <p className="text-[10px] text-muted-foreground font-mono uppercase">Awaiting API 2.0 query...</p>
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
                         placeholder="How to sign with RSA?" 
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
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                       <ShieldCheck className="size-3" /> API 2.0 Trust
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                       <code>X-R-AK</code> and <code>X-R-KEY-VERSION</code> are now required. <code>secretKey</code> is deprecated. Ensure you use SHA256withRSA.
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
