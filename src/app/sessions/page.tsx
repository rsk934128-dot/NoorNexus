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
  RefreshCcw,
  History,
  Calendar,
  Zap,
  MousePointer2,
  Trash2,
  AlertTriangle
} from "lucide-react"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, query, orderBy, limit, doc, deleteDoc } from "firebase/firestore"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useToast } from "@/hooks/use-toast"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function SessionMonitorPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user, loading: authLoading } = useUser()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [mounted, setMounted] = useState(false)
  
  const isAdmin = user?.email === ADMIN_EMAIL

  const { data: sessions, loading: sessionsLoading } = useCollection<any>(
    query(collection(db, "user_sessions"), orderBy("lastSeen", "desc"), limit(200))
  )

  // Filtered sessions based on search
  const filteredSessions = useMemo(() => {
    if (!searchTerm) return sessions;
    return sessions.filter(s => 
      s.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.assignedRegion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.assignedNode?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sessions, searchTerm])

  const onlineCount = sessions.filter(s => s.lastSeen && (Date.now() - s.lastSeen.toDate().getTime() < 120000)).length

  useEffect(() => {
    setMounted(true)
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  const handleDeleteSession = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, "user_sessions", id));
      toast({ title: "Session Dissolved", description: "Identity record purged from mesh." });
    } catch (e) {
      toast({ title: "Purge Failed", variant: "destructive" });
    }
  }

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-primary size-10 mx-auto" />
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Verifying Connection...</p>
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
                   <Activity className="size-3 mr-2" /> Global User Registry
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-3 uppercase tracking-tighter">
                Sovereign <span className="text-primary">Registry.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Imperial Surveillance Matrix." নূরনেক্সাস সাম্রাজ্যের প্রতিটি কানেকশন এবং ইউজার হিস্ট্রি এখানে সংরক্ষিত।
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
               <div className="flex gap-4">
                  <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[150px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Live Online</p>
                    <p className="text-2xl font-headline font-bold text-emerald-500">{onlineCount}</p>
                  </div>
                  <div className="p-4 glass-card rounded-2xl border border-white/10 text-center min-w-[150px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Registry</p>
                    <p className="text-2xl font-headline font-bold text-white">{sessions.length}</p>
                  </div>
               </div>
               <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search Identity or Node..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <Card className="glass-card overflow-hidden border-t-4 border-t-primary">
                <CardHeader className="border-b border-white/5 bg-white/2 flex flex-row items-center justify-between py-4 px-6">
                  <div className="flex items-center gap-4">
                    <Users className="size-5 text-primary" />
                    <CardTitle className="text-sm font-headline uppercase tracking-widest">Global Connection Matrix</CardTitle>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase font-bold text-[8px]">
                    Real-time Persistence: ON
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-muted/30 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                          <th className="px-6 py-4">Identity & Device</th>
                          <th className="px-6 py-4">Sovereign Node</th>
                          <th className="px-6 py-4">Activity Path</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Last Sync</th>
                          {isAdmin && <th className="px-6 py-4 text-right">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sessionsLoading ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-20 text-center">
                              <Loader2 className="size-8 animate-spin text-primary mx-auto mb-2" />
                              <p className="text-[10px] font-mono text-muted-foreground uppercase">Decrypting Identity Records...</p>
                            </td>
                          </tr>
                        ) : filteredSessions.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-20 text-center italic text-muted-foreground text-xs uppercase tracking-widest">
                              No records found matching criteria.
                            </td>
                          </tr>
                        ) : filteredSessions.map((s: any) => {
                          const isOnline = s.lastSeen && (Date.now() - s.lastSeen.toDate().getTime() < 120000);
                          const DeviceIcon = s.platform === "Mobile" ? Smartphone : Laptop;
                          return (
                            <tr key={s.id} className={`hover:bg-white/2 transition-colors group ${!isOnline ? 'opacity-60' : ''}`}>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className="relative">
                                      <Avatar className="size-10 border border-primary/20 shrink-0">
                                         <AvatarImage src={s.photoURL} />
                                         <AvatarFallback className="bg-primary/10 text-primary font-bold">{s.displayName?.substring(0, 2).toUpperCase() || "C"}</AvatarFallback>
                                      </Avatar>
                                      {isOnline && (
                                        <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-black bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                      )}
                                   </div>
                                   <div className="min-w-0">
                                      <div className="flex items-center gap-2">
                                         <p className="text-sm font-bold text-white uppercase truncate">{s.displayName}</p>
                                         <DeviceIcon className="size-3 text-primary opacity-50" />
                                      </div>
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
                                       <p className="text-[8px] text-muted-foreground font-mono uppercase">{s.assignedRegion || "Global Mesh"}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <MousePointer2 className="size-3 text-primary opacity-40" />
                                    <span className="text-[10px] text-white font-mono uppercase truncate max-w-[120px]">{s.lastAction || "/dashboard"}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <div className={`size-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-muted'}`} />
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                                      {isOnline ? 'ONLINE' : 'OFFLINE'}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="space-y-0.5">
                                    <p className="text-[10px] text-white font-bold uppercase">
                                      {mounted && s.lastSeen ? formatDistanceToNow(s.lastSeen.toDate()) + " ago" : "Unknown"}
                                    </p>
                                    <p className="text-[8px] text-muted-foreground font-mono uppercase">
                                      {mounted && s.lastSeen ? s.lastSeen.toDate().toLocaleTimeString() : "N/A"}
                                    </p>
                                 </div>
                              </td>
                              {isAdmin && (
                                <td className="px-6 py-4 text-right">
                                   <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleDeleteSession(s.id)}
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                   >
                                      <Trash2 className="size-4" />
                                   </Button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
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
                    <ShieldPlus className="size-4" /> Multi-Device Guard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                      "Every browser tab and device is assigned a unique Sovereign ID. Duplicate accounts across platforms are isolated for precision tracking."
                   </p>
                   <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                         <span className="uppercase text-muted-foreground">Tracking Precision</span>
                         <span className="text-emerald-500 font-bold">MAX</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                         <span className="uppercase text-muted-foreground">Duplicate Detection</span>
                         <span className="text-primary font-bold">ACTIVE</span>
                      </div>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                 <CardHeader>
                    <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                       <AlertTriangle className="size-4" /> Security Threshold
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground italic mb-4">"Sessions are automatically purged after 7 days of inactivity to maintain grid TORQUE."</p>
                    <Button variant="outline" className="w-full text-[9px] uppercase font-bold border-amber-500/20 text-amber-500 h-9">
                       Force Session Purge
                    </Button>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
