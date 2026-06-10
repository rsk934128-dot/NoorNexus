
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
  ChevronRight,
  LogOut,
  LogIn,
  X,
  Globe,
  Crown,
  Building2,
  Code2,
  BookOpen,
  TrendingUp,
  Maximize2,
  Minimize2,
  Wallet,
  UserPlus,
  Users,
  Link as LinkIcon,
  Fingerprint,
  Gavel,
  Landmark
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
  useSidebar
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth, useUser } from "@/firebase"
import { signOutUser } from "@/firebase/auth/auth-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { SovereignLogo } from "@/components/sovereign-logo"
import { Badge } from "@/components/ui/badge"

const items = [
  { title: "Command Center", url: "/", icon: LayoutDashboard },
  { title: "Identity Hub", url: "/identity", icon: Fingerprint },
  { title: "Imperial Senate", url: "/governance", icon: Gavel },
  { title: "Trade Protocol", url: "/settlement", icon: Landmark },
  { title: "Merchant Onboarding", url: "/onboarding", icon: UserPlus },
  { title: "Merchant Lifecycle", url: "/merchants", icon: Users },
  { title: "Cross-Chain Gateway", url: "/cross-chain", icon: LinkIcon },
  { title: "Border Monitor", url: "/border-monitor", icon: Radar },
  { title: "Compliance Agent", url: "/compliance", icon: ShieldCheck },
  { title: "Sovereign Treasury", url: "/treasury", icon: Wallet },
  { title: "One Engine Ledger", url: "/ledger", icon: Layers },
  { title: "Node Watchtower", url: "/nodes", icon: Activity },
  { title: "SmartRemit P2P", url: "/remittance", icon: Send },
  { title: "Merchant P2C Hub", url: "/p2c", icon: Building2 },
  { title: "Open Banking Hub", url: "/api-hub", icon: Code2 },
  { title: "Investor Hub", url: "/investors", icon: TrendingUp },
  { title: "Sovereign Charter", url: "/docs", icon: BookOpen },
  { title: "World Cup Relay", url: "/world-cup", icon: Trophy },
  { title: "Famelack Hub", url: "/famelack", icon: Globe },
]

const ADMIN_EMAIL = "rubels1k994@gmail.com"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()
  const { user } = useUser()
  const { toast } = useToast()
  const { setOpenMobile, isMobile } = useSidebar()
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const isAdmin = user?.email === ADMIN_EMAIL

  const handleLogout = async () => {
    try {
      await signOutUser(auth)
      toast({
        title: "Session Terminated",
        description: "Imperial handshake closed.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive"
      })
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        toast({
          title: "Fullscreen Error",
          description: e.message,
          variant: "destructive"
        })
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar className="border-r border-white/5 bg-card/80 backdrop-blur-xl">
      <SidebarHeader className="p-4 flex flex-row items-center justify-between">
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
      <SidebarContent>
        <SidebarMenu className="px-2 pt-4">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.url}
                className="hover:bg-primary/10 hover:text-primary transition-all duration-200 h-11"
              >
                <Link href={item.url} onClick={handleLinkClick}>
                  <item.icon className="size-5" />
                  <span className="font-medium text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-4">
        <div className="space-y-2">
          <button 
            onClick={toggleFullscreen}
            className="w-full py-2.5 bg-primary/5 rounded border border-primary/20 text-[9px] uppercase font-bold text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="size-3 group-hover:scale-110 transition-transform" />
                Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 className="size-3 group-hover:scale-110 transition-transform" />
                Go Fullscreen
              </>
            )}
          </button>
        </div>

        {user ? (
          <div className={`p-3 rounded-xl border space-y-3 transition-all ${isAdmin ? 'bg-primary/10 border-primary/40 shadow-[0_0_15px_rgba(0,150,255,0.2)]' : 'bg-primary/5 border-primary/20'}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className={`size-8 border ${isAdmin ? 'border-primary' : 'border-primary/30'}`}>
                  <AvatarImage src={user.photoURL || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                    {user.displayName?.substring(0, 2).toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 size-3 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                    <Crown className="size-1.5 text-background font-bold fill-current" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] font-bold truncate uppercase ${isAdmin ? 'text-primary' : ''}`}>
                  {isAdmin ? "Imperial Admin" : (user.displayName || "Commander")}
                </p>
                <div className="flex items-center gap-1">
                   <div className={`size-1 rounded-full animate-pulse ${isAdmin ? 'bg-primary' : 'bg-emerald-500'}`} />
                   <p className="text-[8px] text-muted-foreground uppercase font-mono tracking-tighter">
                     {isAdmin ? "ROOT_L4_SUPERUSER" : "Root_L4 Session"}
                   </p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full py-2.5 bg-white/5 rounded border border-white/5 text-[9px] uppercase font-bold text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="size-3" />
              Terminate Handshake
            </button>
          </div>
        ) : (
          <SidebarMenuButton asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-11">
            <Link href="/login" onClick={handleLinkClick}>
              <LogIn className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Identity Authentication</span>
            </Link>
          </SidebarMenuButton>
        )}

        <div className="flex flex-col gap-2">
          <SidebarMenuButton asChild className={`hover:text-primary transition-colors border border-white/5 h-11 ${pathname === '/ecosystem' ? 'bg-primary/10 text-primary border-primary/20' : 'text-muted-foreground'}`}>
            <Link href="/ecosystem" onClick={handleLinkClick}>
              <Settings className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Parameters</span>
              <ChevronRight className="size-3 ml-auto" />
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
