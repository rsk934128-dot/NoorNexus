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
  Lock,
  ShieldAlert,
  Heart,
  Network
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

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function TreasuryPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [auditing, setAuditing] = useState(false)
  const [optimizing, setOptimizing] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [auditData, setAuditData] = useState<LedgerAuditOutput | null>(null)
  const [optimizationData, setOptimizationData] = useState<LiquidityOptimizerOutput | null>(null)
  const [offRampResult, setOffRampResult] = useState<OffRampOutput | null>(null)
  const [liquidity, setLiquidity] = useState(98.4)

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
      setLiquidity(prev => Math.min(100, Math.max(90, prev + (Math.random() * 0.2 - 0.1))))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  async function handleWithdraw() {
    if (!user) return
    setWithdrawing(true)
    try {
      const result = await authorizeWithdrawal({ ...withdrawForm, ownerTier: isAdmin ? 'IMPERIAL' : 'VERIFIED' })
      setOffRampResult(result)
      if (result.status !== 'REJECTED') {
        await addDoc(collection(db, "withdrawals"), {
          ...withdrawForm, ...result, timestamp: Date.now(), owner: user.email, updatedAt: serverTimestamp()
        })
        toast({ title: "Authorized", description: "Withdrawal sequence initiated." })
      }
    } catch (e: any) {
      toast({ title: "Failure", variant: "destructive" })
    } finally {
      setWithdrawing(false)
    }
  }

  async function runImperialAudit() {
    if (!isAdmin) return;
    setAuditing(true)
    try {
      const result = await ledgerAudit({ totalVolume: 420000000, settlementQueue: 1240000, liquidityHealth: liquidity, dailyThroughput: 15600000 })
      setAuditData(result)
      toast({ title: "Audit Sync Success", description: `Integrity: ${result.securityScore}%` })
    } catch (e: any) {
      toast({ title: "Audit Link Error", variant: "destructive" })
    } finally {
      setAuditing(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary"><Button variant="ghost" size="icon"><Menu className="size-6" /></Button></SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Wallet className="size-8 sm:size-10 text-primary" />
                   {isAdmin ? 'Global Sovereign Treasury' : 'Personal Mesh Wallet'}
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                {isAdmin ? 'Global Multi-Ledger Liquidity & Reserves.' : 'Manage your assets and mesh-integrated withdrawals.'}
              </p>
            </div>
            {isAdmin && (
              <Button onClick={runImperialAudit} disabled={auditing} className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-10 gap-2 glow-primary">
                {auditing ? <Loader2 className="size-4 animate-spin" /> : <ShieldAlert className="size-4" />}
                Imperial Global Audit
              </Button>
            )}
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="glass-card bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2 p-4">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{isAdmin ? 'Total Global Assets' : 'Mesh Balance'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl sm:text-3xl font-headline font-bold text-white">{isAdmin ? '$420,000,000' : '$12,450'}</div>
                  </CardContent>
                </Card>
                <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                  <CardHeader className="pb-2 p-4">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Network Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 pt-0">
                    <div className="text-2xl sm:text-3xl font-headline font-bold text-emerald-500">{liquidity.toFixed(1)}%</div>
                    <Progress value={liquidity} className="h-1 bg-white/5" />
                  </CardContent>
                </Card>
                <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                  <CardHeader className="pb-2 p-4">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Settlement Queue</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl sm:text-3xl font-headline font-bold text-amber-500">{isAdmin ? '$1,240,000' : '$0.00'}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-l-4 border-l-emerald-500">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline flex items-center gap-2 uppercase text-emerald-500">
                      <ArrowDownToLine className="size-5" /> Mesh Off-Ramp
                    </CardTitle>
                    <CardDescription className="text-xs">Withdraw mesh assets to local accounts.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6 pt-0">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Method</Label>
                          <Select value={withdrawForm.method} onValueChange={v => setWithdrawForm({...withdrawForm, method: v})}>
                            <SelectTrigger className="bg-background/50 border-white/10 font-mono text-[10px] h-10"><SelectValue /></SelectTrigger>
                            <SelectContent>
                               <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                               <SelectItem value="MOBILE_BANKING">bKash/Nagad</SelectItem>
                               <SelectItem value="DIGITAL_CARD">Virtual Card</SelectItem>
                            </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Amount</Label>
                          <Input type="number" value={withdrawForm.amount} onChange={e => setWithdrawForm({...withdrawForm, amount: parseInt(e.target.value) || 0})} className="bg-background/50 border-white/10 font-bold h-10" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-bold uppercase text-muted-foreground">Destination Info</Label>
                       <Input value={withdrawForm.destination} onChange={e => setWithdrawForm({...withdrawForm, destination: e.target.value})} className="bg-background/50 border-white/10 font-mono text-xs h-10" />
                    </div>
                    <Button onClick={handleWithdraw} disabled={withdrawing} className="w-full bg-emerald-500 text-emerald-foreground font-bold uppercase tracking-widest h-14 glow-emerald">
                      {withdrawing ? <Loader2 className="size-4 animate-spin" /> : <Banknote className="size-5 mr-2" />}
                      Execute Handshake
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`glass-card border-t-4 ${offRampResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                  <CardHeader className="p-6">
                    <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                       <BrainCircuit className="size-4" /> Nora-12 Audit Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6 pt-0">
                    {offRampResult ? (
                      <div className="space-y-6 animate-in fade-in zoom-in-95">
                         <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2">
                            <p className="text-[9px] text-muted-foreground uppercase font-bold">Estimated Conversion</p>
                            <p className="text-3xl font-headline font-bold text-emerald-500">{offRampResult.convertedAmount.toLocaleString()} {offRampResult.localCurrency}</p>
                            <p className="text-[10px] text-muted-foreground italic">"{offRampResult.reasoning}"</p>
                         </div>
                         <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-[9px] text-primary truncate">
                            {offRampResult.securitySignature}
                         </div>
                      </div>
                    ) : (
                      <div className="h-[200px] flex flex-col items-center justify-center opacity-40 text-center gap-4">
                         <WalletCards className="size-12 text-primary" />
                         <p className="text-[10px] font-mono uppercase">Awaiting Handshake...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[500px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                    <History className="size-4" /> Withdrawal Registry
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                  {withdrawals?.map((w: any) => (
                    <div key={w.id} className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                       <div className="flex justify-between items-center text-[7px] font-mono text-muted-foreground">
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500 uppercase">{w.status}</Badge>
                          <span>{new Date(w.timestamp).toLocaleDateString()}</span>
                       </div>
                       <div className="flex justify-between items-center font-headline text-xs font-bold text-white">
                          <span>{w.convertedAmount?.toLocaleString()} {w.localCurrency}</span>
                       </div>
                       <p className="text-[8px] text-muted-foreground uppercase truncate">{w.method}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2 p-4">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <Lock className="size-3" /> Zero-Trust Seal
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="p-4 pt-0 text-[10px] text-muted-foreground leading-relaxed">
                    Every off-ramp is signed with HMAC_V4 SHA256 and audited by Nora-12 for global compliance.
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
