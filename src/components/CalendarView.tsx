"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventDetailsModal } from "./EventDetailsModal";
import { Flower2, Sparkles, Flame, Music, Palette, Star } from "lucide-react";

// --- Types & Constants ---
export interface CalendarEvent {
  date: number;
  month: number;
  title: string;
  type: "tech" | "esports" | "holiday" | "cultural";
  startTime?: string;
  endTime?: string;
  description?: string;
  venue?: string;
}

export interface CalendarViewProps {
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

// Ensure festival dates match your specific cultural fest days
const FESTIVAL_DATES = [
  { date: 15, month: 4, label: "MAHA UTSAV - DAY 1" },
  { date: 16, month: 4, label: "MAHA UTSAV - DAY 2" },
];

// --- Cultural Fest Styling Helpers ---
const getEventStyles = (type: string) => {
  const styles = {
    cultural: {
      color: "text-fuchsia-300",
      dot: "bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]",
      border: "border-fuchsia-500/30",
    },
    tech: {
      color: "text-indigo-300",
      dot: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]",
      border: "border-indigo-500/30",
    },
    esports: {
      color: "text-rose-300",
      dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
      border: "border-rose-500/30",
    },
    holiday: {
      color: "text-amber-300",
      dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
      border: "border-amber-400/30",
    },
  };
  return styles[type as keyof typeof styles] || styles.cultural;
};

