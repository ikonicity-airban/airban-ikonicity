import { useEffect, useRef } from 'react';
import { AccentColor } from '../types';
import { getAccentHex } from '../utils';

interface CyberpunkParticlesProps {
  accentColor: AccentColor;
}

export default function CyberpunkParticles({ accentColor }: CyberpunkParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Map AccentColor to RGB for alpha-channel line rendering in Canvas context
  const getRGB = (color: AccentColor) => {
    switch (color) {
      case 'green': return '57, 255, 20';
      case 'cyan': return '0, 212, 255';
      case 'pink': return '255, 0, 127';
      case 'purple': return '189, 0, 255';
      case 'yellow': return '255, 230, 0';
      default: return '57, 255, 20';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Detect parent resizes with ResizeObserver (Desktop and Mobile safe)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas.parentElement) {
          width = canvas.width = entry.contentRect.width || canvas.offsetWidth;
          height = canvas.height = entry.contentRect.height || canvas.offsetHeight;
          initParticles();
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      char?: string;
      pulseSpeed: number;
      pulseDir: number;
    }

    let particles: Particle[] = [];
    const maxParticles = Math.min(60, Math.floor((width * height) / 18000));

    const initParticles = () => {
      particles = [];
      const binaryChars = ['0', '1', '▢', '⏽', '▲', '◆'];
      for (let i = 0; i < maxParticles; i++) {
        // 20% of particles are cyber symbols
        const isSymbol = Math.random() < 0.25;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: isSymbol ? Math.random() * 4 + 6 : Math.random() * 1.5 + 1,
          alpha: Math.random() * 0.4 + 0.1,
          char: isSymbol ? binaryChars[Math.floor(Math.random() * binaryChars.length)] : undefined,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulseDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    initParticles();

    // Glitchy scanner line sweep attributes
    let scanY = 0;
    const scanSpeed = 1.2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle retro digital grid
      ctx.strokeStyle = `rgba(${getRGB(accentColor)}, 0.015)`;
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Scanner Line
      scanY += scanSpeed;
      if (scanY > height) scanY = 0;
      const scanGradient = ctx.createLinearGradient(0, scanY - 60, 0, scanY);
      scanGradient.addColorStop(0, `rgba(${getRGB(accentColor)}, 0)`);
      scanGradient.addColorStop(0.5, `rgba(${getRGB(accentColor)}, 0.025)`);
      scanGradient.addColorStop(1, `rgba(${getRGB(accentColor)}, 0)`);
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 60, width, 60);

      // Render & update particles
      const rgbStr = getRGB(accentColor);
      const hexStr = getAccentHex(accentColor);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slowly drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha for "glowing network" feel
        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha > 0.6) {
          p.alpha = 0.6;
          p.pulseDir = -1;
        } else if (p.alpha < 0.08) {
          p.alpha = 0.08;
          p.pulseDir = 1;
        }

        ctx.fillStyle = `rgba(${rgbStr}, ${p.alpha})`;

        if (p.char) {
          // Draw alphanumeric or cyber graphic bit representation
          ctx.font = `bold ${p.size}px "JetBrains Mono", monospace`;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          // Draw clean standard node dots
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Subtly larger glow
          ctx.fillStyle = `rgba(${rgbStr}, ${p.alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connect nearby particles (Plexus effect, suggesting high-density connectivity grid)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 95;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.07 * Math.min(p.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(${rgbStr}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [accentColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.45]"
    />
  );
}
