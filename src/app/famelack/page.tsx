
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ExternalLink, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FamelackPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset className="flex-1 w-full">
        <main className="flex flex-col h-screen w-full max-w-none">
          {/* Header with optimized space */}
          <header className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="size-8 sm:size-10 bg-primary/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Globe className="size-5 sm:size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-headline font-bold uppercase tracking-tight text-primary truncate leading-none">Famelack Hub</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[8px] sm:text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Sync Gateway</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-6">
                <ShieldCheck className="size-3" />
                <span className="text-[9px]">Secure Uplink</span>
              </Badge>
              <a 
                href="https://famelack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-muted-foreground hover:text-primary transition-colors bg-white/5 px-3 py-1.5 rounded-md border border-white/10"
              >
                <span className="hidden xs:inline">Open in Tab</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </header>

          {/* Optimized Display Area: Removed max-width to allow full horizontal expansion on desktop */}
          <div className="flex-1 p-1 sm:p-2 lg:p-0 overflow-hidden bg-black/20">
            <Card className="glass-card border-white/5 h-full w-full overflow-hidden relative rounded-md lg:rounded-none">
              <div className="absolute inset-0 bg-primary/5 opacity-[0.02] pointer-events-none" />
              <CardContent className="p-0 h-full w-full">
                <iframe 
                  src="https://famelack.com/" 
                  className="w-full h-full border-0 bg-white"
                  title="Famelack External Integration"
                  sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals"
                />
              </CardContent>
            </Card>
          </div>
          
          <footer className="py-1.5 border-t border-white/5 bg-background/80 shrink-0 text-center">
            <p className="text-[7px] sm:text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
              NoorNexus OS Integrated Web-View | Endpoint: famelack.com
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
