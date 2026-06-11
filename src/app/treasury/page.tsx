
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  Coins, 
  Zap, 
  Loader2, 
  Menu,
  BrainCircuit,
  ArrowRightLeft,
  Banknote,
  ArrowDownToLine,
  CheckCircle2,
  Database,
  Globe,
  PieChart,
  LineChart,
  TrendingUp,
  History,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Flame,
  Radio
} from "lucide-react"
import { authorizeWithdrawal, OffRampOutput } from "@/ai/flows/off-ramp-flow"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { checkCircuitBreaker, setCircuitBreaker } from "@/services/pay-bridge"

export default function TreasuryPage() {
  const { toast } = useToast()
  const [withdrawing, setWithdrawing] = useState(false)
  const [offRampResult, setOffRampResult] = useState<OffRampOutput | null>(null)
  const [isOperational, setIsOperational] = useState(false)
  const [cbActive, setCbActive] = useState(false)
  
  const [withdrawForm, setWithdrawForm] = useState({
    amount: 1000,
    method: "BANK_TRANSFER" as any,
    destination: "Sovereign Node Bridge",
    asset: "USDC"
  })

  useEffect(() => {
    setCbActive(checkCircuitBreaker());
  }, []);

  const toggleCircuitBreaker = () => {
    const newState = !cbActive;
    setCbActive(newState);
    setCircuitBreaker(newState);
    toast({
      title: newState ? "TREASURY LOCKDOWN" : "TREASURY RESTORED",
      description: newState ? "All outgoing payouts are suspended." : "Normal operations resumed.",
      variant: newState ? "destructive" : "default"
    });
  }

  const CURRENCIES = [
    { code: "USD", flag: "🇺🇸", balance: "420,000", trend: "+2.1%" },
    { code: "BDT", flag: "🇧🇩", balance: "12,500,000", trend: "+5.4%" },
    { code: "AED", flag: "🇦🇪", balance: "850,000", trend: "+1.2%" },
    { code: "EUR", flag: "🇪🇺", balance: "140,000", trend: "-0.4%" }
  ]

  async function handleWithdraw() {
    if (cbActive) {
      toast({ title: "Operation Blocked", description: "Circuit breaker is active.", variant: "destructive" });
      return;
    }
    setWithdrawing(true)
    try {
      const result = await authorizeWithdrawal({ ...withdrawForm, ownerTier: 'IMPERIAL' })
      setOffRampResult(result)
      toast({ title: "Treasury Handshake Executed" })
    } catch (e: any) {
      toast({ title: "Bridge Failure", variant: "destructive" })
    } finally {
      setWithdrawing(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary"><Button variant="ghost" size="icon"><Menu className="size-6" /></Button></SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-[10px]">
                   <Database className="size-3 mr-2" /> Sovereign Treasury
                 </Badge>
              </div>
              <h2 className="text-2xl sm:text-5xl font-headline font-bold flex items-center gap-3 uppercase tracking-tighter">
                Operational <span className="text-primary">Resilience.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Phase P2: Real-time Volatility Monitor & Operational Fortress. Treasury Protection Mode is ACTIVE.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={toggleCircuitBreaker}
                className={`h-14 px-8 font-bold uppercase tracking-widest gap-3 transition-all duration-500 ${cbActive ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-destructive hover:bg-destructive/90 text-white glow-destructive'}`}
               >
                 {cbActive ? <Zap className="size-5" /> : <Flame className="size-5" />}
                 {cbActive ? 'Restore Treasury' : 'Emergency Lockdown'}
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              {/* Resilience Monitor */}
              <section className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <Radio className="size-4" /> Resilience Observatory
                    </h3>
                    <Badge variant="outline" className={`h-6 text-[8px] ${cbActive ? 'border-destructive text-destructive bg-destructive/5' : 'border-emerald-500 text-emerald-500 bg-emerald-500/5'}`}>
                      {cbActive ? 'SYSTEM_LOCKED' : 'SYSTEM_STABLE'}
                    </Badge>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Vol. Velocity", value: "Normal", trend: "0.2%", status: "STABLE" },
                      { label: "Recon. Health", value: "Matched", trend: "100%", status: "OPTIMAL" },
                      { label: "Audit Integrity", value: "Signed", trend: "MAX", status: "VERIFIED" },
                      { label: "Risk Exposure", value: "Minimal", trend: "2.4%", status: "SECURE" }
                    ].map((m, i) => (
                      <Card key={i} className="glass-card bg-primary/5 border-white/5">
                        <CardContent className="p-6 space-y-3">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">{m.label}</p>
                           <p className="text-xl font-headline font-bold text-white uppercase">{m.value}</p>
                           <div className="flex justify-between items-center pt-2">
                              <span className="text-[9px] font-mono text-emerald-500">{m.trend}</span>
                              <Badge className="bg-white/5 border-none text-[7px] text-muted-foreground uppercase">{m.status}</Badge>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className={`glass-card border-l-4 transition-opacity duration-500 ${cbActive ? 'opacity-50 pointer-events-none border-l-muted' : 'border-l-primary'}`}>
                  <CardHeader>
                    <CardTitle className="text-sm font-headline flex items-center gap-2 uppercase text-primary">
                      <ArrowDownToLine className="size-4" /> Settlement Bridge
                    </CardTitle>
                    <CardDescription>Initiate atomic transfer to pilot nodes.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {cbActive && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-[10px] font-bold uppercase text-center">
                         Treasury Lockdown Active: Outbound Payouts Restricted.
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Source Asset</Label>
                          <Select value={withdrawForm.asset} onValueChange={v => setWithdrawForm({...withdrawForm, asset: v})}>
                            <SelectTrigger className="bg-background/50 border-white/10 text-[10px] h-10"><SelectValue /></SelectTrigger>
                            <SelectContent>
                               {CURRENCIES.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}
                               <SelectItem value="USDC">USDC (Stable)</SelectItem>
                            </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Volume</Label>
                          <Input type="number" value={withdrawForm.amount} onChange={e => setWithdrawForm({...withdrawForm, amount: parseInt(e.target.value) || 0})} className="bg-background/50 border-white/10 font-bold h-10" />
                       </div>
                    </div>
                    <Button onClick={handleWithdraw} disabled={withdrawing || cbActive} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary">
                      {withdrawing ? <Loader2 className="size-4 animate-spin" /> : <Banknote className="size-5 mr-2" />}
                      Authorize Settlement
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Resilience Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { item: "Circuit Breaker Latency", status: "2ms" },
                      { item: "Audit Log Immutability", status: "ENFORCED" },
                      { item: "Reconciliation Threshold", status: "0.01%" },
                      { item: "Evidence Vault Sync", status: "REAL-TIME" }
                    ].map((check, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-black/40 rounded border border-white/5">
                         <span className="text-[9px] text-white font-bold uppercase">{check.item}</span>
                         <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500 font-mono">{check.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <History className="size-4" /> Forensic History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-3">
                      {[
                        { event: "Circuit Breaker Scan", time: "1m ago", status: "STABLE" },
                        { event: "Audit Ledger Signed", time: "5m ago", status: "MAX" },
                        { event: "Gateway Ping Sync", time: "12m ago", status: "OPTIMAL" }
                      ].map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px] p-2 border-b border-white/5">
                           <span className="text-muted-foreground uppercase">{h.event}</span>
                           <span className="text-white font-mono">{h.time}</span>
                        </div>
                      ))}
                   </div>
                   <Button variant="ghost" className="w-full h-8 text-[9px] uppercase font-bold gap-2">
                      View Immutable Logs <ExternalLink className="size-3" />
                   </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-destructive bg-destructive/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-destructive flex items-center gap-2">
                       <ShieldAlert className="size-3" /> Risk Guard
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Resilience mode prevents unauthorized liquidity drain. In case of anomaly, the system uses zero-trust handshakes for all cross-border settlements."
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
