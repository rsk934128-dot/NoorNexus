"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ShieldCheck, 
  Menu,
  Activity,
  Landmark,
  Coins,
  Target,
  Waves,
  HeartHandshake,
  Unlock,
  Fingerprint,
  Smartphone,
  Laptop,
  CheckCircle2,
  Compass,
  Settings,
  Share2,
  LockKeyhole,
  History,
  MapPin,
  Languages,
  UserCog,
  Shield,
  FileCode,
  Vault,
  Gem,
  Users,
  Cpu,
  Trophy,
  Star,
  Crown
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useUser, useFirestore, useCollection } from "@/firebase"
import { collection, query, where, limit, orderBy } from "firebase/firestore"
import { SovereignLogo } from "@/components/sovereign-logo"
import { useToast } from "@/hooks/use-toast"

export default function CitizenPortalPage() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [mounted, setMounted] = useState(false)
  const [fallbackDid, setFallbackDid] = useState("")
  const [prefDialogOpen, setPrefDialogOpen] = useState(false)
  
  // User Preference States
  const [prefs, setPrefs] = useState({
    notifications: true,
    biometrics: true,
    language: "bn",
    stealthMode: false,
    familyShield: true
  })

  useEffect(() => {
    setMounted(true)
    setFallbackDid(`did:noornexus:${Math.random().toString(36).substring(2, 20)}`)
  }, [])

  // Fetch real identity data
  const { data: identities } = useCollection<any>(
    user ? query(collection(db, "identities"), where("owner", "==", user.email), limit(1)) : null
  )
  const myIdentity = identities?.[0]

  // Fetch Leaderboard / Top Contributors
  const { data: topContributors } = useCollection<any>(
    db ? query(collection(db, "user_sessions"), orderBy("lastSeen", "desc"), limit(5)) : null
  )

  const handleShareIdentity = async () => {
    if (!mounted) return
    const did = myIdentity?.did || fallbackDid
    const shareData = {
      title: 'NoorNexus Sovereign Identity',
      text: `Verify my Sovereign Identity on NoorNexus. DID: ${did}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({ title: "Identity Shared", description: "Your credentials have been broadcasted via System Mesh." });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(did);
        toast({ title: "DID Copied", description: "Identity hash anchored to your clipboard buffer." });
      } else {
        toast({ title: "Clipboard Unavailable", description: "Please copy the DID manually.", variant: "destructive" });
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleSavePrefs = () => {
    toast({
      title: "Preferences Synchronized",
      description: "Neural profile updated with new parameters.",
      className: "border-emerald-500/50 bg-emerald-500/5"
    })
    setPrefDialogOpen(false)
  }

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
                   <HeartHandshake className="size-3 mr-2" /> RubelNet: Sovereign Citizen Hub
                 </Badge>
                 <Badge variant="outline" className="border-amber-500/50 text-amber-500 uppercase font-bold tracking-widest px-3 h-8 bg-amber-500/5">
                   <Shield className="size-3 mr-2" /> Family Shield: Active
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-emerald-500">Citizen.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Verifiable Digital Identity." আপনার ইম্পেরিয়াল রোল এবং ট্রাস্ট লেজারের মাধ্যমে নূরনেক্সাস সাম্রাজ্যের প্রতিটি সার্ভিস এখন আপনার হাতের মুঠোয়। 
              </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px] bg-emerald-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <ShieldCheck className="size-12 text-emerald-500" />
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Reputation Tier</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500 uppercase tracking-tighter">
                    {myIdentity?.reputationTier || "IMPERIAL"}
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
                         <AvatarImage src={user?.photoURL || undefined} />
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
                            {user?.displayName || "Commander Farid"}
                         </h3>
                         <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Badge variant="secondary" className="bg-primary/10 text-primary font-mono text-[10px] border-primary/20 h-6">
                               <Fingerprint className="size-3 mr-2" /> {user?.email}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 font-mono text-[10px] h-6">
                               <MapPin className="size-3 mr-2" /> Region: {myIdentity?.region || "Global Hub"}
                            </Badge>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                         {[
                           { label: "Trust Score", value: `992/1000`, icon: Target, color: "text-primary" },
                           { label: "Stability", value: "100%", icon: Activity, color: "text-emerald-500" },
                           { label: "Digital Will", value: "Anchored", icon: History, color: "text-amber-500" },
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
                         <Button onClick={handleShareIdentity} className="bg-emerald-500 text-white font-bold uppercase text-[10px] h-10 px-6 glow-emerald gap-2">
                            <Share2 className="size-3" /> Broadcast Identity
                         </Button>
                         
                         <Dialog open={prefDialogOpen} onOpenChange={setPrefDialogOpen}>
                            <DialogTrigger asChild>
                               <Button variant="outline" className="border-white/10 text-white font-bold uppercase text-[10px] h-10 px-6 hover:bg-white/5 gap-2">
                                  <Settings className="size-3" /> Preferences
                               </Button>
                            </DialogTrigger>
                            <DialogContent className="glass-card border-primary/20 bg-black/95 text-white sm:max-w-[425px]">
                               <DialogHeader>
                                  <DialogTitle className="text-xl font-headline font-bold uppercase tracking-tight text-white flex items-center gap-3 text-primary">
                                     <UserCog className="size-6" /> Profile Preferences
                                  </DialogTitle>
                                  <DialogDescription className="text-muted-foreground text-xs uppercase tracking-widest font-mono">
                                     Configure your sovereign experience.
                                  </DialogDescription>
                               </DialogHeader>
                               <div className="grid gap-6 py-6">
                                  <div className="flex items-center justify-between">
                                     <div className="space-y-0.5">
                                        <Label className="text-sm font-bold uppercase">Family Shield Mode</Label>
                                        <p className="text-[10px] text-muted-foreground">Activate cross-device family protection.</p>
                                     </div>
                                     <Switch 
                                        checked={prefs.familyShield} 
                                        onCheckedChange={(v) => setPrefs({...prefs, familyShield: v})} 
                                     />
                                  </div>
                                  <div className="flex items-center justify-between">
                                     <div className="space-y-0.5">
                                        <Label className="text-sm font-bold uppercase">Biometric Auth</Label>
                                        <p className="text-[10px] text-muted-foreground">Enable L4 fingerprint verification.</p>
                                     </div>
                                     <Switch 
                                        checked={prefs.biometrics} 
                                        onCheckedChange={(v) => setPrefs({...prefs, biometrics: v})} 
                                     />
                                  </div>
                                  <div className="space-y-3">
                                     <Label className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                                        <Languages className="size-3" /> Interface Language
                                     </Label>
                                     <div className="grid grid-cols-2 gap-2">
                                        <Button 
                                          variant={prefs.language === 'bn' ? 'default' : 'outline'} 
                                          className="text-[10px] uppercase font-bold h-9"
                                          onClick={() => setPrefs({...prefs, language: 'bn'})}
                                        >
                                           বাংলা (Bengali)
                                        </Button>
                                        <Button 
                                          variant={prefs.language === 'en' ? 'default' : 'outline'} 
                                          className="text-[10px] uppercase font-bold h-9"
                                          onClick={() => setPrefs({...prefs, language: 'en'})}
                                        >
                                           English
                                        </Button>
                                     </div>
                                  </div>
                               </div>
                               <DialogFooter>
                                  <Button onClick={handleSavePrefs} className="w-full bg-primary text-primary-foreground font-bold uppercase h-12 glow-primary">
                                     <Shield className="size-4 mr-2" /> Sync with Vault
                                  </Button>
                               </DialogFooter>
                            </DialogContent>
                         </Dialog>
                      </div>
                   </div>
                </div>
             </Card>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               
               {/* Sovereign Leaderboard */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                     <Trophy className="size-4" /> Sovereign Leaderboard
                  </h3>
                  <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                     <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                           {topContributors?.map((citizen: any, i: number) => (
                             <div key={citizen.id} className="p-4 flex items-center justify-between group hover:bg-emerald-500/10 transition-colors">
                                <div className="flex items-center gap-4">
                                   <div className="size-8 flex items-center justify-center font-headline font-bold text-lg text-emerald-500/50">
                                      {i === 0 ? <Crown className="size-5 text-amber-500" /> : `#${i + 1}`}
                                   </div>
                                   <Avatar className="size-10 border border-emerald-500/20">
                                      <AvatarImage src={citizen.photoURL} />
                                      <AvatarFallback>{citizen.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                   </Avatar>
                                   <div>
                                      <p className="text-sm font-bold text-white uppercase">{citizen.displayName}</p>
                                      <p className="text-[9px] text-muted-foreground font-mono uppercase">{citizen.imperialRole || "MEMBER"}</p>
                                   </div>
                                </div>
                                <div className="text-right">
                                   <div className="flex items-center gap-2">
                                      <Star className="size-3 text-amber-500 fill-amber-500" />
                                      <span className="text-xs font-bold text-white">{1000 - (i * 120)}</span>
                                   </div>
                                   <p className="text-[8px] text-muted-foreground uppercase font-bold">Torque Points</p>
                                </div>
                             </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </section>

               {/* Integrated Family Asset Management */}
               <section className="space-y-6">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                     <Vault className="size-4" /> Integrated Family Assets
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                       { label: "Treasury Balance", value: "$124,500", icon: Coins, color: "text-primary" },
                       { label: "Imperial Gold Bond", value: "1.2 KG", icon: Gem, color: "text-amber-500" },
                       { label: "Legacy Reserved Fund", value: "$42,000", icon: Landmark, color: "text-emerald-500" },
                       { label: "System Maintenance", value: "Verified", icon: Cpu, color: "text-purple-500" }
                     ].map((asset, i) => (
                       <Card key={i} className="glass-card border-white/5 bg-black/40 hover:border-emerald-500/20 transition-all group">
                          <CardContent className="p-5 flex items-center gap-4">
                             <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald-500/10 transition-colors`}>
                                <asset.icon className={`size-5 ${asset.color}`} />
                             </div>
                             <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">{asset.label}</p>
                                <p className="text-lg font-headline font-bold text-white uppercase">{asset.value}</p>
                             </div>
                          </CardContent>
                       </Card>
                     ))}
                  </div>
               </section>
            </div>

            {/* Sidebar Elements */}
            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 overflow-hidden">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <Compass className="size-4" /> Civilizational Standing
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                           <span className="text-muted-foreground">Legacy Torque</span>
                           <span className="text-emerald-500">99.8%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500" style={{ width: '99%' }} />
                        </div>
                     </div>
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Your legacy torque measures the stability of your digital will across the 100-node mesh."
                     </p>
                  </CardContent>
               </Card>

               <Card className="glass-card bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-primary flex items-center gap-2">
                        <Users className="size-3" /> Linked Family Members
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { name: "Family Node 01", status: "SYNCED", icon: Shield },
                       { name: "Family Node 02", status: "SYNCED", icon: Shield }
                     ].map((d, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-white/2 rounded-xl border border-white/5">
                          <div className="flex items-center gap-3">
                             <d.icon className="size-3 text-primary opacity-50" />
                             <span className="text-[10px] text-white font-medium uppercase">{d.name}</span>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[7px]">{d.status}</Badge>
                       </div>
                     ))}
                     <Button variant="ghost" className="w-full h-8 text-[8px] uppercase font-bold text-primary hover:bg-primary/10">
                        Link New Member +
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
