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
  Volume2,
  ArrowRight,
  Globe,
  LayoutGrid,
  ShieldAlert,
  ArrowLeft
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processVideoExtraction, VideoExtractionOutput } from "@/ai/flows/video-extraction-flow"
import { dispatchSovereignCommand, listenToTunnelResponse } from "@/services/sovereign-bridge"

const DEFAULT_SIGNAL_URL = "https://www.youtube.com/watch?v=ntjJKCjNmcE"; // Imperial World Cup / Space Theme

export default function ImperialCinemaPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [videoData, setVideoData] = useState<VideoExtractionOutput | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<'PLAYER' | 'FULL_SITE'>('PLAYER')
  const playerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/live\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Auto-establish signal on mount
  useEffect(() => {
    handleLaunch(DEFAULT_SIGNAL_URL, true)
    
    // Listen for bridge responses
    const unsubscribe = listenToTunnelResponse((data) => {
      if (data.type === 'ACK_PERMIT') {
        toast({ title: "Tunnel Handshake Secured", description: "L4 Permission granted by Imperial Bridge." })
      }
    });
    return () => unsubscribe();
  }, [])

  async function handleLaunch(targetUrl: string = url, isInitial = false) {
    const id = getYoutubeId(targetUrl)
    
    // If it's just a general URL and not a video ID, switch to Full Site mode
    if (!id && targetUrl.includes('youtube.com')) {
      setViewMode('FULL_SITE')
      return
    }

    if (!id) {
      if (!isInitial) toast({ title: "Invalid Coordinate", description: "The provided YouTube URL is not recognizable.", variant: "destructive" })
      return
    }

    setLoading(true)
    setActiveVideoId(null)
    setVideoData(null)
    setViewMode('PLAYER')

    try {
      if (!isInitial) toast({ title: "Initiating Media Pulse", description: "Connecting to Nora-60 Extractor..." })
      
      const res = await processVideoExtraction({ url: targetUrl })
      setVideoData(res)
      setActiveVideoId(id)
      
      // Command-Based Permission Handshake
      setTimeout(() => {
        dispatchSovereignCommand(iframeRef, {
          type: 'PERMIT_YOUTUBE',
          payload: { videoId: id, intent: 'Sovereign Cinema' },
          signature: 'HMAC_V4_CINEMA'
        });
      }, 1500);

      if (!isInitial) {
        toast({ 
          title: "Cinema Link Established", 
          description: "Handshake with YouTube node successful.",
          className: "border-emerald-500/50 bg-emerald-500/5"
        })
      }
    } catch (e: any) {
      if (!isInitial) toast({ title: "Extraction Error", description: e.message, variant: "destructive" })
      setActiveVideoId(id)
    } finally {
      setLoading(false)
    }
  }

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    
    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        // Request landscape orientation if supported
        if (window.screen.orientation && (window.screen.orientation as any).lock) {
          (window.screen.orientation as any).lock("landscape").catch(() => {
            console.log("Orientation lock ignored by browser.");
          });
        }
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        if (window.screen.orientation && (window.screen.orientation as any).unlock) {
          (window.screen.orientation as any).unlock();
        }
        setIsFullscreen(false);
      }
    } catch (err: any) {
      toast({ title: "Fullscreen Interface Error", description: err.message, variant: "destructive" });
    }
  };

  const handleRefresh = () => {
    if (viewMode === 'FULL_SITE' && iframeRef.current) {
      setLoading(true)
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = ""
      iframeRef.current.src = currentSrc
      setTimeout(() => setLoading(false), 1000)
    } else {
      handleLaunch()
    }
  }

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
                   <Youtube className="size-3 mr-2" /> Project #61: Imperial YouTube Portal
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Globe className="size-3 mr-2" /> FULL_SITE_MESH: ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                YouTube <span className="text-red-500">Terminal.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Full-Site Integration & Secure Playback." কমান্ডারের নির্দেশে ইউটিউবের পুরো ওয়েবসাইট এখন নূরনেক্সাস সাম্রাজ্যের সুরক্ষিত টানেলে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-red-500/20 text-center min-w-[200px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Radio className="size-12 text-red-500" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Tunnel Status</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase flex items-center justify-center gap-2">
                     <ShieldCheck className="size-5" /> {viewMode === 'FULL_SITE' ? 'FULL_MESH' : 'LOCKED'}
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Terminal Control Bar */}
              <Card className="glass-card border-l-4 border-l-red-500 bg-red-500/5">
                <CardHeader className="py-4 border-b border-white/5">
                   <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex gap-2">
                         <Button 
                           variant={viewMode === 'PLAYER' ? 'default' : 'ghost'} 
                           onClick={() => setViewMode('PLAYER')}
                           className="text-[10px] uppercase font-bold h-8 px-4 gap-2"
                         >
                            <Play className="size-3" /> Cinema HUD
                         </Button>
                         <Button 
                           variant={viewMode === 'FULL_SITE' ? 'default' : 'ghost'} 
                           onClick={() => setViewMode('FULL_SITE')}
                           className="text-[10px] uppercase font-bold h-8 px-4 gap-2"
                         >
                            <Globe className="size-3" /> Full Site Mesh
                         </Button>
                      </div>
                      <div className="flex-1 w-full relative">
                         <Input 
                           value={url}
                           onChange={e => setUrl(e.target.value)}
                           placeholder="Enter YouTube URL or Video Signal..." 
                           className="bg-black/40 border-white/10 h-10 pl-10 font-mono text-xs text-white"
                           onKeyDown={e => e.key === 'Enter' && handleLaunch()}
                         />
                         <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-red-500" />
                      </div>
                      <div className="flex gap-2">
                         <Button variant="outline" size="icon" onClick={handleRefresh} className="size-10 border-white/10">
                            <RefreshCcw className={`size-4 ${loading ? 'animate-spin text-red-500' : ''}`} />
                         </Button>
                         <Button onClick={() => handleLaunch()} className="bg-red-500 text-white font-bold h-10 px-6 uppercase text-[10px] glow-destructive">
                            Connect
                         </Button>
                      </div>
                   </div>
                </CardHeader>
              </Card>

              {/* Player/Site Display Area */}
              <Card ref={playerRef} className={`glass-card border-white/10 overflow-hidden relative shadow-2xl transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none bg-black flex flex-col items-center justify-center' : ''}`}>
                 {isFullscreen && (
                    <div className="absolute top-4 right-4 z-[100] flex gap-2">
                       <Button variant="secondary" size="icon" onClick={toggleFullscreen} className="bg-black/40 backdrop-blur-md border border-white/10 text-white">
                          <Minimize2 className="size-5" />
                       </Button>
                    </div>
                 )}
                 <CardContent className={`p-0 bg-black relative ${viewMode === 'FULL_SITE' ? 'h-[800px]' : 'aspect-video'} flex items-center justify-center w-full`}>
                    {loading && (
                      <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
                         <div className="relative">
                            <div className="size-24 rounded-full border-2 border-red-500/20 animate-spin-slow" />
                            <div className="absolute inset-0 border-t-2 border-red-500 rounded-full animate-spin" />
                            <Youtube className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 text-red-500 animate-pulse" />
                         </div>
                         <div className="text-center space-y-2">
                            <p className="text-sm font-headline font-bold text-red-500 uppercase tracking-[0.4em]">Establishing Sovereign Bridge...</p>
                            <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">Nora-60 Veracity Verification: ACTIVE</p>
                         </div>
                      </div>
                    )}

                    {viewMode === 'FULL_SITE' ? (
                      <div className="size-full bg-background relative flex flex-col items-center justify-center text-center p-12 space-y-12">
                         <div className="size-20 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40 glow-emerald">
                            <ShieldAlert className="size-10 text-amber-500" />
                         </div>
                         <div className="space-y-4 max-w-xl">
                            <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">High-Security Node Bridge</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                               "কমান্ডার, ইউটিউবের ফুল সাইট নিরাপত্তার কারণে আইফ্রেম টানেলে সরাসরি লোড হতে বাধা দিচ্ছে। নিরবিচ্ছিন্ন এবং বিজ্ঞাপনমুক্ত অভিজ্ঞতার জন্য আপনাকে সরাসরি **Direct Sovereign Tunnel** ব্যবহার করতে হবে অথবা আমাদের **Cinema HUD** মোড ব্যবহার করে নির্দিষ্ট ভিডিও প্লে করতে হবে।"
                            </p>
                         </div>
                         <div className="flex flex-col sm:flex-row gap-6">
                            <Button 
                              onClick={() => window.open('https://www.youtube.com', '_blank')}
                              className="bg-amber-500 text-black font-bold uppercase text-xs h-14 px-10 glow-emerald gap-3"
                            >
                               <ExternalLink className="size-5" /> Open Direct Sovereign Tunnel
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => setViewMode('PLAYER')}
                              className="border-white/10 text-white font-bold uppercase text-xs h-14 px-10 gap-3"
                            >
                               <LayoutGrid className="size-5 text-red-500" /> Switch to Cinema HUD
                            </Button>
                         </div>
                         <div className="pt-20 opacity-20 flex flex-col items-center gap-4">
                            <Badge variant="outline" className="border-white/10 uppercase tracking-[0.4em] text-[8px]">Auth_Handshake_Bypass_Protocol_v4.5</Badge>
                         </div>
                         
                         <iframe 
                           ref={iframeRef}
                           src="https://www.youtube.com" 
                           className="hidden h-0 w-0" 
                           title="Full YouTube Terminal"
                         />
                      </div>
                    ) : activeVideoId ? (
                      <iframe 
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&theme=dark`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; orientation-lock"
                        allowFullScreen
                        title="Imperial Cinema Player"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-6 opacity-20 grayscale">
                         <Youtube className="size-16 text-red-500" />
                         <p className="text-xs font-mono uppercase tracking-[0.4em] text-white">No Active Signal</p>
                      </div>
                    )}
                 </CardContent>
                 {!isFullscreen && (
                    <div className="absolute bottom-4 right-4 z-10">
                       <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60">
                          <Maximize2 className="size-4" />
                       </Button>
                    </div>
                 )}
              </Card>

              {/* Video Insights (only for Player mode) */}
              {viewMode === 'PLAYER' && videoData && !isFullscreen && (
                <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                         <CardHeader className="py-4 px-6">
                            <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                               <Cpu className="size-4" /> Nora-60 Veracity Report
                            </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4 pb-6 px-6 text-[11px]">
                            <div className="space-y-3">
                               <div className="flex justify-between items-center font-bold uppercase">
                                  <span className="text-muted-foreground">Channel:</span>
                                  <span className="text-white">{videoData.author}</span>
                               </div>
                               <div className="flex justify-between items-center font-bold uppercase">
                                  <span className="text-muted-foreground">Duration:</span>
                                  <span className="text-white">{videoData.duration}</span>
                               </div>
                            </div>
                            <div className="pt-3 border-t border-white/5">
                               <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Extraction Hash (HMAC_V4)</p>
                               <code className="text-[9px] text-primary font-mono block truncate bg-black/40 p-2 rounded">{videoData.extractionHash}</code>
                            </div>
                         </CardContent>
                      </Card>
                      <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                         <CardHeader className="py-4 px-6">
                            <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                               <Volume2 className="size-4" /> Playback Security
                            </CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4 pb-6 px-6">
                            <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                               "This media link is being tunnelled through a secure Sovereign Canal to bypass trackers and advertisements. No history is leaked."
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                               <Badge className="bg-emerald-500 text-black border-none text-[8px] font-bold uppercase h-6 px-3">TUNNEL_SECURE: L4</Badge>
                            </div>
                         </CardContent>
                      </Card>
                   </div>
                </section>
              )}
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                        <Monitor className="size-4" /> YouTube Protocol
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your Imperial YouTube session is isolated at the node level. Full site mesh mode provides an expansive view of the global media landscape."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-primary/30 text-primary uppercase text-[9px] font-bold">MODE: {viewMode}</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                        <Radio className="size-4" /> Real-time Handshake
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Sync Veracity</span>
                        <span className="text-emerald-500 font-bold">100%</span>
                     </div>
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Latency</span>
                        <span className="text-white font-bold">28ms</span>
                     </div>
                     <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-amber-500 animate-pulse" style={{ width: '92%' }} />
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Database className="size-16 text-white" />
                  </div>
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Activity className="size-3" /> System Torque
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                        <span className="text-muted-foreground">Neural Load</span>
                        <span className="text-emerald-500 font-bold">Optimal</span>
                     </div>
                     <p className="text-[9px] text-muted-foreground italic leading-tight mt-4">
                        "Legacy media nodes are continuously monitored for bit-drift."
                     </p>
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
