
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  BarChart3, 
  ArrowUpRight, 
  Menu,
  PieChart,
  Activity,
  History,
  Target,
  Waves,
  Coins,
  Building2,
  Lock,
  Loader2,
  FileText,
  Sparkles,
  ArrowRight,
  Settings,
  RefreshCcw,
  ShieldPlus,
  ArrowRightLeft,
  SlidersHorizontal,
  LayoutGrid
} from "lucide-react"
import { generateEconomicReport, EconomicIntelligenceOutput } from "@/ai/flows/economic-intelligence-flow"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

const REVENUE_STREAMS = [
  { 
    id: "fintech_levy", 
    name: "Transaction Levies", 
    source: "Cross-border P2C & Remittance", 
    rate: "0.05% per pulse", 
    growth: "+14.2%", 
    icon: Coins, 
    color: "text-emerald-500",
    description: "Income generated from 74+ banking canals and 100 node mesh.",
    paramLabel: "Levy Percentage",
    currentVal: 0.05
  },
  { 
    id: "ai_licensing", 
    name: "AI-as-a-Service", 
    source: "Nora Suite Enterprise API", 
    rate: "Fixed Monthly Tier", 
    growth: "+22.5%", 
    icon: Cpu, 
    color: "text-purple-500",
    description: "Subscription fees for Nora-40 intelligence and Nora-52 audit logs.",
    paramLabel: "Enterprise Tier Price (USD)",
    currentVal: 2500
  },
  { 
    id: "gateway_paas", 
    name: "PaaS Licensing", 
    source: "White-label Sovereign Gateway", 
    rate: "Partner License Fee", 
    growth: "+8.9%", 
    icon: Zap, 
    color: "text-primary",
    description: "Enterprise partners paying for dedicated gateway access (Project #51).",
    paramLabel: "Monthly License Fee",
    currentVal: 5000
  },
  { 
    id: "industrial_markup", 
    name: "Industrial Hub Fees", 
    source: "Hardware Asset Settlement", 
    rate: "3.5% Markup", 
    growth: "+5.1%", 
    icon: Building2, 
    color: "text-amber-500",
    description: "Procurement revenue from high-pressure coupling and node hardware.",
    paramLabel: "Asset Markup %",
    currentVal: 3.5
  }
]

