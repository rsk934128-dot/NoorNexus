
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Layers, CreditCard, Landmark, Coins, Plus, MoreVertical, Shield, Trash2, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFirestore, useCollection, useUser } from "@/firebase"
import { collection, addDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore"
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
            {isAdmin && (
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-secondary text-secondary-foreground font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Plus className="size-4" /> Provision Method
              </Button>
            )}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold tracking-tighter">Total Ecosystem Volume</CardDescription>
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
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="size-8 text-primary animate-spin" />
                  <p className="text-xs font-mono uppercase text-muted-foreground">Syncing Ledger Mesh...</p>
                </div>
              ) : methods.length === 0 ? (
                <div className="text-center py-20 border-t border-white/5 bg-white/2">
                   <AlertCircle className="size-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                   <p className="text-muted-foreground font-mono text-sm">NO CONFIGURED METHODS DETECTED.</p>
                </div>
              ) : (
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
                    {methods.map((pm: any) => (
                      <TableRow key={pm.id} className="border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="size-8 bg-muted rounded flex items-center justify-center">
                              {pm.name.toLowerCase().includes('bank') ? <Landmark className="size-4" /> : pm.name.toLowerCase().includes('crypto') ? <Coins className="size-4" /> : <CreditCard className="size-4" />}
                            </div>
                            <div>
                              <div className="font-bold">{pm.name}</div>
                              <div className="text-[10px] font-mono text-muted-foreground uppercase">{pm.id.substring(0, 8)}</div>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card border-white/10">
                               <DropdownMenuItem onClick={() => handleDelete(pm.id)} className="text-destructive focus:text-destructive">
                                  <Trash2 className="size-4 mr-2" /> De-provision
                               </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-secondary/20 bg-black/90 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold text-secondary flex items-center gap-3">
              <Plus className="size-6" /> Provision New Method
            </DialogTitle>
            <DialogDescription className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">
              Mission 400 | Secure Gateway Deployment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold text-muted-foreground">Method Identity</Label>
              <Input 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="e.g. Cyber-Bank Relay" 
                className="bg-background/50 border-white/10 font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold text-muted-foreground">Provider Engine</Label>
              <Input 
                value={form.provider} 
                onChange={(e) => setForm({...form, provider: e.target.value})}
                placeholder="e.g. FusionPay Core" 
                className="bg-background/50 border-white/10 font-mono"
              />
            </div>
            <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
               <p className="text-[10px] text-secondary/80 font-mono leading-relaxed">
                  [!] Deployment will trigger a distributed ledger handshake. Method will be initialized with STABLE_L4 status.
               </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleProvision} 
              disabled={provisioning || !form.name || !form.provider}
              className="w-full bg-secondary text-secondary-foreground font-bold uppercase tracking-widest h-12"
            >
              {provisioning ? <Loader2 className="size-4 animate-spin mr-2" /> : <Shield className="size-4 mr-2" />}
              Initialize Handshake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
