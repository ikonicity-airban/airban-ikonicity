import { motion } from 'motion/react';
import { MapPin, ExternalLink } from 'lucide-react';
import { getAccentHex } from '../../utils';

interface TimelineEntry {
  id: string;
  company: string;
  period: string;
  type: string;
  location: string;
  role: string;
  isActive: boolean;
  responsibilities: string[];
  note?: string;
  stack?: string[];
  outcome?: string;
  highlight?: string;
  link?: { label: string; url: string };
  projects?: { name: string; url: string }[];
}

interface WorkExperienceCardProps {
  entry: TimelineEntry;
  index: number;
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
  accentTextClass: string;
  accentBorderClass: string;
  pingColorClass: string;
  dotColorClass: string;
}

export default function WorkExperienceCard({
  entry,
  index,
  accentColor,
  accentTextClass,
  accentBorderClass,
  pingColorClass,
  dotColorClass
}: WorkExperienceCardProps) {
  const isEven = index % 2 === 0;
  const isCurrent = entry.isActive;

  const getViaColorClass = (color: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow') => {
    switch (color) {
      case 'green': return 'via-[#39FF14]';
      case 'cyan': return 'via-[#00D4FF]';
      case 'pink': return 'via-[#FF007F]';
      case 'purple': return 'via-[#BD00FF]';
      case 'yellow': return 'via-[#FFE600]';
      default: return 'via-[#39FF14]';
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row md:justify-between items-stretch">
      
      {/* Glowing Node Dot Anchor */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-8 z-10">
        <div className="relative flex items-center justify-center">
          {isCurrent && (
            <span className={`absolute inline-flex h-6 w-6 rounded-full ${pingColorClass} opacity-30 animate-ping`} />
          )}
          <span className={`w-3.5 h-3.5 rounded-full border-2 border-[#050816] ${dotColorClass}`} />
        </div>
      </div>

      {/* Left Side Column */}
      <div className={`w-full md:w-[45%] pl-9 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-2'}`}>
        <motion.div 
          className="pt-2"
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Monospace tag detailing index */}
          <span className="block text-[10px] font-mono text-slate-500 mb-1.5 font-bold">
            // EXP_ENTRY_{entry.id}
          </span>
          
          {/* Company Name */}
          <h3 className="text-xl font-display font-black text-white uppercase tracking-wider mb-2">
            {entry.company}
          </h3>

          {/* Period, Type & Location list */}
          <div className={`flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] font-mono text-[#8A9BC4] ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-bold tracking-wide shrink-0">
                {entry.period}
              </span>
              <span>·</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] whitespace-nowrap">
                {entry.type}
              </span>
            </div>
            {entry.location && (
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="hidden sm:inline">·</span>
                <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                <span>{entry.location}</span>
              </div>
            )}
          </div>

          {entry.note && (
            <p 
              className={`mt-4 text-[11px] leading-relaxed italic text-[#8A9BC4] border-l-2 pl-3.5 ${isEven ? 'md:border-r-2 md:border-l-0 md:pr-3.5 md:pl-0' : ''} py-1 bg-white/[0.01] rounded`}
              style={{ borderColor: getAccentHex(accentColor) }}
            >
              "{entry.note}"
            </p>
          )}
        </motion.div>
      </div>

      {/* Right Side Column */}
      <div className={`w-full md:w-[45%] pl-9 md:pl-0 mt-4 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <motion.div 
          className={`p-4 sm:p-6 rounded-2xl bg-[#080D1F] border border-white/5 transition-all duration-300 text-left relative ${accentBorderClass}`}
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Cyber Gradient Header bar inside card */}
          <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent ${getViaColorClass(accentColor)} to-transparent opacity-40`} />

          {/* Role Label */}
          <span className={`text-[10px] font-mono uppercase font-black ${accentTextClass} tracking-widest block mb-2`}>
            {entry.role}
          </span>

          {/* Responsibilities list */}
          <ul className="space-y-2.5 mt-3">
            {entry.responsibilities.map((resp, i) => (
              <li key={i} className="text-xs text-[#8A9BC4] leading-relaxed flex items-start gap-2 font-sans font-normal">
                <span className={`text-[10px] mt-0.5 font-bold ${accentTextClass}`}>→</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>

          {/* Stacks */}
          {entry.stack && (
            <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
              <span className="block text-[8.5px] font-mono uppercase font-black tracking-widest text-[#8A9BC4]">
                SYSTEM CONFIGURATION // STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {entry.stack.map((item, i) => (
                  <span key={i} className="text-[9.5px] font-mono py-0.5 px-2 rounded-md bg-[#050816] border border-white/5 text-[#F0F4FF]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Outcomes or Highlights */}
          {entry.outcome && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/[0.03] border border-red-500/10 text-[10.5px] leading-relaxed font-mono text-[#8A9BC4]">
              <span className="block font-bold text-red-400 text-[9px] uppercase mb-0.5">// OUTCOME</span>
              {entry.outcome}
            </div>
          )}

          {entry.highlight && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-500/[0.03] border border-emerald-500/10 text-[10.5px] leading-relaxed font-mono text-[#8A9BC4]">
              <span className="block font-bold text-emerald-400 text-[9px] uppercase mb-0.5">// HIGHLIGHT</span>
              {entry.highlight}
            </div>
          )}

          {/* External Links */}
          {entry.link && (
            <div className="mt-4 flex justify-end">
              <a 
                href={entry.link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider hover:underline text-white font-bold"
              >
                <span>DEPLOYMENT // {entry.link.label.toUpperCase()}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          )}

          {/* Sub projects */}
          {entry.projects && (
            <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
              <span className="block text-[8.5px] font-mono uppercase font-black tracking-widest text-[#8A9BC4]">
                DEPLOYED PIPELINES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {entry.projects.map((proj, i) => (
                  <a 
                    key={i}
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-[#050816] border border-white/5 hover:border-white/20 transition-colors font-mono text-[10px] text-[#F0F4FF] font-bold"
                  >
                    <span>{proj.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>

    </div>
  );
}
export type { TimelineEntry };
