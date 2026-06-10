
"use client"

import { cn } from "@/lib/utils"

interface SovereignLogoProps {
  className?: string
  size?: number
}

export function SovereignLogo({ className, size = 100 }: SovereignLogoProps) {
  return (
    <div 
      className={cn("relative flex items-center justify-center overflow-visible", className)} 
      style={{ width: size, height: size }}
    >
      {/* Dynamic Glow Layer */}
      <div className="absolute inset-0 bg-primary/30 rounded-full blur-[40px] animate-pulse" />
      
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(0,150,255,0.9)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          
          <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Outer Hexagon - Tactical Mesh */}
        <path 
          d="M50 5 L93 30 L93 70 L50 95 L7 70 L7 30 Z" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        />
        
        {/* Secondary Shield Border */}
        <path 
          d="M50 15 L85 35 L85 65 L50 85 L15 65 L15 35 Z" 
          fill="rgba(0, 150, 255, 0.15)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1" 
          strokeDasharray="2 4"
          className="animate-pulse"
        />
        
        {/* Stylized Letter 'G' */}
        <text 
          x="50%" 
          y="62%" 
          dominantBaseline="middle"
          textAnchor="middle" 
          fontFamily="Space Grotesk, sans-serif" 
          fontWeight="900" 
          fontSize="46" 
          fill="url(#logoGradient)"
          className="select-none tracking-tighter"
          style={{ filter: 'url(#textGlow)' }}
        >
          G
        </text>
        
        {/* Tech Nodes */}
        <circle cx="50" cy="5" r="3" fill="hsl(var(--secondary))" className="animate-pulse" />
        <circle cx="93" cy="30" r="2.5" fill="hsl(var(--primary))" />
        <circle cx="7" cy="70" r="2.5" fill="hsl(var(--primary))" />
        
        {/* Scanning Detail */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none" 
          stroke="hsl(var(--primary))" 
          strokeWidth="0.5" 
          strokeDasharray="10 5" 
          className="animate-[spin_20s_linear_infinite] origin-center opacity-30"
        />
      </svg>
    </div>
  )
}
