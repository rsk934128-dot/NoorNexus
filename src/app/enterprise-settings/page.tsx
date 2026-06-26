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
  Loader2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EnterpriseSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  
  // Data matched exactly from the provided screenshot
  const APP_CONFIG = {
    name: "NoorNexus",
    id: "a085f875-dac3-47ef-83dd-b00d56df81d3",
    secret: "S0V_RETA_P4SS_9988X_L4", // Representing the masked secret
    createdDate: "27 Jun 2026, 12:20 am",
    redirectUrl: "https://auth.yapily.com/",
    status: "ENABLED",
    type: "Direct"
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: `${label} Copied`, description: "Stored in neural clipboard buffer." })
  }

  const handleRevoke = () => {
    toast({ 
      title: "Revocation Protocol Initiated", 
      description: "Secret rotation requires L4 security clearance.",
      variant: "destructive"
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
                   <Settings className="size-3 mr-2" /> Application Lifecycle Management
                 </Badge>
              </div>
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-headline font-bold text-2xl shadow-[0_0_15px_rgba(0,150,255,0.3)]">
                    N
                 </div>
                 <div>
                    <h2 className="text-3xl font-headline font-bold flex items-center gap-2 uppercase tracking-tighter">
                      {APP_CONFIG.name} <span className="text-primary">Settings.</span>
                    </h2>
                    <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">Global Application Node: {APP_CONFIG.id.substring(0, 8)}</p>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Node Status</p>
                  <div className="flex items-center justify-center gap-2">
                     <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                     <p className="text-xl font-headline font-bold text-emerald-500 uppercase">{APP_CONFIG.status}</p>
                  </div>
               </div>
            </div>
          </header>

          <Tabs defaultValue="settings" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
              <TabsTrigger value="settings" className="gap-2 px-6"><Settings className="size-4" /> Application Settings</TabsTrigger>
              <TabsTrigger value="institutions" className="gap-2 px-6"><Network className="size-4" /> Connected Institutions</TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 px-6"><BarChart3 className="size-4" /> Traffic Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     {/* General Information */}
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center justify-between">
                              <span className="flex items-center gap-2"><Globe className="size-4 text-primary" /> General Information</span>
                              <Button variant="ghost" size="sm" className="text-primary text-[10px] uppercase font-bold">Edit Profile</Button>
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-1">
                                 <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Application Name</p>
                                 <p className="text-lg font-headline font-bold text-white uppercase">{APP_CONFIG.name}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Integration Type</p>
                                 <Badge variant="outline" className="border-primary/30 text-primary uppercase font-bold">{APP_CONFIG.type}</Badge>
                              </div>
                           </div>
                           <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <Link2 className="size-5 text-primary opacity-50" />
                                 <p className="text-xs text-muted-foreground">Connected to Yapily platform. Real-time PIS/AIS active.</p>
                              </div>
                              <CheckCircle2 className="size-4 text-emerald-500" />
                           </div>
                        </CardContent>
                     </Card>

                     {/* API Credentials */}
                     <Card className="glass-card">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Key className="size-4 text-primary" /> API Credentials
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Application ID</Label>
                                 <div className="flex gap-2">
                                    <Input value={APP_CONFIG.id} readOnly className="bg-background/50 border-white/10 font-mono text-xs h-12" />
                                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 border-white/10 hover:bg-primary/10 hover:text-primary" onClick={() => handleCopy(APP_CONFIG.id, "App ID")}>
                                       <Copy className="size-4" />
                                    </Button>
                                 </div>
                                 <p className="text-[8px] text-muted-foreground font-mono uppercase">Created: {APP_CONFIG.createdDate}</p>
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
                                    <Button variant="outline" className="h-12 px-6 border-destructive/20 text-destructive hover:bg-destructive/10 uppercase font-bold text-[10px] tracking-widest" onClick={handleRevoke}>
                                       Revoke Secret
                                    </Button>
                                 </div>
                                 <p className="text-[8px] text-muted-foreground font-mono uppercase">Created: {APP_CONFIG.createdDate}</p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Open Banking redirect URL */}
                     <Card className="glass-card">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center justify-between">
                              <span className="flex items-center gap-2"><Globe className="size-4 text-primary" /> Open Banking Redirect</span>
                              <Button variant="ghost" size="sm" className="text-primary text-[10px] uppercase font-bold">Edit URL</Button>
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                              <Label className="text-[9px] font-bold text-muted-foreground uppercase">Current Auth Endpoint</Label>
                              <code className="text-xs font-mono text-primary block">{APP_CONFIG.redirectUrl}</code>
                           </div>
                           <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                              "If redirect is blank, the application is using the default value of auth.yapily.com for sovereign consent handshakes."
                           </p>
                        </CardContent>
                     </Card>
                  </div>

                  <div className="space-y-8">
                     {/* Merchant Details */}
                     <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500">Merchant Meta-Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="space-y-4">
                              <div className="flex justify-between items-center text-[10px] font-bold uppercase border-b border-white/5 pb-2">
                                 <span className="text-muted-foreground">Contract Present</span>
                                 <Badge variant="outline" className="border-destructive/20 text-destructive bg-destructive/5">FALSE</Badge>
                              </div>
                              <div className="space-y-2">
                                 <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Merchant Category Codes</p>
                                 <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-white/5 text-white border-white/10 text-[9px]">Sovereign_OS</Badge>
                                    <Badge variant="secondary" className="bg-white/5 text-white border-white/10 text-[9px]">PaaS_Node</Badge>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Export Specs */}
                     <Card className="glass-card">
                        <CardHeader>
                           <CardTitle className="text-[10px] font-bold text-primary uppercase tracking-widest">Protocol Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Button variant="outline" className="w-full h-12 border-white/10 bg-white/2 hover:bg-white/5 justify-between px-4 group">
                              <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                                 <FileCode className="size-4 text-muted-foreground group-hover:text-primary" /> Download OpenAPI Spec
                              </span>
                              <RefreshCcw className="size-3 text-muted-foreground opacity-50" />
                           </Button>
                        </CardContent>
                     </Card>

                     {/* Safety Zone */}
                     <Card className="glass-card border-t-4 border-t-destructive/40 bg-destructive/5">
                        <CardHeader>
                           <CardTitle className="text-[10px] font-bold text-destructive uppercase tracking-widest">Node Dissolution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                              "Terminating the application will dissolve all 57,200+ banking canal connections and anchored ledger entries."
                           </p>
                           <Button className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border border-destructive/20 font-bold uppercase text-[10px] tracking-widest h-11">
                              Delete Application Node
                           </Button>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </div>
  )
}
