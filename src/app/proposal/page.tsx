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
  ArrowRight,
  TrendingUp,
  Landmark,
  Target,
  Rocket,
  Award,
  ScrollText,
  Layers,
  MessageSquare,
  Fingerprint
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function ProposalPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Award className="size-3 mr-2" /> Official Partnership Proposal
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-primary">Proposal.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "আপনার প্রতিষ্ঠানের জন্য স্বয়ংক্রিয় এবং সুরক্ষিত ব্যাংকিং অবকাঠামো।" নূরনেক্সাস কেবল একটি গেটওয়ে নয়; এটি আপনার ব্যবসার জন্য একটি "অটোনোমাস ফিনটেক স্নায়ুতন্ত্র"।
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
               <Button className="bg-primary/10 text-primary border border-primary/20 font-bold h-12 uppercase tracking-widest gap-2 hover:bg-primary/20">
                 <Zap className="size-4" /> Download Pitch Deck
               </Button>
               <Link href="/onboarding">
                 <Button className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary">
                   <Rocket className="size-4" /> Start Onboarding
                 </Button>
               </Link>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              
              {/* কেন নূরনেক্সাস বেছে নেবেন? */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Target className="size-4" /> কেন নূরনেক্সাস বেছে নেবেন? (Core Value)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        title: "অজেয় নিরাপত্তা (Zenith Security)", 
                        desc: "প্রতিটি ট্রানজ্যাকশন Nora-52 এআই দ্বারা অডিট এবং ভেরিফাইড। আপনার ডেটা আমাদের কোয়ান্টাম-অ্যাঙ্করড ভল্টে সুরক্ষিত।",
                        icon: ShieldCheck,
                        color: "text-emerald-500",
                        bg: "bg-emerald-500/10"
                      },
                      { 
                        title: "প্রেডিক্টিভ ইন্টেলিজেন্স", 
                        desc: "লিকুইডিটি সংকট বা পেমেন্ট ব্যর্থ হওয়ার আগেই আমাদের সিস্টেম প্রেডিক্ট করে আপনাকে সতর্ক করবে (Project #56)।",
                        icon: BrainCircuit,
                        color: "text-amber-500",
                        bg: "bg-amber-500/10"
                      },
                      { 
                        title: "একীভূত কন্ট্রোল সেন্টার", 
                        desc: "মাল্টি-ব্যাংকিং একাউন্টের তথ্য এখন একটি ড্যাশবোর্ডেই। আপনার পুরো ব্যবসার আর্থিক প্রবাহ আমাদের নিয়ন্ত্রণে।",
                        icon: Landmark,
                        color: "text-primary",
                        bg: "bg-primary/10"
                      },
                      { 
                        title: "অপারেশনাল দক্ষতা", 
                        desc: "বাল্ক পেমেন্ট, অটোমেশন এবং স্মার্ট রাউটিং-এর মাধ্যমে ট্রানজ্যাকশন খরচ এবং সময় সাশ্রয় করুন।",
                        icon: Zap,
                        color: "text-purple-500",
                        bg: "bg-purple-500/10"
                      }
                    ].map((v, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group">
                        <CardContent className="p-6 space-y-4">
                           <div className={`size-10 rounded-xl ${v.bg} flex items-center justify-center shrink-0`}>
                              <v.icon className={`size-6 ${v.color}`} />
                           </div>
                           <div className="space-y-2">
                              <h4 className="font-headline font-bold text-white uppercase text-sm">{v.title}</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed italic">"{v.desc}"</p>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* আমাদের ফিচার সেট */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Layers className="size-4" /> আমাদের ফিচার সেট (Capabilities)
                 </h3>
                 <Card className="glass-card border-white/5 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-white/2">
                          <TableRow className="border-white/5">
                             <TableHead className="text-[10px] uppercase font-bold text-primary">ফিচার ক্যাটাগরি</TableHead>
                             <TableHead className="text-[10px] uppercase font-bold text-primary">বিস্তারিত বর্ণনা</TableHead>
                             <TableHead className="text-right text-[10px] uppercase font-bold text-primary">স্ট্যাটাস</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {[
                            { cat: "স্মার্ট পেমেন্ট", desc: "বাল্ক পেমেন্ট, পিরিওডিক সেটেলমেন্ট এবং অটোমেটেড কারেন্সি এক্সচেঞ্জ (EUR, GBP, BDT)।", status: "READY" },
                            { cat: "রিস্ক ম্যানেজমেন্ট", desc: "রিয়েল-টাইম ট্রানজ্যাকশন অডিট এবং Nora-54 দ্বারা ০.০২% রিস্ক প্রেডিকশন।", status: "ENFORCED" },
                            { cat: "গ্লোবাল কানেক্টিভিটি", desc: "AIB, Payoneer সহ ইউরোপ ও যুক্তরাজ্যের প্রধান ব্যাংকিং রেইলসের সাথে সরাসরি ইন্টিগ্রেশন।", status: "LIVE" },
                            { cat: "কমপ্লায়েন্স হাব", desc: "eIDAS, OBIE এবং GDPR স্ট্যান্ডার্ড অনুযায়ী অটোমেটেড অডিট রিপোর্ট জেনারেশন।", status: "VERIFIED" }
                          ].map((row, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/2 transition-colors">
                               <TableCell className="font-headline font-bold text-white text-xs uppercase">{row.cat}</TableCell>
                               <TableCell className="text-xs text-muted-foreground leading-relaxed italic">{row.desc}</TableCell>
                               <TableCell className="text-right">
                                  <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">{row.status}</Badge>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </Card>
              </section>

              {/* আপনার প্রতিষ্ঠানের জন্য সুবিধা */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> আপনার প্রতিষ্ঠানের জন্য সুবিধা (Impact)
                 </h3>
                 <div className="space-y-4">
                    {[
                      { title: "অপারেশনাল কস্ট রিডাকশন", desc: "ম্যানুয়াল কাজ কমিয়ে এবং স্মার্ট রাউটিং ব্যবহার করে লেনদেন খরচ সর্বনিম্নে নামিয়ে আনা।", impact: "-85% Costs" },
                      { title: "ঝুঁকি নিরসন", desc: "সাইবার হামলা বা ফিন্যান্সিয়াল ফ্রড হওয়ার আগেই সিস্টেমের স্বয়ংক্রিয় সতর্কবার্তা এবং আইসোলেশন।", impact: "Zero Fraud" },
                      { title: "জিরো-টাচ ম্যানেজমেন্ট", desc: "আপনার এআই সেন্টিনেল Nora-54 সারাক্ষণ আপনার ব্যবসার আর্থিক স্বাস্থ্যের পাহারায় নিযুক্ত।", impact: "24/7 Auto" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="size-2 rounded-full bg-primary animate-pulse" />
                            <div className="space-y-0.5">
                               <p className="text-xs font-bold text-white uppercase">{item.title}</p>
                               <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                            </div>
                         </div>
                         <div className="text-right shrink-0 ml-4">
                            <p className="text-xs font-headline font-bold text-emerald-500 uppercase">{item.impact}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* The NoorNexus Promise */}
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Award className="size-24 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Rocket className="size-4" /> The NoorNexus Promise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                      "নূরনেক্সাস আপনাকে কেবল একটি টুল দিচ্ছে না, দিচ্ছে আপনার ব্যবসার **ডিজিটাল সার্বভৌমত্ব**। আমাদের সিস্টেমের ল্যাটেন্সি (২৪-২৮ms) আপনাকে বিশ্বের সবচেয়ে দ্রুতগতির ব্যাংকিং অভিজ্ঞতা প্রদান করবে।"
                   </p>
                   <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                         <span className="text-muted-foreground uppercase">Veracity Guarantee</span>
                         <span className="text-emerald-500 font-bold">100.0%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                         <span className="text-muted-foreground uppercase">Network Latency</span>
                         <span className="text-primary font-bold">26ms</span>
                      </div>
                   </div>
                </CardContent>
              </Card>

              {/* Project #160: Autonomous Acquisition */}
              <Card className="glass-card border-purple-500/20 bg-purple-500/5">
                 <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-purple-500 flex items-center gap-2">
                       <Zap className="size-4" /> Project #160: Self-Acquisition
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                       "Zero-Resistance acquisition active. Partners can immediately trigger onboarding handshakes from this proposal."
                    </p>
                    <Link href="/onboarding" className="w-full">
                      <Button className="w-full bg-purple-500 text-white font-bold uppercase text-[10px] h-11 glow-primary gap-2">
                         Initialize Onboarding <ArrowRight className="size-3" />
                      </Button>
                    </Link>
                 </CardContent>
              </Card>

              {/* Trust Factor Showcase */}
              <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                       <ShieldCheck className="size-3" /> Trust & Authority
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                       "আপনার কোম্পানির অর্থ কেবল একটি অ্যাকাউন্টে নেই, এটি একটি জেনিথ-ভেরিফাইড অটোনোমাস গ্রিডের সুরক্ষা ও বুদ্ধিমত্তার অধীনে পরিচালিত হচ্ছে।"
                    </p>
                    <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">ZENITH_CERTIFIED</Badge>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground">Digital Sovereignty Seal</CardTitle>
                 </CardHeader>
                 <CardContent className="flex justify-center py-6">
                    <div className="size-24 rounded-full border-4 border-primary/20 flex items-center justify-center relative bg-black shadow-[0_0_20px_rgba(0,150,255,0.2)]">
                       <Fingerprint className="size-10 text-primary animate-pulse" />
                       <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin-slow" />
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
