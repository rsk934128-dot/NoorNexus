
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
  ArrowRightLeft
} from "lucide-react"
import { noraIntegrationAssistant } from "@/ai/flows/integration-assistant-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const STATUS_MAPPINGS = [
  { provider: "bKash", code: "0000", meaning: "SUCCESS", system: "APPROVED" },
  { provider: "bKash", code: "2023", meaning: "INSUFFICIENT_BALANCE", system: "FAILED" },
  { provider: "Xendit", code: "PAID", meaning: "SETTLED", system: "APPROVED" },
  { provider: "Xendit", code: "PENDING", meaning: "WAITING_PAYMENT", system: "PENDING_SOVEREIGN_SEAL" }
]

interface Message {
  role: 'user' | 'model'
  text: string
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
      const result = await noraIntegrationAssistant({
        query: userMsg,
        context: "GENERAL",
        history: messages.map(m => ({ role: m.role, text: m.text }))
      })
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: result.answer
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
                   <Rocket className="size-3 mr-2" /> Global Builders Program
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Developer <span className="text-primary">Ecosystem.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 165: Integration Hub. Access standard mapping protocols for bKash, Xendit, and future gateways.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Builder Nodes</p>
                  <p className="text-3xl font-headline font-bold text-primary">12 ACTIVE</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <Tabs defaultValue="mapping" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="mapping" className="gap-2"><RefreshCcw className="size-4" /> Status Mapping</TabsTrigger>
                  <TabsTrigger value="builders" className="gap-2"><Rocket className="size-4" /> Builders Program</TabsTrigger>
                  <TabsTrigger value="gateway" className="gap-2"><ReceiptText className="size-4" /> Partner Gateway</TabsTrigger>
                </TabsList>

                <TabsContent value="mapping" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                   <Card className="glass-card border-l-4 border-l-emerald-500">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                            <ArrowRightLeft className="size-4" /> Status Normalization Ledger
                         </CardTitle>
                         <CardDescription>Cross-provider status code mapping to Sovereign system states.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                         <div className="overflow-x-auto">
                            <Table>
                               <TableHeader>
                                  <TableRow className="border-white/5">
                                     <TableHead className="text-[10px] uppercase font-bold">Provider</TableHead>
                                     <TableHead className="text-[10px] uppercase font-bold">Gateway Code</TableHead>
                                     <TableHead className="text-[10px] uppercase font-bold">Raw Meaning</TableHead>
                                     <TableHead className="text-[10px] uppercase font-bold">Sovereign Normalization</TableHead>
                                  </TableRow>
                               </TableHeader>
                               <TableBody>
                                  {STATUS_MAPPINGS.map((m, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                                       <TableCell className="font-bold text-white text-xs">{m.provider}</TableCell>
                                       <TableCell className="font-mono text-primary text-xs">{m.code}</TableCell>
                                       <TableCell className="text-muted-foreground text-[10px] uppercase font-bold">{m.meaning}</TableCell>
                                       <TableCell>
                                          <Badge variant="outline" className={`text-[9px] uppercase ${m.system === 'APPROVED' ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500'}`}>
                                             {m.system}
                                          </Badge>
                                       </TableCell>
                                    </TableRow>
                                  ))}
                               </TableBody>
                            </Table>
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="builders" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-primary">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-primary">The Builders Roadmap</CardTitle>
                         <CardDescription>Path to NoorNexus Certification and Pilot Grants.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              { step: "1. Certification", desc: "Pass the HMAC_V4 Security audit.", icon: Award },
                              { step: "2. Pilot Grant", desc: "Apply for 500k Simulation Tokens.", icon: Zap },
                              { step: "3. Mainnet Launch", desc: "Deploy to 420+ Mesh Nodes.", icon: Rocket }
                            ].map((s, i) => (
                              <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                                 <s.icon className="size-6 text-primary" />
                                 <p className="text-[10px] font-bold text-white uppercase">{s.step}</p>
                                 <p className="text-[9px] text-muted-foreground">{s.desc}</p>
                              </div>
                            ))}
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="gateway" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-emerald-500">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-emerald-500">Universal Gateway Endpoints</CardTitle>
                         <CardDescription>Standardized API for Pilot and Institutional Partners.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                         <div className="divide-y divide-white/5">
                           {[
                             { method: "POST", path: "/partner/v1/handshake", desc: "Initiate RSA-signed session." },
                             { method: "POST", path: "/partner/v1/settle", desc: "Request atomic settlement." }
                           ].map((ep, i) => (
                             <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/2 transition-colors">
                               <div className="flex items-center gap-4">
                                 <Badge className="bg-primary text-[8px]">{ep.method}</Badge>
                                 <code className="text-xs font-mono text-white">{ep.path}</code>
                               </div>
                               <p className="text-[10px] text-muted-foreground uppercase">{ep.desc}</p>
                             </div>
                           ))}
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
                    <Award className="size-4" /> Mapping Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "We are documenting the translation layer between legacy finance and sovereign nodes. Integration speed: &lt; 2 hours per provider."
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 h-[450px] flex flex-col">
                <CardHeader className="shrink-0">
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Cpu className="size-4" /> Nora-03 Support
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
                         placeholder="Mapping query..." 
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
