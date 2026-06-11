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
  Search,
  ArrowRight,
  FlaskConical,
  Activity,
  ShieldHalf
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
  const [currentStep, setCurrentStep] = useState(1)
  
  const [form, setForm] = useState({
    businessName: "",
    businessType: "Institutional Partner",
    region: "Global",
    estimatedVolume: 1000000,
    businessDescription: "Pilot program integration for sovereign asset settlement.",
    tradeLicenseNumber: "SOV-PILOT-001",
    tinNumber: "",
    isFamilyBusiness: false,
    kycStatus: "PENDING",
    amlCheck: "WAITING",
    partnershipType: "PILOT" as "PILOT" | "FULL"
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

      setCurrentStep(3) // Advance to Assessment
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col sm:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-3xl font-headline font-bold flex items-center gap-3 uppercase">
                   <ShieldCheck className="size-8 text-primary" />
                   Institutional Onboarding
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Phase ΩΩ: Market Validation Workflow. From Verification to Full Institutional Approval.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-9 px-3 flex items-center gap-2 text-[10px]">
                 <Activity className="size-4" /> WORKFLOW_VERSION_3.1
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Step Visualizer */}
            <div className="lg:col-span-1 space-y-4">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">Onboarding Lifecycle</h3>
               {[
                 { step: 1, label: "Identity Verification", status: currentStep >= 1 ? "ACTIVE" : "PENDING", icon: Building2 },
                 { step: 2, label: "Risk Assessment", status: currentStep >= 2 ? "ACTIVE" : "PENDING", icon: ShieldAlert },
                 { step: 3, label: "Sandbox Deployment", status: currentStep >= 3 ? "ACTIVE" : "PENDING", icon: FlaskConical },
                 { step: 4, label: "Pilot Approval", status: currentStep >= 4 ? "ACTIVE" : "PENDING", icon: Rocket }
               ].map((s, i) => (
                 <div key={i} className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${currentStep === s.step ? 'bg-primary/10 border-primary border-l-4 shadow-lg' : 'bg-white/2 border-white/5 opacity-50'}`}>
                    <div className={`size-8 rounded-lg flex items-center justify-center ${currentStep === s.step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                       <s.icon className="size-4" />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-bold text-white uppercase">{s.label}</p>
                       <p className="text-[8px] font-mono text-muted-foreground uppercase">{s.status}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                       <Building2 className="size-4" /> Entity Profile
                    </CardTitle>
                    <CardDescription>Initiate the institutional handshake.</CardDescription>
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
                         <Label className="text-[10px] uppercase font-bold text-muted-foreground">Partnership Type</Label>
                         <select 
                           value={form.partnershipType}
                           onChange={e => setForm({...form, partnershipType: e.target.value as any})}
                           className="w-full bg-background/50 border border-white/10 rounded-md p-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                         >
                            <option value="PILOT">Pilot Partner (Restricted)</option>
                            <option value="FULL">Institutional (Full Mesh)</option>
                         </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Business Intent</Label>
                      <textarea 
                        value={form.businessDescription} 
                        onChange={e => setForm({...form, businessDescription: e.target.value})}
                        className="w-full h-24 bg-background/50 border border-white/10 rounded-md p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <Button 
                      onClick={handleApply} 
                      disabled={loading || currentStep >= 3}
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    >
                      {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Rocket className="size-4 mr-2" />}
                      Initialize Handshake
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className={`glass-card transition-all duration-500 border-t-4 ${assessment ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                        <Cpu className="size-4" /> Compliance Verdict
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {assessment ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95">
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                            <h4 className="text-[10px] font-bold uppercase text-primary">Nora-01 Risk Verdict</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                              "{assessment.assessmentSummary}"
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                              <p className="text-[9px] text-muted-foreground uppercase font-bold">Assigned Tier</p>
                              <Badge className="bg-primary mt-1">{assessment.assignedTier}</Badge>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                              <p className="text-[9px] text-muted-foreground uppercase font-bold">Trust Score</p>
                              <p className="text-xl font-headline font-bold text-primary">{assessment.initialTrustScore}%</p>
                            </div>
                          </div>

                          <Button className="w-full bg-emerald-500 text-white font-bold h-12 uppercase text-[10px] gap-2">
                             Access Pilot Sandbox <ArrowRight className="size-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                          <ShieldHalf className="size-16" />
                          <p className="text-xs font-mono uppercase tracking-widest">Awaiting Initial Handshake</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
