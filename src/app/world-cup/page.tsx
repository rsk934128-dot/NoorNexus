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
  ChevronRight,
  ArrowLeft,
  Sparkles
} from "lucide-react"
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
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
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

  // Stabilized Active Match Selection
  useEffect(() => {
    if (matchesLoading) return;
    if (matches.length > 0) {
      if (!activeMatch) {
        const liveMatch = matches.find(m => m.status === 'LIVE') || matches[0]
        setActiveMatch(liveMatch)
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

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const togglePlayerFullscreen = async () => {
    if (!playerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e: any) {
      toast({ title: "Imperial Overlay Error", description: e.message, variant: "destructive" });
    }
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
      setAiInsight(insight)
    } catch (error: any) {
      toast({ title: "Neural Link Failure", description: error.message, variant: "destructive" })
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
      {!isFullscreen && <AppSidebar />}
      <SidebarInset>
        <main className="p-3 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto w-full">
          {!isFullscreen && (
            <header className="flex items-center gap-3">
              <div className="size-10 sm:size-12 bg-primary/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Trophy className="size-6 sm:size-7 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-4xl font-headline font-bold uppercase tracking-tight text-primary truncate">SOVEREIGN SPORTS</h2>
                <p className="text-[9px] sm:text-[11px] text-muted-foreground font-mono tracking-widest uppercase">MISSION 400 | WORLD CUP</p>
              </div>
            </header>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
              <Card ref={playerRef} className={`glass-card border-white/5 overflow-hidden relative group ${isFullscreen ? 'fixed inset-0 h-screen w-screen rounded-none z-[9999] bg-black' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2 py-3 px-4 sm:px-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge className={`text-[8px] sm:text-[10px] ${activeMatch?.status === 'LIVE' ? 'bg-destructive animate-pulse' : 'bg-muted'}`}>
                      {activeMatch?.status || 'AWAITING'}
                    </Badge>
                    <span className="text-xs sm:text-lg font-headline font-bold uppercase tracking-widest text-white truncate">
                      {activeMatch ? `${activeMatch.home} vs ${activeMatch.away}` : "SELECT FEED"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPlayerMode(playerMode === 'GATEWAY' ? 'EMBED' : 'GATEWAY')}
                      className="text-[9px] border-white/10 h-8"
                    >
                      <Monitor className="size-3 mr-2" /> {playerMode === 'GATEWAY' ? "EMBED" : "GATEWAY"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={togglePlayerFullscreen} className="h-8 w-8 p-0">
                      {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className={`p-0 bg-black relative w-full ${isFullscreen ? 'h-full' : 'aspect-video'}`}>
                  {activeMatch?.uplink && (
                    <iframe 
                      ref={iframeRef}
                      src={`https://www.youtube.com/embed/${getYoutubeId(activeMatch.uplink)}?autoplay=1&rel=0&modestbranding=1`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  )}
                </CardContent>
                {!isFullscreen && (
                  <div className="bg-muted/30 p-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[8px] font-bold text-muted-foreground uppercase">MESH STATUS:</span>
                      {servers.slice(0, 2).map(s => (
                        <Badge key={s.id} variant="outline" className={`text-[8px] ${selectedServer?.id === s.id ? 'border-primary text-primary' : 'border-white/10'}`}>
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                    <Button onClick={handleGetAiInsight} disabled={aiLoading} className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] h-9 w-full sm:w-auto uppercase font-bold tracking-widest glow-emerald">
                      {aiLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Cpu className="size-4 mr-2" />}
                      NORA-AI INSIGHT
                    </Button>
                  </div>
                )}
              </Card>

              {aiInsight && !isFullscreen && (
                <Card className="glass-card border-amber-500/20 animate-in fade-in slide-in-from-bottom-2">
                  <CardHeader className="py-3 px-6 border-b border-white/5 bg-amber-500/5">
                    <CardTitle className="text-xs font-headline text-amber-500 flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Cpu className="size-4" /> Tactical Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                           <p className="text-[9px] text-muted-foreground uppercase font-bold">{activeMatch?.home}</p>
                           <p className="text-2xl font-black text-primary">{aiInsight.winProbability.home}%</p>
                        </div>
                        <div>
                           <p className="text-[9px] text-muted-foreground uppercase font-bold">Draw</p>
                           <p className="text-2xl font-black text-muted-foreground">{aiInsight.winProbability.draw}%</p>
                        </div>
                        <div>
                           <p className="text-[9px] text-muted-foreground uppercase font-bold">{activeMatch?.away}</p>
                           <p className="text-2xl font-black text-amber-500">{aiInsight.winProbability.away}%</p>
                        </div>
                     </div>
                     <p className="text-xs text-muted-foreground font-mono leading-relaxed italic">"{aiInsight.tacticalAnalysis}"</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {!isFullscreen && (
              <div className="space-y-6">
                <Card className="glass-card h-[450px] flex flex-col overflow-hidden">
                  <CardHeader className="py-3 px-5 border-b border-white/5 bg-white/2">
                    <CardTitle className="text-[10px] font-headline text-primary flex items-center gap-2 uppercase tracking-widest">
                      <MessageSquare className="size-4" /> MESH CHAT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {chats.map((chat, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-[8px] font-mono opacity-50">
                              <span className="text-primary font-bold">{chat.user}</span>
                              <span>{chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString() : ""}</span>
                            </div>
                            <div className="text-[10px] text-white/80 bg-white/5 p-2 rounded-xl border border-white/5">
                              {chat.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-3 border-t border-white/5 bg-black/40">
                       <div className="relative">
                          <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Send message..." 
                            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-[10px] outline-none pr-10 focus:ring-1 focus:ring-primary"
                          />
                          <Button onClick={handleSendMessage} variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-primary size-8">
                            <Send className="size-3" />
                          </Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-l-4 border-l-primary">
                  <CardHeader className="py-3 px-5 border-b border-white/5 bg-white/2">
                    <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                        <Radio className="size-4" /> LIVE FEEDS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    {matches.map(match => (
                      <div 
                        key={match.id} 
                        onClick={() => setActiveMatch(match)}
                        className={`p-2.5 rounded-lg border flex justify-between items-center cursor-pointer transition-all mb-1 ${activeMatch?.id === match.id ? 'border-primary bg-primary/10' : 'border-white/5 hover:bg-white/5'}`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold text-white uppercase truncate">{match.home} vs {match.away}</p>
                            <p className="text-[8px] text-muted-foreground uppercase">{match.status}</p>
                          </div>
                          <Badge variant="secondary" className="bg-black/40 text-primary font-mono text-[10px]">{match.score || "0-0"}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
