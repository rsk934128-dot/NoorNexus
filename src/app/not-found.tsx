"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SovereignLogo } from "@/components/sovereign-logo"
import { ShieldAlert, ArrowLeft, Radio, Search } from "lucide-react"

/**
 * @fileOverview Custom 404 Hub (Coordinate Not Resolved)
 * নূরনেক্সাস অপারেটিং সিস্টেমের জন্য একটি প্রিমিয়াম ৪০৪ এরর পেজ।
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 cyber-grid overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[3] animate-pulse-slow">
           <SovereignLogo size={400} />
        </div>
      </div>
      
      <div className="relative z-10 text-center space-y-12 max-w-xl">
        <div className="space-y-4">
           <div className="flex justify-center">
              <div className="size-24 rounded-full bg-destructive/10 border-4 border-destructive/20 flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                 <ShieldAlert className="size-12 text-destructive" />
              </div>
           </div>
           <h1 className="text-8xl font-headline font-black text-white tracking-tighter glitch-text">404</h1>
           <p className="text-primary font-mono text-xs uppercase tracking-[0.6em]">Coordinate Not Resolved</p>
        </div>

        <div className="space-y-6 bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl">
           <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed italic">
              "Commander, the requested neural path does not exist in the 100-node mesh. We have detected a drift in the spatial coordinates."
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/" className="w-full sm:w-auto">
                 <Button className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 px-8 glow-primary gap-2">
                    <ArrowLeft className="size-4" /> Return to Command
                 </Button>
              </Link>
              <Link href="/browser" className="w-full sm:w-auto">
                 <Button variant="outline" className="w-full border-white/10 text-white font-bold uppercase tracking-widest h-12 px-8 gap-2">
                    <Search className="size-4" /> Pulse Search Sentinel
                 </Button>
              </Link>
           </div>
        </div>

        <div className="pt-12 flex flex-col items-center gap-4 opacity-40">
           <div className="flex items-center gap-2">
              <Radio className="size-3 text-destructive animate-pulse" />
              <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-destructive">Signal Lost: Error_Coordinate_Mismatch</span>
           </div>
           <p className="text-[10px] text-muted-foreground font-bold uppercase">NoorNexus Sovereign OS v3.5</p>
        </div>
      </div>
    </div>
  )
}
