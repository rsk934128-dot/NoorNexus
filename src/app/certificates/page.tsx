"use client"

import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Key, 
  Upload, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  FileCode, 
  Lock, 
  RefreshCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  History,
  Activity,
  Globe,
  Database,
  Users,
  ShieldPlus,
  ArrowRight,
  FileKey,
  Fingerprint,
  BarChart3,
  Landmark
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { collection, addDoc, serverTimestamp, query, where, orderBy } from "firebase/firestore"

export default function CertificateVaultPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [activeTenant, setActiveTenant] = useState("TENANT_01")
  
  const [form, setForm] = useState({
    name: "",
    type: "EIDAS_QSEALC",
    keyId: "",
    scope: "AIS_PIS",
    certFile: null as File | null,
    keyFile: null as File | null
  })

  // Simulated Certificate Data with Scopes and Expiry
  const certificates = [
    { name: "ABN AMRO BE Corporate", type: "QSealC", scope: "AIS_PIS", status: "VALID", expiry: "2027-12-30", renewal: "AUTOMATED", tenant: "TENANT_01" },
    { name: "SIBS Portugal Portal", type: "QWAC", scope: "AIS", status: "VALID", expiry: "2026-05-15", renewal: "MANUAL", tenant: "TENANT_01" },
    { name: "Imperial Edge Node", type: "OBIE", scope: "PIS", status: "VALID", expiry: "2027-01-10", renewal: "AUTOMATED", tenant: "TENANT_02" },
    { name: "AIB Ireland Business Hub", type: "EIDAS_QSEALC", scope: "AIS_PIS", status: "VALID", expiry: "2028-06-20", renewal: "AUTOMATED", tenant: "TENANT_03" }
  ]

  const filteredCerts = useMemo(() => {
    return certificates.filter(c => c.tenant === activeTenant)
  }, [activeTenant])

  async function handleSaveCertificate() {
    if (!form.name || !form.keyId) {
      toast({ title: "Validation Error", description: "Name and Key ID are required.", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, "certificates"), {
        name: form.name,
        type: form.type,
        keyId: form.keyId,
        scope: form.scope,
        tenantId: activeTenant,
        status: "ACTIVE",
        issuer: "SOVEREIGN_ROOT_CA",
        uploadedBy: user?.email,
        timestamp: serverTimestamp()
      })

      toast({
        title: "Credential Anchored",
        description: `Successfully isolated for ${activeTenant}. Project #55.5 sync active.`,
        className: "border-emerald-500/50 bg-emerald-500/5"
      })

      setForm({ name: "", type: "EIDAS_QSEALC", keyId: "", scope: "AIS_PIS", certFile: null, keyFile: null })
    } catch (e: any) {
      toast({ title: "Vault Failure", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateCSR() {
    toast({
      title: "CSR Workflow Initiated",
      description: "Nora-55 is generating a new signing request for this tenant.",
      className: "border-primary/50 bg-primary/5"
    })
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-primary/50 text-primary uppercase font-bold tracking-widest px-3 h-8 bg-primary/5">
                   <Lock className="size-3 mr-2" /> P51.6: Multi-Tenant Vault
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Landmark className="size-3 mr-2" /> Irish Corridor (P55.5): ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-primary">Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 400: Sovereign Credential Mesh. Securely managing eIDAS, OBIE, and Irish Banking credentials with 100% tenant-scoped data isolation and Nora-52 compliance audit.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Active Tenant</p>
                  <p className="text-xl font-headline font-bold text-primary flex items-center gap-2 justify-center">
                    <Users className="size-4" /> {activeTenant}
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              
              {/* Compliance Analytics Dashboard */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <BarChart3 className="size-4" /> Regulatory Compliance Analytics
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Valid Handshakes", val: "99.9%", icon: ShieldCheck, color: "text-emerald-500" },
                      { label: "Irish Corridor Sync", val: "100%", icon: Landmark, color: "text-blue-500" },
                      { label: "Renewal Pipeline", val: "3 Pending", icon: RefreshCcw, color: "text-amber-500" }
                    ].map((a, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2">
                        <CardContent className="p-6 space-y-3">
                           <div className="flex justify-between items-center">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">{a.label}</p>
                              <a.icon className={`size-4 ${a.color}`} />
                           </div>
                           <p className="text-2xl font-headline font-bold text-white">{a.val}</p>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Upload Module with Scoping */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Plus className="size-4" /> Provision Isolated Credential
                 </h3>
                 <Card className="glass-card border-l-4 border-l-primary">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-white">Credential Payload</CardTitle>
                       <CardDescription>Upload files for Tenant: {activeTenant}. Data is quantum-anchored to Project #55.5.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Certificate Type</Label>
                             <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
                                <SelectTrigger className="bg-background/50 border-white/10 font-bold uppercase text-[10px] h-12">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="EIDAS_QSEALC">eIDAS QSealC (Signing)</SelectItem>
                                   <SelectItem value="EIDAS_QWAC">eIDAS QWAC (Transport)</SelectItem>
                                   <SelectItem value="OBIE_SIGNING">OBIE Signing</SelectItem>
                                   <SelectItem value="IRISH_CORP_EIDAS">Irish Corp eIDAS</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Regulatory Scope</Label>
                             <Select value={form.scope} onValueChange={v => setForm({...form, scope: v})}>
                                <SelectTrigger className="bg-background/50 border-white/10 font-bold uppercase text-[10px] h-12">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="AIS">Account Info (AIS)</SelectItem>
                                   <SelectItem value="PIS">Payments (PIS)</SelectItem>
                                   <SelectItem value="AIS_PIS">Full (AIS + PIS)</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Certificate Key ID</Label>
                             <Input 
                               value={form.keyId}
                               onChange={e => setForm({...form, keyId: e.target.value})}
                               placeholder="e.g. obie-key-991" 
                               className="bg-background/50 border-white/10 font-mono text-xs h-12"
                             />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Friendly Name</Label>
                             <Input 
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                placeholder="e.g. BNP Paribas Hub" 
                                className="bg-background/50 border-white/10 font-bold h-12"
                             />
                          </div>
                       </div>

                       <Button 
                         onClick={handleSaveCertificate}
                         disabled={loading}
                         className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary"
                       >
                          {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <ShieldCheck className="size-5 mr-2" />}
                          Anchor to Tenant Vault (P55.5)
                       </Button>
                    </CardContent>
                 </Card>
              </section>

              {/* Tenant Credential Ledger */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Database className="size-4" /> Isolated Credential Registry
                 </h3>
                 <Card className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="bg-white/2 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                                <th className="px-6 py-4">Credential Name</th>
                                <th className="px-6 py-4">Scope</th>
                                <th className="px-6 py-4">Autonomy</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             {filteredCerts.map((c, i) => (
                               <tr key={i} className="hover:bg-white/2 transition-colors">
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <div className="size-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                                           <FileCode className="size-4 text-primary" />
                                        </div>
                                        <div>
                                           <p className="text-xs font-bold text-white uppercase">{c.name}</p>
                                           <p className="text-[8px] text-muted-foreground font-mono">Expires: {c.expiry}</p>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4">
                                     <Badge variant="outline" className="text-[7px] border-primary/20 text-primary">{c.scope}</Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                     <Badge className={`text-[7px] border-none ${c.renewal === 'AUTOMATED' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-muted-foreground'}`}>{c.renewal}</Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-1.5">
                                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase">{c.status}</span>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                     <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8" onClick={handleGenerateCSR}>
                                        <FileKey className="size-4" />
                                     </Button>
                                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8">
                                        <Trash2 className="size-4" />
                                     </Button>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </Card>
              </section>
            </div>

            <div className="space-y-8">
              {/* Expiry Sentinel with CSR Automation */}
              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Expiry Sentinel v3.5
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Renewal Policy</p>
                     <p className="text-[10px] text-white italic">"Auto-trigger CSR workflow 30 days before expiration for all 16 nodes."</p>
                  </div>
                  <div className="pt-2">
                     <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">WORKFLOW_ARMED</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Project #55.5 Synergy */}
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Fingerprint className="size-4" /> Vault Synchronization
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                       "Every isolated credential is quantum-anchored to the Sovereign Vault (Project #55.5) with Irish regulatory oversight."
                    </p>
                    <div className="flex justify-between items-center text-[9px] font-mono border-t border-white/5 pt-4">
                       <span className="uppercase">Irish Grid Sync</span>
                       <span className="text-emerald-500 font-bold">100%</span>
                    </div>
                 </CardContent>
              </Card>

              {/* Tenant Switcher (Simulated) */}
              <Card className="glass-card">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground">Admin Workspace</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2">
                    <Select value={activeTenant} onValueChange={setActiveTenant}>
                       <SelectTrigger className="h-9 text-[10px] font-bold bg-white/5 border-white/10">
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="TENANT_01">Partner: ABN AMRO</SelectItem>
                          <SelectItem value="TENANT_02">Partner: SIBS Hub</SelectItem>
                          <SelectItem value="TENANT_03">Partner: AIB Ireland</SelectItem>
                       </SelectContent>
                    </Select>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
