"use client"

import { useState, useEffect, useRef } from "react"
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
  ArrowLeft, 
  Activity,
  Layers,
  TrendingUp,
  Cpu,
  Loader2,
  RefreshCcw,
  Route,
  Infinity,
  Sparkles,
  CreditCard,
  Database,
  Repeat,
  FileCheck,
  Code2,
  AlertTriangle,
  Network,
  ArrowRight,
  LayoutGrid,
  Monitor,
  Building2,
  CheckCircle2,
  FlaskConical,
  ShieldPlus,
  ArrowRightLeft,
  Key,
  UserPlus
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

const PROVIDER_METRICS = [
  { id: "yapily", name: "Yapily (EU/UK)", latency: 32, success: 99.8, status: "OPTIMAL", icon: Globe },
  { id: "plaid", name: "Plaid (US/Global)", latency: 45, success: 99.4, status: "STABLE", icon: Network },
]

const SIBS_INSTITUTIONS = [
  { name: "Caixa Geral de Depósitos", type: "Direct" },
  { name: "Millennium BCP", type: "Direct" },
  { name: "Banco Santander Totta", type: "Direct" },
  { name: "Novo Banco", type: "Direct" }
]

const VALIDATED_NODES = [
  {
    name: "Payoneer - EU - LIVE",
    fullName: "Payoneer - EU",
    id: "payoneer",
    bic: "PAYNUS33XXX",
    country: "AT, BE, FR, DE, ES, SE (24 Countries)",
    type: "AIS",
    features: ["Account", "Accounts", "Balances", "Transactions"],
    status: "LIVE_ENVIRONMENT",
    crossBorderVeracity: "100.0%"
  },
  {
    name: "PayPal EU - LIVE",
    fullName: "PayPal Europe",
    id: "paypal_eu",
    bic: "PAYPALEXXX",
    country: "EU Corridor",
    type: "AIS",
    features: ["Account", "Accounts", "Identity", "Transactions"],
    status: "LIVE_ENVIRONMENT",
    crossBorderVeracity: "100.0%"
  },
  {
    name: "Amex Sandbox - SANDBOX",
    fullName: "American Express Sandbox",
    id: "amex-ob-sandbox",
    bic: "AETCUS55XXX",
    country: "UK / France / Norway",
    type: "AIS",
    features: ["Accounts", "Balances", "Statements", "Transactions"],
    status: "SANDBOX_ENVIRONMENT",
    crossBorderVeracity: "100.0%"
  },
  {
    name: "AIB Ireland Personal - LIVE",
    fullName: "Allied Irish Bank Ireland Personal",
    id: "aib",
    bic: "AIBKIE2DXXX",
    country: "Ireland",
    type: "AIS_PIS",
    features: ["Bulk Payment", "Domestic Single", "Future Payment", "International Single", "Periodic Payments", "Direct Debit", "Scheduled Payments"],
    status: "LIVE_ENVIRONMENT",
    crossBorderVeracity: "100.0%"
  }
]

