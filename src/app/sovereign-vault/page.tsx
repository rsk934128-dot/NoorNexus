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
  Key
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { anchorToSovereignVault, SovereignVaultOutput } from "@/ai/flows/sovereign-vault-flow"

export default function SovereignVaultPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [vaultResult, setVaultResult] = useState<SovereignVaultOutput | null>(null)
  const [vaultHistory, setVaultHistory] = useState<any[]>([])

  const [form, setForm] = useState({
    txId: "SOV-HNW-998811",
    tier: "IMPERIAL" as any,
    target: "COLD_STORAGE" as any
  })

  async function handleVaultAnchoring() {
    setLoading(true)
    try {
      const result = await anchorToSovereignVault({
        transactionId: form.txId,
        clientTier: form.tier,
        payloadSize: 1024,
        vaultTarget: form.target
      })
      setVaultResult(result)
      setVaultHistory(prev => [result, ...prev].slice(0, 5))
      toast({ 
        title: "Deep Storage Anchored", 
        description: "Project #55: Data is now invisible to standard node traffic." 
      })
    } catch (e: any) {
      toast({ title: "Vault Failure", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
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
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <EyeOff className="size-3 mr-2" /> DEEP STORAGE ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Premium <span className="text-primary">Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Deep storage for High-Net-Worth protocols." নূরনেক্সাস এখন প্রিমিয়াম ডাটাগুলোকে অফলাইন-এনক্রিপশন এবং কোল্ড-স্টোরেজে অ্যাঙ্কর করছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Vault Integrity</p>
                  <p className="text-3xl font-headline font-bold text-primary">IMMUTABLE</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Vault Terminal */}
                  <Card className="glass-card border-l-4 border-l-primary">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                          <Archive className="size-4" /> Vault Terminal
                       </CardTitle>
                       <CardDescription>Initiate deep storage anchoring for HNW payloads.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Transaction ID</label>
                             <input 
                               value={form.txId}
                               onChange={e => setForm({...form, txId: e.target.value})}
                               className="w-full bg-background/50 border border-white/10 rounded-md p-3 text-xs font-mono outline-none focus:ring-1 focus:ring-primary text-white"
                             />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Client Tier</label>
                                <select 
                                   value={form.tier}
                                   onChange={e => setForm({...form, tier: e.target.value as any})}
                                   className="w-full bg-background/50 border border-white/10 rounded-md p-2 text-xs outline-none focus:ring-1 focus:ring-primary text-white"
                                >
                                   <option value="ELITE">ELITE</option>
                                   <option value="IMPERIAL">IMPERIAL</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Vault Target</label>
                                <select 
                                   value={form.target}
                                   onChange={e => setForm({...form, target: e.target.value as any})}
                                   className="w-full bg-background/50 border border-white/10 rounded-md p-2 text-xs outline-none focus:ring-1 focus:ring-primary text-white"
                                >
                                   <option value="COLD_STORAGE">Cold Storage</option>
                                   <option value="AIR_GAPPED_MESH">Air-Gapped Mesh</option>
                                   <option value="QUANTUM_ENCRYPTED">Quantum Encrypted</option>
                                </select>
                             </div>
                          </div>
                       </div>

                       <Button 
                        onClick={handleVaultAnchoring}
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary gap-3"
                       >
                         {loading ? <Loader2 className="size-5 animate-spin" /> : <ShieldCheck className="size-5" />}
                         Execute Deep Anchor
                       </Button>
                    </CardContent>
                  </Card>

                  {/* Nora-55 Response */}
                  <Card className={`glass-card transition-all duration-500 border-t-4 ${vaultResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <Cpu className="size-4" /> Nora-55 Vault Guardian
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {vaultResult ? (
                         <div className="space-y-6 animate-in fade-in zoom-in-95">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-3">
                               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Vault Status</span>
                                  <Badge className="bg-emerald-500">{vaultResult.vaultStatus}</Badge>
                               </div>
                               <p className="text-xs text-white leading-relaxed italic">"{vaultResult.noraStatement}"</p>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[10px] font-bold text-muted-foreground uppercase">Encryption Hash (SHA-512)</p>
                               <code className="text-[9px] font-mono text-primary block bg-black/40 p-2 rounded break-all">{vaultResult.encryptionHash}</code>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono">
                               <span className="text-muted-foreground uppercase">Storage Node</span>
                               <span className="text-white uppercase">{vaultResult.storageNode}</span>
                            </div>
                         </div>
                       ) : (
                         <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                            <Fingerprint className="size-16 text-primary animate-pulse" />
                            <p className="text-xs font-mono uppercase tracking-widest">Awaiting Payload for<br/>Deep Anchoring</p>
                         </div>
                       )}
                    </CardContent>
                  </Card>
               </div>

               {/* Vault History */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                     <History className="size-4" /> Vault Anchor Log (Last 5 Events)
                  </h3>
                  <div className="space-y-3">
                     {vaultHistory.length === 0 && <p className="text-xs text-muted-foreground italic">No historical anchors found.</p>}
                     {vaultHistory.map((v, i) => (
                       <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                             <Database className="size-5 text-primary opacity-50" />
                             <div className="space-y-0.5">
                                <p className="text-xs text-white font-bold uppercase">PAYLOAD_ANCHORED: {v.storageNode}</p>
                                <p className="text-[8px] font-mono text-muted-foreground">HASH: {v.encryptionHash.substring(0, 32)}...</p>
                             </div>
                          </div>
                          <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">VERIFIED</Badge>
                       </div>
                     ))}
                  </div>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <Key className="size-4" /> Air-Gapped Key
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Private keys for the Sovereign Vault are generated in a deterministic air-gapped mesh, ensuring zero exposure to public nodes."
                     </p>
                     <div className="pt-4 flex justify-center">
                        <div className="size-20 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative">
                           <ShieldCheck className="size-10 text-emerald-500 animate-pulse" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-amber-500">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Flame className="size-4" /> Dead Man's Switch
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                        "If the Sovereign OS loses 100% cohesion, all Vault data is purged and rotated into secondary cold-storage nodes automatically."
                     </p>
                     <Badge className="w-full justify-center bg-amber-500/10 text-amber-500 border-none uppercase text-[8px] font-bold">ARMED</Badge>
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
