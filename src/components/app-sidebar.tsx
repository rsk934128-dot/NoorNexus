
"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Send, 
  Terminal,
  Settings,
  Globe,
  Radar,
  Lock,
  Trophy,
  SlidersHorizontal,
  ChevronRight
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
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { title: "Command Center", url: "/", icon: LayoutDashboard },
  { title: "Border Monitor", url: "/border-monitor", icon: Radar },
  { title: "Compliance Agent", url: "/compliance", icon: ShieldCheck },
  { title: "One Engine Ledger", url: "/ledger", icon: Layers },
  { title: "Node Watchtower", url: "/nodes", icon: Activity },
  { title: "SmartRemit P2P", url: "/remittance", icon: Send },
  { title: "World Cup Relay", url: "/world-cup", icon: Trophy },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-white/5 bg-card/80 backdrop-blur-xl">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center glow-primary">
            <Lock className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-headline font-bold text-primary tracking-tight">NoorNexus</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Imperial OS v3</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu className="px-2 pt-4">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.url}
                className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Link href={item.url}>
                  <item.icon className="size-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-2 py-1 bg-primary/5 rounded border border-primary/20 mb-2">
             <div className="flex items-center gap-2">
                <Terminal className="size-3 text-primary" />
                <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">Root Access L4</span>
             </div>
             <div className="size-1.5 bg-primary rounded-full animate-pulse" />
          </div>
          
          <SidebarMenuButton asChild className={`hover:text-primary transition-colors border border-white/5 ${pathname === '/ecosystem' ? 'bg-primary/10 text-primary border-primary/20' : 'text-muted-foreground'}`}>
            <Link href="/ecosystem">
              <Settings className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Ecosystem Parameters</span>
              <ChevronRight className="size-3 ml-auto" />
            </Link>
          </SidebarMenuButton>
        </div>
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase">Mesh: Active</span>
          </div>
          <p className="text-[10px] text-muted-foreground">Sirajganj-Edge-01 Live</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
