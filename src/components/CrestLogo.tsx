import React from 'react';

interface CrestLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function CrestLogo({ className = '', size = 80, showText = true }: CrestLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-105"
      >
        {/* Outer Glow Shield */}
        <path
          d="M100 10 L170 35 V105 C170 155 135 190 100 205 C65 190 30 155 30 105 V35 L100 10 Z"
          fill="url(#shieldBg)"
          stroke="url(#goldGradient)"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Shield Quadrants & Dividers */}
        <g opacity="0.9">
          {/* Vertical Divider */}
          <line x1="100" y1="12" x2="100" y2="202" stroke="url(#goldGradient)" strokeWidth="3" />
          {/* Horizontal Divider */}
          <line x1="31" y1="105" x2="169" y2="105" stroke="url(#goldGradient)" strokeWidth="3" />
        </g>

        {/* Top-Left Quadrant (Red Base - Gears / Knowledge) */}
        <path
          d="M100 12 L33 35.5 V104.5 H100 V12 Z"
          fill="#9D1C24"
          className="mix-blend-multiply"
          opacity="0.8"
        />
        {/* Top-Right Quadrant (Blue/Green Base - Tree) */}
        <path
          d="M100 12 L167 35.5 V104.5 H100 V12 Z"
          fill="#0D2E5C"
          className="mix-blend-multiply"
          opacity="0.8"
        />
        {/* Bottom-Left Quadrant (Red - Globe) */}
        <path
          d="M100 105.5 H31 V105 C31 145 58 175 100 198 V105.5 Z"
          fill="#9D1C24"
          opacity="0.75"
        />
        {/* Bottom-Right Quadrant (Blue - Cap/Book) */}
        <path
          d="M100 105.5 H169 V105 C169 145 142 175 100 198 V105.5 Z"
          fill="#0D2E5C"
          opacity="0.75"
        />

        {/* --- Upper half: Tree of Knowledge (Golden outline & green elements) --- */}
        <g transform="translate(100, 58)">
          {/* Tree Canopy circles */}
          <circle cx="0" cy="-24" r="16" fill="url(#goldGradient)" opacity="0.3" />
          <circle cx="-12" cy="-14" r="12" fill="url(#goldGradient)" opacity="0.25" />
          <circle cx="12" cy="-14" r="12" fill="url(#goldGradient)" opacity="0.25" />
          
          {/* Tree Trunk & Branches */}
          <path d="M-2 15 V 0 C-2 -6 -8 -10 -10 -15 M2 15 V 0 C2 -6 8 -10 10 -15 M0 15 V -4 C0 -8 0 -12 2 -22" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-10" cy="-15" r="2.5" fill="#F6E294" />
          <circle cx="10" cy="-15" r="2.5" fill="#F6E294" />
          <circle cx="2" cy="-22" r="3" fill="#F6E294" />
          
          {/* Glowing Stars in canopy */}
          <polygon points="0,-32 2,-28 7,-28 3,-25 5,-20 0,-23 -5,-20 -3,-25 -7,-28 -2,-28" fill="#FFF" />
          <circle cx="-15" cy="-28" r="1" fill="#FFF" />
          <circle cx="15" cy="-28" r="1" fill="#FFF" />
        </g>

        {/* --- Bottom-Left: Globe Icon --- */}
        <g transform="translate(65, 145)">
          <circle cx="0" cy="0" r="18" stroke="url(#goldGradient)" strokeWidth="2" fill="none" />
          {/* Latitudes & Longitudes */}
          <path d="M-18 0 H18" stroke="url(#goldGradient)" strokeWidth="1.5" />
          <path d="M-15 -9 H15 M-15 9 H15" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="2,1" />
          <path d="M0 -18 C-7 -10 -7 10 0 18 C7 10 7 -10 0 -18" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
        </g>

        {/* --- Bottom-Right: Graduation Cap & Book --- */}
        <g transform="translate(135, 142)">
          {/* Cap Diamond */}
          <polygon points="0,-12 16,-6 0,0 -16,-6" fill="url(#goldGradient)" stroke="#FFF" strokeWidth="1" />
          {/* Cap Skull & Tassel */}
          <path d="M-8 -6 V0 C-8 4 8 4 8 0 V-6" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
          <path d="M0 -6 L14 4 V10" fill="none" stroke="#FFF" strokeWidth="1" />
          {/* Open Book */}
          <path d="M-14 14 C-7 11 -2 11 0 14 C2 11 7 11 14 14 V8 C7 5 2 5 0 8 C-2 5 -7 5 -14 8 Z" fill="url(#goldGradient)" />
        </g>

        {/* Laurel Wreath Border Accent */}
        <g opacity="0.8">
          <path d="M15 105 C15 160 55 198 100 198" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1,5" fill="none" />
          <path d="M185 105 C185 160 145 198 100 198" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1,5" fill="none" />
        </g>

        {/* --- Golden Motto Ribbon / Banner --- */}
        <g transform="translate(100, 203)">
          <path
            d="M-85 -10 L-65 -2 H65 L85 -10 L75 10 L-75 10 Z"
            fill="#070F25"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text
            x="0"
            y="2"
            fill="#FFF"
            fontFamily="sans-serif"
            fontSize="8.5"
            fontWeight="bold"
            letterSpacing="1.2"
            textAnchor="middle"
          >
            KNOWLEDGE IS POWER
          </text>
        </g>

        {/* Gradients Definition */}
        <defs>
          <linearGradient id="shieldBg" x1="100" y1="10" x2="100" y2="205" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#12255C" />
            <stop offset="100%" stopColor="#070E24" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="200" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F6E294" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A1801F" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <div className="mt-3 text-center">
          <h1 className="font-display text-2xl font-black tracking-wider text-white">
            Stm <span className="gold-gradient-text">SCHOLARS</span>
          </h1>
          <p className="font-serif text-xs font-semibold tracking-widest text-[#F6E294] uppercase">
            Foundation of Career
          </p>
        </div>
      )}
    </div>
  );
}
