import { Project } from '../../types';
import { playClickSound } from '../../utils';

interface ProjectCardProps {
  project: Project;
  accentBorderHoverClass: string;
  handleOpenDetail: (project: Project) => void;
}

export default function ProjectCard({
  project,
  accentBorderHoverClass,
  handleOpenDetail
}: ProjectCardProps) {
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
    <div 
      className={`rounded-2xl p-5 bg-[#080D1F] border border-white/5 ${accentBorderHoverClass} hover:shadow-[0_0_15px_rgba(57,255,20,0.02)] transition-all duration-300 flex flex-col justify-between group text-left relative overflow-hidden cursor-pointer`}
      onMouseEnter={() => {
        playClickSound('hover');
      }}
      onClick={() => handleOpenDetail(project)}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-6.5 h-6.5 rounded bg-white/[0.01] border border-white/5 flex items-center justify-center font-display font-black text-[#39FF14] text-[8.5px]">
            {project.logoText}
          </div>
          {renderStatus(project.status)}
        </div>

        {project.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-slate-950 mb-3.5">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 pr-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D1F]/60 via-transparent to-transparent opacity-85" />
          </div>
        )}

        <div className="space-y-1.5">
          <span className="block text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wide">
            {project.tag}
          </span>
          <h4 className="text-sm font-display font-black text-white uppercase group-hover:text-[#39FF14] transition-colors leading-tight">
            {project.title}
          </h4>
          <p className="text-[10.5px] text-[#8A9BC4] leading-relaxed font-normal">
            {project.subtitle}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 mt-4 space-y-3">
        <div className="flex flex-wrap gap-1">
          {project.tech.map((t, idx) => (
            <span key={idx} className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-white/[0.01] border border-white/5 text-[#8A9BC4]">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between font-mono text-[7.5px] text-[#8A9BC4]">
          <span>{project.meta}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetail(project);
            }}
            className="text-white hover:text-[#39FF14] font-black hover:underline cursor-pointer"
          >
            INSPECT [▶]
          </button>
        </div>
      </div>
    </div>
  );
}
