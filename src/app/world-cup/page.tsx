
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Tv, Signal, Globe, PlayCircle, Zap, Activity, Users } from "lucide-react"

const channels = [
  { id: 1, name: "T Sports", origin: "Bangladesh", status: "Operational", quality: "4K Native", type: "Local" },
  { id: 2, name: "GTV Sports", origin: "Bangladesh", status: "Operational", quality: "HD+", type: "Local" },
  { id: 3, name: "Star Sports 1", origin: "International", status: "Operational", quality: "Ultra HD", type: "Foreign" },
  { id: 4, name: "Sony Sports Ten 1", origin: "International", status: "Operational", quality: "HD", type: "Foreign" },
  { id: 5, name: "Willow TV", origin: "USA/Global", status: "Maintenance", quality: "HD", type: "Foreign" },
  { id: 6, name: "Sky Sports Cricket", origin: "UK", status: "Operational", quality: "4K Native", type: "Foreign" },
  { id: 7, name: "SuperSport", origin: "South Africa", status: "Operational", quality: "HD+", type: "Foreign" },
  { id: 8, name: "BTV World", origin: "Bangladesh", status: "Operational", quality: "Standard", type: "Local" },
]

export default function WorldCupPage() {
  const [activeSignal, setActiveSignal] = useState(94)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal(prev => Math.min(100, Math.max(85, prev + (Math.random() * 4 - 2))))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Trophy className="size-8 text-amber-500 animate-bounce" />
                <h2 className="text-3xl font-headline font-bold">World Cup Relay Center</h2>
              </div>
              <p className="text-muted-foreground">বিশ্বকাপ লাইভ ব্রডকাস্ট ইন্টারসেপ্ট এবং সিগন্যাল মনিটর।</p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 px-4 py-2 h-auto gap-2">
                  <Activity className="size-4" />
                  LIVE_MODE: ACTIVE
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="glass-card lg:col-span-3 border-l-4 border-l-amber-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-headline flex items-center gap-2">
                    <Tv className="size-5 text-amber-500" />
                    Available Transmissions (দেশি ও বিদেশি চ্যানেল)
                  </CardTitle>
                  <CardDescription>Select a secure signal to intercept the World Cup stream.</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Global Viewers</p>
                  <p className="text-xl font-headline font-bold text-primary">1.2 Billion+</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {channels.map((channel) => (
                    <div key={channel.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/50 transition-all group relative overflow-hidden">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <h4 className="font-bold text-lg group-hover:text-amber-500 transition-colors">{channel.name}</h4>
                          <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                            <Globe className="size-3" /> {channel.origin}
                          </p>
                        </div>
                        <Badge variant="outline" className={`text-[8px] ${channel.status === 'Operational' ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500'}`}>
                          {channel.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-muted-foreground font-bold uppercase">Resolution</span>
                           <span className="text-xs font-mono">{channel.quality}</span>
                        </div>
                        <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-600 font-bold gap-2 h-8 px-4">
                          <PlayCircle className="size-4" /> Watch Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 flex items-center gap-2">
                      <Signal className="size-4" />
                      Signal Strength
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="text-center space-y-2">
                      <p className="text-5xl font-headline font-bold text-amber-500">{activeSignal.toFixed(1)}%</p>
                      <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Encryption Stable</p>
                   </div>
                   <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${activeSignal}%` }} />
                   </div>
                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div className="text-center">
                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Latency</p>
                         <p className="font-headline font-bold">12ms</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Packet Loss</p>
                         <p className="font-headline font-bold">0.00%</p>
                      </div>
                   </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2">
                       <Users className="size-4" />
                       Fan Consensus
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                       <p className="text-[10px] font-bold text-muted-foreground">UPCOMING MATCH:</p>
                       <div className="flex justify-between items-center">
                          <span className="font-headline font-bold">BD</span>
                          <span className="text-xs text-primary font-bold">VS</span>
                          <span className="font-headline font-bold">IND</span>
                       </div>
                       <div className="text-[10px] text-center text-amber-500 font-mono">Starts in: 02:45:12</div>
                    </div>
                    <Button variant="outline" className="w-full text-[10px] uppercase font-bold tracking-widest h-10 border-white/10 hover:bg-white/5">
                       View All Fixtures
                    </Button>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
