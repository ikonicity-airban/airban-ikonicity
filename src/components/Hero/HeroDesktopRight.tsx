import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { playClickSound, getAccentHex, getAccentRgba } from '../../utils';

interface HeroDesktopRightProps {
  colOpacity: number;
  textAccentClass: string;
  accentColor: any;
  handleScrollToWork: () => void;
  handleDownloadCVClick: () => void;
  availabilityStatus?: string;
}

export default function HeroDesktopRight({
  colOpacity,
  textAccentClass,
  accentColor,
  handleScrollToWork,
  handleDownloadCVClick,
  availabilityStatus
}: HeroDesktopRightProps) {
  const getSolidAccentColor = (color: string) => {
    switch (color) {
      case 'green': return '#2EC413';
      case 'cyan': return '#00A8CC';
      case 'pink': return '#D8006C';
      case 'purple': return '#9A00D0';
      case 'yellow': return '#D4BE00';
      default: return '#2EC413';
    }
  };

  return (
    <div 
      className="absolute right-[5%] top-1/2 -translate-y-[calc(50%-7rem)] w-[30%] flex flex-col space-y-16 text-left pointer-events-auto z-50"
      style={{ opacity: colOpacity }}
    >
      <motion.div 
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.35 }}
        className="space-y-4"
      >
        <h2 
          className="text-[#F0F4FF] font-display font-black leading-none uppercase"
          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}
        >
          Building Intelligent<br />
          <span className={textAccentClass}>Systems</span>
        </h2>
        <p className="font-mono text-[12.5px] leading-relaxed text-[#CAD5EE] max-w-sm">
          Scalable platforms, AI automation, and software that solves complex problems.
        </p>
      </motion.div>

      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.45 }}
          className="flex items-center gap-4.5"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToWork}
            onMouseEnter={() => playClickSound('hover')}
            className="px-8 py-3.5 text-[#050816] font-accent font-extrabold text-[9.5px] uppercase tracking-widest rounded-[4px] cursor-pointer transition-all duration-300 hover:brightness-105"
            style={{
              backgroundColor: getSolidAccentColor(accentColor),
              boxShadow: `0 0 12px ${getAccentRgba(accentColor, 0.2)}`,
              fontFamily: "'Syne', sans-serif"
            }}
          >
            Explore My Work
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadCVClick}
            onMouseEnter={() => playClickSound('hover')}
            className="px-8 py-3.5 bg-transparent border font-accent font-extrabold text-[9.5px] uppercase tracking-widest rounded-[4px] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group"
            style={{
              borderColor: getSolidAccentColor(accentColor),
              color: getSolidAccentColor(accentColor),
              backgroundColor: 'transparent',
              fontFamily: "'Syne', sans-serif"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = `${getAccentRgba(accentColor, 0.08)}`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            <span>Download CV</span>
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.45 }}
          className="flex items-center gap-2 pl-1"
        >
          <span className="relative flex h-2 w-2">
            <span 
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                availabilityStatus === 'busy' ? 'bg-amber-400' : ''
              }`} 
              style={{ backgroundColor: availabilityStatus === 'busy' ? undefined : getAccentHex(accentColor) }}
            />
            <span 
              className={`relative inline-flex rounded-full h-2 w-2 ${
                availabilityStatus === 'busy' ? 'bg-amber-400' : ''
              }`} 
              style={{ backgroundColor: availabilityStatus === 'busy' ? undefined : getAccentHex(accentColor) }}
            />
          </span>
          <span className="font-mono text-[11px] font-bold text-[#8A9BC4] uppercase tracking-wider">
            ● {availabilityStatus === 'busy' ? 'Busy building systems' : 'Available for work'}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
