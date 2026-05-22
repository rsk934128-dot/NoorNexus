
"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Terminal, Search, AlertCircle, CheckCircle2, Cpu, Activity, Zap } from "lucide-react"
import { autonomousComplianceMonitor, AutonomousComplianceMonitorOutput } from "@/ai/flows/autonomous-compliance-monitor"
import { useToast } from "@/hooks/use-toast"

export default function CompliancePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AutonomousComplianceMonitorOutput | null>(null)
  const [reasoningStream, setReasoningStream] = useState("")
  const [typing, setTyping] = useState(false)

  const [formData, setFormData] = useState({
    signature: "HEX_HMAC_V4_9a6c22bb3f1a",
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
      
      // Simulate kinetic typing for AI reasoning
      const reasoning = result.assessmentDetails
      let current = ""
      for (let i = 0; i < reasoning.length; i++) {
        current += reasoning[i]
        setReasoningStream(current)
        await new Promise(r => setTimeout(r, 10))
      }
      
      setResults(result)
      if (result.anomalyDetected) {
        toast({
          title: "Critical Anomaly Detected",
          description: `Risk Level: ${result.riskLevel}`,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Agent Error",
        description: "Failed to communicate with the autonomous monitor.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
      setTyping(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-8 text-primary" />
                <h2 className="text-3xl font-headline font-bold">Autonomous Compliance AI</h2>
              </div>
              <p className="text-muted-foreground">
                NoorNexus v3 Intelligence Layer monitoring border cryptographic anomalies.
              </p>
            </div>
            <div className="flex gap-2">
               <Badge className="bg-primary/20 text-primary border-primary/30">AGENT_01_ACTIVE</Badge>
               <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">L4_CONSENSUS</Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  <Terminal className="size-4" />
                  Sovereign Packet Inspector
                </CardTitle>
                <CardDescription>Analyze inter-node request headers for HMAC_V4 integrity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">X-Sovereign-Signature</Label>
                    <Input 
                      value={formData.signature} 
                      onChange={(e) => setFormData({...formData, signature: e.target.value})}
                      className="bg-background/50 font-mono text-sm border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">X-Sovereign-Timestamp (UNIX)</Label>
                    <Input 
                      type="number" 
                      value={formData.timestamp} 
                      onChange={(e) => setFormData({...formData, timestamp: parseInt(e.target.value)})}
                      className="bg-background/50 font-mono text-sm border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Request Payload</Label>
                    <textarea 
                      className="w-full min-h-[120px] bg-background/50 border border-white/10 rounded-md p-3 font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
                      value={formData.payload}
                      onChange={(e) => setFormData({...formData, payload: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  onClick={runMonitor} 
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                       <Zap className="size-4 animate-spin" />
                       Running AI Audit...
                    </div>
                  ) : "Initiate Autonomous Scan"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card min-h-[400px] border-t-4 transition-all duration-500 ${results ? (results.anomalyDetected ? 'border-t-destructive' : 'border-t-emerald-500') : 'border-t-primary'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                       <Cpu className="size-4 text-primary" />
                       AI Reasoning Stream
                    </CardTitle>
                    {results && (
                      <Badge variant={results.anomalyDetected ? "destructive" : "default"} className={results.anomalyDetected ? "" : "bg-emerald-500"}>
                        {results.riskLevel} Risk
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5 font-mono text-sm min-h-[200px] relative">
                     {typing && <div className="absolute top-2 right-2 size-2 bg-primary rounded-full animate-ping" />}
                     <p className="leading-relaxed text-muted-foreground">
                        {reasoningStream || (loading ? "Generating assessment..." : "Awaiting input for analysis...")}
                     </p>
                  </div>

                  {results && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                        {results.anomalyDetected ? (
                          <AlertCircle className="size-6 text-destructive shrink-0" />
                        ) : (
                          <CheckCircle2 className="size-6 text-emerald-500 shrink-0" />
                        )}
                        <h4 className="font-bold text-sm uppercase">{results.anomalyDetected ? results.anomalyType : "Integrity Verified"}</h4>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-[10px] uppercase font-bold text-primary tracking-widest">Recommended Actions</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {results.recommendedActions.map((action, i) => (
                            <div key={i} className="text-xs p-2 bg-white/5 rounded border border-white/5 flex items-center gap-2">
                              <div className="size-1 bg-primary rounded-full" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-muted/10 border-white/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2">
                       <Activity className="size-3" />
                       Agent Status Matrix
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="flex justify-between text-[10px] font-mono">
                       <span className="text-muted-foreground">Neural Confidence:</span>
                       <span className="text-emerald-500">98.4%</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                       <span className="text-muted-foreground">Analysis Latency:</span>
                       <span className="text-primary">240ms</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-[98%]" />
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
