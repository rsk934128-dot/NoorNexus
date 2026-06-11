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
  History
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
                   <Globe className="size-3 mr-2" /> Multi-Currency Treasury
                 </Badge>
              </div>
              <h2 className="text-2xl sm:text-5xl font-headline font-bold flex items-center gap-3 uppercase tracking-tighter">
                Sovereign <span className="text-primary">Economy.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 162: Universal Economic Abstraction. Supporting multiple fiat and digital assets for global partners.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Net Treasury Worth</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">$512M</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              {/* Multi-Currency Balances */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <PieChart className="size-4" /> Global Currency Reserves
                 </h3>
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
                    <CardDescription>Initiate atomic transfer to partner nodes.</CardDescription>
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
                      Authorize Bridge Handshake
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`glass-card transition-all duration-500 border-t-4 ${offRampResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                       <BrainCircuit className="size-4" /> Settlement Logic
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {offRampResult ? (
                      <div className="space-y-6 animate-in fade-in zoom-in-95">
                         <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2">
                            <p className="text-[9px] text-muted-foreground uppercase font-bold">Abstration Status</p>
                            <p className="text-lg font-headline font-bold text-emerald-500 uppercase">Provider Synced</p>
                            <p className="text-[10px] text-muted-foreground italic leading-relaxed">"{offRampResult.reasoning}"</p>
                         </div>
                         <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-[9px] text-primary truncate">
                            {offRampResult.securitySignature}
                         </div>
                      </div>
                    ) : (
                      <div className="h-[200px] flex flex-col items-center justify-center opacity-40 text-center gap-4">
                         <ArrowRightLeft className="size-12 text-primary" />
                         <p className="text-[10px] font-mono uppercase">Awaiting Settlement Bridge...</p>
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
                    <TrendingUp className="size-4" /> Global Value Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex flex-col items-center gap-4">
                      <div className="size-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                        <Globe className="size-5 text-emerald-500" />
                      </div>
                      <ArrowRightLeft className="size-4 text-muted-foreground rotate-90 animate-pulse" />
                      <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 glow-primary">
                        <Database className="size-6 text-primary" />
                      </div>
                      <ArrowRightLeft className="size-4 text-muted-foreground rotate-90 animate-pulse" />
                      <div className="size-10 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                        <Zap className="size-5 text-amber-500" />
                      </div>
                   </div>
                   <p className="text-[9px] text-center text-muted-foreground italic">"Universal Abstraction Layer Active"</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <History className="size-3" /> Contract Lifecycle
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[8px] font-bold text-white uppercase">
                          <span>Obligations</span>
                          <span>92%</span>
                       </div>
                       <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '92%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">
                       Agreement milestones are verified via signed event bus handshakes.
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
