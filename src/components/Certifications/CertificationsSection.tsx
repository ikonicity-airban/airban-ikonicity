import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, ShieldCheck, Check } from 'lucide-react';
import { getAccentHex, getAccentTextClass, getAccentBgClass, getViaColorClass, getAccentRgba } from '../../utils';

interface CertItem {
  name: string;
  issuer: string;
}

interface CertGroup {
  groupName: string;
  items: CertItem[];
}

const certificationsData: CertGroup[] = [
  {
    groupName: "GOOGLE / COURSERA",
    items: [
      { name: "IBM Introduction to Software Engineering", issuer: "Google / Coursera" }
    ]
  },
  {
    groupName: "FREECODECAMP",
    items: [
      { name: "Responsive Web Design", issuer: "FreeCodeCamp" },
      { name: "JavaScript Algorithms & Data Structures", issuer: "FreeCodeCamp" },
      { name: "C# Certification", issuer: "FreeCodeCamp" }
    ]
  },
  {
    groupName: "CODECADEMY",
    items: [
      { name: "JavaScript", issuer: "Codecademy" },
      { name: "HTML & CSS", issuer: "Codecademy" },
      { name: "Python", issuer: "Codecademy" },
      { name: "TypeScript (via Codedamn)", issuer: "Codecademy" }
    ]
  },
  {
    groupName: "SOLOLEARN",
    items: [
      { name: "Python", issuer: "Sololearn" },
      { name: "Java", issuer: "Sololearn" },
      { name: "JavaScript", issuer: "Sololearn" },
      { name: "C", issuer: "Sololearn" },
      { name: "C#", issuer: "Sololearn" },
      { name: "React", issuer: "Sololearn" }
    ]
  },
  {
    groupName: "SPECIALIST CERTIFICATIONS",
    items: [
      { name: "JavaScript", issuer: "certificate.dev" },
      { name: "Full-Stack Engineering (TypeScript)", issuer: "Codedamn" },
      { name: "Rust", issuer: "coddy.tech" }
    ]
  }
];

