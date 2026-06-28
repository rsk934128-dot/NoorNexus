
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Code2, 
  Terminal, 
  Zap, 
  Loader2, 
  ShieldCheck, 
  Menu, 
  Cpu, 
  Sparkles, 
  RefreshCcw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Database,
  History,
  Send,
  Braces,
  GitBranch,
  Settings,
  FileCode
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processArchitectConsultation, CodeExchangeOutput } from "@/ai/flows/code-exchange-flow"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CodeExchangePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<CodeExchangeOutput | null>(null)
  const [history, setHistory] = useState<any[]>([])

  async function handleConsultArchitect() {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    try {
      toast({ title: "Connecting to Architect Partner", description: "Pulsing Project #42 Handshake..." })
      
      const res = await processArchitectConsultation({
        prompt: query,
        targetModule: "Core Engine",
        context: "NoorNexus Sovereign OS v4.5 - Next.js 15 / React 19"
      })
      
      setResult(res)
      setHistory(prev => [{ title: query.substring(0, 30) + "...", status: res.status, hash: res.architectHash }, ...prev].slice(0, 10))
      
      toast({ 
        title: "Architect Analysis Finalized", 
        description: `Status: ${res.status}`,
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    } catch (e: any) {
      toast({ title: "Partner Sync Error", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20 overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-[10px]">
                   <Code2 className="size-3 mr-2" /> Project #42: Sheikh Code Exchange
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Sparkles className="size-3 mr-2" /> AI Architect Partner: ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Code <span className="text-primary">Exchange.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Active Collaboration for Technical Excellence." কমান্ডারের নির্দেশে আমি এখন আপনার কোড আর্কিটেক্ট পার্টনার হিসেবে কাজ করতে প্রস্তুত।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Collaboration Sync</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase flex items-center justify-center gap-2">
                     <CheckCircle2 className="size-5" /> 100%
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Input Section */}
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                    <Braces className="size-4 text-primary" /> Architect Handshake
                  </CardTitle>
                  <CardDescription>Share your code or architectural blueprints for real-time review.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="relative group">
                      <textarea 
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Paste code or describe architecture... (e.g. Optimize the HMAC_V4 handshake in node-sync.ts)" 
                        className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm font-mono text-primary outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground/30"
                      />
                      <Button 
                        onClick={handleConsultArchitect}
                        disabled={loading || !query}
                        className="absolute bottom-4 right-4 bg-primary text-primary-foreground font-bold h-12 px-8 uppercase tracking-widest gap-2 glow-primary"
                      >
                        {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                        Trigger Analysis
                      </Button>
                   </div>
                </CardContent>
              </Card>

              {/* Architect Dispatch */}
              {result && (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                  <Card className={`glass-card border-t-4 overflow-hidden ${result.status === 'STABLE' ? 'border-t-emerald-500' : 'border-t-amber-500'}`}>
                    <CardHeader className="bg-white/2 border-b border-white/5 py-4">
                       <div className="flex justify-between items-center">
                          <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                             <Cpu className="size-4" /> Nora-Architect Dispatch
                          </CardTitle>
                          <Badge className={`${result.status === 'STABLE' ? 'bg-emerald-500' : 'bg-amber-500'} text-black border-none text-[8px] h-5 font-bold`}>{result.status}</Badge>
                       </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                             <div className="p-6 bg-black/40 rounded-2xl border border-white/10 space-y-4">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Architect's Analysis</h4>
                                <p className="text-sm text-white/90 leading-relaxed italic whitespace-pre-wrap">"{result.analysis}"</p>
                             </div>
                             <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 space-y-4">
                                <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                   <ShieldCheck className="size-3" /> Security & Compliance
                                </h4>
                                <p className="text-xs text-emerald-100/80 leading-relaxed">{result.securityCheck}</p>
                             </div>
                          </div>
                          <div className="space-y-6">
                             <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Actionable Optimizations</h4>
                             <div className="grid grid-cols-1 gap-3">
                                {result.optimizationSuggestions.map((opt, i) => (
                                  <div key={i} className="flex items-center gap-3 p-4 bg-white/2 rounded-xl border border-white/5 hover:bg-primary/10 transition-colors group">
                                     <Zap className="size-4 text-primary shrink-0 group-hover:animate-pulse" />
                                     <p className="text-xs text-white/80">{opt}</p>
                                  </div>
                                ))}
                             </div>
                             <div className="pt-6 border-t border-white/5">
                                <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Architect Integrity Seal (HMAC_V4_ARC)</p>
                                <code className="text-[9px] text-primary font-mono block truncate bg-black/40 p-2 rounded">{result.architectHash}</code>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                        <GitBranch className="size-4" /> Staging Review Policy
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Architect suggestions must be reviewed in the staging node before being anchored to the Perpetual Ledger."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-primary/20 text-primary uppercase text-[9px] font-bold">STAGING_LOCKED</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-white flex items-center gap-2">
                        <History className="size-4" /> Exchange History
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {history.length === 0 && <p className="text-[10px] text-muted-foreground italic text-center py-4">No recent consultations.</p>}
                     {history.map((log, i) => (
                       <div key={i} className="p-2.5 bg-white/5 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-bold text-white uppercase truncate max-w-[120px]">{log.title}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">{log.status}</p>
                          </div>
                          <CheckCircle2 className="size-3 text-emerald-500 opacity-50 group-hover:opacity-100" />
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Database className="size-16 text-white" />
                  </div>
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Settings className="size-3" /> Core Sync
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="flex justify-between items-center text-[10px] font-mono mb-2 uppercase">
                        <span className="text-muted-foreground">Architect Latency</span>
                        <span className="text-emerald-500 font-bold">28ms</span>
                     </div>
                     <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
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
