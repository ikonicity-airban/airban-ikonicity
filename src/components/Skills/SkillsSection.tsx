import { motion } from 'motion/react';
import { portfolioData } from '../../data';
import { getAccentTextClass } from '../../utils';
import SkillGroupCard from './SkillGroupCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 15,
    }
  }
};

interface SkillsSectionProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function SkillsSection({ accentColor }: SkillsSectionProps) {
  const accentTextClass = getAccentTextClass(accentColor);
  
  const getGlowShadowClass = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'shadow-[0_0_20px_rgba(57,255,20,0.1)]';
      case 'cyan': return 'shadow-[0_0_20px_rgba(0,212,255,0.1)]';
      case 'pink': return 'shadow-[0_0_20px_rgba(255,0,127,0.1)]';
      case 'purple': return 'shadow-[0_0_20px_rgba(189,0,255,0.1)]';
      case 'yellow': return 'shadow-[0_0_20px_rgba(255,230,0,0.1)]';
      default: return 'shadow-[0_0_20px_rgba(57,255,20,0.1)]';
    }
  };
  const glowShadowClass = getGlowShadowClass(accentColor);

  const getDotAccentClass = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'bg-[#39FF14]/70';
      case 'cyan': return 'bg-[#00D4FF]/70';
      case 'pink': return 'bg-[#FF007F]/70';
      case 'purple': return 'bg-[#BD00FF]/70';
      case 'yellow': return 'bg-[#FFE600]/70';
      default: return 'bg-[#39FF14]/70';
    }
  };
  const dotAccentClass = getDotAccentClass(accentColor);

  const getHoverBorderAccentClass = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'hover:border-[#39FF14]/30';
      case 'cyan': return 'hover:border-[#00D4FF]/30';
      case 'pink': return 'hover:border-[#FF007F]/30';
      case 'purple': return 'hover:border-[#BD00FF]/30';
      case 'yellow': return 'hover:border-[#FFE600]/30';
      default: return 'hover:border-[#39FF14]/30';
    }
  };
  const hoverBorderAccentClass = getHoverBorderAccentClass(accentColor);

  return (
    <section id="skills" className="py-24 border-t border-white/5 bg-[#080D1F]/30 relative z-20 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 text-left">
          <div>
            <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${accentTextClass} block mb-1`}>
              &gt;_ SECTOR_003 // SYSTEMS BLUEPRINTS
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none font-display uppercase">
              Skills &amp; Technologies Manifest
            </h2>
          </div>
          <p className="text-xs text-[#8A9BC4] max-w-sm font-mono uppercase">
            Surgical list of stacks organized by system execution. Zero fluff or arbitrary percentage meters.
          </p>
        </div>

        {/* Grouped, flat lists without proficiency progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioData.skillsGrouped.map((group, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
            >
              <SkillGroupCard 
                group={group}
                idx={idx}
                accentColor={accentColor}
                glowShadowClass={glowShadowClass}
                dotAccentClass={dotAccentClass}
                hoverBorderAccentClass={hoverBorderAccentClass}
                accentTextClass={accentTextClass}
              />
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
