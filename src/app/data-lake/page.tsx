"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Database, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  Cpu, 
  Activity, 
  RefreshCcw, 
  Lock, 
  Infinity, 
  Search,
  ArrowRightLeft,
  Atom,
  Flame,
  PieChart,
  History,
  FileSearch,
  CheckCircle2,
  HardDrive
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ingestToDataLake, DataLakeIngestOutput } from "@/ai/flows/data-lake-ingest-flow"

export default function SovereignDataLakePage() {
  const { toast } = useToast()
  const [ingesting, setIngesting] = useState(false)
  const [result, setResult] = useState<DataLakeIngestOutput | null>(null)
  
  const [metrics, setLiveMetrics] = useState({
    storageUsed: 42.8,
    entriesPerSec: 1240,
    encryptionHealth: 100,
    activeIngestNodes: 30
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        entriesPerSec: 1200 + Math.floor(Math.random() * 100),
        storageUsed: prev.storageUsed + 0.001
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  async function handleIngest() {
    setIngesting(true)
    try {
      const res = await ingestToDataLake({
        nodeRange: "1-100",
        encryptionStandard: "QUANTUM_ENCRYPTED",
        targetModule: "FINTECH"
      })
      setResult(res)
      toast({ 
        title: "Intel Sync Established", 
        description: "Project #300: Encrypted log block anchored to Data Lake." 
      })
    } catch (e: any) {
      toast({ title: "Ingest Failure", variant: "destructive" })
    } finally {
      setIngesting(false)
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
                   <Infinity className="size-3 mr-2" /> Project #300: Sovereign Data Lake
                 </Badge>
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <Atom className="size-3 mr-2" /> Phase 7: Economic Intelligence
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Intel <span className="text-emerald-500">Lake.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Memory of the 100-Node Empire." নূরনেক্সাস এখন ১০০টি নোড থেকে আসা প্রতিটি ট্রানজ্যাকশন ডাটাকে একটি স্বায়ত্তশাসিত ডেটা লেকে এনক্রিপ্ট করছে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Lake Integrity</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase">SECURE_MAX</p>
               </div>
               <Button 
                onClick={handleIngest} 
                disabled={ingesting}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {ingesting ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                 Synchronize Intel
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Real-time Ingest Monitoring */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: "Storage Capacity", val: `${metrics.storageUsed.toFixed(2)} PB`, icon: HardDrive, color: "text-primary" },
                   { label: "Ingest Velocity", val: `${metrics.entriesPerSec}/s`, icon: Activity, color: "text-emerald-500" },
                   { label: "Encryption Health", val: `${metrics.encryptionHealth}%`, icon: ShieldCheck, color: "text-amber-500" }
                 ].map((m, i) => (
                   <Card key={i} className="glass-card bg-black/40 border-white/5">
                      <CardContent className="p-6 flex items-center justify-between">
                         <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{m.label}</p>
                            <p className="text-xl font-headline font-bold text-white">{m.val}</p>
                         </div>
                         <m.icon className={`size-8 ${m.color} opacity-20`} />
                      </CardContent>
                   </Card>
                 ))}
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Ingest Terminal */}
                 <Card className="glass-card border-l-4 border-l-primary">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                          <Database className="size-4 text-primary" /> Lake Ingest Terminal
                       </CardTitle>
                       <CardDescription>Targeting node range 1-100 for FinTech data synchronization.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="p-4 bg-black rounded-xl border border-white/5 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                             <span className="text-muted-foreground">Active Ingest Nodes</span>
                             <span className="text-emerald-500">{metrics.activeIngestNodes} / 100</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 animate-pulse" style={{ width: `${metrics.activeIngestNodes}%` }} />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-1">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Standard</p>
                             <p className="text-xs text-white font-mono">QUANTUM_AES_512</p>
                          </div>
                          <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-1 text-right">
                             <p className="text-[8px] text-muted-foreground uppercase font-bold">Latency</p>
                             <p className="text-xs text-white font-mono">12ms (Intel Loop)</p>
                          </div>
                       </div>
                       <Button onClick={handleIngest} disabled={ingesting} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary">
                          {ingesting ? <Loader2 className="size-5 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                          Execute Deep Ingest
                       </Button>
                    </CardContent>
                 </Card>

                 {/* Nora-30 Intel Summary */}
                 <Card className={`glass-card transition-all duration-500 border-t-4 ${result ? 'border-t-emerald-500' : 'border-t-primary'}`}>
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                          <Cpu className="size-4" /> Intel Architect (Nora-30)
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {result ? (
                         <div className="space-y-6 animate-in fade-in zoom-in-95">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-3">
                               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Lake Status</span>
                                  <Badge className="bg-emerald-500">{result.ingestStatus}</Badge>
                               </div>
                               <p className="text-xs text-white leading-relaxed italic">"{result.intelSummary}"</p>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] font-bold text-muted-foreground uppercase">Ingest Hash (HMAC_V4_300)</p>
                               <code className="text-[9px] font-mono text-primary block bg-black/40 p-2 rounded break-all">{result.ingestHash}</code>
                            </div>
                         </div>
                       ) : (
                         <div className="h-[250px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                            <PieChart className="size-16 text-primary animate-pulse" />
                            <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">
                               Await Intel Dispatch.<br/>Project #300 active.
                            </p>
                         </div>
                       )}
                    </CardContent>
                 </Card>
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <FileSearch className="size-4" /> Intelligence Foundation
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "The Data Lake provides the raw evidentiary baseline for our Global Economic Intelligence Reports. Every log is encrypted and isolated."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">SOVEREIGN_DATA_ISOLATION: MAX</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <History className="size-4" /> Ingest History
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { task: "FinTech Module Ingest", nodes: "1-100", time: "2m ago" },
                       { task: "Logistics Heartbeat", nodes: "1-20", time: "1h ago" },
                       { task: "Governance Audit Sync", nodes: "42", time: "5h ago" }
                     ].map((log, i) => (
                       <div key={i} className="p-2.5 bg-white/5 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-bold text-white uppercase">{log.task}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">Nodes: {log.nodes} | {log.time}</p>
                          </div>
                          <CheckCircle2 className="size-3 text-emerald-500 opacity-50" />
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                        <Flame className="size-3" /> Zero-Loss Guarantee
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Redundant mirroring active across 3 cold-storage nodes. Intel recovery verified at 100%.
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
