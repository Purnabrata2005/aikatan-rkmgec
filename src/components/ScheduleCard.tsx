'use client'

import React from "react";
import { CalendarView } from "./CalendarView";

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

interface ScheduleCardProps {
  events: CalendarEvent[];
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ events }) => {
  return (
    <div className="w-full">
      <CalendarView month={4} year={2026} events={events} allEvents={events} />
    </div>
  );
};
