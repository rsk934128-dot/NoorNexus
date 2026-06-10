
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
  ExternalLink
} from "lucide-react"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function SessionMonitorPage() {
  const db = useFirestore()
  const { user, loading: authLoading } = useUser()
  const router = useRouter()
  
  const isAdmin = user?.email === ADMIN_EMAIL

  const { data: sessions, loading: sessionsLoading } = useCollection<any>(
    query(collection(db, "user_sessions"), orderBy("lastSeen", "desc"), limit(100))
  )

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else if (!authLoading && !isAdmin) {
      router.push("/")
    }
  }, [user, authLoading, isAdmin, router])

  if (authLoading || !isAdmin) {
    return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary size-10" /></div>
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-4xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Activity className="size-10 text-primary" />
                   Imperial Session Monitor
                 </h2>
              </div>
              <p className="text-muted-foreground">Tracking every sovereign access point and real-time mesh activity.</p>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-primary/30 text-primary h-10 px-4 flex items-center gap-2">
                 <Globe className="size-4 animate-spin-slow" /> MESH_SURVEILLANCE_ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Users</CardTitle>
                <CardTitle className="text-3xl font-headline font-bold text-white">{sessions.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-emerald-500 font-bold uppercase flex items-center gap-1">
                   Real-time Synchronization
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-l-4 border-l-secondary">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">System Integrity</CardTitle>
                <CardTitle className="text-3xl font-headline font-bold text-secondary">MAX</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-muted-foreground font-mono uppercase">L4 Access Verification</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Last Entry</CardTitle>
                <CardTitle className="text-xl font-headline font-bold text-amber-500 uppercase truncate">
                  {sessions[0]?.displayName || "None"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-muted-foreground font-mono uppercase">
                  {sessions[0]?.lastSeen ? formatDistanceToNow(sessions[0].lastSeen.toDate()) + " ago" : "Calculating..."}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/2 flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <LayoutGrid className="size-5 text-primary" />
                <CardTitle className="text-sm font-headline uppercase tracking-widest">Sovereign Access Log</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                    <input className="bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-[10px] w-48 outline-none focus:ring-1 focus:ring-primary" placeholder="Search Commander..." />
                 </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/30 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                      <th className="px-6 py-4">Commander Identity</th>
                      <th className="px-6 py-4">Access Point (Device)</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Active</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sessionsLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <Loader2 className="size-8 animate-spin text-primary mx-auto mb-2" />
                          <p className="text-[10px] font-mono text-muted-foreground uppercase">Syncing Access Nodes...</p>
                        </td>
                      </tr>
                    ) : sessions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <p className="text-[10px] font-mono text-muted-foreground uppercase">No recorded sessions in the mesh.</p>
                        </td>
                      </tr>
                    ) : sessions.map((s: any) => (
                      <tr key={s.id} className="hover:bg-white/2 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <Avatar className="size-10 border border-primary/20 shrink-0">
                                <AvatarImage src={s.photoURL} />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">{s.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                             </Avatar>
                             <div>
                                <p className="text-sm font-bold text-white uppercase">{s.displayName}</p>
                                <p className="text-[9px] text-muted-foreground font-mono">{s.email}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              {s.userAgent?.includes('Mobi') ? <Smartphone className="size-3 text-muted-foreground" /> : <Laptop className="size-3 text-muted-foreground" />}
                              <div className="space-y-0.5">
                                 <p className="text-[10px] text-white font-mono truncate max-w-[200px]">{s.userAgent?.split(') ')[1] || 'Web Interface'}</p>
                                 <p className="text-[8px] text-muted-foreground uppercase">{s.platform || 'SOVEREIGN_OS'}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">ACTIVE</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="space-y-0.5">
                              <p className="text-[10px] text-white font-bold uppercase">
                                {s.lastSeen ? formatDistanceToNow(s.lastSeen.toDate()) + " ago" : "Just now"}
                              </p>
                              <p className="text-[8px] text-muted-foreground font-mono">
                                {s.lastSeen ? s.lastSeen.toDate().toLocaleTimeString() : ""}
                              </p>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                             <ExternalLink className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </div>
  )
}
