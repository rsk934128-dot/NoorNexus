
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Gavel, 
  ShieldAlert, 
  Zap, 
  Loader2, 
  Scale, 
  CheckCircle2, 
  AlertTriangle,
  History,
  FileText,
  Lock,
  Menu,
  Cpu,
  UserX,
  ArrowRightLeft
} from "lucide-react"
import { resolveTradeDispute, TradeArbitrationOutput } from "@/ai/flows/trade-arbitration-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy, limit, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ArbitrationChamberPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [resolvingId, setResolvingId] = useState<string | null>(null)
  const [verdict, setVerdict] = useState<TradeArbitrationOutput | null>(null)

  // Real-time disputes
  const { data: disputes, loading: disputesLoading } = useCollection<any>(
    query(collection(db, "trade_disputes"), orderBy("createdAt", "desc"), limit(50))
  )

  async function handleResolveDispute(dispute: any) {
    setResolvingId(dispute.id)
    setVerdict(null)
    
    try {
      const result = await resolveTradeDispute({
        settlementId: dispute.settlementId,
        sourceBank: dispute.complainant,
        targetBank: dispute.defendant,
        amount: dispute.amount || 500000,
        escrowConditions: dispute.conditions || "Release funds upon delivery.",
        disputeReason: dispute.reason,
        evidenceProvided: dispute.evidence || "No digital proof of shipment provided."
      })

      setVerdict(result)

      // Update Dispute Record
      await updateDoc(doc(db, "trade_disputes", dispute.id), {
        status: "RESOLVED",
        noraVerdict: result.noraReasoning,
        verdictType: result.verdict,
        reputationImpact: result.reputationImpact,
        arbitrationSignature: result.arbitrationSignature,
        resolvedAt: Date.now()
      })

      toast({ 
        title: "Judicial Edict Issued", 
        description: `Verdict: ${result.verdict}`,
        variant: result.verdict === 'REFUND_SOURCE' ? "destructive" : "default"
      })
    } catch (e: any) {
      toast({ title: "Arbitration Error", description: e.message, variant: "destructive" })
    } finally {
      setResolvingId(null)
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
                   The Imperial Arbitration Chamber
                 </h2>
              </div>
              <p className="text-muted-foreground">Mission 400: Project 157 - Judicial Resolution of Sovereign Trade Conflicts.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-amber-500/30 text-amber-500 h-10 px-4 flex items-center gap-2 bg-amber-500/5">
                 <Scale className="size-4" /> JUDICIAL_SOVEREIGNTY_L4
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              {/* Active Disputes List */}
              <div className="space-y-4">
                <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                   <ShieldAlert className="size-4" /> Pending Deliberations
                </h3>
                {disputesLoading ? (
                  <div className="flex flex-col items-center py-20 gap-4 opacity-50">
                    <Loader2 className="size-10 text-primary animate-spin" />
                    <p className="text-[10px] font-mono uppercase">Connecting to Judicial Mesh...</p>
                  </div>
                ) : disputes.length === 0 ? (
                  <div className="text-center py-20 bg-white/2 rounded-xl border border-white/5">
                     <p className="text-xs text-muted-foreground uppercase font-mono tracking-widest">No active disputes in the chamber.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {disputes.map((d: any) => (
                      <Card key={d.id} className={`glass-card hover:border-primary/20 transition-all ${d.status === 'RESOLVED' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-amber-500'}`}>
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[8px] h-4">DISPUTE_ID: {d.disputeId}</Badge>
                                <span className="text-[8px] text-muted-foreground font-mono uppercase">SETTLEMENT: {d.settlementId}</span>
                              </div>
                              <CardTitle className="text-lg font-headline text-white uppercase">{d.complainant} VS {d.defendant}</CardTitle>
                           </div>
                           <div className="text-right">
                              <Badge variant="outline" className={`border-emerald-500/20 text-emerald-500 h-6 text-[9px] uppercase font-bold ${d.status === 'RESOLVED' ? 'bg-emerald-500/10' : ''}`}>
                                {d.status}
                              </Badge>
                           </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                 <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Dispute Reason</h4>
                                 <p className="text-xs text-muted-foreground leading-relaxed italic">"{d.reason}"</p>
                              </div>
                              <div className="space-y-3">
                                 <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Evidence Hash</h4>
                                 <code className="text-[9px] font-mono text-primary bg-black/40 p-2 rounded block break-all">
                                    {d.evidence || "NO_EVIDENCE_PROVIDED"}
                                 </code>
                              </div>
                           </div>
                           
                           {d.status === 'RESOLVED' ? (
                             <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                   <h4 className="text-[10px] font-bold uppercase text-emerald-500 flex items-center gap-2">
                                     <CheckCircle2 className="size-3" /> Nora-10 Judicial Verdict
                                   </h4>
                                   <span className="text-[10px] font-mono text-emerald-200">VERDICT: {d.verdictType}</span>
                                </div>
                                <p className="text-[11px] text-emerald-100 leading-relaxed italic whitespace-pre-wrap">{d.noraVerdict}</p>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                   <div className="space-y-1">
                                      <p className="text-[8px] font-mono text-muted-foreground uppercase">Reputation Impact</p>
                                      <p className="text-xs font-bold text-destructive">-{d.reputationImpact} Points</p>
                                   </div>
                                   <div className="text-right space-y-1">
                                      <p className="text-[8px] font-mono text-muted-foreground uppercase">Judicial Seal</p>
                                      <p className="text-[9px] font-mono text-primary truncate">{d.arbitrationSignature}</p>
                                   </div>
                                </div>
                             </div>
                           ) : (
                             <div className="flex justify-end">
                                <Button 
                                  onClick={() => handleResolveDispute(d)}
                                  disabled={resolvingId === d.id}
                                  className="bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 px-8 glow-primary"
                                >
                                  {resolvingId === d.id ? <Loader2 className="size-4 animate-spin mr-2" /> : <Gavel className="size-4 mr-2" />}
                                  Issue Judicial Edict
                                </Button>
                             </div>
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
                    <Scale className="size-4" /> Judicial Charter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { label: "Judge Entity", value: "Nora-10 AI" },
                      { label: "Protocol", value: "Impartial Consensus" },
                      { label: "Authority", value: "Sovereign Executive" },
                      { label: "Finality", value: "Immutable Ledger" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-white/5 rounded border border-white/5">
                        <span className="text-muted-foreground uppercase">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Trade without justice is chaos. The Arbitration Chamber ensures that every sovereign bank is held to the highest standard of honor."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <UserX className="size-4" /> Reputation Sanctions
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <p className="text-[8px] text-muted-foreground uppercase">Total Resolved Conflicts</p>
                          <p className="text-xl font-headline font-bold text-emerald-500">{disputes.filter(d => d.status === 'RESOLVED').length}</p>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '100%' }} />
                       </div>
                       <p className="text-[9px] text-muted-foreground italic">
                          98.2% of verdicts accepted by member banks without appeal.
                       </p>
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
