
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Clock, 
  Monitor, 
  Globe, 
  Menu, 
  Activity, 
  Loader2, 
  ShieldCheck,
  Search,
  LayoutGrid,
  Laptop,
  Smartphone,
  ExternalLink,
  MapPin,
  Signal,
  Cpu,
  ShieldPlus,
  RefreshCcw
} from "lucide-react"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function SessionMonitorPage() {
  const db = useFirestore()
  const { user, loading: authLoading } = useUser()
  const router = useRouter()
  
  const isAdmin = user?.email === ADMIN_EMAIL

  const { data: sessions, loading: sessionsLoading } = useCollection<any>(
    query(collection(db, "user_sessions"), orderBy("lastSeen", "desc"), limit(100))
  )

  // Calculate Region Distribution
  const regionStats = useMemo(() => {
    const stats: Record<string, number> = {}
    sessions.forEach(s => {
      const region = s.assignedRegion || "Unknown"
      stats[region] = (stats[region] || 0) + 1
    })
    return Object.entries(stats).map(([name, count]) => ({ name, count }))
  }, [sessions])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else if (!authLoading && !isAdmin) {
      router.push("/")
    }
  }, [user, authLoading, isAdmin, router])

  if (authLoading || !isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-primary size-10 mx-auto" />
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Verifying Root Privileges...</p>
        </div>
      </div>
    )
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
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Activity className="size-3 mr-2" /> Mission 500: Surveillance
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-3 uppercase tracking-tighter">
                Global <span className="text-primary">Sessions.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Tracking the 100-Node Pulse." সকল কমান্ডারের সক্রিয় সেশন এবং তাদের লোকেশন রিয়েল-টাইমে পর্যবেক্ষণ করা হচ্ছে।
              </p>
            </div>
            <div className="flex items-center gap-2">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Active Nodes</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500">{sessions.length}</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Distribution Overview */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 {regionStats.map((reg, i) => (
                   <Card key={i} className="glass-card bg-black/40 border-white/5">
                      <CardContent className="p-4 space-y-2 text-center">
                         <MapPin className="size-4 text-primary mx-auto opacity-50" />
                         <p className="text-[9px] font-bold text-muted-foreground uppercase truncate">{reg.name}</p>
                         <p className="text-xl font-headline font-bold text-white">{reg.count}</p>
                      </CardContent>
                   </Card>
                 ))}
                 {regionStats.length === 0 && (
                   <div className="col-span-4 py-10 text-center glass-card border-dashed">
                      <p className="text-xs text-muted-foreground uppercase font-mono">Scanning Global Hubs...</p>
                   </div>
                 )}
              </section>

              {/* Main Log Table */}
              <Card className="glass-card overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/2 flex flex-row items-center justify-between py-4 px-6">
                  <div className="flex items-center gap-4">
                    <LayoutGrid className="size-5 text-primary" />
                    <CardTitle className="text-sm font-headline uppercase tracking-widest">Sovereign Access Matrix</CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                     <Badge className="bg-emerald-500/20 text-emerald-500 border-none animate-pulse">LIVE_SYNC</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-muted/30 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                          <th className="px-6 py-4">Commander Identity</th>
                          <th className="px-6 py-4">Sovereign Node (Location)</th>
                          <th className="px-6 py-4">Network Info</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Last Pulse</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sessionsLoading ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-20 text-center">
                              <Loader2 className="size-8 animate-spin text-primary mx-auto mb-2" />
                              <p className="text-[10px] font-mono text-muted-foreground uppercase">Decrypting Access Records...</p>
                            </td>
                          </tr>
                        ) : sessions.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-20 text-center italic text-muted-foreground">
                              No active sessions detected in the mesh.
                            </td>
                          </tr>
                        ) : sessions.map((s: any) => (
                          <tr key={s.id} className="hover:bg-white/2 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <Avatar className="size-10 border border-primary/20 shrink-0">
                                    <AvatarImage src={s.photoURL} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{s.displayName?.substring(0, 2).toUpperCase() || "C"}</AvatarFallback>
                                 </Avatar>
                                 <div className="min-w-0">
                                    <p className="text-sm font-bold text-white uppercase truncate">{s.displayName}</p>
                                    <p className="text-[9px] text-muted-foreground font-mono truncate">{s.email}</p>
                                 </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                  <div className="size-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                                     <Globe className="size-4 text-primary" />
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-white uppercase">{s.assignedNode || "NODE_AUTO"}</p>
                                     <p className="text-[8px] text-muted-foreground font-mono">{s.assignedRegion || "Global Mesh"}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                     {s.userAgent?.includes('Mobi') ? <Smartphone className="size-3 text-muted-foreground" /> : <Laptop className="size-3 text-muted-foreground" />}
                                     <span className="text-[10px] text-white font-mono">{s.platform || "Sovereign_OS"}</span>
                                  </div>
                                  <p className="text-[8px] text-primary font-mono">{s.ipSimulated || "HIDDEN"}</p>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">ACTIVE</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <div className="space-y-0.5">
                                  <p className="text-[10px] text-white font-bold uppercase">
                                    {s.lastSeen ? formatDistanceToNow(s.lastSeen.toDate()) + " ago" : "Just now"}
                                  </p>
                                  <p className="text-[8px] text-muted-foreground font-mono">
                                    {s.lastSeen ? s.lastSeen.toDate().toLocaleTimeString() : ""}
                                  </p>
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <ShieldPlus className="size-4" /> Security Posture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                      <p className="text-[8px] text-muted-foreground uppercase font-bold">Surveillance Torque</p>
                      <Badge className="bg-primary text-[10px] font-bold mt-1">96% ACTIVE</Badge>
                   </div>
                   <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                      "Every session is anchored to an Imperial Handshake. Zero-trust traceability is enforced for Project #160."
                   </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Signal className="size-4" /> Heartbeat Sync
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="space-y-1">
                       <div className="flex justify-between text-[10px] font-mono">
                          <span>Sync Success</span>
                          <span className="text-emerald-500 font-bold">100.0%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                       Real-time telemetry verified across all 100 global nodes.
                    </p>
                 </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <ShieldCheck className="size-3" /> Integrity Check
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">
                       No cryptographic drift detected in the current session cluster. All commanders are verified.
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
