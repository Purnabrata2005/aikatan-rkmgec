'use client';
import { useEffect, useRef } from 'react';

export default function TechNexusCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Respect accessibility and touch devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchDevice) return;

    let particles = [];
    let animationFrameId;
    let mouse = { x: -1000, y: -1000 };
    let rotation = 0;

    // Techfest colors tailored for a brownish/earthy website
    const colors = ['#D97736', '#F2A65A', '#8C4615', '#E5B15D'];
    const maxParticles = 40; 
    const connectionDistance = 80; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class NodeParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        
        // Give the tail particles a slight drift
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 1.5; 
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.hexToRgb(this.color)}, ${this.life})`;
        ctx.fill();
      }

      hexToRgb(hex) {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
      }
    }

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn new tail nodes as the mouse moves
      if (particles.length < maxParticles) {
        // Spawn slightly behind/around the center
        const offsetX = (Math.random() - 0.5) * 15;
        const offsetY = (Math.random() - 0.5) * 15;
        particles.push(new NodeParticle(mouse.x + offsetX, mouse.y + offsetY));
      }
    };

    window.addEventListener('pointermove', handlePointerMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Additive blending for the glowing tail network
      ctx.globalCompositeOperation = 'lighter';

      // --- 1. DRAW THE NODE NETWORK TAIL ---
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw structural lines between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const opacity = (1 - (distance / connectionDistance)) * Math.min(particles[i].life, particles[j].life);
            ctx.strokeStyle = `rgba(217, 119, 54, ${opacity * 0.7})`; 
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw lines from the tail nodes directly to the active cursor head
        const mouseDx = particles[i].x - mouse.x;
        const mouseDy = particles[i].y - mouse.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDistance < connectionDistance && mouse.x !== -1000) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const mouseOpacity = (1 - (mouseDistance / connectionDistance)) * particles[i].life;
          ctx.strokeStyle = `rgba(229, 169, 60, ${mouseOpacity * 0.8})`; 
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Remove dead particles
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      // --- 2. DRAW THE ROTATING TECH HEAD ---
      if (mouse.x !== -1000) {
        // Switch back to normal blending so the head looks solid and sharp
        ctx.globalCompositeOperation = 'source-over';
        
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        rotation += 0.025; 
        ctx.rotate(rotation);

        // Outer dashed tech ring (Rust/Copper)
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(184, 93, 25, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]); 
        ctx.stroke();
        ctx.setLineDash([]); 

        // Inner solid ring (Bright Gold)
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(229, 169, 60, 1)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Precise center target dot
        ctx.beginPath();
        ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
}