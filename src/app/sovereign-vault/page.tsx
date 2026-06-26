"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Lock, 
  ShieldCheck, 
  Zap, 
  Menu, 
  Database, 
  Cpu, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert,
  History,
  Archive,
  Fingerprint,
  Waves,
  Infinity,
  EyeOff,
  Flame,
  Key,
  Users,
  ShieldPlus,
  Atom,
  ScrollText,
  FileCode,
  LockKeyhole
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { anchorToSovereignVault, SovereignVaultOutput } from "@/ai/flows/sovereign-vault-flow"

export default function SovereignVaultPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [archiving, setArchiving] = useState(false)
  const [vaultResult, setVaultResult] = useState<SovereignVaultOutput | null>(null)
  const [vaultHistory, setVaultHistory] = useState<any[]>([])
  
  const OFFICIAL_APP_ID = "a085f875-dac3-47ef-83dd-b00d56df81d3"

  const [form, setForm] = useState({
    txId: "SOV-HNW-998811",
    tenantId: "TENANT_01",
    tier: "IMPERIAL" as any,
    target: "COLD_STORAGE" as any
  })

  async function handleVaultAnchoring() {
    setLoading(true)
    try {
      const result = await anchorToSovereignVault({
        transactionId: form.txId,
        tenantId: form.tenantId,
        clientTier: form.tier,
        payloadSize: 1024,
        vaultTarget: form.target
      })
      setVaultResult(result)
      setVaultHistory(prev => [result, ...prev].slice(0, 5))
      toast({ 
        title: "Deep Storage Anchored", 
        description: `Project #55: Data isolated for ${form.tenantId}.` 
      })
    } catch (e: any) {
      toast({ title: "Vault Failure", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleManifestoArchive() {
    setArchiving(true)
    try {
      const result = await anchorToSovereignVault({
        transactionId: "IMPERIAL_MANIFESTO_V3.5",
        tenantId: "SYSTEM",
        clientTier: "IMPERIAL",
        payloadSize: 512,
        vaultTarget: "SYSTEM_MANIFEST_ARCHIVE"
      })
      setVaultResult(result)
      toast({ 
        title: "Manifesto Anchored", 
        description: "Immutable snapshot of Imperial Manifesto v3.5 secured in Cold Storage." 
      })
    } catch (e: any) {
      toast({ title: "Archive Failure", variant: "destructive" })
    } finally {
      setArchiving(false)
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
                   <Lock className="size-3 mr-2" /> Project #55: The Sovereign Vault
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <ShieldPlus className="size-3 mr-2" /> Key Anchoring Active
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Isolated <span className="text-primary">Storage.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Deep storage for enterprise secrets." নূরনেক্সাস এখন এন্টারপ্রাইজ এপিআই চাবিকাঠিগুলোকে অভেদ্য কোল্ড-স্টোরেজে অ্যাঙ্কর করছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Vault Status</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase">SYNCHRONIZED</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
               
               {/* Archive Integrity: NEW */}
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ScrollText className="size-32 text-primary" />
                  </div>
                  <CardHeader>
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Archive className="size-4 text-primary" /> System Archive Integrity
                           </CardTitle>
                           <CardDescription className="text-xs">Mission 400: Immutable Snapshot of Sovereign Configurations.</CardDescription>
                        </div>
                        <Button 
                          onClick={handleManifestoArchive} 
                          disabled={archiving}
                          className="bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 px-6 glow-primary gap-2"
                        >
                           {archiving ? <Loader2 className="size-3 animate-spin" /> : <LockKeyhole className="size-3" />}
                           Anchor System Manifesto
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {[
                       { label: "Manifesto v3.5", status: "READY_FOR_ANCHOR", icon: ScrollText },
                       { id: "Core Config", status: "LOCKED", icon: FileCode },
                       { id: "HMAC_V4 Master", status: "VAULTED", icon: Key }
                     ].map((item, i) => (
                       <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
                          <item.icon className="size-4 text-primary" />
                          <div className="space-y-0.5">
                             <p className="text-[9px] text-white font-bold uppercase">{item.label || item.id}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">{item.status}</p>
                          </div>
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Vault Terminal */}
                  <Card className="glass-card border-l-4 border-l-primary">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                          <Archive className="size-4" /> Isolated Terminal
                       </CardTitle>
                       <CardDescription>Anchoring payload for Tenant: {form.tenantId}.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Target Tenant ID</label>
                             <input 
                               value={form.tenantId}
                               onChange={e => setForm({...form, tenantId: e.target.value})}
                               className="w-full bg-background/50 border border-white/10 rounded-md p-3 text-xs font-mono outline-none focus:ring-1 focus:ring-primary text-white"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Transaction Payload ID</label>
                             <input 
                               value={form.txId}
                               onChange={e => setForm({...form, txId: e.target.value})}
                               className="w-full bg-background/50 border border-white/10 rounded-md p-3 text-xs font-mono outline-none focus:ring-1 focus:ring-primary text-white"
                             />
                          </div>
                       </div>

                       <Button 
                        onClick={handleVaultAnchoring}
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary gap-3"
                       >
                         {loading ? <Loader2 className="size-5 animate-spin" /> : <ShieldCheck className="size-5" />}
                         Execute Isolated Anchor
                       </Button>
                    </CardContent>
                  </Card>

                  {/* Nora-55 Response */}
                  <Card className={`glass-card transition-all duration-500 border-t-4 ${vaultResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <Cpu className="size-4" /> Nora-55 Multi-Tenant Agent
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {vaultResult ? (
                         <div className="space-y-6 animate-in fade-in zoom-in-95">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-3">
                               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Tenant Seal</span>
                                  <Badge className="bg-emerald-500">SECURE_L4</Badge>
                               </div>
                               <p className="text-xs text-white leading-relaxed italic">"{vaultResult.noraStatement}"</p>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] font-bold text-muted-foreground uppercase">Tenant Signature (HMAC_V4)</p>
                               <code className="text-[9px] font-mono text-primary block bg-black/40 p-2 rounded break-all">{vaultResult.tenantSignature}</code>
                            </div>
                         </div>
                       ) : (
                         <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                            <Fingerprint className="size-16 text-primary animate-pulse" />
                            <p className="text-xs font-mono uppercase tracking-widest">Awaiting Multi-Tenant<br/>Payload</p>
                         </div>
                       )}
                    </CardContent>
                  </Card>
               </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <ShieldPlus className="size-4" /> Key Rotation Sentinel
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your enterprise secrets are rotating on an autonomous cycle. Next rotation synchronized with the Auth Bridge."
                     </p>
                     <div className="pt-4 flex justify-center">
                        <div className="size-20 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative">
                           <RefreshCcw className="size-10 text-emerald-500 animate-spin-slow" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-amber-500">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Flame className="size-4" /> Zero-Drift Policy
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                        "If the App Secret drifts from the Vault Anchor, Nora-52 triggers immediate node isolation."
                     </p>
                     <Badge className="w-full justify-center bg-amber-500/10 text-amber-500 border-none uppercase text-[8px] font-bold">SENTINEL_ARMED</Badge>
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
