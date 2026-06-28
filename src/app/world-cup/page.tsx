"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
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
  Minimize2,
  Send,
  Cpu,
  Loader2,
  BarChart3,
  Youtube,
  Globe,
  Radio,
  ExternalLink,
  RefreshCcw,
  Menu,
  ChevronRight
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
import { collection, query, orderBy, limit, addDoc, where } from "firebase/firestore"
import { getMatchInsight, type MatchInsightOutput } from "@/ai/flows/sports-insight-flow"
import { useToast } from "@/hooks/use-toast"

const DEFAULT_IMPERIAL_UPLINK = "https://www.youtube.com/live/ntjJKCjNmcE?si=ICwtstbtDqctyGMF"

export default function WorldCupPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const playerRef = useRef<HTMLDivElement>(null)
  
  const matchesQuery = useMemo(() => 
    db ? query(
      collection(db, "sports_matches"), 
      where("status", "in", ["LIVE", "UPCOMING"]),
      limit(20)
    ) : null, [db])
    
  const serversQuery = useMemo(() => db ? query(collection(db, "sports_servers")) : null, [db])
  const chatQuery = useMemo(() => db ? query(collection(db, "sports_chat"), orderBy("timestamp", "desc"), limit(50)) : null, [db])

  const { data: matches, loading: matchesLoading } = useCollection<any>(matchesQuery)
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
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Stabilized Server Selection
  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      setSelectedServer(servers[0])
    }
  }, [servers, selectedServer])

  // Stabilized Active Match Selection to avoid loops
  useEffect(() => {
    if (matchesLoading) return;

    if (matches.length > 0) {
      if (!activeMatch) {
        const liveMatch = matches.find(m => m.status === 'LIVE') || matches[0]
        setActiveMatch(liveMatch)
      } else {
        const stillExists = matches.find(m => m.id === activeMatch.id)
        if (!stillExists && activeMatch.id !== "imperial-default") {
          setActiveMatch(matches[0])
        }
      }
    } else if (!activeMatch) {
      setActiveMatch({
        id: "imperial-default",
        home: "SOVEREIGN",
        away: "WORLD FEED",
        status: "LIVE",
        score: "LIVE",
        uplink: DEFAULT_IMPERIAL_UPLINK,
        description: "IMPERIAL MISSION 400 UPLINK"
      })
    }
  }, [matches, activeMatch, matchesLoading])

  // Monitor Fullscreen Changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const togglePlayerFullscreen = async () => {
    if (!playerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        if (window.screen.orientation && (window.screen.orientation as any).lock) {
          (window.screen.orientation as any).lock("landscape").catch(() => {});
        }
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        if (window.screen.orientation && (window.screen.orientation as any).unlock) {
          (window.screen.orientation as any).unlock();
        }
        setIsFullscreen(false);
      }
    } catch (e: any) {
      toast({ title: "Imperial Overlay Error", description: e.message, variant: "destructive" });
    }
  }

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
    }, 100)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim() || !user || !db) return
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
      if (insight) {
        setAiInsight(insight)
      } else {
        throw new Error("AI returned empty insight")
      }
    } catch (error: any) {
      toast({
        title: "Neural Link Failure",
        description: error.message || "Failed to generate tactical analysis.",
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
        <main className="p-3 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center justify-between md:hidden">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="text-primary -ml-2 h-10 w-10">
                  <Menu className="size-6" />
                </Button>
              </SidebarTrigger>
              <Badge variant="outline" className="border-primary/30 text-primary text-[8px] uppercase font-bold tracking-widest">GSMIFY L4</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="size-10 sm:size-12 bg-primary/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Trophy className="size-6 sm:size-7 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-4xl font-headline font-bold uppercase tracking-tight text-primary truncate">SOVEREIGN SPORTS</h2>
                <div className="flex items-center gap-2 overflow-hidden">
                  <p className="text-[9px] sm:text-[11px] text-muted-foreground font-mono tracking-widest uppercase truncate">MISSION 400 | WORLD CUP</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6 order-1">
              <Card ref={playerRef} className={`glass-card border-white/5 overflow-hidden relative group ${isFullscreen ? 'h-screen w-screen rounded-none z-[9999] bg-black flex flex-col items-center justify-center' : ''}`}>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 bg-white/2 py-3 px-4 sm:px-6 gap-3 w-full">
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge className={`text-[8px] sm:text-[10px] font-bold uppercase ${activeMatch?.status === 'LIVE' ? 'bg-destructive animate-pulse' : 'bg-muted'}`}>
                      {activeMatch?.status || 'AWAITING'}
                    </Badge>
                    <span className="text-xs sm:text-lg font-headline font-bold uppercase tracking-widest text-white truncate">
                      {activeMatch ? `${activeMatch.home} vs ${activeMatch.away}` : "SELECT FEED"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPlayerMode(playerMode === 'GATEWAY' ? 'EMBED' : 'GATEWAY')}
                      className="text-[9px] sm:text-[10px] border-white/10 h-9 flex-1 sm:w-auto font-bold uppercase"
                    >
                      <Monitor className="size-3.5 mr-2" />
                      {playerMode === 'GATEWAY' ? "EMBED" : "GATEWAY"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={togglePlayerFullscreen}
                      className="text-[10px] border-primary/30 text-primary h-9 w-10 p-0"
                    >
                      {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className={`p-0 aspect-video bg-black relative w-full ${isFullscreen ? 'flex-1 aspect-auto' : ''}`}>
                  {playerMode === 'EMBED' && (activeMatch?.uplink) ? (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${getYoutubeId(activeMatch.uplink)}?autoplay=1&mute=0`}
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; orientation-lock"
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-8 text-center p-4">
                      <Youtube className="size-12 sm:size-16 text-primary/30" />
                      <Button onClick={handleLaunchUplink} className="bg-primary text-primary-foreground font-bold h-14 sm:h-16 px-8 sm:px-12 text-xs sm:text-lg glow-primary">
                        <Zap className="size-5 sm:size-6 mr-2" /> INITIATE HANDSHAKE
                      </Button>
                    </div>
                  )}
                </CardContent>
                {!isFullscreen && (
                  <div className="bg-muted/30 p-4 sm:p-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <span className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">MESH STATUS:</span>
                      {servers.slice(0, 2).map(s => (
                        <Badge key={s.id} variant="outline" className={`text-[8px] sm:text-[9px] h-6 px-3 ${selectedServer?.id === s.id ? 'border-primary text-primary' : 'border-white/10'}`}>
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                    <Button onClick={handleGetAiInsight} disabled={aiLoading} className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] sm:text-[11px] h-10 w-full sm:w-auto uppercase font-bold tracking-widest glow-emerald">
                      {aiLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Cpu className="size-4 mr-2" />}
                      NORA-AI INSIGHT
                    </Button>
                  </div>
                )}
              </Card>

              {aiInsight && !isFullscreen && (
                <Card className="glass-card border-amber-500/20 animate-in fade-in slide-in-from-bottom-2 overflow-hidden shadow-2xl">
                  <CardHeader className="py-4 sm:py-4 px-4 sm:px-6 border-b border-white/5 bg-amber-500/5">
                    <CardTitle className="text-[10px] sm:text-xs font-headline text-amber-500 flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Cpu className="size-4" /> Tactical Intelligence Dispatch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-6 pt-6 space-y-5">
                     <div className="grid grid-cols-3 gap-6 text-center">
                        <div className="space-y-1">
                           <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{activeMatch?.home}</p>
                           <p className="text-xl sm:text-3xl font-black text-primary tracking-tighter">{aiInsight.winProbability.home}%</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Draw</p>
                           <p className="text-xl sm:text-3xl font-black text-muted-foreground tracking-tighter">{aiInsight.winProbability.draw}%</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{activeMatch?.away}</p>
                           <p className="text-xl sm:text-3xl font-black text-amber-500 tracking-tighter">{aiInsight.winProbability.away}%</p>
                        </div>
                     </div>
                     <div className="p-4 bg-black/60 rounded-2xl border border-white/5 shadow-inner">
                        <p className="text-[11px] sm:text-[13px] text-muted-foreground font-mono leading-relaxed italic">"{aiInsight.tacticalAnalysis}"</p>
                     </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6 order-2">
              {/* Mesh Chat */}
              <Card className="glass-card h-[400px] sm:h-[550px] flex flex-col overflow-hidden shadow-2xl">
                <CardHeader className="py-4 px-5 border-b border-white/5 bg-white/2">
                  <CardTitle className="text-[10px] sm:text-xs font-headline text-primary flex items-center gap-2 uppercase tracking-widest">
                    <MessageSquare className="size-4" /> MESH CHAT
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-5 pb-4">
                      {chats.map((chat, i) => (
                        <div key={i} className="space-y-1.5 animate-in fade-in slide-in-from-bottom-1 duration-300">
                          <div className="flex items-center justify-between text-[8px] font-mono px-1">
                            <span className="text-primary font-bold uppercase tracking-widest">{chat.user}</span>
                            <span className="text-muted-foreground opacity-50">
                              {chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                            </span>
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-white/90 bg-white/5 p-3 rounded-2xl border border-white/5 leading-relaxed shadow-sm">
                            {chat.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-white/5 bg-black/40">
                     <div className="relative group">
                        <input 
                          type="text" 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Broadcast message..." 
                          className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-[11px] outline-none pr-12 focus:ring-1 focus:ring-primary transition-all group-focus-within:border-primary/50"
                        />
                        <Button onClick={handleSendMessage} variant="ghost" size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 text-primary size-9 hover:bg-primary/10">
                          <Send className="size-4" />
                        </Button>
                     </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Feeds List */}
              <Card className="glass-card overflow-hidden shadow-2xl border-l-4 border-l-primary">
                <CardHeader className="py-4 px-5 border-b border-white/5 bg-white/2">
                   <CardTitle className="text-[10px] sm:text-xs uppercase font-bold text-primary flex items-center gap-2 tracking-widest">
                      <Radio className="size-4" /> LIVE FEEDS
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                   <ScrollArea className="h-[250px] sm:h-[300px]">
                   <div className="space-y-3 pr-2">
                   {matchesLoading ? (
                     <div className="flex flex-col items-center py-10 gap-3">
                        <Loader2 className="size-6 animate-spin text-primary" />
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Syncing mesh...</p>
                     </div>
                   ) : matches.map(match => (
                     <div 
                       key={match.id} 
                       onClick={() => {
                         setActiveMatch(match)
                         setAiInsight(null)
                        }}
                       className={`p-3.5 bg-white/2 rounded-2xl border flex justify-between items-center cursor-pointer transition-all duration-300 ${activeMatch?.id === match.id ? 'border-primary bg-primary/10 shadow-lg scale-[1.02]' : 'border-white/5 hover:border-white/20'}`}
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                           <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase truncate pr-3">{match.home} vs {match.away}</p>
                           <div className="flex items-center gap-2.5">
                              <div className={`size-1.5 rounded-full ${match.status === 'LIVE' ? 'bg-destructive animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-muted'}`} />
                              <p className="text-[8px] sm:text-[9px] text-muted-foreground font-mono uppercase truncate">{match.status}</p>
                           </div>
                        </div>
                        <div className="text-right shrink-0">
                           <Badge variant="secondary" className="bg-black/40 text-primary font-mono text-[10px] sm:text-[11px] font-black h-7 px-3">{match.score || "0-0"}</Badge>
                        </div>
                     </div>
                   ))}
                   </div>
                   </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isHandshaking} onOpenChange={setIsHandshaking}>
        <DialogContent className="glass-card border-primary/40 w-[92vw] sm:max-w-[500px] bg-black/95 p-8 sm:p-12 rounded-[2rem] shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Handshake Initiation</DialogTitle>
            <DialogDescription>Verifying secure link with the sports node.</DialogDescription>
          </DialogHeader>
          <div className="py-6 sm:py-10 text-center space-y-8 sm:space-y-12">
            <div className="size-20 sm:size-28 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 glow-primary">
              <ShieldCheck className="size-12 sm:size-16 text-primary animate-pulse" />
            </div>
            <div className="space-y-6">
              <p className="text-primary font-mono text-xs sm:text-sm animate-pulse uppercase tracking-[0.3em] font-bold">
                {handshakeProgress < 100 ? `VERIFYING MESH... ${handshakeProgress}%` : 'IDENTITY VERIFIED'}
              </p>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary glow-primary transition-all duration-300" style={{ width: `${handshakeProgress}%` }} />
              </div>
            </div>
            {handshakeProgress === 100 && (
              <div className="space-y-6 animate-in zoom-in duration-500">
                <p className="text-[9px] sm:text-[11px] text-muted-foreground font-mono uppercase leading-relaxed italic">
                   "Handshake established. Signal routed through Imperial Canal SG-01."
                </p>
                <Button 
                  className="w-full bg-primary text-primary-foreground font-black h-14 sm:h-16 glow-primary text-sm sm:text-lg uppercase tracking-[0.2em] rounded-2xl"
                  onClick={() => {
                    setIsHandshaking(false)
                    if (activeMatch?.uplink) window.open(activeMatch.uplink, '_blank')
                  }}
                >
                  <ExternalLink className="size-5 sm:size-7 mr-3" /> LAUNCH UPLINK
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
