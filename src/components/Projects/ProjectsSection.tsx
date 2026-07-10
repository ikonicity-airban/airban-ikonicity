import { useState, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, X } from 'lucide-react';
import { portfolioData } from '../../data';
import { Project } from '../../types';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectCard from './ProjectCard';
import ProjectBentoGrid from './ProjectBentoGrid';
import { playClickSound, getAccentTextClass, getAccentBgClass, getAccentBorderClass } from '../../utils';

interface ProjectsSectionProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
  dbProjects?: any[];
}

function ProjectsSection({ accentColor, dbProjects }: ProjectsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Slider Mouse Drag State
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDraggingTabs, setIsDraggingTabs] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabsRef.current) return;
    setIsMouseDown(true);
    setIsDraggingTabs(false);
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
    setTimeout(() => {
      setIsDraggingTabs(false);
    }, 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !tabsRef.current) return;
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed scaling factor
    if (Math.abs(x - startX) > 5) {
      setIsDraggingTabs(true);
    }
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  const accentTextClass = getAccentTextClass(accentColor);
  const bgAccentClass = getAccentBgClass(accentColor);
  const borderAccentClass = getAccentBorderClass(accentColor);
  
  const getAccentBorderHoverClass = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'hover:border-[#39FF14]/30';
      case 'cyan': return 'hover:border-[#00D4FF]/30';
      case 'pink': return 'hover:border-[#FF007F]/30';
      case 'purple': return 'hover:border-[#BD00FF]/30';
      case 'yellow': return 'hover:border-[#FFE600]/30';
      default: return 'hover:border-[#39FF14]/30';
    }
  };
  const accentBorderHoverClass = getAccentBorderHoverClass(accentColor);

  const getFocusClasses = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'focus:border-[#39FF14] focus:ring-[#39FF14]/20';
      case 'cyan': return 'focus:border-[#00D4FF] focus:ring-[#00D4FF]/20';
      case 'pink': return 'focus:border-[#FF007F] focus:ring-[#FF007F]/20';
      case 'purple': return 'focus:border-[#BD00FF] focus:ring-[#BD00FF]/20';
      case 'yellow': return 'focus:border-[#FFE600] focus:ring-[#FFE600]/20';
      default: return 'focus:border-[#39FF14] focus:ring-[#39FF14]/20';
    }
  };

  // Parse project source: if dbProjects exists and isn't empty, use formatted db projects. Otherwise use static data.
  const projectsToUse: Project[] = useMemo(() => {
    return dbProjects && dbProjects.length > 0
      ? dbProjects.map((p) => {
          const idVal = p.slug || p.id;
          let roleVal = p.role;
          if (idVal === 'geek-creations' && roleVal) {
            roleVal = roleVal.replace(/Founder/gi, 'Lead Developer');
          }
          return {
            id: idVal,
            title: p.title,
            subtitle: p.description,
            tag: roleVal,
            description: p.longDesc || p.description,
            status: p.status,
            logoText: p.title.slice(0, 2).toUpperCase(),
            tech: p.stack || [],
            links: [
              { label: 'Live Site', url: p.liveUrl || '#' },
              { label: 'Repo', url: p.repoUrl || '#' }
            ],
            meta: p.year ? `YEAR: ${p.year} // DB_SYNC` : `TX_RATE: 1.8s // DB_SYNC`
          };
        })
      : portfolioData.projects;
  }, [dbProjects]);

  // Extract unique tags/categories for filter pills
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projectsToUse.forEach(p => {
      if (p.tag) tags.add(p.tag);
    });
    return ['all', ...Array.from(tags)];
  }, [projectsToUse]);

  // Handle fuzzy search & tag selection filter
  const filteredProjects = useMemo(() => {
    return projectsToUse.filter(project => {
      const matchTag = selectedTag === 'all' || project.tag === selectedTag;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchTag;

      const matchText = 
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tag.toLowerCase().includes(query) ||
        project.tech.some(t => t.toLowerCase().includes(query));

      return matchTag && matchText;
    });
  }, [projectsToUse, searchQuery, selectedTag]);

  const handleOpenDetail = (project: Project) => {
    playClickSound('synth');
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Check if current view matches default search parameters so we can display Bento Layout.
  const isDefaultView = searchQuery === '' && selectedTag === 'all';

  // Find standard bento slots for default layout mapping
  const geekCreations = useMemo(() => projectsToUse.find(p => p.id === 'geek-creations') || projectsToUse[0], [projectsToUse]);
  const icatholicIgbo = useMemo(() => projectsToUse.find(p => p.id === 'icatholic-igbo') || projectsToUse[1], [projectsToUse]);
  const biddo = useMemo(() => projectsToUse.find(p => p.id === 'biddo') || projectsToUse[2], [projectsToUse]);
  const standardProjects = useMemo(() => projectsToUse.filter(
    p => p.id !== geekCreations?.id && p.id !== icatholicIgbo?.id && p.id !== biddo?.id
  ), [projectsToUse, geekCreations, icatholicIgbo, biddo]);

  return (
    <section id="projects" className="py-24 border-t border-white/5 relative z-20">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${accentTextClass} block mb-1`}>
              &gt;_ SECTOR_004 // PRODUCTION SYSTEMS DECK
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight leading-tight font-display uppercase">
              Project Deployments Bento
            </h2>
          </div>
          <p className="text-xs text-[#8A9BC4] max-w-sm font-mono uppercase">
            A real bento mapping representing high-performance custom engines and commercial software architectures.
          </p>
        </div>

        {/* SMART COCKPIT SEARCH BAR & FILTER CONSOLE */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch font-mono">
            {/* Input wrap */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <Search className={`w-3.5 h-3.5 ${accentTextClass} opacity-60`} />
              </div>
              <input
                type="text"
                placeholder="LAUNCH SMART CRYPTO_QUERY... (E.g. Next.js, Web3, iOS, Python)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-slate-950/75 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-hidden ${getFocusClasses(accentColor)} focus:ring-1 transition-all uppercase tracking-wide`}
              />
              <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                {searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[7.5px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded">SYS_READY</span>
                )}
              </div>
            </div>

            {/* Quick telemetry counter */}
            <div className={`p-3 bg-slate-950/40 border border-white/5 rounded-xl flex items-center justify-between md:justify-start gap-4 text-[9px] min-w-[140px]`}>
              <span className="text-slate-500">MATCH_NODES:</span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={filteredProjects.length}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`font-black text-white px-2 py-0.5 rounded-sm bg-white/5 ${accentTextClass}`}
                >
                  {filteredProjects.length} / {projectsToUse.length}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Tag Pills */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#050816] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#050816] to-transparent pointer-events-none z-10" />

            <div 
              ref={tabsRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className={`flex flex-row flex-nowrap gap-2 overflow-x-auto scrollbar-none py-2 px-1 select-none scroll-smooth ${isMouseDown ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
              {availableTags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      if (!isDraggingTabs) {
                        playClickSound('click');
                        setSelectedTag(tag);
                      }
                    }}
                    onMouseEnter={() => playClickSound('hover')}
                    className={`px-3.5 py-2.5 rounded-lg border text-[8.5px] font-mono uppercase font-bold tracking-wider cursor-pointer transition-all shrink-0 select-none ${isActive ? `${borderAccentClass} ${bgAccentClass}/10 text-white shadow-[0_0_12px_rgba(57,255,20,0.1)]` : 'border-white/5 bg-slate-950/25 text-slate-400 hover:text-white hover:border-white/10 hover:bg-slate-950/45'}`}
                  >
                    {tag === 'all' ? '● ALL DEPLOYMENTS' : tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE PRESENTATION FLOW */}
        {isDefaultView ? (
          <ProjectBentoGrid 
            geekCreations={geekCreations}
            icatholicIgbo={icatholicIgbo}
            biddo={biddo}
            accentBorderHoverClass={accentBorderHoverClass}
            handleOpenDetail={handleOpenDetail}
          />
        ) : null}

        {/* PROJECTS CONTAINER */}
        <div>
          <span className="block text-left font-mono text-[8.5px] uppercase text-slate-500 tracking-widest mb-4">
            {isDefaultView ? '// STANDARD SYSTEM IMPLEMENTATIONS REGISTER' : '// ACTIVE SYSTEM QUERY DECK MATCHES'}
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(isDefaultView ? standardProjects : filteredProjects).map((p) => (
              <ProjectCard 
                key={p.id}
                project={p}
                accentBorderHoverClass={accentBorderHoverClass}
                handleOpenDetail={handleOpenDetail}
              />
            ))}

            {/* Empty Matches state for query */}
            {!isDefaultView && filteredProjects.length === 0 && (
              <div className="col-span-full border border-dashed border-white/10 rounded-2xl p-16 text-center font-mono space-y-3 bg-slate-950/20">
                <ShieldAlert className="w-8 h-8 mx-auto text-amber-500 animate-pulse" />
                <span className="block text-white uppercase text-[10px] font-bold tracking-widest">
                  CRITICAL FAULT: NO INTERSECTING TRANSMISSION NODES
                </span>
                <p className="text-[9.5px] text-slate-500 max-w-sm mx-auto uppercase">
                  No core projects currently match query "{searchQuery.toUpperCase()}" under the "{selectedTag.toUpperCase()}" scope configuration.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                  }}
                  className={`mt-2 inline-block text-[9px] uppercase font-black px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-[#39FF14]`}
                >
                  DE-ALLOCATE QUERY FILTER
                </button>
              </div>
            )}
          </div>
        </div>

      </motion.div>

      {/* FULL SPECS DETAIL DISPATCH MODAL */}
      <ProjectDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        accentColor={accentColor}
      />
    </section>
  );
}

export default memo(ProjectsSection);
