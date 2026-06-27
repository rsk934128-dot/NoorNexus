
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Youtube, 
  Download, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  Cpu, 
  RefreshCcw, 
  Lock, 
  Activity, 
  History,
  FileVideo,
  Music,
  Archive,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sparkles,
  Link2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processVideoExtraction, VideoExtractionOutput } from "@/ai/flows/video-extraction-flow"
import { Progress } from "@/components/ui/progress"

export default function YoutubeDownloaderPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<VideoExtractionOutput | null>(null)

  async function handleExtract() {
    if (!url.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await processVideoExtraction({ url })
      setResult(res)
      toast({ 
        title: "Media Pulse Established", 
        description: "Nora-60 has extracted the video coordinates." 
      })
    } catch (e: any) {
      toast({ title: "Extraction Drift", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload(quality: any) {
    setDownloading(true)
    setDownloadProgress(0)
    
    // Simulate Download Handshake
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDownloading(false)
            toast({
              title: "Download Finalized",
              description: `Video ${result?.title} (${quality.label}) has been anchored.`,
              className: "border-emerald-500/50 bg-emerald-500/5"
            })
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

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
                   <Youtube className="size-3 mr-2" /> Project #60: Media Extractor
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Lock className="size-3 mr-2" /> Encrypted Tunnels: ON
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-red-500">Downloader.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Infinite Media, Sovereign Archive." ইউটিউব থেকে আপনার প্রয়োজনীয় ভিডিও এখন সরাসরি নূরনেক্সাস ভল্টে সুরক্ষিত করার ব্যবস্থা।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-red-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Extractor Integrity</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500">OPTIMAL</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Input Section */}
              <Card className="glass-card border-l-4 border-l-red-500 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                    <Link2 className="size-4 text-red-500" /> Dispatch Media Link
                  </CardTitle>
                  <CardDescription>Enter the YouTube URL to initiate extraction handshake.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                       <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-red-500" />
                       <Input 
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..." 
                        className="bg-background/50 border-white/10 h-12 pl-10 font-mono text-xs"
                       />
                    </div>
                    <Button 
                      onClick={handleExtract}
                      disabled={loading || !url}
                      className="bg-red-500 text-white font-bold h-12 px-8 uppercase tracking-widest gap-2 glow-destructive"
                    >
                      {loading ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
                      Extract Pulse
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Extraction Results */}
              {result && (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                  <Card className="glass-card border-white/5 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative aspect-video md:aspect-auto bg-black/40 border-r border-white/5 overflow-hidden group">
                         <img 
                          src={`https://picsum.photos/seed/${result.extractionHash}/800/600`} 
                          alt="Thumbnail" 
                          className="object-cover size-full opacity-60 group-hover:scale-110 transition-transform duration-700" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                         <div className="absolute bottom-4 left-4">
                            <Badge className="bg-red-500 text-[8px] h-4">{result.duration}</Badge>
                         </div>
                      </div>
                      <div className="md:w-2/3 p-8 space-y-6">
                        <div className="space-y-2">
                           <div className="flex justify-between items-start">
                              <h3 className="text-xl font-headline font-bold text-white uppercase leading-tight">{result.title}</h3>
                              <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 text-[8px] h-5">VERIFIED_MEDIA</Badge>
                           </div>
                           <p className="text-[10px] text-primary font-mono font-bold uppercase">{result.author}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                           {result.qualities.map((q, i) => (
                             <div key={i} className="p-3 bg-white/2 rounded-xl border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                                <div className="flex items-center gap-3">
                                   <div className={`p-2 rounded-lg ${q.format === 'MP3' ? 'bg-purple-500/10 text-purple-500' : 'bg-primary/10 text-primary'}`}>
                                      {q.format === 'MP3' ? <Music className="size-4" /> : <FileVideo className="size-4" />}
                                   </div>
                                   <div className="space-y-0.5">
                                      <p className="text-[10px] text-white font-bold uppercase">{q.label}</p>
                                      <p className="text-[8px] text-muted-foreground uppercase">{q.size}</p>
                                   </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleDownload(q)}
                                  disabled={downloading}
                                  className="h-8 text-[8px] font-bold uppercase bg-emerald-500 text-white hover:bg-emerald-600 glow-emerald"
                                >
                                   <Download className="size-3 mr-2" /> Initiate
                                </Button>
                             </div>
                           ))}
                        </div>

                        {downloading && (
                          <div className="space-y-3 animate-in slide-in-from-top-2">
                             <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                                <span className="text-primary flex items-center gap-2">
                                   <Radio className="size-3 animate-pulse" /> Anchoring to Vault...
                                </span>
                                <span className="text-white">{downloadProgress}%</span>
                             </div>
                             <Progress value={downloadProgress} className="h-1 bg-white/5" />
                          </div>
                        )}
                        
                        <div className="pt-4 border-t border-white/5">
                           <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Extraction Hash (HMAC_V4_60)</p>
                           <code className="text-[9px] text-red-500 font-mono block truncate">{result.extractionHash}</code>
                        </div>
                      </div>
                    </div>
                  </Card>
                </section>
              )}
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <Lock className="size-4" /> Secure Canal Policy
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Every media extraction pulse is signed and isolated. No trackers or legacy scripts are permitted through the Imperial Canal."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">TUNNEL_SECURITY: L4</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <History className="size-4" /> Extraction History
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { task: "Tutorial_01.mp4", status: "ANCHORED", time: "2h ago" },
                       { task: "Dev_Update.mp3", status: "VAULTED", time: "1d ago" }
                     ].map((log, i) => (
                       <div key={i} className="p-2.5 bg-white/5 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-bold text-white uppercase truncate max-w-[100px]">{log.task}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">{log.time}</p>
                          </div>
                          <CheckCircle2 className="size-3 text-emerald-500 opacity-50 group-hover:opacity-100" />
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> System Memory
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                        "Media can be archived directly to Imperial Drive (Project #57) for generational redundancy."
                     </p>
                     <div className="flex gap-2 mt-4">
                        <Link2 href="/drive" className="flex-1">
                           <Button variant="outline" className="w-full h-8 text-[8px] uppercase font-bold border-white/10">Drive</Button>
                        </Link2>
                        <Link2 href="/sovereign-vault" className="flex-1">
                           <Button variant="outline" className="w-full h-8 text-[8px] uppercase font-bold border-white/10">Vault</Button>
                        </Link2>
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
