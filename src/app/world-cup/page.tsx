"use client"

import { useState, useMemo, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  PlayCircle, 
  Activity, 
  MessageSquare, 
  Zap, 
  Lock, 
  Monitor,
  Clock,
  ShieldCheck,
  Settings2,
  Maximize2,
  Send,
  Cpu,
  Loader2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCollection, useFirestore, useUser } from "@/firebase"
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore"
import { getMatchInsight, type MatchInsightOutput } from "@/ai/flows/sports-insight-flow"
import { useToast } from "@/hooks/use-toast"

export default function WorldCupPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  
  // Real-time Data Subscriptions
  const matchesQuery = useMemo(() => query(collection(db, "sports_matches"), orderBy("status")), [db])
  const serversQuery = useMemo(() => query(collection(db, "sports_servers")), [db])
  const chatQuery = useMemo(() => query(collection(db, "sports_chat"), orderBy("timestamp", "desc"), limit(50)), [db])

  const { data: matches } = useCollection<any>(matchesQuery)
  const { data: servers } = useCollection<any>(serversQuery)
  const { data: chats } = useCollection<any>(chatQuery)

  const [activeMatch, setActiveMatch] = useState<any>(null)
  const [selectedServer, setSelectedServer] = useState<any>(null)
  const [isHandshaking, setIsHandshaking] = useState(false)
  const [handshakeProgress, setHandshakeProgress] = useState(0)
  const [chatInput, setChatInput] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiInsight, setAiInsight] = useState<MatchInsightOutput | null>(null)

  // Initialize selected server and match if not set
  useEffect(() => {
    if (servers.length > 0 && !selectedServer) setSelectedServer(servers[0])
    if (matches.length > 0 && !activeMatch) setActiveMatch(matches.find(m => m.status === 'LIVE') || matches[0])
  }, [servers, matches, selectedServer, activeMatch])

  const handleLaunchUplink = () => {
    setIsHandshaking(true)
    setHandshakeProgress(0)
    const interval = setInterval(() => {
      setHandshakeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 20
      })
    }, 200)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim() || !user) return
    addDoc(collection(db, "sports_chat"), {
      user: user.displayName || user.email || "Sovereign_User",
      message: chatInput,
      timestamp: Date.now()
    })
    setChatInput("")
  }

  const handleGetAiInsight = async () => {
    if (!activeMatch) return
    setAiLoading(true)
    try {
      const insight = await getMatchInsight({
        homeTeam: activeMatch.home,
        awayTeam: activeMatch.away,
        currentScore: activeMatch.score || "0 - 0",
        matchStatus: activeMatch.status,
        description: activeMatch.description
      })
      setAiInsight(insight)
    } catch (error) {
      toast({
        title: "AI Analysis Failed",
        description: "Could not establish a neural link with Nora-AI.",
        variant: "destructive"
      })
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary">
                  <Trophy className="size-6 text-primary animate-pulse" />
                </div>
                <div>
                  <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">GSMIFY SOVEREIGN SPORTS</h2>
                  <p className="text-[10px] text-muted-foreground font-mono tracking-[0.4em] uppercase font-bold">MISSION 400 | OS v3.2 Intelligence</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 h-auto gap-2 font-bold">
                  <Activity className="size-4 animate-pulse" />
                  MESH LATENCY: {selectedServer?.ping || "..."}
               </Badge>
               <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase tracking-tighter">
                  SIGNAL: 98.4%
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
              <Card className="glass-card border-white/5 overflow-hidden relative group">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2 py-3 px-6">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-[10px] border-primary/50 text-primary font-bold">
                      {activeMatch?.status === 'LIVE' ? 'LIVE STREAM' : 'UPCOMING'}
                    </Badge>
                    <span className="text-sm font-headline font-bold uppercase">
                      {activeMatch ? `${activeMatch.home} vs ${activeMatch.away}` : "SELECT A MATCH"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-primary">
                      <Settings2 className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-primary">
                      <Maximize2 className="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 aspect-video bg-black relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/stadium/1200/800')] bg-cover" />
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="size-24 rounded-full border-2 border-primary/30 flex items-center justify-center animate-spin-slow">
                      <PlayCircle className="size-12 text-primary/50" />
                    </div>
                    <Button 
                      onClick={handleLaunchUplink}
                      className="bg-primary text-primary-foreground font-bold uppercase tracking-widest px-10 h-14 glow-primary"
                    >
                      Establish Sovereign Uplink
                    </Button>
                  </div>
                </CardContent>
                <div className="bg-muted/30 p-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Server:</span>
                    <div className="flex gap-2">
                      {servers.map(s => (
                        <Button 
                          key={s.id}
                          variant={selectedServer?.id === s.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedServer(s)}
                          className="text-[10px] h-7 px-3 border-white/10"
                        >
                          {s.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={handleGetAiInsight}
                    disabled={aiLoading}
                    className="bg-amber-500/20 text-amber-500 border border-amber-500/30 hover:bg-amber-500/30 text-[10px] h-7 gap-2"
                  >
                    {aiLoading ? <Loader2 className="size-3 animate-spin" /> : <Cpu className="size-3" />}
                    NORA-AI ANALYSIS
                  </Button>
                </div>
              </Card>

              {aiInsight && (
                <Card className="glass-card border-amber-500/20 animate-in fade-in slide-in-from-top-4">
                  <CardHeader>
                    <CardTitle className="text-sm font-headline text-amber-500 flex items-center gap-2">
                      <Cpu className="size-4" />
                      Tactical Intelligence Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Win Probability</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>{activeMatch?.home}</span>
                            <span>{aiInsight.winProbability.home}%</span>
                          </div>
                          <div className="h-1 bg-muted rounded-full">
                            <div className="h-full bg-primary" style={{ width: `${aiInsight.winProbability.home}%` }} />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>{activeMatch?.away}</span>
                            <span>{aiInsight.winProbability.away}%</span>
                          </div>
                          <div className="h-1 bg-muted rounded-full">
                            <div className="h-full bg-amber-500" style={{ width: `${aiInsight.winProbability.away}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 p-4 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Tactical Summary</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{aiInsight.tacticalAnalysis}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex gap-3 items-center">
                       <ShieldCheck className="size-5 text-emerald-500" />
                       <p className="text-[10px] font-mono italic text-emerald-500/80">{aiInsight.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2">
                      <Monitor className="size-4" />
                      Tactical Field View
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[4/3] bg-emerald-950/20 rounded-xl border border-emerald-500/20 relative overflow-hidden">
                       <div className="absolute inset-4 border border-white/10 rounded-sm">
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full border border-white/10" />
                          <div className="absolute top-1/4 left-1/3 size-2 bg-primary rounded-full glow-primary animate-pulse" />
                          <div className="absolute top-2/3 right-1/4 size-2 bg-amber-500 rounded-full animate-bounce" />
                          <div className="absolute top-1/2 left-1/2 size-1.5 bg-white rounded-full" />
                       </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-xs uppercase font-bold text-muted-foreground">Network Load Matrix</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold">
                           <span>MESH THROUGHPUT</span>
                           <span className="text-primary">42.4 TB/S</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                           <div className="h-full bg-primary animate-progress" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <p className="text-[8px] text-muted-foreground uppercase font-bold">Buffer Depth</p>
                            <p className="text-xl font-headline font-bold text-emerald-500">12ms</p>
                         </div>
                         <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <p className="text-[8px] text-muted-foreground uppercase font-bold">Packet Loss</p>
                            <p className="text-xl font-headline font-bold text-primary">0.001%</p>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card h-[600px] flex flex-col">
                <CardHeader className="pb-2 border-b border-white/5">
                  <CardTitle className="text-sm font-headline flex items-center gap-2">
                    <MessageSquare className="size-4 text-primary" />
                    Live আড্ডা ও চ্যাট
                  </CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold">Global Mesh Community</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chats.map((chat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-primary">{chat.user}</span>
                            <span className="text-[8px] text-muted-foreground font-mono">
                              {chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-snug bg-white/5 p-2 rounded border border-white/5">
                            {chat.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-white/5 bg-black/40">
                     <div className="relative">
                        <input 
                          type="text" 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Send a tactical message..." 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-primary pr-12"
                        />
                        <Button 
                          onClick={handleSendMessage}
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-primary"
                        >
                          <Send className="size-4" />
                        </Button>
                     </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                <CardHeader className="pb-2">
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 flex items-center gap-2">
                      <Clock className="size-4" />
                      Fixture Intelligence
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   {matches.map(match => (
                     <div 
                       key={match.id} 
                       onClick={() => setActiveMatch(match)}
                       className={`p-3 bg-white/5 rounded-xl border flex justify-between items-center group cursor-pointer transition-all ${activeMatch?.id === match.id ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-primary/30'}`}
                      >
                        <div className="flex items-center gap-3">
                           <div className="text-[10px] font-bold">{match.home}</div>
                           <div className="text-[8px] text-muted-foreground">vs</div>
                           <div className="text-[10px] font-bold">{match.away}</div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold">{match.score || match.time}</p>
                           <p className={`text-[8px] uppercase font-bold ${match.status === 'LIVE' ? 'text-primary animate-pulse' : 'text-muted-foreground'}`}>{match.status}</p>
                        </div>
                     </div>
                   ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isHandshaking} onOpenChange={setIsHandshaking}>
        <DialogContent className="glass-card border-primary/30 sm:max-w-[500px] bg-black">
          <DialogHeader>
            <DialogTitle className="font-headline text-xl flex items-center gap-3 text-primary uppercase">
              <Lock className="size-5" />
              Sovereign Handshake Sequence
            </DialogTitle>
          </DialogHeader>

          <div className="py-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto relative">
                <ShieldCheck className="size-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-primary font-mono text-xs animate-pulse uppercase">
                  Establishing Route... {handshakeProgress}%
                </p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${handshakeProgress}%` }} />
                </div>
              </div>
            </div>

            {handshakeProgress === 100 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                 <p className="text-[10px] text-muted-foreground font-mono leading-relaxed px-4">
                    Sovereign Intelligence Layer has established a verified route to <strong>{selectedServer?.name || "Broadcaster"}</strong>.
                 </p>
                 <Button 
                    className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    onClick={() => {
                      setIsHandshaking(false)
                      if (activeMatch?.uplink) window.open(activeMatch.uplink, '_blank')
                    }}
                 >
                    Launch Official Uplink
                 </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
