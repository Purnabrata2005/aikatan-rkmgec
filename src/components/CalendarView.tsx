"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventDetailsModal } from "./EventDetailsModal";

// --- Types & Constants ---
interface CalendarEvent {
  date: number;
  month: number;
  title: string;
  type: "tech" | "esports" | "holiday" | "cultural";
  startTime?: string;
  endTime?: string;
  description?: string;
  venue?: string;
}

interface CalendarViewProps {
  month: number;
  year: number;
  events: CalendarEvent[];
  allEvents?: CalendarEvent[];
}

interface MobileTimelineEntry {
  date: number;
  month: number;
  labels: string[];
  events: CalendarEvent[];
  isFestivalDay: boolean;
}

const FESTIVAL_DATES = [
  { date: 15, month: 4, label: "DAY 1" },
  { date: 16, month: 4, label: "DAY 2" },
];

export const CalendarView: React.FC<CalendarViewProps> = ({
  month,
  year,
  events,
  allEvents = events,
}) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // --- Grid Logic (Desktop) ---
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push({ date: i, month: month });
    // Bleeding into next month
    days.push({ date: 1, month: month + 1 }, { date: 2, month: month + 1 });
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [firstDay, daysInMonth, month]);

  // --- Timeline Logic (Mobile) ---
  const mobileTimelineEntries = useMemo(() => {
    const combinedMap = new Map<string, MobileTimelineEntry>();

    // 1. Seed festival dates
    FESTIVAL_DATES.forEach((fd) => {
      const key = `${fd.date}-${fd.month}`;
      combinedMap.set(key, {
        date: fd.date,
        month: fd.month,
        labels: [fd.label],
        events: [],
        isFestivalDay: true,
      });
    });

    // 2. Attach events to festival dates
    events.forEach((e) => {
      const key = `${e.date}-${e.month}`;
      const existing = combinedMap.get(key);
      if (existing) {
        existing.events.push(e);
      }
    });

    // 3. Sort chronologically
    return Array.from(combinedMap.values()).sort(
      (a, b) =>
        new Date(year, a.month, a.date).getTime() -
        new Date(year, b.month, b.date).getTime()
    );
  }, [events, year]);

  const formatMobileDate = (entry: MobileTimelineEntry) => {
    const dt = new Date(year, entry.month, entry.date);
    return {
      weekday: dt.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      monthDay: dt.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
    };
  };

  // --- Styling Helpers ---
  const getEventStyles = (type: string) => {
    const styles = {
      tech: {
        color: "text-cyan-400",
        dot: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]",
        glow: "drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]",
        border: "border-cyan-400/50",
      },
      esports: {
        color: "text-purple-400",
        dot: "bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]",
        glow: "drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]",
        border: "border-purple-400/50",
      },
      holiday: {
        color: "text-amber-300",
        dot: "bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]",
        glow: "drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]",
        border: "border-amber-300/50",
      },
      cultural: {
        color: "text-emerald-300",
        dot: "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]",
        glow: "drop-shadow-[0_0_8px_rgba(110,231,183,0.6)]",
        border: "border-emerald-300/50",
      },
    };
    return (
      styles[type as keyof typeof styles] || {
        color: "text-white",
        dot: "bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]",
        glow: "",
        border: "border-white/30",
      }
    );
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.4 } },
  };

  return (
    <section className="relative w-full py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#020202] overflow-hidden min-h-screen flex flex-col font-sans">
      
      {/* 1. Deep Space / Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 blur-[120px] md:blur-[150px] rounded-full opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 flex-1">
        
        {/* 2. Command Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 border-b border-white/10 pb-6"
        >
          <div className="text-center lg:text-left w-full lg:w-auto">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <span className="w-2 h-2 bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]" />
              <span className="text-[10px] md:text-xs font-kodeMono tracking-[0.3em] md:tracking-[0.4em] text-primary uppercase border border-primary/30 px-3 py-1 rounded-[2px] bg-primary/10 whitespace-nowrap">
                Data Node Matrix
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-black text-white tracking-tighter uppercase leading-none break-words">
              Network <span className="text-transparent stroke-text italic">Uplink</span>
            </h2>
          </div>
          
          {/* Legend / Stats */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-6 items-center border border-white/10 bg-black/40 backdrop-blur-md px-5 py-3 rounded-xl sm:rounded-full shadow-2xl w-full lg:w-auto">
            {["cultural"].map(type => {
              const styles = getEventStyles(type);
              return (
                <div key={type} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                  <span className="text-[10px] sm:text-xs font-kodeMono uppercase tracking-widest text-white/70">
                    {type}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 3. The Node Matrix (Creative Calendar Grid) */}
        <div className="relative w-full bg-black/30 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

          {/* =========================================
              MOBILE VIEW: CLEAN SEPARATED TIMELINE
             ========================================= */}
          <div className="md:hidden relative w-[calc(100%+1rem)] -ml-2">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              className="relative pl-7 sm:pl-9" // Gives space for the left timeline while keeping cards wider
            >
              {/* Central Glowing Line (Positioned cleanly outside the cards) */}
              <div className="absolute left-[8px] sm:left-[12px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-primary/30 to-transparent rounded-full" />
              
              <div className="space-y-7">
                {mobileTimelineEntries.map((entry) => {
                  const isFestival = entry.isFestivalDay;
                  const activeBorderClass = isFestival
                    ? "border-primary/50 bg-primary/5"
                    : "border-white/10 bg-white/[0.02]";
                  const dateMeta = formatMobileDate(entry);

                  return (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        show: { opacity: 1, x: 0 },
                      }}
                      key={`${entry.date}-${entry.month}`}
                      className="relative w-full group"
                    >
                      {/* Independent Timeline Dot */}
                      <div className={`absolute -left-[34px] sm:-left-[38px] top-5 w-5 h-5 rounded-full border-[3px] border-[#020202] z-10 transition-transform group-active:scale-90 ${isFestival ? 'bg-primary shadow-[0_0_12px_var(--primary)]' : 'bg-white/40'}`} />

                      {/* The Data Card (Compressed & Clean) */}
                      <div className={`rounded-2xl border backdrop-blur-md shadow-lg p-5 sm:p-6 transition-all duration-300 ${activeBorderClass}`}>
                        
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3 mb-4 border-b border-white/5 pb-3">
                          <div className="flex flex-col gap-1">
                            {isFestival && entry.labels.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {entry.labels.map((label) => (
                                  <span key={label} className="text-[11px] sm:text-xs font-kodeMono uppercase tracking-[0.2em] font-bold text-primary">
                                    {label}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[11px] sm:text-xs font-kodeMono uppercase tracking-[0.2em] font-semibold text-white/50">
                                Schedule
                              </span>
                            )}
                          </div>

                          {/* Date Badge */}
                          <div className="flex items-center gap-1.5 text-[11px] font-kodeMono tracking-[0.05em] text-white/80 shrink-0 bg-black/50 px-2.5 py-1.5 rounded-md border border-white/10">
                            <span className="font-bold">{dateMeta.weekday}</span>
                            <span className="text-white/40">|</span>
                            <span>{dateMeta.monthDay}</span>
                          </div>
                        </div>

                        {/* Event Slots */}
                        {entry.events.length > 0 ? (
                          <div className="space-y-3">
                            {entry.events.map((event, eventIdx) => {
                              const eStyles = getEventStyles(event.type);

                              return (
                                <div
                                  key={`${entry.date}-${entry.month}-${event.title}-${eventIdx}`}
                                  className="w-full flex flex-col text-left rounded-xl border border-white/5 bg-black/40 p-3.5"
                                >
                                  <div className="flex items-start justify-between gap-3 w-full">
                                    <p className={`text-[15px] sm:text-base font-spaceGrotesk font-semibold leading-snug ${eStyles.color}`}>
                                      {event.title}
                                    </p>
                                    <span className={`mt-2 w-2 h-2 shrink-0 rounded-full ${eStyles.dot}`} />
                                  </div>

                                  {(event.startTime || event.venue) && (
                                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-kodeMono uppercase tracking-wider text-white/55">
                                      {event.startTime && <span className="bg-white/5 px-2 py-1 rounded">{event.startTime}</span>}
                                      {event.venue && <span className="bg-white/5 px-2 py-1 rounded truncate max-w-[170px]">{event.venue}</span>}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="py-3 flex items-center gap-2.5 text-white/30">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                            <p className="text-sm font-spaceGrotesk italic">No events mapped</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
          
          {/* =========================================
              DESKTOP VIEW: DATA NODE MATRIX 
             ========================================= */}
          <div className="hidden md:block">
            {/* Horizontal Connection Lines behind nodes */}
            <div className="absolute inset-0 top-[80px] bottom-[20px] flex flex-col justify-around pointer-events-none opacity-20 px-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent dashed-line" />
              ))}
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-12 relative z-10">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center flex flex-col items-center gap-2">
                  <span className="text-xs font-kodeMono tracking-[0.2em] text-white/40 uppercase">{day}</span>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                </div>
              ))}
            </div>

            {/* Nodes */}
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-7 gap-y-12 place-items-center relative z-10"
            >
              {calendarDays.map((dayObj, idx) => {
                const isFestival = dayObj && FESTIVAL_DATES.some(d => d.date === dayObj.date && d.month === dayObj.month);
                const festivalInfo = dayObj ? FESTIVAL_DATES.find(d => d.date === dayObj.date && d.month === dayObj.month) : null;
                const event = dayObj ? events.find(e => e.date === dayObj.date && e.month === dayObj.month) : null;
                const eStyles = event ? getEventStyles(event.type) : null;

                // Empty Node Slot
                if (!dayObj) {
                  return (
                    <div key={idx} className="w-8 h-8 flex items-center justify-center opacity-10">
                      <span className="text-white/50 text-xs">+</span>
                    </div>
                  );
                }

                return (
                  <motion.div
                    variants={nodeVariants}
                    key={idx}
                    onClick={() => {
                      if (isFestival || event) {
                        setSelectedDate(dayObj.date);
                        setSelectedMonth(dayObj.month);
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center group/node
                      ${(isFestival || event) ? 'cursor-pointer z-30' : 'z-10'}
                    `}
                  >
                    {isFestival && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute w-[120px] h-[120px] rounded-full border border-primary/40 animate-radar-spin" />
                        <div className="absolute w-[90px] h-[90px] rounded-full border border-primary/20 animate-radar-spin-reverse" />
                        <div className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent top-1/2 -translate-y-1/2 -z-10 animate-pulse hidden lg:block" />
                      </div>
                    )}

                    <div className={`relative flex items-center justify-center transition-all duration-500
                      ${isFestival 
                        ? 'w-20 h-20 bg-black border-2 border-primary/80 shadow-[0_0_30px_rgba(184,92,56,0.3)] group-hover/node:scale-110 group-hover/node:bg-primary/10 rounded-lg rotate-45 group-hover/node:rotate-90' 
                        : event
                        ? 'w-14 h-14 bg-white/5 border-2 border-white/30 rounded-full group-hover/node:bg-white/10 group-hover/node:scale-110'
                        : 'w-14 h-14 bg-white/[0.03] border border-white/10 rounded-full group-hover/node:border-white/30 group-hover/node:bg-white/10'
                      }
                    `}>
                      <span className={`font-spaceGrotesk leading-none transition-colors duration-300
                        ${isFestival 
                          ? 'text-4xl text-white font-bold drop-shadow-[0_0_10px_#fff] -rotate-45 group-hover/node:-rotate-90' 
                          : event 
                          ? 'text-2xl text-white font-medium'
                          : 'text-xl text-white/50 group-hover/node:text-white font-light'
                        }
                      `}>
                        {String(dayObj.date).padStart(2, '0')}
                      </span>

                      {event && !isFestival && eStyles && (
                        <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-black animate-pulse ${eStyles.dot}`} />
                      )}
                    </div>

                    <div className="absolute top-[110%] w-[120px] text-center flex flex-col items-center gap-1">
                      {isFestival && (
                        <>
                          <span className="text-xs font-kodeMono font-bold text-primary tracking-widest uppercase drop-shadow-[0_0_5px_var(--primary)] whitespace-nowrap">
                            {festivalInfo?.label}
                          </span>
                          <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] border border-primary/50 bg-primary/10 backdrop-blur-md opacity-80 group-hover/node:opacity-100 group-hover/node:bg-primary/30 group-hover/node:scale-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(184,92,56,0.2)]">
                            <svg className="w-2.5 h-2.5 text-primary animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <span className="text-[9px] font-kodeMono text-white tracking-[0.1em] uppercase whitespace-nowrap">
                              Engage
                            </span>
                          </div>
                        </>
                      )}
                      {event && !isFestival && eStyles && (
                        <span className={`text-[10px] font-kodeMono uppercase font-semibold truncate w-full ${eStyles.color} ${eStyles.glow}`}>
                          {event.title}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
        }
        .dashed-line {
          background-image: linear-gradient(to right, rgba(255,255,255,0.2) 50%, transparent 50%);
          background-size: 10px 1px;
          background-repeat: repeat-x;
        }
        @keyframes radar-spin {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.5; border-color: var(--primary); }
          100% { transform: scale(0.8) rotate(360deg); opacity: 0; }
        }
        @keyframes radar-spin-reverse {
          0% { transform: scale(1.1) rotate(360deg); opacity: 0; }
          50% { transform: scale(0.9) rotate(180deg); opacity: 0.3; }
          100% { transform: scale(1.1) rotate(0deg); opacity: 0; }
        }
        .animate-radar-spin {
          animation: radar-spin 4s linear infinite;
        }
        .animate-radar-spin-reverse {
          animation: radar-spin-reverse 3.5s linear infinite;
        }
      `}</style>

      {/* Modal Integration */}
      <AnimatePresence>
        {selectedDate !== null && selectedMonth !== null && (
          <EventDetailsModal
            date={selectedDate}
            month={selectedMonth}
            year={year}
            events={allEvents}
            onClose={() => {
              setSelectedDate(null);
              setSelectedMonth(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};