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
  Key,
  Building2,
  BellRing,
  Clock,
  Network
} from "lucide-react"

const BLUEPRINT_STEPS = [
  { id: "P51.1", label: "Unified Auth Bridge", icon: LockKeyhole, status: "DESIGNED" },
  { id: "P51.2", label: "AETS Token Injection", icon: CreditCard, status: "READY" },
  { id: "P51.3", label: "Open Banking Rail Sync", icon: Landmark, status: "SYNCED" },
  { id: "P51.4", label: "Intelligent Fallback Engine", icon: Zap, status: "HARDENED" },
  { id: "P51.5", label: "White-label Studio", icon: Palette, status: "READY" },
  { id: "P51.6", label: "eIDAS Certificate Vault", icon: Key, status: "LIVE" },
  { id: "P53.1", label: "Global Node Expansion", icon: Network, status: "ACTIVE", zenith: true },
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Network className="size-3 mr-2" /> Project #53: Global Grid
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Global <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project #51 & #53: The Global Autonomous Financial Grid. A unified PaaS gateway scaling across continental nodes with 100% Veracity.
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
              
              {/* eIDAS Health & Alerts Section */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <BellRing className="size-4 animate-pulse" /> eIDAS Vault Monitoring
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-xs font-bold uppercase text-white">mTLS Certificate (Transport)</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                             <span className="text-muted-foreground">Expires: Oct 20, 2025</span>
                             <Badge variant="outline" className="text-emerald-500 border-emerald-500/20">HEALTHY</Badge>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500" style={{ width: '82%' }} />
                          </div>
                          <p className="text-[9px] text-muted-foreground italic">"Automatic renewal protocol active. Scheduled for Sept 20, 2025."</p>
                       </CardContent>
                    </Card>
                    <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-xs font-bold uppercase text-white">QSealC Certificate (Signing)</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                             <span className="text-muted-foreground">Expires: Aug 15, 2025</span>
                             <Badge variant="outline" className="text-amber-500 border-amber-500/20">RENEWAL_DUE</Badge>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-amber-500" style={{ width: '65%' }} />
                          </div>
                          <div className="flex items-center gap-2 text-[9px] text-amber-500 font-bold">
                             <Clock className="size-3" /> ALERT: Renewal required in 142 days.
                          </div>
                       </CardContent>
                    </Card>
                 </div>
              </section>

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

              {/* Architecture Blueprint */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> Hardened System Blueprint
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {BLUEPRINT_STEPS.map((step) => (
                      <Card key={step.id} className={`glass-card bg-white/2 border-white/5 hover:border-purple-500/30 transition-all group ${step.zenith ? 'border-emerald-500/30 bg-emerald-500/5' : ''}`}>
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className={`p-3 rounded-xl ${step.zenith ? 'bg-emerald-500/10' : 'bg-purple-500/10'} group-hover:bg-purple-500/20 transition-colors`}>
                                 <step.icon className={`size-6 ${step.zenith ? 'text-emerald-400' : 'text-purple-400'}`} />
                              </div>
                              <Badge className={`${step.zenith ? 'bg-emerald-500/20 text-emerald-500' : 'bg-purple-500/20 text-purple-500'} border-none text-[8px]`}>{step.status}</Badge>
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
              {/* Grid Sentinel */}
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Network className="size-4" /> Project #53: Grid Scale
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Active Nodes", val: "12 LIVE", icon: Building2, color: "text-emerald-500" },
                        { label: "Target Regions", val: "EU, ASIA, ME", icon: Globe, color: "text-primary" },
                        { label: "Grid Stability", val: "OPTIMAL", icon: ShieldCheck, color: "text-emerald-500" },
                        { label: "Inter-Node Latency", val: "< 120ms", icon: Activity, color: "text-amber-500" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                           <div className="flex items-center gap-2">
                              <item.icon className={`size-3 ${item.color}`} />
                              <span className="text-[10px] text-muted-foreground uppercase font-bold">{item.label}</span>
                           </div>
                           <Badge variant="outline" className={`text-[7px] border-none font-bold uppercase ${item.color} bg-white/5`}>{item.val}</Badge>
                        </div>
                      ))}
                   </div>
                   <p className="text-[9px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                      "Scaling from the Iberian corridor to the global grid. Project #53 enables autonomous node clustering for zero-downtime finance."
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ShieldAlert className="size-3" /> Anomaly Protection
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Every LIVE node is monitored by Nora-52. Latency spikes trigger autonomous rerouting to maintain the grid's Sovereign Integrity."
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
