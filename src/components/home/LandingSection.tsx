"use client";

import { motion } from "framer-motion";
import CountdownTimer from "../CountdownTimer";
import Link from "next/link";

const LandingSection = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 max-w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fest-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fest-pink"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-playfair uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent/90 whitespace-nowrap">
            Culture Unleashed 2026
          </span>
        </motion.div>

        <div className="relative mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[3rem] sm:text-7xl md:text-9xl lg:text-[10rem] font-bold font-cinzel tracking-tight leading-none select-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-fest-saffron via-fest-gold to-white/30 uppercase">
                AIKATAN
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-3 sm:mt-2 text-base sm:text-2xl md:text-4xl lg:text-6xl font-dancingScript tracking-widest text-highlight/90"
          >
            Where Culture <span className="text-primary font-bold">Comes Alive</span>
          </motion.div>
        </div>

        {/* Subtext with Staggered Divider dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-8 mb-12 sm:mb-16 px-2"
        >
          {["Perform", "Celebrate", "Express"].map((text, i) => (
            <div key={text} className="flex items-center gap-3 sm:gap-8">
              <span className="text-[11px] sm:text-lg font-outfit text-muted-foreground tracking-[0.12em] sm:tracking-[0.2em] uppercase hover:text-fest-pink transition-colors duration-300 cursor-default">
                {text}
              </span>
              {i < 2 && (
                <div className="hidden sm:block w-2 h-2 rounded-full bg-white/20" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Timer Container with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12 sm:mb-16 py-2 sm:py-6 rounded-2xl w-full"
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA BUTTONS: Sleek & Festive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
        >
          <Link
            href="/#events"
            className="group relative px-10 py-4 bg-white text-black font-outfit font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:text-white rounded-full overflow-hidden shadow-[0_0_20px_rgba(244,121,32,0.3)] hover:shadow-[0_0_30px_rgba(227,74,123,0.5)]"
          >
            <span className="relative z-10">Explore Events</span>
            <motion.div className="absolute inset-0 bg-gradient-to-r from-fest-saffron to-fest-pink translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingSection;
