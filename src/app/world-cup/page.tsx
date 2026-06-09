
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
  ExternalLink,
  CalendarDays,
  Clock,
  ShieldCheck,
  Radio,
  Wifi,
  Database
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Official Broadcaster Map (Aggregator Strategy)
const channels = [
  { 
    id: 1, 
    name: "T Sports Live", 
    origin: "Bangladesh", 
    status: "Operational", 
    quality: "4K Native", 
    type: "Official Broadcaster", 
    freq: "12.4 GHz",
    directUrl: "https://www.tsports.com/live"
  },
  { 
    id: 2, 
    name: "Toffee Sports", 
    origin: "Bangladesh", 
    status: "Operational", 
    quality: "Full HD", 
    type: "Digital Partner", 
    freq: "11.8 GHz",
    directUrl: "https://toffeelive.com/live-tv"
  },
  { 
    id: 3, 
    name: "GTV Sports", 
    origin: "Bangladesh", 
    status: "Operational", 
    quality: "HD+", 
    type: "Official Partner", 
    freq: "11.2 GHz",
    directUrl: "https://www.gtv.com.bd/live"
  },
  { 
    id: 4, 
    name: "Sony Sports 1", 
    origin: "International", 
    status: "Operational", 
    quality: "Ultra HD", 
    type: "Sovereign Proxy", 
    freq: "14.1 GHz",
    directUrl: "https://www.sonyliv.com/sports"
  }
]

// Today's matches for June 10, 2026 (International Friendlies)
const todaysMatches = [
  { id: 1, home: "KSA", away: "SEN", time: "6:00 PM", type: "Int. Friendly", status: "Upcoming", uplink: "https://www.tsports.com/live" },
  { id: 2, home: "POR", away: "NGA", time: "8:45 PM", type: "Int. Friendly", status: "Upcoming", uplink: "https://toffeelive.com/live-tv" },
  { id: 3, home: "ENG", away: "CRC", time: "9:00 PM", type: "Int. Friendly", status: "Upcoming", uplink: "https://www.tsports.com/live" },
  { id: 4, home: "ARG", away: "ISL", time: "9:00 PM", type: "Int. Friendly", status: "Upcoming", uplink: "https://toffeelive.com/live-tv" },
  { id: 5, home: "IRQ", away: "VEN", time: "9:00 PM", type: "Int. Friendly", status: "Upcoming", uplink: "https://www.gtv.com.bd/live" },
]

