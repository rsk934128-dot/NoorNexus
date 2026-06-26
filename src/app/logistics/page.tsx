
"use client"

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
  LayoutGrid
} from "lucide-react"

const TRACKING_ASSETS = [
  { id: "NODE-BD-SIR-01", type: "High-Pressure Coupling", status: "INSTALLED", location: "Sirajganj Node 01", health: "100%", lastSync: "10m ago" },
  { id: "NODE-AE-DXB-04", type: "High-Pressure Coupling", status: "IN_TRANSIT", location: "Enroute to Dubai Hub", health: "N/A", lastSync: "2h ago" },
  { id: "NODE-UK-LON-12", type: "High-Pressure Coupling", status: "MAINTENANCE", location: "London Bridge Node", health: "82%", lastSync: "1d ago" }
]

export default function LogisticsPage() {
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
                   <Truck className="size-3 mr-2" /> Project #46: Asset Intelligence
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Logistics <span className="text-emerald-500">Tracking.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 400: Physical Asset Lifecycle Monitoring. Tracking every coupling and node component in real-time.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Global Tracking Sync</p>
                  <p className="text-3xl font-headline font-bold text-emerald-500">99.9%</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Active Asset Ledger */}
              <section className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                       <Package className="size-4" /> Global Asset Ledger
                    </h3>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                       <input className="bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-[10px] w-48 outline-none focus:ring-1 focus:ring-primary" placeholder="Search Part ID..." />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-4">
                    {TRACKING_ASSETS.map((asset, i) => (
                      <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all group overflow-hidden">
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
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Integrity</p>
                                    <p className={`text-lg font-headline font-bold ${asset.health === '100%' ? 'text-emerald-500' : 'text-amber-500'}`}>{asset.health}</p>
                                 </div>
                                 <div className="text-center space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Status</p>
                                    <Badge className={`${asset.status === 'INSTALLED' ? 'bg-emerald-500' : asset.status === 'IN_TRANSIT' ? 'bg-primary' : 'bg-amber-500'} text-[8px]`}>
                                       {asset.status}
                                    </Badge>
                                 </div>
                                 <div className="text-right space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Last Sync</p>
                                    <p className="text-[10px] text-white font-mono">{asset.lastSync}</p>
                                 </div>
                                 <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-primary">
                                    <ArrowRight className="size-4" />
                                 </Button>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <Activity className="size-4" /> Logistics Flow Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: "Settlement Sync", val: "100%", icon: ShieldCheck },
                        { label: "Dispatch Speed", val: "Fast", icon: Zap },
                        { label: "Route Integrity", val: "L4", icon: Globe }
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
                       <AlertTriangle className="size-4" /> Maintenance Watch
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-amber-500/5 rounded border border-amber-500/20">
                       <p className="text-[9px] text-amber-500 leading-relaxed italic">
                          "2 components in the London Mesh are approaching 80% duty cycle threshold. Maintenance rquisition suggested."
                       </p>
                    </div>
                    <Button className="w-full bg-amber-500 text-black font-bold h-9 uppercase text-[9px] gap-2">
                       Review Alerts <ArrowRight className="size-3" />
                    </Button>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Clock className="size-4" /> Operational History
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {[
                      { action: "Node AE-DXB-04 Dispatched", time: "2h ago" },
                      { action: "Coupling 65777API Settled", time: "5h ago" },
                      { action: "Project #46 Sync Complete", time: "1d ago" }
                    ].map((h, i) => (
                      <div key={i} className="flex justify-between items-center p-2 border-b border-white/5">
                         <span className="text-[8px] text-white uppercase">{h.action}</span>
                         <span className="text-[8px] text-muted-foreground font-mono">{h.time}</span>
                      </div>
                    ))}
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
