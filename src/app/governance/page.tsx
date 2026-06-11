
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
  ArrowRight
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
        lifecycleStage: "SUBMITTED"
      })

      setForm({ title: "", description: "", category: "PROTOCOL" })
      toast({ title: "Proposal Dispatched", description: "The Senate will now deliberate." })
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
        updatedAt: Date.now()
      })

      toast({ title: "Imperial Protocol Executed" })
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Gavel className="size-10 text-primary" />
                   The Imperial Senate
                 </h2>
              </div>
              <p className="text-muted-foreground">Governance Execution Layer: Proposals to Autonomous Workflows.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className={`h-10 px-4 flex items-center gap-2 ${isEligible ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' : 'border-white/10'}`}>
                 <Crown className={`size-4 ${isEligible ? 'animate-pulse' : ''}`} /> 
                 {isEligible ? `SENATOR: ${myIdentity?.reputationTier}` : 'GUEST OBSERVER'}
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-8">
              <Card className={`glass-card border-l-4 ${isEligible ? 'border-l-primary' : 'border-l-muted opacity-50'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <Plus className="size-4" /> Drafting Chamber
                  </CardTitle>
                  <CardDescription>Only ELITE and IMPERIAL members may propose new civilizational edicts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   {!isEligible && (
                     <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                        <AlertTriangle className="size-5 text-amber-500" />
                        <p className="text-xs text-amber-200">Increase your Reputation Tier in the Identity Hub to unlock governance rights.</p>
                     </div>
                   )}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Edict Title</Label>
                          <Input 
                            disabled={!isEligible}
                            value={form.title}
                            onChange={e => setForm({...form, title: e.target.value})}
                            placeholder="e.g. Expand Mesh Resilience in South Asia"
                            className="bg-background/50 border-white/10 font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Category</Label>
                          <Select 
                            disabled={!isEligible}
                            value={form.category} 
                            onValueChange={v => setForm({...form, category: v as any})}
                          >
                            <SelectTrigger className="bg-background/50 border-white/10 font-mono text-xs h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PROTOCOL">PROTOCOL_UPGRADE</SelectItem>
                              <SelectItem value="TREASURY">TREASURY_REBALANCE</SelectItem>
                              <SelectItem value="FEATURE">CITIZEN_ENGAGEMENT</SelectItem>
                              <SelectItem value="EMERGENCY">EMERGENCY_EDICT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Implementation Reasoning</Label>
                        <textarea 
                          disabled={!isEligible}
                          value={form.description}
                          onChange={e => setForm({...form, description: e.target.value})}
                          placeholder="Describe how this proposal aligns with Mission 400..."
                          className="w-full h-28 bg-background/50 border border-white/10 rounded-md p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                   </div>
                   <Button 
                    onClick={handleCreateProposal}
                    disabled={!isEligible || analyzing || !form.title}
                    className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 glow-primary"
                   >
                     {analyzing ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                     Analyze & Submit for Execution
                   </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                   <FileText className="size-4" /> Active Proposal Lifecycle
                </h3>
                {propsLoading ? (
                  <div className="flex flex-col items-center py-20 gap-4 opacity-50">
                    <Loader2 className="size-10 text-primary animate-spin" />
                    <p className="text-[10px] font-mono uppercase">Syncing Council Records...</p>
                  </div>
                ) : proposals.length === 0 ? (
                  <div className="text-center py-20 bg-white/2 rounded-xl border border-white/5">
                     <p className="text-xs text-muted-foreground uppercase font-mono tracking-widest">No active proposals in the Senate.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {proposals.map((prop: any) => (
                      <Card key={prop.id} className={`glass-card hover:border-primary/20 transition-all ${prop.status === 'EXECUTED' ? 'border-l-4 border-l-emerald-500' : ''}`}>
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[8px] h-4">{prop.category}</Badge>
                                <span className="text-[8px] text-muted-foreground font-mono uppercase">LIFECYCLE: {prop.lifecycleStage || "SUBMITTED"}</span>
                              </div>
                              <CardTitle className="text-lg font-headline text-white uppercase">{prop.title}</CardTitle>
                           </div>
                           <div className="text-right space-y-2">
                              <Badge variant="outline" className={`border-emerald-500/20 text-emerald-500 h-6 text-[9px] uppercase font-bold ${prop.status === 'EXECUTED' ? 'bg-emerald-500/10' : ''}`}>
                                {prop.status}
                              </Badge>
                              <div className="flex items-center gap-1 justify-end">
                                 <p className="text-[7px] text-muted-foreground uppercase font-bold">Accountability</p>
                                 <p className="text-[10px] text-emerald-500 font-bold font-mono">{prop.accountabilityScore || 100}%</p>
                              </div>
                           </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <p className="text-xs text-muted-foreground leading-relaxed italic">"{prop.description}"</p>
                           
                           <div className="flex items-center gap-2 px-2 py-4 bg-white/2 rounded-lg border border-white/5 overflow-x-auto">
                              {["SUBMITTED", "IN_DELIBERATION", "APPROVED", "EXECUTING", "COMPLETED"].map((step, i) => (
                                <div key={i} className="flex items-center gap-2 shrink-0">
                                   <div className={`p-1.5 rounded-full ${prop.lifecycleStage === step ? 'bg-primary text-primary-foreground' : (i < 2 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-muted-foreground')}`}>
                                      <CheckCircle2 className="size-3" />
                                   </div>
                                   <span className={`text-[8px] font-bold uppercase ${prop.lifecycleStage === step ? 'text-primary' : 'text-muted-foreground'}`}>{step.replace('_', ' ')}</span>
                                   {i < 4 && <ArrowRight className="size-2 text-muted-foreground/30" />}
                                </div>
                              ))}
                           </div>

                           {prop.status === 'EXECUTED' ? (
                             <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3">
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                   <h4 className="text-[10px] font-bold uppercase text-emerald-500 flex items-center gap-2">
                                     <FileCheck className="size-3" /> Nora-08 Autonomous Execution Report
                                   </h4>
                                </div>
                                <p className="text-[10px] text-emerald-200 leading-relaxed italic">{prop.executionReport}</p>
                                <div className="pt-2">
                                   <p className="text-[8px] font-mono text-muted-foreground uppercase">Execution Signature (HMAC_V4)</p>
                                   <p className="text-[9px] font-mono text-primary truncate">{prop.executionHash}</p>
                                </div>
                             </div>
                           ) : (
                             <>
                               <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                     <h4 className="text-[10px] font-bold uppercase text-amber-500 flex items-center gap-2">
                                       <Zap className="size-3" /> Nora-07 Strategic Analysis
                                     </h4>
                                     <span className="text-[10px] font-mono text-amber-200">Alignment: {prop.alignmentScore}%</span>
                                  </div>
                                  <p className="text-[10px] text-muted-foreground leading-relaxed">{prop.noraStrategicAnalysis}</p>
                               </div>

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
                                          Trigger Execution
                                       </Button>
                                     )}
                                     <Button 
                                      onClick={() => handleVote(prop.id, 'FOR')}
                                      disabled={!isEligible}
                                      variant="outline" 
                                      className="border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 gap-2 h-10 px-6 font-bold uppercase text-[10px]"
                                     >
                                        <CheckCircle2 className="size-4" /> Aye
                                     </Button>
                                     <Button 
                                      onClick={() => handleVote(prop.id, 'AGAINST')}
                                      disabled={!isEligible}
                                      variant="outline" 
                                      className="border-destructive/20 text-destructive hover:bg-destructive/10 gap-2 h-10 px-6 font-bold uppercase text-[10px]"
                                     >
                                        <XCircle className="size-4" /> Nay
                                     </Button>
                                  </div>
                               </div>
                             </>
                           )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Scale className="size-4" /> Governance Execution Layer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { label: "Execution Force", value: "Autonomous Workflow" },
                      { label: "Accountability", value: "Weighted Scoring" },
                      { label: "Traceability", value: "Audit-Ready" },
                      { label: "Lifecycle", value: "Submitted -> Complete" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-white/5 rounded border border-white/5">
                        <span className="text-muted-foreground uppercase">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Every passed edict is a mandate for change. The Governance Execution Layer ensures zero-drift between the Senate's will and system reality."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <TrendingUp className="size-4" /> Outcome Tracking
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <p className="text-[8px] text-muted-foreground uppercase">Execution Success Rate</p>
                          <p className="text-xl font-headline font-bold text-emerald-500">100.00%</p>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '100%' }} />
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
