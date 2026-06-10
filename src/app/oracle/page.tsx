
"use client"

import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Compass, 
  Zap, 
  Loader2, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  Menu,
  BrainCircuit,
  Eye,
  Target,
  Sparkles,
  BarChart3,
  Waves,
  Lightbulb,
  FileText,
  Activity
} from "lucide-react"
import { consultOracle, ImperialOracleOutput } from "@/ai/flows/imperial-oracle-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, query, orderBy, limit } from "firebase/firestore"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const MOCK_IMPACT_DATA = [
  { month: "Jan", impact: 45, adoption: 30 },
  { month: "Feb", impact: 52, adoption: 35 },
  { month: "Mar", impact: 61, adoption: 42 },
  { month: "Apr", impact: 75, adoption: 58 },
  { month: "May", impact: 88, adoption: 75 },
  { month: "Jun", impact: 95, adoption: 90 },
]

export default function OracleHubPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [consulting, setConsulting] = useState(false)
  const [insight, setInsight] = useState<ImperialOracleOutput | null>(null)

  const { data: nodes } = useCollection<any>(collection(db, "nodes"))
  const { data: settlements } = useCollection<any>(collection(db, "inter_bank_settlements"))
  const { data: proposals } = useCollection<any>(collection(db, "proposals"))
  const { data: disputes } = useCollection<any>(collection(db, "trade_disputes"))

  async function handleConsultOracle() {
    setConsulting(true)
    try {
      const result = await consultOracle({
        treasuryHealth: 98.4,
        totalTradeVolume: 420000000,
        activeProposals: proposals.length,
        resolvedDisputes: disputes.filter(d => d.status === 'RESOLVED').length,
        ecosystemSentiment: "L4_STABLE_CLARITY"
      })

      setInsight(result)

      // Log Policy to Firestore
      await addDoc(collection(db, "oracle_policies"), {
        ...result,
        timestamp: Date.now()
      })

      toast({ 
        title: "Imperial Oracle Dispatched", 
        description: "The future of the mesh has been visualized." 
      })
    } catch (e: any) {
      toast({ title: "Precognition Failure", description: e.message, variant: "destructive" })
    } finally {
      setConsulting(false)
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
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase text-emerald-500">
                   <Compass className="size-10 text-emerald-500 animate-spin-slow" />
                   The Imperial Oracle
                 </h2>
              </div>
              <p className="text-muted-foreground">Mission 400: Project 158 - Precognitive Strategic Policy & Global Impact.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <BrainCircuit className="size-4" /> PRECOGNITION_L4_ACTIVE
               </Badge>
               <Button 
                onClick={handleConsultOracle}
                disabled={consulting}
                className="bg-emerald-500 text-emerald-foreground font-bold uppercase tracking-widest h-10 px-6 glow-emerald"
               >
                 {consulting ? <Loader2 className="size-4 animate-spin mr-2" /> : <Eye className="size-4 mr-2" />}
                 Consult Oracle
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              {/* Global Impact Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card border-emerald-500/10">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                       <Waves className="size-4" /> Global Impact Sensor
                    </CardTitle>
                    <CardDescription>Visualizing NoorNexus adoption vs legacy banking drift.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] pt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={MOCK_IMPACT_DATA}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                           <XAxis dataKey="month" stroke="#ffffff50" fontSize={10} />
                           <YAxis stroke="#ffffff50" fontSize={10} />
                           <Tooltip 
                              contentStyle={{ backgroundColor: '#050a10', border: '1px solid #10b98120' }}
                              itemStyle={{ color: '#10b981' }}
                           />
                           <Line type="monotone" dataKey="impact" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                           <Line type="monotone" dataKey="adoption" stroke="#0096ff" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                     </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {insight ? (
                    <Card className="glass-card border-t-4 border-t-emerald-500 animate-in fade-in zoom-in-95 duration-700">
                      <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <Target className="size-4" /> Precognitive Policy Dispatch
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                           <h4 className="text-[10px] font-bold text-emerald-400 uppercase mb-2">Market Trend Prediction</h4>
                           <p className="text-sm font-mono text-emerald-100 leading-relaxed italic">"{insight.marketTrend}"</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                              <p className="text-[8px] text-muted-foreground uppercase font-bold">Confidence</p>
                              <p className="text-xl font-headline font-bold text-white">{insight.confidenceLevel}%</p>
                           </div>
                           <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                              <p className="text-[8px] text-muted-foreground uppercase font-bold">Impact Score</p>
                              <p className="text-xl font-headline font-bold text-emerald-500">{insight.impactScore}/100</p>
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="glass-card flex flex-col items-center justify-center py-20 gap-6 border-dashed opacity-40 h-full">
                       <Eye className="size-16 text-emerald-500 animate-pulse" />
                       <p className="text-xs font-mono uppercase tracking-widest text-center">Consult the Oracle to<br/>unveil future trajectories.</p>
                    </Card>
                  )}
                </div>
              </div>

              {/* Deep Oracle Insight */}
              {insight && (
                <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-1000">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 glass-card border-l-4 border-l-emerald-500">
                      <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <Lightbulb className="size-4" /> Oracle Insight Reasoning
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground leading-relaxed italic whitespace-pre-wrap">
                          "{insight.oracleInsight}"
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Future Signals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {insight.futureSignals.map((signal, i) => (
                            <div key={i} className="flex gap-2 text-[10px] text-muted-foreground">
                               <Sparkles className="size-3 text-emerald-500 shrink-0" />
                               <span>{signal}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                     <CardHeader>
                        <CardTitle className="text-lg font-headline text-emerald-200 uppercase flex items-center gap-2">
                           <FileText className="size-5 text-emerald-500" />
                           Strategic Policy recommendation
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="p-6 bg-black/60 rounded-2xl border border-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                           <p className="text-sm sm:text-base font-bold text-emerald-100 leading-relaxed">
                             {insight.strategicPolicy}
                           </p>
                        </div>
                        <div className="mt-6 flex justify-end">
                           <Button className="bg-emerald-500 text-emerald-foreground font-bold uppercase text-[10px] h-10 px-8 glow-emerald">
                              Ratify policy in Senate
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
                </div>
              )}

              {/* Mission 400 Completion summary */}
              <section className="space-y-4">
                 <h3 className="text-[10px] font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Mission 400: Executive Summary
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Economic Sovereignty", value: "FULL_ATOMIC", status: "VERIFIED" },
                      { label: "Social Governance", value: "REPUTATION_WEIGHTED", status: "ACTIVE" },
                      { label: "Judicial Sovereignty", value: "AI_ARBITRATED", status: "STABLE" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl flex flex-col gap-2">
                         <p className="text-[8px] font-bold text-muted-foreground uppercase">{item.label}</p>
                         <p className="text-sm font-headline font-bold text-white uppercase">{item.value}</p>
                         <Badge variant="outline" className="w-fit text-[7px] border-emerald-500/20 text-emerald-500 uppercase h-4 px-1">{item.status}</Badge>
                      </div>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <Activity className="size-4" /> Empire Wisdom
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Data is the history of power. Wisdom is the prediction of its drift. Project 158 turns NoorNexus from a reactive shield into a proactive destiny."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Network Wisdom Accuracy</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500">99.2%</p>
                       <TrendingUp className="size-4 text-emerald-500 mb-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Globe className="size-4" /> Geopolitical drift
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       {[
                         { region: "South Asia", drift: "0.02%", health: "STABLE" },
                         { region: "Middle East", drift: "0.05%", health: "OPTIMIZING" },
                         { region: "Europe-Mesh", drift: "0.12%", health: "MONITORING" }
                       ].map((r, i) => (
                         <div key={i} className="space-y-1">
                            <div className="flex justify-between items-center text-[9px] font-mono">
                               <span className="text-white uppercase font-bold">{r.region}</span>
                               <span className="text-primary">{r.drift}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-primary" style={{ width: '85%' }} />
                            </div>
                         </div>
                       ))}
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
