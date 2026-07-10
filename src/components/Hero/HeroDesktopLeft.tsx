import { motion, AnimatePresence } from 'motion/react';
import { getAccentHex } from '../../utils';

interface HeroDesktopLeftProps {
  colOpacity: number;
  textAccentClass: string;
  activeSubtextIndex: number;
  accentColor: any;
}

export default function HeroDesktopLeft({ colOpacity, textAccentClass, activeSubtextIndex, accentColor }: HeroDesktopLeftProps) {
  return (
    <div 
      className="absolute left-[5%] top-1/2 -translate-y-[calc(50%-7rem)] w-[30%] flex flex-col space-y-16 text-left pointer-events-auto z-50"
      style={{ opacity: colOpacity }}
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-1"
      >
        <span className="font-display font-black text-[#CAD5EE] block text-[9.5px] uppercase tracking-[0.25em]">
          // IDENTITY
        </span>
        <p 
          className={`font-accent font-black leading-normal ${textAccentClass} pt-2.5`}
          style={{ 
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            WebkitTextStroke: '1px #000000',
          }}
        >
          Full-Stack Engineer
        </p>
      </motion.div>

      <div className="min-h-[110px] flex items-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSubtextIndex === 0 ? (
            <motion.div 
              key="problem-solver"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative pl-7 text-left group w-full"
            >
              <span 
                className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" 
                style={{ 
                  backgroundColor: getAccentHex(accentColor),
                  boxShadow: `0 0 8px ${getAccentHex(accentColor)}`
                }}
              />
              
              <div 
                className="absolute left-2 top-2 w-[60px] h-[1px] opacity-40 group-hover:w-[75px] transition-all duration-300" 
                style={{ backgroundColor: getAccentHex(accentColor) }}
              />
              
              <h3 className="font-accent font-bold text-[#F0F4FF] text-[15px] leading-none mb-1.5 pl-[68px]">
                Problem Solver
              </h3>
              <p className="font-mono text-[#8A9BC4] text-[12px] leading-relaxed pl-[68px]">
                Engineering solutions from first principles.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="systems-builder"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative pl-7 text-left group w-full"
            >
              <span 
                className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" 
                style={{ 
                  backgroundColor: getAccentHex(accentColor),
                  boxShadow: `0 0 8px ${getAccentHex(accentColor)}`
                }}
              />
              
              <div 
                className="absolute left-2 top-2 w-[60px] h-[1px] opacity-40 group-hover:w-[75px] transition-all duration-300" 
                style={{ backgroundColor: getAccentHex(accentColor) }}
              />
              
              <h3 className="font-accent font-bold text-[#F0F4FF] text-[15px] leading-none mb-1.5 pl-[68px]">
                Systems Builder
              </h3>
              <p className="font-mono text-[#8A9BC4] text-[12px] leading-relaxed pl-[68px]">
                From architecture to production deployment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
