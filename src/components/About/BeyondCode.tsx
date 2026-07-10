import { portfolioData } from '../../data';
import { getAccentHex } from '../../utils';

interface BeyondCodeProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function BeyondCode({ accentColor }: BeyondCodeProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#0a0f26]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.12)] flex flex-col justify-between hover:border-white/20 transition-all duration-300 min-h-[190px]">
      <div>
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ backgroundColor: getAccentHex(accentColor) }} />
          <h3 className="text-xs font-black tracking-widest text-white uppercase font-mono">
            BEYOND CODE // COMPOSITION
          </h3>
        </div>
        <div className="text-[11px] leading-relaxed text-[#8A9BC4] font-sans mt-3">
          {(portfolioData as any).beyondCode}
        </div>
      </div>
      <div className="text-[8px] text-slate-500 font-mono mt-3 uppercase tracking-wider">// PERSISTENT FOCUS OUTSIDE CODE</div>
    </div>
  );
}
