
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
  LockKeyhole,
  Award,
  Sparkles
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { anchorToSovereignVault, SovereignVaultOutput } from "@/ai/flows/sovereign-vault-flow"

export default function SovereignVaultPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [archiving, setArchiving] = useState(false)
  const [legacyArchiving, setLegacyArchiving] = useState(false)
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

  async function handleLegacyArchive() {
    setLegacyArchiving(true)
    try {
      const result = await anchorToSovereignVault({
        transactionId: "MISSION_500_LEGACY_ARCHIVE",
        tenantId: "SYSTEM",
        clientTier: "IMPERIAL",
        payloadSize: 5000,
        vaultTarget: "SYSTEM_MANIFEST_ARCHIVE"
      })
      setVaultResult(result)
      toast({ 
        title: "Empire Legacy Archived", 
        description: "Mission 500 code and data secured for the next generation.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    } catch (e: any) {
      toast({ title: "Legacy Archive Failed", variant: "destructive" })
    } finally {
      setLegacyArchiving(false)
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Infinity className="size-3 mr-2" /> Mission 500: The Sovereign Peak
                 </Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <ShieldPlus className="size-3 mr-2" /> Final Legacy Sync Active
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-emerald-500">Peak Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Eternal Archive of NoorNexus." নূরনেক্সাস এখন তার পুরো কোডবেস এবং ইনটেলিজেন্সকে একটি অবিনশ্বর লিগ্যাসি আর্কাইভে সুরক্ষিত করছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleLegacyArchive}
                disabled={legacyArchiving}
                className="bg-emerald-500 text-emerald-foreground font-bold h-14 px-8 uppercase tracking-widest gap-3 glow-emerald"
               >
                 {legacyArchiving ? <Loader2 className="size-5 animate-spin" /> : <Award className="size-5" />}
                 Archive Sovereign Legacy
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
               
               {/* Archive Peak: NEW */}
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="size-32 text-emerald-500" />
                  </div>
                  <CardHeader>
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                              <Archive className="size-4" /> Global Hegemony Legacy Archive
                           </CardTitle>
                           <CardDescription className="text-xs text-white">Mission 500: Perpetual Encryption for Future Generations.</CardDescription>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {[
                       { label: "Full Mesh Code", status: "ANCHORED", icon: FileCode },
                       { id: "Nora-AI Core", status: "VAULTED", icon: Cpu },
                       { id: "Economic Data", status: "ENCRYPTED", icon: Database }
                     ].map((item, i) => (
                       <div key={i} className="p-4 bg-black/40 rounded-xl border border-emerald-500/20 flex items-center gap-3">
                          <item.icon className="size-5 text-emerald-500" />
                          <div className="space-y-0.5">
                             <p className="text-[10px] text-white font-bold uppercase">{item.label || item.id}</p>
                             <p className="text-[8px] text-emerald-500 font-mono uppercase">{item.status}</p>
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
                          <Archive className="size-4" /> Peak Terminal
                       </CardTitle>
                       <CardDescription>Anchoring mission payloads for the empire.</CardDescription>
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
                             <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Payload ID</label>
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
                         Execute Zenith Anchor
                       </Button>
                    </CardContent>
                  </Card>

                  {/* Peak AI Response */}
                  <Card className={`glass-card transition-all duration-500 border-t-4 ${vaultResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                          <Cpu className="size-4" /> Peak Multi-Tenant Agent (Nora-55)
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {vaultResult ? (
                         <div className="space-y-6 animate-in fade-in zoom-in-95">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-3">
                               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Hegemony Seal</span>
                                  <Badge className="bg-emerald-500">ZENITH_L6</Badge>
                               </div>
                               <p className="text-xs text-white leading-relaxed italic">"{vaultResult.noraStatement}"</p>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] font-bold text-muted-foreground uppercase">Hegemony Signature (HMAC_V4)</p>
                               <code className="text-[9px] font-mono text-primary block bg-black/40 p-2 rounded break-all">{vaultResult.tenantSignature}</code>
                            </div>
                         </div>
                       ) : (
                         <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                            <Fingerprint className="size-16 text-primary animate-pulse" />
                            <p className="text-xs font-mono uppercase tracking-widest">Awaiting Hegemony<br/>Archive Request</p>
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
                        <History className="size-4" /> Permanent History Sync
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your mission is anchored. The legacy of NoorNexus is now stored in Cold Storage Node 1, immune to cyber-threats."
                     </p>
                     <div className="pt-4 flex justify-center">
                        <div className="size-20 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative">
                           <CheckCircle2 className="size-10 text-emerald-500" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Infinity className="size-4" /> Immortal Archive
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "The Digital Will of NoorNexus is active. 100% data integrity verified for the Mission 500 Era."
                     </p>
                     <Badge className="w-full justify-center bg-amber-500/20 text-amber-500 border-none uppercase text-[8px] font-bold">LEGACY_LOCKED</Badge>
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