export default function OpenBankingHubPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [loadingView, setLoadingView] = useState(false)
  const [orchestrating, setOrchestrating] = useState(false)
  const [activeProvider, setActiveProvider] = useState("yapily")

  const handleOrchestration = () => {
    setOrchestrating(true)
    setTimeout(() => {
      setOrchestrating(false)
      const best = PROVIDER_METRICS.sort((a, b) => a.latency - b.latency)[0]
      setActiveProvider(best.id)
      toast({ 
        title: "Intelligent Reroute", 
        description: `Neural Orchestrator selected ${best.name} for optimal performance.`,
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 1500)
  }

  const openInApp = (url: string) => {
    router.push(`/browser?url=${encodeURIComponent(url)}`)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        {activeUrl ? (
          <main className="flex flex-col h-screen w-full overflow-hidden p-0 m-0 animate-in fade-in zoom-in-95 duration-300">
             <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-50">
                <div className="flex items-center gap-4">
                   <Button variant="ghost" size="icon" onClick={() => setActiveUrl(null)} className="text-primary">
                      <ArrowLeft className="size-5" />
                   </Button>
                   <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                        Sovereign Canal Active
                        <Badge variant="outline" className="text-[7px] border-emerald-500/50 text-emerald-500">REALITY_SYNC_ON</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">{activeUrl}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm" className="border-white/10 text-[10px] font-bold uppercase" onClick={() => window.open(activeUrl, '_blank')}>
                      <ExternalLink className="size-3 mr-2" /> Open External
                   </Button>
                </div>
             </header>
             <div className="flex-1 bg-white relative">
                {loadingView && (
                  <div className="absolute inset-0 z-10 bg-background flex flex-col items-center justify-center gap-6">
                     <Loader2 className="size-12 text-primary animate-spin" />
                     <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary animate-pulse">LEGACY_CORE_SYNC...</p>
                  </div>
                )}
                <iframe src={activeUrl} className="w-full h-full border-0" sandbox="allow-same-origin allow-scripts allow-popovers allow-forms" allow="camera; microphone; clipboard-write; encrypted-media" title="Banking Node View" />
             </div>
          </main>
        ) : (
          <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <SidebarTrigger className="md:hidden text-primary">
                      <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                   </SidebarTrigger>
                   <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                     <Infinity className="size-3 mr-2" /> Neural Provider Orchestration
                   </Badge>
                </div>
                <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                  Banking <span className="text-primary">Infrastructure.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                  Mission 400: Universal Banking Connect. Optimized by **Nora-50 Intelligent Orchestrator**.
                </p>
              </div>
              <div className="flex gap-4">
                 <Link href="/sovereign-gateway">
                   <Button className="bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary">
                     <Zap className="size-4" /> Project #51 Blueprint
                   </Button>
                 </Link>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-10">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {/* Yapily Console Access */}
                   <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/10 relative overflow-hidden group hover:border-amber-500/40 transition-all cursor-pointer" onClick={() => openInApp("https://console.yapily.com/")}>
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                         <Key className="size-32 text-amber-500" />
                      </div>
                      <CardHeader className="pb-2">
                         <Badge className="bg-amber-500 text-black border-none text-[8px] h-4 mb-2 uppercase font-bold">Infrastructure Console</Badge>
                         <CardTitle className="text-xl font-headline font-bold text-white uppercase tracking-tight">Yapily Console</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                            Manage 74+ banking canals from the core mMainframe terminal.
                         </p>
                      </CardContent>
                   </Card>

                   {/* RedotPay Business Access */}
                   <Card className="glass-card border-l-4 border-l-primary bg-primary/10 relative overflow-hidden group hover:border-primary/40 transition-all cursor-pointer" onClick={() => openInApp("https://business.redotpay.com/biz/home/")}>
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                         <CreditCard className="size-32 text-primary" />
                      </div>
                      <CardHeader className="pb-2">
                         <Badge className="bg-primary text-primary-foreground border-none text-[8px] h-4 mb-2 uppercase font-bold">Settlement Hub</Badge>
                         <CardTitle className="text-xl font-headline font-bold text-white uppercase tracking-tight">RedotPay Biz</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                            Sovereign card distribution and crypto-to-fiat conversion node.
                         </p>
                      </CardContent>
                   </Card>

                   {/* SSLCommerz Onboarding */}
                   <Card className="glass-card border-l-4 border-l-red-500 bg-red-500/10 relative overflow-hidden group hover:border-red-500/40 transition-all cursor-pointer" onClick={() => openInApp("https://join.sslcommerz.com/upload-information")}>
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                         <UserPlus className="size-32 text-red-500" />
                      </div>
                      <CardHeader className="pb-2">
                         <Badge className="bg-red-500 text-white border-none text-[8px] h-4 mb-2 uppercase font-bold">Acquiring Node</Badge>
                         <CardTitle className="text-xl font-headline font-bold text-white uppercase tracking-tight">SSLCommerz Join</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                            Direct merchant onboarding and information upload portal.
                         </p>
                      </CardContent>
                   </Card>
                </div>

                {/* Validated Banking Nodes focus */}
                <section className="space-y-6">
                   <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                      <FlaskConical className="size-4" /> Validated Banking Nodes
                   </h3>
                   <div className="grid grid-cols-1 gap-4">
                      {VALIDATED_NODES.map((node, i) => (
                        <Card key={i} className={`glass-card border-l-4 ${node.status === 'LIVE_ENVIRONMENT' ? 'border-l-primary bg-primary/5' : 'border-l-amber-500 bg-amber-500/5'} hover:border-white/20 transition-all`}>
                           <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row justify-between gap-6">
                                 <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-3">
                                       <div className={`size-10 rounded-lg flex items-center justify-center border ${node.status === 'LIVE_ENVIRONMENT' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                                          <Building2 className="size-5" />
                                       </div>
                                       <div>
                                          <p className="text-sm font-headline font-bold text-white uppercase">{node.name}</p>
                                          <p className="text-[10px] text-muted-foreground font-mono uppercase">{node.id}</p>
                                       </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                       <div className="space-y-0.5">
                                          <p className="text-[8px] text-muted-foreground uppercase font-bold">BIC Code</p>
                                          <p className="text-[10px] text-white font-mono">{node.bic}</p>
                                       </div>
                                       <div className="space-y-0.5">
                                          <p className="text-[8px] text-muted-foreground uppercase font-bold">Veracity Index</p>
                                          <p className="text-[10px] text-emerald-500 font-bold font-mono">{node.crossBorderVeracity}</p>
                                       </div>
                                       <div className="space-y-0.5">
                                          <p className="text-[8px] text-muted-foreground uppercase font-bold">Capability</p>
                                          <Badge variant="outline" className={`text-[7px] ${node.status === 'LIVE_ENVIRONMENT' ? 'border-primary/20 text-primary' : 'border-amber-500/20 text-amber-500'}`}>{node.type}</Badge>
                                       </div>
                                       <div className="space-y-0.5">
                                          <p className="text-[8px] text-muted-foreground uppercase font-bold">Status</p>
                                          <Badge className={`${node.status === 'LIVE_ENVIRONMENT' ? 'bg-primary' : 'bg-amber-500'} text-[8px]`}>{node.status}</Badge>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="space-y-2 min-w-[200px]">
                                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Supported Features</p>
                                    <div className="flex flex-wrap gap-1">
                                       {node.features.map((f, j) => (
                                         <Badge key={j} variant="secondary" className="text-[7px] bg-white/5 text-muted-foreground">{f}</Badge>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                      ))}
                   </div>
                </section>

                {/* Neural Orchestrator Panel */}
                <section className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                         <Cpu className="size-4" /> Intelligent Orchestrator (Nora-50)
                      </h3>
                      <Button onClick={handleOrchestration} disabled={orchestrating} size="sm" className="h-8 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20">
                         {orchestrating ? <Loader2 className="size-3 animate-spin mr-2" /> : <RefreshCcw className="size-3 mr-2" />}
                         Sync Provider Health
                      </Button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PROVIDER_METRICS.map((m) => (
                        <Card key={m.id} className={`glass-card border-l-4 transition-all ${activeProvider === m.id ? 'border-l-emerald-500 bg-emerald-500/5' : 'border-l-primary opacity-60'}`}>
                           <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${activeProvider === m.id ? 'bg-emerald-500/20 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                                       <m.icon className="size-6" />
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-headline font-bold text-white uppercase">{m.name}</p>
                                       <div className="flex gap-4 text-[9px] font-mono text-muted-foreground uppercase">
                                          <span>Latency: <span className="text-white">{m.latency}ms</span></span>
                                          <span>Uptime: <span className="text-white">{m.success}%</span></span>
                                       </div>
                                    </div>
                                 </div>
                                 {activeProvider === m.id && (
                                   <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] animate-pulse">ACTIVE_ROUTE</Badge>
                                 )}
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
                      <TrendingUp className="size-4" /> Canal Health Pulse
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                       {[
                         { label: "Neural Sync", val: "ACTIVE", color: "text-emerald-500" },
                         { label: "Orchestration Efficiency", val: "99.2%", color: "text-primary" },
                         { label: "Cross-Border Veracity", val: "99.9%", color: "text-emerald-400" }
                       ].map((s, i) => (
                         <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">{s.label}</span>
                            <span className={`text-sm font-headline font-bold ${s.color}`}>{s.val}</span>
                         </div>
                       ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                         <ShieldCheck className="size-3" /> Project #52 Ready
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <p className="text-[9px] text-muted-foreground leading-relaxed">
                         "Neural Audit Sentinel is active. Continuous monitoring for PSD2/GDPR drift."
                      </p>
                      <Link href="/neural-audit" className="w-full">
                        <Button variant="outline" className="w-full h-8 text-[9px] uppercase font-bold border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10">
                           Open Neural Audit <ArrowRight className="size-3 ml-2" />
                        </Button>
                      </Link>
                   </CardContent>
                </Card>

                <Card className="glass-card border-white/5">
                   <CardHeader>
                      <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                         <Activity className="size-4" /> Real-time Metrics
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <p className="text-[10px] text-muted-foreground italic">
                         "Orchestrator monitoring 74+ banking canals. Automated switch triggered if latency {">"} 1500ms."
                      </p>
                   </CardContent>
                </Card>
              </div>
            </div>
          </main>
        )}
      </SidebarInset>
    </div>
  )
}
