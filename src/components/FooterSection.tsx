import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Github, Linkedin, Twitter, MessageSquare, Compass, ArrowUpRight, Sparkles, Command, Globe, Activity, Cpu } from 'lucide-react';
import Logo from './Logo';
import { playClickSound } from '../utils';

interface FooterSectionProps {
  accentColor: 'green' | 'cyan';
  onOpenAdmin?: () => void;
  availabilityStatus?: string;
}

export default function FooterSection({ accentColor, onOpenAdmin, availabilityStatus }: FooterSectionProps) {
  const isGreen = accentColor === 'green';
  const textAccentClass = isGreen ? 'text-[#39FF14]' : 'text-[#00D4FF]';
  const borderAccentClass = isGreen ? 'border-[#39FF14]' : 'border-[#00D4FF]';

  // Back to top function
  const scrollToTop = () => {
    playClickSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Konami Code sequence state
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  const [keyHistory, setKeyHistory] = useState<string[]>([]);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Monitor keyboard key strokes for Konami Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      // Convert B/A to lowercase for easy match
      const keyToPush = (key === 'b' || key === 'B') ? 'b' : (key === 'a' || key === 'A') ? 'a' : key;
      
      setKeyHistory((prev) => {
        const updated = [...prev, keyToPush].slice(-konamiCode.length);
        
        // Match Konami Code
        const matches = updated.every((val, index) => val === konamiCode[index]);
        if (matches) {
          triggerEasterEgg();
          return [];
        }
        return updated;
      });

      // Escape key to close terminal
      if (key === 'Escape') {
        setEasterEggActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    playClickSound('success');
    setEasterEggActive(true);
    setTerminalLines([
      "> COUPLING SYSTEM DEEP-LINK TRANSMISSION...",
      "> LOADING KERNEL INTERRUPT PORT 3000...",
      "> DECRYPTING METAMASK WEB3 PACKETS..."
    ]);

    setTimeout(() => {
      setTerminalLines(prev => [...prev, "> SYSTEM ACCESS GRANTED"]);
    }, 600);

    setTimeout(() => {
      setTerminalLines(prev => [...prev, "> Welcome back, Engineer Eban Godwin."]);
    }, 1300);

    setTimeout(() => {
      setTerminalLines(prev => [...prev, "> All systems operational and fully optimized."]);
    }, 2000);

    // Auto-close after 6 seconds
    setTimeout(() => {
      setEasterEggActive(false);
    }, 7000);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  return (
    <footer 
      className="relative w-full bg-[#050816] mt-16 border-t overflow-hidden transition-all duration-300"
      style={{
        borderColor: isGreen ? 'rgba(57, 255, 20, 0.12)' : 'rgba(0, 212, 255, 0.12)'
      }}
    >
      
      {/* Absolute top neon line that fades out at edges */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-70 pointer-events-none z-10 transition-all duration-300" 
        style={{
          background: `linear-gradient(to right, transparent 5%, ${isGreen ? '#39FF14' : '#00D4FF'} 50%, transparent 95%)`,
          boxShadow: isGreen ? '0 0 15px #39FF14' : '0 0 15px #00D4FF'
        }}
      />

      {/* Decorative ambient backdrop light spot */}
      <div 
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full blur-[120px] pointer-events-none opacity-20 transition-all duration-500"
        style={{
          background: isGreen ? '#39FF14' : '#00D4FF'
        }}
      />

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* COLUMN 1: BRAND COCKPIT */}
          <div className="space-y-6 bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors relative group/card">
            <div className="absolute top-3 right-4 font-mono text-[7px] text-[#4A5A80] tracking-widest uppercase">
              SYS // CARD_01
            </div>

            <div className="flex items-center gap-3">
              <Logo size={40} showText={false} glow={true} />
              <div className="text-left">
                <span className="font-display font-black text-white text-base tracking-[0.25em] leading-none uppercase block">
                  AIRBAN
                </span>
                <span className="text-[8px] font-mono text-[#8A9BC4] uppercase block mt-1 tracking-wider">
                  SYSTEM PORTFOLIO OS
                </span>
              </div>
            </div>

            <p className="font-mono text-[11px] text-[#8A9BC4] leading-relaxed">
              We engineer secure, high-latency-immune full-stack systems and automated intelligent workflows.
            </p>

            {/* Pulsing Availability widget synced */}
            <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg w-fit border transition-all ${
              availabilityStatus === 'busy' 
                ? 'bg-amber-400/5 border-amber-400/15 text-amber-400' 
                : (isGreen ? 'bg-[#39FF14]/5 border-[#39FF14]/15 text-[#39FF14]' : 'bg-[#00D4FF]/5 border-[#00D4FF]/15 text-[#00D4FF]')
            }`}>
              <div className="relative flex h-1.5 w-1.5 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  availabilityStatus === 'busy' ? 'bg-amber-400' : (isGreen ? 'bg-[#39FF14]' : 'bg-[#00D4FF]')
                }`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                  availabilityStatus === 'busy' ? 'bg-amber-400' : (isGreen ? 'bg-[#39FF14]' : 'bg-[#00D4FF]')
                }`}></span>
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest">
                {availabilityStatus === 'busy' ? 'BUSY ON CORE BINDINGS' : 'AVAILABLE FOR RECRUIT'}
              </span>
            </div>

            {/* Social icons row */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { icon: <Github className="w-3.5 h-3.5" />, url: "https://github.com/ikonicity-airban", label: "Github" },
                { icon: <Linkedin className="w-3.5 h-3.5" />, url: "https://linkedin.com/in/ebangodwinikoni", label: "Linkedin" },
                { icon: <Twitter className="w-3.5 h-3.5" />, url: "https://x.com/ikonicityairban", label: "X" },
                { icon: <Compass className="w-3.5 h-3.5" />, url: "https://t.me/ikonicity_airban", label: "Telegram" },
                { icon: <MessageSquare className="w-3.5 h-3.5" />, url: "https://discord.com/users/ikonicity", label: "Discord" }
              ].map((item, idx) => (
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => playClickSound('click')}
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7.5 h-7.5 rounded-lg border border-white/5 bg-white/[0.01] flex items-center justify-center text-[#8A9BC4] hover:bg-white/5 transition-colors"
                  title={item.label}
                >
                  <span className="hover:text-white transition-colors">
                    {item.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: INDEXED SYSTEMS */}
          <div className="space-y-4 bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors relative group/card">
            <div className="absolute top-3 right-4 font-mono text-[7px] text-[#4A5A80] tracking-widest uppercase">
              INDEX // CARD_02
            </div>

            <span className="block font-mono text-[9px] tracking-widest text-white font-extrabold uppercase flex items-center gap-1.5">
              <Command className={`w-3.5 h-3.5 ${textAccentClass}`} />
              CORE LINKS
            </span>
            <ul className="space-y-2.5 font-accent text-xs font-semibold text-[#8A9BC4]" style={{ fontFamily: "'Syne', sans-serif" }}>
              {['Home', 'About', 'Projects', 'Services', 'Experience', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.a 
                    whileHover={{ x: 3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playClickSound('click');
                    }}
                    href={`#${link.toLowerCase()}`} 
                    className="hover:text-white transition-all flex items-center gap-2 py-0.5 text-[#8A9BC4]"
                  >
                    <span>{link}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SELECTED PROTOCOLS */}
          <div className="space-y-4 bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors relative group/card">
            <div className="absolute top-3 right-4 font-mono text-[7px] text-[#4A5A80] tracking-widest uppercase">
              CASE // CARD_03
            </div>

            <span className="block font-mono text-[9px] tracking-widest text-[#39FF14] font-bold uppercase" style={{ color: isGreen ? '#39FF14' : '#00D4FF' }}>
              &gt;_ SELECTED WORK
            </span>
            <ul className="space-y-2.5 font-accent text-xs font-semibold text-[#8A9BC4]" style={{ fontFamily: "'Syne', sans-serif" }}>
              {[
                { name: 'Geek Creations', id: 'geek_creations' },
                { name: 'iCatholic Igbo App', id: 'icatholic' },
                { name: 'Biddo Auctions Web3', id: 'biddo' },
                { name: 'Oyadrop Automation', id: 'oyadrop' },
                { name: 'EB Pathway Engine', id: 'pathway' },
                { name: 'SOFE Enterprise', id: 'sofe' }
              ].map((proj) => (
                <li key={proj.id} className="group/item">
                  <motion.a 
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playClickSound('click');
                    }}
                    href="#projects" 
                    className="hover:text-white transition-all flex items-center justify-between py-0.5 text-[#8A9BC4]"
                  >
                    <span className="truncate">{proj.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#4A5A80] group-hover/item:text-white transition-all transform group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: COMMUNICATIONS PORTAL */}
          <div className="space-y-5 bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors relative group/card">
            <div className="absolute top-3 right-4 font-mono text-[7px] text-[#4A5A80] tracking-widest uppercase">
              COMMS // CARD_04
            </div>

            <span className="block font-mono text-[9px] tracking-widest text-white font-extrabold uppercase flex items-center gap-1.5">
              <Globe className={`w-3.5 h-3.5 ${textAccentClass}`} />
              COMMS RELAY
            </span>
            <div className="space-y-3.5 font-mono text-[10.5px] text-[#8A9BC4]">
              <div>
                <span className="block text-[7.5px] uppercase tracking-wider text-[#4A5A80]">EMAIL CHANNEL</span>
                <a href="mailto:ikonicityairban@gmail.com" className="text-white hover:underline font-bold text-xs font-mono">ikonicityairban@gmail.com</a>
              </div>
              
              <div>
                <span className="block text-[7.5px] uppercase tracking-wider text-[#4A5A80]">TELE_COMMS CONNECTION</span>
                <a href="tel:+2348169862852" className="text-white hover:underline font-bold text-xs font-mono">+234 816 986 2852</a>
              </div>

              <div>
                <span className="block text-[7.5px] uppercase tracking-wider text-[#4A5A80]">COGNITIVE SECTOR</span>
                <p className="text-slate-300 font-bold">Nsukka, Enugu State · Worldwide Remote</p>
              </div>

              <div className="pt-1.5">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playClickSound('success');
                  }}
                  href="#contact"
                  className="w-full text-center py-2.5 border text-[10px] font-accent font-extrabold uppercase tracking-widest transition-all duration-300 block cursor-pointer rounded-lg px-2"
                  style={{
                    borderColor: isGreen ? 'rgba(57, 255, 20, 0.25)' : 'rgba(0, 212, 255, 0.25)',
                    color: isGreen ? '#39FF14' : '#00D4FF',
                    fontFamily: "'Syne', sans-serif"
                  }}
                >
                  Relay New Project ↗
                </motion.a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[10px] text-[#4A5A80]">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-white font-semibold">© {new Date().getFullYear()} Eban Godwin Ikoni. All rights preserved.</p>
            <p className="flex items-center justify-center sm:justify-start gap-1 flex-wrap">
              <span>Sleek engineering optimized for decentralized Web3 standards. Built with precision.</span>
              {onOpenAdmin && (
                <button 
                  onClick={() => {
                    playClickSound('click');
                    onOpenAdmin();
                  }} 
                  className={`px-1 font-bold text-[9px] uppercase tracking-widest bg-transparent border-none p-0 inline-block cursor-pointer font-mono ${textAccentClass} hover:underline`}
                  title="Secure administrator portal authentication gateway"
                >
                  [ DECK_AUTH ]
                </button>
              )}
            </p>
          </div>

          {/* BACK TO TOP BUTTON AND TIP */}
          <div className="flex items-center gap-4">
            <span className="text-[8px] text-[#CAD5EE]/20 uppercase tracking-[0.2em] font-bold hidden lg:inline">
              [ PRESS UP-UP-DOWN-DOWN-LEFT-RIGHT-LEFT-RIGHT-B-A FOR EMULATORS ]
            </span>
            <motion.button
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.85 }}
              onClick={scrollToTop}
              className="w-9 h-9 border border-white/5 rounded-xl flex items-center justify-center text-[#8A9BC4] hover:bg-white/[0.02] transition-all cursor-pointer"
              title="Return to topmost cockpit deck"
              aria-label="Scroll to top"
              style={{
                borderColor: isGreen ? 'rgba(57, 255, 20, 0.15)' : 'rgba(0, 212, 255, 0.15)'
              }}
            >
              <ChevronUp className={`w-4 h-4 ${textAccentClass}`} />
            </motion.button>
          </div>
        </div>

      </div>

      {/* EASTER EGG KONAMI TERMINAL FLYOUT */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="fixed bottom-0 left-0 right-0 h-[240px] z-[99] bg-[#050816] border-t border-[#39FF14]/30 p-6 flex flex-col justify-between font-mono shadow-[0_-15px_40px_rgba(57,255,20,0.15)] text-left"
            style={{
              borderColor: isGreen ? '#39FF14' : '#00D4FF'
            }}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-[#8A9BC4] uppercase tracking-widest font-extrabold font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span>● COCKPIT SYSTEM CONSOLE_ROOT</span>
              </span>
              <button 
                onClick={() => {
                  playClickSound('click');
                  setEasterEggActive(false);
                }}
                className="hover:text-red-400 font-bold transition-colors cursor-pointer text-xs font-mono"
              >
                DISMISS [ESC]
              </button>
            </div>

            {/* Printing outputs */}
            <div className={`flex-grow py-4 overflow-y-auto font-mono text-[12px] space-y-1.5 scrollbar-thin ${textAccentClass}`}>
              {terminalLines.map((line, index) => (
                <div key={index} className="leading-snug animate-fade-in font-mono">
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <div className="border-t border-white/5 pt-2 text-[9px] text-[#8A9BC4] flex justify-between uppercase font-mono">
              <span>DECRYPTED COCKPIT SEC_CORE // LATENCY STABLE</span>
              <span>EST. ENUGU DECK // ONLINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
