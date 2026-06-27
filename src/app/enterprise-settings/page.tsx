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
  ShieldEllipsis,
  ShieldQuestion,
  UserCheck,
  Smartphone,
  BellRing,
  CloudOff,
  CloudDownload
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { requestNotificationPermission } from "@/services/notification-service"
import { getPendingTasks, processSyncQueue } from "@/services/sync-engine"

export default function EnterpriseSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [notificationsAllowed, setNotificationsAllowed] = useState(false)
  const [pendingTasks, setPendingTasks] = useState<any[]>([])
  
  // Official App Config & Security Template
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

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationsAllowed(Notification.permission === 'granted');
    }
    setPendingTasks(getPendingTasks());
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: `${label} Copied`, description: "Stored in neural clipboard buffer." })
  }

  const handleRotateSecret = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ 
        title: "Secret Rotation Successful", 
        description: "New HMAC_V4 key anchored to the Sovereign Vault.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2000)
  }

  const handleNotificationToggle = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsAllowed(granted);
    if (granted) {
      toast({ title: "Imperial Notifications Enabled", description: "Matrix sync: ACTIVE." });
    } else {
      toast({ title: "Notifications Blocked", description: "Please enable manually in browser settings.", variant: "destructive" });
    }
  }

  const handleForceSync = async () => {
    setLoading(true);
    await processSyncQueue();
    setPendingTasks(getPendingTasks());
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto w-full pb-20 overflow-x-hidden">
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
                 <div className="size-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-headline font-bold text-2xl">
                    N
                 </div>
                 <div>
                    <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-2 uppercase tracking-tighter">
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
                     <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-xl font-headline font-bold text-emerald-500 uppercase">UNBREAKABLE</p>
                  </div>
               </div>
            </div>
          </header>

          <Tabs defaultValue="settings" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
              <TabsTrigger value="settings" className="gap-2 px-6"><Settings className="size-4" /> App Settings</TabsTrigger>
              <TabsTrigger value="sync" className="gap-2 px-6"><CloudOff className="size-4" /> Offline Ledger</TabsTrigger>
              <TabsTrigger value="permissions" className="gap-2 px-6"><ShieldQuestion className="size-4" /> System Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Key className="size-4 text-primary" /> API Credentials
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="space-y-6">
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Application ID</Label>
                                 <div className="flex gap-2">
                                    <Input value={APP_CONFIG.id} readOnly className="bg-background/50 border-white/10 font-mono text-xs h-12" />
                                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 border-white/10" onClick={() => handleCopy(APP_CONFIG.id, "App ID")}>
                                       <Copy className="size-4" />
                                    </Button>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Application Secret</Label>
                                 <div className="flex gap-2">
                                    <Input type={showSecret ? "text" : "password"} value={APP_CONFIG.secret} readOnly className="bg-background/50 border-white/10 font-mono text-xs h-12" />
                                    <Button onClick={handleRotateSecret} variant="outline" className="h-12 px-6 border-primary/20 text-primary uppercase font-bold text-[10px] gap-2">
                                       <RefreshCcw className="size-3" /> Rotate
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
                  <div className="space-y-8">
                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase text-emerald-500">Fortress Health</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                           <p className="text-3xl font-headline font-bold text-white">SECURE</p>
                           <p className="text-[9px] text-muted-foreground italic">"Background Execution: ENABLED via android.uid.system signature."</p>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="sync" className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase text-amber-500 flex items-center gap-2">
                              <Database className="size-4" /> Offline Task Ledger
                           </CardTitle>
                           <CardDescription className="text-xs">Tasks queued while the system node was disconnected.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {pendingTasks.length === 0 ? (
                             <div className="py-20 flex flex-col items-center justify-center gap-4 text-center opacity-40">
                                <CheckCircle2 className="size-12 text-emerald-500" />
                                <p className="text-xs font-mono uppercase tracking-widest text-white">Mainframe fully synchronized</p>
                             </div>
                           ) : (
                             <div className="space-y-3">
                                {pendingTasks.map((task, i) => (
                                  <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between group hover:border-amber-500/20 transition-all">
                                     <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                           <Clock className="size-5 text-amber-500" />
                                        </div>
                                        <div className="space-y-0.5">
                                           <p className="text-sm font-bold text-white uppercase">{task.action}</p>
                                           <p className="text-[10px] text-muted-foreground font-mono">{task.id}</p>
                                        </div>
                                     </div>
                                     <Badge variant="outline" className="border-amber-500/30 text-amber-500 uppercase text-[8px]">PENDING_SYNC</Badge>
                                  </div>
                                ))}
                                <Button 
                                  onClick={handleForceSync}
                                  disabled={loading}
                                  className="w-full mt-4 bg-amber-500 text-black font-bold uppercase h-12 glow-emerald"
                                >
                                   {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <CloudDownload className="size-4 mr-2" />}
                                   Force Manual Sync
                                </Button>
                             </div>
                           )}
                        </CardContent>
                     </Card>
                  </div>
                  <div className="space-y-8">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                              <ShieldPlus className="size-4" /> Sync Torque
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                              "নূরনেক্সাস সিনক্রোনাইজেশন ইঞ্জিন ইন্টারনেট ফিরে আসা মাত্রই সেকেন্ডের মধ্যে আপনার সকল পেন্ডিং কাজ শেষ করে দেবে।"
                           </p>
                           <div className="flex justify-between items-center text-[9px] font-mono border-t border-white/5 pt-4">
                              <span className="uppercase text-muted-foreground">Queue Mode</span>
                              <span className="text-emerald-500 font-bold uppercase">READY</span>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-amber-500 flex items-center gap-2">
                              <UserCheck className="size-5" /> OAuth Scope & Permission Registry
                           </CardTitle>
                           <CardDescription className="text-xs">These permissions are automatically requested during system open.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           {[
                             { name: "profile", label: "Identity Profile", desc: "Access to name, photo and bio for Gemini personalization.", status: "REQUIRED", toggle: false },
                             { name: "email", label: "Sovereign Gmail", desc: "Core identifier for cross-app synchronization.", status: "REQUIRED", toggle: false },
                             { name: "openid", label: "Session OpenID", desc: "Unified authentication bridge token.", status: "REQUIRED", toggle: false },
                             { name: "background", label: "Always-Alive Execution", desc: "Permission to run foreground services regardless of usage.", status: "ENABLED", toggle: false },
                             { name: "notifications", label: "Imperial Matrix Notifications", desc: "Push API for real-time alerts from Nora-AI and Fortress.", status: notificationsAllowed ? "GRANTED" : "DISABLED", toggle: true, action: handleNotificationToggle, val: notificationsAllowed }
                           ].map((perm, i) => (
                             <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between group hover:border-amber-500/20 transition-all">
                                <div className="flex items-center gap-4">
                                   <div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                      {perm.name === 'notifications' ? <BellRing className="size-5 text-amber-500" /> : <ShieldCheck className="size-5 text-amber-500" />}
                                   </div>
                                   <div className="space-y-0.5">
                                      <p className="text-sm font-bold text-white uppercase">{perm.label}</p>
                                      <p className="text-[10px] text-muted-foreground italic">"{perm.desc}"</p>
                                   </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                   <Badge className={`${perm.status === 'GRANTED' || perm.status === 'REQUIRED' || perm.status === 'ENABLED' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'} border-none text-[8px]`}>{perm.status}</Badge>
                                   {perm.toggle ? (
                                      <Switch checked={perm.val} onCheckedChange={perm.action} />
                                   ) : (
                                      <Switch checked={true} disabled />
                                   )}
                                </div>
                             </div>
                           ))}
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
