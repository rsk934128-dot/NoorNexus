
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  UserCircle, 
  Users, 
  HeartHandshake, 
  Zap, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Star,
  MessageSquare,
  Gift,
  Share2,
  Menu,
  Activity,
  Award,
  Cpu,
  Landmark,
  Scale,
  Clock,
  ShieldAlert,
  BarChart3
} from "lucide-react"
import { useUser } from "@/firebase"

const REPUTATION_VECTORS = [
  { label: "Civic Reputation", score: 85, icon: Users, color: "text-blue-500" },
  { label: "Economic Reputation", score: 92, icon: Landmark, color: "text-emerald-500" },
  { label: "Technical Reputation", score: 64, icon: Cpu, color: "text-purple-500" },
  { label: "Governance Reputation", score: 78, icon: Scale, color: "text-amber-500" },
]

export default function CitizenPortalPage() {
  const { user } = useUser()

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <UserCircle className="size-3 mr-2" /> Civilizational Utility
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Citizen <span className="text-primary">Value Hub.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Welcome, {user?.displayName || "Sovereign Citizen"}. This portal tracks the tangible value NoorNexus provides to your life. From time saved to financial losses prevented, your utility is our primary metric.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Composite Trust</p>
                  <p className="text-3xl font-headline font-bold text-primary">850</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> Personal Value Ledger (Impact Tracker)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {[
                      { label: "Time Saved", value: "42 Hours", icon: Clock, color: "text-blue-500" },
                      { label: "Losses Avoided", value: "$1,200", icon: ShieldAlert, color: "text-emerald-500" },
                      { label: "Transparency Gain", value: "MAX", icon: Eye, color: "text-purple-500" },
                      { label: "Decision Hardening", value: "8 Active", icon: Gavel, color: "text-amber-500" },
                    ].map((v, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group">
                        <CardContent className="p-6 space-y-4 text-center">
                           <div className={`p-3 bg-white/5 rounded-full w-fit mx-auto ${v.color}`}>
                              <v.icon className="size-6" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">{v.label}</p>
                              <p className={`text-xl font-headline font-bold ${v.color}`}>{v.value}</p>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <Card className="glass-card relative overflow-hidden bg-primary/5 border-primary/20">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Share2 className="size-48 text-primary" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <Gift className="size-5" /> Adoption Rewards (Indispensability)
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                       {[
                         { title: "Power User", reward: "L5 Clearance", status: "ELIGIBLE" },
                         { title: "Transparency Adv.", reward: "Auditor Badge", status: "CLAIMED" },
                         { title: "Value Contributor", reward: "2% Revenue Share", status: "LOCKED" },
                       ].map((r, i) => (
                         <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-bold text-primary uppercase">{r.title}</p>
                            <p className="text-xs text-white font-mono">{r.reward}</p>
                            <Badge variant={r.status === 'CLAIMED' ? 'secondary' : r.status === 'ELIGIBLE' ? 'default' : 'outline'} className="text-[8px] h-4">
                               {r.status}
                            </Badge>
                         </div>
                       ))}
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground font-bold uppercase h-12 glow-primary">
                       Explore Value Catalog
                    </Button>
                 </CardContent>
              </Card>

              <section className="space-y-4">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                    <Activity className="size-4" /> Civilizational Outcome History
                 </h3>
                 <div className="space-y-3">
                    {[
                      { action: "Automated Tax Settlement Success", impact: "0% Error Rate", time: "2h ago", proof: "v_381_x" },
                      { action: "Governance Veto - Drift Prevented", impact: "Principle Maintained", time: "1d ago", proof: "v_122_p" },
                      { action: "Mesh Node Contribution (Utility)", impact: "+12.5 GWh Saved", time: "3d ago", proof: "v_092_u" },
                    ].map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-xl">
                         <div className="flex items-center gap-4">
                            <div className="size-2 bg-emerald-500 rounded-full" />
                            <div className="space-y-0.5">
                               <p className="text-xs text-white font-medium">{h.action}</p>
                               <p className="text-[7px] font-mono text-muted-foreground">OUTCOME_PROOF: {h.proof}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] text-emerald-500 font-bold">{h.impact}</p>
                            <p className="text-[8px] text-muted-foreground uppercase">{h.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <Award className="size-4" /> Indispensable Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                     {[
                       { label: "Crisis Navigator", status: "VERIFIED" },
                       { label: "Utility Expert (L3)", status: "PENDING" },
                       { label: "Community Value Pillar", status: "VERIFIED" }
                     ].map((c, i) => (
                       <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                          <span className="text-[9px] text-white font-bold uppercase">{c.label}</span>
                          <Badge variant="outline" className={`text-[7px] h-3 ${c.status === 'VERIFIED' ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>{c.status}</Badge>
                       </div>
                     ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <TrendingUp className="size-4" /> Civilizational Utility Engine
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Utility Reliability</span>
                          <span className="text-primary">99.9%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '99.9%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       NoorNexus has become critical to your daily operations. Total dependency is verified.
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
