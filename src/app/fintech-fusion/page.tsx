
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Wallet, 
  ArrowRightLeft, 
  ShieldCheck, 
  Zap, 
  Activity, 
  RefreshCcw, 
  Globe, 
  Coins, 
  TrendingUp, 
  Menu,
  BrainCircuit,
  History,
  Lock,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  LayoutGrid,
  Monitor,
  Merge,
  Loader2,
  FileText
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore } from "@/firebase"

export default function FintechFusionPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [pulseActive, setPulseActive] = useState(true)

  const balances = [
    { currency: "USD", amount: "4,250.00", label: "Sovereign Vault", color: "text-primary" },
    { currency: "BDT", amount: "5,12,000.00", label: "Local Node", color: "text-emerald-500" },
    { currency: "GBP", amount: "1,200.00", label: "London Rail", color: "text-purple-500" }
  ]

  const recentTransactions = [
    { id: "TX-421", entity: "Freelancer.com", amount: "+$1,200.00", status: "VERIFIED", type: "IN", time: "2h ago" },
    { id: "TX-422", entity: "bKash: 017XXXXX", amount: "-50,000 BDT", status: "SETTLED", type: "OUT", time: "5h ago" },
    { id: "TX-423", entity: "Stripe Payout", amount: "+$450.00", status: "SYNCED", type: "IN", time: "1d ago" }
  ]

  const handleManualSync = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Mainframe Sync Complete",
        description: "Zero bit-drift detected across 100 mesh nodes.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 1500)
  }

  const refreshFrame = () => {
    const iframe = document.getElementById('fusion-iframe') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Merge className="size-3 mr-2" /> Project #450: FusionPay Cockpit
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-primary">Cockpit.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Integrity through Intelligence." Priyo Pay-এর অনুপ্রেরণায় তৈরি আপনার সাম্রাজ্যের কেন্দ্রীয় ফিনটেক কন্ট্রোল সেন্টার।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Network Torque</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500">94.8%</p>
               </div>
               <Button 
                onClick={handleManualSync}
                disabled={loading}
                className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary"
               >
                 {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                 Full Mesh Sync
               </Button>
            </div>
          </header>

          <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
             <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
                <TabsTrigger value="overview" className="gap-2 px-6"><LayoutGrid className="size-4" /> Cockpit Overview</TabsTrigger>
                <TabsTrigger value="portal" className="gap-2 px-6"><Monitor className="size-4" /> Omega Portal</TabsTrigger>
             </TabsList>

             <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Balance Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {balances.map((b, i) => (
                     <Card key={i} className="glass-card bg-black/40 border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                           <Wallet className="size-20" />
                        </div>
                        <CardContent className="p-6 space-y-2">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{b.label}</p>
                           <h3 className={`text-3xl font-headline font-bold ${b.color}`}>{b.currency} {b.amount}</h3>
                           <div className="flex items-center gap-2 pt-2 text-[9px] text-muted-foreground font-mono">
                              <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              VERIFIED_LEGAL_TENDER
                           </div>
                        </CardContent>
                     </Card>
                   ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 space-y-8">
                      {/* Nora-AI Insights Block */}
                      <Card className="glass-card border-l-4 border-l-primary bg-primary/5 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Sparkles className="size-32 text-primary" />
                         </div>
                         <CardHeader>
                            <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                               <BrainCircuit className="size-5" /> Nora-AI Financial Strategist
                            </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-6">
                            <p className="text-lg text-white leading-relaxed italic">
                               "কমান্ডার, আপনার দক্ষিণ এশীয় নোডে লিকুইডিটি বর্তমানে সর্বোচ্চ পর্যায়ে আছে। আগামী ২৪ ঘণ্টায় ক্রস-বর্ডার সেটেলমেন্টের জন্য ইউরোপীয় রেইলগুলোতে ৩% ফান্ড রিব্যালেন্স করার পরামর্শ দিচ্ছি।"
                            </p>
                            <div className="flex gap-4">
                               <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex-1 text-center">
                                  <p className="text-[8px] text-muted-foreground uppercase mb-1">Efficiency Boost</p>
                                  <p className="text-sm font-bold text-emerald-500">+1.2%</p>
                               </div>
                               <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex-1 text-center">
                                  <p className="text-[8px] text-muted-foreground uppercase mb-1">Fee Savings</p>
                                  <p className="text-sm font-bold text-primary">$42.00</p>
                               </div>
                            </div>
                            <Button className="w-full bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 tracking-[0.2em]">
                               Execute AI Recommendation
                            </Button>
                         </CardContent>
                      </Card>

                      {/* Transaction Feed */}
                      <section className="space-y-4">
                         <div className="flex justify-between items-center px-1">
                            <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                               <History className="size-4" /> Global Pulse Ledger
                            </h3>
                            <Button variant="ghost" size="sm" className="text-[9px] uppercase font-bold text-muted-foreground hover:text-white">View Full History</Button>
                         </div>
                         <Card className="glass-card overflow-hidden">
                            <div className="divide-y divide-white/5">
                               {recentTransactions.map((tx, i) => (
                                 <div key={i} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors group">
                                    <div className="flex items-center gap-4">
                                       <div className={`size-10 rounded-xl flex items-center justify-center border ${tx.type === 'IN' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                          {tx.type === 'IN' ? <ArrowDownLeft className="size-5" /> : <ArrowUpRight className="size-5" />}
                                       </div>
                                       <div>
                                          <p className="text-xs font-bold text-white uppercase">{tx.entity}</p>
                                          <p className="text-[8px] text-muted-foreground font-mono">{tx.id} • {tx.time}</p>
                                       </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                       <p className={`text-sm font-headline font-bold ${tx.type === 'IN' ? 'text-emerald-500' : 'text-white'}`}>{tx.amount}</p>
                                       <Badge variant="outline" className="text-[7px] h-4 border-white/10 uppercase opacity-60 group-hover:opacity-100 transition-opacity">{tx.status}</Badge>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </Card>
                      </section>
                   </div>

                   <div className="space-y-8">
                      {/* Node Connectivity Map Widget */}
                      <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                         <CardHeader>
                            <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                               <Globe className="size-4" /> Connectivity Pulse
                            </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            {[
                              { name: "bKash Core", status: "SYNCED", latency: "115ms" },
                              { name: "SWIFT Bridge", status: "ACTIVE", latency: "210ms" },
                              { name: "Stripe Relay", status: "STABLE", latency: "94ms" },
                              { name: "PayPal Vault", status: "SYNCED", latency: "142ms" }
                            ].map((node, i) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-black/40 rounded border border-white/5">
                                 <div className="flex items-center gap-2">
                                    <div className="size-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] text-white font-bold uppercase">{node.name}</span>
                                 </div>
                                 <span className="text-[9px] font-mono text-muted-foreground">{node.latency}</span>
                              </div>
                            ))}
                         </CardContent>
                      </Card>

                      {/* Escrow Lock Visual */}
                      <Card className="glass-card border-l-4 border-l-amber-500">
                         <CardHeader>
                            <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                               <Lock className="size-4" /> Sovereign Escrow
                            </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="text-center py-4">
                               <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Locked Liquidity</p>
                               <p className="text-3xl font-headline font-bold text-white">$12,450.00</p>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-amber-500" style={{ width: '45%' }} />
                            </div>
                            <p className="text-[9px] text-muted-foreground italic text-center">"45% of daily volume currently in L4 Lock."</p>
                         </CardContent>
                      </Card>

                      {/* Rapid Actions */}
                      <div className="grid grid-cols-2 gap-4">
                         <Button variant="outline" className="h-20 border-white/10 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary/30 group">
                            <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Settle Out</span>
                         </Button>
                         <Button variant="outline" className="h-20 border-white/10 flex flex-col gap-2 hover:bg-emerald-500/10 hover:border-emerald-500/30 group">
                            <ArrowDownLeft className="size-5 text-muted-foreground group-hover:text-emerald-500" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Top Up</span>
                         </Button>
                      </div>
                   </div>
                </div>
             </TabsContent>

             <TabsContent value="portal" className="h-[800px] border border-white/5 rounded-2xl overflow-hidden bg-white">
                <div className="h-full w-full relative">
                   <div className="absolute top-4 right-4 z-50 flex gap-2">
                      <Button size="icon" variant="secondary" onClick={refreshFrame} className="bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40">
                         <RefreshCcw className="size-4" />
                      </Button>
                      <Button size="icon" variant="secondary" onClick={() => window.open('https://fintech-fusion-omega.vercel.app/', '_blank')} className="bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40">
                         <ExternalLink className="size-4" />
                      </Button>
                   </div>
                   <iframe 
                      id="fusion-iframe"
                      src="https://fintech-fusion-omega.vercel.app/" 
                      className="w-full h-full border-0"
                      title="Fintech Fusion Omega Integration"
                      allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals allow-downloads allow-presentation allow-orientation-lock"
                      allowFullScreen
                   />
                </div>
             </TabsContent>
          </Tabs>

          <footer className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity">
             <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
               NoorNexus OS Fusion Cockpit | ISO 20022 Certified Architecture
             </p>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[8px] font-bold uppercase tracking-widest">L4 Engine Stable</span>
                </div>
                <div className="flex items-center gap-2">
                   <ShieldCheck className="size-3 text-primary" />
                   <span className="text-[8px] font-bold uppercase tracking-widest">Quantum Vault Armed</span>
                </div>
             </div>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
