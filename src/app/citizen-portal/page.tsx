
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  HeartPulse, 
  Zap, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Star,
  Award,
  Menu,
  Activity,
  Cpu,
  Landmark,
  Scale,
  ShieldAlert,
  Coins,
  ShieldPlus,
  Target,
  Waves,
  HeartHandshake
} from "lucide-react"
import { useUser } from "@/firebase"

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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Target className="size-3 mr-2" /> Phase P8: Indispensable Citizen
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Impact <span className="text-emerald-500">Citizen.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Welcome, {user?.displayName || "Sovereign Citizen"}. This portal tracks the consequence of your participation and your status in the Indispensability Mesh.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Impact Tier</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">TIER 3: ADVOCATE</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Consequence Ledger */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Waves className="size-4" /> Personal Consequence Ledger
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {[
                      { label: "Fraud Stopped", value: "$1,200", icon: ShieldAlert, color: "text-destructive" },
                      { label: "Time Saved", value: "142 hr", icon: Zap, color: "text-primary" },
                      { label: "Value Created", value: "$4,500", icon: Coins, color: "text-emerald-500" },
                      { label: "Trust Events", value: "42 Signed", icon: ShieldCheck, color: "text-purple-500" },
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

              {/* The 100-Person Test Card */}
              <Card className="glass-card relative overflow-hidden bg-emerald-500/5 border-emerald-500/20">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <HeartPulse className="size-48 text-emerald-500" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                       <Award className="size-5" /> The 100-Person Indispensability Result
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6 relative z-10">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                       "যদি কাল নূরনেক্সাস না থাকে, আপনার দৈনন্দিন কার্যক্রমে কী প্রভাব পড়বে?" আপনার মতো ১০০ জন নাগরিকের উত্তরের ভিত্তিতে আপনার বর্তমান স্কোর:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                       {[
                         { title: "Personal Impact", reward: "CRITICAL", status: "VERIFIED" },
                         { title: "Risk of Removal", reward: "MAX LOSS", status: "VALIDATED" },
                         { title: "Utility Dependency", reward: "94.2%", status: "HARDENED" },
                       ].map((r, i) => (
                         <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase">{r.title}</p>
                            <p className="text-xs text-white font-mono">{r.reward}</p>
                            <Badge variant="outline" className="text-[8px] h-4 border-emerald-500/20 text-emerald-500 uppercase">
                               {r.status}
                            </Badge>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>

              <section className="space-y-4">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                    <Activity className="size-4" /> Impact History (The Proof)
                 </h3>
                 <div className="space-y-3">
                    {[
                      { action: "Governance Implementation Verified", impact: "+8% Utility", time: "2h ago", proof: "imp_001_v" },
                      { action: "Risk Mitigation Seal Applied", impact: "Fraud Prevented", time: "1d ago", proof: "rsk_122_x" },
                      { action: "Sovereign Handshake Completed", impact: "Indispensable Link", time: "3d ago", proof: "sov_092_u" },
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
              <Card className="glass-card border-l-4 border-l-emerald-500">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Proof of Consequence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                     {[
                       { label: "Indispensability", status: "MAX_LEVEL" },
                       { label: "Outcome Quality", status: "VERIFIED" },
                       { label: "Counterfactual Gain", status: "96.2%" }
                     ].map((c, i) => (
                       <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                          <span className="text-[9px] text-white font-bold uppercase">{c.label}</span>
                          <Badge variant="outline" className="text-[7px] h-3 border-emerald-500/20 text-emerald-500">{c.status}</Badge>
                       </div>
                     ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Activity className="size-4" /> Indispensability Flywheel
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span>Systemic Importance</span>
                          <span className="text-primary font-bold">98%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '98%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "You are no longer just a user; you are a consequential cell in the sovereign body. Your absence would trigger immediate systemic drift."
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
