
"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Tv, 
  Signal, 
  Globe, 
  PlayCircle, 
  Activity, 
  MessageSquare, 
  Zap, 
  Lock, 
  Monitor,
  BarChart3,
  ExternalLink,
  Clock,
  ShieldCheck,
  Radio,
  Wifi,
  Settings2,
  Maximize2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const servers = [
  { id: "S1", name: "Sovereign HD-1", status: "Optimal", ping: "8ms", load: "12%" },
  { id: "S2", name: "Global Cloud TV", status: "Stable", ping: "45ms", load: "45%" },
  { id: "S3", name: "Mesh Relay A", status: "Active", ping: "120ms", load: "8%" },
]

const resolutions = ["360p", "720p HD", "1080p FHD", "4K Ultra"]

const initialChats = [
  { user: "Imperial_Root", message: "GOAL!!! What a strike!", time: "18:42" },
  { user: "Node_Observer", message: "The defense is looking shaky.", time: "18:43" },
  { user: "Treasury_Admin", message: "Switching to Server 1 for better bitrate.", time: "18:44" },
  { user: "Cyber_Guard", message: "Handshake verified. 4K stream stable.", time: "18:45" },
]

const todaysMatches = [
  { id: 1, home: "KSA", away: "SEN", time: "6:00 PM", score: "0 - 0", status: "LIVE", uplink: "https://www.tsports.com/live" },
  { id: 2, home: "POR", away: "NGA", time: "8:45 PM", score: "VS", status: "UPCOMING", uplink: "https://toffeelive.com/live-tv" },
  { id: 3, home: "ARG", away: "ISL", time: "9:00 PM", score: "VS", status: "UPCOMING", uplink: "https://toffeelive.com/live-tv" },
]

