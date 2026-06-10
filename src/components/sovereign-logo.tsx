
"use client"

import { cn } from "@/lib/utils"

interface SovereignLogoProps {
  className?: string
  size?: number
}

export function SovereignLogo({ className, size = 100 }: SovereignLogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_10px_rgba(0,150,255,0.8)]">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
        
        {/* Outer Hexagon Frame */}
        <path 
          d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="2" 
          className="animate-pulse"
        />
        
        {/* Inner Hexagon Shield */}
        <path 
          d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z" 
          fill="rgba(0, 150, 255, 0.05)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1" 
          strokeOpacity="0.5"
        />
        
        {/* Stylized 'G' Lettermark */}
        <text 
          x="50" 
          y="62" 
          textAnchor="middle" 
          fontFamily="Space Grotesk, sans-serif" 
          fontWeight="900" 
          fontSize="35" 
          fill="url(#logoGradient)"
          className="select-none"
          style={{ letterSpacing: "-2px" }}
        >
          G
        </text>
        
        {/* Spinning Data Ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="hsl(var(--primary))" 
          strokeWidth="0.5" 
          strokeDasharray="4 8" 
          className="animate-[spin-slow_20s_linear_infinite] origin-center"
        />
        
        {/* Corner Accents */}
        <circle cx="10" cy="25" r="1.5" fill="hsl(var(--primary))" />
        <circle cx="90" cy="25" r="1.5" fill="hsl(var(--primary))" />
        <circle cx="50" cy="5" r="1.5" fill="hsl(var(--secondary))" />
      </svg>
    </div>
  )
}
