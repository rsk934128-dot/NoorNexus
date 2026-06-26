"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  ShieldCheck, 
  Menu, 
  Zap, 
  CheckCircle2, 
  BrainCircuit,
  HeartPulse,
  Database,
  ArrowRight,
  TrendingUp,
  Landmark,
  Briefcase,
  Target,
  Sparkles,
  Rocket,
  Atom,
  Building2,
  PieChart,
  History,
  Lock,
  MessageSquare
} from "lucide-react"

export default function ProposalPage() {
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Rocket className="size-3 mr-2" /> Mission 500: B2B Scaling
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-primary">Proposal.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Trust through Authority." নূরনেক্সাস এখন একটি পূর্ণাঙ্গ এন্টারপ্রাইজ ফিনটেক ইনফ্রাস্ট্রাকচার—যেখানে নিরাপত্তা এবং বুদ্ধিমত্তা অবিচ্ছেদ্য।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary">
                 <Zap className="size-4" /> Download Pitch Deck
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              
              {/* Service Packages Section */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Briefcase className="size-4" /> Service Packages (B2B)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card border-l-4 border-l-emerald-500 hover:border-emerald-500/30 transition-all">
                       <CardHeader>
                          <CardTitle className="text-lg font-headline text-emerald-500 uppercase">Automated Ops Hub</CardTitle>
                          <CardDescription>Enterprise bulk payments and recurring settlements.</CardDescription>
                       </CardHeader>
                       <CardContent className="space-y-4">
                          <ul className="space-y-2 text-xs text-muted-foreground">
                             <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-emerald-500" /> One-click Bulk Salary Disbursement</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-emerald-500" /> Periodic Client Direct Debits</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-emerald-500" /> Multi-Bank Live Balance Sync</li>
                          </ul>
                       </CardContent>
                    </Card>
                    <Card className="glass-card border-l-4 border-l-primary hover:border-primary/30 transition-all">
                       <CardHeader>
                          <CardTitle className="text-lg font-headline text-primary uppercase">Risk & Compliance Guard</CardTitle>
                          <CardDescription>AI-driven transaction audit and forecasting.</CardDescription>
                       </CardHeader>
                       <CardContent className="space-y-4">
                          <ul className="space-y-2 text-xs text-muted-foreground">
                             <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary" /> Nora-52 Real-time Transaction Audit</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary" /> 48h Liquidity Forecasting (P56)</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-primary" /> Immutable Regulatory Reports</li>
                          </ul>
                       </CardContent>
                    </Card>
                 </div>
              </section>

              {/* Marketing Manifesto Section */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Target className="size-4" /> Marketing Manifesto
                 </h3>
                 <div className="grid grid-cols-1 gap-6">
                    <Card className="glass-card bg-black/40 border-white/5">
                       <CardContent className="p-8 space-y-6">
                          <div className="space-y-4">
                             <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight">Trust & Authority Architecture</h4>
                             <p className="text-sm text-muted-foreground leading-relaxed italic">
                                "আপনার কোম্পানির অর্থ কেবল একটি অ্যাকাউন্টে নেই, এটি একটি জেনিথ-ভেরিফাইড অটোনোমাস গ্রিডের সুরক্ষা ও বুদ্ধিমত্তার অধীনে পরিচালিত হচ্ছে।"
                             </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                             <div className="space-y-3">
                                <h5 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Zero-Touch Maintenance</h5>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                   আমাদের Nora AI আগেভাগেই লিকুইডিটি সংকট বা নোড ফেইলিওর প্রেডিক্ট করে ফেলে। আপনি সমস্যা টের পাওয়ার আগেই সমাধান হয়ে যায়।
                                </p>
                             </div>
                             <div className="space-y-3">
                                <h5 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Niche Focus (HNW)</h5>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                   হাই-নেট-ওয়ার্থ ক্লায়েন্ট এবং কর্পোরেট এন্টারপ্রাইজগুলোকে লক্ষ্য করুন যারা নিরাপত্তার বিষয়ে অত্যন্ত সংবেদনশীল।
                                </p>
                             </div>
                          </div>
                       </CardContent>
                    </Card>
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* Proposal Quick Action */}
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Sparkles className="size-4" /> Ready for Pilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "নূরনেক্সাস এখন বাস্তব ট্রানজ্যাকশন করার জন্য কারিগরিভাবে সম্পূর্ণ প্রস্তুত। আপনার প্রথম পাইলট ক্লায়েন্টকে যুক্ত করুন।"
                   </p>
                   <Button className="w-full bg-primary text-primary-foreground font-bold uppercase text-[10px] h-11 glow-primary">
                      Initialize Pilot Handshake
                   </Button>
                </CardContent>
              </Card>

              {/* Economic Advantage */}
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                 <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                       <TrendingUp className="size-4" /> Economic Edge
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase text-muted-foreground">Cost Reduction</span>
                          <span className="text-emerald-500 font-bold">85%</span>
                       </div>
                       <div className="flex justify-between text-[10px] font-mono">
                          <span className="uppercase text-muted-foreground">Speed Increase</span>
                          <span className="text-emerald-500 font-bold">99%</span>
                       </div>
                    </div>
                 </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <MessageSquare className="size-3" /> Tech Leadership
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                       ফিনটেক কনফারেন্সে নূরনেক্সাসের এই স্থাপত্য সম্পর্কে আলোচনা করুন। বড় বড় প্রতিষ্ঠান আপনা থেকেই আপনার সার্ভিসের জন্য আসবে।
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
