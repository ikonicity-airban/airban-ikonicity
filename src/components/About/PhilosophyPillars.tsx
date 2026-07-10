import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../../data';
import { playClickSound, getAccentHex, getAccentTextClass } from '../../utils';

interface PhilosophyPillarsProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function PhilosophyPillars({ accentColor }: PhilosophyPillarsProps) {
  const [activePillar, setActivePillar] = useState(0);

  // Autonomous continuous loop for Philosophy Pillars carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % portfolioData.philosophyPillars.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const accentTextClass = getAccentTextClass(accentColor);
  const accentHex = getAccentHex(accentColor);

  return (
    <div 
      className="p-6 rounded-2xl bg-[#0a0f26] border border-white/10 flex flex-col justify-between transition-all group overflow-hidden min-h-[190px] hover:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.12)]"
      style={{ color: accentHex }}
    >
      <div>
        <span className={`text-[9px] font-mono font-black ${accentTextClass} tracking-widest uppercase mb-1`}>
          [ SYSTEM PHILOSOPHIES ]
        </span>
        <h3 className="text-sm font-display font-black text-white tracking-wider mb-4 uppercase">
          Three Philosophy Pillars
        </h3>
      </div>
      
      <div className="relative overflow-hidden w-full min-h-[90px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activePillar}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-1.5 font-mono text-left w-full shrink-0"
          >
            <span className="block text-white font-bold text-xs uppercase tracking-wide">
              {portfolioData.philosophyPillars[activePillar].title}
            </span>
            <span className="block text-xs font-mono text-[#8A9BC4] leading-none mb-1 select-none">
              {portfolioData.philosophyPillars[activePillar].tagline}
            </span>
            <span className="block text-[11px] text-[#8A9BC4] leading-normal">
              {portfolioData.philosophyPillars[activePillar].description}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-start gap-2.5 mt-4 pt-2 border-t border-white/5">
        {portfolioData.philosophyPillars.map((_, idx) => {
          const isActive = idx === activePillar;
          return (
            <button
              key={idx}
              id={`philosophy-dot-${idx}`}
              onClick={() => {
                playClickSound('click');
                setActivePillar(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isActive ? 'w-6 bg-current' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
              style={{ color: isActive ? accentHex : undefined }}
              aria-label={`Go to philosophy pillar ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
