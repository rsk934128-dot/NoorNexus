
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
  RefreshCw,
  Menu
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
    query(
      collection(db, "sports_matches"), 
      where("status", "in", ["LIVE", "UPCOMING"]),
      limit(20)
    ), [db])
    
  const serversQuery = useMemo(() => query(collection(db, "sports_servers")), [db])
  const chatQuery = useMemo(() => query(collection(db, "sports_chat"), orderBy("timestamp", "desc"), limit(50)), [db])

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

  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      setSelectedServer(servers[0])
    }
    
    if (matches.length > 0) {
      if (!activeMatch) {
        const liveMatch = matches.find(m => m.status === 'LIVE') || matches[0]
        setActiveMatch(liveMatch)
      } else {
        const stillExists = matches.find(m => m.id === activeMatch.id)
        if (!stillExists) {
          setActiveMatch(matches[0])
        }
      }
    } else if (!matchesLoading && !activeMatch) {
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
  }, [servers, matches, activeMatch, selectedServer, matchesLoading])

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
        // Attempt to rotate to landscape if supported (Mobile)
        if (screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock('landscape').catch(() => {
            // Silently ignore if orientation lock is not supported
          });
        }
      } else {
        await document.exitFullscreen();
        if (screen.orientation && (screen.orientation as any).unlock) {
          (screen.orientation as any).unlock();
        }
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
        <main className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col gap-6">
            <div className="flex items-center justify-between md:hidden">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="size-6" />
                </Button>
              </SidebarTrigger>
              <Badge variant="outline" className="border-primary/30 text-primary">GSMIFY L4</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="size-10 sm:size-12 bg-primary/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Trophy className="size-6 sm:size-7 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-4xl font-headline font-bold uppercase tracking-tight text-primary truncate">SOVEREIGN SPORTS</h2>
                <div className="flex items-center gap-2 overflow-hidden">
                  <p className="text-[8px] sm:text-[11px] text-muted-foreground font-mono tracking-widest uppercase truncate">MISSION 400 | WORLD CUP</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6 order-1">
              <Card ref={playerRef} className={`glass-card border-white/5 overflow-hidden relative group ${isFullscreen ? 'h-screen w-screen rounded-none z-[9999]' : ''}`}>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 bg-white/2 py-3 px-4 sm:px-6 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge className={`text-[8px] sm:text-[10px] font-bold uppercase ${activeMatch?.status === 'LIVE' ? 'bg-destructive animate-pulse' : 'bg-muted'}`}>
                      {activeMatch?.status || 'AWAITING'}
                    </Badge>
                    <span className="text-sm sm:text-lg font-headline font-bold uppercase tracking-widest text-white truncate">
                      {activeMatch ? `${activeMatch.home} vs ${activeMatch.away}` : "SELECT FEED"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPlayerMode(playerMode === 'GATEWAY' ? 'EMBED' : 'GATEWAY')}
                      className="text-[9px] sm:text-[10px] border-white/10 h-8 flex-1 sm:w-auto"
                    >
                      <Monitor className="size-3 mr-2" />
                      {playerMode === 'GATEWAY' ? "EMBED" : "GATEWAY"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={togglePlayerFullscreen}
                      className="text-[9px] sm:text-[10px] border-primary/30 text-primary h-8 w-10 p-0"
                    >
                      {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className={`p-0 aspect-video bg-black relative ${isFullscreen ? 'h-[calc(100vh-60px)] aspect-auto' : ''}`}>
                  {playerMode === 'EMBED' && (activeMatch?.uplink) ? (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${getYoutubeId(activeMatch.uplink)}?autoplay=1&mute=0`}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-8 text-center p-4">
                      <Youtube className="size-12 sm:size-16 text-primary/50" />
                      <Button onClick={handleLaunchUplink} className="bg-primary text-primary-foreground font-bold h-12 sm:h-16 px-6 sm:px-12 text-sm sm:text-lg glow-primary">
                        <Zap className="size-5 sm:size-6 mr-2" /> INITIATE HANDSHAKE
                      </Button>
                    </div>
                  )}
                </CardContent>
                {!isFullscreen && (
                  <div className="bg-muted/30 p-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase">MESH STATUS:</span>
                      {servers.slice(0, 3).map(s => (
                        <Badge key={s.id} variant="outline" className={`text-[8px] ${selectedServer?.id === s.id ? 'border-primary text-primary' : ''}`}>
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                    <Button onClick={handleGetAiInsight} disabled={aiLoading} className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] h-9 w-full sm:w-auto">
                      {aiLoading ? <Loader2 className="size-3 animate-spin mr-2" /> : <Cpu className="size-3 mr-2" />}
                      NORA-AI INSIGHT
                    </Button>
                  </div>
                )}
              </Card>

              {aiInsight && !isFullscreen && (
                <Card className="glass-card border-amber-500/20 animate-in fade-in slide-in-from-bottom-2">
                  <CardHeader className="py-4 px-5">
                    <CardTitle className="text-xs font-headline text-amber-500 flex items-center gap-2 uppercase">
                      <Cpu className="size-4" /> Tactical Intelligence Dispatch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 space-y-4">
                     <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                           <p className="text-[8px] text-muted-foreground uppercase">{activeMatch?.home}</p>
                           <p className="text-xl font-bold text-primary">{aiInsight.winProbability.home}%</p>
                        </div>
                        <div className="space-y-1 text-center">
                           <p className="text-[8px] text-muted-foreground uppercase">Draw</p>
                           <p className="text-xl font-bold text-muted-foreground">{aiInsight.winProbability.draw}%</p>
                        </div>
                        <div className="space-y-1 text-right">
                           <p className="text-[8px] text-muted-foreground uppercase">{activeMatch?.away}</p>
                           <p className="text-xl font-bold text-amber-500">{aiInsight.winProbability.away}%</p>
                        </div>
                     </div>
                     <div className="p-3 bg-black/40 rounded border border-white/5">
                        <p className="text-[10px] text-muted-foreground font-mono leading-relaxed italic">"{aiInsight.tacticalAnalysis}"</p>
                     </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6 order-2">
              <Card className="glass-card h-[400px] sm:h-[500px] flex flex-col">
                <CardHeader className="py-3 px-4 border-b border-white/5">
                  <CardTitle className="text-xs font-headline text-primary flex items-center gap-2 uppercase">
                    <MessageSquare className="size-4" /> MESH CHAT
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chats.map((chat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <span className="text-primary font-bold">{chat.user}</span>
                            <span className="text-muted-foreground">
                              {chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground bg-white/5 p-2 rounded-lg border border-white/5">
                            {chat.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-white/5">
                     <div className="relative">
                        <input 
                          type="text" 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Broadcast message..." 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-2.5 text-[10px] outline-none pr-10"
                        />
                        <Button onClick={handleSendMessage} variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-primary">
                          <Send className="size-4" />
                        </Button>
                     </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="py-3 px-4">
                   <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                      <Radio className="size-4" /> LIVE FEEDS
                   </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                   <ScrollArea className="h-[300px]">
                   <div className="space-y-3">
                   {matchesLoading ? (
                     <div className="flex flex-col items-center py-10 gap-2">
                        <Loader2 className="size-5 animate-spin text-primary" />
                        <p className="text-[8px] font-mono text-muted-foreground uppercase">Syncing mesh...</p>
                     </div>
                   ) : matches.map(match => (
                     <div 
                       key={match.id} 
                       onClick={() => {
                         setActiveMatch(match)
                         setAiInsight(null)
                        }}
                       className={`p-3 bg-white/5 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${activeMatch?.id === match.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-white/5 hover:border-white/20'}`}
                      >
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-bold text-white uppercase">{match.home} vs {match.away}</p>
                           <p className="text-[8px] text-muted-foreground font-mono uppercase truncate max-w-[100px]">{match.status}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-primary">{match.score || "0-0"}</p>
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
        <DialogContent className="glass-card border-primary/40 w-[95vw] sm:max-w-[500px] bg-black/95 p-6 sm:p-10">
          <div className="py-6 sm:py-10 text-center space-y-6 sm:space-y-8">
            <div className="size-16 sm:size-24 bg-primary/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto border border-primary/20 glow-primary">
              <ShieldCheck className="size-10 sm:size-12 text-primary animate-pulse" />
            </div>
            <div className="space-y-4">
              <p className="text-primary font-mono text-xs sm:text-sm animate-pulse uppercase tracking-widest font-bold">
                {handshakeProgress < 100 ? `VERIFYING MESH... ${handshakeProgress}%` : 'IDENTITY VERIFIED'}
              </p>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary glow-primary transition-all duration-300" style={{ width: `${handshakeProgress}%` }} />
              </div>
            </div>
            {handshakeProgress === 100 && (
              <div className="space-y-4 animate-in zoom-in duration-500">
                <p className="text-[10px] text-muted-foreground font-mono uppercase">Cryptographic signature valid for 5 minutes.</p>
                <Button 
                  className="w-full bg-primary text-primary-foreground font-bold h-12 sm:h-16 glow-primary text-sm sm:text-lg"
                  onClick={() => {
                    setIsHandshaking(false)
                    if (activeMatch?.uplink) window.open(activeMatch.uplink, '_blank')
                  }}
                >
                  <ExternalLink className="size-5 sm:size-6 mr-3" /> LAUNCH UPLINK
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
