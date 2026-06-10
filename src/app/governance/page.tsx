
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
  MessageSquare, 
  Zap, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ShieldCheck, 
  Menu,
  FileText,
  Clock,
  UserCheck,
  ChevronRight,
  Plus,
  AlertTriangle,
  Scale
} from "lucide-react"
import { analyzeSenateProposal, GovernanceArchitectOutput } from "@/ai/flows/governance-architect-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { collection, addDoc, query, orderBy, limit, doc, updateDoc, increment } from "firebase/firestore"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function GovernanceHubPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  
  // Real-time proposals
  const { data: proposals, loading: propsLoading } = useCollection<any>(
    query(collection(db, "proposals"), orderBy("createdAt", "desc"), limit(50))
  )

  // Get user's identity to check tier
  const { data: identities } = useCollection<any>(
    user ? query(collection(db, "identities"), limit(1)) : null
  )
  const myIdentity = identities?.[0]
  const isEligible = myIdentity?.reputationTier === 'ELITE' || myIdentity?.reputationTier === 'IMPERIAL'
  const votingWeight = myIdentity?.reputationTier === 'IMPERIAL' ? 2 : 1

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
        deadline: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
        createdAt: Date.now(),
        noraStrategicAnalysis: analysis.noraAssessment,
        alignmentScore: analysis.strategicAlignmentScore,
        verdict: analysis.verdict
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
        [choice === 'FOR' ? 'votesFor' : 'votesAgainst']: increment(votingWeight)
      })
      toast({ title: "Vote Cast", description: `Power of ${votingWeight} applied.` })
    } catch (e) {
      toast({ title: "Vote Failed", variant: "destructive" })
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
              <p className="text-muted-foreground">Mission 400: Project 154 - Decentralized Governance Hub.</p>
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
              {/* Proposal Creation (Only for eligible) */}
              <Card className={`glass-card border-l-4 ${isEligible ? 'border-l-primary' : 'border-l-muted opacity-50'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <Plus className="size-4" /> Drafting Chamber
                  </CardTitle>
                  <CardDescription>Only ELITE and IMPERIAL members may propose new imperial edicts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   {!isEligible && (
                     <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                        <AlertTriangle className="size-5 text-amber-500" />
                        <p className="text-xs text-amber-200">Increase your Reputation Tier in the Identity Hub to unlock the Senate.</p>
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
                            placeholder="e.g. Expand Sirajganj Node Mesh"
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
                              <SelectItem value="FEATURE">NEW_SUBSYSTEM</SelectItem>
                              <SelectItem value="EMERGENCY">EMERGENCY_EDICT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Edict Description</Label>
                        <textarea 
                          disabled={!isEligible}
                          value={form.description}
                          onChange={e => setForm({...form, description: e.target.value})}
                          placeholder="Provide cold, imperial logic for your proposal..."
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
                     Analyze & Dispatch to Senate
                   </Button>
                </CardContent>
              </Card>

              {/* Proposals List */}
              <div className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                   <FileText className="size-4" /> Active Deliberations
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
                      <Card key={prop.id} className="glass-card hover:border-primary/20 transition-all">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[8px] h-4">{prop.category}</Badge>
                                <span className="text-[8px] text-muted-foreground font-mono uppercase">BY {prop.creatorName}</span>
                              </div>
                              <CardTitle className="text-lg font-headline text-white uppercase">{prop.title}</CardTitle>
                           </div>
                           <div className="text-right">
                              <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 h-6 text-[9px] uppercase font-bold">
                                {prop.status}
                              </Badge>
                           </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <p className="text-xs text-muted-foreground leading-relaxed italic">"{prop.description}"</p>
                           
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
                    <Scale className="size-4" /> Governance Charter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { label: "Quorum", value: "60% Weight" },
                      { label: "Voting Period", value: "7 Cycles" },
                      { label: "Execution Delay", value: "24h T-Delay" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-white/5 rounded border border-white/5">
                        <span className="text-muted-foreground uppercase">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Decentralization is not the absence of order, but the collective agreement on a sovereign path."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <TrendingUp className="size-4" /> Mesh Sentiment
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <p className="text-[8px] text-muted-foreground uppercase">Overall Stability</p>
                          <p className="text-xl font-headline font-bold text-emerald-500">MAX_ELITE</p>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '85%' }} />
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
