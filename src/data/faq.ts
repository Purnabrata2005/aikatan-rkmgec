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
    category: 'Support',
    question: 'How can I contact the organizers?',
    answer: 'You can reach out through our website contact form or follow our social media handles for updates. Organizers will respond to your queries promptly.'
  }
]