export default function RevenueMatrixPage() {
  const { toast } = useToast()
  const [analyzing, setAnalyzing] = useState(false)
  const [intel, setIntel] = useState<EconomicIntelligenceOutput | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<any>(null)
  const [manageDialogOpen, setManageDialogOpen] = useState(false)
  const [savingParam, setSavingParam] = useState(false)
  
  const [totals, setTotals] = useState({
    totalRevenue: 12560000,
    dailyProfit: 42500,
    partnerCount: 142,
    yieldRate: 98.4
  })

  async function handleFinancialAudit() {
    setAnalyzing(true)
    try {
      const result = await generateEconomicReport({
        timeframe: "Real-time Pulse",
        nodeRegion: "Global 100-Node Grid",
        totalVolume: totals.totalRevenue,
        marketSentiment: "High torque observed in SE Asia and Europe corridors."
      })
      setIntel(result)
      toast({ 
        title: "Financial Intelligence Dispatched", 
        description: "Nora-40 has calculated the next 24h revenue trajectory." 
      })
    } catch (e: any) {
      toast({ title: "Analysis Failed", variant: "destructive" })
    } finally {
      setAnalyzing(false)
    }
  }

  const handleManageChannel = (channel: any) => {
    setSelectedChannel(channel)
    setManageDialogOpen(true)
  }

  const handleSaveParameters = () => {
    setSavingParam(true)
    setTimeout(() => {
      setSavingParam(false)
      setManageDialogOpen(false)
      toast({
        title: "Economic Parameters Updated",
        description: `${selectedChannel.name} parameters anchored to Sovereign Vault.`,
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 1500)
  }

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
                   <DollarSign className="size-3 mr-2" /> Project #450: Revenue Matrix
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-emerald-500">Economy.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Turning Intelligence into Value." নূরনেক্সাস সাম্রাজ্যের প্রতিটি কাজ এখন একটি আয়ের উৎসে রূপান্তরিত।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Network Value</p>
                  <p className="text-3xl font-headline font-bold text-white">${(totals.totalRevenue / 1000000).toFixed(1)}M</p>
               </div>
               <Button 
                onClick={handleFinancialAudit} 
                disabled={analyzing}
                className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary"
               >
                 {analyzing ? <Loader2 className="size-4 animate-spin" /> : <BarChart3 className="size-4" />}
                 Run Nora-40 Yield Audit
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
               
               <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: "Daily Yield", val: `$${totals.dailyProfit.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Partner Intake", val: totals.partnerCount, icon: Globe, color: "text-primary" },
                    { label: "Mesh ROI", val: `${totals.yieldRate}%`, icon: Zap, color: "text-amber-500" },
                    { label: "Vault Reserves", val: "$4.2M", icon: Lock, color: "text-purple-500" }
                  ].map((stat, i) => (
                    <Card key={i} className="glass-card bg-black/40 border-white/5">
                      <CardContent className="p-6 space-y-1">
                         <p className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                         <div className="flex items-center justify-between">
                            <p className="text-xl font-headline font-bold text-white">{stat.val}</p>
                            <stat.icon className={`size-4 ${stat.color} opacity-40`} />
                         </div>
                      </CardContent>
                    </Card>
                  ))}
               </section>

               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <PieChart className="size-4" /> Active Revenue Channels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {REVENUE_STREAMS.map((stream) => (
                       <Card key={stream.id} className="glass-card border-white/5 hover:border-primary/20 transition-all group overflow-hidden">
                          <CardContent className="p-6">
                             <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 transition-colors`}>
                                   <stream.icon className={`size-6 ${stream.color}`} />
                                </div>
                                <div className="text-right">
                                   <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] h-5 mb-1">{stream.growth}</Badge>
                                   <p className="text-[10px] text-muted-foreground font-mono uppercase">{stream.rate}</p>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <h4 className="text-lg font-headline font-bold text-white uppercase">{stream.name}</h4>
                                <p className="text-xs text-primary font-mono font-bold">{stream.source}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed italic">"{stream.description}"</p>
                             </div>
                             <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Channel Status: OPTIMAL</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-[9px] uppercase font-bold text-primary gap-2 h-7 hover:bg-primary/10"
                                  onClick={() => handleManageChannel(stream)}
                                >
                                   Manage Channel <ArrowUpRight className="size-3" />
                                </Button>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>

               {intel && (
                 <section className="animate-in fade-in zoom-in-95 duration-700">
                    <Card className="glass-card border-t-4 border-t-emerald-500 bg-emerald-500/5">
                       <CardHeader>
                          <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                             <Sparkles className="size-4" /> Nora-40 Economic Intelligence
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="p-6 space-y-6">
                          <div className="p-5 bg-black/60 rounded-xl border border-white/5">
                             <h5 className="text-[10px] font-bold text-primary uppercase mb-3">Executive Yield Summary</h5>
                             <p className="text-lg font-headline text-white italic leading-relaxed">"{intel.executiveSummary}"</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth Sectors</h5>
                                <div className="space-y-3">
                                   {intel.riskForecasting.map((item, i) => (
                                     <div key={i} className="p-3 bg-white/5 rounded border border-white/5 flex justify-between items-center">
                                        <span className="text-xs font-bold text-white uppercase">{item.sector}</span>
                                        <Badge variant="outline" className="text-[8px] border-emerald-500/30 text-emerald-500">Yield Potential: {(100 - item.riskScore)}%</Badge>
                                     </div>
                                   ))}
                                </div>
                             </div>
                             <div className="space-y-4">
                                <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Strategic Directive</h5>
                                <p className="text-sm text-white leading-relaxed border-l-2 border-emerald-500/30 pl-4">
                                   {intel.strategicOutlook}
                                </p>
                                <div className="pt-2">
                                   <p className="text-[8px] font-mono text-muted-foreground uppercase">Intel Seal: {intel.intelHash}</p>
                                </div>
                             </div>
                          </div>
                       </CardContent>
                    </Card>
                 </section>
               )}
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Target className="size-4" /> Monetization Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Every work unit in NoorNexus is a point of value. By automating compliance and speed, we create arbitrage that generates natural revenue."
                   </p>
                   <div className="pt-4 border-t border-white/5 space-y-3">
                      {[
                        { label: "PaaS Adoption", val: "High" },
                        { label: "SDK Monetization", val: "Active" },
                        { label: "Global Reach", val: "100 Nodes" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                           <span className="uppercase text-muted-foreground">{item.label}</span>
                           <span className="text-emerald-500 font-bold">{item.val}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                 <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                       <History className="size-4" /> Treasury Sync
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                       <p className="text-[8px] text-muted-foreground uppercase font-bold">Reserves status</p>
                       <p className="text-xl font-headline font-bold text-white uppercase">HEALTHY</p>
                    </div>
                    <Button variant="outline" className="w-full text-[9px] uppercase font-bold border-amber-500/20 text-amber-500 h-9">
                       Open Treasury Ledger <ArrowRight className="size-3 ml-2" />
                    </Button>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                       <ShieldCheck className="size-3" /> Integrity Check
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "All revenue flows are monitored by Nora-01 for zero-leakage performance. Verified by One Engine Ledger."
                    </p>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Management Dialog */}
      {selectedChannel && (
        <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
          <DialogContent className="glass-card border-primary/20 bg-black/95 text-white sm:max-w-[500px]">
             <DialogHeader>
                <div className={`size-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4`}>
                   <selectedChannel.icon className={`size-6 ${selectedChannel.color}`} />
                </div>
                <DialogTitle className="text-xl font-headline font-bold uppercase tracking-tight text-white flex items-center gap-3">
                   Manage: {selectedChannel.name}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-xs uppercase tracking-widest font-mono">
                   Economic Parameter Optimization Hub.
                </DialogDescription>
             </DialogHeader>
             
             <div className="grid gap-6 py-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold uppercase text-primary">Channel Status</Label>
                      <Badge className="bg-emerald-500 text-black border-none text-[8px] font-bold">ACTIVE_YIELD</Badge>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <p className="text-[10px] text-white font-bold uppercase">Maintenance Mode</p>
                         <p className="text-[8px] text-muted-foreground">Suspend yield for protocol upgrades.</p>
                      </div>
                      <Switch />
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <Label className="text-xs font-bold uppercase text-primary">{selectedChannel.paramLabel}</Label>
                      <span className="text-lg font-headline font-bold text-white">
                        {selectedChannel.id.includes('markup') || selectedChannel.id.includes('levy') ? `${selectedChannel.currentVal}%` : `$${selectedChannel.currentVal}`}
                      </span>
                   </div>
                   <Slider defaultValue={[selectedChannel.currentVal]} max={selectedChannel.id.includes('tier') ? 10000 : 10} step={0.1} />
                   <div className="flex justify-between text-[8px] text-muted-foreground font-mono uppercase">
                      <span>Min Safe</span>
                      <span>Max Optimization</span>
                   </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
                   <h5 className="text-[10px] font-bold text-primary uppercase flex items-center gap-2">
                      <TrendingUp className="size-3" /> Predictive Yield Impact
                   </h5>
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Adjusting this parameter may result in a <span className="text-emerald-500 font-bold">+2.4% yield increase</span> while maintaining partner retention."
                   </p>
                </div>
             </div>

             <DialogFooter className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1 border-white/10 uppercase font-bold text-[10px] h-11" onClick={() => setManageDialogOpen(false)}>
                   Cancel Audit
                </Button>
                <Button className="flex-1 bg-primary text-primary-foreground font-bold uppercase h-11 glow-primary" onClick={handleSaveParameters} disabled={savingParam}>
                   {savingParam ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4 mr-2" />}
                   Anchor Parameters
                </Button>
             </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
