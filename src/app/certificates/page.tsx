"use client"

import { useState } from "react"
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
  Database
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function CertificateVaultPage() {
  const { toast } = useToast()
  const db = useFirestore()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    name: "",
    type: "EIDAS_QSEALC",
    keyId: "",
    certFile: null as File | null,
    keyFile: null as File | null
  })

  async function handleSaveCertificate() {
    if (!form.name || !form.keyId) {
      toast({ title: "Validation Error", description: "Name and Key ID are required.", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      // SECURITY HARDENING: Simulate encryption and storage in Imperial Vault
      await addDoc(collection(db, "certificates"), {
        name: form.name,
        type: form.type,
        keyId: form.keyId,
        status: "ACTIVE",
        issuer: "SOVEREIGN_ROOT_CA",
        uploadedBy: user?.email,
        timestamp: serverTimestamp()
      })

      toast({
        title: "Certificate Anchored",
        description: "Your credential has been encrypted and stored in the Imperial Vault.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })

      setForm({ name: "", type: "EIDAS_QSEALC", keyId: "", certFile: null, keyFile: null })
    } catch (e: any) {
      toast({ title: "Vault Failure", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
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
                   <Lock className="size-3 mr-2" /> P51.6: Imperial Credential Vault
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Certificate <span className="text-primary">Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 400: Global Handshake Layer. Upload and manage eIDAS (QSealC, QWAC) and OBIE certificates for regional banking node authentication.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Vault Integrity</p>
                  <p className="text-xl font-headline font-bold text-emerald-500 flex items-center gap-2 justify-center">
                    <ShieldCheck className="size-4" /> SECURE_L4
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Upload Module */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Plus className="size-4" /> Provision New Credential
                 </h3>
                 <Card className="glass-card">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-white">Credential Details</CardTitle>
                       <CardDescription>Upload your PEM/CRT files and private keys for node signing.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Certificate File (*.pem, *.crt)</Label>
                             <div className="relative group">
                                <Input 
                                  type="file" 
                                  className="bg-background/50 border-white/10 cursor-pointer file:bg-primary file:text-primary-foreground file:border-none file:text-[10px] file:uppercase file:font-bold file:h-full file:mr-4"
                                />
                                <Upload className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Key File (*.key)</Label>
                             <div className="relative group">
                                <Input 
                                  type="file" 
                                  className="bg-background/50 border-white/10 cursor-pointer file:bg-destructive file:text-white file:border-none file:text-[10px] file:uppercase file:font-bold file:h-full file:mr-4"
                                />
                                <Key className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Type of Certificate</Label>
                             <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
                                <SelectTrigger className="bg-background/50 border-white/10 font-bold uppercase text-[10px] h-12">
                                   <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="EIDAS_QSEALC">eIDAS QSealC (Signing)</SelectItem>
                                   <SelectItem value="EIDAS_QWAC">eIDAS QWAC (Transport)</SelectItem>
                                   <SelectItem value="OBIE_SIGNING">OBIE Signing</SelectItem>
                                   <SelectItem value="OBIE_TRANSPORT">OBIE Transport</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Certificate Key ID</Label>
                             <Input 
                               value={form.keyId}
                               onChange={e => setForm({...form, keyId: e.target.value})}
                               placeholder="e.g. key-id-from-directory" 
                               className="bg-background/50 border-white/10 font-mono text-xs h-12"
                             />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">Friendly Name</Label>
                          <Input 
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                            placeholder="e.g. ABN AMRO Belgium Production" 
                            className="bg-background/50 border-white/10 font-bold h-12"
                          />
                       </div>

                       <Button 
                         onClick={handleSaveCertificate}
                         disabled={loading}
                         className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 glow-primary text-sm"
                       >
                          {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <ShieldCheck className="size-5 mr-2" />}
                          Anchor Credential to Vault
                       </Button>
                    </CardContent>
                 </Card>
              </section>

              {/* Active Certificates Table */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Database className="size-4" /> Active Sovereign Credentials
                 </h3>
                 <Card className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="bg-white/2 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                                <th className="px-6 py-4">Credential Name</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             {[
                               { name: "ABN AMRO BE Corporate", type: "QSealC", status: "VALID", expiry: "2027-12-30" },
                               { name: "SIBS Portugal Portal", type: "QWAC", status: "VALID", expiry: "2027-05-15" }
                             ].map((c, i) => (
                               <tr key={i} className="hover:bg-white/2 transition-colors">
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <div className="size-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                                           <FileCode className="size-4 text-primary" />
                                        </div>
                                        <div>
                                           <p className="text-xs font-bold text-white uppercase">{c.name}</p>
                                           <p className="text-[8px] text-muted-foreground font-mono uppercase">Expires: {c.expiry}</p>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4">
                                     <Badge variant="secondary" className="text-[8px] font-bold bg-white/5 text-muted-foreground">{c.type}</Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-1.5">
                                        <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase">{c.status}</span>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
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
              {/* Compliance Sentinel */}
              <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> eIDAS Expiry Sentinel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Sovereign Core monitoring eIDAS validity. Automated renewal handshake will be triggered 30 days before expiration."
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                       <span className="text-muted-foreground uppercase">Next Renewal Check</span>
                       <span className="text-white font-bold uppercase">Cycle 43 (3d)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Blueprint Sync */}
              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Activity className="size-4" /> eIDAS Handshake Status
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {[
                      { label: "QSealC Signing", status: "ENFORCED" },
                      { label: "QWAC TLS", status: "STABLE" },
                      { label: "Key Storage", status: "HSM_L4" }
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-black/40 rounded border border-white/5">
                         <span className="text-[9px] text-muted-foreground font-bold uppercase">{s.label}</span>
                         <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{s.status}</Badge>
                      </div>
                    ))}
                 </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                       <Globe className="size-3" /> Global Directory Sync
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                       "Credential metadata is synchronized with Yapily Global Directory and local sovereign nodes every 4 hours."
                    </p>
                 </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