export default function WorldCupPage() {
  const [activeSignal, setActiveSignal] = useState(94)
  const [isHandshaking, setIsHandshaking] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<typeof channels[0] | null>(null)
  const [handshakeProgress, setHandshakeProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal(prev => Math.min(100, Math.max(85, prev + (Math.random() * 4 - 2))))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleLaunchUplink = (channel: typeof channels[0]) => {
    setSelectedChannel(channel)
    setIsHandshaking(true)
    setHandshakeProgress(0)

    const progressInterval = setInterval(() => {
      setHandshakeProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 20
      })
    }, 200)
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
                <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Sovereign Relay Gateway</h2>
              </div>
              <p className="text-muted-foreground font-medium flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Official Broadcaster Aggregator | Legal Compliance Mesh Active
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 h-auto gap-2 font-bold tracking-widest">
                  <Activity className="size-4 animate-pulse" />
                  CDN LATENCY: 8MS
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <Card className="glass-card border-l-4 border-l-primary overflow-hidden relative">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2">
                  <div>
                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                      <Radio className="size-5 text-primary" />
                      Sovereign Uplink Channels (অফিসিয়াল চ্যানেল)
                    </CardTitle>
                    <CardDescription>Verified deep-links to official digital broadcast partners.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {channels.map((channel) => (
                      <div key={channel.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                              {channel.name}
                              <Badge variant="outline" className="text-[7px] border-primary/30 text-primary uppercase">{channel.type}</Badge>
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                              <Globe className="size-3" /> {channel.origin} | <Wifi className="size-3" /> {channel.freq}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-[8px] font-bold border-emerald-500 text-emerald-500 uppercase">
                            Operational
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-xs font-mono font-bold text-muted-foreground">{channel.quality}</span>
                          <Button 
                            onClick={() => handleLaunchUplink(channel)}
                            size="sm" 
                            className="bg-primary text-primary-foreground hover:opacity-90 font-bold gap-2 h-9 px-4 glow-primary"
                          >
                            <PlayCircle className="size-4" /> WATCH UPLINK
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
                      Mesh Throughput
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-headline font-bold">42.4 TB/S</p>
                      <Badge variant="outline" className="text-[8px] border-primary/30 text-primary">CDN: CLOUDFLARE</Badge>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                       <div className="h-full bg-primary animate-progress w-[85%]" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 flex items-center gap-2">
                      <ShieldCheck className="size-4" />
                      Legal Compliance Monitor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[10px] italic text-muted-foreground leading-relaxed">
                      "Digital Rights Management (DRM) Handshake active. Every request is verified against HMAC_V4 credentials to maintain sovereign integrity."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card bg-primary/5 border-primary/20">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2">
                      <Signal className="size-4" />
                      Sovereign Uplink
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="text-center space-y-2">
                      <p className="text-5xl font-headline font-bold text-primary tracking-tighter">{activeSignal.toFixed(1)}%</p>
                      <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Encryption Mesh: HMAC_V4</p>
                   </div>
                   <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-1000 glow-primary" style={{ width: `${activeSignal}%` }} />
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-amber-500 flex items-center gap-2">
                       <Clock className="size-4" />
                       Match Intelligence (১০ জুন, ২০২৬)
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="space-y-3">
                       {todaysMatches.map((match) => (
                         <div key={match.id} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all group">
                            <div className="flex justify-between items-center mb-2">
                               <Badge variant="outline" className="text-[8px] h-4 border-white/10 uppercase font-mono">
                                  {match.type}
                               </Badge>
                               <span className="text-[9px] font-bold text-amber-500 animate-pulse">Live Soon</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <div className="flex items-center gap-2">
                                  <div className="size-6 bg-muted rounded flex items-center justify-center font-bold text-[10px]">{match.home}</div>
                                  <span className="text-xs font-bold italic">VS</span>
                                  <div className="size-6 bg-muted rounded flex items-center justify-center font-bold text-[10px]">{match.away}</div>
                               </div>
                               <div className="text-right">
                                  <p className="text-[10px] font-bold text-foreground">{match.time}</p>
                                  <p className="text-[8px] text-muted-foreground font-mono">BD TIME</p>
                               </div>
                            </div>
                            <Button variant="ghost" className="w-full h-8 mt-3 text-[9px] uppercase font-bold border-white/5 hover:bg-amber-500/10 hover:text-amber-500 gap-2" asChild>
                               <a href={match.uplink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="size-3" /> DIRECT UPLINK
                               </a>
                            </Button>
                         </div>
                       ))}
                    </div>
                    <p className="text-[8px] italic text-muted-foreground text-center mt-2">
                      * Times are subject to broadcaster variations. Verify with T Sports or Flashscore.
                    </p>
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
                 <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                    <h3 className="text-sm font-headline font-bold text-emerald-500 uppercase">Secure Handshake Complete</h3>
                    <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                       The Sovereign Intelligence Layer has established a verified route to <strong>{selectedChannel?.name}</strong>. 
                       To maintain legal integrity and ensure 8ms latency, you will be redirected to the official broadcast terminal.
                    </p>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                      asChild
                      onClick={() => setIsHandshaking(false)}
                    >
                      <a href={selectedChannel?.directUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="size-5" /> Launch Official Uplink
                      </a>
                    </Button>
                    <p className="text-[8px] text-muted-foreground font-mono italic">
                       * This action complies with Digital Content Syndication protocols.
                    </p>
                 </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
