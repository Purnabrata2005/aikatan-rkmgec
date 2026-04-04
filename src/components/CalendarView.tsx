"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventDetailsModal } from "./EventDetailsModal";

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

// Extracted for easier state management later
const FESTIVAL_DATES = [
  { date: 15, month: 4, label: "MAHA UTSAV - DAY 1" },
  { date: 16, month: 4, label: "MAHA UTSAV - DAY 2" },
];

// --- Styling Helpers ---
const getEventStyles = (type: string) => {
  const styles = {
    tech: {
      color: "text-sky-300",
      dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
      border: "border-sky-400/30",
    },
    esports: {
      color: "text-rose-300",
      dot: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
      border: "border-rose-400/30",
    },
    holiday: {
      color: "text-indigo-300",
      dot: "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]",
      border: "border-indigo-400/30",
    },
    cultural: {
      color: "text-fuchsia-400",
      dot: "bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.9)]",
      border: "border-fuchsia-400/50",
    },
  };
  return styles[type as keyof typeof styles] || styles.cultural;
};

// ==========================================
// 1. Mobile Timeline Component
// ==========================================
const MobileTimeline = ({ entries, year }: { entries: MobileTimelineEntry[], year: number }) => {
  return (
    <div className="md:hidden relative w-[calc(100%+1rem)] -ml-2">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="relative pl-7 sm:pl-9"
      >
        {/* Central Gradient Thread */}
        <div className="absolute left-[8px] sm:left-[12px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-sky-400 via-rose-500/40 to-transparent rounded-full" />

        <div className="space-y-7">
          {entries.map((entry) => {
            const isFestival = entry.isFestivalDay;
            const dt = new Date(year, entry.month, entry.date);
            const weekday = dt.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
            const monthDay = dt.toLocaleDateString("en-US", { month: "short", day: "2-digit" });

            return (
              <motion.div
                variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                key={`${entry.date}-${entry.month}`}
                className="relative w-full group"
              >
                {/* Timeline Node */}
                <div className={`absolute -left-[34px] sm:-left-[38px] top-5 w-5 h-5 rounded-full border-[3px] border-[#0B1120] z-10 
                  ${isFestival ? 'bg-sky-400 shadow-[0_0_15px_#38bdf8]' : 'bg-slate-700/50'}`} 
                />

                <div className={`rounded-[2rem] border backdrop-blur-md p-5 sm:p-6 transition-all duration-300 overflow-hidden
                  ${isFestival ? "border-sky-500/50 bg-gradient-to-br from-sky-500/10 to-rose-900/20 shadow-[0_4px_20px_rgba(56,189,248,0.1)]" : "border-slate-800/50 bg-[#0F172A]/70"}`}>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4 border-b border-slate-700/50 pb-3">
                    <div className="flex flex-col gap-1">
                      {isFestival ? (
                        entry.labels.map((label) => (
                          <span key={label} className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.1em] font-bold text-sky-400 drop-shadow-md">
                            {label}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.1em] font-semibold text-slate-400">
                          Schedule
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-sans tracking-[0.05em] text-slate-300 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-700/50">
                      <span className="font-bold text-sky-300">{weekday}</span>
                      <span className="text-rose-400/50">|</span>
                      <span>{monthDay}</span>
                    </div>
                  </div>

                  {/* Events */}
                  {entry.events.length > 0 ? (
                    <div className="space-y-3">
                      {entry.events.map((event, idx) => {
                        const eStyles = getEventStyles(event.type);
                        return (
                          <div key={idx} className={`w-full flex flex-col rounded-[1.5rem] border ${eStyles.border} bg-slate-950/40 p-4`}>
                            <div className="flex items-start justify-between gap-3">
                              <p className={`text-[15px] sm:text-base font-sans font-semibold leading-snug ${eStyles.color}`}>
                                {event.title}
                              </p>
                              <span className={`mt-1.5 w-2.5 h-2.5 shrink-0 rounded-full ${eStyles.dot}`} />
                            </div>
                            {(event.startTime || event.venue) && (
                              <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-slate-400">
                                {event.startTime && <span className="bg-slate-800/60 px-2.5 py-1 rounded-full">{event.startTime}</span>}
                                {event.venue && <span className="bg-slate-800/60 px-2.5 py-1 rounded-full truncate">{event.venue}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="py-2 text-sm font-sans text-slate-500">Awaiting schedule details...</p>
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

  // --- Fixed Grid Logic ---
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    // Empty slots before month starts
    for (let i = 0; i < firstDay; i++) days.push(null);
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) days.push({ date: i, month: month });
    // Fill remaining grid to keep structure perfect (7 columns)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 0; i < remaining; i++) days.push(null);
    
    return days;
  }, [year, month]);

  // --- Mobile Data Formatting ---
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
    return Array.from(combinedMap.values()).sort((a, b) => 
      new Date(year, a.month, a.date).getTime() - new Date(year, b.month, b.date).getTime()
    );
  }, [events, year]);

  return (
    // Deep elegant slate base: #0B1120
    <section className="relative w-full py-10 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden flex flex-col font-sans">
      
      {/* Background Ambience (Sky Blue / Rose Glow) */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[50%] w-[800px] h-[400px] bg-highlight/10 blur-[150px] rounded-[100%]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 flex-1">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 border-b border-sky-900/30 pb-6">
          <div className="text-center lg:text-left w-full lg:w-auto">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_12px_#38bdf8]" />
              <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] font-medium text-sky-300 uppercase border border-sky-500/30 px-4 py-1.5 rounded-full bg-sky-500/10">
                Event Itinerary
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-sans font-bold text-slate-100 tracking-tight leading-none drop-shadow-lg">
              Festival <span className="text-rose-400 font-medium">Timeline</span>
            </h2>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="relative w-full bg-[#0F172A]/60 backdrop-blur-2xl border border-sky-900/20 rounded-[2.5rem] p-4 sm:p-6 md:p-10 shadow-2xl">
          
          <MobileTimeline entries={mobileTimelineEntries} year={year} />

          {/* Desktop Grid View */}
          <div className="hidden md:block">
            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-8 relative z-10">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="text-center flex flex-col items-center gap-2">
                  <span className="text-xs font-sans font-medium tracking-[0.15em] text-slate-400 uppercase">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <motion.div 
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
              initial="hidden" animate="show"
              className="grid grid-cols-7 gap-y-12 place-items-center relative z-10"
            >
              {calendarDays.map((dayObj, idx) => {
                if (!dayObj) return <div key={idx} className="w-14 h-14" />; // Empty slot

                const isFestival = FESTIVAL_DATES.some(d => d.date === dayObj.date && d.month === dayObj.month);
                const event = events.find(e => e.date === dayObj.date && e.month === dayObj.month);
                const isInteractive = isFestival || event;

                return (
                  <motion.div
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                    key={idx}
                    onClick={() => {
                      if (isInteractive) {
                        setSelectedDate(dayObj.date);
                        setSelectedMonth(dayObj.month);
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center group/node ${isInteractive ? 'cursor-pointer z-30' : 'z-10'}`}
                  >
                    {/* Ring Decals for Festival Days */}
                    {isFestival && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute w-[80px] h-[80px] rounded-full border border-sky-400/40 animate-ping opacity-30" />
                      </div>
                    )}

                    <div className={`relative flex items-center justify-center transition-all duration-500 rounded-[2rem]
                      ${isFestival 
                        ? 'w-16 h-16 bg-gradient-to-br from-sky-500/20 to-rose-500/20 border border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.2)] group-hover/node:scale-110 group-hover/node:rounded-[1.5rem]' 
                        : event
                        ? 'w-14 h-14 bg-slate-800/60 border border-sky-400/30 group-hover/node:bg-slate-700/80 group-hover/node:scale-110 group-hover/node:rounded-[1.5rem]'
                        : 'w-14 h-14 bg-transparent border border-slate-800 group-hover/node:border-slate-600 group-hover/node:rounded-[1.5rem]'
                      }`}
                    >
                      <span className={`font-sans transition-colors duration-300
                        ${isFestival ? 'text-2xl text-sky-100 font-bold drop-shadow-md' : event ? 'text-xl text-sky-100/90 font-medium' : 'text-lg text-slate-500 font-light'}`}
                      >
                        {String(dayObj.date).padStart(2, '0')}
                      </span>
                      {event && !isFestival && <div className={`absolute top-0 right-0 w-3 h-3 rounded-full border-[2.5px] border-[#0F172A] ${getEventStyles(event.type).dot}`} />}
                    </div>

                    {/* Desktop Hover / Info Popups */}
                    {(isFestival || event) && (
                      <div className="absolute top-[110%] w-[140px] text-center flex flex-col items-center gap-1 opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">
                        <span className="text-[11px] font-sans font-semibold text-sky-300 tracking-[0.1em] uppercase whitespace-nowrap drop-shadow-md">
                          {isFestival ? FESTIVAL_DATES.find(d => d.date === dayObj.date)?.label : event?.title}
                        </span>
                        <div className="mt-1 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-md">
                          <span className="text-[9px] font-sans font-medium text-sky-50 tracking-[0.1em] uppercase">View Details</span>
                        </div>
                      </div>
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
