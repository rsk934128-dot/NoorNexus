"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Zap, 
  ShieldCheck, 
  Menu, 
  LayoutGrid, 
  LockKeyhole, 
  Rocket, 
  ArrowRightLeft,
  CreditCard,
  Landmark,
  Layers,
  ArrowRight,
  Sparkles,
  Database,
  Code2,
  Globe,
  Activity,
  History,
  Scale,
  Monitor,
  Smartphone,
  Palette,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  FileCheck,
  Key
} from "lucide-react"

const BLUEPRINT_STEPS = [
  { id: "P51.1", label: "Unified Auth Bridge", icon: LockKeyhole, status: "DESIGNED" },
  { id: "P51.2", label: "AETS Token Injection", icon: CreditCard, status: "READY" },
  { id: "P51.3", label: "Open Banking Rail Sync", icon: Landmark, status: "SYNCED" },
  { id: "P51.4", label: "Intelligent Fallback Engine", icon: Zap, status: "HARDENED" },
  { id: "P51.5", label: "White-label Studio", icon: Palette, status: "READY" },
  { id: "P51.6", label: "eIDAS Certificate Vault", icon: Key, status: "IN_DEV" },
]

export default function SovereignGatewayPage() {
  const [primaryColor, setPrimaryColor] = useState("#0096ff")
  const [partnerLogo, setPartnerLogo] = useState("Imperial Bank")
  const [saving, setSaving] = useState(false)

  const handleSaveBranding = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 1200)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Rocket className="size-3 mr-2" /> Project #51: Sovereign Gateway PaaS
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Global <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project #51: The culmination of Mission 400. A unified PaaS gateway with SIBS Network support and eIDAS Certificate management.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Architecture Ready</p>
                  <p className="text-3xl font-headline font-bold text-purple-500">100%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              
              {/* White-label Studio Section */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Palette className="size-4" /> White-label Studio (Beta)
                 </h3>
                 <Card className="glass-card overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                       <div className="p-6 border-r border-white/5 space-y-6">
                          <div className="space-y-4">
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Partner Logo Text</Label>
                                <Input 
                                  value={partnerLogo}
                                  onChange={e => setPartnerLogo(e.target.value)}
                                  className="bg-background/50 border-white/10"
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Brand Theme Color</Label>
                                <div className="flex gap-4 items-center">
                                   <input 
                                     type="color" 
                                     value={primaryColor} 
                                     onChange={e => setPrimaryColor(e.target.value)}
                                     className="size-10 bg-transparent cursor-pointer rounded-lg overflow-hidden border-none"
                                   />
                                   <code className="text-xs font-mono text-white">{primaryColor.toUpperCase()}</code>
                                </div>
                             </div>
                          </div>
                          <Button onClick={handleSaveBranding} disabled={saving} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px]">
                             {saving ? <Loader2 className="size-3 animate-spin mr-2" /> : <Sparkles className="size-3 mr-2" />}
                             Apply Branding Injection
                          </Button>
                       </div>
                       <div className="p-6 bg-black/40 flex flex-col items-center justify-center space-y-4">
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Gateway Preview</p>
                          <div className="w-full max-w-[280px] bg-card border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
                             <div className="flex justify-between items-center">
                                <span className="font-headline font-bold text-sm" style={{ color: primaryColor }}>{partnerLogo}</span>
                                <LockKeyhole className="size-3 text-muted-foreground" />
                             </div>
                             <div className="space-y-3">
                                <div className="h-2 bg-white/5 rounded w-1/2" />
                                <div className="h-10 bg-white/5 rounded border border-white/10 flex items-center px-3 justify-between">
                                   <span className="text-[10px] text-muted-foreground font-mono">Amount</span>
                                   <span className="text-xs font-bold text-white">$1,500.00</span>
                                </div>
                             </div>
                             <Button className="w-full font-bold uppercase text-[10px]" style={{ backgroundColor: primaryColor }}>
                                Pay Now
                             </Button>
                          </div>
                       </div>
                    </div>
                 </Card>
              </section>

              {/* Certificate Management Section */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Key className="size-4" /> eIDAS Certificate Vault (P51.6)
                 </h3>
                 <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline text-white uppercase">Secure Identity Management</CardTitle>
                       <CardDescription>Automated lifecycle for QWAC and QSealC certificates required for EU Open Banking.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-black/40 rounded border border-white/5 space-y-3">
                             <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Transport Certificate</h4>
                             <p className="text-[9px] text-muted-foreground italic">"Used for establishing secure mTLS connections with SIBS ASPSPs."</p>
                             <div className="flex justify-between items-center">
                                <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">SYNCED</Badge>
                                <span className="text-[8px] font-mono text-muted-foreground">Expires in 242 days</span>
                             </div>
                          </div>
                          <div className="p-4 bg-black/40 rounded border border-white/5 space-y-3">
                             <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Signing Certificate</h4>
                             <p className="text-[9px] text-muted-foreground italic">"Ensures non-repudiation and integrity for SEPA CT / Instant payments."</p>
                             <div className="flex justify-between items-center">
                                <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">SYNCED</Badge>
                                <span className="text-[8px] font-mono text-muted-foreground">Expires in 180 days</span>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              </section>

              {/* Architecture Blueprint */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> Hardened System Blueprint
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {BLUEPRINT_STEPS.map((step) => (
                      <Card key={step.id} className="glass-card bg-white/2 border-white/5 hover:border-purple-500/30 transition-all group">
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                 <step.icon className="size-6 text-purple-400" />
                              </div>
                              <Badge className="bg-purple-500/20 text-purple-500 border-none text-[8px]">{step.status}</Badge>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{step.id}</p>
                              <h4 className="text-sm font-headline font-bold text-white uppercase">{step.label}</h4>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* Compliance Sentinel */}
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Compliance Sentinel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "PSD2 Compliance", status: "VERIFIED", icon: CheckCircle2, color: "text-emerald-500" },
                        { label: "SCA Verification", status: "ACTIVE", icon: Smartphone, color: "text-emerald-500" },
                        { label: "AML Velocity Check", status: "STABLE", icon: Activity, color: "text-primary" },
                        { label: "Data Sovereignty", status: "ENFORCED", icon: Scale, color: "text-amber-500" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                           <div className="flex items-center gap-2">
                              <item.icon className={`size-3 ${item.color}`} />
                              <span className="text-[10px] text-muted-foreground uppercase font-bold">{item.label}</span>
                           </div>
                           <Badge variant="outline" className={`text-[7px] border-none font-bold uppercase ${item.color} bg-white/5`}>{item.status}</Badge>
                        </div>
                      ))}
                   </div>
                   <p className="text-[9px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                      "Real-time monitoring of Strong Customer Authentication ensures 100% legal finality for every settlement."
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-purple-500 flex items-center gap-2">
                    <Sparkles className="size-4" /> Gateway Advantage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-3">
                      {[
                        { label: "Hybrid Success Rate", val: "99.98%" },
                        { label: "White-label Latency", val: "0ms Injection" },
                        { label: "Global Reach", val: "20+ Countries" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 text-[9px] uppercase font-bold">
                           <span className="text-muted-foreground">{item.label}</span>
                           <span className="text-purple-400">{item.val}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ShieldAlert className="size-3" /> Zero-Trust Gate
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Every white-label request is hashed and verified against the Partner Mesh before branding injection."
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
