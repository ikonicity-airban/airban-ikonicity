import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Project } from '../../types';
import { playClickSound } from '../../utils';

interface ProjectBentoGridProps {
  geekCreations: Project;
  icatholicIgbo: Project;
  biddo: Project;
  accentBorderHoverClass: string;
  handleOpenDetail: (project: Project) => void;
}

export default function ProjectBentoGrid({
  geekCreations,
  icatholicIgbo,
  biddo,
  accentBorderHoverClass,
  handleOpenDetail
}: ProjectBentoGridProps) {
  const [hoveredPid, setHoveredPid] = useState<string | null>(null);

  const renderStatus = (statusStr: string) => {
    const isLive = statusStr.includes('Live') || statusStr.includes('🟢');
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[8.5px] font-mono uppercase font-bold ${isLive ? 'border-[#39FF14]/30 bg-[#39FF14]/5 text-[#39FF14]' : 'border-amber-400/30 bg-amber-400/5 text-amber-300'}`}>
        <span className={`w-1 h-1 rounded-full ${isLive ? 'bg-[#39FF14] animate-pulse' : 'bg-amber-400'} inline-block`} />
        {statusStr}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8 font-sans">
      
      {/* LEFT CONTAINER Slot: GEEK CREATIONS */}
      {geekCreations && (
        <div 
          className={`lg:col-span-8 relative rounded-3xl p-6 md:p-8 bg-[#080D1F] border border-white/5 ${accentBorderHoverClass} hover:shadow-[0_0_25px_rgba(57,255,20,0.04)] transition-all duration-300 flex flex-col justify-between group overflow-hidden min-h-fit md:min-h-[420px] cursor-pointer`}
          onMouseEnter={() => {
            setHoveredPid(geekCreations.id);
            playClickSound('hover');
          }}
          onMouseLeave={() => setHoveredPid(null)}
          onClick={() => handleOpenDetail(geekCreations)}
        >
          {hoveredPid === geekCreations.id && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#39FF14]/5 to-transparent h-1/2 w-full top-0 left-0 animate-[scanline_2s_linear_infinite]" />
          )}

          <div>
            <div className="flex flex-wrap gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.01] border border-white/10 flex items-center justify-center font-display font-black text-[#39FF14] text-xs">
                  {geekCreations.logoText}
                </div>
                <div>
                  <span className="block text-[8px] text-[#8A9BC4] uppercase tracking-wider font-mono">PRIMARY FEATURE CARD [4:4]</span>
                  <span className="block text-white font-bold text-xs uppercase font-mono leading-tight">{geekCreations.tag}</span>
                </div>
              </div>
              {renderStatus(geekCreations.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3.5 text-left">
                <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight uppercase leading-tight group-hover:text-[#39FF14] transition-colors">
                  {geekCreations.title}
                </h3>
                <p className="text-xs md:text-sm text-[#39FF14] font-mono leading-relaxed font-bold">
                  {geekCreations.subtitle}
                </p>
                <p className="text-xs text-[#8A9BC4] leading-relaxed max-w-2xl font-normal pt-2">
                  {geekCreations.description}
                </p>
              </div>
              {geekCreations.image && (
                <div className="md:col-span-5 relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-slate-950/40">
                  <img
                    src={geekCreations.image}
                    alt={geekCreations.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080D1F]/50 to-transparent" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 space-y-4 mt-6">
            <div className="flex flex-wrap gap-1.5">
              {geekCreations.tech.map((t, idx) => (
                <span key={idx} className="text-[9px] font-mono px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-[#8A9BC4]">
                  {t.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 items-center justify-between font-mono text-[9px] text-[#8A9BC4]">
              <span className="break-all">{geekCreations.meta}</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDetail(geekCreations);
                  }}
                  className="inline-flex items-center gap-1 font-bold text-white hover:text-[#39FF14] transition-colors px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[9.5px]"
                >
                  INSPECT SPECT_DECK
                  <ChevronRight className="w-3 h-3 text-[#39FF14]" />
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* RIGHT CONTAINER COLUMN */}
      <div className="lg:col-span-4 flex flex-col gap-6 justify-between items-stretch">
        
        {/* Top Right Slot: iCATHOLIC IGBO */}
        {icatholicIgbo && (
          <div 
            className={`rounded-3xl p-6 bg-[#080D1F] border border-white/5 ${accentBorderHoverClass} hover:shadow-[0_0_25px_rgba(57,255,20,0.04)] transition-all duration-300 flex flex-col justify-between group overflow-hidden flex-1 cursor-pointer`}
            onMouseEnter={() => {
              setHoveredPid(icatholicIgbo.id);
              playClickSound('hover');
            }}
            onMouseLeave={() => setHoveredPid(null)}
            onClick={() => handleOpenDetail(icatholicIgbo)}
          >
            <div>
              <div className="flex flex-wrap gap-2 items-start sm:items-center justify-between mb-4">
                <span className="text-[8px] text-[#8A9BC4] uppercase tracking-wider font-mono">BENTO_SLOT [2:2]</span>
                {renderStatus(icatholicIgbo.status)}
              </div>

              <div className="space-y-1 text-left">
                <span className="block text-[9.5px] text-[#00D4FF] font-mono leading-normal uppercase tracking-wide font-bold">{icatholicIgbo.tag}</span>
                <h3 className="text-lg md:text-xl font-display font-black text-white uppercase group-hover:text-[#39FF14] transition-colors pt-1 leading-tight">
                  {icatholicIgbo.title}
                </h3>
                {icatholicIgbo.image && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-slate-950/40 my-3">
                    <img
                      src={icatholicIgbo.image}
                      alt={icatholicIgbo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D1F]/50 to-transparent" />
                  </div>
                )}
                <p className="text-[10px] text-[#8A9BC4] leading-relaxed pt-1.5 font-normal">
                  {icatholicIgbo.subtitle}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 space-y-4 font-sans">
              <div className="flex flex-wrap gap-1">
                {icatholicIgbo.tech.map((t, idx) => (
                  <span key={idx} className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[#8A9BC4]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center justify-between font-mono text-[8px] text-[#8A9BC4]">
                <span className="break-all">{icatholicIgbo.meta}</span>
                <span className="text-white hover:text-[#39FF14] font-black group-hover:underline shrink-0">SPEC_VIEW ▶</span>
              </div>
            </div>

          </div>
        )}

        {/* Bottom Right Slot: BIDDO */}
        {biddo && (
          <div 
            className={`rounded-3xl p-6 bg-[#080D1F] border border-white/5 ${accentBorderHoverClass} hover:shadow-[0_0_25px_rgba(57,255,20,0.04)] transition-all duration-300 flex flex-col justify-between group overflow-hidden flex-1 cursor-pointer`}
            onMouseEnter={() => {
              setHoveredPid(biddo.id);
              playClickSound('hover');
            }}
            onMouseLeave={() => setHoveredPid(null)}
            onClick={() => handleOpenDetail(biddo)}
          >
            <div>
              <div className="flex flex-wrap gap-2 items-start sm:items-center justify-between mb-4">
                <span className="text-[8px] text-[#8A9BC4] uppercase tracking-wider font-mono">BENTO_SLOT [2:2]</span>
                {renderStatus(biddo.status)}
              </div>

              <div className="space-y-1 text-left">
                <span className="block text-[9.5px] text-emerald-400 font-mono leading-normal uppercase tracking-wide font-bold">{biddo.tag}</span>
                <h3 className="text-lg md:text-xl font-display font-black text-white uppercase group-hover:text-[#39FF14] transition-colors pt-1 leading-tight">
                  {biddo.title}
                </h3>
                {biddo.image && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-slate-950/40 my-3">
                    <img
                      src={biddo.image}
                      alt={biddo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D1F]/50 to-transparent" />
                  </div>
                )}
                <p className="text-[10px] text-[#8A9BC4] leading-relaxed pt-1.5 font-normal">
                  {biddo.subtitle}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 space-y-4 font-sans">
              <div className="flex flex-wrap gap-1">
                {biddo.tech.map((t, idx) => (
                  <span key={idx} className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[#8A9BC4]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center justify-between font-mono text-[8px] text-[#8A9BC4]">
                <span className="break-all">{biddo.meta}</span>
                <span className="text-white hover:text-[#39FF14] font-black group-hover:underline shrink-0">SPEC_VIEW ▶</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
