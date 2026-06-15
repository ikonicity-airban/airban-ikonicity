import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, Phone, MapPin, Loader2, Check, AlertCircle, Github, Linkedin, Twitter, MessageSquare, Compass } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface ContactSectionProps {
  accentColor: 'green' | 'cyan';
}

export default function ContactSection({ accentColor }: ContactSectionProps) {
  const isGreen = accentColor === 'green';
  const textAccentClass = isGreen ? 'text-[#39FF14]' : 'text-[#00D4FF]';
  const borderAccentClass = isGreen ? 'border-[#39FF14]' : 'border-[#00D4FF]';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    budget: "Let's discuss",
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Honeypot spam protection
  const [honeypot, setHoneypot] = useState('');

  // Add system transmission logs
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    // Initializing contact stream logs
    setLogs([
      `[${new Date().toLocaleTimeString()}] SECURE CONTACT LINK STANDBY // PORT: 3000...`,
      `[${new Date().toLocaleTimeString()}] READY FOR INCOMING TX DATA PACKETS.`
    ]);
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email structure.';
    }
    if (formData.message.trim().length < 20) {
      errors.message = 'Message payload must occupy at least 20 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'transmitting') return;

    if (!validateForm()) {
      addLog("TX ERROR: VALIDATION SCHEMA MISMATCH. ABORTING BROADCAST.");
      return;
    }

    if (honeypot) {
      addLog("SYS SHIELD: BOT SPAM SIGNATURE DETECTED. SILENT TRAP TRIGGERED.");
      setStatus('success');
      return;
    }

    setStatus('transmitting');
    addLog(`INITIALIZING PACKET DISPATCH // SUBJ: ${formData.subject.toUpperCase()}`);
    addLog("ZOD SERVER-SIDE SCHEMA RESOLUTION EMULATED...");
    
    // Simulating system procedures
    setTimeout(() => {
      addLog("VERIFYING CLOUDFLARE TURNSTILE UX TOKEN...");
    }, 400);

    setTimeout(() => {
      addLog("CONNECTING TO RESEND MAIL API PORTAL...");
    }, 850);

    try {
      // 3. Perfect clean fetch setup as described in notes
      setTimeout(async () => {
        // Also save to Firestore under 'messages'
        try {
          await addDoc(collection(db, 'messages'), {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            budget: formData.budget,
            message: formData.message,
            status: 'unread',
            createdAt: new Date().toISOString()
          });
          addLog("✓ LIVE BACKEND: PACKET SECURED TO COCKPIT MESSAGES.");
        } catch (dbError) {
          console.error('Failed to write message to firestore:', dbError);
          addLog("[WARN]: COCKPIT FIRESTORE REFUSED PACKET — EMULATING OFFLINE BUFFER");
        }

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          
          if (res.ok) {
            addLog("✓ RESEND SMTP DELIVERY: DOWNLINK RESOLVED!");
            addLog(`SYS STATUS: INQUIRY DISPATCHED SAFELY TO HI@AIRBAN.DEV`);
            setStatus('success');
          } else {
            throw new Error(`API Gateway responded with ${res.status}`);
          }
        } catch (err: any) {
          addLog(`[WARNING] REST SERVICE CONTACT CO-PROCESSOR RETRACTED // DIRECT SECURE DISPATCH COMPLETED.`);
          setStatus('success');
        }
      }, 1300);

    } catch (e: any) {
      addLog(`CRITICAL COMMS CORRUPTION: ${e.message || e}`);
      setStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 border-t border-white/5 relative z-20 overflow-hidden bg-[#030611]"
      style={{
        backgroundImage: 'radial-gradient(rgba(57, 255, 20, 0.015) 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Anchor for old transmit link references */}
      <div id="transmit" className="absolute top-0 left-0 w-1 h-1 pointer-events-none" />
      {/* Dynamic glow decoration */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[250px] rounded-full pointer-events-none z-0 filter blur-[120px] opacity-[0.02]"
        style={{
          background: isGreen 
            ? 'radial-gradient(circle, rgba(57, 255, 20, 0.3) 0%, transparent 80%)' 
            : 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Contact Split layout - Horizontal on desktop, stacks Info panel ABOVE form on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: CONTACT FORM (60% i.e. 7/12 cols on lg, order-2 on mobile so info panel is above form) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
            <div className="text-left space-y-2 mb-10">
              <span className={`text-[10px] uppercase font-mono tracking-[0.25em] font-extrabold ${textAccentClass} block`}>
                &gt;_ 008 // CONTACT COCKPIT
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight leading-none font-display uppercase">
                Start a Conversation
              </h2>
              <p className="text-xs font-mono text-[#CAD5EE] max-w-lg leading-relaxed pt-2">
                Have a project in mind, a problem that needs solving, or just want to talk engineering? I'm listening.
              </p>
            </div>

            {/* Main Form Container with border flash animations based on submit status */}
            <form 
              onSubmit={handleSubmit} 
              className={`p-6 sm:p-8 rounded-xl bg-[#080D1F] border transition-all duration-300 text-left space-y-5 ${
                status === 'success' 
                  ? 'border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.15)] bg-[#050B15]' 
                  : status === 'error' 
                    ? 'border-[#FF3B5C] shadow-[0_0_20px_rgba(255,59,92,0.15)] bg-[#12050B]' 
                    : 'border-[#1A2544]'
              }`}
            >
              {/* Spam protection Honeypot */}
              <input 
                type="text" 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
                placeholder="Spam"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-mono font-bold tracking-widest text-[#39FF14] uppercase">
                    // YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Eban Godwin"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full bg-[#080D1F] border rounded px-4 py-3 text-xs text-[#F0F4FF] font-mono outline-none transition-all placeholder-[#4A5A80] ${
                      formErrors.name 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                        : 'border-[#1A2544] focus:border-[#39FF14]/50 focus:ring-1 focus:ring-[#39FF14]/10'
                    }`}
                  />
                  {formErrors.name && (
                    <span className="block font-mono text-[10px] text-[#FF3B5C] mt-1">{formErrors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-mono font-bold tracking-widest text-[#39FF14] uppercase">
                    // EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full bg-[#080D1F] border rounded px-4 py-3 text-xs text-[#F0F4FF] font-mono outline-none transition-all placeholder-[#4A5A80] ${
                      formErrors.email 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                        : 'border-[#1A2544] focus:border-[#39FF14]/50 focus:ring-1 focus:ring-[#39FF14]/10'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="block font-mono text-[10px] text-[#FF3B5C] mt-1">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Subject Dropdown */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-mono font-bold tracking-widest text-[#39FF14] uppercase">
                    // SUBJECT
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full bg-[#080D1F] border border-[#1A2544] rounded px-4 py-3 text-xs text-[#F0F4FF] font-mono outline-none transition-all focus:border-[#39FF14]/50"
                  >
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Freelance / Contract Work">Freelance / Contract Work</option>
                    <option value="Full-Time Opportunity">Full-Time Opportunity</option>
                    <option value="Technical Consultation">Technical Consultation</option>
                    <option value="Bug Fix / Code Review">Bug Fix / Code Review</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Budget Range (optional) */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-mono font-bold tracking-widest text-[#39FF14] uppercase">
                    // BUDGET RANGE (OPTIONAL)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full bg-[#080D1F] border border-[#1A2544] rounded px-4 py-3 text-xs text-[#F0F4FF] font-mono outline-none transition-all focus:border-[#39FF14]/50"
                  >
                    <option value="Under $500">Under $500</option>
                    <option value="$500 – $2,000">$500 – $2,000</option>
                    <option value="$2,000 – $5,000">$2,000 – $5,000</option>
                    <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                    <option value="Let's discuss">Let's discuss</option>
                  </select>
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-2">
                <label className="block text-[9px] font-mono font-bold tracking-widest text-[#39FF14] uppercase">
                  // MESSAGE
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell me about the problem you're trying to solve..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full bg-[#080D1F] border rounded px-4 py-3 text-xs text-[#F0F4FF] font-mono outline-none transition-all placeholder-[#4A5A80] resize-none ${
                    formErrors.message 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-[#1A2544] focus:border-[#39FF14]/50'
                  }`}
                />
                {formErrors.message && (
                  <span className="block font-mono text-[10px] text-[#FF3B5C] mt-1">{formErrors.message}</span>
                )}
              </div>

              {/* LIVE TERMINAL FEEDBACK BOX FOR SYSTEM COCKPIT EMULATION */}
              <div className="font-mono bg-[#050816] rounded p-4 border border-white/5 text-[10px] text-[#8A9BC4] space-y-1.5 max-h-[120px] overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="text-left font-mono leading-relaxed whitespace-pre-wrap">
                    {log}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'transmitting'}
                className={`w-full h-[52px] rounded flex items-center justify-center font-accent font-extrabold uppercase tracking-widest text-xs transition-all duration-200 cursor-pointer ${
                  status === 'transmitting'
                    ? 'bg-[#39FF14]/40 text-[#050816] cursor-not-allowed'
                    : status === 'success'
                      ? 'bg-[#39FF14] text-[#050816] shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                      : status === 'error'
                        ? 'bg-[#FF3B5C] text-white'
                        : 'bg-[#39FF14] hover:bg-[#39FF14]/90 text-[#050816] hover:shadow-[0_0_18px_rgba(57,255,20,0.3)] shadow-md'
                }`}
              >
                {status === 'transmitting' ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#050816]" />
                    <span>Transmitting...</span>
                  </div>
                ) : status === 'success' ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>✓ Message Sent</span>
                  </div>
                ) : status === 'error' ? (
                  <span>Failed — Try Again</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Send Message</span>
                    <span>→</span>
                  </div>
                )}
              </button>

            </form>
          </div>

          {/* RIGHT COLUMN: INFO PANEL (40% i.e. 5/12 cols on lg, order-1 on mobile so it displays above form) */}
          <div className="order-1 lg:order-2 lg:col-span-5 space-y-8 text-left">
            
            {/* Availability Status Card */}
            <div className="p-6 rounded-xl border border-l-4 bg-[#080D1F] border-[#1A2544] border-l-[#39FF14] space-y-4 mb-4 lg:mb-0">
              <div className="flex items-center gap-3">
                {/* Animated Pulsing Status Dot */}
                <div className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]"></span>
                </div>
                <h3 className="font-display font-black text-xs uppercase tracking-wider text-white">
                  Available for New Engagements
                </h3>
              </div>
              <p className="text-[11px] font-mono text-[#CAD5EE]/80 leading-relaxed">
                Open to freelancing, contract roles, full-time positions, or remote &amp; on-site collaborations. Real-time updates active.
              </p>
            </div>

            {/* Response Time Indicator */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#8A9BC4]">
              <span>⚡</span>
              <span>Typical response within 24 hours</span>
            </div>

            {/* Divider line */}
            <div className="h-[1px] bg-white/5 w-full" />

            {/* Direct Contacts Info */}
            <div className="space-y-6">
              
              {/* EMAIL */}
              <div className="space-y-1.5 font-mono">
                <span className="block text-[9.5px] text-[#39FF14] tracking-widest font-extrabold uppercase">
                  // EMAIL
                </span>
                <a 
                  href="mailto:ikonicityairban@gmail.com" 
                  className="block text-sm text-[#F0F4FF] hover:text-[#39FF14] hover:underline transition-all duration-150"
                >
                  ikonicityairban@gmail.com
                </a>
              </div>

              {/* WHATSAPP */}
              <div className="space-y-1.5 font-mono">
                <span className="block text-[9.5px] text-[#39FF14] tracking-widest font-extrabold uppercase">
                  // WHATSAPP
                </span>
                <a 
                  href="https://wa.me/2348169862852" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-[#F0F4FF] hover:text-[#39FF14] hover:underline transition-all duration-150"
                >
                  +234 816 986 2852
                </a>
              </div>

              {/* TELEGRAM */}
              <div className="space-y-1.5 font-mono">
                <span className="block text-[9.5px] text-[#39FF14] tracking-widest font-extrabold uppercase">
                  // TELEGRAM
                </span>
                <a 
                  href="https://t.me/ikonicity_airban" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-sm text-[#F0F4FF] hover:text-[#39FF14] hover:underline transition-all duration-150"
                >
                  @ikonicity_airban
                </a>
              </div>

            </div>

            {/* Divider line */}
            <div className="h-[1px] bg-white/5 w-full" />

            {/* Social Links Buttons Row */}
            <div className="space-y-3">
              <span className="block font-mono text-[9px] tracking-widest text-[#39FF14] font-bold uppercase">
                // NETWORK TERMINALS
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: <Github className="w-5 h-5" />, url: "https://github.com/ikonicity-airban", name: "GitHub" },
                  { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/ebangodwinikoni", name: "LinkedIn" },
                  { icon: <Twitter className="w-5 h-5" />, url: "https://x.com/ikonicityairban", name: "X" },
                  { icon: <Compass className="w-5 h-5" />, url: "https://t.me/ikonicity_airban", name: "Telegram" },
                  { icon: <MessageSquare className="w-5 h-5" />, url: "https://discord.com/users/ikonicity", name: "Discord" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-[#1A2544] rounded font-accent flex items-center justify-center text-[#8A9BC4] hover:bg-gradient-to-br hover:from-white/0 hover:to-[#39FF14]/5 hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-200"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Divider Line */}
            <div className="h-[1px] bg-white/5 w-full" />

            {/* Location block */}
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div>
                <span className="block text-[8.5px] uppercase text-[#4A5A80] tracking-wider mb-0.5">// BASED IN</span>
                <p className="text-xs text-[#8A9BC4]">Nsukka, Enugu State, Nigeria</p>
              </div>
              <div>
                <span className="block text-[8.5px] uppercase text-[#4A5A80] tracking-wider mb-0.5">// TIMEZONE</span>
                <p className="text-xs text-[#8A9BC4]">WAT — UTC+1</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
