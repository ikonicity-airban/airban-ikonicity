import { getAccentHex } from '../../utils';

interface OperationalExcellenceProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function OperationalExcellence({ accentColor }: OperationalExcellenceProps) {
  const accentHex = getAccentHex(accentColor);

  return (
    <div className="relative w-full aspect-video md:aspect-auto md:h-full min-h-[190px] rounded-2xl bg-gradient-to-br from-[#0c1435] via-[#080d21] to-[#040816] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.12)] flex flex-col justify-between p-6 overflow-hidden transition-all hover:border-white/20">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ backgroundColor: `${accentHex}03` }}
      />
      <div className="absolute top-3 left-4 font-mono text-[8px] text-[#8A9BC4] flex items-center gap-1.5 tracking-wider uppercase">
        <span 
          className="w-1.5 h-1.5 rounded-full animate-ping" 
          style={{ backgroundColor: accentHex }}
        />
        DAILY CAPABILITY // SYSTEMS
      </div>
      
      <svg 
        className="w-20 h-20 opacity-30 absolute right-3 bottom-3" 
        viewBox="0 0 200 200"
        style={{ color: accentHex }}
      >
        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" fill="none" />
        <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        <line x1="100" y1="15" x2="100" y2="185" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="15" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="100" y1="100" x2="160" y2="40" stroke="currentColor" strokeWidth="1.5" className="origin-center animate-[spin_4s_linear_infinite]" />
      </svg>
      
      <div className="text-left font-mono text-[9px] text-[#8A9BC4] space-y-1.5 w-full relative z-10 pl-1 mt-6">
        <span className="block text-white font-bold tracking-widest uppercase text-[10.5px]">OPERATIONAL EXCELLENCE</span>
        <span className="block text-[10px] text-white mt-1.5 select-none leading-relaxed font-sans">
          Mastering the core **know-how** of complex computing. Maintaining maximum uptime, hard infrastructure resilience, rapid bug isolation, and clean architecture propagation across production nodes.
        </span>
        <span className="block text-slate-500 font-mono text-[7.5px] pt-1.5">GEO: 6.8561° N, 7.3958° E · UPTIME: 100%</span>
      </div>
    </div>
  );
}
