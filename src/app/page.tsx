
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Globe, Cpu, Activity, Landmark, Radar, Terminal, Menu, FileText, Loader2, Server, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"
import { ledgerAudit, LedgerAuditOutput } from "@/ai/flows/ledger-audit-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection } from "@/firebase"
import { collection } from "firebase/firestore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SovereignLogo } from "@/components/sovereign-logo"

export default function Home() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(true)
  const [statusText, setStatusText] = useState("INITIALIZING HMAC_V4 BORDER...")
  const [auditing, setAuditing] = useState(false)
  const [auditResult, setAuditResult] = useState<LedgerAuditOutput | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Real-time infrastructure data
  const { data: nodes } = useCollection<any>(collection(db, "nodes"))
  const { data: news } = useCollection<any>(collection(db, "sports_news"))

  useEffect(() => {
    const sequence = [
      { text: "INITIALIZING HMAC_V4 BORDER...", time: 800 },
      { text: "VERIFYING NODE TRUST MESH...", time: 1600 },
      { text: "ESTABLISHING TREASURY LEDGER...", time: 2400 },
      { text: "AI COMPLIANCE AGENT ONLINE", time: 3000 },
      { text: "SOVEREIGN INFRASTRUCTURE READY", time: 3600 },
    ]

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setStatusText(step.text)
        if (i === sequence.length - 1) setLoading(false)
      }, step.time)
    })
  }, [])

  async function handleExecuteAudit() {
    setAuditing(true)
    setAuditResult(null)
    try {
      const result = await ledgerAudit({
        totalVolume: 2552000,
        settlementQueue: 124,
        liquidityHealth: 98,
        dailyThroughput: 1400000,
      })
      setAuditResult(result)
      setIsDialogOpen(true)
      toast({
        title: "Audit Complete",
        description: `Status: ${result.auditStatus} | Score: ${result.securityScore}`,
      })
    } catch (error: any) {
      console.error("Audit UI Error:", error)
      toast({
        title: "Audit AI Error",
        description: error.message || "Failed to communicate with Imperial Treasury Auditor.",
        variant: "destructive",
      })
    } finally {
      setAuditing(false)
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 space-y-12 animate-in fade-in duration-1000">
        <SovereignLogo size={150} />
        <div className="space-y-6 text-center max-w-xs sm:max-w-md w-full">
          <h1 className="text-primary font-headline text-3xl sm:text-4xl font-black tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(0,150,255,0.5)]">
            NoorNexus OS
          </h1>
          <p className="text-muted-foreground font-mono text-[10px] sm:text-[12px] tracking-[0.4em] uppercase h-6">
            {statusText}
          </p>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary animate-progress" />
          </div>
        </div>
      </div>
    )
  }

  const activeNodes = nodes.filter(n => n.status === "Operational").length

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col gap-6 border-b border-white/5 pb-8">
            <div className="flex items-center justify-between md:hidden">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="size-6" />
                </Button>
              </SidebarTrigger>
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase tracking-tighter">MISSION 400</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Operational OS v3</Badge>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 glow-emerald uppercase tracking-tighter">Mission 400 Active</Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-headline font-bold tracking-tighter">Sovereign <span className="text-primary">Intelligence.</span></h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Autonomous cryptographic defense and infrastructure orchestration. Currently managing <span className="text-white font-mono">{nodes.length}</span> distributed nodes.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Nodes", value: activeNodes, sub: `of ${nodes.length} Provisoned`, icon: Server, color: "text-primary" },
              { label: "Mesh Integrity", value: "99.9%", sub: "HMAC_V4 Verified", icon: Shield, color: "text-emerald-500" },
              { label: "Threat Matrix", value: "ZERO", sub: "Last Scan: 12ms", icon: Radar, color: "text-destructive" },
              { label: "Directives", value: news.length, sub: "Live Broadcasts", icon: Terminal, color: "text-amber-500" },
            ].map((stat, i) => (
              <Card key={i} className="glass-card hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</span>
                  <stat.icon className={`size-4 ${stat.color} transition-transform group-hover:scale-110`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-headline font-bold tracking-tight">{stat.value}</div>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1 opacity-70">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-l-4 border-l-primary scan-effect relative overflow-hidden h-[300px] sm:h-[400px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline text-base uppercase">
                    <Globe className="size-5 text-primary" />
                    Infrastructure Topology
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full relative overflow-hidden">
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="size-48 sm:size-64 rounded-full border border-primary/20 animate-spin-slow absolute" />
                    <div className="size-32 sm:size-48 rounded-full border border-primary/10 absolute" />
                    {nodes.map((node: any, i: number) => (
                      <div 
                        key={node.id}
                        className={`absolute size-2 sm:size-3 rounded-full glow-primary transition-all duration-1000 ${node.status === 'Operational' ? 'bg-primary' : 'bg-destructive'}`}
                        style={{ 
                          transform: `rotate(${(360 / (nodes.length || 1)) * i}deg) translateY(-80px) sm:translateY(-120px)` 
                        }}
                      />
                    ))}
                    <div className="size-3 sm:size-4 bg-primary rounded-full animate-ping shadow-[0_0_20px_rgba(0,150,255,0.8)]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-headline text-base uppercase">Treasury Pulse</CardTitle>
                  <CardDescription className="text-xs uppercase">Real-time liquidity health.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: "Sovereign-BDT", amount: "1.4B", health: 98, color: "bg-emerald-500" },
                    { label: "Asset-Mesh", amount: "420M", health: 94, color: "bg-primary" },
                  ].map((asset, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{asset.label}</span>
                        <span className="text-sm font-headline font-bold">{asset.amount}</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${asset.color} transition-all duration-1000`} style={{ width: `${asset.health}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-white/5">
                     <Button 
                       onClick={handleExecuteAudit}
                       disabled={auditing}
                       className="w-full bg-primary text-primary-foreground py-3 rounded font-bold text-[10px] uppercase tracking-widest h-auto glow-primary"
                     >
                        {auditing ? <Loader2 className="animate-spin mr-2 size-3" /> : <FileText className="size-3 mr-2" />}
                        {auditing ? "Auditing Mesh..." : "Execute Ledger Audit"}
                     </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-primary/20 w-[95vw] sm:max-w-[600px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-headline text-xl sm:text-2xl flex items-center gap-2 text-primary">
              <Shield className="size-6" />
              IMPERIAL AUDIT REPORT
            </DialogTitle>
          </DialogHeader>
          
          {auditResult ? (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Status</p>
                  <p className={`text-lg font-headline font-bold ${auditResult.auditStatus === 'STABLE' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {auditResult.auditStatus}
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-right">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Integrity Score</p>
                  <p className="text-2xl sm:text-3xl font-headline font-bold text-primary">{auditResult.securityScore}%</p>
                </div>
              </div>
              <div className="bg-black/40 p-4 rounded border border-white/5 font-mono text-[10px] sm:text-xs leading-relaxed text-muted-foreground max-h-[200px] overflow-y-auto">
                {auditResult.detailedReport}
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-4">
               <AlertTriangle className="size-12 text-destructive mx-auto animate-pulse" />
               <p className="text-xs font-mono uppercase text-muted-foreground">Neural Handshake Terminated Prematurely.</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12">
              Confirm & Re-seal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
