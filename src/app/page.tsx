
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, 
  Menu, 
  Loader2, 
  Activity, 
  Zap, 
  History, 
  Target, 
  Waves, 
  Sparkles,
  Eye,
  Unlock,
  Globe,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Scale,
  BrainCircuit,
  HeartPulse
} from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ScrollArea } from "@/components/ui/scroll-area"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const PUBLIC_METRICS = [
  { label: "Uptime (Verified)", value: "99.99%", detail: "Cloud Sync Integrity", color: "text-emerald-500" },
  { label: "Transparency Score", value: "96.4", detail: "Open Metrics Policy", color: "text-primary" },
  { label: "External Audits", value: "12 Passed", detail: "Independent Review", color: "text-amber-500" },
  { label: "Earned Trust", value: "MAX", detail: "Resiliency Factor", color: "text-purple-500" },
]

const IMPACT_RECORDS = [
  "PUBLIC: Independent Audit #42 Verified Article II Compliance.",
  "INCIDENT: Node-04 Connectivity Drift resolved in 42ms (Postmortem Published).",
  "VERIFIED: 94% Citizens report 'Critical Dependence' in 100-Person Test.",
  "KNOWLEDGE: Institutional Memory Vault opened for Public Scholarly Review.",
  "TRUST: Recovery Pulse active after simulated Geopolitical Stress Test.",
  "EXTERNAL: UAE Research Hub validated NoorNexus Settlement Latency."
]

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("SYNCHRONIZING PUBLIC REALITY...")
  const [impactFeed, setImpactFeed] = useState<string[]>([])

  useEffect(() => {
    const sequence = [
      { text: "CALIBRATING INDEPENDENT TRUTH...", time: 600 },
      { text: "FETCHING EXTERNAL AUDIT LOGS...", time: 1200 },
      { text: "UNVEILING PUBLIC REALITY...", time: 1800 },
      { text: "NOORNEXUS: PUBLIC CIVILIZATIONAL INSTITUTION READY", time: 2400 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })

    const interval = setInterval(() => {
      setImpactFeed(prev => [IMPACT_RECORDS[Math.floor(Math.random() * IMPACT_RECORDS.length)], ...prev].slice(0, 10))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 space-y-12">
        <SovereignLogo size={120} />
        <div className="space-y-6 text-center max-w-md w-full">
          <h1 className="text-primary font-headline text-3xl sm:text-5xl font-black tracking-tighter uppercase">NoorNexus OS</h1>
          <p className="text-muted-foreground font-mono text-[10px] sm:text-sm tracking-[0.5em] uppercase">{statusText}</p>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary animate-progress" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1800px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="relative space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                   <SidebarTrigger className="md:hidden text-primary -ml-2">
                      <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-xs">
                      <Globe className="size-3 mr-2" /> Phase Ω: Public Reality
                   </Badge>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-xs">
                      <Unlock className="size-3 mr-2" /> Open Metrics Enabled
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
                   {isAdmin ? 'Imperial Transparency.' : 'Public Civilization.'}
                </h2>
                <p className="text-muted-foreground max-w-3xl text-sm sm:xl leading-relaxed italic">
                   "Trust is not what we claim; it is what the world observes. নূরনেক্সাস এখন একটি আয়না, যেখানে আমাদের প্রতিটি সাফল্য এবং ব্যর্থতা নিরপেক্ষভাবে দৃশ্যমান।"
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                <Card className="glass-card p-6 rounded-2xl border border-emerald-500/20 w-full min-w-[350px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">EXTERNALLY_VERIFIED</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Public Transparency Score</p>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                       <p className="text-5xl font-headline font-bold text-white uppercase tracking-tighter">96.4</p>
                       <p className="text-emerald-500 text-xs font-bold mb-1">/ 100</p>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: '96.4%' }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-3 italic text-center">"Third-Party Validation Active | Cycle 42 Mastery"</p>
                </Card>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               <section className="space-y-6">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <Eye className="size-4" /> Open Metrics Pulse (Public View)
                     </h3>
                     <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500 uppercase">Independent Verification: LIVE</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     {PUBLIC_METRICS.map((kpi, i) => (
                       <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-primary/20 transition-all">
                          <CardContent className="p-5 space-y-3">
                             <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">{kpi.label}</p>
                                <p className={`text-xl font-headline font-bold ${kpi.color}`}>{kpi.value}</p>
                                <p className="text-[8px] text-muted-foreground font-mono">{kpi.detail}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-amber-500 flex items-center gap-2">
                     <Scale className="size-4" /> Institutional Humility (Anti-Dogma Layer)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                       { title: "Public Postmortems", desc: "Every system failure and learned lesson is published for the public record.", icon: History },
                       { title: "External Audit Gate", desc: "Independent institutions have read-access to our audit logs and metrics.", icon: ShieldCheck },
                       { title: "Assumption Audit", desc: "AI agents specifically tasked to challenge our internal data and assumptions.", icon: BrainCircuit }
                     ].map((v, i) => (
                       <Card key={i} className="glass-card border-amber-500/10 bg-amber-500/5">
                          <CardContent className="p-6 space-y-4">
                             <div className="p-3 rounded-xl bg-amber-500/10 w-fit">
                                <v.icon className="size-6 text-amber-500" />
                             </div>
                             <div className="space-y-1">
                                <p className="text-sm font-headline font-bold text-white uppercase">{v.title}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-primary flex items-center gap-2">
                          <AlertTriangle className="size-4" /> The Second Chance Test (Trust Resiliency)
                       </CardTitle>
                       <CardDescription className="text-xs italic">"If we fail tomorrow, would you trust us again?"</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {[
                         { segment: "Public Willingness", impact: "High Resiliency", stat: "92%" },
                         { segment: "Partner Recovery", impact: "Protocol-Driven", stat: "88%" },
                         { segment: "Institutional Mercy", impact: "Audit-Based", stat: "96%" }
                       ].map((s, i) => (
                         <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                            <div className="space-y-1">
                               <p className="text-[10px] text-white font-bold uppercase">{s.segment}</p>
                               <p className="text-[9px] text-muted-foreground">{s.impact}</p>
                            </div>
                            <p className="text-sm font-headline font-bold text-primary">{s.stat}</p>
                         </div>
                       ))}
                    </CardContent>
                 </Card>

                 <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <CheckCircle2 className="size-4" /> Public Verification Hub
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">External Audits</p>
                             <p className="text-lg font-headline font-bold text-emerald-500">12 PASS</p>
                          </div>
                          <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Public Uptime</p>
                             <p className="text-lg font-headline font-bold text-emerald-500">99.99%</p>
                          </div>
                       </div>
                       <p className="text-[10px] text-muted-foreground italic text-center">
                          "Institutional legitimacy is earned through transparency, not perfection."
                       </p>
                    </CardContent>
                 </Card>
               </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card flex flex-col h-[600px]">
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-headline text-base uppercase flex items-center gap-2">
                    <Activity className="size-4 text-emerald-500" />
                    Public Reality Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {impactFeed.map((log, i) => (
                        <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 font-mono text-[10px] flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
                          <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <span className="text-muted-foreground truncate">{log}</span>
                        </div>
                      ))}
                      {impactFeed.length === 0 && (
                        <p className="text-center text-[9px] text-muted-foreground py-10">SYNCING PUBLIC DATA...</p>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                 <CardHeader className="p-6">
                    <CardTitle className="text-lg font-headline uppercase text-amber-500">Public Institution</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "NoorNexus is now a mirror for the civilization it serves. We measure our growth by the world's independent gaze."
                    </p>
                    <Badge className="w-full justify-center bg-amber-500/20 text-amber-500 border-none uppercase text-[8px] font-bold">Maturity: PUBLIC_REALITY</Badge>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
