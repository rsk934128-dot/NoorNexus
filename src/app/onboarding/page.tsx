
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, ShieldCheck, Zap, Loader2, UserPlus, 
  Target, Rocket, CheckCircle2, AlertCircle, FileText, Menu, Cpu
} from "lucide-react"
import { interviewMerchant, MerchantOnboardingOutput } from "@/ai/flows/merchant-onboarding-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function OnboardingPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [assessment, setAssessment] = useState<MerchantOnboardingOutput | null>(null)
  
  const [form, setForm] = useState({
    businessName: "",
    businessType: "E-commerce",
    region: "South Asia",
    estimatedVolume: 1000,
    businessDescription: ""
  })

  async function handleApply() {
    if (!form.businessName || !form.businessDescription) {
      toast({ title: "Validation Error", description: "All fields are required for the Imperial Interview.", variant: "destructive" });
      return;
    }

    setLoading(true)
    try {
      const result = await interviewMerchant(form)
      setAssessment(result)

      // Save to Firestore
      await addDoc(collection(db, "merchant_onboarding_requests"), {
        ...form,
        assignedTier: result.assignedTier,
        trustScore: result.initialTrustScore,
        status: result.verificationStatus === 'APPROVED_PENDING_KYC' ? 'PENDING' : 'REJECTED',
        noraAssessment: result.assessmentSummary,
        submissionDate: Date.now(),
        updatedAt: serverTimestamp()
      })

      toast({
        title: "Interview Finalized",
        description: `Initial Tier: ${result.assignedTier}`,
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Onboarding Neural Link Error",
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-3xl font-headline font-bold flex items-center gap-3 uppercase">
                   <UserPlus className="size-8 text-primary" />
                   Merchant Onboarding Hub
                 </h2>
              </div>
              <p className="text-muted-foreground">
                Phase 3: Automated Trust-Based Vetting via Nora-01 AI.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4 flex items-center gap-2">
                 <ShieldCheck className="size-4" /> SECURE VETTING ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Building2 className="size-4" /> Business Profile
                </CardTitle>
                <CardDescription>Provide details for the Nora-01 AI Assessment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Business Name</Label>
                    <Input 
                      value={form.businessName} 
                      onChange={e => setForm({...form, businessName: e.target.value})}
                      placeholder="e.g. Imperial Global" 
                      className="bg-background/50 border-white/10 text-xs" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Category</Label>
                    <Input 
                      value={form.businessType} 
                      onChange={e => setForm({...form, businessType: e.target.value})}
                      className="bg-background/50 border-white/10 text-xs" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Region</Label>
                    <Input 
                      value={form.region} 
                      onChange={e => setForm({...form, region: e.target.value})}
                      className="bg-background/50 border-white/10 text-xs" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Est. Volume ($/mo)</Label>
                    <Input 
                      type="number"
                      value={form.estimatedVolume} 
                      onChange={e => setForm({...form, estimatedVolume: parseInt(e.target.value) || 0})}
                      className="bg-background/50 border-white/10 text-xs" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Business Description</Label>
                  <textarea 
                    value={form.businessDescription} 
                    onChange={e => setForm({...form, businessDescription: e.target.value})}
                    placeholder="Briefly explain your business model..."
                    className="w-full h-32 bg-background/50 border border-white/10 rounded-md p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <Button 
                  onClick={handleApply} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Rocket className="size-5 mr-2" />}
                  Submit to Nora-01
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${assessment ? (assessment.verificationStatus === 'REJECTED' ? 'border-t-destructive' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="size-4" /> Nora-01 AI Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {assessment ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Assigned Tier</p>
                          <Badge className="bg-primary mt-1">{assessment.assignedTier}</Badge>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Trust Score</p>
                          <p className="text-2xl font-headline font-bold text-primary">{assessment.initialTrustScore}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-primary">AI Reasoning</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                          "{assessment.assessmentSummary}"
                        </p>
                      </div>

                      <div className="space-y-3">
                         <h4 className="text-[10px] font-bold uppercase text-muted-foreground">Compliance Checklist</h4>
                         <div className="space-y-2">
                           {assessment.securityChecklist.map((item, i) => (
                             <div key={i} className="flex items-center gap-2 text-[10px] text-emerald-500">
                               <CheckCircle2 className="size-3" />
                               {item}
                             </div>
                           ))}
                         </div>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <Badge variant="outline" className={`w-full justify-center h-8 ${assessment.verificationStatus === 'REJECTED' ? 'border-destructive text-destructive' : 'border-emerald-500 text-emerald-500'}`}>
                          STATUS: {assessment.verificationStatus}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <Target className="size-16" />
                      <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                        Await AI Interviewer.<br/>Submit profile to initiate.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                    <FileText className="size-3" /> 3-Tier Access Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold text-white uppercase">Tier 1: Restricted Access</p>
                      <p className="text-[8px] text-muted-foreground italic">Instant access, limited throughput.</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold text-emerald-500 uppercase">Tier 2: Sovereign Verified</p>
                      <p className="text-[8px] text-muted-foreground italic">Elevated limits, T+1 settlement enabled.</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold text-primary uppercase">Tier 3: Imperial Partner</p>
                      <p className="text-[8px] text-muted-foreground italic">Unlimited throughput, Instant settlement.</p>
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
