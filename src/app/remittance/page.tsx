
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Send, History, Wallet, ArrowRightLeft, ShieldCheck, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const recentTransfers = [
  { id: "TX_901", recipient: "Sheikh Farid", amount: "50,000 BDT", status: "Verified", date: "10m ago" },
  { id: "TX_902", recipient: "Sirajganj-Node-01", amount: "1.2 ETH", status: "Verified", date: "45m ago" },
  { id: "TX_903", recipient: "London-Bridge-Vault", amount: "5,000 GBP", status: "Processing", date: "1h ago" },
]

export default function RemittancePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  function handleTransfer() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Sovereign Handshake Successful",
        description: "HMAC_V4 signed transfer has been broadcasted to the mesh.",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header>
            <div className="flex items-center gap-3 mb-4">
              <Send className="size-8 text-secondary" />
              <h2 className="text-3xl font-headline font-bold">SmartRemit P2P Bridge</h2>
            </div>
            <p className="text-muted-foreground">
              Cross-border value transfer secured by NoorNexus L4_STABLE cryptographic handshake.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <ArrowRightLeft className="size-5 text-primary" />
                  Initiate Sovereign Transfer
                </CardTitle>
                <CardDescription>Direct peer-to-peer settlement without intermediary lag.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Destination Node/Wallet</Label>
                    <Input placeholder="Enter sovereign ID or address" className="bg-background/50 font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Asset Class</Label>
                    <Input defaultValue="Sovereign-BDT" className="bg-background/50 font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Transfer Amount</Label>
                  <div className="relative">
                    <Input type="number" placeholder="0.00" className="bg-background/50 pl-12 h-14 text-xl font-headline font-bold" />
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">Protocol Fee:</span>
                    <span className="text-primary">0.0001% (L4 Static)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">Est. Settlement:</span>
                    <span className="text-primary">&lt; 250ms</span>
                  </div>
                </div>

                <Button 
                  onClick={handleTransfer}
                  disabled={loading}
                  className="w-full bg-secondary text-secondary-foreground font-bold uppercase tracking-widest h-12 glow-primary"
                >
                  {loading ? "Broadcasting Handshake..." : "Execute P2P Transfer"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-sm font-headline flex items-center gap-2">
                    <History className="size-4" />
                    Ledger Sync
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTransfers.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                      <div>
                        <p className="text-sm font-bold">{tx.recipient}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{tx.id} • {tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-headline font-bold text-primary">{tx.amount}</p>
                        <Badge variant="outline" className="text-[8px] h-4 border-emerald-500/50 text-emerald-500">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase font-bold text-primary flex items-center gap-2">
                    <ShieldCheck className="size-3" />
                    Security Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All SmartRemit transactions are signed with <span className="text-primary font-mono">HMAC_V4</span> and undergo a 3-way handshake with Sirajganj-Edge-01 nodes to prevent double-spending.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Zap className="size-3 text-secondary" />
                    <span className="text-[10px] font-bold text-secondary uppercase">Ultra-Low Latency Mode Active</span>
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
