interface Event {
  date: number;
  month: number;
  title: string;
  type: "tech" | "esports" | "holiday";
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
    title: "April - May 2026",
    events: [
      // April 2026 Sundays
      { date: 5, month: 3, title: "Sunday Holiday", type: "holiday", description: "Weekly holiday (Sunday).", venue: "Campus Closed" },
      { date: 12, month: 3, title: "Sunday Holiday", type: "holiday", description: "Weekly holiday (Sunday).", venue: "Campus Closed" },
      { date: 19, month: 3, title: "Sunday Holiday", type: "holiday", description: "Weekly holiday (Sunday).", venue: "Campus Closed" },
      { date: 26, month: 3, title: "Sunday Holiday", type: "holiday", description: "Weekly holiday (Sunday).", venue: "Campus Closed" },

      // April 2026 Holiday List
      { date: 3, month: 3, title: "Good Friday", type: "holiday", description: "Public holiday.", venue: "Campus Closed" },
      { date: 14, month: 3, title: "Dr. B. R. Ambedkar Jayanti", type: "holiday", description: "Public holiday.", venue: "Campus Closed" },

      // Festival Day 0 — April 29
      { date: 29, month: 3, title: "Opening Ceremony", startTime: "09:00", endTime: "10:00", type: "holiday", description: "Grand inauguration with lighting of the lamp, keynote address and welcome session.", venue: "Main Auditorium" },
      { date: 29, month: 3, title: "Hackathon Kickoff", startTime: "10:30", endTime: "12:30", type: "tech", description: "24-hour hackathon begins — team registration, problem statement reveal and coding starts.", venue: "CS Lab Block" },
      { date: 29, month: 3, title: "BGMI Tournament", startTime: "11:00", endTime: "13:00", type: "esports", description: "Battlegrounds Mobile India group stage matches. Top 16 teams battle it out.", venue: "Esports Arena" },
      { date: 29, month: 3, title: "Tech Quiz — Brainbuster", startTime: "14:00", endTime: "15:30", type: "tech", description: "Fast-paced technical quiz covering CS, electronics and general science.", venue: "Seminar Hall A" },
      { date: 29, month: 3, title: "Roborush Prelims", startTime: "15:00", endTime: "17:00", type: "tech", description: "Line-follower and obstacle bots compete in qualifying rounds.", venue: "Robotics Lab" },
      { date: 29, month: 3, title: "Free Fire MAX", startTime: "17:30", endTime: "19:00", type: "esports", description: "Squad showdown — survive and clutch your way to the top.", venue: "Esports Arena" },
      { date: 29, month: 3, title: "Holiday Night — Rocking Twilight", startTime: "19:30", endTime: "22:00", type: "holiday", description: "Live band performance, DJ night, and open dance floor under the stars.", venue: "Open Air Stage" },

      // Festival Day 1 — April 30
      { date: 30, month: 3, title: "Codethon", startTime: "09:00", endTime: "11:00", type: "tech", description: "Competitive programming contest — solve maximum problems in 2 hours.", venue: "CS Lab Block" },
      { date: 30, month: 3, title: "Circuit Design Challenge", startTime: "09:30", endTime: "11:30", type: "tech", description: "Design and simulate circuits on breadboard. Best design wins!", venue: "Electronics Lab" },
      { date: 30, month: 3, title: "Valorant (PC) Semis", startTime: "11:00", endTime: "13:00", type: "esports", description: "5v5 tactical shooter semi-finals on PC. High-stakes elimination rounds.", venue: "Esports Arena" },
      { date: 30, month: 3, title: "Project Exhibition", startTime: "13:00", endTime: "15:00", type: "tech", description: "Student projects on display — IoT, AI/ML, robotics and more. Judges evaluate.", venue: "Exhibition Hall" },
      { date: 30, month: 3, title: "AutoCAD Battle", startTime: "14:00", endTime: "16:00", type: "tech", description: "Design precision challenge — fastest and most accurate CAD model wins.", venue: "Mech Lab" },
      { date: 30, month: 3, title: "FIFA (PC) Finals", startTime: "16:00", endTime: "17:30", type: "esports", description: "The ultimate 1v1 FIFA showdown. Championship match.", venue: "Esports Arena" },
      { date: 30, month: 3, title: "Velvet Souls — Singing", startTime: "18:00", endTime: "20:00", type: "holiday", description: "Solo and duet singing competition across genres — classical, pop, and Bollywood.", venue: "Main Auditorium" },
      { date: 30, month: 3, title: "Innovation Panel Talk", startTime: "20:00", endTime: "21:30", type: "tech", description: "Industry leaders discuss emerging tech trends and career paths.", venue: "Seminar Hall A" },

      // Festival Day 2 — May 1
      { date: 1, month: 4, title: "Hackathon Demos", startTime: "09:00", endTime: "11:00", type: "tech", description: "24-hour hackathon concludes — teams present their projects to judges.", venue: "CS Lab Block" },
      { date: 1, month: 4, title: "Roborush Finals", startTime: "10:00", endTime: "12:00", type: "tech", description: "Championship round of the robotics competition. Fastest bot takes all.", venue: "Robotics Lab" },
      { date: 1, month: 4, title: "BGMI Finals", startTime: "11:00", endTime: "13:00", type: "esports", description: "Grand finals — top 4 squads battle for the BGMI championship title.", venue: "Esports Arena" },
      { date: 1, month: 4, title: "Typing Speed Test", startTime: "13:00", endTime: "14:00", type: "tech", description: "How fast can you type? Accuracy meets speed in this quick-fire contest.", venue: "CS Lab Block" },
      { date: 1, month: 4, title: "Valorant Finals", startTime: "14:00", endTime: "16:00", type: "esports", description: "Grand finals of the Valorant PC tournament. Best of 3.", venue: "Esports Arena" },
      { date: 1, month: 4, title: "Highway — Dance Comp", startTime: "16:30", endTime: "18:30", type: "holiday", description: "Group and solo dance performances across hip-hop, contemporary, and folk.", venue: "Open Air Stage" },
      { date: 1, month: 4, title: "Awards & Closing Ceremony", startTime: "19:00", endTime: "21:00", type: "holiday", description: "Prize distribution, felicitation of winners and grand closing celebration.", venue: "Main Auditorium" },

      // Festival Day 3 — May 2
      { date: 2, month: 4, title: "Chess Championship", startTime: "09:00", endTime: "11:00", type: "esports", description: "Classical chess finals — intense strategic battle for the crown.", venue: "Seminar Hall B" },
      { date: 2, month: 4, title: "Rubik's Cube Showdown", startTime: "10:00", endTime: "11:30", type: "esports", description: "Speed-cubing competition — fastest solve in 3x3, 4x4 and pyraminx.", venue: "Seminar Hall A" },
      { date: 2, month: 4, title: "Clash of Clans Tourney", startTime: "11:30", endTime: "13:00", type: "esports", description: "Clan wars live — strategize, deploy, and destroy enemy bases.", venue: "Esports Arena" },
      { date: 2, month: 4, title: "Mini Militia Mayhem", startTime: "13:30", endTime: "15:00", type: "esports", description: "Classic multiplayer deathmatch — last man standing wins.", venue: "Esports Arena" },
      { date: 2, month: 4, title: "Asphalt 9 Racing Finals", startTime: "15:30", endTime: "17:00", type: "esports", description: "High-speed racing finals — best lap time takes the podium.", venue: "Esports Arena" },
      { date: 2, month: 4, title: "eFootball Grand Final", startTime: "17:00", endTime: "18:30", type: "esports", description: "Ultimate 1v1 mobile football championship match.", venue: "Esports Arena" },
      { date: 2, month: 4, title: "Farewell Jam & After-Party", startTime: "19:00", endTime: "22:00", type: "holiday", description: "Live jam session, open mic, bonfire and farewell vibes to wrap up Techlavya.", venue: "Open Air Stage" },
    ],
  },
];