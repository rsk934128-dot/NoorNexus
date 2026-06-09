
"use client"

import { useState, useMemo, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Activity, 
  MessageSquare, 
  Zap, 
  Lock, 
  Monitor,
  ShieldCheck,
  Maximize2,
  Send,
  Cpu,
  Loader2,
  BarChart3,
  Youtube,
  Globe,
  Radio,
  ExternalLink
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
import { collection, query, orderBy, limit, addDoc } from "firebase/firestore"
import { getMatchInsight, type MatchInsightOutput } from "@/ai/flows/sports-insight-flow"
import { useToast } from "@/hooks/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SIGNAL_DATA = [
  { time: '10:00', latency: 12, load: 45 },
  { time: '10:05', latency: 15, load: 52 },
  { time: '10:10', latency: 8, load: 48 },
  { time: '10:15', latency: 11, load: 60 },
  { time: '10:20', latency: 14, load: 55 },
  { time: '10:25', latency: 9, load: 42 },
]

const DEFAULT_IMPERIAL_UPLINK = "https://www.youtube.com/live/ntjJKCjNmcE?si=ICwtstbtDqctyGMF"

export default function WorldCupPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  
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
  const [playerMode, setPlayerMode] = useState<'GATEWAY' | 'EMBED'>('EMBED')

  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      setSelectedServer(servers[0])
    }
    
    if (matches.length > 0) {
      if (!activeMatch) {
        const liveMatch = matches.find(m => m.status === 'LIVE') || matches[0]
        setActiveMatch(liveMatch)
      }
    } else if (!activeMatch) {
      setActiveMatch({
        id: "imperial-01",
        home: "SOVEREIGN",
        away: "WORLD FEED",
        status: "LIVE",
        score: "LIVE",
        uplink: DEFAULT_IMPERIAL_UPLINK,
        description: "IMPERIAL MISSION 400 UPLINK"
      })
    }
  }, [servers, matches, activeMatch, selectedServer])

  const handleLaunchUplink = () => {
    setIsHandshaking(true)
    setHandshakeProgress(0)
    const interval = setInterval(() => {
      setHandshakeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 150)
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
    setAiInsight(null)
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
        title: "Neural Link Failed",
        description: "Nora-AI is currently optimizing mesh nodes. Try later.",
        variant: "destructive"
      })
    } finally {
      setAiLoading(false)
    }
  }

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/live\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 glow-primary">
                  <Trophy className="size-7 text-primary animate-pulse" />
                </div>
                <div>
                  <h2 className="text-4xl font-headline font-bold uppercase tracking-tight text-primary">GSMIFY SOVEREIGN SPORTS</h2>
                  <p className="text-[11px] text-muted-foreground font-mono tracking-[0.5em] uppercase font-bold">MISSION 400 | WORLD CUP RELAY CENTER</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/10 text-primary border-primary/20 px-5 py-2.5 h-auto gap-2 font-bold text-sm">
                  <Radio className="size-4 animate-pulse text-destructive" />
                  MESH LATENCY: {selectedServer?.ping || "12ms"}
               </Badge>
               <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase tracking-tighter text-xs">
                  UPLINK STABILITY: 99.9%
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
              <Card className="glass-card border-white/5 overflow-hidden relative group">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2 py-4 px-6">
                  <div className="flex items-center gap-4">
                    <Badge className={`text-[10px] font-bold uppercase ${activeMatch?.status === 'LIVE' ? 'bg-destructive animate-pulse' : 'bg-muted text-muted-foreground'}`}>
                      {activeMatch?.status || 'AWAITING'}
                    </Badge>
                    <span className="text-lg font-headline font-bold uppercase tracking-widest text-white">
                      {activeMatch ? `${activeMatch.home} vs ${activeMatch.away}` : "SELECT A LIVE FEED"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPlayerMode(playerMode === 'GATEWAY' ? 'EMBED' : 'GATEWAY')}
                      className="text-[10px] border-white/10 hover:border-primary/50 gap-2 h-8"
                    >
                      <Monitor className="size-3" />
                      {playerMode === 'GATEWAY' ? "EMBED MODE" : "GATEWAY MODE"}
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-primary">
                      <Maximize2 className="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 aspect-video bg-black relative flex items-center justify-center overflow-hidden">
                  {playerMode === 'EMBED' && (activeMatch?.uplink) ? (
                    <div className="w-full h-full bg-black">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${getYoutubeId(activeMatch.uplink)}?autoplay=1&mute=0`}
                        title="Sovereign Stream Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/stadium-mesh/1200/800')] bg-cover scale-105" />
                      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
                        <div className="size-32 rounded-full border-4 border-primary/30 flex items-center justify-center animate-spin-slow bg-primary/5 backdrop-blur-sm">
                          <Youtube className="size-16 text-primary/50" />
                        </div>
                        <div className="space-y-3">
                           <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">Imperial Stream Gateway</h3>
                           <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
                             {activeMatch ? `Target: ${activeMatch.home} vs ${activeMatch.away}` : "Select a match from the feed gallery"}
                           </p>
                        </div>
                        <Button 
                          onClick={handleLaunchUplink}
                          disabled={!activeMatch}
                          className="bg-primary text-primary-foreground font-bold uppercase tracking-widest px-12 h-16 glow-primary flex items-center gap-4 text-lg hover:scale-105 transition-transform"
                        >
                          <Zap className="size-6" />
                          Establish Secure Handshake
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
                <div className="bg-muted/30 p-5 border-t border-white/5 flex flex-wrap gap-5 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                       <Globe className="size-3" />
                       UPLINK NODES:
                    </span>
                    <div className="flex gap-2">
                      {servers.length > 0 ? servers.map(s => (
                        <Button 
                          key={s.id}
                          variant={selectedServer?.id === s.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedServer(s)}
                          className={`text-[10px] h-8 px-4 border-white/10 ${selectedServer?.id === s.id ? 'bg-primary glow-primary' : ''}`}
                        >
                          {s.name}
                        </Button>
                      )) : (
                        <Badge variant="outline" className="text-[10px] border-primary/50 text-primary">GSM-NODE-01 (ACTIVE)</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleGetAiInsight}
                      disabled={aiLoading || !activeMatch}
                      className="bg-amber-500/20 text-amber-500 border border-amber-500/30 hover:bg-amber-500/30 text-[11px] h-8 gap-3 font-bold"
                    >
                      {aiLoading ? <Loader2 className="size-4 animate-spin" /> : <Cpu className="size-4" />}
                      NORA-AI ANALYSIS
                    </Button>
                  </div>
                </div>
              </Card>

              {aiInsight && (
                <Card className="glass-card border-amber-500/20 animate-in fade-in slide-in-from-top-4 overflow-hidden">
                  <div className="h-1 bg-amber-500" />
                  <CardHeader>
                    <CardTitle className="text-md font-headline text-amber-500 flex items-center gap-2 uppercase tracking-widest">
                      <Cpu className="size-5" />
                      Imperial Tactical Intelligence Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 bg-black/50 rounded-2xl border border-white/5 space-y-4">
                        <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest">Win Probability Mesh</p>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span>{activeMatch?.home}</span>
                              <span className="text-primary">{aiInsight.winProbability.home}%</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary glow-primary" style={{ width: `${aiInsight.winProbability.home}%` }} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span>{activeMatch?.away}</span>
                              <span className="text-amber-500">{aiInsight.winProbability.away}%</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: `${aiInsight.winProbability.away}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 p-5 bg-black/50 rounded-2xl border border-white/5">
                        <p className="text-[11px] text-muted-foreground uppercase font-bold mb-3 tracking-widest">Tactical Assessment</p>
                        <p className="text-xs text-muted-foreground leading-relaxed font-mono italic">"{aiInsight.tacticalAnalysis}"</p>
                      </div>
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex gap-4 items-center">
                       <ShieldCheck className="size-6 text-emerald-500" />
                       <p className="text-[11px] font-mono font-bold text-emerald-500/90 uppercase">{aiInsight.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2 tracking-widest">
                      <BarChart3 className="size-4" />
                      Uplink Signal Diagnostic
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[240px] p-5">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={SIGNAL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                        <XAxis dataKey="time" stroke="#444" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#444" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', fontSize: '11px', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="latency" stroke="var(--primary)" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="load" stroke="#fbbf24" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2 tracking-widest">
                        <ShieldCheck className="size-4 text-emerald-500" />
                        Infrastructure Compliance
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6 pt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[11px] font-bold">
                           <span className="text-muted-foreground uppercase">MESH THROUGHPUT</span>
                           <span className="text-primary">L4_SECURE_SYNCED</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                           <div className="h-full bg-primary animate-progress glow-primary" />
                        </div>
                      </div>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                         <p className="text-[9px] font-mono text-muted-foreground uppercase">NODE_IDENTITY: VERIFIED (HMAC_V4_L4)</p>
                         <p className="text-[9px] font-mono text-emerald-500 uppercase">PROTOCOL_STATUS: OPTIMIZED</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">ENCRYPTION</p>
                            <p className="text-xs font-bold text-white uppercase">AES_256_GCM</p>
                         </div>
                         <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">RELAY MODE</p>
                            <p className="text-xs font-bold text-white uppercase">MISSION_400</p>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card h-[500px] flex flex-col">
                <CardHeader className="pb-3 border-b border-white/5">
                  <CardTitle className="text-sm font-headline flex items-center gap-2 uppercase tracking-widest text-primary">
                    <MessageSquare className="size-4" />
                    Imperial Mesh Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 p-5">
                    <div className="space-y-5">
                      {chats.map((chat, i) => (
                        <div key={i} className="space-y-2 group">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-primary flex items-center gap-2">
                               <div className="size-1 bg-primary rounded-full animate-pulse" />
                               {chat.user}
                            </span>
                            <span className="text-[9px] text-muted-foreground font-mono">
                              {chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-snug bg-white/5 p-3 rounded-2xl border border-white/5 group-hover:border-primary/20 transition-colors">
                            {chat.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-5 border-t border-white/5 bg-black/40">
                     <div className="relative">
                        <input 
                          type="text" 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Broadcast signal..." 
                          className="w-full bg-background/50 border border-white/10 rounded-xl px-5 py-3.5 text-xs outline-none focus:ring-1 focus:ring-primary pr-14 font-mono"
                        />
                        <Button 
                          onClick={handleSendMessage}
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10"
                        >
                          <Send className="size-5" />
                        </Button>
                     </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5">
                <CardHeader className="pb-3">
                   <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2 tracking-[0.2em]">
                      <Radio className="size-4" />
                      Live Sovereign Feeds
                   </CardTitle>
                   <CardDescription className="text-[9px] uppercase">Automated Global Uplinks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <ScrollArea className="h-[400px]">
                   <div className="space-y-4 pr-3">
                   {matches.length > 0 ? matches.map(match => (
                     <div 
                       key={match.id} 
                       onClick={() => {
                         setActiveMatch(match)
                         setAiInsight(null)
                        }}
                       className={`p-4 bg-white/5 rounded-2xl border flex justify-between items-center group cursor-pointer transition-all duration-300 ${activeMatch?.id === match.id ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,150,255,0.15)] scale-[1.02]' : 'border-white/5 hover:border-primary/30'}`}
                      >
                        <div className="space-y-1">
                           <div className="flex items-center gap-3">
                              <span className="text-[11px] font-bold text-white uppercase">{match.home}</span>
                              <span className="text-[9px] text-muted-foreground font-mono">VS</span>
                              <span className="text-[11px] font-bold text-white uppercase">{match.away}</span>
                           </div>
                           <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-tighter truncate max-w-[120px]">{match.description || "Mission 400 Uplink"}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[11px] font-bold text-primary">{match.score || match.time}</p>
                           <div className="flex items-center gap-1.5 justify-end">
                              <div className={`size-1.5 rounded-full ${match.status === 'LIVE' ? 'bg-destructive animate-pulse' : 'bg-muted'}`} />
                              <p className={`text-[9px] uppercase font-bold ${match.status === 'LIVE' ? 'text-destructive' : 'text-muted-foreground'}`}>{match.status}</p>
                           </div>
                        </div>
                     </div>
                   )) : (
                     <p className="text-[10px] text-center text-muted-foreground font-mono py-10">AWAITING LIVE MESH DATA...</p>
                   )}
                   </div>
                   </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isHandshaking} onOpenChange={setIsHandshaking}>
        <DialogContent className="glass-card border-primary/40 sm:max-w-[550px] bg-black/95 backdrop-blur-3xl p-10">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl flex items-center gap-4 text-primary uppercase tracking-tighter">
              <Lock className="size-6" />
              Secure Sovereign Handshake
            </DialogTitle>
            <DialogDescription className="text-[11px] font-mono uppercase text-muted-foreground tracking-[0.3em] mt-2">
              ESTABLISHING ENCRYPTED UPLINK TO MISSION_400_BROADCASTER
            </DialogDescription>
          </DialogHeader>

          <div className="py-10 text-center space-y-8">
            <div className="space-y-6">
              <div className="size-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto relative border border-primary/20 glow-primary">
                <ShieldCheck className="size-12 text-primary animate-pulse" />
                <div className="absolute inset-0 border border-primary/10 rounded-3xl animate-ping" />
              </div>
              <div className="space-y-4">
                <p className="text-primary font-mono text-sm animate-pulse uppercase tracking-widest font-bold">
                  Routing Signal Through {selectedServer?.name || "Global Mesh Hub"}... {handshakeProgress}%
                </p>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-primary glow-primary transition-all duration-300" style={{ width: `${handshakeProgress}%` }} />
                </div>
              </div>
            </div>

            {handshakeProgress === 100 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
                 <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-500">
                   <p className="text-[11px] font-mono leading-relaxed uppercase font-bold">
                     Handshake Verified: Identity Match 100%. Protocol Secured for {activeMatch?.home} vs {activeMatch?.away}.
                   </p>
                 </div>
                 <Button 
                    className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-16 glow-primary flex items-center justify-center gap-4 text-lg hover:scale-[1.02] transition-transform"
                    onClick={() => {
                      setIsHandshaking(false)
                      if (activeMatch?.uplink) {
                        window.open(activeMatch.uplink, '_blank')
                      }
                    }}
                 >
                    <ExternalLink className="size-6" />
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
