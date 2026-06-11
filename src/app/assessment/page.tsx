
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
  Activity, 
  Check, 
  FileCheck, 
  FileSearch, 
  ShieldAlert,
  ExternalLink,
  BarChart3,
  Landmark,
  Scale,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  Search,
  History,
  Radar,
  LifeBuoy,
  ShieldPlus,
  Coins,
  TrendingUp,
  UserCheck
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ADOPTION_PROOF_MATRIX = [
  { tier: "Tier 1: Usage", description: "Daily active interactions", metrics: "1,240 DAU", status: "Validated" },
  { tier: "Tier 2: Dependency", description: "Critical operational reliance", metrics: "420 Nodes", status: "Hardened" },
  { tier: "Tier 3: Advocacy", description: "Paid contribution & support", metrics: "124 Citizens", status: "Proven" }
]

const ECONOMIC_CONTRIBUTION_REGISTER = [
  { metric: "Revenue Generated", value: "$12,450", source: "Subscriptions/Fees", impact: "High" },
  { metric: "Cost Reductions", value: "$18,200", source: "AI Compliance", impact: "Critical" },
  { metric: "Fraud Prevention", value: "$45,000", source: "Risk Engine", impact: "Max" },
  { metric: "Net Positive Value", value: "$75,650", source: "Ecosystem Total", impact: "Civilizational" }
]

export default function StrategicAssessmentPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <TrendingUp className="size-3 mr-2" /> Phase P7: Market Proof
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Economic <span className="text-amber-500">Gravity.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "NoorNexus as an Economic Engine." Measuring the market reality, revenue authenticity, and the uncopyable moats of our digital civilization.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-amber-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Economic Moat Score</p>
                  <p className="text-3xl font-headline font-bold text-amber-500">94/100</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Adoption Proof Matrix */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <UserCheck className="size-4" /> Adoption Proof Matrix
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Tier</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Evidence of Adoption</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Key Metric</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Status</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {ADOPTION_PROOF_MATRIX.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.tier}</TableCell>
                               <TableCell className="text-[10px] text-muted-foreground">{item.description}</TableCell>
                               <TableCell className="font-mono text-[10px] text-primary">{item.metrics}</TableCell>
                               <TableCell className="text-right">
                                  <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500 uppercase">{item.status}</Badge>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              {/* Economic Contribution Register */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Coins className="size-4" /> Civilizational Economic Register
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold">Economic Metric</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Value Created</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold">Primary Source</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold">Criticality</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {ECONOMIC_CONTRIBUTION_REGISTER.map((item, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-bold text-white text-xs">{item.metric}</TableCell>
                               <TableCell className="text-xs font-headline font-bold text-emerald-500">{item.value}</TableCell>
                               <TableCell className="text-[10px] text-muted-foreground">{item.source}</TableCell>
                               <TableCell className="text-right">
                                  <span className={`text-[10px] font-bold ${item.impact === 'Civilizational' ? 'text-primary' : 'text-emerald-500'}`}>{item.impact}</span>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                       <ShieldPlus className="size-5" /> The Moat Mandate
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "বৈশিষ্ট্য বা ফিচার কখনো সভ্যতাকে রক্ষা করে না; সভ্যতাকে রক্ষা করে তার বিশ্বাসযোগ্যতার ইতিহাস এবং নির্ভরযোগ্যতার প্রমাণ। নূরনেক্সাসের প্রকৃত প্রতিরক্ষা হলো আমাদের হাজারো ট্রানজ্যাকশনের স্বচ্ছতা এবং কোটি কোটি নাগরিকের আস্থা—যা কেউ নকল করতে পারবে না।"
                    </p>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <Activity className="size-4" /> Market Reality Observatory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Revenue Authenticity Ratio</p>
                     <p className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">10.3%</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                       <span className="text-muted-foreground uppercase">Voluntary Retention</span>
                       <span className="text-primary font-bold">94.2%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: '94%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <ShieldAlert className="size-4" /> Replacement Test Status
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded border border-white/5 space-y-2 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase">Competitor Switch Risk</p>
                       <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">ULTRA_LOW</Badge>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                       Users choose NoorNexus for its Verifiable Trust, not just functionality. Replacement by "Free Features" is mathematically rejected.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Economic Moat Summary
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {[
                      { label: "Trust History", status: "UNCOPYABLE" },
                      { label: "Compliance Moat", status: "VERIFIED" },
                      { label: "Partner Loyalty", status: "98%" }
                    ].map((c, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                         <span className="text-[9px] text-white font-bold uppercase">{c.label}</span>
                         <Badge variant="outline" className="text-[7px] text-emerald-500 border-emerald-500/20">{c.status}</Badge>
                      </div>
                    ))}
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
