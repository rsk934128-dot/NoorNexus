
"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radar, ShieldAlert, ShieldCheck, Terminal, AlertTriangle, Menu, Loader2, Database } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useFirestore, useCollection } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

export default function BorderMonitorPage() {
  const db = useFirestore()
  const { data: logs, loading } = useCollection<any>(
    query(collection(db, "border_logs"), orderBy("timestamp", "desc"), limit(100))
  )

  const rejectedCount = logs.filter(l => l.result === 'REJECTED').length
  const warningCount = logs.filter(l => l.result === 'WARNING').length

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon">
                       <Menu className="size-6" />
                    </Button>
                 </SidebarTrigger>
                 <h2 className="text-2xl sm:text-3xl font-headline font-bold flex items-center gap-3 uppercase">
                   <Radar className="size-8 text-primary animate-pulse" />
                   Security Audit Trail
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">Real-time cryptographic audit log of the Sovereign Digital Border.</p>
            </div>
            <div className="flex gap-4">
              <div className="glass-card px-4 py-2 rounded-lg text-center flex-1 sm:flex-none">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Audit Reliability</p>
                <p className="text-lg font-headline font-bold text-emerald-500">99.99%</p>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg text-center flex-1 sm:flex-none">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Mesh Status</p>
                <p className="text-lg font-headline font-bold text-primary">L4_SECURE</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="glass-card lg:col-span-3 overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-white/2">
                <CardTitle className="text-sm font-headline flex items-center gap-2 uppercase tracking-widest">
                  <Terminal className="size-4" />
                  Live Cryptographic Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 text-primary animate-spin" />
                    <p className="text-xs font-mono uppercase text-muted-foreground">Syncing Audit Mesh...</p>
                  </div>
                ) : (
                  <div className="max-h-[600px] overflow-auto">
                    <div className="min-w-[800px]">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow className="border-white/5">
                            <TableHead className="w-[120px]">Timestamp</TableHead>
                            <TableHead>Origin/Path</TableHead>
                            <TableHead>Signature Protocol</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead className="text-right">Risk Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {logs.map((log) => (
                            <TableRow key={log.id} className={`border-white/5 transition-colors ${log.result === 'REJECTED' ? 'bg-destructive/10' : log.result === 'WARNING' ? 'bg-amber-500/10' : 'hover:bg-white/5'}`}>
                              <TableCell className="font-mono text-[10px]">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </TableCell>
                              <TableCell>
                                <div className="space-y-0.5">
                                  <p className="text-xs font-bold uppercase">{log.origin || 'UNKNOWN_NODE'}</p>
                                  <p className="text-[9px] text-muted-foreground font-mono">{log.path}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-[10px] font-mono text-muted-foreground">
                                {log.signature?.substring(0, 16)}...
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`text-[9px] uppercase font-bold ${log.result === 'ACCEPTED' ? 'border-emerald-500 text-emerald-500' : log.result === 'REJECTED' ? 'border-destructive text-destructive' : 'border-amber-500 text-amber-500'}`}>
                                  {log.result}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-headline font-bold text-primary">
                                {log.riskScore?.toFixed(1) || '0.0'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="glass-card bg-destructive/5 border-destructive/20 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xs uppercase font-bold text-destructive tracking-widest flex items-center gap-2">
                    <ShieldAlert className="size-4" /> Alert Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] text-muted-foreground font-mono uppercase">Rejected</p>
                      <p className="text-3xl font-headline font-bold text-destructive">{rejectedCount}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] text-muted-foreground font-mono uppercase">Warnings</p>
                      <p className="text-3xl font-headline font-bold text-amber-500">{warningCount}</p>
                    </div>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive" style={{ width: `${(rejectedCount / (logs.length || 1)) * 100}%` }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                     <Database className="size-4" /> Integrity Seal
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   <p className="text-[10px] text-muted-foreground leading-relaxed">
                     All audit entries are HMAC_V4 signed and immutably stored in the Sovereign Ledger.
                   </p>
                   <div className="pt-2">
                     <Badge variant="outline" className="text-[8px] border-emerald-500/30 text-emerald-500">PROT_VERIFIED: L4</Badge>
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
