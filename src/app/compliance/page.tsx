
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Terminal, AlertCircle, CheckCircle2, Cpu, Activity, Zap, Menu, History, Loader2 } from "lucide-react"
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
        aiAssessment: result
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
                <h2 className="text-2xl sm:text-3xl font-headline font-bold">Nora-01 Compliance Agent</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                Autonomous cryptographic defense and automated security audit trail.
              </p>
            </div>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 h-10 px-4">L4_CONSENSUS_ACTIVE</Badge>
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
                    Initiate Audit & Logging
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2">
                     <History className="size-4" /> Conflict Resolution Log
                   </CardTitle>
                   <CardDescription className="text-[10px]">Persistent record of historical security decisions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {historyLoading ? <Loader2 className="size-4 animate-spin mx-auto" /> : (
                    auditHistory.map((log: any) => (
                      <div key={log.id} className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between group">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase truncate">{log.path}</p>
                          <p className="text-[8px] text-muted-foreground font-mono">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                        <Badge variant="outline" className={`text-[8px] ${log.result === 'ACCEPTED' ? 'border-emerald-500/30 text-emerald-500' : 'border-destructive/30 text-destructive'}`}>
                          {log.result}
                        </Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${results ? (results.anomalyDetected ? 'border-t-destructive' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2 uppercase tracking-tighter">
                     <Cpu className="size-4 text-primary" />
                     AI Audit Reasoning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5 font-mono text-xs min-h-[150px] relative overflow-hidden">
                     {typing && <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-progress" />}
                     <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {reasoningStream || (loading ? "Analyzing cryptographic drift..." : "Awaiting protocol packet for analysis...")}
                     </p>
                  </div>

                  {results && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div className="p-3 bg-muted/20 rounded-lg flex items-center gap-3">
                        {results.anomalyDetected ? <AlertCircle className="size-5 text-destructive" /> : <CheckCircle2 className="size-5 text-emerald-500" />}
                        <span className="text-xs font-bold uppercase">{results.anomalyDetected ? results.anomalyType : "INTEGRITY_VERIFIED"}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Recommended Self-Learning Actions</p>
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
              
              <Card className="glass-card bg-primary/5">
                <CardHeader className="pb-2">
                   <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                     <Activity className="size-3" /> Agent Neural Confidence
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="flex justify-between text-[10px] font-mono mb-2">
                     <span>Precision:</span>
                     <span className="text-emerald-500">99.8%</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[99.8%]" />
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
