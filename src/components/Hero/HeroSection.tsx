import { useEffect, useState, memo } from 'react';
import { motion } from 'motion/react';
// @ts-ignore
import robotAvatar from '../../assets/images/hero-avatar.png';
import { handleDownloadCV, playClickSound, getAccentHex, getAccentTextClass } from '../../utils';
import HeroTitle from './HeroTitle';
import HeroParticles from './HeroParticles';
import HeroDesktopLeft from './HeroDesktopLeft';
import HeroDesktopRight from './HeroDesktopRight';
import HeroMobileContent from './HeroMobileContent';
import HeroStatsBar from './HeroStatsBar';
import HeroShowreelModal from './HeroShowreelModal';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface HeroSectionProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
  videoUrl: string;
  heroBgVideoUrl?: string;
  availabilityStatus?: string;
  isMuted?: boolean;
  onDownloadCVClick?: () => void;
  isBooting?: boolean;
}

function HeroSection({ accentColor, videoUrl, availabilityStatus, onDownloadCVClick, isBooting = false }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);
  const [showShowreel, setShowShowreel] = useState(false);
  const [activeSubtextIndex, setActiveSubtextIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isBooting) return;
    const timer = setInterval(() => {
      setActiveSubtextIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, [isBooting]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryColorHex = getAccentHex(accentColor);
  const textAccentClass = getAccentTextClass(accentColor);
  
  const charParallaxY = scrollY * 0.15;
  const colOpacity = Math.max(0, 1 - scrollY * 0.003);
  const gridParallaxTranslateY = -scrollY * 0.12;

  const handleScrollToWork = () => {
    playClickSound('click');
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCVClick = () => {
    playClickSound('success');
    if (onDownloadCVClick) {
      onDownloadCVClick();
    } else {
      handleDownloadCV();
    }
  };

  if (isBooting) {
    return <div id="home" className="min-h-screen bg-[#050816] w-full relative z-30" />;
  }

  return (
    <section 
      id="home"
      className="relative z-30 min-h-screen w-full bg-[#050816] overflow-visible flex flex-col justify-between"
      style={{ contentVisibility: 'auto' }}
    >
      <HeroTitle scrollY={scrollY} isMobile={isMobile} primaryColorHex={primaryColorHex} accentColor={accentColor} />

      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.025] mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <HeroParticles accentColor={accentColor} />

      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[60vw] max-w-[800px] aspect-square rounded-full pointer-events-none z-0 filter blur-[120px]"
        style={{ background: `radial-gradient(circle, ${primaryColorHex}12 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-[10%] right-[20%] w-[45vw] aspect-square rounded-full pointer-events-none z-0 filter blur-[90px]"
        style={{ background: `radial-gradient(circle, ${primaryColorHex}0d 0%, transparent 65%)` }}
      />

      <div 
        className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none overflow-hidden z-0 hidden md:block"
        style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
      >
        <div 
          className="w-full h-[200%] origin-bottom transition-transform duration-75"
          style={{
            backgroundImage: `linear-gradient(to right, ${primaryColorHex}0d 1px, transparent 1px),
                              linear-gradient(to bottom, ${primaryColorHex}0d 1px, transparent 1px)`,
            backgroundSize: '45px 45px',
            transform: `rotateX(68deg) scale(1.6) translateY(${gridParallaxTranslateY}px)`,
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      <div className="hidden md:block w-full max-w-7xl mx-auto px-6 relative min-h-screen z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.95, delay: 0.15 }}
          className="hero-avatar pointer-events-auto"
          style={{
            transform: `translateX(-50%) translateY(${charParallaxY}px)`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
          }}
        >
          <img 
            src={robotAvatar} 
            alt="Eban Godwin Ikoni Character Portrait"
            referrerPolicy="no-referrer"
            loading="eager"
            className="h-full w-auto object-contain brightness-[1.08] contrast-[1.03] filter saturate-[0.95]"
          />
        </motion.div>

        <HeroDesktopLeft 
          colOpacity={colOpacity} 
          textAccentClass={textAccentClass} 
          activeSubtextIndex={activeSubtextIndex} 
          accentColor={accentColor} 
        />

        <HeroDesktopRight 
          colOpacity={colOpacity} 
          textAccentClass={textAccentClass} 
          accentColor={accentColor} 
          handleScrollToWork={handleScrollToWork} 
          handleDownloadCVClick={handleDownloadCVClick} 
          availabilityStatus={availabilityStatus} 
        />
      </div>

      <HeroMobileContent 
        containerVariants={containerVariants} 
        itemVariants={itemVariants} 
        scrollY={scrollY} 
        robotAvatar={robotAvatar} 
        accentColor={accentColor} 
        handleScrollToWork={handleScrollToWork} 
        handleDownloadCVClick={handleDownloadCVClick} 
        activeSubtextIndex={activeSubtextIndex} 
        textAccentClass={textAccentClass} 
        availabilityStatus={availabilityStatus} 
      />

      <HeroStatsBar accentColor={accentColor} />

      <HeroShowreelModal 
        showShowreel={showShowreel} 
        setShowShowreel={setShowShowreel} 
        videoUrl={videoUrl} 
        accentColor={accentColor} 
      />
    </section>
  );
}

export default memo(HeroSection);
