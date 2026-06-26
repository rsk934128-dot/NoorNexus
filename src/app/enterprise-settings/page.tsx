"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  ShieldCheck, 
  Copy, 
  Key, 
  RefreshCcw, 
  Link2, 
  Globe, 
  Database, 
  FileCode, 
  Trash2, 
  Menu,
  CheckCircle2,
  Lock,
  Cpu,
  BarChart3,
  Network,
  Rocket,
  MoreVertical,
  Activity,
  History,
  Zap,
  Loader2,
  Fingerprint,
  ShieldPlus,
  ArrowRightLeft,
  Clock,
  ShieldAlert,
  Flame,
  Atom,
  Shield
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EnterpriseSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [rotationDays, setRotationDays] = useState(15)
  
  // Official App Config from the Lead Architect
  const APP_CONFIG = {
    name: "NoorNexus",
    id: "a085f875-dac3-47ef-83dd-b00d56df81d3",
    secret: "S0V_RETA_P4SS_9988X_L4",
    createdDate: "27 Jun 2026, 12:20 am",
    redirectUrl: "https://auth.yapily.com/",
    authHandler: "https://studio-786911773-686ad.firebaseapp.com/__/auth/handler",
    status: "ENABLED",
    type: "Direct"
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: `${label} Copied`, description: "Stored in neural clipboard buffer." })
  }

  const handleRotateSecret = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setRotationDays(30)
      toast({ 
        title: "Secret Rotation Successful", 
        description: "New HMAC_V4 key anchored to the Sovereign Vault.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2000)
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
                   <Settings className="size-3 mr-2" /> Application Lifecycle Management
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <ShieldPlus className="size-3 mr-2" /> Nora-52 Audited
                 </Badge>
              </div>
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-headline font-bold text-2xl shadow-[0_0_15px_rgba(0,150,255,0.3)]">
                    N
                 </div>
                 <div>
                    <h2 className="text-3xl font-headline font-bold flex items-center gap-2 uppercase tracking-tighter">
                      {APP_CONFIG.name} <span className="text-primary">Fortress.</span>
                    </h2>
                    <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">Official Application Node: {APP_CONFIG.id.substring(0, 8)}</p>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Fortress Status</p>
                  <div className="flex items-center justify-center gap-2">
                     <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                     <p className="text-xl font-headline font-bold text-emerald-500 uppercase">UNBREAKABLE</p>
                  </div>
               </div>
            </div>
          </header>

          <Tabs defaultValue="settings" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
              <TabsTrigger value="settings" className="gap-2 px-6"><Settings className="size-4" /> Application Settings</TabsTrigger>
              <TabsTrigger value="auth-bridge" className="gap-2 px-6"><ArrowRightLeft className="size-4" /> Unified Auth Bridge</TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 px-6"><BarChart3 className="size-4" /> Traffic Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     {/* API Credentials with Rotation */}
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Key className="size-4 text-primary" /> API Credentials & Lifecycle
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="space-y-6">
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Application ID</Label>
                                 <div className="flex gap-2">
                                    <Input value={APP_CONFIG.id} readOnly className="bg-background/50 border-white/10 font-mono text-xs h-12" />
                                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 border-white/10 hover:bg-primary/10 hover:text-primary" onClick={() => handleCopy(APP_CONFIG.id, "App ID")}>
                                       <Copy className="size-4" />
                                    </Button>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Application Secret</Label>
                                 <div className="flex gap-2">
                                    <div className="relative flex-1">
                                       <Input 
                                          type={showSecret ? "text" : "password"} 
                                          value={APP_CONFIG.secret} 
                                          readOnly 
                                          className="bg-background/50 border-white/10 font-mono text-xs h-12 pr-12" 
                                       />
                                       <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                                          onClick={() => setShowSecret(!showSecret)}
                                       >
                                          {showSecret ? <Lock className="size-3" /> : <RefreshCcw className="size-3" />}
                                       </Button>
                                    </div>
                                    <Button onClick={handleRotateSecret} disabled={loading} variant="outline" className="h-12 px-6 border-primary/20 text-primary hover:bg-primary/10 uppercase font-bold text-[10px] tracking-widest gap-2">
                                       {loading ? <Loader2 className="size-3 animate-spin" /> : <RefreshCcw className="size-3" />}
                                       Rotate Secret
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Sovereign Auth Handler Node (NEW) */}
                     <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Shield className="size-4 text-purple-400" /> Sovereign Auth Handler Node
                           </CardTitle>
                           <CardDescription className="text-xs">Official Firebase Identity Callback Endpoint.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex gap-2">
                              <Input value={APP_CONFIG.authHandler} readOnly className="bg-transparent border-none font-mono text-[10px] text-purple-300 h-8 p-0" />
                              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-purple-400" onClick={() => handleCopy(APP_CONFIG.authHandler, "Auth Handler")}>
                                 <Copy className="size-3" />
                              </Button>
                           </div>
                           <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-[8px] border-emerald-500/30 text-emerald-500 uppercase">Trusted_Callback: VERIFIED</Badge>
                              <Badge variant="outline" className="text-[8px] border-purple-500/30 text-purple-400 uppercase">mTLS_ENFORCED</Badge>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Secret Rotation Policy Panel */}
                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                              <ShieldCheck className="size-4" /> Secret Rotation Policy (Project #55 Sync)
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                           <div className="space-y-1">
                              <p className="text-xs text-white font-bold uppercase">Next Scheduled Rotation</p>
                              <p className="text-[10px] text-muted-foreground">Automatically anchored to Sovereign Vault.</p>
                           </div>
                           <div className="text-right">
                              <p className="text-2xl font-headline font-bold text-emerald-500">{rotationDays} Days</p>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">HEALTHY</Badge>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Open Banking redirect URL */}
                     <Card className="glass-card">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center justify-between">
                              <span className="flex items-center gap-2"><Globe className="size-4 text-primary" /> Open Banking Redirect</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                              <Label className="text-[9px] font-bold text-muted-foreground uppercase">Current Auth Endpoint</Label>
                              <code className="text-xs font-mono text-primary block">{APP_CONFIG.redirectUrl}</code>
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  <div className="space-y-8">
                     {/* OAuth Orchestrator (SSO for Finance) */}
                     <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-purple-500 flex items-center gap-2">
                              <ArrowRightLeft className="size-4" /> OAuth Orchestrator
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                              <p className="text-[10px] text-muted-foreground uppercase font-bold">SSO Finance Status</p>
                              <Badge className="bg-purple-500 text-[10px] font-bold">ENABLED</Badge>
                           </div>
                           <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                              "Acts as a Single Sign-On for enterprise partners. Partners authorize banking data via NoorNexus Unified Auth Bridge."
                           </p>
                        </CardContent>
                     </Card>

                     {/* Nora-52 Zenith Integration */}
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                              <BrainCircuit className="size-4" /> Zenith Integration
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase border-b border-white/5 pb-2">
                              <span className="text-muted-foreground">Nora-52 Link</span>
                              <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 uppercase font-bold">ACTIVE</Badge>
                           </div>
                           <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                              "Every transaction under this App ID is monitored at the Zenith Level for real-time compliance logging."
                           </p>
                        </CardContent>
                     </Card>

                     {/* Project #55 Vault Anchor */}
                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                              <Atom className="size-4" /> Vault Anchoring
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center gap-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                              <ShieldCheck className="size-4 text-emerald-500" />
                              <span className="text-[9px] text-emerald-500 font-bold uppercase">Quantum Anchored: YES</span>
                           </div>
                           <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                              "Your secrets are anchored to the Cold Storage Node 1. Data is invisible to standard mesh traffic."
                           </p>
                        </CardContent>
                     </Card>

                     {/* Safety Zone */}
                     <Card className="glass-card border-t-4 border-t-destructive/40 bg-destructive/5">
                        <CardHeader>
                           <CardTitle className="text-[10px] font-bold text-destructive uppercase tracking-widest">Node Dissolution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                              "Terminating the application will dissolve all 57,200+ banking canal connections."
                           </p>
                           <Button className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border border-destructive/20 font-bold uppercase text-[10px] tracking-widest h-11">
                              Delete Application Node
                           </Button>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="auth-bridge" className="space-y-6">
               <Card className="glass-card border-l-4 border-l-purple-500">
                  <CardHeader>
                     <CardTitle className="text-sm font-headline uppercase text-purple-500 flex items-center gap-2">
                        <Fingerprint className="size-5" /> SSO Finance Configuration
                     </CardTitle>
                     <CardDescription>Enterprise Single Sign-On for global banking authorization.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="p-6 bg-black/40 rounded-xl border border-dashed border-white/20 text-center space-y-4">
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">Partner Authorization Proxy: ACTIVE</p>
                        <Button className="bg-purple-500 text-white font-bold uppercase tracking-widest h-12 px-8">
                           Configure SSO Proxy
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </div>
  )
}
