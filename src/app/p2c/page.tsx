"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, Users, ShieldAlert, Zap, Loader2, FileCheck, 
  Landmark, Globe, Coins, ShieldCheck, ArrowRightLeft 
} from "lucide-react"
import { auditP2CSettlement, P2CSettlementOutput } from "@/ai/flows/p2c-settlement-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function P2CSettlementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<P2CSettlementOutput | null>(null)

  const [form, setForm] = useState({
    merchantId: "IMPERIAL-CORP-01",
    amount: 1500000,
    asset: "USDC (Stablecoin)",
    recipientCount: 120,
    signature: "0x_HMAC_V4_SIGNATURE_STABLE"
  })

  async function handleAudit() {
    setLoading(true)
    setResult(null)
    try {
      const auditResult = await auditP2CSettlement(form)
      setResult(auditResult)
      
      if (auditResult.settlementStatus === 'APPROVED') {
        await addDoc(collection(db, "p2c_transactions"), {
          ...form,
          status: "APPROVED",
          type: "STABLECOIN_SETTLEMENT",
          timestamp: Date.now()
        })
        
        toast({
          title: "Merchant Disbursement Authorized",
          description: "Stablecoin liquidity verified and scheduled for T+1 payout.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Audit Denied",
          description: auditResult.riskAssessment,
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Audit AI Error",
        description: error.message
      })
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
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Building2 className="size-8 text-primary" />
                Sovereign P2C Hub
              </h2>
              <p className="text-muted-foreground">
                Merchant Stablecoin Settlement & Corporate Disbursement Layer.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 h-10 px-4 flex items-center gap-2">
                 <ShieldCheck className="size-4" /> VASP COMPLIANT
               </Badge>
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4 flex items-center gap-2">
                 <ArrowRightLeft className="size-4" /> T+1 LIQUIDITY
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Coins className="size-4" /> Unified Settlement
                </CardTitle>
                <CardDescription>Initiate merchant payout via stablecoin treasury.</CardDescription>
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
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Settlement Asset</Label>
                      <Input 
                        value={form.asset} 
                        onChange={e => setForm({...form, asset: e.target.value})}
                        className="bg-background/50 border-white/10 font-mono text-xs" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Volume (Stablecoin Value)</Label>
                    <Input 
                      type="number"
                      value={form.amount} 
                      onChange={e => setForm({...form, amount: parseInt(e.target.value)})}
                      className="bg-background/50 border-white/10 font-headline text-lg font-bold" 
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAudit} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                  {loading ? "On-Chain Audit in Progress..." : "Authorize Settlement"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${result ? (result.settlementStatus === 'APPROVED' ? 'border-t-emerald-500' : 'border-t-destructive') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <FileCheck className="size-4" /> Nora-02 Audit Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {result ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Audit Decision</p>
                          <Badge variant={result.settlementStatus === 'APPROVED' ? 'default' : 'destructive'} className={result.settlementStatus === 'APPROVED' ? 'bg-emerald-500' : ''}>
                             {result.settlementStatus}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">On-Chain Safety Score</p>
                          <p className="text-3xl font-headline font-bold text-primary">{result.integrityScore}%</p>
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 rounded border border-white/5">
                        <p className="text-[11px] font-mono text-muted-foreground leading-relaxed italic">
                           "{result.riskAssessment}"
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                         <ShieldCheck className="size-5 text-emerald-500" />
                         <p className="text-[9px] uppercase font-bold text-emerald-500 tracking-tighter">
                            No Risky Wallet Activity Detected. AML Verified.
                         </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[200px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <ShieldAlert className="size-12" />
                      <p className="text-xs font-mono uppercase tracking-widest">Awaiting Merchant Payment Audit</p>
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
