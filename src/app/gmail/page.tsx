"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Menu, 
  RefreshCcw, 
  Lock, 
  Infinity, 
  Search,
  ArrowRightLeft,
  Atom,
  Flame,
  PieChart,
  History,
  CheckCircle2,
  Inbox,
  Send,
  Trash2,
  Star,
  FileText,
  ExternalLink,
  ChevronRight,
  Database,
  Smartphone,
  MailSearch,
  Activity
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ImperialMailPage() {
  const { toast } = useToast()
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [inbox, setInbox] = useState<any[]>([
    { id: "1", from: "Google Cloud", subject: "Imperial Node Authorization", time: "10m ago", read: false },
    { id: "2", from: "Sovereign Registry", subject: "New Citizen Verification Request", time: "1h ago", read: true },
    { id: "3", from: "Nora-AI", subject: "Weekly Economic Intel Report Ready", time: "5h ago", read: true }
  ])

  const handleConnectGmail = () => {
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      toast({
        title: "Gmail Handshake Established",
        description: "Imperial node now linked with your Google account.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2000)
  }

  const handleSyncInbox = () => {
    setSyncing(true)
    toast({
      title: "Pulsing Inbox...",
      description: "Fetching latest encrypted dispatches from Google servers.",
    })
    
    setTimeout(() => {
      setSyncing(false)
      toast({
        title: "Inbox Synchronized",
        description: "Zero bit-drift detected in communication channel.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 1500)
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
                 <Badge variant="outline" className="border-red-500/50 text-red-500 uppercase font-bold tracking-widest px-3 h-8 bg-red-500/5">
                   <Mail className="size-3 mr-2" /> Project #58: Imperial Mail
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Lock className="size-3 mr-2" /> OAUTH_L4 Secure
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-red-500">Mail.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Imperial Communication Canal." জিমেইল এখন নূরনেক্সাস সাম্রাজ্যের সাথে সিঙ্ক্রোনাইজড। সকল অফিশিয়াল মেইল এখন এখান থেকেই নিয়ন্ত্রিত হবে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               {!connected ? (
                 <Button 
                  onClick={handleConnectGmail} 
                  disabled={connecting}
                  className="bg-red-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-destructive"
                 >
                   {connecting ? <Loader2 className="size-4 animate-spin" /> : <Inbox className="size-4" />}
                   Connect Gmail Hub
                 </Button>
               ) : (
                 <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Hub Status</p>
                    <div className="flex items-center justify-center gap-2">
                       <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-xl font-headline font-bold text-emerald-500 uppercase">SYNCHRONIZED</p>
                    </div>
                 </div>
               )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: "Unread Dispatches", val: "3", icon: Inbox, color: "text-red-500" },
                   { label: "Canal Latency", val: "94ms", icon: Activity, color: "text-emerald-500" },
                   { label: "Auth Protocol", val: "OAuth 2.0", icon: ShieldCheck, color: "text-amber-500" }
                 ].map((m, i) => (
                   <Card key={i} className="glass-card bg-black/40 border-white/5">
                      <CardContent className="p-6 flex items-center justify-between">
                         <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{m.label}</p>
                            <p className="text-xl font-headline font-bold text-white">{m.val}</p>
                         </div>
                         <m.icon className={`size-8 ${m.color} opacity-20`} />
                      </CardContent>
                   </Card>
                 ))}
              </section>

              <div className="space-y-6">
                 <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                       <MailSearch className="size-4" /> Imperial Inbox
                    </h3>
                    <Button onClick={handleSyncInbox} disabled={!connected || syncing} variant="ghost" size="sm" className="h-8 text-primary hover:bg-primary/10">
                       {syncing ? <Loader2 className="size-3 animate-spin mr-2" /> : <RefreshCcw className="size-3 mr-2" />}
                       Refresh Feed
                    </Button>
                 </div>
                 
                 <Card className="glass-card overflow-hidden">
                    <ScrollArea className="h-[400px]">
                       <div className="divide-y divide-white/5">
                          {!connected ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
                               <Lock className="size-12 text-muted-foreground" />
                               <p className="text-xs font-mono uppercase tracking-widest text-center">Connection to Google Hub Required<br/>Initialize handshake to view messages.</p>
                            </div>
                          ) : inbox.map((mail) => (
                            <div key={mail.id} className="p-4 hover:bg-white/5 transition-all group flex items-center justify-between gap-4">
                               <div className="flex items-center gap-4 min-w-0">
                                  <div className={`size-2 rounded-full ${mail.read ? 'bg-white/10' : 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`} />
                                  <div className="min-w-0">
                                     <p className="text-xs font-bold text-white uppercase truncate">{mail.from}</p>
                                     <p className="text-[11px] text-muted-foreground truncate">{mail.subject}</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-4 shrink-0">
                                  <span className="text-[9px] font-mono text-muted-foreground uppercase">{mail.time}</span>
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-white"><Star className="size-3.5" /></Button>
                                     <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-destructive"><Trash2 className="size-3.5" /></Button>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </ScrollArea>
                 </Card>
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-red-500 bg-red-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-red-500 flex items-center gap-2">
                        <ShieldCheck className="size-4" /> Communications Guard
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your imperial communications are protected by mTLS and OAuth 2.0. Every outbound notification is hashed and logged in the Sovereign Ledger."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-red-500/30 text-red-500 uppercase text-[9px] font-bold">COMM_ENCRYPTED</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <History className="size-4" /> Dispatch History
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Mails Sent</span>
                        <span className="text-white font-bold">142</span>
                     </div>
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Alerts Broadcast</span>
                        <span className="text-emerald-500 font-bold">57</span>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> Integrity Check
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Last handshake verified by <strong>Nora-01</strong>. Session token is active and valid for the next 4 hours.
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
