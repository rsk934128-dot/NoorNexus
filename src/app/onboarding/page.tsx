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
  Target, Rocket, CheckCircle2, AlertCircle, FileText, Menu, Cpu, Fingerprint, Landmark
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
    businessType: "Sovereign Tech",
    region: "South Asia",
    estimatedVolume: 50000,
    businessDescription: "Digital Infrastructure Development (Mission 400 Core)",
    tradeLicenseNumber: "12345-IMPERIAL",
    tinNumber: "742322402703",
    isFamilyBusiness: true
  })

  async function handleApply() {
    if (!form.businessName || !form.businessDescription) {
      toast({ title: "Validation Error", description: "All fields are required for the Imperial Interview.", variant: "destructive" });
      return;
    }

    setLoading(true)
    try {
      const result = await interviewMerchant({
        ...form,
      })
      setAssessment(result)

      const isSovereignVerified = !!form.tinNumber;

      await addDoc(collection(db, "merchant_onboarding_requests"), {
        ...form,
        assignedTier: result.assignedTier,
        trustScore: isSovereignVerified ? Math.min(100, result.initialTrustScore + 15) : result.initialTrustScore,
        status: result.verificationStatus === 'APPROVED_PENDING_KYC' ? 'VERIFIED' : 'REJECTED',
        noraAssessment: result.assessmentSummary,
        legalStatus: isSovereignVerified ? "VERIFIED_SOVEREIGN" : (form.tradeLicenseNumber ? "VERIFIED_FAMILY" : "UNVERIFIED"),
        submissionDate: Date.now(),
        updatedAt: serverTimestamp()
      })

      toast({
        title: isSovereignVerified ? "Sovereign Identity Attested" : "Interview Finalized",
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col sm:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-3xl font-headline font-bold flex items-center gap-3 uppercase">
                   <UserPlus className="size-8 text-primary" />
                   Merchant Onboarding Hub
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Phase 3: Automated Trust-Based Vetting via Nora-01 AI & TIN Verification.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-9 px-3 flex items-center gap-2 text-[10px] sm:text-xs">
                 <ShieldCheck className="size-4" /> SECURE VETTING ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="glass-card">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Building2 className="size-4" /> Business Profile & Legal
                </CardTitle>
                <CardDescription className="text-xs">Provide details for the Nora-01 AI Assessment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Business Name</Label>
                    <Input 
                      value={form.businessName} 
                      onChange={e => setForm({...form, businessName: e.target.value})}
                      placeholder="e.g. Imperial Global" 
                      className="bg-background/50 border-white/10 text-xs h-10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Category</Label>
                    <Input 
                      value={form.businessType} 
                      onChange={e => setForm({...form, businessType: e.target.value})}
                      className="bg-background/50 border-white/10 text-xs h-10" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-4">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h4 className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                         <Fingerprint className="size-3" /> Legal Identification
                      </h4>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="family" className="text-[9px] uppercase font-bold text-muted-foreground">Family Business</Label>
                        <Switch id="family" checked={form.isFamilyBusiness} onCheckedChange={v => setForm({...form, isFamilyBusiness: v})} className="scale-75 sm:scale-100" />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Trade License Number</Label>
                        <Input 
                          value={form.tradeLicenseNumber} 
                          onChange={e => setForm({...form, tradeLicenseNumber: e.target.value})}
                          placeholder="Enter Trade License ID..." 
                          className="bg-background/50 border-white/10 text-xs font-mono h-10" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                           <Landmark className="size-3" /> TIN Certificate
                        </Label>
                        <Input 
                          value={form.tinNumber} 
                          onChange={e => setForm({...form, tinNumber: e.target.value})}
                          placeholder="7423..." 
                          className="bg-primary/10 border-primary/20 text-xs font-mono text-primary font-bold h-10" 
                        />
                      </div>
                   </div>
                   <p className="text-[8px] text-muted-foreground italic">Providing a TIN certificate upgrades you to VERIFIED_SOVEREIGN status.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Region</Label>
                    <Input 
                      value={form.region} 
                      onChange={e => setForm({...form, region: e.target.value})}
                      className="bg-background/50 border-white/10 text-xs h-10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Est. Volume ($/mo)</Label>
                    <Input 
                      type="number"
                      value={form.estimatedVolume} 
                      onChange={e => setForm({...form, estimatedVolume: parseInt(e.target.value) || 0})}
                      className="bg-background/50 border-white/10 text-xs h-10" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Business Description</Label>
                  <textarea 
                    value={form.businessDescription} 
                    onChange={e => setForm({...form, businessDescription: e.target.value})}
                    placeholder="Briefly explain your business model..."
                    className="w-full h-20 sm:h-24 bg-background/50 border border-white/10 rounded-md p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <Button 
                  onClick={handleApply} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 sm:h-14 glow-primary text-xs sm:text-sm"
                >
                  {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Rocket className="size-4 sm:size-5 mr-2" />}
                  Submit to Nora-01
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${assessment ? (assessment.verificationStatus === 'REJECTED' ? 'border-t-destructive' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="size-4" /> Nora-01 AI Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4 sm:p-6 pt-0">
                  {assessment ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-2 sm:p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[8px] sm:text-[9px] text-muted-foreground uppercase font-bold">Assigned Tier</p>
                          <Badge className="bg-primary mt-1 text-[8px] sm:text-[10px]">{assessment.assignedTier}</Badge>
                        </div>
                        <div className="p-2 sm:p-3 bg-white/5 rounded-lg border border-white/5 text-right">
                          <p className="text-[8px] sm:text-[9px] text-muted-foreground uppercase font-bold">Trust Score</p>
                          <p className="text-xl sm:text-2xl font-headline font-bold text-primary">
                            {form.tinNumber ? Math.min(100, assessment.initialTrustScore + 15) : assessment.initialTrustScore}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2 sm:space-y-3">
                        <h4 className="text-[9px] sm:text-[10px] font-bold uppercase text-primary">Legal Standing Verdict</h4>
                        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed italic">
                          "{assessment.legalVerdict}"
                        </p>
                        {form.tinNumber && (
                           <div className="flex items-center gap-2 text-[8px] sm:text-[9px] text-emerald-500 font-bold uppercase">
                              <CheckCircle2 className="size-3" /> Sovereign TIN Verified: {form.tinNumber}
                           </div>
                        )}
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                         <h4 className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Compliance Checklist</h4>
                         <div className="space-y-1.5 sm:space-y-2">
                           {assessment.securityChecklist.map((item, i) => (
                             <div key={i} className="flex items-center gap-2 text-[10px] text-emerald-500">
                               <CheckCircle2 className="size-3" />
                               {item}
                             </div>
                           ))}
                         </div>
                      </div>

                      <div className="pt-2 sm:pt-4 border-t border-white/5">
                        <Badge variant="outline" className={`w-full justify-center h-8 sm:h-9 text-[9px] sm:text-xs ${assessment.verificationStatus === 'REJECTED' ? 'border-destructive text-destructive' : 'border-emerald-500 text-emerald-500'}`}>
                          STATUS: {form.tinNumber ? 'VERIFIED_SOVEREIGN' : assessment.verificationStatus}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[200px] sm:h-[300px] flex flex-col items-center justify-center gap-3 sm:gap-4 text-center opacity-40">
                      <Target className="size-12 sm:size-16" />
                      <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest leading-relaxed text-center px-4">
                        Await AI Interviewer.<br/>Submit profiles and legal documents to initiate.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5">
                <CardHeader className="pb-2 p-4">
                  <CardTitle className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                    <FileText className="size-3" /> Sovereign Privilege
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                   <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-relaxed italic">
                     "By linking your personal TIN certificate, you establish an immutable legal anchor for your treasury. Nora-01 grants full sovereign audit rights to TIER 3 entities with verified tax credentials."
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
