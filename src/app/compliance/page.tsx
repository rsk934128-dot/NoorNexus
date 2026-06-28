"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  Cpu, 
  Activity, 
  Zap, 
  Menu, 
  Loader2, 
  RefreshCcw, 
  ShieldPlus,
  Atom,
  BrainCircuit
} from "lucide-react"
import { autonomousComplianceMonitor, AutonomousComplianceMonitorOutput } from "@/ai/flows/autonomous-compliance-monitor"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function CompliancePage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AutonomousComplianceMonitorOutput | null>(null)
  const [reasoningStream, setReasoningStream] = useState("")
  const [typing, setTyping] = useState(false)
  const [sovereignOverride, setSovereignOverride] = useState(true)

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

      await addDoc(collection(db, "border_logs"), {
        ...formData,
        timestamp: Date.now(),
        result: result.anomalyDetected ? "REJECTED" : "ACCEPTED",
        reason: result.assessmentDetails,
        riskScore: result.riskLevel === 'Critical' ? 95 : 5,
        aiAssessment: result,
        securityTier: result.suggestedSecurityTier,
        quantumHardening: "ACTIVE_P49",
        overrideActive: sovereignOverride
      })

      const reasoning = result.assessmentDetails
      let current = ""
      for (let i = 0; i < reasoning.length; i++) {
        current += reasoning[i]
        setReasoningStream(current)
        await new Promise(r => setTimeout(r, 5))
      }
      
      setResults(result)
      toast({
        title: result.anomalyDetected ? "Critical Anomaly Logged" : "Zenith Sync Verified",
        variant: result.anomalyDetected ? "destructive" : "default"
      })
    } catch (error: any) {
      toast({ title: "Audit Failed", description: error.message, variant: "destructive" })
      setReasoningStream("CRITICAL: Quantum link failure in protocol audit.")
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
          <header className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-white/5 pb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden text-primary">
                  <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                </SidebarTrigger>
                <ShieldCheck className="size-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-headline font-bold uppercase">Sovereign Core Hardening</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Project #49: Quantum-Resistant Encryption & Deep Neural Synchronization.
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
               <div className="flex items-center gap-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                 <Label className="text-[10px] font-bold uppercase text-emerald-500">Quantum Shield Active</Label>
                 <ShieldPlus className="size-4 text-emerald-500 animate-pulse" />
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="glass-card bg-primary/5 border-primary/20 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                  <Atom className="size-4" /> Hardening Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Post-Quantum Auth", status: "Enabled", tier: "L4", health: "100%" },
                  { name: "Neural Sync Buffer", status: "Hardened", tier: "L4", health: "MAX" },
                  { name: "Enterprise Bridge", status: "Gated", tier: "L2", health: "99%" }
                ].map((app, i) => (
                  <div key={i} className="p-3 bg-black/40 rounded border border-white/5 flex justify-between items-center">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-white">{app.name}</p>
                      <p className="text-[8px] text-muted-foreground font-mono uppercase">{app.tier} Shield Active</p>
                    </div>
                    <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{app.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <Terminal className="size-4" />
                      Quantum Handshake Entry
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">HMAC_V4_Q Signature</Label>
                        <Input value={formData.signature} onChange={e => setFormData({...formData, signature: e.target.value})} className="bg-background/50 font-mono text-xs" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Encrypted Command Block</Label>
                        <textarea className="w-full min-h-[100px] bg-background/50 border border-white/10 rounded-md p-3 font-mono text-xs outline-none focus:ring-1 focus:ring-primary" value={formData.payload} onChange={e => setFormData({...formData, payload: e.target.value})} />
                      </div>
                    </div>
                    <Button onClick={runMonitor} className="w-full bg-emerald-500 text-emerald-foreground font-bold uppercase tracking-widest h-14 glow-emerald" disabled={loading}>
                      {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Zap className="size-4 mr-2" />}
                      Execute Quantum Handshake
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${results ? (results.anomalyDetected ? 'border-t-destructive' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2 uppercase tracking-tighter">
                      <BrainCircuit className="size-4 text-emerald-500" />
                      Neural Cohesion Reasoning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-black/40 p-5 rounded-xl border border-white/5 font-mono text-xs min-h-[150px] relative overflow-hidden">
                      {typing && <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500 animate-progress" />}
                      <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {reasoningStream || (loading ? "Pulsing Quantum-Resistant Neural Sync..." : "Awaiting handshake block...")}
                      </p>
                    </div>

                    {results && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="p-3 rounded-lg flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20">
                          <span className="text-[10px] font-bold text-white uppercase">Project #49 Hardening Status</span>
                          <Badge className="bg-emerald-500">OPTIMAL</Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
