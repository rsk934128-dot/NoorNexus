
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { Trophy, Server, Newspaper, Plus, Trash2, Save, ExternalLink, SlidersHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EcosystemParametersPage() {
  const { toast } = useToast()
  const db = useFirestore()
  
  // Real-time Collections
  const { data: matches } = useCollection<any>(collection(db, "sports_matches"))
  const { data: servers } = useCollection<any>(collection(db, "sports_servers"))
  const { data: news } = useCollection<any>(query(collection(db, "sports_news"), orderBy("timestamp", "desc")))

  // Form States
  const [matchForm, setMatchForm] = useState({ home: "", away: "", status: "UPCOMING", uplink: "", score: "0-0", description: "" })
  const [serverForm, setServerForm] = useState({ name: "", status: "Operational", ping: "12ms", load: "15%" })
  const [newsForm, setNewsForm] = useState({ title: "", content: "", severity: "INFO" })

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

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="space-y-1">
            <h2 className="text-3xl font-headline font-bold flex items-center gap-3 text-primary">
              <SlidersHorizontal className="size-8" />
              Ecosystem Parameters
            </h2>
            <p className="text-muted-foreground uppercase text-[10px] tracking-[0.3em] font-mono">
              Imperial Control Panel | Mission 400 Core
            </p>
          </header>

          <Tabs defaultValue="sports" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1">
              <TabsTrigger value="sports" className="gap-2"><Trophy className="size-4" /> Sports Uplinks</TabsTrigger>
              <TabsTrigger value="nodes" className="gap-2"><Server className="size-4" /> Relay Nodes</TabsTrigger>
              <TabsTrigger value="news" className="gap-2"><Newspaper className="size-4" /> Tactical Feed</TabsTrigger>
            </TabsList>

            <TabsContent value="sports" className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Provision New Match Feed</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Home Team</Label>
                    <Input value={matchForm.home} onChange={e => setMatchForm({...matchForm, home: e.target.value})} className="bg-background/50 border-white/10" placeholder="e.g. BRAZIL" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Away Team</Label>
                    <Input value={matchForm.away} onChange={e => setMatchForm({...matchForm, away: e.target.value})} className="bg-background/50 border-white/10" placeholder="e.g. ARGENTINA" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Status</Label>
                    <Select value={matchForm.status} onValueChange={v => setMatchForm({...matchForm, status: v})}>
                      <SelectTrigger className="bg-background/50 border-white/10">
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
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">YouTube Uplink URL</Label>
                    <Input value={matchForm.uplink} onChange={e => setMatchForm({...matchForm, uplink: e.target.value})} className="bg-background/50 border-white/10" placeholder="https://youtube.com/live/..." />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={addMatch} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest gap-2">
                      <Plus className="size-4" /> Provision
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map((m: any) => (
                  <div key={m.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group hover:border-primary/50 transition-all">
                    <div className="space-y-1">
                      <p className="font-bold text-sm uppercase">{m.home} vs {m.away}</p>
                      <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">{m.uplink}</p>
                      <div className="flex gap-2 pt-1">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${m.status === 'LIVE' ? 'bg-destructive text-white' : 'bg-primary text-primary-foreground'}`}>
                          {m.status}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteMatch(m.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nodes" className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Provision Relay Node</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Node Identity</Label>
                    <Input value={serverForm.name} onChange={e => setServerForm({...serverForm, name: e.target.value})} className="bg-background/50 border-white/10" placeholder="SG-Edge-04" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Status</Label>
                    <Input value={serverForm.status} onChange={e => setServerForm({...serverForm, status: e.target.value})} className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Ping</Label>
                    <Input value={serverForm.ping} onChange={e => setServerForm({...serverForm, ping: e.target.value})} className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={addServer} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest gap-2">
                      <Plus className="size-4" /> Provision Node
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servers.map((s: any) => (
                  <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{s.ping} | {s.status}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem("sports_servers", s.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary">Dispatch Tactical Broadcast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Broadcast Title</Label>
                      <Input value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="bg-background/50 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Severity</Label>
                      <Select value={newsForm.severity} onValueChange={v => setNewsForm({...newsForm, severity: v})}>
                        <SelectTrigger className="bg-background/50 border-white/10">
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
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Content</Label>
                    <textarea value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} className="w-full min-h-[100px] bg-background/50 border border-white/10 rounded-md p-3 text-xs outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <Button onClick={addNews} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest gap-2">
                    <Plus className="size-4" /> Dispatch
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {news.map((n: any) => (
                  <div key={n.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${n.severity === 'CRITICAL' ? 'bg-destructive' : n.severity === 'URGENT' ? 'bg-amber-500' : 'bg-primary'}`} />
                        <p className="font-bold text-sm uppercase">{n.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{n.content}</p>
                      <p className="text-[9px] font-mono text-muted-foreground uppercase">{new Date(n.timestamp).toLocaleString()}</p>
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
