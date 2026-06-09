
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, addDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { Trophy, Server, Newspaper, Plus, Trash2, ShieldCheck, SlidersHorizontal, Lock, Zap, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function EcosystemParametersPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user, loading: authLoading } = useUser()
  const router = useRouter()
  
  // Real-time Collections
  const { data: matches } = useCollection<any>(collection(db, "sports_matches"))
  const { data: servers } = useCollection<any>(collection(db, "sports_servers"))
  const { data: news } = useCollection<any>(query(collection(db, "sports_news"), orderBy("timestamp", "desc")))

  // Form States
  const [matchForm, setMatchForm] = useState({ home: "", away: "", status: "UPCOMING", uplink: "", score: "0-0", description: "" })
  const [serverForm, setServerForm] = useState({ name: "", status: "Operational", ping: "12ms", load: "15%" })
  const [newsForm, setNewsForm] = useState({ title: "", content: "", severity: "INFO" })

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "L4 clearance not detected. Redirecting to auth gateway.",
        variant: "destructive"
      })
      router.push("/login")
    }
  }, [user, authLoading, router, toast])

  // Handlers
  const addMatch = async () => {
    if (!matchForm.home || !matchForm.away) return
    try {
      await addDoc(collection(db, "sports_matches"), { ...matchForm, timestamp: Date.now() })
      setMatchForm({ home: "", away: "", status: "UPCOMING", uplink: "", score: "0-0", description: "" })
      toast({ title: "Match Broadcast Provisioned", description: "Sovereign uplink established." })
    } catch (e) {
      toast({ title: "Provisioning Failed", variant: "destructive" })
    }
  }

  const deleteMatch = async (id: string) => {
    await deleteDoc(doc(db, "sports_matches", id))
    toast({ title: "Match Uplink Terminated" })
  }

  const addServer = async () => {
    if (!serverForm.name) return
    try {
      await addDoc(collection(db, "sports_servers"), { ...serverForm, id: Math.random().toString(36).substr(2, 9) })
      setServerForm({ name: "", status: "Operational", ping: "12ms", load: "15%" })
      toast({ title: "Relay Node Provisioned" })
    } catch (e) { toast({ title: "Node Setup Failed", variant: "destructive" }) }
  }

  const addNews = async () => {
    if (!newsForm.title) return
    try {
      await addDoc(collection(db, "sports_news"), { ...newsForm, timestamp: Date.now() })
      setNewsForm({ title: "", content: "", severity: "INFO" })
      toast({ title: "Tactical Broadcast Dispatched" })
    } catch (e) { toast({ title: "Broadcast Failed", variant: "destructive" }) }
  }

  const deleteItem = async (col: string, id: string) => {
    await deleteDoc(doc(db, col, id))
    toast({ title: "Parameter Rescinded" })
  }

  if (authLoading || !user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background cyber-grid">
         <Loader2 className="size-10 text-primary animate-spin" />
         <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Authenticating L4 Credentials...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3 text-primary uppercase tracking-tight">
                <SlidersHorizontal className="size-8" />
                Imperial Control Panel
              </h2>
              <div className="flex items-center gap-3">
                 <p className="text-muted-foreground uppercase text-[10px] tracking-[0.3em] font-mono">Mission 400 | Digital Sovereign Infrastructure</p>
                 <Badge variant="outline" className="border-primary/30 text-primary flex items-center gap-1.5 h-5">
                    <ShieldCheck className="size-3" />
                    <span className="text-[8px] font-bold">CLEARANCE: ROOT_L4</span>
                 </Badge>
              </div>
            </div>
            <div className="flex gap-4">
               <div className="p-3 bg-black/40 rounded-xl border border-primary/20 flex items-center gap-3">
                  <div className="size-8 rounded bg-primary/10 flex items-center justify-center">
                    <Lock className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Commander</p>
                    <p className="text-xs font-mono text-primary font-bold tracking-widest">{user?.displayName?.split(' ')[0].toUpperCase() || "ADMIN"}</p>
                  </div>
               </div>
            </div>
          </header>

          <Tabs defaultValue="sports" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
              <TabsTrigger value="sports" className="gap-2 px-6"><Trophy className="size-4" /> Sports Uplinks</TabsTrigger>
              <TabsTrigger value="nodes" className="gap-2 px-6"><Server className="size-4" /> Relay Nodes</TabsTrigger>
              <TabsTrigger value="news" className="gap-2 px-6"><Newspaper className="size-4" /> Tactical Feed</TabsTrigger>
            </TabsList>

            <TabsContent value="sports" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <Card className="glass-card overflow-hidden">
                <div className="h-1 bg-primary w-full opacity-50" />
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                    <Zap className="size-4" /> Provision New Match Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Home Team Identity</Label>
                    <Input value={matchForm.home} onChange={e => setMatchForm({...matchForm, home: e.target.value})} className="bg-background/50 border-white/10 font-mono" placeholder="e.g. BRAZIL" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Away Team Identity</Label>
                    <Input value={matchForm.away} onChange={e => setMatchForm({...matchForm, away: e.target.value})} className="bg-background/50 border-white/10 font-mono" placeholder="e.g. ARGENTINA" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Broadcast Status</Label>
                    <Select value={matchForm.status} onValueChange={v => setMatchForm({...matchForm, status: v})}>
                      <SelectTrigger className="bg-background/50 border-white/10 font-mono">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LIVE">LIVE</SelectItem>
                        <SelectItem value="UPCOMING">UPCOMING</SelectItem>
                        <SelectItem value="FINISHED">FINISHED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-2 space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Sovereign YouTube Uplink URL</Label>
                    <Input value={matchForm.uplink} onChange={e => setMatchForm({...matchForm, uplink: e.target.value})} className="bg-background/50 border-white/10 font-mono" placeholder="https://youtube.com/live/..." />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={addMatch} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest gap-2 h-10 glow-primary">
                      <Plus className="size-4" /> Provision Uplink
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map((m: any) => (
                  <div key={m.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group hover:border-primary/50 transition-all">
                    <div className="space-y-1">
                      <p className="font-bold text-sm uppercase tracking-wider">{m.home} <span className="text-muted-foreground font-mono mx-1">VS</span> {m.away}</p>
                      <p className="text-[9px] text-muted-foreground font-mono truncate max-w-[250px] opacity-70">{m.uplink}</p>
                      <div className="flex gap-2 pt-1">
                        <Badge className={`text-[8px] h-4 font-bold uppercase ${m.status === 'LIVE' ? 'bg-destructive animate-pulse' : 'bg-primary/20 text-primary border-primary/30'}`}>
                          {m.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteMatch(m.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nodes" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <Card className="glass-card overflow-hidden">
                <div className="h-1 bg-emerald-500 w-full opacity-50" />
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-emerald-500">Provision Mesh Relay Node</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Node Identity</Label>
                    <Input value={serverForm.name} onChange={e => setServerForm({...serverForm, name: e.target.value})} className="bg-background/50 border-white/10 font-mono" placeholder="SG-Edge-04" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Metric Status</Label>
                    <Input value={serverForm.status} onChange={e => setServerForm({...serverForm, status: e.target.value})} className="bg-background/50 border-white/10 font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Ping Latency</Label>
                    <Input value={serverForm.ping} onChange={e => setServerForm({...serverForm, ping: e.target.value})} className="bg-background/50 border-white/10 font-mono" />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={addServer} className="w-full bg-emerald-500 text-emerald-foreground font-bold uppercase tracking-widest gap-2 h-10 glow-emerald">
                      <Plus className="size-4" /> Deploy Node
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servers.map((s: any) => (
                  <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group hover:border-emerald-500/50 transition-all">
                    <div>
                      <p className="font-bold text-sm text-emerald-500">{s.name}</p>
                      <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">{s.ping} | {s.status}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem("sports_servers", s.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <Card className="glass-card overflow-hidden">
                <div className="h-1 bg-amber-500 w-full opacity-50" />
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-amber-500">Dispatch Imperial Broadcast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Broadcast Directive</Label>
                      <Input value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="bg-background/50 border-white/10 font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Priority Severity</Label>
                      <Select value={newsForm.severity} onValueChange={v => setNewsForm({...newsForm, severity: v})}>
                        <SelectTrigger className="bg-background/50 border-white/10 font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INFO">INFO</SelectItem>
                          <SelectItem value="URGENT">URGENT</SelectItem>
                          <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Strategic Content</Label>
                    <textarea value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} className="w-full min-h-[120px] bg-background/50 border border-white/10 rounded-md p-4 text-xs font-mono outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed" />
                  </div>
                  <Button onClick={addNews} className="w-full bg-amber-500 text-amber-foreground font-bold uppercase tracking-widest gap-2 h-12 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    <Plus className="size-4" /> Broadcast Directive
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {news.map((n: any) => (
                  <div key={n.id} className="p-5 bg-white/5 rounded-xl border border-white/5 flex justify-between items-start group hover:border-amber-500/50 transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`size-2.5 rounded-full ${n.severity === 'CRITICAL' ? 'bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]' : n.severity === 'URGENT' ? 'bg-amber-500' : 'bg-primary'}`} />
                        <p className="font-bold text-sm uppercase tracking-widest">{n.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono leading-relaxed max-w-3xl">{n.content}</p>
                      <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.2em]">{new Date(n.timestamp).toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem("sports_news", n.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </div>
  )
}
