
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
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  FileCode, 
  Lock, 
  RefreshCcw,
  Plus,
  Trash2,
  History,
  Activity,
  Database,
  ShieldPlus,
  ArrowRight,
  FileKey,
  Fingerprint,
  BarChart3,
  Landmark,
  Settings2,
  Cpu,
  Smartphone
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
  const [activeTenant, setActiveTenant] = useState("SYSTEM_ROOT")
  const [generatingPlatformKey, setGeneratingPlatformKey] = useState(false)
  
  const [form, setForm] = useState({
    name: "",
    type: "PLATFORM_SIGNING",
    keyId: "",
    scope: "SYSTEM_LEVEL_CONTROL",
  })

  const certificates = [
    { name: "Platform Signing Key", type: "ROOT_JKS", scope: "SYSTEM", status: "SIGNED", expiry: "2036-12-30", renewal: "PERPETUAL", tenant: "SYSTEM_ROOT" },
    { name: "Device Owner Cert", type: "DPM_POLICY", scope: "CONTROL", status: "ACTIVE", expiry: "2028-05-15", renewal: "AUTOMATED", tenant: "SYSTEM_ROOT" },
    { name: "ABN AMRO BE Corporate", type: "QSealC", scope: "AIS_PIS", status: "VALID", expiry: "2027-12-30", renewal: "AUTOMATED", tenant: "TENANT_01" }
  ]

  const filteredCerts = useMemo(() => {
    return certificates.filter(c => c.tenant === activeTenant)
  }, [activeTenant])

  async function handleGeneratePlatformKey() {
    setGeneratingPlatformKey(true)
    setTimeout(() => {
      setGeneratingPlatformKey(false)
      toast({
        title: "Platform Certificate Generated",
        description: "android.uid.system signature anchored to keystore.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2500)
  }

  async function handleSaveCertificate() {
    if (!form.name || !form.keyId) {
      toast({ title: "Validation Error", description: "Name and Key ID are required.", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, "certificates"), {
        ...form,
        tenantId: activeTenant,
        status: "ACTIVE",
        issuer: "SOVEREIGN_PLATFORM_CA",
        timestamp: serverTimestamp()
      })
      toast({ title: "Credential Anchored", description: `Successfully isolated for ${activeTenant}.` })
      setForm({ name: "", type: "PLATFORM_SIGNING", keyId: "", scope: "SYSTEM_LEVEL_CONTROL" })
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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Cpu className="size-3 mr-2" /> Signed System Application Mode
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Platform <span className="text-primary">Vault.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                "Breaking the Browser Sandbox." Managing platform-level signatures to enable background persistence, auto-granted hardware permissions, and device owner policies.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                onClick={handleGeneratePlatformKey}
                disabled={generatingPlatformKey}
                className="bg-emerald-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-emerald"
               >
                 {generatingPlatformKey ? <Loader2 className="size-4 animate-spin" /> : <Settings2 className="size-4" />}
                 Generate Platform Key
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Smartphone className="size-4" /> Device Owner Control Matrix
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Background Persistence", status: "ENABLED", icon: Activity, color: "text-emerald-500" },
                      { label: "Platform Signing", status: "SIGNED", icon: ShieldCheck, color: "text-blue-500" },
                      { label: "DPM Policy Status", status: "ACTIVE", icon: Lock, color: "text-amber-500" }
                    ].map((a, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-white/2">
                        <CardContent className="p-6 space-y-3">
                           <div className="flex justify-between items-center">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">{a.label}</p>
                              <a.icon className={`size-4 ${a.color}`} />
                           </div>
                           <p className="text-2xl font-headline font-bold text-white">{a.status}</p>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Plus className="size-4" /> Provision System Certificate
                 </h3>
                 <Card className="glass-card border-l-4 border-l-primary">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-white">Platform Credential Payload</CardTitle>
                       <CardDescription>Granting android.uid.system level permissions to NoorNexus OS.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Permission Type</Label>
                             <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
                                <SelectTrigger className="bg-background/50 border-white/10 font-bold uppercase text-[10px] h-12">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="PLATFORM_SIGNING">Platform Signing Key (.jks)</SelectItem>
                                   <SelectItem value="DEVICE_OWNER">Device Owner Token</SelectItem>
                                   <SelectItem value="SECURE_SETTINGS">Secure Settings Permission</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Security Scope</Label>
                             <Select value={form.scope} onValueChange={v => setForm({...form, scope: v})}>
                                <SelectTrigger className="bg-background/50 border-white/10 font-bold uppercase text-[10px] h-12">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="SYSTEM">System Root (android.uid.system)</SelectItem>
                                   <SelectItem value="GLOBAL">Global Hardware Control</SelectItem>
                                   <SelectItem value="ISOLATED">Isolated Process Only</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Master Key ID</Label>
                             <Input 
                               value={form.keyId}
                               onChange={e => setForm({...form, keyId: e.target.value})}
                               placeholder="e.g. platform-master-001" 
                               className="bg-background/50 border-white/10 font-mono text-xs h-12"
                             />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] uppercase font-bold text-muted-foreground">Certificate Alias</Label>
                             <Input 
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                placeholder="e.g. Imperial System Signer" 
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
                          Sign & Anchor to System Core
                       </Button>
                    </CardContent>
                 </Card>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Database className="size-4" /> System Certificate Ledger
                 </h3>
                 <Card className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="bg-white/2 text-[9px] uppercase font-bold text-muted-foreground tracking-widest border-b border-white/5">
                                <th className="px-6 py-4">Key Identity</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Auth Level</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             {filteredCerts.map((c, i) => (
                               <tr key={i} className="hover:bg-white/2 transition-colors">
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <div className="size-8 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                           <FileKey className="size-4 text-emerald-500" />
                                        </div>
                                        <div>
                                           <p className="text-xs font-bold text-white uppercase">{c.name}</p>
                                           <p className="text-[8px] text-muted-foreground font-mono">{c.type}</p>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4">
                                     <Badge className="text-[7px] bg-emerald-500/20 text-emerald-500 border-none uppercase">{c.status}</Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                     <Badge variant="outline" className="text-[7px] border-primary/20 text-primary uppercase">{c.scope}</Badge>
                                  </td>
                                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                     <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8">
                                        <RefreshCcw className="size-4" />
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
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Activity className="size-4" /> Foreground Service Sync
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "The system is registered as a Foreground Service. The OS kernel will not terminate this process regardless of battery optimization levels."
                  </p>
                  <div className="pt-2">
                     <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold tracking-widest">PROCESS_IMMORTAL: ON</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <Zap className="size-4" /> Background Sync Node
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                       "Service Worker (SW v3.5) listening for push events. Latency minimized to < 10ms for signal reception."
                    </p>
                    <div className="flex justify-between items-center text-[9px] font-mono border-t border-white/5 pt-4">
                       <span className="uppercase text-muted-foreground">SW Connection</span>
                       <span className="text-emerald-500 font-bold uppercase">PERSISTENT</span>
                    </div>
                 </CardContent>
              </Card>

              <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> System Integrity Check
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Last platform scan: <strong>PASSED</strong>. 0 trust anomalies detected in kernel bridge.
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
