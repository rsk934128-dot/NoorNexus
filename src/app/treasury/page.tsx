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
  ExternalLink
} from "lucide-react"
import { authorizeWithdrawal, OffRampOutput } from "@/ai/flows/off-ramp-flow"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TreasuryPage() {
  const { toast } = useToast()
  const [withdrawing, setWithdrawing] = useState(false)
  const [offRampResult, setOffRampResult] = useState<OffRampOutput | null>(null)
  const [isOperational, setIsOperational] = useState(false)
  
  const [withdrawForm, setWithdrawForm] = useState({
    amount: 1000,
    method: "BANK_TRANSFER" as any,
    destination: "Sovereign Node Bridge",
    asset: "USDC"
  })

  const CURRENCIES = [
    { code: "USD", flag: "🇺🇸", balance: "420,000", trend: "+2.1%" },
    { code: "BDT", flag: "🇧🇩", balance: "12,500,000", trend: "+5.4%" },
    { code: "AED", flag: "🇦🇪", balance: "850,000", trend: "+1.2%" },
    { code: "EUR", flag: "🇪🇺", balance: "140,000", trend: "-0.4%" }
  ]

  async function handleWithdraw() {
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
                Operational <span className="text-primary">Readiness.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Phase ΩΩ: Moving from Simulation to Reality. Verifying regulatory compliance and licensing for full operational deployment.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className={`p-4 glass-card rounded-2xl border text-center min-w-[200px] ${isOperational ? 'border-emerald-500/30' : 'border-amber-500/30'}`}>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Treasury Mode</p>
                  <p className={`text-xl font-headline font-bold ${isOperational ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {isOperational ? 'OPERATIONAL' : 'SIMULATION'}
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              {/* Multi-Currency Balances */}
              <section className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <PieChart className="size-4" /> Multi-Currency Reserves
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[8px] font-bold text-muted-foreground uppercase">Operational Mode:</span>
                       <Badge 
                         onClick={() => setIsOperational(!isOperational)}
                         className={`cursor-pointer h-6 text-[8px] ${isOperational ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        >
                          {isOperational ? 'LIVE' : 'SWITCH TO REALITY'}
                       </Badge>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CURRENCIES.map((c, i) => (
                      <Card key={i} className="glass-card bg-primary/5 border-white/5 hover:border-primary/20 transition-all">
                        <CardContent className="p-6 space-y-3">
                           <div className="flex justify-between items-center">
                              <span className="text-xl">{c.flag}</span>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">{c.trend}</Badge>
                           </div>
                           <div className="space-y-0.5">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">{c.code} Balance</p>
                              <p className="text-xl font-headline font-bold text-white">{c.balance}</p>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline flex items-center gap-2 uppercase text-primary">
                      <ArrowDownToLine className="size-4" /> Settlement Bridge
                    </CardTitle>
                    <CardDescription>Initiate atomic transfer to pilot nodes.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                    <Button onClick={handleWithdraw} disabled={withdrawing} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary">
                      {withdrawing ? <Loader2 className="size-4 animate-spin" /> : <Banknote className="size-5 mr-2" />}
                      Authorize Settlement
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                  <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Operational Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { item: "Regulatory Licensing", status: "PENDING" },
                      { item: "Banking Agreements", status: "ACTIVE (1)" },
                      { item: "L4 Security Sign-off", status: "VERIFIED" },
                      { item: "AML Reporting Loop", status: "READY" }
                    ].map((check, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-black/40 rounded border border-white/5">
                         <span className="text-[9px] text-white font-bold uppercase">{check.item}</span>
                         <Badge variant="outline" className={`text-[7px] ${check.status === 'VERIFIED' || check.status.includes('ACTIVE') ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>{check.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card bg-primary/5 border-primary/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> Global Value Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                   <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Pilot Efficiency</p>
                      <p className="text-3xl font-headline font-bold text-emerald-500">99.8%</p>
                      <p className="text-[8px] text-muted-foreground italic">"Simulated Handshake Success Rate across 12 Nodes."</p>
                   </div>
                   <Button variant="ghost" className="w-full h-8 text-[9px] uppercase font-bold gap-2">
                      View Full Ledger <ExternalLink className="size-3" />
                   </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-destructive">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-destructive flex items-center gap-2">
                       <AlertTriangle className="size-3" /> Risk Guard
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Transitioning to Reality requires 100% regulatory alignment. Any liquidity drift above 0.5% triggers automatic simulation fallback."
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
