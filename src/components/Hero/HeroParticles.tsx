import { useEffect, useRef } from 'react';

interface HeroParticlesProps {
  accentColor: any;
}

export default function HeroParticles({ accentColor }: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 850;
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 20 : 40;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -(Math.random() * 0.25 + 0.08),
      alpha: Math.random() * 0.18 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const getDotColorRGB = (color: string) => {
        switch (color) {
          case 'green': return '57, 255, 20';
          case 'cyan': return '0, 212, 255';
          case 'pink': return '255, 0, 127';
          case 'purple': return '189, 0, 255';
          case 'yellow': return '255, 230, 0';
          default: return '57, 255, 20';
        }
      };
      const dotColor = getDotColorRGB(accentColor);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.alpha})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, [accentColor]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />;
}
