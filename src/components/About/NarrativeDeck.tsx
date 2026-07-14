import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../../data';
import { getAccentTextClass, getAccentBorderClass, getAccentHex } from '../../utils';
// @ts-ignore
import cyborgImage from '../../assets/images/cyborg_transparent_bg_1779450788220.png';

interface NarrativeDeckProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function NarrativeDeck({ accentColor }: NarrativeDeckProps) {
  const [isInView, setIsInView] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [, setRandomTick] = useState(0);

  const accentTextClass = getAccentTextClass(accentColor);
  const accentBorderClass = getAccentBorderClass(accentColor);

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
      // Force scrambler re-renders
      setRandomTick(t => t + 1);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isInView, totalLength]);

  const getRenderParts = (index: number) => {
    const text = segments[index];
    const startOffset = cumulativeLengths[index];
    const progressInSegment = globalProgress - startOffset;

    if (progressInSegment <= 0) {
      return { revealed: "", scrambled: "" };
    }

    const revealedLength = Math.min(text.length, progressInSegment);
    const revealed = text.slice(0, revealedLength);

    const scrambleChars = "✕▢▰▱▲▼○●✦✧░▒▓█▄▀■";
    const scrambleCount = Math.min(index === 0 ? 3 : 2, text.length - revealedLength);
    const scrambled = Array.from({ length: scrambleCount }, () => 
      scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
    ).join("");

    return { revealed, scrambled };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      onViewportEnter={() => setIsInView(true)}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="p-6 sm:p-8 rounded-2xl bg-[#0a0f26] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.12)] relative overflow-hidden flex flex-col justify-between space-y-6 h-full"
    >
      <div className="space-y-6">
        <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${accentTextClass} block`}>
          &gt;_ SECTOR_001 // NARRATIVE DECK
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight leading-none text-white uppercase text-left">
          The Journey of Eban Godwin Ikoni
        </h2>

        {/* Narrative Split Grid: Paragraphs + Cyborg Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 text-xs sm:text-sm text-[#8A9BC4] space-y-4 font-normal leading-relaxed text-left">
            {paragraphs.map((_, index) => {
              const { revealed, scrambled } = getRenderParts(index);
              return (
                <p 
                  key={index} 
                  className={index === 0 ? `text-white font-bold text-sm sm:text-base border-l-2 pl-3.5 ${accentBorderClass}` : ""}
                >
                  <span>{revealed}</span>
                  <span className={`${accentTextClass} font-mono tracking-wider ml-0.5`}>
                    {scrambled}
                  </span>
                </p>
              );
            })}
          </div>

          <div className="md:col-span-4 flex justify-center items-center relative">
            <div className="relative w-full max-w-[200px] md:max-w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-[#060812] flex items-center justify-center p-4 group shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/30" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/30" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/30" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/30" />
              
              {/* Background scanning laser line */}
              <motion.div 
                className="absolute left-0 right-0 h-[2px] pointer-events-none z-10" 
                style={{ 
                  backgroundColor: getAccentHex(accentColor),
                  boxShadow: `0 0 10px ${getAccentHex(accentColor)}, 0 0 20px ${getAccentHex(accentColor)}`
                }}
                animate={{
                  top: ["5%", "95%", "5%"]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Grid backdrop details */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />

              <img 
                src={cyborgImage} 
                alt="Cybernetic Augmentation Interface" 
                className="h-full w-auto object-contain z-0 transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none brightness-[1.05] contrast-[1.05]"
                style={{
                  filter: `drop-shadow(0 0 15px ${getAccentHex(accentColor)}40)`
                }}
                referrerPolicy="no-referrer"
              />
              
              {/* Cybernetic HUD overlay */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[7px] text-[#5c6370] tracking-wider uppercase select-none pointer-events-none">
                <span>SYSTEM_SYNC_OK</span>
                <span>HUD_AV_001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-4 mt-4 text-left">
        <blockquote className={`italic border-l-2 ${accentBorderClass} pl-4 text-white text-xs sm:text-sm font-mono tracking-wide py-2 bg-white/[0.01] rounded-r-xl`}>
          "
          {(() => {
            const { revealed, scrambled } = getRenderParts(paragraphs.length);
            return (
              <>
                <span>{revealed}</span>
                <span className={`${accentTextClass} ml-0.5`}>{scrambled}</span>
              </>
            );
          })()}
          "
        </blockquote>
      </div>
    </motion.div>
  );
}
