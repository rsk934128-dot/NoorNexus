
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Map, Server, Globe, Signal, Database } from "lucide-react"

const nodes = [
  { name: "Sirajganj-Edge-01", region: "South Asia", status: "Operational", load: "12%", latency: "112ms" },
  { name: "Dhaka-Core-02", region: "South Asia", status: "Operational", load: "45%", latency: "118ms" },
  { name: "Singapore-Relay-01", region: "SE Asia", status: "Operational", load: "28%", latency: "156ms" },
  { name: "London-Bridge-04", region: "Europe", status: "Maintenance", load: "0%", latency: "--" },
  { name: "NYC-Vault-01", region: "North America", status: "Operational", load: "62%", latency: "210ms" },
  { name: "Dubai-Gateway-03", region: "Middle East", status: "Operational", load: "19%", latency: "134ms" },
]

export default function NodesPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Activity className="size-8 text-primary" />
                Regional Node Watchtower
              </h2>
              <p className="text-muted-foreground mt-1">Live observability of the 12 distributed ledger nodes.</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/20">All Systems Clear</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Signal className="size-3" />
                Last sync: Just now
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nodes.map((node, i) => (
              <Card key={i} className="glass-card hover:border-primary/50 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Server className="size-5 text-primary" />
                    </div>
                    <Badge className={node.status === "Operational" ? "bg-emerald-500" : "bg-amber-500"}>
                      {node.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-headline mt-4">{node.name}</CardTitle>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Map className="size-3" />
                    {node.region}
                  </p>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Latency</p>
                      <p className="text-xl font-headline font-bold">{node.latency}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Usage</p>
                      <p className="text-xl font-headline font-bold">{node.load}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <span className="flex items-center gap-1"><Database className="size-3" /> HMAC_V4_L4</span>
                    <span className="flex items-center gap-1"><Globe className="size-3" /> Public IP: 103.14.***.***</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-headline">Global Topology Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/20 rounded-xl flex items-end justify-between p-8 gap-4">
                {[45, 67, 32, 98, 54, 76, 33, 56, 88, 44, 23, 67].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-help">
                      <div 
                        className="w-full bg-primary transition-all duration-1000 absolute bottom-0 hover:glow-primary" 
                        style={{ height: `${h}%` }} 
                      />
                    </div>
                    <span className="text-[8px] text-muted-foreground font-mono">Node-{i+1}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </div>
  )
}
