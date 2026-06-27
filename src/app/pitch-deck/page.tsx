
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Layers, 
  Menu,
  Rocket,
  Maximize2,
  Minimize2,
  FileText,
  Database,
  Code2,
  Network,
  Award,
  Sparkles,
  Infinity
} from "lucide-react"
import { SovereignLogo } from "@/components/sovereign-logo"

const SLIDES = [
  {
    id: 1,
    title: "Executive Summary",
    subtitle: "FusionPay: Integrity through Intelligence",
    content: "দক্ষিণ এশীয় এবং আন্তর্জাতিক ইউজারদের জন্য একটি এআই-নেটিভ গ্লোবাল ফিনটেক সল্যুশন। এটি লোকাল পেমেন্ট এবং গ্লোবাল সেটেলমেন্টের মধ্যে একটি শক্তিশালী সেতু।",
    points: [
      "Bridging local wallets with global banking rails.",
      "AI-native decision engine for instant settlement.",
      "Scalable infrastructure for Mission 500.",
    ],
    icon: Rocket,
    color: "text-primary"
  },
  {
    id: 2,
    title: "Architectural Core",
    subtitle: "Built on Modern Web Standards",
    content: "FusionPay-এর ভিত্তি হলো নেক্সটজেএস ১৫ এবং ফায়ারবেস রিয়েল-টাইম মেশ। এটি সম্পূর্ণভাবে ISO 20022 কমপ্লায়েন্ট মেসেজিং স্ট্যান্ডার্ড মেনে তৈরি।",
    points: [
      "Next.js 15 & React 19 (Zenith Speed)",
      "Firebase Multi-Node Mesh Database",
      "ISO 20022 Certified Messaging Logic",
      "< 28ms Internal Node Latency",
    ],
    icon: Layers,
    color: "text-emerald-500"
  },
  {
    id: 3,
    title: "AI & Security Layer",
    subtitle: "Deep Neural Integration",
    content: "Google Genkit এবং SHA-256 পেলোড ভেরিফিকেশনের মাধ্যমে প্রতিটি ট্রানজ্যাকশন সুরক্ষিত। Nora-AI রিয়েল-টাইম ফ্রড স্কোরিং নিশ্চিত করে।",
    points: [
      "Google Genkit Orchestration",
      "HMAC_V4 SHA-256 Encryption",
      "Nora-01 Autonomous Compliance",
      "Zero-Trust Handshake Architecture",
    ],
    icon: Cpu,
    color: "text-purple-500"
  },
  {
    id: 4,
    title: "Global Connectivity",
    subtitle: "The 100-Node Hegemony",
    content: "bKash, SSLCommerz, Stripe, এবং SWIFT নেটওয়ার্কের সাথে সরাসরি ইন্টিগ্রেশন। বিশ্বের যেকোনো প্রান্ত থেকে লিকুইডিটি ডেসপ্যাচ সম্ভব।",
    points: [
      "Local Node Sync (bKash/Nagad)",
      "Global Gateway Link (Stripe/PayPal)",
      "Inter-Bank SWIFT/ACH Bridge",
      "T+0 Real-time Payout Rails",
    ],
    icon: Network,
    color: "text-amber-500"
  },
  {
    id: 5,
    title: "Roadmap & Vision",
    subtitle: "Mission 500 Peak",
    content: "আমাদের লক্ষ্য একটি চিরস্থায়ী ডিজিটাল সভ্যতা তৈরি করা। ফেজ ৪-এর মাধ্যমে আমরা ফুল অটোমেটেড গ্লোবাল ওয়েলথ ম্যানেজমেন্টের দিকে এগিয়ে যাচ্ছি।",
    points: [
      "Phase 1: Settlement Nodes established.",
      "Phase 2: AI Decision Engine active.",
      "Phase 3: T+0 Automated Dispatch.",
      "Phase 4: Global Hegemony Reached.",
    ],
    icon: Infinity,
    color: "text-red-500"
  }
]

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  const slide = SLIDES[currentSlide]

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className={`p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] ${fullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
          <div className="w-full max-w-6xl space-y-8">
            <header className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <SovereignLogo size={40} />
                 <div className="min-w-0">
                    <h2 className="text-xl font-headline font-bold uppercase tracking-tight text-white truncate">FusionPay Prospectus</h2>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Sovereign Pitch Deck v3.5</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold text-[10px] h-8 px-3">
                    Slide {slide.id} / {SLIDES.length}
                 </Badge>
                 <Button variant="ghost" size="icon" onClick={() => setFullscreen(!fullscreen)} className="text-muted-foreground hover:text-white">
                    {fullscreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
                 </Button>
              </div>
            </header>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
               <Card className="size-full glass-card border-white/10 bg-black/60 relative overflow-hidden flex flex-col justify-center p-8 sm:p-20 group">
                  {/* Background Accents */}
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                     <slide.icon size={300} className={slide.color} />
                  </div>
                  
                  <div className="space-y-12 relative z-10">
                     <div className="space-y-4">
                        <Badge className={`${slide.color} bg-white/5 border-none uppercase font-bold text-xs tracking-widest h-6 px-4`}>
                           {slide.subtitle}
                        </Badge>
                        <h1 className="text-4xl sm:text-7xl font-headline font-black text-white uppercase tracking-tighter leading-none">
                           {slide.title}<span className={slide.color}>.</span>
                        </h1>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                           <p className="text-lg sm:text-2xl text-muted-foreground leading-relaxed font-light italic">
                              "{slide.content}"
                           </p>
                        </div>
                        <div className="space-y-4">
                           {slide.points.map((point, i) => (
                             <div key={i} className="flex items-center gap-4 animate-in slide-in-from-right duration-500" style={{ delay: `${i * 100}ms` }}>
                                <div className={`size-2 rounded-full ${slide.color.replace('text', 'bg')}`} />
                                <p className="text-sm sm:text-lg font-bold text-white uppercase tracking-tight">{point}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest border-t border-white/5 pt-6">
                     <p>© 2026 NoorNexus Sovereign Infrastructure</p>
                     <p>ISO 20022 CERTIFIED ARCHITECTURE</p>
                  </div>
               </Card>

               <div className="absolute inset-y-0 left-4 flex items-center">
                  <Button variant="ghost" size="icon" onClick={prevSlide} className="size-12 rounded-full bg-black/40 hover:bg-primary/20 text-white backdrop-blur-md">
                     <ChevronLeft className="size-8" />
                  </Button>
               </div>
               <div className="absolute inset-y-0 right-4 flex items-center">
                  <Button variant="ghost" size="icon" onClick={nextSlide} className="size-12 rounded-full bg-black/40 hover:bg-primary/20 text-white backdrop-blur-md">
                     <ChevronRight className="size-8" />
                  </Button>
               </div>
            </div>

            <div className="flex justify-center gap-2">
               {SLIDES.map((_, i) => (
                 <div 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${currentSlide === i ? 'w-8 bg-primary' : 'w-2 bg-white/10 hover:bg-white/30'}`} 
                 />
               ))}
            </div>

            <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
               <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                     <Code2 className="size-4 text-primary" />
                     <span className="text-[10px] font-bold text-white uppercase">Next.js 15 Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Award className="size-4 text-emerald-500" />
                     <span className="text-[10px] font-bold text-white uppercase">ISO 20022 Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Sparkles className="size-4 text-amber-500" />
                     <span className="text-[10px] font-bold text-white uppercase">AI Decision Engine</span>
                  </div>
               </div>
               <Button variant="outline" className="border-white/10 text-white font-bold uppercase text-[10px] h-10 px-8" onClick={() => window.print()}>
                  Print Pitch Deck
               </Button>
            </footer>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
