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
  Presentation,
  Calendar as CalendarIcon,
  Clock,
  Building,
  User,
  Briefcase,
  Cpu,
  Infinity,
  Database,
  LayoutGrid,
  ShieldPlus,
  Lock,
  Code2,
  Apple,
  Handshake,
  Github
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

/**
 * @fileOverview Sovereign Prospectus (v4.5 - Zenith Edition)
 * Formal presentation of Sheikh Farid's Project Matrix and Technology Readiness.
 */

export default function ProposalPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [downloading, setDownloading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()

  const [pocForm, setPocForm] = useState({
    name: "",
    org: "",
    intent: "Proof of Concept Integration",
    message: ""
  })

  const IMPERIAL_PORTFOLIO = [
    {
      group: "Enterprise Ecosystem",
      projects: [
        { name: "SheikhTech Globalizer", desc: "116+ Modular Apps (BanglaBot AI, HealthPulse, TakaFlow, VisaAssist)", status: "PRODUCTION", icon: Globe },
        { name: "NoorNexus Sovereign OS v4.5", desc: "Autonomous Enterprise Software Integration Platform", status: "STABLE_GOLD", icon: Infinity }
      ]
    },
    {
      group: "Fintech Infrastructure",
      projects: [
        { name: "Rubelpay", desc: "Automated Gateway with Smart Escrow & Real-time Ledger", status: "STABLE", icon: Landmark },
        { name: "FusionPay", desc: "Merchant API Hub & Universal Payout Endpoints", status: "ACTIVE", icon: Zap },
        { name: "Sovereign Fintech Shield", desc: "Payment Security & High-Value Transaction Tracking", status: "HARDENED", icon: ShieldPlus }
      ]
    },
    {
      group: "AI & Apple Integration",
      projects: [
        { name: "NoorAI (Nora Suite)", desc: "Neural AI Suite for Fintech & Civilizational Logic", status: "EVOLVING", icon: BrainCircuit },
        { name: "Firebase AI Logic (Apple)", desc: "Swift-native Gemini Foundation Models framework adapter.", status: "PREVIEW", icon: Apple },
        { name: "National Cyber Defense Blueprint (P-150)", desc: "Strategic Sovereign Cybersecurity Strategy", status: "RELEASED", icon: FileText }
      ]
    }
  ]

  const handleDownloadPitch = () => {
    setDownloading(true)
    toast({ title: "Archiving Portfolio Records", description: "Packaging Project Matrix for Imperial Dispatch..." })

    setTimeout(() => {
      setDownloading(false)
      toast({
        title: "Prospectus Dispatched",
        description: "Portfolio records v4.5.0-gold anchored to PDF buffer.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2000)
  }

  const handleScheduleMeeting = async () => {
    if (!date || !pocForm.name || !pocForm.org) {
      toast({ title: "Incomplete Protocol", variant: "destructive" });
      return;
    }
    setSubmitting(true)
    try {
      await addDoc(collection(db, "poc_meetings"), {
        ...pocForm,
        proposedDate: date.toISOString(),
        status: "PENDING_HANDSHAKE",
        submittedBy: user?.email || "anonymous_node",
        timestamp: serverTimestamp()
      })
      toast({ title: "Handshake Request Dispatched", className: "border-emerald-500/50 bg-emerald-500/5" })
      setIsDialogOpen(false)
    } catch (e: any) {
      toast({ title: "Transmission Error", description: e.message, variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full pb-20 overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary -ml-2">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-[10px]">
                   <Award className="size-3 mr-2" /> Global Architect Portfolio
                 </Badge>
                 <Badge className="bg-emerald-500 text-black text-[10px] font-bold">STABLE: v4.5.0-gold</Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-primary">Prospectus.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Sovereign Digital Portfolio." ইঞ্জিনিয়ার শেখ ফরিদের ১১৬+ প্রজেক্টের সমন্বিত ইকোসিস্টেম এবং ফিনটেক ইনফ্রাস্ট্রাকচার। 
              </p>
            </div>
            <div className="flex gap-4">
               <Button onClick={handleDownloadPitch} disabled={downloading} className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary px-8">
                 {downloading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
                 Export Prospectus
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-12">
               
               {/* Project Matrix Visualization */}
               {IMPERIAL_PORTFOLIO.map((group, idx) => (
                 <section key={idx} className="space-y-6">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2 px-1">
                       <Layers className="size-4" /> {group.group}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {group.projects.map((project, pIdx) => (
                         <Card key={pIdx} className="glass-card border-white/5 hover:border-primary/30 transition-all group overflow-hidden">
                            <CardContent className="p-8 space-y-4">
                               <div className="flex justify-between items-start">
                                  <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 transition-colors">
                                     <project.icon className="size-6 text-primary" />
                                  </div>
                                  <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] h-5 uppercase font-bold">{project.status}</Badge>
                               </div>
                               <div className="space-y-2">
                                  <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight">{project.name}</h4>
                                  <p className="text-xs text-muted-foreground leading-relaxed italic">"{project.desc}"</p>
                               </div>
                            </CardContent>
                         </Card>
                       ))}
                    </div>
                 </section>
               ))}

               {/* Apple & CI/CD Spotlight */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-purple-500 flex items-center gap-2 px-1">
                     <ShieldCheck className="size-4" /> Engineering Excellence
                  </h3>
                  <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5 relative overflow-hidden group">
                     <CardContent className="p-8 sm:p-12 space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                 <Apple className="size-6 text-white" />
                                 <h4 className="text-xl font-headline font-bold text-white uppercase">Apple SDK Integration</h4>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                 Swift-native integration with Firebase AI Logic. We provide a bridge for Gemini Foundation Models directly into iOS and visionOS nodes.
                              </p>
                           </div>
                           <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                 <Github className="size-6 text-purple-400" />
                                 <h4 className="text-xl font-headline font-bold text-white uppercase">CI/CD Automation</h4>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                 Full automation with GitHub Actions. Build guards and auto-deployment ensuring 100% stability across the global PaaS grid.
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </section>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <Monitor className="size-4" /> Tech Stack v4.5
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                        {[
                           "Next.js 15 (Zenith)",
                           "React 19 (Perpetual)",
                           "Google Genkit (Nora)",
                           "Firebase Admin (Hardened)",
                           "Swift & Apple AI (Swift)"
                        ].map((t, i) => (
                           <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                              <span className="text-muted-foreground uppercase">{t.split('(')[0]}</span>
                              <span className="text-primary font-bold">{t.split('(')[1].replace(')', '')}</span>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 p-6 flex flex-col items-center text-center gap-4">
                 <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                    <Handshake className="size-8 text-emerald-500" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-headline font-bold text-white uppercase tracking-widest">Global Partner Access</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono">v4.5.0-gold: PRODUCTION_READY</p>
                 </div>
                 
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                       <Button className="w-full bg-emerald-500 text-black font-bold uppercase text-[10px] h-11 glow-emerald gap-2">
                          <Presentation className="size-4" /> Request PoC Sync
                       </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-primary/20 bg-black/95 text-white sm:max-w-[500px]">
                       <DialogHeader>
                          <DialogTitle className="text-xl font-headline font-bold uppercase tracking-tight text-white flex items-center gap-3">
                             Request PoC Handshake
                          </DialogTitle>
                          <DialogDescription className="text-muted-foreground text-xs uppercase tracking-widest font-mono">
                             Mission 500: Institutional Integration Protocol.
                          </DialogDescription>
                       </DialogHeader>
                       <div className="grid gap-6 py-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-primary">Partner Name</Label>
                                <Input value={pocForm.name} onChange={e => setPocForm({...pocForm, name: e.target.value})} placeholder="Your Name" className="bg-white/5" />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-primary">Organization</Label>
                                <Input value={pocForm.org} onChange={e => setPocForm({...pocForm, org: e.target.value})} placeholder="Entity Name" className="bg-white/5" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-primary">Date</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                   <Button variant={"outline"} className={cn("w-full justify-start text-left bg-white/5 border-white/10", !date && "text-muted-foreground")}>
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {date ? format(date, "PPP") : "Pick a date"}
                                   </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 glass-card bg-black/95">
                                   <Calendar mode="single" selected={date} onSelect={setDate} />
                                </PopoverContent>
                             </Popover>
                          </div>
                       </div>
                       <DialogFooter>
                          <Button onClick={handleScheduleMeeting} disabled={submitting} className="w-full bg-emerald-500 text-black font-bold h-12">
                             {submitting ? <Loader2 className="animate-spin" /> : "Initiate Handshake"}
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
