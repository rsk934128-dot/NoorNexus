
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  ArrowRightLeft, 
  Menu, 
  Smartphone,
  Globe,
  Plus,
  History,
  Lock,
  Cpu,
  RefreshCcw,
  Landmark,
  Coins
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { enrollAmexBuyer, createAmexVirtualCard, getAmexTransactions } from "@/services/amex-service"
import { consultAmexStrategist, AmexOnDemandOutput } from "@/ai/flows/amex-on-demand-flow"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AmexOnDemandPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [strategy, setStrategy] = useState<AmexOnDemandOutput | null>(null)
  const [buyer, setBuyer] = useState<any>(null)
  const [cards, setCards] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  const [form, setForm] = useState({
    purpose: "Imperial Infrastructure Payment",
    amount: 1500,
    days: 30
  })

  useEffect(() => {
    // Initial data fetch simulation
    loadHistory();
  }, []);

  async function loadHistory() {
    const txs = await getAmexTransactions("CR6gVOF5QgCqunZ");
    setTransactions(txs);
  }

  async function handleEnroll() {
    setLoading(true)
    try {
      const result = await enrollAmexBuyer({
        name: "NoorNexus Holdings, Inc.",
        doingBusinessAsName: "NoorNexus Sovereign",
        governmentId: "7864009911",
        phone: [{ countryCode: "001", number: "555786400", type: "BUSINESS" }],
        email: [{ type: "BUSINESS", emailAddress: "treasury@noornexus.sovereign" }],
        address: [{
          type: "BUSINESS",
          purpose: "PRIMARY",
          line1: "100 Sovereign Way",
          city: "Phoenix",
          state: "Arizona",
          country: "US",
          postalCode: "85001"
        }]
      })
      setBuyer(result)
      toast({ title: "Buyer Profile Established", description: `AMEX ID: ${result.buyerId}` })
    } catch (e: any) {
      toast({ title: "Enrollment Failed", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleConsultAI() {
    setLoading(true)
    try {
      const result = await consultAmexStrategist({
        purpose: form.purpose,
        requestedAmount: form.amount,
        durationDays: form.days
      })
      setStrategy(result)
      toast({ title: "Neural Strategy Dispatched" })
    } catch (e: any) {
      toast({ title: "Strategist Offline", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleIssueCard() {
    if (!strategy) return
    setLoading(true)
    try {
      const result = await createAmexVirtualCard({
        accountId: "CR6gVOF5QgCqunZ",
        reloadable: false,
        spendControls: {
          spendType: strategy.recommendedSpendType,
          currentAmount: form.amount.toString(),
          validFromDate: new Date().toISOString().split('T')[0],
          validToDate: new Date(Date.now() + form.days * 86400000).toISOString().split('T')[0],
          timeZone: "MST",
          allowedMerchantIndustries: strategy.mccWhitelist
        },
        cardDetails: {
          formFactor: "VIRTUAL",
          cardReferenceId: "SOV-" + Math.random().toString(36).substring(2, 8).toUpperCase()
        },
        deliveryMethod: "API_RESPONSE",
        userDetails: { userId: "IMPERIAL_RUBEL" }
      })
      setCards([result, ...cards])
      toast({ title: "Virtual Card Generated", description: `Last 5: ${result.cardDetails.cardLastFive}` })
    } catch (e: any) {
      toast({ title: "Card Generation Error", description: e.message, variant: "destructive" })
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
                   <Landmark className="size-3 mr-2" /> Sovereign AMEX Bridge
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Card <span className="text-primary">On-Demand.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 400: Global Fiat Settlement Layer. Generating on-demand American Express Virtual Cards with AI-driven spend controls for secure business payments.
              </p>
            </div>
            <div className="flex items-center gap-4">
               {!buyer ? (
                 <Button 
                  onClick={handleEnroll} 
                  disabled={loading}
                  className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary"
                 >
                   {loading ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                   Enroll Sovereign Buyer
                 </Button>
               ) : (
                 <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Buyer Status</p>
                    <p className="text-lg font-headline font-bold text-emerald-500 uppercase flex items-center gap-2 justify-center">
                      <ShieldCheck className="size-4" /> ACTIVE
                    </p>
                    <p className="text-[9px] text-muted-foreground font-mono mt-1">{buyer.buyerId}</p>
                 </div>
               )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Card Generation Module */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Zap className="size-4" /> Generate Imperial Card
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                       <CardHeader>
                          <CardTitle className="text-sm font-headline uppercase text-white">Spend Parameters</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-4">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Payment Purpose</Label>
                             <Input 
                                value={form.purpose} 
                                onChange={e => setForm({...form, purpose: e.target.value})}
                                className="bg-background/50 border-white/10 font-bold" 
                             />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Amount (USD)</Label>
                                <Input 
                                   type="number" 
                                   value={form.amount} 
                                   onChange={e => setForm({...form, amount: parseInt(e.target.value) || 0})}
                                   className="bg-background/50 border-white/10" 
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Validity (Days)</Label>
                                <Input 
                                   type="number" 
                                   value={form.days} 
                                   onChange={e => setForm({...form, days: parseInt(e.target.value) || 0})}
                                   className="bg-background/50 border-white/10" 
                                />
                             </div>
                          </div>
                          <Button 
                            onClick={handleConsultAI} 
                            disabled={loading}
                            className="w-full bg-emerald-500 text-white font-bold uppercase tracking-widest text-[10px] h-10 glow-emerald"
                          >
                             {loading ? <Loader2 className="size-3 animate-spin mr-2" /> : <Cpu className="size-3 mr-2" />}
                             Consult Nora-20 Strategist
                          </Button>
                       </CardContent>
                    </Card>

                    <Card className={`glass-card border-t-4 transition-all duration-500 ${strategy ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                       <CardHeader>
                          <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                             <Lock className="size-4" /> Nora-20 Spend Controls
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-6">
                          {strategy ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                               <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                                  <div className="flex justify-between items-center">
                                     <span className="text-[9px] text-muted-foreground uppercase font-bold">Recommended Mode</span>
                                     <Badge className="bg-primary">{strategy.recommendedSpendType}</Badge>
                                  </div>
                                  <p className="text-[10px] text-emerald-100 italic leading-relaxed">"{strategy.tacticalJustification}"</p>
                               </div>
                               <div className="flex justify-between items-center text-[10px] uppercase font-bold text-muted-foreground">
                                  <span>Risk Assessment</span>
                                  <span className={strategy.riskLevel === 'Low' ? 'text-emerald-500' : 'text-amber-500'}>{strategy.riskLevel}</span>
                               </div>
                               <Button 
                                 onClick={handleIssueCard}
                                 disabled={loading}
                                 className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest glow-primary"
                               >
                                  {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <CreditCard className="size-4 mr-2" />}
                                  Issue Virtual Card
                               </Button>
                            </div>
                          ) : (
                            <div className="h-[150px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                               <Cpu className="size-10 text-primary animate-pulse" />
                               <p className="text-[10px] font-mono uppercase tracking-widest">Awaiting Spend Analysis</p>
                            </div>
                          )}
                       </CardContent>
                    </Card>
                 </div>
              </section>

              {/* Transactions Ledger */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <History className="size-4" /> Global Card Ledger
                 </h3>
                 <Card className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="bg-white/2 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Merchant</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Volume</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             {transactions.map((tx, i) => (
                               <tr key={i} className="hover:bg-white/2 transition-colors">
                                  <td className="px-6 py-4 font-mono text-[10px] text-primary">{tx.referenceNumber}</td>
                                  <td className="px-6 py-4">
                                     <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-white uppercase">{tx.merchant.name}</p>
                                        <p className="text-[8px] text-muted-foreground font-mono">{tx.merchant.city}, {tx.merchant.state}</p>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4 text-[10px] text-muted-foreground font-mono">{tx.transactionDate}</td>
                                  <td className="px-6 py-4 text-right">
                                     <p className="text-xs font-headline font-bold text-emerald-500">${tx.transactionAmount.value}</p>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </Card>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Coins className="size-4" /> Settlement Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Funding Availability</p>
                     <p className="text-3xl font-headline font-bold text-white">OPTIMAL</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    {[
                      { label: "Active Account", val: "Platinum Card" },
                      { label: "Currency", val: "USD" },
                      { label: "Bridge Status", val: "SYNCED" }
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                         <span className="text-muted-foreground uppercase">{s.label}</span>
                         <span className="text-white font-bold">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card h-fit flex flex-col max-h-[500px]">
                <CardHeader className="shrink-0 border-b border-white/5">
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <CreditCard className="size-4" /> Active Sovereign Cards
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-[400px] px-6 py-4">
                    <div className="space-y-4">
                       {cards.length === 0 && <p className="text-[10px] text-muted-foreground italic text-center py-10">No active cards issued.</p>}
                       {cards.map((c, i) => (
                         <div key={i} className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3 group hover:bg-primary/10 transition-all">
                            <div className="flex justify-between items-start">
                               <CreditCard className="size-6 text-primary" />
                               <Badge className="bg-emerald-500 text-[8px] h-4">ACTIVE</Badge>
                            </div>
                            <div className="space-y-1">
                               <p className="text-lg font-headline font-bold text-white tracking-[0.2em]">•••• •••• •••• {c.cardDetails.cardLastFive}</p>
                               <div className="flex justify-between text-[8px] font-mono text-muted-foreground uppercase">
                                  <span>Expires: {c.cardDetails.expiryDate}</span>
                                  <span>ID: {c.cardId.substring(0, 8)}</span>
                               </div>
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
                       <ShieldCheck className="size-3" /> PCI Policy: ENFORCED
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "All virtual card data is retrieved via HIPED encryption and transmitted through Sovereign Canal tunnels. Zero storage of raw PCI data."
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
