"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radar, ShieldAlert, ShieldCheck, Terminal, AlertTriangle, Menu, Loader2, Database, Lock, Activity, RefreshCcw, ShieldHalf } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const INITIAL_TRAFFIC_LOGS = [
  { id: 1, app: "Brave", destination: "dns.google", status: "200 (OK)", risk: "None", type: "DNS Request" },
  { id: 2, app: "Brave", destination: "32.186.73.121", status: "200 (OK)", risk: "None", type: "Direct IP" },
  { id: 3, app: "Brave", destination: "13.224.245.83", status: "200 (OK)", risk: "None", type: "Cloudfront" },
  { id: 4, app: "Brave", destination: "13.224.245.112", status: "200 (OK)", risk: "None", type: "Cloudfront" },
  { id: 5, app: "Brave", destination: "brave-today-cdn.brave.com", status: "200 (OK)", risk: "None", type: "CDN" },
  { id: 6, app: "Brave", destination: "54.203.205.25", status: "200 (OK)", risk: "None", type: "Direct IP" },
  { id: 7, app: "Brave", destination: "142.250.206.67", status: "200 (OK)", risk: "None", type: "Google IP" },
  { id: 8, app: "Brave", destination: "142.250.193.163", status: "200 (OK)", risk: "None", type: "Google IP" },
  { id: 9, app: "Brave", destination: "brunhild.challenges.cloudflare.com", status: "200 (OK)", risk: "Low", type: "Cloudflare" },
  { id: 10, app: "Brave", destination: "accounts.youtube.com", status: "200 (OK)", risk: "None", type: "Auth" },
  { id: 11, app: "Brave", destination: "firebaselogging.googleapis.com", status: "200 (OK)", risk: "None", type: "Logging" },
  { id: 12, app: "Brave", destination: "64.227.47.137", status: "200 (OK)", risk: "None", type: "Direct IP" },
  { id: 13, app: "Brave", destination: "44.254.52.103", status: "200 (OK)", risk: "None", type: "Direct IP" },
  { id: 14, app: "Brave", destination: "151.101.65.81", status: "200 (OK)", risk: "None", type: "Direct IP" },
  { id: 15, app: "Unknown App", destination: "142.251.223.161", status: "Shutdown", risk: "Critical", type: "Intercepted" },
]

export default function BorderMonitorPage() {
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState(INITIAL_TRAFFIC_LOGS)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])

  const handleScan = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full overflow-x-hidden pb-20">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon">
                       <Menu className="size-6" />
                    </Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Radar className="size-8 text-primary animate-pulse" />
                   Sovereign Shield Matrix
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base italic">"Monitoring the Digital Border. No signal passes without Nora-01 authorization."</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleScan} disabled={loading} className="bg-primary text-primary-foreground font-bold uppercase tracking-widest gap-2 glow-primary h-12 px-6">
                {loading ? <RefreshCcw className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
                Execute Border Pulse
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Card className="glass-card lg:col-span-3 overflow-hidden border-t-4 border-t-primary">
              <CardHeader className="border-b border-white/5 bg-white/2 flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-sm font-headline flex items-center gap-2 uppercase tracking-widest text-white">
                  <Terminal className="size-4 text-primary" />
                  Live Border Traffic Ledger
                </CardTitle>
                <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 uppercase font-bold text-[8px]">Project_Shield: Active</Badge>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 text-primary animate-spin" />
                    <p className="text-xs font-mono uppercase text-muted-foreground animate-pulse">Decrypting Signal Mesh...</p>
                  </div>
                ) : (
                  <div className="max-h-[600px] overflow-auto">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow className="border-white/5">
                          <TableHead className="text-[10px] uppercase font-bold">App Name</TableHead>
                          <TableHead className="text-[10px] uppercase font-bold">Destination (URL/IP)</TableHead>
                          <TableHead className="text-[10px] uppercase font-bold">Type</TableHead>
                          <TableHead className="text-[10px] uppercase font-bold">Status</TableHead>
                          <TableHead className="text-right text-[10px] uppercase font-bold">Risk Level</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.map((log) => (
                          <TableRow key={log.id} className={`border-white/5 transition-colors ${log.risk === 'Critical' ? 'bg-destructive/10' : 'hover:bg-white/5'}`}>
                            <TableCell className="font-bold text-xs uppercase text-white">
                               {log.app}
                            </TableCell>
                            <TableCell className="font-mono text-[10px] text-primary">
                               {log.destination}
                            </TableCell>
                            <TableCell className="text-[10px] text-muted-foreground uppercase font-mono">
                               {log.type}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`text-[8px] uppercase font-bold ${log.status.includes('200') ? 'border-emerald-500/30 text-emerald-500' : 'border-destructive/30 text-destructive'}`}>
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                               <Badge className={`text-[8px] font-bold ${log.risk === 'Critical' ? 'bg-red-500' : log.risk === 'Low' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                                  {log.risk}
                               </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="glass-card bg-primary/5 border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <ShieldHalf className="size-16 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                    <Activity className="size-4" /> Border Torque
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-4">
                    <p className="text-4xl font-headline font-bold text-white tracking-tighter">100%</p>
                    <p className="text-[9px] text-muted-foreground uppercase font-bold mt-1">Grid Immunity</p>
                  </div>
                  <div className="space-y-3">
                     {[
                       { label: "DNS Security", val: "Hardened", color: "text-emerald-500" },
                       { label: "IP Filtering", val: "Enabled", color: "text-primary" },
                       { label: "Threat Isolation", val: "Active", color: "text-amber-500" }
                     ].map((item, i) => (
                       <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-black/40 rounded border border-white/5">
                         <span className="text-muted-foreground uppercase">{item.label}</span>
                         <span className={`font-bold uppercase ${item.color}`}>{item.val}</span>
                       </div>
                     ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                     <AlertTriangle className="size-4" /> Nora-01 Advisory
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     "কমান্ডার, Unknown App থেকে 142.251.223.161-এ একটি অননুমোদিত কানেকশন ডিটেক্ট করা হয়েছে। প্রোটোকল v3.5 অনুযায়ী এটি শাটডাউন (Shutdown) করা হয়েছে।"
                   </p>
                   <Button variant="outline" className="w-full h-9 text-[9px] uppercase font-bold border-amber-500/20 text-amber-500 hover:bg-amber-500/10">
                      View Threat Intelligence
                   </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> Signal Memory
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Last scan: <strong>Success</strong>. Intercepted 1 shadow packet. 14 legitimate connections verified.
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
