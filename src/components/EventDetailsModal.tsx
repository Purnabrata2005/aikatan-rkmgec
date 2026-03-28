"use client"

import React, { useMemo } from "react";
import { X, MapPin, Clock, Zap, Gamepad2, Terminal, Sun } from "lucide-react";

interface Event {
  date: number;
  title: string;
  type: "tech" | "esports" | "holiday";
  month: number;
  startTime?: string;
  endTime?: string;
  description?: string;
  venue?: string;
}

interface EventDetailsModalProps {
  date: number;
  month: number;
  year: number;
  events: Event[];
  onClose: () => void;
}

const FESTIVAL_LABELS: Record<string, string> = {
  "29-3": "DAY_00",
  "30-3": "DAY_01",
  "1-4": "DAY_02",
  "2-4": "DAY_03",
};

// Enhanced type config with terminal-style elements
const typeConfig = {
  tech: {
    bg: "bg-primary/5",
    border: "border-primary/40 hover:border-primary",
    glow: "hover:shadow-[0_0_25px_var(--primary)]",
    text: "text-primary",
    accent: "text-primary",
    dot: "bg-primary shadow-[0_0_10px_var(--primary)]",
    line: "from-primary/80",
    badge: "bg-primary/10 text-primary border-primary/50 shadow-[0_0_10px_rgba(184,92,56,0.3)]",
    icon: Zap,
    label: "SYS.TECH",
  },
  esports: {
    bg: "bg-accent/5",
    border: "border-accent/40 hover:border-accent",
    glow: "hover:shadow-[0_0_25px_var(--accent)]",
    text: "text-highlight",
    accent: "text-accent",
    dot: "bg-accent shadow-[0_0_10px_var(--accent)]",
    line: "from-accent/80",
    badge: "bg-accent/10 text-highlight border-accent/50 shadow-[0_0_10px_rgba(213,206,163,0.3)]",
    icon: Gamepad2,
    label: "SYS.ESPORTS",
  },
  holiday: {
    bg: "bg-highlight/5",
    border: "border-highlight/40 hover:border-highlight",
    glow: "hover:shadow-[0_0_25px_var(--highlight)]",
    text: "text-highlight",
    accent: "text-highlight",
    dot: "bg-highlight shadow-[0_0_10px_var(--highlight)]",
    line: "from-highlight/80",
    badge: "bg-highlight/10 text-highlight border-highlight/50 shadow-[0_0_10px_rgba(224,216,180,0.3)]",
    icon: Sun,
    label: "SYS.HOLIDAY",
  },
};

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function getDurationMinutes(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  date,
  month,
  year,
  events,
  onClose,
}) => {
  const dayEvents = useMemo(() => {
    return events
      .filter((e) => e.date === date && e.month === month)
      .sort((a, b) => {
        if (!a.startTime || !b.startTime) return 0;
        return a.startTime.localeCompare(b.startTime);
      });
  }, [events, date, month]);

  const dateStr = new Date(year, month - 1, date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const festivalLabel = FESTIVAL_LABELS[`${date}-${month}`] || "";

  const timeRange = useMemo(() => {
    const withTimes = dayEvents.filter((e) => e.startTime && e.endTime);
    if (withTimes.length === 0) return { start: "09:00", end: "22:00" };
    const starts = withTimes.map((e) => e.startTime!);
    const ends = withTimes.map((e) => e.endTime!);
    const earliest = starts.sort()[0];
    const latest = ends.sort().reverse()[0];
    return { start: earliest, end: latest };
  }, [dayEvents]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-3 md:p-6 overflow-hidden font-kodeMono"
      onClick={onClose}
    >
      {/* Tech Grid Background Overlay */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col border border-accent/30 bg-black/80 shadow-[0_0_40px_rgba(0,0,0,0.8)] cyber-clip"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Scanline */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden cyber-clip">
          <div className="w-full h-2 bg-accent/20 blur-[2px] animate-scanline" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col max-h-[92vh] overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-accent/30 bg-accent/5 relative">
            {/* Decorative corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent/60" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Terminal className="w-4 h-4 text-accent animate-pulse" />
                  {festivalLabel && (
                    <span className="px-3 py-1 text-[11px] font-bold tracking-widest bg-accent text-black uppercase">
                      [{festivalLabel}]
                    </span>
                  )}
                  <span className="px-3 py-1 text-[10px] font-medium text-accent border border-accent/30 uppercase tracking-widest bg-black/50">
                    <span className="text-primary mr-1">{dayEvents.length}</span> 
                    PROTOCOLS_FOUND
                  </span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-highlight font-orbitron tracking-[0.2em] flex items-center mt-2">
                  {/* Blinking cursor effect next to title */}
                  <span className="text-accent mr-2">{">"}</span>
                  {dateStr.toUpperCase()}
                  <span className="inline-block w-3 md:w-4 h-6 md:h-8 bg-accent ml-3 animate-pulse" />
                </h2>
                <p className="text-xs text-accent/60 mt-3 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {dayEvents.filter((e) => e.startTime).length > 0
                    ? `SYS_UPTIME: ${formatTime(timeRange.start)} — ${formatTime(timeRange.end)}`
                    : "GLOBAL OVERRIDE ACTIVE"}
                </p>
              </div>
              <button
                type="button"
                title="Close modal"
                onClick={onClose}
                className="p-2 bg-black border border-accent/30 hover:border-accent hover:bg-accent/20 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <X className="w-5 h-5 text-accent relative z-10" />
              </button>
            </div>
          </div>

          {/* Timeline Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-2 md:px-8 py-8 cyber-scrollbar bg-black/40">
            {dayEvents.length > 0 ? (
              <div className="relative pl-6 md:pl-10">
                {/* Central timeline line - made harsher/neon */}
                <div className="absolute left-[95px] md:left-[115px] top-0 bottom-0 w-[2px] bg-accent/20">
                  <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse" />
                </div>

                {/* Events */}
                <div className="space-y-6">
                  {dayEvents.map((event, index) => {
                    const config = typeConfig[event.type];
                    const Icon = config.icon;
                    const duration =
                      event.startTime && event.endTime
                        ? getDurationMinutes(event.startTime, event.endTime)
                        : 60;
                    const minH =
                      duration >= 120 ? "min-h-[130px]" : duration >= 90 ? "min-h-[110px]" : "min-h-[90px]";

                    return (
                      <div
                        key={index}
                        className="relative flex items-stretch gap-6 md:gap-8 group"
                      >
                        {/* Time column */}
                        <div className="flex-shrink-0 w-[60px] md:w-[75px] flex flex-col items-end justify-start pt-3">
                          {event.startTime ? (
                            <>
                              <span className="text-sm font-bold text-accent tracking-widest leading-tight bg-black px-1">
                                {formatTime(event.startTime).replace(" ", "")}
                              </span>
                              <span className="text-[10px] text-accent/50 tracking-wider mt-1">
                                {formatTime(event.endTime || event.startTime).replace(" ", "")}
                              </span>
                              <span className="text-[9px] text-primary/70 tracking-widest mt-2 border-b border-primary/30 pb-1">
                                DUR: {duration >= 60 ? `${Math.floor(duration / 60)}H${duration % 60 ? ` ${duration % 60}M` : ""}` : `${duration}M`}
                              </span>
                            </>
                          ) : (
                            <span className="text-[10px] text-accent/60 tracking-widest border border-accent/20 px-2 py-1 bg-black">ALL_DAY</span>
                          )}
                        </div>

                        {/* Timeline dot */}
                        <div className="relative flex-shrink-0 w-4 flex flex-col items-center pt-[15px]">
                          <div className={`w-3 h-3 rounded-none rotate-45 ${config.dot} z-10 group-hover:scale-125 group-hover:rotate-90 transition-all duration-300`} />
                        </div>

                        {/* Event card */}
                        <div
                          className={`flex-1 ${config.bg} ${config.border} border-l-4 border-y border-r p-5 ${minH} transition-all duration-300 ${config.glow} group-hover:-translate-x-1 relative overflow-hidden bg-black/60 backdrop-blur-sm`}
                        >
                          {/* Inner code decor */}
                          <div className="absolute top-0 right-0 px-2 py-1 bg-black/50 border-b border-l border-accent/20 text-[8px] text-accent/40 tracking-[0.3em] pointer-events-none">
                            PID: {Math.floor(Math.random() * 9000) + 1000}_{index.toString().padStart(2, "0")}
                          </div>

                          {/* Top row: badge + icon */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`${config.badge} text-[10px] px-2 py-1 border font-bold tracking-widest`}
                            >
                              {">_ "}{config.label}
                            </span>
                            <Icon className={`w-5 h-5 ${config.accent} opacity-80 group-hover:animate-pulse`} />
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-lg md:text-xl font-bold ${config.text} mb-2 leading-tight font-orbitron tracking-wide uppercase`}
                          >
                            {event.title}
                          </h3>

                          {/* Description */}
                          {event.description && (
                            <p className="text-xs text-accent/70 leading-relaxed mb-4 line-clamp-2 pr-4 font-sans">
                              {event.description}
                            </p>
                          )}

                          {/* Bottom row: venue + time */}
                          <div className="flex items-center gap-5 flex-wrap mt-auto pt-3 border-t border-accent/10">
                            {event.venue && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-accent/60" />
                                <span className="text-[10px] md:text-xs text-accent/80 tracking-widest uppercase">
                                  LOC // {event.venue}
                                </span>
                              </div>
                            )}
                            {event.startTime && event.endTime && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-primary/60" />
                                <span className="text-[10px] md:text-xs text-primary/80 tracking-widest">
                                  T_EXEC // {formatTime(event.startTime)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-accent/20 bg-black/40 cyber-clip relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 animate-pulse" />
                <Terminal className="w-12 h-12 text-accent/40 mb-4 relative z-10" />
                <p className="text-accent/60 text-sm tracking-[0.3em] uppercase relative z-10">
                  ERR_404: NO_PROTOCOLS_FOUND
                </p>
                <div className="mt-4 w-32 h-1 bg-accent/20 relative z-10 overflow-hidden">
                  <div className="w-full h-full bg-accent/60 origin-left animate-[scale-x_2s_infinite]" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-accent/30 bg-accent/5 flex flex-col md:flex-row items-center justify-between gap-4 relative">
            <div className="flex items-center gap-6">
              {(["tech", "esports", "holiday"] as const).map((type) => {
                const config = typeConfig[type];
                const count = dayEvents.filter((e) => e.type === type).length;
                if (count === 0) return null;
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-none rotate-45 ${config.dot}`} />
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-bold ${config.text}`}
                    >
                      {config.label} [{count}]
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="text-[9px] text-accent/40 tracking-[0.3em] uppercase">
              END_OF_TRANSMISSION
            </div>
          </div>
        </div>
      </div>

      {/* Cyberpunk Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Grid Background Overlay */
        .tech-grid {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(var(--accent-rgb, 213, 206, 163), 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--accent-rgb, 213, 206, 163), 0.1) 1px, transparent 1px);
        }

        /* Sci-fi Clipped Corners (Requires modern browser support, fallback to square) */
        .cyber-clip {
          clip-path: polygon(
            0 0, 
            calc(100% - 20px) 0, 
            100% 20px, 
            100% 100%, 
            20px 100%, 
            0 calc(100% - 20px)
          );
        }

        /* Tech Scrollbar */
        .cyber-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .cyber-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
          border-left: 1px solid rgba(var(--accent-rgb, 213, 206, 163), 0.1);
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--accent-rgb, 213, 206, 163), 0.4);
          border-radius: 0;
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
        }

        /* Animations */
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
        
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `,
      }} />
    </div>
  );
};