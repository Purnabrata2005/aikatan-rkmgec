"use client"

import React, { useMemo } from "react";
import { X, MapPin, Clock, Zap, Gamepad2, Sun, Music, Star, Calendar } from "lucide-react";

interface Event {
  date: number;
  title: string;
  type: "tech" | "esports" | "holiday" | "cultural";
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
  "15-4": "Day 1",
  "16-4": "Day 2",
};

// Warm & Elegant Cultural Fest Vibe Configuration
const typeConfig = {
  tech: {
    bg: "bg-blue-900/10",
    border: "border-blue-500/30 hover:border-blue-400",
    glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
    text: "text-blue-300",
    accent: "text-blue-400",
    dot: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]",
    line: "from-blue-400/80",
    badge: "bg-blue-900/30 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
    icon: Zap,
    label: "Tech Event",
  },
  esports: {
    bg: "bg-fest-purple/10",
    border: "border-fest-purple/40 hover:border-fest-purple",
    glow: "hover:shadow-[0_0_25px_rgba(192,132,252,0.3)]",
    text: "text-purple-300",
    accent: "text-purple-400",
    dot: "bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]",
    line: "from-purple-400/80",
    badge: "bg-fest-purple/30 text-purple-300 border-fest-purple/50 shadow-[0_0_10px_rgba(192,132,252,0.2)]",
    icon: Gamepad2,
    label: "Esports",
  },
  holiday: {
    bg: "bg-fest-gold/10",
    border: "border-fest-gold/40 hover:border-fest-gold",
    glow: "hover:shadow-[0_0_25px_rgba(198,156,56,0.3)]",
    text: "text-fest-gold",
    accent: "text-fest-gold",
    dot: "bg-fest-gold shadow-[0_0_10px_rgba(198,156,56,0.8)]",
    line: "from-fest-gold/80",
    badge: "bg-fest-gold/10 text-fest-gold border-fest-gold/50 shadow-[0_0_10px_rgba(198,156,56,0.2)]",
    icon: Sun,
    label: "Holiday",
  },
  cultural: {
    bg: "bg-fest-pink/10",
    border: "border-fest-pink/40 hover:border-fest-pink",
    glow: "hover:shadow-[0_0_25px_rgba(227,74,123,0.3)]",
    text: "text-fest-pink",
    accent: "text-fest-pink",
    dot: "bg-fest-pink shadow-[0_0_10px_rgba(227,74,123,0.8)]",
    line: "from-fest-pink/80",
    badge: "bg-fest-pink/10 text-fest-pink border-fest-pink/50 shadow-[0_0_10px_rgba(227,74,123,0.2)]",
    icon: Music,
    label: "Cultural",
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
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-3 md:p-6 overflow-hidden font-inter"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col border border-fest-gold/20 rounded-3xl bg-gradient-to-b from-[#1C0718] to-[#020617] shadow-[0_0_50px_rgba(227,74,123,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft Glow Background Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-fest-pink/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fest-saffron/10 blur-[100px] rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col max-h-[92vh] overflow-hidden rounded-3xl">
          {/* Header */}
          <div className="px-6 pt-8 pb-6 border-b border-fest-gold/10 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-fest-gold animate-pulse" />
                  {festivalLabel && (
                    <span className="px-4 py-1 text-xs font-semibold tracking-widest bg-gradient-to-r from-fest-saffron to-fest-pink text-white rounded-full uppercase shadow-md">
                      {festivalLabel}
                    </span>
                  )}
                  <span className="px-3 py-1 text-xs font-medium text-fest-gold border border-fest-gold/30 rounded-full tracking-widest bg-fest-gold/5">
                    <span className="text-fest-saffron mr-1 font-bold">{dayEvents.length}</span> 
                    Event{dayEvents.length !== 1 ? 's' : ''} Scheduled
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-fest-gold via-white to-fest-pink tracking-wider flex items-center mt-2 decoration-slice">
                  {dateStr}
                </h2>
                <p className="text-sm font-outfit text-white/60 mt-3 tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fest-saffron animate-pulse" />
                  {dayEvents.filter((e) => e.startTime).length > 0
                    ? `Fest Hours: ${formatTime(timeRange.start)} — ${formatTime(timeRange.end)}`
                    : "All Day Celebration"}
                </p>
              </div>
              <button
                type="button"
                title="Close modal"
                onClick={onClose}
                className="p-2 md:p-3 bg-white/5 border border-white/10 hover:border-fest-pink hover:bg-fest-pink/10 hover:text-fest-pink rounded-full transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-fest-pink transition-colors" />
              </button>
            </div>
          </div>

          {/* Timeline Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-2 md:px-8 py-8 custom-scrollbar relative">
            {dayEvents.length > 0 ? (
              <div className="relative pl-6 md:pl-10">
                {/* Elegant Central timeline line */}
                <div className="absolute left-[95px] md:left-[115px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-fest-gold/40 via-fest-pink/20 to-transparent" />

                {/* Events */}
                <div className="space-y-8">
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
                        <div className="flex-shrink-0 w-[60px] md:w-[75px] flex flex-col items-end justify-start pt-3 font-outfit">
                          {event.startTime ? (
                            <>
                              <span className="text-sm md:text-base font-semibold text-white/90 tracking-wider">
                                {formatTime(event.startTime).replace(" ", "")}
                              </span>
                              <span className="text-[11px] text-white/50 tracking-wider mt-1">
                                {formatTime(event.endTime || event.startTime).replace(" ", "")}
                              </span>
                              <span className="text-[10px] text-fest-gold/70 tracking-widest mt-3 rounded-full border border-fest-gold/20 px-2 py-0.5">
                                {duration >= 60 ? `${Math.floor(duration / 60)}h${duration % 60 ? ` ${duration % 60}m` : ""}` : `${duration}m`}
                              </span>
                            </>
                          ) : (
                            <span className="text-[11px] text-fest-gold/80 tracking-widest border border-fest-gold/30 rounded-full px-3 py-1 bg-fest-gold/5">ALL DAY</span>
                          )}
                        </div>

                        {/* Timeline dot */}
                        <div className="relative flex-shrink-0 w-4 flex flex-col items-center pt-[18px]">
                          <div className={`w-3.5 h-3.5 rounded-full outline outline-2 outline-offset-2 outline-transparent group-hover:outline-${event.type === 'tech' ? 'blue-400/50' : 'fest-pink/50'} ${config.dot} z-10 group-hover:scale-125 transition-all duration-500`} />
                        </div>

                        {/* Event card */}
                        <div
                          className={`flex-1 ${config.bg} ${config.border} border rounded-2xl p-5 md:p-6 ${minH} transition-all duration-500 ${config.glow} shadow-sm relative overflow-hidden backdrop-blur-sm group-hover:-translate-y-1 hover:bg-white/5`}
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          {/* Top row: badge + icon */}
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className={`${config.badge} text-[11px] px-3 py-1 rounded-full font-medium tracking-wider uppercase font-outfit inline-flex items-center gap-1.5`}
                            >
                              <Icon className="w-3 h-3" />
                              {config.label}
                            </span>
                            <div className="text-white/20 group-hover:text-white/40 transition-colors italic font-serif text-sm px-2">
                              No. {(index + 1).toString().padStart(2, "0")}
                            </div>
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-xl md:text-2xl font-bold ${config.text} mb-3 font-cinzel tracking-wide leading-snug drop-shadow-sm group-hover:text-white transition-colors duration-300`}
                          >
                            {event.title}
                          </h3>

                          {/* Description */}
                          {event.description && (
                            <p className="text-sm text-white/70 leading-relaxed mb-5 font-inter pr-4">
                              {event.description}
                            </p>
                          )}

                          {/* Bottom row: venue + time */}
                          <div className="flex items-center gap-5 flex-wrap mt-auto pt-4 border-t border-white/5">
                            {event.venue && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-fest-saffron/80" />
                                <span className="text-[11px] md:text-xs text-white/80 font-medium tracking-widest uppercase font-outfit">
                                  {event.venue}
                                </span>
                              </div>
                            )}
                            {event.startTime && event.endTime && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-fest-pink/80" />
                                <span className="text-[11px] md:text-xs text-white/80 font-medium tracking-widest font-outfit">
                                  {formatTime(event.startTime)}
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
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-fest-gold/5 flex items-center justify-center mb-6 border border-fest-gold/20 shadow-[0_0_30px_rgba(198,156,56,0.1)]">
                  <Calendar className="w-8 h-8 text-fest-gold/60" />
                </div>
                <h3 className="text-xl font-cinzel text-white/90 mb-2">No Events Scheduled</h3>
                <p className="text-white/50 font-outfit max-w-sm">
                  There are no activities planned for this day. Stay tuned for upcoming cultural and technical spectacles!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-5 border-t border-fest-gold/10 bg-white/[0.02] flex items-center justify-center">
            <p className="text-xs text-white/40 tracking-[0.3em] uppercase font-outfit font-medium flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/10" />
              Aikatan • Where Culture Comes Alive
              <span className="w-8 h-[1px] bg-white/10" />
            </p>
          </div>
        </div>
      </div>

      {/* Elegant Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Soft Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(227, 74, 123, 0.2); /* Fest pink fade */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(227, 74, 123, 0.5);
        }
      `,
      }} />
    </div>
  );
};