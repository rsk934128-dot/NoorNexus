
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
  Radio,
  Activity,
  FileCheck,
  ShieldEllipsis,
  HeartPulse,
  Landmark,
  Truck
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <HeartPulse className="size-3 mr-2" /> Phase P5: Sustainability
                 </Badge>
              </div>
              <h2 className="text-2xl sm:text-5xl font-headline font-bold flex items-center gap-3 uppercase tracking-tighter">
                Sovereign <span className="text-primary">Sustainability.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Phase P5: Economic Survival & Generational Reserves. Proving long-term institutional viability through high reserve ratios and low dependency risk.
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
              {/* Survival Index */}
              <section className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <Activity className="size-4" /> Economic Survival Index
                    </h3>
                    <Badge variant="outline" className="h-6 text-[8px] border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                      SURVIVAL_RATING: OPTIMAL
                    </Badge>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Reserve Ratio", value: "245%", trend: "STABLE", status: "SAFE" },
                      { label: "Operating Runway", value: "36 Mo", trend: "+2 Mo", status: "SECURE" },
                      { label: "Sustainability Score", value: "94/100", trend: "MAX", status: "VERIFIED" },
                      { label: "Dependency Risk", value: "8.2%", trend: "-1.5%", status: "LOW" }
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
                <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                      <Landmark className="size-4" /> Sovereign Balance Sheet
                    </CardTitle>
                    <CardDescription>Verified Assets vs Institutional Liabilities.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                           <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Core Assets</p>
                           <ul className="space-y-1">
                              {["Knowledge Assets", "Trust Nodes", "USDC Reserves"].map((a, i) => (
                                <li key={i} className="text-[10px] text-white flex items-center gap-2">
                                   <div className="size-1 bg-emerald-500 rounded-full" /> {a}
                                </li>
                              ))}
                           </ul>
                        </div>
                        <div className="space-y-3">
                           <p className="text-[8px] font-bold text-destructive uppercase tracking-widest">Liabilities</p>
                           <ul className="space-y-1">
                              {["Technical Debt", "Governance Debt", "AI Concentration"].map((l, i) => (
                                <li key={i} className="text-[10px] text-white flex items-center gap-2">
                                   <div className="size-1 bg-destructive rounded-full" /> {l}
                                </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                      <Truck className="size-4" /> Resource Optimizer Proposals
                    </CardTitle>
                    <CardDescription>Budget allocation proposed by Project #47.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-3">
                        <div className="flex justify-between items-center">
                           <p className="text-[10px] text-white font-bold uppercase">Node Maintenance Fund</p>
                           <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">PROPOSED</Badge>
                        </div>
                        <p className="text-lg font-headline font-bold text-primary">$12,400.00</p>
                        <p className="text-[9px] text-muted-foreground italic">Reason: 45% fail probability detected at London Mesh Node.</p>
                        <Button size="sm" className="w-full bg-primary text-primary-foreground font-bold uppercase text-[9px]">Approve & Anchor to Ledger</Button>
                     </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <History className="size-4" /> Survival History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-3">
                      {[
                        { event: "Reserve Hardening", time: "Cycle 41", status: "+12%" },
                        { event: "Mission Alignment", time: "Cycle 42", status: "98.4%" },
                        { event: "Generational Transfer", time: "Cycle 40", status: "DONE" }
                      ].map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px] p-2 border-b border-white/5">
                           <span className="text-muted-foreground uppercase">{h.event}</span>
                           <span className="text-white font-mono">{h.status}</span>
                        </div>
                      ))}
                   </div>
                   <Button variant="ghost" className="w-full h-8 text-[9px] uppercase font-bold gap-2">
                      View Sustainability Reports <ExternalLink className="size-3" />
                   </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                       <ShieldAlert className="size-3" /> Institutional Guard
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Sustainability is the final frontier of sovereignty. A project that cannot survive its founder is not a civilization."
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
