import React from "react";
import Title from "../Title";
import { CalendarView } from "../CalendarView";
import { timelineData } from "@/data/timelineData";

const TimelineSection: React.FC = () => {
  const events = timelineData[0]?.events || [];

  return (
    <div id="schedule" className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 my-10">
      <div className="py-6 md:py-8 flex justify-center items-center">
        <Title
          title="Events Schedule"
          className="text-gradient md:text-5xl font-extrabold tracking-wider mb-0 drop-shadow-md"
        />
      </div>
      <div className="flex justify-center">
        <CalendarView month={4} year={2026} events={events} allEvents={events} />
      </div>
    </div>
  );
};

export default TimelineSection;