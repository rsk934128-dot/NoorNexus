
"use client"

import { useState, useEffect } from "react"
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
  Users, 
  Zap, 
  Lock, 
  Eye,
  BarChart3,
  ChevronRight,
  Maximize2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const channels = [
  { 
    id: 1, 
    name: "T Sports Live", 
    origin: "Bangladesh", 
    status: "Operational", 
    quality: "4K Native", 
    type: "Local", 
    freq: "12.4 GHz",
    streamUrl: "https://www.youtube.com/embed/j_n40F47NGE" // Example high-quality sports content
  },
  { 
    id: 2, 
    name: "GTV Sports", 
    origin: "Bangladesh", 
    status: "Operational", 
    quality: "HD+", 
    type: "Local", 
    freq: "11.2 GHz",
    streamUrl: "https://www.youtube.com/embed/4z958n8P1uE"
  },
  { 
    id: 3, 
    name: "Star Sports 1", 
    origin: "International", 
    status: "Operational", 
    quality: "Ultra HD", 
    type: "Foreign", 
    freq: "14.1 GHz",
    streamUrl: "https://www.youtube.com/embed/9XInD-eXvN0"
  },
  { 
    id: 4, 
    name: "Sony Sports Network", 
    origin: "International", 
    status: "Operational", 
    quality: "HD", 
    type: "Foreign", 
    freq: "13.8 GHz",
    streamUrl: "https://www.youtube.com/embed/videoseries?list=PLpA-pGst005YQWv0-eFmE4HqY13uHAnYn"
  },
  { 
    id: 5, 
    name: "Willow Cricket", 
    origin: "USA/Global", 
    status: "Operational", 
    quality: "HD", 
    type: "Foreign", 
    freq: "15.2 GHz",
    streamUrl: "https://www.youtube.com/embed/live_stream?channel=UC8W0G2v-Lg7XmI-6Xp9Wp9A"
  },
  { 
    id: 6, 
    name: "Sky Sports Cricket", 
    origin: "UK", 
    status: "Operational", 
    quality: "4K Native", 
    type: "Foreign", 
    freq: "12.9 GHz",
    streamUrl: "https://www.youtube.com/embed/videoseries?list=PLvG2S5_G_lV-wXo9KInoYlU_0S1I0s0Xy"
  },
  { 
    id: 7, 
    name: "SuperSport Live", 
    origin: "South Africa", 
    status: "Operational", 
    quality: "HD+", 
    type: "Foreign", 
    freq: "14.5 GHz",
    streamUrl: "https://www.youtube.com/embed/live_stream?channel=UC_p61_O_WkI_9yH_V_0zM9A"
  },
  { 
    id: 8, 
    name: "BTV Sports", 
    origin: "Bangladesh", 
    status: "Operational", 
    quality: "Standard", 
    type: "Local", 
    freq: "10.1 GHz",
    streamUrl: "https://www.youtube.com/embed/live_stream?channel=UCoKj6uS9D1X5l_Yp9X_fXiw"
  },
]

