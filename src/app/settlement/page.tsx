
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
  Landmark, 
  Globe, 
  ArrowRightLeft, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Menu,
  FileText,
  Activity,
  History,
  Scale
} from "lucide-react"
import { processInterBankTrade, InterBankSettlementOutput } from "@/ai/flows/inter-bank-settlement-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { connectToGemini } from "@/services/nexus-bridge"

export default function SettlementProtocolPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<InterBankSettlementOutput | null>(null)
  
  const [form, setForm] = useState({
    sourceBank: "CENTRAL-BANK-BD",
    targetBank: "SOVEREIGN-BANK-AE",
    amount: 500000,
    asset: "SOV-USDC",
    escrowConditions: "Release 100% funds upon digital Proof of Shipment verification for 1000 metric tons of Steel.",
    signature: "0x_SOV_HANDSHAKE_L4_MASTER"
  })

  async function handleInitiateTrade() {
    setLoading(true)
    setResult(null)
    
    try {
      // 1. AI Analysis & Forensic Audit
      const aiResult = await processInterBankTrade(form)
      setResult(aiResult)

      // 2. Gateway Handshake
      const gatewayResponse = await connectToGemini('SETTLE_INTER_BANK', {
        amount: form.amount,
        source: form.sourceBank,
        target: form.targetBank
      })

      // 3. Log to Sovereign Ledger
      await addDoc(collection(db, "inter_bank_settlements"), {
        ...form,
        settlementId: gatewayResponse.settlementId,
        status: aiResult.settlementStatus,
        riskScore: aiResult.forensicRiskScore,
        escrowId: aiResult.escrowId,
        taxAmount: aiResult.taxEstimation,
        timestamp: Date.now(),
        updatedAt: serverTimestamp()
      })

      toast({ 
        title: "Trade Handshake Successful", 
        description: `Settlement ID: ${gatewayResponse.settlementId}` 
      })
    } catch (e: any) {
      toast({ title: "Protocol Breach", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Landmark className="size-10 text-primary" />
                   Sovereign Trade Protocol
                 </h2>
              </div>
              <p className="text-muted-foreground">Mission 400: Project 156 - Atomic State-to-State Settlement Gateway.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2">
                 <Globe className="size-4 animate-spin-slow" /> INTER_COUNTRY_SYNC_L4
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <Scale className="size-4" /> Settlement Terminal
                    </CardTitle>
                    <CardDescription>Configure atomic trade parameters between sovereign banks.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Source Sovereign Bank</Label>
                        <Input value={form.sourceBank} onChange={e => setForm({...form, sourceBank: e.target.value})} className="bg-background/50 border-white/10 font-mono text-xs h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Target Sovereign Bank</Label>
                        <Input value={form.targetBank} onChange={e => setForm({...form, targetBank: e.target.value})} className="bg-background/50 border-white/10 font-mono text-xs h-10" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Volume</Label>
                        <Input type="number" value={form.amount} onChange={e => setForm({...form, amount: parseInt(e.target.value) || 0})} className="bg-background/50 border-white/10 font-headline text-lg h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Asset</Label>
                        <Input value={form.asset} onChange={e => setForm({...form, asset: e.target.value})} className="bg-background/50 border-white/10 font-bold text-xs h-12" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">Escrow Conditions (Smart-Lock)</Label>
                      <textarea 
                        value={form.escrowConditions} 
                        onChange={e => setForm({...form, escrowConditions: e.target.value})}
                        className="w-full h-24 bg-background/50 border border-white/10 rounded-md p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <Button 
                      onClick={handleInitiateTrade} 
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    >
                      {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                      Execute Inter-Bank Handshake
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${result ? (result.settlementStatus === 'REJECTED' ? 'border-t-destructive' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg flex items-center gap-2 uppercase tracking-tighter">
                        <Cpu className="size-5 text-primary" />
                        Nora-09 Protocol Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {result ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                              <p className="text-[8px] text-muted-foreground uppercase font-bold">Protocol Status</p>
                              <Badge className={result.settlementStatus === 'APPROVED' ? 'bg-emerald-500' : 'bg-amber-500'}>
                                 {result.settlementStatus}
                              </Badge>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                              <p className="text-[8px] text-muted-foreground uppercase font-bold">Forensic Risk</p>
                              <p className={`text-xl font-headline font-bold ${result.forensicRiskScore > 30 ? 'text-destructive' : 'text-emerald-500'}`}>
                                {result.forensicRiskScore}%
                              </p>
                            </div>
                          </div>

                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                             <h4 className="text-[10px] font-bold uppercase text-primary">Strategic Assessment</h4>
                             <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                               "{result.analysisReport}"
                             </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-3 bg-black/40 rounded border border-white/5">
                                <p className="text-[8px] text-muted-foreground uppercase mb-1">Escrow ID</p>
                                <p className="text-[10px] font-mono text-white">{result.escrowId}</p>
                             </div>
                             <div className="p-3 bg-black/40 rounded border border-white/5 text-right">
                                <p className="text-[8px] text-muted-foreground uppercase mb-1">Trade Levy</p>
                                <p className="text-[10px] font-mono text-emerald-500">${result.taxEstimation.toLocaleString()}</p>
                             </div>
                          </div>

                          <div className="space-y-2">
                             <h4 className="text-[10px] font-bold text-muted-foreground uppercase">Execution Directives</h4>
                             <div className="space-y-1">
                                {result.executionDirectives.map((d, i) => (
                                  <div key={i} className="flex items-center gap-2 text-[9px] text-emerald-500">
                                    <CheckCircle2 className="size-3" /> {d}
                                  </div>
                                ))}
                             </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                          <Activity className="size-16 text-primary animate-pulse" />
                          <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                            Await Protocol Dispatch.<br/>Enter trade data to initiate audit.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Sovereign Trust-Node
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Inter-Bank trade is the bedrock of empire. By bypassing legacy hubs, we reclaim 100% sovereignty over our national reserves."
                  </p>
                  <div className="pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-[9px] font-mono mb-1">
                       <span className="text-muted-foreground uppercase">Settlement speed</span>
                       <span className="text-emerald-500">&lt; 120ms</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono">
                       <span className="text-muted-foreground uppercase">Atomic Success Rate</span>
                       <span className="text-emerald-500">100.00%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Recent Settlements
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {[
                      { pair: "BD -> AE", amount: "$1.2M", time: "2m ago" },
                      { pair: "UK -> AE", amount: "$450K", time: "1h ago" },
                      { pair: "AE -> SG", amount: "$3.5M", time: "5h ago" }
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                         <div className="space-y-0.5">
                            <p className="text-[9px] font-bold text-white uppercase">{s.pair}</p>
                            <p className="text-[8px] text-muted-foreground font-mono">{s.time}</p>
                         </div>
                         <p className="text-[10px] font-headline font-bold text-primary">{s.amount}</p>
                      </div>
                    ))}
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
