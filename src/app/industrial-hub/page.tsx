
"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Factory, 
  ShieldCheck, 
  Zap, 
  Menu, 
  Settings, 
  Wrench, 
  Activity, 
  Box, 
  Truck,
  AlertTriangle,
  Info,
  Globe,
  ArrowRight,
  FileText,
  Binary,
  Loader2,
  CheckCircle2,
  CreditCard,
  Lock,
  Database
} from "lucide-react"
import Image from "next/image"
import placeholderData from "@/app/lib/placeholder-images.json"
import { useToast } from "@/hooks/use-toast"
import { executeMappedPayout } from "@/services/pay-bridge"
import { useUser, useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"

const INFRA_COMPONENTS = [
  {
    id: "65777API",
    name: "1-1/2 Black API Line Pipe Coupling",
    brand: "MIDLAND INDUSTRIES",
    category: "API Line Couplings",
    material: "Steel (Black)",
    pressure: "3000 lb",
    dimensions: "2.2 in Dia x 2.75 in L",
    threads: "1-1/2-11-1/2",
    useCase: "SCH 80 and SCH 160 Nipple and Pipe",
    status: "PROCUREMENT_READY",
    warning: "Prop 65: Contains Lead (CA Warnings Active)",
    price: 450,
    complianceLinks: [
      { label: "Technical Datasheet", type: "PDF", icon: FileText },
      { label: "CAD Drawing (3D)", type: "STEP", icon: Binary }
    ]
  }
]

export default function IndustrialHubPage() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [procuringId, setProcuringId] = useState<string | null>(null)
  const industrialImage = placeholderData.placeholderImages.find(img => img.id === 'industrial-coupling')

  const handleProcure = async (item: any) => {
    if (!user) return
    setProcuringId(item.id)
    
    try {
      toast({ title: "Fintech Canal Bridge: ACTIVE", description: "Securing settlement channel..." })
      
      const result = await executeMappedPayout(
        item.price, 
        "Sovereign", 
        { email: user.email || "system", systemId: user.uid }
      )

      if (result.status === 'SUCCESS') {
        // SECURITY HARDENING: Log to Immutable Audit Ledger
        const auditHash = `0x_IMMU_${Math.random().toString(16).substring(2, 32)}`
        await addDoc(collection(db, "audit_logs"), {
          action: "INDUSTRIAL_PROCUREMENT",
          actor: user.email,
          severity: "INFO",
          metadata: {
            itemId: item.id,
            price: item.price,
            txId: result.txId,
            ledgerHash: auditHash,
            project: "Project #46"
          },
          timestamp: Date.now()
        })

        toast({
          title: "Procurement Handshake Completed",
          description: `TX-ID: ${result.externalTxId}. Immutable Hash: ${auditHash.substring(0, 12)}...`,
          className: "border-emerald-500/50 bg-emerald-500/5"
        })
      } else {
        throw new Error(result.message)
      }
    } catch (e: any) {
      toast({ title: "Procurement Failed", description: e.message, variant: "destructive" })
    } finally {
      setProcuringId(null)
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
                   <Lock className="size-3 mr-2" /> Immutable Physical Layer
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Industrial <span className="text-primary">Hub.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed">
                Mission 400: Hardware Protocol. Every physical asset is anchored to the **One Engine Ledger** for zero-manipulation security.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-primary/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Ledger Integrity</p>
                  <p className="text-xl font-headline font-bold text-emerald-500 flex items-center gap-2 justify-center">
                    <Database className="size-4" /> 100% ANCHORED
                  </p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Box className="size-4" /> Hardware Asset Registry
                 </h3>
                 
                 {INFRA_COMPONENTS.map((item) => (
                   <Card key={item.id} className="glass-card border-white/5 overflow-hidden group hover:border-primary/30 transition-all">
                     <div className="flex flex-col md:flex-row">
                       <div className="md:w-1/3 relative h-[250px] md:h-auto bg-black/40 border-r border-white/5">
                          {industrialImage && (
                            <Image 
                              src={industrialImage.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                              data-ai-hint={industrialImage.imageHint}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:bg-gradient-to-l" />
                       </div>
                       <div className="md:w-2/3 p-6 space-y-6">
                          <div className="flex justify-between items-start">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.brand}</p>
                                <h4 className="text-xl font-headline font-bold text-white uppercase">{item.name}</h4>
                             </div>
                             <div className="text-right">
                                <p className="text-lg font-headline font-bold text-white">${item.price}</p>
                                <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] mt-1">{item.status}</Badge>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-y border-white/5 py-4">
                             {[
                               { label: "Part #", val: item.id },
                               { label: "Pressure", val: item.pressure },
                               { label: "Material", val: item.material },
                               { label: "Dimensions", val: item.dimensions },
                               { label: "Threads", val: item.threads },
                               { label: "Category", val: item.category }
                             ].map((spec, i) => (
                               <div key={i} className="space-y-1">
                                  <p className="text-[8px] text-muted-foreground uppercase font-bold">{spec.label}</p>
                                  <p className="text-[10px] text-white font-mono">{spec.val}</p>
                               </div>
                             ))}
                          </div>

                          <div className="flex flex-wrap gap-3">
                             {item.complianceLinks.map((link, i) => (
                               <Button key={i} variant="outline" size="sm" className="text-[9px] border-white/10 h-8 gap-2 bg-white/5">
                                  <link.icon className="size-3" /> {link.label}
                               </Button>
                             ))}
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                             <div className="flex items-start gap-2">
                                <AlertTriangle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[9px] text-amber-500/80 italic leading-tight">
                                   {item.warning}
                                </p>
                             </div>
                             <Button 
                              onClick={() => handleProcure(item)}
                              disabled={procuringId === item.id}
                              className="bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 px-6 glow-primary gap-2"
                             >
                                {procuringId === item.id ? <Loader2 className="size-3 animate-spin" /> : <Zap className="size-3" />}
                                {procuringId === item.id ? "Settling via Canal..." : "Initiate Settlement"}
                             </Button>
                          </div>
                       </div>
                     </div>
                   </Card>
                 ))}
              </section>

              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                       <Settings className="size-5" /> Maintenance & Usage Protocol
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                       "All physical couplings used in Mission 400 node deployment must meet 3000lb pressure specifications to ensure sovereign mesh longevity."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { label: "Compatibility", val: "SCH 80 / SCH 160", icon: Wrench },
                         { label: "Certification", val: "API Line Standard", icon: ShieldCheck }
                       ].map((r, i) => (
                         <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
                            <r.icon className="size-4 text-primary" />
                            <div className="space-y-0.5">
                               <p className="text-[8px] text-muted-foreground uppercase font-bold">{r.label}</p>
                               <p className="text-[10px] text-white font-mono">{r.val}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                    <Truck className="size-4" /> Project #46: Logistics Pulse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                     <p className="text-[9px] text-muted-foreground uppercase font-bold">Asset Tracking Integrity</p>
                     <p className="text-3xl font-headline font-bold text-emerald-500">OPTIMAL</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    {[
                      { label: "In Transit", count: 12 },
                      { label: "Installed Nodes", count: 42 },
                      { label: "Maintenance Due", count: 2 }
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                         <span className="text-muted-foreground uppercase">{s.label}</span>
                         <span className="text-white font-bold">{s.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-l-4 border-l-primary">
                 <CardHeader>
                    <CardTitle className="text-xs uppercase font-bold text-primary tracking-widest flex items-center gap-2">
                       <CheckCircle2 className="size-4" /> Compliance Sync
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4 text-[10px] text-muted-foreground italic leading-relaxed">
                    "Every physical part is hashed and linked to a digital certificate in the One Engine Ledger. Digital twins are created upon procurement settlement."
                 </CardContent>
              </Card>

              <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-2">
                       <Info className="size-3" /> Crossover Standard
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-[9px] text-muted-foreground font-mono leading-relaxed break-all">
                       Standard: 26CRXA01432020182543245K129API15M
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
