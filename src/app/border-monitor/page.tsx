
"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radar, ShieldAlert, ShieldCheck, Terminal, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const REGIONS = ["South Asia", "Middle East", "Europe", "North America"]
const PATHS = ["/api/v1/payout", "/api/v1/auth", "/api/v1/ledger", "/api/v1/remit"]

interface LogEntry {
  id: string
  timestamp: string
  origin: string
  path: string
  signature: string
  result: "ACCEPTED" | "REJECTED" | "WARNING"
  risk: number
}

export default function BorderMonitorPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const isRejected = Math.random() > 0.85
      const isWarning = !isRejected && Math.random() > 0.9
      const result = isRejected ? "REJECTED" : isWarning ? "WARNING" : "ACCEPTED"
      
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString(),
        origin: REGIONS[Math.floor(Math.random() * REGIONS.length)],
        path: PATHS[Math.floor(Math.random() * PATHS.length)],
        signature: `0x${Math.random().toString(16).substring(2, 10)}...`,
        result,
        risk: isRejected ? 85 + Math.random() * 15 : isWarning ? 40 + Math.random() * 30 : Math.random() * 10
      }

      setLogs(prev => [newLog, ...prev].slice(0, 50))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          <header className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Radar className="size-8 text-primary animate-pulse" />
                HMAC_V4 Border Monitor
              </h2>
              <p className="text-muted-foreground">Real-time cryptographic audit of inter-node sovereign traffic.</p>
            </div>
            <div className="flex gap-4">
              <div className="glass-card px-4 py-2 rounded-lg text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Mesh Integrity</p>
                <p className="text-lg font-headline font-bold text-emerald-500">99.9%</p>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Threat Level</p>
                <p className="text-lg font-headline font-bold text-primary">LOW</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="glass-card lg:col-span-3 overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-white/2">
                <CardTitle className="text-sm font-headline flex items-center gap-2">
                  <Terminal className="size-4" />
                  Live Border Entry Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="border-white/5">
                        <TableHead className="w-[100px]">Time</TableHead>
                        <TableHead>Origin</TableHead>
                        <TableHead>Path</TableHead>
                        <TableHead>Signature</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Risk</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id} className={`border-white/5 transition-colors duration-500 ${log.result === 'REJECTED' ? 'bg-destructive/10' : log.result === 'WARNING' ? 'bg-amber-500/10' : 'hover:bg-white/5'}`}>
                          <TableCell className="font-mono text-[10px]">{log.timestamp}</TableCell>
                          <TableCell className="text-xs font-medium">{log.origin}</TableCell>
                          <TableCell className="text-xs font-mono">{log.path}</TableCell>
                          <TableCell className="text-xs font-mono text-muted-foreground">{log.signature}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[9px] uppercase font-bold ${log.result === 'ACCEPTED' ? 'border-emerald-500/50 text-emerald-500' : log.result === 'REJECTED' ? 'border-destructive text-destructive animate-pulse' : 'border-amber-500 text-amber-500'}`}>
                              {log.result}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono text-xs">{log.risk.toFixed(1)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="glass-card bg-destructive/5 border-destructive/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                   <AlertTriangle className="size-10 text-destructive opacity-10" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xs uppercase font-bold text-destructive">Threat Matrix</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground font-mono">REJECTED ENTRY</p>
                    <p className="text-2xl font-headline font-bold text-destructive">24 <span className="text-xs opacity-50">/ 24H</span></p>
                  </div>
                  <div className="h-1 bg-muted rounded-full">
                    <div className="h-full bg-destructive w-[15%]" />
                  </div>
                  <div className="p-3 bg-black/40 rounded border border-destructive/20">
                     <p className="text-[10px] font-mono leading-relaxed text-destructive/80">
                        [!] Signature drift detected in SG-Relay-01 corridor. Analyzing replay vector.
                     </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20 bg-primary/5">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-primary">Border Radar</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="aspect-square relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-primary/20" />
                      <div className="absolute inset-8 rounded-full border border-primary/10" />
                      <div className="absolute inset-16 rounded-full border border-primary/5" />
                      <div className="w-full h-px bg-primary/20 absolute rotate-45" />
                      <div className="w-full h-px bg-primary/20 absolute -rotate-45" />
                      <div className="size-2 bg-primary rounded-full animate-ping" />
                      <div className="absolute top-1/4 right-1/4 size-1.5 bg-destructive rounded-full" />
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
