
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
  Award
} from "lucide-react"
import { useUser } from "@/firebase"

const PARTICIPATION_METRICS = [
  { label: "Community Engagement", score: 85, icon: MessageSquare, color: "text-primary" },
  { label: "Trust Contribution", score: 92, icon: HeartHandshake, color: "text-emerald-500" },
  { label: "Governance Activity", score: 64, icon: ShieldCheck, color: "text-amber-500" },
  { label: "Mesh Support", score: 78, icon: Activity, color: "text-purple-500" },
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
                   <UserCircle className="size-3 mr-2" /> Citizen Layer Expansion
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Citizen <span className="text-primary">Portal.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Welcome, {user?.displayName || "Sovereign Citizen"}. This is your gateway to participate in the digital civilization of NoorNexus. Engagement, contribution, and governance start here.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Reputation Score</p>
                  <p className="text-3xl font-headline font-bold text-primary">850</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PARTICIPATION_METRICS.map((m, i) => (
                  <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group">
                    <CardContent className="p-6 space-y-4">
                       <div className="flex justify-between items-start">
                          <div className={`p-3 bg-white/5 rounded-xl ${m.color}`}>
                             <m.icon className="size-6" />
                          </div>
                          <Badge variant="outline" className="text-[10px] border-white/10 uppercase">Verified</Badge>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between items-end">
                             <p className="text-xs font-bold text-white uppercase tracking-widest">{m.label}</p>
                             <p className={`text-2xl font-headline font-bold ${m.color}`}>{m.score}%</p>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full transition-all duration-1000 ${m.color.replace('text-', 'bg-')}`} style={{ width: `${m.score}%` }} />
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                ))}
              </section>

              <Card className="glass-card relative overflow-hidden bg-primary/5 border-primary/20">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Share2 className="size-48 text-primary" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <Gift className="size-5" /> Contribution Rewards
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                       {[
                         { title: "Early Citizen", reward: "Verified Badge", status: "CLAIMED" },
                         { title: "Gov Contributor", reward: "2x Voting Weight", status: "LOCKED" },
                         { title: "Mesh Node", reward: "Daily Revenue Share", status: "ELIGIBLE" },
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
                       Explore Rewards Catalog
                    </Button>
                 </CardContent>
              </Card>

              <section className="space-y-4">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                    <Activity className="size-4" /> Participation History
                 </h3>
                 <div className="space-y-3">
                    {[
                      { action: "Governance Vote Cast", impact: "+5 Trust", time: "2h ago" },
                      { action: "Merchant Validation Completed", impact: "+15 Trust", time: "1d ago" },
                      { action: "Mesh Node Uptime Sync", impact: "+2 Trust", time: "3d ago" },
                    ].map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-xl">
                         <div className="flex items-center gap-4">
                            <div className="size-2 bg-emerald-500 rounded-full" />
                            <p className="text-xs text-white font-medium">{h.action}</p>
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
                    <Award className="size-4" /> Citizen Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    "Every NoorNexus citizen is a validator of truth. Your engagement strengthens the collective immunity of the mesh."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                       <span className="text-muted-foreground uppercase">Civilization Tier</span>
                       <span className="text-amber-500 font-bold uppercase">VERIFIED_RESIDENT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <TrendingUp className="size-4" /> My Growth Engine
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Civic Impact</span>
                          <span className="text-primary">85%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '85%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       You are in the top 15% of NoorNexus citizens by participation this cycle.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                       <ShieldCheck className="size-3" /> Data Justice Verified
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       Your data remains 100% sovereign. No third-party access has been requested or granted in the last 30 days.
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
