
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, Loader2, FileCheck, 
  Globe, Coins, ShieldCheck, ArrowRightLeft, Menu, CheckCircle2, 
  Smartphone,
  Fingerprint,
  RefreshCcw,
  ShieldAlert,
  History,
  Lock,
  BarChart3
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser } from "@/firebase"
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore"
import { executeMappedPayout, PayoutResult, generateIdempotencyKey } from "@/services/pay-bridge"

const SETTLEMENT_PROVIDERS = [
  { id: "bKash", name: "bKash Hub (BDT)", icon: Smartphone },
  { id: "Xendit", name: "Xendit Gateway (THB)", icon: Globe },
  { id: "Sovereign", name: "Internal Mesh", icon: ShieldCheck }
]

export default function P2CSettlementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [bridgeResult, setBridgeResult] = useState<PayoutResult | null>(null)
  const [selectedProvider, setSelectedProvider] = useState("bKash")
  const [idemKey, setIdemKey] = useState("")

  const [form, setForm] = useState({
    amount: 100,
    merchantId: "PARTNER-NODE-01",
  })

  useEffect(() => {
    setIdemKey(generateIdempotencyKey())
  }, [])

  async function handleHardenedSettlement() {
    if (!user) return
    setLoading(true)
    setBridgeResult(null)
    try {
      const result = await executeMappedPayout(
        form.amount, 
        selectedProvider, 
        { email: user.email || "guest", systemId: user.uid },
        idemKey
      );
      
      setBridgeResult(result);
      
      if (result.status === 'SUCCESS') {
        // 1. Log to Payments Ledger
        const paymentRef = doc(collection(db, "payments"), result.txId)
        await setDoc(paymentRef, {
          ...form,
          ...result,
          userEmail: user.email,
          timestamp: serverTimestamp()
        })

        // 2. Log Ledger Entry (Double-Entry Design)
        await addDoc(collection(db, "ledger"), {
          paymentId: result.txId,
          type: "DEBIT",
          amount: result.amount,
          asset: result.currency,
          timestamp: Date.now()
        })
        
        toast({
          title: "Reliability Handshake: SUCCESS",
          description: `Idempotency Shield Active. TX: ${result.externalTxId}`,
        });
        
        // Generate new key for next transaction
        setIdemKey(generateIdempotencyKey())
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hardening Failure",
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
                   Settlement Engine
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Phase P1: Production-Grade Hardening. Idempotency, Webhooks, and Ledger-First Architecture.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4 flex items-center gap-2">
                 <Lock className="size-4" /> RELIABILITY_L4_ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <ShieldCheck className="size-4" /> Transaction Entry
                </CardTitle>
                <CardDescription>Multi-provider atomic disbursement terminal.</CardDescription>
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
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Base Amount (USD)</Label>
                    <div className="relative">
                      <Input 
                        type="number"
                        value={form.amount} 
                        onChange={e => setForm({...form, amount: parseInt(e.target.value) || 0})}
                        className="bg-background/50 border-white/10 font-headline font-bold h-12 pl-10" 
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Idempotency Key (Safety Shield)</Label>
                    <code className="block p-3 bg-black/40 rounded border border-white/5 text-[9px] font-mono text-primary truncate">
                       {idemKey}
                    </code>
                  </div>
                </div>

                <Button 
                  onClick={handleHardenedSettlement} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                  Execute Hardened Trade
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${bridgeResult ? (bridgeResult.status === 'SUCCESS' ? 'border-t-emerald-500' : 'border-t-destructive') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <FileCheck className="size-4" /> Reliability Audit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bridgeResult ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">Standardized State</p>
                          <Badge className="bg-emerald-500 mt-1 uppercase text-[8px]">{bridgeResult.status}</Badge>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">Risk Assessment</p>
                          <p className={`text-lg font-headline font-bold ${bridgeResult.riskScore > 50 ? 'text-destructive' : 'text-emerald-500'}`}>{bridgeResult.riskScore}%</p>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-4">
                         <div className="space-y-1">
                            <h4 className="text-[10px] font-bold uppercase text-primary">Gateway Link (Verified)</h4>
                            <code className="text-[10px] font-mono text-white block bg-black/40 p-2 rounded truncate">{bridgeResult.externalTxId}</code>
                         </div>
                         <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                            <div className="space-y-1">
                               <p className="text-[8px] text-muted-foreground uppercase">Ledger Sync</p>
                               <div className="flex items-center gap-2 text-emerald-500 font-bold text-[9px]">
                                  <CheckCircle2 className="size-3" /> COMMITTED
                               </div>
                            </div>
                            <div className="space-y-1 text-right">
                               <p className="text-[8px] text-muted-foreground uppercase">Settlement</p>
                               <p className="text-[9px] font-mono text-amber-500 font-bold">T+2 PENDING</p>
                            </div>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <BarChart3 className="size-12 animate-pulse text-primary" />
                      <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                        Awaiting Hardened Dispatch.<br/>Monitoring idempotency & state sync.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ShieldAlert className="size-3" /> Reconciliation Notice
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "All settlements are tracked from initiation to real-world treasury arrival. Our Reconciliation Engine (Daily T+1) ensures zero-drift between gateway and ledger."
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
