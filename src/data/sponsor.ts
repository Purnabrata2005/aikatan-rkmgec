export type sponsorDataType = {
  role: string;
  name: string;
  logo?: string;
  note?: string;
};

export const sponsorData: sponsorDataType[] = [
  {
    role: "Media Partner",
    name: "Ei Samay",
    note: "News coverage and event visibility",
    logo: "/sponsor/1.png",
  },
  {
    role: "Radio Partner",
    name: "91.9 Friends FM",
    logo: "/sponsor/friends-fm.png",
    note: "On-air promotion and audience reach",
  },
  {
    role: "Jewellery Partner",
    name: "Shyam Sundar Chandiwala",
    note: "Jewellery partner for styling and collaboration",
    logo: "/sponsor/9.jpeg",  
  },
  {
    role: "Associate Partner",
    name: "Sorella",
    note: "Community support and collaboration",
    logo: "/sponsor/6.jpeg",
  },
  {
    role: "Associate Sponsor",
    name: "Dutta Optics",
    note: "Associate sponsor support and outreach",
    logo: "/sponsor/8.jpeg",
  },
  {
    role: "Associate Partner",
    name: "Srabu Consultancy",
    note: "Strategic support and engagement",
      logo: "/sponsor/2.png",
  },
  {
    role: "Hospitality Partner",
    name: "Sagar Raj Resort",
    logo: "/sponsor/sagar-raj-resorts.png",
    note: "Guest experience and hospitality support",
  },
  {
    role: "Fitness Partner",
    name: "Gravity Gym",
    note: "Wellness and fitness association",
    logo: "/sponsor/5.jpeg",
  },
  {
    role: "Powered By",
    name: "Pragati Group",
    logo: "/sponsor/pragati-cement.png",
    note: "Core event backing and execution support",
  },
];
