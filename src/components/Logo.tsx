import React from 'react';
// @ts-ignore
import brandLogo from '../assets/images/airban_logo_asset_1780203778311.png';

interface LogoProps {
  size?: number; // width and height of the symbol
  showText?: boolean;
  glow?: boolean;
}

export default function Logo({ size = 48, showText = true, glow = true }: LogoProps) {
  return (
    <div className="flex flex-col items-center justify-center select-none font-sans">
      <div 
        className="relative group transition-transform duration-500 hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Glow backdrop */}
        {glow && (
          <div className="absolute inset-0 bg-[#39FF14]/15 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        
        {/* Render the actual high-fidelity logo image asset provided by user */}
        <img 
          src={brandLogo}
          alt="Airban Ikonicity Logo"
          className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(57,255,20,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.6)]"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col items-center mt-3 text-center">
          {/* Symmetrical technical geometric data lines inside emblem */}
          <div className="flex items-center justify-center gap-1.5 text-[8px] md:text-[9px] font-mono tracking-[0.55em] text-[#39FF14] font-bold uppercase mt-1">
            <span className="w-5 h-[1px] bg-[#39FF14]/40" />
            <span>AUTHENTIC BRAND</span>
            <span className="w-5 h-[1px] bg-[#39FF14]/40" />
          </div>
        </div>
      )}
    </div>
  );
}
