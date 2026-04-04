interface Event {
  date: number;
  month: number;
  title: string;
  type: "cultural";
  startTime?: string;
  endTime?: string;
  description?: string;
  venue?: string;
}

interface TimelineEntry {
  title: string;
  events: Event[];
}

export const timelineData: TimelineEntry[] = [
  {
    title: "May 2026",
    events: [
      // Day 1 - 15.05.2026 (From 6 PM)
      { date: 15, month: 4, title: "Chhou Nach", startTime: "18:00", type: "cultural" },
      { date: 15, month: 4, title: "College Cultural Programmes", startTime: "19:00", type: "cultural" },
      { date: 15, month: 4, title: "Tech Fest Prize Distribution", startTime: "20:00", type: "cultural" },
      { date: 15, month: 4, title: "Trap : The Radical Array Project", startTime: "21:00", type: "cultural" },
      { date: 15, month: 4, title: "Distorted Chromosomes/ The Paper Plane", startTime: "22:00", type: "cultural" },

      // Day 2 - 16.05.2026 (From 6 PM)
      { date: 16, month: 4, title: "College Cultural Programmes", startTime: "18:00", type: "cultural" },
      { date: 16, month: 4, title: "Reunion", startTime: "19:00", type: "cultural" },
      { date: 16, month: 4, title: "Fakira Live Concert", startTime: "20:00", type: "cultural" },
      { date: 16, month: 4, title: "DJ Night", startTime: "22:00", type: "cultural" },
    ],
  },
];