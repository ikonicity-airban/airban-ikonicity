import { portfolioData } from '../../data';
import { getAccentHex } from '../../utils';

interface BoundariesScopeProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function BoundariesScope({ accentColor }: BoundariesScopeProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#0a0f26]/95 border border-red-500/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.12)] flex flex-col justify-between hover:border-red-500/25 transition-all duration-300 min-h-[190px]">
      <div>
        <div className="flex items-center gap-2 border-b border-red-500/5 pb-3 text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block animate-pulse" />
          <h3 className="text-xs font-black tracking-widest uppercase text-red-500 font-mono">
            BOUNDARIES // DECLINED SCOPE
          </h3>
        </div>
        <div className="text-[11px] leading-relaxed text-[#8A9BC4] uppercase font-mono mt-3">
          {(portfolioData as any).whatIDontBuild}
        </div>
      </div>
      <div className="text-[8px] text-red-500/60 font-black mt-3 uppercase tracking-wider">// SCAM / ESCROWS ALWAYS DISCARDED</div>
    </div>
  );
}
