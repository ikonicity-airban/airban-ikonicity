import { portfolioData } from '../../data';
import { getAccentHex } from '../../utils';

interface ActivePursuitsProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function ActivePursuits({ accentColor }: ActivePursuitsProps) {
  return (
    <div className="hidden md:flex p-6 rounded-2xl bg-[#0a0f26] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.12)] space-y-4 hover:border-white/20 transition-all duration-300 flex-col justify-between h-full min-h-[200px]">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <span 
          className="w-2 h-2 rounded-full inline-block animate-pulse" 
          style={{ backgroundColor: getAccentHex(accentColor) }} 
        />
        <h3 className="text-xs font-black tracking-widest text-white uppercase font-mono">
          ACTIVE PURSUITS // ENGAGEMENT DIAL
        </h3>
      </div>
      
      <div className="space-y-3.5 text-xs font-mono">
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
  );
}
