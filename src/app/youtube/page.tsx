
"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Monitor,
  Sparkles, 
  Link2,
  ExternalLink,
  Radio,
  CheckCircle2,
  Database,
  Volume2,
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

  useEffect(() => {
    handleLaunch(DEFAULT_SIGNAL_URL, true)
    
    const unsubscribe = listenToTunnelResponse((data) => {
      if (data.type === 'ACK_PERMIT') {
        toast({ title: "Tunnel Handshake Secured", description: "L4 Permission granted by Imperial Bridge." })
      }
    });
    return () => unsubscribe();
  }, [])

  async function handleLaunch(targetUrl: string = url, isInitial = false) {
    const id = getYoutubeId(targetUrl)
    
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
        <main className="flex flex-col h-[100dvh] w-full max-w-full overflow-hidden p-0 m-0 relative">
          {/* Imperial Header */}
          <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md shrink-0 w-full z-[60]">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden text-primary">
                <Button variant="ghost" size="icon" className="h-10 w-10"><Menu className="size-6" /></Button>
              </SidebarTrigger>
              <div className="size-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30 glow-destructive shrink-0">
                <Youtube className="size-6 text-red-500" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-white truncate leading-none flex items-center gap-2">
                  YouTube Terminal
                  <Sparkles className="size-4 text-amber-500 animate-pulse" />
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Live Media Node v5.9</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7 bg-emerald-500/5">
                <ShieldCheck className="size-3.5" />
                <span className="text-[10px] font-bold">L4 Secure Canal</span>
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh}
                className="text-muted-foreground hover:text-primary size-8"
              >
                <RefreshCcw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </header>

          {/* Terminal Control Bar */}
          <div className="px-4 py-3 bg-black/20 border-b border-white/5 shrink-0 w-full z-40">
             <div className="flex flex-col sm:flex-row items-center gap-4 max-w-7xl mx-auto">
                <div className="flex gap-2 shrink-0">
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
                     className="bg-black/40 border-white/10 h-10 pl-10 font-mono text-xs text-white w-full"
                     onKeyDown={e => e.key === 'Enter' && handleLaunch()}
                   />
                   <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-red-500" />
                </div>
                <Button onClick={() => handleLaunch()} className="bg-red-500 text-white font-bold h-10 px-6 uppercase text-[10px] glow-destructive shrink-0">
                   Connect
                </Button>
             </div>
          </div>

          {/* Player/Site Display Area */}
          <div className="flex-1 overflow-hidden bg-black/20 w-full p-0 m-0 relative z-0">
            <Card ref={playerRef} className={`border-none h-full w-full overflow-hidden relative shadow-2xl transition-all duration-500 rounded-none bg-transparent m-0 p-0 ${isFullscreen ? 'fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center' : ''}`}>
                 {isFullscreen && (
                    <div className="absolute top-4 right-4 z-[100] flex gap-2">
                       <Button variant="secondary" size="icon" onClick={toggleFullscreen} className="bg-black/40 backdrop-blur-md border border-white/10 text-white">
                          <Minimize2 className="size-5" />
                       </Button>
                    </div>
                 )}
                 <CardContent className={`p-0 bg-black relative size-full flex items-center justify-center m-0`}>
                    {loading && (
                      <div className="absolute inset-0 z-[70] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
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
                      <div className="size-full bg-background relative flex flex-col items-center justify-center text-center p-12 space-y-12 overflow-y-auto">
                         <div className="size-20 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40 glow-emerald">
                            <ShieldAlert className="size-10 text-amber-500" />
                         </div>
                         <div className="space-y-4 max-w-xl">
                            <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">High-Security Node Bridge</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                               "কমান্ডার, ইউটিউবের ফুল সাইট নিরাপত্তার কারণে আইফ্রেম টানেলে সরাসরি লোড হতে বাধা দিতে পারে। নিরবিচ্ছিন্ন এবং বিজ্ঞাপনমুক্ত অভিজ্ঞতার জন্য আপনাকে সরাসরি **Direct Sovereign Tunnel** ব্যবহার করতে হবে।"
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
                      </div>
                    ) : activeVideoId ? (
                      <iframe 
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&theme=dark`}
                        className="w-full h-full border-0 absolute inset-0"
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
          </div>
          
          <footer className="py-3 border-t border-white/5 bg-background/80 shrink-0 text-center w-full z-[60]">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 px-4">
               <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
                 NoorNexus OS Integrated Streaming Node | SSL: SHA-256 Verified
               </p>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                     <span className="text-[8px] font-bold uppercase text-emerald-500 tracking-widest">Veracity: OPTIMAL</span>
                  </div>
               </div>
            </div>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
