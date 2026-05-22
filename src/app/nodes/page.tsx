
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Map, Server, Globe, Signal, Database, ShieldAlert, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"

const INITIAL_NODES = [
  { id: "1", name: "Sirajganj-Edge-01", region: "South Asia", status: "Operational", load: 12, latency: 112, integrity: "Verified" },
  { id: "2", name: "Dhaka-Core-02", region: "South Asia", status: "Operational", load: 45, latency: 118, integrity: "Verified" },
  { id: "3", name: "Singapore-Relay-01", region: "SE Asia", status: "Operational", load: 28, latency: 156, integrity: "Verified" },
  { id: "4", name: "London-Bridge-04", region: "Europe", status: "Maintenance", load: 0, latency: 450, integrity: "Untrusted" },
  { id: "5", name: "NYC-Vault-01", region: "North America", status: "Operational", load: 62, latency: 210, integrity: "Verified" },
  { id: "6", name: "Dubai-Gateway-03", region: "Middle East", status: "Operational", load: 19, latency: 134, integrity: "Verified" },
]

export default function NodesPage() {
  const [nodes, setNodes] = useState(INITIAL_NODES)

  // Simulation of live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        if (node.status === "Maintenance") return node
        const change = Math.floor(Math.random() * 20) - 10
        const newLatency = Math.max(80, node.latency + change)
        return {
          ...node,
          latency: newLatency,
          load: Math.min(100, Math.max(5, node.load + (Math.random() * 4 - 2)))
        }
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Activity className="size-8 text-primary animate-pulse" />
                Regional Node Watchtower
              </h2>
              <p className="text-muted-foreground mt-1">Live observability of the 12 distributed ledger nodes.</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 glow-emerald">All Systems Clear</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Signal className="size-3" />
                Last sync: Just now
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nodes.map((node) => (
              <Card key={node.id} className={`glass-card group hover:border-primary/50 transition-all duration-300 overflow-hidden relative ${node.latency > 300 ? 'border-destructive/50' : ''}`}>
                {node.latency > 300 && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-destructive animate-pulse" />
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Server className={`size-5 ${node.latency > 300 ? 'text-destructive' : 'text-primary'}`} />
                    </div>
                    <Badge className={node.status === "Operational" ? "bg-emerald-500" : "bg-amber-500"}>
                      {node.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-headline mt-4">{node.name}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <Map className="size-3" />
                    {node.region}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg border border-white/5 bg-background/50 ${node.latency > 300 ? 'text-destructive' : ''}`}>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Latency</p>
                      <p className="text-xl font-headline font-bold">{node.latency}ms</p>
                    </div>
                    <div className="p-3 rounded-lg border border-white/5 bg-background/50">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Usage</p>
                      <p className="text-xl font-headline font-bold">{node.load.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      {node.integrity === "Verified" ? <ShieldCheck className="size-3 text-emerald-500" /> : <ShieldAlert className="size-3 text-destructive" />}
                      {node.integrity}
                    </span>
                    <span className="flex items-center gap-1"><Database className="size-3" /> HMAC_V4_L4</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card scan-effect overflow-hidden">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Signal className="size-5 text-primary" />
                Network Topology Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted/20 rounded-xl flex items-end justify-between p-6 gap-2">
                {nodes.map((node, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary/20 rounded-t-sm relative">
                      <div 
                        className={`w-full transition-all duration-1000 absolute bottom-0 ${node.latency > 300 ? 'bg-destructive' : 'bg-primary'} glow-primary`} 
                        style={{ height: `${node.load}%` }} 
                      />
                    </div>
                    <span className="text-[8px] text-muted-foreground font-mono truncate w-full text-center">N-{i+1}</span>
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
