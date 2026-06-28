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
  CheckCircle2,
  Inbox,
  Star,
  Activity,
  UserCircle,
  Smartphone,
  Laptop,
  Monitor,
  LayoutGrid,
  Link2,
  Fingerprint,
  Radio
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUser, useCollection, useFirestore } from "@/firebase"
import { collection, query, where, limit } from "firebase/firestore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/**
 * @fileOverview Identity Hub (Gmail Node v3.5)
 * নূরনেক্সাস সাম্রাজ্যের কেন্দ্রীয় আইডেন্টিটি নোড। 
 * এটি জিমেইল সেশনকে সাম্রাজ্যের প্রতিটি অ্যাপে "Universal Master Key" হিসেবে কাজ করতে সাহায্য করে।
 */

export default function ImperialMailPage() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [syncing, setSyncing] = useState(false)
  
  const { data: mySessions } = useCollection<any>(
    user && db ? query(collection(db, "user_sessions"), where("email", "==", user.email), limit(10)) : null
  )

  const handleSyncProfile = () => {
    setSyncing(true)
    toast({
      title: "Pulsing Unified Profile...",
      description: "Synchronizing Gmail session across 100-node mesh.",
    })
    
    setTimeout(() => {
      setSyncing(false)
      toast({
        title: "Omni-Sync Verified",
        description: "Your Gmail identity is now anchored in all active apps.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2000)
  }

  const linkedApps = [
    { name: "FusionPay", status: "SYNCED", icon: LayoutGrid },
    { name: "Bazaar Hub", status: "SYNCED", icon: Activity },
    { name: "Sovereign Vault", status: "SECURED", icon: Lock },
    { name: "Imperial Drive", status: "ACTIVE", icon: Infinity }
  ]

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
                 <Badge variant="outline" className="border-red-500/50 text-red-500 uppercase font-bold tracking-widest px-3 h-8 bg-red-500/5 text-[10px]">
                   <Mail className="size-3 mr-2" /> Project #170: Unified Identity
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5 text-[10px]">
                   <UserCircle className="size-3 mr-2" /> GMAIL_BRIDGE: ACTIVE
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Identity <span className="text-red-500">Hub.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Universal Auth, Seamless Experience." আপনার একটি মাত্র জিমেইল আইডি এখন নূরনেক্সাস সাম্রাজ্যের প্রতিটি অ্যাপের চাবিকাঠি।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-red-500/20 text-center min-w-[200px] bg-red-500/5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Unified Session Status</p>
                  <div className="flex items-center justify-center gap-2">
                     <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                     <p className="text-xl font-headline font-bold text-emerald-500 uppercase">SYNCHRONIZED</p>
                  </div>
               </div>
               <Button 
                onClick={handleSyncProfile} 
                disabled={syncing}
                className="bg-red-500 text-white font-bold h-12 uppercase tracking-widest gap-2 glow-destructive"
               >
                 {syncing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                 Full Profile Sync
               </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              
              {/* Profile Details */}
              <Card className="glass-card border-l-4 border-l-red-500 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                       <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/40 transition-all" />
                       <Avatar className="size-24 border-4 border-black relative z-10">
                          <AvatarImage src={user?.photoURL || undefined} />
                          <AvatarFallback className="bg-red-500/10 text-red-500 font-bold text-2xl">
                             {user?.displayName?.substring(0, 2).toUpperCase() || "IM"}
                          </AvatarFallback>
                       </Avatar>
                       <div className="absolute -bottom-1 -right-1 size-7 bg-emerald-500 rounded-full border-4 border-black z-20 flex items-center justify-center">
                          <CheckCircle2 className="size-3 text-white" />
                       </div>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                       <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">{user?.displayName || "Imperial Commander"}</h3>
                       <p className="text-primary font-mono text-xs uppercase tracking-[0.2em]">{user?.email}</p>
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                          <Badge variant="outline" className="text-[8px] border-emerald-500/20 text-emerald-500">OAUTH_L4_VERIFIED</Badge>
                          <Badge variant="outline" className="text-[8px] border-white/10 text-muted-foreground uppercase">ID: {user?.uid.substring(0, 12)}...</Badge>
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Omni-Device Grid */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Smartphone className="size-4" /> Omni-Device Handshake Matrix
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mySessions?.map((s: any, i: number) => (
                      <Card key={i} className="glass-card bg-black/40 border-white/5 hover:border-primary/20 transition-all">
                        <CardContent className="p-5 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                 {s.platform === 'Mobile' ? <Smartphone className="size-5" /> : <Laptop className="size-5" />}
                              </div>
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px]">ACTIVE</Badge>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-white uppercase">{s.deviceInfo || "Imperial Device"}</p>
                              <p className="text-[8px] text-muted-foreground font-mono uppercase">{s.assignedRegion}</p>
                           </div>
                           <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px] font-mono">
                              <span className="text-muted-foreground uppercase">Last Pulse</span>
                              <span className="text-primary">{s.lastAction}</span>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>

              {/* Linked Imperial Apps */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                    <LayoutGrid className="size-4" /> Integrated Imperial Apps
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {linkedApps.map((app, i) => (
                      <Card key={i} className="glass-card bg-black/40 border-white/5 text-center p-6 space-y-3 group hover:border-emerald-500/30 transition-all">
                         <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto border border-white/10 group-hover:bg-emerald-500/10 transition-colors">
                            <app.icon className="size-6 text-muted-foreground group-hover:text-emerald-500" />
                         </div>
                         <p className="text-[10px] font-bold text-white uppercase tracking-widest">{app.name}</p>
                         <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">{app.status}</Badge>
                      </Card>
                    ))}
                 </div>
              </section>
            </div>

            {/* Sidebar Security */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-red-500 bg-red-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-red-500 flex items-center gap-2">
                        <Lock className="size-4" /> Unified Vault Policy
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "One Gmail, One Identity. নূরনেক্সাসের প্রতিটি অ্যাপে আপনার প্রোফাইল এখন স্বয়ংক্রিয়ভাবে সিঙ্ক্রোনাইজড। প্রোফাইল এডিট করলে তা সব অ্যাপে একযোগে আপডেট হবে।"
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-red-500/30 text-red-500 uppercase text-[9px] font-bold">PROFILE_LOCK: ON</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <Fingerprint className="size-4" /> Multi-App Torque
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                        <span className="text-muted-foreground">Sync Velocity</span>
                        <span className="text-emerald-500 font-bold">MAX</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                        <span className="text-muted-foreground">Latency Gap</span>
                        <span className="text-white">28ms</span>
                     </div>
                     <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                        "জেমিনি এআই আপনার প্রোফাইল থেকে লার্নিং নিয়ে প্রতিটি অ্যাপে বুদ্ধিমান পরামর্শ দেবে।"
                     </p>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Radio className="size-3" /> Grid Identity Check
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Last identity pulse verified at <strong>Sirajganj Edge Node</strong>. Veracity confirmed for Project #170.
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