export default function WorldCupPage() {
  const [activeSignal, setActiveSignal] = useState(98.4)
  const [isHandshaking, setIsHandshaking] = useState(false)
  const [selectedServer, setSelectedServer] = useState(servers[0])
  const [quality, setQuality] = useState("1080p FHD")
  const [handshakeProgress, setHandshakeProgress] = useState(0)
  const [chats, setChats] = useState(initialChats)
  const [playerMode, setPlayerMode] = useState<"IFRAME" | "EXO">("IFRAME")

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal(prev => Math.min(100, Math.max(95, prev + (Math.random() * 0.4 - 0.2))))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleLaunchUplink = () => {
    setIsHandshaking(true)
    setHandshakeProgress(0)
    const progressInterval = setInterval(() => {
      setHandshakeProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 150)
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
                  MESH LATENCY: {selectedServer.ping}
               </Badge>
               <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase tracking-tighter">
                  SIGNAL: {activeSignal.toFixed(1)}%
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Video & Controls Section */}
            <div className="xl:col-span-3 space-y-6">
              <Card className="glass-card border-white/5 overflow-hidden relative group">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2 py-3 px-6">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-[10px] border-primary/50 text-primary font-bold">LIVE STREAM</Badge>
                    <span className="text-sm font-headline font-bold">SAUDI ARABIA vs SENEGAL</span>
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
                  {/* Tactical Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none opacity-50">
                    <div className="font-mono text-[10px] text-primary space-y-1">
                      <p>DECODING: AES_256_GCM</p>
                      <p>BITRATE: 18.4 MBPS</p>
                    </div>
                    <div className="font-mono text-[10px] text-primary text-right space-y-1">
                      <p>PROTOCOL: HMAC_V4_L4</p>
                      <p>RELAY: {selectedServer.id}</p>
                    </div>
                  </div>
                </CardContent>
                <div className="bg-muted/30 p-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Server:</span>
                    <div className="flex gap-2">
                      {servers.map(s => (
                        <Button 
                          key={s.id}
                          variant={selectedServer.id === s.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedServer(s)}
                          className="text-[10px] h-7 px-3 border-white/10"
                        >
                          {s.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Quality:</span>
                    <div className="flex gap-2">
                      {resolutions.map(res => (
                        <Button 
                          key={res}
                          variant={quality === res ? "secondary" : "ghost"}
                          size="sm"
                          onClick={() => setQuality(res)}
                          className="text-[10px] h-7 px-3 text-muted-foreground hover:text-primary"
                        >
                          {res}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Match Visualizer & Stats */}
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
                          {/* Simulated Players */}
                          <div className="absolute top-1/4 left-1/3 size-2 bg-primary rounded-full glow-primary animate-pulse" />
                          <div className="absolute top-2/3 right-1/4 size-2 bg-amber-500 rounded-full animate-bounce" />
                          <div className="absolute top-1/2 left-1/2 size-1.5 bg-white rounded-full" />
                       </div>
                       <div className="absolute bottom-2 left-0 right-0 text-center text-[8px] font-mono text-emerald-500/50 uppercase">
                          NoorNexus Real-Time Visualizer
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
                      <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                         <ShieldCheck className="size-4 text-primary" />
                         <p className="text-[9px] font-mono leading-tight">
                            Zero-Trust decryption enabled for all {quality} packets. Session signed by Root Hub.
                         </p>
                      </div>
                   </CardContent>
                </Card>
              </div>
            </div>

            {/* Live Chat & Community Sidebar */}
            <div className="space-y-6">
              <Card className="glass-card h-[600px] flex flex-col">
                <CardHeader className="pb-2 border-b border-white/5">
                  <CardTitle className="text-sm font-headline flex items-center gap-2">
                    <MessageSquare className="size-4 text-primary" />
                    Live আড্ডা ও চ্যাট
                  </CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold">42.8M Active Mesh Users</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chats.map((chat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-primary">{chat.user}</span>
                            <span className="text-[8px] text-muted-foreground font-mono">{chat.time}</span>
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
                          placeholder="Send a tactical message..." 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-primary pr-12"
                        />
                        <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-primary">
                          <Zap className="size-4" />
                        </Button>
                     </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                <CardHeader className="pb-2">
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 flex items-center gap-2">
                      <Clock className="size-4" />
                      Upcoming Fixtures
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   {todaysMatches.slice(1).map(match => (
                     <div key={match.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group hover:border-amber-500/30 transition-all">
                        <div className="flex items-center gap-3">
                           <div className="text-[10px] font-bold">{match.home}</div>
                           <div className="text-[8px] text-muted-foreground">vs</div>
                           <div className="text-[10px] font-bold">{match.away}</div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold">{match.time}</p>
                           <p className="text-[8px] text-muted-foreground uppercase">{match.status}</p>
                        </div>
                     </div>
                   ))}
                   <Button variant="ghost" className="w-full h-8 mt-2 text-[9px] uppercase font-bold text-muted-foreground hover:text-amber-500">
                      View Full Schedule
                   </Button>
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
            <DialogDescription className="text-muted-foreground font-mono text-[9px] uppercase tracking-[0.3em]">
               Protocol: HMAC_V4 Secure Redirection
            </DialogDescription>
          </DialogHeader>

          <div className="py-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto relative">
                <ShieldCheck className="size-8 text-primary animate-pulse" />
                <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping" />
              </div>
              <div className="space-y-2">
                <p className="text-primary font-mono text-xs animate-pulse uppercase">
                  {handshakeProgress < 100 ? `Verifying Broadcaster Mesh... ${handshakeProgress}%` : "Compliance Verified"}
                </p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${handshakeProgress}%` }} />
                </div>
              </div>
            </div>

            {handshakeProgress === 100 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                 <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2 text-left">
                    <h3 className="text-sm font-headline font-bold text-emerald-500 uppercase">Secure Handshake Complete</h3>
                    <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                       Sovereign Intelligence Layer has established a verified route to <strong>{selectedServer.name}</strong>. 
                       To maintain 8ms latency and legal integrity, launch official terminal.
                    </p>
                 </div>
                 <Button 
                    className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                    asChild
                    onClick={() => setIsHandshaking(false)}
                 >
                    <a href="https://www.tsports.com/live" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                       <ExternalLink className="size-5" /> Launch Official Uplink
                    </a>
                 </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

