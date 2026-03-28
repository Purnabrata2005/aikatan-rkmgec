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
    question: 'What is TECHLAVYA?',
    answer: 'TECHLAVYA is the official tech fest of Ramkrishna Mahato Government Engineering College. It is a platform for students to showcase their technical skills through various competitions, workshops, and interactive events.'
  },
  {
    id: '2',
    category: 'General',
    question: 'When and where will TECHLAVYA 2026 be held?',
    answer: 'TECHLAVYA 2026 will be held at Ramkrishna Mahato Government Engineering College. Exact dates will be announced soon. Follow our website for updates!'
  },
  {
    id: '3',
    category: 'Registration',
    question: 'How do I register for events?',
    answer: 'You can register for events directly through our website. Each event has a registration button with a Google Form link. Fill out the form and submit to secure your spot.'
  },
  {
    id: '4',
    category: 'Registration',
    question: 'Can I register for multiple events?',
    answer: 'Yes! You can participate in multiple events. Make sure to check the event schedules to avoid time conflicts.'
  },
  
  {
    id: '5',
    category: 'Events',
    question: 'Do I need prior experience to participate?',
    answer: 'Events are designed for different skill levels. Whether you are a beginner or an expert, there is something for everyone. Check event details for specific requirements.'
  },
  {
    id: '6',
    category: 'Prizes',
    question: 'What are the prizes?',
    answer: 'We offer exciting prizes including cash rewards, certificates, and merchandise. Prize details vary by event. Prize pool information will be updated soon.'
  },
  
  {
    id: '7',
    category: 'General',
    question: 'Can non-college students participate?',
    answer: 'Currently, TECHLAVYA is primarily for RKMGEC students. However, some events may be open to outside participants. Contact the organizers for more details.'
  },
  {
    id: '8',
    category: 'Support',
    question: 'How can I contact the organizers?',
    answer: 'You can reach out through our website contact form or follow our social media handles for updates. Organizers will respond to your queries promptly.'
  }
]
