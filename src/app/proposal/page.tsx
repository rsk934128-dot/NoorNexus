
"use client"

import { useState } from "react"
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
  Fingerprint,
  Loader2,
  FileDown,
  Globe,
  Scale,
  HeartHandshake,
  Waves,
  Mail,
  Quote
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { SovereignLogo } from "@/components/sovereign-logo"

export default function ProposalPage() {
  const { toast } = useToast()
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPitch = () => {
    setDownloading(true)
    toast({
      title: "Initiating Secure Download",
      description: "Packaging FusionPay Enterprise Prospectus from Imperial Vault...",
    })

    setTimeout(() => {
      try {
        const mockContent = `
          FUSIONPAY | ENTERPRISE INTEGRATION PROSPECTUS
          -----------------------------------------------
          INTEGRITY THROUGH INTELLIGENCE
          
          Founder: Engineer Sheikh Farid
          Organization: NoorNexus Sovereign Infrastructure
          Standard: ISO 20022 Certified Architecture
          
          PROPOSAL SUMMARY:
          - Global Settlement Node (bKash to SWIFT/PayPal)
          - AI-Native Decision Engine (Nora-AI Integration)
          - Seamless Scalability (T+0 Liquidity)
          
          This is an official document of the NoorNexus Sovereign Infrastructure.
        `;
        
        const blob = new Blob([mockContent], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "FusionPay_Enterprise_Prospectus_v3.pdf";
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloading(false)
        toast({
          title: "Download Successful",
          description: "FusionPay_Prospectus.pdf has been dispatched.",
          className: "border-emerald-500/50 bg-emerald-500/5"
        })
      } catch (err) {
        setDownloading(false)
        toast({
          title: "Download Failed",
          variant: "destructive"
        })
      }
    }, 2500)
  }

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
                   <HeartHandshake className="size-3 mr-2" /> Executive Integration Hub
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-primary">Prospectus.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Establishing the bridge between local wallets and global institutions." নূরনেক্সাস এখন ফিউশনপে-এর মাধ্যমে বিশ্বব্যাপী মার্চেন্ট এবং ব্যাংক ইন্টিগ্রেশনের জন্য প্রস্তুত।
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
               <Button 
                onClick={handleDownloadPitch}
                disabled={downloading}
                className="bg-primary/10 text-primary border border-primary/20 font-bold h-12 uppercase tracking-widest gap-2 hover:bg-primary/20"
               >
                 {downloading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
                 Download Prospectus
               </Button>
               <Link href="/onboarding">
                 <Button className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary">
                   <Rocket className="size-4" /> Start Integration
                 </Button>
               </Link>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              
              {/* Executive Proposal Draft */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <ScrollText className="size-4" /> FusionPay এন্টারপ্রাইজ ইন্টিগ্রেশন (Draft)
                 </h3>
                 <Card className="glass-card border-white/10 bg-black/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <SovereignLogo size={200} />
                    </div>
                    <CardContent className="p-8 sm:p-12 space-y-8 relative z-10">
                       <div className="border-l-4 border-l-primary pl-6 space-y-4">
                          <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight">প্রস্তাবনা: FusionPay এন্টারপ্রাইজ ইন্টিগ্রেশন</h4>
                          <p className="text-[10px] text-primary font-mono uppercase tracking-widest">To: CEO / CTO / Financial Institutions</p>
                       </div>

                       <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                          <p>শ্রদ্ধেয় সংশ্লিষ্ট কর্তৃপক্ষের দৃষ্টি আকর্ষণ করছি,</p>
                          <p>
                             আমি <strong>ইঞ্জিনিয়ার শেখ ফরিদ</strong>, নূরনেক্সাস (NoorNexus) প্ল্যাটফর্মের প্রতিষ্ঠাতা এবং প্রধান আর্কিটেক্ট। আমি অত্যন্ত আনন্দের সাথে জানাচ্ছি যে, আমরা আমাদের <strong>FusionPay</strong> প্ল্যাটফর্মের মাধ্যমে একটি ISO 20022 সার্টিফাইড গ্লোবাল ফিনটেক ইনফ্রাস্ট্রাকচার তৈরি করেছি।
                          </p>
                          
                          <div className="space-y-4 py-4">
                             <h5 className="font-bold text-white uppercase text-xs flex items-center gap-2">
                                <Zap className="size-3 text-primary" /> মূল বৈশিষ্ট্যসমূহ:
                             </h5>
                             <ul className="space-y-3 list-none pl-4">
                                <li className="flex gap-3">
                                   <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                   <p><span className="text-white font-bold">গ্লোবাল লিকুইডিটি নোড:</span> এটি লোকাল পেমেন্ট সিস্টেম (যেমন: bKash, SSLCommerz) এবং গ্লোবাল সেটেলমেন্ট নেটওয়ার্কের (যেমন: PayPal, Stripe, SWIFT) মধ্যে একটি শক্তিশালী সেতু হিসেবে কাজ করে।</p>
                                </li>
                                <li className="flex gap-3">
                                   <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                   <p><span className="text-white font-bold">এআই-নেটিভ ডিসিশন ইঞ্জিন:</span> লেনদেনের নিরাপত্তা নিশ্চিত করতে আমাদের রিয়েল-টাইম ফ্রড স্কোরিং এবং অ্যানোমালি ডিটেকশন সিস্টেম রয়েছে।</p>
                                </li>
                                <li className="flex gap-3">
                                   <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                   <p><span className="text-white font-bold">বিরামহীন স্কেলেবিলিটি:</span> এটি টি+০ (T+0) লিকুইডিটি ডেসপ্যাচ নিশ্চিত করার লক্ষ্যে কাজ করে, যা ব্যবসায়িক গতিশীলতা বহুগুণ বাড়িয়ে দেয়।</p>
                                </li>
                             </ul>
                          </div>

                          <p>
                             আমরা বিশ্বাস করি, আপনার প্রতিষ্ঠানের বর্তমান ফিনটেক ইকোসিস্টেমের সাথে আমাদের FusionPay ইন্টিগ্রেট করলে গ্লোবাল ক্রস-বর্ডার পেমেন্ট এবং সেটেলমেন্ট ব্যবস্থায় এক যুগান্তকারী পরিবর্তন আসবে। আমরা আমাদের API-First Architecture এবং Sandbox Mode-এর মাধ্যমে আপনার টেকনিক্যাল টিমের সাথে সরাসরি ইন্টিগ্রেশন প্রক্রিয়ায় অংশ নিতে প্রস্তুত।
                          </p>

                          <div className="pt-8 space-y-1">
                             <p className="text-white font-bold italic">ধন্যবাদান্তে,</p>
                             <p className="text-primary font-headline font-bold text-lg uppercase tracking-tight">ইঞ্জিনিয়ার শেখ ফরিদ</p>
                             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">প্রতিষ্ঠাতা ও প্রধান আর্কিটেক্ট, নূরনেক্সাস (NoorNexus)</p>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              </section>

              {/* Strategic Roadmap for Partners */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Waves className="size-4" /> Strategic Value Roadmap
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { step: "Phase 1", label: "Sandbox Bridge", desc: "Test connections via sim_fusion node." },
                      { step: "Phase 2", label: "Liquidity Sync", desc: "Establish T+0 settlement rills." },
                      { step: "Phase 3", label: "Global Launch", desc: "Scale to 100-node hegemony." }
                    ].map((s, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2 p-4 text-center space-y-2">
                         <p className="text-[9px] font-bold text-primary uppercase">{s.step}</p>
                         <h4 className="text-xs font-bold text-white uppercase">{s.label}</h4>
                         <p className="text-[10px] text-muted-foreground italic leading-relaxed">"{s.desc}"</p>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* Certification & Standards */}
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <ShieldCheck className="size-4" /> Compliance Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-3">
                      {[
                        { label: "Messaging", val: "ISO 20022" },
                        { label: "Encryption", val: "SHA-256" },
                        { label: "Security", val: "TLS 1.2+" },
                        { label: "Audit", val: "Nora-52 Oracle" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                           <span className="uppercase text-muted-foreground">{item.label}</span>
                           <span className="text-emerald-500 font-bold">{item.val}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              {/* Pitch Deck Quick Stats */}
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                 <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                       <TrendingUp className="size-4" /> Performance Benchmarks
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="space-y-1">
                       <div className="flex justify-between text-[10px] font-bold uppercase">
                          <span className="text-muted-foreground">Settlement Latency</span>
                          <span className="text-primary">28ms</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '96%' }} />
                       </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">"Outperforming traditional banking rails by 12x in cross-border corridors."</p>
                 </CardContent>
              </Card>

              {/* Call to Action Card */}
              <Card className="glass-card border-amber-500/20 bg-amber-500/5 p-6 flex flex-col items-center text-center gap-4">
                 <div className="size-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                    <Mail className="size-8 text-amber-500" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-headline font-bold text-white uppercase tracking-widest">Connect with Architect</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono">rubels1k994@gmail.com</p>
                 </div>
                 <Button className="w-full bg-amber-500 text-black font-bold uppercase text-[10px] h-10 glow-emerald">
                    Schedule PoC Meeting
                 </Button>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
