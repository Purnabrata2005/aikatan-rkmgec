export type FAQType = {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQData: FAQType[] = [
  {
    id: '1',
    category: 'General',
    question: 'What is AIKATAN?',
    answer: 'AIKATAN is the official cultural fest platform of Ramkrishna Mahato Government Engineering College. Full event information is coming soon.'
  },
  {
    id: '2',
    category: 'General',
    question: 'When and where will AIKATAN 2026 be held?',
    answer: 'AIKATAN 2026 will be held at Ramkrishna Mahato Government Engineering College. Exact schedule details are coming soon.'
  },
  {
    id: '3',
    category: 'Registration',
    question: 'How do I register for events?',
    answer: 'Registration details are coming soon.'
  },
  {
    id: '4',
    category: 'Registration',
    question: 'Can I register for multiple events?',
    answer: 'Event registration updates are coming soon.'
  },
  
  {
    id: '5',
    category: 'Events',
    question: 'Do I need prior experience to participate?',
    answer: 'Participation details are coming soon.'
  },
  {
    id: '6',
    category: 'Prizes',
    question: 'What are the prizes?',
    answer: 'Prize information is coming soon.'
  },
  
  {
    id: '7',
    category: 'General',
    question: 'Can non-college students participate?',
    answer: 'Participation rules are coming soon.'
  },
  {
    id: '8',
    category: 'Support',
    question: 'How can I contact the organizers?',
    answer: 'You can reach out through our website contact form or follow our social media handles for updates. Organizers will respond to your queries promptly.'
  }
]
