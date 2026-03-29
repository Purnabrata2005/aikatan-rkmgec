import React from "react";
import Title from "../Title";

const TimelineSection: React.FC = () => {
  return (
    <div id="schedule" className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      {/* Headline centered between counter and calendar */}
      <div className="py-20 md:py-24">
        <Title title="Events Schedule" className="from-accent to-highlight mb-0" />
      </div>

      <div className="mb-16 md:mb-24 rounded-2xl border border-amber-500/30 bg-black/30 backdrop-blur-sm p-8 md:p-12 text-center">
        <p className="text-sm md:text-base uppercase tracking-[0.25em] text-amber-300/80 mb-3">
          Event Schedule
        </p>
        <h2 className="text-2xl md:text-4xl font-bold font-Orbitron text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">
          Coming Soon
        </h2>
        <p className="mt-4 text-foreground/80 max-w-2xl mx-auto">
          We are finalizing the timeline. Detailed event dates and slots will be announced shortly.
        </p>
      </div>
    </div>
  );
};

export default TimelineSection;
