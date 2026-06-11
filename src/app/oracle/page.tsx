
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
  Activity,
  ShieldAlert,
  Database,
  CheckCircle2,
  LockKeyhole
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
        ecosystemSentiment: "REALITY_PROOF_STABILITY"
      })

      setInsight(result)

      await addDoc(collection(db, "oracle_policies"), {
        ...result,
        timestamp: Date.now(),
        verificationConfidence: 99.2
      })

      toast({ 
        title: "Reality Oracle Dispatch", 
        description: "Future trajectory synchronized with constitutional guardrails." 
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs animate-pulse">
                   <Compass className="size-3 mr-2" /> Reality Oracle Hub
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-emerald-500">Oracle.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 158: Reality-Verification Network. Providing precognitive insights backed by real-world evidence and constitutional alignment.
              </p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 h-10 px-4 flex items-center gap-2 bg-emerald-500/5">
                 <BrainCircuit className="size-4" /> REALITY_VERIFIED_ON
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
                          <Target className="size-4" /> Reality Policy Dispatch
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-3">
                           <h4 className="text-[10px] font-bold text-emerald-400 uppercase mb-2 flex justify-between">
                              <span>Market Trend Prediction</span>
                              <span className="text-emerald-500">CONFIDENCE: 99.2%</span>
                           </h4>
                           <p className="text-sm font-mono text-emerald-100 leading-relaxed italic">"{insight.marketTrend}"</p>
                        </div>
                        <div className="space-y-3">
                           <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Evidence Sources</h4>
                           <div className="grid grid-cols-2 gap-3">
                              {["Financial Records", "Human Validation"].map((s, i) => (
                                <div key={i} className="p-2 bg-white/5 rounded border border-white/5 flex items-center gap-2 text-[9px] text-white">
                                   <CheckCircle2 className="size-3 text-emerald-500" /> {s}
                                </div>
                              ))}
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="glass-card flex flex-col items-center justify-center py-20 gap-6 border-dashed opacity-40 h-full">
                       <Eye className="size-16 text-emerald-500 animate-pulse" />
                       <p className="text-xs font-mono uppercase tracking-widest text-center">Consult the Oracle to<br/>unveil reality-verified trajectories.</p>
                    </Card>
                  )}
                </div>
              </div>

              {insight && (
                <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-1000">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 glass-card border-l-4 border-l-emerald-500">
                      <CardHeader>
                        <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <Lightbulb className="size-4" /> Strategic Reasoning
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
                        <CardTitle className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Article Verification</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { art: "Article II", status: "ALIGNED" },
                            { art: "Article IV", status: "ALIGNED" }
                          ].map((check, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-black/40 rounded border border-white/5">
                               <span className="text-[9px] text-white font-bold">{check.art}</span>
                               <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">{check.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20 h-fit">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <Activity className="size-4" /> Institutional Memory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Decisions are temporary, but their impact is permanent in the memory vault. The Oracle verifies future paths against our historical Debates."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Memory Consistency</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500">100%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <LockKeyhole className="size-4" /> Multi-sig Oracle
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2">
                       <p className="text-[8px] text-muted-foreground uppercase">Confirmation Required</p>
                       <div className="flex gap-1">
                          {[1, 2, 3].map(i => <div key={i} className="size-3 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />)}
                          {[4, 5].map(i => <div key={i} className="size-3 rounded-full bg-white/5" />)}
                       </div>
                       <p className="text-[7px] text-muted-foreground italic">3 of 5 Node Consensus Active.</p>
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
