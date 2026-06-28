"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Send, 
  History, 
  Wallet, 
  ArrowRightLeft, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Globe, 
  TrendingUp, 
  Menu,
  Coins,
  ArrowRight,
  CheckCircle2,
  Lock,
  Loader2,
  RefreshCcw,
  Smartphone,
  Landmark,
  ShieldPlus,
  Rocket,
  ArrowUpRight,
  Flame,
  LayoutGrid,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  Database
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { authorizeRemittance, RemittanceComplianceOutput } from "@/ai/flows/remittance-compliance-flow"
import { useUser, useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const EXCHANGE_RATE = 27.41 // 1 MYR = 27.41 BDT

const TUNNEL_STEPS = [
  { id: 1, title: "Initiator in Malaysia", desc: "MYR deposited via digital portal or local agent node.", icon: Smartphone },
  { id: 2, title: "KL Hub Compliance", desc: "Verifying sender credentials under BNM guidelines.", icon: ShieldCheck },
  { id: 3, title: "GhostRecap Security Pipe", desc: "Zero-knowledge proof validation encrypts payload.", icon: Lock },
  { id: 4, title: "Dhaka Clearing Tunnel", desc: "Verifying secure payload with BB settlement codes.", icon: Landmark },
  { id: 5, title: "64-District Agent Node", desc: "Funds credited to mobile wallet or local partner.", icon: CheckCircle2 }
]

export default function RemittancePage() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  const [myrAmount, setMyrAmount] = useState(1000)
  const [result, setResult] = useState<RemittanceComplianceOutput | null>(null)
  
  const bdtAmount = (myrAmount * EXCHANGE_RATE).toFixed(2)

  const handleTransfer = async () => {
    if (!user) return
    setLoading(true)
    setResult(null)
    
    try {
      toast({ title: "Opening Secure Tunnel", description: "Initiating BNM & BB handshake..." })
      
      const res = await authorizeRemittance({
        amountMYR: myrAmount,
        exchangeRate: EXCHANGE_RATE,
        senderId: "SOV_MY_PASSPORT_01",
        beneficiaryName: "Sheikh Farid (Legacy Node)"
      })
      
      setResult(res)
      
      await addDoc(collection(db, "remittance_ledger"), {
        ...res,
        sender: user.email,
        amountMYR: myrAmount,
        rate: EXCHANGE_RATE,
        timestamp: serverTimestamp(),
        corridor: "MY_BD"
      })

      toast({ 
        title: "Tunnel Transfer Synchronized", 
        description: "Zero-knowledge encryption verified by GhostRecap.",
        className: "border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      })
    } catch (e: any) {
      toast({ title: "Tunnel Drift Detected", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
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
                   <ArrowRightLeft className="size-3 mr-2" /> RubelBank: MY-BD Corridor
                 </Badge>
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <ShieldCheck className="size-3 mr-2" /> BNM & BB Compliant
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Remittance <span className="text-primary">Tunnel.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "Safe, Legal, and Instant." ব্যাংক নেগারা মালয়েশিয়া এবং বাংলাদেশ ব্যাংকের নির্দেশিকা অনুযায়ী আপনার কষ্টার্জিত টাকা সরাসরি আপন ঠিকানায়।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px] bg-emerald-500/5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Live Interbank Rate</p>
                  <p className="text-2xl font-headline font-bold text-emerald-500">1 MYR = {EXCHANGE_RATE} BDT</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              {/* Remittance Calculator */}
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                    <Zap className="size-4 text-primary" /> Secure Remittance Calculator
                  </CardTitle>
                  <CardDescription>Guaranteed rates with zero hidden charges.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">You Send (MYR)</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={myrAmount}
                          onChange={e => setMyrAmount(parseFloat(e.target.value) || 0)}
                          className="bg-background/50 border-white/10 h-16 text-3xl font-headline font-bold pl-12"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">MYR</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">Recipient Receives (BDT)</Label>
                      <div className="relative">
                        <Input 
                          readOnly 
                          value={bdtAmount}
                          className="bg-black/40 border-emerald-500/20 h-16 text-3xl font-headline font-bold pl-12 text-emerald-500"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-emerald-500">BDT</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-black/40 rounded-2xl border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                       { label: "Transaction Fee", val: "4.00 MYR", color: "text-white" },
                       { label: "Exchange Rate", val: `1 MYR = ${EXCHANGE_RATE} ৳`, color: "text-primary" },
                       { label: "Payment Speed", val: "Instant (2 Min)", color: "text-emerald-500" },
                       { label: "Total Payable", val: `${(myrAmount + 4).toFixed(2)} MYR`, color: "text-white" }
                     ].map((item, i) => (
                       <div key={i} className="space-y-1">
                          <p className="text-[8px] font-bold text-muted-foreground uppercase">{item.label}</p>
                          <p className={`text-[10px] font-bold ${item.color}`}>{item.val}</p>
                       </div>
                     ))}
                  </div>

                  <Button 
                    onClick={handleTransfer}
                    disabled={loading || myrAmount <= 0}
                    className="w-full bg-primary text-primary-foreground font-bold h-16 uppercase tracking-widest text-lg glow-primary gap-3"
                  >
                    {loading ? <Loader2 className="size-5 animate-spin" /> : <ShieldCheck className="size-6" />}
                    Start Secure Tunnel Transfer
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground italic">⚡ বিনিময় হার ৩০ মিনিটের জন্য গ্যারান্টিড</p>
                </CardContent>
              </Card>

              {/* Tunnel Map Visualization */}
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <TrendingUp className="size-4" /> Interactive Remittance Tunnel Map
                 </h3>
                 <Card className="glass-card bg-black/40 border-white/5 overflow-hidden">
                    <CardContent className="p-8">
                       <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 hidden md:block" />
                          {TUNNEL_STEPS.map((step) => (
                            <div key={step.id} className="relative z-10 flex flex-col items-center text-center space-y-3 group max-w-[140px]">
                               <div className="size-12 rounded-full bg-black border-2 border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,150,255,0.6)] transition-all">
                                  <step.icon className="size-5 text-primary" />
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[9px] font-bold text-white uppercase">{step.title}</p>
                                  <p className="text-[8px] text-muted-foreground leading-relaxed italic">"{step.desc}"</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>
              </section>

              {/* AI Verification Results */}
              {result && (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                  <Card className="glass-card border-t-4 border-t-emerald-500 bg-emerald-500/5">
                    <CardHeader>
                       <CardTitle className="text-sm font-headline uppercase text-emerald-500 flex items-center gap-2">
                          <HeartHandshake className="size-4" /> GhostRecap Security Dispatch
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div className="p-4 bg-black/60 rounded-xl border border-white/5 space-y-2">
                                <p className="text-[8px] font-bold text-muted-foreground uppercase">Compliance Status</p>
                                <Badge className="bg-emerald-500">{result.status}</Badge>
                                <p className="text-[10px] text-emerald-100 italic leading-relaxed mt-2">"{result.complianceReport}"</p>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <div className="space-y-2">
                                <p className="text-[8px] font-bold text-muted-foreground uppercase">GhostRecap ZKP Hash</p>
                                <code className="text-[9px] text-primary font-mono block bg-black/60 p-3 rounded-lg border border-white/5 break-all">
                                   {result.ghostRecapHash}
                                </code>
                             </div>
                             <div className="space-y-2">
                                <p className="text-[8px] font-bold text-muted-foreground uppercase">Sovereign Seal</p>
                                <code className="text-[9px] text-white font-mono block truncate">{result.sovereignSeal}</code>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <Lock className="size-4" /> Global White-Channel
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "Compliant with BNM & BB. 100% legal white-channel remittance for global migrants."
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold tracking-widest">BNM_REG_#4421</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <MapPin className="size-4" /> 64-District Agent Node
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                        "Instant mobile & agent delivery across all 64 districts of Bangladesh."
                     </p>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-black/40 rounded border border-white/5 text-center">
                           <p className="text-[8px] text-muted-foreground uppercase">Active Nodes</p>
                           <p className="text-xs font-bold text-white">4,200+</p>
                        </div>
                        <div className="p-2 bg-black/40 rounded border border-white/5 text-center">
                           <p className="text-[8px] text-muted-foreground uppercase">Status</p>
                           <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">SYNCED</Badge>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Database className="size-16 text-white" />
                  </div>
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <History className="size-3" /> Recent Pulses
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {[
                       { dest: "Nagad: +88017", amount: "27,300 ৳", status: "SETTLED" },
                       { dest: "Bkash: +88018", amount: "13,595 ৳", status: "VERIFIED" }
                     ].map((log, i) => (
                       <div key={i} className="p-2 bg-white/2 rounded border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-bold text-white truncate w-24">{log.dest}</p>
                             <p className="text-[7px] text-muted-foreground uppercase">{log.status}</p>
                          </div>
                          <span className="text-[10px] font-headline font-bold text-primary">{log.amount}</span>
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
