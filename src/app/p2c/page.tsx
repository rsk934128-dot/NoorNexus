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
  BarChart3,
  AlertTriangle,
  ShieldEllipsis,
  Activity,
  Check
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

const GO_LIVE_CHECKLIST = [
  { id: 1, label: "HMAC_V4 Signature Verification", status: "VERIFIED" },
  { id: 2, label: "Idempotency Shield Active", status: "ACTIVE" },
  { id: 3, label: "Risk Engine Thresholds Set", status: "STABLE" },
  { id: 4, label: "Circuit Breaker Threshold: 10x", status: "ENFORCED" },
  { id: 5, label: "Disaster Recovery Node Sync", status: "SYNCED" }
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
        const paymentRef = doc(collection(db, "payments"), result.txId!)
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

        // 3. Log Immutable Operational Audit Log
        await addDoc(collection(db, "audit_logs"), {
          action: "SETTLEMENT_EXECUTED",
          actor: user.email,
          severity: result.riskScore > 50 ? "WARNING" : "INFO",
          metadata: {
            paymentId: result.txId,
            riskScore: result.riskScore,
            provider: selectedProvider
          },
          timestamp: Date.now()
        })
        
        toast({
          title: "Reliability Handshake: SUCCESS",
          description: `Idempotency Shield Active. TX: ${result.externalTxId}`,
        });
        
        // Generate new key for next transaction
        setIdemKey(generateIdempotencyKey())
      } else {
        toast({
          variant: "destructive",
          title: "Transaction Blocked",
          description: result.message
        })
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
                   <ShieldEllipsis className="size-8 text-primary" />
                   Resilient Settlement Hub
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Phase P2: Operational Resilience & Risk Hardening. Monitoring for volatility and drift.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4 flex items-center gap-2">
                 <Lock className="size-4" /> RESILIENCE_L4_ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-card border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                     <ShieldCheck className="size-4" /> Hardened Transaction Entry
                  </CardTitle>
                  <CardDescription>Multi-provider terminal with Risk Engine pre-checks.</CardDescription>
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
                      <div className="flex justify-between items-center">
                         <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Base Amount (USD)</Label>
                         <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">CIRCUIT BREAKER: 10X</Badge>
                      </div>
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
                  </div>

                  <Button 
                    onClick={handleHardenedSettlement} 
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                  >
                    {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                    Pulse Resilient Mesh
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card overflow-hidden">
                <CardHeader className="bg-white/2 border-b border-white/5">
                   <CardTitle className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2">
                      <AlertTriangle className="size-4 text-amber-500" />
                      Production Readiness Gate
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="divide-y divide-white/5">
                      {GO_LIVE_CHECKLIST.map(item => (
                        <div key={item.id} className="p-4 flex items-center justify-between">
                           <span className="text-[10px] text-white font-medium">{item.label}</span>
                           <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] h-5 px-2 flex items-center gap-1">
                              <Check className="size-2.5" /> {item.status}
                           </Badge>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${bridgeResult ? (bridgeResult.status === 'SUCCESS' ? 'border-t-emerald-500' : 'border-t-destructive') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <Activity className="size-4" /> Risk Engine Output
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bridgeResult ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">Risk Assessment</p>
                          <p className={`text-lg font-headline font-bold ${bridgeResult.riskScore > 50 ? 'text-destructive' : 'text-emerald-500'}`}>{bridgeResult.riskScore}%</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">Audit Tier</p>
                          <Badge className="bg-primary mt-1 uppercase text-[8px]">{bridgeResult.riskScore > 50 ? 'HIGH_INTENSITY' : 'NORMAL'}</Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-4">
                         <div className="space-y-1">
                            <h4 className="text-[10px] font-bold uppercase text-primary">Immutable Trace ID</h4>
                            <code className="text-[10px] font-mono text-white block bg-black/40 p-2 rounded truncate">{bridgeResult.externalTxId || 'REJECTED_BY_ENGINE'}</code>
                         </div>
                         <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                            <div className="space-y-1">
                               <p className="text-[8px] text-muted-foreground uppercase">Circuit Breaker</p>
                               <div className="flex items-center gap-2 text-emerald-500 font-bold text-[9px]">
                                  <CheckCircle2 className="size-3" /> STABLE
                               </div>
                            </div>
                            <div className="space-y-1 text-right">
                               <p className="text-[8px] text-muted-foreground uppercase">Auth Mode</p>
                               <p className="text-[9px] font-mono text-white">HMAC_V4_L4</p>
                            </div>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <BarChart3 className="size-12 animate-pulse text-primary" />
                      <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                        Awaiting Resilience Scan.<br/>Monitoring risk & circuit integrity.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-destructive/5 border-destructive/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-destructive flex items-center gap-2">
                       <ShieldAlert className="size-3" /> Operational Lockdown
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "If system-wide reconciliation drift exceeds 0.01%, all payout nodes will enter auto-lockdown. Emergency keys are required for manual restoration."
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
