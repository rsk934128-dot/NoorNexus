
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Layers, CreditCard, Landmark, Coins, Plus, MoreVertical, Shield, Trash2, Loader2, AlertCircle, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, addDoc, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export default function LedgerPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const isAdmin = user?.email === ADMIN_EMAIL

  const { data: methods, loading } = useCollection<any>(
    query(collection(db, "payment_methods"), orderBy("timestamp", "desc"))
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [provisioning, setProvisioning] = useState(false)
  const [form, setForm] = useState({ name: "", provider: "" })

  const handleProvision = async () => {
    if (!form.name || !form.provider) return
    if (!isAdmin) {
      toast({ title: "Admin Access Required", variant: "destructive" })
      return
    }

    setProvisioning(true)
    try {
      await addDoc(collection(db, "payment_methods"), {
        name: form.name,
        provider: form.provider,
        status: "Active",
        volume: "$0.0",
        health: "100%",
        timestamp: Date.now()
      })
      setIsDialogOpen(false)
      setForm({ name: "", provider: "" })
      toast({ title: "Method Provisioned", description: `${form.name} is now online.` })
    } catch (error) {
      toast({ title: "Provisioning Failed", variant: "destructive" })
    } finally {
      setProvisioning(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) return
    try {
      await deleteDoc(doc(db, "payment_methods", id))
      toast({ title: "Method De-provisioned" })
    } catch (error) {
      toast({ title: "Removal Failed", variant: "destructive" })
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!isAdmin) return
    try {
      const health = newStatus === 'Active' ? '100%' : newStatus === 'Maintenance' ? '45%' : '0%'
      await updateDoc(doc(db, "payment_methods", id), { 
        status: newStatus,
        health: health
      })
      toast({ 
        title: "Status Synchronized", 
        description: `Method is now set to ${newStatus}.` 
      })
    } catch (error) {
      toast({ title: "Update Failed", variant: "destructive" })
    }
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-headline font-bold flex items-center gap-3">
                <Layers className="size-8 text-secondary" />
                One Engine Payment Ledger
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">Centralized backend control for the NoorNexus ecosystem.</p>
            </div>
            {isAdmin && (
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="w-full sm:w-auto bg-secondary text-secondary-foreground font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Plus className="size-4" /> Provision Method
              </Button>
            )}
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">Total Ecosystem Volume</CardDescription>
                <CardTitle className="text-2xl sm:text-3xl font-headline font-bold text-primary">$2,552,000</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase">
                  <Plus className="size-3" /> 12% from last cycle
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">Active Transactions</CardDescription>
                <CardTitle className="text-2xl sm:text-3xl font-headline font-bold text-secondary">4,812</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase">
                  Avg processing: 420ms
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">Sovereign Reserve</CardDescription>
                <CardTitle className="text-2xl sm:text-3xl font-headline font-bold">14.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase">
                  Audit Stage: L4_STABLE
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-lg sm:text-xl">Configured Payment Methods</CardTitle>
                <CardDescription className="text-xs">Dynamic UI ledger entries driven by Firestore configuration.</CardDescription>
              </div>
              <Shield className="size-8 text-primary opacity-20 hidden sm:block" />
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="size-8 text-primary animate-spin" />
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">Syncing Ledger Mesh...</p>
                </div>
              ) : methods.length === 0 ? (
                <div className="text-center py-20 border-t border-white/5 bg-white/2">
                   <AlertCircle className="size-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                   <p className="text-muted-foreground font-mono text-sm uppercase">No Configured Methods Detected</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="min-w-[800px]">
                    <TableHeader className="bg-white/2">
                      <TableRow className="hover:bg-transparent border-white/5">
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest">Method Identity</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest">Provider Engine</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest">Status</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold tracking-widest">Health</TableHead>
                        <TableHead className="text-right text-[10px] uppercase font-bold tracking-widest">Volume (30d)</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {methods.map((pm: any) => (
                        <TableRow key={pm.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="size-9 bg-muted/40 rounded-lg flex items-center justify-center border border-white/5">
                                {pm.name.toLowerCase().includes('bank') ? <Landmark className="size-4 text-primary" /> : pm.name.toLowerCase().includes('crypto') ? <Coins className="size-4 text-amber-500" /> : <CreditCard className="size-4 text-emerald-500" />}
                              </div>
                              <div>
                                <div className="font-bold text-sm sm:text-base">{pm.name}</div>
                                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{pm.id.substring(0, 8)}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs font-medium uppercase tracking-tight">{pm.provider}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[9px] uppercase font-bold ${pm.status === 'Active' ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/5' : pm.status === 'Maintenance' ? 'border-amber-500/50 text-amber-500 bg-amber-500/5' : 'border-destructive/50 text-destructive bg-destructive/5'}`}>
                              {pm.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`size-1.5 rounded-full animate-pulse ${parseInt(pm.health) > 80 ? 'bg-emerald-500' : parseInt(pm.health) > 30 ? 'bg-amber-500' : 'bg-destructive'}`} />
                              <span className="text-[10px] font-mono">{pm.health}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-headline font-bold text-primary">{pm.volume}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-white/10 min-w-[160px]">
                                 <DropdownMenuLabel className="text-[9px] uppercase font-bold text-muted-foreground">Directives</DropdownMenuLabel>
                                 <DropdownMenuItem onClick={() => handleUpdateStatus(pm.id, 'Active')} className="text-xs gap-2 focus:bg-emerald-500/10 focus:text-emerald-500">
                                    <CheckCircle2 className="size-3" /> Set Active
                                 </DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleUpdateStatus(pm.id, 'Maintenance')} className="text-xs gap-2 focus:bg-amber-500/10 focus:text-amber-500">
                                    <AlertTriangle className="size-3" /> Set Maintenance
                                 </DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleUpdateStatus(pm.id, 'Deprecated')} className="text-xs gap-2 focus:bg-destructive/10 focus:text-destructive">
                                    <XCircle className="size-3" /> Set Deprecated
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator className="bg-white/5" />
                                 <DropdownMenuItem onClick={() => handleDelete(pm.id)} className="text-xs gap-2 text-destructive focus:bg-destructive focus:text-destructive-foreground">
                                    <Trash2 className="size-3" /> De-provision
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-secondary/20 bg-black/95 p-6 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-headline font-bold text-secondary flex items-center gap-3 uppercase">
              <Plus className="size-6" /> Provision Method
            </DialogTitle>
            <DialogDescription className="text-muted-foreground uppercase text-[9px] tracking-[0.2em] font-bold">
              Mission 400 | Secure Gateway Deployment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Method Identity</Label>
              <Input 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="e.g. Cyber-Bank Relay" 
                className="bg-background/50 border-white/10 font-mono h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Provider Engine</Label>
              <Input 
                value={form.provider} 
                onChange={(e) => setForm({...form, provider: e.target.value})}
                placeholder="e.g. FusionPay Core" 
                className="bg-background/50 border-white/10 font-mono h-12"
              />
            </div>
            <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
               <p className="text-[10px] text-secondary/80 font-mono leading-relaxed uppercase tracking-tighter">
                  [!] Deployment will trigger a distributed ledger handshake. Method will be initialized with Active status.
               </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleProvision} 
              disabled={provisioning || !form.name || !form.provider}
              className="w-full bg-secondary text-secondary-foreground font-bold uppercase tracking-widest h-14 glow-emerald"
            >
              {provisioning ? <Loader2 className="size-5 animate-spin mr-2" /> : <Shield className="size-5 mr-2" />}
              Initialize Handshake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
