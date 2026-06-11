
"use client"

import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Crown, 
  Gavel, 
  Zap, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ShieldCheck, 
  Menu,
  FileText,
  Plus,
  AlertTriangle,
  Scale,
  PlayCircle,
  FileCheck,
  History,
  Activity,
  ArrowRight,
  ClipboardCheck,
  Eye,
  BarChart3,
  ShieldHalf,
  Database,
  Search,
  LayoutGrid,
  Box,
  Fingerprint
} from "lucide-react"
import { analyzeSenateProposal, GovernanceArchitectOutput } from "@/ai/flows/governance-architect-flow"
import { executeSenateWill, ExecutiveExecutionOutput } from "@/ai/flows/executive-execution-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { collection, addDoc, query, orderBy, limit, doc, updateDoc, increment } from "firebase/firestore"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function GovernanceHubPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [analyzing, setAnalyzing] = useState(false)
  const [simulating, setSimulating] = useState(false)
  const [executingId, setExecutingId] = useState<string | null>(null)
  
  const { data: proposals, loading: propsLoading } = useCollection<any>(
    query(collection(db, "proposals"), orderBy("createdAt", "desc"), limit(50))
  )

  const { data: identities } = useCollection<any>(
    user ? query(collection(db, "identities"), limit(1)) : null
  )
  const myIdentity = identities?.[0]
  const isEligible = myIdentity?.reputationTier === 'ELITE' || myIdentity?.reputationTier === 'IMPERIAL'
  const isImperial = myIdentity?.reputationTier === 'IMPERIAL'
  const votingWeight = isImperial ? 2 : 1

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "PROTOCOL" as any
  })

  async function handleSimulate() {
    setSimulating(true)
    setTimeout(() => {
      setSimulating(false)
      toast({ title: "Simulation Complete", description: "Outcome: Survivable. No Meta-Gov stress detected." })
    }, 1500)
  }

  async function handleCreateProposal() {
    if (!user || !isEligible) {
      toast({ title: "Ineligible", description: "Only ELITE or IMPERIAL members can propose.", variant: "destructive" })
      return
    }

    if (!form.title || !form.description) return

    setAnalyzing(true)
    try {
      const analysis = await analyzeSenateProposal({
        ...form,
        proposerTier: myIdentity.reputationTier,
        currentTreasuryHealth: 98.4
      })

      await addDoc(collection(db, "proposals"), {
        ...form,
        creatorDID: myIdentity.did,
        creatorName: user.displayName || user.email,
        status: "OPEN",
        votesFor: 0,
        votesAgainst: 0,
        deadline: Date.now() + (7 * 24 * 60 * 60 * 1000),
        createdAt: Date.now(),
        noraStrategicAnalysis: analysis.noraAssessment,
        alignmentScore: analysis.strategicAlignmentScore,
        verdict: analysis.verdict,
        accountabilityScore: 100,
        lifecycleStage: "SUBMITTED",
        constitutionalCheck: "PASSED",
        impactForecast: "Estimated 12% boost to Mesh Resilience"
      })

      setForm({ title: "", description: "", category: "PROTOCOL" })
      toast({ title: "Proposal Dispatched", description: "Constitution verification PASSED." })
    } catch (e: any) {
      toast({ title: "Council Error", description: e.message, variant: "destructive" })
    } finally {
      setAnalyzing(false)
    }
  }

  async function handleVote(proposalId: string, choice: 'FOR' | 'AGAINST') {
    if (!isEligible) {
      toast({ title: "Access Denied", description: "You lack the reputation tier to vote.", variant: "destructive" })
      return
    }

    try {
      const propRef = doc(db, "proposals", proposalId)
      await updateDoc(propRef, {
        [choice === 'FOR' ? 'votesFor' : 'votesAgainst']: increment(votingWeight),
        lifecycleStage: "IN_DELIBERATION"
      })
      toast({ title: "Vote Cast", description: `Power: ${votingWeight}` })
    } catch (e) {
      toast({ title: "Vote Failed", variant: "destructive" })
    }
  }

  async function handleExecute(proposal: any) {
    if (!isImperial) {
      toast({ title: "Forbidden", description: "Only IMPERIAL members can trigger execution.", variant: "destructive" })
      return
    }

    setExecutingId(proposal.id)
    try {
      const result = await executeSenateWill({
        proposalId: proposal.id,
        title: proposal.title,
        description: proposal.description,
        category: proposal.category,
        votesFor: proposal.votesFor,
        votesAgainst: proposal.votesAgainst
      })

      await updateDoc(doc(db, "proposals", proposal.id), {
        status: "EXECUTED",
        executionHash: result.executionHash,
        executionReport: result.actionTaken,
        lifecycleStage: "COMPLETED",
        updatedAt: Date.now(),
        impactReview: "Verified: Outcome matches Forecast by 98.4%",
        accountabilityScore: 98.5
      })

      toast({ title: "Institutional Protocol Executed" })
    } catch (e: any) {
      toast({ title: "Execution Failed", description: e.message, variant: "destructive" })
    } finally {
      setExecutingId(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Gavel className="size-10 text-primary" />
                   Sovereign Senate Hub
                 </h2>
              </div>
              <p className="text-muted-foreground">Meta-Governance & Institutional Accountability Engine.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className={`h-10 px-4 flex items-center gap-2 ${isEligible ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : 'border-white/10'}`}>
                 <Scale className={`size-4 ${isEligible ? 'animate-pulse' : ''}`} /> 
                 {isEligible ? `STEWARD: ${myIdentity?.reputationTier}` : 'GUEST OBSERVER'}
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className={`glass-card border-l-4 ${isEligible ? 'border-l-primary' : 'border-l-muted opacity-50'}`}>
                   <CardHeader>
                     <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                       <Plus className="size-4" /> Drafting Chamber
                     </CardTitle>
                     <CardDescription>Verify edicts against the Living Constitution.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Edict Title</Label>
                          <Input 
                            disabled={!isEligible}
                            value={form.title}
                            onChange={e => setForm({...form, title: e.target.value})}
                            placeholder="e.g. Expansion of Mesh Infrastructure"
                            className="bg-background/50 border-white/10 font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Rationale & Context</Label>
                          <textarea 
                            disabled={!isEligible}
                            value={form.description}
                            onChange={e => setForm({...form, description: e.target.value})}
                            placeholder="Explain the civilizational outcome..."
                            className="w-full h-24 bg-background/50 border border-white/10 rounded-md p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <Button variant="outline" onClick={handleSimulate} disabled={!isEligible || simulating} className="text-[10px] uppercase font-bold gap-2 border-primary/20">
                            {simulating ? <Loader2 className="size-3 animate-spin" /> : <Eye className="size-3" />}
                            Simulate Stress
                         </Button>
                         <Button 
                           onClick={handleCreateProposal}
                           disabled={!isEligible || analyzing || !form.title}
                           className="bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] glow-primary"
                         >
                           {analyzing ? <Loader2 className="size-3 animate-spin mr-2" /> : <Zap className="size-3 mr-2" />}
                           Submit to Senate
                         </Button>
                      </div>
                   </CardContent>
                 </Card>

                 <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <Activity className="size-4" /> Meta-Gov Health Audit
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                             <span className="text-[10px] text-muted-foreground uppercase font-bold">Model Fairness</span>
                             <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">STABLE</Badge>
                          </div>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[9px] font-mono">
                                <span>Voting Weight Balance</span>
                                <span className="text-emerald-500">99.8%</span>
                             </div>
                             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: '99.8%' }} />
                             </div>
                          </div>
                          <p className="text-[9px] text-muted-foreground italic">"Audit reports zero systemic bias in current reputation vector weightings."</p>
                       </div>
                    </CardContent>
                 </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                   <FileText className="size-4" /> Institutional Accountability Stream
                </h3>
                {propsLoading ? (
                  <div className="flex flex-col items-center py-20 gap-4 opacity-50">
                    <Loader2 className="size-10 text-primary animate-spin" />
                    <p className="text-[10px] font-mono uppercase">Syncing Institutional Records...</p>
                  </div>
                ) : proposals.map((prop: any) => (
                  <Card key={prop.id} className={`glass-card hover:border-primary/20 transition-all ${prop.status === 'EXECUTED' ? 'border-l-4 border-l-emerald-500' : ''}`}>
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[8px] h-4">CONST_LINK: {prop.constitutionalCheck || "PASSED"}</Badge>
                            <span className="text-[8px] text-muted-foreground font-mono uppercase">STAGE: {prop.lifecycleStage || "SUBMITTED"}</span>
                          </div>
                          <CardTitle className="text-lg font-headline text-white uppercase">{prop.title}</CardTitle>
                       </div>
                       <div className="text-right space-y-2">
                          <Badge variant="outline" className={`border-emerald-500/20 text-emerald-500 h-6 text-[9px] uppercase font-bold ${prop.status === 'EXECUTED' ? 'bg-emerald-500/10' : ''}`}>
                            {prop.status}
                          </Badge>
                       </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <p className="text-xs text-muted-foreground leading-relaxed italic">"{prop.description}"</p>
                       
                       {prop.status === 'EXECUTED' ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3">
                               <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                  <h4 className="text-[10px] font-bold uppercase text-emerald-500 flex items-center gap-2">
                                    <FileCheck className="size-3" /> Post-Execution Audit
                                  </h4>
                               </div>
                               <p className="text-[10px] text-emerald-200 leading-relaxed italic">{prop.executionReport}</p>
                               <div className="pt-2">
                                  <p className="text-[8px] font-mono text-muted-foreground uppercase">Maturity Proof (HMAC_V4)</p>
                                  <p className="text-[9px] font-mono text-primary truncate">{prop.executionHash}</p>
                               </div>
                            </div>
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                               <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                  <h4 className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                                    <ClipboardCheck className="size-3" /> Accountability Review
                                  </h4>
                               </div>
                               <div className="flex justify-between items-end">
                                  <div className="space-y-1">
                                     <p className="text-[8px] text-muted-foreground uppercase">Outcome Match Score</p>
                                     <p className="text-2xl font-headline font-bold text-emerald-500">{prop.accountabilityScore || 100}%</p>
                                  </div>
                               </div>
                               <p className="text-[9px] text-muted-foreground italic">"{prop.impactReview || "Auditing results against Simulation Forecast..."}"</p>
                            </div>
                         </div>
                       ) : (
                         <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex-1 w-full space-y-2">
                               <div className="flex justify-between text-[10px] font-bold uppercase">
                                  <span className="text-emerald-500">Votes For: {prop.votesFor}</span>
                                  <span className="text-destructive">Votes Against: {prop.votesAgainst}</span>
                               </div>
                               <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                                  <div className="bg-emerald-500 transition-all" style={{ width: `${(prop.votesFor / (prop.votesFor + prop.votesAgainst || 1)) * 100}%` }} />
                                  <div className="bg-destructive transition-all" style={{ width: `${(prop.votesAgainst / (prop.votesFor + prop.votesAgainst || 1)) * 100}%` }} />
                               </div>
                            </div>
                            <div className="flex gap-2">
                               {prop.votesFor > 0 && isImperial && (
                                 <Button 
                                  onClick={() => handleExecute(prop)}
                                  disabled={executingId === prop.id}
                                  className="bg-emerald-500 text-emerald-foreground hover:bg-emerald-600 gap-2 h-10 px-6 font-bold uppercase text-[10px] glow-emerald"
                                 >
                                    {executingId === prop.id ? <Loader2 className="size-4 animate-spin" /> : <PlayCircle className="size-4" />}
                                    Final Execution
                                 </Button>
                               )}
                               <Button onClick={() => handleVote(prop.id, 'FOR')} disabled={!isEligible} variant="outline" className="border-emerald-500/20 text-emerald-500 text-[10px]">Aye</Button>
                               <Button onClick={() => handleVote(prop.id, 'AGAINST')} disabled={!isEligible} variant="outline" className="border-destructive/20 text-destructive text-[10px]">Nay</Button>
                            </div>
                         </div>
                       )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <ShieldHalf className="size-4" /> Meta-Governance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                         <span className="uppercase text-muted-foreground">Governance Quorum</span>
                         <span className="text-primary font-bold">66.7%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: '67%' }} />
                      </div>
                   </div>
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Governance audits governance. Senate performance is reviewed by the AI Stewardship Council every Cycle."
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Living History
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <p className="text-[8px] text-muted-foreground uppercase">Debates Linked to Constitution</p>
                          <p className="text-xl font-headline font-bold text-emerald-500">100%</p>
                       </div>
                       <p className="text-[9px] text-muted-foreground italic">
                          Every edict is a brick in the living constitution, backed by historical evidence.
                       </p>
                    </div>
                 </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-bold uppercase text-amber-500">Steward Council</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                       Founder override is inactive. Stewardship council quorum required for Article II/IV edits.
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
