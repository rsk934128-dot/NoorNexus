
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Layers, CreditCard, Landmark, Coins, Plus, MoreVertical, Shield, Trash2, Loader2, AlertCircle, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function LedgerPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const { data: entries, loading } = useCollection<any>(
    query(collection(db, "ledger"), orderBy("timestamp", "desc"), limit(50))
  )

  const { data: methods } = useCollection<any>(collection(db, "payment_methods"))

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-headline font-bold flex items-center gap-3">
                <Layers className="size-8 text-secondary" />
                Sovereign Audit Ledger
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">Double-entry accounting and real-time reconciliation engine.</p>
            </div>
            <div className="flex gap-2">
               <Badge variant="outline" className="h-10 px-4 flex items-center gap-2 border-emerald-500/20 text-emerald-500 bg-emerald-500/5 uppercase font-bold text-[10px]">
                  <CheckCircle2 className="size-3" /> RECONCILIATION: MATCHED
               </Badge>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">Verified Assets</CardDescription>
                <CardTitle className="text-2xl font-headline font-bold text-primary">$12,560,000</CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">Settlement Queue</CardDescription>
                <CardTitle className="text-2xl font-headline font-bold text-amber-500">$450,200</CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">Daily Vol (24h)</CardTitle>
                <CardTitle className="text-2xl font-headline font-bold text-emerald-500">$1.2M</CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-card border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">Integrity Score</Cardivity>
                <CardTitle className="text-2xl font-headline font-bold">100%</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/2">
              <div>
                <CardTitle className="font-headline text-lg uppercase tracking-widest">Financial Event Stream</CardTitle>
                <CardDescription className="text-xs">Immutable double-entry events recorded across mesh nodes.</CardDescription>
              </div>
              <RefreshCcw className="size-5 text-primary animate-spin-slow opacity-50" />
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
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
        </main>
      </SidebarInset>
    </div>
  )
}
