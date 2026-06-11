
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
  CreditCard,
  Fingerprint,
  RefreshCcw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"
import { executeMappedPayout, PayoutResult } from "@/services/pay-bridge"

const SETTLEMENT_PROVIDERS = [
  { id: "bKash", name: "bKash Hub (BDT)", icon: Smartphone },
  { id: "Xendit", name: "Xendit Gateway (THB/USD)", icon: Globe },
  { id: "Sovereign", name: "Internal Mesh", icon: ShieldCheck }
]

export default function P2CSettlementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [bridgeResult, setBridgeResult] = useState<PayoutResult | null>(null)
  const [selectedProvider, setSelectedProvider] = useState("bKash")

  const [form, setForm] = useState({
    amount: 100,
    merchantId: "PARTNER-NODE-01",
  })

  async function handleMappedSettlement() {
    if (!user) return
    setLoading(true)
    setBridgeResult(null)
    try {
      const result = await executeMappedPayout(
        form.amount, 
        selectedProvider, 
        { email: user.email || "guest", systemId: user.uid }
      );
      
      setBridgeResult(result);
      
      if (result.status === 'APPROVED') {
        await addDoc(collection(db, "compliance_records"), {
          ...form,
          provider: selectedProvider,
          mappedAmount: result.amount,
          currency: result.currency,
          txId: result.txId,
          externalTxId: result.externalTxId,
          timestamp: Date.now(),
          userEmail: user.email
        });
        
        toast({
          title: "Integration Handshake Finalized",
          description: `Transaction ID synced: ${result.externalTxId}`,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Mapping Failure",
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
                Mapping Concept: Currency, Transaction ID, Metadata, and Status Synchronization.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4 flex items-center gap-2">
                 <Globe className="size-4" /> INTEGRATION_MAPPING_V3
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Coins className="size-4" /> Provider Selection
                </CardTitle>
                <CardDescription>Select bKash or Xendit for API Mapping verification.</CardDescription>
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
                </div>

                <Button 
                  onClick={handleMappedSettlement} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                  Test API Mapping
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${bridgeResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <FileCheck className="size-4" /> Mapping Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bridgeResult ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Mapped Currency</p>
                          <p className="text-lg font-headline font-bold text-white">{bridgeResult.amount} {bridgeResult.currency}</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Mapped Status</p>
                          <Badge className="bg-emerald-500 mt-1">{bridgeResult.status}</Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-4">
                         <div className="space-y-1">
                            <h4 className="text-[10px] font-bold uppercase text-primary">Gateway Transaction ID (Synced)</h4>
                            <code className="text-[10px] font-mono text-white block bg-black/40 p-2 rounded">{bridgeResult.externalTxId}</code>
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                               <Fingerprint className="size-3" /> User Metadata (Passed)
                            </h4>
                            <p className="text-[9px] font-mono text-muted-foreground">ID: {user?.uid}</p>
                            <p className="text-[9px] font-mono text-muted-foreground">EMAIL: {user?.email}</p>
                         </div>
                         <div className="flex items-center gap-2 text-[8px] text-emerald-500 font-bold uppercase pt-2 border-t border-white/5">
                            <CheckCircle2 className="size-3" /> bKash/Xendit System Sync: 100%
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <RefreshCcw className="size-12 animate-spin-slow text-primary" />
                      <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                        Awaiting Handshake Simulator.<br/>Provider logic will map responses here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <RefreshCcw className="size-3" />
                       Integration Strategy
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "Once documentation arrives, we only need to update the rates and status codes in pay-bridge.ts. The UI and database architecture are already fully synced."
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
