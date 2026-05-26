import React from "react";

export default function PurpleRaysBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Primary purple radial burst - center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] animate-pulse-glow"
        style={{
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              rgba(124, 58, 237, 0.08) 10deg,
              transparent 20deg,
              transparent 40deg,
              rgba(139, 92, 246, 0.06) 50deg,
              transparent 60deg,
              transparent 90deg,
              rgba(167, 139, 250, 0.07) 100deg,
              transparent 110deg,
              transparent 140deg,
              rgba(124, 58, 237, 0.09) 150deg,
              transparent 160deg,
              transparent 180deg,
              rgba(139, 92, 246, 0.05) 190deg,
              transparent 200deg,
              transparent 230deg,
              rgba(167, 139, 250, 0.08) 240deg,
              transparent 250deg,
              transparent 280deg,
              rgba(124, 58, 237, 0.06) 290deg,
              transparent 300deg,
              transparent 330deg,
              rgba(139, 92, 246, 0.07) 340deg,
              transparent 360deg
            )
          `,
        }}
      />

      {/* Secondary purple glow - top */}
      <div 
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
        }}
      />

      {/* Diagonal ray streaks */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-20"
        style={{
          background: `
            linear-gradient(135deg, transparent 40%, rgba(124, 58, 237, 0.04) 45%, transparent 50%),
            linear-gradient(225deg, transparent 40%, rgba(139, 92, 246, 0.03) 45%, transparent 50%),
            linear-gradient(315deg, transparent 35%, rgba(167, 139, 250, 0.05) 42%, transparent 48%),
            linear-gradient(45deg, transparent 42%, rgba(124, 58, 237, 0.04) 47%, transparent 52%)
          `,
        }}
      />

      {/* Focused violet glow - bottom right */}
      <div 
        className="absolute bottom-[10%] right-[15%] w-[40vw] h-[40vh] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* Focused violet glow - top left */}
      <div 
        className="absolute top-[15%] left-[10%] w-[35vw] h-[35vh] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.1) 0%, transparent 60%)',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}