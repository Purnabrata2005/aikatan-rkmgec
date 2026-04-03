"use client";

import React, { useRef, useState } from "react";
import Container from "../Container";
import { CulturalEventData } from "@/data/event-data";
import dynamic from "next/dynamic";
import "./TechlavyaEventSection.css";

const EventCard = dynamic(() => import("@/components/EventCard"), {
  ssr: false,
});

const TechlavyaEventSection: React.FC = () => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hide the swipe indicator once the user scrolls
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      if (scrollContainerRef.current.scrollLeft > 10) {
        setHasScrolled(true);
      }
    }
  };

  return (
    <Container
      id="techlavya"
      title="Cultural Showcases"
      titleClassName="from-accent to-highlight"
    >
      {/* MOBILE LAYOUT */}
      <div className="relative md:hidden -mx-4 mb-10">
        {/* Interactive Swipe Indicator */}
        {!hasScrolled && (
          <>
            {/* Top swipe instruction */}
            <div className="absolute left-4 -top-12 z-10 flex items-center gap-2 pointer-events-none">
              <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase animate-pulse">
                ← Swipe to explore
              </span>
            </div>

            {/* Main swipe indicator with finger drag animation */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              {/* Animated finger gesture */}
              <div className="relative mb-3">
                <div 
                  className="text-3xl swipe-finger"
                >
                  👆
                </div>
              </div>
              
              {/* Badge with text */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black backdrop-blur-sm px-4 py-2.5 rounded-2xl flex flex-col items-center gap-1 shadow-lg border border-amber-400/30">
                <span className="text-xs font-extrabold tracking-widest uppercase">
                  Swipe
                </span>
                <span className="text-[10px] font-semibold opacity-90">
                  Left →
                </span>
              </div>
            </div>

            {/* Animated arrows showing direction */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[8] pointer-events-none">
              <svg
                className="w-6 h-6 text-amber-400 swipe-arrow"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </>
        )}

        {/* Right-side gradient fade to indicate overflow */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/50 to-transparent z-[5] pointer-events-none" />

        {/* Left-side subtle gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/40 to-transparent z-[5] pointer-events-none" />

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide relative"
        >
          {CulturalEventData.map((event, index) => (
            <div
              key={event.id}
              className={`snap-center shrink-0 w-[86vw] max-w-[360px] ${
                !hasScrolled && index === 0 ? "animate-pulse" : ""
              }`}
            >
              <EventCard
                eventId={event.id}
                eventData={event}
                flippedCardId={flippedCardId}
                setFlippedCardId={setFlippedCardId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center mb-10">
        {CulturalEventData.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            eventData={event}
            flippedCardId={flippedCardId}
            setFlippedCardId={setFlippedCardId}
          />
        ))}
      </div>
    </Container>
  );
};

export default TechlavyaEventSection;
