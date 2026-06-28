
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, addDoc, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore"
import { Trophy, Server, Newspaper, Plus, Trash2, ShieldCheck, SlidersHorizontal, Lock, Zap, Loader2, Crown, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function EcosystemParametersPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user, loading: authLoading } = useUser()
  const router = useRouter()
  
  const isAdmin = user?.email === ADMIN_EMAIL

  // Real-time Collections with null guards for db
  const { data: matches } = useCollection<any>(db ? collection(db, "sports_matches") : null)
  const { data: nodes } = useCollection<any>(db ? query(collection(db, "nodes"), orderBy("name", "asc")) : null)
  const { data: news } = useCollection<any>(db ? query(collection(db, "sports_news"), orderBy("timestamp", "desc")) : null)

  // Form States
  const [matchForm, setMatchForm] = useState({ home: "", away: "", status: "UPCOMING", uplink: "", score: "0-0", description: "" })
  const [nodeForm, setNodeForm] = useState({ name: "", region: "South Asia", status: "Operational", load: 10, latency: 100, integrity: "Verified" })
  const [newsForm, setNewsForm] = useState({ title: "", content: "", severity: "INFO" })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  // Handlers
  const addMatch = async () => {
    if (!matchForm.home || !matchForm.away || !isAdmin || !db) return
    try {
      await addDoc(collection(db, "sports_matches"), { ...matchForm, timestamp: Date.now() })
      setMatchForm({ home: "", away: "", status: "UPCOMING", uplink: "", score: "0-0", description: "" })
      toast({ title: "Match Provisioned" })
    } catch (e) { toast({ title: "Failed", variant: "destructive" }) }
  }

  const addNode = async () => {
    if (!nodeForm.name || !isAdmin || !db) return
    try {
      await addDoc(collection(db, "nodes"), { ...nodeForm, lastSeen: new Date().toISOString() })
      setNodeForm({ name: "", region: "South Asia", status: "Operational", load: 10, latency: 100, integrity: "Verified" })
      toast({ title: "Node Initialized" })
    } catch (e) { toast({ title: "Failed", variant: "destructive" }) }
  }

  const updateNodeMetric = async (id: string, field: string, value: any) => {
    if (!isAdmin || !db) return
    try {
      await updateDoc(doc(db, "nodes", id), { [field]: value })
    } catch (e) { toast({ title: "Update Failed", variant: "destructive" }) }
  }

  const addNews = async () => {
    if (!newsForm.title || !isAdmin || !db) return
    try {
      await addDoc(collection(db, "sports_news"), { ...newsForm, timestamp: Date.now() })
      setNewsForm({ title: "", content: "", severity: "INFO" })
      toast({ title: "Broadcast Dispatched" })
    } catch (e) { toast({ title: "Failed", variant: "destructive" }) }
  }

  const deleteItem = async (col: string, id: string) => {
    if (!isAdmin || !db) return
    await deleteDoc(doc(db, col, id))
    toast({ title: "Removed Successfully" })
  }

  if (authLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3 text-primary uppercase">
                <SlidersHorizontal className="size-8" />
                Imperial Control Panel
              </h2>
              <div className="flex items-center gap-3">
                 <p className="text-muted-foreground uppercase text-[10px] tracking-[0.3em] font-mono">Mission 400 | Root Access</p>
                 <Badge variant="outline" className="border-primary/30 text-primary">
                    <ShieldCheck className="size-3 mr-1" />
                    CLEARANCE: {isAdmin ? 'ROOT_L4_ADMIN' : 'ROOT_L4'}
                 </Badge>
              </div>
            </div>
          </header>

          <Tabs defaultValue="infra" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
              <TabsTrigger value="infra" className="gap-2 px-6"><Server className="size-4" /> Infrastructure Nodes</TabsTrigger>
              <TabsTrigger value="sports" className="gap-2 px-6"><Trophy className="size-4" /> Sports Uplinks</TabsTrigger>
              <TabsTrigger value="news" className="gap-2 px-6"><Newspaper className="size-4" /> Tactical Feed</TabsTrigger>
            </TabsList>

            <TabsContent value="infra" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              {isAdmin && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <Plus className="size-4" /> Initialize Mesh Node
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Node Identity</Label>
                      <Input value={nodeForm.name} onChange={e => setNodeForm({...nodeForm, name: e.target.value})} className="bg-background/50 border-white/10 font-mono" placeholder="Sirajganj-Edge-01" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Region</Label>
                      <Input value={nodeForm.region} onChange={e => setNodeForm({...nodeForm, region: e.target.value})} className="bg-background/50 border-white/10 font-mono" />
                    </div>
                    <div className="space-y-2 flex items-end">
                      <Button onClick={addNode} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-10">
                        Provision Node
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 gap-4">
                {nodes.map((node: any) => (
                  <div key={node.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-wrap justify-between items-center gap-4 group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded bg-primary/10 ${node.latency > 300 ? 'text-destructive' : 'text-primary'}`}>
                        <Activity className="size-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase">{node.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase">{node.region}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-center flex-1 justify-end">
                       <div className="space-y-1 w-24">
                          <p className="text-[8px] uppercase font-bold text-muted-foreground">Latency (ms)</p>
                          <Input 
                            type="number" 
                            disabled={!isAdmin}
                            value={node.latency} 
                            onChange={(e) => updateNodeMetric(node.id, "latency", parseInt(e.target.value))}
                            className="h-8 text-xs bg-black/40 border-white/5 font-mono"
                          />
                       </div>
                       <div className="space-y-1 w-24">
                          <p className="text-[8px] uppercase font-bold text-muted-foreground">Load (%)</p>
                          <Input 
                            type="number" 
                            disabled={!isAdmin}
                            value={node.load} 
                            onChange={(e) => updateNodeMetric(node.id, "load", parseInt(e.target.value))}
                            className="h-8 text-xs bg-black/40 border-white/5 font-mono"
                          />
                       </div>
                       <div className="space-y-1 w-32">
                          <p className="text-[8px] uppercase font-bold text-muted-foreground">Status</p>
                          <Select 
                            disabled={!isAdmin}
                            value={node.status} 
                            onValueChange={(v) => updateNodeMetric(node.id, "status", v)}
                          >
                            <SelectTrigger className="h-8 text-[10px] bg-black/40 border-white/5">
                               <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="Operational">Operational</SelectItem>
                               <SelectItem value="Maintenance">Maintenance</SelectItem>
                               <SelectItem value="Degraded">Degraded</SelectItem>
                            </SelectContent>
                          </Select>
                       </div>
                       {isAdmin && (
                         <Button variant="ghost" size="icon" onClick={() => deleteItem("nodes", node.id)} className="text-muted-foreground hover:text-destructive self-end">
                            <Trash2 className="size-4" />
                         </Button>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sports" className="space-y-8">
              {isAdmin && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                      <Zap className="size-4" /> Provision Match Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Home Team</Label>
                      <Input value={matchForm.home} onChange={e => setMatchForm({...matchForm, home: e.target.value})} className="bg-background/50 border-white/10 font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Away Team</Label>
                      <Input value={matchForm.away} onChange={e => setMatchForm({...matchForm, away: e.target.value})} className="bg-background/50 border-white/10 font-mono" />
                    </div>
                    <div className="space-y-2 flex items-end">
                      <Button onClick={addMatch} className="w-full bg-primary text-primary-foreground font-bold uppercase h-10 tracking-widest">
                        Provision Uplink
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map((m: any) => (
                  <div key={m.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group">
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider">{m.home} VS {m.away}</p>
                      <Badge className="text-[8px] h-4 mt-1 bg-primary/20 text-primary border-primary/30 uppercase">{m.status}</Badge>
                    </div>
                    {isAdmin && (
                      <Button variant="ghost" size="icon" onClick={() => deleteItem("sports_matches", m.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-8">
              {isAdmin && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-amber-500">Dispatch Broadcast</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Directive</Label>
                        <Input value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="bg-background/50 border-white/10 font-mono" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Severity</Label>
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
                    <Button onClick={addNews} className="w-full bg-amber-500 text-amber-foreground font-bold uppercase tracking-widest h-12">
                      Dispatch
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {news.map((n: any) => (
                  <div key={n.id} className="p-5 bg-white/5 rounded-xl border border-white/5 flex justify-between items-start group">
                    <div className="space-y-2">
                      <p className="font-bold text-sm uppercase tracking-widest">{n.title}</p>
                      <p className="text-xs text-muted-foreground font-mono leading-relaxed">{n.content}</p>
                    </div>
                    {isAdmin && (
                      <Button variant="ghost" size="icon" onClick={() => deleteItem("sports_news", n.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
                    )}
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
