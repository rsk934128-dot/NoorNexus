"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Fingerprint, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  Cpu, 
  Lock, 
  Activity, 
  RefreshCcw,
  History,
  Trash2,
  PauseCircle,
  PlayCircle,
  CreditCard,
  Key
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { provisionAmexToken, updateAmexTokenStatus } from "@/services/amex-token-service"
import { consultTokenStrategist, TokenStrategyOutput } from "@/ai/flows/amex-token-strategy-flow"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AmexTokenHubPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [strategy, setStrategy] = useState<TokenStrategyOutput | null>(null)
  const [tokens, setTokens] = useState<any[]>([])

  const [form, setForm] = useState({
    pan: "371234567890123",
    expiry: "12/30",
    name: "Sheikh Farid",
    context: "Sovereign Cloud Settlement"
  })

  async function handleConsultAI() {
    setLoading(true)
    try {
      const result = await consultTokenStrategist({
        cardType: "Imperial Business",
        transactionContext: form.context,
        userTrustScore: 98
      })
      setStrategy(result)
      toast({ title: "Neural Token Strategy Dispatched" })
    } catch (e: any) {
      toast({ title: "Strategist Offline", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleProvision() {
    if (!strategy) return
    setLoading(true)
    try {
      const [month, year] = form.expiry.split('/')
      const result = await provisionAmexToken({
        account_number: form.pan,
        expiry_month: parseInt(month),
        expiry_year: 2000 + parseInt(year),
        user_id: "IMPERIAL_ROOT_01",
        email: "farid@noornexus.sovereign",
        name: form.name
      })
      setTokens([result, ...tokens])
      toast({ title: "Token Provisioned", description: `Ref: ${result.token_ref_id.substring(0, 10)}...` })
    } catch (e: any) {
      toast({ title: "Provisioning Failed", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusUpdate(id: string, type: 'resume' | 'suspend' | 'delete') {
    setLoading(true)
    try {
      await updateAmexTokenStatus(id, type)
      if (type === 'delete') {
        setTokens(tokens.filter(t => t.token_ref_id !== id))
      }
      toast({ title: `Token ${type.toUpperCase()}ED` })
    } catch (e: any) {
      toast({ title: "Update Failed", variant: "destructive" })
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
                   <Key className="size-3 mr-2" /> Sovereign AETS Hub
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Token <span className="text-primary">Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 400: Global Tokenization Engine. Securing card credentials using American Express Token Service protocols and Nora-21 Neural Strategy.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Vault Integrity</p>
                  <p className="text-xl font-headline font-bold text-emerald-500 uppercase flex items-center gap-2 justify-center">
                    <ShieldCheck className="size-4" /> SECURE_L4
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Provisioning Module */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Fingerprint className="size-4" /> Provision Digital Token
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                       <CardHeader>
                          <CardTitle className="text-sm font-headline uppercase text-white">Card Credentials</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-4">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Account Number (PAN)</Label>
                             <Input 
                                value={form.pan} 
                                onChange={e => setForm({...form, pan: e.target.value})}
                                className="bg-background/50 border-white/10 font-mono tracking-widest" 
                             />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Expiry (MM/YY)</Label>
                                <Input 
                                   value={form.expiry} 
                                   onChange={e => setForm({...form, expiry: e.target.value})}
                                   className="bg-background/50 border-white/10" 
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Embossed Name</Label>
                                <Input 
                                   value={form.name} 
                                   onChange={e => setForm({...form, name: e.target.value})}
                                   className="bg-background/50 border-white/10" 
                                />
                             </div>
                          </div>
                          <Button 
                            onClick={handleConsultAI} 
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] h-10 glow-primary"
                          >
                             {loading ? <Loader2 className="size-3 animate-spin mr-2" /> : <Cpu className="size-3 mr-2" />}
                             Consult Nora-21 Strategy
                          </Button>
                       </CardContent>
                    </Card>

                    <Card className={`glass-card border-t-4 transition-all duration-500 ${strategy ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                       <CardHeader>
                          <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                             <Lock className="size-4" /> Nora-21 Deployment
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-6">
                          {strategy ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                               <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                                  <div className="flex justify-between items-center">
                                     <span className="text-[9px] text-muted-foreground uppercase font-bold">Recommendation</span>
                                     <Badge className="bg-emerald-500">{strategy.recommendation}</Badge>
                                  </div>
                                  <p className="text-[10px] text-emerald-100 italic leading-relaxed">"{strategy.tacticalJustification}"</p>
                               </div>
                               <div className="flex justify-between items-center text-[10px] uppercase font-bold text-muted-foreground">
                                  <span>Risk Assessment</span>
                                  <span className={strategy.riskScore < 30 ? 'text-emerald-500' : 'text-amber-500'}>{strategy.riskScore}/100</span>
                               </div>
                               <Button 
                                 onClick={handleProvision}
                                 disabled={loading || strategy.recommendation === 'REJECT_INSECURE'}
                                 className="w-full bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest glow-emerald"
                               >
                                  {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                                  Execute Tokenization
                               </Button>
                            </div>
                          ) : (
                            <div className="h-[150px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                               <Fingerprint className="size-10 text-primary animate-pulse" />
                               <p className="text-[10px] font-mono uppercase tracking-widest">Awaiting Pulse Analysis</p>
                            </div>
                          )}
                       </CardContent>
                    </Card>
                 </div>
              </section>

              {/* Active Tokens Ledger */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <History className="size-4" /> Active Token Registry
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tokens.length === 0 && <p className="text-xs text-muted-foreground italic py-10 text-center col-span-2">No active tokens in vault.</p>}
                    {tokens.map((token, i) => (
                      <Card key={i} className="glass-card bg-white/2 border-white/5 hover:border-primary/20 transition-all group">
                        <CardContent className="p-5 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-primary uppercase">Token Ref ID</p>
                                 <p className="text-xs font-mono text-white">{token.token_ref_id.substring(0, 16)}...</p>
                              </div>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">ACTIVE</Badge>
                           </div>
                           <div className="grid grid-cols-2 gap-4 py-2 border-y border-white/5">
                              <div>
                                 <p className="text-[8px] text-muted-foreground uppercase">Linked Account</p>
                                 <p className="text-xs font-bold text-white">•••• {token.account_metadata.display_account_number}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[8px] text-muted-foreground uppercase">Product</p>
                                 <p className="text-xs font-bold text-primary uppercase">{token.account_metadata.product_short_name}</p>
                              </div>
                           </div>
                           <div className="flex gap-2">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-amber-500 hover:bg-amber-500/10" onClick={() => handleStatusUpdate(token.token_ref_id, 'suspend')}>
                                 <PauseCircle className="size-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-500 hover:bg-emerald-500/10" onClick={() => handleStatusUpdate(token.token_ref_id, 'resume')}>
                                 <PlayCircle className="size-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleStatusUpdate(token.token_ref_id, 'delete')}>
                                 <Trash2 className="size-4" />
                              </Button>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <Activity className="size-4" /> Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">AETS Connection</p>
                     <p className="text-3xl font-headline font-bold text-white">OPTIMAL</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    {[
                      { label: "Handshake Protocol", val: "HMAC_V4" },
                      { label: "Request ID", val: "AA3434342323" },
                      { label: "TSP Sync", val: "ESTABLISHED" }
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                         <span className="text-muted-foreground uppercase">{s.label}</span>
                         <span className="text-white font-bold">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <CreditCard className="size-4" /> Account Metadata
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 relative overflow-hidden h-32">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Fingerprint className="size-16 text-primary" />
                       </div>
                       <p className="text-lg font-headline font-bold text-white tracking-[0.2em]">•••• •••• •••• 2008</p>
                       <p className="text-[10px] text-muted-foreground uppercase mt-4">Sovereign Gold Card</p>
                       <div className="flex justify-between items-end mt-1">
                          <p className="text-[9px] font-mono text-white">EXP: 05/20</p>
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">VERIFIED</Badge>
                       </div>
                    </div>
                 </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ShieldCheck className="size-3" /> Token Policy: ENFORCED
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "All token metadata is anchored to the One Engine Ledger. Outbound notifications are monitored by Nora-01 for zero-drift compliance."
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
