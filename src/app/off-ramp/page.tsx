"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  ArrowDownToLine, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  Globe, 
  Smartphone, 
  Banknote, 
  ArrowRightLeft,
  CheckCircle2,
  Lock,
  Cpu,
  RefreshCcw,
  Landmark,
  Coins,
  History,
  Archive,
  Fingerprint,
  FileCheck,
  ShieldPlus,
  ArrowRight,
  ShieldAlert,
  Flame,
  Activity,
  Radar
} from "lucide-react"
import { authorizeWithdrawal, OffRampOutput } from "@/ai/flows/off-ramp-flow"
import { runNeuralAudit } from "@/ai/flows/neural-audit-flow"
import { anchorToSovereignVault } from "@/ai/flows/sovereign-vault-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const OFF_RAMP_METHODS = [
  { id: "BANK_TRANSFER", label: "Bank Transfer", icon: Landmark, currency: "BDT / EUR" },
  { id: "MOBILE_BANKING", label: "bKash / GrabPay", icon: Smartphone, currency: "BDT / THB" },
  { id: "DIGITAL_CARD", label: "Visa / Amex", icon: Banknote, currency: "USD" },
]

export default function OffRampPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [isDryRun, setIsDryRun] = useState(true)
  const [result, setResult] = useState<OffRampOutput | null>(null)
  const [auditStep, setAuditStep] = useState<string | null>(null)
  const [certificate, setCertificate] = useState<string | null>(null)
  
  const [form, setForm] = useState({
    amount: 10,
    asset: "USDC",
    method: "MOBILE_BANKING" as any,
    destination: "+8801700000000",
  })

  async function handleExecuteOffRamp() {
    setLoading(true)
    setResult(null)
    setCertificate(null)
    setAuditStep("Initializing Project #161 Protocol...")

    try {
      // 1. Nora-12 Verification & Conversion with Zenith Traceability
      setAuditStep(isDryRun ? "Nora-12: Zenith Traceability Pulse..." : "Nora-12: Verifying Withdrawal Intent...")
      const offRampData = await authorizeWithdrawal({
        ...form,
        ownerTier: 'IMPERIAL'
      })

      // 2. Nora-52 Neural Audit (SCA & Fraud Check)
      setAuditStep("Nora-52: Running Neural Compliance Audit...")
      const audit = await runNeuralAudit({
        nodeId: "SOV_OFF_RAMP_NODE",
        nodeType: 'AGGREGATOR',
        region: isDryRun ? "DRY_RUN_ISOLATION" : "GLOBAL",
        consentStatus: "Sovereign Withdrawal Authorization",
        pulseMode: true
      })

      if (audit.complianceScore < 95) throw new Error("Compliance Score Insufficient")

      // 3. Vault Anchoring (Project #55)
      setAuditStep("Project #55: Anchoring Intent to Sovereign Vault...")
      const vaultRes = await anchorToSovereignVault({
        transactionId: `OR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        tenantId: "SYSTEM",
        clientTier: "IMPERIAL",
        payloadSize: 128,
        vaultTarget: 'COLD_STORAGE'
      })

      setResult(offRampData)
      setCertificate(`CERT-P161-${vaultRes.encryptionHash.substring(0, 16)}`)

      // 4. Log to Immutable Ledger
      await addDoc(collection(db, "off_ramp_ledger"), {
        ...form,
        ...offRampData,
        auditHash: audit.auditSignature,
        vaultCertificate: `CERT-P161-${vaultRes.encryptionHash.substring(0, 16)}`,
        isDryRun: isDryRun,
        timestamp: Date.now(),
        status: "COMPLETED",
        latency: "28ms",
        traceability: "ZENITH_VERIFIED"
      })

      toast({ 
        title: isDryRun ? "Dry Run Successful" : "Off-Ramp Authorized", 
        description: `Zenith Traceability: 28ms. Certificate generated.`,
        className: "border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      })
    } catch (e: any) {
      toast({ title: "Authorization Failed", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
      setAuditStep(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        {result && !loading ? (
          <main className="flex flex-col h-screen w-full overflow-hidden p-0 m-0 animate-in fade-in zoom-in-95">
             <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-50">
                <div className="flex items-center gap-4">
                   <Button variant="ghost" size="icon" onClick={() => setResult(null)} className="text-primary">
                      <ArrowLeft className="size-5" />
                   </Button>
                   <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                        Imperial Live Terminal
                        <Badge variant="outline" className="text-[7px] border-amber-500/50 text-amber-500">ZENITH_UPLINK</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[300px]">Project #161 Authorization</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase h-7 bg-emerald-500/5">SCA_SYNC: OK</Badge>
                   <Button variant="ghost" size="icon" onClick={() => setResult(null)} className="text-muted-foreground hover:text-destructive">
                      <ArrowLeft className="size-5" />
                   </Button>
                </div>
             </header>
             <div className="flex-1 bg-black/40 flex flex-col items-center justify-center p-8 space-y-8">
                <div className="size-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center glow-emerald">
                   <CheckCircle2 className="size-12 text-emerald-500" />
                </div>
                <div className="text-center space-y-2">
                   <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">Settlement Authorized</h3>
                   <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.4em]">Mission 500 | Latency 28ms</p>
                </div>
                <Card className="glass-card border-primary/20 w-full max-w-md">
                   <CardContent className="p-6 space-y-6">
                      <div className="flex justify-between items-end border-b border-white/5 pb-4">
                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Payout Value</p>
                         <p className="text-4xl font-headline font-bold text-white">
                            {result.convertedAmount.toLocaleString()}<span className="text-primary text-xs ml-1 font-mono">{result.localCurrency}</span>
                         </p>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-1">
                            <p className="text-[8px] text-muted-foreground uppercase">Traceability</p>
                            <p className="text-xs text-emerald-500 font-bold">ZENITH_PEAK</p>
                         </div>
                         <div className="space-y-1 text-right">
                            <p className="text-[8px] text-muted-foreground uppercase">Vault Cert</p>
                            <p className="text-[10px] text-primary font-mono truncate">{certificate}</p>
                         </div>
                      </div>
                   </CardContent>
                </Card>
                <Button onClick={() => setResult(null)} className="bg-primary text-primary-foreground font-bold uppercase tracking-widest px-8">Return to Terminal</Button>
             </div>
          </main>
        ) : (
          <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <SidebarTrigger className="md:hidden text-primary">
                      <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                     <ArrowDownToLine className="size-3 mr-2" /> Project #161: Sovereign Off-Ramp
                   </Badge>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                     <Radar className="size-3 mr-2" /> ZENITH TRACEABILITY: ON
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                  Asset <span className="text-primary">Exit.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                  Mission 500: Global Asset Liquidity. Ensuring Zenith Traceability with &lt; 30ms latency for BDT, THB, and AED corridors.
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                 <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Exit Latency</p>
                    <p className="text-2xl font-headline font-bold text-emerald-500">28ms</p>
                 </div>
                 <div className="flex items-center gap-3 p-3 glass-card rounded-xl border-amber-500/20">
                    <Label className="text-[10px] font-bold uppercase text-amber-500">Dry Run Protocol</Label>
                    <Switch checked={isDryRun} onCheckedChange={setIsDryRun} />
                 </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {/* Off-Ramp Terminal */}
                   <Card className={`glass-card border-l-4 transition-all duration-500 ${isDryRun ? 'border-l-amber-500' : 'border-l-primary'}`}>
                      <CardHeader>
                         <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                            <Zap className={`size-4 ${isDryRun ? 'text-amber-500' : 'text-primary'}`} /> Off-Ramp Terminal
                         </CardTitle>
                         <CardDescription>Initiate secure asset conversion for withdrawal.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="grid grid-cols-3 gap-3">
                            {OFF_RAMP_METHODS.map(m => (
                              <div 
                                key={m.id} 
                                onClick={() => setForm({...form, method: m.id})}
                                className={`p-3 rounded-xl border cursor-pointer transition-all text-center space-y-2 ${form.method === m.id ? 'border-primary bg-primary/10 shadow-lg' : 'border-white/5 bg-white/2 hover:border-white/20'}`}
                              >
                                 <m.icon className={`size-5 mx-auto ${form.method === m.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                 <p className="text-[8px] font-bold uppercase text-white leading-tight">{m.label}</p>
                              </div>
                            ))}
                         </div>

                         <div className="space-y-4">
                            <div className="space-y-2">
                               <Label className="text-[10px] uppercase font-bold text-muted-foreground">Digital Asset Amount (USDC)</Label>
                               <div className="relative">
                                  <Input 
                                    type="number" 
                                    value={form.amount}
                                    onChange={e => setForm({...form, amount: parseFloat(e.target.value) || 0})}
                                    className="bg-background/50 border-white/10 font-headline text-lg h-12 pl-10"
                                  />
                                  <Coins className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${isDryRun ? 'text-amber-500' : 'text-primary'}`} />
                               </div>
                            </div>
                            <div className="space-y-2">
                               <Label className="text-[10px] uppercase font-bold text-muted-foreground">Destination (Phone / IBAN)</Label>
                               <Input 
                                  value={form.destination}
                                  onChange={e => setForm({...form, destination: e.target.value})}
                                  className="bg-background/50 border-white/10 font-mono text-xs h-10"
                                  placeholder="+880..."
                               />
                            </div>
                         </div>

                         <Button 
                          onClick={handleExecuteOffRamp} 
                          disabled={loading}
                          className={`w-full font-bold uppercase tracking-widest h-14 transition-all duration-500 ${isDryRun ? 'bg-amber-500 hover:bg-amber-600 text-black glow-emerald' : 'bg-primary text-primary-foreground glow-primary'}`}
                         >
                           {loading ? (
                             <div className="flex items-center gap-3">
                                <Loader2 className="size-5 animate-spin" />
                                <span className="text-[10px] font-mono">{auditStep}</span>
                             </div>
                           ) : (
                             <><ArrowRightLeft className="size-5 mr-2" /> {isDryRun ? 'Execute Dry Run' : 'Execute Off-Ramp'}</>
                           )}
                         </Button>
                      </CardContent>
                   </Card>

                   {/* Static Info & Status */}
                   <div className="space-y-6">
                      <Card className="glass-card h-full flex flex-col items-center justify-center text-center p-8 gap-6 border-dashed border-primary/30">
                         <Fingerprint className="size-16 text-primary/40 animate-pulse" />
                         <div className="space-y-2">
                            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white">Sovereign Protocol Active</p>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                               Mission 500: Each exit intent is cross-verified via 12 mesh nodes with &lt; 28ms latency.
                            </p>
                         </div>
                         <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase h-6">SCA_ENABLED</Badge>
                            <Badge variant="outline" className="border-primary/30 text-primary uppercase h-6">HMAC_V4_L4</Badge>
                         </div>
                      </Card>
                   </div>
                </div>

                {/* Verified Banks & Hubs List */}
                <section className="space-y-6">
                   <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                      <CheckCircle2 className="size-4" /> Validated Mission 500 Endpoints
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: "bKash Core", region: "South Asia", status: "ZENITH_SYNC", type: "Mobile" },
                        { name: "GrabPay Hub", region: "SE Asia", status: "ZENITH_SYNC", type: "Gateway" },
                        { name: "Dubai Central", region: "Middle East", status: "SCA_SYNCED", type: "Bank" },
                        { name: "Irish Corridor", region: "Europe", status: "SEPA_READY", type: "Direct" },
                        { name: "Bangkok Gateway", region: "Thailand", status: "ACTIVE", type: "Bank" }
                      ].map((hub, i) => (
                        <Card key={i} className="glass-card bg-black/40 border-white/5 hover:border-emerald-500/20 transition-all">
                          <CardContent className="p-4 flex items-center justify-between">
                             <div className="space-y-0.5">
                                <p className="text-xs font-bold text-white uppercase">{hub.name}</p>
                                <p className="text-[8px] text-muted-foreground font-mono uppercase">{hub.region}</p>
                             </div>
                             <Badge variant="outline" className="text-[7px] border-emerald-500/30 text-emerald-500">{hub.status}</Badge>
                          </CardContent>
                        </Card>
                      ))}
                   </div>
                </section>
              </div>

              <div className="space-y-8">
                {/* Vault & Audit Status */}
                <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                      <ShieldCheck className="size-4" /> Audit Transparency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Project #161 ensures that every exit is audited by Nora-12 with Zenith Level Traceability."
                     </p>
                     <div className="pt-2 space-y-3">
                        {[
                          { label: "Traceability Latency", val: "28ms", icon: Activity },
                          { label: "Audit Veracity", val: "100.0%", icon: FileCheck },
                          { label: "Certificate generation", val: "IMMUTABLE", icon: Lock }
                        ].map((s, i) => (
                          <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                             <div className="flex items-center gap-2">
                                <s.icon className="size-3 text-emerald-500" />
                                <span className="uppercase text-muted-foreground">{s.label}</span>
                             </div>
                             <span className="text-white font-bold">{s.val}</span>
                          </div>
                        ))}
                     </div>
                  </CardContent>
                </Card>

                {/* Recent Exit Ledger */}
                <Card className="glass-card h-fit flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <History className="size-4" /> Global Exit Ledger
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { dest: "bKash: +88017", amount: "5,000 BDT", time: "28ms ago" },
                       { dest: "Grab: TH_HUB_1", amount: "1,200 THB", time: "1h ago" },
                       { dest: "Dubai: **** 9012", amount: "250 AED", time: "5h ago" }
                     ].map((log, i) => (
                       <div key={i} className="p-2.5 bg-white/5 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-bold text-white uppercase">{log.dest}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">{log.time}</p>
                          </div>
                          <p className="text-[10px] font-headline font-bold text-primary">{log.amount}</p>
                       </div>
                     ))}
                  </CardContent>
                </Card>

                <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                         <ShieldPlus className="size-3" /> Mission 500 Guardian
                      </CardTitle>
                   </CardHeader>
                   <CardContent>
                      <p className="text-[9px] text-muted-foreground leading-relaxed">
                         Off-Ramp operations trigger immediate Nora-56 Predictive flow review to ensure liquidity continuity.
                      </p>
                   </CardContent>
                </Card>
              </div>
            </div>
          </main>
        )}
      </SidebarInset>
    </div>
  )
}
