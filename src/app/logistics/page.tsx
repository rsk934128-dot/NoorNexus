
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  Package, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  Menu, 
  Zap, 
  Clock, 
  ArrowRight,
  Server,
  Wrench,
  AlertTriangle,
  Search,
  LayoutGrid,
  TrendingUp,
  BrainCircuit,
  Coins,
  History,
  Radio,
  Loader2,
  Lock
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { dispatchImperialAlert, AlertDispatcherOutput } from "@/ai/flows/alert-dispatcher-flow"

const TRACKING_ASSETS = [
  { id: "NODE-BD-SIR-01", type: "High-Pressure Coupling", status: "INSTALLED", location: "Sirajganj Node 01", health: "100%", lastSync: "10m ago", failProb: 2 },
  { id: "NODE-AE-DXB-04", type: "High-Pressure Coupling", status: "IN_TRANSIT", location: "Enroute to Dubai Hub", health: "N/A", lastSync: "2h ago", failProb: 0 },
  { id: "NODE-UK-LON-12", type: "High-Pressure Coupling", status: "MAINTENANCE", location: "London Bridge Node", health: "82%", lastSync: "1d ago", failProb: 45 }
]

export default function LogisticsPage() {
  const { toast } = useToast()
  const [optimizing, setOptimizing] = useState(false)
  const [dispatchingId, setDispatchingId] = useState<string | null>(null)
  const [dispatchResult, setDispatchResult] = useState<AlertDispatcherOutput | null>(null)

  const runAutoBudget = () => {
    setOptimizing(true)
    setTimeout(() => {
      setOptimizing(false)
      toast({
        title: "Resource Optimizer Dispatched",
        description: "Budget proposal of $12,400 sent to Sovereign Treasury.",
        className: "border-primary bg-primary/5"
      })
    }, 1500)
  }

  async function handleDispatchAlert(asset: any) {
    setDispatchingId(asset.id)
    try {
      const result = await dispatchImperialAlert({
        nodeId: asset.id,
        partId: asset.type,
        failureProbability: asset.failProb,
        location: asset.location,
        priority: asset.failProb > 30 ? 'HIGH' : 'MEDIUM'
      })
      setDispatchResult(result)
      toast({ title: "Imperial Alert Dispatched", description: "Maintenance unit notified." })
    } catch (e: any) {
      toast({ title: "Dispatch Failed", description: e.message, variant: "destructive" })
    } finally {
      setDispatchingId(null)
    }
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
                   <BrainCircuit className="size-3 mr-2" /> Project #47: Predictive Maintenance
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Logistics <span className="text-emerald-500">Intelligence.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 400: Autonomous Asset Lifecycle & Fail-Safe Infratructure. Predictive algorithms active for physical mesh security.
              </p>
            </div>
            <div className="flex flex-col gap-3">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Predictive Accuracy</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">96.8%</p>
               </div>
               <Button 
                onClick={runAutoBudget}
                disabled={optimizing}
                className="bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 glow-primary gap-2"
               >
                 {optimizing ? <Clock className="size-3 animate-spin" /> : <Coins className="size-3" />}
                 Run Auto-Budget Optimizer
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Asset Failure Prediction Section */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Predictive Maintenance Watch
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {TRACKING_ASSETS.map((asset, i) => (
                      <Card key={i} className={`glass-card border-white/5 hover:border-primary/20 transition-all overflow-hidden ${asset.failProb > 30 ? 'border-l-4 border-l-destructive' : 'border-l-4 border-l-emerald-500'}`}>
                        <CardContent className="p-6">
                           <div className="flex flex-col md:flex-row justify-between gap-6">
                              <div className="flex gap-4">
                                 <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 border ${asset.status === 'INSTALLED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : asset.status === 'IN_TRANSIT' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                                    {asset.status === 'INSTALLED' ? <Server className="size-6" /> : asset.status === 'IN_TRANSIT' ? <Truck className="size-6" /> : <Wrench className="size-6" />}
                                 </div>
                                 <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                       <p className="text-lg font-bold text-white uppercase">{asset.id}</p>
                                       <Badge variant="outline" className="text-[7px] border-white/10 uppercase">{asset.type}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                       <MapPin className="size-3" />
                                       <p className="text-[10px] font-mono uppercase">{asset.location}</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex gap-8 items-center justify-between md:justify-end">
                                 <div className="text-center space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Failure Prob.</p>
                                    <p className={`text-lg font-headline font-bold ${asset.failProb > 30 ? 'text-destructive' : 'text-emerald-500'}`}>{asset.failProb}%</p>
                                 </div>
                                 <div className="text-center space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Health</p>
                                    <Badge className={`${asset.status === 'INSTALLED' ? 'bg-emerald-500' : asset.status === 'IN_TRANSIT' ? 'bg-primary' : 'bg-amber-500'} text-[8px]`}>
                                       {asset.health}
                                    </Badge>
                                 </div>
                                 <Button 
                                    onClick={() => handleDispatchAlert(asset)} 
                                    disabled={dispatchingId === asset.id || asset.failProb === 0}
                                    variant="outline" 
                                    className="border-primary/20 text-primary hover:bg-primary/10 text-[10px] font-bold uppercase h-10 px-4"
                                  >
                                    {dispatchingId === asset.id ? <Loader2 className="size-3 animate-spin mr-2" /> : <Radio className="size-3 mr-2" />}
                                    Dispatch Alert
                                 </Button>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {dispatchResult && (
                 <Card className="glass-card border-emerald-500/20 bg-emerald-500/5 animate-in slide-in-from-bottom-4">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <Radio className="size-4" /> Sovereign Dispatch Confirmation (Project #48)
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                             <p className="text-[10px] font-bold text-white uppercase">Tactical Command</p>
                             <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">ID: {dispatchResult.dispatchId}</Badge>
                          </div>
                          <p className="text-xs text-emerald-100 italic leading-relaxed">"{dispatchResult.tacticalCommand}"</p>
                          <div className="grid grid-cols-2 gap-4 pt-2">
                             <div className="space-y-1">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">ETA Arrival</p>
                                <p className="text-xs text-white font-mono">{dispatchResult.estimatedArrival}</p>
                             </div>
                             <div className="space-y-1 text-right">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">Sovereign Hash</p>
                                <p className="text-[10px] text-primary font-mono truncate">{dispatchResult.securityHash}</p>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              )}
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> Resource Allocation Pulse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Optimal Budget", val: "$124,500", icon: Coins },
                        { label: "Maintenance Reserve", val: "15%", icon: ShieldCheck },
                        { label: "Optimization Score", val: "94/100", icon: Activity }
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                           <div className="flex items-center gap-2">
                              <s.icon className="size-3 text-primary" />
                              <span className="text-[10px] text-muted-foreground uppercase font-bold">{s.label}</span>
                           </div>
                           <span className="text-[10px] font-mono font-bold text-white">{s.val}</span>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                       <History className="size-4" /> Immutable Log Sync
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-amber-500/5 rounded border border-amber-500/20">
                       <p className="text-[9px] text-amber-500 leading-relaxed italic">
                          "Logistics events are currently 100% synchronized with the One Engine Ledger. Zero-drift verified for Project #47."
                       </p>
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
