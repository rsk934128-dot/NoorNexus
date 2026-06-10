
"use client"

import { cn } from "@/lib/utils"

interface SovereignLogoProps {
  className?: string
  size?: number
}

export function SovereignLogo({ className, size = 100 }: SovereignLogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Outer Glow Ring - Multi-layered for depth */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-0 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-700" />
      
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(0,150,255,0.8)]">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Hexagon Frame - Tactical Border */}
        <path 
          d="M50 5 L93 30 L93 70 L50 95 L7 70 L7 30 Z" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
        
        {/* Inner Shield Overlay */}
        <path 
          d="M50 15 L85 35 L85 65 L50 85 L15 65 L15 35 Z" 
          fill="rgba(0, 150, 255, 0.08)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="0.5" 
          strokeOpacity="0.3"
        />
        
        {/* Stylized 'G' Lettermark - Sovereign Branding */}
        <text 
          x="50" 
          y="64" 
          textAnchor="middle" 
          fontFamily="Space Grotesk, sans-serif" 
          fontWeight="900" 
          fontSize="42" 
          fill="url(#logoGradient)"
          filter="url(#glow)"
          className="select-none tracking-tighter"
        >
          G
        </text>
        
        {/* Orbiting Tech Points */}
        <circle cx="50" cy="5" r="2" fill="hsl(var(--secondary))" className="animate-pulse" />
        <circle cx="93" cy="30" r="1.5" fill="hsl(var(--primary))" />
        <circle cx="7" cy="70" r="1.5" fill="hsl(var(--primary))" />
        
        {/* Dynamic Scanning Ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="47" 
          fill="none" 
          stroke="hsl(var(--primary))" 
          strokeWidth="0.25" 
          strokeDasharray="5 10" 
          className="animate-[spin-slow_15s_linear_infinite] origin-center opacity-40"
        />
      </svg>
    </div>
  )
}
