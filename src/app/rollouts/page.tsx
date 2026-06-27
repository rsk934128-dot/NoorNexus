"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  ShieldCheck, 
  Menu, 
  Activity, 
  Loader2, 
  TrendingUp, 
  Split, 
  UserCog, 
  Rocket, 
  Cpu, 
  RefreshCcw, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Flame,
  Search,
  Database,
  Infinity
} from "lucide-react"
import { orchestrateFeatureFlow, PredictiveFlowOutput } from "@/ai/flows/predictive-flow-orchestrator"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

const ACTIVE_FEATURES = [
  { id: "p2c_turbo", name: "P2C Turbo Settlement", strategy: "ROLLOUT", progress: 40, stability: 99.2, conversion: 94.5 },
  { id: "nora_voice", name: "Nora-AI Voice Sync", strategy: "AB_TESTING", progress: 10, stability: 98.4, conversion: 12.2 },
  { id: "zenith_search", name: "Zenith Intelligence Search", strategy: "PERSONALIZATION", progress: 100, stability: 99.9, conversion: 88.4 }
]

export default function FeatureIntelligencePage() {
  const { toast } = useToast()
  const [analyzingId, setAnalyzingId] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, PredictiveFlowOutput>>({})

  async function handleAnalyzeFeature(feature: any) {
    setAnalyzingId(feature.id)
    try {
      const result = await orchestrateFeatureFlow({
        featureName: feature.name,
        strategy: feature.strategy as any,
        metrics: {
          stabilityScore: feature.stability,
          conversionRate: feature.conversion,
          userEngagement: 85
        }
      })
      setResults(prev => ({ ...prev, [feature.id]: result }))
      toast({ 
        title: "Intelligence Synthesized", 
        description: `Recommendation for ${feature.name}: ${result.recommendation}` 
      })
    } catch (e: any) {
      toast({ title: "Analysis Failed", variant: "destructive" })
    } finally {
      setAnalyzingId(null)
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
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Infinity className="size-3 mr-2" /> Mission 500: Feature Command
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Activity className="size-3 mr-2" /> Nora-56 Active
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Feature <span className="text-purple-500">Intelligence.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Release with Integrity. Optimize through Intelligence." রিমোট কনফিগ এবং এআই ব্যবহার করে ফিচারের ঝুঁকি কমানো এবং ইউজার এক্সপেরিয়েন্স টেইলর করা।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Global Stability</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500 uppercase">99.8%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              
              {/* Optimization Strategies Guide */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { title: "A/B Testing", icon: Split, desc: "Decide on the single best option based on metrics.", color: "text-primary" },
                   { title: "Personalization", icon: UserCog, desc: "Tailor the experience for individual user behavior.", color: "text-emerald-500" },
                   { title: "Incremental Rollouts", icon: Rocket, icon2: TrendingUp, desc: "Safely release major updates to a % of users.", color: "text-purple-500" }
                 ].map((s, i) => (
                   <Card key={i} className="glass-card bg-black/40 border-white/5 group hover:border-primary/30 transition-all">
                      <CardContent className="p-6 space-y-4">
                         <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 transition-colors w-fit`}>
                            <s.icon className={`size-6 ${s.color}`} />
                         </div>
                         <h4 className="text-lg font-headline font-bold text-white uppercase">{s.title}</h4>
                         <p className="text-xs text-muted-foreground leading-relaxed italic">"{s.desc}"</p>
                      </CardContent>
                   </Card>
                 ))}
              </section>

              {/* Active Feature Control Matrix */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Cpu className="size-4" /> Feature Control Matrix
                 </h3>
                 <div className="space-y-4">
                    {ACTIVE_FEATURES.map((feature) => (
                      <Card key={feature.id} className="glass-card border-white/5 overflow-hidden">
                        <CardContent className="p-6">
                           <div className="flex flex-col md:flex-row justify-between gap-8">
                              <div className="space-y-4 flex-1">
                                 <div className="flex items-center gap-3">
                                    <h4 className="text-xl font-headline font-bold text-white uppercase">{feature.name}</h4>
                                    <Badge variant="outline" className="text-[7px] border-primary/20 text-primary">{feature.strategy}</Badge>
                                 </div>
                                 <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                                       <span className="text-muted-foreground">Rollout Progress</span>
                                       <span className="text-white">{feature.progress}%</span>
                                    </div>
                                    <Progress value={feature.progress} className="h-1 bg-white/5" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                       <p className="text-[8px] text-muted-foreground uppercase font-bold">Stability</p>
                                       <p className="text-lg font-headline font-bold text-emerald-500">{feature.stability}%</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[8px] text-muted-foreground uppercase font-bold">Conversion</p>
                                       <p className="text-lg font-headline font-bold text-primary">{feature.conversion}%</p>
                                    </div>
                                 </div>
                              </div>

                              <div className="w-full md:w-64 space-y-4 border-l border-white/5 pl-0 md:pl-8">
                                 {results[feature.id] ? (
                                   <div className="space-y-3 animate-in fade-in slide-in-from-right-2">
                                      <div className="flex justify-between items-center">
                                         <span className="text-[9px] font-bold text-muted-foreground uppercase">Nora Verdict</span>
                                         <Badge className={results[feature.id].recommendation === 'PROCEED' ? 'bg-emerald-500' : 'bg-amber-500'}>{results[feature.id].recommendation}</Badge>
                                      </div>
                                      <p className="text-[10px] text-white italic leading-tight">"{results[feature.id].noraInsight}"</p>
                                      <div className="pt-2 border-t border-white/5">
                                         <p className="text-[8px] font-mono text-primary truncate">{results[feature.id].orchestrationHash}</p>
                                      </div>
                                   </div>
                                 ) : (
                                   <div className="flex flex-col gap-4">
                                      <p className="text-[9px] text-muted-foreground uppercase font-bold text-center">Await Neural Analysis</p>
                                      <Button 
                                        onClick={() => handleAnalyzeFeature(feature)} 
                                        disabled={analyzingId === feature.id}
                                        className="w-full bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 glow-primary gap-2"
                                      >
                                         {analyzingId === feature.id ? <Loader2 className="size-3 animate-spin" /> : <Activity className="size-3" />}
                                         Analyze with Nora-56
                                      </Button>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <ShieldCheck className="size-4" /> Safety Threshold
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "If Crashlytics reports an increase in crashes > 0.05%, Nora-56 will automatically trigger a ROLLBACK protocol."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">AUTO_PROTECT: ARMED</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <RefreshCcw className="size-4" /> Live Config Sync
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Last Pulse</span>
                        <span className="text-white">28ms ago</span>
                     </div>
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Config Ver.</span>
                        <span className="text-primary font-bold">V4.2.8</span>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> System Integrity
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                        "A/B Variants are isolated at the node level to prevent cross-pollination drift."
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
