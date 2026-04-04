import React from "react";
import Title from "../Title";
import { CalendarView } from "../CalendarView";
import { timelineData } from "@/data/timelineData";

const TimelineSection: React.FC = () => {
  const events = timelineData[0]?.events || [];

  return (
    <div id="schedule" className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 bg-secondary/40 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl py-4 my-10">
      {/* Headline centered between counter and calendar */}
      <div className="py-12 md:py-16 mb-6 flex justify-center items-center">
        <div className="glass-morphism px-10 py-4 rounded-[2rem] shadow-2xl border-highlight/30 glow-on-hover">
          <Title title="Events Schedule" className="text-gradient md:text-5xl font-extrabold tracking-wider mb-0 drop-shadow-md" />
        </div>
      </div>

      <div className="mb-16 md:mb-24">
        <CalendarView month={4} year={2026} events={events} allEvents={events} />
      </div>
    </div>
  );
};

export default TimelineSection;