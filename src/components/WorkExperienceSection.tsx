import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, ExternalLink, Sparkles, Server } from 'lucide-react';

interface WorkExperienceSectionProps {
  accentColor: 'green' | 'cyan';
}

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

const timelineEntries: TimelineEntry[] = [
  {
    id: "001",
    company: "Wisdom Internet Services",
    period: "2019 – 2022",
    type: "On-site · Full-time",
    location: "Nigeria",
    role: "Computer Analyst & Operator",
    isActive: false,
    responsibilities: [
      "Managed and maintained computer systems and network infrastructure for daily business operations",
      "Diagnosed and resolved hardware, software, and connectivity issues across the organization",
      "Supported internal users with technical problems, system configuration, and operational workflows",
      "Introduced structured documentation for recurring technical issues, reducing resolution time"
    ],
    note: "This is where the engineering mindset started — not in a classroom, but in a room full of broken systems that needed fixing."
  },
  {
    id: "002",
    company: "Automated Cafe",
    period: "2022",
    type: "Contract · On-site",
    location: "Nigeria",
    role: "Frontend Engineer",
    isActive: false,
    responsibilities: [
      "Designed and developed the frontend for Heartzibah Shop — a client-facing e-commerce storefront",
      "Translated business requirements directly into production UI with no design handoff",
      "Delivered a complete, responsive shopping interface within a short engagement window"
    ],
    stack: ["React", "CSS", "JavaScript"]
  },
  {
    id: "003",
    company: "Blaitware",
    period: "Early 2023 – Late 2023",
    type: "Contract · Software Engineering Firm",
    location: "Nigeria",
    role: "Frontend Engineer",
    isActive: false,
    responsibilities: [
      "Core frontend engineer on RabbAi — an exam preparation platform targeting WAEC, NECO, and JAMB candidates with unified student-facing portals",
      "Built the student-facing dashboard, score tracking interface, and real-time chatbot UI",
      "Integrated AI features at a time when stable SDKs were largely unavailable — required custom solutions and first-principles implementation",
      "Collaborated directly with a backend engineer across the full product lifecycle from concept to production deployment"
    ],
    stack: ["React", "Python (FastAPI)", "Docker"],
    outcome: "Project was sunset due to data sourcing constraints. Delivered a complete working product to production."
  },
  {
    id: "004",
    company: "SOFE Group",
    period: "2023 – Present",
    type: "Full-time → Freelance · Hybrid",
    location: "Nigeria",
    role: "Lead Software Developer → Software Engineer",
    isActive: true,
    responsibilities: [
      "Served as Dev Lead during the platform's foundational build phase — responsible for technical direction, architecture decisions, and delivery",
      "Designed and developed the main public platform at sofegroup.com — a blockchain-powered youth empowerment organization reshaping Africa's technology landscape",
      "Built Telegram cryptocurrency airdrop bots handling automated reward distribution",
      "Engineered WhatsApp automation systems in both Python and TypeScript for internal operations",
      "Contributed to LMS and CRM infrastructure as the platform scaled"
    ],
    stack: ["Next.js", "TypeScript", "Python", "Telegram Bot API", "WhatsApp Automation (Baileys + Meta API)"],
    highlight: "Took the platform from zero to a fully operational public-facing product. Still an active contributor.",
    link: { label: "sofegroup.com", url: "https://sofegroup.com" }
  },
  {
    id: "005",
    company: "PWorld Concepts",
    period: "2024 – Present",
    type: "Freelance · Software Consultancy",
    location: "Nigeria",
    role: "Freelance Software Consultant & Developer",
    isActive: true,
    responsibilities: [
      "Core contributor to iCatholic Igbo — a Catholic missal, prayer guide, and media platform now serving 70,000+ users across iOS and Android",
      "Responsible for completing new feature implementations from the data layer up — handling data structures, algorithm design, and integration logic",
      "Performed deep debugging and architectural refactoring on a large untyped JavaScript codebase — one of the highest-risk, engagements in the project",
      "Ongoing role as consultant for bug fixes, platform stability, and technical guidance"
    ],
    stack: ["React Native (Expo)", "JavaScript", "TypeScript"],
    highlight: "70,000+ active users across App Store and Play Store. Untyped JS codebase at scale — every change required surgical precision.",
    link: { label: "icatholicigbo.com", url: "https://icatholicigbo.com" }
  },
  {
    id: "006",
    company: "The Seventh Legion",
    period: "2025 – Present",
    type: "Freelance · Rapid Development Studio",
    location: "Nigeria",
    role: "Freelance Software Engineer",
    isActive: true,
    responsibilities: [
      "Converts generated UI designs and wireframes into fully functional, production-ready platforms",
      "Built and deployed Oyadrop — a logistics and courier platform enabling goods shipment across Nigeria, integrated with Google Maps and Paystack",
      "Built and deployed EB Pathway — a full-stack immigration automation platform with role-based workflows across Finance, Research, Support, and Management Layers",
      "Responsible for full-stack implementation, cloud hosting, and post-launch stability"
    ],
    stack: ["React", "Next.js", "TypeScript", "Google Maps API", "Paystack", "DigitalOcean", "Docker"],
    projects: [
      { name: "Oyadrop", url: "https://oyadrop.com" },
      { name: "EB Pathway", url: "https://ebpathway.net" }
    ]
  }
];

