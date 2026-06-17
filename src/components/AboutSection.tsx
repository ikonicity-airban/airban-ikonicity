import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data';
import { playClickSound, getAccentHex, getAccentTextClass, getAccentBorderClass } from '../utils';

interface AboutSectionProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

interface RoadmapCardProps {
  node: typeof portfolioData.timelineData[0];
  index: number;
  isEven: boolean;
  borderAccentClass: string;
  accentTextClass: string;
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

function RoadmapCard({ node, index, isEven, borderAccentClass, accentTextClass, accentColor }: RoadmapCardProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of each specific Roadmap item relative to the viewport
  // to drive the beautiful "driving past things on the road" optical flow scaling & fade perspective
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "center center", "end start"]
  });

  // Transform coordinates to simulate a driving road camera perspective:
  // 1. As it enters from the bottom (progress = 0 to 0.2): It moves in slightly scaled down and faded.
  // 2. As it passes through focus zone (progress = 0.2 to 0.6): It is fully focused, flat, and scale 1.
  // 3. As we drive past it (progress = 0.6 to 1): It recedes, scaling down to 60%, tilting in 3D (-25deg rotateX), and receding up/behind (-150px y-translate)
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.65, 0.95], [0.88, 1, 0.82, 0.62]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.65, 0.95], [100, 0, -60, -220]);
  const rotateX = useTransform(scrollYProgress, [0, 0.18, 0.65, 0.95], [10, 0, -12, -28]);

  const primaryAccentHex = getAccentHex(accentColor);
  const nodeGlowRgba = accentColor === 'green' ? 'rgba(57, 255, 20, 0.6)' :
                       accentColor === 'cyan' ? 'rgba(0, 212, 255, 0.6)' :
                       accentColor === 'pink' ? 'rgba(255, 0, 127, 0.6)' :
                       accentColor === 'purple' ? 'rgba(189, 0, 255, 0.6)' :
                       'rgba(255, 230, 0, 0.6)';

  return (
    <div ref={elementRef} className="relative group text-left my-8" style={{ perspective: '1200px' }}>
      <motion.div
        style={{
          opacity,
          scale,
          y,
          rotateX,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full"
      >
        {/* Visual Node line anchor point */}
        <span 
          className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#050816] z-10 transition-all duration-300 group-hover:scale-125"
          style={{
            backgroundColor: primaryAccentHex,
            borderColor: primaryAccentHex,
            boxShadow: `0 0 15px ${nodeGlowRgba}`
          }}
        />

        {/* Card wrapper */}
        <div 
          onClick={() => playClickSound('click')}
          onMouseEnter={() => playClickSound('hover')}
          className={`p-6 rounded-2xl bg-[#080D1F]/50 backdrop-blur-md border transition-all duration-300 max-w-4xl relative overflow-hidden active:scale-[0.99] cursor-pointer hover:border-white/20 select-none ${borderAccentClass}`}
        >
          
          {/* Corner accent glow on hover */}
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-white/[0.01] to-transparent pointer-events-none group-hover:from-white/[0.03] transition-colors" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded bg-white/5 border border-white/10 text-white leading-none">
                {node.period}
              </span>
              
              <span className="text-[8px] font-mono tracking-widest text-[#8A9BC4] uppercase">
                // ROADMAP_NODE_0{index + 1}
              </span>
            </div>
            
            <span className="text-[8px] font-mono tracking-wider text-slate-500 uppercase">
              SECURE_RUN_OK ✓
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-tight leading-tight mb-1">
            {node.role}
          </h3>

          <span className={`font-mono text-xs font-black uppercase tracking-wider ${accentTextClass}`}>
            {node.company}
          </span>

          <p className="text-xs sm:text-sm text-[#8A9BC4] leading-relaxed mt-4 font-sans font-normal">
            {index === 0 && "Acquired basic framework and architectural patterns across signal logic, operational systems, and network communication block modules."}
            {index === 1 && "Configured digital communication terminals, handled custom remote server nodes, automated file delivery routines, and managed secure data processing."}
            {index === 2 && "Wrote initial technical modules. Graduated directly from fundamental procedural execution setups to rich modern reactive programming flows."}
            {index === 3 && "Engineered clean responsive frontpage UI layouts, decoupled state machines, and designed fluid web flows with optimized performance."}
            {index === 4 && "Built high-performance user grids and customized retrieval setups to interface robustly with RabbAi cognitive tutoring agents."}
            {index === 5 && "Supervised full product life cycles. Led engineering deployments, engineered high-density Telegram integrations and secure WhatsApp CRM communication pipes."}
            {index === 6 && "Optimized audio playing elements, eliminated platform sound memory leaks, and refined database querying systems inside a 70,000+ user application."}
            {index === 7 && "Shipped automation backends to compile role-based workflow applications and resolved memory constraints on cloud instances."}
            {index === 8 && "Spearheading modern engineering tasks. Shifting print-on-demand custom editors towards streamlined Shopify pipelines and container deployments."}
          </p>

        </div>
      </motion.div>
    </div>
  );
}

export default function AboutSection({ accentColor }: AboutSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [, setRandomTick] = useState(0);

  const [activePillar, setActivePillar] = useState(0);

  // Autonomous continuous loop for Philosophy Pillars carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % portfolioData.philosophyPillars.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activePillar]);

  const pillarsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pillarScroll } = useScroll({
    target: pillarsRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Map vertical scroll of the philosophies card container to horizontal translation (right to left)
  const xTrack = useTransform(pillarScroll, [0, 0.85], [120, -360]);

  const accentTextClass = getAccentTextClass(accentColor);
  const accentBorderClass = getAccentBorderClass(accentColor);

  // Concat all texts to design a single integrated animation stream
  const paragraphs = portfolioData.aboutNarrative;
  const quote = portfolioData.pullQuote;
  const segments = [...paragraphs, quote];
  
  // Pre-calculate cumulative lengths
  const segmentLengths = segments.map(s => s.length);
  const cumulativeLengths: number[] = [];
  let currentSum = 0;
  for (const len of segmentLengths) {
    cumulativeLengths.push(currentSum);
    currentSum += len;
  }
  const totalLength = currentSum;

  useEffect(() => {
    if (!isInView) return;

    const charsPerTick = 7; // Speed of decryption
    const intervalTime = 16; // 60fps update matching
    
    const interval = setInterval(() => {
      setGlobalProgress(prev => {
        if (prev >= totalLength + 15) {
          clearInterval(interval);
          return totalLength + 15;
        }
        return prev + charsPerTick;
      });
      // Force scrambler re-renders on trailing edge
      setRandomTick(t => t + 1);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isInView, totalLength]);

  // Helper to slice paragraph stream correctly based on global progress meter
  const getRenderParts = (index: number) => {
    const text = segments[index];
    const startOffset = cumulativeLengths[index];
    const progressInSegment = globalProgress - startOffset;

    if (progressInSegment <= 0) {
      return { revealed: "", scrambled: "" };
    }

    const revealedLength = Math.min(text.length, progressInSegment);
    const revealed = text.slice(0, revealedLength);

    // Matrix glitch glyph symbols
    const scrambleChars = "✕▢▰▱▲▼○●✦✧░▒▓█▄▀■";
    const scrambleCount = Math.min(index === 0 ? 3 : 2, text.length - revealedLength);
    const scrambled = Array.from({ length: scrambleCount }, () => 
      scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
    ).join("");

    return { revealed, scrambled };
  };

  return (
    <section id="about" className="py-20 border-t border-white/5 relative z-10 bg-[#050816]">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        onViewportEnter={() => setIsInView(true)}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        
        {/* Narratives Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          <div className="lg:col-span-7 space-y-6">
            <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${accentTextClass}`}>
              &gt;_ SECTOR_001 // NARRATIVE DECK
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-black tracking-tight leading-none text-white uppercase">
              The Journey of Eban Godwin Ikoni
            </h2>

            {/* Narrative Paragraphs with Unified Text Scramble Sweeps */}
            <div className="text-xs sm:text-sm text-[#8A9BC4] space-y-4 font-normal leading-relaxed">
              {paragraphs.map((_, index) => {
                const { revealed, scrambled } = getRenderParts(index);
                return (
                  <p 
                    key={index} 
                    className={index === 0 ? `text-white font-bold text-sm sm:text-base border-l-2 pl-3.5 ${getAccentBorderClass(accentColor)}` : ""}
                  >
                    <span>{revealed}</span>
                    <span className={`${getAccentTextClass(accentColor)} font-mono tracking-wider ml-0.5`}>
                      {scrambled}
                    </span>
                  </p>
                );
              })}
              
              <div className="border-t border-white/5 pt-4">
                <blockquote className={`italic border-l-2 ${getAccentBorderClass(accentColor)} pl-4 text-white text-xs sm:text-sm font-mono tracking-wide py-1 bg-white/[0.01] rounded-r-xl`}>
                  "
                  {(() => {
                    const { revealed, scrambled } = getRenderParts(paragraphs.length);
                    return (
                      <>
                        <span>{revealed}</span>
                        <span className={`${getAccentTextClass(accentColor)} ml-0.5`}>{scrambled}</span>
                      </>
                    );
                  })()}
                  "
                </blockquote>
              </div>
            </div>
          </div>

          {/* Philosophy Pillars */}
          <div className="lg:col-span-5 relative py-6 flex flex-col gap-6">
            <div 
              ref={pillarsRef}
              className={`p-5 rounded-2xl bg-[#080D1F] border border-white/5 flex flex-col justify-between transition-all group overflow-hidden min-h-[220px] hover:border-current`}
              style={{ color: getAccentHex(accentColor) }}
            >
              <div>
                <span className={`text-[9px] font-mono font-black ${accentTextClass} tracking-widest uppercase mb-1`}>[ SYSTEM PHILOSOPHIES ]</span>
                <h3 className="text-sm font-display font-black text-white tracking-wider mb-4 uppercase">Three Philosophy Pillars</h3>
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
                      style={{ color: isActive ? getAccentHex(accentColor) : undefined }}
                      aria-label={`Go to philosophy pillar ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Nsukka Tracker Radar Visual */}
            <div className="relative w-full aspect-video rounded-2xl bg-[#080D1F] border border-white/5 flex flex-col items-center justify-center p-6 overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ backgroundColor: `${getAccentHex(accentColor)}03` }}
              />
              <div className="absolute top-2 left-3 font-mono text-[7px] text-[#8A9BC4] flex items-center gap-1.5">
                <span 
                  className="w-1.5 h-1.5 rounded-full animate-ping" 
                  style={{ backgroundColor: getAccentHex(accentColor) }}
                />
                LAGOS_NSUKKA_LINK: STABLE
              </div>
              
              <svg 
                className="w-24 h-24 opacity-50 absolute right-4 bottom-4" 
                viewBox="0 0 200 200"
                style={{ color: getAccentHex(accentColor) }}
              >
                <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" fill="none" />
                <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                <line x1="100" y1="15" x2="100" y2="185" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="15" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="100" y1="100" x2="160" y2="40" stroke="currentColor" strokeWidth="1.5" className="origin-center animate-[spin_4s_linear_infinite]" />
              </svg>
              
              <div className="text-left font-mono text-[9px] text-[#8A9BC4] space-y-1 w-full relative z-10 pl-2">
                <span className="block text-white font-bold tracking-widest uppercase text-xs">SOLVE COMPLEX ISSUES</span>
                <span className="block text-[10px] text-white mt-1">"Solve the complex problems no one wants to face. Then teach others how."</span>
                <span className="block text-slate-500 font-mono text-[8px] mt-2">GEO: 6.8561° N, 7.3958° E - Nsukka · UPTIME: 100%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Status Dashboard Terminal Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12 pt-12 border-t border-white/5 text-left font-mono">
          
          {/* Left panel: Currently Status */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-[#080D1F] border border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ backgroundColor: getAccentHex(accentColor) }} />
              <h3 className="text-xs font-black tracking-widest text-white uppercase">
                ACTIVE PURSUITS // ENGAGEMENT DIAL
              </h3>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-extrabold">&gt;_ BUILDING</span>
                <span className="col-span-2 text-white font-bold">{(portfolioData as any).currently?.building}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-extrabold">&gt;_ MAINTAINING</span>
                <span className="col-span-2 text-white font-bold">{(portfolioData as any).currently?.maintaining}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-extrabold">&gt;_ CONSULTING</span>
                <span className="col-span-2 text-white font-bold">{(portfolioData as any).currently?.consulting}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-extrabold">&gt;_ OPEN TO</span>
                <span className="col-span-2 text-[#8A9BC4]">{(portfolioData as any).currently?.openTo}</span>
              </div>
            </div>
          </div>

          {/* Center panel: What I Don't Build */}
          <div className="md:col-span-3 p-6 rounded-2xl bg-[#080D1F] border border-white/5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                <h3 className="text-xs font-black tracking-widest uppercase text-red-500">
                  BOUNDARIES // DECLINED SCOPE
                </h3>
              </div>
              <div className="text-[11px] leading-relaxed text-[#8A9BC4] uppercase font-mono">
                {(portfolioData as any).whatIDontBuild}
              </div>
            </div>
            <div className="text-[8px] text-red-500/60 font-black mt-4 uppercase">// SCAM / DECEPTION ESCROWS ALWAYS DISCARDED</div>
          </div>

          {/* Right panel: Beyond the Code - Personal Touch */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#080D1F] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: getAccentHex(accentColor) }} />
              <h3 className="text-xs font-black tracking-widest text-white uppercase">
                BEYOND CODE // TENOR & COMPOSITION
              </h3>
            </div>
            <div className="text-[11px] leading-relaxed text-[#8A9BC4] font-sans">
              {(portfolioData as any).beyondCode}
            </div>
          </div>

        </div>

        {/* Roadmap descending visual timeline roadmap */}
        <div className="mt-20 pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 text-left">
            <div>
              <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${accentTextClass} block mb-1`}>
                &gt;_ SECTOR_002 // HISTORICAL ROADMAP
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight leading-none font-display uppercase">
                Engineering Roadmap
              </h2>
            </div>
            <p className="text-sm text-[#8A9BC4] max-w-sm">
              A descending visual timeline capturing chronological milestones, cloud-native software shipments, and organizational growth.
            </p>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-10 pl-6 md:pl-12 space-y-6 overflow-visible pb-12">
            
            {/* Glowing background gradient line overlay */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-[1.5px] pointer-events-none" 
              style={{ background: `linear-gradient(to bottom, ${getAccentHex(accentColor)}, transparent)` }}
            />

            {portfolioData.timelineData.map((node, index) => {
              const isEven = index % 2 === 0;
              const borderAccentClass = `border-white/5 hover:${accentBorderClass}/30`;

              return (
                <RoadmapCard 
                  key={index}
                  node={node}
                  index={index}
                  isEven={isEven}
                  borderAccentClass={borderAccentClass}
                  accentTextClass={accentTextClass}
                  accentColor={accentColor}
                />
              );
            })}

          </div>
        </div>

      </motion.div>
    </section>
  );
}
