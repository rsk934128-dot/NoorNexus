
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
  Network,
  Scale,
  Database
} from "lucide-react"
import { authorizeWithdrawal, OffRampOutput } from "@/ai/flows/off-ramp-flow"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
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

  const [withdrawing, setWithdrawing] = useState(false)
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

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary"><Button variant="ghost" size="icon"><Menu className="size-6" /></Button></SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Wallet className="size-8 sm:size-10 text-primary" />
                   Sovereign Economic Engine
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Project 162: Civilizational Balance Sheet & Economic Sustainability.
              </p>
            </div>
            {isAdmin && (
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                <Scale className="size-4" /> NET_WORTH_POSITIVE
              </Badge>
            )}
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              {/* Civilizational Balance Sheet */}
              <section className="space-y-6">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                   <Database className="size-4" /> Economic Sustainability Engine
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                      <CardHeader className="pb-2">
                         <CardTitle className="text-xs font-bold uppercase text-emerald-500">Civilizational Assets</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                         {[
                           { label: "Knowledge Assets", value: "$125M" },
                           { label: "Trust Equity", value: "$340M" },
                           { label: "Treasury Liquidity", value: "$420M" },
                           { label: "Mesh Infrastructure", value: "$85M" }
                         ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-white/5 rounded">
                              <span className="text-muted-foreground uppercase">{item.label}</span>
                              <span className="text-white font-bold">{item.value}</span>
                           </div>
                         ))}
                      </CardContent>
                   </Card>
                   <Card className="glass-card border-l-4 border-l-destructive bg-destructive/5">
                      <CardHeader className="pb-2">
                         <CardTitle className="text-xs font-bold uppercase text-destructive">Institutional Liabilities</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                         {[
                           { label: "Technical Debt", value: "$12M" },
                           { label: "Governance Debt", value: "$4M" },
                           { label: "AI Dependency Risk", value: "$52M" },
                           { label: "Security Overhead", value: "$8M" }
                         ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-white/5 rounded">
                              <span className="text-muted-foreground uppercase">{item.label}</span>
                              <span className="text-white font-bold">{item.value}</span>
                           </div>
                         ))}
                      </CardContent>
                   </Card>
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline flex items-center gap-2 uppercase text-primary">
                      <ArrowDownToLine className="size-5" /> Off-Ramp Gateway
                    </CardTitle>
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
                    <Button onClick={handleWithdraw} disabled={withdrawing} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary">
                      {withdrawing ? <Loader2 className="size-4 animate-spin" /> : <Banknote className="size-5 mr-2" />}
                      Authorize Handshake
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`glass-card border-t-4 ${offRampResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                  <CardHeader className="p-6">
                    <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                       <BrainCircuit className="size-4" /> AI Audit Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6 pt-0">
                    {offRampResult ? (
                      <div className="space-y-6 animate-in fade-in zoom-in-95">
                         <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2">
                            <p className="text-[9px] text-muted-foreground uppercase font-bold">Sustainability Impact</p>
                            <p className="text-xl font-headline font-bold text-emerald-500">POSITIVE</p>
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
               <Card className="glass-card bg-primary/5 border-primary/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> Value Flow Graph
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex flex-col items-center gap-4">
                      <div className="size-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                        <Users className="size-5 text-emerald-500" />
                      </div>
                      <ArrowDownToLine className="size-4 text-muted-foreground animate-bounce" />
                      <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 glow-primary">
                        <Database className="size-6 text-primary" />
                      </div>
                      <ArrowDownToLine className="size-4 text-muted-foreground animate-bounce" />
                      <div className="size-10 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                        <Rocket className="size-5 text-amber-500" />
                      </div>
                   </div>
                   <p className="text-[9px] text-center text-muted-foreground italic">"Citizen -> Treasury -> Public Project"</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <Lock className="size-3" /> Anti-Capture Seal
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">
                       Founder override is limited to Article II emergencies. Stewardship Council quorum is ACTIVE.
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
