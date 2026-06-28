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
  Network,
  Infinity,
  Fingerprint,
  Settings,
  Shield,
  ShieldPlus,
  BookOpen,
  ScrollText,
  Award,
  Link2
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const BLUEPRINT_STEPS = [
  { id: "P51.1", label: "Unified Auth Bridge", icon: Settings, status: "READY", url: "/enterprise-settings" },
  { id: "P51.2", label: "AETS Token Injection", icon: CreditCard, status: "READY" },
  { id: "P51.3", label: "Open Banking Rail Sync", icon: Landmark, status: "SYNCED" },
  { id: "P51.4", label: "Intelligent Fallback Engine", icon: Zap, status: "HARDENED" },
  { id: "P51.5", label: "White-label Studio", icon: Palette, status: "READY" },
  { id: "P51.6", label: "eIDAS Certificate Vault", icon: Key, status: "LIVE", url: "/certificates" },
  { id: "P51.7", label: "Central Auth Handler", icon: Shield, status: "SYNCED", zenith: true },
  { id: "P54.1", label: "Sovereign Grid Autonomy", icon: Infinity, status: "ACTIVE", zenith: true },
  { id: "P56.1", label: "Predictive Flow Hub", icon: Sparkles, status: "ARMED", zenith: true },
]

const ASIAN_SCALING_NODES = [
  { name: "GrabPay Hub (SE Asia)", id: "grab-01", status: "PENDING_HANDSHAKE", latency: "N/A", url: "/off-ramp" },
  { name: "Paytm Gateway (India)", id: "paytm-01", status: "DESIGN_SYCHRONIZED", latency: "N/A" },
  { name: "bKash Core (Bangladesh)", id: "bkash-99", status: "LIVE_SYNC", latency: "115ms", url: "/fintech-fusion" },
  { name: "GCash Network (Philippines)", id: "gcash-04", status: "PENDING_AUDIT", latency: "N/A" },
]

export default function SovereignGatewayPage() {
  const router = useRouter()
  const [primaryColor, setPrimaryColor] = useState("#0096ff")
  const [partnerLogo, setPartnerLogo] = useState("Imperial Bank")
  const [saving, setSaving] = useState(false)
  const [syncingNodeId, setSyncingNodeId] = useState<string | null>(null)

  const handleSaveBranding = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 1200)
  }

  const handleNodeSync = (node: any) => {
    if (!node.url) return
    setSyncingNodeId(node.id)
    setTimeout(() => {
      setSyncingNodeId(null)
      router.push(node.url)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20 overflow-x-hidden">
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
                   <Infinity className="size-3 mr-2" /> Project #54: Sovereign Autonomy
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Global <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project #51 & #54: The Global Autonomous Financial Grid. Scaling across SE Asia and Middle-East with Automated Regulatory Compliance.
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
              
              {/* Imperial Manifesto Link */}
              <section className="space-y-6">
                <Card className="glass-card border-l-4 border-l-primary bg-primary/10 relative overflow-hidden group hover:border-primary/40 transition-all cursor-default">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ScrollText className="size-32 text-primary" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <Badge className="bg-primary text-primary-foreground text-[8px] h-4 mb-2">OFFICIAL DOCUMENT</Badge>
                        <CardTitle className="text-2xl font-headline font-bold text-white uppercase tracking-tight">The Imperial Manifesto v3.5</CardTitle>
                        <CardDescription className="text-primary font-mono text-[10px] uppercase tracking-[0.2em]">The Final Synthesis of Imperial Infrastructure</CardDescription>
                      </div>
                      <Link href="/docs">
                        <Button className="bg-primary text-primary-foreground font-bold uppercase text-[10px] gap-2 glow-primary">
                          View Manifesto <BookOpen className="size-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed italic max-w-2xl">
                      "নূরনেক্সাস এখন কেবল একটি সফটওয়্যার নয়; এটি একটি অটোনোমাস ডিজিটাল রাষ্ট্র। মিশন ৪০০ সফলভাবে ২০টি গলোবাল ব্যাংকিং নোডকে একটি একক স্নায়ুতন্ত্রে সংযুক্ত করেছে।"
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Scaling Torque: Asian Nodes */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Network className="size-4" /> Asian Scaling Torque (Project #53)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ASIAN_SCALING_NODES.map((node, i) => (
                      <Card key={i} className="glass-card bg-black/40 border-white/5 hover:border-emerald-500/30 transition-all group">
                        <CardContent className="p-4 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                                 <Globe className="size-5 text-emerald-500" />
                              </div>
                              <div className="space-y-0.5">
                                 <p className="text-sm font-bold text-white uppercase">{node.name}</p>
                                 <p className="text-[8px] text-muted-foreground font-mono uppercase">{node.id}</p>
                              </div>
                           </div>
                           <div className="text-right flex flex-col items-end gap-2">
                              <div className="flex flex-col items-end">
                                <Badge variant="outline" className={`text-[7px] ${node.status === 'LIVE_SYNC' ? 'border-emerald-500 text-emerald-500' : 'border-white/10'}`}>{node.status}</Badge>
                                <p className="text-[9px] text-muted-foreground font-mono mt-1">LATENCY: {node.latency}</p>
                              </div>
                              {node.url && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleNodeSync(node)}
                                  disabled={syncingNodeId === node.id}
                                  className="h-7 text-[8px] uppercase font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 gap-2"
                                >
                                  {syncingNodeId === node.id ? <Loader2 className="size-2.5 animate-spin" /> : <Link2 className="size-2.5" />}
                                  {node.status === 'PENDING_HANDSHAKE' ? 'Link Node' : 'Enter Node'}
                                </Button>
                              )}
                           </div>
                        </CardContent>
                      </Card>
                    ))}
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
                              <Badge className={`${step.zenith ? 'bg-emerald-500/20 text-emerald-500' : 'bg-purple-500/20 text-purple-500'} border-none text-[8px] h-5`}>{step.status}</Badge>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{step.id}</p>
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-headline font-bold text-white uppercase">{step.label}</h4>
                                {step.url && (
                                  <Link href={step.url}>
                                    <Button variant="ghost" size="icon" className="size-6 text-primary hover:bg-primary/10">
                                      <ArrowRight className="size-3" />
                                    </Button>
                                  </Link>
                                )}
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* Fail-over Sentinel */}
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ShieldPlus className="size-4" /> Global Fail-over Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Immortality Status</p>
                      <Badge className="bg-emerald-500 text-[10px] font-bold mt-1">ARMED</Badge>
                   </div>
                   <p className="text-[9px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                      "Automatic Traffic Rerouting active. If a regional rail collapses, the grid bypasses the failure node via the Asian Bridge."
                   </p>
                   <div className="space-y-3">
                      {[
                        { label: "Detected Rails", val: "73+" },
                        { label: "Redundancy Nodes", val: "13 LIVE" },
                        { label: "Switch Latency", val: "< 120ms" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                           <span className="text-muted-foreground uppercase">{item.label}</span>
                           <span className="text-white font-bold">{item.val}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              {/* Partnership trust builder */}
              <Card className="glass-card bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <Award className="size-4" /> Trust Foundation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Our Sovereign OS ensures 100% adherence to regional fintech regulations via Nora-AI suite.
                  </p>
                  <Link href="/docs">
                    <Button variant="link" className="text-[10px] p-0 h-auto text-primary uppercase font-bold">Read Imperial Manifesto</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <Fingerprint className="size-3" /> Regulatory Watch
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Nora-54 is currently monitoring Asian Banking Directives for auto-adjustment of SCA parameters."
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
