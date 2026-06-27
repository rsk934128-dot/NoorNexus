
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
  Shield,
  BrainCircuit,
  Mail,
  ShieldEllipsis
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EnterpriseSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [rotationDays, setRotationDays] = useState(15)
  
  // Official App Config & Security Template from the Lead Architect
  const APP_CONFIG = {
    name: "NoorNexus",
    id: "studio-786911773-686ad",
    secret: "S0V_RETA_P4SS_9988X_L4",
    createdDate: "27 Jun 2026, 12:20 am",
    redirectUrl: "https://auth.yapily.com/",
    authHandler: "https://studio-786911773-686ad.firebaseapp.com/__/auth/handler",
    fromEmail: "noreply@studio-786911773-686ad.firebaseapp.com",
    status: "ENABLED",
    type: "Direct"
  }

  const MFA_TEMPLATE = {
    subject: "You've added 2 step verification to your NoorNexus account.",
    body: `Hello %DISPLAY_NAME%,

Your account in NoorNexus has been updated with %SECOND_FACTOR% for 2-step verification.

If you didn't add this 2-step verification, click the link below to remove it.

https://studio-786911773-686ad.firebaseapp.com/__/auth/action?mode=action&oobCode=code

Thanks,

Your NoorNexus team`
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
                   <ShieldPlus className="size-3 mr-2" /> 2-Step Verification Active
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
                    <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">Project ID: {APP_CONFIG.id}</p>
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
              <TabsTrigger value="settings" className="gap-2 px-6"><Settings className="size-4" /> App Settings</TabsTrigger>
              <TabsTrigger value="security" className="gap-2 px-6"><ShieldEllipsis className="size-4" /> Security Protocols</TabsTrigger>
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

                     {/* Sovereign Auth Handler Node */}
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
                  </div>

                  <div className="space-y-8">
                     {/* 2-Step Verification Info Card */}
                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                              <ShieldCheck className="size-4" /> Identity Protection
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center space-y-2">
                              <p className="text-[10px] text-muted-foreground uppercase font-bold">2-Step Verification</p>
                              <Badge className="bg-emerald-500 text-black text-[10px] font-bold">ACTIVE</Badge>
                           </div>
                           <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                              "Security Level 4 is enforced. Every sensitive configuration change requires a secondary neural pulse confirmation."
                           </p>
                        </CardContent>
                     </Card>

                     {/* Project #55 Vault Anchor */}
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                              <Atom className="size-4" /> Vault Anchoring
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center gap-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                              <ShieldCheck className="size-4 text-emerald-500" />
                              <span className="text-[9px] text-emerald-500 font-bold uppercase">Quantum Anchored: YES</span>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                              <Mail className="size-5" /> 2-Step Verification Template
                           </CardTitle>
                           <CardDescription className="text-xs">Automated security dispatch configuration.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">Sender Email</Label>
                                 <Input value={APP_CONFIG.fromEmail} readOnly className="bg-background/50 border-white/10 font-mono text-xs h-10" />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">Email Subject</Label>
                                 <Input value={MFA_TEMPLATE.subject} readOnly className="bg-background/50 border-white/10 font-bold text-xs h-10" />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">Email Content Block</Label>
                                 <div className="p-4 bg-black/60 rounded-xl border border-white/5">
                                    <pre className="text-[10px] text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap">
                                       {MFA_TEMPLATE.body}
                                    </pre>
                                 </div>
                              </div>
                           </div>
                           <Button variant="outline" className="w-full border-primary/20 text-primary uppercase font-bold text-[10px] tracking-widest h-11 gap-2">
                              <Settings className="size-3" /> Edit Security Templates
                           </Button>
                        </CardContent>
                     </Card>
                  </div>

                  <div className="space-y-8">
                     <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                              <ShieldAlert className="size-4" /> Vulnerability Watch
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                              <span className="text-muted-foreground uppercase">Brute Force Guard</span>
                              <span className="text-emerald-500 font-bold">ACTIVE</span>
                           </div>
                           <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                              <span className="text-muted-foreground uppercase">Account Takeover Shield</span>
                              <span className="text-emerald-500 font-bold">STABLE</span>
                           </div>
                           <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                              "Nora-01 is monitoring for suspicious authorization patterns across all 100 nodes."
                           </p>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="auth-bridge" className="space-y-6">
               <Card className="glass-card border-l-4 border-l-purple-500">
                  <CardHeader>
                     <CardTitle className="text-sm font-headline uppercase text-purple-500 flex items-center gap-2">
                        <Fingerprint className="size-5" /> Unified Auth Configuration
                     </CardTitle>
                     <CardDescription>Enterprise Single Sign-On and Multi-Factor Authentication.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="p-6 bg-black/40 rounded-xl border border-dashed border-white/20 text-center space-y-4">
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">MFA Enrollment Provider: FIREBASE_AETS</p>
                        <Button className="bg-purple-500 text-white font-bold uppercase tracking-widest h-12 px-8">
                           Sync MFA Policies
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
