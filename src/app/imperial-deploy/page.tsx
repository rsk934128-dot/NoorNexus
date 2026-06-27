
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
  Rocket, 
  Globe, 
  Terminal, 
  Zap, 
  Loader2, 
  ShieldCheck, 
  Menu, 
  RefreshCcw, 
  Monitor, 
  LayoutGrid, 
  Database,
  Lock,
  Sparkles,
  ArrowRight,
  History,
  CheckCircle2,
  FileCode,
  Github,
  CloudUpload,
  ExternalLink,
  Code2,
  Settings2,
  Cpu,
  Infinity
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore } from "@/firebase"
import { orchestrateDeployment, DeployOutput } from "@/ai/flows/deployment-orchestrator-flow"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ImperialDeployPage() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  
  const [loading, setLoading] = useState(false)
  const [appName, setAppName] = useState("")
  const [repoUrl, setRepoUrl] = useState("")
  const [stack, setBuildStack] = useState("Next.js / Tailwind")
  const [result, setResult] = useState<DeployOutput | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'CONSOLE' | 'LIVE'>('CONSOLE')

  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  async function handleDeploy() {
    if (!appName || !user) return
    setLoading(true)
    setResult(null)
    setLogs(["[SYSTEM] INITIALIZING DEPLOYMENT HANDSHAKE...", "[SYSTEM] CALIBRATING BUILD NODES..."])
    setViewMode('CONSOLE')

    try {
      const res = await orchestrateDeployment({
        appName,
        repoUrl,
        buildStack: stack,
        ownerEmail: user.email!,
        environment: 'SANDBOX'
      })

      // Stream logs visually
      for (const log of res.buildLogs) {
        await new Promise(r => setTimeout(r, 600))
        setLogs(prev => [...prev, log])
      }

      setResult(res)
      
      await addDoc(collection(db, "deployments"), {
        ...res,
        appName,
        owner: user.email,
        timestamp: serverTimestamp()
      })

      toast({ 
        title: "Deployment Finalized", 
        description: `App anchored to ${res.liveUrl}`,
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    } catch (e: any) {
      toast({ title: "Deployment Drift", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
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
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Infinity className="size-3 mr-2" /> Project #190: Imperial PaaS
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Rocket className="size-3 mr-2" /> Live Hosting Enabled
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Sovereign <span className="text-purple-500">Deploy.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Code once, Deploy to 100 Nodes." আপনার বানানো ওয়েবসাইট বা অ্যাপ্লিকেশন এখন নূরনেক্সাস সাম্রাজ্যের সুরক্ষিত টানেলে হোস্ট করার ব্যবস্থা।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-purple-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Active Clusters</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase">PEAK_STABLE</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Deployment Config */}
                 <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                          <Settings2 className="size-4 text-primary" /> Application Blueprint
                       </CardTitle>
                       <CardDescription>Configure your deployment coordinates.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Application Name</Label>
                             <Input 
                               value={appName}
                               onChange={e => setAppName(e.target.value)}
                               placeholder="e.g. My-Empire-App" 
                               className="bg-background/50 border-white/10 h-12"
                             />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">GitHub Repository (Optional)</Label>
                             <div className="relative">
                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input 
                                  value={repoUrl}
                                  onChange={e => setRepoUrl(e.target.value)}
                                  placeholder="https://github.com/..." 
                                  className="bg-background/50 border-white/10 h-12 pl-10 font-mono text-xs"
                                />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Framework Stack</Label>
                             <select 
                              value={stack}
                              onChange={e => setBuildStack(e.target.value)}
                              className="w-full h-12 bg-background/50 border border-white/10 rounded-md px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                             >
                                <option value="Next.js / Tailwind">Next.js 15 (Zenith)</option>
                                <option value="React / Vite">React 19 / Vite</option>
                                <option value="HTML / CSS / JS">Pure HTML / CSS / JS</option>
                             </select>
                          </div>
                       </div>
                       <Button 
                         onClick={handleDeploy} 
                         disabled={loading || !appName}
                         className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary gap-3"
                       >
                          {loading ? <Loader2 className="size-5 animate-spin" /> : <CloudUpload className="size-5" />}
                          Trigger Deployment
                       </Button>
                    </CardContent>
                 </Card>

                 {/* Console / Preview Panel */}
                 <Card className="glass-card flex flex-col border-t-4 border-t-purple-500 bg-black/40 overflow-hidden min-h-[400px]">
                    <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
                       <div className="flex gap-2">
                          <Button 
                            variant={viewMode === 'CONSOLE' ? 'default' : 'ghost'} 
                            size="sm" 
                            onClick={() => setViewMode('CONSOLE')}
                            className="text-[9px] uppercase font-bold h-7 px-3"
                          >
                             Console
                          </Button>
                          <Button 
                            variant={viewMode === 'LIVE' ? 'default' : 'ghost'} 
                            size="sm" 
                            disabled={!result}
                            onClick={() => setViewMode('LIVE')}
                            className="text-[9px] uppercase font-bold h-7 px-3"
                          >
                             Live Preview
                          </Button>
                       </div>
                       <Badge variant="outline" className="border-purple-500/20 text-purple-400 text-[7px] uppercase">
                          Node: SG-PEAK-01
                       </Badge>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 relative">
                       {viewMode === 'CONSOLE' ? (
                         <div className="bg-black/80 size-full p-4 font-mono text-[10px] leading-relaxed text-emerald-400/80 overflow-y-auto">
                            {logs.map((log, i) => (
                              <div key={i} className="flex gap-2">
                                 <span className="text-white/20 select-none">{i+1}</span>
                                 <span className="whitespace-pre-wrap">{log}</span>
                              </div>
                            ))}
                            {loading && (
                              <div className="flex items-center gap-2 mt-2 text-primary animate-pulse">
                                 <span className="size-1 rounded-full bg-primary" />
                                 <span>Processing Deployment Vector...</span>
                              </div>
                            )}
                            <div ref={logEndRef} />
                         </div>
                       ) : (
                         <div className="size-full bg-white relative">
                            {result && (
                              <iframe 
                                src={result.liveUrl} 
                                className="size-full border-0"
                                title="App Preview"
                              />
                            )}
                         </div>
                       )}
                    </CardContent>
                 </Card>
              </div>

              {/* Successful Deployment Info */}
              {result && (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                   <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                      <CardContent className="p-8 space-y-6">
                         <div className="flex flex-col sm:flex-row justify-between gap-8">
                            <div className="space-y-4 flex-1">
                               <div className="flex items-center gap-3">
                                  <div className="size-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                     <Globe className="size-6 text-emerald-500" />
                                  </div>
                                  <div>
                                     <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">{appName}</h3>
                                     <p className="text-[10px] text-emerald-500 font-mono font-bold">{result.liveUrl}</p>
                                  </div>
                               </div>
                               <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                                  <div className="space-y-1">
                                     <p className="text-[8px] text-muted-foreground uppercase font-bold">Deployment ID</p>
                                     <p className="text-xs font-mono text-white">{result.deployId}</p>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[8px] text-muted-foreground uppercase font-bold">Compliance Score</p>
                                     <p className="text-xs font-mono text-emerald-500">{result.complianceScore}%</p>
                                  </div>
                               </div>
                            </div>
                            <div className="flex flex-col justify-center gap-3 w-full sm:w-64">
                               <Button className="w-full bg-emerald-500 text-white font-bold h-12 uppercase text-[10px] glow-emerald gap-2" onClick={() => window.open(result.liveUrl, '_blank')}>
                                  <ExternalLink className="size-4" /> Visit Website
                               </Button>
                               <Button variant="outline" className="w-full border-white/10 text-white font-bold h-12 uppercase text-[10px] gap-2">
                                  <LayoutGrid className="size-4" /> Manage Domains
                               </Button>
                            </div>
                         </div>
                         <div className="pt-4 border-t border-white/5">
                            <p className="text-[8px] font-mono text-muted-foreground uppercase mb-1">Deployment Signature (HMAC_V4_190)</p>
                            <code className="text-[10px] text-primary font-mono block truncate">{result.deploymentHash}</code>
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
                        <Lock className="size-4" /> Zero-Trust Hosting
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Every hosted application is isolated in a Sovereign Sandbox. No cross-app data leakage is permitted via the 100-node mesh."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold tracking-widest">L4_ISOLATION: ON</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <History className="size-4" /> Build History
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { app: "Fusion-Dashboard", status: "LIVE", time: "2d ago" },
                       { app: "Empire-Portfolio", status: "ARCHIVED", time: "1w ago" }
                     ].map((log, i) => (
                       <div key={i} className="p-2.5 bg-white/5 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-bold text-white uppercase truncate max-w-[100px]">{log.app}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">{log.time}</p>
                          </div>
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{log.status}</Badge>
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Database className="size-16 text-white" />
                  </div>
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Cpu className="size-3" /> Compute Torque
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="uppercase text-muted-foreground">Grid Load</span>
                        <span className="text-emerald-500 font-bold uppercase">Optimal</span>
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
