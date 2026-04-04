import React from "react";
import Title from "../Title";
import { CalendarView } from "../CalendarView";
import { timelineData } from "@/data/timelineData";

const TimelineSection: React.FC = () => {
  const events = timelineData[0]?.events || [];

  return (
    <div id="schedule" className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      {/* Headline centered between counter and calendar */}
      <div className="py-20 md:py-24">
        <Title title="Events Schedule" className="from-accent to-highlight mb-0" />
      </div>

      <div className="mb-16 md:mb-24">
        <CalendarView month={4} year={2026} events={events} allEvents={events} />
      </div>
    </div>
  );
};

export default TimelineSection;