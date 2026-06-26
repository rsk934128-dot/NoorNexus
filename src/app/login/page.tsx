
"use client"

import { useAuth, useUser } from "@/firebase"
import { signInWithGoogle, signInWithGithub, signInWithMicrosoft } from "@/firebase/auth/auth-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LogIn, ShieldCheck, Zap, Github, Chrome, Terminal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { SovereignLogo } from "@/components/sovereign-logo"

export default function LoginPage() {
  const auth = useAuth()
  const { user, loading } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [signingIn, setSigningIn] = useState(false)
  const [systemId, setSystemId] = useState("")

  useEffect(() => {
    setSystemId(Math.random().toString(16).substring(2, 10).toUpperCase())
    if (!loading && user) {
      router.push("/")
    }
  }, [user, loading, router])

  const handleAuth = async (provider: 'google' | 'github' | 'microsoft') => {
    setSigningIn(true)
    try {
      let result;
      if (provider === 'google') result = await signInWithGoogle(auth);
      else if (provider === 'github') result = await signInWithGithub(auth);
      else result = await signInWithMicrosoft(auth);

      if (result) {
        toast({
          title: "Access Granted",
          description: `Identified via ${provider.toUpperCase()}. Welcome, Commander.`,
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
  }

  if (loading) return null

  return (
    <div className="h-screen w-full bg-background cyber-grid flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto flex justify-center">
            <SovereignLogo size={100} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold tracking-tighter">NoorNexus <span className="text-primary">OS</span></h1>
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.4em]">Imperial Security Protocol v3</p>
          </div>
        </div>

        <Card className="glass-card border-primary/20 bg-card/60 backdrop-blur-3xl">
          <CardHeader>
            <CardTitle className="font-headline text-center text-primary uppercase">Sovereign Gate</CardTitle>
            <CardDescription className="text-center uppercase text-[10px] tracking-widest font-bold">Multi-Node Identity Verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-2 mb-4">
               <div className="flex items-center gap-3 text-xs text-primary font-bold">
                  <ShieldCheck className="size-4" />
                  LEVEL 4 CLEARANCE REQUIRED
               </div>
               <p className="text-[9px] text-muted-foreground leading-relaxed font-mono">
                  HMAC_V4 Multi-Auth Layer: ACTIVE
               </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => handleAuth('google')}
                disabled={signingIn}
                className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest h-12 glow-primary gap-3"
              >
                <Chrome className="size-4" /> Identify with Google
              </Button>

              <Button 
                onClick={() => handleAuth('github')}
                disabled={signingIn}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest h-12 gap-3"
              >
                <Github className="size-4" /> Identify with GitHub
              </Button>

              <Button 
                onClick={() => handleAuth('microsoft')}
                disabled={signingIn}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest h-12 gap-3"
              >
                <Terminal className="size-4" /> Identify with Microsoft
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-[9px] text-muted-foreground uppercase font-mono tracking-widest">
          Authorized Personnel Only | System ID: {systemId || "INITIALIZING..."}
        </p>
      </div>
    </div>
  )
}
