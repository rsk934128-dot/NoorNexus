
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Layers, CreditCard, Landmark, Coins, Plus, MoreVertical, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const paymentMethods = [
  { id: "PM_101", name: "Cyber-Bank Relay", provider: "FusionPay Core", status: "Active", volume: "$1.2M", health: "100%" },
  { id: "PM_102", name: "SmartRemit Bridge", provider: "SmartRemit Node", status: "Active", volume: "$450k", health: "98%" },
  { id: "PM_103", name: "Crypto Liquidity", provider: "NoorNexus DAO", status: "Active", volume: "$890k", health: "99%" },
  { id: "PM_104", name: "External Webhook", provider: "Legacy Gateway", status: "Deprecated", volume: "$12k", health: "45%" },
]

export default function LedgerPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Layers className="size-8 text-secondary" />
                One Engine Payment Ledger
              </h2>
              <p className="text-muted-foreground mt-1">Centralized backend control for the NoorNexus ecosystem.</p>
            </div>
            <Button className="bg-secondary text-secondary-foreground font-bold uppercase tracking-widest flex items-center gap-2">
              <Plus className="size-4" /> Provision Method
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold tracking-tighter">Total Ecosystem Volume</CardTitle>
                <CardTitle className="text-3xl font-headline font-bold text-primary">$2,552,000</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-emerald-500">
                  <Plus className="size-3" /> 12% from last cycle
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold tracking-tighter">Active Transactions</CardDescription>
                <CardTitle className="text-3xl font-headline font-bold text-secondary">4,812</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  Avg processing time: 420ms
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold tracking-tighter">Sovereign Reserve</CardDescription>
                <CardTitle className="text-3xl font-headline font-bold">14.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  Audit Stage: L4_STABLE
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Configured Payment Methods</CardTitle>
                <CardDescription>Dynamic UI ledger entries driven by Firestore configuration.</CardDescription>
              </div>
              <Shield className="size-8 text-primary opacity-20" />
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead>Method Identity</TableHead>
                    <TableHead>Provider Engine</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Health</TableHead>
                    <TableHead className="text-right">Volume (30d)</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentMethods.map((pm) => (
                    <TableRow key={pm.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-muted rounded flex items-center justify-center">
                            {pm.id === 'PM_101' ? <Landmark className="size-4" /> : pm.id === 'PM_103' ? <Coins className="size-4" /> : <CreditCard className="size-4" />}
                          </div>
                          <div>
                            <div className="font-bold">{pm.name}</div>
                            <div className="text-[10px] font-mono text-muted-foreground">{pm.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{pm.provider}</TableCell>
                      <TableCell>
                        <Badge variant={pm.status === 'Active' ? 'default' : 'outline'} className={pm.status === 'Active' ? 'bg-emerald-500' : 'text-muted-foreground'}>
                          {pm.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`size-2 rounded-full ${parseInt(pm.health) > 90 ? 'bg-emerald-500' : 'bg-destructive'}`} />
                          <span className="text-sm">{pm.health}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-headline font-bold text-primary">{pm.volume}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </div>
  )
}
