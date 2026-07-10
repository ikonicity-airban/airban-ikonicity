import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../../data';
import { getAccentTextClass, getAccentBorderClass } from '../../utils';

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

        {/* Narrative Paragraphs with Unified Text Scramble Sweeps */}
        <div className="text-xs sm:text-sm text-[#8A9BC4] space-y-4 font-normal leading-relaxed text-left">
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
