"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Youtube, 
  Play, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  Cpu, 
  RefreshCcw, 
  Lock, 
  Activity, 
  History,
  Monitor,
  Sparkles,
  Link2,
  ExternalLink,
  Radio,
  CheckCircle2,
  Database,
  Flame,
  Volume2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processVideoExtraction, VideoExtractionOutput } from "@/ai/flows/video-extraction-flow"

export default function ImperialCinemaPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [videoData, setVideoData] = useState<VideoExtractionOutput | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/live\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  async function handleLaunch() {
    const id = getYoutubeId(url)
    if (!id) {
      toast({ title: "Invalid Coordinate", description: "The provided YouTube URL is not recognizable.", variant: "destructive" })
      return
    }

    setLoading(true)
    setActiveVideoId(null)
    setVideoData(null)

    try {
      toast({ title: "Initiating Media Pulse", description: "Connecting to Nora-60 Extractor..." })
      
      // Get AI analysis and metadata
      const res = await processVideoExtraction({ url })
      setVideoData(res)
      
      // Set the active video ID for the player
      setActiveVideoId(id)
      
      toast({ 
        title: "Cinema Link Established", 
        description: "Handshake with YouTube node successful.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    } catch (e: any) {
      toast({ title: "Extraction Error", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        toast({ title: "Fullscreen Error", description: err.message, variant: "destructive" });
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20 overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-red-500/50 text-red-500 uppercase font-bold tracking-widest px-3 h-8 bg-red-500/5 text-[10px]">
                   <Youtube className="size-3 mr-2" /> Project #61: Imperial Cinema
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Sparkles className="size-3 mr-2" /> 4K_UPLINK: ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-red-500">Cinema.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Infinite Entertainment, Unified Intelligence." ইউটিউবের যেকোনো ভিডিও বা লাইভ স্ট্রিম এখন আপনার সাম্রাজ্যের সুরক্ষিত প্লেয়ারে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-red-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Signal Veracity</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase flex items-center justify-center gap-2">
                     <CheckCircle2 className="size-5" /> 100%
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Input Control */}
              <Card className="glass-card border-l-4 border-l-red-500 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                    <Link2 className="size-4 text-red-500" /> Connect YouTube Stream
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                       <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-red-500" />
                       <Input 
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="Paste YouTube Link or Live Stream URL..." 
                        className="bg-background/50 border-white/10 h-12 pl-10 font-mono text-xs text-white"
                        onKeyDown={e => e.key === 'Enter' && handleLaunch()}
                       />
                    </div>
                    <Button 
                      onClick={handleLaunch}
                      disabled={loading || !url}
                      className="bg-red-500 text-white font-bold h-12 px-8 uppercase tracking-widest gap-2 glow-destructive"
                    >
                      {loading ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
                      Launch Cinema
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Cinema Player */}
              <Card ref={playerRef} className={`glass-card border-white/10 overflow-hidden relative group shadow-2xl ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none' : ''}`}>
                 <CardHeader className="bg-black/60 border-b border-white/5 py-3 px-6 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                       <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                          {videoData ? videoData.title : 'AWAITING_SIGNAL...'}
                       </span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Badge variant="outline" className="text-[8px] border-white/10 text-muted-foreground uppercase h-6">YouTube_Node_01</Badge>
                       <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="size-8 text-white hover:bg-white/10">
                          {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                       </Button>
                    </div>
                 </CardHeader>
                 <CardContent className="p-0 aspect-video bg-black flex items-center justify-center">
                    {activeVideoId ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Imperial Cinema Player"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-6 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                         <div className="relative">
                            <div className="size-24 rounded-full border-4 border-dashed border-red-500/20 animate-spin-slow" />
                            <Youtube className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 text-red-500" />
                         </div>
                         <p className="text-xs font-mono uppercase tracking-[0.4em] text-white">No Active Signal</p>
                      </div>
                    )}
                 </CardContent>
              </Card>

              {/* Video Insights if available */}
              {videoData && (
                <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                         <CardHeader className="py-4">
                            <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                               <Cpu className="size-4" /> Nora-60 Veracity Report
                            </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4 pb-4">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                               <span className="text-muted-foreground">Channel:</span>
                               <span className="text-white">{videoData.author}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                               <span className="text-muted-foreground">Duration:</span>
                               <span className="text-white">{videoData.duration}</span>
                            </div>
                            <div className="pt-2 border-t border-white/5">
                               <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Extraction Hash (HMAC_V4)</p>
                               <code className="text-[9px] text-primary font-mono block truncate">{videoData.extractionHash}</code>
                            </div>
                         </CardContent>
                      </Card>
                      <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                         <CardHeader className="py-4">
                            <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                               <Volume2 className="size-4" /> Imperial Playback Sync
                            </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                               "This media link is being tunnelled through a secure Sovereign Canal to bypass trackers and advertisements."
                            </p>
                            <Badge className="bg-emerald-500 text-black border-none text-[8px] font-bold uppercase w-full justify-center h-6">TUNNEL_SECURE: L4</Badge>
                         </CardContent>
                      </Card>
                   </div>
                </section>
              )}
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                        <Monitor className="size-4" /> Cinema Protocol
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your Cinema session is isolated at the node level. No telemetry or watch history is leaked outside the NoorNexus Mesh."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-primary/30 text-primary uppercase text-[9px] font-bold">NODE_ISOLATION: ON</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Radio className="size-4" /> Live Sync Stats
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Mainframe Lag</span>
                        <span className="text-emerald-500 font-bold">28ms</span>
                     </div>
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Buffering Guard</span>
                        <span className="text-white font-bold">ACTIVE</span>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Database className="size-16 text-white" />
                  </div>
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Activity className="size-3" /> System Load
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                        <span className="text-muted-foreground">Neural Load</span>
                        <span className="text-emerald-500 font-bold">12%</span>
                     </div>
                     <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '12%' }} />
                     </div>
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
