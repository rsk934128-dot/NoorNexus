
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { ShieldCheck, RefreshCcw, Cloud, Sparkles, Radio, Smartphone, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/**
 * @fileOverview Shurukkha Hub Standard Edition (Dashboard)
 * নূরনেক্সাস অপারেটিং সিস্টেমের জন্য একটি প্রিমিয়াম ক্লাউড নোড ইন্টারফেস।
 */
export default function ShurukkhaStandardPage() {
  const refreshFrame = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <main className="flex flex-col h-[100dvh] w-full max-w-full overflow-hidden p-0 m-0 relative bg-background">
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-[60]">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 glow-emerald shrink-0">
                <Cloud className="size-6 text-emerald-500" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-emerald-500 truncate leading-none flex items-center gap-2">
                  Shurukkha Standard
                  <Sparkles className="size-4 text-emerald-400 animate-pulse" />
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Cloud Node: Standard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7 bg-emerald-500/5">
                <ShieldCheck className="size-3.5" />
                <span className="text-[10px] font-bold">Persistent Uplink</span>
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={refreshFrame} 
                className="text-muted-foreground hover:text-emerald-500 size-8"
              >
                <RefreshCcw className="size-4" />
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-hidden bg-black/20 w-full p-0 m-0 relative z-0">
            <div className="size-full flex flex-col items-center justify-center gap-8 p-6 text-center">
               <div className="relative">
                  <div className="size-32 rounded-full border-4 border-emerald-500/20 flex items-center justify-center">
                     <Radio className="size-16 text-emerald-500 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin-slow" />
               </div>
               
               <div className="space-y-3 max-w-md">
                  <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-widest">Node Synchronized</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                     "কমান্ডার, আপনার স্ট্যান্ডার্ড সুরক্ষা নোডটি বর্তমানে পারসিস্টেন্ট ব্যাকগ্রাউন্ড মোডে সচল। আপনি এখন নিরবিচ্ছিন্নভাবে সিগন্যাল রিসিভ করতে পারবেন।"
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                  {[
                    { label: "Signal Integrity", val: "100%", icon: Activity },
                    { label: "Handshake", val: "Verified", icon: ShieldCheck },
                    { label: "Device Sync", val: "Active", icon: Smartphone }
                  ].map((stat, i) => (
                    <Card key={i} className="glass-card bg-emerald-500/5 border-emerald-500/20">
                       <CardContent className="p-4 space-y-1">
                          <stat.icon className="size-4 text-emerald-500 mx-auto mb-2" />
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">{stat.label}</p>
                          <p className="text-xs font-headline font-bold text-white uppercase">{stat.val}</p>
                       </CardContent>
                    </Card>
                  ))}
               </div>
            </div>
          </div>
          
          <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full z-[60]">
            <p className="text-[9px] font-mono text-emerald-500/60 uppercase tracking-[0.4em]">
              NoorNexus OS Integrated Cloud Node | Endpoint: shurukkha-hub-ofzc
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
