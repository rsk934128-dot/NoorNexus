
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Globe, ExternalLink, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FamelackPage() {
  return (
    <div className="flex min-h-screen bg-background cyber-grid">
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-col h-screen max-w-[1600px] mx-auto w-full">
          <header className="p-4 sm:p-6 lg:p-8 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 glow-primary">
                <Globe className="size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-headline font-bold uppercase tracking-tight text-primary">Famelack Hub</h2>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">External Gateway | Sovereign Sync</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-500 uppercase flex items-center gap-1.5 h-6">
                <ShieldCheck className="size-3" />
                <span className="text-[10px]">Secure SSL Uplink</span>
              </Badge>
              <a 
                href="https://famelack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                Open in Tab
                <ExternalLink className="size-3" />
              </a>
            </div>
          </header>

          <div className="flex-1 p-4 sm:p-6 overflow-hidden">
            <Card className="glass-card border-white/5 h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/2 opacity-[0.02] pointer-events-none" />
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
          
          <footer className="p-2 border-t border-white/5 bg-background/80 shrink-0 text-center">
            <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">
              NoorNexus OS Integrated Web-View | Endpoint: famelack.com
            </p>
          </footer>
        </main>
      </SidebarInset>
    </div>
  )
}
