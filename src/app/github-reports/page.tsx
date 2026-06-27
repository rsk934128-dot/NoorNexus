"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Github, 
  RefreshCcw, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  Cpu, 
  Activity, 
  History,
  FileCode,
  CheckCircle2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Sparkles,
  Database,
  Search,
  LayoutGrid,
  TrendingUp,
  Award,
  Code2,
  Terminal,
  ArrowRight
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/firebase"
import { processGithubReports, GithubIntelOutput } from "@/ai/flows/github-intelligence-flow"

export default function GithubReportsPage() {
  const { toast } = useToast()
  const { user } = useUser()
  const [syncing, setSyncing] = useState(false)
  const [result, setResult] = useState<GithubIntelOutput | null>(null)
  
  const [mockRepos, setMockRepos] = useState([
    { name: "noornexus-os-v3", status: "ACTIVE", commits: 184, stars: 24, language: "TypeScript", torque: 98 },
    { name: "fusionpay-gateway", status: "SYNCED", commits: 92, stars: 15, language: "TypeScript", torque: 94 },
    { name: "nora-ai-suite", status: "STABLE", commits: 256, stars: 56, language: "Genkit", torque: 99 },
    { name: "sovereign-vault-p55", status: "ANCHORED", commits: 42, stars: 8, language: "Security", torque: 100 }
  ])

  async function handleGithubSync() {
    if (!user) {
      toast({ title: "Auth Drift Detected", description: "Commander, please re-authenticate.", variant: "destructive" })
      return
    }
    setSyncing(true)
    setResult(null)
    
    try {
      toast({ title: "Initiating GitHub Handshake", description: "Pulsing repository nodes for Sheikh Farid..." })
      
      // Simulating a data fetch from GitHub API with enhanced delay for visual sync
      await new Promise(r => setTimeout(r, 2500))
      
      const res = await processGithubReports({
        username: user.displayName || "skfarid",
        repoCount: mockRepos.length,
        topProjects: mockRepos.map(r => r.name),
        lastCommitMessage: "Mission 500: Syncing Repository Intelligence to Sovereign Mesh."
      })
      
      setResult(res)
      toast({ 
        title: "Reports Synchronized", 
        description: "Repository data anchored to NoorNexus Intelligence Hub.",
        className: "border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      })
    } catch (e: any) {
      toast({ title: "Sync Failed", description: e.message, variant: "destructive" })
    } finally {
      setSyncing(false)
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
                 <Badge variant="outline" className="border-white/20 text-white uppercase font-bold tracking-widest px-3 h-8 bg-white/5 text-[10px]">
                   <Github className="size-3 mr-2" /> Project #62: Repository Intel
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <Code2 className="size-3 mr-2" /> CODE_TORQUE: ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                GitHub <span className="text-white">Intelligence.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Code Excellence Monitoring." আপনার গিটহাব রিপোজিটরি এবং কোডবেস এখন নূরনেক্সাস এআই-এর স্নায়বিক অডিটের আওতায়।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex flex-col items-center justify-center p-1 bg-white/5 rounded-full border border-white/10 glow-primary animate-pulse-slow">
                  <div className="size-12 rounded-full border-2 border-white flex items-center justify-center bg-black">
                     <Github className="size-6 text-white animate-spin-slow" />
                  </div>
               </div>
               <Button 
                onClick={handleGithubSync} 
                disabled={syncing}
                className="bg-white text-black font-bold h-14 px-8 uppercase tracking-widest gap-3 hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
               >
                 {syncing ? <Loader2 className="size-5 animate-spin" /> : <RefreshCcw className="size-5" />}
                 Sync Repository Nodes
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              
              {/* Nora-62 Intel Summary */}
              {result && (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                  <Card className="glass-card border-t-4 border-t-emerald-500 bg-emerald-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                       <Sparkles className="size-48 text-emerald-500" />
                    </div>
                    <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/20 py-4">
                       <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2 tracking-widest">
                             <Cpu className="size-4" /> Nora-62 Neural Dispatch
                          </CardTitle>
                          <Badge className="bg-emerald-500 text-black border-none text-[8px] h-5 font-bold">VERIFIED_COHESION</Badge>
                       </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                             <div className="p-6 bg-black/40 rounded-2xl border border-white/10 space-y-4 shadow-xl">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Code Torque Factor</h4>
                                <div className="flex items-end gap-3">
                                   <p className="text-6xl font-headline font-black text-white tracking-tighter">{result.impactScore}<span className="text-primary text-xl ml-1">%</span></p>
                                   <p className="text-emerald-500 text-xs font-bold mb-2 uppercase">Optimal Velocity</p>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                   <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${result.impactScore}%` }} />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                   <Target className="size-3" /> Tactical Coding Directives
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                   {result.recommendations.map((r, i) => (
                                     <div key={i} className="flex items-center gap-3 p-3 bg-white/2 rounded-xl border border-white/5 group hover:bg-emerald-500/10 transition-colors">
                                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                                        <p className="text-xs text-white/80">{r}</p>
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                          <div className="space-y-6">
                             <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 relative">
                                <Quote className="absolute top-4 right-4 size-10 text-primary opacity-10" />
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Architect Synthesis</h4>
                                <p className="text-lg text-white leading-relaxed italic font-light">
                                   "{result.synthesis}"
                                </p>
                             </div>
                             <div className="pt-4 space-y-2 border-t border-white/5">
                                <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Intelligence Seal (HMAC_V4_62)</p>
                                <code className="text-[10px] text-primary font-mono block bg-black/60 p-3 rounded-lg border border-white/5 break-all leading-tight">
                                   {result.intelHash}
                                </code>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Repositories Node Grid */}
              <section className="space-y-6">
                 <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-white flex items-center gap-2">
                       <LayoutGrid className="size-4" /> Active Repository Nodes
                    </h3>
                    <div className="flex gap-2">
                       <Badge variant="outline" className="border-white/10 text-muted-foreground text-[8px] uppercase">{mockRepos.length} Total Nodes</Badge>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockRepos.map((repo, i) => (
                      <Card key={i} className="glass-card bg-black/40 border-white/5 hover:border-primary/40 transition-all group overflow-hidden">
                        <CardContent className="p-6 flex flex-col gap-6">
                           <div className="flex justify-between items-start">
                              <div className="flex items-center gap-4">
                                 <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all">
                                    <FileCode className="size-6 text-white" />
                                 </div>
                                 <div className="space-y-0.5">
                                    <h4 className="text-lg font-headline font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">{repo.name}</h4>
                                    <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">{repo.language} | {repo.status}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-xs font-headline font-bold text-emerald-500">{repo.torque}%</p>
                                 <p className="text-[7px] text-muted-foreground uppercase font-bold">Node Torque</p>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                              <div className="space-y-1">
                                 <p className="text-[8px] text-muted-foreground uppercase font-bold">Sync Level</p>
                                 <Badge className="bg-primary/20 text-primary border-none text-[8px] h-4">LEVEL_L4</Badge>
                              </div>
                              <div className="space-y-1 text-center">
                                 <p className="text-[8px] text-muted-foreground uppercase font-bold">Total Pulses</p>
                                 <p className="text-xs font-bold text-white flex items-center justify-center gap-1"><GitCommit className="size-3" /> {repo.commits}</p>
                              </div>
                              <div className="space-y-1 text-right">
                                 <p className="text-[8px] text-muted-foreground uppercase font-bold">Verification</p>
                                 <CheckCircle2 className="size-4 text-emerald-500 ml-auto" />
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

            </div>

            {/* Sidebar Security & Metrics */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-white bg-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Lock className="size-16 text-white" />
                  </div>
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-white flex items-center gap-2">
                        <Lock className="size-4" /> Secure Registry Policy
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your GitHub tokens are ephemeral and never stored in the global data lake. Nora-62 accesses repository nodes via a single-use neural bridge."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-white/20 text-white uppercase text-[9px] font-bold tracking-widest">BRIDGE_SECURITY: L4</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <Activity className="size-4" /> Mesh Pulse Metrics
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { label: "Handshake Speed", val: "28ms", color: "text-emerald-500" },
                       { label: "Sync Fidelity", val: "100.0%", color: "text-primary" },
                       { label: "Drift Protection", val: "ARMED", color: "text-white" },
                       { label: "Active Channels", val: "15", color: "text-primary" }
                     ].map((s, i) => (
                       <div key={i} className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2 last:border-0">
                          <span className="uppercase text-muted-foreground">{s.label}</span>
                          <span className={`${s.color} font-bold`}>{s.val}</span>
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> Intelligence Logs
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                        "Last automated node audit performed at 02:42 AM. No integrity drift detected in the code-base."
                     </p>
                     <div className="flex gap-2 mt-4">
                        <Button variant="outline" className="flex-1 h-8 text-[8px] uppercase font-bold border-white/10 hover:bg-white/5">Full Log</Button>
                        <Button variant="outline" className="flex-1 h-8 text-[8px] uppercase font-bold border-white/10 hover:bg-white/5">Audit History</Button>
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

function Quote(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H5c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 4-4 6-4 6" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-3c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 4-4 6-4 6" />
    </svg>
  )
}
