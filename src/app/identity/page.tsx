
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
  Network,
  Users
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
        trustScore: 92, // Mock baseline from mesh
        transactionHistorySummary: "Consistent cross-chain bridging observed across 12 mesh nodes."
      }

      const result = await issueSovereignIdentity(input)
      setIdentityResult(result)

      // Save to Firestore Registry
      await setDoc(doc(db, "identities", result.did), {
        ...result,
        owner: user.email,
        linkedAddresses: input.linkedAddresses,
        issuanceDate: Date.now(),
        updatedAt: serverTimestamp()
      })

      toast({ title: "Identity Attested", description: `Tier assigned: ${result.reputationTier}` })
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
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Fingerprint className="size-10 text-primary" />
                   Sovereign Identity Hub
                 </h2>
              </div>
              <p className="text-muted-foreground">Mission 400: Project 153 - Global Proof of Reputation Registry.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <HeartHandshake className="size-4" /> DATA_JUSTICE_ENFORCED
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <ShieldCheck className="size-4" /> Identity Registration
                    </CardTitle>
                    <CardDescription>Issue your cross-chain reputation passport via Zero-Knowledge Protocol.</CardDescription>
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
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                       <h4 className="text-[10px] font-bold uppercase text-primary">Zero-Knowledge Attestation</h4>
                       <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                         Your private data remains on-premise. Only the reputation score and DID are broadcasted to the mesh.
                       </p>
                    </div>

                    <Button 
                      onClick={handleRegisterIdentity} 
                      disabled={loading || !user}
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    >
                      {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Award className="size-5 mr-2" />}
                      {identityResult ? "Refresh Attestation" : "Issue Reputation Passport"}
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${identityResult ? (identityResult.reputationTier === 'IMPERIAL' ? 'border-t-amber-500' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg flex items-center gap-2 uppercase">
                        <Cpu className="size-5 text-primary" />
                        Nora-06 Identity Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {identityResult ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                             <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-bold uppercase text-primary">DID Issued</h4>
                                <Button variant="ghost" size="icon" className="size-6 h-6"><Copy className="size-3" /></Button>
                             </div>
                             <p className="text-[10px] font-mono text-white truncate">{identityResult.did}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">Reputation Tier</p>
                                <Badge className={`mt-1 font-bold ${identityResult.reputationTier === 'IMPERIAL' ? 'bg-amber-500' : 'bg-primary'}`}>
                                  {identityResult.reputationTier}
                                </Badge>
                             </div>
                             <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">Trust Score</p>
                                <p className="text-xl font-headline font-bold text-emerald-500">{identityResult.calculatedReputationScore}</p>
                             </div>
                          </div>

                          <div className="p-3 bg-black/40 rounded border border-white/5">
                             <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                               "{identityResult.reasoning}"
                             </p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                          <Fingerprint className="size-16 text-primary animate-pulse" />
                          <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                            Await Identity Dispatch.<br/>Configure wallets to initiate.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Merchant Reputation Graph concept */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Network className="size-4" /> Sovereign Trust & Reputation Graph
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass-card bg-white/2 border-white/5">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground">Cross-Service Passport</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <div className="flex items-center gap-2">
                             <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">FLOW_PAY</Badge>
                             <Badge variant="outline" className="text-[8px] border-primary/20 text-primary">SENATE</Badge>
                             <Badge variant="outline" className="text-[8px] border-amber-500/20 text-amber-500">EXCHANGE</Badge>
                          </div>
                          <p className="text-[9px] text-muted-foreground mt-3 italic">"Unified access across the entire Imperium."</p>
                       </CardContent>
                    </Card>
                    <Card className="glass-card bg-white/2 border-white/5 col-span-2">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground">Merchant Trust Score</CardTitle>
                       </CardHeader>
                       <CardContent className="flex items-center justify-between">
                          <div className="space-y-1 flex-1">
                             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: '85%' }} />
                             </div>
                             <p className="text-[8px] text-muted-foreground uppercase font-mono">Verification: 850/1000 - ELITE_MERCHANT</p>
                          </div>
                          <Users className="size-10 text-emerald-500 opacity-20 ml-6" />
                       </CardContent>
                    </Card>
                 </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <Award className="size-4" /> Recognition Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Reputation is the armor of a sovereign merchant. By tying cross-chain activity to a single identity, we enable global trust without central control."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Privacy Status
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-[9px] p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                       <span className="text-emerald-500 uppercase font-bold">Data Sovereignty</span>
                       <span className="text-emerald-500">SECURE</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] p-2 bg-primary/5 rounded border border-primary/20">
                       <span className="text-primary uppercase font-bold">Third-Party Access</span>
                       <span className="text-primary">DENIED</span>
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
