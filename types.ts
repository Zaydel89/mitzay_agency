
export type Page = 'home' | 'services' | 'courses';

export interface NavLink {
  label: string;
  page: Page;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: string;
  features: string[];
}

export interface DetailedService {
  title: string;
  objective: string;
  deliverables: string[];
  time?: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  video: string;
  alt: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  highlight: string;
  image: string;
  rating: number; // New property: 4.5 or 5
  date?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
