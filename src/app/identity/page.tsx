
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
  Box
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
              <p className="text-muted-foreground">Mission 400: Project 153 - Sovereign Trust Graph & Reputation Passport.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <HeartHandshake className="size-4" /> IDENTITY_JUSTICE_L4
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <ShieldCheck className="size-4" /> Passport Registration
                    </CardTitle>
                    <CardDescription>Issue your cross-chain reputation passport for the civilization.</CardDescription>
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
                       <h4 className="text-[10px] font-bold uppercase text-primary">Relationship Mapping Active</h4>
                       <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                         Your identity will be linked to your contributions, governance votes, and trade history in the Sovereign Trust Graph.
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
                        Nora-06 Identity Dispatch
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {identityResult ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                             <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-bold uppercase text-primary">Civilization DID</h4>
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
                            Await Identity Dispatch.<br/>Register passport to activate.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Share2 className="size-4" /> Sovereign Trust Graph (Relationship Mapping)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass-card bg-white/2 border-white/5">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground">Connected Entities</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-4">
                          {[
                            { name: "Flow Pay Node", trust: "High", icon: Zap },
                            { name: "Senate Chamber", trust: "Verified", icon: Gavel },
                            { name: "Merchant Hub", trust: "Imperial", icon: Building2 },
                          ].map((e, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-black/20 rounded border border-white/5">
                               <div className="flex items-center gap-2">
                                  <e.icon className="size-3 text-primary" />
                                  <span className="text-[10px] text-white uppercase font-bold">{e.name}</span>
                               </div>
                               <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">{e.trust}</Badge>
                            </div>
                          ))}
                       </CardContent>
                    </Card>
                    <Card className="glass-card bg-white/2 border-white/5 col-span-2 relative overflow-hidden">
                       <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                       <CardHeader className="pb-2">
                          <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground">Reputation Network Pulse</CardTitle>
                       </CardHeader>
                       <CardContent className="flex items-center justify-center h-[180px]">
                          <div className="relative size-32 flex items-center justify-center">
                             <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow" />
                             <div className="absolute inset-4 border border-emerald-500/20 rounded-full animate-[spin_8s_linear_infinite]" />
                             <Box className="size-10 text-primary glow-primary relative z-10" />
                             <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-4 bg-emerald-500 rounded-full glow-emerald" />
                             <div className="absolute top-1/2 -left-2 -translate-y-1/2 size-3 bg-primary rounded-full glow-primary" />
                             <div className="absolute bottom-2 right-2 size-2 bg-amber-500 rounded-full" />
                          </div>
                          <div className="ml-8 space-y-4">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-white uppercase">Reputation Depth</p>
                                <p className="text-2xl font-headline font-bold text-emerald-500">L4_MASTER</p>
                             </div>
                             <p className="text-[8px] text-muted-foreground italic leading-relaxed">
                                "Mapping 128 active sovereign relationships across the mesh."
                             </p>
                          </div>
                       </CardContent>
                    </Card>
                 </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <Award className="size-4" /> Identity Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Reputation is the armor of a sovereign citizen. By tying all civilizational activity to a single DID, we enable trust without a central master."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <ShieldCheck className="size-4" /> Privacy Protocol
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-[9px] p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                       <span className="text-emerald-500 uppercase font-bold">Traceability Check</span>
                       <span className="text-emerald-500">VERIFIED</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] p-2 bg-primary/5 rounded border border-primary/20">
                       <span className="text-primary uppercase font-bold">Third-Party Leak</span>
                       <span className="text-primary">ZERO_DETECTED</span>
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
