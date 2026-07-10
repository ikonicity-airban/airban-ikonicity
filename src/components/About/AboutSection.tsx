import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { portfolioData } from '../../data';
import { getAccentHex, getAccentTextClass, getAccentBorderClass } from '../../utils';
import { Gauge, Compass } from 'lucide-react';
import RoadMilestoneCard from './RoadMilestoneCard';
import NarrativeDeck from './NarrativeDeck';
import PhilosophyPillars from './PhilosophyPillars';
import ActivePursuits from './ActivePursuits';
import OperationalExcellence from './OperationalExcellence';
import BeyondCode from './BeyondCode';
import BoundariesScope from './BoundariesScope';

interface AboutSectionProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function AboutSection({ accentColor }: AboutSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const roadScrollTrackRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3D Roadmap Scrollytelling Setup
  const { scrollYProgress: roadScrollYProgress } = useScroll({
    target: roadScrollTrackRef,
    offset: ["start start", "end end"]
  });

  const roadBgY = useTransform(roadScrollYProgress, [0, 1], ["0px", "-2400px"]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const N = portfolioData.timelineData.length;
  const step = 0.90 / (N - 1);

  useMotionValueEvent(roadScrollYProgress, "change", (latestVal) => {
    let bestIndex = 0;
    let minDiff = Infinity;
    for (let i = 0; i < N; i++) {
      const center = 0.05 + i * step;
      const diff = Math.abs(latestVal - center);
      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = i;
      }
    }
    if (bestIndex !== activeCardIndex) {
      setActiveCardIndex(bestIndex);
    }
  });

  // Dynamic Speedometer scroll tracker
  useEffect(() => {
    let lastPos = window.scrollY;
    let lastT = Date.now();
    let currentSpeed = 120;
    
    const handleScroll = () => {
      const currPos = window.scrollY;
      const currT = Date.now();
      const dt = Math.max(1, currT - lastT);
      const dp = Math.abs(currPos - lastPos);
      
      const velocity = dp / dt;
      const targetSpeed = Math.min(280, 120 + Math.floor(velocity * 90));
      
      currentSpeed = Math.floor(currentSpeed + (targetSpeed - currentSpeed) * 0.15);
      if (speedRef.current) {
        speedRef.current.textContent = String(currentSpeed);
      }
      
      lastPos = currPos;
      lastT = currT;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const decay = setInterval(() => {
      if (currentSpeed > 120) {
        currentSpeed = Math.max(120, currentSpeed - 4);
        if (speedRef.current) {
          speedRef.current.textContent = String(currentSpeed);
        }
      }
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(decay);
    };
  }, []);

  const accentTextClass = getAccentTextClass(accentColor);
  const accentBorderClass = getAccentBorderClass(accentColor);

  return (
    <section id="about" className="py-20 border-t border-white/5 relative z-10 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Narratives Section & Philosophy Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          <div className="lg:col-span-7">
            <NarrativeDeck accentColor={accentColor} />
          </div>

          <div className="lg:col-span-5 relative flex flex-col gap-6">
            <PhilosophyPillars accentColor={accentColor} />
            <ActivePursuits accentColor={accentColor} />
          </div>

        </div>

        {/* Row 2: Symmetric Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <OperationalExcellence accentColor={accentColor} />
          <BeyondCode accentColor={accentColor} />
          <BoundariesScope accentColor={accentColor} />
        </div>

      </div>

      {/* Roadmap descending visual 3D Scrollytelling highway */}
      <div className="max-w-7xl mx-auto px-6 relative mt-20 pt-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${accentTextClass} block mb-1 animate-pulse`}>
              &gt;_ SECTOR_002 // HISTORICAL ROADMAP
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none font-display uppercase">
              Engineering Roadmap
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#8A9BC4] max-w-sm">
            An immersive 3D scroll-driven highway capturing chronological milestones and organizational growth. Scroll down the section to accelerate.
          </p>
        </div>

        {/* Interactive 3D Scroll Highway container wrapper */}
        <div ref={roadScrollTrackRef} id="engineering-roadmap" className="relative w-full h-[600vh]">
          
          {/* Sticky Viewport frame */}
          <div className="sticky top-[10vh] h-[75vh] md:h-[80vh] w-full rounded-2xl border border-white/10 bg-[#030510] overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-end">
            
            {/* Scanlines overlays on the visual cockpit */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,22,35,0)_97%,rgba(0,0,0,0.45)_97%)] bg-[size:100%_4px] pointer-events-none z-30 opacity-15" />
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-20" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(3,5,16,0.95) 90%)' }} style-vignette="" />

            {/* Infinite Aurora horizon glows */}
            <div 
              className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full filter blur-[100px] opacity-20 pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle, ${getAccentHex(accentColor)} 0%, transparent 70%)`
              }}
            />

            {/* 3D Camera Stage Wrapper */}
            <div 
              style={{ 
                perspective: '1000px', 
                perspectiveOrigin: '50% 35%',
                transformStyle: 'preserve-3d'
              }}
              className="relative w-full h-full flex flex-col justify-end overflow-hidden z-10"
            >
              
              {/* Simulated Tilted Road Surface Plane */}
              <motion.div
                style={{
                  transform: 'rotateX(77deg) translateZ(-160px)',
                  transformOrigin: '50% 100%',
                }}
                className="absolute bottom-0 left-[3%] right-[3%] h-[160%] overflow-hidden bg-[#05081f]/40 border-x border-[#CAD5EE]/10"
              >
                {/* Neon road grids */}
                <motion.div 
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage: `
                      linear-gradient(to bottom, ${getAccentHex(accentColor)}35 2px, transparent 2px),
                      linear-gradient(to right, ${getAccentHex(accentColor)}45 2px, transparent 2px)
                    `,
                    backgroundSize: '50px 50px',
                    backgroundPositionY: roadBgY
                  }}
                />

                {/* Horizontal light cutoff fade near coordinates */}
                <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#030510] via-[#030510]/80 to-transparent z-10" />

                {/* Glowing lane stripes on extreme edges */}
                <div 
                  className="absolute top-0 bottom-0 left-0 w-[4px]"
                  style={{
                    background: `linear-gradient(to bottom, transparent 15%, ${getAccentHex(accentColor)})`,
                    boxShadow: `0 0 25px ${getAccentHex(accentColor)}`
                  }}
                />
                <div 
                  className="absolute top-0 bottom-0 right-0 w-[4px]"
                  style={{
                    background: `linear-gradient(to bottom, transparent 15%, ${getAccentHex(accentColor)})`,
                    boxShadow: `0 0 25px ${getAccentHex(accentColor)}`
                  }}
                />

                {/* Middle highway white dashed lines */}
                <motion.div 
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[4px] z-0 opacity-90" 
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${getAccentHex(accentColor)} 0%, ${getAccentHex(accentColor)} 50%, transparent 50%, transparent 100%)`,
                    backgroundSize: '4px 60px',
                    backgroundPositionY: roadBgY
                  }}
                />
                
              </motion.div>

              {/* Vertical milestone cards layer */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible select-none">
                {portfolioData.timelineData.map((node, index) => (
                  <RoadMilestoneCard 
                    key={index}
                    node={node}
                    index={index}
                    scrollYProgress={roadScrollYProgress}
                    isMobile={isMobile}
                    step={step}
                    N={N}
                    accentColor={accentColor}
                    accentTextClass={accentTextClass}
                    accentBorderClass={`hover:${accentBorderClass}/30`}
                  />
                ))}
              </div>

            </div>

            {/* Cockpit HUD Dashboard Grid Overlays (Diagnostic telemetries) */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex items-center justify-between pointer-events-none z-20 font-mono select-none text-[10px] md:text-xs">
              
              {/* Speedometer hud panel */}
              <div className="flex items-center gap-3 bg-[#060a1f]/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 text-[#8A9BC4]">
                <Gauge className="w-4 h-4 text-emerald-400 animate-pulse" />
                <div className="text-left leading-none">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-500">VECTOR SPEED</span>
                  <span className="text-sm font-bold text-white tracking-tight">
                    <span ref={speedRef}>120</span> <span className="text-[9px] text-[#8A9BC4] font-normal">KM/H</span>
                  </span>
                </div>
              </div>

              {/* Center visual stage tracker HUD */}
              <div className="hidden lg:flex flex-col items-center gap-1.5 bg-[#060a1f]/85 backdrop-blur-md px-5 py-2 rounded-xl border border-white/5 text-slate-400">
                <div className="flex items-center gap-5">
                  {portfolioData.timelineData.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === activeCardIndex 
                          ? 'w-6' 
                          : 'w-2 bg-white/10'
                      }`}
                      style={{
                        backgroundColor: idx === activeCardIndex ? getAccentHex(accentColor) : undefined,
                        boxShadow: idx === activeCardIndex ? `0 0 10px ${getAccentHex(accentColor)}` : undefined
                      }}
                    />
                  ))}
                </div>
                <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">AUTO-STEERING CORRELATION METRIC</span>
              </div>

              {/* Location / Division locator hud panel */}
              <div className="flex items-center gap-3 bg-[#060a1f]/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 text-[#8A9BC4] text-right">
                <div className="text-right leading-none">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-500">STAGE ACTIVE YEAR</span>
                  <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-white truncate max-w-[120px] inline-block">
                    {portfolioData.timelineData[activeCardIndex]?.period || "2025"}
                  </span>
                </div>
                <Compass className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>

            {/* Dynamic Year HUD Watermark */}
            <div className="absolute top-6 left-6 font-display font-black text-white/5 text-4xl sm:text-6xl tracking-tighter select-none pointer-events-none uppercase">
              {portfolioData.timelineData[activeCardIndex]?.period.split(" ")[0]}
            </div>

            <div className="absolute top-6 right-6 font-mono text-[9px] text-slate-500 text-right select-none pointer-events-none leading-none space-y-1 hidden sm:block">
              <div>SYS.GRID: ACTIVE // 48.09 GHz</div>
              <div>AUTOPILOT: DEPLOYED (RUN_OK)</div>
              <div>DEPTH: {Math.round(roadScrollYProgress.get() * 4132)} FT</div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
