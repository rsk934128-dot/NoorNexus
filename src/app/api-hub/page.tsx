
"use client"

import { useState, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Send, Loader2, 
  Menu, Cpu, 
  Key, 
  Rocket, 
  Link2, 
  Infinity, 
  Fingerprint, 
  FileCode, 
  LockKeyhole, 
  Braces, 
  Repeat, 
  UserCog,
  Zap,
  ShieldPlus,
  Lock
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
  const [isSandbox, setIsSandbox] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const generateKey = () => {
    const key = `${isSandbox ? 'SANDBOX' : 'ZENITH'}_SK_${Math.random().toString(16).substring(2, 32).toUpperCase()}`
    setApiKey(key)
    toast({ title: isSandbox ? "Sandbox Access Key Generated" : "Enterprise Bridge Secret Generated", description: "Store this securely in your vault." })
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
                "The Developer Passport to the Empire." এখন GhostRecap ZKP এপিআই এর মাধ্যমে এনক্রিপ্টেড ডাটা শেয়ারিং সম্ভব।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">API Reliability</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase">99.9%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              <Tabs defaultValue="ghostrecap" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
                  <TabsTrigger value="ghostrecap" className="gap-2 px-6"><Lock className="size-4" /> GhostRecap Vault</TabsTrigger>
                  <TabsTrigger value="onboarding-api" className="gap-2 px-6"><LockKeyhole className="size-4" /> Onboarding API</TabsTrigger>
                  <TabsTrigger value="quickstart" className="gap-2 px-6"><Zap className="size-4" /> Quick Start</TabsTrigger>
                </TabsList>

                <TabsContent value="ghostrecap" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                   <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                            <ShieldPlus className="size-4" /> GhostRecap: Zero-Knowledge Vault API
                         </CardTitle>
                         <CardDescription>Encrypt sensitive financial metadata before it leaves your node.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="p-5 bg-black rounded-xl border border-white/5 space-y-4">
                            <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto leading-relaxed">
{`// GhostRecap Payload Encryption
const secureData = await sheikh.ghostRecap.encrypt({
  beneficiary: 'Sheikh Farid',
  payoutAmount: 27300,
  currency: 'BDT',
  compliance: ['BNM', 'BB']
});

console.log('ZKP Hash:', secureData.hash);`}
                            </pre>
                         </div>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="onboarding-api" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-purple-500 flex items-center gap-2">
                            <Fingerprint className="size-4" /> Sovereign Onboarding API (v1.0)
                         </CardTitle>
                         <CardDescription>The Digital Passport for autonomous mesh connection.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="p-5 bg-black rounded-xl border border-white/5 space-y-4">
                            <pre className="text-[11px] text-purple-400 font-mono overflow-x-auto">
{`{
  "appId": "YOUR_${isSandbox ? 'SANDBOX' : 'ZENITH'}_KEY",
  "intent": "SOVEREIGN_MESH_CONNECTION",
  "securityTier": "L4",
  "signature": "HMAC_V4_ENCRYPTED_AUTH"
}`}
                            </pre>
                         </div>
                         <Button size="sm" onClick={generateKey} className="bg-purple-500 text-white font-bold uppercase text-[10px] gap-2">
                            <Braces className="size-3" /> Get API Key
                         </Button>
                      </CardContent>
                   </Card>
                </TabsContent>

                <TabsContent value="quickstart" className="space-y-6">
                   <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                            <Rocket className="size-4" /> 3-Step Integration
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-8">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              { step: "01", title: "API Handshake", desc: "Get your key from the 'API' tab." },
                              { step: "02", title: "Vault Sync", desc: "Initialize GhostRecap for metadata security." },
                              { step: "03", title: "Pulse Test", desc: "Verify connection with Sirajganj node." }
                            ].map((s, i) => (
                              <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                                 <p className="text-[10px] font-bold text-emerald-400 uppercase">{s.title}</p>
                                 <p className="text-[11px] text-muted-foreground italic">"{s.desc}"</p>
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
                    <Key className="size-4" /> Zenith Licensing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground italic">"White-channel licensing for RubelBank partners is now active."</p>
                   <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                         <span className="uppercase text-muted-foreground">License Tier</span>
                         <span className="text-white font-bold">ZENITH_L1</span>
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
                  <div className="relative pt-4 border-t border-white/5">
                     <input 
                       placeholder="Ask about GhostRecap..." 
                       value={query}
                       onChange={e => setQuery(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && askNora()}
                       className="w-full bg-background/50 border border-white/10 text-xs h-12 pr-12 pl-4 rounded-md outline-none"
                     />
                     <div onClick={askNora} className="absolute right-1 bottom-1 text-primary size-10 flex items-center justify-center cursor-pointer">
                        {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
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
