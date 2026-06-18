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

    // Detect parent dynamic resizes with ResizeObserver (Desktop and Mobile safe)
    const resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!canvas) return;
        for (const entry of entries) {
          if (entry.target === canvas.parentElement) {
            const newW = entry.contentRect.width || canvas.offsetWidth;
            const newH = entry.contentRect.height || canvas.offsetHeight;
            if (newW !== width || newH !== height) {
              width = canvas.width = newW;
              height = canvas.height = newH;
              initPhysics();
            }
          }
        }
      });
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    interface CircuitNode {
      id: number;
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      glowIntensity: number;
      pulseSpeed: number;
      pulsePhase: number;
      neighbors: number[]; // indices of connected nodes
    }

    interface Electron {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      currentX: number;
      currentY: number;
      progress: number;
      speed: number;
      startNodeIndex: number;
      endNodeIndex: number;
      pathStyle: 'direct' | 'orthogonal'; // neural synapse (direct) vs integrated circuit (orthogonal/L-shaped)
    }

    let nodes: CircuitNode[] = [];
    let electrons: Electron[] = [];

    const initPhysics = () => {
      nodes = [];
      electrons = [];

      // Scale density of elements based on screen size safely
      const area = width * height;
      const numNodes = Math.min(50, Math.max(16, Math.floor(area / 26000)));

      // Step 1: Create nodes distributed across space
      for (let i = 0; i < numNodes; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          id: i,
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: Math.random() * 1.8 + 1.2, // synaptic body size
          glowIntensity: Math.random() * 0.4 + 0.35,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulsePhase: Math.random() * Math.PI * 2,
          neighbors: []
        });
      }

      // Step 2: Establish connection graph (PCBs / synaptic paths)
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        // Sort other nodes by distance
        const distances = nodes
          .map((n, idx) => ({ index: idx, dist: Math.hypot(n.x - n1.x, n.y - n1.y) }))
          .filter(item => item.index !== i)
          .sort((a, b) => a.dist - b.dist);

        // Connect to nearest 2 or 3 nodes
        const degree = Math.random() > 0.6 ? 3 : 2;
        for (let d = 0; d < Math.min(degree, distances.length); d++) {
          const nearestIdx = distances[d].index;
          if (!n1.neighbors.includes(nearestIdx) && distances[d].dist < width * 0.28) {
            n1.neighbors.push(nearestIdx);
            // Bidirectional connection for clean mesh representation
            if (!nodes[nearestIdx].neighbors.includes(i)) {
              nodes[nearestIdx].neighbors.push(i);
            }
          }
        }
      }

      // Step 3: Populate traveling electrons / impulses
      const numElectrons = Math.min(22, Math.max(8, Math.floor(numNodes / 1.8)));
      for (let i = 0; i < numElectrons; i++) {
        spawnElectron();
      }
    };

    const spawnElectron = (fromNodeIndex?: number) => {
      if (nodes.length === 0) return;

      const startIndex = fromNodeIndex !== undefined ? fromNodeIndex : Math.floor(Math.random() * nodes.length);
      const startNode = nodes[startIndex];

      if (startNode.neighbors.length === 0) {
        // If node has no neighbors, choose random target node
        const endIndex = Math.floor(Math.random() * nodes.length);
        if (endIndex === startIndex) return;
        const endNode = nodes[endIndex];
        electrons.push({
          startX: startNode.x,
          startY: startNode.y,
          endX: endNode.x,
          endY: endNode.y,
          currentX: startNode.x,
          currentY: startNode.y,
          progress: 0,
          speed: Math.random() * 0.006 + 0.003,
          startNodeIndex: startIndex,
          endNodeIndex: endIndex,
          pathStyle: Math.random() > 0.4 ? 'direct' : 'orthogonal'
        });
      } else {
        // Choose one of its connected neighbors
        const neighborIdx = startNode.neighbors[Math.floor(Math.random() * startNode.neighbors.length)];
        const endNode = nodes[neighborIdx];
        electrons.push({
          startX: startNode.x,
          startY: startNode.y,
          endX: endNode.x,
          endY: endNode.y,
          currentX: startNode.x,
          currentY: startNode.y,
          progress: 0,
          speed: Math.random() * 0.010 + 0.005,
          startNodeIndex: startIndex,
          endNodeIndex: neighborIdx,
          pathStyle: Math.random() > 0.45 ? 'direct' : 'orthogonal'
        });
      }
    };

    initPhysics();

    // Glitchy scanner line sweep attributes
    let scanY = 0;
    const scanSpeed = 1.0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const rgbStr = getRGB(accentColor);

      // --- Draw Subtle Silicon Grid Background ---
      ctx.strokeStyle = `rgba(${rgbStr}, 0.012)`;
      ctx.lineWidth = 1;
      const gridSize = 55;
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

      // --- Draw Space Scanner Sweep Line ---
      scanY += scanSpeed;
      if (scanY > height) scanY = 0;
      const scanGradient = ctx.createLinearGradient(0, scanY - 80, 0, scanY);
      scanGradient.addColorStop(0, `rgba(${rgbStr}, 0)`);
      scanGradient.addColorStop(0.5, `rgba(${rgbStr}, 0.012)`);
      scanGradient.addColorStop(1, `rgba(${rgbStr}, 0)`);
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 80, width, 80);

      // --- Draw Connective Tracks (Conducting Pathways / Synaptic Links) ---
      ctx.lineWidth = 0.8;
      nodes.forEach(n => {
        n.neighbors.forEach(neighborIdx => {
          const neighbor = nodes[neighborIdx];
          if (neighbor.id > n.id) { // Draw once per unique pair
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.strokeStyle = `rgba(${rgbStr}, 0.045)`;
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        });
      });

      // --- Update & Draw Nodes (Synapses / Circuit Gates) ---
      nodes.forEach(n => {
        // Slow organic brownian drift
        n.pulsePhase += n.pulseSpeed;
        const driftX = Math.sin(n.pulsePhase) * 1.5;
        const driftY = Math.cos(n.pulsePhase * 0.8) * 1.5;
        n.x = n.baseX + driftX;
        n.y = n.baseY + driftY;

        // Oscillate brightness slightly
        const currentGlow = n.glowIntensity + Math.sin(n.pulsePhase * 1.8) * 0.12;
        
        ctx.fillStyle = `rgba(${rgbStr}, ${currentGlow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();

        // Node surrounding halo
        ctx.fillStyle = `rgba(${rgbStr}, ${currentGlow * 0.22})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Update & Draw Electron Currents (Traveling Wave impulses) ---
      const activeElectrons: Electron[] = [];

      electrons.forEach(e => {
        e.progress += e.speed;

        // Keep starting/ending vectors dynamic to correspond with flowing nodes
        const startNode = nodes[e.startNodeIndex];
        const endNode = nodes[e.endNodeIndex];

        if (startNode && endNode) {
          e.startX = startNode.x;
          e.startY = startNode.y;
          e.endX = endNode.x;
          e.endY = endNode.y;
        }

        // Calculate current coordinates based on layout style
        if (e.pathStyle === 'orthogonal') {
          // Orthogonal PCB trace (horizontal then vertical step path)
          const midX = e.startX + (e.endX - e.startX) * 0.5;
          if (e.progress < 0.5) {
            const pNorm = e.progress / 0.5;
            e.currentX = e.startX + (midX - e.startX) * pNorm;
            e.currentY = e.startY;
          } else {
            const pNorm = (e.progress - 0.5) / 0.5;
            e.currentX = midX;
            e.currentY = e.startY + (e.endY - e.startY) * pNorm;
          }
        } else {
          // Direct straight synaptic connection path
          e.currentX = e.startX + (e.endX - e.startX) * e.progress;
          e.currentY = e.startY + (e.endY - e.startY) * e.progress;
        }

        // Draw electron energy head
        ctx.fillStyle = `rgba(${rgbStr}, 0.88)`;
        ctx.beginPath();
        ctx.arc(e.currentX, e.currentY, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Electron outer glow dispersion
        ctx.fillStyle = `rgba(${rgbStr}, 0.24)`;
        ctx.beginPath();
        ctx.arc(e.currentX, e.currentY, 5.0, 0, Math.PI * 2);
        ctx.fill();

        // Keep or complete electron trajectory
        if (e.progress < 1) {
          activeElectrons.push(e);
        } else {
          // Signal reached terminal node - pulse glow to indicate electrical handshake
          if (endNode) {
            endNode.glowIntensity = Math.min(1.0, endNode.glowIntensity + 0.32);
          }
          // Propagate the impulse onwards
          spawnElectron(e.endNodeIndex);
        }
      });

      electrons = activeElectrons;

      // Maintain electron populations nicely
      while (electrons.length < Math.min(12, Math.floor(nodes.length / 2.2))) {
        spawnElectron();
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
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-[#050816]">
      {/* Dynamic Electron-Neuron Circuit Canvas with delicate hardware feel and hardware-accelerated subtle blur */}
      <canvas 
        ref={canvasRef} 
        style={{ filter: 'blur(1.2px)' }}
        className="absolute inset-0 w-full h-full opacity-[0.45]"
      />
      
      {/* Vignette Overlay & Darkening Backdrop to guarantee incredible contrast for text content */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#050816]/75 via-transparent to-[#050816]/80 mix-blend-multiply" 
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050816_90%)]"
      />
    </div>
  );
}
