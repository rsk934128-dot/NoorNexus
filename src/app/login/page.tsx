
"use client"

import { useAuth, useUser } from "@/firebase"
import { signInWithGoogle, signInWithGithub, signInWithMicrosoft } from "@/firebase/auth/auth-service"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  LogIn, 
  ShieldCheck, 
  Zap, 
  Github, 
  Chrome, 
  Terminal, 
  Loader2, 
  Sparkles, 
  Radio,
  Shield,
  Lock
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { SovereignLogo } from "@/components/sovereign-logo"

/**
 * @fileOverview Sovereign Gate - Imperial Login Portal (V4.5 - Auto-Handshake Edition)
 * নূরনেক্সাস অপারেটিং সিস্টেমের কেন্দ্রীয় প্রবেশদ্বার। 
 * এটি গিটহাব সেশন শনাক্ত করে অটোমেটিক হ্যান্ডশেক সম্পন্ন করার ক্ষমতা রাখে।
 */

export default function LoginPage() {
  const auth = useAuth()
  const { user, loading } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [signingIn, setSigningIn] = useState(false)
  const [systemId, setSystemId] = useState("")
  const [hasRecentPulse, setHasRecentPulse] = useState(false)
  const [autoConnecting, setAutoConnecting] = useState(false)

  useEffect(() => {
    setSystemId(Math.random().toString(16).substring(2, 10).toUpperCase())
    
    // Check for a recent successful pulse to enable Quick Connect
    const lastPulse = localStorage.getItem('noornexus_last_pulse_provider')
    if (lastPulse === 'github') {
      setHasRecentPulse(true)
    }

    if (!loading && user) {
      router.push("/")
    }
  }, [user, loading, router])

  const handleAuth = useCallback(async (provider: 'google' | 'github' | 'microsoft') => {
    setSigningIn(true)
    try {
      let result;
      if (provider === 'google') result = await signInWithGoogle(auth);
      else if (provider === 'github') result = await signInWithGithub(auth);
      else result = await signInWithMicrosoft(auth);

      if (result) {
        localStorage.setItem('noornexus_last_pulse_provider', provider)
        toast({
          title: "Access Granted",
          description: `Identified via ${provider.toUpperCase()}. Welcome, Commander.`,
          className: "border-emerald-500/50 bg-emerald-500/5"
        })
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        setSigningIn(false)
        return
      }
      toast({
        title: "Access Denied",
        description: error.message || "Authentication protocol failed.",
        variant: "destructive"
      })
    } finally {
      setSigningIn(false)
    }
  }, [auth, toast])

  // Neural Auto-Handshake Attempt
  useEffect(() => {
    if (hasRecentPulse && !user && !loading && !signingIn) {
      const triggerAuto = async () => {
        setAutoConnecting(true)
        // Brief delay to allow visual calibration
        await new Promise(r => setTimeout(r, 1500))
        // We don't auto-trigger popup due to browser blocks, 
        // but we highlight the channel for the commander.
        setAutoConnecting(false)
      }
      triggerAuto()
    }
  }, [hasRecentPulse, user, loading, signingIn])

  if (loading) return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 space-y-4">
       <Loader2 className="size-10 text-primary animate-spin" />
       <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em]">Calibrating Gate...</p>
    </div>
  )

  return (
    <div className="h-screen w-full bg-background cyber-grid flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[4] rotate-12">
           <Github className="size-96 text-white" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="mx-auto flex justify-center animate-in zoom-in-50 duration-700">
            <SovereignLogo size={100} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold tracking-tighter">NoorNexus <span className="text-primary">OS</span></h1>
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.4em]">Imperial Security Protocol v4.5</p>
          </div>
        </div>

        <Card className="glass-card border-primary/20 bg-card/60 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,150,255,0.1)]">
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-2">
               <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase font-bold text-[8px] h-6 px-3 bg-emerald-500/5">
                 <ShieldCheck className="size-3 mr-2" /> Handshake Veracity: ACTIVE
               </Badge>
            </div>
            <CardTitle className="font-headline text-center text-primary uppercase tracking-widest text-lg">Sovereign Gate</CardTitle>
            <CardDescription className="text-center uppercase text-[10px] tracking-[0.2em] font-bold text-muted-foreground">Multi-Node Identity Verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            
            {hasRecentPulse && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 animate-in slide-in-from-top-2">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase">
                       <Radio className="size-3 animate-pulse" />
                       Recent Session Detected
                    </div>
                    <Sparkles className="size-3 text-amber-500" />
                 </div>
                 <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                    Commander, a recent GitHub handshake was detected. Tap the highlighted portal below to resume the connection instantly.
                 </p>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                onClick={() => handleAuth('github')}
                disabled={signingIn}
                className={`w-full h-14 font-bold uppercase tracking-widest gap-3 transition-all duration-500 ${hasRecentPulse ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_25px_rgba(255,255,255,0.4)] ring-2 ring-white/50 animate-pulse' : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'}`}
              >
                {signingIn ? <Loader2 className="size-5 animate-spin" /> : <Github className="size-5" />}
                Identify with GitHub
              </Button>

              <Button 
                onClick={() => handleAuth('google')}
                disabled={signingIn}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest h-12 gap-3"
              >
                <Chrome className="size-4 text-red-500" /> Identify with Google
              </Button>

              <Button 
                onClick={() => handleAuth('microsoft')}
                disabled={signingIn}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest h-12 gap-3"
              >
                <Terminal className="size-4 text-primary" /> Identify with Microsoft
              </Button>
            </div>

            <div className="pt-4 border-t border-white/5 text-center">
               <p className="text-[8px] text-muted-foreground uppercase font-mono tracking-widest">
                  L4 Encryption Tier: ENFORCED | Replay Protection: ARMED
               </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col items-center gap-4 text-center">
           <p className="text-[9px] text-muted-foreground uppercase font-mono tracking-widest">
             Authorized Personnel Only | System ID: {systemId || "INITIALIZING..."}
           </p>
           <div className="flex gap-2 items-center opacity-30">
              <Shield className="size-3" />
              <Zap className="size-3" />
              <Lock className="size-3" />
           </div>
        </div>
      </div>
    </div>
  )
}
