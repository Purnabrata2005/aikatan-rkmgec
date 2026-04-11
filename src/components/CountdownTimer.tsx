"use client";

import { useEffect, useState } from "react";
import { countdownTargetDate } from "@/data/countDown";
import { AnimatePresence, motion } from "framer-motion";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = countdownTargetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(intervalId);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 px-2">
      <TimeUnit
        label="DAYS"
        value={timeLeft.days}
        glowColor="shadow-custom-gold-1/50"
        borderColor="border-custom-gold-1/30"
      />
      <TimeUnit
        label="HOURS"
        value={timeLeft.hours}
        glowColor="shadow-custom-gold-2/50"
        borderColor="border-custom-gold-2/30"
      />
      <TimeUnit
        label="MINS"
        value={timeLeft.minutes}
        glowColor="shadow-custom-gold-3/50"
        borderColor="border-custom-gold-3/30"
      />
      <TimeUnit
        label="SECS"
        value={timeLeft.seconds}
        glowColor="shadow-custom-gold-2/50"
        borderColor="border-custom-gold-2/30"
      />
    </div>
  );
};

const TimeUnit = ({
  label,
  value,
  glowColor,
  borderColor,
}: {
  label: string;
  value: number;
  glowColor: string;
  borderColor: string;
}) => {
  return (
    <div className="flex flex-col items-center group">
      {/* Label with festive styling */}
      <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.2em] text-fest-gold/80 mb-2.5 sm:mb-3 group-hover:text-fest-saffron transition-colors">
        {label}
      </span>

      <div
        className={`relative w-16 h-20 sm:w-20 sm:h-24 md:w-28 md:h-32 flex items-center justify-center bg-gradient-to-b from-[#2c0f1f] via-[#1b0a15] to-[#12070f] border-2 ${borderColor} rounded-xl overflow-hidden shadow-2xl ${glowColor}`}
      >
        {/* Ornamental top and bottom trims */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fest-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fest-saffron/40 to-transparent" />

        {/* Soft festive wash */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-fest-gold/10 via-transparent to-fest-pink/10" />

        {/* Rangoli-like corner dots */}
        <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-fest-gold/70" />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-fest-pink/70" />
        <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-fest-pink/70" />
        <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-fest-gold/70" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="text-3xl sm:text-4xl md:text-6xl font-cinzel font-bold text-fest-gold drop-shadow-[0_0_12px_rgba(214,177,90,0.35)]"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>

        {/* Glossy Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-40" />
      </div>
    </div>
  );
};

export default CountdownTimer;
