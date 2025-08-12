'use client';

import { useEffect, useState } from 'react';

// Matrix rain effect component
export function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ffff';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="matrix-canvas"
      className="fixed inset-0 pointer-events-none opacity-10 z-0"
    />
  );
}

// Glitch text effect
export function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${className} ${isGlitching ? 'animate-glitch' : ''}`}>
      {children}
    </span>
  );
}

// Cyber loading bar
export function CyberLoadingBar({ progress = 100 }: { progress?: number }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-2 border border-cyan-500/30">
      <div 
        className="bg-gradient-to-r from-cyan-400 to-pink-400 h-full rounded-full transition-all duration-1000 relative overflow-hidden"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}

// Floating particles
export function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      color: ['#00ffff', '#ff0080', '#00ff41'][Math.floor(Math.random() * 3)],
      speed: Math.random() * 2 + 0.5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            animation: `float ${10 + particle.speed}s infinite linear`
          }}
        />
      ))}
    </div>
  );
}

// Cyber terminal window
export function CyberTerminal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="cyber-card font-mono">
      {/* Terminal header */}
      <div className="flex items-center justify-between p-3 border-b border-cyan-500/30 bg-cyan-500/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm cyber-text">{title}</span>
        </div>
        <div className="text-xs text-cyan-400/50">SECURE CONNECTION</div>
      </div>
      
      {/* Terminal content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}