// ==========================================
// 1. Mobile Timeline Component (Simplified)
// ==========================================
const MobileTimeline = ({ entries, year }: { entries: MobileTimelineEntry[]; year: number }) => {
  return (
    <div className="md:hidden relative w-full">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="relative"
      >
        <div className="space-y-6">
          {entries.map((entry) => {
            const isFestival = entry.isFestivalDay;
            const dt = new Date(year, entry.month, entry.date);
            const weekday = dt.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
            const monthDay = dt.toLocaleDateString("en-US", { month: "short", day: "2-digit" });

            return (
              <motion.div
                variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                key={`${entry.date}-${entry.month}`}
                className="relative w-full"
              >
                <div
                  className={`rounded-2xl p-5 transition-all duration-300
                  ${isFestival ? "bg-gradient-to-br from-fuchsia-900/40 to-[#2e0219]/80 border border-fuchsia-500/30 shadow-lg" : "bg-[#1a0b1c]/60 border border-white/5"}`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <div className="flex flex-col">
                      {isFestival ? (
                        entry.labels.map((label) => (
                          <span key={label} className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                            {label}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-semibold text-white/50 tracking-widest uppercase">
                          Schedule
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] tracking-wide text-white/70">
                      <span className="font-bold text-fuchsia-300">{weekday}</span> | {monthDay}
                    </div>
                  </div>

                  {/* Events */}
                  {entry.events.length > 0 ? (
                    <div className="space-y-2">
                      {entry.events.map((event, idx) => {
                        const eStyles = getEventStyles(event.type);
                        return (
                          <div key={idx} className={`flex flex-col rounded-xl border ${eStyles.border} bg-black/20 p-3`}>
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm font-semibold ${eStyles.color}`}>{event.title}</p>
                              <span className={`mt-1 w-2 h-2 shrink-0 rounded-full ${eStyles.dot}`} />
                            </div>
                            {(event.startTime || event.venue) && (
                              <div className="mt-2 flex gap-2 text-[10px] text-white/60 uppercase">
                                {event.startTime && <span>{event.startTime}</span>}
                                {event.startTime && event.venue && <span>•</span>}
                                {event.venue && <span className="truncate">{event.venue}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-white/40 italic">Awaiting details...</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. Main Calendar View Component
// ==========================================
export const CalendarView: React.FC<CalendarViewProps> = ({ month, year, events, allEvents = events }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) setAudioCtx(new AudioContextClass());
  }, []);

  const playSound = (type: 'hover' | 'click') => {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      try { audioCtx.resume(); } catch (e) {}
    }
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.05);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.1);
      }
    } catch (e) {}
  };

  const monthName = useMemo(() => {
    return new Date(year, month).toLocaleString('default', { month: 'long' }).toUpperCase();
  }, [year, month]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push({ date: i, month: month });
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 0; i < remaining; i++) days.push(null);
    return days;
  }, [year, month]);

  const mobileTimelineEntries = useMemo(() => {
    const combinedMap = new Map<string, MobileTimelineEntry>();
    FESTIVAL_DATES.forEach((fd) => {
      combinedMap.set(`${fd.date}-${fd.month}`, { ...fd, labels: [fd.label], events: [], isFestivalDay: true });
    });
    events.forEach((e) => {
      const key = `${e.date}-${e.month}`;
      const existing = combinedMap.get(key);
      if (existing) {
        existing.events.push(e);
      } else {
        combinedMap.set(key, { date: e.date, month: e.month, labels: [], events: [e], isFestivalDay: false });
      }
    });
    return Array.from(combinedMap.values()).sort(
      (a, b) => new Date(year, a.month, a.date).getTime() - new Date(year, b.month, b.date).getTime()
    );
  }, [events, year]);

  return (
    // Deep elegant violet/black base for cultural vibe
    <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0208] overflow-hidden flex flex-col font-sans min-h-screen">
      
      {/* Background Ambience (Magenta & Gold Glow) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-fuchsia-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-8 flex-1">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center md:text-left border-b border-fuchsia-900/30 pb-6 flex items-center justify-center md:justify-start gap-4">
          <Flower2 className="text-fuchsia-400 w-10 h-10 md:w-12 md:h-12 hidden md:block" />
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-cinzel flex items-center justify-center md:justify-start gap-3 w-full">
            <span className="md:hidden"><Flower2 className="text-fuchsia-400 w-8 h-8" /></span>
            Festival <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-amber-300">Timeline</span>
            <Sparkles className="text-amber-400 w-6 h-6 md:w-8 md:h-8" />
          </h2>
        </motion.div>

        {/* Content Area */}
        <div className="relative w-full bg-[#1c0822]/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden">
          
          {/* Music Watermarks Inside Calendar Box */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Music className="absolute top-[15%] left-[8%] w-10 h-10 md:w-20 md:h-20 text-fuchsia-500/10 -rotate-12" />
            <Music className="absolute bottom-[20%] left-[20%] w-12 h-12 md:w-24 md:h-24 text-amber-500/10 rotate-[20deg]" />
            <Music className="absolute top-[10%] right-[15%] w-8 h-8 md:w-16 md:h-16 text-fuchsia-400/10 rotate-12" />
            <Music className="absolute top-[50%] right-[5%] w-10 h-10 md:w-18 md:h-18 text-amber-400/10 -rotate-[15deg]" />
            <Music className="absolute bottom-[10%] right-[30%] w-14 h-14 md:w-24 md:h-24 text-fuchsia-500/10 rotate-[10deg]" />
            <Music className="absolute top-[35%] left-[45%] w-8 h-8 md:w-16 md:h-16 text-amber-400/10 -rotate-6" />
          </div>
          
          <MobileTimeline entries={mobileTimelineEntries} year={year} />

          {/* Desktop Grid View (Cleaned Up) */}
          <div className="hidden md:block">
            {/* Header: Month and Year */}
            <div className="flex justify-between items-end mb-4 px-4 border-b border-white/5 pb-2">
              <h3 className="text-2xl font-cinzel font-bold text-fuchsia-200 tracking-widest drop-shadow-lg uppercase">
                {monthName} {year}
              </h3>
            </div>

            <div className="grid grid-cols-7 mb-6 relative z-10 mt-4">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold tracking-widest text-white/40 uppercase">
                  {day}
                </div>
              ))}
            </div>

            <motion.div 
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.03 } } }}
              initial="hidden" animate="show"
              className="grid grid-cols-7 gap-y-8 place-items-center relative z-10"
            >
              {calendarDays.map((dayObj, idx) => {
                if (!dayObj) return <div key={idx} className="w-14 h-14" />;

                const isFestival = FESTIVAL_DATES.some(d => d.date === dayObj.date && d.month === dayObj.month);
                const event = events.find(e => e.date === dayObj.date && e.month === dayObj.month);
                const isInteractive = isFestival || event;

                return (
                  <motion.div
                    variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                    whileHover={{ scale: isInteractive ? 1.15 : 1.05, y: isInteractive ? -2 : 0 }}
                    whileTap={{ scale: isInteractive ? 0.95 : 1 }}
                    key={idx}
                    onMouseEnter={() => {
                        if (isInteractive) playSound('hover');
                    }}
                    onClick={() => {
                      if (isInteractive) {
                        playSound('click');
                        setSelectedDate(dayObj.date);
                        setSelectedMonth(dayObj.month);
                      }
                    }}
                    className={`relative flex items-center justify-center transition-all duration-300 rounded-2xl
                      ${isInteractive ? 'cursor-pointer hover:shadow-lg' : ''}
                      ${isFestival 
                        ? 'w-16 h-16 bg-gradient-to-br from-fuchsia-600/40 to-amber-500/30 border border-amber-400/60 shadow-[0_4px_20px_rgba(217,70,239,0.4)]' 
                        : event
                        ? 'w-14 h-14 bg-white/10 border border-white/20 shadow-md hover:bg-white/20'
                        : 'w-14 h-14 bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10'
                      }`}
                  >
                    <span className={`font-medium ${isFestival ? 'text-amber-100 font-bold text-2xl' : event ? 'text-fuchsia-100 font-semibold text-2xl' : 'text-white/60 text-xl'} font-cinzel`}>
                      {dayObj.date}
                    </span>
                    
                    {isFestival && <Flame className="absolute -top-3 -right-2 w-6 h-6 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />}
                    
                    {/* Minimal Event Indicator Dot */}
                    {event && !isFestival && (
                      <Flower2 className={`absolute -top-2 -right-2 w-5 h-5 ${getEventStyles(event.type).color}`} />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDate && selectedMonth && (
          <EventDetailsModal
            date={selectedDate} month={selectedMonth} year={year} events={allEvents}
            onClose={() => { setSelectedDate(null); setSelectedMonth(null); }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};