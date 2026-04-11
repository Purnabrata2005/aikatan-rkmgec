"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  finishLoading: () => void;
}

const CulturalTapestryLoader = ({ finishLoading }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progress simulates the time it takes to load assets
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 600); // Linger at 100% briefly
          setTimeout(finishLoading, 1600); // Wait for the fade-out animation
          return 100;
        }
        // Easing: starts fast, slows down at the end
        const increment = prev > 85 ? 0.5 : prev > 50 ? 1 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [finishLoading]);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      setSmoothProgress((prev) => {
        const delta = progress - prev;
        if (Math.abs(delta) < 0.05) return progress;
        return prev + delta * 0.18;
      });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [progress]);

  // Prevent scrolling while the loading screen is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // An SVG Mandala/Rangoli component to keep the markup clean
  const TapestryMotif = ({ isForeground = false }: { isForeground?: boolean }) => (
    <svg
      viewBox="0 0 240 240"
      className="w-full h-full drop-shadow-2xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definition (Only needed in foreground) */}
      {isForeground && (
        <defs>
          <linearGradient id="tapestryGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#b91c1c" />   {/* Deep Crimson */}
            <stop offset="50%" stopColor="#ea580c" />  {/* Warm Orange */}
            <stop offset="100%" stopColor="#0284c7" /> {/* Cerulean Blue */}
          </linearGradient>
        </defs>
      )}

      <g
        stroke={isForeground ? "url(#tapestryGrad)" : "rgba(146, 64, 14, 0.2)"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer dotted circle */}
        <circle cx="120" cy="120" r="110" strokeDasharray="4 6" strokeWidth="1.5" />
        
        {/* The 8-pointed star / lotus base */}
        <path d="M120 15 L145 95 L225 120 L145 145 L120 225 L95 145 L15 120 L95 95 Z" strokeWidth="3" />
        
        {/* Overlapping diamonds */}
        <polygon points="120,40 200,120 120,200 40,120" />
        <polygon points="120,65 175,120 120,175 65,120" />
        
        {/* Corner flourishes */}
        <path d="M45 45 Q 80 80 120 65" />
        <path d="M195 45 Q 160 80 120 65" />
        <path d="M45 195 Q 80 160 120 175" />
        <path d="M195 195 Q 160 160 120 175" />
        
        {/* Inner holding circle for text */}
        <circle cx="120" cy="120" r="48" strokeWidth="1" />
      </g>
    </svg>
  );

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#18110c] overflow-hidden select-none font-sans"
        >
          {/* Ambient Terra Cotta Glow */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-[#18110c] to-black"
            animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Soft moving mesh to avoid a static background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 25%, rgba(245, 158, 11, 0.18) 0%, transparent 35%), radial-gradient(circle at 78% 72%, rgba(14, 116, 144, 0.22) 0%, transparent 38%)",
            }}
            animate={{ x: [0, 20, -20, 0], y: [0, -12, 8, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative w-[340px] h-[340px] flex items-center justify-center mt-[-40px]">
            
            {/* 1. Base Layer: Dim / Monochromatic */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <TapestryMotif />
            </motion.div>

            {/* 2. Fill Layer: Vibrant Color (Revealed bottom-to-top) */}
            <motion.div
              className="absolute inset-0"
              style={{
                // CSS clip-path hides the top portion based on progress
                // inset(top right bottom left) -> inset(100% 0 0 0) means fully hidden
                clipPath: `inset(${100 - smoothProgress}% 0 0 0)`,
                transition: "clip-path 0.1s ease-out",
              }}
              animate={{ rotate: [0, -1.5, 0, 1.5, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            >
              <TapestryMotif isForeground={true} />
              
              {/* Optional: Add a glowing bar at the intersection point of the fill */}
              <div 
                className="absolute w-full h-[2px] bg-amber-200/50 blur-[2px]"
                style={{ bottom: `${smoothProgress}%` }}
              />
            </motion.div>

            {[0, 1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className="absolute w-2 h-2 rounded-full bg-amber-200/70 blur-[0.5px]"
                style={{ left: "50%", top: "50%" }}
                animate={{
                  x: [0, Math.cos((dot * Math.PI) / 2) * 105, 0],
                  y: [0, Math.sin((dot * Math.PI) / 2) * 105, 0],
                  opacity: [0, 1, 0],
                  scale: [0.7, 1.2, 0.7],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot * 0.35,
                }}
              />
            ))}

            {/* 3. Central Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center drop-shadow-md">
              <motion.div
                className="text-amber-100/90 font-serif font-bold tracking-tighter"
                style={{
                  fontSize: smoothProgress >= 99.9 ? "3rem" : "2.75rem",
                  transition: "font-size 0.5s ease-out",
                }}
                animate={{ textShadow: ["0 0 0px rgba(251,191,36,0)", "0 0 16px rgba(251,191,36,0.45)", "0 0 0px rgba(251,191,36,0)"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {Math.floor(smoothProgress)}
                <span className="text-xl text-amber-500/80 ml-1 font-sans">%</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Status Area */}
          <div className="absolute bottom-24 flex flex-col items-center gap-4 w-full">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <span className="text-amber-700/60 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
                Cultural Synergy
              </span>
              <span className="text-amber-200/90 text-lg md:text-xl tracking-[0.2em] font-serif uppercase drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                Gathering the Arts
              </span>
            </motion.div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CulturalTapestryLoader;