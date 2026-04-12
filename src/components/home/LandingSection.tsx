"use client";

import { motion } from "framer-motion";
import CountdownTimer from "../CountdownTimer";

const LandingSection = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6 sm:mb-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[3rem] sm:text-5xl md:text-7xl lg:text-[10rem] font-bold font-bengali tracking-tight leading-none select-none">
              <span className=" text-transparent bg-clip-text bg-gradient-to-b from-fest-saffron via-fest-gold to-white/30 uppercase">
                ঐক tan
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-3 sm:mt-2 text-base sm:text-2xl md:text-4xl lg:text-6xl font-dancingScript tracking-widest text-highlight/90"
          >
           এক ধনুকে {" "}
            <span className="text-primary font-bold">পঞ্চবাণ</span>
          </motion.div>
        </div>

        {/* Timer Container with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12 sm:mb-16 py-2 sm:py-6 rounded-2xl w-full"
        >
          <CountdownTimer />
        </motion.div>
      </div>
    </div>
  );
};

export default LandingSection;