// Inline elegant custom SVGs representing each issuer or general credential categories
const getIssuerIcon = (issuer: string, colorHex: string) => {
  const norm = issuer.toLowerCase();
  
  if (norm.includes("google") || norm.includes("coursera")) {
    return (
      <svg className="w-5 h-5" style={{ color: colorHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    );
  }
  
  if (norm.includes("freecodecamp")) {
    return (
      <svg className="w-5 h-5" style={{ color: colorHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  
  if (norm.includes("codecademy")) {
    return (
      <svg className="w-5 h-5" style={{ color: colorHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  
  if (norm.includes("sololearn")) {
    return (
      <svg className="w-5 h-5" style={{ color: colorHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }
  
  return (
    <svg className="w-5 h-5" style={{ color: colorHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
};

interface CertificationsSectionProps {
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
}

export default function CertificationsSection({ accentColor }: CertificationsSectionProps) {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);
  const textAccentClass = getAccentTextClass(accentColor);
  const accentHex = getAccentHex(accentColor);

  const handleCertClick = (cert: CertItem) => {
    setSelectedCert(cert);
  };

  const getBorderColorWithOpacity20 = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'rgba(57, 255, 20, 0.2)';
      case 'cyan': return 'rgba(0, 212, 255, 0.2)';
      case 'pink': return 'rgba(255, 0, 127, 0.2)';
      case 'purple': return 'rgba(189, 0, 255, 0.2)';
      case 'yellow': return 'rgba(255, 230, 0, 0.2)';
      default: return 'rgba(57, 255, 20, 0.2)';
    }
  };

  const getViaColorWithOpacity30 = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'via-[#39FF14]/30';
      case 'cyan': return 'via-[#00D4FF]/30';
      case 'pink': return 'via-[#FF007F]/30';
      case 'purple': return 'via-[#BD00FF]/30';
      case 'yellow': return 'via-[#FFE600]/30';
      default: return 'via-[#39FF14]/30';
    }
  };

  const getBgWithOpacity15 = (color: typeof accentColor) => {
    switch (color) {
      case 'green': return 'bg-[#39FF14]/15';
      case 'cyan': return 'bg-[#00D4FF]/15';
      case 'pink': return 'bg-[#FF007F]/15';
      case 'purple': return 'bg-[#BD00FF]/15';
      case 'yellow': return 'bg-[#FFE600]/15';
      default: return 'bg-[#39FF14]/15';
    }
  };

  return (
    <section id="certifications" className="py-24 border-t border-white/5 relative z-20 overflow-hidden bg-[#050816]">
      {/* Visual background atmospheric lights */}
      <div 
        className="absolute right-0 bottom-0 w-[40vw] aspect-square rounded-full pointer-events-none z-0 filter blur-[150px] opacity-[0.03]"
        style={{
          background: `radial-gradient(circle, ${getAccentRgba(accentColor, 0.4)} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-20 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${textAccentClass} block mb-2`}>
              &gt;_ SECTOR_005 // SYSTEMS CREDENTIALS
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none font-display uppercase">
              Certifications &amp; Training
            </h2>
          </div>
          <p className="text-xs text-[#CAD5EE] max-w-sm leading-relaxed font-mono">
            Licensing records and verified skill sets issued by worldwide education authorities.
          </p>
        </motion.div>

        {/* Groups Column Stack */}
        <div className="space-y-16 text-left">
          {certificationsData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-6">
              {/* Group Header - Issuer Name as Section Label */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs font-mono font-bold shrink-0" style={{ color: accentHex }}>
                  ►
                </span>
                <h3 className="text-sm font-display font-black text-white tracking-widest uppercase">
                  {group.groupName}
                </h3>
                <div className="h-[1px] bg-white/5 flex-grow" />
              </motion.div>

              {/* Cards responsive Grid beneath group */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((cert, certIdx) => (
                  <motion.div
                    key={certIdx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: certIdx * 0.05 }}
                    onClick={() => handleCertClick(cert)}
                    className="group relative flex items-start gap-4 p-5 rounded-lg bg-[#080D1F] border-l-2 transition-all duration-200 hover:bg-[#0D1530] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] cursor-pointer"
                    style={{ borderLeftColor: accentHex }}
                  >
                    {/* Icon container */}
                    <div className="p-1.5 rounded bg-white/5 shrink-0 mt-0.5">
                      {getIssuerIcon(cert.issuer, accentHex)}
                    </div>

                    {/* Meta stack */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white tracking-wide leading-snug">
                        {cert.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#CAD5EE]/80">
                        {cert.issuer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Block Anchor */}
        <motion.div 
          className="mt-24 space-y-4 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Label Above */}
          <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: accentHex }}>
            // FORMAL EDUCATION
          </span>

          {/* Education Box */}
          <div 
            className="p-8 sm:p-10 rounded-xl bg-gradient-to-br from-[#0D1530] to-[#080D1F] border relative overflow-hidden"
            style={{ borderColor: getBorderColorWithOpacity20(accentColor) }}
          >
            {/* Ambient cyber light lines to accentuate box */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${getViaColorWithOpacity30(accentColor)}, transparent)` }} />
            
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight leading-tight uppercase">
                  B.Eng. Electronics &amp; Computer Engineering
                </h3>
                <p className="font-mono text-xs sm:text-sm font-semibold tracking-wide mt-2" style={{ color: accentHex }}>
                  University of Nigeria, Nsukka
                </p>
                <p className="text-xs font-mono text-[#CAD5EE]/60 mt-1">2018 – 2023</p>
              </div>

              <div className={`h-[1px] w-full ${getBgWithOpacity15(accentColor)}`} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                  <p className="font-mono text-xs text-[#CAD5EE]">
                    <strong>Major:</strong> Software Engineering
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                  <p className="font-mono text-xs text-[#CAD5EE]">
                    <strong>Major:</strong> Embedded Systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Dynamic Cyber Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            />

            {/* Certificate Container */}
            <motion.div
              className="relative w-full max-w-lg bg-[#070b1a] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden text-left shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              style={{
                boxShadow: `0 0 35px ${accentHex}15, inset 0 1px 1px rgba(255,255,255,0.05)`
              }}
            >
              {/* Holographic Glowing Scan line animation */}
              <div 
                className="absolute left-0 right-0 h-[2px] opacity-10 animate-[bounce_3s_infinite]"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentHex}, transparent)` }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center hover:text-red-400 transition-colors cursor-pointer text-slate-300 z-30"
                aria-label="Close cert viewer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Label */}
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
                <ShieldCheck className="w-5 h-5" style={{ color: accentHex }} />
                <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-slate-400">// CREDENTIAL_VERIFIED_SECURE</span>
              </div>

              {/* Certificate badge display */}
              <div className="flex flex-col items-center justify-center py-6 border border-white/5 bg-[#0a1026]/40 rounded-xl mb-6 relative">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4 shadow-inner">
                  <Award className="w-8 h-8" style={{ color: accentHex }} />
                </div>
                
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest text-center font-black">
                  Systems License Certification
                </h3>
                
                {/* Visual badge numbers */}
                <span className="text-[8px] font-mono text-slate-600 tracking-wider mt-1">ID // CERT_E_074900</span>
              </div>

              {/* Certificate Title */}
              <div className="space-y-2 mb-6">
                <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">CREDENTIAL NAME</span>
                <h4 className="text-lg font-display font-black text-white leading-tight uppercase tracking-wider">
                  {selectedCert.name}
                </h4>
              </div>

              {/* Metadata details */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 mb-6 text-xs font-mono">
                <div>
                  <span className="block text-[8px] text-slate-500 uppercase font-extrabold tracking-widest mb-1">ISSUED BY</span>
                  <span className="text-white font-bold">{selectedCert.issuer.toUpperCase()}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-500 uppercase font-extrabold tracking-widest mb-1">LICENSE STATUS</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-400 font-extrabold text-[10px]">VERIFIED_ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Telemetry/Audit details */}
              <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 font-mono text-[9px] text-[#8A9BC4] space-y-1.5 leading-relaxed">
                <div>
                  <span className="text-slate-500">// CRYPTOGRAPHIC_HASH:</span>
                  <p className="text-[10px] text-white font-bold select-all truncate">
                    SHA256: 4b663f7415a4489fbca9efe7cf2e25d3a58d60c499f57c
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">// DEPLOY_NODE:</span>
                  <p className="text-white font-bold">NS_NIGERIA_SYSTEMS_0X8890</p>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-mono text-[10px] font-bold uppercase border border-white/10 tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Dismiss Verification Badge</span>
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
