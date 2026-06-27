
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
  Award
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore } from "@/firebase"
import { processGithubReports, GithubIntelOutput } from "@/ai/flows/github-intelligence-flow"

export default function GithubReportsPage() {
  const { toast } = useToast()
  const { user } = useUser()
  const [syncing, setSyncing] = useState(false)
  const [result, setResult] = useState<GithubIntelOutput | null>(null)
  
  const [mockRepos, setMockRepos] = useState([
    { name: "noornexus-v3", status: "ACTIVE", commits: 142, stars: 12 },
    { name: "fusionpay-core", status: "SYNCED", commits: 88, stars: 8 },
    { name: "nora-ai-suite", status: "STABLE", commits: 256, stars: 45 }
  ])

  async function handleGithubSync() {
    if (!user) return
    setSyncing(true)
    setResult(null)
    
    try {
      toast({ title: "Initiating GitHub Handshake", description: "Pulsing repository nodes..." })
      
      // Simulating a data fetch from GitHub API
      await new Promise(r => setTimeout(r, 2000))
      
      const res = await processGithubReports({
        username: user.displayName || "skfarid",
        repoCount: 15,
        topProjects: ["noornexus-os", "fusionpay", "nora-ai"],
        lastCommitMessage: "Mission 500: Syncing GitHub Reports to Sovereign Mesh."
      })
      
      setResult(res)
      toast({ 
        title: "Reports Synchronized", 
        description: "GitHub data anchored to NoorNexus Intelligence Hub.",
        className: "border-emerald-500/50 bg-emerald-500/5"
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
                   <Github className="size-3 mr-2" /> Project #62: GitHub Intel
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <GitBranch className="size-3 mr-2" /> MESH_SYNC: ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                GitHub <span className="text-white">Intelligence.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Code Torque Monitoring." গিটহাব থেকে আপনার প্রোজেক্টের ডাটা এবং রিপোর্টগুলো এখন নূরনেক্সাস এআই দ্বারা নিয়ন্ত্রিত।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleGithubSync} 
                disabled={syncing}
                className="bg-white text-black font-bold h-12 uppercase tracking-widest gap-2 hover:bg-white/90"
               >
                 {syncing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                 Sync GitHub Reports
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              
              {/* AI Intel Dispatch */}
              {result && (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                  <Card className="glass-card border-t-4 border-t-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                             <Sparkles className="size-4" /> Nora-62 Synthesis Dispatch
                          </CardTitle>
                          <Badge className="bg-emerald-500 text-black border-none text-[8px] h-5">VERIFIED_REPORT</Badge>
                       </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                             <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Development Torque</h4>
                                <div className="flex items-end gap-3">
                                   <p className="text-4xl font-headline font-bold text-white">{result.impactScore}%</p>
                                   <p className="text-emerald-500 text-xs font-bold mb-1 uppercase">OPTIMAL</p>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-emerald-500" style={{ width: `${result.impactScore}%` }} />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Strategic Directives</h4>
                                <ul className="space-y-2">
                                   {result.recommendations.map((r, i) => (
                                     <li key={i} className="text-xs text-white flex items-center gap-2">
                                        <CheckCircle2 className="size-3 text-emerald-500" /> {r}
                                     </li>
                                   ))}
                                </ul>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Synthesis Report</h4>
                             <p className="text-sm text-white leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">
                                "{result.synthesis}"
                             </p>
                             <div className="pt-4 border-t border-white/5">
                                <p className="text-[8px] font-mono text-muted-foreground uppercase">Intel Seal (Nora-62)</p>
                                <code className="text-[9px] text-primary font-mono truncate block">{result.intelHash}</code>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Repositories Grid */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-white flex items-center gap-2">
                    <LayoutGrid className="size-4" /> Active Repository Nodes
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockRepos.map((repo, i) => (
                      <Card key={i} className="glass-card bg-black/40 border-white/5 hover:border-white/20 transition-all group">
                        <CardContent className="p-5 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                 <FileCode className="size-5 text-white opacity-60" />
                              </div>
                              <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{repo.status}</Badge>
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-sm font-bold text-white uppercase truncate">{repo.name}</h4>
                              <div className="flex items-center gap-4 text-[8px] text-muted-foreground font-mono uppercase">
                                 <span className="flex items-center gap-1"><GitCommit className="size-2.5" /> {repo.commits} Commits</span>
                                 <span className="flex items-center gap-1">★ {repo.stars} Stars</span>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

            </div>

            {/* Sidebar Controls */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-white bg-white/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-white flex items-center gap-2">
                        <Lock className="size-4" /> Secure Auth Policy
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your GitHub tokens are encrypted and isolated at the node level. No raw tokens are stored in the data lake."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-white/20 text-white uppercase text-[9px] font-bold">SHA_256_ACTIVE</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <Activity className="size-4" /> Code Integrity Pulse
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { label: "Commit Velocity", val: "94%", color: "text-emerald-500" },
                       { label: "CI/CD Status", val: "PASSED", color: "text-primary" },
                       { label: "Drift Level", val: "LOW", color: "text-white" }
                     ].map((s, i) => (
                       <div key={i} className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2">
                          <span className="uppercase text-muted-foreground">{s.label}</span>
                          <span className={`${s.color} font-bold`}>{s.val}</span>
                       </div>
                     ))}
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> Report Archives
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                        "Last GitHub report anchored to Imperial Vault: 2h ago."
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
