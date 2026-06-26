"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Landmark, 
  Globe, 
  Zap, 
  Menu, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Building2, 
  ArrowRight, 
  PieChart, 
  Activity,
  Layers,
  LayoutGrid,
  TrendingUp,
  Cpu,
  Unplug
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const GLOBAL_LEADERS = [
  { name: "Plaid", hq: "USA", banks: "9,706", countries: "60", tag: "Global Alpha" },
  { name: "Lunch Flow", hq: "EU", banks: "2,400", countries: "60", tag: "EU Leader" },
  { name: "GoCardless", hq: "UK", banks: "2,228", countries: "54", tag: "PIS Expert" },
  { name: "YAXI", hq: "UK", banks: "1,921", countries: "40", tag: "High Coverage" },
  { name: "Volt", hq: "UK", banks: "1,668", countries: "50", tag: "Instant Payments" },
  { name: "Salt Edge", hq: "Canada", banks: "1,586", countries: "73", tag: "Compliance King" },
]

const REGIONAL_PROVIDERS = {
  usa: [
    { name: "Plaid", banks: "9,706", countries: "60" },
    { name: "Token", banks: "13", countries: "26" },
    { name: "Finicity", banks: "2", countries: "2" },
  ],
  europe: [
    { name: "Lunch Flow", banks: "2,400", countries: "60" },
    { name: "GoCardless", banks: "2,228", countries: "54" },
    { name: "Tink", banks: "511", countries: "46" },
  ],
  latam: [
    { name: "Pluggy", banks: "99", countries: "10" },
    { name: "Klavi", banks: "19", countries: "2" },
    { name: "Belvo", banks: "18", countries: "4" },
  ]
}

export default function OpenBankingHubPage() {
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
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Landmark className="size-3 mr-2" /> Global Banking Mesh
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Open Banking <span className="text-primary">Directory.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Project 170: Universal Banking Connect. Comparing 73+ licensed platforms exposing bank account data and payment APIs worldwide.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[150px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Bank APIs</p>
                  <p className="text-2xl font-headline font-bold text-primary">57,200+</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              {/* Selection Criteria */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Zap className="size-4" /> Selection Logic
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: "Bank Coverage", desc: "Quality and quantity of supported institutions.", icon: Building2 },
                      { title: "Geo Focus", desc: "Specialization in specific markets like EU or USA.", icon: Globe },
                      { title: "Regulatory", desc: "PSD2/PSD3, FDX, and CDR compliance status.", icon: ShieldCheck }
                    ].map((factor, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2 hover:border-primary/20 transition-all">
                        <CardContent className="p-6 space-y-4">
                           <div className="p-3 bg-primary/10 rounded-xl w-fit">
                              <factor.icon className="size-5 text-primary" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-xs font-headline font-bold text-white uppercase">{factor.title}</p>
                              <p className="text-[10px] text-muted-foreground leading-relaxed">{factor.desc}</p>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Providers Explorer */}
              <section className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                       <Layers className="size-4" /> Provider Mesh
                    </h3>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                       <input className="bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-[10px] w-48 outline-none focus:ring-1 focus:ring-primary" placeholder="Filter 73+ Providers..." />
                    </div>
                 </div>

                 <Tabs defaultValue="global" className="space-y-6">
                    <TabsList className="bg-white/5 border border-white/10 p-1">
                       <TabsTrigger value="global" className="text-[10px] uppercase font-bold px-6">Global Leaders</TabsTrigger>
                       <TabsTrigger value="usa" className="text-[10px] uppercase font-bold px-6">United States</TabsTrigger>
                       <TabsTrigger value="europe" className="text-[10px] uppercase font-bold px-6">Europe</TabsTrigger>
                       <TabsTrigger value="latam" className="text-[10px] uppercase font-bold px-6">Latin America</TabsTrigger>
                    </TabsList>

                    <TabsContent value="global" className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
                       {GLOBAL_LEADERS.map((p, i) => (
                         <Card key={i} className="glass-card group hover:border-primary/30 transition-all overflow-hidden">
                            <CardContent className="p-6 flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                  <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 font-headline font-bold text-primary text-xl">
                                     {p.name[0]}
                                  </div>
                                  <div className="space-y-0.5">
                                     <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-white uppercase">{p.name}</p>
                                        <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">{p.tag}</Badge>
                                     </div>
                                     <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">{p.banks} Banks • {p.countries} Countries</p>
                                  </div>
                               </div>
                               <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-primary">
                                  <ExternalLink className="size-4" />
                                </Button>
                            </CardContent>
                         </Card>
                       ))}
                    </TabsContent>

                    {/* Regional Contents */}
                    {Object.entries(REGIONAL_PROVIDERS).map(([key, list]) => (
                      <TabsContent key={key} value={key} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         {list.map((p, i) => (
                           <Card key={i} className="glass-card p-5 space-y-4">
                              <p className="text-xs font-bold text-white uppercase">{p.name}</p>
                              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                                 <div>
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Banks</p>
                                    <p className="text-sm font-headline font-bold text-primary">{p.banks}</p>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Region</p>
                                    <p className="text-sm font-headline font-bold text-white uppercase">{key}</p>
                                 </div>
                              </div>
                           </Card>
                         ))}
                      </TabsContent>
                    ))}
                 </Tabs>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> Market Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                     {[
                       { label: "Providers Tracked", val: "73" },
                       { label: "Total Bank APIs", val: "57.2k" },
                       { label: "Countries", val: "233" }
                     ].map((s, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">{s.label}</span>
                          <span className="text-sm font-headline font-bold text-primary">{s.val}</span>
                       </div>
                     ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                    "Open banking aggregators provide unified access to financial infrastructure across thousands of institutions."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                       <Cpu className="size-4" /> Nora-AI Recommendation
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-[10px] text-muted-foreground italic">
                       "For the NoorNexus European expansion, <b>Lunch Flow</b> is the prioritized integration due to its 2,400+ bank coverage and PSD2 compliant PIS support."
                    </p>
                    <Button variant="outline" className="w-full border-amber-500/20 text-amber-500 text-[10px] font-bold h-9 uppercase">
                       Draft Integration Plan
                    </Button>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Unplug className="size-4" /> Active Integrations
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-2">
                       <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                          <span className="text-[9px] text-white font-bold">Plaid</span>
                          <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">CONNECTED</Badge>
                       </div>
                       <div className="flex justify-between items-center p-2 bg-white/5 rounded opacity-50">
                          <span className="text-[9px] text-white font-bold">Lunch Flow</span>
                          <Badge variant="outline" className="text-[7px] border-white/10">PENDING</Badge>
                       </div>
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
