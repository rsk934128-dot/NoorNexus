
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
  Fingerprint, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Cpu, 
  Globe, 
  Link as LinkIcon, 
  Copy, 
  CheckCircle2, 
  Star,
  Award,
  Menu,
  Activity,
  UserCheck,
  HeartHandshake,
  Users,
  Share2,
  Box,
  FileCheck,
  History
} from "lucide-react"
import { issueSovereignIdentity, IdentityReputationOutput } from "@/ai/flows/identity-reputation-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser, useDoc } from "@/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export default function IdentityHubPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [identityResult, setIdentityResult] = useState<IdentityReputationOutput | null>(null)

  const [wallets, setWallets] = useState<string>("0x71C7656EC7ab88b098defB751B7401B5f6d8976F, solar_address_99")

  async function handleRegisterIdentity() {
    if (!user) return
    setLoading(true)
    setIdentityResult(null)

    try {
      const input = {
        owner: user.email || user.uid,
        linkedAddresses: wallets.split(',').map(s => s.trim()),
        trustScore: 92,
        transactionHistorySummary: "Consistent civilizational participation observed across 12 mesh nodes."
      }

      const result = await issueSovereignIdentity(input)
      setIdentityResult(result)

      await setDoc(doc(db, "identities", result.did), {
        ...result,
        owner: user.email,
        linkedAddresses: input.linkedAddresses,
        issuanceDate: Date.now(),
        updatedAt: serverTimestamp()
      })

      toast({ title: "Identity Attested", description: `Tier: ${result.reputationTier}` })
    } catch (e: any) {
      toast({ title: "Registry Failure", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Fingerprint className="size-10 text-primary" />
                   Verifiable Trust Ledger
                 </h2>
              </div>
              <p className="text-muted-foreground">Reputation as an immutable asset. Every civilizational contribution is attested and recorded in the Sovereign Trust Graph.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <FileCheck className="size-4" /> CRYPTOGRAPHIC_ATTESTATION_ON
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <ShieldCheck className="size-4" /> Trust Attestation
                    </CardTitle>
                    <CardDescription>Generate a signed reputation certificate for your identity.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Linked Wallet Addresses (CSV)</Label>
                      <Input 
                        value={wallets} 
                        onChange={e => setWallets(e.target.value)}
                        className="bg-background/50 border-white/10 font-mono text-xs h-12" 
                        placeholder="0x..., sol_..."
                      />
                    </div>
                    
                    <Button 
                      onClick={handleRegisterIdentity} 
                      disabled={loading || !user}
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    >
                      {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Award className="size-5 mr-2" />}
                      Issue Cryptographic Passport
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${identityResult ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg flex items-center gap-2 uppercase">
                        <Cpu className="size-5 text-primary" />
                        Nora-06 Attestation Dispatch
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {identityResult ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95">
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                             <h4 className="text-[10px] font-bold uppercase text-primary">Civilization DID</h4>
                             <p className="text-[10px] font-mono text-white truncate">{identityResult.did}</p>
                             <div className="flex items-center gap-1 text-[8px] text-emerald-500">
                                <CheckCircle2 className="size-3" /> VERIFIED BY 12 MESH NODES
                             </div>
                          </div>
                          <div className="p-3 bg-black/40 rounded border border-white/5">
                             <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Attestation Signature</p>
                             <p className="text-[9px] font-mono text-primary break-all">{identityResult.attestationSignature}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                          <Fingerprint className="size-16 text-primary animate-pulse" />
                          <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                            Await Identity Dispatch.<br/>Attestation logic is active.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Share2 className="size-4" /> Sovereign Trust Ledger (Attested History)
                 </h3>
                 <div className="space-y-4">
                    {[
                      { action: "Governance Proposal #12 Signed", entity: "Senate Node", status: "ATTESTED", time: "1h ago" },
                      { action: "P2C Settlement Verification", entity: "Merchant Hub", status: "VERIFIED", time: "5h ago" },
                      { action: "Identity Handshake (Phase 3)", entity: "Mesh Node 42", status: "ATTESTED", time: "1d ago" },
                    ].map((entry, i) => (
                      <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Box className="size-5 text-primary opacity-50" />
                            <div className="space-y-0.5">
                               <p className="text-xs text-white font-bold uppercase">{entry.action}</p>
                               <p className="text-[8px] text-muted-foreground font-mono uppercase">ISSUED_BY: {entry.entity}</p>
                            </div>
                         </div>
                         <div className="text-right space-y-1">
                            <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">{entry.status}</Badge>
                            <p className="text-[8px] text-muted-foreground font-mono uppercase">{entry.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <History className="size-4" /> Revocable Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[10px] text-muted-foreground leading-relaxed italic">
                   "Your trust standing is dynamic. Misalignment with civilizational protocols triggers automatic certificate revocation."
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Identity Guard
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20 text-center">
                       <span className="text-[9px] text-emerald-500 font-bold uppercase">Traceability: ENFORCED</span>
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
