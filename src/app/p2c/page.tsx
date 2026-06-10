
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
  Building2, Users, ShieldAlert, Zap, Loader2, FileCheck, 
  Landmark, Globe, Coins, ShieldCheck, ArrowRightLeft, Lock, Menu, CheckCircle2, AlertCircle
} from "lucide-react"
import { auditP2CSettlement, P2CSettlementOutput } from "@/ai/flows/p2c-settlement-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"
import { executeSovereignPayout, PayoutResult } from "@/services/pay-bridge"

export default function P2CSettlementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [bridgeResult, setBridgeResult] = useState<PayoutResult | null>(null)

  const [form, setForm] = useState({
    merchantId: "IMPERIAL-CORP-01",
    amount: 150,
    asset: "USDC (Stablecoin)",
    recipientCount: 1,
    signature: "0x_HMAC_V4_SIGNATURE_STABLE"
  })

  async function handleBridgeSettlement() {
    setLoading(true)
    setBridgeResult(null)
    try {
      // Execute the Joint Handshake with Gemini and PayBridge
      const result = await executeSovereignPayout(form.amount, form.asset, form.merchantId);
      setBridgeResult(result);
      
      if (result.status === 'APPROVED') {
        await addDoc(collection(db, "p2c_transactions"), {
          ...form,
          status: "APPROVED",
          txId: result.txId,
          type: "BRIDGE_SETTLEMENT",
          timestamp: Date.now()
        });
        
        toast({
          title: "Disbursement Authorized",
          description: "Pay-Bridge handshake successful.",
        });
      } else if (result.status === 'PENDING_SOVEREIGN_SEAL') {
        toast({
          title: "Sovereign Seal Required",
          description: "Transaction held for your direct command.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Pay-Bridge Error",
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
                 <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                   <Building2 className="size-8 text-primary" />
                   Sovereign P2C Hub
                 </h2>
              </div>
              <p className="text-muted-foreground">
                Phase 3: Merchant Stablecoin Bridge & Pay-Bridge Integration.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 h-10 px-4 flex items-center gap-2">
                 <ShieldCheck className="size-4" /> ATOMIC SETTLEMENT
               </Badge>
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4 flex items-center gap-2">
                 <ArrowRightLeft className="size-4" /> PAY-BRIDGE ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Coins className="size-4" /> Bridge Authorization
                </CardTitle>
                <CardDescription>Initiate payout via Tiered Risk Approval logic.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Merchant Entity</Label>
                      <Input 
                        value={form.merchantId} 
                        onChange={e => setForm({...form, merchantId: e.target.value})}
                        className="bg-background/50 border-white/10 font-mono text-xs" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Asset</Label>
                      <Input 
                        value={form.asset} 
                        onChange={e => setForm({...form, asset: e.target.value})}
                        className="bg-background/50 border-white/10 font-mono text-xs" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                       <Label className="text-[10px] uppercase font-bold text-muted-foreground">Volume ($)</Label>
                       <span className="text-[8px] font-mono text-primary uppercase">Tier: {form.amount > 500 ? 'L4_MANUAL' : form.amount > 100 ? 'L3_AI' : 'L1_AUTO'}</span>
                    </div>
                    <Input 
                      type="number"
                      value={form.amount} 
                      onChange={e => setForm({...form, amount: parseInt(e.target.value) || 0})}
                      className="bg-background/50 border-white/10 font-headline text-lg font-bold" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                   <h4 className="text-[10px] font-bold uppercase text-primary tracking-widest">Risk Shield Parameters</h4>
                   <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono">
                        <span>Auto-Approve:</span>
                        <span className="text-emerald-500">&le; $100</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-mono">
                        <span>AI Forensics:</span>
                        <span className="text-amber-500">$101 - $500</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-mono">
                        <span>Sovereign Seal:</span>
                        <span className="text-destructive">&gt; $500</span>
                      </div>
                   </div>
                </div>

                <Button 
                  onClick={handleBridgeSettlement} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                  Authorize Pay-Bridge
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${bridgeResult ? (bridgeResult.status === 'APPROVED' ? 'border-t-emerald-500' : 'border-t-destructive') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <FileCheck className="size-4" /> Pay-Bridge Handshake Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bridgeResult ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Bridge Status</p>
                          <Badge variant={bridgeResult.status === 'APPROVED' ? 'default' : 'destructive'} className={bridgeResult.status === 'APPROVED' ? 'bg-emerald-500' : ''}>
                             {bridgeResult.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Fraud Score</p>
                          <p className={`text-3xl font-headline font-bold ${bridgeResult.riskScore > 50 ? 'text-destructive' : 'text-primary'}`}>{bridgeResult.riskScore}%</p>
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 rounded border border-white/5 space-y-3">
                        <p className="text-[11px] font-mono text-muted-foreground leading-relaxed italic">
                           "{bridgeResult.message}"
                        </p>
                        {bridgeResult.txId && (
                           <div className="pt-2 border-t border-white/5">
                              <p className="text-[8px] uppercase text-muted-foreground font-bold">Transaction ID</p>
                              <code className="text-[10px] text-primary">{bridgeResult.txId}</code>
                           </div>
                        )}
                      </div>

                      {bridgeResult.status === 'PENDING_SOVEREIGN_SEAL' && (
                        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
                           <Lock className="size-5 text-destructive" />
                           <p className="text-[9px] uppercase font-bold text-destructive tracking-tighter">
                              Awaiting L4 Master Override from Command Center.
                           </p>
                        </div>
                      )}
                      
                      {bridgeResult.status === 'APPROVED' && (
                        <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                           <CheckCircle2 className="size-5 text-emerald-500" />
                           <p className="text-[9px] uppercase font-bold text-emerald-500 tracking-tighter">
                              Handshake Complete. Funds indexed in Treasury Ledger.
                           </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <ShieldAlert className="size-12" />
                      <p className="text-xs font-mono uppercase tracking-widest">Awaiting Bridge Handshake</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-primary/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                       <ArrowRightLeft className="size-3" />
                       Treasury Payout Status
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2">
                    <div className="flex justify-between text-[9px] font-mono">
                       <span>Settlement Cycle:</span>
                       <span className="text-emerald-500 font-bold uppercase">T+1 Standard</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono">
                       <span>FX Spread (Stable):</span>
                       <span className="text-primary">0.15% (Optimized)</span>
                    </div>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
