"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  ShieldCheck, Terminal, AlertCircle, CheckCircle2, Cpu, Activity, Zap, 
  Menu, History, Loader2, ShieldAlert, Lock, ShieldEllipsis, RefreshCcw 
} from "lucide-react"
import { autonomousComplianceMonitor, AutonomousComplianceMonitorOutput } from "@/ai/flows/autonomous-compliance-monitor"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, query, orderBy, limit } from "firebase/firestore"

export default function CompliancePage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AutonomousComplianceMonitorOutput | null>(null)
  const [reasoningStream, setReasoningStream] = useState("")
  const [typing, setTyping] = useState(false)
  const [sovereignOverride, setSovereignOverride] = useState(true)

  const { data: auditHistory, loading: historyLoading } = useCollection<any>(
    query(collection(db, "border_logs"), orderBy("timestamp", "desc"), limit(5))
  )

  const [formData, setFormData] = useState({
    signature: "0x9a6c22bb3f1a4e2b8c9d0f1e2a3b4c5d",
    timestamp: Math.floor(Date.now() / 1000),
    payload: '{"action":"payout","amount":5000,"currency":"BDT"}',
    sourceNode: "Sirajganj-Edge-01",
    requestPath: "/api/v1/payout"
  })

  async function runMonitor() {
    setLoading(true)
    setResults(null)
    setReasoningStream("")
    setTyping(true)
    
    try {
      const result = await autonomousComplianceMonitor(formData)
      
      if (!result) throw new Error("AI Offline")

      // Log to Firestore Audit Trail
      await addDoc(collection(db, "border_logs"), {
        ...formData,
        timestamp: Date.now(),
        result: result.anomalyDetected ? "REJECTED" : "ACCEPTED",
        reason: result.assessmentDetails,
        riskScore: result.riskLevel === 'Critical' ? 95 : result.riskLevel === 'High' ? 80 : result.riskLevel === 'Medium' ? 50 : result.riskLevel === 'Low' ? 20 : 5,
        aiAssessment: result,
        securityTier: result.suggestedSecurityTier,
        keyRotationInterval: result.keyRotationIntervalSeconds,
        overrideActive: sovereignOverride
      })

      // Simulate typing for UX
      const reasoning = result.assessmentDetails
      let current = ""
      for (let i = 0; i < reasoning.length; i++) {
        current += reasoning[i]
        setReasoningStream(current)
        await new Promise(r => setTimeout(r, 5))
      }
      
      setResults(result)
      toast({
        title: result.anomalyDetected ? "Critical Anomaly Logged" : "Packet Verified",
        variant: result.anomalyDetected ? "destructive" : "default"
      })
    } catch (error: any) {
      toast({ title: "Audit Failed", description: error.message, variant: "destructive" })
      setReasoningStream("CRITICAL: Neural link failure in protocol audit.")
    } finally {
      setLoading(false)
      setTyping(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden text-primary">
                  <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                </SidebarTrigger>
                <ShieldCheck className="size-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-headline font-bold uppercase">Adaptive Sovereign Shield</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                Project 150: Collective Immune System Architecture.
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
               <div className="flex items-center gap-3 p-2 bg-primary/10 border border-primary/20 rounded-lg">
                 <Label htmlFor="override" className="text-[10px] font-bold uppercase text-primary">Sovereign Master Override</Label>
                 <Switch 
                  id="override" 
                  checked={sovereignOverride} 
                  onCheckedChange={setSovereignOverride}
                  className="data-[state=checked]:bg-primary"
                 />
               </div>
               <div className="flex gap-2">
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 h-8 px-3">SHIELD: ACTIVE</Badge>
                  <Badge variant="outline" className="text-primary border-primary/30 h-8 px-3 uppercase">Tier: {results?.suggestedSecurityTier || 'L1_NORMAL'}</Badge>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Terminal className="size-4" />
                    Security Packet Entry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">HMAC_V4 Signature</Label>
                      <Input value={formData.signature} onChange={e => setFormData({...formData, signature: e.target.value})} className="bg-background/50 font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Payload Environment</Label>
                      <textarea className="w-full min-h-[100px] bg-background/50 border border-white/10 rounded-md p-3 font-mono text-xs outline-none focus:ring-1 focus:ring-primary" value={formData.payload} onChange={e => setFormData({...formData, payload: e.target.value})} />
                    </div>
                  </div>
                  <Button onClick={runMonitor} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary" disabled={loading}>
                    {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                    Analyze & Pulse Mesh
                  </Button>
                </CardContent>
              </Card>

              {results && (
                <div className="grid grid-cols-2 gap-4">
                  <Card className="glass-card bg-primary/5 border-primary/20">
                    <CardHeader className="py-3">
                       <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                         <RefreshCcw className="size-3" /> Key Hardening
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-xl font-headline font-bold">{results.keyRotationIntervalSeconds}s</p>
                       <p className="text-[8px] text-muted-foreground uppercase font-mono">Rotation Interval</p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
                    <CardHeader className="py-3">
                       <CardTitle className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2">
                         <ShieldEllipsis className="size-3" /> Mesh Consensus
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-xl font-headline font-bold">400/400</p>
                       <p className="text-[8px] text-muted-foreground uppercase font-mono">Nodes Updated</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${results ? (results.anomalyDetected ? 'border-t-destructive' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2 uppercase tracking-tighter">
                     <Cpu className="size-4 text-primary" />
                     Shield Reasoning Engine
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5 font-mono text-xs min-h-[150px] relative overflow-hidden">
                     {typing && <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-progress" />}
                     <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {reasoningStream || (loading ? "Simulating collective immune response..." : "Awaiting protocol packet for analysis...")}
                     </p>
                  </div>

                  {results && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div className="grid grid-cols-2 gap-4">
                         <div className={`p-3 rounded-lg flex items-center gap-3 ${results.anomalyDetected ? 'bg-destructive/10' : 'bg-emerald-500/10'}`}>
                           {results.anomalyDetected ? <AlertCircle className="size-5 text-destructive" /> : <CheckCircle2 className="size-5 text-emerald-500" />}
                           <span className="text-xs font-bold uppercase">{results.anomalyDetected ? results.anomalyType : "VERIFIED"}</span>
                         </div>
                         <div className={`p-3 rounded-lg flex items-center gap-3 bg-primary/10`}>
                           <Lock className="size-5 text-primary" />
                           <span className="text-xs font-bold uppercase">{results.suggestedSecurityTier}</span>
                         </div>
                      </div>

                      {results.nodeIsolationRequired && (
                         <div className={`p-4 rounded-lg flex items-center gap-4 transition-all ${sovereignOverride ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-destructive/20 border border-destructive/30 animate-pulse'}`}>
                            {sovereignOverride ? <ShieldAlert className="size-8 text-amber-500" /> : <ShieldAlert className="size-8 text-destructive" />}
                            <div>
                               <p className="text-xs font-bold uppercase">
                                 {sovereignOverride ? 'Isolation Recommendation' : 'Node Isolation Active'}
                               </p>
                               <p className="text-[10px] opacity-80">
                                 {sovereignOverride 
                                   ? `Awaiting Sovereign Seal for node ${formData.sourceNode} isolation.` 
                                   : `Immediate quarantine of ${formData.sourceNode} executed.`}
                               </p>
                               {sovereignOverride && (
                                 <Button size="sm" className="mt-2 h-7 text-[9px] bg-amber-500 text-white font-bold uppercase px-3">
                                   Seal Isolation
                                 </Button>
                               )}
                            </div>
                         </div>
                      )}
                      
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Adaptive Defense Recommendations</p>
                        {results.recommendedActions.map((action, i) => (
                          <div key={i} className="text-[10px] p-2 bg-white/5 rounded border border-white/5 flex items-center gap-2">
                            <div className="size-1 bg-primary rounded-full" />
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
