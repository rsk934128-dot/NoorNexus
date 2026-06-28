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
  CloudDownload,
  Chrome,
  Eye,
  EyeOff,
  Gavel,
  MessageSquare,
  Sparkles,
  SmartphoneNfc
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { requestNotificationPermission } from "@/services/notification-service"
import { getPendingTasks, processSyncQueue } from "@/services/sync-engine"
import { googleClientId } from "@/firebase/config"
import { setSovereignClaims, broadcastMeshMessage, revokeIdentityAccess } from "@/services/admin-service"

export default function EnterpriseSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [adminLoading, setAdminLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [notificationsAllowed, setNotificationsAllowed] = useState(false)
  const [pendingTasks, setPendingTasks] = useState<any[]>([])
  
  const APP_CONFIG = {
    name: "NoorNexus",
    id: "studio-786911773-686ad",
    secret: "S0V_RETA_P4SS_9988X_L4",
    googleClientId: googleClientId,
    createdDate: "27 Jun 2026, 12:20 am",
    status: "ENABLED",
    type: "Direct"
  }

  const PLACEHOLDERS = [
    { key: "%DISPLAY_NAME%", desc: "Recipient's Name" },
    { key: "%APP_NAME%", desc: "NoorNexus OS" },
    { key: "%LINK%", desc: "Action Target URL" },
    { key: "%EMAIL%", desc: "Primary Identity" }
  ]

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

  const handleSetClaims = async () => {
    setAdminLoading(true);
    try {
      const res = await setSovereignClaims("ROOT_COMMANDER", { imperial_access: true, mission_500: "PEAK" });
      toast({ title: "Custom Claims Set", description: res.message });
    } catch (e) {
      toast({ title: "Claims Error", variant: "destructive" });
    } finally {
      setAdminLoading(false);
    }
  }

  const handleBroadcast = async () => {
    setAdminLoading(true);
    try {
      const res = await broadcastMeshMessage("Mission 500 Peak Alert", "Commander Farid has initiated the final sync.", "global");
      toast({ title: "Broadcast Dispatched", description: res.message });
    } catch (e) {
      toast({ title: "FCM Error", variant: "destructive" });
    } finally {
      setAdminLoading(false);
    }
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
              <TabsTrigger value="admin" className="gap-2 px-6"><Gavel className="size-4" /> Admin Protocols</TabsTrigger>
              <TabsTrigger value="messaging" className="gap-2 px-6"><Mail className="size-4" /> Identity Messaging</TabsTrigger>
              <TabsTrigger value="sync" className="gap-2 px-6"><CloudOff className="size-4" /> Offline Ledger</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Key className="size-4 text-primary" /> API & Identity Credentials
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
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Google Client ID</Label>
                                 <div className="flex gap-2">
                                    <div className="relative flex-1">
                                       <Chrome className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                       <Input value={APP_CONFIG.googleClientId} readOnly className="bg-background/50 border-white/10 font-mono text-xs h-12 pl-10" />
                                    </div>
                                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 border-white/10" onClick={() => handleCopy(APP_CONFIG.googleClientId, "Client ID")}>
                                       <Copy className="size-4" />
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <ShieldAlert className="size-4 text-purple-400" /> Admin SDK Overrides
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                                 <div className="flex items-center gap-3">
                                    <UserCheck className="size-5 text-purple-400" />
                                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Custom Identity Claims</h4>
                                 </div>
                                 <Button 
                                    onClick={handleSetClaims} 
                                    disabled={adminLoading}
                                    className="w-full bg-purple-500 text-white font-bold h-10 uppercase text-[9px] gap-2"
                                 >
                                    {adminLoading ? <Loader2 className="size-3 animate-spin" /> : <Fingerprint className="size-3" />}
                                    Anchors Imperial Claims
                                 </Button>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="messaging" className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Mail className="size-4 text-emerald-400" /> Account Management Messaging
                           </CardTitle>
                           <CardDescription className="text-xs">Customizing password resets, email verification, and SMS alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                 <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Template Placeholders</h4>
                                 <div className="space-y-2">
                                    {PLACEHOLDERS.map((p, i) => (
                                       <div key={i} className="flex justify-between items-center p-2.5 bg-black/40 rounded border border-white/5">
                                          <code className="text-emerald-500 text-[10px] font-bold">{p.key}</code>
                                          <span className="text-[9px] text-muted-foreground uppercase">{p.desc}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                              <div className="space-y-4">
                                 <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Custom Sender Hub</h4>
                                 <div className="p-4 bg-white/2 rounded-xl border border-white/10 space-y-3">
                                    <div className="flex justify-between items-center">
                                       <span className="text-[10px] text-white font-bold uppercase">Sovereign Domain</span>
                                       <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-[8px]">VERIFIED</Badge>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                                       "Sender: noreply@noornexus.sovereign. All communications are signed with Article XI Verifiable standards."
                                    </p>
                                    <Button variant="outline" className="w-full border-white/10 h-9 text-[9px] uppercase font-bold gap-2">
                                       <Globe className="size-3" /> Customize Domain
                                    </Button>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Action Link Configuration</h4>
                              <div className="p-4 bg-black/60 rounded-xl border border-primary/20 space-y-4 relative overflow-hidden">
                                 <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Sparkles className="size-16 text-primary" />
                                 </div>
                                 <div className="space-y-2">
                                    <Label className="text-[9px] uppercase font-bold text-muted-foreground">Action URL Bridge</Label>
                                    <Input readOnly value="https://noornexus.sovereign/acctmgmt/__/auth/action" className="bg-background/50 border-white/5 font-mono text-[10px] h-10" />
                                 </div>
                                 <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                                    "Custom Action URL allows NoorNexus to handle password resets and email verification natively, bypassing default rails."
                                 </p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
                  <div className="space-y-8">
                     <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                              <ShieldPlus className="size-4" /> Comm Integrity
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                              "Every outbound SMS/Email carries a neural integrity seal. Placeholders are injected at the edge nodes for zero-latency delivery."
                           </p>
                           <div className="pt-2">
                              <Badge variant="outline" className="w-full justify-center h-8 border-amber-500/30 text-amber-500 uppercase text-[9px] font-bold">ARTICLE_XI_ENFORCED</Badge>
                           </div>
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
               </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </div>
  )
}
