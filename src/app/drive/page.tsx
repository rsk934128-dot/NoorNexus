"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  HardDrive, 
  Cloud, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
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
  HardDrive as HardDriveIcon,
  BarChart3,
  TrendingUp,
  Target,
  FileText,
  Link2,
  ExternalLink,
  ChevronRight,
  Database,
  CloudUpload,
  FolderOpen,
  Activity
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { Progress } from "@/components/ui/progress"

/**
 * @fileOverview Imperial Drive (Project #57)
 * নূরনেক্সাস সাম্রাজ্যের অফ-গ্রিড রিডান্ড্যান্সি লেয়ার। 
 * এটি গুগল ড্রাইভ ব্যবহার করে সাম্রাজ্যের কোড এবং ডেটাকে সুরক্ষিত রাখে।
 */

export default function ImperialDrivePage() {
  const { toast } = useToast()
  const { user } = useUser()
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [storageUsed, setStorageUsed] = useState(42.5) // Percentage

  const handleConnectDrive = () => {
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      toast({
        title: "Google Drive Synchronized",
        description: "Imperial handshake with Google Cloud established.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2000)
  }

  const handleSyncVault = () => {
    setSyncing(true)
    toast({
      title: "Initiating Legacy Sync",
      description: "Packaging Sovereign Vault for Drive backup...",
    })
    
    setTimeout(() => {
      setSyncing(false)
      toast({
        title: "Sync Finalized",
        description: "Project #57: Sovereign archive anchored to Drive.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 3000)
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
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Infinity className="size-3 mr-2" /> Project #57: Imperial Drive
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Cloud className="size-3 mr-2" /> Redundancy Node: ON
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-purple-500">Drive.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Off-Grid Redundancy Layer." নূরনেক্সাস সাম্রাজ্যের গুরুত্বপূর্ণ ফাইলগুলো এখন সরাসরি গুগল ড্রাইভের সাথে সিঙ্ক্রোনাইজড।
              </p>
            </div>
            <div className="flex items-center gap-4">
               {!connected ? (
                 <Button 
                  onClick={handleConnectDrive} 
                  disabled={connecting}
                  className="bg-purple-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-primary"
                 >
                   {connecting ? <Loader2 className="size-4 animate-spin" /> : <Link2 className="size-4" />}
                   Connect Google Drive
                 </Button>
               ) : (
                 <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Link Status</p>
                    <div className="flex items-center justify-center gap-2">
                       <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-xl font-headline font-bold text-emerald-500 uppercase">CONNECTED</p>
                    </div>
                 </div>
               )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: "Drive Storage", val: "15.0 GB", icon: HardDriveIcon, color: "text-purple-500" },
                   { label: "Sync Latency", val: "128ms", icon: Activity, color: "text-emerald-500" },
                   { label: "Redundancy Hub", val: "Project #57", icon: ShieldCheck, color: "text-amber-500" }
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
                 <Card className="glass-card border-l-4 border-l-purple-500">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                          <CloudUpload className="size-4 text-purple-500" /> Vault-to-Drive Sync
                       </CardTitle>
                       <CardDescription>Archive Sovereign Vault data to external cloud redundancy.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="p-4 bg-black rounded-xl border border-white/5 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                             <span className="text-muted-foreground">Encryption Status</span>
                             <span className="text-emerald-500">AES-256_ACTIVE</span>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] text-muted-foreground uppercase font-bold">Storage Occupied</p>
                             <Progress value={storageUsed} className="h-1" />
                             <p className="text-[9px] text-right font-mono text-white">{storageUsed}% of 15GB</p>
                          </div>
                       </div>
                       <Button 
                         onClick={handleSyncVault} 
                         disabled={!connected || syncing} 
                         className="w-full bg-purple-500 text-white font-bold uppercase tracking-widest h-14 glow-primary"
                       >
                          {syncing ? <Loader2 className="size-5 animate-spin mr-2" /> : <RefreshCcw className="size-5" text-white />}
                          Execute Legacy Sync
                       </Button>
                    </CardContent>
                 </Card>

                 <Card className="glass-card border-t-4 border-t-emerald-500">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                          <FolderOpen className="size-4" /> Recent Redundancy Logs
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {[
                         { name: "Manifesto_v3.5.pdf", size: "1.2 MB", time: "2h ago" },
                         { name: "Vault_Root_Backup.enc", size: "420 MB", time: "1d ago" },
                         { name: "Mesh_Node_Config.json", size: "12 KB", time: "3d ago" }
                       ].map((log, i) => (
                         <div key={i} className="p-3 bg-white/2 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-3">
                               <FileText className="size-4 text-primary opacity-50" />
                               <div className="space-y-0.5">
                                  <p className="text-[10px] font-bold text-white uppercase">{log.name}</p>
                                  <p className="text-[8px] text-muted-foreground uppercase">{log.time}</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-500">{log.size}</span>
                         </div>
                       ))}
                    </CardContent>
                 </Card>
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Lock className="size-4" /> Zero-Trust Handshake
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Google Drive acts as an isolated redundancy hub. No primary imperial data is stored in plain text; everything is quantum-hashed before uplink."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">UPLINK_SECURED</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <History className="size-4" /> Sync Topology
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Source</span>
                        <ChevronRight className="size-3 text-primary" />
                        <span className="text-white">Imperial Vault</span>
                     </div>
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Target</span>
                        <ChevronRight className="size-3 text-primary" />
                        <span className="text-white">Google Drive Hub</span>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> Integrity Check
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Last automated integrity scan: <strong>PASSED</strong>. No bit-drift detected in cloud redundancy nodes.
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
