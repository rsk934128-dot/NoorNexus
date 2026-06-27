
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
  Music, 
  Play, 
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
  Radio,
  Sparkles,
  Database,
  Waves,
  Mic2,
  Volume2,
  Trash2,
  CheckCircle2,
  FileAudio
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { synthesizeImperialAudio, AudioSynthesisOutput } from "@/ai/flows/audio-synthesis-flow"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AudioLabPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")
  const [voice, setVoice] = useState("Algenib")
  const [result, setResult] = useState<AudioSynthesisOutput | null>(null)
  const [history, setHistory] = useState<any[]>([])

  async function handleSynthesize() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    try {
      toast({ title: "Initializing Neural Synthesis", description: "Warming up Nora-66 Audio Agent..." })
      const res = await synthesizeImperialAudio({ text, voice: voice as any })
      setResult(res)
      setHistory(prev => [{ title: text.substring(0, 30) + "...", date: new Date().toLocaleTimeString(), hash: res.audioHash }, ...prev].slice(0, 5))
      toast({ 
        title: "Audio Synthesis Complete", 
        description: "Your track is ready for imperial playback." 
      })
    } catch (e: any) {
      toast({ 
        title: "Neural Drift Detected", 
        description: e.message || "Failed to synthesize audio payload.",
        variant: "destructive" 
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadAudio = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result.media
    link.download = `imperial_track_${Date.now()}.wav`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({ title: "Track Anchored", description: "Audio file saved to local storage." })
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Mic2 className="size-3 mr-2" /> Project #66: Music Lab
                 </Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5 text-[10px]">
                   <Waves className="size-3 mr-2" /> Neural Synthesis Active
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-emerald-500">Music Lab.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Infinite Harmony, Imperial Precision." জেমিনি এআই ব্যবহার করে আপনার পছন্দের গান বা অডিও ট্র্যাক তৈরি করুন মুহূর্তের মধ্যেই।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Synthesizer Status</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase flex items-center justify-center gap-2">
                     <CheckCircle2 className="size-5" /> OPTIMAL
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Input Section */}
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                    <Volume2 className="size-4 text-emerald-500" /> Dispatch Audio Payload
                  </CardTitle>
                  <CardDescription>Enter lyrics or description to trigger neural audio synthesis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 space-y-2">
                       <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Track Content / Lyrics</Label>
                       <textarea 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Write your lyrics or message here... (e.g. নূরনেক্সাস সাম্রাজ্যের জয়গান গাও...)" 
                        className="w-full h-32 bg-background/50 border border-white/10 rounded-xl p-4 text-sm font-medium focus:ring-1 focus:ring-emerald-500 outline-none"
                       />
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Neural Voice</Label>
                          <Select value={voice} onValueChange={setVoice}>
                             <SelectTrigger className="bg-background/50 border-white/10 h-12 text-xs font-bold uppercase">
                                <SelectValue />
                             </SelectTrigger>
                             <SelectContent className="glass-card border-white/10 bg-black/90 text-white">
                                <SelectItem value="Algenib">Algenib (Clear)</SelectItem>
                                <SelectItem value="Achernar">Achernar (Deep)</SelectItem>
                                <SelectItem value="Rigel">Rigel (Stable)</SelectItem>
                                <SelectItem value="Orion">Orion (Dynamic)</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <Button 
                        onClick={handleSynthesize}
                        disabled={loading || !text}
                        className="w-full bg-emerald-500 text-white font-bold h-16 uppercase tracking-widest gap-2 glow-emerald"
                       >
                        {loading ? <Loader2 className="size-5 animate-spin" /> : <Zap className="size-5" />}
                        Generate
                       </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Playback Section */}
              {result && (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                  <Card className="glass-card border-white/5 overflow-hidden">
                    <CardHeader className="bg-white/2 border-b border-white/5 py-4">
                       <div className="flex justify-between items-center">
                          <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                             <FileAudio className="size-4" /> Imperial Playback Node
                          </CardTitle>
                          <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] h-5">VERIFIED_TRACK</Badge>
                       </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                       <div className="flex flex-col items-center justify-center py-10 space-y-6">
                          <div className="size-24 rounded-full bg-emerald-500/10 flex items-center justify-center border-4 border-emerald-500/20 relative group">
                             <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin-slow" />
                             <Music className="size-10 text-emerald-500 animate-pulse" />
                          </div>
                          <div className="w-full max-w-xl bg-black/60 rounded-full p-4 border border-white/10">
                             <audio controls className="w-full h-10 invert brightness-100" src={result.media}>
                                Your browser does not support the audio element.
                             </audio>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                          <div className="space-y-4">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-xl">
                                   <Radio className="size-6 text-emerald-500 animate-pulse" />
                                </div>
                                <div>
                                   <p className="text-[10px] font-bold text-muted-foreground uppercase">Track Duration (Sim)</p>
                                   <p className="text-lg font-headline font-bold text-white uppercase">{result.durationSimulated}</p>
                                </div>
                             </div>
                             <p className="text-xs text-muted-foreground italic leading-relaxed">
                                "This track has been synthesized and converted to WAV using the One Engine mMainframe protocols."
                             </p>
                          </div>
                          <div className="flex flex-col gap-3 justify-center">
                             <Button 
                              onClick={downloadAudio}
                              className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest gap-2 glow-primary"
                             >
                                <Download className="size-4" /> Download Track (.wav)
                             </Button>
                             <Button 
                              variant="outline"
                              className="w-full border-white/10 text-white font-bold h-12 uppercase text-[10px] gap-2"
                             >
                                <Database className="size-3" /> Archive to Vault
                             </Button>
                          </div>
                       </div>
                       
                       <div className="pt-6 border-t border-white/5">
                          <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Audio Integrity Seal (HMAC_V4_66)</p>
                          <code className="text-[9px] text-emerald-500 font-mono block truncate">{result.audioHash}</code>
                       </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <Lock className="size-4" /> Secure Synthesis Policy
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Every audio pulse is converted to high-fidelity WAV format to prevent bit-loss and ensure absolute sonic sovereignty."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">SONIC_SECURITY: L4</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <History className="size-4" /> Lab History
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {history.length === 0 && <p className="text-[10px] text-muted-foreground italic text-center py-4">No recent synthesis logs.</p>}
                     {history.map((log, i) => (
                       <div key={i} className="p-2.5 bg-white/5 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-bold text-white uppercase truncate max-w-[120px]">{log.title}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">{log.date}</p>
                          </div>
                          <CheckCircle2 className="size-3 text-emerald-500 opacity-50 group-hover:opacity-100" />
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Activity className="size-3" /> Synthesis Torque
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="flex justify-between items-center text-[10px] font-mono mb-2 uppercase">
                        <span className="text-muted-foreground">Neural Load</span>
                        <span className="text-emerald-500 font-bold">Optimal</span>
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
