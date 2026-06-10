
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, ShieldAlert, Zap, Loader2, FileCheck, Landmark, Globe } from "lucide-react"
import { auditP2CSettlement, P2CSettlementOutput } from "@/ai/flows/p2c-settlement-flow"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function P2CSettlementPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<P2CSettlementOutput | null>(null)

  const [form, setForm] = useState({
    merchantId: "IMPERIAL-CORP-01",
    amount: 1500000,
    asset: "Sovereign-BDT",
    recipientCount: 120,
    signature: "0x_HMAC_V4_SIGNATURE_STABLE"
  })

  async function handleAudit() {
    setLoading(true)
    setResult(null)
    try {
      const auditResult = await auditP2CSettlement(form)
      setResult(auditResult)
      
      if (auditResult.settlementStatus === 'APPROVED') {
        // Log to Firestore if approved
        await addDoc(collection(db, "p2c_transactions"), {
          ...form,
          status: "APPROVED",
          timestamp: Date.now()
        })
        
        toast({
          title: "Settlement Authorized",
          description: "Nora-02 has verified the merchant disbursement path.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Clearance Denied",
          description: auditResult.riskAssessment,
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Audit AI Error",
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Building2 className="size-8 text-primary" />
                Sovereign P2C Hub
              </h2>
              <p className="text-muted-foreground">
                Merchant disbursement and high-volume corporate settlement layer.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge className="bg-primary/20 text-primary border-primary/30 h-10 px-4">L4_CORPORATE_CLEARANCE</Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                   <Landmark className="size-4" /> Disbursement Directive
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Merchant ID</Label>
                      <Input 
                        value={form.merchantId} 
                        onChange={e => setForm({...form, merchantId: e.target.value})}
                        className="bg-background/50 border-white/10 font-mono text-xs" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Recipients</Label>
                      <Input 
                        type="number"
                        value={form.recipientCount} 
                        onChange={e => setForm({...form, recipientCount: parseInt(e.target.value)})}
                        className="bg-background/50 border-white/10 font-mono text-xs" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Total Settlement Volume</Label>
                    <Input 
                      type="number"
                      value={form.amount} 
                      onChange={e => setForm({...form, amount: parseInt(e.target.value)})}
                      className="bg-background/50 border-white/10 font-headline text-lg font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">HMAC_V4 Signature</Label>
                    <Input 
                      value={form.signature} 
                      readOnly
                      className="bg-black/40 border-white/5 font-mono text-[10px] text-primary" 
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAudit} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                >
                  {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Zap className="size-5 mr-2" />}
                  {loading ? "Merchant AI Auditing..." : "Initiate Disbursement Scan"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`glass-card transition-all duration-500 border-t-4 ${result ? (result.settlementStatus === 'APPROVED' ? 'border-t-emerald-500' : 'border-t-destructive') : 'border-t-primary'}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                    <FileCheck className="size-4" /> Nora-02 Audit Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {result ? (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Status</p>
                          <Badge variant={result.settlementStatus === 'APPROVED' ? 'default' : 'destructive'} className={result.settlementStatus === 'APPROVED' ? 'bg-emerald-500' : ''}>
                             {result.settlementStatus}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Integrity Score</p>
                          <p className="text-3xl font-headline font-bold text-primary">{result.integrityScore}%</p>
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 rounded border border-white/5">
                        <p className="text-[11px] font-mono text-muted-foreground leading-relaxed italic">
                           "{result.riskAssessment}"
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Clearance Requirements</p>
                        <Badge variant="outline" className="border-primary/30 text-primary uppercase text-[8px]">{result.clearanceLevel}</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[200px] flex flex-col items-center justify-center gap-4 text-center opacity-40">
                      <ShieldAlert className="size-12" />
                      <p className="text-xs font-mono uppercase tracking-widest">Awaiting Merchant Packet Scan</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card bg-primary/5">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                       <Globe className="size-3" />
                       Global Merchant Mesh Status
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2">
                    <div className="flex justify-between text-[9px] font-mono">
                       <span>Corporate Uptime:</span>
                       <span className="text-emerald-500">100%</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono">
                       <span>Settlement Latency:</span>
                       <span className="text-primary">85ms</span>
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