export default function WorkExperienceSection({ accentColor }: WorkExperienceSectionProps) {
  const accentTextClass = accentColor === 'green' ? 'text-[#39FF14]' : 'text-[#00D4FF]';
  const accentBorderClass = accentColor === 'green' ? 'border-[#39FF14]/30 hover:border-[#39FF14]/65' : 'border-[#00D4FF]/30 hover:border-[#00D4FF]/65';
  const dotColorClass = accentColor === 'green' ? 'bg-[#39FF14] shadow-[0_0_15px_#39FF14]' : 'bg-[#00D4FF] shadow-[0_0_15px_#00D4FF]';
  const pingColorClass = accentColor === 'green' ? 'bg-[#39FF14]' : 'bg-[#00D4FF]';

  return (
    <section id="experience" className="py-24 border-t border-white/5 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-20 text-left">
          <div>
            <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${accentTextClass} block mb-2`}>
              &gt;_ SECTOR_003 // PROFESSIONAL CHRONICLES
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-none font-display uppercase">
              Work Experience
            </h2>
          </div>
          <p className="text-xs text-[#8A9BC4] max-w-sm leading-relaxed font-mono">
            A vertical track documenting software architectural shipments, engineering lead positions, and rapid production cycles.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Centered vertical running line on desktop */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none">
            <div className={`absolute inset-y-0 w-full bg-gradient-to-b from-transparent via-${accentColor === 'green' ? '[#39FF14]/40' : '[#00D4FF]/40'} to-transparent`} />
          </div>

          <div className="space-y-16">
            {timelineEntries.map((entry, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = entry.isActive;

              return (
                <div key={entry.id} className="relative flex flex-col md:flex-row md:justify-between items-stretch">
                  
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
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-2'}`}>
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
                      <div className={`flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-[#8A9BC4] ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="text-white font-bold tracking-wide">
                          {entry.period}
                        </span>
                        <span>·</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">
                          {entry.type}
                        </span>
                        {entry.location && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                              {entry.location}
                            </span>
                          </>
                        )}
                      </div>

                      {entry.note && (
                        <p className={`mt-4 text-[11px] leading-relaxed italic text-[#8A9BC4] border-l-2 pl-3.5 ${isEven ? 'md:border-r-2 md:border-l-0 md:pr-3.5 md:pl-0 border-[#39FF14]' : 'border-[#39FF14]'} py-1 bg-white/[0.01] rounded`}>
                          "{entry.note}"
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Right Side Column */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 mt-4 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <motion.div 
                      className={`p-6 rounded-2xl bg-[#080D1F] border border-white/5 transition-all duration-300 text-left relative ${accentBorderClass}`}
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Cyber Gradient Header bar inside card */}
                      <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-${accentColor === 'green' ? '[#39FF14]' : '[#00D4FF]'} to-transparent opacity-40`} />

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
                          <div className="grid grid-cols-2 gap-2">
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
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
