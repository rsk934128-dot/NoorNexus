"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Store, 
  ShieldCheck, 
  Loader2, 
  Menu, 
  Globe, 
  Search, 
  Plus, 
  Trash2, 
  RefreshCcw,
  ExternalLink,
  Monitor,
  Activity,
  ShoppingBag,
  History,
  Lock,
  Cpu,
  Database,
  Link2,
  CreditCard
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const INITIAL_LINKS = [
  { id: "1", name: "Amazon Global", url: "https://www.amazon.com", category: "General", status: "VERIFIED" },
  { id: "2", name: "Alibaba B2B", url: "https://www.alibaba.com", category: "Wholesale", status: "VERIFIED" },
  { id: "3", name: "Binance Exchange", url: "https://www.binance.com", category: "Crypto", status: "VERIFIED" },
  { id: "4", name: "JamesEdition Jets", url: "https://www.jamesedition.com/jets", category: "Aerospace", status: "VERIFIED" },
  { id: "5", name: "Yapily Console", url: "https://console.yapily.com/", category: "Infrastructure", status: "VERIFIED" },
  { id: "6", name: "RedotPay Business", url: "https://business.redotpay.com/biz/home/", category: "Fintech", status: "VERIFIED" }
]

export default function SovereignBazaarPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [links, setLinks] = useState<any[]>(INITIAL_LINKS)
  const [newLink, setNewLink] = useState({ name: "", url: "", category: "Custom" })
  const [verifyingId, setVerifyingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddLink = () => {
    if (!newLink.name || !newLink.url) return
    const id = Math.random().toString(36).substring(2, 9)
    const formattedUrl = newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`
    setLinks([{ ...newLink, url: formattedUrl, id, status: "PENDING" }, ...links])
    setNewLink({ name: "", url: "", category: "Custom" })
    toast({ title: "Link Anchored to Bazaar", description: "Identity pulse required for verification." })
  }

  const handleVerifyLink = (id: string) => {
    setVerifyingId(id)
    setTimeout(() => {
      setLinks(prev => prev.map(l => l.id === id ? { ...l, status: "VERIFIED" } : l))
      setVerifyingId(null)
      toast({
        title: "Link Veracity Confirmed",
        description: "Nora-01 has authorized this marketplace tunnel.",
        className: "border-emerald-500/50 bg-emerald-500/5"
      })
    }, 2000)
  }

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id))
    toast({ title: "Link Purged", variant: "destructive" })
  }

  const launchInTerminal = (url: string) => {
    router.push(`/browser?url=${encodeURIComponent(url)}`)
  }

  const openDirect = (url: string) => {
    window.open(url, '_blank')
    toast({ title: "Direct Tunnel Established", description: "Opening marketplace in secondary node." })
  }

  const filteredLinks = links.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.url.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                 <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase font-bold tracking-widest px-3 h-8 bg-emerald-500/5">
                   <Store className="size-3 mr-2" /> Project #950: Sovereign Bazaar
                 </Badge>
              </div>
              <h2 className="text-3xl sm:text-5xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                Imperial <span className="text-emerald-500">Bazaar.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-lg leading-relaxed italic">
                "The Unified Marketplace Gateway." বিশ্বের যেকোনো মার্কেটপ্লেস বা বাজারের লিঙ্ক এখন আপনার নূরনেক্সাস সাম্রাজ্যের ভেরিফাইড টানেলে।
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-4 glass-card rounded-2xl border border-emerald-500/20 text-center min-w-[200px]">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Market Links</p>
                  <p className="text-3xl font-headline font-bold text-white">{links.length}</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              
              <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                 <CardHeader>
                    <CardTitle className="text-sm font-headline uppercase tracking-widest text-white flex items-center gap-2">
                       <Plus className="size-4 text-primary" /> Anchor New Marketplace
                    </CardTitle>
                    <CardDescription>Insert external links into the Sovereign tunnel for verification.</CardDescription>
                 </CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                       <Label className="text-[10px] uppercase font-bold text-muted-foreground">Market Name</Label>
                       <Input 
                         placeholder="e.g. Alibaba Hub" 
                         value={newLink.name}
                         onChange={e => setNewLink({...newLink, name: e.target.value})}
                         className="bg-background/50 border-white/10 h-11"
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] uppercase font-bold text-muted-foreground">Market URL</Label>
                       <Input 
                         placeholder="https://..." 
                         value={newLink.url}
                         onChange={e => setNewLink({...newLink, url: e.target.value})}
                         className="bg-background/50 border-white/10 h-11 font-mono text-xs"
                       />
                    </div>
                    <div className="flex items-end">
                       <Button onClick={handleAddLink} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-11 glow-primary">
                          Inject into Bazaar
                       </Button>
                    </div>
                 </CardContent>
              </Card>

              <div className="flex justify-between items-center px-1">
                 <h3 className="text-xs font-headline font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Activity className="size-4" /> Marketplace Link Registry
                 </h3>
                 <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                    <input 
                      placeholder="Search Bazaar..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-[10px] outline-none focus:ring-1 focus:ring-primary"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {filteredLinks.length === 0 && (
                   <p className="col-span-2 text-center py-20 text-xs text-muted-foreground italic uppercase tracking-widest">No links found in the bazaar registry.</p>
                 )}
                 {filteredLinks.map((link) => (
                   <Card key={link.id} className={`glass-card border-white/5 hover:border-emerald-500/20 transition-all group overflow-hidden ${link.status === 'VERIFIED' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-amber-500'}`}>
                      <CardContent className="p-5 flex flex-col gap-4">
                         <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                               <div className={`p-3 rounded-xl ${link.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                  {link.category === 'Fintech' ? <CreditCard className="size-6" /> : <ShoppingBag className="size-6" />}
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{link.category}</p>
                                  <h4 className="text-lg font-headline font-bold text-white uppercase">{link.name}</h4>
                                  <p className="text-[10px] font-mono text-primary/60 truncate max-w-[150px]">{link.url}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <Badge className={`text-[8px] border-none ${link.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-amber-500/20 text-amber-500 animate-pulse'}`}>{link.status}</Badge>
                            </div>
                         </div>
                         
                         <div className="pt-4 mt-2 border-t border-white/5 flex justify-between items-center gap-2">
                            <div className="flex gap-2">
                               <Button variant="ghost" size="icon" onClick={() => handleDeleteLink(link.id)} className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                  <Trash2 className="size-4" />
                               </Button>
                            </div>
                            <div className="flex gap-2">
                               {link.status !== 'VERIFIED' ? (
                                 <Button 
                                  onClick={() => handleVerifyLink(link.id)}
                                  disabled={verifyingId === link.id}
                                  className="h-8 text-[9px] uppercase font-bold bg-amber-500 text-black px-4 glow-emerald"
                                 >
                                    {verifyingId === link.id ? <Loader2 className="size-3 animate-spin mr-2" /> : <ShieldCheck className="size-3 mr-2" />}
                                    Verify Pulse
                                 </Button>
                               ) : (
                                 <div className="flex gap-2">
                                    <Button 
                                      onClick={() => openDirect(link.url)}
                                      className="h-8 text-[9px] uppercase font-bold bg-amber-500 text-white px-4 gap-2"
                                    >
                                       <ExternalLink className="size-3" /> Direct
                                    </Button>
                                    <Button 
                                      onClick={() => launchInTerminal(link.url)}
                                      className="h-8 text-[9px] uppercase font-bold bg-emerald-500 text-white px-4 glow-emerald gap-2"
                                    >
                                       <Monitor className="size-3" /> Terminal
                                    </Button>
                                 </div>
                               )}
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                 ))}
              </div>
            </div>

            <div className="space-y-8">
               <Card className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <CardHeader>
                     <CardTitle className="text-xs font-headline uppercase text-emerald-500 flex items-center gap-2">
                        <Lock className="size-4" /> Bazaar Safety Protocol
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        "কমান্ডার, বাজারের প্রতিটি লিঙ্ক চালুর আগে Nora-01 এআই দ্বারা একটি এনক্রিপ্টেড পালস পাঠানো হয়। কোনো লিঙ্কে ঝুঁকি থাকলে সিস্টেম স্বয়ংক্রিয়ভাবে তা ব্লক করবে।"
                     </p>
                     <div className="pt-2">
                        <Badge variant="outline" className="w-full justify-center h-8 border-emerald-500/30 text-emerald-500 uppercase text-[9px] font-bold">TUNNEL_SECURITY: L4</Badge>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-l-4 border-l-primary bg-primary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                        <History className="size-4" /> Integrity Pulse
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Handshake Status</span>
                        <span className="text-emerald-500 font-bold">SUCCESS</span>
                     </div>
                     <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                        <span className="text-muted-foreground">Encryption Standard</span>
                        <span className="text-white">HMAC_V4</span>
                     </div>
                     <div className="pt-4 flex justify-center">
                        <div className="size-20 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative">
                           <Cpu className="size-10 text-emerald-500 opacity-20" />
                           <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin-slow" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="glass-card border-white/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                        <Database className="size-3" /> System Memory
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Last Bazaar scan: <strong>PASSED</strong>. 0 malicious scripts detected in external tunnels.
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
