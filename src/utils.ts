/**
 * Shared Dynamic Utilities for Airban Ikonicity Portfolio
 */

/**
 * Web Audio API synthesizer for clean futuristic tactile feedback sounds
 */
export const playClickSound = (type: 'click' | 'success' | 'synth' | 'hover' = 'click') => {
  if (typeof window === 'undefined') return;
  
  // Respect ambient sound user preferences from localStorage
  const isMuted = localStorage.getItem('bg_video_muted') !== 'false';
  if (isMuted) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'hover') {
      // Very soft, high-frequency elegant tactile hover tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

      osc.start();
      osc.stop(ctx.currentTime + 0.015);
      return;
    }

    if (type === 'click') {
      // Direct, clean futuristic physical click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'success') {
      // Sleek double chime chord
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6
      osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12); // A6

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc1.start();
      osc1.stop(ctx.currentTime + 0.25);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.25);
    } else if (type === 'synth') {
      // Clean harmonic sweep tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(980, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (err) {
    // Fail silently without disrupting user experience
    console.debug('Web Audio API not supported yet or blocked by policy', err);
  }
};

/**
 * Portable function to download Eban Godwin Ikoni's custom synthetic PDF resume
 */
export const handleDownloadCV = () => {
  const pdfContent = `%PDF-1.4
%âãÏÓ
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595.275 841.889] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 1200 >>
stream
BT
/F1 18 Tf
50 780 Td
(EBAN GODWIN IKONI - FULL-STACK ENGINEER) Tj
/F1 11 Tf
0 -30 Td
(Email: ikonicityairban@gmail.com | Phone: 08169862852 | Address: Nsukka Enugu State) Tj
0 -15 Td
(GitHub: https://github.com/ikonicity-airban) Tj
0 -30 Td
(SUMMARY) Tj
0 -15 Td
(Full-Stack Software Engineer with a solid background in Electronics & Computer Engineering.) Tj
0 -15 Td
(A proven builder specialized in scalable systems, AI workflow automation, and mobile platforms.) Tj
0 -30 Td
(CORE SKILLS) Tj
0 -15 Td
(Languages: TypeScript, JavaScript, Python, Rust, Solidity, C, C#) Tj
0 -15 Td
(Frontend: React, Next.js, React Native (Expo), Tailwind CSS, Framer Motion) Tj
0 -15 Td
(Backend & Database: Node.js, Express, Hono, FastAPI, PostgreSQL, SQLite, Redis) Tj
0 -15 Td
(Cloud & DevOps: Docker, Nginx, CI/CD, AWS, DigitalOcean) Tj
0 -15 Td
(AI & Web3: AI Agent workflows, LLM integration, WhatsApp automation, Solidity smart contracts) Tj
0 -30 Td
(PROFESSIONAL EXPERIENCE) Tj
0 -15 Td
(Founder & Lead Engineer - CodeOven Technologies Inc. & Geek Creations) Tj
0 -15 Td
(Lead Developer & Software Engineer - SOFE Group (2023 - 2024)) Tj
0 -15 Td
(Software Consultant - PWorld Concepts (iCatholic Igbo Mobile Application, serving 70,000+ users)) Tj
0 -30 Td
(EDUCATION) Tj
0 -15 Td
(B.Eng. in Electronics & Computer Engineering - University of Nigeria, Nsukka (2018 - 2023)) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000062 00000 n 
0000000119 00000 n 
0000000244 00000 n 
0000000311 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1580
%%EOF`;

  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Eban_Godwin_Ikoni_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Normalizes video URLs, specifically converting Cloudinary console asset managers (asset.cloudinary.com)
 * into high-performance, direct browser-streaming delivery paths (res.cloudinary.com) with MP4 format.
 */
export const normalizeVideoUrl = (url: string): string => {
  if (!url) return '';
  
  const trimmed = url.trim();
  const assetRegex = /https?:\/\/asset\.cloudinary\.com\/([^/]+)\/([^/]+)/i;
  const match = trimmed.match(assetRegex);
  if (match) {
    const cloudName = match[1];
    const publicId = match[2];
    return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
  }
  
  return trimmed;
};

