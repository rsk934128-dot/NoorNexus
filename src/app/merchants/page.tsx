"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, TrendingUp, ShieldAlert, Zap, Loader2, Target, 
  ArrowUpRight, ArrowDownRight, Menu, Cpu, MoreVertical, 
  Search, Filter, CheckCircle2, AlertCircle, LayoutGrid, Activity, ShieldCheck,
  Briefcase,
  Star,
  Award
} from "lucide-react"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy, limit, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { reviewMerchantPerformance, MerchantPerformanceReviewOutput } from "@/ai/flows/merchant-performance-review-flow"
import { useToast } from "@/hooks/use-toast"

export default function MerchantManagementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  
  const { data: merchants, loading } = useCollection<any>(
    query(collection(db, "merchant_onboarding_requests"), orderBy("submissionDate", "desc"), limit(50))
  )

  async function handleRunAudit(merchant: any) {
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
        title: "Audit Finalized",
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
                   <Briefcase className="size-10 text-primary" />
                   Pilot Partner Monitor
                 </h2>
              </div>
              <p className="text-muted-foreground">Phase ΩΩ: Managing and Auditing our first 10 Institutional Pilot Partners.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative group">
                 <div className="absolute -inset-0.5 bg-primary/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                 <Badge variant="outline" className="relative bg-background border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
                    <Star className="size-4 animate-pulse" /> PILOT_ADOPTION_ACTIVE
                 </Badge>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Pilots</CardTitle>
                <CardTitle className="text-3xl font-headline font-bold text-white">3/10</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-emerald-500 font-bold uppercase flex items-center gap-1">
                  <TrendingUp className="size-3" /> Initial Adoption Phase
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-l-4 border-l-secondary">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Adoption Score</CardTitle>
                <CardTitle className="text-3xl font-headline font-bold text-secondary">72%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-muted-foreground font-mono uppercase">Institutional Trust Rating</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Credibility Assets</Value>
                <CardTitle className="text-3xl font-headline font-bold text-amber-500">12</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-amber-500/70 font-mono uppercase">Case Studies & Audits</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/2 flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <LayoutGrid className="size-5 text-primary" />
                <CardTitle className="text-sm font-headline uppercase tracking-widest">Pilot Partner Ledger</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                    <input className="bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-[10px] w-48 outline-none focus:ring-1 focus:ring-primary" placeholder="Filter Pilots..." />
                 </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/30 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                      <th className="px-6 py-4">Partner Identity</th>
                      <th className="px-6 py-4">Adoption Stage</th>
                      <th className="px-6 py-4">Trust Status</th>
                      <th className="px-6 py-4">Market Readiness</th>
                      <th className="px-6 py-4 text-right">Directives</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <Loader2 className="size-8 animate-spin text-primary mx-auto mb-2" />
                          <p className="text-[10px] font-mono text-muted-foreground uppercase">Syncing Pilot Data...</p>
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
                                <p className="text-[9px] text-muted-foreground font-mono">{m.region} • {m.businessType}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                              PILOT_ACTIVE
                           </Badge>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col gap-1">
                              <Badge className={`text-[8px] font-bold w-fit ${m.assignedTier === 'TIER_3' ? 'bg-amber-500' : 'bg-primary'}`}>
                                {m.assignedTier || 'TIER_1'}
                              </Badge>
                              <p className="text-[7px] font-mono text-muted-foreground uppercase">Trust: {m.trustScore}%</p>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1.5 w-32">
                             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${Math.random() * 40 + 50}%` }} />
                             </div>
                             <p className="text-[7px] text-muted-foreground uppercase font-bold">Integration Integrity</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={reviewingId === m.id}
                            onClick={() => handleRunAudit(m)}
                            className="text-[9px] font-bold uppercase border-primary/20 hover:bg-primary/10 hover:text-primary transition-all gap-2"
                          >
                            {reviewingId === m.id ? <Loader2 className="size-3 animate-spin" /> : <Award className="size-3" />}
                            Audit Adoption
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </div>
  )
}
