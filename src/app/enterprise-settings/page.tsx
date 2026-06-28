
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
  SmartphoneNfc,
  GitBranch,
  Github,
  CloudUpload
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { requestNotificationPermission } from "@/services/notification-service"
import { getPendingTasks, processSyncQueue } from "@/services/sync-engine"
import { googleClientId } from "@/firebase/config"
import { setSovereignClaims, broadcastMeshMessage, revokeIdentityAccess } from "@/services/admin-service"

/**
 * @fileOverview Application Lifecycle Management (v4.5 - Formal Release)
 * নূরনেক্সাস সাম্রাজ্যের কেন্দ্রীয় কনফিগারেশন হাব। 
 * এখন GitHub Actions CI/CD এবং RBAC Hardening ড্যাশবোর্ড সাপোর্ট করে।
 */

export default function EnterpriseSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [adminLoading, setAdminLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [notificationsAllowed, setNotificationsAllowed] = useState(false)
  const [pendingTasks, setPendingTasks] = useState<any[]>([])
  
  const APP_CONFIG = {
    name: "NoorNexus OS",
    id: "studio-786911773-686ad",
    version: "v4.5.0-gold",
    secret: "S0V_RETA_P4SS_9988X_L4",
    googleClientId: googleClientId,
    createdDate: "27 Jun 2026, 12:20 am",
    status: "PEAK_STABLE",
    type: "Sovereign PaaS"
  }

  const WORKFLOW_LOGS = [
    { id: 1, action: "Imperial Build Guard", status: "SUCCESS", time: "2h ago", branch: "main" },
    { id: 2, action: "Sovereign Deployment", status: "SUCCESS", time: "2h ago", branch: "main" },
    { id: 3, action: "Lint Veracity Check", status: "SUCCESS", time: "5h ago", branch: "master" }
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

  const handleSetClaims = async () => {
    setAdminLoading(true);
    try {
      const res = await setSovereignClaims("ROOT_COMMANDER", { imperial_access: true, mission_500: "PEAK" });
      toast({ title: "Custom Claims Anchored", description: res.message });
    } catch (e) {
      toast({ title: "Claims Error", variant: "destructive" });
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
                 <Badge variant="outline" className="border-purple-500/50 text-purple-500 uppercase font-bold tracking-widest px-3 h-8 bg-purple-500/5">
                   <Settings className="size-3 mr-2" /> Application Lifecycle Management
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   {APP_CONFIG.version}
                 </Badge>
              </div>
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-headline font-bold text-2xl">
                    N
                 </div>
                 <div>
                    <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-2 uppercase tracking-tighter">
                      Enterprise <span className="text-primary">Fortress.</span>
                    </h2>
                    <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">System Status: {APP_CONFIG.status}</p>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Grid Reliability</p>
                  <div className="flex items-center justify-center gap-2">
                     <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-xl font-headline font-bold text-emerald-500 uppercase">PEAK_ZENITH</p>
                  </div>
               </div>
            </div>
          </header>

          <Tabs defaultValue="settings" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12">
              <TabsTrigger value="settings" className="gap-2 px-6"><Settings className="size-4" /> App Settings</TabsTrigger>
              <TabsTrigger value="automation" className="gap-2 px-6"><Github className="size-4" /> CI/CD Automation</TabsTrigger>
              <TabsTrigger value="admin" className="gap-2 px-6"><Gavel className="size-4" /> RBAC Hardening</TabsTrigger>
              <TabsTrigger value="sync" className="gap-2 px-6"><CloudOff className="size-4" /> Offline Ledger</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <Key className="size-4 text-primary" /> Core Credentials
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
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Google OAuth Client</Label>
                                 <div className="flex gap-2">
                                    <Input value={APP_CONFIG.googleClientId} readOnly className="bg-background/50 border-white/10 font-mono text-xs h-12" />
                                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 border-white/10" onClick={() => handleCopy(APP_CONFIG.googleClientId, "Client ID")}>
                                       <Copy className="size-4" />
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
                           <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                              <ShieldPlus className="size-4" /> Security Hardening
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                 <p className="text-[10px] text-white font-bold uppercase">App Check Enforcement</p>
                                 <p className="text-[8px] text-muted-foreground">Force reCAPTCHA Enterprise verification.</p>
                              </div>
                              <Switch defaultChecked />
                           </div>
                           <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                 <p className="text-[10px] text-white font-bold uppercase">Identity Persistence</p>
                                 <p className="text-[8px] text-muted-foreground">Keep sessions active across nodes.</p>
                              </div>
                              <Switch defaultChecked />
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-8 animate-in fade-in duration-500">
               <Card className="glass-card border-l-4 border-l-purple-500">
                  <CardHeader>
                     <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                        <GitBranch className="size-4 text-purple-400" /> GitHub Actions: Build & Deploy
                     </CardTitle>
                     <CardDescription>Mission 500 Automation Pipeline Logs.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="divide-y divide-white/5">
                        {WORKFLOW_LOGS.map(log => (
                           <div key={log.id} className="py-4 flex items-center justify-between group hover:bg-white/2 px-2 rounded-xl transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                    <CloudUpload className="size-5 text-purple-400" />
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-white uppercase">{log.action}</p>
                                    <p className="text-[10px] text-muted-foreground font-mono uppercase">Branch: {log.branch} • {log.time}</p>
                                 </div>
                              </div>
                              <Badge className="bg-emerald-500 text-black font-bold text-[8px]">{log.status}</Badge>
                           </div>
                        ))}
                     </div>
                     <Button className="w-full bg-purple-500 text-white font-bold h-12 uppercase text-[10px] gap-2 glow-primary mt-4">
                        <Rocket className="size-4" /> Trigger Manual Deploy
                     </Button>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="admin" className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                        <CardHeader>
                           <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                              <ShieldAlert className="size-4 text-primary" /> Admin SDK & RBAC Overrides
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                                 <div className="flex items-center gap-3">
                                    <UserCheck className="size-5 text-primary" />
                                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Custom Identity Claims</h4>
                                 </div>
                                 <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                                    "Grant Imperial status (Admin/Fellow) based on civilizational standing."
                                 </p>
                                 <Button 
                                    onClick={handleSetClaims} 
                                    disabled={adminLoading}
                                    className="w-full bg-primary text-primary-foreground font-bold h-10 uppercase text-[9px] gap-2"
                                 >
                                    {adminLoading ? <Loader2 className="size-3 animate-spin" /> : <Fingerprint className="size-3" />}
                                    Sync Imperial Claims
                                 </Button>
                              </div>
                              <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                                 <div className="flex items-center gap-3">
                                    <BellRing className="size-5 text-primary" />
                                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Mesh Broadcast</h4>
                                 </div>
                                 <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                                    "Dispatch high-clearance notification to all 100 nodes in the grid."
                                 </p>
                                 <Button variant="outline" className="w-full border-primary/20 text-primary font-bold h-10 uppercase text-[9px] gap-2">
                                    <MessageSquare className="size-3" /> Dispatch FCM Packet
                                 </Button>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
                  <div className="space-y-8">
                     <Card className="glass-card border-l-4 border-l-amber-500 bg-amber-500/5">
                        <CardHeader>
                           <CardTitle className="text-xs font-headline uppercase text-amber-500 flex items-center gap-2">
                              <ShieldQuestion className="size-4" /> Access Policy
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-[10px] text-muted-foreground leading-relaxed italic">
                           "All administrative actions are recorded in the One Engine Ledger. Custom claims require a 12-node consensus pulse."
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
