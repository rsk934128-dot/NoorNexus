
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  Target, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Menu, 
  Star, 
  Sparkles,
  HeartHandshake,
  BrainCircuit,
  Quote,
  TrendingUp,
  CheckCircle2,
  Crown,
  ClipboardCheck,
  Handshake,
  Share2,
  Activity,
  Lightbulb,
  LineChart,
  ShieldHalf,
  Database,
  Lock,
  ArrowRight,
  Flame,
  Search
} from "lucide-react"
import { SovereignLogo } from "@/components/sovereign-logo"

const CIVILIZATIONAL_STRESS_TEST = [
  { scenario: "Treasury Collapse", resilience: 94, status: "SURVIVABLE", recovery: "420ms" },
  { scenario: "Mass Citizen Exit", resilience: 82, status: "VULNERABLE", recovery: "12s" },
  { scenario: "AI Dependency Failure", resilience: 88, status: "STABLE", recovery: "5s" },
  { scenario: "Governance Deadlock", resilience: 99, status: "IMMUNE", recovery: "0ms" },
]

export default function StrategicAssessmentPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1400px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <Flame className="size-3 mr-2" /> Civilization Stress Testing
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Institutional <span className="text-amber-500">Maturity.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 163: Evidence Marketplace. Measuring নূরনেক্সাস against catastrophic failure scenarios to ensure civilizational longevity.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <SovereignLogo size={80} className="opacity-80" />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Stress Test Results */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <ShieldHalf className="size-4" /> Civilization Stress Test Report
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CIVILIZATIONAL_STRESS_TEST.map((test, i) => (
                      <Card key={i} className="glass-card bg-white/2 border-white/5">
                        <CardContent className="p-4 flex justify-between items-center">
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-white uppercase">{test.scenario}</p>
                              <div className="flex items-center gap-2">
                                 <p className="text-2xl font-headline font-bold text-primary">{test.resilience}%</p>
                                 <span className="text-[8px] text-muted-foreground font-mono">RECOVERY: {test.recovery}</span>
                              </div>
                           </div>
                           <Badge variant="outline" className={`text-[8px] ${test.status === 'IMMUNE' ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500'}`}>
                              {test.status}
                           </Badge>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Evidence Marketplace */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Share2 className="size-4" /> Evidence Marketplace
                 </h3>
                 <Card className="glass-card bg-primary/5 border-white/5 overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/2 py-4">
                       <div className="flex items-center justify-between">
                          <CardTitle className="text-xs uppercase font-bold text-primary">Verifiable Audit Chains</CardTitle>
                          <div className="relative">
                             <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                             <input className="bg-black/40 border border-white/5 rounded pl-7 pr-2 py-1 text-[9px] w-48 outline-none" placeholder="Search Evidence ID..." />
                          </div>
                       </div>
                    </CardHeader>
                    <CardContent className="p-0">
                       <div className="divide-y divide-white/5">
                          {[
                            { id: "AUDIT-992", domain: "Financial", status: "VERIFIED", timestamp: "Cycle 45-B", proof: "0x82...f9" },
                            { id: "AUDIT-991", domain: "Governance", status: "ATTESTED", timestamp: "Cycle 45-A", proof: "0xcc...e1" },
                            { id: "AUDIT-990", domain: "AI Alignment", status: "VERIFIED", timestamp: "Cycle 44-C", proof: "0x12...a3" }
                          ].map((audit, i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                               <div className="flex items-center gap-4">
                                  <div className="p-2 bg-white/5 rounded">
                                     <Lock className="size-3 text-primary opacity-50" />
                                  </div>
                                  <div className="space-y-0.5">
                                     <p className="text-[10px] font-bold text-white uppercase">{audit.id} • {audit.domain}</p>
                                     <p className="text-[8px] font-mono text-muted-foreground">{audit.timestamp} | PROOF: {audit.proof}</p>
                                  </div>
                               </div>
                               <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100">
                                  <ArrowRight className="size-4 text-primary" />
                                </Button>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>
              </section>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Database className="size-48 text-amber-500" />
                 </div>
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                       <Sparkles className="size-5" /> Institutional Memory Engined
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 relative z-10">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "সভ্যতা টিকে থাকে স্মৃতির মাধ্যমে। প্রতিটি স্ট্রেস টেস্ট এবং তার ফলাফল নূরনেক্সাস মেমরি ভল্টে সংরক্ষিত থাকে, যা সিস্টেমকে ক্রমান্বয়ে আরও শক্তিশালী করে তোলে।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Quote className="size-4" /> Meta-Governance Wisdom
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-headline font-bold text-emerald-100 leading-relaxed italic">
                    "প্রতিষ্ঠাতা নয়, বরং সিস্টেমের মেটা-গভর্ন্যান্স এবং স্ট্রেস-টেস্টই প্রতিষ্ঠানের প্রকৃত বৈধতা নিশ্চিত করে।"
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mb-2">Net Institutional Worth</p>
                    <div className="flex items-end gap-2">
                       <p className="text-3xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">$512M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                      <Flame className="size-4" /> Critical Weaknesses
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      Identification of single-point failures is a priority for Mission 400.
                   </p>
                   <div className="space-y-2 pt-2">
                      {[
                        "Founder Dependency: 18%",
                        "AI Feedback Loop: 12%",
                        "External Federation: PENDING"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-[9px] text-white">
                           <Activity className="size-3 text-amber-500" />
                           <span>{item}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <TrendingUp className="size-4" /> Recovery Speed
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase">Avg Recovery</span>
                          <span className="text-primary">420ms</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '99.8%' }} />
                       </div>
                    </div>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
