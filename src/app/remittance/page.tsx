
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Send, History, Wallet, ArrowRightLeft, ShieldCheck, Zap, Activity, Globe, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const recentTransfers = [
  { id: "TX_901", recipient: "Sheikh Farid", amount: "50,000 BDT", status: "Verified", date: "10m ago", route: "SG -> BD" },
  { id: "TX_902", recipient: "Sirajganj-Node-01", amount: "1.2 ETH", status: "Verified", date: "45m ago", route: "AE -> BD" },
  { id: "TX_903", recipient: "London-Bridge-Vault", amount: "5,000 GBP", status: "Processing", date: "1h ago", route: "UK -> AE" },
]

export default function RemittancePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [liquidity, setLiquidity] = useState(82)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiquidity(prev => Math.min(100, Math.max(70, prev + (Math.random() * 2 - 1))))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  function handleTransfer() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Sovereign Handshake Successful",
        description: "HMAC_V4 signed transfer broadcasted to 12 mesh nodes.",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Send className="size-8 text-primary" />
                SmartRemit Intelligence Terminal
              </h2>
              <p className="text-muted-foreground">
                High-throughput cross-border value settlement layer with v3 intelligence.
              </p>
            </div>
            <div className="flex gap-4">
               <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary h-10 px-4 gap-2 flex items-center">
                  <Activity className="size-4" />
                  Corridor Health: L4_OPTIMIZED
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <ArrowRightLeft className="size-5 text-primary" />
                    Initiate Sovereign Settlement
                  </CardTitle>
                  <CardDescription>Direct peer-to-peer ledger entry signed with node-private keys.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Destination Corridor</Label>
                      <Input placeholder="Enter sovereign ID (e.g. BD-SG-01)" className="bg-background/50 font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Asset Mesh</Label>
                      <Input defaultValue="Sovereign-BDT" className="bg-background/50 font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount to Broadcast</Label>
                    <div className="relative">
                      <Input type="number" placeholder="0.00" className="bg-background/50 pl-12 h-16 text-2xl font-headline font-bold border-white/10" />
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-primary size-6" />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-primary/5 border border-primary/10 grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">FX Spread (Auto)</p>
                      <p className="text-sm font-mono text-primary">0.0001% Mesh Native</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">ETA Prediction</p>
                      <p className="text-sm font-mono text-primary">&lt; 120ms</p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleTransfer}
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary text-lg"
                  >
                    {loading ? "Signing Handshake..." : "Execute Mesh Settlement"}
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="glass-card">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="size-3" />
                          Liquidity Pressure
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex justify-between items-end">
                          <p className="text-2xl font-headline font-bold text-primary">{liquidity.toFixed(1)}%</p>
                          <p className="text-[10px] text-emerald-500 font-bold uppercase">Stable</p>
                       </div>
                       <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${liquidity}%` }} />
                       </div>
                    </CardContent>
                 </Card>
                 <Card className="glass-card">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2">
                          <Globe className="size-3" />
                          Route Visualization
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="h-16 flex items-center justify-between px-4 relative">
                          <div className="size-3 bg-primary rounded-full glow-primary" />
                          <div className="flex-1 h-px bg-dashed border-t border-primary/20 mx-2 animate-pulse" />
                          <div className="size-3 bg-secondary rounded-full glow-emerald" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <Badge variant="outline" className="text-[8px] border-white/10 bg-black/40">SG_HUB_01</Badge>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-sm font-headline flex items-center gap-2">
                    <History className="size-4" />
                    Ledger Consensus Stream
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTransfers.map((tx) => (
                    <div key={tx.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-primary">{tx.route}</p>
                        <Badge variant="outline" className="text-[8px] h-4 border-emerald-500/50 text-emerald-500">
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-foreground">{tx.recipient}</p>
                          <p className="text-[9px] text-muted-foreground font-mono">{tx.id}</p>
                        </div>
                        <p className="text-sm font-headline font-bold">{tx.amount}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-primary">
                     View Full Mesh History
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card bg-primary/5 border-primary/20 overflow-hidden relative">
                <div className="absolute -bottom-4 -right-4">
                   <ShieldCheck className="size-24 text-primary opacity-5" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2">
                    <ShieldCheck className="size-3" />
                    Trust mesh v3
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Zero-Trust settlement architecture enabled. Every transfer triggers a 12-node cryptographic handshake. 
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                     <Badge variant="outline" className="text-[8px] bg-black/40">HMAC_V4_L4</Badge>
                     <Badge variant="outline" className="text-[8px] bg-black/40">ECC_P256</Badge>
                     <Badge variant="outline" className="text-[8px] bg-black/40">REPLAY_PROV</Badge>
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
