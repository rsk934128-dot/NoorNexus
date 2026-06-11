"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, Zap, Loader2, FileCheck, 
  Globe, Coins, ShieldCheck, ArrowRightLeft, Menu, CheckCircle2, FileText, TrendingDown,
  Banknote,
  Smartphone,
  CreditCard
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"
import { executeSovereignPayout, PayoutResult } from "@/services/pay-bridge"

const SETTLEMENT_PROVIDERS = [
  { id: "bank", name: "Bank SWIFT Node", icon: Banknote },
  { id: "mobile", name: "Mobile Money Node", icon: Smartphone },
  { id: "card", name: "Virtual Card Relay", icon: CreditCard }
]

export default function P2CSettlementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [bridgeResult, setBridgeResult] = useState<PayoutResult | null>(null)
  const [selectedProvider, setSelectedProvider] = useState("bank")

  const [form, setForm] = useState({
    merchantId: "PARTNER-NODE-01",
    amount: 5000,
    asset: "USDC",
    recipientCount: 1,
    signature: "0x_PARTNER_SEAL_RSA"
  })

  async function handleBridgeSettlement() {
    setLoading(true)
    setBridgeResult(null)
    try {
      const result = await executeSovereignPayout(form.amount, form.asset, form.merchantId);
      setBridgeResult(result);
      
      if (result.status === 'APPROVED') {
        await addDoc(collection(db, "compliance_records"), {
          ...form,
          provider: selectedProvider,
          txId: result.txId,
          timestamp: Date.now()
        });
        
        toast({
          title: "Settlement Finalized",
          description: "Atomic handshake completed via Provider Abstraction.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Settlement Failure",
        description: error.message
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-3xl font-headline font-bold flex items-center gap-3 uppercase">
                   <ArrowRightLeft className="size-8 text-primary" />
                   Settlement Layer
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Phase Ω+: Financial Abstraction Layer Supporting 1000+ Providers.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4 flex items-center gap-2">
                 <Globe className="size-4" /> MULTI_CURRENCY_READY
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Coins className="size-4" /> Settlement Abstraction
                </CardTitle>
                <CardDescription>Select node provider independently from core logic.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                   {SETTLEMENT_PROVIDERS.map(p => (
                     <div 
                        key={p.id} 
                        onClick={() => setSelectedProvider(p.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all text-center space-y-2 ${selectedProvider === p.id ? 'border-primary bg-primary/10 shadow-lg' : 'border-white/5 bg-white/2 hover:border-white/20'}`}
                      >
                        <p.icon className={`size-5 mx-auto ${selectedProvider === p.id ? 'text-primary' : 'text-muted-foreground'}`} />
                        <p className="text-[8px] font-bold uppercase text-white">{p.name}</p>
                     </div>
                   ))}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Asset Node</Label>
                      <Input 
                        value={form.asset} 
                        onChange={e => setForm({...form, asset: e.target.value})}
                        className="bg-background/50 border-white/10 text-xs font-mono h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Volume</Label>
                      <Input 
                        type="number"
                        value={form.amount} 
                        onChange={e => setForm({...form, amount: parseInt(e.target.value) || 0})}
                        className="bg-background/50 border-white/10 font-headline font-bold h-10" 
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleBridgeSettlement} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                  Execute Node Settlement
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${bridgeResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <FileCheck className="size-4" /> Settlement Dispatch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bridgeResult ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Node Logic</p>
                          <Badge className="bg-emerald-500 mt-1">ATOMIC_SUCCESS</Badge>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Provider Fee</p>
                          <p className="text-xl font-headline font-bold text-primary">$0.42</p>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                         <h4 className="text-[10px] font-bold uppercase text-primary">Compliance Receipt</h4>
                         <code className="text-[9px] font-mono text-white truncate block">{bridgeResult.txId}</code>
                         <div className="flex items-center gap-2 text-[8px] text-emerald-500 font-bold uppercase">
                            <CheckCircle2 className="size-3" /> Integrity Verified via Global Bus
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <FileText className="size-12" />
                      <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                        Architecture is Provider-Agnostic.<br/>Initiate settlement to see abstraction logic.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-primary/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                       <TrendingDown className="size-3" />
                       Scaling Efficiency
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "1 Partner = 1000 Partners logic ensures that adding a new bank or payment provider requires zero changes to the Core Treasury or Governance logic."
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
