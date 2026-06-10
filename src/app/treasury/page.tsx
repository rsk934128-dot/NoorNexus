
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  ArrowUpRight, 
  Coins, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Loader2, 
  PieChart, 
  Menu,
  FileText,
  AlertCircle,
  BrainCircuit,
  ArrowRightLeft,
  RefreshCcw,
  TrendingUp,
  Target,
  Banknote,
  WalletCards,
  ArrowDownToLine,
  Smartphone,
  CreditCard,
  History,
  CheckCircle2,
  Lock
} from "lucide-react"
import { ledgerAudit, LedgerAuditOutput } from "@/ai/flows/ledger-audit-flow"
import { authorizeWithdrawal, OffRampOutput } from "@/ai/flows/off-ramp-flow"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { runLiquidityRebalance } from "@/services/liquidity-service"
import { LiquidityOptimizerOutput } from "@/ai/flows/liquidity-optimizer-flow"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { collection, addDoc, query, orderBy, limit, serverTimestamp } from "firebase/firestore"

export default function TreasuryPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [auditing, setAuditing] = useState(false)
  const [optimizing, setOptimizing] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [auditData, setAuditData] = useState<LedgerAuditOutput | null>(null)
  const [optimizationData, setOptimizationData] = useState<LiquidityOptimizerOutput | null>(null)
  const [offRampResult, setOffRampResult] = useState<OffRampOutput | null>(null)
  const [liquidity, setLiquidity] = useState(98.4)

  // Real-time withdrawals history
  const { data: withdrawals } = useCollection<any>(
    query(collection(db, "withdrawals"), orderBy("timestamp", "desc"), limit(10))
  )

  const [withdrawForm, setWithdrawForm] = useState({
    amount: 1000,
    method: "BANK_TRANSFER" as any,
    destination: "BRAC Bank - 1234567890",
    asset: "Sovereign-USDC"
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiquidity(prev => {
        const drift = (Math.random() * 0.2) - 0.1
        return Math.min(100, Math.max(90, prev + drift))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  async function handleWithdraw() {
    if (!user) return
    setWithdrawing(true)
    setOffRampResult(null)
    try {
      const result = await authorizeWithdrawal({
        ...withdrawForm,
        ownerTier: 'IMPERIAL' // Mocking for commander
      })
      setOffRampResult(result)

      if (result.status !== 'REJECTED') {
        await addDoc(collection(db, "withdrawals"), {
          ...withdrawForm,
          ...result,
          withdrawalId: 'WTH-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          timestamp: Date.now(),
          owner: user.email,
          updatedAt: serverTimestamp()
        })
        toast({ title: "Off-Ramp Authorized", description: `Converted to ${result.convertedAmount} ${result.localCurrency}` })
      }
    } catch (e: any) {
      toast({ title: "Off-Ramp Failure", description: e.message, variant: "destructive" })
    } finally {
      setWithdrawing(false)
    }
  }

  async function runImperialAudit() {
    setAuditing(true)
    try {
      const result = await ledgerAudit({
        totalVolume: 420000000,
        settlementQueue: 1240000,
        liquidityHealth: liquidity,
        dailyThroughput: 15600000
      })
      setAuditData(result)
      toast({
        title: "Treasury Audit Complete",
        description: `Status: ${result.auditStatus} | Integrity: ${result.securityScore}%`,
      })
    } catch (e: any) {
      toast({
        title: "Audit Link Failure",
        description: e.message,
        variant: "destructive"
      })
    } finally {
      setAuditing(false)
    }
  }

  async function handleOptimize() {
    setOptimizing(true)
    setOptimizationData(null)
    try {
      const result = await runLiquidityRebalance({
        usdc: 210000000,
        bdt: 140000000,
        gold: 70000000,
        throughput: 15600000,
        pending: 1240000
      })
      setOptimizationData(result)
      toast({
        title: "Optimization Complete",
        description: `Efficiency Score: ${result.efficiencyScore}%`,
      })
    } catch (e: any) {
      toast({
        title: "Optimizer Link Failure",
        description: e.message,
        variant: "destructive"
      })
    } finally {
      setOptimizing(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Wallet className="size-10 text-primary" />
                   Sovereign Treasury
                 </h2>
              </div>
              <p className="text-muted-foreground">Global Multi-Ledger Liquidity & Stablecoin Reserves Management.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <ShieldCheck className="size-4" /> RESERVE_L4_VERIFIED
               </Badge>
               <Button 
                onClick={runImperialAudit} 
                disabled={auditing}
                className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-10 glow-primary"
               >
                 {auditing ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                 Force Audit
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Total Sovereign Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-headline font-bold text-white">$420,000,000</div>
                    <div className="flex items-center gap-2 mt-2 text-emerald-500 text-[10px] font-bold">
                      <ArrowUpRight className="size-3" /> +2.4% THIS CYCLE
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Liquidity Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-3xl font-headline font-bold text-emerald-500">{liquidity.toFixed(1)}%</div>
                    <Progress value={liquidity} className="h-1 bg-white/5" />
                  </CardContent>
                </Card>

                <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Settlement Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-headline font-bold text-amber-500">$1,240,000</div>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground text-[10px] font-mono">
                      <Activity className="size-3" /> T+1 AUTO-SETTLE ACTIVE
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sovereign Off-Ramp Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-l-4 border-l-emerald-500">
                  <CardHeader>
                    <CardTitle className="text-lg font-headline flex items-center gap-2 uppercase text-emerald-500">
                      <ArrowDownToLine className="size-5" /> Sovereign Off-Ramp
                    </CardTitle>
                    <CardDescription>Withdraw digital wealth to local currency or accounts.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Withdrawal Method</Label>
                          <Select value={withdrawForm.method} onValueChange={v => setWithdrawForm({...withdrawForm, method: v})}>
                            <SelectTrigger className="bg-background/50 border-white/10 font-mono text-xs">
                               <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="BANK_TRANSFER">Bank Transfer (Halal)</SelectItem>
                               <SelectItem value="MOBILE_BANKING">Mobile Banking (bKash/Nagad)</SelectItem>
                               <SelectItem value="DIGITAL_CARD">Virtual Visa/Mastercard</SelectItem>
                               <SelectItem value="BILL_PAY">Direct Bill Payment</SelectItem>
                            </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Volume to Off-Ramp</Label>
                          <div className="relative">
                             <Input type="number" value={withdrawForm.amount} onChange={e => setWithdrawForm({...withdrawForm, amount: parseInt(e.target.value) || 0})} className="bg-background/50 border-white/10 font-bold h-10 pl-10" />
                             <Coins className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-bold uppercase text-muted-foreground">Destination Account Info</Label>
                       <Input value={withdrawForm.destination} onChange={e => setWithdrawForm({...withdrawForm, destination: e.target.value})} className="bg-background/50 border-white/10 font-mono text-xs h-10" placeholder="Bank name, AC Number, Phone, etc." />
                    </div>
                    <Button 
                      onClick={handleWithdraw} 
                      disabled={withdrawing || withdrawForm.amount <= 0}
                      className="w-full bg-emerald-500 text-emerald-foreground font-bold uppercase tracking-widest h-14 glow-emerald"
                    >
                      {withdrawing ? <Loader2 className="size-5 animate-spin mr-2" /> : <Banknote className="size-5 mr-2" />}
                      {withdrawing ? "Verifying Handshake..." : "Execute Withdrawal"}
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                   <Card className={`glass-card min-h-[350px] border-t-4 transition-all duration-500 ${offRampResult ? (offRampResult.status === 'AUTHORIZED' ? 'border-t-emerald-500' : 'border-t-amber-500') : 'border-t-primary'}`}>
                      <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                           <BrainCircuit className="size-4" /> Nora-12 Off-Ramp Audit
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {offRampResult ? (
                          <div className="space-y-6 animate-in fade-in zoom-in-95">
                             <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-3">
                                <div className="flex justify-between items-end">
                                   <div className="space-y-1">
                                      <p className="text-[9px] text-muted-foreground uppercase font-bold">Payout Amount</p>
                                      <p className="text-3xl font-headline font-bold text-emerald-500">{offRampResult.convertedAmount.toLocaleString()} {offRampResult.localCurrency}</p>
                                   </div>
                                   <Badge className="bg-emerald-500 mb-1">{offRampResult.status}</Badge>
                                </div>
                                <p className="text-[10px] text-muted-foreground leading-relaxed italic">"{offRampResult.reasoning}"</p>
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded border border-white/5">
                                   <p className="text-[8px] text-muted-foreground uppercase">Network Fee</p>
                                   <p className="text-xs font-bold text-white">${offRampResult.fee}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded border border-white/5 text-right">
                                   <p className="text-[8px] text-muted-foreground uppercase">Estimated Arrival</p>
                                   <p className="text-xs font-bold text-white">{offRampResult.eta}</p>
                                </div>
                             </div>
                             <div className="p-3 bg-black/40 rounded border border-white/5">
                                <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">HMAC_V4 Security Seal</p>
                                <p className="text-[9px] font-mono text-primary truncate">{offRampResult.securitySignature}</p>
                             </div>
                          </div>
                        ) : (
                          <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                             <WalletCards className="size-16 text-primary animate-pulse" />
                             <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                                Await Payout Dispatch.<br/>Configure terminal to initiate.
                             </p>
                          </div>
                        )}
                      </CardContent>
                   </Card>
                </div>
              </div>

              {/* AI Liquidity Optimizer Section */}
              <Card className="glass-card border-l-4 border-l-amber-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <BrainCircuit className="size-32 text-amber-500" />
                </div>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                      <Target className="size-4" /> Nora-02-B Liquidity Optimizer
                    </CardTitle>
                    <CardDescription className="text-xs">Mission 400: Automated Treasury Rebalancing.</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleOptimize} 
                    disabled={optimizing}
                    className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10 text-[10px] font-bold uppercase"
                  >
                    {optimizing ? <Loader2 className="size-3 animate-spin mr-2" /> : <RefreshCcw className="size-3 mr-2" />}
                    Pulse Optimizer
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {optimizationData ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-2">
                          <p className="text-[10px] font-bold text-amber-500 uppercase">Efficiency Score</p>
                          <div className="flex items-center gap-4">
                            <span className="text-3xl font-headline font-bold text-white">{optimizationData.efficiencyScore}%</span>
                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: `${optimizationData.efficiencyScore}%` }} />
                            </div>
                          </div>
                          <p className="text-[9px] text-muted-foreground italic">"{optimizationData.savingsEstimation}"</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Strategic Directive</p>
                            <p className="text-xs font-mono text-emerald-200 leading-relaxed italic">"{optimizationData.strategicDirective}"</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                          <ArrowRightLeft className="size-3 text-primary" /> Recommended Rebalancing Actions
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {optimizationData.recommendedActions.map((rec, i) => (
                            <div key={i} className="p-3 bg-white/2 border border-white/5 rounded-lg flex items-center justify-between group hover:bg-white/5 transition-all">
                              <div className="flex items-center gap-4">
                                <div className="size-8 bg-primary/10 rounded flex items-center justify-center">
                                  <TrendingUp className="size-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-white">{rec.action}</p>
                                  <p className="text-[9px] text-muted-foreground font-mono">{rec.fromAsset} → {rec.toAsset}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-headline font-bold text-primary">${rec.amount.toLocaleString()}</p>
                                <p className="text-[8px] text-muted-foreground uppercase">{rec.reason}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full bg-amber-500 text-amber-foreground font-bold uppercase text-[10px] h-10 tracking-[0.2em] glow-emerald">
                          Execute Collective Rebalance
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-10 flex flex-col items-center justify-center gap-4 opacity-40 text-center">
                      <Target className="size-12 text-amber-500" />
                      <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                        Await Optimizer Dispatch.<br/>Pulse mesh nodes to initiate.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Asset-Mesh Distribution</CardTitle>
                  <CardDescription>Real-time allocation across regional mesh nodes.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-white/5">
                    {[
                      { asset: "Sovereign-USDC", balance: "$210M", share: "50%", change: "+0.5%" },
                      { asset: "Asset-Mesh (BDT)", balance: "$140M", share: "33.3%", change: "+1.2%" },
                      { asset: "Imperial Gold-Mesh", balance: "$70M", share: "16.7%", change: "STABLE" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Coins className="size-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{item.asset}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{item.share} ALLOCATION</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-headline font-bold">{item.balance}</p>
                          <p className={`text-[9px] font-bold ${item.change.includes('+') ? 'text-emerald-500' : 'text-muted-foreground'}`}>{item.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
               <Card className="glass-card flex flex-col h-[500px]">
                <CardHeader className="border-b border-white/5">
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <History className="size-4" /> Off-Ramp History
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                  {withdrawals?.map((w: any) => (
                    <div key={w.id} className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 group hover:bg-white/10 transition-all">
                       <div className="flex justify-between items-center">
                          <Badge variant="outline" className={`text-[7px] uppercase font-bold ${w.status === 'AUTHORIZED' ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500'}`}>
                            {w.status}
                          </Badge>
                          <span className="text-[8px] font-mono text-muted-foreground">{new Date(w.timestamp).toLocaleDateString()}</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white">{w.convertedAmount.toLocaleString()} {w.localCurrency}</p>
                          <p className="text-[9px] font-mono text-primary font-bold">-{w.amount} {w.asset}</p>
                       </div>
                       <p className="text-[8px] text-muted-foreground uppercase truncate">{w.method}</p>
                       <div className="pt-2 border-t border-white/5 flex items-center gap-1.5">
                          <CheckCircle2 className="size-2 text-emerald-500" />
                          <span className="text-[7px] font-mono text-muted-foreground truncate">{w.securitySignature}</span>
                       </div>
                    </div>
                  ))}
                  {withdrawals?.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center gap-2 opacity-30 py-10">
                       <History className="size-8" />
                       <p className="text-[9px] font-mono uppercase">No withdrawal records.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                <CardHeader className="pb-2">
                   <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                     <AlertCircle className="size-3" /> Reserve Directive
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     Maintain minimum 15% liquid stablecoin reserves across all Sirajganj-Edge corridors to prevent settlement drift.
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                       <Lock className="size-3" /> Halal Integrity Seal
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">
                       All off-ramps undergo a zero-trust compliance check to ensure 100% legitimacy and adherence to sovereign financial ethics.
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
