'use client';
import { useEffect, useRef } from 'react';

export default function FloatingMusicIcons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Fast check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Detect mobile for lightweight particle count to keep performance incredibly high
    const isMobile = window.innerWidth <= 768;
    const numIcons = isMobile ? 12 : 32; // Cut by 50% as requested
    
    let animationFrameId: number;
    let icons: any[] = [];
    
    // Path pre-compilation for lightning-fast 60fps renders!
    const starPath = new Path2D("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z");
    const sparklePath = new Path2D("m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z M5.5 5.5l1.5 1.5 M18.5 5.5l-1.5 1.5");

    // Distinct cultural accent colors
    const colors = [
      'rgba(217, 70, 239, OPACITY)', // fuchsia
      'rgba(251, 191, 36, OPACITY)', // amber
      'rgba(244, 63, 94, OPACITY)'   // rose
    ];

    class MusicIcon {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      wobble: number;
      wobbleSpeed: number;
      colorStr: string;
      iconType: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1.5 + 0.8; // Uniform scale
        this.speedY = -(Math.random() * 2.0 + 0.8); // Faster vertical rise!
        this.speedX = (Math.random() - 0.5) * 1.2; // Increased sideways drift!
        this.opacity = Math.random() * 0.20 + 0.10; // 10% to 30% opacity max (brighter!)
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.015;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.iconType = Math.floor(Math.random() * 3); // 0=Music, 1=Star, 2=Sparkles
        
        const template = colors[Math.floor(Math.random() * colors.length)];
        this.colorStr = template.replace('OPACITY', this.opacity.toFixed(2));
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotSpeed;

        // Wrap around gracefully when out of bounds
        if (this.y < -50) {
          this.y = window.innerHeight + 50;
          this.x = Math.random() * window.innerWidth;
        }
        if (this.x < -50) this.x = window.innerWidth + 50;
        if (this.x > window.innerWidth + 50) this.x = -50;
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.scale(this.size, this.size);
        // Translate to center the icon (Lucide music note box is 24x24, center is ~12x12)
        ctx!.translate(-12, -12);
        
        ctx!.strokeStyle = this.colorStr;
        ctx!.lineWidth = 1.5;
        ctx!.lineCap = 'round';
        ctx!.lineJoin = 'round';
        
        if (this.iconType === 0) {
          // Draw standard Lucide Music Note
          ctx!.beginPath();
          ctx!.moveTo(9, 18);
          ctx!.lineTo(9, 5);
          ctx!.lineTo(21, 3);
          ctx!.lineTo(21, 16);
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.arc(6, 18, 3, 0, Math.PI * 2);
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.arc(18, 16, 3, 0, Math.PI * 2);
          ctx!.stroke();
        } else if (this.iconType === 1) {
          ctx!.stroke(starPath);
        } else {
          ctx!.stroke(sparklePath);
        }
        
        ctx!.restore();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      icons = [];
      for (let i = 0; i < numIcons; i++) {
        icons.push(new MusicIcon());
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < icons.length; i++) {
        icons[i].update();
        icons[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
