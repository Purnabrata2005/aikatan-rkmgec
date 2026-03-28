"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  finishLoading: () => void;
}

const OrbitalLoader = ({ finishLoading }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth 2-second progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 400); // Slight pause at 100%
          setTimeout(finishLoading, 1200); // Wait for exit animation
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [finishLoading]);

  // Prevent scrolling while loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1b120c] overflow-hidden select-none font-sans"
        >
          {/* Warm Brown Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/25 via-[#1b120c] to-[#120b07]" />

          {/* Central Animated Mechanics */}
          <div className="relative flex items-center justify-center">
            
            {/* Outer Copper Ring (Slow, Clockwise) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-[320px] h-[320px] rounded-full border border-amber-900/40"
              style={{ borderTopColor: "#b45309", borderRightColor: "transparent" }}
            />

            {/* Middle Brass Ring (Medium, Counter-Clockwise) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-[250px] h-[250px] rounded-full border border-amber-900/50"
              style={{ borderBottomColor: "#d97706", borderLeftColor: "transparent" }}
            />

            {/* Inner Bronze Dashed Ring (Pulsing) */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[190px] h-[190px] rounded-full border-[2px] border-dashed border-orange-700/40"
            />

            {/* Glowing Core */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(217, 119, 6, 0.15)",
                  "0 0 60px rgba(180, 83, 9, 0.5)",
                  "0 0 20px rgba(217, 119, 6, 0.15)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-36 h-36 bg-[#22160f]/90 backdrop-blur-xl rounded-full flex items-center justify-center border border-amber-500/40"
            >
              {/* Inner Core Border Accent */}
              <div className="absolute inset-2 border border-orange-600/40 rounded-full" />
              
              {/* Percentage Text */}
              <div className="text-amber-300 text-4xl font-bold tracking-wider z-10 drop-shadow-[0_0_10px_rgba(217,119,6,0.8)]">
                {progress}
                <span className="text-orange-500 text-2xl ml-1">%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Loading Bar and Status */}
          <div className="absolute bottom-24 flex flex-col items-center gap-4 w-full max-w-sm px-8">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-amber-600/80 text-xs uppercase tracking-[0.4em] font-semibold"
            >
              Calibrating Core
            </motion.div>
            
            {/* Progress Track */}
            <div className="w-full h-[2px] bg-slate-800 relative overflow-hidden rounded-full">
              {/* Progress Fill (Gradient from Brown to Blue) */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-900 via-orange-700 to-amber-400 shadow-[0_0_12px_rgba(180,83,9,0.85)]"
              />
            </div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrbitalLoader;