"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Globe, 
  ArrowRightLeft, 
  Zap, 
  Loader2, 
  ShieldCheck, 
  Lock, 
  Menu, 
  Activity, 
  ExternalLink,
  Cpu,
  History,
  Link as LinkIcon,
  ChevronRight,
  TrendingUp,
  Coins
} from "lucide-react"
import { executeCrossChainBridge, CrossChainGatewayOutput } from "@/ai/flows/cross-chain-gateway-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

const NETWORKS = [
  { id: "noornexus", name: "NoorNexus Mesh (Native)", color: "text-primary" },
  { id: "ethereum", name: "Ethereum Mainnet", color: "text-blue-400" },
  { id: "solana", name: "Solana Network", color: "text-emerald-400" },
  { id: "polygon", name: "Polygon PoS", color: "text-purple-400" }
]

export default function CrossChainPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CrossChainGatewayOutput | null>(null)
  const [history, setHistory] = useState<any[]>([])

  const [form, setForm] = useState({
    sourceChain: "noornexus",
    targetChain: "ethereum",
    asset: "USDC",
    amount: 1000,
    destinationAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  })

  async function handleBridge() {
    if (!form.destinationAddress || form.amount <= 0) {
      toast({ title: "Validation Error", description: "Invalid bridge parameters.", variant: "destructive" });
      return;
    }

    setLoading(true)
    setResult(null)
    try {
      const bridgeOutput = await executeCrossChainBridge(form)
      setResult(bridgeOutput)
      
      if (bridgeOutput.status === 'APPROVED') {
        setHistory(prev => [{
          ...form,
          timestamp: Date.now(),
          txHash: bridgeOutput.transactionHash || "0x_MOCK_HASH_" + Math.random().toString(16).substring(2, 10),
          status: "SUCCESS"
        }, ...prev].slice(0, 10))
        
        toast({ title: "Bridge Finalized", description: "Asset successfully migrated to target chain." });
      }
    } catch (e: any) {
      toast({ title: "Bridge Failure", description: e.message, variant: "destructive" });
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
                   <LinkIcon className="size-10 text-primary" />
                   Cross-Chain Gateway
                 </h2>
              </div>
              <p className="text-muted-foreground">Mission 400: Universal Value Settlement across Blockchain Ecosystems.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2">
                 <Globe className="size-4 animate-spin-slow" /> INTEROPERABILITY_L4_ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bridge Terminal */}
                <Card className="glass-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <ArrowRightLeft className="size-32 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <Zap className="size-4" /> Bridge Terminal
                    </CardTitle>
                    <CardDescription>Atomic swap logic for cross-network migration.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Source Network</Label>
                        <Select value={form.sourceChain} onValueChange={(v) => setForm({...form, sourceChain: v})}>
                          <SelectTrigger className="bg-background/50 border-white/10 font-mono text-xs h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {NETWORKS.map(n => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Target Network</Label>
                        <Select value={form.targetChain} onValueChange={(v) => setForm({...form, targetChain: v})}>
                          <SelectTrigger className="bg-background/50 border-white/10 font-mono text-xs h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {NETWORKS.map(n => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Asset</Label>
                        <Input value={form.asset} onChange={e => setForm({...form, asset: e.target.value})} className="bg-background/50 border-white/10 font-bold uppercase h-12" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Amount</Label>
                        <div className="relative">
                           <Input type="number" value={form.amount} onChange={e => setForm({...form, amount: parseFloat(e.target.value) || 0})} className="bg-background/50 border-white/10 font-headline text-lg h-12 pl-12" />
                           <Coins className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Destination Wallet Address</Label>
                      <Input value={form.destinationAddress} onChange={e => setForm({...form, destinationAddress: e.target.value})} className="bg-background/50 border-white/10 font-mono text-xs h-12" placeholder="0x..." />
                    </div>

                    <Button 
                      onClick={handleBridge} 
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    >
                      {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <ArrowRightLeft className="size-5 mr-2" />}
                      {loading ? "Authorizing Swap..." : "Initiate Atomic Bridge"}
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Bridge Reasoning */}
                <div className="space-y-6">
                  <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${result ? (result.status === 'APPROVED' ? 'border-t-emerald-500' : 'border-t-destructive') : 'border-t-primary'}`}>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg flex items-center gap-2 uppercase">
                        <Cpu className="size-5 text-primary" />
                        Nora-05 Bridge Logic
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {result ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95">
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                             <h4 className="text-[10px] font-bold uppercase text-primary">Cross-Chain Assessment</h4>
                             <p className="text-xs text-muted-foreground leading-relaxed italic">
                               "{result.riskAssessment}"
                             </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">Swap Rate</p>
                                <p className="text-lg font-headline font-bold text-white">1:{result.swapRate}</p>
                             </div>
                             <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">Est. Finality</p>
                                <p className="text-lg font-headline font-bold text-emerald-500">{result.estimatedTimeSeconds}s</p>
                             </div>
                          </div>

                          <div className="p-3 bg-black/40 rounded border border-white/5">
                             <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">HMAC_V4 Bridge Intent Signature</p>
                             <p className="text-[9px] font-mono text-primary break-all">{result.bridgeSignature}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                          <Activity className="size-16 text-primary animate-pulse" />
                          <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                            Await Bridge Dispatch.<br/>Configure terminal to initiate.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Network Topology & Liquidity Pools */}
              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                       <TrendingUp className="size-4" /> Global Liquidity Mesh
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {NETWORKS.map(n => (
                      <div key={n.id} className="p-4 bg-white/2 border border-white/5 rounded-xl space-y-2">
                         <p className={`text-[9px] font-bold uppercase ${n.color}`}>{n.name}</p>
                         <div className="flex justify-between items-end">
                            <p className="text-lg font-headline font-bold text-white">${(Math.random() * 50 + 10).toFixed(1)}M</p>
                            <Badge variant="outline" className="text-[7px] border-white/10">HEALTHY</Badge>
                         </div>
                         <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${Math.random() * 40 + 60}%` }} />
                         </div>
                      </div>
                    ))}
                 </CardContent>
              </Card>
            </div>

            {/* Bridge History Sidebar */}
            <div className="space-y-6">
              <Card className="glass-card h-fit flex flex-col min-h-[600px]">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <History className="size-4" /> Migration History
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-[550px] px-6">
                    <div className="space-y-4 pb-6">
                      {history.length === 0 && (
                        <p className="text-[10px] text-muted-foreground text-center py-10 italic">No recent migrations.</p>
                      )}
                      {history.map((tx, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 hover:bg-white/10 transition-all cursor-default">
                           <div className="flex justify-between items-center">
                              <Badge className="text-[7px] bg-emerald-500/20 text-emerald-500 border-none h-4">SUCCESS</Badge>
                              <span className="text-[8px] font-mono text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                           </div>
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-white uppercase">{tx.asset}</span>
                              <span className="text-[10px] font-headline font-bold text-primary">{tx.amount.toLocaleString()}</span>
                           </div>
                           <div className="flex items-center gap-1 text-[8px] text-muted-foreground font-mono">
                              <span className="uppercase">{tx.sourceChain}</span>
                              <ChevronRight className="size-2" />
                              <span className="uppercase">{tx.targetChain}</span>
                           </div>
                           <div className="pt-1 flex items-center justify-between border-t border-white/5">
                              <span className="text-[7px] font-mono text-muted-foreground truncate w-24">{tx.txHash}</span>
                              <ExternalLink className="size-2 text-primary/50" />
                           </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ShieldCheck className="size-3" /> Zero-Trust Bridge Policy
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       All cross-chain migrations require a 12-node consensus confirmation before asset release from the Sovereign Vault.
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
