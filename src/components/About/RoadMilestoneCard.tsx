import { motion, useTransform } from 'motion/react';
import { portfolioData } from '../../data';
import { playClickSound, getAccentHex } from '../../utils';

interface RoadMilestoneCardProps {
  node: typeof portfolioData.timelineData[0];
  index: number;
  scrollYProgress: any;
  isMobile: boolean;
  step: number;
  N: number;
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
  accentTextClass: string;
  accentBorderClass: string;
}

function sanitizeInputRange(arr: number[]): number[] {
  const clamped = arr.map(v => Math.max(0, Math.min(1, v)));
  for (let i = 1; i < clamped.length; i++) {
    if (clamped[i] <= clamped[i - 1]) {
      clamped[i] = clamped[i - 1] + 0.0001;
    }
  }
  if (clamped[clamped.length - 1] > 1) {
    clamped[clamped.length - 1] = 1;
    for (let i = clamped.length - 2; i >= 0; i--) {
      if (clamped[i] >= clamped[i + 1]) {
        clamped[i] = clamped[i + 1] - 0.0001;
      }
    }
  }
  return clamped;
}

export default function RoadMilestoneCard({ 
  node, 
  index, 
  scrollYProgress, 
  isMobile, 
  step, 
  N, 
  accentColor, 
  accentTextClass, 
  accentBorderClass 
}: RoadMilestoneCardProps) {
  const center = 0.05 + index * step;
  
  const z = useTransform(
    scrollYProgress,
    sanitizeInputRange([
      center - 0.45 * step,
      center - 0.15 * step,
      center + 0.15 * step,
      center + 0.45 * step
    ]),
    [-1200, -200, 400, 1500],
    { clamp: true }
  );

  const opacity = useTransform(
    scrollYProgress,
    sanitizeInputRange([
      center - 0.45 * step,
      center - 0.25 * step,
      center + 0.15 * step,
      center + 0.42 * step
    ]),
    [0.0, 1.0, 1.0, 0.0],
    { clamp: true }
  );

  const scale = useTransform(
    scrollYProgress,
    sanitizeInputRange([
      center - 0.45 * step,
      center - 0.15 * step,
      center + 0.20 * step,
      center + 0.45 * step
    ]),
    [0.15, 1.0, 1.6, 2.5],
    { clamp: true }
  );

  const x = useTransform(
    scrollYProgress,
    sanitizeInputRange([center - 0.5 * step, center, center + 0.5 * step]),
    [0, 0, 0],
    { clamp: true }
  );

  const yVal = isMobile ? -50 : -80;
  
  const y = useTransform(
    z,
    [-1200, -200, 400, 1500],
    [yVal - 100, yVal, yVal + 60, yVal + 170]
  );

  const primaryAccentHex = getAccentHex(accentColor);
  
  return (
    <motion.div
      style={{
        opacity,
        scale,
        x,
        y,
        z,
        transformStyle: 'preserve-3d',
      }}
      className="absolute h-fit w-[280px] md:w-[350px] pointer-events-auto select-none"
    >
      <div 
        onClick={() => playClickSound('click')}
        onMouseEnter={() => playClickSound('hover')}
        className={`p-5 rounded-2xl bg-[#050918]/98 backdrop-blur-xl border transition-all duration-300 relative overflow-hidden cursor-pointer hover:border-white/35 active:scale-[0.99] select-none ${accentBorderClass} border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.95),inset_0_1px_4px_rgba(255,255,255,0.2)]`}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded bg-white/5 border border-white/10 text-white leading-none">
              {node.period}
            </span>
            <span className="text-[8px] font-mono tracking-widest text-[#8A9BC4] uppercase">
              // ROAD_NODE_0{index + 1}
            </span>
          </div>
          <span className="text-[8px] font-mono tracking-wider text-slate-500 uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            LIVE
          </span>
        </div>

        <h3 className="text-sm md:text-base font-display font-black text-white uppercase tracking-tight leading-tight mb-1">
          {node.role}
        </h3>

        <div className={`font-mono text-[10px] font-black uppercase tracking-wider ${accentTextClass}`}>
          {node.company}
        </div>

        <p className="text-[10px] md:text-xs text-[#8A9BC4] leading-relaxed mt-4 font-sans font-normal border-t border-dashed border-white/5 pt-3.5">
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

        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
          style={{
            background: `linear-gradient(to right, transparent, ${primaryAccentHex}, transparent)`,
            boxShadow: `0 0 10px ${primaryAccentHex}`
          }}
        />
      </div>
    </motion.div>
  );
}
