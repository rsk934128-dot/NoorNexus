"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Send, 
  Settings,
  Trophy,
  Radar,
  LogOut,
  LogIn,
  X,
  Globe,
  Building2,
  Star,
  Zap,
  FileOutput,
  CandlestickChart,
  UserCircle,
  BrainCircuit,
  Rocket,
  Truck,
  Infinity,
  Merge,
  CreditCard,
  Key,
  FileCheck,
  Network,
  Lock,
  FileText,
  ArrowDownToLine,
  Database,
  UserPlus,
  Users,
  Link as LinkIcon,
  Fingerprint,
  Gavel,
  Landmark,
  Scale,
  Compass,
  ShieldPlus,
  Shield,
  ShoppingBag,
  Maximize2,
  HardDrive,
  Mail,
  DollarSign,
  PieChart,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  Coins,
  ShoppingCart,
  Monitor,
  Store
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth, useUser } from "@/firebase"
import { signOutUser } from "@/firebase/auth/auth-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { SovereignLogo } from "@/components/sovereign-logo"

const ADMIN_EMAIL = "rubels1k994@gmail.com"

const USER_ITEMS = [
  { title: "Command Center", url: "/", icon: LayoutDashboard },
  { title: "Sovereign Bazaar", url: "/bazaar", icon: Store, highlight: true },
  { title: "Imperial Browser", url: "/browser", icon: Monitor, highlight: true },
  { title: "Citizen Portal", url: "/citizen-portal", icon: UserCircle, badge: true },
  { title: "Zenith Markets", url: "/zenith-markets", icon: ShoppingCart, highlight: true },
  { title: "Imperial Proposal", url: "/proposal", icon: FileText, highlight: true },
  { title: "Imperial Mail", url: "/gmail", icon: Mail, highlight: true },
  { title: "Discovery Hub", url: "/api-hub", icon: Compass, zenith: true },
  { title: "Imperial Drive", url: "/drive", icon: HardDrive, zenith: true },
  { title: "Sovereign Off-Ramp", url: "/off-ramp", icon: ArrowDownToLine, highlight: true },
  { title: "Sovereign Data Lake", url: "/data-lake", icon: Database, zenith: true },
  { title: "Sovereign Gateway (P51)", url: "/sovereign-gateway", icon: Rocket, zenith: true },
  { title: "Enterprise Settings", url: "/enterprise-settings", icon: Settings, highlight: true },
  { title: "Sovereign Vault (P55)", url: "/sovereign-vault", icon: Lock, zenith: true },
  { title: "Certificate Vault", url: "/certificates", icon: Key },
  { title: "AMEX Token Hub", url: "/amex-tokens", icon: Key },
  { title: "AMEX Virtual Cards", url: "/amex-on-demand", icon: CreditCard },
  { title: "Open Banking Hub", url: "/open-banking", icon: Landmark },
  { title: "Industrial Hub", url: "/industrial-hub", icon: Building2 },
  { title: "Asset Tracking (P46)", url: "/logistics", icon: Truck },
  { title: "Partnership Kit", url: "/docs", icon: Building2 },
  { title: "Imperial Portfolio", url: "/portfolio", icon: Star },
  { title: "Imperial Flow Pay", url: "/flow-pay", icon: Zap },
  { title: "Fintech Fusion", url: "/fintech-fusion", icon: Merge },
  { title: "Imperial Exchange", url: "/exchange-hub", icon: CandlestickChart },
  { title: "GSMIFY Web3", url: "/gsmify-web3", icon: ShieldPlus },
  { title: "Imperial Export Hub", url: "/export-hub", icon: FileOutput },
  { title: "Shurukkha Imperial", url: "/shurukkha-imperial", icon: Shield },
  { title: "Shurukkha Standard", url: "/shurukkha-standard", icon: Shield },
  { title: "Imperial Store", url: "/rubel-store", icon: ShoppingBag },
  { title: "Identity Hub", url: "/identity", icon: Fingerprint },
  { title: "Imperial Senate", url: "/governance", icon: Gavel },
  { title: "Trade Protocol", url: "/settlement", icon: Landmark },
  { title: "Pilot Onboarding", url: "/onboarding", icon: UserPlus },
  { title: "Cross-Chain Gateway", url: "/cross-chain", icon: LinkIcon },
  { title: "SmartRemit P2P", url: "/remittance", icon: Send },
  { title: "Merchant P2C Hub", url: "/p2c", icon: Building2 },
  { title: "World Cup Relay", url: "/world-cup", icon: Trophy },
  { title: "Famelack Hub", url: "/famelack", icon: Globe },
]

