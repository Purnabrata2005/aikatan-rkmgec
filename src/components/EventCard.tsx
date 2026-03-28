"use client";

import { EventDataType } from "@/data/event-data";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  ShieldCheck,
  Cpu,
  ChevronRight,
  X,
  CalendarClock,
  Trophy,
  Clock3,
} from "lucide-react";

type Props = {
  eventId: string;
  eventData: EventDataType;
  flippedCardId: string | null;
  setFlippedCardId: React.Dispatch<React.SetStateAction<string | null>>;
};

const EventCard: React.FC<Props> = ({
  eventId,
  eventData,
  flippedCardId,
  setFlippedCardId,
}) => {
  const {
    image,
    registrationLink,
    title,
    prize,
    prizePool,
    time,
    lastDate,
    type,
  } = eventData;
  const [isHovered, setIsHovered] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isFlipped = flippedCardId === eventId;

  // Mouse tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const tiltRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["12deg", "-12deg"],
  );
  const tiltRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-12deg", "12deg"],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setEnableTilt(!reducedMotion && !coarsePointer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const showValue = (value: string) => {
    return value.toLowerCase() === "yet to be announced" ? "TBA" : value;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={enableTilt ? handleMouseMove : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1400px" }}
      className="relative w-full max-w-[360px] aspect-[3/4] mx-auto"
    >
      {/* 3D ROTATION CONTAINER */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        <motion.div
          style={{
            rotateX: enableTilt ? tiltRotateX : "0deg",
            rotateY: enableTilt ? tiltRotateY : "0deg",
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full"
        >
          {/* ================= FRONT ================= */}
          <div className="absolute inset-0 backface-hidden">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-[#3a2a1d] bg-[#1a120b] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-yellow-500/10 blur-xl opacity-0 group-hover:opacity-100 transition" />

              {/* Image */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  filter: isHovered
                    ? "brightness(0.5) blur(2px)"
                    : "brightness(0.7)",
                }}
                className="absolute inset-0"
              >
                <Image src={image} alt={title} fill className="object-cover" />
              </motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 w-full flex flex-col justify-end gap-3">
                <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-mono">
                  Event Brief
                </p>

                <h2 className="text-3xl font-black text-white leading-tight mb-2">
                  {title}
                </h2>

                <Button
                  onClick={() => setFlippedCardId(eventId)}
                  className="w-full h-12 flex items-center justify-center rounded-xl bg-[#f6c20a] hover:bg-[#ffcf1f] text-black text-sm font-extrabold tracking-[0.1em] uppercase shadow-[0_10px_20px_rgba(246,194,10,0.2)] hover:scale-[1.02] transition"
                >
                  REGISTER NOW
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* ================= BACK ================= */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            <div className="relative w-full h-full rounded-[2rem] bg-[#120c07] border border-[#3a2a1d] p-5 flex flex-col gap-3 overflow-hidden">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
              <div className="absolute -left-16 bottom-20 h-40 w-40 rounded-full bg-yellow-500/5 blur-3xl" />

              {/* Top */}
              <div className="relative flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                    <Cpu className="text-amber-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
                      Intel
                    </p>
                    <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                      {type}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFlippedCardId(null)}
                  aria-label="Close event details"
                  title="Close"
                  className="p-1.5 rounded-lg hover:bg-white/10 transition"
                >
                  <X className="text-white/60 w-5 h-5" />
                </button>
              </div>

              <div className="relative border border-amber-200/10 rounded-2xl bg-black/40 p-3 space-y-1.5 backdrop-blur-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase text-amber-300/80 font-mono">
                  Deck Summary
                </p>
                <h3 className="text-lg leading-tight font-bold text-white">
                  {title}
                </h3>
                <p className="text-xs text-white/55 leading-relaxed">
                  Complete details are available. Use register to secure your
                  slot.
                </p>
              </div>

              {/* Info */}
              <div className="relative flex-1 min-h-0 flex flex-col gap-3">
                <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
                  <div className="border border-white/10 rounded-2xl p-3 bg-white/[0.02]">
                    <h3 className="text-white/40 text-[10px] tracking-widest uppercase mb-2 font-mono">
                      Specifications
                    </h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 flex items-center gap-2 text-xs">
                          <Trophy size={14} className="text-amber-400/70" />{" "}
                          Prize
                        </span>
                        <span className="text-amber-400 font-bold tracking-wide">
                          ₹{prize.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-xs">Status</span>
                        <span className="text-green-400 flex items-center gap-1 text-xs font-medium">
                          <ShieldCheck size={14} /> Verified
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-xs">
                          Prize Pool
                        </span>
                        <span className="text-white/80 max-w-[55%] text-right truncate text-xs font-medium">
                          {showValue(prizePool)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                      <p className="text-white/45 mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                        <CalendarClock size={12} /> Last Date
                      </p>
                      <p className="text-white/90 truncate font-medium">
                        {showValue(lastDate)}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                      <p className="text-white/45 mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                        <Clock3 size={12} /> Time
                      </p>
                      <p className="text-white/90 truncate font-medium">
                        {showValue(time)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-auto pt-2">
                  <Link
                    href={registrationLink}
                    target="_blank"
                    className="block w-full"
                  >
                    <Button className="w-full h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-sm tracking-[0.1em] font-extrabold uppercase shadow-[0_10px_20px_rgba(246,194,10,0.2)] hover:scale-[1.02] transition">
                      REGISTER
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
