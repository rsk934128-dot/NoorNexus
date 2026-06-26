"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Activity
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
      // 1. Nora-12 Verification & Conversion
      setAuditStep(isDryRun ? "Nora-12: Dry Run Verification..." : "Nora-12: Verifying Withdrawal Intent...")
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
        status: "COMPLETED"
      })

      toast({ 
        title: isDryRun ? "Dry Run Successful" : "Off-Ramp Authorized", 
        description: `Certificate generated: CERT-P161...`,
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
                 <Badge variant="outline" className={`h-8 px-3 flex items-center gap-2 ${isDryRun ? 'border-amber-500/50 text-amber-500 bg-amber-500/5' : 'border-emerald-500/50 text-emerald-500 bg-emerald-500/5'}`}>
                   <Activity className="size-3" /> {isDryRun ? 'DRY_RUN_MODE: ON' : 'PRODUCTION_MODE: ON'}
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Asset <span className="text-primary">Exit.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 500: Global Asset Liquidity. Converting digital wealth into real-world fiat with autonomous auditing and cold-storage anchoring.
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
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

                 {/* Nora Response & Result */}
                 <Card className={`glass-card transition-all duration-500 border-t-4 ${result ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                          <Cpu className="size-4" /> Settlement Intelligence
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {result ? (
                         <div className="space-y-6 animate-in fade-in zoom-in-95">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-4">
                               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Conversion Logic</span>
                                  <Badge className="bg-emerald-500">{isDryRun ? 'DRY_RUN_PASSED' : 'AUTHORIZED'}</Badge>
                               </div>
                               <div className="text-center py-4">
                                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Payout Estimate</p>
                                  <p className="text-4xl font-headline font-bold text-white tracking-tighter">
                                     {result.convertedAmount.toLocaleString()}<span className="text-primary text-xs ml-1 font-mono">{result.localCurrency}</span>
                                  </p>
                               </div>
                               <p className="text-[10px] text-white italic leading-relaxed text-center">"{result.reasoning}"</p>
                            </div>

                            {certificate && (
                               <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl space-y-2">
                                  <div className="flex items-center gap-2">
                                     <FileCheck className="size-4 text-primary" />
                                     <p className="text-[10px] font-bold text-white uppercase tracking-widest">Digital Audit Certificate</p>
                                  </div>
                                  <code className="text-[9px] font-mono text-primary block break-all bg-black/40 p-2 rounded">{certificate}</code>
                                  <p className="text-[7px] text-muted-foreground uppercase">Project #55: Anchored to Cold Storage Node 1</p>
                               </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-3 bg-black/40 rounded border border-white/5">
                                  <p className="text-[8px] text-muted-foreground uppercase mb-1">Processing Fee</p>
                                  <p className="text-xs font-mono text-emerald-500">{result.fee}% Mesh Native</p>
                               </div>
                               <div className="p-3 bg-black/40 rounded border border-white/5 text-right">
                                  <p className="text-[8px] text-muted-foreground uppercase mb-1">ETA Completion</p>
                                  <p className="text-xs font-mono text-white">{result.eta}</p>
                               </div>
                            </div>
                         </div>
                       ) : (
                         <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                            <Fingerprint className="size-16 text-primary animate-pulse" />
                            <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                               Awaiting Exit Intent.<br/>Project #161 active.
                            </p>
                         </div>
                       )}
                    </CardContent>
                 </Card>
              </div>

              {/* Verified Banks & Hubs List */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="size-4" /> Validated Fiat Endpoints
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: "bKash Core", region: "South Asia", status: "LIVE", type: "Mobile" },
                      { name: "GrabPay Hub", region: "SE Asia", status: "VERIFIED", type: "Gateway" },
                      { name: "GCash Mesh", region: "Philippines", status: "ACTIVE", type: "Mobile" },
                      { name: "Dubai Central", region: "Middle East", status: "SCA_SYNCED", type: "Bank" },
                      { name: "Irish Corridor", region: "Europe", status: "SEPA_READY", type: "Direct" }
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
                      "Every exit from the NoorNexus Vault is audited by Nora-52 and anchored as an immutable proof in Project #55."
                   </p>
                   <div className="pt-2 space-y-3">
                      {[
                        { label: "Vault Sync", val: "100%", icon: Archive },
                        { label: "Audit Veracity", val: "99.9%", icon: FileText },
                        { label: "Certificate generation", val: "AUTOMATED", icon: Lock }
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
                     { dest: "bKash: +88017", amount: "5,000 BDT", time: "2m ago" },
                     { dest: "Grab: SE_HUB_1", amount: "1,200 THB", time: "1h ago" },
                     { dest: "Visa: **** 9012", amount: "$450.00", time: "5h ago" }
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
                       <ShieldPlus className="size-3" /> Fraud Isolation
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">
                       Off-Ramp operations > $10,000 trigger an immediate Nora-50 Legacy Core review before settlement release.
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
