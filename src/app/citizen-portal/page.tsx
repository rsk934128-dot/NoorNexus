"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  HeartPulse, 
  Zap, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Star,
  Award,
  Menu,
  Activity,
  Cpu,
  Landmark,
  Scale,
  ShieldAlert,
  Coins,
  ShieldPlus,
  Target,
  Waves,
  HeartHandshake,
  Unlock,
  Eye,
  Database,
  Fingerprint,
  Smartphone,
  Laptop,
  CheckCircle2,
  Lock,
  Compass,
  ArrowRightLeft,
  Settings,
  Share2
} from "lucide-react"
import { useUser, useFirestore, useCollection } from "@/firebase"
import { collection, query, where, limit } from "firebase/firestore"
import { SovereignLogo } from "@/components/sovereign-logo"

export default function CitizenPortalPage() {
  const { user } = useUser()
  const db = useFirestore()
  
  // Fetch real identity data
  const { data: identities } = useCollection<any>(
    user ? query(collection(db, "identities"), where("owner", "==", user.email), limit(1)) : null
  )
  const myIdentity = identities?.[0]

  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full pb-20 overflow-x-hidden">
          {/* Top Navigation & Stats */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <SidebarTrigger className="md:hidden text-primary -ml-2">
                    <Button variant="ghost" size="icon"><Menu className="size-6" /></Button>
                 </SidebarTrigger>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <HeartHandshake className="size-3 mr-2" /> Phase Ψ: The Civilization Contract
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-emerald-500">Citizen.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Welcome, Commander." আপনার প্রোফাইল এখন নূরনেক্সাস সাম্রাজ্যের কেন্দ্রীয় ডেটা-লেকে সংরক্ষিত এবং সুরক্ষিত।
              </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px] bg-emerald-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <ShieldCheck className="size-12 text-emerald-500" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Reputation Tier</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">
                    {myIdentity?.reputationTier || "NOVICE"}
                  </p>
               </div>
            </div>
          </header>

          {/* User Identity Hero */}
          <section className="relative">
             <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-3xl -z-10" />
             <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden p-8 sm:p-12 relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <SovereignLogo size={300} />
                </div>
                
                <div className="flex flex-col lg:flex-row items-center gap-10">
                   <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-emerald-500 rounded-full opacity-50 blur-lg group-hover:opacity-100 transition-opacity duration-500" />
                      <Avatar className="size-32 sm:size-48 border-4 border-black relative z-10">
                         <AvatarImage src={user?.photoURL || ""} />
                         <AvatarFallback className="bg-muted text-4xl font-bold">
                            {user?.displayName?.substring(0, 2).toUpperCase() || "C"}
                         </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-2 right-2 size-8 bg-emerald-500 rounded-full border-4 border-black z-20 flex items-center justify-center shadow-lg">
                         <ShieldCheck className="size-4 text-white" />
                      </div>
                   </div>

                   <div className="text-center lg:text-left space-y-6 flex-1">
                      <div className="space-y-2">
                         <h3 className="text-4xl sm:text-6xl font-headline font-black text-white uppercase tracking-tighter">
                            {user?.displayName || "Unknown Commander"}
                         </h3>
                         <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Badge variant="secondary" className="bg-primary/10 text-primary font-mono text-[10px] border-primary/20 h-6">
                               <Fingerprint className="size-3 mr-2" /> {user?.email}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 font-mono text-[10px] h-6">
                               <MapPin className="size-3 mr-2" /> Region: {myIdentity?.region || "Global Mesh"}
                            </Badge>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                         {[
                           { label: "Trust Score", value: `${myIdentity?.calculatedReputationScore || 300}/1000`, icon: Target, color: "text-primary" },
                           { label: "Stability", value: "99.9%", icon: Activity, color: "text-emerald-500" },
                           { label: "Legacy Age", value: "Cycle 42", icon: History, color: "text-amber-500" },
                           { label: "Consensus", value: "Verified", icon: CheckCircle2, color: "text-purple-500" }
                         ].map((stat, i) => (
                           <div key={i} className="p-3 bg-white/5 rounded-2xl border border-white/5 text-center sm:text-left space-y-1">
                              <stat.icon className={`size-4 ${stat.color} mb-1 mx-auto sm:mx-0`} />
                              <p className="text-[8px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                              <p className="text-sm font-headline font-bold text-white uppercase">{stat.value}</p>
                           </div>
                         ))}
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                         <Button className="bg-emerald-500 text-white font-bold uppercase text-[10px] h-10 px-6 glow-emerald gap-2">
                            <Share2 className="size-3" /> Share Identity
                         </Button>
                         <Button variant="outline" className="border-white/10 text-white font-bold uppercase text-[10px] h-10 px-6 hover:bg-white/5 gap-2">
                            <Settings className="size-3" /> Preferences
                         </Button>
                      </div>
                   </div>
                </div>
             </Card>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               {/* Sovereign Passport Visual */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                     <LockKeyhole className="size-4" /> Sovereign Digital Passport
                  </h3>
                  <Card className="glass-card border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Waves className="size-48 text-emerald-500" />
                     </div>
                     <CardContent className="p-8 space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between gap-8">
                           <div className="space-y-6 flex-1">
                              <div className="space-y-2">
                                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Decentralized Identity (DID)</p>
                                 <code className="text-xs font-mono text-white block bg-black/40 p-4 rounded-xl border border-white/10 break-all">
                                    {myIdentity?.did || `did:noornexus:${Math.random().toString(36).substring(2, 20)}`}
                                 </code>
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                 <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Issuance Date</p>
                                    <p className="text-sm font-headline font-bold text-white">2026-06-27</p>
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Expiry Protocol</p>
                                    <p className="text-sm font-headline font-bold text-white">PERPETUAL</p>
                                 </div>
                              </div>
                           </div>
                           <div className="w-full sm:w-32 h-32 bg-white rounded-xl flex items-center justify-center p-2">
                              {/* QR Code Placeholder */}
                              <div className="size-full border-2 border-dashed border-black/20 flex items-center justify-center">
                                 <Database className="size-12 text-black/20" />
                              </div>
                           </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                           <div className="flex items-center gap-3">
                              <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-[8px] h-6">SCA_COMPLIANT</Badge>
                              <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-[8px] h-6">KYC_VERIFIED</Badge>
                              <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-[8px] h-6">L4_CLEARANCE</Badge>
                           </div>
                           <div className="text-[9px] font-mono text-muted-foreground italic">
                              "Signature: {myIdentity?.attestationSignature?.substring(0, 16) || "HMAC_V4_Ω_SIGNED"}..."
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </section>

               {/* Activity & History */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                     <Activity className="size-4" /> Civilizational Footprint
                  </h3>
                  <div className="space-y-3">
                     {[
                       { action: "Governance Proposal #42 Voted", impact: "+5 Trust", time: "2h ago", icon: Scale },
                       { action: "Sovereign Vault Data Anchored", impact: "Secured", time: "1d ago", icon: Database },
                       { action: "Identity Handshake Verified", impact: "Synced", time: "3d ago", icon: Fingerprint },
                       { action: "Imperial Senate Membership", impact: "Elite", time: "1w ago", icon: Award }
                     ].map((log, i) => (
                       <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <log.icon className="size-4" />
                             </div>
                             <div className="space-y-0.5">
                                <p className="text-xs font-bold text-white uppercase">{log.action}</p>
                                <p className="text-[8px] text-muted-foreground uppercase font-mono">{log.time}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-xs font-bold text-emerald-500">{log.impact}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </section>
            </div>

            {/* Sidebar Elements */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-primary bg-primary/5 overflow-hidden">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-primary flex items-center gap-2">
                        <Compass className="size-4" /> Imperial Standing
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                           <span className="text-muted-foreground">Influence Torque</span>
                           <span className="text-primary">84%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: '84%' }} />
                        </div>
                     </div>
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your torque levels increase with every successful cross-border veracity handshake."
                     </p>
                  </CardContent>
               </Card>

               <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                        <ShieldAlert className="size-3" /> Security Advisories
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[9px] text-white font-bold uppercase">MFA Pulse Required</p>
                        <p className="text-[8px] text-muted-foreground">Authorize session v3.5 to maintain full L4 access.</p>
                     </div>
                     <Button variant="outline" className="w-full h-8 text-[8px] uppercase font-bold border-amber-500/20 text-amber-500">
                        Trigger Security Pulse
                     </Button>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground">Device Mesh</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { device: "MacBook Pro M3", status: "ONLINE", icon: Laptop },
                       { device: "iPhone 15 Pro", status: "SYNCED", icon: Smartphone }
                     ].map((d, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-white/2 rounded-xl border border-white/5">
                          <div className="flex items-center gap-3">
                             <d.icon className="size-3 text-primary opacity-50" />
                             <span className="text-[10px] text-white font-medium uppercase">{d.device}</span>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">{d.status}</Badge>
                       </div>
                     ))}
                  </CardContent>
               </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}

function MapPin(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
