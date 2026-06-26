
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
  Clock
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
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Discovery <span className="text-purple-500">Hub.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Scaling the Empire." নূরনেক্সাস এখন তার ইনফ্রাস্ট্রাকচারকে বাইরের এন্টারপ্রাইজ পার্টনারদের জন্য উন্মুক্ত করছে—কিন্তু আমাদের সার্বভৌম শর্তে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Integration Speed</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase flex items-center gap-2 justify-center">
                    <Clock className="size-5" /> &lt; 3.0s
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <Tabs defaultValue="bridge" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger value="bridge" className="gap-2"><Network className="size-4" /> Enterprise Bridge</TabsTrigger>
                  <TabsTrigger value="docs" className="gap-2"><BookOpen className="size-4" /> Discovery Protocol</TabsTrigger>
                  <TabsTrigger value="keys" className="gap-2"><Key className="size-4" /> Zenith Keys</TabsTrigger>
                </TabsList>

                <TabsContent value="bridge" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                   <Card className="glass-card border-l-4 border-l-purple-500">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-purple-500 flex items-center gap-2">
                            <Activity className="size-4" /> PaaS Scalability Engine (Project #160)
                         </CardTitle>
                         <CardDescription>Optimized snippet for sub-3-second enterprise integration.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 space-y-3">
                               <h4 className="text-[10px] font-bold uppercase text-white">Endpoint: PaaS Prediction</h4>
                               <p className="text-[9px] text-muted-foreground italic">"Compute failure probabilities via Sovereign Grid weights."</p>
                               <code className="text-[10px] text-purple-400 block bg-black p-2 rounded">POST /v1/paas/predict</code>
                            </div>
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 space-y-3">
                               <h4 className="text-[10px] font-bold uppercase text-white">Endpoint: Zenith Verify</h4>
                               <p className="text-[9px] text-muted-foreground italic">"Verify HMAC_V4_Q packet integrity for external meshes."</p>
                               <code className="text-[10px] text-purple-400 block bg-black p-2 rounded">POST /v1/paas/verify</code>
                            </div>
                         </div>

                         <div className="p-6 bg-purple-500/5 rounded-xl border border-dashed border-purple-500/20">
                            <div className="flex justify-between items-center">
                               <div className="space-y-1">
                                  <p className="text-xs font-bold text-white uppercase">NoorNexus Sovereign Snippet</p>
                                  <p className="text-[10px] text-emerald-400 font-bold">Latency Guarantee: &lt; 2.8s integration ready.</p>
                               </div>
                               <Button size="sm" className="bg-purple-500 text-white font-bold text-[10px] uppercase h-8">
                                  Copy Snippet
                               </Button>
                            </div>
                            <pre className="mt-4 p-4 bg-black rounded text-[10px] text-emerald-400 font-mono overflow-x-auto">
{`<script src="https://cdn.noornexus.sovereign/v1/core.js" async></script>
<script>
  sheikh.init({ appId: 'YOUR_ZENITH_KEY', speed: 'ZENITH_TURBO' });
</script>`}
                            </pre>
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="keys" className="space-y-6">
                   <Card className="glass-card">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-primary">Zenith Key Management</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="p-6 bg-black/40 rounded-xl border border-dashed border-white/20 text-center space-y-4">
                            {!apiKey ? (
                              <Button onClick={generateKey} className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12">
                                <Zap className="size-4 mr-2" /> Generate Zenith Key
                              </Button>
                            ) : (
                              <div className="space-y-2">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Your Secret Zenith Key</p>
                                <code className="text-lg font-mono text-emerald-500 bg-black p-4 rounded block break-all">{apiKey}</code>
                                <p className="text-[8px] text-destructive uppercase font-bold animate-pulse">Never share this key. It grants Zenith L1 access to the mesh.</p>
                              </div>
                            )}
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
