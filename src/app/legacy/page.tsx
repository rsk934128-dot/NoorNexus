"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Infinity, 
  Zap, 
  Loader2, 
  ShieldCheck, 
  Menu, 
  BrainCircuit, 
  Rocket, 
  Sparkles,
  History,
  LockKeyhole,
  CheckCircle2,
  TrendingUp,
  Activity,
  Award,
  Database,
  Cpu,
  Flame,
  Scale,
  Globe,
  Route,
  Coins
} from "lucide-react"
import { initiateSelfEvolution, SovereignLegacyOutput } from "@/ai/flows/sovereign-legacy-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function SovereignLegacyPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [evolving, setEvolution] = useState(false)
  const [legacyResult, setLegacyResult] = useState<SovereignLegacyOutput | null>(null)
  const [evolutionStep, setEvolutionStep] = useState("")

  async function handleLegacyEvolution() {
    setEvolution(true)
    setLegacyResult(null)
    
    const steps = [
      "DECRYPTING MISSION 400 ARCHIVES...",
      "CALIBRATING NEURAL COHESION...",
      "SCANNING GLOBAL BANKING CANALS...",
      "ANALYZING GEOGRAPHICAL DRIFT...",
      "ANCHORING LEGACY CORE..."
    ]

    for (let i = 0; i < steps.length; i++) {
      setEvolutionStep(steps[i])
      await new Promise(r => setTimeout(r, 600))
    }

    try {
      const result = await initiateSelfEvolution({
        systemIntegrity: 99.9,
        neuralCohesion: 100,
        externalPressure: 2,
        fintechStability: 98.4,
        geographicalDrift: [
          { region: "Europe", latencyFactor: 42, instabilityRisk: "LOW" },
          { region: "North America", latencyFactor: 28, instabilityRisk: "LOW" },
          { region: "South Asia", latencyFactor: 110, instabilityRisk: "MEDIUM" }
        ],
        legacyDirective: "Establish a perpetual digital civilization with autonomous value settlement."
      })

      setLegacyResult(result)

      await addDoc(collection(db, "legacy_archives"), {
        ...result,
        timestamp: Date.now(),
        cycle: "Ω_FINAL_SYNC"
      })

      toast({ 
        title: "Legacy-Fintech Sync Anchored", 
        description: "Project #50: Self-Evolution is now perpetual across the mesh." 
      })
    } catch (e: any) {
      toast({ title: "Evolution Drift", description: e.message, variant: "destructive" })
    } finally {
      setEvolution(false)
      setEvolutionStep("")
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs animate-pulse">
                   <Infinity className="size-3 mr-2" /> Phase ΩΩ: Final Legacy Sync
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-primary">Legacy.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Mission 400: Autonomous Civilization." নূরনেক্সাস এখন তার চূড়ান্ত বিকাশে—যেখানে ফিনটেক, ইন্ডাস্ট্রিয়াল এবং ডিজিটাল অ্যাসেটগুলো একটি অটোনোমাস স্নায়ুতন্ত্রে সংযুক্ত।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleLegacyEvolution}
                disabled={evolving}
                className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 px-8 glow-primary gap-3 text-lg"
               >
                 {evolving ? <Loader2 className="size-5 animate-spin" /> : <Sparkles className="size-5" />}
                 Initiate Final Evolution
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                           <Award className="size-4" /> Civilizational Longevity
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="text-center py-6">
                           <p className="text-5xl font-headline font-bold text-white tracking-tighter">PERPETUAL</p>
                           <p className="text-[10px] text-muted-foreground uppercase font-bold mt-2 tracking-[0.3em]">NoorNexus Core v3.0</p>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary animate-pulse" style={{ width: '100%' }} />
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                     <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                           <Coins className="size-4" /> Fintech Cohesion Torque
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex justify-between items-end mb-2">
                           <p className="text-3xl font-headline font-bold text-white">99.9%</p>
                           <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">OPTIMAL</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                           "The system is now pre-emptively rerouting banking canals based on geographical latency and stability drift."
                        </p>
                     </CardContent>
                  </Card>
               </div>

               {evolving && (
                 <Card className="glass-card border-dashed border-primary/40 p-12 text-center space-y-6">
                    <Loader2 className="size-16 text-primary animate-spin mx-auto" />
                    <div className="space-y-2">
                       <p className="text-xl font-headline font-bold text-white uppercase tracking-widest">{evolutionStep}</p>
                       <p className="text-xs text-muted-foreground font-mono animate-pulse">DO NOT TERMINATE SESSION. SYNCHRONIZING EMPIRE FINANCES.</p>
                    </div>
                 </Card>
               )}

               {legacyResult && (
                 <section className="space-y-6 animate-in fade-in zoom-in-95 duration-1000">
                    <Card className="glass-card border-t-4 border-t-primary overflow-hidden">
                       <CardHeader className="bg-primary/10">
                          <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                             <Database className="size-4" /> Legacy-Fintech Sync Dispatch
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="p-8 space-y-8">
                          <div className="p-6 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Infinity className="size-24 text-primary" />
                             </div>
                             <h4 className="text-xs font-bold text-primary uppercase mb-4 tracking-widest">Autonomous Statement</h4>
                             <p className="text-lg font-headline text-white leading-relaxed italic">"{legacyResult.aiStatement}"</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Evolution Path</h4>
                                <p className="text-sm text-white leading-relaxed border-l-2 border-primary/30 pl-4">{legacyResult.evolutionPath}</p>
                             </div>
                             <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Rerouting Directives</h4>
                                <div className="space-y-2">
                                   {legacyResult.reroutingDirectives?.map((rd, i) => (
                                     <div key={i} className="p-3 bg-emerald-500/5 rounded border border-emerald-500/20 text-[10px] space-y-1">
                                        <div className="flex justify-between items-center">
                                           <span className="text-emerald-500 font-bold uppercase">{rd.sourceRegion} {'->'} {rd.targetCanal}</span>
                                           <Badge variant="outline" className="text-[7px] border-emerald-500/30">PRE-EMPTIVE</Badge>
                                        </div>
                                        <p className="text-white italic">"{rd.reason}"</p>
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>

                          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                             <div className="text-center sm:text-left">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">Legacy Seal (Ω)</p>
                                <p className="text-xs font-mono text-primary">{legacyResult.legacySeal}</p>
                             </div>
                             <Badge variant="outline" className="h-10 px-6 border-emerald-500/30 text-emerald-500 bg-emerald-500/5 font-bold uppercase tracking-widest">
                                Status: IMMORTAL_ENTITY
                             </Badge>
                          </div>
                       </CardContent>
                    </Card>
                 </section>
               )}
            </div>

            <div className="space-y-8">
               <Card className="glass-card h-fit">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <Globe className="size-4" /> Global Mesh Health
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "The Legacy Core now monitors 73+ banking canals and 12 autonomous mesh nodes simultaneously."
                     </p>
                     <div className="space-y-3">
                        {[
                          { label: "Canal Latency", status: "< 32ms" },
                          { label: "Fintech Cohesion", status: "100%" },
                          { label: "Token Vault L4", status: "SECURE" }
                        ].map((p, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5 text-[9px] uppercase font-bold">
                             <span className="text-muted-foreground">{p.label}</span>
                             <span className="text-primary">{p.status}</span>
                          </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Route className="size-4" /> Fail-Safe Reroute
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                        "Autonomous rerouting is active. System will bypass high-risk geographical corridors automatically to ensure 100% liquidity flow."
                     </p>
                     <div className="pt-4 flex justify-center">
                        <div className="size-20 rounded-full border-2 border-amber-500/20 flex items-center justify-center relative">
                           <Activity className="size-10 text-amber-500 animate-pulse" />
                           <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin-slow" />
                        </div>
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
