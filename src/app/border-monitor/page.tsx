"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radar, ShieldAlert, ShieldCheck, Terminal, AlertTriangle, Menu, Loader2, Database, Lock, Activity, RefreshCcw, ShieldHalf } from "lucide-react"
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
  
  // Determine current active defense tier and rotation from the latest log
  const latestLog = logs[0]
  const activeTier = latestLog?.securityTier || 'L1_NORMAL'
  const currentRotation = latestLog?.keyRotationInterval || 3600

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
                   Shield Audit Trail
                 </h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">Project 150: Dynamic Key Hardening & Mesh Integrity.</p>
            </div>
            <div className="flex gap-4">
              <div className="glass-card px-4 py-2 rounded-lg text-center flex-1 sm:flex-none border-t-2 border-t-emerald-500">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Key Rotation</p>
                <p className="text-lg font-headline font-bold text-emerald-500 flex items-center gap-2 justify-center">
                  <RefreshCcw className="size-4 animate-spin-slow" /> {currentRotation}s
                </p>
              </div>
              <div className={`glass-card px-4 py-2 rounded-lg text-center flex-1 sm:flex-none border-t-2 ${activeTier === 'L4_LOCKDOWN' ? 'border-t-destructive' : 'border-t-primary'}`}>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Defense Tier</p>
                <p className={`text-lg font-headline font-bold flex items-center gap-2 justify-center ${activeTier === 'L4_LOCKDOWN' ? 'text-destructive' : 'text-primary'}`}>
                  <Lock className="size-4" /> {activeTier}
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="glass-card lg:col-span-3 overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-white/2">
                <CardTitle className="text-sm font-headline flex items-center gap-2 uppercase tracking-widest">
                  <Terminal className="size-4" />
                  Live Shield Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 text-primary animate-spin" />
                    <p className="text-xs font-mono uppercase text-muted-foreground">Syncing Shield Mesh...</p>
                  </div>
                ) : (
                  <div className="max-h-[600px] overflow-auto">
                    <div className="min-w-[800px]">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow className="border-white/5">
                            <TableHead className="w-[120px]">Timestamp</TableHead>
                            <TableHead>Origin/Tier</TableHead>
                            <TableHead>Rotation Policy</TableHead>
                            <TableHead>Consensus</TableHead>
                            <TableHead className="text-right">Risk</TableHead>
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
                                  <p className={`text-[9px] font-mono uppercase ${log.securityTier === 'L4_LOCKDOWN' ? 'text-destructive font-bold' : 'text-muted-foreground'}`}>
                                    {log.securityTier || 'L1_NORMAL'}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-[10px] font-mono text-muted-foreground">
                                {log.keyRotationInterval ? `${log.keyRotationInterval}s Dynamic` : '3600s Fixed'}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`text-[9px] uppercase font-bold ${log.result === 'ACCEPTED' ? 'border-emerald-500 text-emerald-500' : 'border-destructive text-destructive'}`}>
                                  {log.overrideActive ? 'PENDING_SEAL' : log.result}
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
              <Card className="glass-card bg-primary/5 border-primary/20 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                    <ShieldHalf className="size-4" /> Shield Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] text-muted-foreground font-mono uppercase">Mesh Immunity</p>
                      <p className="text-3xl font-headline font-bold text-primary">99.9%</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] text-muted-foreground font-mono uppercase">Key Entropy</p>
                      <p className="text-3xl font-headline font-bold text-emerald-500">MAX</p>
                    </div>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `99.9%` }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                <CardHeader>
                   <CardTitle className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
                     <Lock className="size-4" /> Sovereign Seal
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     Master override is currently ACTIVE. Critical isolations require your direct command.
                   </p>
                   <div className="pt-2">
                     <Badge variant="outline" className="text-[8px] border-amber-500/30 text-amber-500">SOVEREIGN_AUTH: PENDING</Badge>
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
