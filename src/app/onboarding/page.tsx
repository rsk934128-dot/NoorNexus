"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Building2, ShieldCheck, Zap, Loader2, UserPlus, 
  Target, Rocket, CheckCircle2, Menu, Cpu, Fingerprint, Landmark,
  ShieldAlert,
  FileCheck,
  Search
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
    businessType: "International Partner",
    region: "Global",
    estimatedVolume: 1000000,
    businessDescription: "Cross-border financial settlement integration.",
    tradeLicenseNumber: "SOV-PARTNER-001",
    tinNumber: "",
    isFamilyBusiness: false,
    kycStatus: "PENDING",
    amlCheck: "WAITING"
  })

  async function handleApply() {
    if (!form.businessName || !form.businessDescription) {
      toast({ title: "Validation Error", description: "Identity profile is required.", variant: "destructive" });
      return;
    }

    setLoading(true)
    try {
      const result = await interviewMerchant({
        ...form,
      })
      setAssessment(result)

      await addDoc(collection(db, "merchant_onboarding_requests"), {
        ...form,
        assignedTier: result.assignedTier,
        trustScore: result.initialTrustScore,
        status: result.verificationStatus === 'APPROVED_PENDING_KYC' ? 'UNDER_REVIEW' : 'REJECTED',
        noraAssessment: result.assessmentSummary,
        complianceType: "GLOBAL_PARTNER",
        submissionDate: Date.now(),
        updatedAt: serverTimestamp()
      })

      toast({
        title: "Compliance Engine Initiated",
        description: "Partner ID verification in progress.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Compliance Neural Link Failure",
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
          <header className="flex flex-col sm:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-3xl font-headline font-bold flex items-center gap-3 uppercase">
                   <ShieldCheck className="size-8 text-primary" />
                   Compliance Foundation
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Phase Ω+: International KYC/KYB & AML Readiness Framework.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-9 px-3 flex items-center gap-2 text-[10px]">
                 <FileCheck className="size-4" /> INTEGRATION_READY_V2
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Building2 className="size-4" /> Institutional Identity
                </CardTitle>
                <CardDescription>Partner KYC/KYB profile for the Global Event Bus.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Entity Name</Label>
                    <Input 
                      value={form.businessName} 
                      onChange={e => setForm({...form, businessName: e.target.value})}
                      placeholder="e.g. Imperial Bank" 
                      className="bg-background/50 border-white/10 text-xs" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Region Scope</Label>
                    <Input 
                      value={form.region} 
                      onChange={e => setForm({...form, region: e.target.value})}
                      className="bg-background/50 border-white/10 text-xs" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-4">
                   <h4 className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                      <ShieldAlert className="size-3" /> Compliance Checkpoints
                   </h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase font-bold text-muted-foreground">KYB License</Label>
                        <Input 
                          value={form.tradeLicenseNumber} 
                          onChange={e => setForm({...form, tradeLicenseNumber: e.target.value})}
                          className="bg-background/50 border-white/10 text-xs font-mono" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase font-bold text-muted-foreground">Expected Volume (Annual)</Label>
                        <Input 
                          type="number"
                          value={form.estimatedVolume} 
                          onChange={e => setForm({...form, estimatedVolume: parseInt(e.target.value) || 0})}
                          className="bg-background/50 border-white/10 text-xs font-mono" 
                        />
                      </div>
                   </div>
                </div>

                <Button 
                  onClick={handleApply} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Rocket className="size-4 mr-2" />}
                  Trigger Compliance Audit
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${assessment ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="size-4" /> Compliance Reasoning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {assessment ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-primary">AML Risk Verdict</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                          "{assessment.assessmentSummary}"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Partner Tier</p>
                          <Badge className="bg-primary mt-1">{assessment.assignedTier}</Badge>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                          <p className="text-[9px] text-muted-foreground uppercase font-bold">Resilience Score</p>
                          <p className="text-xl font-headline font-bold text-primary">{assessment.initialTrustScore}%</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <ShieldAlert className="size-16" />
                      <p className="text-xs font-mono uppercase tracking-widest">Awaiting Compliance Pulse</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="size-3" /> Audit Ready Foundation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                     "NoorNexus compliance reports are generated in real-time, meeting Basel III and ISO 20022 standards for institutional handshakes."
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
