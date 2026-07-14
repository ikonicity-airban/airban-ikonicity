import { motion } from 'motion/react';
import { getAccentRgba } from '../../utils';

interface HeroTitleProps {
  scrollY: number;
  isMobile: boolean;
  primaryColorHex: string;
  accentColor: any;
}

export default function HeroTitle({ scrollY, isMobile, primaryColorHex, accentColor }: HeroTitleProps) {
  return (
    <div 
      className="absolute inset-x-0 top-[20%] md:top-[calc(12%+4rem)] flex flex-col items-center justify-center select-none pointer-events-none overflow-hidden"
      style={{ 
        transform: `translateY(${scrollY * 0.45}px)`,
        opacity: Math.max(0, 0.90 - scrollY * 0.003),
        zIndex: 1
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: -60 }}
        animate={{ opacity: 0.90, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 18, mass: 1, delay: 0.1 }}
        className="text-center font-extrabold uppercase select-none tracking-tighter"
        style={{
          fontFamily: "'Syne', sans-serif"
        }}
      >
        <div 
          style={{ 
            fontSize: isMobile ? '16vw' : '14vw',
            lineHeight: '0.9',
            fontWeight: 800,
            background: `linear-gradient(to bottom, ${primaryColorHex} 10%, #050816 95%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 35px ${getAccentRgba(accentColor, 0.35)})`
          }}
        >
          Airban
        </div>
        <div 
          style={{ 
            fontSize: isMobile ? '11.5vw' : '10vw',
            lineHeight: '0.85',
            marginTop: '-1.5vw',
            fontWeight: 800,
            background: 'linear-gradient(to bottom, #FFFFFF 20%, #64748B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.2))'
          }}
        >
          Ikonicity
        </div>
      </motion.div>
    </div>
  );
}
