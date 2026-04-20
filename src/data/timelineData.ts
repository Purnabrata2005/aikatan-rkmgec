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
      { date: 15, month: 5, title: "Chhou Nach", startTime: "18:00", type: "cultural" },
      { date: 15, month: 5, title: "College Cultural Programme", startTime: "18:30", type: "cultural" },
      { date: 15, month: 5, title: "Tech Fest Prize Distribution", startTime: "21:00", type: "cultural" },
      { date: 15, month: 5, title: "The paper planes ", startTime: "22:30", type: "cultural" },
      { date: 15, month: 5, title: "Ananya Chakraborty live ", startTime: "1:00", type: "cultural" },

      // Day 2 - 16.05.2026 (From 6 PM)
      { date: 16, month: 5, title: "College Cultural Programme", startTime: "18:00", type: "cultural" },
      { date: 16, month: 5, title: "Reunion", startTime: "19:30", type: "cultural" },
      { date: 16, month: 5, title: "College Cultural Programme", startTime: "20:30",endTime:"21:30", type: "cultural" },
      { date: 16, month: 5, title: "Fakira Live Concert", startTime: "23:00", type: "cultural" },
      { date: 16, month: 5, title: "DJ Night", startTime: "1:30", type: "cultural" },
    ],
  },
];