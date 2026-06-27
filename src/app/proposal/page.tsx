
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
  Quote,
  Presentation,
  Calendar as CalendarIcon,
  Clock,
  Building,
  User
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { SovereignLogo } from "@/components/sovereign-logo"
import { useFirestore, useUser } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function ProposalPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [downloading, setDownloading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()

  // Form State
  const [pocForm, setPocForm] = useState({
    name: "",
    org: "",
    intent: "Proof of Concept Integration",
    message: ""
  })

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

  const handleScheduleMeeting = async () => {
    if (!date || !pocForm.name || !pocForm.org) {
      toast({
        title: "Incomplete Protocol",
        description: "Please provide all required credentials and a valid solar date.",
        variant: "destructive"
      })
      return
    }

    setSubmitting(true)
    try {
      await addDoc(collection(db, "poc_meetings"), {
        ...pocForm,
        proposedDate: date.toISOString(),
        status: "PENDING_HANDSHAKE",
        submittedBy: user?.email || "anonymous_node",
        timestamp: serverTimestamp(),
        protocolVersion: "v3.5"
      })

      toast({
        title: "PoC Handshake Dispatched",
        description: "Commander Farid has been notified. Check your imperial mail for confirmation.",
        className: "border-emerald-500/50 bg-emerald-500/5 glow-emerald"
      })
      
      setIsDialogOpen(false)
      setPocForm({ name: "", org: "", intent: "Proof of Concept Integration", message: "" })
      setDate(undefined)
    } catch (e: any) {
      toast({
        title: "Neural Transmission Error",
        description: e.message,
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
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
               <Link href="/pitch-deck">
                  <Button className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald">
                    <Presentation className="size-4" /> Launch Pitch Deck
                  </Button>
               </Link>
               <Button 
                onClick={handleDownloadPitch}
                disabled={downloading}
                className="bg-primary/10 text-primary border border-primary/20 font-bold h-12 uppercase tracking-widest gap-2 hover:bg-primary/20"
               >
                 {downloading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
                 Download Prospectus
               </Button>
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
                             আমরা বিশ্বাস করি, আপনার প্রতিষ্ঠানের বর্তমান ফিনটেক ইকোসিস্টেমের সাথে আমাদের FusionPay ইন্টিগ্রেট করলে গ্লোবাল ক্রস-বর্ডার পেমেন্ট এবং সেটেলমেন্ট ব্যবস্থায় এক যুগান্তকারী পরিবর্তন আসবে। আমরা আমাদের API-First Architecture and Sandbox Mode-এর মাধ্যমে আপনার টেকনিক্যাল টিমের সাথে সরাসরি ইন্টিগ্রেশন প্রক্রিয়ায় অংশ নিতে প্রস্তুত।
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

              {/* Call to Action Card with Functional Dialog */}
              <Card className="glass-card border-amber-500/20 bg-amber-500/5 p-6 flex flex-col items-center text-center gap-4">
                 <div className="size-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                    <Mail className="size-8 text-amber-500" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-headline font-bold text-white uppercase tracking-widest">Connect with Architect</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono">rubels1k994@gmail.com</p>
                 </div>
                 
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                       <Button className="w-full bg-amber-500 text-black font-bold uppercase text-[10px] h-11 glow-emerald gap-2">
                          <Presentation className="size-4" /> Schedule PoC Meeting
                       </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-primary/20 bg-black/95 text-white sm:max-w-[500px]">
                       <DialogHeader>
                          <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
                             <Handshake className="size-6 text-amber-500" />
                          </div>
                          <DialogTitle className="text-xl font-headline font-bold uppercase tracking-tight text-white flex items-center gap-3">
                             Schedule PoC Handshake
                          </DialogTitle>
                          <DialogDescription className="text-muted-foreground text-xs uppercase tracking-widest font-mono">
                             Initiate institutional integration and value settlement protocols.
                          </DialogDescription>
                       </DialogHeader>
                       
                       <div className="grid gap-6 py-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                                   <User className="size-3" /> Partner Name
                                </Label>
                                <Input 
                                   value={pocForm.name}
                                   onChange={e => setPocForm({...pocForm, name: e.target.value})}
                                   placeholder="Your Full Name" 
                                   className="bg-white/5 border-white/10 h-10" 
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                                   <Building className="size-3" /> Organization
                                </Label>
                                <Input 
                                   value={pocForm.org}
                                   onChange={e => setPocForm({...pocForm, org: e.target.value})}
                                   placeholder="Entity Name" 
                                   className="bg-white/5 border-white/10 h-10" 
                                />
                             </div>
                          </div>

                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                                <CalendarIcon className="size-3" /> Proposed Meeting Date
                             </Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                   <Button
                                      variant={"outline"}
                                      className={cn(
                                         "w-full justify-start text-left font-normal bg-white/5 border-white/10 h-10",
                                         !date && "text-muted-foreground"
                                      )}
                                   >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                                   </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 glass-card bg-black/95 border-primary/20" align="start">
                                   <Calendar
                                      mode="single"
                                      selected={date}
                                      onSelect={setDate}
                                      initialFocus
                                   />
                                </PopoverContent>
                             </Popover>
                          </div>

                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                                <MessageSquare className="size-3" /> Integration Intent
                             </Label>
                             <Textarea 
                                value={pocForm.message}
                                onChange={e => setPocForm({...pocForm, message: e.target.value})}
                                placeholder="Describe your integration requirements..." 
                                className="bg-white/5 border-white/10 min-h-[100px] text-xs" 
                             />
                          </div>
                       </div>

                       <DialogFooter>
                          <Button 
                             onClick={handleScheduleMeeting}
                             disabled={submitting}
                             className="w-full bg-amber-500 text-black font-bold uppercase h-12 glow-emerald gap-2"
                          >
                             {submitting ? <Loader2 className="size-4 animate-spin" /> : <Rocket className="size-4" />}
                             Broadcast Meeting Request
                          </Button>
                       </DialogFooter>
                    </DialogContent>
                 </Dialog>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}

function Handshake(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2 4-4" />
      <path d="m18 10 1-1a2 2 0 0 0-3-3l-2.26 2.26a.45.45 0 0 1-.63 0L11 6a2 2 0 0 0-3 3l2 2" />
      <path d="m14 14 2 2" />
      <path d="m3 7 3-3 4.5 4.5" />
      <path d="M6.3 20.3a2.1 2.1 0 1 1-3-3" />
      <path d="m18 14-3 3" />
    </svg>
  )
}