const ADMIN_ITEMS = [
  { title: "Strategic Roadmap", url: "/strategy", icon: Lightbulb },
  { title: "Sovereign Legacy", url: "/legacy", icon: Infinity },
  { title: "Imperial Oracle", url: "/oracle", icon: Compass },
  { title: "Revenue Matrix", url: "/revenue", icon: DollarSign },
  { title: "Neural Audit (P52)", url: "/neural-audit", icon: FileCheck },
  { title: "AI Governance", url: "/ai-governance", icon: BrainCircuit },
  { title: "Session Monitor", url: "/sessions", icon: Activity },
  { title: "Adoption Audit", url: "/assessment", icon: Building2 },
  { title: "Pilot Lifecycle", url: "/merchants", icon: Users },
  { title: "Arbitration Chamber", url: "/arbitration", icon: Scale },
  { title: "Border Monitor", url: "/border-monitor", icon: Radar },
  { title: "Compliance Agent", url: "/compliance", icon: ShieldCheck },
  { title: "Sovereign Treasury", url: "/treasury", icon: Landmark },
  { title: "One Engine Ledger", url: "/ledger", icon: Layers },
  { title: "Node Watchtower", url: "/nodes", icon: Activity },
  { title: "Imperial Parameters", url: "/ecosystem", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()
  const { user } = useUser()
  const { toast } = useToast()
  const { setOpenMobile, isMobile, state } = useSidebar()
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const scrollInterval = React.useRef<NodeJS.Timeout | null>(null)

  const isAdmin = user?.email === ADMIN_EMAIL

  React.useEffect(() => {
    const savedScrollPos = sessionStorage.getItem("sidebar-scroll-position")
    if (savedScrollPos && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(savedScrollPos)
    }
  }, [pathname])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    sessionStorage.setItem("sidebar-scroll-position", e.currentTarget.scrollTop.toString())
  }

  const startScroll = (direction: 'up' | 'down') => {
    if (scrollInterval.current) clearInterval(scrollInterval.current)
    scrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += direction === 'up' ? -15 : 15
      }
    }, 20)
  }

  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current)
      scrollInterval.current = null
    }
  }

  const handleLogout = async () => {
    try {
      await signOutUser(auth)
      toast({ title: "Session Terminated", description: "Imperial handshake closed." })
      router.push("/login")
    } catch (error) {
      toast({ title: "Error", description: "Failed to sign out.", variant: "destructive" })
    }
  }

  const toggleFullscreen = () => {
    if (typeof document !== 'undefined') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => toast({ title: "Fullscreen Error", description: e.message, variant: "destructive" }))
        setIsFullscreen(true)
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
          setIsFullscreen(false)
        }
      }
    }
  }

  return (
    <Sidebar className="border-r border-white/5 bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-4 flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <SovereignLogo size={36} className="shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg font-headline font-bold text-primary tracking-tight truncate">NoorNexus</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Imperial OS v3</p>
          </div>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setOpenMobile(false)} className="md:hidden text-muted-foreground">
            <X className="size-5" />
          </Button>
        )}
      </SidebarHeader>
      
      <SidebarSeparator />
      
      <div className="relative flex flex-col flex-1 overflow-hidden min-h-0 group">
        <div 
          onMouseEnter={() => startScroll('up')} 
          onMouseLeave={stopScroll}
          className="absolute top-0 left-0 right-0 h-10 z-50 bg-gradient-to-b from-sidebar to-transparent opacity-0 group-hover:opacity-100 transition-opacity cursor-ns-resize flex items-center justify-center pointer-events-auto"
        >
          <div className="bg-primary/20 backdrop-blur-md rounded-full p-1 border border-primary/20">
             <ChevronUp className="size-4 text-primary animate-bounce" />
          </div>
        </div>

        <SidebarContent ref={scrollRef} onScroll={handleScroll} className="scrollbar-hide">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground px-4 mb-2">Mesh Services</SidebarGroupLabel>
            <SidebarMenu className="px-2">
              {USER_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} className={`h-11 relative ${item.zenith ? 'hover:bg-purple-500/10' : item.highlight ? 'hover:bg-emerald-500/10' : ''}`}>
                    <Link href={item.url} onClick={() => isMobile && setOpenMobile(false)}>
                      <item.icon className={`size-5 ${item.zenith ? 'text-purple-500' : item.highlight ? 'text-emerald-500' : (item.title === 'Imperial Mail' ? 'text-red-500' : '')}`} />
                      <span className={`font-medium text-sm ${item.zenith ? 'text-purple-400 font-bold' : item.highlight ? 'text-emerald-400 font-bold' : (item.title === 'Imperial Mail' ? 'text-red-400 font-bold' : '')}`}>{item.title}</span>
                      {item.badge && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {isAdmin && (
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary px-4 mb-2 flex items-center gap-2">
                <ShieldCheck className="size-3" /> Sovereign Commands
              </SidebarGroupLabel>
              <SidebarMenu className="px-2">
                {ADMIN_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} className="h-11 hover:bg-primary/10">
                      <Link href={item.url} onClick={() => isMobile && setOpenMobile(false)}>
                        <item.icon className={`size-5 ${item.title === 'Sovereign Legacy' ? 'text-primary' : item.title === 'Imperial Oracle' ? 'text-emerald-500' : item.title === 'Neural Audit (P52)' ? 'text-emerald-400' : item.title === 'Adoption Audit' ? 'text-amber-500' : 'text-primary'}`} />
                        <span className={`font-medium text-sm ${item.title === 'Sovereign Legacy' ? 'text-primary font-bold' : item.title === 'Imperial Oracle' ? 'text-emerald-500 font-bold' : item.title === 'Neural Audit (P52)' ? 'text-emerald-400 font-bold' : item.title === 'Adoption Audit' ? 'text-amber-500 font-bold' : ''}`}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )}
        </SidebarContent>

        <div 
          onMouseEnter={() => startScroll('down')} 
          onMouseLeave={stopScroll}
          className="absolute bottom-0 left-0 right-0 h-10 z-50 bg-gradient-to-t from-sidebar to-transparent opacity-0 group-hover:opacity-100 transition-opacity cursor-ns-resize flex items-center justify-center pointer-events-auto"
        >
          <div className="bg-primary/20 backdrop-blur-md rounded-full p-1 border border-primary/20">
             <ChevronDown className="size-4 text-primary animate-bounce" />
          </div>
        </div>
      </div>

      <SidebarSeparator />

      <SidebarFooter className="p-4 space-y-4 shrink-0">
        <button onClick={toggleFullscreen} className="w-full py-2.5 bg-primary/5 rounded border border-primary/20 text-[9px] uppercase font-bold text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group">
          <Maximize2 className="size-3" /> {isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
        </button>

        {user ? (
          <div className={`p-3 rounded-xl border space-y-3 transition-all ${isAdmin ? 'bg-primary/10 border-primary/40' : 'bg-primary/5 border-primary/20'}`}>
            <div className="flex items-center gap-3">
              <Avatar className={`size-8 border ${isAdmin ? 'border-primary' : 'border-primary/30'}`}>
                <AvatarImage src={user.photoURL || ""} />
                <AvatarFallback>{user.displayName?.substring(0, 2).toUpperCase() || "C"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] font-bold truncate uppercase ${isAdmin ? 'text-primary' : ''}`}>
                  {isAdmin ? "Imperial Admin" : (user.displayName || "Commander")}
                </p>
                <div className="flex items-center gap-1">
                   <div className={`size-1 rounded-full animate-pulse ${isAdmin ? 'bg-primary' : 'bg-emerald-500'}`} />
                   <p className="text-[8px] text-muted-foreground uppercase font-mono">{isAdmin ? "ZENITH_ROOT_L4" : "Active Session"}</p>
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full py-2 bg-white/5 rounded border border-white/5 text-[9px] uppercase font-bold text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all flex items-center justify-center gap-2">
              <LogOut className="size-3" /> Terminate
            </button>
          </div>
        ) : (
          <SidebarMenuButton asChild className="bg-primary text-primary-foreground h-11">
            <Link href="/login">
              <LogIn className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Identify</span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
