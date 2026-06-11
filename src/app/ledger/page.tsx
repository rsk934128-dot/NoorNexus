
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Layers, 
  CheckCircle2, 
  RefreshCcw, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck,
  History,
  Activity,
  Terminal,
  Loader2,
  Lock
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function LedgerPage() {
  const db = useFirestore()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const { data: entries, loading: entriesLoading } = useCollection<any>(
    query(collection(db, "ledger"), orderBy("timestamp", "desc"), limit(50))
  )

  const { data: auditLogs, loading: auditLoading } = useCollection<any>(
    query(collection(db, "audit_logs"), orderBy("timestamp", "desc"), limit(50))
  )

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-headline font-bold flex items-center gap-3 uppercase">
                <Terminal className="size-8 text-secondary" />
                Immutable Audit Fabric
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">Operational truth and financial events recorded in the Sovereign Mesh.</p>
            </div>
            <div className="flex gap-2">
               <Badge variant="outline" className="h-10 px-4 flex items-center gap-2 border-emerald-500/20 text-emerald-500 bg-emerald-500/5 uppercase font-bold text-[10px]">
                  <ShieldCheck className="size-3" /> TRACEABILITY: ENFORCED
               </Badge>
            </div>
          </header>

          <Tabs defaultValue="financial" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1">
              <TabsTrigger value="financial" className="gap-2 px-4"><Layers className="size-4" /> Financial Ledger</TabsTrigger>
              <TabsTrigger value="operational" className="gap-2 px-4"><Activity className="size-4" /> Operational Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="financial">
              <Card className="glass-card overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2">
                  <div>
                    <CardTitle className="font-headline text-lg uppercase tracking-widest">Financial Event Stream</CardTitle>
                    <CardDescription className="text-xs">Double-entry events recorded across mesh nodes.</CardDescription>
                  </div>
                  <RefreshCcw className="size-5 text-primary animate-spin-slow opacity-50" />
                </CardHeader>
                <CardContent className="p-0">
                  {entriesLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <Loader2 className="size-8 text-primary animate-spin" />
                      <p className="text-[10px] font-mono uppercase text-muted-foreground">Syncing Ledger...</p>
                    </div>
                  ) : entries.length === 0 ? (
                    <div className="text-center py-20 bg-white/2">
                       <p className="text-muted-foreground font-mono text-sm uppercase">No Ledger Entries Detected</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table className="min-w-[800px]">
                        <TableHeader className="bg-muted/30">
                          <TableRow className="border-white/5">
                            <TableHead className="text-[10px] uppercase font-bold">Entry ID</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Type</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Payment Link</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Asset</TableHead>
                            <TableHead className="text-right text-[10px] uppercase font-bold">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {entries.map((entry: any) => (
                            <TableRow key={entry.id} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="font-mono text-[10px] text-muted-foreground uppercase">{entry.id.substring(0, 12)}</TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    {entry.type === 'DEBIT' ? <ArrowUpRight className="size-3 text-destructive" /> : <ArrowDownRight className="size-3 text-emerald-500" />}
                                    <span className={`text-[10px] font-bold ${entry.type === 'DEBIT' ? 'text-destructive' : 'text-emerald-500'}`}>{entry.type}</span>
                                 </div>
                              </TableCell>
                              <TableCell className="font-mono text-[10px] text-primary">{entry.paymentId}</TableCell>
                              <TableCell className="text-[10px] font-bold text-white">{entry.asset}</TableCell>
                              <TableCell className="text-right font-headline font-bold">
                                 {entry.amount.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operational">
              <Card className="glass-card overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2">
                  <div>
                    <CardTitle className="font-headline text-lg uppercase tracking-widest">Operational Audit Fabric</CardTitle>
                    <CardDescription className="text-xs">Immutable Operational Actions and Security Flags.</CardDescription>
                  </div>
                  <Lock className="size-5 text-emerald-500 opacity-50" />
                </CardHeader>
                <CardContent className="p-0">
                  {auditLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <Loader2 className="size-8 text-primary animate-spin" />
                      <p className="text-[10px] font-mono uppercase text-muted-foreground">Syncing Audit Mesh...</p>
                    </div>
                  ) : auditLogs.length === 0 ? (
                    <div className="text-center py-20 bg-white/2">
                       <p className="text-muted-foreground font-mono text-sm uppercase">No Operational Logs Recorded</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table className="min-w-[800px]">
                        <TableHeader className="bg-muted/30">
                          <TableRow className="border-white/5">
                            <TableHead className="text-[10px] uppercase font-bold">Timestamp</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Action</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Actor</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Severity</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Outcome</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditLogs.map((log: any) => (
                            <TableRow key={log.id} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="font-mono text-[10px] text-muted-foreground uppercase">{new Date(log.timestamp).toLocaleTimeString()}</TableCell>
                              <TableCell className="text-[10px] font-bold text-white uppercase">{log.action}</TableCell>
                              <TableCell className="text-[10px] text-primary lowercase">{log.actor}</TableCell>
                              <TableCell>
                                 <Badge variant="outline" className={`text-[8px] h-4 uppercase ${log.severity === 'CRITICAL' ? 'border-destructive text-destructive' : log.severity === 'WARNING' ? 'border-amber-500 text-amber-500' : 'border-emerald-500 text-emerald-500'}`}>
                                    {log.severity}
                                 </Badge>
                              </TableCell>
                              <TableCell className="text-[9px] text-muted-foreground italic truncate max-w-[200px]">
                                 {JSON.stringify(log.metadata)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </div>
  )
}
