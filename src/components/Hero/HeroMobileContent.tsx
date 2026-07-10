import { motion, AnimatePresence } from 'motion/react';
import { Download } from 'lucide-react';
import { playClickSound, getAccentHex, getAccentRgba } from '../../utils';

interface HeroMobileContentProps {
  containerVariants: any;
  itemVariants: any;
  scrollY: number;
  robotAvatar: string;
  accentColor: any;
  handleScrollToWork: () => void;
  handleDownloadCVClick: () => void;
  activeSubtextIndex: number;
  textAccentClass: string;
  availabilityStatus?: string;
}

export default function HeroMobileContent({
  containerVariants,
  itemVariants,
  scrollY,
  robotAvatar,
  accentColor,
  handleScrollToWork,
  handleDownloadCVClick,
  activeSubtextIndex,
  textAccentClass,
  availabilityStatus
}: HeroMobileContentProps) {
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
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="md:hidden flex flex-col items-center justify-start text-center px-6 pt-0 pb-36 min-h-screen relative z-10 space-y-0"
    >
      <motion.span 
        variants={itemVariants}
        className="font-mono text-[8px] tracking-[0.3em] text-[#8A9BC4] block font-black mt-8 mb-8"
      >
        // IDENTITY
      </motion.span>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 170,
          damping: 24,
          mass: 0.95,
          delay: 0.75,
        }}
        className="relative w-[99vw] flex items-center justify-center overflow-hidden !mt-0 !mb-0"
      >
        <div 
          className="relative w-full flex items-center justify-center"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        >
          <div 
            className="absolute inset-0 m-auto w-[212px] h-[212px] rounded-full border filter blur-md animate-pulse" 
            style={{ 
              borderColor: `${getAccentHex(accentColor)}26`, 
              backgroundColor: `${getAccentHex(accentColor)}0d` 
            }}
          />
          
          <img 
            src={robotAvatar} 
            alt="Airban Ikonicity Portrait" 
            className="w-full h-auto object-contain z-10"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
              filter: `drop-shadow(0 0 20px ${getAccentRgba(accentColor, 0.15)})`
            }}
          />
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="relative w-full space-y-4 px-2 !mt-0 !pt-0 flex flex-col items-center z-20"
      >
        <p 
          className="font-accent font-black text-[16.5px] uppercase tracking-widest -mt-10 pt-0"
          style={{ 
            color: getSolidAccentColor(accentColor),
            WebkitTextStroke: '1px #000000',
          }}
        >
          Full-Stack Engineer
        </p>

        <div className="flex flex-col gap-2.5 w-full max-w-xs mx-auto mt-2">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleScrollToWork}
            onMouseEnter={() => playClickSound('hover')}
            className="w-full py-2.5 text-[#050816] font-accent font-extrabold text-[9.5px] uppercase tracking-widest rounded cursor-pointer"
            style={{
              backgroundColor: getSolidAccentColor(accentColor),
            }}
          >
            Explore My Work
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownloadCVClick}
            onMouseEnter={() => playClickSound('hover')}
            className="w-full py-2.5 bg-transparent border text-[9.5px] font-accent font-extrabold uppercase tracking-widest rounded flex items-center justify-center gap-2 group cursor-pointer transition-all"
            style={{
              borderColor: getSolidAccentColor(accentColor),
              color: getSolidAccentColor(accentColor),
            }}
          >
            <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            <span>Download CV</span>
          </motion.button>
        </div>

        <div className="pt-2 text-left max-w-xs mx-auto min-h-[55px] relative overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeSubtextIndex === 0 ? (
              <motion.div 
                key="problem-solver-mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex gap-2.5 items-start w-full"
              >
                <span 
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" 
                  style={{ backgroundColor: getAccentHex(accentColor) }}
                />
                <div>
                  <h4 className="font-accent font-bold text-white text-[12px]">Problem Solver</h4>
                  <p className="font-mono text-[10px] text-[#8A9BC4]">Engineering solutions from first principles.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="systems-builder-mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex gap-2.5 items-start w-full"
              >
                <span 
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" 
                  style={{ backgroundColor: getAccentHex(accentColor) }}
                />
                <div>
                  <h4 className="font-accent font-bold text-white text-[12px]">Systems Builder</h4>
                  <p className="font-mono text-[10px] text-[#8A9BC4]">From architecture to production deployment.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="w-full space-y-4 px-2 mt-4 pb-12"
      >
        <h2 className="text-white text-lg font-display font-black leading-tight uppercase">
          Building Intelligent <span className={textAccentClass}>Systems</span>
        </h2>
        <p className="font-mono text-[11px] text-[#CAD5EE] max-w-sm mx-auto leading-relaxed">
          Scalable platforms, AI automation, and software that solves complex problems.
        </p>

        <div className="flex items-center justify-center gap-2 pt-1">
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
          <span className="font-mono text-[10px] font-bold text-[#8A9BC4] uppercase tracking-wider">
            {availabilityStatus === 'busy' ? 'Busy building systems' : 'Available for work'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
