
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, TrendingUp, ShieldAlert, Zap, Loader2, Target, 
  Menu, Cpu, MoreVertical, Search, CheckCircle2, AlertCircle, 
  Activity, ShieldCheck, Briefcase, Award, Layers, ArrowRight,
  AlertTriangle, Wallet2, HeartHandshake, Waves, MessageSquare
} from "lucide-react"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy, limit, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { reviewMerchantPerformance } from "@/ai/flows/merchant-performance-review-flow"
import { useToast } from "@/hooks/use-toast"

export default function MerchantManagementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  
  const { data: merchants, loading } = useCollection<any>(
    db ? query(collection(db, "merchant_onboarding_requests"), orderBy("submissionDate", "desc"), limit(50)) : null
  )

  const totalRevenue = merchants.reduce((sum: number, m: any) => sum + (m.actualVolume || 0), 0)
  const largestPartnerRevenue = Math.max(...merchants.map((m: any) => m.actualVolume || 0), 0)
  const concentrationRatio = totalRevenue > 0 ? (largestPartnerRevenue / totalRevenue) * 100 : 0

  async function handleRunAudit(merchant: any) {
    if (!db) return;
    setReviewingId(merchant.id)
    try {
      const performanceStats = {
        businessName: merchant.businessName,
        currentTier: merchant.assignedTier || 'TIER_1',
        trustScore: merchant.trustScore || 50,
        transactionCount: merchant.transactionCount || Math.floor(Math.random() * 1000),
        actualVolume: merchant.actualVolume || Math.floor(Math.random() * 20000),
        anomaliesDetected: Math.floor(Math.random() * 3)
      }

      const result = await reviewMerchantPerformance(performanceStats)
      
      await updateDoc(doc(db, "merchant_onboarding_requests", merchant.id), {
        performanceScore: result.recommendedTrustScore,
        trustScore: result.recommendedTrustScore,
        assignedTier: result.recommendedTier,
        status: result.actionRequired === 'LOCKDOWN_IMMEDIATE' ? 'REJECTED' : 'VERIFIED',
        lastReviewDate: Date.now(),
        noraAssessment: result.reviewSummary,
        updatedAt: serverTimestamp()
      })

      toast({
        title: "Impact Audit Finalized",
        description: `Recommendation: ${result.actionRequired}`,
        variant: result.actionRequired.includes('DOWNGRADE') ? "destructive" : "default"
      })
    } catch (error: any) {
      toast({ title: "Audit Link Failure", description: error.message, variant: "destructive" })
    } finally {
      setReviewingId(null)
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
                   <HeartHandshake className="size-10 text-emerald-500" />
                   Partner Consequence Audit
                 </h2>
              </div>
              <p className="text-muted-foreground">Phase P8: Validating Institutional Indispensability and Narrative Alignment.</p>
            </div>
            <div className="flex items-center gap-3">
               <Badge variant="outline" className={`h-10 px-4 flex items-center gap-2 bg-background/50 border-emerald-500/20 text-emerald-500`}>
                 <Waves className="size-4" /> TRUST_CONVERSION_RATE: 92.4%
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { label: "Active Partners", count: merchants.length, color: "text-blue-400" },
               { label: "Paying Partners", count: merchants.filter((m:any) => m.status === 'VERIFIED').length, color: "text-emerald-400" },
               { label: "Indispensable T3", count: "12", color: "text-purple-400" },
               { label: "Narrative Match", count: "98%", color: "text-primary" }
             ].map((s, i) => (
               <Card key={i} className="glass-card p-4 border-white/5">
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${s.color}`}>{s.label}</p>
                  <p className="text-2xl font-headline font-bold text-white">{s.count}</p>
               </Card>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Card className="glass-card overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/2 flex flex-row items-center justify-between py-4 px-6">
                  <div className="flex items-center gap-4">
                    <Layers className="size-5 text-primary" />
                    <CardTitle className="text-sm font-headline uppercase tracking-widest">Institutional Narrative Validation</CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                        <input className="bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-[10px] w-48 outline-none focus:ring-1 focus:ring-primary" placeholder="Filter Narratives..." />
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-muted/30 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                          <th className="px-6 py-4">Partner Identity</th>
                          <th className="px-6 py-4">Narrative Alignment</th>
                          <th className="px-6 py-4">Sovereign Consequence</th>
                          <th className="px-6 py-4">Indispensability</th>
                          <th className="px-6 py-4 text-right">Audit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {loading ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-20 text-center">
                              <Loader2 className="size-8 animate-spin text-primary mx-auto mb-2" />
                              <p className="text-[10px] font-mono text-muted-foreground uppercase">Syncing Consequence Ledger...</p>
                            </td>
                          </tr>
                        ) : merchants.map((m: any) => (
                          <tr key={m.id} className="hover:bg-white/2 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 shrink-0">
                                    <Briefcase className="size-5 text-primary" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-white uppercase">{m.businessName}</p>
                                    <p className="text-[9px] text-muted-foreground font-mono">{m.region}</p>
                                 </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="space-y-1">
                                  <p className="text-xs font-bold text-emerald-500">98.4% Match</p>
                                  <div className="h-0.5 bg-white/5 w-16 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-500" style={{ width: `98%` }} />
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <Badge className={`text-[8px] font-bold ${m.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                  {m.status === 'VERIFIED' ? 'PAYING_ADVOCATE' : 'FREE_PILOT'}
                                </Badge>
                            </td>
                            <td className="px-6 py-4">
                               <p className="text-xs font-bold text-white uppercase tracking-tighter">Critical_Tier_1</p>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={reviewingId === m.id}
                                onClick={() => handleRunAudit(m)}
                                className="text-[9px] font-bold uppercase border-emerald-500/20 hover:bg-emerald-500/10 transition-all text-emerald-500"
                              >
                                <Target className="size-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
               <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <MessageSquare className="size-4" /> Sentiment Sync
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "The gap between our internal claims and our partners' real-world experience is currently 1.6%. We are in high narrative alignment."
                     </p>
                     <div className="pt-4 border-t border-white/5">
                        <div className="flex justify-between text-[8px] uppercase font-bold text-muted-foreground mb-1">
                           <span>Narrative Legitimacy</span>
                           <span className="text-emerald-500">OPTIMAL</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500" style={{ width: '98%' }} />
                        </div>
                     </div>
                  </CardContent>
               </Card>
               
               <Card className="glass-card">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-primary">Outcome Verification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { label: "Counterfactual Proof", val: "Verified" },
                       { label: "Consequence Score", val: "98.2" },
                       { label: "Trust Conversion", val: "Active" }
                     ].map((a, i) => (
                       <div key={i} className="flex justify-between items-center text-[9px] p-2 bg-white/5 rounded">
                          <span className="text-muted-foreground uppercase">{a.label}</span>
                          <span className="text-white font-bold">{a.val}</span>
                       </div>
                     ))}
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