export default function WorldCupPage() {
  const [activeSignal, setActiveSignal] = useState(94)
  const [isWatching, setIsWatching] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<typeof channels[0] | null>(null)
  const [decoding, setDecoding] = useState(false)
  const [decodeProgress, setDecodeProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal(prev => Math.min(100, Math.max(85, prev + (Math.random() * 4 - 2))))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleWatch = (channel: typeof channels[0]) => {
    setSelectedChannel(channel)
    setDecoding(true)
    setDecodeProgress(0)
    setIsWatching(true)

    const progressInterval = setInterval(() => {
      setDecodeProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setDecoding(false), 500)
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
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Trophy className="size-8 text-amber-500 animate-pulse" />
                <h2 className="text-3xl font-headline font-bold">World Cup Relay Center</h2>
              </div>
              <p className="text-muted-foreground font-medium">Sovereign signal interception for the global cricket empire.</p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 px-4 py-2 h-auto gap-2 font-bold tracking-widest">
                  <Activity className="size-4 animate-pulse" />
                  MESH_LIVE: ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <Card className="glass-card border-l-4 border-l-amber-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <Zap className="size-32 text-amber-500" />
                </div>
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2">
                  <div>
                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                      <Tv className="size-5 text-amber-500" />
                      Interception Hub (লাইভ স্ট্রিমিং চ্যানেল)
                    </CardTitle>
                    <CardDescription>Select a secure frequency to tap into the live transmission.</CardDescription>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Mesh Throughput</p>
                    <p className="text-xl font-headline font-bold text-primary">42.4 TB/S</p>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {channels.map((channel) => (
                      <div key={channel.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/40 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <h4 className="font-bold text-lg group-hover:text-amber-500 transition-colors flex items-center gap-2">
                              {channel.name}
                              {channel.type === 'Local' && <Badge variant="secondary" className="text-[8px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">LOCAL</Badge>}
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                              <Globe className="size-3" /> {channel.origin} | <Zap className="size-3" /> {channel.freq}
                            </p>
                          </div>
                          <Badge variant="outline" className={`text-[8px] font-bold ${channel.status === 'Operational' ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500 animate-pulse'}`}>
                            {channel.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex flex-col">
                             <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Resolution</span>
                             <span className="text-xs font-mono font-bold text-primary">{channel.quality}</span>
                          </div>
                          <Button 
                            onClick={() => handleWatch(channel)}
                            disabled={channel.status === 'Maintenance'}
                            size="sm" 
                            className="bg-amber-500 text-black hover:bg-amber-600 font-bold gap-2 h-9 px-4 glow-amber"
                          >
                            <PlayCircle className="size-4" /> WATCH STREAM
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2">
                      <BarChart3 className="size-4" />
                      Audience Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-headline font-bold">142.8M</p>
                      <Badge variant="outline" className="text-[8px] border-emerald-500 text-emerald-500">+4.2% Peak</Badge>
                    </div>
                    <div className="flex gap-1 h-8 items-end">
                      {[40, 60, 45, 90, 70, 85, 40, 50, 65, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group">
                          <div className="absolute bottom-0 w-full bg-primary group-hover:bg-amber-500 transition-all" style={{ height: `${h}%` }} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 flex items-center gap-2">
                      <Users className="size-4" />
                      Live Consensus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">BD Support Index:</span>
                        <span className="font-bold text-emerald-500">88%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '88%' }} />
                      </div>
                      <p className="text-[10px] italic text-muted-foreground leading-relaxed mt-2">
                        "National mesh sentiment indicates high confidence for the upcoming Sirajganj-hosted matches."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-amber-500/5 border-amber-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 animate-pulse" />
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 flex items-center gap-2">
                      <Signal className="size-4" />
                      Sovereign Uplink
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="text-center space-y-2">
                      <p className="text-5xl font-headline font-bold text-amber-500 tracking-tighter">{activeSignal.toFixed(1)}%</p>
                      <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Encryption Mesh: HMAC_V4</p>
                   </div>
                   <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 transition-all duration-1000 glow-amber" style={{ width: `${activeSignal}%` }} />
                   </div>
                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div className="text-center">
                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Latency</p>
                         <p className="font-headline font-bold text-primary">8ms</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Jitter</p>
                         <p className="font-headline font-bold text-primary">0.2ms</p>
                      </div>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2">
                       <Trophy className="size-4" />
                       Match Intelligence
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                       <div className="flex justify-between items-center">
                          <div className="text-center">
                            <div className="size-10 bg-muted rounded-full flex items-center justify-center mb-1 border border-white/10 font-bold">BD</div>
                            <span className="text-[10px] font-bold">TIGERS</span>
                          </div>
                          <div className="text-center">
                             <span className="text-xs text-amber-500 font-bold font-mono">LIVE</span>
                             <div className="text-lg font-headline font-bold">242/4</div>
                             <span className="text-[8px] text-muted-foreground uppercase">38.2 OVERS</span>
                          </div>
                          <div className="text-center">
                             <div className="size-10 bg-muted rounded-full flex items-center justify-center mb-1 border border-white/10 font-bold">IND</div>
                             <span className="text-[10px] font-bold">MEN IN BLUE</span>
                          </div>
                       </div>
                    </div>
                    <Button variant="ghost" className="w-full text-[10px] uppercase font-bold tracking-widest h-11 border-white/5 hover:bg-white/5 group">
                       Tactical Scoreboard <ChevronRight className="size-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isWatching} onOpenChange={setIsWatching}>
        <DialogContent className="glass-card border-amber-500/30 sm:max-w-[1000px] p-0 overflow-hidden bg-black">
          <DialogHeader className="p-4 bg-white/2 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <DialogTitle className="text-xl font-headline font-bold flex items-center gap-3 text-amber-500">
                  <Signal className="size-5" />
                  Signal Intercepted: {selectedChannel?.name}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground font-mono text-[9px] uppercase tracking-[0.3em]">
                   Secure Sovereign Relay Protocol Active
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-black font-bold h-6 px-3">L4_ENCRYPTED</Badge>
                <Button variant="ghost" size="icon" className="size-8 text-white/50 hover:text-white" onClick={() => setIsWatching(false)}>
                  <Maximize2 className="size-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="aspect-video bg-black relative flex items-center justify-center w-full">
            {decoding ? (
              <div className="text-center space-y-4">
                <Lock className="size-12 text-amber-500 mx-auto animate-bounce" />
                <div className="space-y-2">
                  <p className="text-amber-500 font-mono text-[10px] animate-pulse">ESTABLISHING HMAC_V4 HANDSHAKE... {decodeProgress}%</p>
                  <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-amber-500 transition-all duration-200" style={{ width: `${decodeProgress}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <iframe 
                  src={`${selectedChannel?.streamUrl}?autoplay=1&mute=0&rel=0`}
                  className="w-full h-full absolute inset-0 border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  title={selectedChannel?.name}
                />
                
                <div className="absolute top-4 right-4 z-20 flex gap-2 pointer-events-none">
                  <Badge variant="outline" className="bg-black/50 border-white/10 text-[9px] h-6 backdrop-blur-md">FPS: 60</Badge>
                  <Badge variant="outline" className="bg-black/50 border-white/10 text-[9px] h-6 backdrop-blur-md">LATENCY: 12MS</Badge>
                </div>

                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 pointer-events-none">
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-red-600 rounded text-white font-bold text-[10px] animate-pulse">
                      <div className="size-1.5 bg-white rounded-full" />
                      LIVE
                   </div>
                   <span className="text-white/80 font-mono text-[10px] drop-shadow-md">{selectedChannel?.quality} | {selectedChannel?.freq}</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
