
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
      <SidebarInset className="flex-1 w-full flex flex-col min-w-0 p-0 m-0">
        <main className="flex flex-col h-screen w-full max-w-full overflow-hidden p-0 m-0">
          {/* Header with optimized space and full width */}
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0 w-full">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary shrink-0">
                <Globe className="size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-primary truncate leading-none">Famelack Hub</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase truncate">Sovereign Sync Gateway</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-emerald-500/50 text-emerald-500 uppercase items-center gap-1.5 h-7">
                <ShieldCheck className="size-3.5" />
                <span className="text-[10px]">Secure Uplink</span>
              </Badge>
              <a 
                href="https://famelack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors bg-white/5 px-4 py-2 rounded-md border border-white/10"
              >
                <span>Open in Tab</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </header>

          {/* Truly Expansive Display Area filling 100% of the available width */}
          <div className="flex-1 overflow-hidden bg-black/20 w-full p-0 m-0">
            <Card className="border-none h-full w-full overflow-hidden relative rounded-none shadow-none bg-transparent m-0 p-0">
              <div className="absolute inset-0 bg-primary/5 opacity-[0.02] pointer-events-none" />
              <CardContent className="p-0 h-full w-full">
                <iframe 
                  src="https://famelack.com/" 
                  className="w-full h-full border-0 bg-white"
                  title="Famelack External Integration"
                  allow="camera; microphone; geolocation; display-capture; autoplay; clipboard-write; encrypted-media; picture-in-picture;"
                  sandbox="allow-same-origin allow-scripts allow-popovers allow-forms allow-modals"
                />
              </CardContent>
            </Card>
          </div>
          
          <footer className="py-2 border-t border-white/5 bg-background/80 shrink-0 text-center w-full">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
              NoorNexus OS Integrated Web-View | Endpoint: famelack.com
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
