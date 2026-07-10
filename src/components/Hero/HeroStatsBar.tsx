import { motion } from 'motion/react';
import { getAccentHex, getAccentRgba, getAccentTextClass } from '../../utils';

interface HeroStatsBarProps {
  accentColor: any;
}

export default function HeroStatsBar({ accentColor }: HeroStatsBarProps) {
  const textAccentClass = getAccentTextClass(accentColor);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full absolute bottom-0 left-0 right-0 z-40 transform translate-y-1/2 mb-10 md:mb-0"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div 
          className="py-3 sm:py-0 h-auto sm:h-24 bg-[#080D1F]/95 backdrop-blur-[12px] rounded-2xl border flex items-center justify-around overflow-visible shadow-[0_15px_30px_rgba(5,8,22,0.95)]"
          style={{ borderColor: getAccentRgba(accentColor, 0.15) }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-45" 
            style={{ backgroundImage: `linear-gradient(to right, transparent, ${getAccentHex(accentColor)}, transparent)` }}
          />
          
          {[
            { num: "4+", label: "Years Experience" },
            { num: "70,000+", label: "Users Reached" },
            { num: "10+", label: "Systems Shipped" }
          ].map((st, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-center relative px-1.5 text-center h-full">
              {i > 0 && (
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10" 
                  style={{ backgroundColor: `${getAccentHex(accentColor)}33` }}
                />
              )}

              <span className={`block font-display font-black leading-none ${textAccentClass}`}
                style={{ fontSize: 'clamp(1.1rem, 3vw, 2.3rem)' }}
              >
                {st.num}
              </span>
              
              <span className="block font-mono text-[8px] xs:text-[9.5px] text-[#CAD5EE] uppercase font-bold tracking-wider sm:tracking-widest mt-1 text-center leading-tight">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
