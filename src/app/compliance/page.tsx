
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Terminal, Search, AlertCircle, CheckCircle2 } from "lucide-react"
import { autonomousComplianceMonitor, AutonomousComplianceMonitorOutput } from "@/ai/flows/autonomous-compliance-monitor"
import { useToast } from "@/hooks/use-toast"

export default function CompliancePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AutonomousComplianceMonitorOutput | null>(null)

  const [formData, setFormData] = useState({
    signature: "HEX_HMAC_V4_9a6c22bb3f1a",
    timestamp: Math.floor(Date.now() / 1000),
    payload: '{"action":"payout","amount":5000,"currency":"BDT"}',
    sourceNode: "Sirajganj-Edge-01",
    requestPath: "/api/v1/payout"
  })

  async function runMonitor() {
    setLoading(true)
    try {
      const result = await autonomousComplianceMonitor(formData)
      setResults(result)
      if (result.anomalyDetected) {
        toast({
          title: "Security Anomaly Detected",
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
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="size-8 text-primary" />
              <h2 className="text-3xl font-headline font-bold">Autonomous Compliance Monitor</h2>
            </div>
            <p className="text-muted-foreground">
              NoorAI autonomous workforce detecting cryptographic anomalies on the HMAC_V4 Digital Border.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  <Terminal className="size-4" />
                  Request Inspector
                </CardTitle>
                <CardDescription>Analyze incoming inter-node request headers and payloads.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">X-Sovereign-Signature</Label>
                    <Input 
                      value={formData.signature} 
                      onChange={(e) => setFormData({...formData, signature: e.target.value})}
                      className="bg-background/50 font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">X-Sovereign-Timestamp (UNIX)</Label>
                    <Input 
                      type="number" 
                      value={formData.timestamp} 
                      onChange={(e) => setFormData({...formData, timestamp: parseInt(e.target.value)})}
                      className="bg-background/50 font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Request Payload</Label>
                    <textarea 
                      className="w-full min-h-[100px] bg-background/50 border border-input rounded-md p-3 font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
                      value={formData.payload}
                      onChange={(e) => setFormData({...formData, payload: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  onClick={runMonitor} 
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest glow-primary"
                  disabled={loading}
                >
                  {loading ? "Agent Analyzing..." : "Run AI Compliance Audit"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {results ? (
                <Card className={`glass-card border-t-4 ${results.anomalyDetected ? 'border-t-destructive' : 'border-t-emerald-500'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline text-xl">Audit Results</CardTitle>
                      <Badge variant={results.anomalyDetected ? "destructive" : "default"} className={results.anomalyDetected ? "" : "bg-emerald-500"}>
                        {results.riskLevel} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4">
                      {results.anomalyDetected ? (
                        <AlertCircle className="size-10 text-destructive shrink-0" />
                      ) : (
                        <CheckCircle2 className="size-10 text-emerald-500 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-bold mb-1">{results.anomalyDetected ? results.anomalyType : "Integrity Verified"}</h4>
                        <p className="text-sm text-muted-foreground">{results.assessmentDetails}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-bold text-primary tracking-widest">Recommended Actions</h4>
                      <ul className="space-y-2">
                        {results.recommendedActions.map((action, i) => (
                          <li key={i} className="text-xs flex items-center gap-2 text-muted-foreground">
                            <div className="size-1 bg-primary rounded-full" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-white/5 rounded-2xl bg-white/5">
                  <Search className="size-12 text-muted-foreground mb-4 opacity-20" />
                  <h3 className="text-lg font-headline text-muted-foreground">Awaiting Assessment</h3>
                  <p className="text-sm text-muted-foreground/60">Upload header data to begin autonomous compliance analysis.</p>
                </div>
              )}

              <Card className="glass-card bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase font-bold text-muted-foreground">Security Principle</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic text-muted-foreground">
                    "Stateless verification via HMAC_V4 ensures that every packet crossing the NoorNexus border is authenticated without central session storage, mitigating timing attacks and replay vectors."
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
