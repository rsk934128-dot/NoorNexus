"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  ShieldCheck, 
  Menu, 
  LayoutGrid, 
  LockKeyhole, 
  Rocket, 
  ArrowRightLeft,
  CreditCard,
  Landmark,
  Layers,
  ArrowRight,
  Sparkles,
  Database,
  Code2,
  Globe,
  Activity,
  History,
  Scale,
  Monitor,
  Smartphone
} from "lucide-react"

const BLUEPRINT_STEPS = [
  { id: "P51.1", label: "Unified Auth Bridge", icon: LockKeyhole, status: "DESIGNED" },
  { id: "P51.2", label: "AETS Token Injection", icon: CreditCard, status: "READY" },
  { id: "P51.3", label: "Open Banking Rail Sync", icon: Landmark, status: "SYNCED" },
  { id: "P51.4", label: "Hosted Redirect Flow", icon: Monitor, status: "READY" },
  { id: "P51.5", label: "Enterprise SDK Release", icon: Code2, status: "PENDING" },
]

export default function SovereignGatewayPage() {
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
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Rocket className="size-3 mr-2" /> Project #51: The Sovereign Gateway
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Global <span className="text-purple-500">Gateway.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project #51: The culmination of Mission 400. A unified API supporting both Hosted Redirect and Direct API pathways for external enterprise settlement.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Architecture Ready</p>
                  <p className="text-3xl font-headline font-bold text-purple-500">88%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {/* Architecture Blueprint */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Layers className="size-4" /> System Blueprint
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BLUEPRINT_STEPS.map((step) => (
                      <Card key={step.id} className="glass-card bg-white/2 border-white/5 hover:border-purple-500/30 transition-all group">
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                 <step.icon className="size-6 text-purple-400" />
                              </div>
                              <Badge className="bg-purple-500/20 text-purple-500 border-none text-[8px]">{step.status}</Badge>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{step.id}</p>
                              <h4 className="text-sm font-headline font-bold text-white uppercase">{step.label}</h4>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Enterprise Integration Demo */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <Code2 className="size-4" /> Integration Modes
                 </h3>
                 <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline text-white uppercase">Direct API Payment Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <pre className="bg-black/60 p-6 rounded-xl font-mono text-[11px] text-emerald-400 leading-relaxed overflow-x-auto border border-white/5">
{`// Execute atomic settlement via Direct API
const settlement = await noorNexus.pay({
  amount: 5000,
  currency: 'USD',
  pathway: 'DIRECT_API', // Full UI Control
  rails: 'OPEN_BANKING_YAPILY'
});

// OR Launch Hosted Redirect Flow
const hostedUrl = await noorNexus.createHostedSession({
  amount: 5000,
  callbackUrl: 'https://partner.com/success',
  branding: 'IMPERIAL_RED'
});`}
                       </pre>
                    </CardContent>
                 </Card>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-purple-500 flex items-center gap-2">
                    <Sparkles className="size-4" /> The Unified Advantage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                      "Hosted Pages provide the fastest time-to-market, while Direct API allows for deeply integrated civilizational experiences."
                   </p>
                   <div className="space-y-3">
                      {[
                        { label: "Hosted Speed", val: "Zero Frontend" },
                        { label: "Direct Control", val: "Bulk/Scheduled" },
                        { label: "Global Reach", val: "20+ Countries" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 text-[9px] uppercase font-bold">
                           <span className="text-muted-foreground">{item.label}</span>
                           <span className="text-purple-400">{item.val}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <Smartphone className="size-3" /> SCA & SCA Redirects
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "All Hosted Page integrations handle Strong Customer Authentication (SCA) automatically within the Sovereign Canal."
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
